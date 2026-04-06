"use client";

import { useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/dreamlife", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResult(data.text || "No response");
  }

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Dreamlife</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your Dreamlife prompt..."
          style={{ width: "100%", height: 150 }}
        />
        <button type="submit">Run</button>
      </form>

      <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {result}
      </div>
    </main>
  );
}
