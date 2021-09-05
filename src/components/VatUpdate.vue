<template>
  <div class="row" :class="flex2">
    <div class="col">
      <form v-on:submit.prevent>
        <div class="form-group">
          <div class="row">
            <div class="col col-md-6">
              <input
                type="text"
                class="form-control"
                v-model="pctTax"
                placeholder="New PctTax..."
              />
            </div>
            <div class="col col-md-6">
              <input
                type="text"
                class="form-control"
                v-model="tiket"
                placeholder="No Tiket..."
              />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <button
                type="submit"
                class="btn btn-success"
                @click="runUpdateTaxValidation"
              >
                Update Tax
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "vatupdate",
  data() {
    return {
      pctTax: "",
      tiket: "",
    };
  },
  props: ["book", "flex2", "hide2", "resp"],
  methods: {
    runUpdateTax() {
      if (this.pctTax && this.tiket) {
        this.$swal
          .fire({
            title: "Are you sure?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#4EB883",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          })
          .then((result) => {
            if (result.isConfirmed) {
              axios
                .post("http://api.mrmjohn.com/services/api/updateVat", {
                  bookcode: this.book,
                  pctTax: parseFloat(this.pctTax),
                  tiket: this.tiket,
                })
                .then((response) => {
                  console.log(response);

                  this.$toast.success("Success Update PctTax", {
                    type: "success",
                    position: "top-right",
                    duration: 3000,
                    dismissible: true,
                  });

                  axios
                    .get(
                      "https://api2.lippo.homes//api/services/app/PSASSchedule/GetPSASScheduleHeader?bookCode=" +
                        this.book
                    )
                    .then(() => {
                      this.$router.go("/vat");
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log(error);
                });

              
            }
          });
      } else {
        this.$toast.error("PctTax or Tiket harus diiisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
    runUpdateTaxValidation() {
      if (this.pctTax >= 0 && this.pctTax < 10) {
        this.runUpdateTax();
      } else {
        this.$toast.error("Isi pctTax 0 - 10", {
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