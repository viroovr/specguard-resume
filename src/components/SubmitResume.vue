<template>
  <div>
    <h2>최종 제출</h2>
    <label>제출 대상 회사 ID: <input v-model="store.companyId" placeholder="company UUID" /></label>
    <button @click="submitResume">제출</button>
  </div>
</template>

<script setup>
import { useResumeStore } from "@/store/resume";
const store = useResumeStore();
const API_BASE = "http://localhost:8080/api/v1/resumes";

async function submitResume() {
  if (!store.companyId) {
    store.result = "companyId를 입력하세요.";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ companyId: store.companyId }),
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    store.result = `Resume Submitted:\n${JSON.stringify(data, null, 2)}`;
  } catch (e) {
    store.result = `Submit Resume error: ${e}`;
  }
}
</script>
