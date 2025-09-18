<template>
    <div>
        <h2>만든거 있다면 로그인</h2>
        <label>Email : <input v-model="store.loginForm.email" type="text" /></label> <br />
        <label>Template ID : <input v-model="store.loginForm.templateId" type="text" /></label> <br />
        <label>Password : <input v-model="store.loginForm.password" type="password" /></label> <br />
        <button @click="login">Login</button>
        <button @click="logout">Logout</button>
    </div>
</template>

<script setup>
import { useResumeStore } from '@/store/resume';
const store = useResumeStore();
const API_BASE = 'http://localhost:8080/api/v1/resumes';

async function login() {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ✅ 추가
      body: JSON.stringify(store.loginForm),
    });

    if (!res.ok) throw new Error(await res.text());

    
    const data = await res.json();
    store.setResumeData(data.resume); // 바로 store에 반영
    
    store.result = data;

  } catch (e) {
    store.result = `Login error: ${e}`;
  }
}

async function logout() {
  try {
    const res = await fetch(`${API_BASE}/logout`, { method: "POST", credentials: "include" });
    store.result = res.ok ? "로그아웃 성공" : "로그아웃 실패";
  } catch (e) {
    store.result = `Logout error: ${e}`;
  }
}
</script>