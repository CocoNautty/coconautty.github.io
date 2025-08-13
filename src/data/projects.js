import portfolio_screenshot from '../assets/images/projects/portfolio_screenshot.png';
import mine_sweeper from '../assets/images/projects/mine-sweeper.png';
import air32_devboard from '../assets/images/projects/Air32_devboard.jpg';
import custom_zsh_theme from '../assets/images/projects/custom-zsh-theme.png';

export const projectsData = [
  {
    id: "interactive-portfolio",
    title: "Interactive Portfolio Website",
    href: "https://github.com/CocoNautty/coconautty.github.io",
    image: {
      src: portfolio_screenshot,
      alt: "Interactive portfolio website with 3D Three.js background and modern design"
    },
    description: "A modern, responsive portfolio website featuring an immersive 3D Three.js background and professional showcase design. Built with React and Vite, this project demonstrates advanced web development skills including 3D graphics rendering, GSAP animations, SCSS architecture, and performance optimization. Features adaptive scroll-based camera movements, smooth transitions, and comprehensive project documentation.",
    tags: ["React", "Three.js", "SCSS", "Vite", "Portfolio"]
  },
  {
    id: "react-minesweeper",
    title: "React Minesweeper",
    href: "https://github.com/CocoNautty/React-Minesweeper",
    image: {
      src: mine_sweeper,
      alt: "React Minesweeper game interface showing the classic game board"
    },
    description: "A feature-rich recreation of the classic Minesweeper game built with React and developed collaboratively with a teammate. This project showcases advanced state management using Context API, recursive algorithms for cell revealing, and complex game logic. Features multiple difficulty levels, real-time leaderboards, first-click protection, and is deployed live for interactive play. It's really fun, and I learned a lot.",
    tags: ["React", "JavaScript", "Web Game", "Collaboration"]
  },
  {
    id: "air32-devboard",
    title: "Air32 Chip Super Tiny Dev Board",
    href: "https://github.com/CocoNautty/Air32_MiniDevBoard",
    image: {
      src: air32_devboard,
      alt: "Air32 development board - a compact microcontroller development board"
    },
    description: "A custom-engineered microcontroller development board featuring complete 40-pin breakout in an ultra-compact form factor. Integrates USB power regulation, auto-burning circuit for seamless programming, and status LEDs for system monitoring. The design includes comprehensive documentation with Gerber files, BOM, and schematics, showcasing a complete hardware development pipeline from concept to manufacturing-ready PCB using JLC EDA platform.",
    tags: ["PCB Design", "Hardware Engineering", "USB Integration", "Microcontroller", "Manufacturing"]
  },
  {
    id: "zsh-theme",
    title: "Custom ZSH Theme that Fits my Taste",
    href: "https://github.com/CocoNautty/cocofish-magic",
    image: {
      src: custom_zsh_theme,
      alt: "Custom ZSH theme screenshot showing terminal interface"
    },
    description: "A developer-focused ZSH theme engineered to solve Python environment visibility issues in terminal workflows. Built on af-magic foundation with custom color system for conda/Python environment prompts, preventing environment names from blending into terminal output. Features flexible color customization through both numeric and named parameters, complete installation documentation, and seamless conda integration for enhanced developer productivity.",
    tags: ["Developer Tools", "ZSH", "Python Integration", "Terminal Customization", "UX Design"]
  }
];