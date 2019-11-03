<template>
  <!-- <v-layout row justify-center> -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <!-- <template v-slot:activator="{ on }">
        <v-btn flat @click="handleOpen">{{title}}</v-btn>
      </template> -->
      <v-card>
        <v-card-title>
          <span class="headline">{{title}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout v-if="SignUp" row wrap>
              <v-flex xs5> <v-text-field label="Name" v-model="user.name" @change="changed= true"/> </v-flex>
              <v-spacer/>
              <v-flex xs5> <v-text-field label="Email" v-model="user.email" /> </v-flex>
              <!-- <v-spacer/> -->
              <v-flex xs5> <v-text-field label="Phone Number" v-model="user.telephone_number" /> </v-flex>
              <v-spacer/>
              <v-flex xs5> <v-text-field label="City" v-model="user.city" /> </v-flex>
            </v-layout>
            <v-layout v-else row wrap>
              <v-flex xs12> <v-text-field label="Email" v-model="user.email" /> </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo darken-3" flat @click="dialog = false">Close</v-btn>
          <v-btn color="orange" flat @click="handleSubmit">{{title}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!-- </v-layout> -->
</template>


<script>
/*eslint-disable no-console*/

  export default {
    name: 'Login',
    props: {
      SignUp: {type: Boolean}
    },
    data() {
      return {
        title: 'Login',
        user: {},
        defaultUser: {
          email: 'kevin.small@anyware.com',
          telephone_number: '9999999999',
          city: 'champaign',
          name: 'Kevin Small',
          iduser: 5
        },
        dialog:false
      };
    },
    created () {
      if (this.SignUp) {
        this.title = 'Sign Up'
      }
    },
    methods: {
      handleSubmit() {
        console.log("vue user: ", this.user)
        let self = this
        if (this.SignUp) {
          this.$store.dispatch("createUser",this.user).then(() => {self.dialog = false;self.$router.replace("user"); })
        } else {
          this.$store.dispatch("validateUser",this.user.email).then(() => { self.dialog = false; self.$router.replace("user");})
        }
      },
      handleOpen() { this.dialog = true}
    }
  }
</script>