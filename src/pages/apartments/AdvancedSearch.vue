<script>
import axios from 'axios';
import AppHeader from '../../components/AppHeader.vue';
import ApartmentList from '../../components/apartments/ApartmentList.vue';
import { store } from "../../data/store";
import { endpoint } from "../../data";

const servicesEndpoint = "http://127.0.0.1:8000/api/apartments/services";

const formField = {
    city: null,
    range: 20,
    beds: null,
    rooms: null,
    services: [],
};

export default {
    name: "AdvancedSearch",
    components: { AppHeader, ApartmentList },
    data() {
        return {
            endpoint,
            isHomePage: false,
            store,
            form: { ...formField },
            apartments: [],
            isLoading: false,
        };
    },
    methods: {
        filteredApartments() {
            console.log(this.form.services)
            this.apartments = [];
            const params = {
                params: {
                    city: this.form.city,
                    range: this.form.range,
                    beds: this.form.beds,
                    rooms: this.form.rooms,
                    // services: this.form.services, 
                }
            };
            this.isLoading = true;
            console.log(params);
            axios.get(endpoint, params)
                .then((res) => {
                    console.log(res.data)
                    this.apartments = res.data;
                }).catch((err) => { console.error(err) })
                .then(() => {
                    this.isLoading = false;
                })
        },
        fetchServices() {
            this.isLoading = true;
            axios.get(servicesEndpoint).then((res) => {
                this.store.services = res.data;
            }).catch((err) => { console.error(err) })
                .then(() => {
                    this.isLoading = false;
                })
        }
    },
    created() {
        this.fetchServices();
    }
};
</script>

<template>
    <AppLoader v-if="isLoading" />
    <AppHeader :is-home-page="isHomePage" />
    <div class="pt-5 mt-5">
        <div class="container-fluid" id="filter-form">

            <form @submit.prevent="filteredApartments()">

                <div class="d-flex align-items-center justify-content-center">

                    <div class="form-group px-5">
                        <label for="city" class="fs-5 me-2 mb-1 d-block">Città</label>
                        <input type="text" id="city" name="city" v-model="form.city">
                    </div>

                    <div class="form-group px-5">
                        <label for="range" class="fs-5 me-2 mb-1 d-block">Distanza</label>
                        <input type="range" id="range" name="range" v-model="form.range">
                    </div>

                    <div class="form-group px-5">
                        <label for="beds" class="fs-5 me-2 mb-1 d-block">Numero Posti Letto</label>
                        <input type="number" id="beds" name="beds" v-model="form.beds">
                    </div>

                    <div class="form-group px-5">
                        <label for="rooms" class="fs-5 me-2 mb-1 d-block">Numero Stanze</label>
                        <input type="number" id="rooms" name="rooms" v-model="form.rooms">
                    </div>
                </div>


                <div class="row me-3 mt-3">

                    <div class="col-12">
                        <div class="checkbox-group d-flex flex-wrap">

                            <div v-for="(service, index) in store.services" :key="service.id"
                                class="form-check form-checkbox">

                                <input v-model="form.services" class="form-check-input ms-1" type="checkbox"
                                    :id="'service-' + service.id" :value="service.id" name="services[]">
                                <span>
                                    <i class="material-icons">{{ service.icon }}</i>
                                </span>

                                <label class="form-check-label text-center" :for="'service-' + service.id">
                                    {{ service.label }}
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
                <button class="submit">Vai</button>
            </form>

        </div>
        <ApartmentList v-if="!isLoading" :apartments="apartments" />
    </div>
</template>
  
<style lang="scss" scoped>
input {
    margin-right: 5px;
}

label {
    font-size: 10px;
}

.form-checkbox {
    width: 5%;
}

.form-check-label {
    display: block;
}

.col-md-6 {
    flex-basis: 50%;
}
</style>
  