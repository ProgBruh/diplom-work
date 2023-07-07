import { defineStore } from 'pinia';
import axios from '../helpers/getAppAxios';
import { getPagination, getRelation } from '../helpers/getQuery';

export const usePostsStore = defineStore('posts', {
    state: () => ({
        loading: false,
        pagination: {
            current: 1,
            total: 1,
        },
        list: [],
    }),
    actions: {
        async fetchList() {
            try {
                this.loading = true;
                const relations = {
                    language: ['name', 'color'],
                    author: ['username'],
                };
                const { data: { data, meta } } = await axios.get(`/api/posts?${getPagination(this.currentPage)}${getRelation(relations)}`);
                const { pagination } = meta;
                this.pagination.total = pagination.pageCount;
                this.list = data;
                this.loading = false;
            } catch (e) {
                throw e;
            }
        },
        setPagination(payload: object) {
            this.pagination = { ...this.pagination, ...payload };
        },
    },
    getters: {
        currentPage: (state) => state.pagination?.current || 1,
        totalPages: (state) => state.pagination?.total,
    },
});