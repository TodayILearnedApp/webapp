<template>
  <div class="container">
    <router-link to="/">
      <div class="logo">
        <div class="icon logo-illustration"/>
        <div>What I learned today ?</div>
      </div>
    </router-link>
    <div class="nav">
      <router-link to="/">
        <div class="link">
          <div class="icon home-illustration"/>
          <div>Home</div>
        </div>
      </router-link>
      <div v-if="!connected" @click="socialLogin" class="link cta">Sign In</div>
      <router-link to="/user">
        <div v-if="connected" class="link cta">
          <div class="icon user-illustration"/>
          <div>{{displayName}}</div>
        </div>
      </router-link>
      <router-link to="/settings">
        <div v-if="connected" class="link">
          <div class="icon settings-illustration"/>
          <div>Settings</div>
        </div>
      </router-link>
      <div v-if="connected" class="link" @click="logout">
        <div class="icon logout-illustration"/>
        <div>Logout</div>
      </div>
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
      this.$router.replace("/");
    },
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
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

  a {
    color: inherit;
    text-decoration: none;
  }

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
    padding: 8px;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    align-items: center;

    &:hover {
      .icon {
        transform: rotate(-5deg);
      }
    }
  }

  .cta {
    border: none;
    background-image: linear-gradient(
      to right,
      #f6d365 0%,
      #fda085 51%,
      #f6d365 100%
    );
    border-radius: 10px;
    flex: 1 1 auto;
    text-align: center;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    font-family: "Roboto Slab", serif;
    font-weight: bold;

    &:hover {
      background-position: right center; /* change the direction of the change here */
      transition: 0.5s;
      cursor: pointer;
    }
  }
}

.icon {
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;

  background-repeat: no-repeat;
  background-size: contain;

  transition: transform 0.2s ease-in-out;
}
.logo-illustration {
  background-image: url(../assets/logo.svg);
}
.logout-illustration {
  background-image: url(../assets/logout.svg);
}
.settings-illustration {
  background-image: url(../assets/settings.svg);
}
.home-illustration {
  background-image: url(../assets/home.svg);
}
.user-illustration {
  background-image: url(../assets/user.svg);
}
</style>
