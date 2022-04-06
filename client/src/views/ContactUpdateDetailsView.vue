<script setup>
import { reactive, ref } from "@vue/reactivity";
import { computed, onBeforeMount } from "@vue/runtime-core";
import { useRoute } from "vue-router";

const id = ref(useRoute().params.id);
const contacts = ref({});
const errorResponse = ref({});
const loadingUpdateState = ref("idle");
const loadingContactState = ref("loading");
const isUpdating = computed(() => loadingUpdateState.value === "loading");
const updatedContact = ref({});
const loadContactError = ref({});

const form = reactive({
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
});

const updateErrors = reactive({
  firstName: [],
  lastName: [],
  email: [],
  phoneNumber: [],
});

onBeforeMount(async () => {
  const fetchContact = await fetch(`/api/contacts/${id.value}`);

  if (fetchContact.status !== 200) {
    loadContactError.value = await fetchContact.json();
    loadingContactState.value = "error";
  } else {
    contacts.value = await fetchContact.json();

    form.firstName = contacts.value.firstName;
    form.lastName = contacts.value.lastName;
    form.email = contacts.value.email;
    form.phoneNumber = contacts.value.phoneNumber;

    loadingContactState.value = "success";
  }
});

const handleSubmit = async () => {
  updateErrors.firstName = [];
  updateErrors.lastName = [];
  updateErrors.email = [];
  updateErrors.phoneNumber = [];

  errorResponse.value = {};

  loadingUpdateState.value = "loading";
  const saveRequest = await fetch(`/api/contacts/${id.value}`, {
    body: JSON.stringify(form),
    headers: {
      "Content-type": "application/json",
    },
    method: "PATCH",
  });

  if (saveRequest.status !== 200) {
    errorResponse.value = await saveRequest.json();

    if (saveRequest.status === 400) {
      for (let err of errorResponse.value.message) {
        if (err.includes("firstName")) {
          updateErrors.firstName.push(err.replace("firstName", "This field"));
        } else if (err.includes("lastName")) {
          updateErrors.lastName.push(err.replace("lastName", "This field"));
        } else if (err.includes("email")) {
          updateErrors.email.push(err.replace("email", "This field"));
        } else if (err.includes("phoneNumber")) {
          updateErrors.phoneNumber.push(
            err.replace("phoneNumber", "This field")
          );
        }
      }
    }

    loadingUpdateState.value = "error";
  } else {
    updatedContact.value = await saveRequest.json();
    loadingUpdateState.value = "success";
  }
};

const resetForm = () => {
  form.firstName = contacts.value.firstName;
  form.lastName = contacts.value.lastName;
  form.email = contacts.value.email;
  form.phoneNumber = contacts.value.phoneNumber;
};
</script>

<template>
  <h1>Update Contact</h1>
  <div v-if="loadingContactState === 'loading'">Loading form...</div>
  <div v-if="loadingContactState === 'error'">
    {{ loadContactError.message }}
  </div>
  <form v-else @submit.prevent="handleSubmit">
    <div>
      <label for="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        required
        :disabled="isUpdating"
        placeholder="Paulo"
        v-model="form.firstName"
      />
      <p
        style="color: red"
        v-for="(err, index) in updateErrors.firstName"
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
        :disabled="isUpdating"
        placeholder="Cuambe"
        v-model="form.lastName"
      />
      <p
        style="color: red"
        v-for="(err, index) in updateErrors.lastName"
        :key="index"
      >
        {{ err }}
      </p>
    </div>

    <div>
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        required
        :disabled="isUpdating"
        placeholder="p@gosenx.com"
        v-model="form.email"
      />
      <p
        style="color: red"
        v-for="(err, index) in updateErrors.email"
        :key="index"
      >
        {{ err }}
      </p>
    </div>

    <div>
      <label for="phoneNumber">Phone Number</label>
      <input
        type="tel"
        id="phoneNumber"
        required
        :disabled="isUpdating"
        placeholder="+258849388793"
        v-model="form.phoneNumber"
      />
      <p
        style="color: red"
        v-for="(err, index) in updateErrors.phoneNumber"
        :key="index"
      >
        {{ err }}
      </p>
    </div>

    <button type="submit" :disabled="isUpdating">Update</button>
    <button @click="resetForm">Discard changes</button>
  </form>
  <div v-if="isUpdating">Updating...</div>
</template>
