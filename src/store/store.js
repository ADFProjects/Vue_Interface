import Vuex from 'vuex';
import Vue from 'vue';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        //JSON OBJ with name of GET methodes in ACTION and ITs FLAG

        barcodeValue: "",
        username: "",
        password: "",
        permissionsApiList: [
            {
                method: "getBranchesList",
                flag: "branchesListFlag",
                name: "",
                loading: "isLoadingBranch"
            }, {
                method: "getDepList",
                flag: "depListFlag",
                name: "departments",
                loading: "isLoadingdepartments"
            },

        ],
        inquireyApiList: [{
            method: "getImportanceList",
            flag: "importanceListFlag",
            name: "importance",
            loading: "isLoadingimportance"
        },
        {
            method: "getDepList",
            flag: "depListFlag",
            name: "departments",
            loading: "isLoadingdepartments"
        },
        {
            method: "getGehatList",
            flag: "gehatListFlag",
            name: "entities",
            loading: "isLoadingentities"
        },
        {
            method: "getConfidentialityList",
            flag: "confidentialityListFlag",
            name: "confidentiality",
            loading: "isLoadingconfidentiality"
        },
        {
            method: "getTypesList",
            flag: "typesListFlag",
            name: "correspondenceType",
            loading: "isLoadingcorrespondenceType"
        },
        {
            method: "getObjectiveList",
            flag: "objectiveListFlag",
            name: "objectiveClass",
            loading: "isLoadingobjectiveClass"
        },],
        ApiList: [
            {
                method: "getImportanceList",
                flag: "importanceListFlag",
                name: "importance",
                loading: "isLoadingimportance"
            },
            {
                method: "getDepList",
                flag: "depListFlag",
                name: "departments",
                loading: "isLoadingdepartments"
            },
            {
                method: "getGehatList",
                flag: "gehatListFlag",
                name: "entities",
                loading: "isLoadingentities"
            },
            {
                method: "getMuraslatGehatList",
                flag: "muraslatGehatListFlag",
                name: "entitiesM",
                loading: "isLoadingentitiesM"
            },
            {
                method: "getConfidentialityList",
                flag: "confidentialityListFlag",
                name: "confidentiality",
                loading: "isLoadingconfidentiality"
            },
            {
                method: "getCategoryList",
                flag: "categoryListFlag",
                name: "category",
                loading: "isLoadingcategory"
            },
            {
                method: "getTypesList",
                flag: "typesListFlag",
                name: "correspondenceType",
                loading: "isLoadingcorrespondenceType"
            },
            {
                method: "getObjectiveList",
                flag: "objectiveListFlag",
                name: "objectiveClass",
                loading: "isLoadingobjectiveClass"
            },
            {
                method: "getAttachmentTypeList",
                flag: "attachmentTypeListFlag",
                name: "attatchmentType",
                loading: "isLoadingattatchmentType"
            },
            {
                method: "getAttachmentCategotyList",
                flag: "attachmentCategotyListFlag",
                name: "attatchmentCategory",
                loading: "isLoadingattatchmentCategory"
            },
        ],
        reSend: {},
        currentCorrespondence: {},
        searchedList: [],
        permissions: null,
        path: null,// By Abdullah 15-08-2021 -------- 
        name: null,// By Abdullah 15-08-2021 -------- 
        //Lists
        employeeList: [],
        importanceList: [],
        depList: [],
        gehatList: [],
        muraslatGehatList: [],
        confidentialityList: [],
        categoryList: [],
        typesList: [],
        objectiveList: [],
        attachmentTypeList: [],
        attachmentCategotyList: [],
        branchesList: [],
        officesList: [],
        sectionsList: [],
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