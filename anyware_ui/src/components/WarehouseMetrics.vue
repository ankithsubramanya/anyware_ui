<template>
  <!-- <v-layout row justify-center> -->
    <v-dialog v-model="dialog" scrollable max-width="600px">
      <v-card>
        <v-card-title>
          <span class="title">Warehouse Metrics</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <viz :warehouse="warehouse"/>
            <v-layout wrap>
              <v-flex xs12><canvas id="Warehouse_viz"/></v-flex>
            </v-layout>
            <v-divider/>
            <v-layout wrap>
              <v-flex xs12 class="py-4"><span class="title">Advanced Metrics</span></v-flex>
              <v-flex xs12 wrap><span>Enter more details about your warehouse to get an estimate of your recommended monthly revenue.</span></v-flex>
            <v-flex xs5>
                <v-text-field
                  type="Number"
                  label="Year Built"
                  v-model="advanced[1]"
                  required
                ></v-text-field>
              </v-flex> <v-spacer/>
              <v-flex xs5>
                <v-text-field
                  type="Number"
                  label="Year Sold"
                  v-model="advanced[2]"
                  required
                ></v-text-field>
              </v-flex> <v-spacer/>
              <v-flex xs5>
              <v-switch
                v-model="advanced[3]"
                label="Street pavement access"
              ></v-switch>
              </v-flex> <v-spacer/>
              <v-flex xs5>
                <v-switch
                  v-model="advanced[4]"
                  label="Alley Pavement access"
                ></v-switch>
              </v-flex>
                <v-flex xs5>
                  <v-btn color="red" dark @click="handleCompute">Compute</v-btn>
                </v-flex>
                <v-flex xs5>
                  <v-btn color="primary" dark readonly>{{soln}}</v-btn>
                </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 
</template>


<script>
  /* eslint-disable no-console*/
import Viz from './Viz'
  export default {
    name: 'WarehouseMetrics',
    components: {
      Viz
    },
    data: () => ({
      dialog: false,
      warehouse: {
        city: '',
        number_spaces: 0,
        idwarehouse: -1,
        length_feet: 0,
        width_feet: 0
        },
      advanced: [0,0,0,false,false],
      loading: false,
      done: false,
      solution: 0
    }),
    computed: {
      title() {
        return `${this.openPrompt} Warehouse`
      },
      soln() {
        if (!this.loading) return 'solution'
        else if (!this.done) return 'loading...'
        else return '$' + Math.round(this.solution * 10, 10)
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
        }
        console.log("Created warehouse metrics for ",this.warehouse.idwarehouse)
        this.dialog=true
      },
      handleCompute() {
        this.loading = true
        this.advanced[3] = this.advanced[3] ? 1 : 0
        this.advanced[4] = this.advanced[4] ? 1 : 0
        this.advanced[0] = this.warehouse.length_feet * this.warehouse.width_feet
        this.advanced[1] = parseInt(this.advanced[1])
        this.advanced[2] = parseInt(this.advanced[2])
        let self = this
        console.log("fitting data ", this.advanced)
        this.$store.dispatch("fitModel", this.advanced).then((res) => {
          console.log("returned ", res)
          self.solution = res
          self.done = true
        })
        
      }
    }
  }
</script>