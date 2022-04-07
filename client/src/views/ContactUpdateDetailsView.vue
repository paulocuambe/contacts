<script setup>
import { reactive, ref } from "@vue/reactivity";
import { computed, onBeforeMount } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useContactStore } from "../stores/contact";

const id = ref(useRoute().params.id);
const store = useContactStore();

const form = reactive({
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
});

const updateErrors = reactive({
  firstName: computed(() => store.saveContactErrors.firstName),
  lastName: computed(() => store.saveContactErrors.lastName),
  email: computed(() => store.saveContactErrors.email),
  phoneNumber: computed(() => store.saveContactErrors.phoneNumber),
});

const loadingUpdateState = computed(() => store.savingContactState);
const isUpdating = computed(() => loadingUpdateState.value === "loading");

const loadingContactState = ref("loading");
const loadContactError = ref({});

const currentStateContact = ref({});
onBeforeMount(async () => {
  const fetchContact = await fetch(`/api/contacts/${id.value}`);

  if (fetchContact.status !== 200) {
    loadContactError.value = await fetchContact.json();
    loadingContactState.value = "error";
  } else {
    currentStateContact.value = await fetchContact.json();

    form.firstName = currentStateContact.value.firstName;
    form.lastName = currentStateContact.value.lastName;
    form.email = currentStateContact.value.email;
    form.phoneNumber = currentStateContact.value.phoneNumber;

    loadingContactState.value = "success";
  }
});

const handleSubmit = async () => {
  store.updateContact(parseInt(id.value), form);
};

const resetForm = () => {
  form.firstName = currentStateContact.value.firstName;
  form.lastName = currentStateContact.value.lastName;
  form.email = currentStateContact.value.email;
  form.phoneNumber = currentStateContact.value.phoneNumber;
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
        class="error-message"
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
        class="error-message"
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
        class="error-message"
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
        class="error-message"
        v-for="(err, index) in updateErrors.phoneNumber"
        :key="index"
      >
        {{ err }}
      </p>
    </div>

    <button type="submit" :disabled="isUpdating">Update</button>
    <button type="button" @click="resetForm">Discard changes</button>
  </form>
  <div v-if="isUpdating">Updating...</div>
</template>
