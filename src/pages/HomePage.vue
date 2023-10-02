<script>
import axios from 'axios';
const endpoint = 'http://localhost:8000/api/apartments';
import AppLoader from '../components/AppLoader.vue';
import ApartmentList from '../components/apartments/ApartmentList.vue';
import ApartmentCard from '../components/apartments/ApartmentCard.vue';
import AppHero from '../components/AppHero.vue';
export default {
    name: 'HomePage',
    components: { AppHero, ApartmentList, AppLoader, ApartmentCard },
    data() {
        return {
            apartments: [],
            isLoading: false,
            isHomePage: true,
        };
    },
    methods: {
        fetchApartments() {
            this.isLoading = true;
            axios
                .get(endpoint)
                .then((res) => {
                    this.apartments = res.data;
                })
                .catch((err) => {
                    console.error(err);
                })
                .then(() => {
                    this.isLoading = false;
                });
        },
    },
    created() {
        this.fetchApartments();
    },
};
</script>


<template>
    <main>
        <AppHero v-if="isHomePage" />
        <AppLoader v-if="isLoading" />
        <div v-else class="my-5">
            <ApartmentList class="my-5" />
        </div>
    </main>
</template>

<style lang="scss" scoped></style>

  
