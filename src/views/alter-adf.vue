<template>
  <div id="app" class="justify-center text-center">
    <v-app id="inspire">
      <v-main>
        <v-container>
          <template>
            <v-alert
              :value="true"
              class="my-application text-center perAlert"
              justify="center"
              color="#339966"
              border="top"
              colored-border
              type="error"
              elevation="5"
              height="70"
              width="600"
              align="center"
              style="
                padding-top: 25px;
                font-size: 16px;
                color: #595959;
                letter-spacing: 1.6px;
              "
            >
              <span
                justify="center"
                align="center"
                class="my-application text-center"
              >
                عذراً، لايوجد لديك صلاحية للدخول على الصفحة.</span
              >
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

<style>
.perAlert {
  position: fixed;
  bottom: 50%;
  right: 100%;
  left: 45%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
</style>