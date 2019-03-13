<template>
  <div class="container">
    <div class="logo">What I learned today ?</div>
    <div class="nav">
      <div class="link">
        <router-link to="/">Home</router-link>
      </div>
      <div class="link">
        <router-link to="/about">About</router-link>
      </div>
      <div v-if="!connected" @click="socialLogin" class="link outlined">Sign In</div>
      <div v-if="connected" class="link outlined">
        <router-link to="/user">{{displayName}}</router-link>
      </div>
      <div v-if="connected" class="link" @click="logout">Logout</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import firebase from "firebase";

@Component({
  components: {},
  data() {
    const user = firebase.auth().currentUser;

    return {
      displayName: user ? user.displayName : "Account",
      connected: !!user
    };
  },
  methods: {
    logout: function() {
      firebase.auth().signOut();
      this.$router.replace("home");
    },
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          console.log("user", result.user);
          this.$router.replace("user");
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    }
  }
})
export default class VerticalKnowledge extends Vue {}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: "Roboto Slab", serif;
  font-weight: bold;

  .logo {
    display: flex;
    align-content: center;
    align-items: center;
    margin: 16px 16px;
    font-family: "Roboto Slab", serif;
    font-weight: bold;
  }
  .nav {
    display: flex;
    flex-direction: row;
  }

  .link {
    margin: 16px 16px;
    a {
      color: inherit;
      text-decoration: none;
    }
    padding: 8px;
  }

  .outlined {
    border-radius: 5px;
    border: 1px solid #000;
  }
}
</style>
