<template>
  <!-- <v-layout row justify-center> -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="title">{{title}}</span>
          <v-spacer/>
          <v-spacer v-if="edit">{{container.idcontainer}}</v-spacer>
          <v-spacer/>
          <v-btn flat outline @click="handleRelease" v-if="container.idspace != null" color="red">Release</v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout wrap>
              <v-flex xs5>
                 <!--button.  -->
                 Status:
                 <v-chip v-if="container.idspace != null" label outline color="red">Reserved</v-chip>
                 <v-chip v-else label outline color="free">free</v-chip>
              </v-flex><v-spacer/>
              <v-flex xs5>
                <v-text-field
                  type="Number"
                  label="Weight(lb)"
                  v-model="container.weight_pounds"
                  required
                ></v-text-field> 
              </v-flex><v-spacer/>
              <v-flex xs3>
                <v-text-field
                  type="Number"
                  label="Height(in)"
                  v-model="container.dimension_height_inches"
                  required
                ></v-text-field>
              </v-flex> <v-spacer/>
              <v-flex xs3>
                <v-text-field
                  type="Number"
                  label="Width(in)"
                  v-model="container.dimension_width_inches"
                  required
                ></v-text-field>
              </v-flex> <v-spacer/>
              <v-flex xs3>
                <v-text-field
                  type="Number"
                  label="Length(in)"
                  v-model="container.dimension_length_inches"
                  required
                ></v-text-field> 
              </v-flex><v-spacer/>
              
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="blue-gray" flat @click="dialog = false">Close</v-btn>
          <v-btn color="orange" flat @click="handleSubmit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 
</template>


<script>
  /* eslint-disable no-console*/

  export default {
    name: 'EditContainer',
    data: () => ({
      dialog: false,
      openPrompt: 'Create',
      edit: false,
      container: {
      },
      defaultContainer: {
        dimension_width_inches: 0,
        dimension_length_inches: 0,
        dimension_height_inches: 0,
        weight_pounds: 0,
        idspace: null,
        idcontainer: -1
      },

    }),
    computed: {
      title() {
        return `${this.openPrompt} Container`
      }
    },
    created () {
        this.openPrompt  = this.unit_id === undefined ? 'Create' : 'Edit'
    },
    methods: {
      handleRelease() {
        console.log("unreserving ", this.container)
        let props = {
          idspace: this.container.idspace,
          idcontainer: this.container.idcontainer
        }
        this.$store.dispatch("unreserveSpace", props).then(() => {this.handleSubmit()})
      },
      handleOpen(container) {
        if (container != -1) {
          console.log("Found container ", container == -1)
          this.container = container
          this.openPrompt = 'Edit'
          this.edit = true
        } else {
          this.edit = false
          this.container = this.defaultContainer
          this.openPrompt = "Create"
        }
        console.log("Created Edit container for ",this.container.idcontainer)
        this.dialog=true
      },
      handleSubmit(){
        if (this.edit) {
          this.$store.dispatch("updateContainer", this.container).then(() => {
            this.dialog=false
          })
        } else {
          this.$store.dispatch("createContainer", this.container).then(() => {
            this.dialog=false
          })
        }
      }
    }
  }
</script>