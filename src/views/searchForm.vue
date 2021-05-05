<template>
  <div id="app">
    <v-app id="inspire">
      <v-main>
        <v-card>
          <v-container>
            <!-- <v-container fluid> -->
            <v-data-iterator
              :items="items"
              :items-per-page.sync="itemsPerPage"
              :page.sync="page"
              :search="search"
              :sort-by="sortBy.toLowerCase()"
              :sort-desc="sortDesc"
              :footer-props="{
                // itemsPerPageOptions:[10,20,30,-1],

                pageText: '',

                'items-per-page-all-text': 'الكل',
                'items-per-page-text': 'عدد المعاملات الواردة في الصفحة:',
              }"
            >
              <template v-slot:top="{ pagination, options, updateOptions }">
                <v-data-footer
                  :pagination="pagination"
                  :options="options"
                  @update:options="updateOptions"
                  items-per-page-all-text="الكل"
                  items-per-page-text="عدد المعاملات الواردة في الصفحة:"
                  pageText=""
                />
              </template>
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

              <template v-slot:header>
                <v-toolbar dark color="#252123; darken-3" class="mb-1">
                  <v-text-field
                    v-model="search"
                    clearable
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    label="البحث باستخدام رقم المعاملة"
                  ></v-text-field>
                  <template v-if="$vuetify.breakpoint.mdAndUp">
                    <v-spacer></v-spacer>
                    <v-select
                      v-model="sortBy"
                      flat
                      solo-inverted
                      hide-details
                      :items="keys"
                      prepend-inner-icon="mdi-magnify"
                      label="فزر باستخدام"
                    ></v-select>
                    <v-spacer></v-spacer>
                    <v-btn-toggle v-model="sortDesc" mandatory>
                      <v-btn large depressed color="green" :value="false">
                        <v-icon>mdi-arrow-up</v-icon>
                      </v-btn>
                      <v-btn large depressed color="green" :value="true">
                        <v-icon>mdi-arrow-down</v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </template>
                </v-toolbar>
              </template>

              <template v-slot:default="props">
                <v-row>
                  <v-col
                    v-for="(item , index) in props.items"
                    :key="item.name"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                  >
                    <v-card @click="navigate(index)">
                      <v-card-title class="subheading font-weight-bold">
                        {{ item.name }}
                      </v-card-title>

                      <v-divider></v-divider>

                      <v-list dense>
                        <v-list-item
                          v-for="(key, index) in filteredKeys"
                          :key="index"
                        >
                          <v-list-item-content
                            :class="{ 'light-green lighten-5': sortBy === key }"
                          >
                            {{ key }}:
                          </v-list-item-content>
                          <v-list-item-content
                            class="align-end"
                            :class="{ 'light-green lighten-5': sortBy === key }"
                          >
                            {{ item[key.toLowerCase()] }}
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                      


                      <v-list dense>
                        <v-list-item
                          v-for="(key, index) in filteredKeys"
                          :key="index"
                        >
                          <v-list-item-content
                            :class="{ 'light-green lighten-5': sortBy === key }"
                          >
                            {{ key }}:
                          </v-list-item-content>
                          <v-list-item-content
                            class="align-end"
                            :class="{ 'light-green lighten-5': sortBy === key }"
                          >
                            {{ item[key.toLowerCase()] }}
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </v-container>
        </v-card>
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
axios.defaults.headers.common["Authorization"] = "Bearer "+ localStorage.getItem("token");


axios.defaults.headers.post["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.post["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests

export default {
  data: () => {
    return {
      objectiveClass: [], //response

      test: {
        RepType: 0,
        SourceType: 2,
        query: null,
        IncidentNumber: 0,
        RelatedID: null,
        start: null,
        end: null,
        status: 0,
        RelatedName: null,
        RelatedEmail: null,
        RelatedPhone: null,
        Subject: null,
        Dept: null,
        Geha: "صندوق",
        ImportanceVal: null,
        ConfidentialVal: null,
        IOboundType: null,
        IOboundClassification: null,
        pageindex: 0,
        pageSize: 100,
      },

      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: [
        "رقم المعاملة",
        "التاريخ",
        "الموضوع",
        "درجة الأهمية",
        "درجة السرية",
        "نوع الخطاب",
        "المرفقات",
        "الملاحظات",
      ],
      items: [
        {
          name: "رقم المعاملة #1235",
          التاريخ: "01/02/2021",
          الموضوع: "خطاب وارد من جهة خارجية",
          "درجة الأهمية": "مهم",
          "درجة السرية": "سري جدا",
          "نوع الخطاب": "شكوى",
          المرفقات: 3,
          الملاحظات: "يجب توقيع المدير..",
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
  mounted() {
    Vue.axios
      .post("https://emp.adf.gov.sa/cms7514254/api/cms/Search", this.test)
      .then((resp) => {
        this.objectiveClass = resp.data;
      });
    let data = this.$route.params.data;
    console.log("data is");
    console.log(data);
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "رقم المعاملة");
    },
  },
  methods: {
        navigate(index){
      console.log( "8888"+index);
    
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
};
</script>
