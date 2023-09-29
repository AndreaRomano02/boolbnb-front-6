<script>
import axios from 'axios';
const endpoint = 'http://localhost:8000/api/apartments';
import AppLoader from '../components/AppLoader.vue';
import ApartmentList from '../components/apartments/ApartmentList.vue';
import ApartmentCard from '../components/apartments/ApartmentCard.vue';
export default {
    name: 'HomePage',
    components: { ApartmentList, AppLoader, ApartmentCard },

    data: () => ({
        apartments: [],
        isLoading: false
    }),

    methods: {
        fetchApartments() {
            this.isLoading = true;
            axios.get(endpoint).then(res => { this.apartment = res.data })
                .catch(err => { console.error(err) })
                .then(() => { this.isLoading = false })
        }
    },

    created() {
        this.fetchApartments();
    }
};
</script>

<template>
    <main class="container my-3">
        <AppLoader v-if="isLoading" />
        <div v-else>
            <ApartmentList />
        </div>
    </main>
</template>

<style></style>