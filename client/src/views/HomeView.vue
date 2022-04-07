<script setup>
import ContactItemList from "../components/ContactItemList.vue";
import { computed } from "@vue/runtime-core";
import { useContactStore } from "../stores/contact";
import { onBeforeRouteLeave } from "vue-router";

document.title = "Contacts App";

const store = useContactStore();
store.fetchContacts();

const contacts = computed(() => store.contacts);
const loadingState = computed(() => store.fetchContactsState);
const error = computed(() => store.fetchContactError);

const deleteItem = async (id) => {
  store.deleteContact(id);
};

onBeforeRouteLeave(() => {
  store.resetDeleteAndFetchState();
});
</script>

<template>
  <div class="mx-4 md:mx-0 mt-10">
    <div v-if="loadingState === 'loading'">Loading contacts...</div>
    <div v-else-if="loadingState === 'error'">Error: {{ error.message }}</div>
    <div v-else-if="contacts.length === 0">
      <h2>
        You have not added any contacts yet.
        <RouterLink :to="{ name: 'contacts.new' }">
          Click here to add friends to your list
        </RouterLink>
      </h2>
    </div>
    <contact-item-list
      v-else
      :contacts-list="contacts"
      @delete-item="deleteItem"
    ></contact-item-list>
  </div>
</template>
