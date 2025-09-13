import logo from './logo.svg';
import './App.css';
import './styles.css';
import React, { useState, useRef, useEffect } from 'react';
import VoiceInput from './components/VoiceInput';
import Conversation from './components/Conversation';
import Tabs from './components/Tabs';
import { getAIResponse } from './utils/aiResponse';

const App = () => {
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('business');
  const voicesRef = useRef([]);
  const [selectedLang, setSelectedLang] = useState('hi-IN');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Namaste! Main aapka Porter Saathi hoon. Aapki kya madad kar sakta hoon?' }
  ]);
  const [isListening, setIsListening] = useState(false);
  useEffect(() => {
    // Function to update voices
    const updateVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    window.speechSynthesis.onvoiceschanged = updateVoices;
    updateVoices(); // Initial call
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);
  const handleUserQuery = (transcript) => {
    if (!transcript.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: transcript }]);
    const response = getAIResponse(transcript, activeTab, history);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: response }]);
      setHistory((prev) => [
        ...prev,
        { question: transcript, answer: response }
      ]);
      speakResponse(response);
    }, 500);
  };
  const speakResponse = (text) => {
    if (!('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang;
    utterance.rate = 1;
    utterance.pitch = 1;
    const voices = voicesRef.current;
    let selectedVoice = voices.find(
      (voice) => voice.lang === selectedLang && voice.name.toLowerCase().includes('ravi')
    );
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    window.speechSynthesis.speak(utterance);
  };
  // const speakResponse = (text) => {
  //   if (!('speechSynthesis' in window)) return;
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.lang = 'hi-IN';
  //   utterance.rate = 1;
  //   utterance.pitch = 1;
  //   const voices = voicesRef.current;
  //   let selectedVoice = voices.find(
  //     (voice) => voice.lang === 'en-IN' && voice.name.toLowerCase().includes('ravi')
  //   );
  //     if (!selectedVoice) {
  //       selectedVoice = voices.find((voice) => voice.lang === 'hi-IN');
  //     }
  //     if (selectedVoice) {
  //       utterance.voice = selectedVoice;
  //     }
  //     window.speechSynthesis.speak(utterance);
  //     console.log(voices);
  //   }
  //   const voices = window.speechSynthesis.getVoices();
  // // Find a specific voice (for example, a female Hindi voice)
  //   const selectedVoice = voices.find(
  //     (voice) => voice.lang === 'hi-IN' && voice.name.toLowerCase().includes('female')
  //   );
  //   if (selectedVoice) {
  //     utterance.voice = selectedVoice;
  //   }
  //   window.speechSynthesis.speak(utterance);
  //   console.log(voices);
  // };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">Porter Saathi</h1>
      <select
        value={selectedLang}
        onChange={e => setSelectedLang(e.target.value)}
        className="mb-4 p-2 rounded border"
      >
        <option value="hi-IN">Hindi</option>
        <option value="en-IN">English (India)</option>
        <option value="en-US">English (US)</option>
      </select>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Conversation messages={messages} />
      <div className="mt-4 flex justify-center">
        <VoiceInput onResult={handleUserQuery} isListening={isListening} setIsListening={setIsListening} />
      </div>
    </div>
  );
};

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
