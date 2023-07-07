<template>
    <router-link to="/" class="card">
        <q-card flat bordered>
            <q-card-section class="q-pt-sm">
                <span 
                    class="language q-ml-md text-overline text-black" 
                    :style="styleBind"
                    v-html="langName" 
                />
                <span class="title q-mb-xs text-h5 text-black" v-html="title" />
                <span class="content text-caption text-dark" v-html="description" />
            </q-card-section>
            <q-separator />
            <q-card-actions class="row items-center">
                <div class="row items-center text-dark">
                    <q-icon 
                        name="account_circle" 
                        size="22px" 
                        class="q-mr-xs" 
                    />
                    <span class="text-caption" v-html="username" />
                </div>
                <q-separator class="q-mx-sm" vertical />
                <div class="row items-center text-dark">
                    <q-icon 
                        name="calendar_month" 
                        size="22px" 
                        class="q-mr-xs" 
                    />
                    <span class="text-caption" v-html="date" />
                </div>
            </q-card-actions>
        </q-card>
    </router-link>
</template>

<script lang="ts">
export default {
    name: 'Card',

    props: {
        title: {
            type: String,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        createdAt: {
            type: String,
            default: new Date().toLocaleDateString(),
        },
        language: {
            type: Object,
            default: () => ({}),
        },
        author: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        styleBind() {
            return {
                '--color': this.language.color || 'grey',
            };
        },
        langName() {
            return this.language.name || 'JavaScript';
        },
        username() {
            return this.author.username;
        },
        date() {
            return new Date(this.createdAt).toLocaleDateString();
        },
    },
};
</script>

<style lang="scss" scoped>
.card {
    width: 100%;
    text-decoration: none;

    &:hover {

        .q-card {
            border-color: $primary;
        }
    }

    .language {
        position: relative;
        display: block;

        &:after {
            content: "";
            position: absolute;
            top: 50%;
            left: -10px;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            width: 8px;
            height: 8px;
            background-color: var(--color);
        }
    }

    .title {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .content {
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
</style>