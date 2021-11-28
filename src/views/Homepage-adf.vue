<template>
  <div id="app" class="d-flex justify-center">
    <v-app id="inspire">
      <v-container
        fluid
        grid-list-md
        text-xs-center
        class="d-flex justify-center addBackground"
      >
        <v-layout row wrap align-center class="d-flex justify-center">
          <v-flex>
            <div>
              <template>
                <div class="systemManual my-3">
                  <v-row align="center" justify="center">
                    <v-col cols="12">
                      <v-hover v-slot="{ hover }">
                        <v-card
                          :elevation="hover ? 12 : 2"
                          class="mx-auto"
                          height="100"
                          width="450"
                          style="
                            background-color: #26734d;
                            opacity: 0.8 !important;
                          "
                        >
                          <v-responsive aspect-ratio="2">
                            <v-card-text
                              class="my-application my-5 text-center"
                              style="color: white; font-size: 19px"
                            >
                              <span class="my-application">
                                للإطلاع على دليل الإستخدام لنظام الاتصالات
                                الإدارية
                              </span>
                            </v-card-text>
                          </v-responsive>
                        </v-card>
                      </v-hover>
                    </v-col>
                  </v-row>
                </div>
                <div>
                  <v-btn
                    rounded
                    color="#3d7f5f"
                    dark
                    class="divBtn"
                    outlined
                    href="/files/SystemGuide.pdf"
                    download
                    style="text-decoration: none"
                  >
                    <span class="my-application"> اضغط هنا </span>
                  </v-btn>
                </div>
              </template>
            </div>
            <v-row align="center" justify="center">
              <!-- --------------------------------------- -->
              <v-col cols="12" sm="6" class="my-5">
                <v-hover v-slot="{ hover }" open-delay="200">
                  <v-card
                    class="mt-4 mx-auto"
                    max-width="280"
                    :elevation="hover ? 16 : 16"
                    :class="{ 'on-hover': hover }"
                    height="300"
                  >
                    <v-sheet
                      class="v-sheet--offset mx-auto"
                      color="#f2f2f2"
                      elevation="5"
                      height="90"
                      style="border-radius: 4px"
                      max-width="calc(70% - 32px)"
                    >
                      <v-img
                        src="~@/assets/Outbounds-adf.gif"
                        alt="InboundImage"
                        max-height="110"
                        max-width="200"
                        style="border-radius: 5px"
                      ></v-img>
                    </v-sheet>

                    <v-card-text class="pt-0">
                      <div
                        class="
                          text-center
                          subheading
                          font-weight-bold
                          my-application
                        "
                        style="color: #3d7f5f; font-size: 15px"
                      >
                        صادر عام
                      </div>

                      <v-radio-group
                        v-model="radiosOutAdf"
                        @change="OutBoundAdf"
                      >
                        <v-radio value="Week" color="#00802b">
                          <template v-slot:label>
                            <div>
                              <span
                                class="radioGrups my-application"
                                style="color: #595959"
                                >عدد المعاملات خلال الاسبوع</span
                              >
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="Month" color="#00802b">
                          <template v-slot:label>
                            <div>
                              <span
                                class="radioGrups my-application"
                                style="color: #595959"
                                >عدد المعاملات خلال الشهر</span
                              >
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="Year" color="#00802b">
                          <template v-slot:label>
                            <div>
                              <span
                                class="radioGrups my-application"
                                style="color: #595959"
                                >عدد المعاملات خلال السنة</span
                              >
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                      <v-divider></v-divider>
                      <div
                        class="
                          subheading
                          font-weight-bold
                          text-center
                          my-2 my-application
                        "
                        style="color: #b37700; font-size: 14px"
                      >
                        عدد المعاملات {{ MsgOutBoundAdf }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
              <!-- --------------------------------------- -->
              <v-col cols="12" sm="6" class="publicAndMur">
                <v-hover v-slot="{ hover }" open-delay="200">
                  <v-card
                    class="mt-4 mx-auto"
                    max-width="280"
                    :elevation="hover ? 16 : 16"
                    :class="{ 'on-hover': hover }"
                    height="300"
                  >
                    <v-sheet
                      class="v-sheet--offset mx-auto"
                      color="#f2f2f2"
                      elevation="5"
                      height="95"
                      style="border-radius: 4px"
                      max-width="calc(70% - 32px)"
                    >
                      <v-img
                        src="~@/assets/Inbounds-adf.gif"
                        alt="InboundImage"
                        max-height="120"
                        max-width="200"
                        style="border-radius: 5px"
                      ></v-img>
                    </v-sheet>

                    <v-card-text class="pt-0">
                      <div
                        class="
                          text-center
                          subheading
                          font-weight-bold
                          my-application
                        "
                        style="color: #3d7f5f; font-size: 15px"
                      >
                        وارد عام
                      </div>

                      <v-radio-group v-model="radiosInAdf" @change="InBoundAdf">
                        <v-radio value="Week" color="#00802b">
                          <template v-slot:label>
                            <div>
                              <span
                                class="radioGrups my-application"
                                style="color: #595959"
                                >عدد المعاملات خلال الاسبوع</span
                              >
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="Month" color="#00802b">
                          <template v-slot:label>
                            <div>
                              <span
                                class="radioGrups my-application"
                                style="color: #595959"
                                >عدد المعاملات خلال الشهر</span
                              >
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="Year" color="#00802b">
                          <template v-slot:label>
                            <div>
                              <span
                                class="radioGrups my-application"
                                style="color: #595959"
                                >عدد المعاملات خلال السنة</span
                              >
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>

                      <v-divider></v-divider>
                      <div
                        class="
                          subheading
                          text-center
                          my-2 my-application
                          font-weight-bold
                        "
                        style="color: #b37700; font-size: 14px"
                      >
                        عدد المعاملات {{ MsgInBoundAdf }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>

              <!-- --------------------------------------- -->
              <v-col cols="12" sm="6">
                <v-hover v-slot="{ hover }" open-delay="200">
                  <v-card
                    class="mt-4 mx-auto"
                    max-width="280"
                    :elevation="hover ? 16 : 16"
                    :class="{ 'on-hover': hover }"
                    height="300"
                  >
                    <v-sheet
                      class="v-sheet--offset mx-auto"
                      color="#f2f2f2"
                      elevation="5"
                      height="95"
                      style="border-radius: 4px"
                      max-width="calc(70% - 32px)"
                    >
                      <v-img
                        src="~@/assets/Inbounds-adf.gif"
                        alt="InboundImage"
                        max-height="110"
                        max-width="200"
                        style="border-radius: 5px"
                      ></v-img>
                    </v-sheet>

                    <v-card-text class="pt-0">
                      <div
                        class="
                          text-center
                          subheading
                          font-weight-bold font-weight-bold
                          my-application
                        "
                        style="color: #3d7f5f; font-size: 15px"
                      >
                        وارد نظام مراسلات
                      </div>

                      <v-radio-group v-model="radiosInMur" @change="InBoundMur">
                        <v-radio value="Week" color="#00802b">
                          <template v-slot:label>
                            <div>
                              <span
                                class="radioGrups my-application"
                                style="color: #595959"
                                >عدد المعاملات خلال الاسبوع</span
                              >
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="Month" color="#00802b">
                          <template v-slot:label>
                            <div>
                              <span
                                class="radioGrups my-application"
                                style="color: #595959"
                                >عدد المعاملات خلال الشهر</span
                              >
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="Year" color="#00802b">
                          <template v-slot:label>
                            <div>
                              <span
                                class="radioGrups my-application"
                                style="color: #595959"
                                >عدد المعاملات خلال السنة</span
                              >
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>

                      <v-divider></v-divider>
                      <div
                        class="
                          subheading
                          font-weight-bold
                          text-center
                          my-2 my-application
                          font-weight-bold
                        "
                        style="color: #b37700; font-size: 14px"
                      >
                        عدد المعاملات {{ MsgInBoundMur }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>

              <!-- --------------------------------------- -->
              <v-col cols="12" sm="6" class="publicAndMur">
                <v-hover v-slot="{ hover }" open-delay="200">
                  <v-card
                    class="mt-4 mx-auto"
                    max-width="280"
                    :elevation="hover ? 16 : 16"
                    :class="{ 'on-hover': hover }"
                    height="300"
                  >
                    <v-sheet
                      class="v-sheet--offset mx-auto"
                      color="#f2f2f2"
                      elevation="5"
                      height="90"
                      style="border-radius: 4px"
                      max-width="calc(70% - 32px)"
                    >
                      <v-img
                        src="~@/assets/Outbounds-adf.gif"
                        alt="InboundImage"
                        max-height="110"
                        max-width="200"
                        style="border-radius: 5px"
                      ></v-img>
                    </v-sheet>

                    <v-card-text class="pt-0">
                      <div
                        class="
                          text-center
                          subheading
                          font-weight-bold
                          my-application
                        "
                        style="color: #3d7f5f; font-size: 15px"
                      >
                        صادر نظام مراسلات
                      </div>

                      <v-radio-group
                        v-model="radiosOutMur"
                        @change="OutBoundMur"
                      >
                        <v-radio value="Week" color="#00802b">
                          <template v-slot:label>
                            <div>
                              <span
                                class="radioGrups my-application"
                                style="color: #595959"
                                >عدد المعاملات خلال الاسبوع</span
                              >
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="Month" color="#00802b">
                          <template v-slot:label>
                            <div>
                              <span
                                class="radioGrups my-application"
                                style="color: #595959"
                                >عدد المعاملات خلال الشهر</span
                              >
                            </div>
                          </template>
                        </v-radio>
                        <v-radio value="Year" color="#00802b">
                          <template v-slot:label>
                            <div>
                              <span
                                class="radioGrups my-application"
                                style="color: #595959"
                                >عدد المعاملات خلال السنة</span
                              >
                            </div>
                          </template>
                        </v-radio>
                      </v-radio-group>

                      <v-divider></v-divider>
                      <div
                        class="
                          subheading
                          font-weight-bold
                          text-center
                          my-2 my-application
                          font-weight-bold
                        "
                        style="color: #b37700; font-size: 14px"
                      >
                        عدد المعاملات {{ MsgOutBoundMur }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
              <!-- --------------------------------------- -->
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
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

axios.defaults.headers.post["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.post["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests
export default {
  data: () => {
    return {
      radiosOutAdf: "",
      radiosOutMur: "",
      radiosInAdf: "",
      radiosInMur: "",
      week: [],
      month: [],
      year: [],
      MsgOutBoundAdf: "",
      MsgInBoundAdf: "",
      MsgOutBoundMur: "",
      MsgInBoundMur: "",

      requestDay: {
        RepType: 4,
        pageSize: 7, // Day
      },

      requestMonth: {
        RepType: 4,
        pageSize: 30, // Month
        // 7 , 30
      },

      requestYear: {
        RepType: 4,
        pageSize: 365, // Year
      },
    };
  },

  methods: {
    OutBoundAdf() {
      console.log(this.radiosOutAdf);
      if (this.radiosOutAdf == "Week") {
        for (var x = 0; x < this.week.length; x++) {
          if (this.week[x].Name == "صادر عام") {
            this.MsgOutBoundAdf = this.week[x].count;
            console.log("Test week count - صادر عام");
          }
        }
      } else if (this.radiosOutAdf == "Month") {
        for (var i = 0; i < this.month.length; i++) {
          if (this.month[i].Name == "صادر عام") {
            this.MsgOutBoundAdf = this.month[i].count;
            console.log("Test month count - صادر عام");
          }
        }
      } else if (this.radiosOutAdf == "Year") {
        for (var y = 0; y < this.year.length; y++) {
          if (this.year[y].Name == "صادر عام") {
            this.MsgOutBoundAdf = this.year[y].count;
            console.log("Test year count - صادر عام");
          }
        }
      }
    },

    InBoundAdf() {
      console.log(this.radiosInAdf);
      if (this.radiosInAdf == "Week") {
        for (var e = 0; e < this.week.length; e++) {
          if (this.week[e].Name == "وارد عام") {
            this.MsgInBoundAdf = this.week[e].count;
            console.log("Test week count - وارد عام");
          }
        }
      } else if (this.radiosInAdf == "Month") {
        for (var i = 0; i < this.month.length; i++) {
          if (this.month[i].Name == "وارد عام") {
            this.MsgInBoundAdf = this.month[i].count;
            console.log("Test month count - وارد عام");
          }
        }
      } else if (this.radiosInAdf == "Year") {
        for (var k = 0; k < this.year.length; k++) {
          if (this.year[k].Name == "وارد عام") {
            this.MsgInBoundAdf = this.year[k].count;
            console.log("Test year count - وارد عام");
          }
        }
      }
    },

    OutBoundMur() {
      console.log(this.radiosOutMur);
      if (this.radiosOutMur == "Week") {
        for (var i = 0; i < this.week.length; i++) {
          if (this.week[i].Name == "صادر نظام مراسلات") {
            this.MsgOutBoundMur = this.week[i].count;
            console.log("Test week count - صادر نظام مراسلات");
          }
        }
      } else if (this.radiosOutMur == "Month") {
        for (var v = 0; v < this.month.length; v++) {
          if (this.month[v].Name == "صادر نظام مراسلات") {
            this.MsgOutBoundMur = this.month[v].count;
            console.log("Test month count - صادر نظام مراسلات");
          }
        }
      } else if (this.radiosOutMur == "Year") {
        for (var n = 0; n < this.year.length; n++) {
          if (this.year[n].Name == "صادر نظام مراسلات") {
            this.MsgOutBoundMur = this.year[n].count;
            console.log("Test year count - صادر نظام مراسلات");
          }
        }
      }
    },

    InBoundMur() {
      console.log(this.radiosInMur);
      if (this.radiosInMur == "Week") {
        for (var i = 0; i < this.week.length; i++) {
          if (this.week[i].Name == "وارد نظام مراسلات") {
            this.MsgInBoundMur = this.week[i].count;
            console.log("Test week count - وارد نظام مراسلات");
          }
        }
      } else if (this.radiosInMur == "Month") {
        for (var n = 0; i < this.month.length; n++) {
          if (this.month[n].Name == "وارد نظام مراسلات") {
            this.MsgInBoundMur = this.month[n].count;
            console.log("Test month count - وارد نظام مراسلات");
          }
        }
      } else if (this.radiosInMur == "Year") {
        for (var z = 0; z < this.year.length; z++) {
          if (this.year[z].Name == "وارد نظام مراسلات") {
            this.MsgInBoundMur = this.year[z].count;
            console.log("Test year count - وارد نظام مراسلات");
          }
        }
      }
    },
  },
  mounted() {
    Vue.axios
      .post("https://emp.adf.gov.sa/cms7514254/api/cms/Search", this.requestDay)
      .then((resp) => {
        this.week = resp.data;
        console.log(resp.data);
      });

    Vue.axios
      .post(
        "https://emp.adf.gov.sa/cms7514254/api/cms/Search",
        this.requestMonth
      )
      .then((resp) => {
        this.month = resp.data;
        console.log(resp.data);
      });

    Vue.axios
      .post(
        "https://emp.adf.gov.sa/cms7514254/api/cms/Search",
        this.requestYear
      )
      .then((resp) => {
        this.year = resp.data;
        console.log(resp.data);
      });
  },
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
.radioGrups {
  font-size: 14px;
}
.divBtn {
  justify-content: center;
  left: 340px;
}
.systemManual {
  display: flex;
  justify-content: center;
  position: relative;
  right: 100px;
}
.publicAndMur {
  right: 200px;
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
