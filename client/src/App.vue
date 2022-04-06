<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Contacts</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style></style>
