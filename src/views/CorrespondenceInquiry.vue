<template>
  <div id="app" class="d-flex justify-center">
    <v-app id="inspire">
      <v-main>
        <v-container>
          <v-app-bar
            style="border-radius: 4px; opacity: 0.9 !important"
            width="1160"
            color="#28714e"
            dark
            class="mb-1"
          >
            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-img
                  v-on="on"
                  src="~@/assets/Search-adf.png"
                  alt="InboundImage"
                  max-height="100"
                  max-width="40"
                ></v-img>
              </template>
              <span>الإستعلام عن المعاملة</span>
            </v-tooltip>
            <div>
              <p
                class="my-10 font-weight-medium"
                style="
                  font-size: 20px;
                  color: #e6e6e6;
                  margin: 15px;
                  margin-left: 8px;
                "
              >
                إستعلام
              </p>
            </div>

            <p
              class="my-10 font-weight-medium"
              style="opacity: 0.6 !important; font-size: 19px; padding-top: 1px"
            >
              المعاملات الواردة والصادرة
            </p>
          </v-app-bar>
          <v-card>
            <v-form>
              <loading
                :active="isLoading"
                :is-full-page="fullPage"
                :loader="waitingLoader"
              />
              <v-container>
                <v-card>
                  <v-card-title class="grey--text text--darken-2">
                    نوع الاستعلام :</v-card-title
                  >
                  <v-container>
                    <v-radio-group
                      v-model="type"
                      @change="types($event)"
                      required
                    >
                      <v-row>
                        <v-col v-for="n in sendway" :key="n">
                          <v-radio
                            :label="n"
                            :value="n"
                            color="#28714e"
                          ></v-radio>
                        </v-col>
                      </v-row>
                    </v-radio-group>
                  </v-container>
                </v-card>
              </v-container>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      color="#28714e"
                      label="الإسم"
                      v-model="ename"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      color="#28714e"
                      type="number"
                      class="inputNumber"
                      label="رقم الجوال"
                      :rules="rules.mobileNum"
                      placeholder="05xxxxxxxx"
                      v-model="phone"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      color="#28714e"
                      type="number"
                      class="inputNumber"
                      label="رقم الهوية الوطنية"
                      v-model="nid"
                      :rules="rules.nId"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      color="#28714e"
                      label="البريد الإلكتروني"
                      v-model="email"
                      :rules="rules.email"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      color="#28714e"
                      type="number"
                      class="inputNumber"
                      label="رقم المعاملة"
                      v-model="id"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      color="#28714e"
                      label="الموضوع"
                      v-model="title"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingdepartments"
                      :items="departments"
                      item-text="GehaName"
                      label="اسم الإدارة"
                      v-model="selectedDep"
                      outlined
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingentities"
                      :items="entities"
                      item-text="Name"
                      label="اسم الجهة"
                      v-model="selectedEnti"
                      outlined
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingcorrespondenceType"
                      :items="correspondenceType"
                      item-text="Name"
                      label="نوع الخطاب"
                      v-model="selectedtype"
                      outlined
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingobjectiveClass"
                      :items="objectiveClass"
                      item-text="Name"
                      label="التصنيف الموضوعي"
                      v-model="selectedObj"
                      outlined
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingimportance"
                      :items="importance"
                      item-text="Name"
                      label="درجة الأهمية"
                      v-model="selectedImp"
                      outlined
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingconfidentiality"
                      :items="confidentiality"
                      item-text="Name"
                      label="درجة السرية"
                      v-model="selectedConf"
                      outlined
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    color="#28714e"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        color="#28714e"
                        v-model="dateRangeText"
                        label="الفترة الزمنية"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      color="#28714e"
                      v-model="dates"
                      style="opacity: 0.9 !important"
                      range
                      locale="ar"
                    ></v-date-picker>
                  </v-menu>
                </v-row>
              </v-container>
              <v-container>
                <div class="text-center">
                  <v-btn
                    rounded
                    style="opacity: 0.9 !important"
                    color="#28714e"
                    dark
                    large
                    @click="isValid"
                    width="200"
                  >
                    <router-link :to="to">
                      <h5 class="my-10" style="color: white">بحث</h5>
                    </router-link>
                  </v-btn>
                </div>
              </v-container>
            </v-form>
            <v-overlay :value="overlay">
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>
            </v-overlay>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
//import uq from "@umalqura/core";
import VueSimpleAlert from "vue-simple-alert";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.use(VueSimpleAlert, { reverseButtons: true });

//const d = uq();
//const today = d.format("yyyy-MM-dd", "en");
const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

Vue.use(VueAxios, axios);
axios.defaults.headers.common["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.common["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default {
  components: {
    Loading,
  },
  data: function () {
    return {
      permission: "",
      end: "",
      start: "",
      type: null,
      sendway: ["وارد", "صادر"],
      fullPage: true,
      overlay: false,
      isLoading: false,
      waitingLoader: "bars",
      to: "",
      response: "",
      items: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      menu: "",
      date: "",
      objectiveClass: [],
      entities: [],
      confidentiality: [],
      importance: [],
      correspondenceType: [],
      departments: [],
      dates: [],
      selectedConf: "",
      selectedImp: "",
      selectedObj: "",
      selectedtype: "",
      selectedEnti: "",
      selectedDep: "",
      title: "",
      ename: "",
      id: "",
      nid: "",
      phone: "",
      email: "",
      today: new Date().toISOString().substr(0, 10),
      searchRequestBody: {
        RepType: 0,
        SourceType: 4,
        query: null,
        IncidentNumber: 0,
        RelatedID: null,
        start: null,
        end: null,
        status: 0,
        RelatedName: null,
        RelatedEmail: null,
        RelatedPhone: null,
        Subject: null,
        Dept: null,
        Geha: "صندوق",
        ImportanceVal: null,
        ConfidentialVal: null,
        IOboundType: null,
        IOboundClassification: null,
        pageindex: 0,
        pageSize: 100,
      },
      isLoadingobjectiveClass: true,
      isLoadingentities: true,
      isLoadingconfidentiality: true,
      isLoadingimportance: true,
      isLoadingcorrespondenceType: true,
      isLoadingdepartments: true,
      rules: {
        required: [(value) => !!value || "مطلوب"],
        counterTitle: [(value) => value.length > 0 && value.length <= 240],
        counterDescription: [(value) => value.length <= 500],
        nId: [
          (v) =>
            v.length > 0 && v.length != 10 ? "رقم الهوية غير صحيح" : true,
        ],
        mobileNum: [
          (v) =>
            v.length > 0 && v.charAt(0) != "0" ? "رقم الجوال غير صحيح" : true,
          (v) =>
            v.length > 0 && v.length != 10 ? "رقم الجوال غير صحيح" : true,
        ],
        email: [
          (v) =>
            !pattern.test(v) && v.length > 0
              ? "البريد الإلكتروني غير صحيح"
              : true,
        ],
      },
    };
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
  mounted() {
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=1")
      .then((resp) => {
        this.objectiveClass = resp.data;
        this.isLoadingobjectiveClass = false;
      });
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=3")
      .then((resp) => {
        this.confidentiality = resp.data;
        this.isLoadingconfidentiality = false;
      });
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=80")
      .then((resp) => {
        this.entities = resp.data;
        this.isLoadingentities = false;
      });
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=4")
      .then((resp) => {
        this.importance = resp.data;
        this.isLoadingimportance = false;
      });
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetDept?DeptType=1")
      .then((resp) => {
        this.departments = resp.data;
        this.isLoadingdepartments = false;
      });
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=11")
      .then((resp) => {
        this.correspondenceType = resp.data;
        this.isLoadingcorrespondenceType = false;
      });

    if (this.permissions("13S") && this.permissions("12S")) {
      this.sendway = ["وارد", "صادر"];
    } else if (this.permissions("13S")) {
      this.sendway = ["صادر"];
      this.type = this.sendway[0];
    } else if (this.permissions("12S")) {
      this.sendway = ["وارد"];
      this.type = this.sendway[0];
    }
  },
  methods: {
    permissions(p) {
      if (p.localeCompare("") == 0) {
        return true;
      } else if (localStorage.getItem("permissions").search(p) != -1) {
        return true;
      } else {
        // route to denied access
        return false;
      }
    },
    types($event) {
      console.log($event);
      if ($event.localeCompare(this.sendway[0]) == 0) {
        // وارد 1,3
        this.searchRequestBody.SourceType = 3;
      } else if ($event.localeCompare(this.sendway[1]) == 0) {
        // صادر 2,4
        this.searchRequestBody.SourceType = 4;
      }
    },
    isValid() {
      console.log("type " + this.type);
      if (this.type) {
        console.log("type true");

        if (
          this.ename ||
          this.phone ||
          this.title ||
          this.email ||
          this.id ||
          this.nid ||
          this.selectedObj ||
          this.selectedtype ||
          this.selectedDep ||
          this.selectedConf ||
          this.selectedImp ||
          this.selectedEnti ||
          this.dateRangeText
        ) {
          console.log("date: " + this.dateRangeText);

          this.fillData();
          this.search();
        } else {
          this.showAlterFailureMessage("الرجاء تعبئة أحد الخانات");
        }
      } else {
        this.showAlterFailureMessage("الرجا تحديد نوع الاستعلام");
      }
    },
    search() {
      this.isLoading = true;
      Vue.axios
        .post(
          "https://emp.adf.gov.sa/cms7514254/api/cms/Search",
          this.searchRequestBody
        )
        .then((resp) => {
          this.isLoading = false;
          this.response = resp.data;
          if (resp.data.length == 0) {
            this.showAlterFailureMessage("لايوجد معاملات");
          } else {
            this.$router.push({
              name: "viewInquire", //use name for router push
              params: { data: this.response },
            });
          }
        });
    },
    dateSubstring() {
      var s = this.dateRangeText.substring(0, 10).split("-").reverse();
      var e = this.dateRangeText.substring(13).split("-").reverse();
      console.log("end = " + this.e);
      //incase only one date is choosen
      if (this.dateRangeText.length == 10) {
        e = s;
      }

      var sDate = new Date(s[2], s[1], s[0]);
      var eDate = new Date(e[2], e[1], e[0]);
      // incase choosing the end date first
      if (sDate > eDate) {
        this.searchRequestBody.start = s[1] + "/" + s[0] + "/" + s[2];
        this.searchRequestBody.end = e[1] + "/" + e[0] + "/" + e[2];
      } else {
        this.searchRequestBody.start = s[1] + "/" + s[0] + "/" + s[2];
        this.searchRequestBody.end = e[1] + "/" + e[0] + "/" + e[2];
      }
    },
    fillData() {
      this.searchRequestBody.RelatedName = this.ename ? this.ename : " ";
      this.searchRequestBody.RelatedPhone = this.phone ? this.phone : " ";
      this.searchRequestBody.Subject = this.title ? this.title : " ";
      this.searchRequestBody.RelatedEmail = this.email ? this.email : " ";
      this.searchRequestBody.IncidentNumber = this.id ? this.id : " ";
      this.searchRequestBody.RelatedID = this.nid ? this.nid : " ";
      this.searchRequestBody.IOboundType = this.listSearch(
        this.selectedObj,
        this.objectiveClass
      );
      this.searchRequestBody.IOboundClassification = this.listSearch(
        this.selectedtype,
        this.correspondenceType
      );
      this.searchRequestBody.Dept = this.listSearchDep(
        this.selectedDep,
        this.departments
      );
      this.searchRequestBody.ConfidentialVal = this.listSearch(
        this.selectedConf,
        this.confidentiality
      );
      this.searchRequestBody.ImportanceVal = this.listSearch(
        this.selectedImp,
        this.importance
      );
      this.searchRequestBody.Geha = this.listSearch(
        this.selectedEnti,
        this.entities
      );
      this.dateSubstring();
      console.log(this.searchRequestBody);
    },
    listSearch(nameKey, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].Name === nameKey) {
          return myArray[i].Val;
        }
      }
    },
    listSearchDep(nameKey, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].GehaName === nameKey) {
          return myArray[i].DeptNo;
        }
      }
    },

    showAlterFailureMessage(msg) {
      this.$fire({
        title: "تنبية",
        text: msg,
        type: "warning",
        defaultText: "yyy",
        timer: 3000,
        confirmButtonText: "إغلاق",
        confirmButtonColor: "#28714e",
      }).then((r) => {
        console.log(r);
      });
    },
  }, // end methodes
};
</script>
<style lang="css" scoped>
.v-text-field >>> label {
  font-size: 20px;
}
.v-tooltip__content {
  font-size: 16px !important;
  opacity: 0.8 !important;
  pointer-events: auto;
  color: white;
  background-color: #404040;
}
</style>
