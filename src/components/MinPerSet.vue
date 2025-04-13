<template>
        <div  >
          Total time: {{ store.sets * store.minPerSet }} min. 
        </div>
</template>
<script setup>
import { useSetParamsStore } from '@/libs/siteParams';
const store = useSetParamsStore();
</script>