<script setup>
import { onMounted, ref } from "vue";
// import { supabase } from "./supabase";

const session = ref();

onMounted(() => {
  // supabase.auth.getSession().then(({ data }) => {
  //   session.value = data.session;
  // });
  // supabase.auth.onAuthStateChange((_, _session) => {
  //   session.value = _session;
  // });
});
</script>

<template>
  <div class="content">
    <RouterView />
  </div>
</template>
