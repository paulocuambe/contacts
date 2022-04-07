<script setup>
import { reactive } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { onBeforeRouteLeave } from "vue-router";
import { useContactStore } from "../stores/contact";

document.title = "Add contact";

const store = useContactStore();

const form = reactive({
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
});

const error = reactive({
  firstName: computed(() => store.saveContactErrors.firstName),
  lastName: computed(() => store.saveContactErrors.lastName),
  email: computed(() => store.saveContactErrors.email),
  phoneNumber: computed(() => store.saveContactErrors.phoneNumber),
  message: computed(() => store.saveContactErrors.message),
});

const loadingState = computed(() => store.savingContactState);
const isLoading = computed(() => loadingState.value === "loading");

watch(loadingState, (newValue) => {
  if (newValue === "success") {
    form.firstName = null;
    form.lastName = null;
    form.email = null;
    form.phoneNumber = null;
  }
});

const handleSubmit = async () => {
  store.saveContact(form);
};

onBeforeRouteLeave(() => {
  store.resetSaveContactState();
});
</script>

<template>
  <div class="mx-4 md:mx-0 mt-10">
    <h2 class="text-black font-bold text-2xl">
      Add a new contact to your list
    </h2>
    <div class="error-message" v-if="error.message">{{ error.message }}</div>
    <form @submit.prevent="handleSubmit" class="mt-4 lg:w-2/3 xl:w-1/2">
      <div class="md:mb-4 md:flex md:gap-4">
        <div class="w-full mb-4 md:mb-0">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            required
            :disabled="isLoading"
            placeholder="Paulo"
            v-model="form.firstName"
          />
          <p
            class="error-message"
            v-for="(err, index) in error.firstName"
            :key="index"
          >
            {{ err }}
          </p>
        </div>
        <div class="w-full mb-4 md:mb-0">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            required
            :disabled="isLoading"
            placeholder="Cuambe"
            v-model="form.lastName"
          />
          <p
            class="error-message"
            v-for="(err, index) in error.lastName"
            :key="index"
          >
            {{ err }}
          </p>
        </div>
      </div>
      <div class="md:mb-4 md:flex md:gap-4">
        <div class="w-full mb-4 md:mb-0">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            required
            :disabled="isLoading"
            placeholder="p@gosenx.com"
            v-model="form.email"
          />
          <p
            class="error-message"
            v-for="(err, index) in error.email"
            :key="index"
          >
            {{ err }}
          </p>
        </div>
        <div class="w-full mb-4 md:mb-0">
          <label for="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            required
            :disabled="isLoading"
            placeholder="+258849388793"
            v-model="form.phoneNumber"
          />
          <p
            class="error-message"
            v-for="(err, index) in error.phoneNumber"
            :key="index"
          >
            {{ err }}
          </p>
        </div>
      </div>
      <button type="submit" :disabled="isLoading">Add new contact</button>
    </form>
    <div v-if="isLoading">Saving...</div>
  </div>
</template>
