'use client'

interface Speaker {
  name: string;
  voice: SpeechSynthesisVoice;
}

export const speakText = (text: string, voice: SpeechSynthesisVoice) => {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => resolve(true);
    speechSynthesis.speak(utterance);
  });
};
