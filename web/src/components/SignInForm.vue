<template>
    <div class="sign-in-form">
        <div class="form-wrapper q-pa-lg q-mb-sm">
            <q-form
                ref="form"
                class="form" 
                greedy
                @submit="submitHandler"
            >
                <q-input
                    v-model="formValues.identifier"
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
                    v-model="formValues.password"
                    label="Password"
                    type="password"
                    class="q-mb-sm"
                    outlined
                    clearable
                    :rules="[val => val && val.length > 0 || 'Required field']"
                >
                    <template v-slot:prepend>
                        <q-icon name="password" />
                    </template>
                </q-input>
                <div class="row">
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
        <span class="helper text-caption text-center">No account? <router-link to="/auth/sign-up/">Sign up</router-link>.</span>
    </div>
</template>

<script lang="ts">
export default {
    name: 'SignInForm',

    data() {
        return {
            formValues: {
                identifier: '',
                password: '',
            },
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
                identifier: '',
                password: '',
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.sign-in-form {

    .form-wrapper {
        border-radius: 8px;
        border: 1px solid #c2c2c2;
    }

    .form {
        width: 350px;
    }

    .row {
        justify-content: space-between;
    }

    .button {
        width: calc(50% - 8px);
    }

    .helper {
        display: block;
    }
}
</style>