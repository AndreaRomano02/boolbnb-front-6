<script>


export default {
    name: "ApartmentCard",

    props: ['apartment'],
    data() {

    },
    methods: {

    },
    beforeMount() {

    },
};
</script>


<template>
    <div class="card ">
        <img class="card-img-top" :src="apartment.image" />
        <div class="card-body">
            <h5 class="card-title">{{ apartment.title }}</h5>
            <p class="card-text">{{ apartment.description }}</p>
            <router-link class="btn btn-sm btn-primary" :to="{ name: 'SingleApartment', params: { id: apartment.id } }">Guarda il
                progetto</router-link>
        </div>
    </div>
</template>
  


<style></style>