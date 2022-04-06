<script setup>
import ContactItemList from "../components/ContactItemList.vue";
import { onBeforeMount } from "@vue/runtime-core";
import { ref } from "vue";

const contacts = ref([]);
const loadingState = ref("loading");
const error = ref({});

onBeforeMount(async () => {
  let request = await fetch("/api/contacts");
  if (request.status != 200) {
    error.value = await request.json();
    loadingState.value = "error";
  } else {
    contacts.value = await request.json();
    loadingState.value = "success";
  }
});
</script>

<template>
  <main>
    <div v-if="loadingState === 'loading'">Loading contacts...</div>
    <div v-else-if="loadingState === 'error'">Error: {{ error.message }}</div>
    <div v-else-if="contacts.length === 0">
      <h2>You have not added any contacts yet. Click here to get started</h2>
    </div>
    <contact-item-list v-else :contacts-list="contacts"></contact-item-list>
  </main>
</template>
