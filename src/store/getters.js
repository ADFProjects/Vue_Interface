export const getLists =(state) => {

    return state.ApiList;
}
export const employeeList =(state) => {

    return state.employeeList;
}
export const getBarcodevalue =(state) => {

    return state.barcodeValue;
}
export default {
    getLists,
    employeeList,
    getBarcodevalue,

};