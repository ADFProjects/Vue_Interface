import axios from "axios";

// API header

axios.defaults.headers.common["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.common["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");


// API url as Const
const lookupsUrl = "https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=";
const baseUrl = "https://emp.adf.gov.sa/cms7514254/api/cms/";

// APIs GET LIST ------- START
export const getImportanceList = ({ commit }) => {
    axios.get(lookupsUrl + "4")
        .then((resp) => {
            commit('ADD_IMPORTANCE_LIST', resp.data);
        }).catch((error) => {
            console.log(
                "Error ===>>> Store.js ______ getImportanceList _______Error: " +
                error
            );
        });

}
export const getDepList = ({ commit }) => {
    axios.get(baseUrl + "GetDept?DeptType=1")
        .then((resp) => {
            commit('ADD_DEP_LIST', resp.data);
        }).catch((error) => {
            console.log(
                "Error ===>>> Store.js ______ getDepList _______Error: " +
                error
            );
        });

}
export const getGehatList = ({ commit }) => {
    axios.get(lookupsUrl + "80")
        .then((resp) => {
            commit('ADD_GEHAT_LIST', resp.data);
        }).catch((error) => {
            console.log(
                "Error ===>>> Store.js ______ getGehatList _______Error: " +
                error
            );
        });

}
export const getMuraslatGehatList = ({ commit }) => {
    axios.get(lookupsUrl + "13")
        .then((resp) => {
            commit('ADD_MURASLAT_GEHAT_LIST', resp.data);
        }).catch((error) => {
            console.log(
                "Error ===>>> Store.js ______ getMuraslatGehatList _______Error: " +
                error
            );
        });

}
export const getConfidentialityList = ({ commit }) => {
    axios.get(lookupsUrl + "3")
        .then((resp) => {
            commit('ADD_CONFIDENTIALITY_LIST', resp.data);
        }).catch((error) => {
            console.log(
                "Error ===>>> Store.js ______ getConfidentialityList _______Error: " +
                error
            );
        });

}
export const getCategoryList = ({ commit }) => {
    axios.get(lookupsUrl + "2")
        .then((resp) => {
            commit('ADD_CATEGORY_LIST', resp.data);
        }).catch((error) => {
            console.log(
                "Error ===>>> Store.js ______ getCategoryList _______Error: " +
                error
            );
        });

}
export const getTypesList = ({ commit }) => {
    axios.get(lookupsUrl + "11")
        .then((resp) => {
            commit('ADD_TYPES_LIST', resp.data);
        }).catch((error) => {
            console.log(
                "Error ===>>> Store.js ______ TypesList _______Error: " +
                error
            );
        });

}
export const getObjectiveList = ({ commit }) => {
    axios.get(lookupsUrl + "1")
        .then((resp) => {
            commit('ADD_OBJECTIVE_LIST', resp.data);
        }).catch((error) => {
            console.log(
                "Error ===>>> Store.js ______ ObjectiveList _______Error: " +
                error
            );
        });

}
export const getAttachmentTypeList = ({ commit }) => {
    axios.get(lookupsUrl + "6")
        .then((resp) => {
            commit('ADD_ATTACHMENT_TYPE_LIST', resp.data);
        }).catch((error) => {
            console.log(
                "Error ===>>> Store.js ______ getAttachmentTypeList _______Error: " +
                error
            );
        });

}
export const getAttachmentCategotyList = ({ commit }) => {
    axios.get(lookupsUrl + "12")
        .then((resp) => {
            commit('ADD_ATTACHMENT_CATEGORY_LIST', resp.data);
        }).catch((error) => {
            console.log(
                "Error ===>>> Store.js ______ getAttachmentCategotyList _______Error: " +
                error
            );
        });

}
export const getBranchesList = ({ commit }) => {
    axios.get(baseUrl + "GetBranches")
        .then((resp) => {
            commit('ADD_BRANCHES_LIST', resp.data);
        }).catch((error) => {
            console.log(
                "Error ===>>> Store.js ______ getBranchesList _______Error: " +
                error
            );
        });

}
// APIs GET LIST ------- END

// APIs POST LIST ------- END
export const getOfficesList = ({ commit }, id) => {
    axios.post(baseUrl + "GetOffices", {
        DebId: id
    })
        .then((resp) => {
            commit('ADD_OFFICE_LIST', resp.data);
        }).catch((error) => {
            console.log(
                "Error ===>>> Store.js ______ getOfficesList _______Error: " +
                error
            );
        });

}
export const getSectionsList = ({ commit }, id) => {
    axios.post(baseUrl + "GetSectionsByDeprtmentId", {
        DebId: id,
    })
        .then((resp) => {
            commit('ADD_SECTIONS_LIST', resp.data);
        }).catch((error) => {
            console.log(
                "Error ===>>> Store.js ______ getSectionsList _______Error: " +
                error
            );
        });

}
export const getEmployeeList = ({ commit }, depId, secId) => {
    axios.post(baseUrl + "GetEmployeePermission", {
        DebId: depId,
        SectionId: secId,
    })
        .then((resp) => {
            commit('ADD_EMPLOYEE_LIST', resp.data);
        }).catch((error) => {
            console.log(
                "Error ===>>> Store.js ______ getEmployeeList _______Error: " +
                error
            );
        });

}
export default {
    getEmployeeList,
    getSectionsList,
    getOfficesList,
    getBranchesList,
    getAttachmentCategotyList,
    getAttachmentTypeList,
    getObjectiveList,
    getTypesList,
    getCategoryList,
    getConfidentialityList,
    getMuraslatGehatList,
    getGehatList,
    getDepList,
    getImportanceList
};