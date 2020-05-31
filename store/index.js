import { fireAuth } from '@/plugins/firebase.js'
export const strict = false
export const state = () => ({
    user: {
        loggedIn: false,
        data: null
    }
})

export const getters = {
    user(state) {
        return state.user
    },

    isAuthenticated(state) {
        return state.user.loggedIn
    }
}

export const mutations = {
    SET_LOGGED_IN(state, value) {
        state.user.loggedIn = value
    },
    SET_USER(state, data) {
        state.user.data = data
    }
}

export const actions = {
    fetchUser({ commit }, user) {
        commit('SET_LOGGED_IN', user !== null)
        if (user) {
            commit('SET_USER', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                emailVerified: user.emailVerified,
                phoneNumber: user.phoneNumber,
                isAnonymous: user.isAnonymous
            })
        } else {
            commit('SET_USER', null)
        }
    },
    signOut({ commit }) {
        fireAuth
            .signOut()
            .then(() => {
                commit('SET_USER', null)
                commit('SET_LOGGED_IN', false)
            })
            .catch((err) => alert(err))
    }
}
