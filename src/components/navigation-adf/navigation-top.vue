



<template>
  <div id="app">
    <v-app id="inspire">
      <v-card
      >
        <v-app-bar color="#252123" dark app>
          <div id="navIcon">
            <v-app-bar-nav-icon
              style="color: rgb(243, 243, 243)"
              @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
          </div>


          <div id="systemName">
            <v-toolbar-title
              id="rr"
              style="margin-right: 15px; color: rgb(243, 243, 243)"
            >
              نظام الاتصالات الادارية</v-toolbar-title
            >
          </div>
       

          <div id="InnerPortalIcon">
            <v-toolbar-side-icon style="margin-right: 900px">
              <v-btn
                class="dot"
                href="https://adf.gov.sa/ar/Pages/default.aspx"
                target="_blank"
                text
                height="200"
                rounded
                d-inline-flex
                align-center
                justify-center
              >
                <v-icon style="color: rgb(243, 243, 243)">mdi-home</v-icon>
              </v-btn>
            </v-toolbar-side-icon>
          </div>

          <div id="InnerPortal">
            <v-toolbar-title
              style="margin-right: -1px; color: rgb(243, 243, 243)"
            >
              <a
                href="https://adf.gov.sa/ar/Pages/default.aspx"
                target="_blank"
                text
                rounded
                d-inline-flex
                align-center
                justify-center
                style="
                  text-decoration: none;
                  font-size: 20px;
                  color: rgb(243, 243, 243);
                "
              >
                البوابة الداخلية</a
              >
            </v-toolbar-title>
          </div>

          <div id="EmployeeNumIcon">
            <v-icon
              style="
                margin-right: 15px;
                padding-left: 15px;
                margin-bottom: 5px;
                color: rgb(243, 243, 243);
              "
              >mdi-account</v-icon
            >
          </div>
          <div id="EmployeeNum">
            <v-toolbar-title
              style="
                margin-right: 5px;
                margin-bottom: 7px;
                color: rgb(243, 243, 243);
              "
            >
              ريناد بنت تركي بن حمد السبيعي
            </v-toolbar-title>
          </div>

          <v-spacer></v-spacer>
        </v-app-bar>
        <v-card   
>

        <v-navigation-drawer
        height="100%"
          v-model="drawer"
          app
          right
          bottom
          style="
            background-color: #252123;
            text-align: center;
            padding: 10px 1px;
          "
        >
          <v-list>
            <v-list-item-group
              v-model="group"
              active-class="green lighten-1 text--accent-4"
            >
              <div class="nav-types">
                <v-list-item>
                  <v-list-item-title>
                    <a href="#inbox" class="list-item"
                      >صندوق الوارد</a
                    ></v-list-item-title
                  >
                </v-list-item>
                <hr
                  style="
                    height: 1px;
                    border-width: 0;
                    color: gray;
                    background-color: rgb(243, 243, 243);
                  "
                />

                <v-list-item>
                  <v-list-item-title
                    ><a href="#outbox" class="list-item"
                      >صندوق الصادر</a
                    ></v-list-item-title
                  >
                </v-list-item>
                <hr
                  style="
                    height: 1px;
                    border-width: 0;
                    color: gray;
                    background-color: rgb(243, 243, 243);
                  "
                />

                <v-list-item>
                  <router-link to="/inbound" class="list-item" >اضافة وارد</router-link>
                  <v-list-item-title>   
                    
                                     </v-list-item-title>
                </v-list-item>
                <hr
                  style="
                    height: 1px;
                    border-width: 0;
                    color: gray;
                    background-color: rgb(243, 243, 243);
                  "
                />
                <v-list-item>
                  <v-list-item-title
                    >
                  <router-link to="/outbound" class="list-item" >اضافة صادر</router-link>

                    </v-list-item-title
                  >
                </v-list-item>
                <hr
                  style="
                    height: 1px;
                    border-width: 0;
                    color: gray;
                    background-color: rgb(243, 243, 243);
                  "
                />

                <v-list-item>
                  <v-list-item-title
                    >
                  <router-link to="/inquire" class="list-item" >استعلام</router-link>

                    </v-list-item-title
                  >
                </v-list-item>
                <hr
                  style="
                    height: 1px;
                    border-width: 0;
                    color: gray;
                    background-color: rgb(243, 243, 243);
                  "
                />

                <v-list-item>
                  <v-list-item-title
                    ><a href="#reports" class="list-item"
                      >التقارير</a
                    ></v-list-item-title
                  >
                </v-list-item>
                <hr
                  style="
                    height: 1px;
                    border-width: 0;
                    color: gray;
                    background-color: rgb(243, 243, 243);
                  "
                />
              </div>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        </v-card>
      </v-card>

      <v-bottom-navigation style="background-color: #252123" dark app>
        <span
          style="color: rgb(243, 243, 243); font-size: 20px; margin-top: 10px"
          >إدارة تقنية المعلومات - صندوق التنمية الزراعية - 1442 هـ - 2021
          م</span
        >
      </v-bottom-navigation>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = true;
    },
  },
};
</script>

<style>
.nav-types a {
  padding: 50px 1px;
  text-decoration: none;
  font-size: 21px;
  letter-spacing: 1.5px;
  font-family: "Arial", Helvetica, sans-serif;
  text-align: center;
  line-height: 3;
}
.nav-types .list-item:visited {
  color: rgb(243, 243, 243);
  text-decoration: none;
  text-align: center;
}

.image {
  font-family: "Arial", Helvetica, sans-serif;
  font-size: 25px;
}
.image #p1-image1 {
  color: #257f25;
  margin-top: -2px;
  margin-right: 559px;
}
.image #p2-image1 {
  margin-top: -20px;
  margin-right: 560px;
}
.image #p3-image1 {
  color: #ffc000;
  margin-top: -20px;
  margin-right: 560px;
}
.image #line-image1 {
  height: 2px;
  width: 200px;
  border-width: 0;
  background-color: black;
  margin-left: 385px;
  margin-top: -15px;
}
/* --------------------- */
.image #p1-image2 {
  color: #257f25;
  margin-top: -100px;
  margin-right: -247px;
}
.image #p2-image2 {
  margin-top: -23px;
  margin-right: -250px;
}
.image #p3-image2 {
  color: #ffc000;
  margin-top: -15px;
  margin-right: -250px;
}
.image #line-image2 {
  height: 1.5px;
  width: 200px;
  border-width: 0;
  background-color: black;
  margin-left: 788px;
  margin-top: -15px;
}
</style>
