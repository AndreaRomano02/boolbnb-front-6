<script>
import AppHeader from './components/AppHeader.vue';

export default {
  name: "App",
  components: {
    AppHeader,
  },
  data() {
    return {
      isHomePage: Boolean,
    };
  },
};
</script>

<template>
  <AppHeader :is-home-page="isHomePage" />
  <RouterView />
</template>

<style></style>

