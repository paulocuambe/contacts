import { defineStore } from "pinia";

export const useContactStore = defineStore({
  id: "contact",

  state: () => ({
    contacts: [],
    cached: false,
    deleteContactId: "",
    fetchContactsState: "",
    deletingContactsState: "",
    fetchContactError: {},
    deleteContactError: {},
  }),

  actions: {
    emptCache() {
      this.cached = false;
    },

    async fetchContacts() {
      if (this.cached) return;
      this.fetchContactError = {};

      this.fetchContactsState = "loading";
      let request = await fetch("/api/contacts");

      if (request.status != 200) {
        this.error = await request.json();
        this.fetchContactError = "error";
      } else {
        this.contacts = await request.json();
        this.fetchContactsState = "success";
        this.cached = true;
      }
    },

    async deleteContact(id) {
      this.deleteContactId = id;
      this.deletingContactsState = "loading";

      let request = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });

      if (request.status === 200) {
        this.contacts = this.contacts.filter((contact) => contact.id !== id);
        setTimeout(() => {
          this.deletingContactsState = "successs";
        }, 1000);
      } else {
        this.deleteContactError = await request.json();
        this.deletingContactsState = "error";
      }
    },
  },
});
