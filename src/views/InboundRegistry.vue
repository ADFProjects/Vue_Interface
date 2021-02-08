<style>
</style>
<template>
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
                <v-text-field label="برقم" outlined></v-text-field>
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
                  <!-- 2. Arabic Numbers
                        -->
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
                <v-text-field label="رقم الصادر" outlined></v-text-field>
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
        </v-form>
      </v-card>
      <pre></pre>
    </v-main>
  </v-app>
</template>

<script>
import uq from "@umalqura/core";
const d = uq();
const day = d.format("yyyy-MM-dd");
const today = d.format("yyyy-MM-dd", "en");

export default {
  data: () => ({
    items: ["صندوق البيئة", "وزارة المالية", "وزارة الصحة"],
    menu: false,
    modal: false,
    menu2: false,
    date: day.toString(),
    today: today.toString(),
  }),

  methods: {},
};
</script>
