import { gsap } from 'gsap/all';

export interface CarInfo {
  id: string;
  duration: number;
  ease: string;
  position: { x: number; y: number };
  repeat: number;
  repeatDelay: number;
  sound_effect: string;
}

export interface CarData {
  dom: Element;
  effect: gsap.core.Tween;
  listener: { click: () => void; dbclick: () => void };
}

