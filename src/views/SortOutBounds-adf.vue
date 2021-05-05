<template>
  <div id="app" class="d-flex justify-center">
    <v-app id="inspire">
      <v-main>
        <v-card>
          <v-container>
            <!-- ---------------------------------------------------------------------------------------- -->
            <v-dialog transition="dialog-top-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#4b886a"
                  style="
                    margin-left: 15px;
                    font-size: 16px;
                    font-weight: bold;
                    color: #f2f2f2;
                  "
                  v-bind="attrs"
                  v-on="on"
                  height="48"
                >
                  تصنيف المعاملات
                </v-btn>
              </template>

              <template v-slot:default="dialog">
                <v-card>
                  <v-toolbar
                    color="#28714e"
                    dark
                    style="font-size: 20px; font-weight: bold; color: #f2f2f2"
                    >تصنيف المعاملات</v-toolbar
                  >
                  <v-card-text style="height: 200px">
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        style="margin-top: 100px; margin-right: 40px"
                      >
                        <!-- @click="dialog.value = false" -->
                        <v-btn large color="#eff3f6" width="20" height="46">
                          <img
                            src="~@/assets/OutCity-adf.png"
                            alt="بيان صادر - خارج المدينة"
                            height="90"
                            width="102"
                          />
                        </v-btn>
                      </v-col>

                      <v-col cols="12" sm="6" md="4" style="margin-top: 100px">
                        <v-btn
                          @click="generatePDF"
                          v-model="generatePDF"
                          large
                          width="20"
                          height="39"
                        >
                          <img
                            src="~@/assets/Offices-adf.png"
                            alt="بيان صادر - الفروع والمكاتب والمؤسسات"
                            height="81"
                            width="85"
                          />
                        </v-btn>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" style="margin-top: -70px">
                        <v-btn
                          @click="generatePDF"
                          v-model="generatePDF"
                          large
                          width="20"
                          height="46"
                          style="margin-right: 430px"
                        >
                          <img
                            src="~@/assets/InCity-adf.png"
                            alt="بيان صادر - داخل المدينة"
                            height="90"
                            width="102"
                          />
                        </v-btn>
                      </v-col>
                    </v-row>

                    <hr
                      style="
                        height: 2px;
                        background-color: #808080;
                        margin-top: 60px;
                        width: 480px;
                        margin-right: 35px;
                      "
                    />

                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        class="subheading font-weight-bold text-center my-10"
                        style="font-size: 16px"
                      >
                        بيان بالبريد الصادر
                        <br />
                        الخارجي
                      </v-col>

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        class="subheading font-weight-bold text-center my-10"
                        style="font-size: 16px"
                      >
                        بيان بالبريد الصادر
                        <br />
                        صندوق البريد
                      </v-col>

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        class="subheading font-weight-bold text-center my-10"
                        style="font-size: 16px"
                      >
                        بيان بالبريد الصادر
                        <br />
                        الداخلي
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn
                      style="
                        font-size: 20px;
                        font-weight: bold;
                        color: #4d4d4d;
                        margin-top: 200px;
                      "
                      text
                      @click="dialog.value = false"
                      >إغلاق</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
            <!-- ----------------------------------------------------------------------------------------------------------- -->
          </v-container>
        </v-card>
      </v-main>
    </v-app>
  </div>
</template>