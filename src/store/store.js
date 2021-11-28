import Vuex from 'vuex';
import Vue from 'vue';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        //JSON OBJ with name of GET methodes in ACTION and ITs FLAG
        ApiList: [
            {
                method: "getImportanceList",
                flag: "importanceListFlag",
                name: "importance"
            },
            {
                method: "getDepList",
                flag: "depListFlag",
                name: "departments"
            },
            {
                method: "getGehatList",
                flag: "gehatListFlag",
                name: "entities"
            },
            {
                method: "getMuraslatGehatList",
                flag: "muraslatGehatListFlag",
                name: "entitiesM"
            },
            {
                method: "getConfidentialityList",
                flag: "confidentialityListFlag",
                name: "confidentiality"
            },
            {
                method: "getCategoryList",
                flag: "categoryListFlag",
                name: "category"
            },
            {
                method: "getTypesList",
                flag: "typesListFlag",
                name: "correspondenceType"
            },
            {
                method: "getObjectiveList",
                flag: "objectiveListFlag",
                name: "objectiveClass"
            },
            {
                method: "getAttachmentTypeList",
                flag: "attachmentTypeListFlag",
                name: "attatchmentType"
            },
            {
                method: "getAttachmentCategotyList",
                flag: "attachmentCategotyListFlag",
                name: "attatchmentCategory"
            },
           /* {
                method: "getBranchesList",
                flag: "branchesListFlag",
                name: ""
            },*/
        ],
        currentCorrespondence: {},
        searchedList: [],
        permissions: null,
        path: null,// By Abdullah 15-08-2021 -------- 
        name: null,// By Abdullah 15-08-2021 -------- 
        //Lists
        importanceList: {},
        depList: {},
        gehatList: {},
        muraslatGehatList: {},
        confidentialityList: {},
        categoryList: {},
        typesList: {},
        objectiveList: {},
        attachmentTypeList: {},
        attachmentCategotyList: {},
        branchesList: {},
        //Lists Flag
        importanceListFlag: false,
        depListFlag: false,
        gehatListFlag: false,
        muraslatGehatListFlag: false,
        confidentialityListFlag: false,
        categoryListFlag: false,
        typesListFlag: false,
        objectiveListFlag: false,
        attachmentTypeListFlag: false,
        attachmentCategotyListFlag: false,
        branchesListFlag: false,




    },
    actions,
    getters,
    mutations,
});