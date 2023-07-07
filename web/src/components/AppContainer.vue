<template>
    <div class="app-container">
        <slot />
    </div>
</template>

<script lang="ts">
export default {
    name: 'AppContainer',
};
</script>

<style lang="scss" scoped>
.app-container {
    max-width: 1440px;
    margin: auto;
    padding-right: 20px;
    padding-left: 20px;
}
</style>
