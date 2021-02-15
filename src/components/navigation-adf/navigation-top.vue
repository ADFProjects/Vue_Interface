<template>
  <div id="app" style="position: absolute;">
    <v-app id="inspire">
      <!-- <v-img
              class="adf-logo"
              src="@/assets/adf_background.png"
              height="50px"
              width="60px"
             style="position: absolute;"

            >
            </v-img> -->
      <v-card
      class="mx-auto overflow-hidden"
      height="666"
      width="1520"
      style="margin-top:0px; margin-right: 50px; text-align: center;"
     
    >
       <!-- style="margin:200px;margin-right:100px;margin-left:360px;" -->
             <v-img
              class="adf-logo"
              src="@/assets/icon-adf.png"
              height="150px"
              width="170px"
              style="margin-left: 800px; margin-top:100px;"
            >
            </v-img>

             <v-img
              class="adf-logo"
              src="@/assets/icon-adf.png"
              height="150px"
              width="170px"
              style="margin-left:400px;margin-top:-145px;"
            >
            </v-img>
            <div class="image">
            <p id="p1-image1"> 
              عدد المعاملات
             </p>
             <p id="p2-image1">
              الصادرة
             </p>
            <p id="p3-image1">
              4
             </p>
             <hr id="line-image1">
             <!-- ----------------------- -->
              <p id="p1-image2"> 
              عدد المعاملات
             </p>
             <p id="p2-image2">
              الواردة
             </p>
            <p id="p3-image2">
              10
             </p>
             <hr id="line-image2">
            </div>

      <v-app-bar
      color="#252123"
      dark
      app
      width="5000"
      >
        <v-toolbar-title style=" padding-right: 1px; color: rgb(243, 243, 243);">
          ريناد بنت تركي بن حمد السبيعي</v-toolbar-title>
        <v-icon style="padding-left: 10px;">mdi-account</v-icon>


        <v-toolbar-title 
        style="padding-left: 20px; padding-right: 1px;">
        <a href="https://adf.gov.sa/ar/Pages/default.aspx"
        target="_blank"
        text
        rounded
        d-inline-flex
        align-center
        justify-center
        style="text-decoration: none;font-size: 20px; color: rgb(243, 243, 243);">
          البوابة الداخلية</a> </v-toolbar-title>
        <v-btn
        icon
        href="https://adf.gov.sa/ar/Pages/default.aspx"
        target="_blank"
        text
        rounded
        d-inline-flex
        align-center
        justify-center>
          <v-icon style="padding-left: 1px;">mdi-home</v-icon>
        </v-btn>


        <!-- <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn> -->

        <v-spacer></v-spacer>
        
        <v-toolbar-title class="adf-text">
          نظام الاتصالات الادارية</v-toolbar-title>

        <v-toolbar-side-icon>
          <v-btn
            class="dot"
            href="https://adf.gov.sa/ar/Pages/default.aspx"
            target="_blank"
            text
            height="60"
            width="50"
            rounded
            d-inline-flex
            align-center
            justify-center
          >
            <v-img
              class="adf-logo"
              src="@/assets/ADF_LOGO.png"
              height="50px"
              width="50px"
            >
            </v-img>
          </v-btn>
        </v-toolbar-side-icon>

        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>

      <!-- <v-navigation-drawer 
      temporary -->

      <v-navigation-drawer 
        v-model="drawer"
        app
        right
        bottom
        width="200"
        height="605"
        style="background-color: #252123; text-align: center; margin: 64px 0px; padding: 10px 1px;"
      >
        <!-- <v-list
          nav
          dense 
        > -->
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
              <hr style="height:1px;border-width:0;color:gray;background-color:rgb(243, 243, 243);">

<!-- <v-subheader>REPORTS</v-subheader> -->
              <v-list-item>
                <v-list-item-title
                  ><a href="#outbox" class="list-item"
                    >صندوق الصادر</a
                  ></v-list-item-title
                >
              </v-list-item>
              <hr style="height:1px;border-width:0;color:gray;background-color:rgb(243, 243, 243);">

              <v-list-item>
                <v-list-item-title
                  ><a href="#inbound" class="list-item"
                    >اضافة وارد</a
                  ></v-list-item-title
                >
              </v-list-item>
<hr style="height:1px;border-width:0;color:gray;background-color:rgb(243, 243, 243);">
              <v-list-item>
                <v-list-item-title
                  ><a href="#outbound" class="list-item"
                    >اضافة صادر</a
                  ></v-list-item-title
                >
              </v-list-item>
              <hr style="height:1px;border-width:0;color:gray;background-color:rgb(243, 243, 243);">

              <v-list-item>
                <v-list-item-title
                  ><a href="#search" class="list-item"
                    >الاستعلام</a
                  ></v-list-item-title
                >
              </v-list-item>
              <hr style="height:1px;border-width:0;color:gray;background-color:rgb(243, 243, 243);">

              <v-list-item>
                <v-list-item-title
                  ><a href="#reports" class="list-item"
                    >التقارير</a
                  ></v-list-item-title
                >
              </v-list-item>
              <hr style="height:1px;border-width:0;color:gray;background-color:rgb(243, 243, 243);">

            </div>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
 </v-card>



      <v-bottom-navigation style="background-color: #252123;" dark app>
      <span style="color: rgb(243, 243, 243); font-size: 20px; margin-top: 10px;">إدارة تقنية المعلومات - صندوق التنمية الزراعية - 1442 هـ - 2021 م</span>
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
      this.drawer = false;
    
    },
  },
};
</script>

<style>
.nav-types a{
  
  padding: 50px 1px;
  text-decoration: none;
  font-size: 20px;
  letter-spacing: 1.5px;
  font-family: "Arial", Helvetica, sans-serif;
  text-align: center;
  line-height: 3;
}
.nav-types .list-item:visited {
  color: rgb(243, 243, 243);
  background-color: red;
  text-decoration: none;
  text-align: center;
  
}
/* .nav-types .list-item:hover { 
  color: rgb(243, 243, 243);
  background-color: red;
  text-align: center;
  max-width: 100px;
  display: inline-block;
} */
/* a:visited {
  color: rgb(86, 245, 12);
} */
/* .nav-types a:link {
  color: rgb(233, 18, 18);
}
.nav-types a:hover {
  color: rgb(235, 171, 171);
}
a:active {
  color: rgb(12, 247, 110);
} */

.adf-text {
  padding-right: 20px;
  /* letter-spacing: 1px; */
  font-family: "Arial", Helvetica, sans-serif;
  color: rgb(243, 243, 243);
  
}
.image {
  font-family: "Arial", Helvetica, sans-serif;
  font-size: 25px;
}
.image #p1-image1{
    color: #257F25;
  margin-top:-2px;
  margin-right:559px;
}
.image #p2-image1{
  margin-top:-20px;
  margin-right:560px;
}
.image #p3-image1{
  color: #FFC000;
  margin-top:-20px;
  margin-right:560px;
}
.image #line-image1{
  height: 2px;
  width: 200px;
  border-width: 0;
  background-color: black;
  margin-left: 385px;
  margin-top:-15px;
}
/* --------------------- */
.image #p1-image2{
    color: #257F25;
  margin-top:-100px;
  margin-right:-247px;
}
.image #p2-image2{
  margin-top:-23px;
  margin-right:-250px;
}
.image #p3-image2{
  color: #FFC000;
  margin-top:-15px;
  margin-right:-250px;
}
.image #line-image2{
  height: 1.5px;
  width: 200px;
  border-width: 0;
  background-color: black;
  margin-left: 788px;
  margin-top:-15px;
}
</style>
