<template>
  <div id="app" class="d-flex justify-center my-application">
    <v-app id="inspire" class="my-application">
      <v-main>
        <v-container fluid>
          <!-- <v-container fluid> -->
          <v-app-bar
            style="border-radius: 4px; opacity: 0.9 !important"
            width="1160"
            color="#28714e"
            dark
            class="mb-4 my-application"
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
              <span class="my-application">الإستعلام عن المعاملة</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-text-field
                  v-on="on"
                  v-model="search"
                  clearable
                  flat
                  solo-inverted
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="البحث"
                  class="mx-4 my-application"
                  style="font-size: 16px; font-weight: bold; width: 420px"
                ></v-text-field>
              </template>
              <span class="my-application"
                >البحث بإستخدام جميع خانات المعاملة</span
              >
            </v-tooltip>

            <template v-if="$vuetify.breakpoint.mdAndUp">
              <v-spacer></v-spacer>
              <v-select
                class="my-application"
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                style="font-weight: bold; font-size: 16px"
                label="فزر باستخدام"
              ></v-select>
              <v-spacer></v-spacer>

              <v-btn-toggle v-model="sortDesc" mandatory>
                <v-tooltip bottom>
                  <template #activator="{ on }">
                    <v-btn
                      v-on="on"
                      large
                      depressed
                      color="#ffffff"
                      :value="true"
                    >
                      <v-icon style="color: #28714e">mdi-arrow-down</v-icon>
                    </v-btn>
                  </template>
                  <span class="my-application"
                    >ترتيب المعاملات من الأحدث إلى الأقدم</span
                  >
                </v-tooltip>
                <v-tooltip bottom>
                  <template #activator="{ on }">
                    <v-btn
                      v-on="on"
                      large
                      depressed
                      color="#ffffff"
                      :value="false"
                    >
                      <v-icon style="color: #28714e">mdi-arrow-up</v-icon>
                    </v-btn>
                  </template>
                  <span class="my-application"
                    >ترتيب المعاملات من الأقدم إلى الأحدث</span
                  >
                </v-tooltip>
              </v-btn-toggle>
            </template>
          </v-app-bar>

          <v-data-iterator
            style="font-weight: bold; color: #4d4d4d"
            :items="items"
            :items-per-page.sync="itemsPerPage"
            :page.sync="page"
            :search="search"
            sort-by="IncidentNumber"
            :sort-desc="sortDesc"
            class="elevation-2 my-application"
            :footer-props="{
              showFirstLastPage: true,
              itemsPerPageOptions: [5, 10, 15, 25],
              pageText: '',

              'items-per-page-text': 'عدد المعاملات في الصفحة:',
            }"
          >
            <template v-slot:no-data>
              <v-alert
                class="alerts"
                :value="true"
                color="#339966"
                border="top"
                colored-border
                type="error"
                height="70"
                elevation="5"
                style="top: 20px; padding-top: 25px; color: #595959"
              >
                الصندوق فارغ، لا يوجد معاملات لعرضها هنا.
              </v-alert>
            </template>

            <v-alert
              class="alerts"
              slot="no-results"
              :value="true"
              border="top"
              color="#339966"
              colored-border
              type="error"
              elevation="5"
              style="
                text-align: center;
                top: 20px;
                padding-top: 25px;
                color: #595959;
              "
            >
              بحثك عن "{{ search }}" لم يعثر على نتائج.
            </v-alert>
            <!--  probs has been removed -->
            <template v-slot:default class="my-application">
              <v-row class="ma-2 my-application">
                <v-col
                  md="4"
                  class="pa-3 d-flex flex-column my-application"
                  v-for="item in displayData"
                  :key="item.IncidentNumber"
                  cols="12"
                  sm="6"
                  lg="3"
                >
                  <v-card
                    @click="searchbyid(item.ID)"
                    class="elevation-5 flex d-flex flex-column my-application"
                    style="border-radius: 10px; color: #595959"
                  >
                    <v-card-title
                      style="background-color: #f2f2f2"
                      class="subheading font-weight-bold my-application"
                    >
                      <span
                        class="my-application"
                        style="padding-left: 10px; font-size: 16px"
                      >
                        رقم المعاملة |
                      </span>
                      <span
                        class="my-application"
                        style="color: #2d8659; font-size: 16px"
                      >
                        {{ item.IncidentNumber }}
                      </span>
                    </v-card-title>

                    <v-divider></v-divider>

                    <div class="body-1 my-application">
                      <v-list dense>
                        <v-list-item v-for="key in keys" :key="key.text">
                          <v-list-item-content
                            class="my-application"
                            :class="{
                              'light-green lighten-5': sortBy === key.text,
                            }"
                            style="
                              color: #595959;
                              font-weight: bold;
                              font-size: 13px;
                            "
                          >
                            {{ key.text }}:
                          </v-list-item-content>

                          <v-tooltip
                            bottom
                            :disabled="item.IOboundSubject.length < 15"
                          >
                            <template #activator="{ on }">
                              <v-list-item-content
                                v-on="on"
                                class="truncate align-end my-application"
                                :class="{
                                  'light-green lighten-5 my-application':
                                    sortBy === key.text,
                                }"
                                style="font-size: 12px"
                              >
                                {{ item[key.id] }}
                              </v-list-item-content>
                            </template>
                            <span
                              class="text-truncate ml-1 mr-1 my-application"
                            >
                              {{ item[key.id] }}</span
                            >
                          </v-tooltip>
                        </v-list-item>
                      </v-list>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";

Vue.use(VueAxios, axios);

axios.defaults.headers.common["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.common["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

axios.defaults.headers.post["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.post["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests

export default {
  data: () => {
    return {
      displayData: "",
      // itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: true,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: [
        {
          text: "التاريخ",
          id: "OutboundHDate",
        },
        {
          text: "الموضوع",
          id: "IOboundSubject",
        },
        {
          text: "درجة الأهمية",
          id: "ImportanceVal",
        },
        {
          text: "درجة السرية",
          id: "ConfidentialVal",
        },
        {
          text: "نوع الخطاب",
          id: "IOboundType",
        },
        {
          text: "المرفقات",
          id: "IOboundCategory",
        },
        {
          text: "الملاحظات",
          id: "IOboundRemarks",
        },
      ],
      items: [
        {
          name: "رقم المعاملة #1235",

          التاريخ: "22/22/2021",
          الموضوع: "خطاب وارد من جهة خارجية",
          "درجة الأهمية": "مهم",
          "درجة السرية": "سري جدا",
          "نوع الخطاب": "شكوى",
          المرفقات: 3,
          الملاحظات: "vvvvvر..",
        },
        {
          name: "رقم المعاملة #1236",
          التاريخ: "01/02/2021",
          الموضوع: "خطاب وارد داخلي",
          "درجة الأهمية": "مهم",
          "درجة السرية": "سري جدا",
          "نوع الخطاب": "شكوى",
          المرفقات: 3,
          الملاحظات: "يجب توقيع المدير..",
        },
        {
          name: "رقم المعاملة #1237",
          التاريخ: "01/02/2021",
          الموضوع: "خطاب وارد داخلي",
          "درجة الأهمية": "مهم",
          "درجة السرية": "سري جدا",
          "نوع الخطاب": "شكوى",
          المرفقات: 3,
          الملاحظات: "يجب توقيع المدير..",
        },
        {
          name: "رقم المعاملة #1234",
          التاريخ: "01/02/2021",
          الموضوع: "خطاب وارد داخلي",
          "درجة الأهمية": "مهم",
          "درجة السرية": "سري جدا",
          "نوع الخطاب": "شكوى",
          المرفقات: 3,
          الملاحظات: "يجب توقيع المدير..",
        },
        {
          name: "رقم المعاملة #1238",
          التاريخ: "01/02/2021",
          الموضوع: "خطاب وارد داخلي",
          "درجة الأهمية": "مهم",
          "درجة السرية": "سري جدا",
          "نوع الخطاب": "شكوى",
          المرفقات: 3,
          الملاحظات: "يجب توقيع المدير..",
        },
        {
          name: "رقم المعاملة #1239",
          التاريخ: "01/02/2021",
          الموضوع: "خطاب وارد داخلي",
          "درجة الأهمية": "مهم",
          "درجة السرية": "سري جدا",
          "نوع الخطاب": "شكوى",
          المرفقات: 3,
          الملاحظات: "يجب توقيع المدير..",
        },
        {
          name: "رقم المعاملة #1210",
          التاريخ: "01/02/2021",
          الموضوع: "خطاب وارد داخلي",
          "درجة الأهمية": "مهم",
          "درجة السرية": "سري جدا",
          "نوع الخطاب": "شكوى",
          المرفقات: 3,
          الملاحظات: "يجب توقيع المدير..",
        },
        {
          name: "رقم المعاملة #1211",
          التاريخ: "01/02/2021",
          الموضوع: "خطاب وارد داخلي",
          "درجة الأهمية": "مهم",
          "درجة السرية": "سري جدا",
          "نوع الخطاب": "شكوى",
          المرفقات: 3,
          الملاحظات: "يجب توقيع المدير..",
        },
        {
          name: "رقم المعاملة #1212",
          التاريخ: "01/02/2021",
          الموضوع: "خطاب وارد داخلي",
          "درجة الأهمية": "مهم",
          "درجة السرية": "سري جدا",
          "نوع الخطاب": "شكوى",
          المرفقات: 3,
          الملاحظات: "يجب توقيع المدير..",
        },
        {
          name: "رقم المعاملة #1213",
          التاريخ: "01/02/2021",
          الموضوع: "خطاب وارد داخلي",
          "درجة الأهمية": "مهم",
          "درجة السرية": "سري جدا",
          "نوع الخطاب": "شكوى",
          المرفقات: 3,
          الملاحظات: "يجب توقيع المدير..",
        },
      ],
    };
  },
  methods: {
    navigate(item) {
      this.$router.push({
        name: "viewCorrespondence", //use name for router push
        params: { data: item },
      });
    },
    searchbyid(id) {
      console.log(id);
      Vue.axios
        .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCms?ReqID=499")
        .then((resp) => {
          this.navigate(resp.data);
        });
    },
  }, // end methodes
  mounted() {
    let data = this.$route.params.data;
    this.displayData = data;
    console.log("data is");
    console.log(this.displayData);
  },
  computed: {
    filteredKeys() {
      //return this.keys.filter((key.t) => key.text !== "رقم المعاملة");
      return this.keys;
    },
  },
};
</script>

<style>
.v-data-iterator {
  font-size: 10px;
}
.v-text-field input {
  font-size: 0.9em;
}
.alerts {
  font-size: 16x;
  font-weight: bold;
  color: #595959;
  font-family: "Almarai", sans-serif !important;
  text-align: center;
}
</style>

<style lang="css" scoped>
.v-select >>> label {
  font-size: 16px;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Almarai:wght@300;400&display=swap");

$font-family: "Almarai", sans-serif;
.my-application {
  .headline,
  [class*="display-"],
  [class*="text-"] {
    font-family: $font-family, sans-serif !important;
    font-size: 16px !important;
  }
  font-family: $font-family, sans-serif !important;
}
</style>




