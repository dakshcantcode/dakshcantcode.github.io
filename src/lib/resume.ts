export type Profile = {
  name: string;
  headline: string;
  school: string;
  program: string;
  scholarship: string;
  gpa: string;
  years: string;
  location: string;
  summary: string;
};

export type Experience = {
  company: string;
  role: string;
  dates: string;
  location: string;
  highlights: string[];
};

export type Metric = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  award?: string;
  tagline: string;
  description: string;
  highlights: string[];
  metrics: Metric[];
  tech: string[];
};

export type SkillGroup = {
  label: string;
  skills: string[];
};

export type Stat = {
  value: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type FocusArea = {
  title: string;
  description: string;
  icon: "code" | "brain" | "layers" | "box";
};

export const profile: Profile = {
  name: "Daksh Agrawal",
  headline: "Software engineer & machine learning builder.",
  school: "University of Waterloo",
  program: "BCS Honours Computer Science, Co-op",
  scholarship: "President's Scholarship of Distinction",
  gpa: "3.8",
  years: "2025 to 2030",
  location: "Waterloo, Canada",
  summary:
    "I build software where engineering meets machine learning. GraphQL layers that tame ten-thousand-file systems, diagnostic tools that turn flat CT scans into 3D lungs you can spin around.",
};

export const experience: Experience[] = [
  {
    company: "Kissht",
    role: "AI Engineer",
    dates: "May to Aug 2026",
    location: "Current",
    highlights: [
      // Placeholder highlights — Daksh: replace with shipped outcomes as the term progresses.
      "Building AI systems on Kissht's consumer lending platform. Real shipped outcomes land here as the term goes on.",
      "Working across the ML lifecycle: data pipelines, model iteration, and taking models to production.",
    ],
  },
  {
    company: "OptimaCore Inc",
    role: "Software Engineer",
    dates: "Oct 2025 to Feb 2026",
    location: "Remote",
    highlights: [
      "Built a GraphQL layer mapping queries directly to underlying filesystem structures of 10,000+ files, enabling single-request retrieval of complex metadata and reducing network overhead by 40%.",
      "Refactored over 2,000 lines of legacy code and updated them to modern frameworks, leading to a 20% reduction in client-reported issues in production.",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "pulmoscan",
    index: "01",
    name: "PulmoScan",
    award: "HackCanada Sponsor Track Winner",
    tagline: "Flat CT scans, reconstructed as living 3D lungs.",
    description:
      "An ML-driven lung diagnostic suite that turns 200+ flat CT slices into an interactive 3D model of the patient's actual lung. It goes after the 20 to 30 percent miss rate on actionable nodules and the 11-week referral gap that follows.",
    highlights: [
      "VTK.js and Marching Cubes render translucent lung segmentations with interactive, clickable spatial annotations.",
      "Three.js and Framer Motion landing page featuring a procedurally animated lung mesh.",
    ],
    metrics: [
      { value: "200+", label: "2D CT slices fused into one 3D lung" },
      { value: "20-30%", label: "nodule miss rate targeted" },
      { value: "11 wks", label: "referral gap addressed via visual triage" },
    ],
    tech: ["VTK.js", "Three.js", "Framer Motion", "Python", "Marching Cubes"],
  },
  {
    slug: "neurosketch",
    index: "02",
    name: "NeuroSketch",
    award: "CTRLHACKDEL 2.0 Overall Winner",
    tagline: "A two-minute sketch that screens for Parkinson's.",
    description:
      "A pre-Parkinson's screening platform that reads hand-drawn spirals and waves for early warning signs, squeezing a 15-minute clinical motor assessment into a 2-minute self-test.",
    highlights: [
      "MobileNetV2 CNN pipeline parses and analyzes Archimedes Spiral & Wave geometry.",
      "Grad-CAM heatmaps pinpoint “risk zones” directly on the patient's drawing.",
    ],
    metrics: [
      { value: "<2 min", label: "self-test vs 15-minute clinical assessment" },
      { value: "400%", label: "potential increase in triage throughput" },
      { value: "CNN", label: "MobileNetV2 with Grad-CAM explainability" },
    ],
    tech: ["PyTorch", "MobileNetV2", "Grad-CAM", "Python", "React"],
  },
  {
    slug: "satellite-change-detection",
    index: "03",
    name: "Satellite Change Detection",
    tagline: "Two photos of Earth, and everything that changed between them.",
    description:
      "A deep learning app that spots what changed between two satellite photos of the same place: new buildings, cleared forest, anything that moved.",
    highlights: [
      "Siamese Neural Network compares two time periods, achieving an F1-Score of 0.84.",
      "Data pipeline normalizes and processes 1GB+ GeoTIFF files and 13-band imagery with TorchGeo.",
    ],
    metrics: [
      { value: "0.84", label: "F1-Score on change detection" },
      { value: "1GB+", label: "GeoTIFF files processed per pass" },
      { value: "13", label: "spectral bands normalized in the pipeline" },
    ],
    tech: ["PyTorch", "TorchGeo", "Next.js", "FastAPI", "Jupyter"],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    skills: ["C", "Python", "JavaScript", "TypeScript", "HTML", "Tailwind CSS", "SQL"],
  },
  {
    label: "Machine Learning & Data",
    skills: ["PyTorch", "TensorFlow", "TorchGeo", "Jupyter Notebook", "MongoDB"],
  },
  {
    label: "Web & Frameworks",
    skills: ["Next.js", "React", "FastAPI", "GraphQL", "Three.js", "VTK.js", "Framer Motion", "Reflex"],
  },
  {
    label: "Tools",
    skills: ["Git", "Linux"],
  },
];

export const stats: Stat[] = [
  { value: 3.8, decimals: 1, label: "GPA, Honours CS @ Waterloo" },
  { value: 40, decimals: 0, suffix: "%", label: "network overhead cut at OptimaCore" },
  { value: 2, decimals: 0, suffix: "×", label: "hackathon winner" },
  { value: 0.84, decimals: 2, label: "F1-score, satellite change detection" },
];

export const focusAreas: FocusArea[] = [
  {
    title: "Software Engineering",
    description: "Production systems: GraphQL layers, legacy modernization, APIs that hold up under load.",
    icon: "code",
  },
  {
    title: "Machine Learning",
    description: "CNNs, Siamese networks, and explainable pipelines applied to real diagnostic problems.",
    icon: "brain",
  },
  {
    title: "Full-Stack",
    description: "Next.js, React, and FastAPI. End-to-end products, from data pipeline to polished UI.",
    icon: "layers",
  },
  {
    title: "3D & Visualization",
    description: "Three.js and VTK.js, turning flat data into something you can reach into.",
    icon: "box",
  },
];

export const contact = {
  email: "ds2agraw@uwaterloo.ca",
  linkedin: "https://www.linkedin.com/in/dakshagrawal1408/",
  github: "https://github.com/dakshcantcode",
  cta: "AI Engineer @ Kissht this summer, open to future co-op terms",
};
