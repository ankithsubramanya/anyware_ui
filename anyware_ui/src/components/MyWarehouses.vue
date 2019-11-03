<template>
  <div class="warehouses">
    <edit-warehouse ref="warehouseRef"/>
    <warehouse-metrics ref="metricsRef"/>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-toolbar flat color="white">
            <v-toolbar-title><h3 class="title my-1">{{$store.getters.getUser.name}}'s Warehouses</h3></v-toolbar-title>
            <v-spacer/>
            <v-btn dark color="blue-grey" @click="onEdit(-1)">Create</v-btn>
          </v-toolbar>
          <v-data-table :headers=headers :items=warehouseData :pagination.sync=page_config
            :rows-per-page-items=page_config.rowsPerPageOptions>
            <template v-slot:items="props">
              <td class="text-xs-left">{{ props.item.idwarehouse }}</td>
              <td class="text-xs-left">{{ props.item.number_spaces}}</td>
              <td class="text-xs-left">{{ props.item.city }}</td>
              <td class="text-xs-left">{{ props.item.length_feet }} x {{ props.item.width_feet }}</td>
              <td>
                <v-btn dark color="blue-grey" @click="$refs.metricsRef.handleOpen(props.item)">Metrics</v-btn>
              </td>
              <td>
                <v-btn dark color="orange" @click="onEdit(props.item)">Edit</v-btn>
              </td>
              <td>
                <v-btn dark color="red" @click="onDelete(props.item)">Delete</v-btn>
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
  import EditWarehouse from './EditWarehouse'
  import WarehouseMetrics from './WarehouseMetrics'
  export default {
    name: 'MyWarehouses',
    data() {
      return {
        headers: [
          {
            text: 'id',
            value: 'idwarehouse'
          },
          {
            text: 'Number of Spaces',
            value: 'number_spaces'
          },
          {
            text: 'City',
            value: 'city'
          },
          {
            text: 'Dimensions (length x width)',
            value: 'dimensions'
          },
          {
            text: 'Metrics',
            value: '...'
          },
          {
            text: 'Edit',
            value: '...'
          },
          {
            text: 'Delete',
            value: '...'
          },
        ],
        page_config: {
          descending: false,
          page: 1,
          rowsPerPage: -1,
          rowsPerPageOptions: [-1]
        },
        email: ""
      };
    },
    computed: {
      warehouseData() {
        return this.$store.getters.getWarehouses
      }
    },
    methods: {
      pushButton() {
        console.log(this.spaceData)
      },
      onDelete(item) {
        console.log("Tried Deleting ", item.idwarehouse)
        this.$store.dispatch("deleteWarehouse", item.idwarehouse)
      },
      onEdit(warehouse) {
        this.$refs.warehouseRef.handleOpen(warehouse)
      }
    },
    mounted() {
      this.$store.dispatch("fetchWarehouses").then(() => {
        console.log("retrieved.")
      })
    },
    components: {
      EditWarehouse,
      WarehouseMetrics
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