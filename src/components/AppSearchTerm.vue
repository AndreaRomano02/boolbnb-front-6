<script>
export default {
    name: 'AppSearchTerm',
    data() {
        return {
            searchTerm: '',
        }
    },
    emits: ['term-change', 'form-submit']
};
</script>

<template>
    <form @submit.prevent="$emit('form-submit')">
        <div class="searchbar input-group mb-3 pb-5 ps-5">
            <input type="text" v-model.trim="searchTerm" class="form-control" placeholder="Cerca una destinazione"
                aria-describedby="button-addon2" @keyup="$emit('term-change', searchTerm)">
            <button class="d-flex align-items-center" type="submit" id="button-addon2"><i
                    class="material-icons fs-5 px-4">search</i></button>
        </div>
    </form>
</template>


<style lang="scss" scoped>
@use '../scss/vars' as *;
@use '../scss/fonts' as *;

.searchbar {
    width: 45%;

    input {
        border-radius: 30px;
    }

    button {
        background-color: $white;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        border: none;
        transition: background-color 0.2s;

        i {
            color: $black;
        }

        &:hover {
            background-color: #000;

            i {
                color: $white;
            }
        }
    }

}



input:focus {
    outline-style: none;
    box-shadow: none;
    border-right-color: rgba($black, 0.3);
    box-shadow: -5px 25px 25px rgba(0, 0, 0, 0.7);
}
</style>