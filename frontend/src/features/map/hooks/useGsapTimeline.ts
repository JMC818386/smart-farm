/**
 * useGsapTimeline Hook
 * Per PDF_REQUIREMENTS_EXTRACT.md - create/play/reverse/cleanup timelines
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { GsapTimelineConfig } from '../types';

export const useGsapTimeline = (
  elementRef: React.RefObject<HTMLElement>,
  config: GsapTimelineConfig
) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Create timeline with AgriCommand constraints (<250ms)
    const timeline = gsap.timeline({
      paused: true,
      onComplete: config.onComplete,
      onReverseComplete: config.onReverseComplete,
    });

    timelineRef.current = timeline;

    return () => {
      timeline.kill();
    };
  }, [elementRef, config]);

  const play = () => {
    timelineRef.current?.play();
  };

  const reverse = () => {
    timelineRef.current?.reverse();
  };

  const restart = () => {
    timelineRef.current?.restart();
  };

  return {
    timeline: timelineRef.current,
    play,
    reverse,
    restart,
  };
};
