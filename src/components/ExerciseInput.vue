<template>
  <div>
    <!-- Autocomplete Input -->
    <label for="exercise-input">Exercise:</label>
    <input
      id="exercise-input"
      type="text"
      v-model="inputValue"
      @input="filterExercises"
      @keydown.enter.prevent="selectValue(inputValue)"
      placeholder="Type to search or add a value"
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

    <!-- Selected Value -->
    <p v-if="selectedValue">Selected: {{ selectedValue }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { EXERCISE_LIST } from "@/libs/exercises";
import ExerciseList from "./ExerciseList.vue";
export default {
  setup() {
    const inputValue = ref(""); // User input
    const selectedValue = ref(""); // Selected exercise
    // const exercises = ref(["Back Squat", "Bench Press", "Deadlift", "Pull-Ups", "Overhead Press"]); // List of available exercises
    const exercises = ref(EXERCISE_LIST); // List of available exercises
    const filteredExercises = ref([]); // Filtered list for dropdown
    const showDropdown = ref(false); // Toggle for dropdown visibility

    // Filter exercises based on input
    const filterExercises = () => {
      if (inputValue.value.trim()) {
        showDropdown.value = true;
        filteredExercises.value = exercises.value.filter((exercise) =>
          exercise.name.toLowerCase().includes(inputValue.value.toLowerCase())
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
      inputValue.value = exercise.name;
      showDropdown.value = false; // Hide dropdown
    };

    return {
      inputValue,
      selectedValue,
      exercises,
      filteredExercises,
      showDropdown,
      filterExercises,
      selectValue
    };
  }
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
