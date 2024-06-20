<template>
  <div id="tab-heading">
    {{ heading }}
  </div>
</template>
<script setup>
const props = defineProps(['heading'])
</script>
<style>
#tab-heading {
  background-color: darkgray;
  color: black;
  font-weight: 500;
  padding: 1px 1px 1px 5px;
  align-items: baseline;
  text-align: center;
  vertical-align: top;
  margin: 0;
}
</style>
