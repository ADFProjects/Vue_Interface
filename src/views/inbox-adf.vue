<template>
  <div id="app">
    <v-app id="inspire">
      <v-container>
        <v-app-bar
          style="margin-top: 40px; border-radius: 4px"
          width="1160"
          color="#252123; darken-3"
          dark
          class="mb-1"
        >
        </v-app-bar>

        <v-card>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="البحث.."
            single-line
            hide-details
            color="#39ac73"
            style="
              margin-left: 10px;
              margin-right: 10px;
              font-weight: bold;
              word-spacing: 3px;
              font-size: 20px;
            "
          ></v-text-field>

          <v-data-table
            style="font-weight: bold; color: #595959"
            :headers="headers"
            :items="response"
            :search="search"
            item-key="ID"
            :items-per-page="10"
            sort-by="ID"
            :sort-desc="true"
            class="elevation-2"
            :loading="loading"
            :footer-props="{
              'items-per-page-text': 'عدد الصفوف في الصفحة:',
            }"
          >
            <v-alert
              slot="no-results"
              :value="true"
              border="top"
              color="#39ac73"
              colored-border
              type="error"
              elevation="5"
              style="
                margin-top: 20px;
                padding-left: 40px;
                font-size: 20px;
                color: #595959;
              "
            >
              بحثك عن "{{ search }}" لم يعثر على نتائج.
            </v-alert>

            <template v-slot:[`item.transactionStatus`]="{ item }">
              <v-chip :color="getColor(item.transactionStatus)" dark>
                {{ item.transactionStatus }}
              </v-chip>
            </template>

            <!-- <v-switch
              label="اختيار معاملة واحدة"
              class="pa-1"
              color="green"
            ></v-switch> -->
          </v-data-table>
        </v-card>
      </v-container>
    </v-app>
  </div>
  <!-- </v-toolbar> -->
</template>

<script src="js/jsPDF-1.5.0/dist/jspdf.debug.js"></script>
<script src="js/jsPDF-1.5.0/dist/jspdf.min.js"></script>
<script src="https://fonts.google.com/specimen/Amiri"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-base64@3.6.0/base64.min.js"></script>

<script>
export default {
  data() {
    return {
      search: "",
      loading: false,
      response: [
        {
          ID: 382,
          IncidentNumber: 0,
          Tile:
            "Test Message - صندوق التنمية الزراعية رقم 66644331 تاريخ 1441/04/01",
          Status: 1,
          RequesterID: 4106,
          RequesterName: "عبدالرحمن بن علي بن سعد الشمراني",
          RequesterUserName: "abdulrahman.ali",
          RequestDate: "2021-03-07T10:35:40.353",
          SelectedManager: "mohamed.fawzy",
          SelectedManagerName: "المدير العام",
          ImportanceVal: "N",
          ConfidentialVal: "N",
          FromGeha: "صندوق التنمية الزراعية",
          FromID: "127000",
          ToGeha: "وزارة الاتصالات وتقنية المعلومات",
          TotID: "265000",
          LastTimeAllowed: null,
          DeliveryType: "E",
          DeliveryBy: null,
          InboundDocNo: "432423432",
          OutboundDocNo: "66644331",
          IOboundType: "Item01",
          InboundGDate: "2021-01-17T08:52:43.727",
          OutboundGDate: "2021-01-17T08:52:43.727",
          InboundHDate: "1441/04/01",
          OutboundHDate: "1441/04/01",
          IOboundSubject: "Test Message",
          IOboundCategory: "General",
          IOboundRemarks: "Remarks",
          IOboundGDueDate: null,
          IOboundHDueDate: null,
          IOboundClassification: "Original",
          EndDate: null,
          ResType: 2,
          SenderType: null,
          SourceType: 2,
          RelatedID: "101010101",
          RelatedName: "سييس  لببب لللل  للل",
          RelatedEmail: "aaa@dd.ccc",
          RelatedIDType: "ID",
          RelatedPhone: "0585222152",
        },
        {
          ID: 374,
          IncidentNumber: 209900267,
          Tile:
            "Test Message - صندوق التنمية الزراعية رقم 66644331 تاريخ 1441/04/01",
          Status: 1,
          RequesterID: 4106,
          RequesterName: "عبدالرحمن بن علي بن سعد الشمراني",
          RequesterUserName: "abdulrahman.ali",
          RequestDate: "2021-03-03T13:45:17.963",
          SelectedManager: "mohamed.fawzy",
          SelectedManagerName: "المدير العام",
          ImportanceVal: "N",
          ConfidentialVal: "N",
          FromGeha: "صندوق التنمية الزراعية",
          FromID: "127000",
          ToGeha: "وزارة الاتصالات وتقنية المعلومات",
          TotID: "265000",
          LastTimeAllowed: null,
          DeliveryType: "E",
          DeliveryBy: null,
          InboundDocNo: "432423432",
          OutboundDocNo: "66644331",
          IOboundType: "Item01",
          InboundGDate: "2021-01-17T08:52:43.727",
          OutboundGDate: "2021-01-17T08:52:43.727",
          InboundHDate: "1441/04/01",
          OutboundHDate: "1441/04/01",
          IOboundSubject: "Test Message",
          IOboundCategory: "General",
          IOboundRemarks: "Remarks",
          IOboundGDueDate: null,
          IOboundHDueDate: null,
          IOboundClassification: "Original",
          EndDate: null,
          ResType: 2,
          SenderType: null,
          SourceType: 2,
          RelatedID: "101010101",
          RelatedName: "سييس  لببب لللل  للل",
          RelatedEmail: "aaa@dd.ccc",
          RelatedIDType: "ID",
          RelatedPhone: "0585222152",
        },
        {
          ID: 373,
          IncidentNumber: 0,
          Tile:
            "Test Message - صندوق التنمية الزراعية رقم 6616644331 تاريخ 1441/04/01",
          Status: 1,
          RequesterID: 4106,
          RequesterName: "عبدالرحمن بن علي بن سعد الشمراني",
          RequesterUserName: "abdulrahman.ali",
          RequestDate: "2021-03-03T13:45:13.187",
          SelectedManager: "mohamed.fawzy",
          SelectedManagerName: "المدير العام",
          ImportanceVal: "N",
          ConfidentialVal: "N",
          FromGeha: "صندوق التنمية الزراعية",
          FromID: "127000",
          ToGeha: "وزارة الاتصالات وتقنية المعلومات",
          TotID: "265000",
          LastTimeAllowed: null,
          DeliveryType: "E",
          DeliveryBy: null,
          InboundDocNo: "432423432",
          OutboundDocNo: "6616644331",
          IOboundType: "Item01",
          InboundGDate: "2021-01-17T08:52:43.727",
          OutboundGDate: "2021-01-17T08:52:43.727",
          InboundHDate: "1441/04/01",
          OutboundHDate: "1441/04/01",
          IOboundSubject: "Test Message",
          IOboundCategory: "General",
          IOboundRemarks: "Remarks",
          IOboundGDueDate: null,
          IOboundHDueDate: null,
          IOboundClassification: "Original",
          EndDate: null,
          ResType: 2,
          SenderType: null,
          SourceType: 2,
          RelatedID: "101010101",
          RelatedName: "سييس  لببب لللل  للل",
          RelatedEmail: "aaa@dd.ccc",
          RelatedIDType: "ID",
          RelatedPhone: "0585222152",
        },
        {
          ID: 253,
          IncidentNumber: 70,
          Tile: "طلب تسجيل صادر - عطا احمد عبد الحميد رضوان",
          Status: 1,
          RequesterID: 0,
          RequesterName: "عطا احمد عبد الحميد رضوان",
          RequesterUserName: "atta.radwan",
          RequestDate: "2021-02-18T10:25:29.403",
          SelectedManager: null,
          SelectedManagerName: null,
          ImportanceVal: "H",
          ConfidentialVal: "S",
          FromGeha: "صندوق التنمية الزراعية",
          FromID: "127000",
          ToGeha: "الجامعة الإسلامية بالمدينة المنورة",
          TotID: "320000",
          LastTimeAllowed: null,
          DeliveryType: null,
          DeliveryBy: null,
          InboundDocNo: "12323132",
          OutboundDocNo: "70",
          IOboundType: "Item02",
          InboundGDate: null,
          OutboundGDate: "2021-02-21T09:15:01.027",
          InboundHDate: null,
          OutboundHDate: "1442/07/09",
          IOboundSubject: "ggggggg",
          IOboundCategory: "Management",
          IOboundRemarks: "gggggggggg",
          IOboundGDueDate: null,
          IOboundHDueDate: null,
          IOboundClassification: "Copy",
          EndDate: null,
          ResType: 0,
          SenderType: null,
          SourceType: 2,
          RelatedID: null,
          RelatedName: null,
          RelatedEmail: null,
          RelatedIDType: null,
          RelatedPhone: null,
        },
      ],

      headers: [
        {
          text: "الرقم",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "رقم المعاملة", value: "InboundDocNo" },
        { text: "حالة المعاملة", value: "transactionStatus" },
        { text: "عنوان المعاملة", value: "Tile" },
        { text: "مستلم المعاملة", value: "ToGeha" },
        { text: "التاريخ", value: "date" },
      ],

      items: [
        {
          name: "1",
          transactionNum: "1887",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "10 اكتوبر 10:11 2021 ص",
        },
        {
          name: "2",
          transactionNum: "3898",
          transactionStatus: "في إنتظار التأكيد",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 ديسمبر 10:11 2023 ص",
        },
        {
          name: "3",
          transactionNum: "2000",
          transactionStatus: "تم الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "4",
          transactionNum: "4888",
          transactionStatus: "تم الرفض",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "5",
          transactionNum: "5888",
          transactionStatus: "غير موجود",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "6",
          transactionNum: "6888",
          transactionStatus: "تم الرفض",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "7",
          transactionNum: "7888",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "8",
          transactionNum: "8088",
          transactionStatus: "غير موجود",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "9",
          transactionNum: "9888",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "10",
          transactionNum: "1088",
          transactionStatus: "في إنتظار التأكيد",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "11",
          transactionNum: "1188",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "12",
          transactionNum: "1288",
          transactionStatus: "123321",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "13",
          transactionNum: "1388",
          transactionStatus: "تم الرفض",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "14",
          transactionNum: "1488",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "15",
          transactionNum: "1588",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "16",
          transactionNum: "1688",
          transactionStatus: "1221",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "17",
          transactionNum: "1788",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "18",
          transactionNum: "6788",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "19",
          transactionNum: "9008",
          transactionStatus: "تم الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "20",
          transactionNum: "1008",
          transactionStatus: "غير موجود",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "21",
          transactionNum: "2008",
          transactionStatus: "122",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "22",
          transactionNum: "3008",
          transactionStatus: "تم الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "23",
          transactionNum: "5008",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "24",
          transactionNum: "6008",
          transactionStatus: "423456",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "25",
          transactionNum: "7008",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "26",
          transactionNum: "1323",
          transactionStatus: "345",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "27",
          transactionNum: "2321",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "28",
          transactionNum: "1858",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "29",
          transactionNum: "1008",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "30",
          transactionNum: "1888",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "31",
          transactionNum: "1888",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "32",
          transactionNum: "1888",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "33",
          transactionNum: "1888",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "34",
          transactionNum: "1888",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "35",
          transactionNum: "1888",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "36",
          transactionNum: "1888",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "37",
          transactionNum: "1888",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "38",
          transactionNum: "1888",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "39",
          transactionNum: "1888",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
        {
          name: "40",
          transactionNum: "1888",
          transactionStatus: "تحت الموافقة",
          transactionTitle: "معاملة واردة الى",
          transactionRecipient: "وزارة البيئة والمياه والزراعة",
          date: "07 اكتوبر 10:11 2021 ص",
        },
      ],
    };
  },

  methods: {
    getColor(transactionStatus) {
      if (transactionStatus == "تحت الموافقة") return "#b3e6cc";
      else if (transactionStatus == "في إنتظار التأكيد") return "#66cc99";
      else if (transactionStatus == "تم الموافقة") return "#339964";
      else if (transactionStatus == "تم الرفض") return "#ff704d";
      else if (transactionStatus == "غير موجود") return "#ffeb99";
      else return "black";
    },
  },
};
</script>