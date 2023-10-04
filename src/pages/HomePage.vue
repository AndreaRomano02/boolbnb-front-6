<script>
import axios from 'axios';
const endpoint = 'http://localhost:8000/api/apartments';
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
            store,
            isLoading: false,
            isHomePage: true,
            formSubmit: false,
            apartments: [],
            addressFilter: '',
        };
    },
    methods: {
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
                        console.log(res.data)
                        res.data = this.apartments
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
            <ApartmentList class="my-5" :apartments="store.apartments" />
        </div>
    </main>
</template>

<style lang="scss" scoped></style>

  
