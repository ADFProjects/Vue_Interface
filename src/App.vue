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
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"; // for POST requests

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
    //https://intgr.adf.gov.sa/?CU=cGkAgwMNgCAhkKDXwCoytV8Oi5vjgYlQrx52NfDGLhE%3d&P=uN04nbwO3rbuTivxBYeGVVima7vyE5Ihbn5FPFV6hoc%3d#/
    // get url, substring
    var url = window.location.href;
    //"https://intgr.adf.gov.sa/?CU=cGkAgwMNgCAhkKDXwCoytV8Oi5vjgYlQrx52NfDGLhE%3d&P=uN04nbwO3rbuTivxBYeGVVima7vyE5Ihbn5FPFV6hoc%3d#/";

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
    localStorage.setItem(
      "token",
      "85rC41LAUtzXEvFh1gjmYGX2uoL65TkOu35rGbcaBW0LYBthwfqiz_M03gdnV6cEE1KSarSIpqe-bEo2Tbu5Hj_jvjagiN5KjSw1k2TSysi4Ipro10A9Mfot8QBL0oLYn_y1cmLx8yeT3rphHIxTvZu9K-eQlvnQAzWJiNm0-gfITr8q_027uf8Hxs47vG3M7w-8PgJ0RjryI8doLx95nkz7_TchMB98AlqoMDw-v37dWuGYDHQYR-NIldi6P_Qb92uT1bk-CP48Wx4Nh5SWYQqFglhO96Lwd_Pd8ucVGf4yXaWs8wdVP0pqE_cowFs01FX_LXuJO0AQ_bgq00rSOkBDVTunN-LmDM_GzivXYS88bTO-YkwFqyXslnpyKGtsHfdwp2SHks1i0HnaDrRTPlsNMoQ7r-ngMGzSdaEXAjA"
    );
    this.getLoginUserFunction();
  },
  methods: {
    getUserPermissions(p) {
      var list = [];

      if (p != null && p.localeCompare("") != 0) {
        if (p.search("10A") != -1) {
          list.push(1);
        }
        if (p.search("11A") != -1) {
          list.push(2);
        }
        if (p.search("13S") != -1) {
          list.push(3);
        }
        if (p.search("12S") != -1) {
          list.push(4);
        }
        if (p.search("15S") != -1) {
          list.push(5);
        }
        if (p.search("9") != -1) {
          list.push(6);
        }
        //add permissions to store
      } else {
        // not authorized
        // route to alert page
      }
      this.$store.commit("setPermissions", list);
    },
    getLoginUserFunction() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      Vue.axios
        .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetLoginUser")
        .then((resp) => {
          localStorage.setItem("permissions", resp.data.Permissions);
          localStorage.setItem("username", resp.data.EmployeeUserName);

          var savedPermissions = this.$store.state.permissions;
          if (!savedPermissions) {
            this.getUserPermissions(resp.data.Permissions);
          }

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
@font-face {
  font-family: "Almarai";
  src: url("assets/fonts/Almarai-Regular.eot");
  src: url("~@/assets/fonts/Almarai-Regular.eot?#iefix")
      format("embedded-opentype"),
    url("~@/assets/fonts/Almarai-Regular.woff2") format("font-woff2"),
    url("~@/assets/fonts/Almarai-Regular.woff") format("font-woff"),
    url("~@/assets/fonts/Almarai-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Almarai";
  src: url("~@/assets/fonts/Almarai-Bold.eot");
  src: url("~@/assets/fonts/Almarai-Bold.eot?#iefix")
      format("embedded-opentype"),
    url("~@/assets/fonts/Almarai-Bold.woff2") format("font-woff2"),
    url("~@/assets/fonts/Almarai-Bold.woff") format("font-woff"),
    url("~@/assets/fonts/Almarai-Bold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

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