import axios from "axios";
import VueAxios from "vue-axios";
import Vue from 'vue';
//then you use Vuex
Vue.use(VueAxios, axios);


// API header

axios.defaults.headers.common["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.common["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");
//methods to call each the apis and assaign data to each list in savedSingleUserConnections
// saveCurrentCorrespondence to check if empty or not 
const saveCurrentCorrespondence = () => {



    // state.currentCorrespondence = correspondence;
};
const saveSearchedList = (state, sea) => { state.searchedList = sea; };

// call the api to save data
const saveDepList = (state) => {
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

};
const saveGehatList = (state) => {
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
};
const saveImportanceList = (state) => {
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
};
const saveConfidentialityList = (state) => {
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
};
const saveCategoryList = (state) => {
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
};
const saveTypesList = (state) => {

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
};
const saveObjectiveList = (state) => {
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
};
const saveAttachmentTypeList = (state) => {
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
};
const saveAttachmentCategotyList = (state) => {
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
};
const saveBranchesList = (state) => {
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
};
const setPermissions = (state, payload) => {
    state.permissions = payload;
    console.log("yaay");
    console.log(payload);
};

export default {
    saveBranchesList,
    saveAttachmentCategotyList,
    saveAttachmentTypeList,
    saveObjectiveList,
    saveTypesList,
    saveCategoryList,
    saveConfidentialityList,
    saveImportanceList,
    saveGehatList,
    saveDepList,
    saveSearchedList,
    saveCurrentCorrespondence,
    setPermissions,




};