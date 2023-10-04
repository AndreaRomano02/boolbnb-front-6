<script>
import axios from 'axios';
import { endpoint } from '../data';
import AppLoader from '../components/AppLoader.vue';
import ApartmentList from '../components/apartments/ApartmentList.vue';
import { store } from "../data/store";
import ApartmentCard from '../components/apartments/ApartmentCard.vue';
import AppHeader from '../components/AppHeader.vue';
import AppHero from '../components/AppHero.vue';
export default {
    name: 'HomePage',
    components: { AppHeader, AppHero, ApartmentList, AppLoader, ApartmentCard },
    data() {
        return {
            endpoint,
            store,
            isLoading: false,
            isHomePage: true,
            formSubmit: false,
            apartments: [],
            addressFilter: '',
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
        onAddressChange(input) {
            this.addressFilter = input;
            if (this.formSubmit) {
                const params = {
                    params: {
                        city: this.addressFilter,

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
            };
        },
    }
}
</script>


<template>
    <main>
        <AppHeader :is-home-page="isHomePage" />
        <AppHero :apartments="store.apartments" @address-change="onAddressChange" @form-submit="formSubmit = true" />
        <AppLoader v-if="isLoading" />
        <div v-else class="pt-4">
            <ApartmentList v-if="!apartments.length" class="my-5" :apartments="store.apartments" />
            <ApartmentList v-else class="my-5" :apartments="apartments" />
        </div>
    </main>
</template>

<style lang="scss" scoped></style>

  
