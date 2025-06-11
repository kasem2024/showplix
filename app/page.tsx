'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Optional: use your button component

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          Build Your Portfolio
          <br />
          <span className="text-purple-600">In Minutes.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Create a stunning, professional portfolio that showcases your work—no design skills needed.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <Link href="/login">
            <Button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg rounded-2xl shadow-xl transition duration-300">
              Get Started For Free
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <img
          src="/preview.gif"
          alt="Portfolio preview"
          className="rounded-3xl shadow-2xl max-w-full w-[70vw] md:w-[600px] h-[30vh] bg-contain "
        />
      </motion.div>
    </div>
  );
}
