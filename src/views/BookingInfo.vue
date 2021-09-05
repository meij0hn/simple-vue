<template>
    <div class="bookinginfo">
        <Navbar />
        <div class="container">
            <h3>Booking Info</h3>
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
                    <div class="form-group">
                        <div class="row">
                            <div class="col col-md-1">
                                <button type="submit" class="btn btn-success" @click="runTask">Submit</button>
                            </div>
                            <div class="col col-md-11">
                                <b-icon class="ml-2" :class="loading" icon="three-dots" animation="cylon" font-scale="2" variant="success" ></b-icon>
                            </div>
                        </div>
                    </div>
                    
                </form>
                </div>
            </div>

            <div class="row mt-3" :class="flex">
                <div class="col">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="submit" class="btn btn-success mr-1 mb-1" @click="runGenerateSchedule">Generate Schedule</button>
                        <button type="submit" class="btn btn-success mr-1 mb-1" @click="runRecalculateBalance">Recalculate Balance</button>
                        <button type="submit" class="btn btn-success mb-1" @click="runRecalculatePenalty">Recalculate Penalty</button>
                    </div>
                </div>
            </div>
            <div class="bs-callout bs-callout-success row mt-1" :class="flex">
                <div class="col col-md-12 mt-1">
                    <h5>
                        <b-icon-handbag-fill style="font-size: 2rem;" />
                        <strong> INFORMATION BOOKING</strong>
                    </h5>
                </div>
                
                <hr class="griin" />
                <div class="col col-md-6 mt-3">
                    <table class="table table-borderless table-sm">
                        <tbody>
                            <tr>
                                <td width="45%">Bookcode</td>
                                <td width="1%">:</td>
                                <td>{{ dataBook.bookCode }}</td>
                            </tr>
                            <tr>
                                <td>Unit</td>
                                <td>:</td>
                                <td>{{ dataBook.unitCode }}-{{ dataBook.unitNo }}</td>
                            </tr>
                            <tr>
                                <td>Cluster Name</td>
                                <td>:</td>
                                <td>{{ dataBook.clusterName }}</td>
                            </tr>
                            <tr>
                                <td>Term</td>
                                <td>:</td>
                                <td>{{ dataBook.termCode }} - {{ dataBook.termNo }}</td>
                            </tr>
                            <tr>
                                <td>Customer</td>
                                <td>:</td>
                                <td>{{ dataBook.psCode }} - {{ dataBook.name }}</td>
                            </tr>
                            <tr>
                                <td>Sales</td>
                                <td>:</td>
                                <td>{{ dataBook.memberID }} - {{ dataBook.memberName }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="col col-md-6 mt-3">
                    <table class="table table-borderless table-sm">
                        <tbody>
                            <tr>
                                <td width="45%">Total Net Amount</td>
                                <td width="1%">:</td>
                                <td>Rp {{ dataPrice.totalNetAmount | currency }}</td>
                            </tr>
                            <tr>
                                <td>Total Vat Amount</td>
                                <td>:</td>
                                <td>Rp {{ dataPrice.totalVATAmount | currency }}</td>
                            </tr>
                            <tr>
                                <td>Selling Price</td>
                                <td>:</td>
                                <td>Rp {{ dataPrice.sellingPrice | currency }}</td>
                            </tr>
                            <tr>
                                <td>Total Schedule</td>
                                <td>:</td>
                                <td>Rp {{ dataPrice.totalSchedule | currency }}</td>
                            </tr>
                            <tr>
                                <td>Total Penalty Schedule</td>
                                <td>:</td>
                                <td>Rp {{ (dataPenalty.totalNetAmt + dataPenalty.totalVatAmt) | currency }}</td>
                            </tr>
                            <tr>
                                <td>Total Penalty Outstanding</td>
                                <td>:</td>
                                <td>Rp {{ (dataPenalty.totalNetOut + dataPenalty.totalVatOut) | currency }}</td>
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
import axios from 'axios';

export default {
    name: "bookinginfo",
    components: {
        Navbar,
    },
    data() {
        return {
            bookcode: "",
            hide: false,
            load: false,
            dataBook: {},
            dataPrice: {},
            dataPenalty: {},
            
        }
    },
    methods: {
        setDataBook(data) {
            this.dataBook = data
        },
        setDataPrice(data) {
            this.dataPrice = data
            this.dataPenalty = data.penalty
        },
        bookingDetail(item) {
            this.load = true
            axios
            .get("https://api2.lippo.homes//api/services/app/PSASMain/GetPSASMain?bookCode=" + item)
            .then((response) => {
                this.hide = true
                this.bookcode = ""
                this.setDataBook(response.data.result.getPSASMainDto)
                this.load = false
            })
            .catch((error) => {
                console.log(error)
                this.load = false
            });
        },
        bookingPrice(item) {
            this.load = true
            axios
            .get("https://api2.lippo.homes//api/services/app/PSASSchedule/GetPSASScheduleHeader?bookCode=" + item)
            .then((response) => {
                this.setDataPrice(response.data.result)
                this.load = false
            })
            .catch((error) => {
                console.log(error)
                this.hide = false
                this.$toast.error(error.response.data.error.message, {
                    type: "error",
                    position: "top-right",
                    duration: 3000,
                    dismissible: true,
                });
                this.load = false
            });
        },
        RecalculateBalance(item) {
            this.load = true
            axios
            .post("https://api.lippo.homes/api/services/app/PSASSchedule/RecalculateBalanceNew", {
                "bookcode": item
            })
            .then((response) => {
                console.log(response)
                this.$toast.success("Success Recalculate Balance", {
                    type: "success",
                    position: "top-right",
                    duration: 3000,
                    dismissible: true,
                });
                this.bookingDetail(this.dataBook.bookCode)
                this.bookingPrice(this.dataBook.bookCode)
                this.load = false
            
            })
            .catch((error) => {
                console.log(error)
                this.load = false
            })
        },
        RecalculatePenalty(item) {
            this.load = true
            axios
            .post("https://api.lippo.homes/api/services/app/PSASPenalty/RecalculatePenaltyNew?bookCode=" + item)
            .then((response) => {
                console.log(response)
                this.$toast.success("Success Recalculate Penalty", {
                    type: "success",
                    position: "top-right",
                    duration: 3000,
                    dismissible: true,
                });
                this.bookingDetail(this.dataBook.bookCode)
                this.bookingPrice(this.dataBook.bookCode)
                this.load = false

            
            })
            .catch((error) => {
                console.log(error)
                this.$toast.error(error.response.data, {
                    type: "error",
                    position: "top-right",
                    duration: 3000,
                    dismissible: true,
                });
                this.load = false
            })
        },
        RegenerateSchedule(item) {
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
                        this.load = true
                        axios
                        .post("https://api.lippo.homes/api/services/app/PSASSchedule/RegenerateSchedule", {
                            "bookcode": item 
                        })
                        .then((response) => {
                            console.log(response)
                            this.$toast.success("Success Regenerate Schedule", {
                                type: "success",
                                position: "top-right",
                                duration: 3000,
                                dismissible: true,
                            });
                            this.bookingDetail(this.dataBook.bookCode)
                            this.bookingPrice(this.dataBook.bookCode)
                            this.load = false
                        
                        })
                        .catch((error) => {
                            console.log(error)
                            this.$toast.error(error.response.data, {
                                type: "error",
                                position: "top-right",
                                duration: 3000,
                                dismissible: true,
                            });
                            this.load = false
                        })
                    }
                })
                        
        },  
        runTask() {
            if(this.bookcode) {
                this.bookingDetail(this.bookcode)
                this.bookingPrice(this.bookcode)
            } else {
                this.$toast.error("Bookcode harus diisi", {
                    type: "error",
                    position: "top-right",
                    duration: 3000,
                    dismissible: true,
                });
            }
        },
        runGenerateSchedule() {
            this.RegenerateSchedule(this.dataBook.bookCode)
        },
        runRecalculateBalance() {
            this.RecalculateBalance(this.dataBook.bookCode)
        },
        runRecalculatePenalty() {
            this.RecalculatePenalty(this.dataBook.bookCode)
        },
    },
    computed: {
    flex: function () {
      return this.hide ? "d-flex" : "d-none";
    },
    loading: function () {
        return this.load ? "d-flex" : "d-none";
    }
  },
}
</script>

<style>

</style>