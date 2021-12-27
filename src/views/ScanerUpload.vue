<template>
  <div id="app" class="justify-center text-center">
    <v-app id="inspire">
      <v-main>
        <v-container>
          <template>
            <v-container>
              <v-row>
                <select v-if="!bWASM" id="sources"></select>

                <v-btn
                  v-if="!bWASM"
                  @click="acquireImage()"
                  class="mx-2"
                  fab
                  dark
                  large
                  color="purple"
                >
                  scan
                </v-btn>
                <v-btn @click="openImage()" class="mx-2" fab dark large color="green">
                open
                </v-btn>
                <v-btn class="mx-2" fab dark large color="purple"  @click="Dynamsoft_OnPostAllTransfers()">
                  upload
                </v-btn>

                <div v-bind:id="containerId"></div>
              </v-row>
            </v-container>
          </template>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import Dynamsoft from "dwt";

export default {
  data: function () {
    return {
      containerId: "dwtControlContainer",
      bWASM: false,
    };
  },
  mounted() {
    this.bWASM = false;
    /**
     * ResourcesPath & ProductKey must be set in order to use the library!
     */
    Dynamsoft.DWT.ResourcesPath = "dwt-resources";
    Dynamsoft.DWT.organizationID = "100780405";
    Dynamsoft.DWT.Containers = [
      {
        WebTwainId: "dwtObject",
        ContainerId: this.containerId,
        Width: "100%",
        Height: "400px",
      },
    ];
    Dynamsoft.DWT.RegisterEvent("OnWebTwainReady", () => {
      this.Dynamsoft_OnReady();
    });
    Dynamsoft.DWT.Load();
  },
  methods: {
    SaveImage() {
      if (this.DWObject) {
        this.DWObject.IfShowFileDialog = true;
        if (this.DWObject.HowManyImagesInBuffer > 0)
          this.DWObject.SaveAllAsMultiPageTIFF("WebTWAINImage.tiff");
      }
    },
    Dynamsoft_OnPostAllTransfers() {
      if (this.DWObject) {
        if (this.DWObject.HowManyImagesInBuffer > 0) {
          var strHTTPServer = "https://emp.adf.gov.sa";
          this.DWObject.HTTPPort = location.port == "" ? 443 : 443;
          var strActionPage = "/cms7514254/api/FileManager/UploadFile?k=cms";
          /**
           * 1.change file name
           *
           */
          var uploadfilename = "tt.pdf";

          this.DWObject.ClearAllHTTPFormField();
          this.DWObject.SetHTTPFormField("k", "cms");

          this.DWObject.HTTPUploadAllThroughPostAsPDF(
            strHTTPServer,
            strActionPage,
            uploadfilename,
            function OnHttpUploadSuccess() {
              console.log("successful");
            },
            function onServerReturnedSomething(
              errorCode,
              errorString,
              response
            ) {
              if (errorCode != 0 && errorCode != -2003) {
                console.log("errorCode: " + errorCode);
                console.log("errorString: " + errorString);
              }
              /**
               * 2. add to (filsUrls ) list name - path - type - category
               *
               */
              console.log("response: " + response);
            }
          );
        }
      }
      /*
      3. call uploadFiles
      */
    },
    Dynamsoft_OnReady() {
      this.DWObject = Dynamsoft.DWT.GetWebTwain(this.containerId);
      this.bWASM = Dynamsoft.Lib.env.bMobile || !Dynamsoft.DWT.UseLocalService;
      if (this.bWASM) {
        this.DWObject.Viewer.cursor = "pointer";
      } else {
        let sources = this.DWObject.GetSourceNames();
        this.selectSources = document.getElementById("sources");
        this.selectSources.options.length = 0;
        for (let i = 0; i < sources.length; i++) {
          this.selectSources.options.add(new Option(sources[i], i.toString()));
        }
      }
    },
    /**
     * Acquire images from scanners or cameras or local files
     */
    acquireImage() {
      if (!this.DWObject) this.DWObject = Dynamsoft.DWT.GetWebTwain();
      if (this.bWASM) {
        alert("Scanning is not supported under the WASM mode!");
      } else if (
        this.DWObject.SourceCount > 0 &&
        this.DWObject.SelectSourceByIndex(this.selectSources.selectedIndex)
      ) {
        const onAcquireImageSuccess = () => {
          this.DWObject.CloseSource();
        };
        const onAcquireImageFailure = onAcquireImageSuccess;
        this.DWObject.OpenSource();
        this.DWObject.AcquireImage(
          {},
          onAcquireImageSuccess,
          onAcquireImageFailure
        );
      } else {
        alert("No Source Available!");
      }
    },
    /**
     * Open local images.
     */
    openImage() {
      if (!this.DWObject) this.DWObject = Dynamsoft.DWT.GetWebTwain();
      this.DWObject.IfShowFileDialog = true;
      /**
       * Note:
       * This following line of code uses the PDF Rasterizer which is an extra add-on that is licensed seperately
       */
      this.DWObject.Addon.PDF.SetConvertMode(
        Dynamsoft.DWT.EnumDWT_ConvertMode.CM_RENDERALL
      );
      this.DWObject.LoadImageEx(
        "",
        Dynamsoft.DWT.EnumDWT_ImageType.IT_ALL,
        () => {
          //success
        },
        () => {
          //failure
        }
      );
    },
  },
};
</script>

