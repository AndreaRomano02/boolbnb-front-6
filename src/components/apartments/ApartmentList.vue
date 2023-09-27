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
    <div v-else class="container my-5">
        <div class="row ">
            <h1 class="text-center mb-5">Boolbnb Team 6</h1>
            <div class="col-3 mb-5" v-for="apartment in apartments" :key="apartment.id">
                <ApartmentCard :apartment="apartment" @deleted="getApartments" />
            </div>
        </div>
    </div>
</template>
  


<style></style>