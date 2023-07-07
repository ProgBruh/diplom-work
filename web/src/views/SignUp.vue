<template>
    <div class="sign-up">
        <sign-up-form @submit="submitHandler" />
    </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import SignUpForm from '../components/SignUpForm.vue';
import { useAuthStore } from '../store';
import getRequestError from '../helpers/getRequestError';

interface ISignUpPayload {
    email: string;
    username: string;
    password: string;
}

export default {
    name: 'SignUp',

    components: {
        SignUpForm,
    },

    methods: {
        ...mapActions(useAuthStore, ['signUp']),
        async submitHandler(payload: ISignUpPayload) {
            try {
                await this.signUp(payload);
                this.$q.notify({
                    message: 'Account created successfully',
                    icon: 'done',
                    color: 'green',
                });
                this.$router.push({ path: '/auth/sign-in/' });
            } catch (e) {
                this.$q.notify({
                    message: getRequestError(e),
                    icon: 'error',
                    color: 'red',
                });
                console.error(e);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.sign-up {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>
