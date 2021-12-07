<template>
  <div id="app" class="d-flex justify-center my-application">
    <v-app id="inspire" class="addBackground">
      <v-main class="my-application">
        <v-container fluid>
          <!-- <v-container fluid> -->
          <v-app-bar
            elevation="20"
            style="border-radius: 4px; opacity: 0.9 !important"
            width="1160"
            color="#28714e"
            dark
            class="mb-4"
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

            <div>
              <p
                class="my-10 font-weight-medium my-application"
                style="color: #e6e6e6; margin: 15px; margin-left: 8px"
              >
                إستعلام
              </p>
            </div>

            <p
              class="my-10 font-weight-medium my-application"
              style="opacity: 0.6 !important; padding-top: 1px"
            >
              المعاملات
            </p>

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
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                style="font-weight: bold; font-size: 16px; width: 1000px"
                label="فزر باستخدام"
                class="my-application"
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
            :items="keys"
            :items-per-page.sync="itemsPerPage"
            :page.sync="page"
            :search="search"
            sort-by="IncidentNumber"
            :sort-desc="sortDesc"
            class="elevation-5 my-application"
            :footer-props="{
              itemsPerPageOptions: [5, 10, 15, 25],

              'items-per-page-all-text': 'الكل',
              'items-per-page-text': 'عدد المعاملات في الصفحة:',
              showFirstLastPage: true,
              pageText: 'من {0}-{1} إلى {2}',
            }"
          >
            <template v-slot:no-data>
              <v-alert
                :value="true"
                color="#339966"
                border="top"
                colored-border
                type="error"
                height="70"
                elevation="6"
                style="top: 20px; padding-top: 25px; color: #595959"
              >
                <span class="my-application">
                  الصندوق فارغ، لا يوجد معاملات لعرضها هنا.
                </span>
              </v-alert>
            </template>

            <v-alert
              slot="no-results"
              :value="true"
              border="top"
              color="#339966"
              colored-border
              type="error"
              elevation="6"
              style="
                text-align: center;
                top: 20px;
                padding-top: 25px;
                color: #595959;
              "
            >
              <span class="my-application">
                بحثك عن "{{ search }}" لم يعثر على نتائج.
              </span>
            </v-alert>
            <!--  probs has been removed -->
            <template v-slot:default>
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
                    style="border-radius: 10px"
                  >
                    <v-card-title
                      style="background-color: #f2f2f2"
                      class="subheading font-weight-bold my-application"
                    >
                      <span
                        style="padding-left: 10px; font-size: 16px"
                        class="my-application"
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
                                {{ item[key.id].substr(0, 10) }}
                              </v-list-item-content>
                            </template>
                            <span
                              class="text-truncate ml-1 mr-1 my-application"
                              >{{ item[key.id] }}</span
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
          id: "Importance",
        },
        {
          text: "درجة السرية",
          id: "Confidential",
        },
        {
          text: "نوع الخطاب",
          id: "txt6",
        },
      ],
    };
  },
  methods: {
    navigate(item) {
      // 1 outbound
      // 2 inner outbound
      // 3 inbound
      if (item.FromID == "127000") {
        item.viewType = 1;
      } else {
        item.viewType = 3;
      }
      this.$store.commit("SET_CURRENT", item);
      this.$router.push({
        name: "viewCorrespondence", //use name for router push
      });
    },
    searchbyid(id) {
      console.log(id);
      Vue.axios
        .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetCms?ReqID=" + id)
        .then((resp) => {
          this.navigate(resp.data);
        });
    },
  }, // end methodes
  mounted() {
  },
  computed: {
    displayData() {
      return this.$store.state.searchedList;
    },
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
.v-text-field >>> label {
  font-family: "Almarai", sans-serif !important;
  font-size: 0.9em;
}
.v-select >>> label {
  font-size: 16px;
}
.v-tooltip__content {
  font-size: 14px !important;
  opacity: 0.8 !important;
  pointer-events: auto;
  color: white;
  background-color: #404040;
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
