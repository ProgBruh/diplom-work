<template>
    <div class="filters">
        <q-card flat bordered>
            <q-card-section>
                <q-input
                    v-model="formValues.title"
                    label="Title"
                    class="q-mb-md"
                    outlined
                />
                <q-select
                    v-model="languageProxy"
                    :options="languages"
                    label="Language" 
                    class="q-mb-md"
                    outlined
                />
                <div class="q-mb-md">
                    <q-toggle
                        v-model="formValues.solved"
                        label="Solved"
                    />
                </div>
                <q-date
                    v-model="dateProxy"
                    class="q-mb-md"
                    minimal
                    range
                    flat
                />
                <div class="row justify-between">
                    <q-btn
                        label="Clear"
                        color="negative"
                        class="button q-mr-md"
                        outline
                        @click="clickClearHandler"
                    />
                    <q-btn
                        label="Search"
                        color="primary"
                        class="button"
                        outline
                        @click="clickSearchHandler"
                    />
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script lang="ts">
import { usePostsStore } from '../store';

export default {
    name: 'Filters',

    data() {
        return {
            postsStore: usePostsStore(),
            languageProxy: '',
            dateProxy: '',
            formValues: {
                title: '',
                solved: false,
                language: 0,
                startDate: '',
                endDate: '',
            },
        };
    },

    computed: {
        languages() {
            return this.postsStore.languages.map(el => ({ label: el.name, value: el.id }));
        },
    },

    watch: {
        languageProxy: {
            handler(value) {
                this.formValues.language = value.value;
            },
            deep: true,
        },
        dateProxy(value) {
            if (typeof value === 'string') {
                this.formValues.startDate = value;
            } else {
                const { from, to } = value;
                this.formValues.startDate = from;
                this.formValues.endDate = to;
            }
        },
    },

    methods: {
        clickClearHandler() {
            this.languageProxy = '';
            this.dateProxy = '';
            this.formValues = {
                title: '',
                solved: false,
                language: 0,
                startDate: '',
                endDate: '',
            };
            this.$emit('clear');
        },
        clickSearchHandler() {
            const raw = { ...this.formValues };
            Object.keys(raw).forEach(key => {
                if (!raw[key]) delete raw[key];
            });
            const data = JSON.stringify(raw);
            this.$emit('filter', data);
        },
    },
};
</script>

<style lang="scss" scoped>
.filters {

    .button {
        width: calc(50% - 8px);
    }
}
</style>