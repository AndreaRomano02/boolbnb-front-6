<script>
import axios from 'axios';

export default {
    name: 'SingleApartment',


    data() {

        return {
            apartment: '',

        }
    },

    created() {
        this.getSingleApartment()
    },

    methods: {
        getSingleApartment() {
            axios.get(`http://127.0.0.1:8000/api/apartments/`).then((response) => {
                if (response.data.success) {
                    this.apartment = response.data.apartment
                } else {
                    this.$router.push({ name: 'not-found' });
                }

            });


        }
    },
}

</script>


<template lang="">


    
    <div class='container py-3' v-else>

        <div class='row'>
            <div class="col-6">
                <img :src="`${store.apartmentsUrl}/storage/${apartment.cover_img}`" class="img-fluid " :alt="apartment.title"/>
            </div>
            <div class="col-6">
                <ul>
                    <li class='pb-3'><h2>{{ apartment.title}}</h2></li>
                    <li><strong>Numero stanze:</strong> {{apartment.rooms}}</li>
                    <li><strong>Numero letti:</strong> {{apartment.beds}}</li>
                    <li><strong>Numero bagni:</strong> {{apartment.bathrooms}}</li>
                    <li><strong>Indirizzo:</strong> {{apartment.address}}</li>
                    <li><strong>Descrizione:</strong> {{apartment.description}}</li>
                    <li><strong>Dimensione dell'appartamento:</strong> {{apartment.square_meters}} metri quadrati</li>
                </ul>
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
</style>