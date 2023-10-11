<script>
import axios from 'axios';
import AppHeader from '../../components/AppHeader.vue';

export default {
    name: 'SingleApartment',
    components: { AppHeader },
    data() {
        return {
            form: {
                apartment_id: 0,
                name: '',
                surname: '',
                email: '',
                content: '',
            },
            apartment: null,
            is_loading: false,
            isFormSubmittedSuccessfully: false,
        };
    },
    created() {
        this.getSingleApartment()
    },
    methods: {
        getSingleApartment() {
            this.is_loading = true;
            axios.get(`http://127.0.0.1:8000/api/apartments/${this.$route.params.id}`).then((res) => {
                this.apartment = res.data;
            }).catch(err => {
                this.$router.push('/not-found-page');
            }).then(() => {
                this.is_loading = false;
            });
        },
        copyUrl() {
            const url = window.location.href;

            const tempInput = document.createElement("input");
            tempInput.style.position = "absolute";
            tempInput.style.left = "-1000px";
            tempInput.style.top = "-1000px";
            tempInput.value = url;
            document.body.appendChild(tempInput);

            tempInput.select();
            tempInput.setSelectionRange(0, 99999);

            document.execCommand("copy");

            document.body.removeChild(tempInput);

            alert("URL copiato negli appunti: " + url);
        },
        onSubmit() {
            this.form.apartment_id = this.apartment.id
            axios.post('http://127.0.0.1:8000/api/apartments/messagge/', this.form)
                .then((res) => {
                    this.form.name = '';
                    this.form.surname = '';
                    this.form.email = '';
                    this.form.content = '';

                    this.isFormSubmittedSuccessfully = true;
                    console.log(this.isFormSubmittedSuccessfully)
                    setTimeout(() => {
                        this.isFormSubmittedSuccessfully = false;
                    }, 700);
                })
                .catch((error) => {

                }).finally(() => {

                });
        },
    },
}

</script>


<template>
    <AppHeader />
    <AppLoader v-if="is_loading" />
    <main v-if="apartment" class="mt-5 py-1 pb-5">
        <div class="container mt-5">
            <div class="mt-4">
                <h3>{{ apartment.title }}</h3>
            </div>

            <div class="mb-2 d-flex align-items-center justify-content-between">
                <div>
                    <span>{{ apartment.address }}</span>
                </div>

                <div class="d-flex flex-column flex-sm-row justify-content-end align-items-end w-50">
                    <a href="#" class="d-flex text-decoration-none text-dark me-md-3 mb-2 mb-md-0" @click="copyUrl()">
                        <p>Condividi</p>
                        <i class="material-icons">ios_share</i>
                    </a>

                    <a href="#" class="d-flex text-decoration-none text-dark">
                        <p>Salva</p>
                        <i class="material-symbols-outlined">favorite</i>
                    </a>
                </div>


            </div>

            <div>
                <div class="row">
                    <div v-if="apartment.images.length" class="col-md-12 col-lg-6">
                        <img :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`" alt="Apartment Image"
                            class="first-img img-fluid object-fit-cover" />
                    </div>

                    <div class="col-md-6 d-none d-lg-block">
                        <div class="row g-2">

                            <div v-if="apartment.images.length" class="col-md-6">
                                <img :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`"
                                    alt="Apartment Image" class="img-fluid object-fit-cover" />
                            </div>

                            <div v-if="apartment.images.length" class="col-md-6">
                                <img :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`"
                                    alt="Apartment Image" class="third-img img-fluid rounded-right object-fit-cover" />
                            </div>

                            <div v-if="apartment.images.length" class="col-md-6">
                                <img :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`"
                                    alt="Apartment Image" class="img-fluid object-fit-cover" />
                            </div>

                            <div v-if="apartment.images.length" class="col-md-6">
                                <img :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`"
                                    alt="Apartment Image" class="fifth-img img-fluid object-fit-cover" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="row">

                <div class="col-lg-6">
                    <div class="d-flex justify-content-between">
                        <div class="pt-1">
                            <p class="text-start fs-3 pb-1"><strong>{{ apartment.square_meters }}</strong> mq²</p>

                            <p>{{ apartment.description }}</p>
                        </div>
                    </div>

                    <hr>

                    <div class="d-flex align-items-center">
                        <div class="text-center">
                            <i class="material-icons">
                                bed
                            </i>
                            <p>{{ apartment.beds }} Posti Letto</p>
                        </div>

                        <div class="mx-4 text-center">
                            <i class="material-icons">
                                meeting_room
                            </i>
                            <p>{{ apartment.rooms }} Stanze</p>
                        </div>

                        <div class="text-center">
                            <i class="material-symbols-outlined">
                                bathtub
                            </i>
                            <p>{{ apartment.bathrooms }} Bagni</p>
                        </div>
                    </div>

                    <h3 class="py-3 text-decoration-underline">Servizi</h3>
                    <div class="d-flex align-items-between">
                        <div class="d-flex flex-column">
                            <div v-for="(service, index) in apartment.services.slice(0, 5)" :key="index" class="d-flex">
                                <i class="material-symbols-outlined me-1">{{ service.icon }}</i>
                                <p class="me-3">{{ service.label }}</p>
                            </div>
                        </div>
                        <div class="d-flex flex-column">
                            <div v-for="(service, index) in apartment.services.slice(5, 10)" :key="index" class="d-flex">
                                <i class="material-symbols-outlined me-1">{{ service.icon }}</i>
                                <p class="me-3">{{ service.label }}</p>
                            </div>
                        </div>
                        <div class="d-flex flex-column">
                            <div v-for="(service, index) in apartment.services.slice(10, 15)" :key="index" class="d-flex">
                                <i class="material-symbols-outlined me-1">{{ service.icon }}</i>
                                <p class="me-3">{{ service.label }}</p>
                            </div>
                        </div>
                        <div class="d-flex flex-column">
                            <div v-for="(service, index) in apartment.services.slice(15, 20)" :key="index" class="d-flex">
                                <i class="material-symbols-outlined me-1">{{ service.icon }}</i>
                                <p class="me-3">{{ service.label }}</p>
                            </div>
                        </div>
                    </div>

                    <hr>

                </div>

                <div class="col-lg-6 pt-1">
                    <form @submit.prevent="onSubmit">

                        <p class="text-start fs-3 pb-1"><strong>{{ apartment.price }} €</strong> / notte</p>
                        <div class="card">
                            <div class="card-header text-center">
                                <h5 class="card-title pt-2">Contatta l'Host</h5>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label class="my-2" for="fullName">Nome</label>
                                    <input v-model="form.name" type="text" class="form-control border-dark-subtle"
                                        id="fullName" placeholder="es. Mario">
                                </div>
                                <div class="form-group">
                                    <label class="my-2" for="fullSurname">Cognome</label>
                                    <input v-model="form.surname" type="text" class="form-control border-dark-subtle"
                                        id="fullSurame" placeholder="es. Rossi">
                                </div>

                                <div class="form-group">
                                    <label class="my-2" for="email">Indirizzo E-mail</label>
                                    <input type="email" v-model="form.email" class="form-control border-dark-subtle"
                                        id="email" placeholder="es. mariorossi@email.it">
                                </div>
                                <div class="form-group">
                                    <label class="my-2" for="message">Messaggio</label>
                                    <textarea v-model="form.content" class="form-control border-dark-subtle" id="message"
                                        rows="4" placeholder="Inserisci il tuo messaggio"></textarea>
                                </div>
                            </div>
                            <div class="p-3">
                                <button class="effect effect-1 form-control mt-2"
                                    :class="{ success: this.isFormSubmittedSuccessfully }">Invia Messaggio</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use "../../scss/vars" as *;
@use "../../scss/fonts";

.card {
    background-color: rgba($bone, 0.5) !important;
    border-radius: 40px;
}

.first-img {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.third-img {
    border-top-right-radius: 10px;
}

.fifth-img {
    border-bottom-right-radius: 10px;
}

img {
    transition: all 0.3s;

    &:hover {
        filter: brightness(75%);
    }
}

.effect.effect-1 {
    transition: all 0.2s linear 0s;
    position: relative;
    background-color: $black;
    color: $white;
    border-radius: 40px;
    padding: 16px;

    &:before {
        content: "\f054";
        font-family: FontAwesome;
        font-size: 15px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        right: 2%;
        top: 52.5%;
        transform: translateY(-50%);
        opacity: 0;
        height: 100%;
        width: 40px;
        transition: all 0.2s linear 0s;
    }

    &:hover {
        text-indent: -20px;

        &:before {
            opacity: 1;
            text-indent: 0px;
        }
    }

    &.success {
        background-color: rgb(0, 125, 0);
        transition: background-color 0.4s;
    }
}

@media (max-width: 992px) {
    .first-img {
        border-top-left-radius: initial;
        border-bottom-left-radius: initial;
    }
}
</style>

