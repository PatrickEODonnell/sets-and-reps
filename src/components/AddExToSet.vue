<template>

  <div style="display: flex; align-items: center">
    <!-- Input Fields -->
    <div style="margin-right: 2%">
      <label for="reps" style="display: block">Reps</label>
      <input id="reps" type="text" style="width: 70px" v-model="reps" />
    </div>


    <div style="margin-right: 2%">
      <!-- Autocomplete Input -->
      <label for="exercise-input">Exercise:</label>
      <input
        id="exercise-input"
        type="text"
        v-model="exerciseName"
        @input="filterExercises"
        @keydown.enter.prevent="selectValue(exerciseName)"
        placeholder="Type to search or enter value"
        style="width: 100%"
      />

      <!-- Filtered Dropdown List -->
      <ul v-if="showDropdown && filteredExercises.length" class="dropdown">
        <li
          v-for="exercise in filteredExercises"
          :key="exercise.name"
          @click="selectValue(exercise)"
          class="dropdown-item"
        >
          {{ exercise.name }}
        </li>
      </ul>

    </div>

    <div style="margin-right: 5px; margin-top: 20px">
      <div style="display: block">Log</div>
      <div class="sr-button"><input type="checkbox" v-model="log" /></div>
    </div>

    <!-- Save Button -->
    <button
      class="sr-button"
      style="vertical-align: bottom; padding-top: 20px"
      @click="saveExercise"
    >
      <IconPlus style="font-size: 20" />
    </button>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import IconPlus from "~icons/mdi/plus";
import { useIdbservice } from "@/libs/useIdbService";
let reps = ref(8);
let exerciseName = ref("");
let log = ref(false);
const emit = defineEmits(["save"]);
const { getAll } = useIdbservice("exercises");

const inputValue = ref(""); // User input
const selectedValue = ref(""); // Selected exercise
let exercises = ref([]); // List of available exercises
const filteredExercises = ref([]); // Filtered list for dropdown
const showDropdown = ref(false); // Toggle for dropdown visibility

onMounted(async () => {
  console.log("get all exercises");
  exercises.value = await getExercises();
});
async function getExercises(){
  let exs = await getAll();
  return exs;
}
// Filter exercises based on input
const filterExercises = () => {
  if (exerciseName.value.trim()) {
    showDropdown.value = true;
    filteredExercises.value = exercises.value.filter((exercise) =>
      exercise.name.toLowerCase().includes(exerciseName.value.toLowerCase())
    );
  } else {
    showDropdown.value = false;
    filteredExercises.value = [];
  }
};

// Handle selecting a value
const selectValue = (exercise) => {
  console.log(exercise);
  selectedValue.value = exercise.name;
  exerciseName.value = exercise.name;
  showDropdown.value = false; // Hide dropdown
};

const saveExercise = () => {
  let exercise = { reps: reps.value, name: exerciseName.value, log: log.value };
  console.log("AddExToSet:", exercise);
  emit("save", exercise);
  reps.value = "";
  exerciseName.value = "";
  log.value = false;
};
</script>
<style>
.dropdown {
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin-top: 5px;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
