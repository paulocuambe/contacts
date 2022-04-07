<script setup>
import ContactItem from "./ContactItem.vue";

defineEmits(["deleteItem"]);

defineProps({
  contactsList: {
    type: Array,
  },
});
</script>
<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    <contact-item
      v-for="contact in contactsList"
      :key="contact.id"
      :contact="contact"
      @delete="$emit('deleteItem', contact.id)"
    ></contact-item>
  </div>
</template>
