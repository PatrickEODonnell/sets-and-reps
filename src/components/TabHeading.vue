<template>
  <div id="tab-heading">
    <p>{{ heading }}</p>
  </div>
</template>
<script setup>
const props = defineProps(['heading'])
</script>
<style>
#tab-heading {
  background-color: lightgray;
  color: grey;
  font-weight: bold;
  display: block;
  padding: 10px;
  align-items: baseline;
  text-align: center;
  margin: 0;
}
</style>
