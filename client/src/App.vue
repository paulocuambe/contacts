<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="container mx-auto">
    <nav class="flex justify-between">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink :to="{ name: 'contacts.new' }">Add a new contact</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style></style>
