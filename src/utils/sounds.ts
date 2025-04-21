import { Howl } from 'howler';

// Create a sound manager for reusable sounds
export const sounds = {
  click: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'],
    volume: 0.3
  }),
  success: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3'],
    volume: 0.3
  }),
  draw: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3'],
    volume: 0.3
  })
};