<template>
    <div class="post-detail-answer">
        <div class="row justify-center q-mb-md">
            <q-btn
                v-if="isAuth"
                label="Add answer"
                icon="add_box"
                color="primary"
                @click="clickButtonHandler"
                outline
            />
            <span v-else class="text-primary">
                Log in to add a answer
            </span>
        </div>
        <template v-if="answers.length">
            <q-card
                v-for="item of answers"
                :key="item.id"
                :class="['answer', 'full-width', 'q-mb-md', { _solved: item.attributes.solved }]"
                flat
                bordered
            >
                <q-card-section horizontal>
                    <q-card-section>
                        <div class="column items-center">
                            <q-avatar 
                                size="lg"
                                color="red"
                                text-color="white"
                                icon="person"
                                class="q-mb-sm"
                                rounded
                            />
                            <span class="text-caption q-mb-sm" v-html="item.attributes.author.data.attributes.username" />
                            <q-btn 
                                v-if="!solved && isAuthor"
                                icon="check"
                                color="secondary"
                                square
                                @click="clickCheckHandler(item.id)"
                            />
                        </div>
                    </q-card-section>
                    <q-separator vertical />
                    <q-card-section class="full-width">
                        <div class="column">
                            <pre
                                v-if="item.attributes.description"
                                class="text-subtitle1 q-mb-sm" 
                                v-html="item.attributes.description" 
                            />
                            <code-editor
                                v-if="item.attributes.code"
                                :read-only="true"
                                :line-nums="true"
                                :value="item.attributes.code"
                                :languages="[[item.attributes.language.data.attributes.editorName, item.attributes.language.data.attributes.name]]"
                                width="100%"
                                class="full-width q-mb-md"
                            />
                            <span class="text-caption" v-html="new Date(item.attributes.createdAt || new Date()).toLocaleDateString()" />
                        </div>
                    </q-card-section>
                </q-card-section>
            </q-card>
        </template>
        <span v-else class="text-h5 text-center" style="display: block;">
            No answers
        </span>
        <create-post-modal 
            :show="showModal"
            answer
            @set-show="setShowHandler"
        />
    </div>
</template>

<script>
import createPostModal from './modals/createPostModal.vue';
import { useAuthStore } from '../store';
import CodeEditor from 'simple-code-editor';
import hljs from 'highlight.js';

export default {
    name: 'PostDetailAnswer',

    components: {
        createPostModal,
        CodeEditor,
    },

    props: {
        answers: {
            type: Array,
            default: () => [],
        },
        isAuthor: {
            type: Boolean,
            default: false,
        },
        solved: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            authStore: useAuthStore(),
            showModal: false,
        }
    },

    computed: {
        isAuth() {
            return this.authStore.isAuth;            
        },
    },

    methods: {
        clickButtonHandler() {
            this.showModal = true;
        },
        setShowHandler(value) {
            this.showModal = value;
        },
        async clickCheckHandler(id) {
            this.$emit('solved', id);
        },
    },
};
</script>

<style lang="scss" scoped>
.post-detail-answer {

    .answer {

        &._solved {
            border: 2px solid $green;
        }
    }
}
</style>