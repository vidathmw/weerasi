<template>
    <div>
        <div id="firebaseui-auth-container"></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { fireAuth, authProviders } from '~/plugins/firebase'
export default {
    data() {
        return {
            email: '',
            password: '',
            fullPage: true
        }
    },

    computed: {
        // map `this.user` to `this.$store.getters.user`
        ...mapGetters({
            user: 'user'
        })
    },
    mounted() {
        if (process.browser) {
            const firebaseui = require('firebaseui')
            const ui =
                firebaseui.auth.AuthUI.getInstance() ||
                new firebaseui.auth.AuthUI(fireAuth)
            const config = {
                credentialHelper: firebaseui.auth.CredentialHelper.NONE,
                signInOptions: [authProviders.Google, authProviders.Email],
                signInFlow: 'popup',
                tosUrl: '/tos',
                privacyPolicyUrl: '/privacy-policy',
                callbacks: {
                    signInSuccessWithAuthResult: this.loggedInRedirect
                }
            }
            ui.disableAutoSignIn()
            if (this.$store.state.user.loggedIn) {
                this.loggedInRedirect()
            } else {
                ui.start('#firebaseui-auth-container', config)
            }
        }
    },
    methods: {
        loggedInRedirect() {
            this.$router.push({
                path: '/'
            })
        }
    }
}
</script>
<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>
