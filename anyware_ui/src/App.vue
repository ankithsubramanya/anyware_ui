<template>
  <div id="app">
    <Login ref="loginRef"/>
    <Login ref="signupRef" SignUp/>
      <v-toolbar app class="indigo darken-4 white--text">
        <v-toolbar-title class="display-2 font-weight-black"> Any<font color="orange">Ware</font></v-toolbar-title>
        <v-spacer/> 
        <v-toolbar-items v-if="user.email != undefined" class="hidden-sm-and-down">
        <!-- <router-link to="/">Find Space</router-link> -->
        <v-btn class="white--text" flat @click="route('/')">Warehouses</v-btn>
        <v-btn class="white--text" flat @click="route('/find')">Find Space</v-btn>
        </v-toolbar-items>
        <v-spacer/>
        <v-toolbar-items v-if="user.email === undefined" class="hidden-sm-and-down">
        <v-btn class="white--text" flat @click="$refs.loginRef.dialog = true">Login</v-btn>
        <v-btn class="white--text" flat @click="$refs.signupRef.dialog = true">Sign Up</v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-else class="hidden-sm-and-down">
        <v-btn class="white--text" flat @click="route('warehouse')">My Warehouses</v-btn>
        <v-btn class="white--text" flat @click="route('container')">My Containers</v-btn>
        <v-btn class="white--text" flat @click="route('user')">{{user.name}}</v-btn>
        <!-- <v-btn flat v-ripple="false" >Welcome, !</v-btn> -->
        <v-btn class="white--text" flat @click="$store.dispatch('signOut'); $router.replace('/')">Sign Out</v-btn>
        </v-toolbar-items>
        
        
      </v-toolbar>
      <transition :name="transitionName">
        <router-view/>
      </transition>
    <v-container xs12 app>
    <h3>Developers</h3>
      <ul>
        <li><a href="https://github-dev.cs.illinois.edu/kabrol2" target="_blank" rel="noopener">Karan Abrol</a></li>
        <li><a href="https://github-dev.cs.illinois.edu/ankiths2" target="_blank" rel="noopener">Ankith Subramanya</a></li>
        <li><a href="https://github-dev.cs.illinois.edu/iaa3" target="_blank" rel="noopener">Ivan
            Abregana</a></li>
        <li><a href="https://github-dev.cs.illinois.edu/wjwang2" target="_blank" rel="noopener">Bill Wang</a></li>
      </ul>
    </v-container>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import Login from './components/Login'

export default {
  name: 'app',
  data () {
    return ({
      transitionName: 'slide-right'
    });
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    }
  },
  components: {
    Login
  },
  methods: {
    route(str) {
      this.$router.replace(str)
    }
  },
  watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a { text-decoration: none; color: black}
h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }
</style>
