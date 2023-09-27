<script>
import axios from 'axios';
const endpoint = 'http://127.0.0.1:8000/api/apartments';
const formField = {
    user_id: null,
    title: null,
    description: null,
    address: null,
    beds: null,
    rooms: null,
    bathrooms: null,
    square_meters: null,
    is_visible: null,
};
export default {
    data() {
        return {
            form: { ...formField },
            errors: {},
        }
    },
    computed: {
        hasErrors() {
            return Object.keys(this.errors).length;
        }
    },
    methods: {

        sendForm() {

            this.validateForm();

            if (this.hasErrors) return
            axios.post(endpoint, this.form)
                .then(() => {
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        const { errors } = err.response.data;
                        const errorMessage = {};
                        for (let field in errors) errorMessage[field] = errors[field][0];
                        this.errors = errorMessage;
                        console.log(this.errors)
                    }
                })
                .then(() => {
                    this.$router.push('/');
                })
        },

        validateForm() {
            this.errors = {};


            if (!this.form.title) {
                this.errors.title = 'Il Titolo è obbligatorio';
            }
            if (!this.form.description) {
                this.errors.description = 'La Descrizione è obbligatoria';
            }
            if (!this.form.address) {
                this.errors.address = "L'Indirizzo è obbligatorio";
            }

            // Validazione per il campo 'beds' (deve essere un numero minore o uguale a 1)
            if (!this.form.beds || !Number.isInteger(this.form.beds) || this.form.beds < 1) {
                this.errors.beds = "Il Numero di Letti è insufficiente.";
            }

            // Validazione per il campo 'rooms' (deve essere un numero minore o uguale a 1)
            if (this.form.rooms !== null && (!Number.isInteger(this.form.rooms) || this.form.rooms < 1)) {
                this.errors.rooms = "Il Numero di Stanze è insufficiente.";
            }

            // Validazione per il campo 'bathrooms' (deve essere un numero intero positivo o nullo)
            if (this.form.bathrooms !== null && (!Number.isInteger(this.form.bathrooms) || this.form.bathrooms < 0)) {
                this.errors.bathrooms = "Il Numero di Bagni è insufficiente.";
            }

            // Validazione per il campo 'square_meters' (deve essere un numero intero positivo o nullo)
            if (this.form.square_meters !== null && (!Number.isInteger(this.form.square_meters) || this.form.square_meters < 0)) {
                this.errors.square_meters = "I Metri Quadrati non possono essere minori di zero.";
            }

            // Validazione per il campo 'is_visible' (deve essere un booleano)
            if (typeof this.form.is_visible !== 'boolean') {
                this.errors.is_visible = "Il campo Visibilità deve essere vero o falso";
            }
        },

    },
};
</script>

<template>
    <div class="container">
        <div class="m-5 text-end">
            <router-link class="btn btn-sm btn-warning mt-2" :to="{ name: 'apartments' }">Torna alla home</router-link>
        </div>
        <form @submit.prevent="sendForm()">

            <!--user id-->
            <div class="mb-3">
                <input type="hidden" class="form-control" value="1" />

            </div>

            <!--TITOLO-->
            <div class="mb-3">
                <label for="title" class="form-label">Titolo:</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.title }" id="title"
                    v-model.trim="form.title" placeholder="Inserisci il titolo" />
                <div v-if="errors.title" class="invalid-feedback">
                    {{ errors.title }}
                </div>
            </div>

            <!--DESCRIZIONE-->
            <div class="mb-3">
                <label for="description" class="form-label">Descrizione:</label>
                <textarea class="form-control" :class="{ 'is-invalid': errors.description }" id="description" rows="5"
                    v-model="form.description" placeholder="Inserisci la descrizione"></textarea>
                <div v-if="errors.description" class="invalid-feedback">
                    {{ errors.description }}
                </div>
            </div>

            <!--INDIRIZZO-->
            <div class="mb-3">
                <label for="address" class="form-label">Indirizzo:</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.address }" id="address"
                    v-model.trim="form.address" placeholder="Inserisci l'indirizzo" />
                <div v-if="errors.address" class="invalid-feedback">
                    {{ errors.address }}
                </div>
            </div>

            <!--LETTI-->
            <div class="mb-3">
                <label for="beds" class="form-label">Numero di Letti:</label>
                <input type="number" class="form-control" :class="{ 'is-invalid': errors.beds }" id="beds"
                    v-model.number="form.beds" placeholder="Inserisci il numero di letti" />
                <div v-if="errors.beds" class="invalid-feedback">
                    {{ errors.beds }}
                </div>
            </div>

            <!--STANZE-->
            <div class="mb-3">
                <label for="rooms" class="form-label">Numero di Stanze:</label>
                <input type="number" class="form-control" :class="{ 'is-invalid': errors.rooms }" id="rooms"
                    v-model.number="form.rooms" placeholder="Inserisci il numero di stanze" />
                <div v-if="errors.rooms" class="invalid-feedback">
                    {{ errors.rooms }}
                </div>
            </div>

            <!--BAGNI-->
            <div class="mb-3">
                <label for="bathrooms" class="form-label">Numero di Bagni:</label>
                <input type="number" class="form-control" :class="{ 'is-invalid': errors.bathrooms }" id="bathrooms"
                    v-model.number="form.bathrooms" placeholder="Inserisci il numero di bagni" />
                <div v-if="errors.bathrooms" class="invalid-feedback">
                    {{ errors.bathrooms }}
                </div>
            </div>

            <!--METRI QUADRATI-->
            <div class="mb-3">
                <label for="square_meters" class="form-label">Metri Quadrati:</label>
                <input type="number" class="form-control" :class="{ 'is-invalid': errors.square_meters }" id="square_meters"
                    v-model.number="form.square_meters" placeholder="Inserisci i metri quadrati" />
                <div v-if="errors.square_meters" class="invalid-feedback">
                    {{ errors.square_meters }}
                </div>
            </div>

            <!--VISIBILITA'-->
            <div class="mb-3">
                <label class="form-check-label">Visibilità:</label>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="is_visible" v-model="form.is_visible" />
                    <label for="is_visible" class="form-check-label">Visibile</label>
                </div>
            </div>
            <button class="btn btn-success">Invia</button>
        </form>
    </div>
</template>

<style scoped></style>