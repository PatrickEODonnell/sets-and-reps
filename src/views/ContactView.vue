<template>
  <header>
    <PageHeading />
  </header>
  <TabHeading heading="A B O U T" />
  <div class="about" style="padding: 20px;">Version: {{ version }}</div>
  <PageFooter />
</template>
<script setup>
import PageHeading from "../components/PageHeading.vue";
import TabHeading from "../components/TabHeading.vue";
import PageFooter from "../components/PageFooter.vue";
const version = __APP_VERSION__;
</script>
