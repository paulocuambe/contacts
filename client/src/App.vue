<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Contacts</RouterLink>
      <RouterLink :to="{ name: 'contacts.new' }">Add a new contact</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style></style>
