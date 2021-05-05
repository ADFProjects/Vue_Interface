<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark" app>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-navbar-brand>
              نظام الاتصالات الإدارية
              <div class="d-inline-block ml-4">
                <img src="@/assets/ADF_LOGO.png" height="45px" width="45px" />
              </div>

              <div
                style="background-color: #252123"
                class="d-inline-block ml-4"
              >
                <tasty-burger-button
                  type="spin"
                  active="true"
                  size="s"
                  color="white"
                  active-color="gray"
                  v-on:toggle="onToggle"
                />
              </div>
            </b-navbar-brand>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <v-row>
        <v-col>
          <v-navigation-drawer
            id="sidbar-right"
            v-model="drawer"
            app
            right
            clipped
            style="background-color: #252123; text-align: center;"
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
                    <v-list-item-title>
                      <router-link to="/inbound" class="list-item"
                        >اضافة وارد</router-link
                      >
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
                    <v-list-item-title>
                      <router-link to="/outbound" class="list-item"
                        >اضافة صادر</router-link
                      >
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
                    <v-list-item-title>
                      <router-link to="/inquire" class="list-item"
                        >استعلام</router-link
                      >
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
        </v-col>
      </v-row>
    </div>
  </div>
</template> 

<script>
export default {
  data: function () {
    return {
      drawer: true,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = true;
    },
  },
  methods: {
    onToggle() {
      // Toggle menu
      this.drawer = !this.drawer;
    },
  },
};
</script>
<style>
.nav-types router-link {
  padding: 50px 1px;
  text-decoration: none;
  font-size: 18px;
  letter-spacing: 1.5px;
  font-family: "Arial", Helvetica, sans-serif;
  text-align: center;
}
.nav-types .list-item:visited {
  color: rgb(243, 243, 243);
  text-decoration: none;
  text-align: center;
}
.navbar.navbar-dark.bg-dark {
  background-color: #252123 !important;
}
</style>
