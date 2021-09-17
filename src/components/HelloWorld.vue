<template>
  <div>
    <button type="submit" class="btn btn-success mr-1 mb-1" @click="allos">
        <b-icon-gear-wide-connected /> Generate JSON
    </button>
    <download-excel :data="json_data" v-if="flex">
      <button type="button" class="btn btn-success" @click="alloss">Download Excel</button>
    </download-excel>
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  name: "HelloWorld",
    data() {
      return {
        json_data: [],
        flex: false,
      };
    },
    methods: {
      allos() {
        axios
        .get("http://localhost:2000/api/allocs")
        .then((response) => {
          this.json_data = response.data.result
          console.log(this.json_data)
          this.flex = true
          })
        .catch((error) =>{
          console.log(error)
          this.flex = false
        } );
      },
    },
    // mounted() {
    //   axios
    //     .get("http://localhost:2000/api/allocs")
    //     .then((response) => this.json_data = response.data.result)
    //     .catch((error) => console.log(error));
    // },

}
</script>

<style>

</style>