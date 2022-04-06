<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const router = useRoute();
const id = ref(router.params.id);
</script>
<template>
  <h1>Ohhh, my details {{ id }}</h1>
</template>
