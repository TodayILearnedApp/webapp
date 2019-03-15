<template>
  <div id="app">
    <div class="view-container">
      <HorizontalNav/>
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";

import HorizontalNav from "@/components/HorizontalNav";

@Component({
  components: {
    HorizontalNav
  },
  methods: {
    logout: function() {
      firebase.auth().signOut();
      this.$router.replace("home");
    }
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: "Raleway", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #ffffff;
}

body {
  margin: 0;
}

textarea {
  font-family: "Raleway", sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Roboto Slab", serif;
}

.view-container {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
