<template>
    <div class="row mt-4" :class="flex">
        <div class="col">
            <table class="table">
                <tbody>
                    <tr>
                        <td colspan="3">
                            <strong>INFORMATION BOOKING PRICE</strong>
                        </td>
                    </tr>
                    <tr>
                        <td width="18%">Bookcode</td>
                        <td width="1%">:</td>
                        <td>{{ book }}</td>
                    </tr>
                    <tr>
                        <td width="18%">Term</td>
                        <td width="1%">:</td>
                        <td>{{ resp.term }}</td>
                    </tr>
                    <tr>
                        <td width="18%">Total Net Amount</td>
                        <td width="1%">:</td>
                        <td>Rp {{ resp.totalNetAmount | currency }} </td>
                    </tr>
                    <tr>
                        <td width="18%">Total Vat Amount</td>
                        <td width="1%">:</td>
                        <td>
                            Rp {{ resp.totalVATAmount | currency }}
                        </td>
                    </tr>
                    <tr>
                        <td width="18%">Selling Price</td>
                        <td width="1%">:</td>
                        <td>Rp {{ resp.sellingPrice | currency }}</td>
                    </tr>
                    <tr>
                        <td width="18%">Total Schedule</td>
                        <td width="1%">:</td>
                        <td>Rp {{ resp.totalSchedule | currency }}</td>
                    </tr>
                    <tr>
                        <td colspan="3" width="18%">
                            <button type="submit" class="btn btn-info" @click="runGoPctTax">
                                Change PctTax
                            </button> 
                        </td>
                    </tr>

                    
                </tbody>
            </table>
        </div>
    <vatupdate 
        :flex2 = "flex2"
        :hide2 = "hide2"
        :book = "book"
        :resp = "resp"

    />
    </div>

    
</template>

<script>
import vatupdate from "@/components/VatUpdate.vue";

export default {
    name: "vatdetail",
    data() {
        return {
            hide2: false
        }
    },
    components: {
        vatupdate
    },
    props: [
        "bookcode",
        "book",
        "setResp",
        "loading",
        "hide",
        "flex",
        "resp",
    ],
    methods: {
        runGoPctTax() {
            this.hide2 = true
        }
    },
    computed: {
        flex2: function () {
            return this.hide2 ? "d-flex" : "d-none";
        },
    }
    
}
</script>

<style>

</style>