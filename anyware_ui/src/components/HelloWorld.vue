<template>
  <div class="hello">
    <v-container>
      <v-layout xs12 class="py-3">
        <v-carousel hide-controls hide-delimiters>
          <v-carousel-item
          v-for="(image, i) in images"
          :key="i"
          :src="image.src"
          />
        </v-carousel>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-data-table :headers=headers :items=allWarehouses :pagination.sync=page_config
            :rows-per-page-items=page_config.rowsPerPageOptions>
            <template v-slot:items="props">
              
              <td class="text-xs-left">{{ props.item.idwarehouse }}</td>
              <td class="text-xs-left">{{ props.item.number_spaces}}</td>
              <td class="text-xs-left">{{ props.item.city }}</td>
              <td class="text-xs-left">{{ props.item.length_feet }} x {{ props.item.width_feet }}</td>

            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>

// import fs from "fs"
// import path from "path"
  /* eslint-disable no-console*/

  // import storageService from '@/services/StorageService';
  export default {
    name: 'HelloWorld',
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
          }
        ],
        page_config: {
          descending: false,
          page: 1,
          rowsPerPage: -1,
          rowsPerPageOptions: [-1]
        },
        city: "",
        email: "",
        images: [
          { src: require("./../assets/hworld_1.jpg")},
          { src: require("./../assets/hworld_2.png")},
          { src: require("./../assets/hworld_3.jpg")},
        ]
      };
    },
    computed: {
      allWarehouses () {
        return this.$store.getters.getAllWarehouses
      }
    },
    mounted () {
      this.$store.dispatch("fetchAllWarehouses").then(() => {
        return
      })
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