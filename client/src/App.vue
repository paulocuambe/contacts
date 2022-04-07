<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="my-10">
    <header class="container mx-auto">
      <nav class="flex flex-wrap gap-4">
        <RouterLink class="text-lg" to="/">Home</RouterLink>
        <RouterLink class="secondary-link" :to="{ name: 'contacts.new' }">
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
