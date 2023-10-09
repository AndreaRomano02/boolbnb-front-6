<script>
import { endpoint } from '../../data';
import axios from 'axios';
import ApartmentList from '../../components/apartments/ApartmentList.vue';
import AppHeader from '../../components/AppHeader.vue';
import { store } from '../../data/store';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';


export default {
    name: "ApartmentsPage",
    components: { AppHeader, ApartmentList, Bootstrap5Pagination },
    data() {
        return {
            endpoint,
            store,
            isHomePage: false,
            isLoading: false,
        };
    },
    methods: {
        async fetchApartments(page = 1) {
            const response = await fetch(endpoint + '?page=' + page);
            this.store.apartments = await response.json();
        }
    },
    created() {
        this.fetchApartments();
    }
};
</script>

<template>
    <AppLoader v-if="isLoading" />
    <AppHeader :is-home-page="isHomePage" />
    <div class="pt-5 mt-5">
        <ApartmentList :apartments="store.apartments.data" />
    </div>
    <div>
        <Bootstrap5Pagination :data="store.apartments" @pagination-change-page="fetchApartments" />
    </div>
</template>

<style scoped></style>
