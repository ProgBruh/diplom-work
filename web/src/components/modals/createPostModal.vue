<template>
    <q-dialog
        v-model="value"
        transition-show="slide-up"
        transition-hide="slide-down"
        class="create-post-modal"
        persistent
        maximized
    >
        <q-card>
            <q-bar>
                <q-space />
                <q-btn 
                    icon="close"
                    dense
                    flat
                    @click="clickHandler"
                >
                    <q-tooltip class="bg-primary text-white">
                        close
                    </q-tooltip>
                </q-btn>
            </q-bar>
            <q-card-section>
                <h5 
                    class="text-h5 text-dark"
                    style="margin-top: 0;"
                    v-html="title" 
                />
                <q-form
                    greedy
                    @submit="submitHandler"
                >
                    <q-input
                        v-if="!answer"
                        v-model="formValues.title" 
                        label="Title"
                        bg-color="white"
                        class="q-mb-sm"
                        :rules="[val => val && val.length > 0 || 'Required field']"
                        outlined
                    />
                    <q-input 
                        v-model="formValues.description" 
                        label="Description"
                        bg-color="white"
                        class="q-mb-sm"
                        type="textarea"
                        :rules="[val => val && val.length > 0 || 'Required field']"
                        outlined
                    />
                    <code-editor
                        ref="editor"
                        v-model="formValues.code"
                        :line-nums="true"
                        :languages="editorLanguages"
                        lang-list-height="200px"
                        theme="atom-one-light"
                        width="100%"
                        height="250px"
                        :class="['editor', { _error: editorError, 'q-mb-xs': editorError, 'q-mb-lg': !editorError }]"
                        @content="focusHandler"
                    />
                    <span v-if="editorError" class="helper text-negative">
                        Required field
                    </span>
                    <div class="row">
                        <q-select
                            v-model="languageProxy"
                            :options="languages"
                            label="Language"
                            bg-color="white"
                            class="q-mr-md"
                            style="min-width: 200px; z-index: 1;"
                            :rules="[val => val.value || 'Required field']"
                            outlined
                        />
                        <q-btn 
                            label="create"
                            color="primary"
                            style="min-width: 200px; max-height: 56px;"
                            type="submit"
                            outline
                        />
                    </div>
                </q-form>
                <q-inner-loading 
                    :showing="loading"
                    label="Loading"
                />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script lang="js">
import { mapActions } from 'pinia';
import CodeEditor from 'simple-code-editor';
import hljs from 'highlight.js';
import { useAuthStore, usePostsStore } from '../../store';

export default {
    name: 'createPostModal',

    components: {
        CodeEditor,
    },

    props: {
        show: {
            type: Boolean,
            default: false,
        },
        answer: {
            type: Boolean,
            default: false,
        },
    },
    
    data() {
        return {
            authStore: useAuthStore(),
            postsStore: usePostsStore(),
            languageProxy: '',
            editorFocus: false,
            loading: false,
            formValues: {
                title: '',
                description: '',
                code: 'Code',
                language: '',
            },
        };
    },

    computed: {
        editorLanguages() {
            return this.postsStore.languages.map(el => ([el.editorName, el.name]));
        },
        languages() {
            return this.postsStore.languages.map(el => ({ label: el.name, value: el.id }));
        },
        editorError() {
            return this.editorFocus && !this.formValues.code;
        },
        title() {
            return this.answer ? 'Add answer' : 'Create post';
        },
        value: {
            get() {
                return this.show;
            },
            set(value) {
                this.emitData(value);
            },
        },
    },

    watch: {
        languageProxy: {
            handler(value) {
                this.formValues.language = value.value;
            },
            deep: true,
        },
    },

    methods: {
        ...mapActions(usePostsStore, ['createPost', 'addAnser', 'fetchList', 'fetchDetail']),
        emitData(value) {
            this.$emit('set-show', value);
        },
        clickHandler() {
            this.emitData(false);
        },
        async submitHandler() {
            try {
                this.focusHandler();
                if (this.editorError) return;
                this.loading = true;
                if (this.answer) {
                    const localValues = { ...this.formValues };
                    delete localValues.title;
                    await this.addAnser({ ...localValues, author: this.authStore.user.id, post: this.postsStore.postDetail.id });
                    await this.fetchDetail(this.$route.params.id);
                    this.$q.notify({
                        message: 'Answer added successfully',
                        icon: 'done',
                        color: 'green',
                    });
                } else {
                    await this.createPost({ ...this.formValues, author: this.authStore.user.id });
                    await this.fetchList();   
                    this.$q.notify({
                        message: 'Post successfully created',
                        icon: 'done',
                        color: 'green',
                    });
                }
                this.emitData(false);
            } catch {
                this.$q.notify({
                    message: 'An error occurred',
                    icon: 'error',
                    color: 'red',
                });
            }
        },
        focusHandler() {
            this.editorFocus = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.create-post-modal {

    .editor {
        z-index: 10;
        border: 1px solid #c2c2c2; 
        border-radius: 4px;

        &._error {
            border: 2px solid #c10015;
        }
    }

    .helper {
        padding: 8px 12px 0;
        font-size: 12px;
        line-height: 20px;
    }
}
</style>
