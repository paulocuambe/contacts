<script setup>
import ContactItemList from "../components/ContactItemList.vue";
import { onBeforeMount } from "@vue/runtime-core";
import { ref } from "vue";

const contacts = ref([]);
onBeforeMount(async () => {
  let request = await fetch("/api/contacts");
  contacts.value = await request.json();
});
</script>

<template>
  <main>
    <h1>Hello there</h1>
    <contact-item-list :contacts-list="contacts"></contact-item-list>
  </main>
</template>
