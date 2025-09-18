<template>
  <div>
    <h2>Resume Basic 작성</h2>
    <form @submit.prevent="createBasic" enctype="multipart/form-data">
      <label>English Name: <input v-model="store.basicForm.englishName" /></label><br />
      <label>Gender:
        <select v-model="store.basicForm.gender">
          <option value="M">M</option>
          <option value="F">F</option>
        </select>
      </label><br />
      <label>Birth Date: <input type="date" v-model="store.basicForm.birthDate" /></label><br />
      <label>Nationality: <input v-model="store.basicForm.nationality" /></label><br />
      <label>Address: <input v-model="store.basicForm.address" /></label><br />
      <label>Apply Field: <input v-model="store.basicForm.applyField" /></label><br />
      <label>Specialty: <input v-model="store.basicForm.specialty" /></label><br />
      <label>Hobbies: <input v-model="store.basicForm.hobbies" /></label><br />

      <!-- 파일 업로드 input -->
      <label>Profile Image: 
        <input type="file" accept="image/*" @change="handleFileUpload" required />
      </label><br />

      <button type="submit">Create Basic</button>
    </form>
  </div>
</template>

<script setup>
import { useResumeStore } from "@/store/resume";
const store = useResumeStore();
const API_BASE = "http://localhost:8080/api/v1/resumes";

// 파일 선택 시 store에 저장
function handleFileUpload(e) {
  const file = e.target.files[0];
  if (file) {
    store.basicForm.profileImageFile = file;
  }
}

async function createBasic() {
  try {
    const formData = new FormData();

    // JSON 데이터 Blob으로 넣기
    formData.append(
      "basic",
      new Blob([JSON.stringify({
        englishName: store.basicForm.englishName,
        gender: store.basicForm.gender,
        birthDate: store.basicForm.birthDate,
        nationality: store.basicForm.nationality,
        address: store.basicForm.address,
        applyField: store.basicForm.applyField,
        specialty: store.basicForm.specialty,
        hobbies: store.basicForm.hobbies,
      })], { type: "application/json" })
    );

    // 파일 append (필수)
    if (store.basicForm.profileImageFile) {
      formData.append("profileImage", store.basicForm.profileImageFile);
    } else {
      throw new Error("프로필 이미지를 선택해야 합니다.");
    }

    const res = await fetch(`${API_BASE}/basic`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    store.result = `Resume Basic Created:\n${JSON.stringify(data, null, 2)}`;
  } catch (e) {
    store.result = `Create Basic error: ${e}`;
  }
}
</script>
