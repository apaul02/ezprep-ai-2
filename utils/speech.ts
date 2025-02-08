'use client'

export const speakText = (text: string, voice: SpeechSynthesisVoice): Promise<void> => {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = 1;
    utterance.pitch = 1;
    
    utterance.onend = () => resolve();
    utterance.onerror = (error) => reject(error);
    
    speechSynthesis.speak(utterance);
  });
};
