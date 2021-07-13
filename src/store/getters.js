const getLists =state => {
    console.log("insiide get List");

    // if there is no data, trigger the apis
   /* state.commit('saveDepList');
    state.commit('saveGehatList');
    state.commit('saveImportanceList');
    state.commit('saveConfidentialityList');
    state.commit('saveCategoryList');
    state.commit('saveTypesList');
    state.commit('saveObjectiveList');
    state.commit('saveAttachmentTypeList');
    state.commit('saveAttachmentCategotyList');
    state.commit('saveBranchesList');
*/

    return state.savedData;
}
const prop1 = state =>  state.savedData;

export default {
    getLists,
    prop1


};