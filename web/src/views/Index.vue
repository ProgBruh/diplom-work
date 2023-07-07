<template>
    <div class="index q-pt-xl">
        <list />
    </div>
</template>

<script lang="ts">
import List from '../components/List.vue';
import { usePostsStore } from '../store';

export default {
    name: 'Index',

    components: {
        List,
    },

    data() {
        return {
            postsStore: usePostsStore(),
        };
    },

    async mounted() {
        await this.postsStore.fetchList();
    },
};
</script>
