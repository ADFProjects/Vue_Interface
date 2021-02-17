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
      <v-card class="px-3">
        <v-form ref="form" v-model="valid" lazy-validations>
          <v-container>
            <v-row>
              <v-col>
                <v-autocomplete
                  :items="entities"
                  item-text="Name"
                  label="واردة من"
                  :rules="[rules.required]"
                  outlined
                  required
                ></v-autocomplete>
              </v-col>
              <v-col>
                <v-text-field
                  type="number"
                  class="inputNumber"
                  :rules="[rules.required]"
                  label="رقم الوارد"
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
                      v-model="date"
                      label="وتاريخ"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-hijri-date-picker
                    :max="today"
                    v-model="date"
                    locale="ar"
                  />
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col>
                <v-autocomplete
                  :items="items"
                  label="صادرة إلى"
                  :rules="[rules.required]"
                  required
                  outlined
                ></v-autocomplete>
              </v-col>
              <v-col>
                <!-- TODO : change the value -->
                <v-text-field
                  type="number"
                  class="inputNumber"
                  label="رقم الصادر"
                  value="000000000"
                  readonly
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
                  v-model="title"
                  :rules="[rules.required, rules.counterTitle]"
                  required
                  maxlength="25"
                  counter
                  label="الموضوع"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col>
                <v-autocomplete
                  cols="1"
                  :items="category"
                  item-text="Name"
                  label="التصنيف"
                  :rules="[rules.required]"
                  required
                  outlined
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field label="الاسم" outlined></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  type="number"
                  class="inputNumber"
                  label="رقم الجوال"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  type="number"
                  class="inputNumber"
                  label="رقم الهوية الوطنية"
                  :rules="[rules.required]"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="email"
                  :rules="[rules.email]"
                  label="البريد الإلكتروني"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col>
                <v-autocomplete
                  :items="importance"
                  item-text="Name"
                  label="درجة الأهمية"
                  :rules="[rules.required]"
                  required
                  outlined
                ></v-autocomplete>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="confidentiality"
                  item-text="Name"
                  label="درجة السرية"
                  :rules="[rules.required]"
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
                  :items="correspondenceType"
                  item-text="Name"
                  label="نوع الخطاب"
                  :rules="[rules.required]"
                  required
                  outlined
                ></v-autocomplete>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="objectiveClass"
                  item-text="Name"
                  label="التصنيف الموضوعي"
                  :rules="[rules.required]"
                  required
                  outlined
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
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
                    color="light-blue"
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
                    accept="*/*"
                    multiple
                    outlined
                    label="اختيار مرفق"
                    @change="selectFiles"
                  ></v-file-input>
                </v-col>
                <v-col>
                  <v-autocomplete
                    cols="4"
                    :items="attatchmentType"
                    label="نوع المرفق"
                    item-text="Name"
                    outlined
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-autocomplete
                    cols="4"
                    :items="attatchmentCategory"
                    item-text="Name"
                    label="تصنيف المرفق"
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
                    @click="uploadFiles"
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

              <v-card v-if="fileInfos.length > 0" class="mx-auto">
                <v-list>
                  <v-subheader>List of Images</v-subheader>
                  <v-list-item-group color="primary">
                    <v-list-item
                      v-for="(file, index) in fileInfos"
                      :key="index"
                    >
                      <v-list-item-content>
                        <v-list-item-title class="mb-3">
                          <a :href="file.url">{{ file.name }}</a>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <img :src="file.url" :alt="file.name" height="80px" />
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </div>
          </v-container>
          <v-container>
            <!--  the title should be "سري" when the type is confidential  -->
            <v-textarea
              v-model="description"
              :rules="rules.counterDescription"
              maxlength="500"
              counter
              outlined
              name="input-7-4"
              label="الملاحظات"
            ></v-textarea>
          </v-container>
          <v-container>
            <div class="text-center">
           <v-btn
      :disabled="valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      <h2>إرسال</h2>
    </v-btn>
            </div>
          </v-container>
        </v-form>
      </v-card>
      <pre></pre>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import uq from "@umalqura/core";
import UploadService from "../services/UploadFilesService";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

axios.defaults.headers.post["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.common["ClientID"] = "Contest01"; // for all requests
axios.defaults.headers.post["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests
axios.defaults.headers.common["ClientKey"] = "ADFFE1165rDDfTYR"; // for all requests
const d = uq();
const day = d.format("yyyy-MM-dd");
const today = d.format("yyyy-MM-dd", "en");

export default {
  data: function () {
    return {
      valid: true,
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
      objectiveClass: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      entities: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      confidentiality: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      importance: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      category: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      correspondenceType: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      attatchmentType: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      attatchmentCategory: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      attatchmentExtention: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      title: "",
      email: "",
      rules: {
        required: (value) => !!value || "مطلوب",
        counterTitle: (value) => value.length <= 25,
        counterDescription: (value) => value.length <= 500,
        email: (value) => {
          if (value.length > 0) {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "البريد الإلكتروني غير صحيح";
          }
        },
      },
    };
  },
  mounted() {
    UploadService.getFiles().then((response) => {
      this.fileInfos = response.data;
    });

    Vue.axios
      .get("http://adf-testintgr01/EGPortalApi/api/cms/GetCMSLookups?type=1")
      .then((resp) => {
        this.objectiveClass = resp.data;
        console.log(resp.data);
      });
    Vue.axios
      .get("http://adf-testintgr01/EGPortalApi/api/cms/GetCMSLookups?type=3")
      .then((resp) => {
        this.confidentiality = resp.data;
        console.log(resp.data);
      });
    Vue.axios
      .get("http://adf-testintgr01/EGPortalApi/api/cms/GetCMSLookups?type=13")
      .then((resp) => {
        this.entities = resp.data;
        console.log(resp.data);
      });
    Vue.axios
      .get("http://adf-testintgr01/EGPortalApi/api/cms/GetCMSLookups?type=4")
      .then((resp) => {
        this.importance = resp.data;
        console.log(resp.data);
      });
    Vue.axios
      .get("http://adf-testintgr01/EGPortalApi/api/cms/GetCMSLookups?type=2")
      .then((resp) => {
        this.category = resp.data; // copy or origin
        console.log(resp.data);
      });
    Vue.axios
      .get("http://adf-testintgr01/EGPortalApi/api/cms/GetCMSLookups?type=11")
      .then((resp) => {
        this.correspondenceType = resp.data;
        console.log(resp.data);
      });
    Vue.axios
      .get("http://adf-testintgr01/EGPortalApi/api/cms/GetCMSLookups?type=6")
      .then((resp) => {
        this.attatchmentType = resp.data;
        console.log(resp.data);
      });
    Vue.axios
      .get("http://adf-testintgr01/EGPortalApi/api/cms/GetCMSLookups?type=12")
      .then((resp) => {
        this.attatchmentCategory = resp.data;
        console.log(resp.data);
      });

    Vue.axios
      .get("http://adf-testintgr01/EGPortalApi/api/cms/GetCMSLookups?type=7")
      .then((resp) => {
        this.attatchmentExtention = resp.data;
        console.log(resp.data);
      });
    Vue.axios
      .get("http://adf-testintgr01/EGPortalApi/api/cms/GetCMSLookups?type=2")
      .then((resp) => {
        this.category = resp.data;
        console.log(resp.data);
      });
  },

  methods: {
    selectFiles(files) {
      this.progressInfos = [];
      this.selectedFiles = files;
    },
    uploadFiles() {
      this.message = "";

      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    },
    upload(idx, file) {
      this.progressInfos[idx] = { percentage: 0, fileName: file.name };

      UploadService.upload(file, (event) => {
        this.progressInfos[idx].percentage = Math.round(
          (100 * event.loaded) / event.total
        );
      })
        .then((response) => {
          let prevMessage = this.message ? this.message + "\n" : "";
          this.message = prevMessage + response.data.message;

          return UploadService.getFiles();
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
      this.$refs.form.validate();
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      //timeout depending on uploading time
      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
};
</script>
