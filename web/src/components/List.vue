<template>
    <div class="list">
        <div :class="['wrapper', 'row', 'q-mb-xl', { 'justify-center': isEmpty }]">
            <card
                v-for="item of list" 
                :key="`card-${item.id}`" 
                class="card"
                v-bind="normalizeAttributes(item.attributes)"
            />
        </div>
        <q-pagination
            v-if="!isEmpty"
            v-model="currentPage"
            :max="totalPages"
            class="justify-center"
            color="grey"
            active-color="primary"
            direction-links
            flat
        />
        <div v-if="isEmpty" class="column items-center">
            <q-icon 
                name="list_alt" 
                size="30px"
            />
            <span class="text-h6 text-dark">No data</span>
        </div>
    </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import Card from './Card.vue';
import { usePostsStore } from '../store';
import normalizeAttributes from '../helpers/normalizeAttributes';

export default {
    name: 'List',

    components: {
        Card,
    },

    data() {
        return {
            postsStore: usePostsStore(),
        };
    },

    computed: {
        ...mapActions(usePostsStore, ['setPagination', 'fetchList']),
        loading() {
            return this.postsStore.loading;
        },
        list() {
            return this.postsStore.list;
        },
        isEmpty() {
            return !this.list.length;
        },
        totalPages() {
            return this.postsStore.totalPages;
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
    
    methods: {
        normalizeAttributes,
    },
};
</script>

<style lang="scss" scoped>
.list {

    .wrapper {
        gap: 30px; 
    }

    .card {
        max-width: calc(50% - 15px);
    }
}
</style>