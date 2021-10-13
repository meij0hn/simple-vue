<template>
    <div class="pmt">
        <Navbar />
        <div class="container">
            <h3>Payment Remarks</h3>
            <hr />
            <div class="row mt-2">
                <div class="col">
                    <form class="mt-4" v-on:submit.prevent>
                        <div class="form-group">
                            <input
                                type="text"
                                class="form-control"
                                v-model="transno"
                                placeholder="Transno..."
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
                    </form>
                </div>
            </div>

            <div class="bs-callout bs-callout-success row mt-2" :class="flex">
                <div class="col mt-2">
                    <h5>
                        <b-icon-bag-x-fill style="font-size: 2rem;" />
                        <strong> INFORMATION TRANSNO</strong
                    ></h5>
                    <hr class="griin" />
                    <div :class="flexButton">
                        <table class="table table-sm table-borderless">
                            <tbody>
                                <tr>
                                    <td width="30%">Bookcode</td>
                                    <td width="1%">:</td>
                                    <td>{{ dataPmt.bookcode }}</td>
                                </tr>
                                <tr>
                                    <td width="30%">Transno</td>
                                    <td width="1%">:</td>
                                    <td>{{ dataPmt.transno }}</td>
                                </tr>
                                <tr>
                                    <td width="30%">Remarks</td>
                                    <td width="1%">:</td>
                                    <td>{{ dataPmt.ket }}</td>
                                </tr>
                                <tr>
                                    <td width="30%"></td>
                                    <td width="1%"></td>
                                    <td>
                                        <button type="submit" class="btn btn-success" @click="runShowUpdate">
                                            Change Remarks
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div :class="flexUpdateRemarks">
                        <table class="table table-sm table-borderless">
                            <tbody>
                                <tr>
                                    <td width="30%">Bookcode</td>
                                    <td width="1%">:</td>
                                    <td>{{ dataPmt.bookcode }}</td>
                                </tr>
                                <tr>
                                    <td width="30%">Transno</td>
                                    <td width="1%">:</td>
                                    <td>{{ dataPmt.transno }}</td>
                                </tr>
                                <tr>
                                    <td width="30%">Old Remarks</td>
                                    <td width="1%">:</td>
                                    <td>{{ dataPmt.ket }}</td>
                                </tr>
                                <tr>
                                    <td width="30%">New Remarks</td>
                                    <td width="1%">:</td>
                                    <td>
                                        <textarea
                                            type="text"
                                            class="form-control"
                                            v-model="remarks"
                                            placeholder="New Remarks..."
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td width="30%">No Tiket</td>
                                    <td width="1%">:</td>
                                    <td>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="tiket"
                                            placeholder="No Tiket..."
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td width="30%"></td>
                                    <td width="1%"></td>
                                    <td>
                                        <button type="submit" class="btn btn-success" @click="runUpdateRemarks"> 
                                            Save
                                        </button>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                        
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from 'axios'

export default {
    name: "Vat",
    components: {
        Navbar,
    },
    data() {
        return {
            transno: "",
            remarks: "",
            tiket: "",
            loading: false,
            hide: false,
            dataPmt: {},
            hideButton: true,
            hideEdit: false,
        };
    },
    methods: {
        setDataPmt(data) {
            this.dataPmt = data
        },
        getPmt(item) {
            this.load = true
            axios
            .post("http://api.mrmjohn.com/services/api/ketPmt", {
                "transno": item
            })
            .then((response) => {
                console.log(response)
                this.setDataPmt(response.data.result[0])
                this.transno = ""
                this.load = false
                this.hide = true
                this.hideButton = true
                this.hideEdit = false
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
            if(this.transno) {
                this.getPmt(this.transno)
            } else {
                this.$toast.error("Transno belum diisi", {
                    type: "error",
                    position: "top-right",
                    duration: 3000,
                    dismissible: true,
                });
            }
        },
        runShowUpdate() {
            this.hideButton = false
            this.hideEdit = true
        },
        updateKet(item1, item2, item3) {
            this.load = true
            axios
            .post("http://api.mrmjohn.com/services/api/updateKet", {
                "transno": item1,
                "remarks": item2,
                "tiket": item3
            })
            .then((response) => {
                console.log(response)
                this.getPmt(this.dataPmt.transno)
                this.remarks = ""
                this.tiket = ""
                this.load = false
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
        runUpdateRemarks() {
            if(this.remarks && this.tiket) {
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
                        this.updateKet(this.dataPmt.transno, this.remarks, this.tiket)            
                    }
                })
                
                
                
            } else {
                this.$toast.error("New Remarks atau Tiket belum diisi", {
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
        flexButton: function () {
            return this.hideButton ? "d-flex" : "d-none";
        },
        flexUpdateRemarks: function () {
            return this.hideEdit ? "d-flex" : "d-none";
        },
  },
}
</script>