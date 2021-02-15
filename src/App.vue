<template>
  
     <v-app>
   <v-main>
     <Reports />
    </v-main>
    
     
     
 
    
    <!-- <NavigationTop /> -->
 <!-- <HelloWorld /> -->
    <v-content>
      <router-view></router-view>
    </v-content>

    
  </v-app>
</template>

<script>
// import Test from './components/test'
// import Search from './components/search-adf/searchForm'
//  import NavigationTop from './components/navigation-adf/navigation-top';
// import HelloWorld from './components/HelloWorld';
import Reports from './components/reports-adf/reports'


export default {
  name: 'App',
  components: {
    // HelloWorld,
    // NavigationTop
    // Test
    // Search,
    Reports,
  },

  data: () => ({
    //
    
  }),
};
</script>
