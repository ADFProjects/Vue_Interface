<template>
  <div id="app" class="d-flex justify-center">
    <v-app id="inspire">
      <v-main>
        <v-container>
          <loading
            :active="isLoading"
            :is-full-page="fullPage"
            :loader="waitingLoader"
          />
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
                  src="~@/assets/InboundsBox-adf.png"
                  alt="InboundImage"
                  max-height="100"
                  max-width="60"
                ></v-img>
              </template>
              <span>صندوق البريد الوارد</span>
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
                  class="mx-4"
                  style="font-size: 16px; font-weight: bold"
                ></v-text-field>
              </template>
              <span>البحث بإستخدام جميع خانات المعاملة</span>
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
                  <span>ترتيب المعاملات من الأحدث إلى الأقدم</span>
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
                  <span>ترتيب المعاملات من الأقدم إلى الأحدث</span>
                </v-tooltip>
              </v-btn-toggle>
            </template>
          </v-app-bar>

          <v-card>
            <v-data-table
              style="font-weight: bold; color: #4d4d4d"
              :header-props="{ sortIcon: null }"
              :headers="headers"
              :items="allInboundsBox"
              :search="search"
              item-key="ID"
              :items-per-page="10"
              sort-by="IncidentNumber"
              :sort-desc="sortDesc"
              class="elevation-2"
              :footer-props="{
                itemsPerPageOptions: [5, 10, 15, 25, 50],
                pageText: '',
                //'items-per-page-all-text': 'الكل',
                'items-per-page-text': 'عدد المعاملات الواردة في الصفحة:',
              }"
            >
              <template v-slot:item="{ item }">
                <tr id="rowCols" @click="searchbyid(item)" class="text-center">
                  <td>{{ item.IncidentNumber }}</td>
                  <template>
                    <td>
                      <v-chip :color="getColor(item.ResponseStatusName)" dark>
                        {{ item.ResponseStatusName }}
                      </v-chip>
                    </td>
                  </template>

                  <v-tooltip bottom :disabled="item.IOboundSubject.length < 32">
                    <template #activator="{ on }">
                      <td v-on="on" class="truncate">
                        {{ item.IOboundSubject }}
                      </td>
                    </template>
                    <span class="text-truncate ml-1 mr-1" v-on="on">{{
                      item.IOboundSubject
                    }}</span>
                  </v-tooltip>

                  <v-tooltip bottom :disabled="item.OutboundDocNo.length < 9">
                    <template #activator="{ on }">
                      <td v-on="on" class="truncate">
                        {{ item.OutboundDocNo }}
                      </td>
                    </template>
                    <span class="text-truncate ml-1 mr-1" v-on="on">{{
                      item.OutboundDocNo
                    }}</span>
                  </v-tooltip>

                  <v-tooltip bottom :disabled="item.FromGeha.length < 30">
                    <template #activator="{ on }">
                      <td v-on="on" class="truncate">{{ item.FromGeha }}</td>
                    </template>
                    <span class="text-truncate ml-1 mr-1" v-on="on">{{
                      item.FromGeha
                    }}</span>
                  </v-tooltip>

                  <td>{{ item.RequestDate_Ar }}</td>
                </tr>
              </template>
              <template v-slot:no-data>
                <v-alert
                  :value="true"
                  color="#339966"
                  border="top"
                  colored-border
                  type="error"
                  elevation="5"
                  height="70"
                  style="
                      margin-top: 20px;
                      padding-left: 40px;
                      padding-top: 25px;
                      font-size: 20px;
                      color: #4d4d4d;
                    "
                >
                  الصندوق فارغ، لا يوجد معاملات لعرضها هنا.
                </v-alert>
              </template>

              <template v-slot:top="{ pagination, options, updateOptions }">
                <v-data-footer
                  :pagination="pagination"
                  :options="options"
                  @update:options="updateOptions"
                  :items-per-page-options="[5, 10, 15, 25]"
                  items-per-page-text="عدد المعاملات الواردة في الصفحة:"
                  pageText=""
                />
              </template>
              <v-alert
                slot="no-results"
                :value="true"
                border="top"
                color="#339966"
                colored-border
                type="error"
                elevation="5"
                height="70"
                style="
                    margin-top: 15px;
                    padding-top: 25px;
                    font-size: 20px;
                    color: #4d4d4d;
                  "
              >
                بحثك عن "{{ search }}" لم يعثر على نتائج.
              </v-alert>

              <template v-slot:[`item.ResponseStatusName`]="{ item }">
                <v-chip :color="getColor(item.ResponseStatusName)" dark>
                  {{ item.ResponseStatusName }}
                </v-chip>
              </template>
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
  <!-- </v-toolbar> -->
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
      isLoading: true,
      overlay: true,
      AdfInboundsBox: [],
      MurInboundsBox: [],
      allInboundsBox: [],
      search: "",
      sortDesc: true,
      testAdfInboundsBox: {
        SourceType: 1, //        MurInboundsBox = 1,        MursalatOut = 2,        AdfInboundsBox = 3,        AdfOut = 4,
        RequesterDept: "",
        RequesterUser: "", //"mohamed.fawzy"
        SenderType: "", // GOVT , البريد السعودي ؟؟؟
        pageindex: 0,
        pageSize: 100,
      },
      testMurInboundsBox: {
        SourceType: 3, //        MurInboundsBox = 1,        MursalatOut = 2,        AdfInboundsBox = 3,        AdfOut = 4,
        RequesterDept: "",
        RequesterUser: "", //"mohamed.fawzy"
        SenderType: "", // GOVT , البريد السعودي ؟؟؟
        pageindex: 0,
        pageSize: 100,
      },

      headers: [
        {
          text: "رقم المعاملة",
          align: "center",
          sortable: true,
          value: "IncidentNumber",
        },
        { text: "حالة المعاملة", value: "ResponseStatusName", align: "center" },
        { text: "عنوان المعاملة", value: "IOboundSubject", align: "center" },
        { text: "رقم صادر الجهة", value: "OutboundDocNo", align: "center" },
        { text: "الجهة الموردة", value: "FromGeha", align: "center" },
        { text: "تاريخ المعاملة", value: "RequestDate_Ar", align: "center" },
      ],
      // for Test:
      response: [
        {
          ID: 386,
          InboundDocNo: 209900276,
          IOboundSubject:
            "سري - الإدارة العامة للتربية والتعليم بمنطقة القصيم رقم 8888888 تاريخ 1442-08-02",
          Status: 1,
          RequesterID: 4106,
          RequesterName: "عبدالرحمن بن علي بن سعد الشمراني",
          RequesterUserName: "abdulrahman.ali",
          RequestDate: "2021-03-15T12:09:10.673",
          SelectedManager: "suliman.aldawish",
          SelectedManagerName: "مكتب نائب المدير العام للماليه",
          ImportanceVal: "L",
          ConfidentialVal: "S",
          FromGeha: "الإدارة العامة للتربية والتعليم بمنطقة القصيم",
          FromID: "9988",
          ToGeha: "صندوق التنمية الزراعية",
          TotID: "127000",
          LastTimeAllowed: null,
          DeliveryType: "M",
          DeliveryBy: null,
          InboundDocNo: null,
          OutboundDocNo: "8888888",
          IOboundType: "Item02",
          InboundGDate: null,
          OutboundGDate: null,
          InboundHDate: null,
          OutboundHDate: "1442-08-02",
          IOboundSubject: "سري",
          IOboundCategory: "Management",
          IOboundRemarks: "7777",
          IOboundGDueDate: null,
          IOboundHDueDate: null,
          IOboundClassification: "Original",
          EndDate: null,
          ResType: 2,
          SenderType: "",
          SourceType: 3,
          RelatedID: "0000000000",
          RelatedName: ",n,jjn",
          RelatedEmail: "ra@gmail.com",
          RelatedIDType: "ID",
          RelatedPhone: "0599999999",
          ResponseStatus: "Accepted",
          ResponseStatusName: "في انتظار تأكيد الاستلام",
        },
      ],
    };
  },
  mounted() {
    Vue.axios
      .post(
        "https://emp.adf.gov.sa/cms7514254/api/cms/Search",
        this.testAdfInboundsBox
      )
      .then((resp) => {
        this.AdfInboundsBox = resp.data;
        this.allInboundsBox = this.allInboundsBox.concat(resp.data);
        console.log(this.allInboundsBox.length);
      });
    //     Vue.axios
    // .post("https://emp.adf.gov.sa/cms7514254/api/cms/Search", this.testAdfInboundsBox)
    // .then((resp) => {
    //   this.AdfInboundsBox = resp.data;
    //   this.allInboundsBox = resp.data;
    //   console.log(resp.data);
    // });
    Vue.axios
      .post(
        "https://emp.adf.gov.sa/cms7514254/api/cms/Search",
        this.testMurInboundsBox
      )
      .then((resp) => {
        this.MurInboundsBox = resp.data;
        this.allInboundsBox = this.allInboundsBox.concat(resp.data);
        console.log(this.allInboundsBox.length);
        this.isLoading = !this.isLoading;
        this.overlay = !this.overlay;
      });
  },

  methods: {
    navigate(item) {
      this.$router.push({
        name: "viewCorrespondence", //use name for router push
        params: { data: item },
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

<style>
#rowCols:hover {
  cursor: pointer;
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 16px !important;
  background-color: #f2f2f2;
  font-weight: bold;
}
/* .elevation-1 tr th:first-of-type,
td:first-of-type {
  background-color: #f2f2f2;
} */
</style>

<style lang="css" scoped>
.v-text-field >>> label {
  font-size: 18px;
}
.v-tooltip__content {
  font-size: 16px !important;
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
