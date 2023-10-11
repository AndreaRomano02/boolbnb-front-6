<script>
import ApartmentCard from './ApartmentCard.vue';


export default {
    name: "ApartmentList",
    components:
        { ApartmentCard },
    props: {
        apartments: Object,
    },
};
</script>


<template>
    <div class="container">
        <div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
            <div class="mt-5 col-auto" v-for="apartment in apartments">
                <ApartmentCard :apartment="apartment" :key="apartment.id" />
            </div>
        </div>
    </div>
</template>
  


<style lang="scss" scoped></style>