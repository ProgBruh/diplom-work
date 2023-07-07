<template>
    <div class="sign-in">
        <sign-in-form @submit="submitHandler" />
    </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import SignInForm from '../components/SignInForm.vue';
import { useAuthStore } from '../store';
import getRequestError from '../helpers/getRequestError';

interface ISignInPayload {
    identifier: string;
    password: string;
}

export default {
    name: 'SignIn',

    components: {
        SignInForm,
    },

    methods: {
        ...mapActions(useAuthStore, ['signIn']),
         async submitHandler(formValues: ISignInPayload) {
            try {
                await this.signIn(formValues);
                this.$q.notify({
                        message: 'You have successfully logged in',
                        icon: 'done',
                        color: 'green',
                    });
                await this.$router.push({ path: '/' })
            } catch (e) {
                this.$q.notify({
                    message: getRequestError(e),
                    icon: 'error',
                    color: 'red',
                });
                console.error(e);
            }
         },
    },
};
</script>

<style lang="scss" scoped>
.sign-in {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>