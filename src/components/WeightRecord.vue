<template>
    <div>
        {{ exerciseName }} <input type="text" v-model="pr">
    </div>
</template>
<script setup>
import { ref } from 'vue';
const props= defineProps(["exerciseName","setId","exerciseId"]);
const pr = ref(0);
</script>