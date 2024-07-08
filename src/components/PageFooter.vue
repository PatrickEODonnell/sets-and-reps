<template>
  <footer class="footer">
    <!-- Navigation Links -->
    <nav>
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Timer</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/sets" class="nav-link">Sets</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>
<style scoped>
.footer {
  width: 100%;
  background-color: darkgray;

  padding: 10px 0;
  position: absolute;
  bottom: 0;
}
.nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}
.nav-item {
  margin: 0 10px;
}
.nav-link {
  text-decoration: none;
  color: whitesmoke;
  font-size: 16px;
}
.nav-link:hover {
  text-decoration: underline;
}
</style>
