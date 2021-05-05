import axios from "axios";
// Remember to change the baseURL, it depends on REST APIs url that your Server configures.
export default axios.create({
  //http://adf-testintgr01/EGPortalApi/api/FileManager/UploadFile?k=cms
  baseURL: "https://emp.adf.gov.sa/cms7514254/api/FileManager/",
  headers: {
    "Content-type": "application/json"
  }
});