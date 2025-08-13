import air32_devboard from '../assets/images/projects/Air32_devboard.jpg';
import custom_zsh_theme from '../assets/images/projects/custom-zsh-theme.png';

export const projectsData = [
  {
    id: "air32-devboard",
    title: "Air32 Chip Super Tiny Dev Board",
    href: "https://github.com/CocoNautty/Air32_MiniDevBoard",
    image: {
      src: air32_devboard,
      alt: "Air32 development board - a compact microcontroller development board"
    },
    description: "A super compact development board design for the Air32 microcontroller chip. This project focuses on creating the smallest possible form factor while maintaining full functionality for embedded development and prototyping.",
    tags: ["Circuit", "PCB Design", "Microcontroller", "Soldering"]
  },
  {
    id: "zsh-theme",
    title: "Custom ZSH Theme that Fits my Taste",
    href: "https://github.com/CocoNautty/cocofish-magic",
    image: {
      src: custom_zsh_theme,
      alt: "Custom ZSH theme screenshot showing terminal interface"
    },
    description: "A personalized ZSH theme designed for enhanced productivity and visual appeal. Features custom prompts, git integration, and performance optimizations tailored for daily development workflow.",
    tags: ["Shell", "Linux", "ZSH"]
  }
];