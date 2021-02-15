<template>
  <div id="app" style="margin-right:220px;">
    <!-- <script src="searchForm.js"></script> -->
    <v-app id="inspire">
      <v-container fluid>
        <v-data-iterator
          :items="items"
          :items-per-page.sync="itemsPerPage"
          :page.sync="page"
          :search="search"
          :sort-by="sortBy.toLowerCase()"
          :sort-desc="sortDesc"
          hide-default-footer
        >
          <template v-slot:header>
            <v-toolbar dark color="#252123; darken-3" class="mb-1" style="width: 1000px;">
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
            <v-row style="width: 1025px;">
              <v-col
                v-for="item in props.items"
                :key="item.name"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card>
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
                </v-card>
              </v-col>
            </v-row>
          </template>

          <template v-slot:footer>
            <v-row class="mt-2" align="center" justify="center" style="width: 1009px; padding: 10px;">
              <span class="grey--text"> المعاملات لكل صفحة</span>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    dark
                    text
                    color="green"
                    class="ml-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ itemsPerPage }}
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(number, index) in itemsPerPageArray"
                    :key="index"
                    @click="updateItemsPerPage(number)"
                  >
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-spacer></v-spacer>

              <span
                class="mr-4
                grey--text"
                style="padding:10px;"
              >
                الصفحة من {{ page }} إلى {{ numberOfPages }}
              </span>
              
              <v-btn
                fab
                dark
                color="green darken-3"
                class="mr-1"
                @click="formerPage"
                style="margin-left:10px;"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
              
              <v-btn
                fab
                dark
                color="green darken-3"
                class="ml-1"
                @click="nextPage"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
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
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "رقم المعاملة");
    },
  },
  methods: {
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
