<template>
  <div id="app" class="justify-center text-center">
    <v-app id="inspire">
      <v-main>
        <v-container>
          <template>
            <v-alert
              :value="true"
              color="#339966"
              border="top"
              colored-border
              type="error"
              elevation="5"
              height="70"
              style="
                      margin-top: 20px;
                      padding-left: 40px;
                      padding-top: 25px;
                      font-size: 20px;
                      color: #4d4d4d;
                    "
            >
              عذراً، لايوجد لديك صلاحية للدخول على الصفحة
            </v-alert>
          </template>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
export default {};
</script>
