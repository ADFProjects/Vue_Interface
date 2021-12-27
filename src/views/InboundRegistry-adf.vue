<style lang="css" scoped>
.v-radio >>> label {
  font-family: "Almarai", sans-serif !important;
  font-size: 0.9em;
}
.checkBoxs--text >>> label {
  font-family: "Almarai", sans-serif !important;
  font-size: 0.9em;
}
.v-text-field >>> label {
  font-family: "Almarai", sans-serif !important;
  font-size: 0.9em;
}
.v-tooltip__content {
  font-size: 14px !important;
  opacity: 0.8 !important;
  pointer-events: auto;
  color: white;
  background-color: #404040;
}
</style>
<style>
#fileStyle {
  color: #28714e;
  font-size: 14px;
  font-weight: bold;
}
#fileDataStyle {
  font-size: 13px;
}
.v-text-field input {
  font-size: 0.9em;
}
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
  color: #28714e;
}
</style>
<style scoped>
.addBackground {
  background: url("../assets/Background-adf.png");
  background-size: 100% 100%;
  background-position: center;
  /* height: 100vh; */
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
  <div id="app" class="d-flex justify-center my-application">
    <v-app id="inspire" class="addBackground my-application">
      <v-main class="my-application">
        <v-container class="my-application">
          <v-app-bar
            elevation="20"
            style="border-radius: 4px; opacity: 0.9 !important"
            width="1160"
            color="#28714e"
            dark
            class="mb-1 my-application"
          >
            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-img
                  v-on="on"
                  src="~@/assets/InboundRegistry-adf.png"
                  alt="InboundImage"
                  max-height="110"
                  max-width="40"
                ></v-img>
              </template>
              <span class="my-application">إضافة وارد</span>
            </v-tooltip>

            <div>
              <p
                class="my-10 font-weight-medium my-application"
                style="color: #e6e6e6; margin: 15px; margin-left: 8px"
              >
                تسجيل
              </p>
            </div>

            <p
              class="my-10 font-weight-medium my-application"
              style="opacity: 0.6 !important; padding-top: 1px"
            >
              المعاملة الواردة
            </p>
          </v-app-bar>
          <v-card>
            <v-form
              class="my-application"
              ref="form"
              v-model="valid"
              lazy-validations
            >
              <loading
                :active="isLoading"
                :is-full-page="fullPage"
                :loader="waitingLoader"
              />
              <v-container>
                <v-card>
                  <v-card-title
                    class="grey--text text--darken-2 my-application"
                  >
                    واردة عبر :</v-card-title
                  >
                  <v-container>
                    <v-radio-group v-model="rowType">
                      <v-row>
                        <v-col v-for="n in sendway" :key="n">
                          <v-radio
                            class="my-application"
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
                  <v-card-title
                    class="grey--text text--darken-2 my-application"
                  >
                    شركة الشحن :</v-card-title
                  >
                  <v-container>
                    <v-radio-group v-model="rowdeliveryCo">
                      <v-row>
                        <v-col v-for="n in deliveryCo" :key="n">
                          <v-radio
                            :label="n"
                            :value="n"
                            color="#28714e"
                            class="my-application"
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
                      ref="from"
                      :items="entities"
                      item-text="Name"
                      label="واردة من"
                      :loading="isLoadingentities"
                      :rules="rules.required"
                      v-model="from"
                      outlined
                      required
                      no-data-text="لايوجد بيانات"
                      class="dir my-application"
                    ></v-autocomplete>
                  </v-col>
                  <v-col v-show="other">
                    <v-text-field
                      color="#28714e"
                      label="اسم الجهة"
                      :rules="rules.requiredIfOther"
                      outlined
                      v-model="otherTo"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                      color="#28714e"
                      class="my-application"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          class="my-application"
                          color="#28714e"
                          v-model="date"
                          label="بتاريخ"
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                          outlined
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        class="my-application"
                        color="#28714e"
                        :max="date"
                        v-model="date"
                        locale="ar"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      class="my-application"
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingdepartments"
                      :items="departments"
                      item-text="GehaName"
                      label="صادرة إلى"
                      :rules="rules.required"
                      v-model="to"
                      required
                      outlined
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <!-- TODO : change the value -->
                    <v-text-field
                      color="#28714e"
                      type="number"
                      class="inputNumber my-application"
                      label="رقم الصادر من الجهة المرسلة"
                      :rules="rules.required"
                      v-model="outboundNumber"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      class="my-application"
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingdepartments"
                      :items="departments"
                      item-text="GehaName"
                      label="نسخة إلى"
                      v-model="toCopies"
                      outlined
                      deletable-chips
                      multiple
                      small-chips
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col>
                    <v-autocomplete
                      class="my-application"
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingimportance"
                      :items="importance"
                      item-text="Name"
                      label="درجة الأهمية"
                      :rules="rules.required"
                      v-model="selectedImportance"
                      required
                      outlined
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      class="my-application"
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingconfidentiality"
                      :items="confidentiality"
                      item-text="Name"
                      label="درجة السرية"
                      :rules="rules.required"
                      v-model="selectedConfid"
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
                      class="my-application"
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingcorrespondenceType"
                      :items="correspondenceType"
                      item-text="Name"
                      label="نوع الخطاب"
                      :rules="rules.required"
                      v-model="selectedCorrespondenceType"
                      required
                      outlined
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-autocomplete
                      class="my-application"
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
                      class="my-application"
                      color="#28714e"
                      v-model="title"
                      :rules="rules.counterTitle"
                      required
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
                      class="my-application"
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingcategory"
                      v-model="selectedCategory"
                      cols="1"
                      :items="category"
                      item-text="Name"
                      label="التصنيف"
                      :rules="rules.required"
                      required
                      outlined
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      class="my-application"
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
                      class="inputNumber my-application"
                      label="رقم الجوال"
                      :rules="rules.mobileNum"
                      outlined
                      placeholder="05xxxxxxxx"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <!-- <v-col>
                    <v-text-field
                      color="#28714e"
                      type="number"
                      class="inputNumber my-application"
                      label="رقم الهوية الوطنية / السجل التجاري / الإقامة"
                      v-model="senderID"
                      :rules="rules.nId"
                      outlined
                    ></v-text-field>
                  </v-col> -->
                  <v-col>
                    <v-autocomplete
                      color="#28714e"
                      ref="selectNumber"
                      :items="checkNums"
                      item-text="Name"
                      label="التحقق من البيانات عبر"
                      :rules="rules.requiredNumbers"
                      v-model="selectNumber"
                      outlined
                      required
                      class="dir my-application"
                      no-data-text="لايوجد بيانات"
                    ></v-autocomplete>
                  </v-col>
                  <v-col v-if="numberId">
                    <v-text-field
                      color="#28714e"
                      label="رقم الهوية الوطنية / الإقامة"
                      type="number"
                      class="inputNumber my-application"
                      v-model="userID"
                      :rules="rules.nId"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="commercialNumber">
                    <v-text-field
                      color="#28714e"
                      label="رقم السجل التجاري"
                      type="number"
                      class="inputNumber my-application"
                      v-model="userID"
                      :rules="rules.nComNum"
                      outlined
                      placeholder="700xxxxxxx"
                    ></v-text-field>
                  </v-col>

                  <v-col>
                    <v-text-field
                      class="my-application"
                      color="#28714e"
                      v-model="email"
                      :rules="rules.email"
                      label="البريد الإلكتروني"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>

              <v-form ref="attatchmentForm" lazy-validations>
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
                      <v-col cols="1">
                        <v-btn
                          v-if="!bWASM"
                          @click="acquireImage()"
                          class="mx-2"
                          fab
                          dark
                          large
                          color="#28714e"
                        >
                          <img
                            src="@/assets/scanner.png"
                            height="30px"
                            weidth="30px"
                          />
                        </v-btn>
                      </v-col>
                      <v-col cols="1">
                        <v-btn
                          @click="openImage()"
                          class="mx-2"
                          fab
                          dark
                          large
                          color="#39ac73"
                        >
                          <img
                            src="@/assets/attachment.png"
                            height="30px"
                            weidth="30px"
                          />
                        </v-btn>
                      </v-col>
                      <v-col cols="1" v-show="false">
                        <select
                          v-if="!bWASM"
                          id="sources"
                          v-show="false"
                        ></select>
                      </v-col>
                      <v-col cols="4">
                        <!-- required -->
                        <v-text-field
                          color="#28714e"
                          label="اسم المرفق"
                          required
                          :rules="rules.required"
                          outlined
                          v-model="attachmentName"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
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
                      <v-col cols="2">
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
                          height="60px"
                          weidth="40px"
                          large
                          rounded
                          color="#c69f26"
                          class="white--text"
                          @click="validateAttatchement()"
                        >
                          <img
                            src="@/assets/upload.png"
                            height="25px"
                            weidth="25px"
                          />
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-alert
                      v-if="message"
                      border="left"
                      color="teal"
                      outlined
                      class="multi-line my-application"
                    >
                      {{ message }}
                    </v-alert>

                    <v-card
                      class="mx-auto text-center my-application"
                      v-if="filsUrls.length > 0"
                    >
                      <v-list>
                        <v-subheader>
                          <v-row>
                            <v-col lg="1"></v-col>
                            <v-col>
                              <h5 class="my-application" id="fileStyle">
                                اسم المرفق
                              </h5></v-col
                            >
                            <v-col>
                              <h5 class="my-application" id="fileStyle">
                                نوع المرفق
                              </h5></v-col
                            >
                            <v-col>
                              <h5 class="my-application" id="fileStyle">
                                تصنيف المرفق
                              </h5></v-col
                            >
                          </v-row>
                        </v-subheader>
                        <v-list-item-group color="primary">
                          <v-list-item
                            class="my-application"
                            v-for="(file, index) in filsUrls"
                            :key="index"
                          >
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
                                      :key="index"
                                      class="my-application"
                                      id="fileDataStyle"
                                      style="color: #004d99"
                                      >{{ file.name }}</a
                                    >
                                  </v-list-item-subtitle>
                                </v-col>
                                <v-col>
                                  <v-list-item-subtitle>
                                    <h6
                                      :key="index"
                                      class="my-application"
                                      id="fileDataStyle"
                                    >
                                      {{ file.type }}
                                    </h6>
                                  </v-list-item-subtitle>
                                </v-col>
                                <v-col>
                                  <v-list-item-subtitle>
                                    <h6
                                      :key="index"
                                      class="my-application"
                                      id="fileDataStyle"
                                    >
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
                  class="my-application"
                  color="#28714e"
                  v-model="remarks"
                  :rules="rules.counterDescription"
                  maxlength="500"
                  counter
                  outlined
                  name="input-7-4"
                  label="الملاحظات"
                ></v-textarea>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="2">
                    <v-checkbox
                      class="checkBoxs--text my-application"
                      rounded
                      color="#28714e"
                      v-model="doSendOrigin"
                      label="إرسال أصل"
                      @click="sendOriginal = !sendOriginal"
                    >
                    </v-checkbox>
                  </v-col>
                  <v-col v-show="sendOriginal">
                    <v-autocomplete
                      class="my-application"
                      color="#28714e"
                      no-data-text="لايوجد بيانات"
                      :loading="isLoadingdepartments"
                      :items="departments"
                      item-text="GehaName"
                      label="إلى"
                      :rules="rules.requiredIf"
                      v-model="originalTo"
                      required
                      outlined
                    ></v-autocomplete>
                  </v-col>
                  <v-col v-show="sendOriginal">
                    <v-textarea
                      class="my-application"
                      color="#28714e"
                      height="55"
                      maxlength="500"
                      v-model="remarksOrigin"
                      counter
                      outlined
                      name="input-7-4"
                      label="الملاحظات"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-checkbox
                  class="checkBoxs--text"
                  color="#28714e"
                  v-model="doprint"
                  label=" طباعة الباركود"
                ></v-checkbox>
              </v-container>
              <v-container>
                <v-checkbox
                  class="my-application checkBoxs--text"
                  rounded
                  color="#28714e"
                  v-model="doSendSMS"
                  label="إرسال تذكرة مراجع"
                >
                </v-checkbox>
              </v-container>
              <v-container>
                <div class="text-center">
                  <router-link to="" @click="overlay = !overlay">
                    <v-btn
                      rounded
                      color="#3d7f5f"
                      dark
                      large
                      @click="running"
                      width="200"
                    >
                      <h5
                        class="my-10 my-application"
                        style="color: white; font-size: 14px"
                      >
                        إرسال
                      </h5>
                    </v-btn>
                  </router-link>
                </div>
              </v-container>
            </v-form>
            <v-container style="width: 100%" id="printMe" v-show="false">
              <v-container
                class="d-flex justify-center"
                style="display: table; margin: 0 auto"
              >
                <barcode
                  v-bind:value="barcodeValue"
                  width="1"
                  height="30"
                  :displayValue="true"
                  fontSize="10"
                >
                  فشل تحميل الباركود
                </barcode>
                <v-container style="font-size: 15px; direction: rtl">
                  {{ dateBc.substr(0, 10) }}
                </v-container>

                <v-container style="font-size: 15px; direction: rtl">
                  عدد المرفقات: {{ filsUrls.length }}
                </v-container>
              </v-container>
            </v-container>
            <div v-show="false">
              <v-container v-bind:id="containerId"></v-container>
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
//import uq from "@umalqura/core";
import UploadService from "../services/UploadFilesService";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSimpleAlert from "vue-simple-alert";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Dynamsoft from "dwt";
import VueBarcode from "vue-barcode";

Vue.use(VueSimpleAlert, { reverseButtons: true });
Vue.use(VueAxios, axios);

axios.defaults.headers.common["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.common["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

//Hijri
//const dH = uq();
//const dayH = d.format("yyyy-MM-dd");
//const todayH = d.format("yyyy-MM-dd", "en");

//const d = new Date();
//const day = d.format("yyyy-MM-dd");
//const today = d.format("yyyy-MM-dd", "en");

//Email pattern
const pattern1 =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Number pattern: السجل التجاري
const pattern2 = /^700[0-9]{7}$/;

export default {
  components: {
    Loading,
    barcode: VueBarcode,
  },
  computed: {
    departments() {
      return this.$store.state.depList;
    },
    entities() {
      return this.$store.state.gehatList;
    },
    importance() {
      return this.$store.state.importanceList;
    },
    confidentiality() {
      return this.$store.state.confidentialityList;
    },
    correspondenceType() {
      return this.$store.state.typesList;
    },
    objectiveClass() {
      return this.$store.state.objectiveList;
    },
    category() {
      return this.$store.state.categoryList;
    },
    attatchmentType() {
      return this.$store.state.attachmentTypeList;
    },
    attatchmentCategory() {
      return this.$store.state.attachmentCategotyList;
    },
  },
  data: function () {
    return {
      doprint: false,
      barcodeValue: "",
      barcodeToggle: false,
      attachmentName: "",
      containerId: "dwtControlContainer",
      bWASM: false,
      userID: "",
      other: false,
      numberId: false,
      commercialNumber: false,
      otherTo: "",
      doSendOrigin: false,
      doSendSMS: false,
      sendO: "",
      remarksOrigin: "",
      originalTo: "",
      rowdeliveryCo: "",
      deliveryCo: ["سمسا", "فيدكس"],
      commpanyToggle: false,
      sendway: [" مراسل", "البريد السعودي", "شركة شحن"],
      rowType: "البريد السعودي",
      sendOriginal: false,
      overlay: false,
      isLoading: false,
      fullPage: true,
      waitingLoader: "bars",
      valid: true,
      titleValid: false,
      items: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      menu: false,
      modal: false,
      menu2: false,
      date: new Date().toISOString().substr(0, 10),
      loader: null,
      loading: false,
      selectedFiles: undefined,
      progressInfos: [],
      message: "",
      fileInfos: [],
      checkNums: ["رقم الهوية الوطنية / الإقامة", "رقم السجل التجاري"],
      dateBc: new Date().toLocaleString(),
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
      isLoadingentitiesM: true,
      //Start of filed data
      from: "",
      selectNumber: "",
      to: "",
      toCopies: "",
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
        RequestTypeID: 8, //  To-Do: change the numbers
        Status: 1,
        RequesterID: 4106, // employee ID from login
        RequestDate: "", // current date
        SelectedManager: "", //manager of selected department
        ImportanceVal: "N", // الأهمية
        ConfidentialVal: "N", // السرية
        FromGeha: "",
        FromID: "",
        ToGeha: "صندوق التنمية الزراعية",
        SelectedManagerName: " ",
        TotID: "127000",
        DeliveryType: "M",
        OutboundDocNo: "", // رقم الصادر
        IOboundType: "", // نوع الخطاب
        OutboundGDate: "", // ميلادي
        OutboundHDate: "", // هجري
        IOboundSubject: "", // الموضوع
        IOboundCategory: "", // التصنيف الوضوعي
        IOboundRemarks: "", // ملاحظات
        IOboundClassification: "", // التصنيف
        SourceType: 3, // 3
        RelatedID: "",
        RelatedName: "",
        RelatedEmail: "",
        RelatedIDType: "ID",
        RelatedPhone: "",
        DestNumber: "",
        RelatedAtt: [],
        SenderType: "",
        RelatedGehat: [],
      },
      sendOriginRequestBody: {
        RecieverUsername: "",
        title: "",
        Details: "",
        GehaCode: 1,
        GehaName: "",
        IncidentNumber: "",
      },
      sendSmsRequestBody: {
        MobileNo: "",
        Message: "",
      },

      emailRules: [(v) => !!v || "Email is required"],
      rules: {
        requiredIfOther: [(value) => (this.other && !value ? "مطلوب" : true)],
        requiredIf: [(value) => (this.sendOriginal && !value ? "مطلوب" : true)],
        requiredIfSms: [(value) => (this.doSendSMS && !value ? "مطلوب" : true)],
        required: [(value) => !!value || "مطلوب"],
        counterTitle: [(value) => value.length > 0 && value.length <= 500],
        counterDescription: [(value) => value.length <= 500],
        requiredNumbers: [
          (v) => (this.doSendSMS && !v ? "مطلوب" : true),
          (v) => (this.other && !v ? "مطلوب" : true),
        ],
        nId: [
          (v) => (v.length > 0 && v.length != 10 ? "الرقم غير صحيح" : true),
          (v) => (this.doSendSMS && !v ? "مطلوب" : true),
          (v) => (this.other && !v ? "مطلوب" : true),
        ],
        nComNum: [
          (v) =>
            !pattern2.test(v) && v.length > 0
              ? "رقم السجل التجاري غير صحيح"
              : true,
          (v) => (this.other && !v ? "مطلوب" : true),
          (v) => (this.doSendSMS && !v ? "مطلوب" : true),
        ],
        mobileNum: [
          (v) => (this.doSendSMS && !v ? "مطلوب" : true),
          (v) =>
            v.length > 0 && v.charAt(0) != "0" ? "رقم الجوال غير صحيح" : true,
          (v) =>
            v.length > 0 && v.length != 10 ? "رقم الجوال غير صحيح" : true,
        ],
        email: [
          (v) =>
            !pattern1.test(v) && v.length > 0
              ? "البريد الإلكتروني غير صحيح"
              : true,
        ],
      },
    };
  }, //data end
  mounted() {
    var list = this.$store.state.ApiList;
    for (var i = 0; i < list.length; i++) {
      if (!this.$store.state[list[i].flag]) {
        this.$store.dispatch(list[i].method);
      }
      this.$set(this, list[i].loading, false);
    }
    this.bWASM = false;
    /**
     * ResourcesPath & ProductKey must be set in order to use the library!
     */
    Dynamsoft.DWT.ResourcesPath = "dwt-resources";
    Dynamsoft.DWT.organizationID = "100780405";
    Dynamsoft.DWT.Containers = [
      {
        WebTwainId: "dwtObject",
        ContainerId: this.containerId,
        Width: "100%",
        Height: "400px",
      },
    ];
    Dynamsoft.DWT.RegisterEvent("OnWebTwainReady", () => {
      this.Dynamsoft_OnReady();
    });
    Dynamsoft.DWT.Load();
  },

  methods: {
    running() {
      if (this.$refs.form.validate()) {
        this.registerInbound();
        this.addDepartmentsList();
        this.addAttatchmentToRequest();
      } else {
        this.$refs.from.focus();
      }
    },
    print(id) {
      this.barcodeValue = id;
      console.log("print --START");
      if (this.doprint) {
        this.barcodeToggle = true;
        const prtHtml = document.getElementById("printMe").innerHTML;
        // Open the print window
        const WinPrint = window.open(
          "",
          "",
          "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
        );
        WinPrint.document.write(`<!DOCTYPE html>
<html>
  <head>
    <style>
    body{
      padding: 0;
      margin: 0;
    }
    @media print {
      #bc {
        padding-bottom: 10px;
        zoom: 1;
        transform: rotate(180deg);
      }
    }
    </style>
  </head>
  <body>
    <div id="bc">
    ${prtHtml}
    </div>
  </body>
</html>`);
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
      }
            this.showAlterSuccessMessage(id);

      console.log("print --END");
    },
    list(path, url) {
      this.filsUrls.push({
        url: url,
        name: this.attachmentName.toString(),
        path: path,
        type: this.selectedAttatchmentType.toString(),
        category: this.selectedAttatchmentCategory.toString(),
      });
      this.resetAttatchement();
    },
    SaveImage() {
      if (this.DWObject) {
        this.DWObject.IfShowFileDialog = true;
        if (this.DWObject.HowManyImagesInBuffer > 0)
          this.DWObject.SaveAllAsMultiPageTIFF("WebTWAINImage.tiff");
      }
    },
    Dynamsoft_OnPostAllTransfers() {
      var _this = this;
      if (this.DWObject) {
        if (this.DWObject.HowManyImagesInBuffer > 0) {
          var strHTTPServer = "https://emp.adf.gov.sa";
          this.DWObject.HTTPPort = location.port == "" ? 443 : 443;
          var strActionPage = "/cms7514254/api/FileManager/UploadFile?k=cms";
          /**
           * 1.change file name, - REMOVE SPACES,
           *
           */
          var uploadfilename = this.attachmentName + ".pdf";
          this.DWObject.ClearAllHTTPFormField();
          this.DWObject.SetHTTPFormField("k", "cms");

          this.DWObject.HTTPUploadAllThroughPostAsPDF(
            strHTTPServer,
            strActionPage,
            uploadfilename,
            function OnHttpUploadSuccess() {
              console.log("successful");
            },
            function onServerReturnedSomething(
              errorCode,
              errorString,
              response
            ) {
              if (errorCode != 0 && errorCode != -2003) {
                console.log("errorString: " + errorString);
              } else {
                var res = response.replaceAll('"', "");
                console.log("response");
                console.log(res);

                var url =
                  "https://emp.adf.gov.sa/cms7514254/api/FileManager/GetFile?k=".concat(
                    res
                  );
                _this.list(res, url);
              }
            }
          );
        }
      }
      /*
      3. call uploadFiles
      */
    },
    Dynamsoft_OnReady() {
      this.DWObject = Dynamsoft.DWT.GetWebTwain(this.containerId);
      this.bWASM = Dynamsoft.Lib.env.bMobile || !Dynamsoft.DWT.UseLocalService;
      if (this.bWASM) {
        this.DWObject.Viewer.cursor = "pointer";
      } else {
        let sources = this.DWObject.GetSourceNames();
        this.selectSources = document.getElementById("sources");
        this.selectSources.options.length = 0;
        for (let i = 0; i < sources.length; i++) {
          this.selectSources.options.add(new Option(sources[i], i.toString()));
        }
      }
    },
    /**
     * Acquire images from scanners or cameras or local files
     */
    acquireImage() {
      if (!this.DWObject) this.DWObject = Dynamsoft.DWT.GetWebTwain();
      if (this.bWASM) {
        alert("Scanning is not supported under the WASM mode!");
      } else if (
        this.DWObject.SourceCount > 0 &&
        this.DWObject.SelectSourceByIndex(this.selectSources.selectedIndex)
      ) {
        const onAcquireImageSuccess = () => {
          this.DWObject.CloseSource();
        };
        const onAcquireImageFailure = onAcquireImageSuccess;
        this.DWObject.OpenSource();
        this.DWObject.AcquireImage(
          {},
          onAcquireImageSuccess,
          onAcquireImageFailure
        );
      } else {
        alert("الماسح الضوئي غير متصل");
      }
    },
    /**
     * Open local images.
     */
    openImage() {
      if (!this.DWObject) this.DWObject = Dynamsoft.DWT.GetWebTwain();
      this.DWObject.IfShowFileDialog = true;
      /**
       * Note:
       * This following line of code uses the PDF Rasterizer which is an extra add-on that is licensed seperately
       */
      this.DWObject.Addon.PDF.SetConvertMode(
        Dynamsoft.DWT.EnumDWT_ConvertMode.CM_RENDERALL
      );
      this.DWObject.LoadImageEx(
        "",
        Dynamsoft.DWT.EnumDWT_ImageType.IT_ALL,
        () => {
          //success
          
        },
        () => {
          //failure
        }
      );
    },
    addDepartmentsList() {
      console.log("addDepartmentsList --- START");
      for (let i = 0; i < this.toCopies.length; i++) {
        this.requestBody.RelatedGehat.push({
          Name: this.listSearchDep(this.toCopies[i], this.departments).GehaName,
          Type: 2,
          Text6: "COPY",
          Value: this.listSearchDep(this.toCopies[i], this.departments)
            .ManagerUserName,
        });
      }
      console.log("addDepartmentsList -- END");
    },
    sendSMS(id) {
      console.log("sendSMS --START");
      if (this.doSendSMS) {
        var sms2 =
          "عزيزي العميل، \n" +
          "نفيدكم بأنه تم استلام معاملتك في صندوق التنمية الزراعية بالرقم المرجعي :" +
          "\n" +
          id +
          ".";

        this.sendSmsRequestBody.MobileNo = this.mobileNumber;
        this.sendSmsRequestBody.Message = sms2;
        Vue.axios
          .post(
            "https://emp.adf.gov.sa/cms7514254/api/cms/SendSMS",
            this.sendSmsRequestBody
          )
          .then((resp) => {
            console.log("sendSMS --END");
            return resp.data;
          });
      }
      this.print(id)
    },
    deliveryCompany(value) {
      if (value.localeCompare(this.deliveryCo[0]) == 0) {
        //smsa
        this.requestBody.DeliveryBy = "smsa";
      } else if (value.localeCompare(this.deliveryCo[1]) == 0) {
        //fedex
        this.requestBody.DeliveryBy = "fedex";
      }
    },
    fawziway(value) {
      this.commpanyToggle = false;
      if (value.localeCompare(this.sendway[1]) == 0) {
        // البريد السعودي
        this.requestBody.SenderType = "SPO";
      } else if (value.localeCompare(this.sendway[0]) == 0) {
        // مراسل
        this.requestBody.SenderType = "MADF";
      } else if (value.localeCompare(this.sendway[2]) == 0) {
        // شركة شحن
        this.commpanyToggle = true;
        this.requestBody.SenderType = "deliveryCo";
      }
    },
    deleteAtt(index) {
      this.filsUrls.splice(this.filsUrls[index], 1);
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
        this.Dynamsoft_OnPostAllTransfers();
      }
    },
    resetAttatchement() {
      this.$refs.attatchmentForm.reset();
    },
    registerInbound() {
      console.log("registerInbound --- START");
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
      this.requestBody.OutboundGDate = this.date;
      this.requestBody.IOboundRemarks = this.remarks;
      this.requestBody.OutboundDocNo = this.outboundNumber;
      this.requestBody.RequestDate = new Date().toLocaleString();
      this.requestBody.OutboundHDate = this.date;
      if (this.other) {
        this.requestBody.FromGeha = this.otherTo;
      } else {
        this.requestBody.FromGeha = this.from;
      }

      this.requestBody.FromID = this.listSearch(this.from, this.entities);

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
        this.to,
        this.departments
      ).ManagerUserName;
      this.requestBody.DestNumber = this.listSearchDep(
        this.to,
        this.departments
      ).DeptNo;
      this.requestBody.SelectedManagerName = this.listSearchDep(
        this.to,
        this.departments
      ).GehaName;
      //سجل تجاري او هوية وطنية

      if (this.commercialNumber) {
        // 1-> سجل تجاري
        this.requestBody.RelatedID = this.userID;
        this.requestBody.VerificationType = "2";
      }
      if (this.numberId) {
        // 2-> هوية الوطنية
        this.requestBody.VerificationType = "1";
        this.requestBody.RelatedID = this.userID;
      }

      this.requestBody.RelatedEmail = this.email;
      this.requestBody.RelatedName = this.senderName;
      this.requestBody.RelatedPhone = this.mobileNumber;

      console.log("registerInbound --- END");
    },
    sendRequest() {
      console.log("sendRequest --START");
      this.isLoading = true;

      Vue.axios
        .post(
          "https://emp.adf.gov.sa/cms7514254/api/cms/save",
          this.requestBody
        )
        .then((resp) => {
          this.isLoading = false;
          if (!resp.data.ErrorCode) {
      this.sendOriginRequest(resp.data.Num.toString());
          } else {
            this.showAlterFailureMessage(resp.data.ErrorCode);
          }
        });
      console.log("sendRequest --END");
    },
    postSend() {
      // origin
      //  const callback = () => {
      //   this.$router.push({
      //   name: "inboundbox", //use name for router push
      // });
      //  };
  

    },
    sendOriginRequest(incidentNumber) {
      console.log("sendOriginRequest --START");
      if (this.sendOriginal) {
        this.sendOriginRequestBody.IncidentNumber = incidentNumber;
        this.sendOriginRequestBody.GehaCode = this.listSearchDep(
          this.originalTo,
          this.departments
        ).DeptNo;
        this.sendOriginRequestBody.GehaName = this.originalTo;
        this.sendOriginRequestBody.Details = this.remarksOrigin;

        this.sendOriginRequestBody.RecieverUsername = this.listSearchDep(
          this.originalTo,
          this.departments
        ).ManagerUserName;
        this.sendOriginRequestBody.title =
          "طلب تأكيد استلام الوارد رقم" +
          ": " +
          incidentNumber +
          " - " +
          this.title;

        Vue.axios
          .post(
            "https://emp.adf.gov.sa/cms7514254/api/cms/ConfirmInboundReceive",
            this.sendOriginRequestBody
          )
          .then((resp) => {
            this.isLoading = false;
            console.log("sendOriginRequest --END");
            return resp.data;
          });
      }
      this.sendSMS(incidentNumber);
      console.log("sendOriginRequest --END");
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
      console.log("addAttatchmentToRequest --START");
      if (this.filsUrls.length == 0) {
        console.log("addAttatchmentToRequest --END");
        this.showAlterWarningMessage();
      } else {
        for (var i = 0; i < this.filsUrls.length; i++) {
          this.requestBody.RelatedAtt.push({
            FileName: this.filsUrls[i].name.replaceAll(" ", "_"),
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
        console.log("addAttatchmentToRequest --END");
        this.sendRequest();
      }
    },
    showAlterSuccessMessage(id) {
      this.$fire({
        title: "تم الإرسال بنجاح",
        text: "رقم الطلب: " + id,
        type: "success",
        confirmButtonText: "إغلاق",
        confirmButtonColor: "#28714e",
      }).then(() => {
        this.$router.push({
         name: "inboundbox", //use name for router push
       });
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
      });
    },
    showAlterWarningMessage() {
      var resp = false;
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
        if (result.value == true) {
          this.sendRequest();
        }
      });
      return resp;
    },
    confidentialTitle(value) {
      if (
        value == "سري" ||
        value == "سري للغاية" ||
        value == "غير قابل للتداول"
      ) {
        this.title = "سري";
        this.titleValid = true;
      } else {
        this.titleValid = false;
        this.title = "";
      }
    },
    otherSelection(value) {
      if (value.localeCompare("اخرى") == 0) {
        this.other = true;
      } else {
        this.other = false;
      }
    },
    checkNumbers(value) {
      if (value.localeCompare("رقم الهوية الوطنية / الإقامة") == 0) {
        this.numberId = true;
        this.commercialNumber = false;
        this.requestBody.VerificationType = "1";
      } else if (value.localeCompare("رقم السجل التجاري") == 0) {
        this.requestBody.VerificationType = "2";
        this.commercialNumber = true;
        this.numberId = false;
      }
    },
  }, //End of Methodes
  watch: {
    selectedConfid(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.confidentialTitle(newValue);
      }
    },
    selectNumber(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.checkNumbers(newValue);
      }
    },
    from(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.otherSelection(newValue);
      }
    },
    rowType(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fawziway(newValue);
      }
    },
    rowdeliveryCo(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.deliveryCompany(newValue);
      }
    },
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
