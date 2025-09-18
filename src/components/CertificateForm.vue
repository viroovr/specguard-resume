<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">자격증 정보</h2>

    <div v-for="(cert, index) in store.certificates" :key="cert.id || index" class="border rounded-lg p-4 mb-4 shadow">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium">자격증 명</label>
          <input
            v-model="cert.certificateName"
            type="text"
            class="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium">자격증 번호</label>
          <input
            v-model="cert.certificateNumber"
            type="text"
            class="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium">발행 기관</label>
          <input
            v-model="cert.issuer"
            type="text"
            class="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium">취득일</label>
          <input
            v-model="cert.issuedDate"
            type="date"
            class="w-full border p-2 rounded"
            required
          />
        </div>

        <div class="col-span-2">
          <label class="block text-sm font-medium">자격증 URL (선택)</label>
          <input
            v-model="cert.certUrl"
            type="url"
            class="w-full border p-2 rounded"
          />
        </div>
      </div>

      <button
        type="button"
        @click="store.removeCertificate(index)"
        class="mt-2 text-red-600 text-sm"
      >
        삭제
      </button>
    </div>

    <div class="flex gap-2">
      <button
        type="button"
        @click="store.addCertificate"
        class="px-4 py-2 bg-blue-500 text-white rounded"
      >
        + 자격증 추가
      </button>

      <button
        type="button"
        @click="save"
        class="px-4 py-2 bg-green-600 text-white rounded"
      >
        저장
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useResumeStore } from "@/stores/resumeStore";

const store = useResumeStore();
const API_BASE = "http://localhost:8080/api/v1/resumes";


// 제출
async function save() {
  const payload = {
    certificates: store.certificates, // 필요 시 동일 처리
  };

  try {
    console.log(payload);

    const res = await fetch(`${API_BASE}/certificates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    store.result = `Certificates Created:\n${JSON.stringify(data, null, 2)}`;
  } catch (e) {
    store.result = `Submit Certificate error: ${e}`;
  }
}
</script>
