<script>
export default {
  name: "IcBaselineCall",
};
</script>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "1em",
  },
});
</script>

<template>
  <svg :width="props.size" :height="props.size" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 16H5V10h14v10m0-12H5V6h14v2m-7 5h5v5h-5v-5Z"
    ></path>
  </svg>
</template>
