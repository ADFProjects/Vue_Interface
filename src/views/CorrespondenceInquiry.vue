<template>
  <div>
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              type="number"
              class="inputNumber"
              label="الإسم"
              outlined
            ></v-text-field>
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
              outlined
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              class="inputNumber"
              label="البريد الإلكتروني"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              type="number"
              class="inputNumber"
              label="رقم المعاملة"
              outlined
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              type="number"
              class="inputNumber"
              label="الموضوع"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <!-- TODO : change ITMS -->
            <v-autocomplete
              :items="items"
              label="اسم الإدارة"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-autocomplete
              :items="entities"
              item-text="Name"
              label="اسم الجهة"
              outlined
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
              :items="correspondenceType"
              item-text="Name"
              label="نوع الخطاب"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-autocomplete
              :items="objectiveClass"
              item-text="Name"
              label="التصنيف الموضوعي"
              outlined
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
              :items="importance"
              item-text="Name"
              label="درجة الأهمية"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-autocomplete
              :items="confidentiality"
              item-text="Name"
              label="درجة السرية"
              outlined
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="الفترة الزمنية"
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-hijri-date-picker
              v-model="dates"
              range
              locale="ar"
            ></v-hijri-date-picker>
          </v-menu>
        </v-row>
      </v-container>
      <v-container>
        <div class="text-center">
          <v-btn rounded color="green" dark large>
            <h2>بحث</h2>
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import uq from "@umalqura/core";

const d = uq();
const today = d.format("yyyy-MM-dd", "en");

Vue.use(VueAxios, axios);

axios.defaults.headers.post["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.common["ClientID"] = "Contest01"; // for all requests
axios.defaults.headers.post["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests
axios.defaults.headers.common["ClientKey"] = "ADFFE1165rDDfTYR"; // for all requests
export default {
  data: function () {
    return {
      items: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      objectiveClass: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      entities: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      confidentiality: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      importance: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      correspondenceType: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
      dates: [],
      today: today.toString(),
    };
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
  mounted() {
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
  },
};
</script>