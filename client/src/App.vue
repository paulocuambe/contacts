<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="my-10">
    <header class="container mx-auto">
      <nav class="flex justify-between">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink :to="{ name: 'contacts.new' }">
          Add a new contact
        </RouterLink>
      </nav>
    </header>
    <main class="container mx-auto">
      <RouterView />
    </main>
  </div>
</template>

<style></style>
