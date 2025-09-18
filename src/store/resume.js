// store/resume.js
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useResumeStore = defineStore("resume", () => {
  // 로그인 관련
  const loginForm = reactive({
    email: "",
    templateId: "",
    password: "",
  });

  // 이력서 정보
  const resumeForm = reactive({
    templateId: "",
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  // 기본 정보
  const basicForm = reactive({
    englishName: "",
    gender: "",
    birthDate: "",
    nationality: "",
    address: "",
    applyField: "",
    specialty: "",
    hobbies: "",
    profileImageFile: null,
  });

  // 여러 개 관리 (배열 기반)
  const educations = ref([]);   // 학력 리스트
  const experiences = ref([]);  // 경력 리스트
  const certificates = ref([]); // 자격증 리스트
  const links = ref([]);        // 링크 리스트
  const templateItems = ref([]); // 자기소개서 문항 답변 리스트
  const fields = ref([]); // 자기소개서 문항 답변 리스트

  const companyId = ref("");
  const result = ref("");

  // ✅ 서버에서 내려온 JSON을 store에 반영하는 함수
  function setResumeData(data) {
    if (!data) return;

    // resumeForm
    resumeForm.templateId = data.resume?.templateId || "";
    resumeForm.name = data.resume?.name || "";
    resumeForm.phone = data.resume?.phone || "";
    resumeForm.email = data.resume?.email || "";

    // basicForm
    basicForm.englishName = data.basic?.englishName || "";
    basicForm.gender = data.basic?.gender || "";
    basicForm.birthDate = data.basic?.birthDate || "";
    basicForm.nationality = data.basic?.nationality || "";
    basicForm.address = data.basic?.address || "";
    basicForm.applyField = data.basic?.applyField || "";
    basicForm.specialty = data.basic?.specialty || "";
    basicForm.hobbies = data.basic?.hobbies || "";
    basicForm.profileImageFile = data.basic?.profileImageUrl || null;

    // 학력 리스트
    educations.value = (data.educations || []).map(edu => ({
      id: edu.id,
      schoolName: edu.schoolName,
      major: edu.major,
      degree: edu.degree,
      admissionType: edu.admissionType,
      schoolType: edu.schoolType,
      gpa: edu.gpa,
      maxGpa: edu.maxGpa,
      startDate: edu.startDate,
      endDate: edu.endDate,
      graduationStatus: edu.graduationStatus,
    }));

    // 경력 리스트
    experiences.value = (data.experiences || []).map(exp => ({
      id: exp.id,
      companyName: exp.companyName,
      department: exp.department,
      position: exp.position,
      responsibilities: exp.responsibilities,
      startDate: exp.start_date,
      endDate: exp.end_date,
      employmentStatus: exp.employmentStatus,
    }));

    // 자격증 리스트
    certificates.value = (data.certificates || []).map(cert => ({
      id: cert.id,
      certificateName: cert.certificateName,
      certificateNumber: cert.certificateNumber,
      issuer: cert.issuer,
      issuedDate: cert.issuedDate,
      certUrl: cert.certUrl,
    }));

    // 링크 리스트
    links.value = (data.links || []).map(link => ({
      id: link.id,
      url: link.url,
      linkType: link.link_type,
      contents: link.contents,
    }));

    fields.value = (data.fields || []).map(field => {
    // templateResponses에서 해당 fieldId 답변 찾기
    const response = (data.templateResponses || []).find(item => item.fieldId === field.id);
    
    return {
      id: field.id,
      fieldName: field.fieldName,
      fieldType: field.fieldType,
      required: field.required,
      options: field.options,
      minLength: field.minLength,
      maxLength: field.maxLength,
      answer: response ? response.answer : "", // 기존 답변이 있으면 넣고 없으면 ""
      responseId: response ? response.id : null // 기존 답변 id
    };
  });
  
    // 자격증 리스트
    certificates.value = (data.certificates || []).map(cert => ({
      id: cert.id,
      name: cert.certificateName, 
      number: cert.certificateNumber,
      issuer: cert.issuer,
      issuedDate: cert.issuedDate,
      url: cert.certUrl,
    })  
  );


  }
  return {
    loginForm,
    resumeForm,
    basicForm,
    educations,
    experiences,
    certificates,
    links,
    companyId,
    fields,
    result,
    setResumeData, // ✅ 액션
  };
});
