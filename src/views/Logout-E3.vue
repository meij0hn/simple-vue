<template>
  <div class="logout-e3">
    <Navbar />
    <div class="container">
      <h3>Force Logout E3</h3>
      <hr />
      <div class="row mt-2">
        <div class="col">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                v-model="username"
                placeholder="Username..."
              />
            </div>

            <button type="submit" class="btn btn-success" @click="runTask">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "logoute3",
  components: {
    Navbar,
  },
  data() {
    return {
      username: null,
      message: null,
    };
  },
  methods: {
    runTask() {
      if (this.username) {
        axios
          .post(
            "https://api.lippo.homes/api/TokenAuth/LogoutMember?memberCode=" +
              this.username
          )
          .then((response) => {
            this.message = response.data.result.message;
            if (this.message == "http://login.lippo.homes/") {
              this.$toast.success("Berhasil Logout", {
                type: "success",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
              this.username = null;
            } else {
              this.$toast.error(this.message, {
                type: "error",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
            }
          })
          .catch((error) => console.log(error));
      } else {
        this.$toast.error("Username harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
};
</script>


<style>
</style>