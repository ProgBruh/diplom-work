<template>
    <div class="post-detail q-py-lg">
        <template v-if="!loading">
            <div class="wrapper q-mb-lg">
                <q-breadcrumbs gutter="sm">
                    <q-breadcrumbs-el 
                        icon="home" 
                        label="Home" 
                        to="/" 
                    />
                    <q-breadcrumbs-el icon="view_list" label="Post" />
                </q-breadcrumbs>
            </div>
            <post-detail-content v-bind="postDetail" />
            <post-detail-answer
                :answers="answers" 
                :is-author="isAuthor" 
                :solved="solved"
                @solved="solvedHandler"
            />
        </template>
        <q-inner-loading :showing="loading" label="Loading" />
    </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import { useAuthStore, usePostsStore } from '../store';
import PostDetailContent from '../components/PostDetailContent.vue';
import PostDetailAnswer from '../components/PostDetailAnswer.vue';

export default {
    name: 'PostDetail',

    components: {
        PostDetailContent,
        PostDetailAnswer,
    },

    data() {
        return {
            postsStore: usePostsStore(),
        };
    },

    computed: {
        loading() {
            return this.postsStore.loading;
        },
        postDetail() {
            const data = { ...this.postsStore.postDetail };
            delete data.answers;
            return data;
        },
        answers() {
            const { answers } = this.postsStore.postDetail;
            return answers ? answers.data.sort((a, b) => (a.id > b.id ? -1 : 1)) : [];
        },
        isAuthor() {
            const authStore = useAuthStore();
            return this.postDetail?.author?.id === authStore.user?.id;
        },
        solved() {
            return this.postDetail.solved;
        },
    },

    async mounted() {
        await this.fetchDetail(this.$route.params.id);
        if (!this.postsStore.languages.length) await this.fetchLanguages();
    },

    methods: {
        ...mapActions(usePostsStore, ['fetchDetail', 'fetchLanguages', 'solvePost']),
        async solvedHandler(id: number) {
            const payload = {
                postId: this.$route.params.id,
                answerId: id,
            };
            await this.solvePost(payload);
            this.$q.notify({
                message: 'Post successfully resolved',
                icon: 'done',
                color: 'green',
            });
        },
    },
};
</script>