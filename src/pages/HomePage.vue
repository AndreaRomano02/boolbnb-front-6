<script>
import axios from 'axios';
import { endpoint } from '../data';
import AppLoader from '../components/AppLoader.vue'
import { store } from "../data/store";
import ApartmentCard from '../components/apartments/ApartmentCard.vue';
import AppHeader from '../components/AppHeader.vue';
import AppHero from '../components/AppHero.vue';
export default {
    name: 'HomePage',
    components: { AppHeader, AppHero, AppLoader, ApartmentCard },
    data() {
        return {
            endpoint,
            store,
            isLoading: false,
            isHomePage: true,
            apartments: [],
            addressFilter: '',
            rangeValue: 20,
            hasFiltered: false,
        };
    },
    created() {
        this.fetchApartments();
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
        onDistanceChange(input) {
            this.rangeValue = input;
        },
        onAddressChange(input) {
            this.addressFilter = input;
        },
        onFormSubmit() {
            this.hasFiltered = true;
            const params = {
                params: {
                    city: this.addressFilter,
                    range: this.rangeValue,
                },
            };

            this.isLoading = true
            axios.get(endpoint, params)
                .then(res => {
                    this.apartments = res.data
                })
                .catch(error => {
                    console.error(error);
                }).then(() => {
                    this.isLoading = false
                });
        }
    }
}
</script>


<template>
    <main>
        <AppHeader :is-home-page="isHomePage" />
        <AppHero @address-change="onAddressChange" @form-submit="onFormSubmit" @distance-change="onDistanceChange" />
        <!-- <div class="container-fluid d-flex justify-content-between px-5 pt-5">

            <h1 class="fw-bold ms-4">Lasciati ispirare..</h1>

            <router-link :to="{ name: 'AdvancedSearch' }" class="router-link d-flex align-items-center me-5">
                <i class="material-icons fs-2 me-2">tune</i>
                <span>Filtri</span>
            </router-link>

        </div> -->
        <AppLoader v-if="isLoading" />
        <!-- <div v-else>
            <div v-if="!hasFiltered || !apartments.length">
                <h1 v-if="hasFiltered && !apartments.length" class="text-center text-danger border-bottom pb-3">Non ci sono
                    appartamenti con
                    questi filtri
                </h1>
                <ApartmentList class="my-5" :apartments="store.apartments" />
            </div>
            <div v-else>
                <ApartmentList class="my-5" :apartments="apartments" />
            </div>
        </div> -->
    </main>
</template>

<style lang="scss" scoped>
@use '../scss/vars' as *;

.router-link {
    text-decoration: none;
    color: $black;
    transition: color 0.150s;

    &:hover {
        color: $orange;
    }
}
</style>

  
