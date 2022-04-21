import { defineStore } from "pinia";

export const useContactStore = defineStore({
  id: "contact",

  state: () => ({
    contacts: [],
    cached: false,
    deleteContactId: "",

    fetchContactsState: "",
    savingContactState: "",
    deletingContactsState: "",
    restoringContactsState: "",

    fetchContactError: {},
    deleteContactError: {},
    restoreContactError: {},
    saveContactErrors: {
      firstName: [],
      lastName: [],
      email: [],
      phoneNumber: [],
    },
  }),

  actions: {
    resetDeleteAndFetchState() {
      this.deleteContactError = {};
      this.deletingContactsState = "";

      this.fetchContactsState = "";
      this.fetchContactError = "";
    },

    async fetchContacts({ q, deleted }) {
      // if (this.cached && !q && !deleted) return;
      console.log("I GET HERE");
      this.fetchContactError = {};

      let query = new URLSearchParams();

      if (q) {
        query.append("q", q);
      }

      if (deleted) {
        query.append("deleted", deleted);
      }

      this.fetchContactsState = "loading";
      let request = await fetch(`/api/contacts?${query.toString()}`);

      if (request.status !== 200) {
        this.fetchContactError = await request.json();
        this.fetchContactsState = "error";
      } else {
        this.contacts = await request.json();
        this.fetchContactsState = "success";
        this.cached = true;
      }
    },

    resetSaveContactState() {
      this.savingContactState = "";
      this.saveContactErrors = {
        firstName: [],
        lastName: [],
        email: [],
        phoneNumber: [],
      };
    },

    async saveContact(contact) {
      this.saveContactErrors = {
        firstName: [],
        lastName: [],
        email: [],
        phoneNumber: [],
      };

      this.savingContactState = "loading";
      const saveRequest = await fetch(`/api/contacts`, {
        body: JSON.stringify(contact),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      });

      let errorResponse = {};
      if (saveRequest.status !== 201) {
        errorResponse = await saveRequest.json();

        if (saveRequest.status === 400) {
          this.saveContactErrors = mappedValidationErrors(
            errorResponse.message
          );
        } else {
          this.saveContactErrors = errorResponse;
        }

        this.savingContactState = "error";
      } else {
        this.contacts.unshift(await saveRequest.json());
        this.savingContactState = "success";
      }
    },

    async updateContact(id, contact) {
      this.saveContactErrors = {
        firstName: [],
        lastName: [],
        email: [],
        phoneNumber: [],
      };

      this.savingContactState = "loading";
      const saveRequest = await fetch(`/api/contacts/${id}`, {
        body: JSON.stringify(contact),
        headers: {
          "Content-type": "application/json",
        },
        method: "PATCH",
      });

      let errorResponse = {};
      if (saveRequest.status !== 200) {
        errorResponse = await saveRequest.json();

        if (saveRequest.status === 400) {
          this.saveContactErrors = mappedValidationErrors(
            errorResponse.message
          );
        } else {
          this.saveContactErrors = errorResponse;
        }

        this.savingContactState = "error";
      } else {
        const updatedContact = await saveRequest.json();
        this.contacts = this.contacts.map((contact) =>
          contact.id !== id ? contact : updatedContact
        );

        this.savingContactState = "success";
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

    async restoreContact(id) {
      this.deleteContactId = id;
      this.restoringContactsState = "loading";

      let request = await fetch(`/api/contacts/${id}/restore`, {
        method: "POST",
      });

      if (request.status === 201) {
        let restoredContact = await request.json();
        this.contacts = this.contacts.map((contact) =>
          contact.id !== id ? contact : restoredContact
        );

        this.restoringContactsState = "success";
      } else {
        this.restoreContactError = await request.json();
        this.restoringContactsState = "error";
      }
    },
  },
});

// Separate validation errors by property
function mappedValidationErrors(message) {
  let contactErrors = {
    firstName: [],
    lastName: [],
    email: [],
    phoneNumber: [],
  };

  let groupError = (error, renameField = true) => {
    if (error.includes("firstName")) {
      error = renameField ? error.replace("firstName", "This field") : error;
      contactErrors.firstName.push(error);
    } else if (error.includes("lastName")) {
      error = renameField ? error.replace("lastName", "This field") : error;
      contactErrors.lastName.push(error);
    } else if (error.includes("email")) {
      error = renameField ? error.replace("email", "This field") : error;
      contactErrors.email.push(error);
    } else if (error.includes("phoneNumber")) {
      error = renameField ? error.replace("phoneNumber", "This field") : error;
      contactErrors.phoneNumber.push(error);
    }
  };

  if (Array.isArray(message)) {
    for (let error of message) {
      groupError(error);
    }
  } else {
    groupError(message, false);
  }

  return contactErrors;
}
