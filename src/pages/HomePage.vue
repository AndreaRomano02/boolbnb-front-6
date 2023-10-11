<script>
import axios from 'axios';
import { endpoint } from '../data';
import AppLoader from '../components/AppLoader.vue';
import ApartmentCard from '../components/apartments/ApartmentCard.vue';
import AppHeader from '../components/AppHeader.vue';
import AppHero from '../components/AppHero.vue';

export default {
    name: 'HomePage',
    components: { AppHeader, AppHero, AppLoader, ApartmentCard },
    data() {
        return {
            endpoint,
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
            axios.get(endpoint + "?all=true").then((res) => {
                this.apartments = res.data;
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
    },
    computed: {
        apartmentsWithSponsors() {
            return this.apartments.filter(apartment => apartment.sponsors.length > 0);
        },
    },
}
</script>

<template>
    <main>
        <AppHeader :is-home-page="isHomePage" />
        <AppHero @address-change="onAddressChange" @form-submit="onFormSubmit" @distance-change="onDistanceChange" />
        <div class="center-button">
            <a href="#sponsored">
                <i id="slidedown-btn" class="material-icons">
                    expand_more
                </i>
            </a>
        </div>
        <div id="sponsored" class="container-fluid px-5">
            <div class="row px-2 gy-4 d-flex justify-content-start mt-5">
                <div class="col-auto col-lg-3 col-md-6 col-sm-12" v-for="(apartment, index) in apartmentsWithSponsors"
                    :key="index">
                    <div>
                        <ApartmentCard :apartment="apartment" />
                    </div>
                </div>
            </div>
        </div>
        <AppLoader v-if="isLoading" />
    </main>
</template>
    
<style lang="scss" scoped>
@use "../scss/vars" as *;

#slidedown-btn {
    position: relative;
    top: -120px;
    color: $white;
    font-size: 100px;
}

.center-button {
    display: flex;
    justify-content: center;
    align-items: center;
}

#sponsored {
    padding-top: 30px;
}
</style>
  


  
