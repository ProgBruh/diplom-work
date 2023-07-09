import { defineStore } from 'pinia';
import { useAuthStore } from '.';
import axios from '../helpers/getAppAxios';
import { getPagination, getRelation, getFields } from '../helpers/getQuery';
import normalizeAttributes from '../helpers/normalizeAttributes';

interface ILanguageItem {
    [key: string]: any;
}

interface ICreatePost {
    title: string;
    description: string;
    code: string;
    language: number;
    author: number;
}

interface ISolvePayload {
    postId: number;
    answerId: number;
}

interface IAddAnswer {
    description: string;
    code: string;
    post: number;
    author: number;
    language: number;
}

export const usePostsStore = defineStore('posts', {
    state: () => ({
        loading: false,
        pagination: {
            current: 1,
            total: 1,
        },
        list: [],
        languages: [],
        postDetail: {},
    }),
    actions: {
        async fetchList() {
            try {
                this.loading = true;
                const relations = {
                    language: ['name', 'editorName', 'color'],
                    author: ['username'],
                };
                const { data: { data, meta } } = await axios.get(`/api/posts?${getPagination(this.currentPage)}${getRelation(relations)}&sort=id:desc`);
                const { pagination } = meta;
                this.pagination.total = pagination.pageCount;
                this.list = data;
            } catch (e) {
                throw e;
            } finally {
                this.loading = false;
            }
        },
        async fetchListFilter(payload: string) {
            try {
                this.loading = true;
                const { data } = await axios.get(`/api/find-posts-with-filters?filters=${payload}&sort=id:desc`);
                this.list = data;
                this.pagination = {
                    current: 1,
                    total: 1,
                };
            } catch (e) {
                throw e;
            } finally {
                this.loading = false;
            }
        },
        async fetchDetail(payload: string) {
            try {
                this.loading = true;
                const relations = [
                    'language',
                    'author',
                    'answers',
                    'answers.author',
                    'answers.language',
                ];
                const { data: { data } } = await axios.get(`/api/posts/${payload}?${relations.map(el => `populate=${el}`).join('&')}`);
                this.postDetail = normalizeAttributes(data);
            } catch (e) {
                throw e;
            } finally {
                this.loading = false;
            }
        },
        async fetchLanguages() {
            try {
                const fields = ['name', 'editorName'];
                const { data: { data } } = await axios.get(`/api/programming-languages?${getFields(fields)}`);
                const languagesData = data.map((el: ILanguageItem) => normalizeAttributes(el));
                this.languages = languagesData;
            } catch (e) {
                throw e;
            }
        },
        async createPost(payload: ICreatePost) {
            try {
                const authStore = useAuthStore();
                await axios.post('/api/posts', { data: payload }, {
                    headers: {
                        Authorization: `Bearer ${authStore.jwt}`,
                    },
                });
            } catch (e) {
                throw e;
            }
        },
        async solvePost(payload: ISolvePayload) {
            try {
                const { postId, answerId } = payload;
                const authStore = useAuthStore();
                await axios.put(`/api/posts/${postId}`, {
                    data: {
                        solved: true,
                    },
                }, {
                    headers: {
                        Authorization: `Bearer ${authStore.jwt}`,
                    },
                });
                await axios.put(`/api/answers/${answerId}`, {
                    data: {
                        solved: true,
                    },
                }, {
                    headers: {
                        Authorization: `Bearer ${authStore.jwt}`,
                    },
                });
            } catch (e) {
                throw e;
            }
        },
        async addAnser(payload: IAddAnswer) {
            try {
                const authStore = useAuthStore();
                await axios.post('/api/answers', { data: payload }, {
                    headers: {
                        Authorization: `Bearer ${authStore.jwt}`,
                    },
                });
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