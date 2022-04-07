<script setup>
import { computed } from "@vue/runtime-core";
import { RouterLink } from "vue-router";
import { useContactStore } from "../stores/contact";

const props = defineProps({
  contact: {
    type: Object,
    required: true,
  },
});

defineEmits(["delete"]);

const store = useContactStore();
const deletingState = computed(() => {
  if (store.deleteContactId === props.contact.id) {
    return store.deletingContactsState;
  }
});

const deleteContactError = computed(() => {
  if (store.deleteContactId === props.contact.id) {
    return store.deleteContactError;
  }
});

const deleteText = computed(() =>
  deletingState.value === "loading" ? "Deleting..." : "Delete"
);

const fullName = computed(
  () => props.contact.firstName + " " + props.contact.lastName
);
</script>

<template>
  <div>
    <span>{{ fullName }}</span>
    -
    <RouterLink :to="{ name: 'contact.update', params: { id: contact.id } }">
      Update
    </RouterLink>
    -
    <RouterLink :to="{ name: 'contact.details', params: { id: contact.id } }">
      Details
    </RouterLink>
    -
    <button :disabled="deletingState === 'loading'" @click="$emit('delete')">
      {{ deleteText }}
    </button>
    <span v-if="deletingState === 'error'">
      Error: {{ deleteContactError.message }}
    </span>
  </div>
</template>
