<script>
import ApartmentCard from './ApartmentCard.vue';

import axios from "axios";

export default {
    name: "ApartmentList",
    components:
        { ApartmentCard },
    data() {
        return {
            apartments: [],
            is_loading: false,
        };
    },
    methods: {
        getApartments() {
            this.is_loading = true;
            axios.get("http://127.0.0.1:8000/api/apartments").then(res => {
                this.apartments = res.data;
            }).catch(err => {
                console.error(err)
            }).then(() => {
                this.is_loading = false;
            })
        },
    },
    created() {
        this.getApartments();
    },
};
</script>


<template>
    <AppLoader v-if="is_loading" />
    <div v-else class="container-fluid px-5 my-5">
        <div class="wrapper px-4">
            <div class="row ">
                <div class="col-3 mb-5" v-for="apartment in apartments" :key="apartment.id">
                    <ApartmentCard :apartment="apartment" @deleted="getApartments" />
                </div>
            </div>
        </div>
    </div>
</template>
  


<style lang="scss" scoped></style>