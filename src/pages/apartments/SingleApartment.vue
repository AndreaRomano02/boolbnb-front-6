<script>
import axios from 'axios';
import AppHeader from '../../components/AppHeader.vue';

export default {
    name: 'SingleApartment',
    components: { AppHeader },
    data() {
        return {
            apartment: {},
            apartments: {},
            is_loading: false,
        };
    },
    created() {
        this.getSingleApartment(),
            this.getApartments();
    },
    methods: {
        getApartments() {
            this.is_loading = true;
            axios.get(`http://127.0.0.1:8000/api/apartments`).then((res) => {
                this.apartments = res.data.slice(0, 4);
            }).catch(err => {
            }).then(() => {
                this.is_loading = false;
            });
        },
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
    },
}

</script>


<template>
    <AppHeader />
    <AppLoader v-if="is_loading" />
    <main class="mt-5 py-1 pb-5">
        <div class="container mt-5">
            <div class="mt-4">
                <h3>{{ apartment.title }}</h3>
            </div>

            <div class="mb-2 d-flex align-items-center justify-content-between">
                <div>
                    <span>{{ apartment.address }}</span>
                </div>

                <div class="d-flex">
                    <a href="#" class="d-flex text-decoration-none text-dark me-3" @click="copyUrl()">
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
                    <div class="col-md-6 my-img-style-1">
                        <img v-if="apartment.images.length"
                            :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`" alt="Apartment Image"
                            class="img-fluid object-fit-cover" style="height: 436px;" />
                    </div>

                    <div class="col-md-6">
                        <div class="row my-img-style-2">

                            <div class="col-sm-auto col-md-6">
                                <img v-if="apartment.images.length"
                                    :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`" alt="Apartment Image"
                                    class="img-fluid object-fit-cover" />
                            </div>

                            <div class="col-sm-auto col-md-6">
                                <img v-if="apartment.images.length"
                                    :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`" alt="Apartment Image"
                                    class="img-fluid rounded-right object-fit-cover" />
                            </div>

                            <div class="col-sm-auto col-md-6">
                                <img v-if="apartment.images.length"
                                    :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`" alt="Apartment Image"
                                    class="img-fluid object-fit-cover" />
                            </div>

                            <div class="col-sm-auto col-md-6">
                                <img v-if="apartment.images.length"
                                    :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`" alt="Apartment Image"
                                    class="img-fluid object-fit-cover" />
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

                    <!-- <h3 class="pb-3 text-decoration-underline">Dettagli</h3> -->
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
                    <p class="text-start fs-3 pb-1"><strong>{{ apartment.price }} €</strong> / notte</p>
                    <div class="card">
                        <div class="card-header text-center">
                            <h5 class="card-title pt-2">Contatta l'Host</h5>
                        </div>
                        <div class="card-body">
                            <div class="form-group">
                                <label class="my-2" for="fullName">Nome Completo</label>
                                <input type="text" class="form-control border-dark-subtle" id="fullName"
                                    placeholder="es. Mario Rossi">
                            </div>
                            <div class="form-group">
                                <label class="my-2" for="email">Indirizzo E-mail</label>
                                <input type="email" class="form-control border-dark-subtle" id="email"
                                    placeholder="es. mariorossi@email.it">
                            </div>
                            <div class="form-group">
                                <label class="my-2" for="message">Messaggio</label>
                                <textarea class="form-control border-dark-subtle" id="message" rows="4"
                                    placeholder="Inserisci il tuo messaggio"></textarea>
                            </div>
                        </div>
                        <div class="p-3">
                            <button class="effect effect-1 form-control mt-2">Invia Messaggio</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use "../../scss/vars" as *;
@use "../../scss/fonts";

.col-md-6 {


    img {
        width: 100%;
        border-radius: 7px;
        transition: all 0.2s;

        &:hover {
            filter: brightness(70%);
        }
    }

    ul {
        list-style-type: none;
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
}


.my-img-style-1 img {
    height: 436px;
}

.my-img-style-2 img {
    height: 220px;
    width: 315px;
    padding: 3px;
}

.my-img-style-3 img {
    height: 90px;
    width: 90px;
}

.card {
    background-color: rgba($bone, 0.5) !important;
    border-radius: 40px;
}
</style>

