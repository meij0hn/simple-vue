<template>
  <div class="Vat">
    <Navbar />
    <div class="container">
      <h3>VAT</h3>
      <hr />
      <div class="row mt-2">
        <div class="col">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                v-model="bookcode"
                placeholder="Bookcode..."
              />
            </div>
            <div class="row">
              <div class="col col-md-1">
                <button type="submit" class="btn btn-success" @click="runTask">
                  Submit
                </button>
              </div>
              <div class="col col-md-11">
                <b-icon
                  icon="three-dots"
                  animation="cylon"
                  font-scale="3"
                  variant="success"
                  :class="load"
                />
              </div>
            </div>

            <vatdetail 
                :resp="resp" 
                :hide="hide" 
                :flex="flex" 
                :book="book" 
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import vatdetail from "@/components/VatDetail.vue";
import axios from "axios";

export default {
  name: "Vat",
  components: {
    Navbar,
    vatdetail,
  },
  data() {
    return {
      bookcode: null,
      book: null,
      resp: [],
      loading: false,
      hide: false,
    };
  },
  methods: {
    setResp(data) {
      this.resp = data;
    },
    runTask() {
      this.loading = true;
      if (this.bookcode) {
        axios
          .get(
            "https://api2.lippo.homes//api/services/app/PSASSchedule/GetPSASScheduleHeader?bookCode=" +
              this.bookcode
          )
          .then((response) => {
            this.setResp(response.data.result);
            this.book = this.bookcode;
            this.bookcode = null;
            this.loading = false;
            this.hide = true;
          })
          .catch((error) => {
            this.loading = false;
            this.hide = false
            console.log(error);
            
            this.$toast.error(error.response.data.error.message, {
                type: "error",
                position: "top-right",
                duration: 3000,
                dismissible: true,
            });
          });
      } else {
        this.loading = false;
        this.hide = false

        this.$toast.error("Bookcode harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  computed: {
    load: function () {
      return this.loading ? "d-flex" : "d-none";
    },
    flex: function () {
      return this.hide ? "d-flex" : "d-none";
    },
  },
};
</script>

<style>
</style>