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
            errors: [],
            isLoading: false,
            suggestions: [],
        };
    },
    computed: {
        hasErrors() {
            return Object.keys(this.errors).length;
        }
    },
    methods: {
        filteredApartments() {
            this.validateAdvancedSearch();

            if (this.hasErrors) {
                return;
            }

            this.apartments = [];
            const params = {
                params: {
                    city: this.form.city,
                    range: this.form.range,
                    beds: this.form.beds,
                    rooms: this.form.rooms,
                    services: this.form.services,
                }
            };
            this.isLoading = true;
            axios.get(endpoint, params)
                .then((res) => {
                    this.apartments = res.data;

                    this.apartments = this.apartments.sort((a, b) => {
                        if (a.sponsors.length && !b.sponsors.length) {
                            return -1;
                        } else if (!a.sponsors && b.sponsors.length) {
                            return 1;
                        }

                        return a.distance_center - b.distance_center;
                    });
                })
                .catch((err) => { console.error(err) })
                .then(() => {
                    this.isLoading = false;
                });
        },


        fetchServices() {

            axios.get(servicesEndpoint).then((res) => {
                this.store.services = res.data;
            }).catch((err) => { console.error(err) })
        },

        validateAdvancedSearch() {
            this.errors = {};

            // city
            if (!this.form.city) {
                this.errors.city = 'Inserisci un Indirizzo';
            }
            // range
            if (!this.form.range || this.form.range < 0) {
                this.errors.range = "La Distanza non può essere minore di zero.";
            }
            // beds
            if (isNaN(this.form.beds) || this.form.beds < 0) {
                this.errors.beds = "Il Numero di Letti è insufficiente.";
            }
            // rooms
            if (isNaN(this.form.rooms) || this.form.rooms < 0) {
                this.errors.rooms = "Il Numero di Stanze è insufficiente.";
            }
        },
        async getTomTomSuggestions(query) {
            // Esegui una chiamata API a TomTom utilizzando la tua API Key
            const apiKey = 'PWX9HGsOx1sGv84PlpxzgXIbaElOjVMF';
            const apiUrl = `https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json?key=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                // Estrai i suggerimenti dalla risposta API e assegna a `suggestions`
                this.suggestions = data.results.map(result => result.address.freeformAddress);
            } catch (error) {
                console.error('Errore nella chiamata API di TomTom:', error);
            }

        },
        handleAddressInput() {
            if (this.form.city) {
                this.suggestions = this.getTomTomSuggestions(this.form.city);
            } else {
                this.suggestions = [];
            }
        },
        // Gestisci la selezione di un suggerimento
        handleSuggestionSelected(suggestion) {
            this.form.city = suggestion;
            this.suggestions = []; // Pulisci i suggerimenti dopo la selezione
            this.$emit('address-change', suggestion);
        },
    },
    created() {
        this.fetchServices();
        // Leggi il valore dell'indirizzo dalla query dei parametri di Vue Router
        if (this.$route.query.address || this.$route.query.range) {
            this.form.city = this.$route.query.address;
            this.form.range = this.$route.query.range
        }
        // Esegui la ricerca iniziale solo se il campo "city" è compilato
        if (this.form.city) {
            this.filteredApartments();
        }
    },
};
</script>

<template>
    <AppLoader v-if="isLoading" />
    <AppHeader :is-home-page="isHomePage" />
    <div class="pt-5 mt-3">
        <div class="container-fluid" id="filter-form">

            <form @submit.prevent="filteredApartments()">

                <div class="row justify-content-center px-3">
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="form-group px-3">
                            <label for="city" class="fs-5 me-2 mb-1 d-block">Città o indirizzo</label>
                            <input type="text" id="city" name="city" v-model="form.city" @input="handleAddressInput">
                            <div v-if="suggestions.length">
                                <ul class="dropdown-menu" aria-labelledby="form.city" style="display: block;">
                                    <li v-for="(suggestion, index) in suggestions.slice(0, 4)" :key="suggestion"
                                        @click="handleSuggestionSelected(suggestion)" class="dropdown-item">{{ suggestion }}
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <small v-if="errors.city" class="text-danger">{{ errors.city }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="form-group px-3">
                            <label for="range" class="fs-5 me-2 mb-1 d-block">Raggio <span class="fs-5">({{ form.range }}
                                    Km)</span></label>
                            <input type="range" id="range" name="range" v-model="form.range" min="0" max="20">
                            <div>
                                <small v-if="errors.range" class="text-danger">{{ errors.range }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="form-group px-3">
                            <label for="beds" class="fs-5 me-2 mb-1 d-block">Posti Letto</label>
                            <input type="number" id="beds" name="beds" v-model="form.beds">
                            <div>
                                <small v-if="errors.beds" class="text-danger">{{ errors.beds }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="form-group px-3">
                            <label for="rooms" class="fs-5 me-2 mb-1 d-block">Numero Stanze</label>
                            <input type="number" id="rooms" name="rooms" v-model="form.rooms">
                            <div>
                                <small v-if="errors.rooms" class="text-danger">{{ errors.rooms }}</small>
                            </div>
                        </div>
                    </div>
                </div>



                <div class="row mt-2 px-2 mx-auto ps-5">

                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="checkbox-group d-flex flex-column justify-content-center">
                            <div v-for="(service, index) in store.services.slice(0, 5)" :key="service.id"
                                class="form-check form-checkbox d-flex align-items-center mb-0">
                                <input v-model="form.services" class="form-check-input border border-dark ms-1"
                                    type="checkbox" :id="'service-' + service.id" :value="service.id" name="services[]">
                                <label class="form-check-label d-flex align-items-center" :for="'service-' + service.id">
                                    <i class="material-icons fs-4">{{ service.icon }}</i>
                                    {{ service.label }}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="checkbox-group d-flex flex-column justify-content-center">
                            <div v-for="(service, index) in store.services.slice(5, 10)" :key="service.id"
                                class="form-check form-checkbox d-flex align-items-center mb-0">
                                <input v-model="form.services" class="form-check-input border border-dark ms-1"
                                    type="checkbox" :id="'service-' + service.id" :value="service.id" name="services[]">
                                <label class="form-check-label d-flex align-items-center" :for="'service-' + service.id">
                                    <i class="material-icons fs-4">{{ service.icon }}</i>
                                    {{ service.label }}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="checkbox-group d-flex flex-column justify-content-center">
                            <div v-for="(service, index) in store.services.slice(10, 15)" :key="service.id"
                                class="form-check form-checkbox d-flex align-items-center mb-0">
                                <input v-model="form.services" class="form-check-input border border-dark ms-1"
                                    type="checkbox" :id="'service-' + service.id" :value="service.id" name="services[]">
                                <label class="form-check-label d-flex align-items-center" :for="'service-' + service.id">
                                    <i class="material-icons fs-4">{{ service.icon }}</i>
                                    {{ service.label }}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3">
                        <div class="checkbox-group d-flex flex-column justify-content-center">
                            <div v-for="(service, index) in store.services.slice(15, 20)" :key="service.id"
                                class="form-check form-checkbox d-flex align-items-center mb-0">
                                <input v-model="form.services" class="form-check-input border border-dark ms-1"
                                    type="checkbox" :id="'service-' + service.id" :value="service.id" name="services[]">
                                <label class="form-check-label d-flex align-items-center" :for="'service-' + service.id">
                                    <i class="material-icons fs-4">{{ service.icon }}</i>
                                    {{ service.label }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="d-flex justify-content-center mt-4">
                    <button class="submit">Cerca</button>
                </div>
            </form>

        </div>
        <ApartmentList v-if="!isLoading" :apartments="apartments" />
    </div>
</template>
  
<style lang="scss" scoped>
@use "../../scss/vars" as *;

.form-group label {
    font-weight: bold;
}

#filter-form {
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* Stile per il titolo del form */
#filter-form h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
}

/* Stile per il form */
#filter-form form {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Stile per le etichette dei campi */
.form-group label {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
}

/* Stile per gli input e gli input range */
.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="range"] {
    width: 100%;
    height: 40px;
    padding: 12px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 30px;
    transition: border-color 0.3s ease-in-out;
}

/* Stile per il range input */
#range {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
}

#range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: $black;
    border: 2px solid $black;
    border-radius: 50%;
    cursor: pointer;
}

.form-group input:focus {
    outline: none;
    border: 3px solid #00ff8c;
}


/* Stile per i checkbox */
.form-check {
    margin: 10px 0;
    display: flex;
    align-items: center;
}

.form-check-input[type="checkbox"]:checked {
    background-color: $black;
    border-color: $black;
}

.form-check-label {
    font-size: 16px;
    margin-left: 10px;
    color: #333;
}

/* Stile per il pulsante "Vai" */
.submit {
    background-color: $black;
    color: #fff;
    padding: 10px 100px;
    font-size: 18px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

/* Cambia il colore del pulsante al passaggio del mouse */
.submit:hover {
    background-color: #00b682;
}

/* Stile per i messaggi di errore */
.text-danger {
    color: #ff0000;
}

.checkbox-group label {
    cursor: pointer;
}
</style>
  