<script>
export default {
}
</script>
 
<template>
    <div class="overlay">
        <div class="spinner-border text-primary fs-1" role="status">
        </div>
    </div>
</template>
 
<style scoped>
.spinner-border {
    width: 150px;
    height: 150px;
}

.overlay {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>