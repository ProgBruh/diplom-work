<template>
    <div class="index column full-height q-py-xl">
        <div class="wrapper row">
            <div class="inner-wrapper q-mr-md">
                <create-post v-if="isAuth" class="q-mb-md" />
                <filters 
                    class="filters" 
                    @filter="filterHandler" 
                    @clear="fetchList"
                />
            </div>
            <list 
                v-if="!isEmpty" 
                :data="list" 
                class="list q-mb-md" 
            />
            <div v-else class="info column justify-center items-center">
                <q-icon 
                    name="list_alt" 
                    size="30px"
                />
                <span class="text-h6 text-dark">No data</span>
            </div>
        </div>
        <q-pagination
            v-if="showPages"
            v-model="currentPage"
            :max="totalPages"
            class="justify-center q-mt-lg"
            color="grey"
            active-color="primary"
            direction-links
            flat
        />
    </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import CreatePost from '../components/CreatePost.vue';
import Filters from '../components/Filters.vue';
import List from '../components/List.vue';
import { useAuthStore, usePostsStore } from '../store';

export default {
    name: 'Index',

    components: {
        CreatePost,
        Filters,
        List,
    },

    data() {
        return {
            authStore: useAuthStore(),
            postsStore: usePostsStore(),
        };
    },

    computed: {
        list() {
            return this.postsStore.list;
        },
        isEmpty() {
            return !this.list.length;
        },
        totalPages() {
            return this.postsStore.totalPages;
        },
        showPages() {
            return !this.isEmpty && this.totalPages > 1;
        },
        isAuth() {
            return this.authStore.isAuth;
        },
        currentPage: {
            get() {
                return this.postsStore.currentPage;
            },
            set(value: number) {
                this.setPagination({ current: value });
            },
        },
    },

    watch: {
        async currentPage() {
            await this.fetchList();
        },
    },

    async mounted() {
        await Promise.all([
            this.fetchList(),
            this.fetchLanguages(),
        ]);
    },

    methods: {
        ...mapActions(usePostsStore, ['setPagination', 'fetchList', 'fetchListFilter', 'fetchLanguages']),
        filterHandler(payload: string) {
            this.fetchListFilter(payload);
        },
    },
};
</script>

<style lang="scss" scoped>
.index {

    .wrapper {
        flex-grow: 1;
        flex-wrap: nowrap;
    }

    .inner-wrapper {
        min-width: max-content;
        max-width: max-content;
    }

    .list, 
    .info {
        flex-grow: 1;
    }
}
</style>
