<script>
import ApartmentCard from './ApartmentCard.vue';

import axios from "axios";
import { store } from '../../data/store';

export default {
    name: "ApartmentList",
    components:
        { ApartmentCard },
    data() {
        return {
            apartments: [],
            store,
            is_loading: false,
        };
    },
    created() {
        this.store.apartments = this.apartments;
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