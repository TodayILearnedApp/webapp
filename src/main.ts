import Vue from 'vue';

import firebase from 'firebase';

import App from './App.vue';
import router from './router';


Vue.config.productionTip = false;

let app = '';

var config = {
  apiKey: "AIzaSyCIG86xU4-GEJnJ_kq0QV0VNyj3WI88pMA",
  authDomain: "todayilearned-b0269.firebaseapp.com",
  databaseURL: "https://todayilearned-b0269.firebaseio.com",
  projectId: "todayilearned-b0269",
  storageBucket: "todayilearned-b0269.appspot.com",
  messagingSenderId: "804657633281"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      render: (h) => h(App),
    }).$mount('#app');
  }
})
