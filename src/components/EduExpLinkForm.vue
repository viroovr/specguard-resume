<template>
  <div>
    <h2>4. 이력서 학력/경력/포트폴리오 링크 작성</h2>

    <!-- 학력 -->
    <h3>학력</h3>
    <div v-for="(edu, idx) in store.educations" :key="idx" class="edu-item">
        <label>학교 구분:
          <select v-model="edu.schoolType">
            <option value="UNIV">대학교</option>
            <option value="HIGH">고등학교</option>
            <option value="ETC">기타</option>
          </select>
        </label><br />

        <label>학교명: <input v-model="edu.schoolName" /></label><br />
        <label>전공: <input v-model="edu.major" /></label><br />

          <label>학위:
            <select v-model="edu.degree">
              <option value="BACHELOR">학사</option>
              <option value="MASTER">석사</option>
              <option value="DOCTOR">박사</option>
            </select>
          </label><br />

            <label>졸업 상태:
              <select v-model="edu.graduationStatus">
                <option value="GRADUATED">졸업</option>
                <option value="ENROLLING">재학</option>
                <option value="DROPPED">중퇴</option>
              </select>
            </label><br />

            <label>입학 유형:
              <select v-model="edu.admissionType">
                <option value="REGULAR">정규</option>
                <option value="TRANSFER">편입</option>
              </select>
            </label><br />

            <label>평점: <input type="number" step="0.1" v-model.number="edu.gpa" /></label><br />
            <label>최대 평점: <input type="number" step="0.1" v-model.number="edu.maxGpa" /></label><br />
            <label>입학일: <input type="date" v-model="edu.startDate" /></label><br />
            <label>졸업일: <input type="date" v-model="edu.endDate" /></label><br />
      <button @click="removeEdu(idx)">삭제</button>
      <hr />
    </div>
    <button @click="addEdu">학력 추가</button>

    <!-- 경력 -->
    <h3>경력</h3>
    <div v-for="(exp, idx) in store.experiences" :key="idx" class="exp-item">
      <label>회사명: <input v-model="exp.companyName" required /></label><br />
      <label>부서명: <input v-model="exp.department" required /></label><br />
      <label>직급/직책: <input v-model="exp.position" required /></label><br />
      <label>시작일: <input type="date" v-model="exp.startDate" required /></label><br />
      <label>종료일: <input type="date" v-model="exp.endDate" /></label><br />
      <button @click="removeExp(idx)">삭제</button>
      <hr />
    </div>
    <button @click="addExp">경력 추가</button>

    <!-- 링크 -->
    <h3>포트폴리오 링크</h3>
    <div v-for="(link, idx) in store.links" :key="idx" class="link-item">
      <label>URL: <input v-model="link.url" type="url" required /></label><br />
      <label>타입:
        <select v-model="link.linkType">
          <option value="GITHUB">GITHUB</option>
          <option value="VELOG">VELOG</option>
          <option value="NOTION">NOTION</option>
        </select>
      </label><br />
      <button @click="removeLink(idx)">삭제</button>
      <hr />
    </div>
    <button @click="addLink">링크 추가</button>

    <!-- 저장 -->
    <button @click="submitEduExpLink">저장</button>
  </div>
</template>

<script setup>
import { useResumeStore } from "@/store/resume";
const store = useResumeStore();
const API_BASE = "http://localhost:8080/api/v1/resumes";

// 기본 객체 생성 함수
function emptyEdu() {
  return {     
    schoolType: "UNIV",       // 기본 Enum 값
    schoolName: "",
    major: "",
    degree: "BACHELOR",       // 기본 Enum 값
    graduationStatus: "GRADUATED", // 기본 Enum 값
    admissionType: "REGULAR", // 기본 Enum 값
    gpa: null,
    maxGpa: null,
    startDate: "",
    endDate: "" };
}
function emptyExp() {
  return { companyName: "", department: "", position: "", startDate: "", endDate: "" };
}
function emptyLink() {
  return { url: "", linkType: "GITHUB" };
}

// 학력
function addEdu() { store.educations.push(emptyEdu()); }
function removeEdu(idx) {
  if (store.educations.length > 1) store.educations.splice(idx, 1);
}

// 경력
function addExp() { store.experiences.push(emptyExp()); }
function removeExp(idx) {
  if (store.experiences.length > 1) store.experiences.splice(idx, 1);
}

// 링크
function addLink() { store.links.push(emptyLink()); }
function removeLink(idx) {
  if (store.links.length > 1) store.links.splice(idx, 1);
}

function isFilled(obj) {
  // 하나라도 값이 있으면 true
  return Object.values(obj).some(v => v !== null && v !== undefined && v !== "");
}


// 제출
async function submitEduExpLink() {
  const payload = {
    educations: (store.educations ?? []).filter(isFilled),
    experiences: (store.experiences ?? []).filter(isFilled),
    certificates: [], // 필요 시 동일 처리
    links: (store.links ?? []).filter(isFilled),
  };

  try {
    console.log(payload);

    const res = await fetch(`${API_BASE}/edu-exp-link`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    store.result = `Resume Edu/Exp/Link Created:\n${JSON.stringify(data, null, 2)}`;
  } catch (e) {
    store.result = `Submit EduExpLink error: ${e}`;
  }
}
</script>