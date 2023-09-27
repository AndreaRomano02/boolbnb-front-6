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
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
</template>
  


<style></style>