// src/components/EmergencyFlow.jsx
import React, { useState } from "react";
import { speak, listen } from "../speechHelpers";

export default function EmergencyFlow() {
  const [status, setStatus] = useState("idle");

  const startEmergency = () => {
    setStatus("asking");
    speak("Aap theek hain? Haan ya Nahi?");
    listen((res) => {
      if (res.toLowerCase().includes("nahi")) {
        setStatus("escalating");
        speak("Madad bulayi ja rahi hai. Police ko suchet kiya gaya hai.");
      } else {
        setStatus("safe");
        speak("Theek hai, aap surakshit hain.");
      }
    });
  };

  return (
    <div className="p-4 bg-red-100 rounded-lg text-center mt-4">
      <h2 className="text-lg font-bold mb-2">🚨 Emergency</h2>
      <button
        onClick={startEmergency}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Sahayata
      </button>
      <p className="mt-2">Status: {status}</p>
    </div>
  );
}
