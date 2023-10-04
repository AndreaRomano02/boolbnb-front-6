<script>
import { endpoint } from '../../data';
import axios from 'axios';
import ApartmentList from '../../components/apartments/ApartmentList.vue';
import AppHeader from '../../components/AppHeader.vue';
import { store } from '../../data/store';

export default {
    name: "ApartmentsPage",
    components: { AppHeader, ApartmentList },
    data() {
        return {
            endpoint,
            store,
            isHomePage: false,
            isLoading: false,
        };
    },
    methods: {

        fetchApartments() {
            this.isLoading = true;
            axios.get(endpoint).then((res) => {
                this.store.apartments = res.data;
            }).catch((err) => { console.error(err) })
                .then(() => {
                    this.isLoading = false;
                })
        },
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
        <ApartmentList :apartments="store.apartments" />
    </div>
</template>

<style scoped></style>
