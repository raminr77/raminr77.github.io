import { useCallback, useEffect, useRef } from 'react';

const CLICK_SOUND_SRC = '/click.mp3';

export function useClickSound(): () => void {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(CLICK_SOUND_SRC);
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      audioRef.current = null;
    };
  }, []);

  return useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => undefined);
  }, []);
}
