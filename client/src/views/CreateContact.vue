<script setup>
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

const form = reactive({
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
});

const error = reactive({
  firstName: [],
  lastName: [],
  email: [],
  phoneNumber: [],
});

const errorResponse = ref({});

const loadingState = ref("idle");
const isLoading = computed(() => loadingState.value === "loading");

const savedContact = ref({});

const handleSubmit = async () => {
  error.firstName = [];
  error.lastName = [];
  error.email = [];
  error.phoneNumber = [];

  errorResponse.value = {};

  loadingState.value = "loading";
  const saveRequest = await fetch(`/api/contacts`, {
    body: JSON.stringify(form),
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
  });

  if (saveRequest.status !== 200) {
    errorResponse.value = await saveRequest.json();

    if (saveRequest.status === 400) {
      for (let err of errorResponse.value.message) {
        if (err.includes("firstName")) {
          error.firstName.push(err.replace("firstName", "This field"));
        } else if (err.includes("lastName")) {
          error.lastName.push(err.replace("lastName", "This field"));
        } else if (err.includes("email")) {
          error.email.push(err.replace("email", "This field"));
        } else if (err.includes("phoneNumber")) {
          error.phoneNumber.push(err.replace("phoneNumber", "This field"));
        }
      }
    }

    loadingState.value = "error";
  } else {
    savedContact.value = await saveRequest.json();
    loadingState.value = "success";
  }
};
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
