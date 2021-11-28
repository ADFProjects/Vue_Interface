<style scoped>
.m {
  height: 100%;
}
</style>
<template>
  <section class="section-container m">
    <v-row class="signin" style="max-width: 100%; height: 100%">
      <v-col cols="8" class="left"> </v-col>
      <v-col cols="4" class="right">
        <v-container>
          <h2>تسجيل الدخول</h2>
          <validation-observer ref="observer">
            <v-form @submit.prevent="submit">
              <validation-provider
                v-slot="{ errors }"
                name="اسم المستخدم"
                rules="required"
              >
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  label="اسم المستخدم"
                  required
                  outlined
                  dark
                  filled
                  dense
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="كلمة المرور"
                rules="required"
              >
                <v-text-field
                  v-model="password"
                  :error-messages="errors"
                  label="كلمة المرور"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPass = !showPass"
                  required
                  outlined
                  dense
                  dark
                  filled
                  :type="showPass ? 'text' : 'password'"
                ></v-text-field>
              </validation-provider>
              <div class="text-center">
                <v-btn
                  class="signin-btn"
                  type="submit"
                  rounded
                  color="white"
                  dark
                >
                  دخول
                </v-btn>
              </div>
              
            </v-form>
          </validation-observer>

        </v-container>
                  <v-progress-circular
                indeterminate
                color="green"
              ></v-progress-circular>
      </v-col>
    </v-row>
  </section>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert, { reverseButtons: true });
Vue.use(VueAxios, axios);

import { required, email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationProvider,
  setInteractionMode,
  ValidationObserver,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "الرجاء تعبئة {_field_} ",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    email: "",
    password: null,
    showPass: false,
    loginRequestBody: {
      EmpNo: "",
      Password: "",
    },
  }),
  computed: {
    params() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },
  methods: {
    async submit() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        this.loginRequestBody.EmpNo = this.email;
        this.loginRequestBody.Password = this.password;
        console.log(this.loginRequestBody);

        Vue.axios
          .post(
            "http://adf-testintgr01/EGPortalApi/api/cms/Login",
            this.loginRequestBody
          )
          .then((resp) => {
            console.log(resp.data);
            // go to main page
          });
      } //end if
    },
    clear() {
      // you can use this method to clear login form
      this.email = "";
      this.password = null;
      this.$refs.observer.reset();
    },
  },
};
</script>