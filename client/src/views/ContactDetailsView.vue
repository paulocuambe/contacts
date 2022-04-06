<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const id = ref(useRoute().params.id);
const loadingContactState = ref("loading");
const contact = ref({});
const error = ref({});

const loadingLogState = ref("loading");
const logs = ref([]);
const logError = ref({});

onBeforeMount(async () => {
  const contactRequest = await fetch(`/api/contacts/${id.value}`);
  if (contactRequest.status != 200) {
    error.value = await contactRequest.json();
    loadingContactState.value = "error";
  } else {
    contact.value = await contactRequest.json();
    loadingContactState.value = "success";
  }

  if (loadingContactState.value === "success") {
    const logRequest = await fetch(`/api/contacts/${id.value}/logs`);

    if (logRequest.status != 200) {
      logError.value = await logRequest.json();
      loadingLogState.value = "error";
    } else {
      logs.value = await logRequest.json();
      loadingLogState.value = "success";
    }
  }
});
</script>
<template>
  <div v-if="loadingContactState === 'loading'">Loading contact info...</div>
  <div v-else-if="loadingContactState === 'error'">
    Error: {{ error.message }}
  </div>
  <div v-else>
    <div>
      <h1>Contact details</h1>
      <p>Name: {{ contact.firstName }} {{ contact.firstName }}</p>
      <p>Email: {{ contact.email }}</p>
      <p>Phone number: {{ contact.phoneNumber }}</p>
      <p>Updated At: {{ contact.updated_at }}</p>
      <p>Created At: {{ contact.created_at }}</p>
    </div>

    <div>
      <div v-if="loadingLogState === 'loading'">Loading logs...</div>
      <div v-else-if="loadingLogState === 'error'">
        Error: {{ logError.message }}
      </div>
      <div v-else-if="logs.length === 0">
        <h2>This contacts has no logs</h2>
      </div>
      <ul v-else>
        <li v-for="log in logs" :key="log.id">
          {{ log.log_type }} - {{ log.description }}
        </li>
      </ul>
    </div>
  </div>
</template>
