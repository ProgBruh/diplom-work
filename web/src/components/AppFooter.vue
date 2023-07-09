<template>
    <q-footer class="footer q-py-sm">
        <div class="row justify-center q-gutter-lg q-mb-sm">
            <q-icon 
                name="discord"
                size="md"
            />
            <q-icon 
                name="reddit"
                size="md"
            />
            <q-icon 
                name="facebook"
                size="md"
            />
        </div>
        <div class="row justify-center">
            <span class="text-h7" v-html="text" />
        </div>
    </q-footer>
</template>

<script lang="ts">
export default {
    name: 'AppFooter',

    computed: {
        text() {
            return `Codelp - ${new Date().getFullYear()}`
        },
    },
};
</script>