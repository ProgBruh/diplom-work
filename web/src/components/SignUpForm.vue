<template>
    <div class="sign-up-form">
        <div class="wrapper row q-mb-md justify-center">
            <q-avatar class="avatar">
                <img src="../assets/images/codelp.png" alt="avatar" />
            </q-avatar>
        </div>
        <div class="form-wrapper q-pa-lg q-mb-sm">
            <q-form
                ref="form"
                class="form"
                greedy
                @submit="submitHandler"
            >
                <q-input
                    v-model="formValues.email"
                    label="Email"
                    class="q-mb-sm"
                    outlined
                    clearable
                    :rules="[val => val && val.length > 0 || 'Required field', (val, rules) => rules.email(val) || 'Incorrect email']"
                >
                    <template v-slot:prepend>
                        <q-icon name="alternate_email" />
                    </template>
                </q-input>
                <q-input
                    v-model="formValues.username"
                    label="Username"
                    class="q-mb-sm"
                    outlined
                    clearable
                    :rules="[val => val && val.length > 0 || 'Required field']"
                >
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>
                <q-input
                    v-model="formValues.password"
                    label="Password"
                    type="password"
                    class="q-mb-sm"
                    outlined
                    clearable
                    :rules="[val => val && val.length > 0 || 'Required field', val => (passwordConfirm ? val === passwordConfirm : true) || 'Password mismatch']"
                >
                    <template v-slot:prepend>
                        <q-icon name="password" />
                    </template>
                </q-input>
                <q-input
                    v-model="passwordConfirm"
                    label="Confirm password"
                    type="password"
                    class="q-mb-sm"
                    outlined
                    clearable
                    :rules="[val => val && val.length > 0 || 'Required field', val => val === formValues.password || 'Password mismatch']"
                >
                    <template v-slot:prepend>
                        <q-icon name="password" />
                    </template>
                </q-input>
                <div class="row justify-between">
                    <q-btn 
                        label="Reset" 
                        type="reset" 
                        color="red" 
                        class="q-mr-sm button"
                        unelevated
                        @click="resetHandler"
                    />
                    <q-btn 
                        label="Submit" 
                        type="submit" 
                        color="primary" 
                        class="button"
                        unelevated
                    />
                </div>
            </q-form>
        </div>
        <span class="helper text-caption text-center">Already have an account? <router-link to="/auth/sign-in/">Sign in</router-link>.</span>
    </div>
</template>

<script lang="ts">
export default {
    name: 'SignUpForm',

    data() {
        return {
            formValues: {
                email: '',
                username: '',
                password: '',
            },
            passwordConfirm: '',
        };
    },

    methods: {
        submitHandler() {
            this.$emit('submit', this.formValues);
            this.resetHandler();
            this.$refs.form.reset();
        },
        resetHandler() {
            this.formValues = {
                email: '',
                username: '',
                password: '',
            };
            this.passwordConfirm = '';
        },
    },
};
</script>

<style lang="scss" scoped>
.sign-up-form {
    
    .avatar {
        border: 1px solid #c2c2c2;
    }

    .form-wrapper {
        border-radius: 8px;
        border: 1px solid #c2c2c2;
    }

    .form {
        width: 350px;
    }

    .button {
        width: calc(50% - 8px);
    }

    .helper {
        display: block;
    }
}
</style>