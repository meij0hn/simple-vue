<template>
    <div class="cancel">
        <Navbar />
        <div class="container">
            <h3>Cancel Info</h3>
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
                                autocomplete
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
            <div class="bs-callout bs-callout-success row mt-1" :class="flex">
                <div class="col col-md-10 mt-1">
                    <h5>
                        <b-icon-bag-x-fill style="font-size: 2rem;" />
                        <strong> INFORMATION BOOKING CANCEL</strong
                    ></h5>
                    <hr class="griin" />
                    <table class="table table-sm table-borderless">
                        <tbody>
                            <tr>
                                <td width="45%">Bookcode</td>
                                <td width="1%">:</td>
                                <td>{{ dataCancel.bookCode }}</td>
                            </tr>
                            <tr>
                                <td width="45%">Unit</td>
                                <td width="1%">:</td>
                                <td>{{ dataCancel.unitCode }}-{{ dataCancel.unitNo }}</td>
                            </tr>
                            <tr>
                                <td width="45%">Customer</td>
                                <td width="1%">:</td>
                                <td>{{ dataCancel.psCode }} - {{ dataCancel.customerName }}</td>
                            </tr>
                            <tr>
                                <td width="45%">Book Date</td>
                                <td width="1%">:</td>
                                <td>{{ dataCancel2.bookdate | formatDate }}</td>
                            </tr>
                            <tr>
                                <td width="45%">Cancel Date</td>
                                <td width="1%">:</td>
                                <td>{{ dataCancel2.cancelDate | formatDate }}</td>
                            </tr>
                            <tr>
                                <td width="45%">Remarks Cancel</td>
                                <td width="1%">:</td>
                                <td>{{ dataCancel2.remarks }}</td>
                            </tr>
                            <tr>
                                <td width="45%">Unit Status Code Now</td>
                                <td width="1%">:</td>
                                <td>{{ dataCancel2.unitStatusCode }}</td>
                            </tr>
                            <tr>
                                <td width="45%">Bookcode For Unit Now</td>
                                <td width="1%">:</td>
                                <td>{{ dataCancel2.bookcodeExistsNotCancel }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="col col-md-2" align="right" v-if="dataCancel2.bookcodeExistsNotCancel == null || dataCancel2.unitStatusCode != 'S'">
                    <button type="submit" class="btn btn-success" @click="openRollback"><b-icon-arrow-counterclockwise /> Rollback</button>
                </div>

            </div>

            <div class="bs-callout bs-callout-success row mt-1" :class="flexRollback">
                <div class="col mt-1">
                    <h5>
                        <b-icon-bag-x-fill style="font-size: 2rem;" />
                        <strong> ROLLBACK BOOKING CANCEL</strong>
                    </h5>
                    <hr class="griin" />
                    <form class="mt-4" v-on:submit.prevent>
                        <div class="form-group">
                            <label>
                                {{ book }}
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                v-model="tiket"
                                placeholder="No Tiket..."
                            />
                        </div>

                        <button type="submit" class="btn btn-success" @click="runRollback"><b-icon-arrow-counterclockwise /> Rollback</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import axios from 'axios'

export default {
    name: "cancel",
    components: {
        Navbar,
    },
    data() {
        return {
            load: false,
            dataCancel: {},
            dataCancel2: {},
            hide: false,
            hideRollback: false,
            bookcode: "",
            book: "",
            tiket: "",
            dataError: ""
        }
    },
    methods: {
        setDataCancel(data) {
            this.dataCancel = data
        },
        setDataCancel2(data) {
            this.dataCancel2 = data
        },
        getCancel(item) {
            this.load = true
            axios.all([
                axios.get("https://api2.lippo.homes//api/services/app/PSASCancelUnit/GetDataCancelUnit?bookCode=" + item),
                axios.get("http://api.mrmjohn.com/services/api/cancel?bookcode=" + item)
            ])
            .then(axios.spread((obj1, obj2) => {
                this.load = false
                this.hide = true
                this.hideRollback = false
                this.bookcode = ""
                this.setDataCancel(obj1.data.result)
                this.setDataCancel2(obj2.data.result[0])
            }))
            .catch((error) => {
                console.log(error)
                this.load = false

                if(error.response.data.error.message == null) {
                    this.dataError = error.response.data.error
                } else {
                    this.dataError = error.response.data.error.message
                }

                this.$toast.error(this.dataError, {
                    type: "error",
                    position: "top-right",
                    duration: 3000,
                    dismissible: true,
                });
            });
        },
        rollback(item, item2) {
            this.load = true
            axios
            .post("http://api.mrmjohn.com/services/api/RollbackCancel", {
                "bookcode": item,
                "tiket": item2,
            })
            .then((response) => {
                console.log(response)
                this.getCancel(this.book)
                this.book = ""
                this.tiket = ""
                this.bookcode = ""
                this.load = false
                this.hideRollback = false
                this.hide = true
            })
            .catch((error) => {
                console.log(error)
                this.load = false
                this.$toast.error(error.response.data.result, {
                    type: "error",
                    position: "top-right",
                    duration: 3000,
                    dismissible: true,
                });
            })
        },
        runTask(){
            if(this.bookcode) {
                this.getCancel(this.bookcode)
            } else {
                this.$toast.error("Bookcode belum diisi", {
                    type: "error",
                    position: "top-right",
                    duration: 3000,
                    dismissible: true,
                });
            }
        },
        runRollback() {
            if(this.book && this.tiket) {
                this.$swal.fire({
                    title: 'Are you sure?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#4EB883',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    cancelButtonText: "No",
                    }).then((result) => {
                    if (result.isConfirmed) {
                        this.load = true
                        this.rollback(this.book, this.tiket)                    
                    }
                })
            } else {
                this.$toast.error("Bookcode atau tiket harus diisi", {
                    type: "error",
                    position: "top-right",
                    duration: 3000,
                    dismissible: true,
                });
            }
        },
        openRollback() {
            this.hide = false
            this.hideRollback = true
            this.book = this.dataCancel.bookCode
        },
    },
    computed: { 
        flex: function () {
            return this.hide ? "d-flex" : "d-none";
        },
        flexRollback: function () {
            return this.hideRollback ? "d-flex" : "d-none";
        },
        loading: function () {
            return this.load ? "d-flex" : "d-none";
        },
    }   
}
</script>

<style>
    
</style>