<script setup>
import { reactive } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { onBeforeRouteLeave } from "vue-router";
import { useContactStore } from "../stores/contact";

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
  <h1>Add a new contact to your list</h1>
  <form @submit.prevent="handleSubmit">
    <div>
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
        style="color: red"
        v-for="(err, index) in error.firstName"
        :key="index"
      >
        {{ err }}
      </p>
    </div>

    <div>
      <label for="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        required
        :disabled="isLoading"
        placeholder="Cuambe"
        v-model="form.lastName"
      />
      <p style="color: red" v-for="(err, index) in error.lastName" :key="index">
        {{ err }}
      </p>
    </div>

    <div>
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        required
        :disabled="isLoading"
        placeholder="p@gosenx.com"
        v-model="form.email"
      />
      <p style="color: red" v-for="(err, index) in error.email" :key="index">
        {{ err }}
      </p>
    </div>

    <div>
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
        style="color: red"
        v-for="(err, index) in error.phoneNumber"
        :key="index"
      >
        {{ err }}
      </p>
    </div>

    <button type="submit" :disabled="isLoading">Add new contact</button>
  </form>
  <div v-if="isLoading">Saving...</div>
</template>
