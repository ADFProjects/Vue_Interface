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
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col>
                <v-autocomplete
                  :items="items"
                  label="واردة من"
                  outlined
                ></v-autocomplete>
              </v-col>
              <v-col>
                <v-text-field
                  type="number"
                  class="inputNumber"
                  label="رقم الوارد"
                  outlined
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
                  outlined
                ></v-autocomplete>
              </v-col>
              <v-col>
                <v-text-field
                  type="number"
                  class="inputNumber"
                  label="رقم الصادر"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <!--  the title should be "سري" when the type is confidential  -->
            <v-text-field label="الموضوع" outlined></v-text-field>
          </v-container>
          <v-container>
            <v-row>
              <v-col>
                <v-autocomplete
                  :items="items"
                  label="درجة الأهمية"
                  outlined
                ></v-autocomplete>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="items"
                  label="درجة السرية"
                  outlined
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col>
                <v-autocomplete
                  :items="items"
                  label="نوع الخطاب"
                  outlined
                ></v-autocomplete>
              </v-col>
              <v-col>
                <v-autocomplete
                  :items="items"
                  label="التصنيف الموضوعي"
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
                    :items="items"
                    label="نوع المرفق"
                    outlined
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-autocomplete
                    cols="4"
                    :items="items"
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
              outlined
              name="input-7-4"
              label="الملاحظات"
            ></v-textarea>
          </v-container>
          <v-container>
            <div class="text-center">
              <v-btn rounded color="green" dark large>
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
import Vue from 'vue';
import uq from "@umalqura/core";
import UploadService from "../services/UploadFilesService";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

axios.defaults.headers.post['ClientID'] = 'Contest01' // for POST requests
axios.defaults.headers.common['ClientKey'] = 'ADFFE1165rDDfTYR' // for all requests 

const d = uq();
const day = d.format("yyyy-MM-dd");
const today = d.format("yyyy-MM-dd", "en");

export default {
  mounted() {
    UploadService.getFiles().then((response) => {
      this.fileInfos = response.data;
    });

    Vue.axios.get("http://dummy.restapiexample.com/api/v1/employees")
      .then((resp) => {
        console.warn(resp.data);
      });
  },
  data: function () {
    return {
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
    };
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
