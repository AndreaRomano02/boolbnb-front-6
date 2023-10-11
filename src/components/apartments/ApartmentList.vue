<script>
import ApartmentCard from './ApartmentCard.vue';


export default {
    name: "ApartmentList",
    components:
        { ApartmentCard },
    props: {
        apartments: Object,
    },
    data() {
        return {
            is_loading: false,
        };
    },
};
</script>


<template>
    <AppLoader v-if="is_loading" />
    <div v-else class="d-flex gap-4 w-100 flex-wrap mobile-container mrg-t ">
        <div class="d-flex justify-content-center flex-grow-1 mt-5" v-for="apartment in apartments">
            <ApartmentCard :apartment="apartment" :key="apartment.id" />
        </div>
    </div>
</template>
  


<style lang="scss" scoped>
.mobile-container {
    max-width: 1517px;
    margin: 0 auto;
}


.mrg-t {
    margin-top: 30px;
}
</style>