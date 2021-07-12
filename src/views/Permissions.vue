<template class="my-application">
  <div id="app" class="d-flex justify-center my-application">
    <v-app id="inspire" class="my-application addBackground">
      <v-main class="my-application">
        <v-container class="my-application">
          <v-app-bar
            elevation="20"
            style="border-radius: 4px; opacity: 0.9 !important"
            width="1160"
            color="#28714e"
            dark
            class="mb-1 my-application"
          >
            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-img
                  v-on="on"
                  src="~@/assets/Permission.png"
                  alt="InboundImage"
                  max-height="60"
                  max-width="43"
                ></v-img>
              </template>
              <span class="my-application">الصلاحيات</span>
            </v-tooltip>
          </v-app-bar>

          <v-card>
            <v-form
              class="my-application elevation-10"
              ref="form"
              v-model="valid"
              lazy-validations
            >
              <v-container>
                <v-card>
                  <v-card-title class="grey--text text--darken-2">
                    الصلاحيات :</v-card-title
                  >
                  <v-container>
                    <v-radio-group v-model="types" @change="typeToggle()">
                      <v-row>
                        <v-col v-for="n in permissionsTypes" :key="n">
                          <v-radio
                            :label="n"
                            :value="n"
                            color="#28714e"
                          ></v-radio>
                        </v-col>
                      </v-row>
                    </v-radio-group>
                  </v-container>
                </v-card>
              </v-container>
              <v-container v-show="!permissionsToggle">
                <v-card>
                  <v-card-title class="grey--text text--darken-2">
                    الإدارة / القسم :</v-card-title
                  >
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-autocomplete
                          color="#28714e"
                          no-data-text="لايوجد بيانات"
                          label="الإدارة"
                          :loading="isLoadingDep"
                          v-model="department"
                          :items="departmentList"
                          item-text="GehaName"
                          item-value="DeptNo"
                          @change="getSections(department)"
                          outlined
                        >
                        </v-autocomplete>
                      </v-col>
                      <v-col v-show="sectionToggle">
                        <v-autocomplete
                          color="#28714e"
                          no-data-text="لايوجد بيانات"
                          :loading="isLoadingSec"
                          label="القسم"
                          v-model="section"
                          :items="sectionList"
                          item-text="DEPTNAME"
                          item-value="DEPTNO"
                          @change="getEmplyee('9090', section)"
                          outlined
                        >
                        </v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-container>
              <v-container v-show="permissionsToggle">
                <v-card>
                  <v-card-title class="grey--text text--darken-2">
                    الفرع / المكتب :</v-card-title
                  >
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-autocomplete
                          color="#28714e"
                          no-data-text="لايوجد بيانات"
                          :loading="isLoadingBranch"
                          label="الفرع"
                          v-model="branch"
                          :items="branchList"
                          item-text="G1050CODNAM"
                          item-value="G1050CODNO"
                          @change="getOffice(branch)"
                          outlined
                        >
                        </v-autocomplete>
                      </v-col>
                      <v-col>
                        <v-autocomplete
                          color="#28714e"
                          no-data-text="لايوجد بيانات"
                          :loading="isLoadingOffice"
                          label="المكتب"
                          v-model="office"
                          :items="officeList"
                          item-text="G1050CODNAM"
                          item-value="G1050CODNO"
                          @change="getEmplyee(office, '')"
                          outlined
                        >
                        </v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </v-container>
              <v-container v-show="empToggle">
                <v-card>
                  <loading :active="isLoading" :is-full-page="fullPage" />
                  <v-data-table
                    class="elevation-1"
                    :headers="headers"
                    :items="employeesList"
                    :items-per-page="10"
                    :footer-props="{
                      pageText: '',
                      'items-per-page-text': 'عدد الصفوف في الصفحة:',
                      pageText: 'من {0}-{1} إلى {2}',
                    }"
                  >
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-container>
                        <v-row>
                          <v-col v-for="n in permissions" :key="n.id">
                            <v-checkbox
                              v-model="item.model"
                              class="my-application"
                              :label="n.name"
                              :value="n.id"
                              color="#28714e"
                              @click="saveChanges(item.username, item.model)"
                            ></v-checkbox>
                          </v-col>
                        </v-row>
                      </v-container>
                    </template>
                    <template v-slot:no-data>
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
                          font-size: 20px;
                          padding-top: 25px;
                          color: #4d4d4d;
                        "
                      >
                        لايوجد بيانات
                      </v-alert>
                    </template>
                  </v-data-table>
                  <v-container>
                    <div class="text-center">
                      <v-btn
                        rounded
                        color="#3d7f5f"
                        dark
                        large
                        width="200"
                        :disabled="changeList.length > 0 ? false : true"
                        @click="showAlterWarningMessage()"
                      >
                        <h5
                          class="my-10 my-application"
                          style="color: white; font-size: 14px"
                        >
                          حفظ
                        </h5>
                      </v-btn>
                    </div>
                  </v-container>
                  <v-overlay :value="overlay">
                    <v-progress-circular
                      indeterminate
                      size="64"
                    ></v-progress-circular>
                  </v-overlay>
                </v-card>
              </v-container>
            </v-form>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Vue from "vue";
import VTooltip from "v-tooltip";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert, { reverseButtons: true });

Vue.use(VTooltip);
export default {
  components: {
    Loading,
  },
  data() {
    return {
      changeList: [],
      selectdItem: [],
      overlay: false,
      isLoading: false,
      fullPage: false,
      isLoadingDep: true,
      isLoadingSec: false,
      isLoadingBranch: true,
      isLoadingOffice: false,
      inbound: "10A;10E;10S;12S;14S;10D;",
      outbound: "11A;11E;11S;11D;13S;15S;",
      admin: "10A;10E;10S;12S;14S;10D;11A;11E;11S;11D;13S;15S;",
      empToggle: false,
      sectionToggle: true,
      office: "",
      officeList: [],
      section: "",
      sectionList: [],
      branch: "",
      branchList: [],
      department: "",
      departmentList: [],
      valid: true,
      saveIndex: -1,
      employeesList: [],
      emplyeeList: [
        { name: "Raghad", model: [5, 2] },
        { name: "Noura", model: [] },
        { name: "Asma", model: [] },
        { name: "Ahmed", model: [] },
        { name: "Fay", model: [] },
      ],
      headers: [
        {
          text: "اسم الموظف",
          align: "right",
          sortable: false,
          value: "name",
        },
        {
          text: "الصلاحيات",
          value: "actions",
          sortable: false,
          align: "right",
        },
      ],
      saveCheckbox: {
        outBound: "",
        inBound: "",
        outInquiry: "",
        inInquiry: "",
        outInReports: "",
      },
      types: "المركز الرئيسي",
      permissionsTypes: ["المركز الرئيسي", "الفروع والمكاتب"],
      permissions: [
        {
          name: "تسجيل وارد",
          p: "10A;10S;",
          id: 1,
        },
        {
          name: "تسجيل صادر",
          p: "11A;11S;",
          id: 2,
        },
        {
          name: "استعلام الوارد",
          p: "13S;",
          id: 3,
        },
        {
          name: "استعلام الصادر",
          p: "12S;",
          id: 4,
        },
        {
          name: "تقارير الصادر",
          p: "15S;",
          id: 5,
        },
      ],
      permissionsToggle: false,
    };
  },
  mounted() {
    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetDept?DeptType=1")
      .then((resp) => {
        this.isLoadingDep = false;
        this.departmentList = resp.data;
      });

    Vue.axios
      .get("https://emp.adf.gov.sa/cms7514254/api/cms/GetBranches")
      .then((resp) => {
        this.isLoadingBranch = false;
        this.branchList = resp.data;
      });
  },
  methods: {
    saveChanges(name, p) {
      var addFlag = true;
      //1. make sure there is no duplicate
      for (var i = 0; i < this.changeList.length; i++) {
        //1. check if name already exsist
        if (this.changeList[i].name === name) {
          this.changeList[i].p = p;
          addFlag = false;
        }
      }
      //2. push to list
      if (addFlag) {
        this.changeList.push({
          name: name,
          p: p,
        });
      }
    },
    getOffice(id) {
      this.isLoadingOffice = true;
      this.reset();
      Vue.axios
        .post("https://emp.adf.gov.sa/cms7514254/api/cms/GetOffices", {
          DebId: id,
        })
        .then((resp) => {
          this.isLoadingOffice = false;
          this.officeList = resp.data;
        });
    },
    getSections(id) {
      this.isLoadingSec = true;
      this.reset();
      Vue.axios
        .post(
          "https://emp.adf.gov.sa/cms7514254/api/cms/GetSectionsByDeprtmentId",
          {
            DebId: id,
          }
        )
        .then((resp) => {
          this.isLoadingSec = false;
          this.sectionList = resp.data;
          if (resp.data.length == 0) {
            this.sectionToggle = false;
            this.getEmplyee("9090", id);
          } else {
            this.sectionToggle = true;
          }
        });
    },
    getEmplyee(depId, secId) {
      this.empToggle = true;
      this.isLoading = true;

      Vue.axios
        .post(
          "https://emp.adf.gov.sa/cms7514254/api/cms/GetEmployeePermission",
          {
            DebId: depId,
            SectionId: secId,
          }
        )
        .then((resp) => {
          this.isLoading = false;
          this.getEmplyeeWithPermissions(resp.data);
          this.empToggle = true;
          //
        });
    },
    typeToggle() {
      this.empToggle = false;
      this.section = null;
      this.office = null;
      this.permissionsToggle = !this.permissionsToggle;
    },
    reset() {
      this.empToggle = false;
    },
    savePermissionsChanges() {
      // daloge are you sure?
      for (var i = 0; i < this.changeList.length; i++) {
        var p = "";
        if (this.changeList[i].p.indexOf(1) != -1) {
          p = p.concat("10A;10S;");
        }
        if (this.changeList[i].p.indexOf(2) != -1) {
          p = p.concat("11A;11S;");
        }
        if (this.changeList[i].p.indexOf(3) != -1) {
          p = p.concat("13S;");
        }
        if (this.changeList[i].p.indexOf(4) != -1) {
          p = p.concat("12S;");
        }
        if (this.changeList[i].p.indexOf(5) != -1) {
          p = p.concat("15S;");
        }

        Vue.axios
          .post("https://emp.adf.gov.sa/cms7514254/api/cms/SavePermission", {
            Username: this.changeList[i].name,
            Permissions: p,
          })
          .then(() => {
            this.changeList = [];
            this.showAlterSuccessMessage();
            // success dialoge
          });
      }
    },
    getEmplyeeWithPermissions(list) {
      //1. loop throw each emp from api
      this.employeesList = [];
      for (var i = 0; i < list.length; i++) {
        var p = [];
        if (list[i] != null) {
          if (list[i].Permissions != null) {
            if (list[i].Permissions.search("10A") != -1) {
              p.push(1);
            }
            if (list[i].Permissions.search("11A") != -1) {
              p.push(2);
            }
            if (list[i].Permissions.search("13S") != -1) {
              p.push(3);
            }
            if (list[i].Permissions.search("12S") != -1) {
              p.push(4);
            }
            if (list[i].Permissions.search("15S") != -1) {
              p.push(5);
            }
          }

          this.employeesList.push({
            name: list[i].EmployeeName,
            model: p,
            username: list[i].EmployeeUserName,
          });
        } //end if
      } // end for
    },
    showAlterWarningMessage() {
      this.$fire({
        title: "حفظ التغييرات",
        text: "هل أنت متأكد من تغيير الصلاحيات؟",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28714e",
        cancelButtonColor: "grey",
        confirmButtonText: "تغيير",
        cancelButtonText: "إلغاء",
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          this.savePermissionsChanges();
        }
      });
    },
    showAlterSuccessMessage() {
      this.$fire({
        title: "تم تغيير الصلاحيات بنجاح",
        type: "success",
        confirmButtonText: "إغلاق",
        confirmButtonColor: "#28714e",
      });
      // location.reload();
    },
  },
};
</script>

<style lang="css" scoped>
@media print {
  @page {
    size: 30mm 21mm;
    margin: 0;
    padding: 0;
  }
}
.v-radio >>> label {
  font-family: "Almarai", sans-serif !important;
  font-size: 0.9em;
}
.checkBoxs--text >>> label {
  font-family: "Almarai", sans-serif !important;
  font-size: 0.9em;
  color: red;
}
.v-text-field >>> label {
  font-family: "Almarai", sans-serif !important;
  font-size: 0.9em;
}
.v-tooltip__content {
  font-size: 14px !important;
  opacity: 0.8 !important;
  pointer-events: auto;
  color: white;
  background-color: #404040;
}
</style>
<style>
.v-text-field input {
  font-size: 0.9em;
}
.inputNumber input[type="number"] {
  -moz-appearance: textfield;
}
.inputNumber input::-webkit-outer-spin-button,
.inputNumber input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.v-autocomplete-content {
  direction: rtl;
  color: blue;
}
.text {
  font-size: 16px;
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
<style lang="scss">
#tdAll {
  font-size: 12px;
  font-family: "Almarai", sans-serif !important;
}
#rowCols:hover {
  cursor: pointer;
}
.v-text-field input {
  font-size: 0.9em;
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 16px !important;
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>

<style lang="css" scoped>
::v-deep th .my-application {
  color: rgb(36, 224, 193) !important;
  font-weight: bold !important;
  opacity: 0.8 !important;
  letter-spacing: 0.3px;
  font-family: "Almarai", sans-serif;
}
::v-deep .v-data-table-header th {
  background-color: #f2f2f2 !important;
  font-weight: bold !important;
}
::v-deep th {
  color: #262626 !important;
  font-weight: bold !important;
  opacity: 0.8 !important;
  letter-spacing: 0.3px;
}
::v-deep td {
  color: #595959;
  font-size: 1px;
}
.truncate {
  max-width: 1vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.checkBoxs--text >>> label {
  font-family: "Almarai", sans-serif !important;
  font-size: 0.9em;
}
.v-text-field >>> label {
  font-family: "Almarai", sans-serif !important;
  font-size: 0.9em;
}
.v-tooltip__content {
  font-size: 14px !important;
  opacity: 0.8 !important;
  pointer-events: auto;
  color: white;
  background-color: #404040;
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
<style>
#checkboxLabel {
  color: rgb(114, 111, 111);
  font-size: 16px;
  margin-top: 10px;
}
#checkboxDiv {
  padding-right: 150px;
}
</style>
