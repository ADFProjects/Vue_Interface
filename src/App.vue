<template>
  <v-app>
  
    <v-main>
      <inbound-registry/>
    </v-main>
    
    <v-content>
      <router-view></router-view>
    </v-content>

    
  </v-app>
</template>

<script>
import InboundRegistry from './components/search-adf/searchForm';
//CorrespondenceInquiry
//InboundRegistry
export default {
  name: 'App',
  components: {
    InboundRegistry
  },

  data: () => ({
    
  }),
};
</script>
