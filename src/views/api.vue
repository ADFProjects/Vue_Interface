<template>
  <div></div>
</template>
<script>
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";

Vue.use(VueAxios, axios);

axios.defaults.headers.common["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.common["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests

axios.defaults.headers.get["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.get["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests
export default {
  data: function () {
    return {
      objectiveClass: [],
      test: {
        SourceType: 3, //        MursalatIn = 1,        MursalatOut = 2,        AdfIn = 3,        AdfOut = 4,
        RequesterDept: "",
        RequesterUser: "", //"mohamed.fawzy"
        SenderType: "", // GOVT , البريد السعودي ؟؟؟
        pageindex: 0,
        pageSize: 100,
      },
      searchRequestBody: {
        RepType: 0,
        SourceType: 0, // should the search would be on all the types?
        query: "",
        IncidentNumber: "",
        RelatedID: "", // nid
        start: "",
        end: "",
        status: 0,
        RelatedName: "",
        RelatedEmail: "",
        RelatedPhone: "",
        Subject: "",
        Dept: "",
        Geha: "",
        ImportanceVal: "",
        ConfidentialVal: "",
        IOboundType: "",
        IOboundClassification: "",
        pageindex: 0,
        pageSize: 100,
      },
      rules:{
                counterTitle: (value) => value.length <= 240,
        counterDescription: (value) => value.length <= 500,
        nId: (v) => {
          if (v.length > 0) {
            return v.length == 10 || "رقم الهوية غير صحيح";
          }
        },
        mobileNum: (v) => {
          if (v.length > 0 && v.length != 10) {
            return "رقم غير صحيح";
          }
        },
        mobileNum2: (v) => {
          if (v.length > 0 && v.charAt(0) != "0") {
            return "رقم غير صحيح";
          }
        },
        email: (value) => {
          if (value.length > 0) {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "البريد الإلكتروني غير صحيح";
          }
        },
      }
    };
  },
  mounted() {
    Vue.axios
      .get(
        "https://emp.adf.gov.sa/cms7514254/api/cms/Search",
        this.test
      )
      .then((resp) => {
        console.log(resp.data);
        // go to main page
      });
  },
  methods: {
    search() {
      Vue.axios
        .get("https://emp.adf.gov.sa/cms7514254/api/cms/Search", this.test)
        .then((resp) => {
          this.objectiveClass = resp.data;
          console.log(resp.data);
        });
    },
  },
};
</script>