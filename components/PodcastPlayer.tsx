'use client'

import { useState, useEffect, useRef } from 'react';
import '@dotlottie/player-component';
import WaveLoading from './WaveLoading';
import { DialogueTurn, PodcastPlayerProps } from '@/types/podcast';
import { ArrowDownTrayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function PodcastPlayer({ conversation, isGenerating, children }: PodcastPlayerProps) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<'user' | 'assistant' | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const conversationRef = useRef<HTMLDivElement>(null);
  const playerOneRef = useRef<any>(null);
  const playerTwoRef = useRef<any>(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      const maleVoices = availableVoices.filter(
        voice => voice.lang.startsWith('en-') && voice.name.toLowerCase().includes('male')
      );
      // Ensure we get two different voices
      const distinctVoices = maleVoices.reduce((acc, voice) => {
        if (acc.length < 2 && !acc.some(v => v.name === voice.name)) {
          acc.push(voice);
        }
        return acc;
      }, [] as SpeechSynthesisVoice[]);
      setVoices(distinctVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    playerOneRef.current = document.querySelector('#speakerOne');
    playerTwoRef.current = document.querySelector('#speakerTwo');

    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const scrollToMessage = (index: number) => {
    const messages = conversationRef.current?.children;
    if (messages && messages[index]) {
      messages[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  };

  const toggleAnimation = (speaker: 'user' | 'assistant' | null) => {
    if (speaker === 'user') {
      playerOneRef.current?.play();
      playerTwoRef.current?.stop();
    } else if (speaker === 'assistant') {
      playerTwoRef.current?.play();
      playerOneRef.current?.stop();
    } else {
      playerOneRef.current?.stop();
      playerTwoRef.current?.stop();
    }
  };

  const playFromPosition = async (startIndex: number) => {
    if (!voices.length || voices.length < 2) return;
    
    speechSynthesis.cancel();
    setIsPlaying(true);
    setCurrentIndex(startIndex);

    for (let i = startIndex; i < conversation.length; i++) {
      if (!isPlaying) break;
      
      const message = conversation[i];
      setCurrentSpeaker(message.role);
      setCurrentIndex(i);
      scrollToMessage(i);
      toggleAnimation(message.role);

      try {
        await new Promise<void>((resolve, reject) => {
          const utterance = new SpeechSynthesisUtterance(message.content);
          utterance.voice = message.role === 'user' ? voices[0] : voices[1];
          // Different voice characteristics for each speaker
          if (message.role === 'user') {
            utterance.pitch = 1.0;
            utterance.rate = 1.0;
          } else {
            utterance.pitch = 0.9;
            utterance.rate = 0.95;
          }
          
          utterance.onend = () => resolve();
          utterance.onerror = () => reject(new Error('Speech synthesis failed'));
          
          speechSynthesis.speak(utterance);
        });
      } catch (error) {
        console.error('Speech synthesis failed, trying next message');
        continue;
      }
    }

    setIsPlaying(false);
    setCurrentSpeaker(null);
    setCurrentIndex(-1);
    toggleAnimation(null);
  };
  const pausePlayback = () => {
    speechSynthesis.pause();
    setIsPlaying(false);
    toggleAnimation(null);
  };

  const resumePlayback = () => {
    speechSynthesis.resume();
    setIsPlaying(true);
    toggleAnimation(currentSpeaker);
  };

  const downloadAudio = async () => {
    // Implementation for audio download
    console.log('Download functionality to be implemented');
  };

  const regenerateConversation = () => {
    window.location.reload();
  };

  if (isGenerating) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#FCF3E4]">
        <WaveLoading />
        <p className="text-[#292828] mt-4 font-gloock text-xl">
          Generating conversation...
        </p>
      </div>
    );
  }

  if (!conversation.length) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#FCF3E4] p-4">
        <h1 className="text-4xl font-gloock text-[#292828] mb-2">ezPodcast</h1>
        <p className="text-[#292828]/70 mb-8">powered by Google Gemini</p>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF3E4] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Speakers Section with Names */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <div className="w-40 h-40 mb-4">
              {/* @ts-ignore */}
              <dotlottie-player
                id="speakerOne"
                src="/lottie/speaker-one.lottie"
                autoplay={false}
                loop
                mode="normal"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <p className="font-gloock text-xl text-[#292828]">
              {conversation[0]?.speaker || 'Marcus'}
            </p>
          </div>
          <div className="text-center">
            <div className="w-40 h-40 mb-4">
              {/* @ts-ignore */}
              <dotlottie-player
                id="speakerTwo"
                src="/lottie/speaker-two.lottie"
                autoplay={false}
                loop
                mode="normal"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <p className="font-gloock text-xl text-[#292828]">
              {conversation[1]?.speaker || 'James'}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-6 justify-center items-center">
          <button
            onClick={isPlaying ? pausePlayback : () => playFromPosition(0)}
            className="px-8 py-4 bg-[#292828] text-white rounded-full hover:opacity-90 transition-opacity font-medium text-lg"
          >
            {isPlaying ? 'Pause' : 'Play Conversation'}
          </button>
          <button
            onClick={downloadAudio}
            className="p-3 border-2 border-[#292828] rounded-full hover:bg-[#292828] hover:text-white transition-all"
          >
            <ArrowDownTrayIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Transcript */}
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar rounded-xl bg-white/50 p-4">
          <div ref={conversationRef} className="space-y-4">
            {conversation.map((message, index) => (
              <div
                key={index}
                onClick={() => !isPlaying && playFromPosition(index)}
                className={`p-6 rounded-xl cursor-pointer transition-all ${
                  currentIndex === index 
                    ? 'bg-[#292828] text-white scale-[1.02]' 
                    : 'bg-white hover:scale-[1.02]'
                } ${
                  message.role === 'user' ? 'ml-12' : 'mr-12'
                } shadow-sm`}
              >
                <p className="font-gloock text-xl mb-3">
                  {message.speaker}
                </p>
                <p className="leading-relaxed text-lg">
                  {message.content}
                </p>
                {currentIndex === index && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-current rounded-full animate-pulse" />
                    <span className="text-sm opacity-75">Speaking...</span>
                  </div>
                )}
              </div>
            ))}
            
            {/* Regenerate Button at the end */}
            <div className="flex justify-center pt-4">
              <button
                onClick={regenerateConversation}
                className="flex items-center gap-2 px-6 py-3 bg-[#292828] text-white rounded-full hover:opacity-90 transition-opacity"
              >
                <ArrowPathIcon className="w-5 h-5" />
                Generate New Conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
