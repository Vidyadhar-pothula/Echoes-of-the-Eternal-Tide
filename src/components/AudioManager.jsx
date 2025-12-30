import React, { useEffect, useRef } from 'react';
import { useStore } from '../store';
import { storyData } from '../storyData';

const AudioManager = () => {
    const { hasStarted, currentPageIndex } = useStore();
    const audioRef = useRef(null);

    // Initialize audio
    useEffect(() => {
        // Determine base path same as BackgroundManager
        const basePath = import.meta.env.BASE_URL;
        const audioSrc = `${basePath}bg-music.mp3`;

        audioRef.current = new Audio(audioSrc);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5; // Start volume

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Handle Play/Pause based on interaction
    useEffect(() => {
        if (!audioRef.current) return;

        if (hasStarted) {
            // Attempt to play if allowed
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
    }, [hasStarted]);

    // Handle Fade out on last page
    useEffect(() => {
        if (!audioRef.current) return;

        const isLastPage = currentPageIndex === storyData.length - 1;

        if (isLastPage) {
            // Fade out logic
            const fadeAudio = setInterval(() => {
                if (audioRef.current && audioRef.current.volume > 0.05) {
                    audioRef.current.volume -= 0.05;
                } else {
                    clearInterval(fadeAudio);
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.volume = 0; // Ensure it's muted
                    }
                }
            }, 200);
            return () => clearInterval(fadeAudio);
        }
    }, [currentPageIndex]);

    return null; // Invisible component
};

export default AudioManager;
