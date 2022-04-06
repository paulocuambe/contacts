<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Contacts</RouterLink>
      <RouterLink :to="{ name: 'contacts.new' }">Contacts</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style></style>
