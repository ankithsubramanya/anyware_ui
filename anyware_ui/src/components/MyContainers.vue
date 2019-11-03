<template>
  <div class="Containers">
    <edit-container ref="containerRef"/>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-toolbar flat color="white">
            <v-toolbar-title><h3 class="title my-1">{{$store.getters.getUser.name}}'s Containers</h3></v-toolbar-title>
            <v-spacer/>
            <v-btn dark color="blue-grey" @click="onEdit(-1)">Create</v-btn>
          </v-toolbar>
          <v-data-table :headers=headers :items=containerData :pagination.sync=page_config
            :rows-per-page-items=page_config.rowsPerPageOptions>
            <template v-slot:items="props">
              <td class="text-xs-left">{{ props.item.idcontainer }}</td>
              <td class="text-xs-left">
                <v-chip v-if="props.item.idspace != null" label outline color="red">Reserved</v-chip>
                 <v-chip v-else label outline color="free">Free</v-chip>
              </td>
              <td class="text-xs-left">{{ props.item.dimension_length_inches }} x {{props.item.dimension_width_inches}}
                x {{props.item.dimension_height_inches}}</td>
              <td class="text-xs-left">{{ props.item.weight_pounds }}</td>
              <td>
                <v-btn dark color="blue-grey" @click="onEdit(props.item)">Edit</v-btn>
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
  import EditContainer from './EditContainer'
  export default {
    name: 'MyWarehouses',
    data() {
      return {
        headers: [
          {
            text: 'id',
            value: 'idcontainer'
          },
          {
            text: 'Reserved',
            value: 'idspace'
          },
          {
            text: 'Size',
            value: 'size'
          },
          {
            text: 'Weight',
            value: 'weight_pounds'
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
      containerData() {
        return this.$store.getters.getContainers
      }
    },
    methods: {
      pushButton() {
        console.log(this.spaceData)
      },
      onDelete(item) {
        console.log("Tried Deleting ", item.idcontainer)
        this.$store.dispatch("deleteContainer", item.idcontainer)
      },
      onEdit(container) {
        this.$refs.containerRef.handleOpen(container)
      }
    },
    mounted() {
      this.$store.dispatch("fetchContainers").then(() => {
        console.log("retrieved.")
      })
    },
    components: {
      EditContainer
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