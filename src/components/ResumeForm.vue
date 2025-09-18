<template>
  <div>
    <h2>1. Resume 생성</h2>
    <form @submit.prevent="createResume">
      <label>템플릿 ID: <input v-model="store.resumeForm.templateId" required /></label><br />
      <label>이름: <input v-model="store.resumeForm.name" required /></label><br />
      <label>연락처: <input v-model="store.resumeForm.phone" required /></label><br />
      <label>이메일: <input v-model="store.resumeForm.email" type="email" required /></label><br />
      <label>비밀번호: <input v-model="store.resumeForm.password" type="password" required /></label><br />
      <button type="submit">이력서 생성</button>
    </form>
  </div>
</template>

<script setup>
import { useResumeStore } from "@/store/resume";
const store = useResumeStore();
const API_BASE = "http://localhost:8080/api/v1/resumes";

async function createResume() {
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(store.resumeForm),
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    store.result = JSON.stringify(data, null, 2);
  } catch (e) {
    store.result = `Create Resume error: ${e}`;
  }
}
</script>
