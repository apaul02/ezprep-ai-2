"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function VideoLearningPage() {
  const session = useSession();
  if(!session.data) {
    redirect("/login")
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fcf3e4] relative overflow-hidden">
      {/* Floating background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-24 h-24 bg-amber-100/30 rounded-full blur-lg"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-32 right-16 w-32 h-32 bg-purple-100/20 rounded-full blur-lg"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-4xl w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20"
        >
          <div className="flex flex-col items-center space-y-8">
            {/* Animated icon */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative w-full flex justify-center"
            >
              <Link href="/" className="flex items-center gap-2 text-xl font-medium group mx-auto">
                <Image
                  src="/images/Graduation-Cap.png"
                  alt="ezPrep Logo"
                  width={34}
                  height={34}
                />
              <span className=" font-gloock">EzPrep.ai</span>
          </Link>
            </motion.div>

            {/* Heading with gradient text */}
            <h1 className="text-5xl md:text-6xl font-bold font-gloock text-black">
              Master Through Motion
            </h1>

            <div className="space-y-6 max-w-2xl">
              <p className="text-xl md:text-2xl text-gray-700 text-center font-light leading-relaxed">
                Immerse yourself in our upcoming video learning platform where complex concepts become 
                <span className="font-medium text-amber-700"> crystal clear </span> 
                through engaging animations and expert explanations.
              </p>

              {/* Countdown visual */}
              <div className="flex justify-center items-center gap-4 py-6">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-3 w-3 rounded-full bg-amber-500"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>

              {/* Newsletter form */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white rounded-2xl p-1.5 flex items-center">
                  <input
                    type="email"
                    placeholder="Get notified when we launch"
                    className="w-full px-6 py-4 border-0 bg-transparent focus:outline-none text-lg placeholder-gray-400"
                  />
                  <button className="ml-auto bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    Notify Me
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="flex items-center gap-4 mt-8">
              <motion.div
                className="w-3 h-3 bg-amber-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="w-3 h-3 bg-purple-500 rounded-full"
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="w-3 h-3 bg-amber-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
        <div className="absolute inset-0 bg-[url('/images/graph-paper.svg')] bg-[length:40px_40px] animate-pan"></div>
      </div>
    </div>
  );
}

export default VideoLearningPage;