<script setup>
import ContactDetails from "../components/ContactDetails.vue";
import LogDetailsTable from "../components/LogDetailsTable.vue";

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
  <div class="mx-4 md:mx-0 mt-10">
    <div v-if="loadingContactState === 'loading'">Loading contact info...</div>
    <div v-else-if="loadingContactState === 'error'">
      Error: {{ error.message }}
    </div>
    <div v-else>
      <div>
        <h2 class="text-gray-600">Contact details</h2>
        <contact-details class="mt-4" :contact="contact"></contact-details>
      </div>
      <div>
        <div v-if="loadingLogState === 'loading'">Loading logs...</div>
        <div v-else-if="loadingLogState === 'error'">
          Error: {{ logError.message }}
        </div>

        <div class="mt-10" v-else>
          <h2 class="text-xl text-bold text-gray-700 mb-4">Action logs</h2>
          <log-details-table :logs="logs"></log-details-table>
        </div>
      </div>
    </div>
  </div>
</template>
