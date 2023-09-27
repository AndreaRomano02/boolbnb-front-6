<script>
import axios from 'axios';

export default {
    name: "ApartmentCard",
    props: {
        apartment: Object,
    },
    emits: ['deleted'],
    methods: {
        destroy(id) {
            axios.delete(`http://127.0.0.1:8000/api/apartments/${id}`).then(res => {
                this.$emit('deleted')
            })
        }
    }
};
</script>

<template>
    <div class="card">
        <img class="card-img-top" :src="`http://127.0.0.1:8000/storage/${this.apartment.images[0].path}`" />
        <div class="card-body">
            <h5 class="card-title">{{ apartment.title }}</h5>
            <p class="card-text">{{ apartment.description }}</p>
            <router-link class="btn btn-sm btn-primary"
                :to="{ name: 'SingleApartment', params: { id: apartment.id } }">Guarda il
                progetto</router-link>
            <form @submit.prevent="destroy(apartment.id)">
                <button class="btn btn-danger">Elimina</button>
            </form>
        </div>
    </div>
</template>
  


<style></style>