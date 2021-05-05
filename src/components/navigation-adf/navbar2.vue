<template>
  <div>
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
        <div class="d-inline-block ml-4">
          <router-link to="/homepage" style="text-decoration: none">
            <img src="@/assets/ADF_LOGO.png" height="56px" width="56px" />
          </router-link>
        </div>
        <div id="fonts" class="d-inline-block ml-4" style="color: #e6e6e6; ">
          <h5>نظام الاتصالات الإدارية</h5>
        </div>
      </div>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      app
      right
      clipped
      style="background-color: #303030; text-align: center"
    >
      <v-list>
        <v-list-item-group v-model="model" active-class="green darken-2">
          <div class="nav-types">
            <div v-for="(item, i) in menuItems" :key="i">
              <router-link
                :to="permissions(item.permission) ? item.link : '/alter'"
                style="text-decoration: none"
              >
                <v-list-item style="height: 70px">
                  <v-list-item-title style="color: #e6e6e6; font-size: 18px">
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item>
              </router-link>
              <hr />
            </div>
            <div>
              <v-list-item style="height: 70px">
                <v-list-item-title
                  style="color: #e6e6e6; font-size: 18px"
                  @click="dialog = !dialog"
                >
                  التقارير
                </v-list-item-title>
              </v-list-item>
              <hr />
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
              style="font-size: 20px; font-weight: bold; color: #e6e6e6"
              >تصنيف المعاملات الصادرة</v-toolbar
            >
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
                    src="~@/assets/OutCity-adf.png"
                    alt="بيان صادر - خارج المدينة"
                    max-height="100"
                    max-width="100"
                    class="my-1"
                    style="right:93px;"
                  ></v-img>
                  <h6 class="my-5" style="color: #4d4d4d; font-weight: bold">
                    بيان بالبريد الصادر
                    <br />
                    <h6 style="color:#b37700;" class="my-2">
                      الخارجي
                    </h6>
                  </h6>
                </v-col>
                <!-- ------------------------------------------------------ -->
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="subheading font-weight-bold text-center my-14"
                  style="font-size: 16px"
                  @click="reports('Inbox')"
                >
                  <v-img
                    src="~@/assets/Offices-adf.png"
                    alt="بيان صادر - الفروع والمكاتب والمؤسسات"
                    style="
                      border-radius: 29px;
                      border-top-left-radius: 45px;
                      border-top-right-radius: 45px;
                     right:90px;
                    "
                    max-height="90"
                    max-width="90"
                  ></v-img>
                  <h6 class="my-7" style="color: #4d4d4d; font-weight: bold;">
                    بيان بالبريد الصادر
                    <br />
                    <h6 style="color:#b37700;" class="my-2">
                      صندوق البريد
                    </h6>
                  </h6>
                </v-col>
                <!-- ------------------------------------------------------ -->
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="subheading font-weight-bold text-center my-13"
                  style="font-size: 16px"
                  @click="reports('In')"
                >
                  <v-img
                    src="~@/assets/InCity-adf.png"
                    alt="بيان صادر - داخل المدينة"
                    max-height="100"
                    max-width="100"
                    class="my-1"
                    style=" right:80px;"
                  ></v-img>
                  <h6 class="my-5" style="color: #4d4d4d; font-weight: bold;">
                    بيان بالبريد الصادر
                    <br />
                    <h6 style="color:#b37700;" class="my-2">
                      الداخلي
                    </h6>
                  </h6>
                </v-col>
                <v-col style="bottom: 15px;">
                  <hr
                    style="height: 0.1px; background-color: #808080; width: 870px;"
                  />
                </v-col>
                <!-- ------------------------------------------------------ -->
              </v-row>
              <!-- Second row: -->
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                  class="subheading font-weight-bold text-center"
                  style="font-size: 16px"
                  @click="reports('Smsa')"
                >
                  <v-img
                    src="~@/assets/OutCity-adf.png"
                    alt="بيان صادر - شركة سمسا"
                    max-height="100"
                    max-width="100"
                    class="my-1"
                    style="right:220px;bottom:20px;"
                  ></v-img>
                  <v-col style="right:130px;bottom:20px;">
                    <h6 style="color: #4d4d4d; font-weight: bold; top:200px;">
                      بيان بالبريد الصادر
                      <br />
                      <h6 style="color:#b37700;" class="my-2">
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
                    src="~@/assets/InCity-adf.png"
                    alt="بيان صادر - تسليم يدوي"
                    max-height="100"
                    max-width="100"
                    class="my-1"
                    style=" right:200px; bottom:20px;"
                  ></v-img>
                  <v-col style="right:120px; bottom:20px;">
                    <h6 style="color: #4d4d4d; font-weight: bold;">
                      بيان بالبريد الصادر
                      <br />
                      <h6 style="color:#b37700;" class="my-2">
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
                style="
                font-size: 18px;
                font-weight: bold;
                color: #4d4d4d;
                margin-top: 200px;
              "
                text
                @click="dialog = !dialog"
                >إغلاق</v-btn
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
            style="background-color: #303030"
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
              class="my-3"
              style="font-size: 18px; color: #e6e6e6"
              >جميع الحقوق محفوظة صندوق التنمية الزراعية

              <strong style="font-size: 17px">{{ date }}</strong>
              &#169;</span
            >
          </v-bottom-navigation>
        </v-app>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      // Bottom navigation date
      date: new Date().toISOString().substr(0, 4),
      dialog: false,
      drawer: true,
      group: null,
      model: 1,
      active: true,
      menuItems: [
        {
          name: "الإحصائيات",
          link: "/homepage",
          permission: "",
        },
        {
          name: "صندوق الصادر",
          link: "/outboundbox",
          permission: "11S",
        },

        {
          name: "صندوق الوارد",
          link: "/inboundbox",
          permission: "10S",
        },
        {
          name: "إضافة صادر",
          link: "/outbound",
          permission: "11A",
        },
        {
          name: "إضافة وارد",
          link: "/inbound",
          permission: "10A",
        },
        {
          name: "استعلام",
          link: "/inquire",
          permission: "",
        },
      ],
    };
  },
  watch: {
    group() {
      this.drawer = true;
    },
  },
  mounted() {},
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
    permissions(p) {
      if (p.localeCompare("") == 0) {
        return true;
      } else if (localStorage.getItem("permissions").search(p) != -1) {
        return true;
      } else {
        // route to denied access
        return false;
      }
    },

    reloadPage() {
      // window.location.reload();
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Mada:wght@300;900&display=swap");

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
  background-color: #303030;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.innerAppBar {
  float: right;
}
</style>
