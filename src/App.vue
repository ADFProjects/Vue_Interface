<template>
  <v-app>
  
    <v-main>
      <inbound-registry/>
    </v-main>
  </v-app>
</template>

<script>
import InboundRegistry from './views/InboundRegistry';
export default {
  name: 'App',
  components: {
    InboundRegistry
  },

  data: () => ({
    
  }),
};
</script>
