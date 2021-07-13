import Vuex from 'vuex';
import Vue from 'vue';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        savedData: {},
        currentCorrespondence: {},
        branchesList: [],
        searchedList: [],
        permissions: null,

    },
    actions,
    getters,
    mutations,
});