// src/App.jsx
import React, { useState } from "react";
import { speak, listen } from "./speechHelpers";
import EarningsCard from "./components/EarningsCard";
import EmergencyFlow from "./components/EmergencyFlow";

export default function App() {
  const [earnings, setEarnings] = useState(null);

  const sampleData = {
    total: 1250,
    expenses: 200,
    penalties: 50,
    net: 1000,
  };

  const handleVoice = () => {
    speak("Bolna shuru kijiye");
    listen((transcript) => {
      const t = transcript.toLowerCase();
      console.log("Heard:", t);

      if (/(aaj|aj).*(kamaya|net|kamai)/.test(t)) {
        setEarnings(sampleData);
        speak(
          `Aaj aapne kul ${sampleData.total} rupaye kamaye. 
          Kharcha ${sampleData.expenses}. Penalty ${sampleData.penalties}. 
          Net ${sampleData.net} rupaye.`
        );
      } else if (/penalty|kyun|kyon/.test(t)) {
        speak("Order 234, 30 minute late delivery, penalty 50 rupaye.");
      } else if (/insurance|bima|samjhao/.test(t)) {
        speak("Insurance ek suraksha hai. Iska matlab hai, accident ya nuksan hone par aapko paisa milega.");
      } else if (/help|sahayata|madad/.test(t)) {
        speak("Kripya Sahayata button dabaiye.");
      } else {
        speak("Maaf kijiye, samajh nahi paaya.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">🚚 Porter Saathi</h1>

      <button
        onClick={handleVoice}
        className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md"
      >
        🎤 Bolna Shuru Kijiye
      </button>

      <div className="mt-6 w-full max-w-md">
        <EarningsCard data={earnings} />
        <EmergencyFlow />
      </div>
    </div>
  );
}
