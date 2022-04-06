<script setup>
import ContactItem from "./ContactItem.vue";

defineProps({
  contactsList: {
    type: Array,
  },
});
</script>
<template>
  <div>
    <contact-item
      v-for="contact in contactsList"
      :key="contact.id"
      :contact="contact"
    ></contact-item>
  </div>
</template>
