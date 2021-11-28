export const ADD_IMPORTANCE_LIST = (state, list) => {
    state.importanceList = list;
    state.importanceListFlag = true;
};
export const ADD_GEHAT_LIST = (state, list) => {
    state.gehatList = list;
    state.gehatListFlag = true;
};
export const ADD_MURASLAT_GEHAT_LIST = (state, list) => {
    state.muraslatGehatList = list;
    state.muraslatGehatListFlag = true;
};
export const ADD_DEP_LIST = (state, list) => {
    state.depList = list;
    state.depListFlag = true;
};
export const ADD_CONFIDENTIALITY_LIST = (state, list) => {
    state.confidentialityList = list;
    state.confidentialityListFlag = true;
};
export const ADD_CATEGORY_LIST = (state, list) => {
    state.categoryList = list;
    state.categoryListFlag = true;
};
export const ADD_TYPES_LIST = (state, list) => {
    state.typesList = list;
    state.typesListFlag = true;
};
export const ADD_OBJECTIVE_LIST = (state, list) => {
    state.objectiveList = list;
    state.objectiveListFlag = true;
};
export const ADD_ATTACHMENT_TYPE_LIST = (state, list) => {
    state.attachmentTypeList = list;
    state.attachmentTypeListFlag = true;
};

export const ADD_BRANCHES_LIST = (state, list) => {
    state.branchesList = list;
    state.branchesListFlag = true;
};
//const saveCurrentCorrespondence = () => {

// state.currentCorrespondence = correspondence;

//};
//const saveSearchedList = (state, sea) => { state.searchedList = sea; };

// call the api to save data

const setPermissions = (state, payload) => {
    state.permissions = payload;
    console.log("yaay");
    console.log(payload);
};
// By Abdullah 15-08-2021 -------- START
const setPath = (state, payload) => {
    state.path = payload;
};
const setName = (state, payload) => {
    state.name = payload;
    console.log("PayLoad Name: " + state.name)
};
// By Abdullah 15-08-2021 -------- END
export default {
    ADD_BRANCHES_LIST,
    ADD_ATTACHMENT_TYPE_LIST,
    ADD_OBJECTIVE_LIST,
    ADD_TYPES_LIST,
    ADD_CONFIDENTIALITY_LIST,
    ADD_IMPORTANCE_LIST,
    ADD_GEHAT_LIST,
    ADD_DEP_LIST,
    ADD_CATEGORY_LIST,
    //saveSearchedList,
    //saveCurrentCorrespondence,
    setPermissions,
    setPath,// By Abdullah 15-08-2021 -------- 
    setName,// By Abdullah 15-08-2021 -------- 
};