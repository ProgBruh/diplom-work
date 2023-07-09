<template>
    <div class="post-detail-content">
        <h1 class="text-h4 q-mb-md" v-html="title" />
        <div class="row items-center q-mb-md">
            <q-icon 
                name="calendar_month"
                size="18px"
                class="q-mr-xs"
            />
            <span class="text-subtitle2 q-mr-md" v-html="date" />
            <q-icon 
                name="person"
                size="18px"
                class="q-mr-xs"
            />
            <span class="text-subtitle2 q-mr-md" v-html="username" />
            <span v-if="solved" class="helper q-pa-xs text-green text-bold">
                Solved
            </span>
        </div>
        <p class="text-subtitle1" v-html="description" />
        <code-editor 
            :read-only="true"
            :line-nums="true"
            :value="code"
            :languages="[[editorName, langName]]"
            width="100%"
            class="q-mb-xl"
        />
    </div>
</template>

<script lang="js">
import CodeEditor from 'simple-code-editor';
import hljs from 'highlight.js';

export default {
    name: 'PostDetailContent',

    components: {
        CodeEditor,
    },

    props: {
        title: {
            type: String,
            default: '',
        },
        solved: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        code: {
            type: String,
            default: '',
        },
        author: {
            type: Object,
            default: () => ({}),
        },
        language: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        date() {
            return new Date(this.createdAt || new Date()).toLocaleDateString();
        },
        username() {
            return this.author?.username;
        },
        langName() {
            return this.language.name || 'JavaScript';
        },
        editorName() {
            return this.language.editorName || 'javascript';
        },
    },
};
</script>

<style lang="scss" scoped>
.post-detail-content {
    
    .helper {
        border: 1px solid $green;
    }
}
</style>