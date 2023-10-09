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
    <div v-else class="container-fluid px-5 my-5">
        <div class="wrapper px-4">
            <div class="row ">
                <div class="col-3 mb-5" v-for="apartment in apartments">
                    <ApartmentCard :apartment="apartment" :key="apartment.id" />
                </div>

            </div>
        </div>
    </div>
</template>
  


<style lang="scss" scoped></style>