<template>
  <div>
    <LoginForm />
    <ResumeForm />
    <ResumeBasicForm />
    <EduExpLinkForm />
    <TemplateItemsForm />
    <SubmitResume />
    <h2>결과</h2>
    <pre>{{ store.result }}</pre>
  </div>
</template>

<script setup>
import { useResumeStore } from "@/store/resume";
import LoginForm from "@/components/LoginForm.vue";
import ResumeForm from "@/components/ResumeForm.vue";
import ResumeBasicForm from "@/components/ResumeBasicForm.vue";
import EduExpLinkForm from "@/components/EduExpLinkForm.vue";
import TemplateItemsForm from "@/components/TemplateResponse.vue";
import SubmitResume from "@/components/SubmitResume.vue";

const store = useResumeStore();
</script>
