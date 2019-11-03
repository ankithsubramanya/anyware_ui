<template>
  <div class="Spaces">
    <v-container>
      <v-layout row wrap>
        <!-- <v-flex xs12>
          <v-toolbar flat color="white">
            <v-toolbar-title><h3 class="title my-1">Choose a container to assign</h3></v-toolbar-title>
          </v-toolbar>
        </v-flex> -->
        <v-flex xs12>
          <v-select :items="$store.getters.getContainers" name="container" label="Choose a container to assign..."
            item-text="idcontainer" v-model="container">
          </v-select>
        </v-flex>
        <v-flex xs9>
          <v-text-field v-model="city_filter" label="Enter your city to find spaces near you...">
          </v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn class="blue-grey" @click="onFilter" >Filter</v-btn>
        </v-flex>
        
      </v-layout>
      <v-layout>
        <v-flex>
          <v-data-table :headers=headers :items=spaceData :pagination.sync=page_config
            :rows-per-page-items=page_config.rowsPerPageOptions>
            <template v-slot:items="props">
              <td class="text-xs-left">{{ props.item.idspace }}</td>
              <td class="text-xs-left">{{ props.item.idwarehouse }}</td>
              <td class="text-xs-left">{{props.item.price}}</td>
              <td class="text-xs-left">{{ props.item.dimension_length_inches }} x {{props.item.dimension_width_inches}}
              </td>
              <td>
                <v-btn v-if="props.item.is_available == 1" dark :disabled="container == null" color="orange" @click="onReserve(props.item)">Reserve</v-btn>
                <v-btn v-else  dark color="red" >Reserved</v-btn>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
  // import storageService from '@/services/StorageService';
  /* eslint-disable no-console*/
  export default {
    name: 'MyWarehouses',
    data() {
      return {
        headers: [{
            text: 'id',
            value: 'idspace'
          },
          {
            text: 'Warehouse ID',
            value: 'idwarehouse'
          },
          {
            text: 'Price',
            value: 'price'
          },
          {
            text: 'Size',
            value: 'size'
          },
          {
            text: 'Reserve',
            value: '...'
          }
        ],
        page_config: {
          descending: false,
          page: 1,
          rowsPerPage: -1,
          rowsPerPageOptions: [-1]
        },
        email: "",
        container: null,
        city_filter: null
      };
    },
    computed: {
      spaceData() {
        let res = this.$store.getters.getSpaces
        console.log(`Found ${res.length} spaces in store`)
        res = res.filter((r) => {
          return (r.is_available == 1)
        })
        console.log(`remaining ${res.length}, ${res}.`)
        return res
      }
    },
    methods: {
      onReserve(space) {
        console.log("Hello ", this.container)
        let props = {
          idspace: space.idspace,
          idcontainer: this.container
        }
        console.log("assigned ",props)
        this.$store.dispatch('reserveSpace', props).then(() => {return})
      },
      onOpen() {
        this.$store.dispatch("getSpaces").then(() => {
        console.log("retrieved.")
      })
      },
      onFilter() {
        if (this.city_filter == null) this.onOpen()
        else {
          this.$store.dispatch("getSpacesByCity",this.city_filter).then(() => {
            console.log('filtered.')
          })
        }
      }
    },
    mounted() {
      this.$store.dispatch("getSpaces").then(() => {
        console.log("retrieved.")
      })
    }
    // components: {
    //   reserveSpace
    // }
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