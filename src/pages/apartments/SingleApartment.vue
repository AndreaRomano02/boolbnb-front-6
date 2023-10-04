<script>
import axios from 'axios';

export default {
    name: 'SingleApartment',


    data() {
        return {
            apartment: {},
            apartments: {},
            is_loading: false,
        }
    },

    created() {
        this.getSingleApartment(),
            this.getApartments()
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
                this.$router.push('/not-found-page')
            }).then(() => {
                this.is_loading = false;
            });
        },
        destroy(id) {
            axios.delete(`http://127.0.0.1:8000/api/apartments/${id}`).then(res => {
                this.$router.push('/apartments')
            })
        }
    },
}

</script>


<template>
    <AppLoader v-if="is_loading" />

    <div class="container">
        <div class="mt-4">
            <h6>{{ apartment.title }}</h6>
        </div>

        <div class="mb-3 d-flex align-items-center justify-content-between">
            <div>
                <span>{{ apartment.address }}</span>
            </div>

            <div class="material-google">

                <a href="#" class="text-decoration-none text-dark"> Save <i class="material-icons">favorite</i></a><br>
                <a href="#" class="text-decoration-none text-dark">Share <i class="material-icons">ios_share</i></a>

            </div>
        </div>

        <div class="">
            <div class="row">
                <div class="col-md-6 my-img-style-1">
                    <img v-if="apartment.images.length" :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`"
                        alt="Apartment Image" class="img-fluid object-fit-cover" style="height: 436px;" />
                </div>

                <div class="col-md-6 ">
                    <div class="row my-img-style-2">

                        <div class="d-block w-50">
                            <img v-if="apartment.images.length"
                                :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`" alt="Apartment Image"
                                class="img-fluid object-fit-cover" />
                        </div>

                        <div class="d-block  w-50">
                            <img v-if="apartment.images.length"
                                :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`" alt="Apartment Image"
                                class="img-fluid rounded-right object-fit-cover" />
                        </div>

                        <div class="d-block  w-50">
                            <img v-if="apartment.images.length"
                                :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`" alt="Apartment Image"
                                class="img-fluid object-fit-cover" />
                        </div>

                        <div class="d-block w-50">
                            <img v-if="apartment.images.length"
                                :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`" alt="Apartment Image"
                                class="img-fluid object-fit-cover" />
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="mt-5 d-flex justify-content-between align-content-center">

            <div class="col-md-5 ">
                <div class="d-flex justify-content-between">
                    <div>
                        <h6>{{ apartment.title }}</h6>

                        <span>{{ apartment.square_meters }}mq</span>
                    </div>
                </div>
                <hr>


                <div>
                    <span>
                        Camere da letto:
                    </span><br>
                    <span>
                        <b>{{ apartment.beds }}</b>
                    </span>
                </div>
                <div>
                    <span>
                        Camere:
                    </span><br>
                    <span>
                        <b>{{ apartment.rooms }}</b>
                    </span>
                </div>
                <div>
                    <span>
                        Bagni:
                    </span><br>
                    <span>
                        <b>{{ apartment.bathrooms }}</b>
                    </span>
                </div>
                <hr>
            </div>

            <div class="col-6 d-block my-txt-cnt">
                <h4 class="text-end">€185 / night</h4>
                <div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Descrizione</h5>
                            <p class="card-text">{{ apartment.description }}</p>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-danger form-control">Check availability</button>
                    </div>
                </div>
            </div>
        </div>



        <div class="row d-flex justify-content-center">
            <div class="col-3" v-for="ap in apartments" :key="apartment.id" sty>
                <img v-if="apartment.images.length" :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`"
                    alt="Apartment Image" class="img-fluid object-fit-cover" />
                <div>
                    {{ ap.title }}

                </div>
                <div>
                    {{ ap.description }}
                </div>
                <div>

                    <p>150/night</p>
                </div>
            </div>




        </div>

    </div>
</template>





<style lang="scss" scoped>
.col-6 {


    img {
        width: 100%;
        border-radius: 20px;
    }

    &:hover {
        img {
            filter: brightness(50%);
            transition: 1s;
        }
    }

    ul {
        list-style-type: none;

        // h2{
        //     border-bottom: 1px solid rgb(158, 152, 152);
        //     box-shadow: 5px 5px;
        // }
    }

}


.my-img-style-1 img {
    height: 436px;
    width: px;
    padding: px;
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


.material-google i {
    font-size: 16px;
}
</style>

