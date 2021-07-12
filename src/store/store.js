//you need to import both vue and vuex, as both are used here
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
//then you use Vuex
Vue.use(Vuex);
Vue.use(VueAxios, axios);




// API header

axios.defaults.headers.common["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.common["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");

    /**
     *             depList: [],
            gehatList: [],
            importanceList: [],
            confidentialityList: [],
            categoryList: [],
            typesList: [],
            objectiveList: [],
            attachmentTypeList: [],
            attachmentCategotyList: [],
     */

export default new Vuex.Store({
    state: {
        savedData: {

        },
        currentCorrespondence: {},
        branchesList: [],
        searchedList: [],
    },
    mutations: {
        //methods to call each the apis and assaign data to each list in savedSingleUserConnections
        // saveCurrentCorrespondence to check if empty or not 
        saveCurrentCorrespondence: () => {



            // state.currentCorrespondence = correspondence;
        },
        saveSearchedList: (state, sea) => { state.searchedList = sea; },

        // call the api to save data
        saveDepList: (state) => {
            Vue.axios
                .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetDept?DeptType=1")
                .then((resp) => {
                    state.savedData.depList = resp.data;
                }).catch((error) => {
                    console.log(
                        "Error ===>>> Store.js ______ saveDepList _______Error: " +
                        error
                    );
                });

        },
        saveGehatList: (state) => {
            Vue.axios
                .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=80")
                .then((resp) => {
                    state.savedData.gehatList = resp.data;
                }).catch((error) => {
                    console.log(
                        "Error ===>>> Store.js ______ saveGehatList _______Error: " +
                        error
                    );
                });
        },
        saveImportanceList: (state) => {
            Vue.axios
                .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=4")
                .then((resp) => {
                    state.savedData.importanceList = resp.data;
                }).catch((error) => {
                    console.log(
                        "Error ===>>> Store.js ______ saveImportanceList _______Error: " +
                        error
                    );
                });
        },
        saveConfidentialityList: (state) => {
            Vue.axios
                .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=3")
                .then((resp) => {
                    state.savedData.confidentialityList = resp.data;
                }).catch((error) => {
                    console.log(
                        "Error ===>>> Store.js ______ saveConfidentialityList _______Error: " +
                        error
                    );
                });
        },
        saveCategoryList: (state) => {
            Vue.axios
                .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=2")
                .then((resp) => {
                    state.savedData.categoryList = resp.data; // copy or origin
                }).catch((error) => {
                    console.log(
                        "Error ===>>> Store.js ______ saveCategoryList _______Error: " +
                        error
                    );
                });
        },
        saveTypesList: (state) => {

            Vue.axios
                .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=11")
                .then((resp) => {
                    state.savedData.typesList = resp.data;
                }).catch((error) => {
                    console.log(
                        "Error ===>>> Store.js ______ saveTypesList _______Error: " +
                        error
                    );
                });
        },
        saveObjectiveList: (state) => {
            Vue.axios
                .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=1")
                .then((resp) => {
                    state.savedData.objectiveList = resp.data;
                }).catch((error) => {
                    console.log(
                        "Error ===>>> Store.js ______ saveObjectiveList _______Error: " +
                        error
                    );
                });
        },
        saveAttachmentTypeList: (state) => {
            Vue.axios
                .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=6")
                .then((resp) => {
                    state.savedData.attachmentTypeList = resp.data;
                }).catch((error) => {
                    console.log(
                        "Error ===>>> Store.js ______ saveAttachmentTypeList _______Error: " +
                        error
                    );
                });
        },
        saveAttachmentCategotyList: (state) => {
            Vue.axios
                .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=12")
                .then((resp) => {
                    state.savedData.attachmentCategotyList = resp.data;
                }).catch((error) => {
                    console.log(
                        "Error ===>>> Store.js ______ saveAttachmentCategotyList _______Error: " +
                        error
                    );
                });
        },
        saveBranchesList: (state) => {
            Vue.axios
                .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetBranches")
                .then((resp) => {
                    state.savedData.branchesList = resp.data;
                }).catch((error) => {
                    console.log(
                        "Error ===>>> Store.js ______ saveBranchesList _______Error: " +
                        error
                    );
                });
        },

    },
    getters: {
        getLists: state => {
            console.log("insiide get List");

                // if there is no data, trigger the apis
                state.commit('saveDepList');
                state.commit('saveGehatList');
                state.commit('saveImportanceList');
                state.commit('saveConfidentialityList');
                state.commit('saveCategoryList');
                state.commit('saveTypesList');
                state.commit('saveObjectiveList');
                state.commit('saveAttachmentTypeList');
                state.commit('saveAttachmentCategotyList');
                state.commit('saveBranchesList');
            


            return state.savedData;
        },
    }

},





);