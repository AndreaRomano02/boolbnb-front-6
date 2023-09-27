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
        };
    },
    methods: {
        getApartments() {
            axios.get("http://127.0.0.1:8000/api/apartments").then(res => {
                this.apartments = res.data;
            })
        },
    },
    created() {
        this.getApartments();
    },
};
</script>


<template>
    <div class="container my-5">
        <div class="row ">
            <h1 class="text-center mb-5">Boolbnb Team 6</h1>
            <div class="col-3 mb-5" v-for="apartment in apartments" :key="apartment.id">
                <ApartmentCard :apartment="apartment" />
            </div>
        </div>
    </div>
</template>
  


<style></style>