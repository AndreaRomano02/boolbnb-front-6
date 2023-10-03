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
    <!-- 
    <div class='container py-3' v-else>
        <div class='row'>
            <div class="col-6">
                <img v-if="apartment.images.length" :src="`http://127.0.0.1:8000/storage/${this.apartment.images[0].path}`"
                    class="img-fluid " :alt="apartment.title" />
            </div>
            <div class="col-6">
                <ul>
                    <li class='pb-3'>
                        <h2>{{ apartment.title }}</h2>
                    </li>
                    <li><strong>Numero stanze:</strong> {{ apartment.rooms }}</li>
                    <li><strong>Numero letti:</strong> {{ apartment.beds }}</li>
                    <li><strong>Numero bagni:</strong> {{ apartment.bathrooms }}</li>
                    <li><strong>Indirizzo:</strong> {{ apartment.address }}</li>
                    <li><strong>Descrizione:</strong> {{ apartment.description }}</li>
                    <li><strong>Dimensione dell'appartamento:</strong> {{ apartment.square_meters }} metri quadrati</li>
                </ul>
            </div>
        </div>
        <router-link class="btn btn-sm btn-primary" :to="{ name: 'apartments' }">Torna agli appartamenti</router-link>
    </div>
    -->

    <div class="container">
        <div class="mt-4">
            <h6>{{ apartment.title }}</h6>
        </div>

        <div class="mb-3 d-flex align-items-center justify-content-between">
            <div>
                <span>4.83</span>
                <span>{{ apartment.title }}</span>
                <span>{{ apartment.address }}</span>
            </div>

            <div class="">
                <span>Share</span>
                <span>Save</span>
            </div>
        </div>

        <div class="">
            <div class="row">
                <!-- Left column with a single image -->
                <div class="col-md-6 my-mrg-mob">
                    <img v-if="apartment.images.length" :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`"
                        alt="Apartment Image" class="img-fluid"
                        style="border-top-left-radius: 9px; border-bottom-left-radius: 9px;" />
                </div>


                <!-- Right column with 4 images -->
                <div class="col-md-6 my-mrg-top-30">
                    <div class="row">
                        <!-- Top-left image -->
                        <div class="d-block my-mrg-mob my-img-query" style="flex-basis: 50%;">
                            <img v-if="apartment.images.length"
                                :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`" alt="Apartment Image"
                                class="img-fluid" style="height: 300px; width: 315px; object-fit: cover; " />
                        </div>
                        <!-- Top-right image -->
                        <div class="d-block my-mrg-mob my-img-query" style="flex-basis: 50%;">
                            <img v-if="apartment.images.length"
                                :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`" alt="Apartment Image"
                                class="img-fluid"
                                style="height: 300px; width: 315px; object-fit: cover; border-top-right-radius: 9px;" />
                        </div>
                        <!-- Bottom-left image -->
                        <div class="d-block my-mrg-mob my-img-query" style="flex-basis: 50%;">
                            <img v-if="apartment.images.length"
                                :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`" alt="Apartment Image"
                                class="img-fluid" style="height: 300px; width: 315px; object-fit: cover" />
                        </div>
                        <!-- Bottom-right image -->
                        <div class="d-block my-mrg-mob my-img-query" style="flex-basis: 50%;">
                            <img v-if="apartment.images.length"
                                :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`" alt="Apartment Image"
                                class="img-fluid"
                                style="height: 300px; width: 315px; object-fit: cover; border-bottom-right-radius: 9px;" />
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="mt-5 d-flex justify-content-between align-content-center my-mdquer">

            <div class="col-md-5 my-mrg-mob">
                <h6>{{ apartment.title }}</h6>
                <p><span>3 guest</span><span>1bedroom</span><span>2beds</span><span>1bath</span></p>
                <hr>
                <div>
                    <span>
                        <b>{{ apartment.address }}</b>
                    </span>
                    <p>
                        You'll have the house to yourself
                    </p>
                </div>
                <div>
                    <span>
                        <b>{{ apartment.beds }}</b>
                    </span>
                    <p>
                        You'll have the house to yourself
                    </p>
                </div>
                <div>
                    <span>
                        <b>{{ apartment.rooms }}</b>
                    </span>
                    <p>
                        You'll have the house to yourself
                    </p>
                </div>
                <div>
                    <span>
                        <b>{{ apartment.bathrooms }}</b>
                    </span>
                    <p>
                        You'll have the house to yourself
                    </p>
                </div>
                <hr>
                <div class="mb-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ipsa aliquam et aliquid blanditiis
                    dolores quisquam rerum nostrum, earum eligendi vitae qui, porro commodi nulla, officiis quos natus culpa
                    quibusdam. <a href="">read more</a>
                </div>
            </div>

            <div class="col-md-1 my-mrg-top-30 my-txt-cnt">


                <img v-if="apartment.images.length" :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`"
                    alt="rounded image" class="rounded-circle img-thumbnail" style="height: 90px; width: 90px;" />
            </div>




            <div class="col-6 d-block my-txt-cnt">
                <h6>185 euro/night</h6>
                <div>
                    <button class="btn btn-danger form-control">Check availability</button>
                </div>

                <div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-5 d-flex justify-content-between align-content-center">
            <div class="mb-4">
                <h6>{{ apartment.title }}</h6>
            </div>
            <div>
                <span>1/3 </span>
                <span>prev</span>
                <span><i class="material-icons">navigate_before</i></span>
                <span><i class="material-icons">navigate_next</i></span>
            </div>
        </div>

        <div class="row d-flex justify-content-center">
            <div class="col-3 ddd" v-for="ap in apartments" :key="apartment.id" sty>
                <!--     <img src="https://picsum.photos/seed/picsum/300" alt="Left Image" class="img-fluid">  -->
                <img v-if="apartment.images.length" :src="`http://127.0.0.1:8000/storage/${apartment.images[0].path}`"
                    alt="Apartment Image" class="img-fluid" style="height: 190px; width: 190px; object-fit: cover" />
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


@media only screen and (max-width: 900px) {
    .my-mdquer {

        display: flex;
        flex-direction: column;
        text-align: center
    }

    .my-mrg-mob {
        margin-bottom: 20px;
        margin: auto;
    }



    .my-txt-cnt {
        margin: auto
    }

    .ddd {
        width: 40%;
    }
}


@media only screen and (max-width: 756px) {
    .my-mrg-top-30 {
        margin-top: 40px;
    }
}
</style>