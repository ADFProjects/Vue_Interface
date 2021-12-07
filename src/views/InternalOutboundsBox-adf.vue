<template class="my-application">
  <div id="app" class="d-flex justify-center my-application">
    <v-app id="inspire" class="my-application addBackground">
      <v-main class="my-application">
        <v-container>
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
                <!-- <loading
                  :active="isLoading"
                  :is-full-page="fullPage"
                  :loader="waitingLoader"
                /> -->
                <v-img
                  v-on="on"
                  src="~@/assets/OutboundsBox-adf.png"
                  alt="InboundImage"
                  max-height="100"
                  max-width="60"
                ></v-img>
              </template>
              <span class="my-application">صندوق البريد الصادر الداخلي</span>
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
                  style="font-size: 16px; font-weight: bold"
                ></v-text-field>
              </template>
              <span class="my-application"
                >البحث بإستخدام جميع خانات المعاملة</span
              >
            </v-tooltip>

            <template v-if="$vuetify.breakpoint.mdAndUp">
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

          <v-card>
            <v-data-table
              style="font-weight: bold; color: #595959"
              :header-props="{ sortIcon: null }"
              :headers="headers"
              :items="allOutboundsBox"
              :search="search"
              item-key="ID"
              :items-per-page="10"
              sort-by="IncidentNumber"
              :sort-desc="sortDesc"
              class="my-application"
              :footer-props="{
                itemsPerPageOptions: [5, 10, 15, 25],
                pageText: 'من {0}-{1} إلى {2}',
                showFirstLastPage: true,
                'items-per-page-text': 'عدد المعاملات في الصفحة:',
                //'items-per-page-all-text': 'الكل',
              }"
            >
              <template v-slot:item="{ item }" class="my-application">
                <tr
                  id="rowCols"
                  @click="searchbyid(item)"
                  class="text-center my-application"
                >
                  <td class="my-application" id="tdAll">
                    {{ item.IncidentNumber }}
                  </td>
                  <template class="my-application" id="tdAll">
                    <td class="my-application" id="tdAll">
                      <v-chip
                        id="tdAll"
                        :color="getColor(item.ResponseStatusName)"
                        dark
                        class="my-application"
                      >
                        {{ item.ResponseStatusName }}
                      </v-chip>
                    </td>
                  </template>

                  <v-tooltip bottom :disabled="item.IOboundSubject.length < 20">
                    <template #activator="{ on }">
                      <td id="tdAll" v-on="on" class="truncate my-application">
                        {{ item.IOboundSubject }}
                      </td>
                    </template>
                    <span class="text-truncate ml-1 mr-1 my-application">{{
                      item.IOboundSubject
                    }}</span>
                  </v-tooltip>

                  <td id="tdAll" class="truncate my-application">
                    {{ item.FromGeha }}
                  </td>
                  <td id="tdAll" class="truncate my-application">
                    {{ item.SelectedManagerName }}
                  </td>
                  <td id="tdAll" class="my-application">
                    {{ item.RequestDate_Ar }}
                  </td>
                </tr>
              </template>

              <template v-slot:no-data>
                <v-alert
                  id="tdAll"
                  :value="true"
                  class="my-application"
                  color="#339966"
                  border="top"
                  colored-border
                  type="error"
                  elevation="6"
                  height="70"
                  style="
                    margin-top: 20px;
                    padding-left: 40px;
                    padding-top: 25px;
                    color: #595959;
                  "
                >
                  <span class="my-application">
                    الصندوق فارغ، لا يوجد معاملات لعرضها هنا.</span
                  >
                </v-alert>
              </template>

              <template v-slot:top="{ pagination, options, updateOptions }">
                <v-data-footer
                  :pagination="pagination"
                  :options="options"
                  @update:options="updateOptions"
                  :items-per-page-options="[5, 10, 15, 25]"
                  items-per-page-text="عدد المعاملات في الصفحة:"
                  pageText="من {0}-{1} إلى {2}"
                  showFirstLastPage
                />
              </template>

              <v-alert
                id="tdAll"
                slot="no-results"
                :value="true"
                border="top"
                color="#339966"
                colored-border
                type="error"
                elevation="6"
                height="70"
                style="color: #595959; margin-top: 15px; padding-top: 25px"
              >
                <span class="my-application">
                  بحثك عن " {{ search }} " لم يعثر على نتائج.
                </span>
              </v-alert>

              <!-- <template v-slot:[`item.ResponseStatusName`]="{ item }">
                <v-chip :color="getColor(item.ResponseStatusName)" dark>
                  {{ item.ResponseStatusName }}
                </v-chip>
              </template> -->
            </v-data-table>
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
<script src="https://unpkg.com/v-tooltip"></script>
<script src="js/jsPDF-1.5.0/dist/jspdf.debug.js"></script>
<script src="js/jsPDF-1.5.0/dist/jspdf.min.js"></script>
<script src="https://fonts.google.com/specimen/Amiri"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-base64@3.6.0/base64.min.js"></script>

<script>
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";
import VTooltip from "v-tooltip";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.use(VueAxios, axios, VTooltip);

axios.defaults.headers.common["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.common["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

axios.defaults.headers.post["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.post["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests

export default {
  data() {
    return {
      // isLoading: true,
      // fullPage: true,
      // waitingLoader: "bars",
      overlay: true,
      AdfOutboundsBox: [],
      MurOutboundsBox: [],
      allOutboundsBox: [],
      search: "",
      sortDesc: true,
      testAdfOutboundsBox: {
        RepType: 6,
        ConfidentialVal: null,
        Dept: null,
        Geha: null,
        IOboundType: null,
        IOboundCategory: null,
        ImportanceVal: null,
        IncidentNumber: null,
        RelatedEmail: null,
        RelatedID: null,
        RelatedName: null,
        RelatedPhone: null,
        SourceType: null,
        Subject: null,
        end: null,
        query: null,
        start: null,
        status: 1,
        pageSize: 100,
        pageindex: 0,
      },
      // testMurOutboundsBox: {
      //   SourceType: 4, //        MursalatIn = 1,        MursalatOut = 2,        AdfIn = 3,        AdfOut = 4,
      //   RequesterDept: "",
      //   RequesterUser: "", //"mohamed.fawzy"
      //   SenderType: "", // GOVT , البريد السعودي ؟؟؟
      //   pageindex: 0,
      //   pageSize: 100,
      // },

      headers: [
        {
          text: "رقم المعاملة",
          align: "center",
          sortable: true,
          value: "IncidentNumber",
        },

        { text: "حالة المعاملة", value: "ResponseStatusName", align: "center" },
        { text: "موضوع المعاملة", value: "IOboundSubject", align: "center" },
        { text: "الجهة الواردة", value: "FromGeha", align: "center" },
        {
          text: "الإدارة الصادرة",
          value: "SelectedManagerName",
          align: "center",
        },
        { text: "تاريخ المعاملة", value: "RequestDate_Ar", align: "center" },
      ],
    };
  },
  mounted() {
    Vue.axios
      .post(
        "https://emp.adf.gov.sa/cms7514254/api/cms/Search",
        this.testAdfOutboundsBox
      )
      .then((resp) => {
        this.AdfOutboundsBox = resp.data;
        this.allOutboundsBox = this.allOutboundsBox.concat(resp.data);
        console.log(this.allOutboundsBox.length);
        // this.isLoading = !this.isLoading;
        this.overlay = !this.overlay;
      });

    // Vue.axios
    //   .post(
    //     "https://emp.adf.gov.sa/cms7514254/api/cms/Search",
    //     this.testMurOutboundsBox
    //   )
    //   .then((resp) => {
    //     this.MurOutboundsBox = resp.data;
    //     this.allOutboundsBox = this.allOutboundsBox.concat(resp.data);
    //     console.log(this.allOutboundsBox.length);
    //     this.isLoading = !this.isLoading;
    //     this.overlay = !this.overlay;
    //   });
  },

  methods: {
    handleClick(item) {
      console.log(item);
      // this.highlightClickedRow();
      // this.viewDetails(event);
    },
    navigate(item) {
      // 1 outbound
      // 2 inner outbound
      // 3 inbound

      item.viewType = 2;
      this.$store.commit("SET_CURRENT", item);
      this.$router.push({
        name: "viewCorrespondence", //use name for router push
      });
    },
    searchbyid(item) {
      console.log("id:" + item.ID);
      Vue.axios
        .get(
          "https://emp.adf.gov.sa/cms7514254/api/cms/GetCms?ReqID=" + item.ID
        )
        .then((resp) => {
          console.log("resp");
          console.log(item);
          this.navigate(resp.data);
        });
    },
    getColor(ResponseStatusName) {
      if (ResponseStatusName == "تحت الإجراء") return "#b3e6cc";
      else if (ResponseStatusName == "في انتظار تأكيد الاستلام")
        return "#66cc99";
      else if (ResponseStatusName == "مقبول") return "#339964";
      else if (ResponseStatusName == "تم تسليمه") return "#66b3ff";
      else if (ResponseStatusName == "مرفوض") return "#ff704d";
      else if (ResponseStatusName == "فشل") return "#ffeb99";
      else if (ResponseStatusName == "غير قادر على تسليمه") return "#b38600";
      else if (ResponseStatusName == "غير موجود") return "#a6a6a6";
      else return "#000000";
    },
  },
};
</script>

<style lang="scss">
#tdAll {
  font-size: 12px;
  font-family: "Almarai", sans-serif !important;
}
#rowCols:hover {
  cursor: pointer;
}
.v-text-field input {
  font-size: 0.9em;
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 16px !important;
  background-color: #f2f2f2;
  font-weight: bold;
  font-family: "Almarai", sans-serif !important;
}
</style>

<style lang="css" scoped>
::v-deep .v-data-table-header th {
  background-color: #f2f2f2 !important;
  font-weight: bold !important;
}
::v-deep th {
  color: #262626 !important;
  font-weight: bold !important;
  opacity: 0.8 !important;
  letter-spacing: 0.3px;
}
::v-deep td {
  color: #595959;
  font-size: 12px;
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
.truncate {
  max-width: 1vw;
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
