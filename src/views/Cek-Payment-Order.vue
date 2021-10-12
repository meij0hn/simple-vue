<template>
  <div class="cek-payment-order">
    <Navbar />
    <div class="container">
      <h3>Release Unit from Midtrans</h3>
      <hr />
      <div class="row mt-2">
        <div class="col">
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                v-model="ordercode"
                placeholder="Ordercode..."
              />
            </div>

            <button type="submit" class="btn btn-success" @click="runTask">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div class="row mt-5" :class="flex">
        <div class="col">
          <table class="table table-sm">
            <tbody>
              <tr>
                <td colspan="3"><strong>INFORMATION PAYMENT ORDER</strong></td>
              </tr>
              <tr>
                <td width="18%">Ordercode</td>
                <td width="1%">:</td>
                <td>{{ dataResult.order_id }}</td>
              </tr>
              <tr>
                <td>Amount</td>
                <td>:</td>
                <td>Rp {{ dataResult.gross_amount | currency }}</td>
              </tr>
              <tr>
                <td>Payment Type</td>
                <td>:</td>
                <td>{{ payment_type }}</td>
              </tr>
              <tr>
                <td>Transaction Time</td>
                <td>:</td>
                <td>{{ dataResult.transaction_time | formatDate }}</td>
              </tr>
              <tr>
                <td>Transaction Status</td>
                <td>:</td>
                <td>{{ dataResult.transaction_status }}</td>
              </tr>
              <tr>
                <td>Permata VA Number</td>
                <td>:</td>
                <td>{{ dataResult.permata_va_number }}</td>
              </tr>
              <tr>
                <td>VA Number</td>
                <td>:</td>
                <td>{{ bank }} - {{ va.va_number }}</td>
              </tr>
              <tr>
                <td :class="flex2">
                  <button type="submit" class="btn btn-info" @click="runExpire">
                    Expire Midtrans
                  </button>
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "cekpaymentorder",
  components: {
    Navbar,
  },
  data() {
    return {
      ordercode: null,
      order: null,
      dataResult: "",
      va: "",
      hide: false,
      hide2: false,
      bank: "",
      payment_type: "",
    };
  },
  methods: {
    runTask() {
      if (this.ordercode) {
        axios
          .post(
            "https://api.lippo.homes/api/services/app/PaymentOB/CheckPaymentStatus?orderCode=" +
              this.ordercode
          )
          .then((response) => {
            this.dataResult = response.data.result;
            if (this.dataResult.payment_type) {
              this.payment_type = this.dataResult.payment_type
                .replace("_", " ")
                .toUpperCase();
            } else {
              this.payment_type = "";
            }

            if (response.data.result.va_numbers) {
              this.va = response.data.result.va_numbers[0];
              this.bank = this.va.bank.toUpperCase();
            } else {
              this.va = "";
            }

            if (this.dataResult.status_code == "404") {
              this.hide = false;
              this.$toast.error(this.dataResult.status_message, {
                type: "error",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
            } else {
              this.hide = true;
              this.order = this.ordercode;
              this.ordercode = null;
              if (this.dataResult.transaction_status == "pending") {
                this.hide2 = true;
              } else {
                this.hide2 = false;
              }
            }
          })
          .catch((error) => console.log(error));
      } else {
        this.$toast.error("Ordercode harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
    runExpire() {
      this.$swal
        .fire({
          title: "Are you sure?",
          // text: "You won't be able to revert this!",
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
              .post(
                "http://api.mrmjohn.com/john/api/midtrans/expire?ordercode=" +
                  this.order
              )
              .then(() => {
                // this.$toast.success("Success Expire Ordercode", {
                //   type: "success",
                //   position: "top-right",
                //   duration: 3000,
                //   dismissible: true,
                // });

                this.$swal.fire(
                  'Expired!',
                  'Your ordercode has been expired.',
                  'success'
                )

                axios
                  .post(
                    "https://api.lippo.homes/api/services/app/PaymentOB/CheckPaymentStatus?orderCode=" +
                      this.order
                  )
                  .then((response) => {
                    this.dataResult = response.data.result;
                    this.hide = true;
                    this.order = null;
                    if (this.dataResult.transaction_status == "pending") {
                      this.hide2 = true;
                    } else {
                      this.hide2 = false;
                    }
                  })
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          }
        });
    },
  },
  computed: {
    flex: function () {
      return this.hide ? "d-flex" : "d-none";
    },
    flex2: function () {
      return this.hide2 ? "d-flex" : "d-none";
    },
  },
};
</script>

<style>
</style>