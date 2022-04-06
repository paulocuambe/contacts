<script setup>
import { computed } from "@vue/runtime-core";
import { RouterLink } from "vue-router";

const props = defineProps({
  contact: {
    type: Object,
    required: true,
  },
});

const fullName = computed(
  () => props.contact.firstName + " " + props.contact.lastName
);
</script>

<template>
  <div>
    <span>{{ fullName }}</span> -
    <RouterLink :to="{ name: 'contact.update', params: { id: contact.id } }">
      Update
    </RouterLink>
    -
    <RouterLink :to="{ name: 'contact.details', params: { id: contact.id } }">
      Details
    </RouterLink>
  </div>
</template>
