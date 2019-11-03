<template>
  <div class="user-me">
    <v-container>
      <v-layout row >
        <v-flex xs12 ><h2 class="display-1 my-2">Welcome, {{user.name}}!</h2></v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs5> <v-text-field label="Name" v-model="user.name" @change="changed= true"/> </v-flex>
        <v-spacer/>
        <v-flex xs5> <v-text-field label="Email" readonly v-model="user.email" /> </v-flex>
        <v-spacer/>
        <v-flex xs5> <v-text-field label="Phone Number" v-model="user.telephone_number" /> </v-flex>
        <v-spacer/>
        <v-flex xs5> <v-text-field label="City" v-model="user.city" /> </v-flex>
        <v-spacer/>
        <v-flex xs12> <v-btn color='orange' @click="onSaveChanges">Save Changes</v-btn> </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <!-- Hello User! -->
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
/*eslint-disable no-console*/

  export default {
    name: 'User',
    data() {
      return {
        // user: {},
        defaultUser: {
          email: 'kevin.small@anyware.com',
          telephone_number: '9999999999',
          city: 'champaign',
          name: 'Kevin Small'
        }
      };
    },
    computed: {
      user () {
        let u = this.$store.getters.getUser
        if (u.email === undefined) return this.defaultUser
        else return u
      }
    },
    methods: {
      pushButton() {
        console.log(this.spaceData)
      },
      reserveSpace(space) {
        console.log("Trying to unreserve ", space.unit_id)
      },
      onSaveChanges() {
        this.$store.dispatch("updateUser", this.user).then(() => {
          // this.setUser()
          this.$forceUpdate()
        })
      },
      fieldChange() {
        this.changed = true
        console.log("Changed")
      },
      setUser() {
        this.user = this.$store.getters.getUser
        if (this.user.email == undefined) this.user = this.defaultUser
        console.log("Got ", this.user)
      }
    },
    mounted() {
      // this.setUser()
      console.log("found ", this.$store.getters.getUser)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

  a {
    color: #42b983;
  }
</style>