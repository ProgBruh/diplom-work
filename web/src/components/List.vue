<template>
    <div class="list">
        <div class="wrapper row">
            <card
                v-for="item of data" 
                :key="`card-${item.id}`" 
                class="card"
                v-bind="normalizeAttributes(item)"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Card from './Card.vue';
import normalizeAttributes from '../helpers/normalizeAttributes';

export default {
    name: 'List',

    components: {
        Card,
    },

    props: {
        data: {
            type: Array,
            default: () => [],
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