<template>
  <div>
    <h2>자기소개서 문항 답변</h2>
    <div 
      v-for="(field, idx) in store.fields" 
      :key="field.id" 
      class="item-row"
    >
      <!-- 문항 이름 표시 -->
      <h3>{{ idx + 1 }}. {{ field.fieldName }}</h3>

      <!-- 답변 작성 -->
      <textarea
         v-model="field.answer"
        placeholder="답변을 입력하세요"
        rows="5"
        class="answer-box"
      ></textarea>
    </div>

    <button @click="submitTemplateResponses">저장</button>
  </div>
</template>


<script setup>
import { useResumeStore } from "@/store/resume";
const store = useResumeStore();
const API_BASE = "http://localhost:8080/api/v1/resumes";
import { reactive } from "vue";

async function submitTemplateResponses() {
  try {
    const payload = store.fields
      .filter(f => f.answer && f.answer.trim() !== "") // 답변이 있는 것만
      .map(f => ({
        id: f.responseId, // 기존 답변이면 id 포함, 없으면 null
        fieldId: f.id,    // 문항 id
        answer: f.answer  // 답변 내용
      }));

    if (payload.length === 0) {
      store.result = "작성된 답변이 없습니다.";
      return;
    }

    const res = await fetch(`${API_BASE}/template-responses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ responses: payload }),
    });
    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    store.result = `Template Responses saved:\n${JSON.stringify(data, null, 2)}`;
  } catch (e) {
    store.result = `Submit Template Responses error: ${e}`;
  }
}
</script>

<style scoped>
.item-row {
  margin-bottom: 20px;
}
.answer-box {
  width: 100%;
  padding: 8px;
  font-size: 14px;
}
</style>
