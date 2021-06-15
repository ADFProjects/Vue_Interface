<template>
  <v-app>
    <navbar />
    <router-view />
  </v-app>
</template>

<script>
import Vue from "vue";

import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

axios.defaults.headers.common["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.common["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests

export default {
  components: {},
  name: "App",

  data: () => ({
    body: "userName=Kfq9py7dk6PhoBgGQCQCZQ%3d%3d&password=9%2bFkJtsldJo5Q9OLbcxeeXeMUv%2bDReAIS3phB2VGxkw%3d#/&grant_type=password",
    requestBody: "",
    username: "",
    password: "",
    refreshRequestBody: "grant_type=refresh_token& refresh_token=",
  }),
  mounted() {
    // get url, substring
    var url ="https://intgr.adf.gov.sa/?CU=60D1dGxvi2wYkCIo5zkRSw%3d%3d&P=Is3eACCBzoC0bvcV4uPsnhNAS3NP5bGC1gx3JT5PMF4%3d#";
    
    //window.location.href;
    this.username = url.substring(url.indexOf("CU=") + 3, url.indexOf("&P="));
    this.password = url.substring(url.indexOf("&P=") + 3);
    this.requestBody =
      " userName=" +
      this.username +
      "&password=" +
      this.password +
      "&grant_type=password";
    // get token request

    Vue.axios
      .post("https://emp.adf.gov.sa/cms7514254/api/cmstoken", this.requestBody)
      .then((resp) => {
        localStorage.setItem("token", resp.data.access_token);
        localStorage.setItem("expired", new Date(resp.data[".expires"]));
        localStorage.setItem("refresh", resp.data.refresh_token);
        console.log(resp.data.access_token);
      })
      .then(() => {
        this.getLoginUserFunction();
      });
    // get permissions
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
  },
  methods: {
    getLoginUserFunction() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      Vue.axios
        .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetLoginUser")
        .then((resp) => {
          localStorage.setItem("permissions", resp.data.Permissions);
          localStorage.setItem("username", resp.data.EmployeeUserName);
        })
        .then(() => {
          this.refreshToken(localStorage.getItem("expired"));
        })
        .catch((error) => {
          console.log(
            "Error ===>>> App.vue ______ getLoginUserFunction _______Error: " +
              error
          );
        });
    },
    refreshToken(date) {
      const today = new Date();
      const exp = new Date(date);
      if (today >= exp) {
        //refresh the token
        Vue.axios
          .post(
            "https://emp.adf.gov.sa/cms7514254/api/cmstoken",
            this.refreshRequestBody + localStorage.getItem("refresh")
          )
          .then((resp) => {
            localStorage.setItem("token", resp.data.access_token);
            localStorage.setItem("expired", new Date(resp.data[".expires"]));
            localStorage.setItem("refresh", resp.data.refresh_token);
            console.log("done refresh");
            console.log(resp.data.access_token);
          });
      }
    },
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Almarai:wght@300;400&display=swap");

$font-family: "Almarai", sans-serif;
.my-application {
  .headline,
  [class*="display-"],
  [class*="text-"] {
    color: #202020;
    font-family: $font-family, sans-serif !important;
    font-size: 16px !important;
  }
  font-family: $font-family, sans-serif !important;
}
</style>