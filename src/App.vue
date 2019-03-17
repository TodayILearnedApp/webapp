<template>
  <div id="app">
    <div class="view-container">
      <HorizontalNav/>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";
import "swiper/dist/css/swiper.css";

import HorizontalNav from "@/components/HorizontalNav";

@Component({
  components: {
    HorizontalNav
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

a {
  text-decoration: none;
  &:visited {
    color: #2c3e50;
  }
}

body {
  margin: 0 1rem;
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

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
