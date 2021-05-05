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

.v-text-field-content {
  direction: rtl;
  color: blue;
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
  <v-app>
    <v-main>
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validations>
          <loading
            :active="isLoading"
            :is-full-page="fullPage"
            :loader="waitingLoader"
          />
          <v-container>
            <v-row>
              <v-col v-show="toggleInbound">
                <v-text-field
                  readonly
                  ref="from"
                  label="واردة من"
                  v-model="from"
                  outlined
                  required
                  class="dir"
                ></v-text-field>
              </v-col>
              <v-col v-show="toggle">
                <!-- TODO : change the value -->
                <v-text-field
                  readonly
                  type="number"
                  class="inputNumber"
                  :label="idText"
                  v-model="IncidentNumber"
                  outlined
                  required
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
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      readonly
                      v-model="date"
                      label="بتاريخ"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col v-col v-show="toggle">
                <v-text-field
                  readonly
                  label="صادرة إلى"
                  v-model="to"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col v-show="toggleInbound">
                <!-- TODO : change the value -->
                <v-text-field
                  readonly
                  type="number"
                  class="inputNumber"
                  label="رقم الصادر من الجهة المرسلة"
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
                <v-text-field
                  readonly
                  label="درجة الأهمية"
                  v-model="selectedImportance"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  readonly
                  label="درجة السرية"
                  v-model="selectedConfid"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  readonly
                  label="نوع الخطاب"
                  v-model="selectedCorrespondenceType"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  readonly
                  label="التصنيف الموضوعي"
                  v-model="selectedObjectiveClass"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="9">
                <!--  the title should be "سري" when the type is confidential  -->
                <v-text-field
                  readonly
                  v-model="title"
                  required
                  maxlength="240"
                  counter
                  label="الموضوع"
                  outlined
                  ref="title"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="selectedCategory"
                  cols="1"
                  label="التصنيف"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  readonly
                  label="الاسم"
                  outlined
                  v-model="senderName"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  readonly
                  type="number"
                  v-model="mobileNumber"
                  class="inputNumber"
                  label="رقم الجوال"
                  outlined
                  placeholder="05xxxxxxxx"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  readonly
                  type="number"
                  class="inputNumber"
                  label="رقم الهوية الوطنية"
                  v-model="senderID"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  readonly
                  v-model="email"
                  label="البريد الإلكتروني"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-card class="mx-auto text-center" v-if="filsUrls.length > 0">
            <v-list>
              <v-subheader>
                <v-row style="font-weight: bold">
                  <v-col> <h6>اسم المرفق</h6></v-col>
                  <v-col> <h6>نوع المرفق</h6></v-col>
                  <v-col> <h6>تصنيف المرفق</h6></v-col>
                </v-row>
              </v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="file in filsUrls" :key="file">
                  <v-list-item-content>
                    <v-row>
                      <v-col>
                        <v-list-item-subtitle>
                          <a :href="file.url">{{ file.name }}</a>
                        </v-list-item-subtitle>
                      </v-col>
                      <v-col>
                        <v-list-item-subtitle>
                          <h6 :key="file">{{ file.type }}</h6>
                        </v-list-item-subtitle>
                      </v-col>
                      <v-col>
                        <v-list-item-subtitle>
                          <h6 :key="file">{{ file.category }}</h6>
                        </v-list-item-subtitle>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-form>
        <v-container>
          <!--  the title should be "سري" when the type is confidential  -->
          <v-textarea
            readonly
            v-model="remarks"
            maxlength="500"
            counter
            outlined
            name="input-7-4"
            label="الملاحظات"
          ></v-textarea>
        </v-container>

        <v-container v-show="toggleInbound">
          <v-row>
            <v-col>
              <div class="text-center">
                <v-btn
                  rounded
                  color="primary"
                  dark
                  large
                  @click="sendOriginal = !sendOriginal"
                >
                  <h5 class="white--text">إرسال أصل</h5>
                </v-btn>
              </div>
            </v-col>
            <v-col v-show="toggleInbound">
              <div class="text-right">
                <v-btn rounded color="green" dark large @click="resend">
                  <router-link :to="resendto">
                    <h5 class="white--text">تسديد الوارد</h5>
                  </router-link>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-show="false">
          <v-row>
            <v-col>
              <div class="text-center">
                <v-btn
                  rounded
                  color="red"
                  dark
                  large
                >
                  <h5 class="white--text">إلغاء</h5>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-show="toggleInbound">
          <v-card class="mx-auto text-center">
            <v-form ref="formOriginal" v-model="valid" lazy-validations>
              <v-row>
                <v-col cols="1"></v-col>
                <v-col v-show="sendOriginal">
                  <v-autocomplete
                    no-data-text="لايوجد بيانات"
                    :rules="[rules.required]"
                    :loading="isLoadingdepartments"
                    :items="departments"
                    item-text="GehaName"
                    label=" إلى"
                    v-model="originalTo"
                    required
                    outlined
                  ></v-autocomplete>
                </v-col>
                <v-col v-show="sendOriginal" cols="6">
                  <v-textarea
                    height="55"
                    maxlength="500"
                    v-model="remarksOrigin"
                    counter
                    outlined
                    name="input-7-4"
                    label="الملاحظات"
                  ></v-textarea>
                </v-col>
                <v-col v-show="sendOriginal" cols="2">
                  <router-link to="" @click="overlay = !overlay">
                    <v-btn color="info" dark large @click="validate">
                      <router-link :to="sendO">
                        <h5 class="white--text">إرسال</h5>
                      </router-link>
                    </v-btn>
                  </router-link>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-container>
      </v-card>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <pre></pre>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import uq from "@umalqura/core";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.use(VueAxios, axios);

axios.defaults.headers.common["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.common["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests

const d = uq();
const day = d.format("yyyy-MM-dd");
const today = d.format("yyyy-MM-dd", "en");

export default {
  components: {
    Loading,
  },
  data: function () {
    return {
      sendO: "",
      resendto: "",
      id: "",
      remarksOrigin: "",
      departments: [],
      isLoadingdepartments: true,
      idText: "",
      toggleInbound: true,
      requestBody: {
        RecieverUsername: "mohamed.fawzy",
        title: "طلب تأكيد استلام الوارد رقم 34343 ",
        Details: "ملاحظات ب",
        GehaCode: 1,
        GehaName: "ادارة المالية",
        IncidentNumber: 1000212,
      },
      originalTo: "",
      sendOriginal: false,
      overlay: false,
      toggle: true,
      isLoading: false,
      fullPage: false,
      waitingLoader: "bars",
      valid: true,
      titleValid: false,
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
      //Start of filed data
      outbound: "",
      inbound: "",
      IncidentNumber: "",
      from: "",
      to: "",
      by: "",
      title: "",
      email: "",
      remarks: "",
      outboundNumber: "",
      mobileNumber: "",
      senderName: "",
      senderID: "",
      input: "",
      selectedCategory: "",
      selectedImportance: "",
      selectedConfid: "",
      selectedCorrespondenceType: "",
      selectedObjectiveClass: "",
      selectedAttatchmentCategory: "",
      selectedAttatchmentType: "",
      //End of filed data
      filsUrls: [],
      rules: {
        required: (value) => !!value || "مطلوب",
      },
    };
  }, //data end
  mounted() {
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetDept?DeptType=1")
      .then((resp) => {
        this.departments = resp.data;
        this.isLoadingdepartments = false;
      });

    let data = this.$route.params.data;
    console.log("data is");
    console.log(data);
    this.fillData(data);
  },

  methods: {
    resend() {
      var obj = {
        IncidentNumber: this.requestBody.IncidentNumber,
        to: this.from,
        id: this.id,
        by: this.by,
      };
      console.log(obj);
      this.$router.push({
        name: "outbound", //use name for router push
        params: { data: obj },
      });
    },
    listSearchDep(nameKey, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].GehaName === nameKey) {
          return myArray[i];
        }
      }
    },
    fillAttatchment(list) {
      for (var i = 0; i < list.length; i++) {
        this.filsUrls.push({
          name: list[i].FileName,
          type: list[i].Text2,
          category: list[i].Text4,
          url:
            "https://emp.adf.gov.sa/cms7514254/api/FileManager/GetFile?k=" +
            list[i].FilePath,
        });
      } //end for

      console.log(this.filsUrls);
    },
    sendRequest() {
      this.isLoading = true;
      this.requestBody.GehaCode = this.listSearchDep(
        this.originalTo,
        this.departments
      ).DeptNo;
      this.requestBody.GehaName = this.originalTo;
      this.requestBody.Details = this.remarksOrigin;

      this.requestBody.RecieverUsername;
      this.requestBody.title;

      Vue.axios
        .post(
          "https://emp.adf.gov.sa/cms7514254/api/cms/ConfirmInboundReceive",
          this.requestBody
        )
        .then((resp) => {
          this.isLoading = false;
          console.log(resp.data);
          this.showAlterSuccessMessage();
          this.$router.push({
            name: "inboundbox", //use name for router push
          });
        });
    },
    fillData(data) {
      this.by = data.SourceType;
      this.from = data.FromGeha;
      this.id = data.FromID;
      this.to = data.ToGeha;
      this.title = data.IOboundSubject;
      this.email = data.RelatedEmail;
      this.remarks = data.IOboundRemarks;
      this.mobileNumber = data.RelatedPhone;
      this.senderName = data.RelatedName;
      this.senderID = data.RelatedID;
      this.selectedImportance = data.Importance;
      this.selectedConfid = data.Confidential;
      this.selectedCorrespondenceType = data.txt6;
      this.selectedObjectiveClass = data.IOboundCategory;
      this.selectedCategory = data.IOboundClassification;
      this.requestBody.IncidentNumber = data.IncidentNumber;
      if (data.IOboundClassification == "Copy") {
        this.selectedCategory = "صورة";
      }
      if (data.IOboundClassification == "Original") {
        this.selectedCategory = "أصل";
      }

      this.fillAttatchment(data.RelatedAtt);
      console.log(data.SourceType);
      if (data.SourceType % 2 != 0) {
        // رقم صادر الصندوق
        console.log("وارد");
        this.outboundNumber = data.OutboundDocNo;
        this.toggle = false;
        this.idText = "رقم الوارد";
      } else {
        this.idText = "رقم الصادر";
        this.toggleInbound = false;
        console.log("صادر");
        this.toggle = true;
        // رقم وارد الصندوق و رقم صادر الجهة المرسلة
        this.outboundNumber = data.OutboundDocNo;
        this.IncidentNumber = data.IncidentNumber;
      }
    },
    validate() {
      console.log("validate now");
      if (this.$refs.formOriginal.validate()) {
        console.log("is valide");
        this.sendRequest();
      }
    },
    showAlterSuccessMessage() {
      this.$fire({
        title: "تم التسجيل ",
        text: "تم تسجيل طلب إرسال أصل بنجاح",
        type: "success",
        confirmButtonText: "إغلاق",
      }).then((r) => {
        console.log(r.value);
      });
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
