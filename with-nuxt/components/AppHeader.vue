<script setup lang="ts">
  const { user, clear: clearSession } = useUserSession();

  async function logout() {
    await clearSession();
    await navigateTo("/login");
  }
</script>

<template>
  <nav class="p-4 bg-gray-100">
    <NuxtLink to="/" class="text-blue-600 hover:text-blue-800">
      Dinosaur Encyclopedia
    </NuxtLink>
    <div>
      <h1>Welcome {{ user?.name }}</h1>
      <button @click="logout">Logout</button>
    </div>
  </nav>
</template>
