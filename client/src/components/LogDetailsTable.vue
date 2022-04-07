<script setup>
import formatDate from "../utils/dates";

defineProps({
  logs: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div v-if="logs.length === 0">No logs to show.</div>
  <div class="overflow-x-auto shadow-lg sm:rounded-lg">
    <table class="w-full text-left">
      <thead class="text-gray-700 font-bold uppercase bg-gray-100">
        <tr>
          <th scope="col" class="px-6 py-3">#Id</th>
          <th scope="col" class="px-6 py-3">Action</th>
          <th scope="col" class="px-6 py-3">Description</th>
          <th scope="col" class="px-6 py-3">First name</th>
          <th scope="col" class="px-6 py-3">Last name</th>
          <th scope="col" class="px-6 py-3">Email</th>
          <th scope="col" class="px-6 py-3">Phone number</th>
          <th scope="col" class="px-6 py-3">Created at</th>
          <th scope="col" class="px-6 py-3">Updated at</th>
          <th scope="col" class="px-6 py-3">Generated on</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b" v-for="log in logs" :key="log.id">
          <td class="px-6 py-4">{{ log.id }}</td>
          <td class="px-6 py-4">
            <span
              :class="{
                'badge-primary': log.log_type === 'update',
                'badge-danger': log.log_type === 'delete',
                badge: log.log_type === 'create',
              }"
            >
              {{ log.log_type }}
            </span>
          </td>
          <td class="px-6 py-4">{{ log.description }}</td>
          <td class="px-6 py-4">{{ log.firstName }}</td>
          <td class="px-6 py-4">{{ log.lastName }}</td>
          <td class="px-6 py-4">{{ log.email }}</td>
          <td class="px-6 py-4">{{ log.phoneNumber }}</td>
          <td class="px-6 py-4">{{ formatDate(log.created_at) }}</td>
          <td class="px-6 py-4">{{ formatDate(log.updated_at) }}</td>
          <td class="px-6 py-4">{{ formatDate(log.generated_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
