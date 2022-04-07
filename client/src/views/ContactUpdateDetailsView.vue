<script setup>
import { reactive, ref } from "@vue/reactivity";
import { computed, onBeforeMount } from "@vue/runtime-core";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { useContactStore } from "../stores/contact";

document.title = "Update contact information";

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
  message: computed(() => store.saveContactErrors.message),
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

onBeforeRouteLeave(() => {
  store.resetSaveContactState();
});
</script>

<template>
  <div class="mx-4 md:mx-0 mt-10">
    <h2 class="text-black font-bold text-2xl">Update contact information</h2>
    <div v-if="loadingContactState === 'loading'">Loading form...</div>
    <div class="error-message" v-if="loadingContactState === 'error'">
      {{ loadContactError.message }}
    </div>
    <div class="error-message" v-if="updateErrors.message">
      {{ updateErrors.message }}
    </div>
    <form
      v-if="loadingContactState !== 'error'"
      @submit.prevent="handleSubmit"
      class="mt-4 lg:w-2/3 xl:w-1/2"
    >
      <div class="md:mb-4 md:flex md:gap-4">
        <div class="w-full mb-4 md:mb-0">
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

        <div class="w-full mb-4 md:mb-0">
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
      </div>

      <div class="md:mb-4 md:flex md:gap-4">
        <div class="w-full mb-4 md:mb-0">
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
        <div class="w-full mb-4 md:mb-0">
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
      </div>

      <div class="flex gap-4">
        <button type="submit" class="btn-primary" :disabled="isUpdating">Update</button>
        <button type="button" class="btn-secondary" @click="resetForm">Discard changes</button>
      </div>
    </form>
    <div v-if="isUpdating">Updating...</div>
  </div>
</template>
