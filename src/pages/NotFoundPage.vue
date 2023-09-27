<script>
export default {
  name: 'NotFoundPage',
};
</script>

<template>
  <div class="vh-100 bg-dark flex-column  d-flex align-items-center  justify-content-center ">
    <h3 class="text-white">404 | Page not found</h3>
    <button class="btn-btn-secondary" @click="$router.push({ name: 'home' })">Torna alla home</button>
  </div>
</template>

<style scoped></style>