<template>
    <div class="create-post">
        <q-btn 
            color="primary"
            icon="add_box"
            label="Create post"
            class="full-width"
            outline
            @click="clickHandler"
        />
        <create-post-modal :show="showModal" @set-show="setShowHandler" />
    </div>
</template>

<script lang="ts">
import createPostModal from './modals/createPostModal.vue';

export default {
    name: 'CreatePost',

    components: {
        createPostModal,
    },

    data() {
        return {
            showModal: false,
        };
    },

    methods: {
        clickHandler() {
            this.showModal = true;
        },
        setShowHandler(value: boolean) {
            this.showModal = value;
        },
    },
};
</script>