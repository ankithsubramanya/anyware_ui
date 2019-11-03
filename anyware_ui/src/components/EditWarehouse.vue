<template>
  <!-- <v-layout row justify-center> -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="title">{{title}}</span>
          <v-spacer v-if="edit">{{warehouse.idwarehouse}}</v-spacer>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-layout wrap>
              <v-flex xs8>
                <v-text-field
                  type="Number"
                  label="Number of Spaces"
                  readonly
                  v-model="warehouse.number_spaces"
                  required
                ></v-text-field> 
              </v-flex><v-spacer/>
              <v-flex xs8>
                <v-text-field
                  label="City"
                  v-model="warehouse.city"
                  required
                ></v-text-field>
              </v-flex> <v-spacer/>
              <v-flex xs5>
                <v-text-field
                  type="Number"
                  label="Length (feet)"
                  v-model="warehouse.length_feet"
                  required
                ></v-text-field>
              </v-flex> <v-spacer/>
              <v-flex xs5>
                <v-text-field
                  type="Number"
                  label="Width(feet)"
                  v-model="warehouse.width_feet"
                  required
                ></v-text-field>
              </v-flex> <v-spacer/>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="indigo darken-3" flat @click="dialog = false">Close</v-btn>
          <v-btn color="orange" flat @click="handleSubmit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 
</template>


<script>
  /* eslint-disable no-console*/

  export default {
    name: 'EditWarehouse',
    data: () => ({
      dialog: false,
      openPrompt: 'Create',
      edit: false,
      warehouse: {
        city: '',
        number_spaces: 0,
        idwarehouse: -1,
        length_feet: 0,
        width_feet: 0
        }
    }),
    computed: {
      title() {
        return `${this.openPrompt} Warehouse`
      }
    },
    created () {
        this.openPrompt  = this.unit_id === undefined ? 'Create' : 'Edit'
    },
    methods: {
      handleOpen(warehouse) {
        if (warehouse != -1) {
          console.log("Found warehouse ", warehouse == -1)
          this.warehouse = warehouse
          this.openPrompt = 'Edit'
          this.edit = true
        }
        console.log("Created Edit warehouse for ",this.warehouse.idwarehouse)
        this.dialog=true
      },
      handleSubmit(){
        if (this.edit) {
          this.$store.dispatch("updateWarehouse", this.warehouse).then(() => {
            this.dialog=false
          })
        } else {
          this.$store.dispatch("createWarehouse", this.warehouse).then(() => {
            this.dialog=false
          })
        }
      }
    }
  }
</script>