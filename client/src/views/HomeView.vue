<script setup>
import ContactItemList from "../components/ContactItemList.vue";
import { computed, reactive } from "@vue/runtime-core";
import { useContactStore } from "../stores/contact";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";

document.title = "Contacts App";

const store = useContactStore();

const route = useRoute();
const router = useRouter();

store.fetchContacts(route.query);

const form = reactive({ q: null, deleted: null });

const contacts = computed(() => store.contacts);
const loadingState = computed(() => store.fetchContactsState);
const error = computed(() => store.fetchContactError);

const search = () => {
  store.fetchContacts({ ...form });
  router.push({
    name: "home",
    query: { ...form },
  });
};

const deleteItem = async (id) => {
  store.deleteContact(id);
};

onBeforeRouteLeave(() => {
  store.resetDeleteAndFetchState();
});
</script>

<template>
  <div class="mx-4 md:mx-0 mt-10">
    <div class="mb-16">
      <form @submit.prevent="search" class="mx-auto md:w-2/3 lg:w-2/5">
        <h2 class="text-center text-3xl font-bold mb-4">Filter</h2>
        <div class="w-full">
          <input
            v-model="form.q"
            type="text"
            id="query"
            placeholder="eg:. paulo, 4322, p@g.com"
          />
        </div>
        <div class="mt-4 flex flex-col gap-2 items-center">
          <label class="flex gap-2 items-center" for="deleted">
            <input v-model="form.deleted" type="checkbox" id="deleted" />
            <span>Only deleted contacts</span>
          </label>
          <button type="submit" class="h-full btn-primary">
            Search contacts
          </button>
        </div>
      </form>
    </div>

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
