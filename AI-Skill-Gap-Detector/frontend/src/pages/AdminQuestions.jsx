import React, { useState } from "react";
import api from "../services/api";

export default function AdminQuestions() {
  const [form, setForm] = useState({ title: "", language: "JavaScript", topic: "", description: "" });
  const [notice, setNotice] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    setNotice("");
    try {
      await api.post("/assessments/questions", form);
      setNotice("Question created successfully.");
      setForm({ title: "", language: "JavaScript", topic: "", description: "" });
    } catch (error) {
      setNotice(error.response?.data?.message || "Unable to create the question.");
    }
  };
  return <section style={{ maxWidth: 720, margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: 12 }}>
    <p style={{ color: "#4f46e5", fontWeight: 800 }}>ADMINISTRATION</p><h1>Question Manager</h1><p>Create a technical question for the assessment bank. Only administrator accounts can save changes.</p>
    {notice && <p role="status">{notice}</p>}
    <form onSubmit={submit} style={{ display: "grid", gap: 14 }}>
      <label>Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
      <label>Language<select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}>{["JavaScript", "Python", "Java", "C++"].map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>Topic<input value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} /></label>
      <label>Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
      <button type="submit">Create Question</button>
    </form>
  </section>;
}
