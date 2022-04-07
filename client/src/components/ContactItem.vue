<script setup>
import IcBaselineCall from "./IcBaselineCall.vue";
import IcBaselineMailOutline from "./IcBaselineMailOutline.vue";

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
  <div class="contact-item flex flex-col justify-between">
    <section class="p-6 pb-0">
      <h2 class="text-2xl font-bold">{{ fullName }}</h2>
      <div class="mt-4 flex justify-between gap-2 flex-wrap">
        <p class="contact-method">
          <ic-baseline-call
            class="text-gray-600"
            size="1.5rem"
          ></ic-baseline-call>
          <a :href="'tel:' + contact.phoneNumber" class="text-lg">
            {{ contact.phoneNumber }}
          </a>
        </p>
        <p class="contact-method">
          <ic-baseline-mail-outline
            class="text-gray-600"
            size="1.5rem"
          ></ic-baseline-mail-outline>
          <a :href="'mailto:' + contact.email" class="text-lg">
            {{ contact.email }}
          </a>
        </p>
      </div>
    </section>

    <section class="contact-actions p-6">
      <RouterLink
        class="secondary-link"
        :to="{ name: 'contact.update', params: { id: contact.id } }"
      >
        Update
      </RouterLink>

      <RouterLink
        class="secondary-link"
        :to="{ name: 'contact.details', params: { id: contact.id } }"
      >
        More Details
      </RouterLink>

      <button
        class="btn-dangerous"
        :disabled="deletingState === 'loading'"
        @click="$emit('delete')"
      >
        {{ deleteText }}
      </button>
    </section>
    <span v-if="deletingState === 'error'">
      Error: {{ deleteContactError.message }}
    </span>
  </div>
</template>

<style scoped>
.contact-item {
  @apply shadow-lg rounded-lg border;
}

.contact-method {
  @apply flex items-center gap-3;
}

.contact-actions {
  @apply bg-gray-100 mt-4 flex items-center gap-4;
}
</style>
