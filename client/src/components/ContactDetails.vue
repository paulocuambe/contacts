<script setup>
import IcBaselineCall from "./IcBaselineCall.vue";
import IcBaselineMailOutline from "./IcBaselineMailOutline.vue";
import IcCalendarEdit from "./IcCalendarEdit.vue";
import IcCalendarDate from "./IcCalendarDate.vue";
import { computed } from "vue-demi";
import formatDate from "../utils/dates";

const props = defineProps({
  contact: {
    type: Object,
    required: true,
  },
});

const fullName = computed(
  () => `${props.contact.firstName} ${props.contact.lastName}`
);
</script>

<template>
  <div>
    <h1 class="text-3xl">
      {{ fullName }}
      <span class="badge" v-if="contact.deleted">Deleted</span>
    </h1>
    <div class="mt-4 flex gap-4 flex-wrap">
      <p class="contact-method">
        <ic-baseline-call
          class="text-gray-600"
          size="1.5rem"
        ></ic-baseline-call>
        <a :href="'tel:' + contact.phoneNumber">
          {{ contact.phoneNumber }}
        </a>
      </p>
      <p class="contact-method">
        <ic-baseline-mail-outline
          class="text-gray-600"
          size="1.5rem"
        ></ic-baseline-mail-outline>
        <a :href="'mailto:' + contact.email">
          {{ contact.email }}
        </a>
      </p>
      <p class="contact-method">
        <ic-calendar-edit
          class="text-gray-600"
          size="1.5rem"
        ></ic-calendar-edit>
        <span>{{ formatDate(contact.updated_at) }}</span>
      </p>
      <p class="contact-method">
        <ic-calendar-date
          class="text-gray-600"
          size="1.5rem"
        ></ic-calendar-date>
        <span>{{ formatDate(contact.created_at) }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.contact-method {
  @apply flex items-center gap-3;
}
</style>
