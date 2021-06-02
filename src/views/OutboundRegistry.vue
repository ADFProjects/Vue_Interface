<style lang="css" scoped>
@media print {
  @page {
    size: 30mm 21mm;
    margin: 0;
    padding: 0;
  }
}
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
<style>
.inputNumber input[type="number"] {
  -moz-appearance: textfield;
}
.inputNumber input::-webkit-outer-spin-button,
.inputNumber input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.v-autocomplete-content {
  direction: rtl;
  color: blue;
}
.text {
  font-size: 16px;
}
</style>
<template>
  <!--
                ***  TO_DO: ***
    1. font
    2. manditory fildes
    3. number fildes validation  DONE
    4. Arabic date display
    5. Direction rtl             DONE
  -->
  <div id="app" class="d-flex justify-center">
    <v-app id="inspire">
      <v-main>
        <v-container>
          <v-app-bar
            style="border-radius: 4px;opacity: 0.9 !important;"
            width="1160"
            color="#28714e"
            dark
            class="mb-1"
          >
            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-img
                  v-on="on"
                  src="~@/assets/OutboundRegistry-adf.png"
                  alt="InboundImage"
                  max-height="110"
                  max-width="40"
                ></v-img>
              </template>
              <span>إضافة صادر</span>
            </v-tooltip>
            <div>
              <p
                class="my-10 font-weight-medium"
                style="font-size: 20px; color: #e6e6e6; margin:15px; margin-left:8px;"
              >
                تسجيل
              </p>
            </div>

            <p
              class="my-10 font-weight-medium"
              style="opacity: 0.6 !important; font-size: 19px; padding-top:1px;"
            >
              المعاملة الصادرة
            </p>
          </v-app-bar>

          <v-card>
            <v-form ref="form" v-model="valid" lazy-validations>
              <loading
                :active="isLoading"
                :is-full-page="fullPage"
                :loader="waitingLoader"
              />

              <v-container>
                <v-card>
                  <v-card-title class="grey--text text--darken-2">
                    نوع الصادر :</v-card-title
                  >
                  <v-container>
                    <v-radio-group v-model="rowType" @change="fawziway()">
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
              <v-container v-show="spoToggle">
                <v-card>
                  <v-card-title class="grey--text text--darken-2">
                    نوع البريد :</v-card-title
                  >
                  <v-container>
                    <v-radio-group v-model="rowSpo" @change="spo($event)">
                      <v-row>
                        <v-col v-for="n in sendwaySPO" :key="n">
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
              <v-container v-show="commpanyToggle">
                <v-card>
                  <v-card-title class="grey--text text--darken-2">
                    شركة الشحن :</v-card-title
                  >
                  <v-container>
                    <v-radio-group
                      v-model="rowdeliveryCo"
                      @change="deliveryCompany($event)"
                    >
                      <v-row>
                        <v-col v-for="n in deliveryCo" :key="n">
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
                    <v-autocomplete
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingdepartments"
                      :items="departments"
                      item-text="GehaName"
                      label="واردة من"
                      :rules="rules.required"
                      v-model="dep"
                      required
                      outlined
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      color="#28714e"
                      ref="from"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingentities"
                      :items="entities"
                      item-text="Name"
                      label="صادرة إلى"
                      :rules="rules.required"
                      v-model="to"
                      outlined
                      required
                      class="dir"
                      :readonly="recivedData != null"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingimportance"
                      :items="importance"
                      item-text="Name"
                      label="درجة الأهمية"
                      v-model="selectedImportance"
                      required
                      :rules="rules.required"
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
                      :rules="rules.required"
                      v-model="selectedConfid"
                      @change="confidentialTitle"
                      required
                      outlined
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingcorrespondenceType"
                      :items="correspondenceType"
                      item-text="Name"
                      label="نوع الخطاب"
                      v-model="selectedCorrespondenceType"
                      required
                      :rules="rules.required"
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
                      :rules="rules.required"
                      v-model="selectedObjectiveClass"
                      required
                      outlined
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="9">
                    <!--  the title should be "سري" when the type is confidential  -->
                    <v-text-field
                      color="#28714e"
                      v-model="title"
                      required
                      :rules="rules.counterTitle"
                      maxlength="500"
                      v-bind:readonly="titleValid"
                      counter
                      label="الموضوع"
                      outlined
                      ref="title"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingcategory"
                      v-model="selectedCategory"
                      cols="1"
                      :items="category"
                      item-text="Name"
                      label="التصنيف"
                      required
                      :rules="rules.required"
                      outlined
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      color="#28714e"
                      label="الاسم"
                      outlined
                      v-model="senderName"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      color="#28714e"
                      type="number"
                      v-model="mobileNumber"
                      class="inputNumber"
                      label="رقم الجوال"
                      outlined
                      placeholder="05xxxxxxxx"
                      :rules="rules.mobileNum"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      color="#28714e"
                      type="number"
                      class="inputNumber"
                      label="رقم الهوية الوطنية / السجل التجاري / الإقامة"
                      :rules="rules.nId"
                      v-model="senderID"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      color="#28714e"
                      v-model="email"
                      label="البريد الإلكتروني"
                      outlined
                      :rules="rules.email"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>

              <v-form
                ref="attatchmentForm"
                v-model="validAttatchement"
                lazy-validations
              >
                <v-container>
                  <div>
                    <div v-if="progressInfos">
                      <div
                        class="mb-2"
                        v-for="(progressInfo, index) in progressInfos"
                        :key="index"
                      >
                        <span>{{ progressInfo.fileName }}</span>
                        <v-progress-linear
                          v-model="progressInfo.percentage"
                          color="green"
                          height="25"
                          reactive
                        >
                          <strong>{{ progressInfo.percentage }} %</strong>
                        </v-progress-linear>
                      </div>
                    </div>
                    <v-row>
                      <v-col cols="7">
                        <v-file-input
                          color="#28714e"
                          v-model="input"
                          accept=".png, .jpg, .jpeg, .gif, .pdf , .bmp, .tif , .doc , .docx , .xls , .xlsx , "
                          outlined
                          required
                          :rules="rules.required"
                          label="اختيار مرفق"
                          @change="selectFiles"
                        ></v-file-input>
                      </v-col>
                      <v-col>
                        <v-autocomplete
                          color="#28714e"
                          no-data-text="لايوجد بيانات"
                          :loading="isLoadingattatchmentType"
                          cols="4"
                          :items="attatchmentType"
                          v-model="selectedAttatchmentType"
                          label="نوع المرفق"
                          required
                          :rules="rules.required"
                          item-text="Name"
                          outlined
                        ></v-autocomplete>
                      </v-col>
                      <v-col>
                        <v-autocomplete
                          color="#28714e"
                          no-data-text="لايوجد بيانات"
                          :loading="isLoadingattatchmentCategory"
                          cols="4"
                          :items="attatchmentCategory"
                          v-model="selectedAttatchmentCategory"
                          item-text="Name"
                          label="تصنيف المرفق"
                          required
                          :rules="rules.required"
                          outlined
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="1">
                        <v-btn
                          dark
                          fab
                          large
                          color="blue-grey"
                          class="white--text"
                          @click="validateAttatchement()"
                        >
                          <v-icon dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>

                    <v-alert
                      v-if="message"
                      border="left"
                      color="teal"
                      outlined
                      class="multi-line"
                    >
                      {{ message }}
                    </v-alert>

                    <v-card
                      class="mx-auto text-center"
                      v-if="filsUrls.length > 0"
                    >
                      <v-list>
                        <v-subheader>
                          <v-row>
                            <v-col lg="1"></v-col>
                            <v-col> <h5>اسم المرفق</h5></v-col>
                            <v-col> <h5>نوع المرفق</h5></v-col>
                            <v-col> <h5>تصنيف المرفق</h5></v-col>
                          </v-row>
                        </v-subheader>
                        <v-list-item-group color="primary">
                          <v-list-item v-for="file in filsUrls" :key="file">
                            <v-list-item-content>
                              <v-row>
                                <v-col lg="1">
                                  <v-list-item-subtitle>
                                    <img
                                      src="@/assets/clear.png"
                                      height="15px"
                                      @click="deleteAtt(index)"
                                    />
                                  </v-list-item-subtitle>
                                </v-col>
                                <v-col>
                                  <v-list-item-subtitle>
                                    <a
                                      :href="file.url"
                                      style="color: #28714e;font-weight: bold;"
                                      >{{ file.name }}</a
                                    >
                                  </v-list-item-subtitle>
                                </v-col>
                                <v-col>
                                  <v-list-item-subtitle>
                                    <h6 :key="file" style="font-weight: bold;">
                                      {{ file.type }}
                                    </h6>
                                  </v-list-item-subtitle>
                                </v-col>
                                <v-col>
                                  <v-list-item-subtitle>
                                    <h6 :key="file" style="font-weight: bold;">
                                      {{ file.category }}
                                    </h6>
                                  </v-list-item-subtitle>
                                </v-col>
                              </v-row>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-card>
                  </div>
                </v-container>
              </v-form>
              <v-container>
                <!--  the title should be "سري" when the type is confidential  -->
                <v-textarea
                  color="#28714e"
                  v-model="remarks"
                  maxlength="500"
                  :rules="rules.counterDescription"
                  counter
                  outlined
                  name="input-7-4"
                  label="الملاحظات"
                ></v-textarea>
              </v-container>
              <v-container>
                <v-checkbox
                  color="#28714e"
                  v-model="doprint"
                  label=" طباعة الباركود"
                ></v-checkbox>
              </v-container>
              <v-container>
                <div class="text-center">
                  <router-link to="" @click="overlay = !overlay">
                    <v-btn
                      rounded
                      color="#3d7f5f"
                      dark
                      large
                      @click="validate"
                      width="200"
                    >
                      <h5 class="my-10" style="color: white;">إرسال</h5>
                    </v-btn>
                  </router-link>
                </div>
              </v-container>
            </v-form>
            <div>
                <v-container v-show="false">
                  <div id="bc">
                    <div style="width: 100%">
                      <div
                        class="d-flex justify-center"
                        style="display: table; margin: 0 auto"
                      >
                        <barcode
                          v-bind:value="barcodeValue"
                          width="1"
                          height="30"
                          :displayValue="false"
                          fontSize="10"
                        >
                          فشل تحميل الباركود
                        </barcode>
                      </div>
                    </div>
                  </div>
                </v-container>
            </div>
            <v-overlay :value="overlay">
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>
            </v-overlay>
            <pre></pre>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import Vue from "vue";
import uq from "@umalqura/core";
import UploadService from "../services/UploadFilesService";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSimpleAlert from "vue-simple-alert";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import VueBarcode from "vue-barcode";
import VueHtml2Canvas from "vue-html2canvas";

import VueHtmlToPaper from "vue-html-to-paper";



const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
  ],
};

Vue.use(VueHtmlToPaper, options);

// or, using the defaults with no stylesheet
Vue.use(VueHtmlToPaper);

Vue.use(VueHtml2Canvas);

Vue.use(VueSimpleAlert, { reverseButtons: true });
Vue.use(VueAxios, axios);

axios.defaults.headers.common["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.common["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
const d = uq();
const day = d.format("yyyy-MM-dd");
const today = d.format("yyyy-MM-dd", "en");
const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  components: {
    Loading,
    barcode: VueBarcode,
  },
  data: function() {
    return {
      printer_off: true,
      doprint: true,
      checkbox: true,
      rowdeliveryCo: "",
      compare: "",
      spoToggle: false,
      commpanyToggle: false,
      output: null,
      barcodeValue: "219001144",
      validAttatchement: "",
      overlay: false,
      isLoading: false,
      fullPage: true,
      waitingLoader: "bars",
      rowType: "صادر عادي",
      rowSpo: "خارجي",
      valid: true,
      titleValid: false,
      items: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      menu: false,
      modal: false,
      menu2: false,
      date: day.toString(),
      today: today.toString(),
      loader: null,
      loading: false,
      selectedFiles: undefined,
      progressInfos: [],
      message: "",
      fileInfos: [],
      objectiveClass: [],
      entities: [],
      entitiesMerged: [],
      entitiesM: [],
      confidentiality: [],
      importance: [],
      category: [],
      correspondenceType: [],
      attatchmentType: [],
      attatchmentCategory: [],
      attatchmentExtention: [],
      departments: [],
      isLoadingobjectiveClass: true,
      isLoadingentities: true,
      isLoadingconfidentiality: true,
      isLoadingimportance: true,
      isLoadingcategory: true,
      isLoadingcorrespondenceType: true,
      isLoadingattatchmentType: true,
      isLoadingattatchmentCategory: true,
      isLoadingattatchmentExtention: true,
      isLoadingdepartments: true,
      sendway: ["صادر عادي", "البريد السعودي", "شركة شحن"],
      sendwaySPO: ["داخلي", "خارجي", "صندوق البريد"],
      deliveryCo: ["سمسا", "فيدكس"],
      recivedData: "",
      //Start of filed data
      dep:"",
      from: "",
      to: "",
      title: "",
      email: "",
      remarks: "",
      outboundNumber: "",
      mobileNumber: "",
      senderName: "",
      senderID: "",
      input: {},
      selectedCategory: "",
      selectedEntite: "",
      selectedImportance: "",
      selectedConfid: "",
      selectedCorrespondenceType: "",
      selectedObjectiveClass: "",
      selectedAttatchmentCategory: "",
      selectedAttatchmentType: "",
      //End of filed data
      filsUrls: [],
      requestBody: {
        DeliveryBy: "",
        Status: 1,
        RequesterID: 4106, // employee ID from login
        RequestDate: "", // current date
        SelectedManager: "", //manager of selected department
        ImportanceVal: "N", // الأهمية
        ConfidentialVal: "N", // السرية
        FromGeha: "صندوق التنمية الزراعية",
        FromID: "127000",
        ToGeha: "",
        SelectedManagerName: " ",
        TotID: "",
        DeliveryType: "M",
        OutboundDocNo: "4325454253", // رقم الصادر
        IOboundType: "", // نوع الخطاب
        OutboundGDate: "", // ميلادي
        OutboundHDate: "", // هجري
        IOboundSubject: "", // الموضوع
        IOboundCategory: "", // التصنيف الوضوعي
        IOboundRemarks: "", // ملاحظات
        IOboundClassification: "", // التصنيف
        SourceType: "",
        RelatedID: "",
        RelatedName: "",
        RelatedEmail: "",
        RelatedIDType: "ID",
        RelatedPhone: "",
        DestNumber: "",
        RelatedAtt: [],
        SenderType: "",
        PreviousNo: "",

        cssText: "width: 189px;height: 172px;",
      },
      rules: {
        required: [(value) => !!value || "مطلوب"],
        counterTitle: [(value) => value.length > 0 && value.length <= 500],
        counterDescription: [(value) => value.length <= 500],
        nId: [
          (v) =>
            v.length > 0 && v.length != 10 ? "الرقم غير صحيح" : true,
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
  }, //data end
  mounted() {
    this.recivedData = this.$route.params.data;
    if (this.recivedData) {
      this.replay();
    }
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
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=13")
      .then((resp) => {
        this.entitiesM = resp.data;
        this.entitiesMerged = this.entitiesM;
        this.isLoadingentities = false;
      });
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=4")
      .then((resp) => {
        this.importance = resp.data;
        this.isLoadingimportance = false;
      });
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=2")
      .then((resp) => {
        this.category = resp.data; // copy or origin
        this.isLoadingcategory = false;
      });
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=11")
      .then((resp) => {
        this.correspondenceType = resp.data;
        this.isLoadingcorrespondenceType = false;
      });
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=6")
      .then((resp) => {
        this.attatchmentType = resp.data;
        this.isLoadingattatchmentType = false;
      });
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=12")
      .then((resp) => {
        this.attatchmentCategory = resp.data;
        this.isLoadingattatchmentCategory = false;
      });

    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=7")
      .then((resp) => {
        this.attatchmentExtention = resp.data;
        this.isLoadingattatchmentExtention = false;
      });
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCMSLookups?type=2")
      .then((resp) => {
        this.category = resp.data;
        this.isLoadingcategory = false;
      });
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetDept?DeptType=1")
      .then((resp) => {
        this.departments = resp.data;
        this.isLoadingdepartments = false;
      });
  },

  methods: {
    print() {
      const prtHtml = document.getElementById("bc").innerHTML;
      // Open the print window
      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );
      WinPrint.document.write(`<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
  <div>
    ${prtHtml}
    </div>
  </body>
</html>`);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    
    },
    replay() {
      this.isLoading = true;
      this.requestBody.PreviousNo = this.recivedData.IncidentNumber;
      this.to = this.recivedData.to;
      // set read only
      // if change the way do not send

      this.isLoading = false;
    },
    deleteAtt(index) {
      this.filsUrls.splice(this.filsUrls[index], 1);
    },
    fawziway() {
      this.spoToggle = false;
      this.commpanyToggle = false;
      if (this.rowType.localeCompare(this.sendway[1]) == 0) {
        // البريد السعودي
        this.entitiesMerged = this.entitiesM;
        this.spoToggle = true;
      } else if (this.rowType.localeCompare(this.sendway[0]) == 0) {
        // عادي
        this.entitiesMerged = this.entities;
      } else if (this.rowType.localeCompare(this.sendway[2]) == 0) {
        // شركة شحن
        this.commpanyToggle = true;
      }
    },
    spo($event) {
      console.log($event);
      if ($event.localeCompare(this.sendwaySPO[0]) == 0) {
        this.requestBody.DeliveryBy = "spoIn";
      } else if ($event.localeCompare(this.sendwaySPO[1]) == 0) {
        this.requestBody.DeliveryBy = "spoOut";
      } else {
        this.requestBody.DeliveryBy = "spoInbox";
      }
    },
    deliveryCompany($event) {
      console.log($event);
      if ($event.localeCompare(this.deliveryCo[0]) == 0) {
        //smsa
        this.requestBody.DeliveryBy = "smsa";
      } else if ($event.localeCompare(this.deliveryCo[1]) == 0) {
        //fedex
        this.requestBody.DeliveryBy = "fedex";
      }
    },
    sendWayVerfication() {
      if (this.rowType.localeCompare(this.sendway[1]) == 0) {
        // البريد
        this.requestBody.SourceType = "4";
        this.requestBody.SenderType = "SPO";
        this.requestBody.TotID = this.listSearch(this.to, this.entities);
      } else if (this.rowType.localeCompare(this.sendway[0]) == 0) {
        // صادر عادي
        this.requestBody.SourceType = "4";
        this.requestBody.SenderType = "MADF";
        this.requestBody.TotID = this.listSearch(this.to, this.entities);
      } else if (this.rowType.localeCompare(this.sendway[2]) == 0) {
        console.log("شركة");
        this.requestBody.SourceType = "4";
        this.requestBody.SenderType = "deliveryCo";
      }

      /*else {
        // مراسلات
        this.requestBody.SourceType = "2";
        this.requestBody.SenderType = "GOVT";
        this.requestBody.TotID = this.listSearch(this.to, this.entitiesM);
      }*/
    },
    merge() {
      this.entitiesMerged = this.entities;
      this.entitiesMerged = this.entitiesMerged.concat(this.entitiesM);
    },
    selectFiles() {
      this.progressInfos = [];
      this.selectedFiles = event.target.files;
    },
    uploadFiles() {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    },
    upload(idx, file) {
      this.isLoading = true;

      this.progressInfos[idx] = { percentage: 0, fileName: file.name };

      UploadService.upload(file, (event) => {
        this.progressInfos[idx].percentage = Math.round(
          (100 * event.loaded) / event.total
        );
      })
        .then((response) => {
          this.isLoading = false;

          //step 1 : add file url and name to a list
          this.filsUrls.push({
            url:
              "https://emp.adf.gov.sa/cms7514254/api/FileManager/GetFile?k=" +
              response.data.toString(),
            name: file.name.toString(),
            path: response.data.toString(),
            type: this.selectedAttatchmentType.toString(),
            category: this.selectedAttatchmentCategory.toString(),
          });
          this.resetAttatchement();
          return this.filsUrls;
        })
        .then((files) => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progressInfos[idx].percentage = 0;
          this.message = "Could not upload the file:" + file.name;
        });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.registerInbound();
      } else {
        this.$refs.from.focus();
      }
    },
    validateAttatchement() {
      if (this.$refs.attatchmentForm.validate()) {
        this.uploadFiles();
      }
    },
    resetAttatchement() {
      this.$refs.attatchmentForm.reset();
    },
    registerInbound() {
      /*
*API ID* - *Dropdown List Name*  -  *Name in Code*  - *Name in Request*
الجهة             13                  entities
درجة السرية             3            confidentiality
درجة الأهمية             4            importance                                                                                                                                 
التصنيف الموضوعي             1       objectiveClass
التصنيف             2                 category
نوع الخطاب            11              correspondenceType
نوع المرفق             6             attatchmentType
تصنيف المرفق            12           attatchmentcategory
امتداد المرفق             7          attatchmentExtention
*/

      this.requestBody.IOboundSubject = this.title;
      this.requestBody.IOboundRemarks = this.remarks;
      this.requestBody.OutboundDocNo = "";
      this.requestBody.RequestDate = new Date().toLocaleString();
      this.requestBody.OutboundHDate = this.date;
      this.requestBody.OutboundDate = this.date;
      this.requestBody.OutboundGDate = new Date().toISOString().substr(0, 10);

        this.requestBody.ToGeha = this.to;

      this.requestBody.RelatedEmail = this.email;
      this.requestBody.RelatedName = this.senderName;
      this.requestBody.RelatedPhone = this.mobileNumber;
      this.requestBody.RelatedID = this.senderID;

      this.requestBody.ImportanceVal = this.listSearch(
        this.selectedImportance,
        this.importance
      );
      this.requestBody.ConfidentialVal = this.listSearch(
        this.selectedConfid,
        this.confidentiality
      );
      this.requestBody.IOboundCategory = this.listSearch(
        this.selectedObjectiveClass,
        this.objectiveClass
      );
      this.requestBody.IOboundType = this.listSearch(
        this.selectedCorrespondenceType,
        this.correspondenceType
      );
      this.requestBody.IOboundClassification = this.listSearch(
        this.selectedCategory,
        this.category
      );
            this.requestBody.SelectedManager = this.listSearchDep(
        this.dep,
        this.departments
      ).ManagerUserName;
      this.requestBody.DestNumber = this.listSearchDep(
        this.dep,
        this.departments
      ).DeptNo;
      this.requestBody.SelectedManagerName = this.listSearchDep(
        this.dep,
        this.departments
      ).GehaName;
      this.sendWayVerfication();
      this.addAttatchmentToRequest();
    },
    sendRequest() {
      console.log("request body");
      console.log(this.requestBody);
      this.isLoading = true;
      Vue.axios
        .post(
          "https://emp.adf.gov.sa/cms7514254/api/cms/save",
          this.requestBody
        )
        .then((resp) => {
          this.isLoading = false;
          console.log(resp.data);
          if (!resp.data.ErrorCode) {
            this.outboundNumber = resp.data.Num.toString();
            this.barcodeValue = this.outboundNumber;
            console.log("should be printed?");
            if (this.doprint) {
              console.log("printed");
            this.print();
           }
            this.showAlterSuccessMessage();
            this.$refs.form.reset();
            this.resetAttatchement();
            this.$router.push({
              name: "outboundbox", //use name for router push
            });
          } else {
            this.showAlterFailureMessage(resp.data.ErrorCode);
          }
        });
      console.log("request body in request");

      console.log(this.requestBody);
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
          return myArray[i];
        }
      }
    },
    addAttatchmentToRequest() {
      if (this.filsUrls.length == 0) {
        this.showAlterWarningMessage();
      } else {
        for (var i = 0; i < this.filsUrls.length; i++) {
          this.requestBody.RelatedAtt.push({
            FileName: this.filsUrls[i].name
              .toString()
              .substring(0, this.filsUrls[i].name.toString().indexOf(".")),
            FilePath: this.filsUrls[i].path,
            Comments: "",
            Text1: this.listSearch(this.filsUrls[i].type, this.attatchmentType),
            Text2: this.filsUrls[i].type,
            Text3: this.listSearch(
              this.filsUrls[i].category,
              this.attatchmentCategory
            ),
            Text4: this.filsUrls[i].category,
            Text5: i + 1,
          });
        } //end for

        this.sendRequest();
      }
    },
    showAlterSuccessMessage() {
      this.$fire({
        title: "تم الإرسال بنجاح",
        text: "رقم الطلب: " + this.outboundNumber,
        type: "success",
        confirmButtonText: "إغلاق",
        confirmButtonColor: "#28714e",
      }).then((r) => {
        console.log(r.value.toString());
      });
    },
    showAlterFailureMessage(code) {
      this.$fire({
        title: "حدث خطأ",
        text: "رقم الخطأ :" + code,
        type: "error",
        defaultText: "yyy",
        timer: 3000,
        confirmButtonText: "إغلاق",
      }).then((r) => {
        console.log(r.value.toString());
      });
    },
    showAlterWarningMessage() {
      this.$fire({
        title: "لايوجد مرفقات",
        text: "هل أنت متأكد من الإرسال بدون مرفقات؟",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28714e",
        cancelButtonColor: "grey",
        confirmButtonText: "إرسال",
        cancelButtonText: "إلغاء",
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          console.log(result);
          this.sendRequest();
        }
      });
    },
    confidentialTitle() {
      if (
        this.selectedConfid == "سري" ||
        this.selectedConfid == "سري للغاية" ||
        this.selectedConfid == ""
      ) {
        this.title = "سري";
        this.titleValid = true;
      } else {
        this.titleValid = false;
        this.title = "";
      }
    },

  }, //End of Methodes
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      //timeout depending on uploading time
      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 3000);
    },
  },
};
</script>
<style>
.text {
  font-size: 12px;
  margin: 0;
  padding: 0;
  text-align: center;
}
</style>
