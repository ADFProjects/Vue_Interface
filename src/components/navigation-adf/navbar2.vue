<template>
  <div>
    <template>
      <div class="appBar">
        <div
          class="innerAppBar"
          :style="{ 'margin-right': drawer ? '256px' : '10px' }"
        >
          <div class="d-inline-block ml-5">
            <tasty-burger-button
              type="spin"
              :active="active"
              size="xs"
              color="#e6e6e6"
              active-color="#e6e6e6"
              v-on:toggle="onToggle"
            />
          </div>

          <div class="d-inline-block">
            <!-- <router-link to="/homepage" style="text-decoration: none"> -->
            <a
              class="my-application"
              href="https://emp.adf.gov.sa/cms.aspx"
              target="_blank"
              style="color: #e6e6e6; font-size: 15px; text-decoration: none"
            >
              <img
                src="@/assets/ADF_LOGO.png"
                height="56px"
                width="65px"
                style="padding-left: 10px"
              />
            </a>
            <!-- </router-link> -->
          </div>

          <span
            class="my-application d-inline-block my-4"
            style="
              position: absolute;
              font-size: 17px;
              color: #e6e6e6;
              letter-spacing: 1.5px;
            "
          >
            <a
              class="my-application"
              href="https://emp.adf.gov.sa/cms.aspx"
              target="_blank"
              style="color: #e6e6e6; font-size: 15px; text-decoration: none"
            >
              نظام الاتصالات الإدارية
            </a>
          </span>

          <span
            class="my-application EmpName my-1"
            :items="posts"
            style="color: #e6e6e6; position: absolute"
          >
            <!-- {{ posts.EmployeeName }} -->
            {{ this.$store.state.name }}
            <!-- By Abdullah 15-08-2021 -------- -->

            <v-icon style="float: right; color: #e6e6e6; padding-left: 20px"
              >mdi-account</v-icon
            >
          </span>

          <span class="my-application innerGate my-1">
            <a
              class="my-application"
              href="https://portal.adf.gov.sa/AR/pages/default.aspx"
              target="_blank"
              style="color: #e6e6e6; font-size: 15px; text-decoration: none"
            >
              البوابة الداخلية
            </a>
            <v-icon style="float: right; color: #e6e6e6; padding-left: 20px"
              >mdi-home</v-icon
            >
          </span>
        </div>
      </div>
    </template>
    <v-navigation-drawer
      class="navDrawer"
      v-model="drawer"
      app
      right
      clipped
      style="
        background-color: #303030;
        text-align: center;
        opacity: 0.8 !important;
      "
    >
      <v-list>
        <v-list-item-group v-model="model" active-class="green darken-4">
          <div class="nav-types">
            <div v-for="(item, i) in menuItems" :key="i">
              <router-link
                :to="
                  permissions(item.permission) == 'YES' ? item.link : '/alter'
                "
                style="text-decoration: none"
              >
                <!-- <router-link
                :to="permissions(item.permission) ? item.link : '/alter'"
                style="text-decoration: none"
              > -->
                <v-list-item style="height: 70px">
                  <v-list-item-icon>
                    <v-list-item-title
                      class="my-application"
                      style="color: #e6e6e6; font-size: 15px; float: center"
                    >
                      {{ item.name }}

                      <v-icon
                        style="float: right; color: #f2f2f2; padding-left: 20px"
                        >{{ item.icon }}</v-icon
                      >
                    </v-list-item-title>
                  </v-list-item-icon>
                </v-list-item>
              </router-link>
            </div>

            <div>
              <v-list-item link @click="dialog = !dialog" style="height: 70px">
                <v-list-item-icon>
                  <v-list-item-title
                    class="my-application"
                    style="color: #e6e6e6; font-size: 15px"
                  >
                    تقارير البريد السعودي
                    <v-icon
                      style="float: right; color: #f2f2f2; padding-left: 20px"
                      >mdi-dialpad</v-icon
                    >
                  </v-list-item-title>
                </v-list-item-icon>
              </v-list-item>
            </div>
            <div>
              <v-list-item
                link
                style="height: 70px; text-decoration: none"
                href="/files/SystemGuide.pdf"
                target="_blank"
              >
                <v-list-item-icon
                  href="/files/SystemGuide.pdf"
                  target="_blank"
                  style="text-decoration: none"
                >
                  <v-list-item-title
                    class="my-application"
                    style="
                      color: #e6e6e6;
                      font-size: 15px;
                      text-decoration: none;
                    "
                    href="/files/SystemGuide.pdf"
                  >
                    <a
                      class="my-application"
                      href="/files/SystemGuide.pdf"
                      download
                      target="_blank"
                      style="
                        color: #e6e6e6;
                        font-size: 15px;
                        text-decoration: none;
                      "
                    >
                      دليل النظام</a
                    >

                    <v-icon
                      style="float: right; color: #f2f2f2; padding-left: 20px"
                      >mdi-arrow-up-bold-box-outline</v-icon
                    >
                  </v-list-item-title>
                </v-list-item-icon>
              </v-list-item>
              <!-- <hr /> -->
            </div>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-dialog
      transition="dialog-top-transition"
      max-width="900"
      v-model="dialog"
    >
      <template>
        <div>
          <v-card>
            <v-toolbar
              color="#28714e"
              dark
              class="font-weight-medium"
              style="font-size: 19px; color: #e6e6e6; opacity: 0.9 !important"
            >
              <div>
                <p
                  class="my-10 font-weight-medium my-application"
                  style="color: #e6e6e6; margin-left: 8px; font-size: 16px"
                >
                  تصنيف
                </p>
              </div>

              <p
                class="my-10 font-weight-medium my-application"
                style="
                  opacity: 0.6 !important;
                  font-size: 16px;
                  padding-top: 1px;
                "
              >
                المعاملات الصادرة
              </p>
            </v-toolbar>
            <v-card-text style="height: 310px">
              <!-- First row: -->
              <v-row class="mb-6" no-gutters>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="subheading font-weight-bold text-center my-13"
                  style="font-size: 16px"
                  @click="reports('Out')"
                >
                  <v-img
                    id="rowCols"
                    src="~@/assets/OutCity-adf.png"
                    alt="بيان صادر - خارج المدينة"
                    max-height="100"
                    max-width="100"
                    class="my-1"
                    style="right: 227px"
                  ></v-img>
                  <v-col style="right: 128px; bottom: 20px">
                    <h6
                      id="rowCols"
                      class="textTop my-5 my-application font-weight-bold"
                    >
                      بيان بالبريد الصادر
                      <br />
                      <h6 class="textBottom my-2 my-application" id="rowCols">
                        الخارجي
                      </h6>
                    </h6>
                  </v-col>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="subheading font-weight-bold text-center my-13"
                  style="font-size: 16px; cursor: pointer"
                  @click="reports('In')"
                >
                  <v-img
                    id="rowCols"
                    src="~@/assets/InCity-adf.png"
                    alt="بيان صادر - داخل المدينة"
                    max-height="100"
                    max-width="100"
                    class="my-1"
                    style="right: 247px"
                  ></v-img>
                  <v-col style="right: 160px; bottom: 20px">
                    <h6
                      id="rowCols"
                      class="textTop my-5 my-application font-weight-bold"
                    >
                      بيان بالبريد الصادر
                      <br />
                      <h6 id="rowCols" class="textBottom my-2 my-application">
                        الداخلي
                      </h6>
                    </h6>
                  </v-col>
                </v-col>
                <!-- <v-col style="bottom: 50px">
                  <hr
                    style="
                      height: 0.1px;
                      background-color: #808080;
                      width: 870px;
                    "
                  />
                </v-col> -->
                <!-- ------------------------------------------------------ -->
              </v-row>
              <!-- Second row: -->
              <v-row class="mb-6" no-gutters>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="subheading font-weight-bold text-center"
                  style="font-size: 16px"
                  @click="reports('Smsa')"
                >
                  <v-img
                    id="rowCols"
                    src="~@/assets/OutCity-adf.png"
                    alt="بيان صادر - شركة سمسا"
                    max-height="100"
                    max-width="100"
                    class="my-1"
                    style="right: 227px; bottom: 60px"
                  ></v-img>
                  <v-col style="right: 130px; bottom: 60px">
                    <h6
                      id="rowCols"
                      class="textTop my-application font-weight-bold"
                      style="top: 200px"
                    >
                      بيان بالبريد الصادر
                      <br />
                      <h6 id="rowCols" class="textBottom my-2 my-application">
                        شركة سمسا
                      </h6>
                    </h6>
                  </v-col>
                </v-col>
                <!-- ------------------------------------------------------ -->
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="subheading font-weight-bold text-center"
                  style="font-size: 16px"
                  @click="reports('ManualDelivery')"
                >
                  <v-img
                    id="rowCols"
                    src="~@/assets/InCity-adf.png"
                    alt="بيان صادر - تسليم يدوي"
                    max-height="100"
                    max-width="100"
                    class="my-1"
                    style="right: 247px; bottom: 60px"
                  ></v-img>
                  <v-col style="right: 158px; bottom: 60px">
                    <h6
                      class="textTop my-application font-weight-bold"
                      id="rowCols"
                    >
                      بيان بالبريد الصادر
                      <br />
                      <h6 id="rowCols" class="textBottom my-2 my-application">
                        تسليم يدوي
                      </h6>
                    </h6>
                  </v-col>
                </v-col>
                <!-- ------------------------------------------------------ -->
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                class="my-application"
                style="
                  font-size: 15px;
                  font-weight: bold;
                  color: #595959;
                  margin-top: 200px;
                "
                text
                @click="dialog = !dialog"
              >
                <span class="my-application"> إغلاق </span></v-btn
              >
            </v-card-actions>
          </v-card>
        </div>
      </template>
    </v-dialog>
    <template>
      <div id="app" style="position: absolute">
        <v-app id="inspire">
          <v-bottom-navigation
            style="background-color: #303030; opacity: 0.9 !important"
            height="50"
            dark
            app
          >
            <v-bottom-navigation
              height="6"
              style="background-color: #339966"
              dark
              app
              class="my-11"
            >
            </v-bottom-navigation>
            <span
              id="bottom-nav"
              class="my-3 my-application"
              style="font-size: 14px; color: #e6e6e6"
              >جميع الحقوق محفوظة لصندوق التنمية الزراعية

              <span style="font-size: 14px">{{ date }}</span>
              &#169;</span
            >
          </v-bottom-navigation>
        </v-app>
      </div>
    </template>
  </div>
</template>
<script>
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";

Vue.use(VueAxios, axios);

axios.defaults.headers.common["ClientID"] = "Contest01"; // for POST requests
axios.defaults.headers.common["ClientKey"] = "ADFFE1165rDDfTYR"; // for POST requests
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default {
  data: function () {
    return {
      // Bottom navigation date
      posts: [],
      date: new Date().toISOString().substr(0, 4),
      dialog: false,
      drawer: true,
      group: null,
      model: 1,
      active: true,
      menuItems: [
       {
          name: "الصلاحيات",
          link: "/permissions",
          permission: 9,
          icon: "mdi-key",
        },
        {
          name: "الإحصائيات",
          link: "/homepage",
          permission: -1,
          icon: "mdi-view-dashboard",
        },
        {
          name: "صندوق الصادر العام",
          link: "/publicOutboundbox",
          permission: 2,
          icon: "mdi-folder",
        },
      /*  {
          name: "صندوق الصادر الداخلي",
          link: "/internalOutboundbox",
          permission: 2,
          icon: "mdi-folder",
        },*/

        {
          name: "صندوق الوارد العام",
          link: "/inboundbox",
          permission: 1,
          icon: "mdi-folder",
        },
        {
          name: "إضافة صادر خارجي",
          link: "/outbound",
          permission: 2,
          icon: "mdi-email",
        },
        {
          name: "إضافة وارد خارجي",
          link: "/inbound",
          permission: 1,
          icon: "mdi-email",
        },
        {
          name: "استعـلام",
          link: "/inquire",
          permission: [3, 4],
          icon: "mdi-help-box",
        },
      ],
    };
  },
  watch: {
    group() {
      this.drawer = true;
    },
  },
  mounted() {
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetLoginUser")
      .then((response) => {
        this.posts = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    reports(type) {
      //window.location.reload();
      this.$router.push({
        name: "saudipostreport" + type, //use name for router push
        // params: { data: type },
      });
      this.dialog = !this.dialog;
    },
    onToggle() {
      // Toggle menu
      this.drawer = !this.drawer;
    },
    // Bottom navigation date
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    // async permissions(p) {
    //   var list = [];
    //   for (var i = 0; i < p.length; i++) {
    //     //if the page without permissions
    //     if (p[i].localeCompare("") == 0) {
    //       return true;
    //     } else if (
    //       localStorage.getItem("permissions") == null ||
    //       localStorage.getItem("permissions").localeCompare("") == 0
    //     ) {
    //       return false;
    //     } else if (localStorage.getItem("permissions").search(p[i]) != -1) {
    //       list.push(true);
    //     } else {
    //       // route to denied access
    //       list.push(false);
    //     }
    //   }
    //   if (list.length > 1) {
    //     if (!(list[0] || list[1])) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   } else {
    //     return list[0];
    //   }
    // },
    permissions(p) {
      if (this.$store.state.permissions != null) {
        for (var i = 0; i < this.$store.state.permissions.length; i++) {
          if (
            this.$store.state.permissions[i] == p ||
            p == -1 ||
            this.$store.state.permissions[i] == p[0] ||
            this.$store.state.permissions[i] == p[1]
          ) {
            return "YES";
          }
        }
        return "NO";
      }
    },

    reloadPage() {
      // window.location.reload();
    },
  },
};
</script>

<style>
.navDrawer {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.navDrawer ::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.cmsSystem {
  position: fixed;
  font-size: 17px;
  color: white;
  top: 29px;
  letter-spacing: 0.5px;
}

.EmpName {
  position: fixed;
  font-size: 15px;
  color: white;
  top: 20px;
  right: 80%;
  letter-spacing: 0.5px;
}
.innerGate {
  position: absolute;
  font-size: 15px;
  color: white;
  top: 20px;
  right: 71%;
  letter-spacing: 1.5px;
  text-decoration: none;
}
.textTop {
  font-size: 15px;
  color: #595959;
}
.textBottom {
  font-size: 14px;
  color: #b37700;
}
.v-text-field input {
  font-size: 0.9em;
}
.nav-types router-link {
  padding: 50px 1px;
  text-decoration: none;
  font-size: 18px;
  letter-spacing: 1.5px;
  font-family: "Arial", Helvetica, sans-serif;
  text-align: center;
}

hr {
  border-width: 1;
  background-color: #e6e6e6;
  height: 1px;
  margin: 0;
  padding: 0;
}

.appBar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 78px;
  opacity: 0.9 !important;
  background-color: #303030;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.innerAppBar {
  float: right;
}

#rowCols:hover {
  cursor: pointer;
}
</style>

<style lang="css" scoped>
.checkBoxs--text >>> label {
  font-family: "Almarai", sans-serif !important;
  font-size: 0.9em;
}
.v-text-field >>> label {
  font-family: "Almarai", sans-serif !important;
  font-size: 0.9em;
}
.v-tooltip__content {
  font-size: 16px !important;
  opacity: 0.8 !important;
  pointer-events: auto;
  color: white;
  background-color: #404040;
}
</style>


