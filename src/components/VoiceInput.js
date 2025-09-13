import React, { useEffect, useState, useRef } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceInput = ({ onResult, isListening, setIsListening }) => {
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!SpeechRecognition) {
      setError('Speech Recognition API not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const match = transcript.match(/["']([^"']+)["']/);
      const result = match ? match[1] : transcript;
      onResult(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setError('Voice recognition error: ' + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [onResult, setIsListening]);

  useEffect(() => {
    if (isListening && recognitionRef.current) {
      setError(null);
      recognitionRef.current.start();
    } else if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  return (
    <div>
      <button
        onClick={() => setIsListening(!isListening)}
        className={`p-3 rounded-full text-white ${isListening ? 'bg-red-600 animate-pulse' : 'bg-blue-600'}`}
        aria-label={isListening ? 'Stop listening' : 'Start listening'}
      >
        {isListening ? '🎙️ Listening...' : '🎤 Speak'}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default VoiceInput;