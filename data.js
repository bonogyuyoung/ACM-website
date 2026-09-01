const siteInfo = {
  projectName: "[Project Name Here]",
  tagline: "Student-led medical STEM education project",
  mission:
    "We create research-based articles and explanatory videos that make medical and scientific topics easier for students to understand.",
  currentStage:
    "June proof-of-work prototype. Full archive and platform features will be developed later."
};

const topics = [
  {
    title: "Antibiotic Resistance",
    category: "Immunology & Disease",
    difficulty: "Intermediate",
    status: "Drafting",
    description:
      "Explains how bacteria develop resistance through mutation, natural selection, and public health factors."
  },
  {
    title: "Vaccines and Immune Memory",
    category: "Immunology & Disease",
    difficulty: "Beginner-Intermediate",
    status: "Researching",
    description:
      "Explains how vaccines help the immune system recognize pathogens."
  },
  {
    title: "CRISPR and Sickle Cell Disease",
    category: "Genetics & Biotechnology",
    difficulty: "Advanced",
    status: "Planned",
    description:
      "Explains how gene editing can connect to inherited blood disorders."
  }
];

const articles = [
  {
    title: "How Evolution Creates Antibiotic Resistance",
    relatedTopic: "Antibiotic Resistance",
    status: "Drafting",
    lastUpdated: "June 2026",
    summary:
      "A student-friendly explanation of how bacterial mutations and natural selection can lead to antibiotic resistance.",
    link: "article-template.html"
  },
  {
    title: "How Vaccines Train Immune Memory",
    relatedTopic: "Vaccines and Immune Memory",
    status: "Researching",
    lastUpdated: "TBD",
    summary:
      "This article will explain how vaccines prepare the immune system to respond faster to future infections.",
    link: "#"
  }
];

const videos = [
  {
    title: "Antibiotic Resistance Explained in 90 Seconds",
    relatedContent: "How Evolution Creates Antibiotic Resistance",
    status: "Script Writing",
    plannedLength: "1–2 minutes",
    description:
      "A short explainer video showing how bacteria can become resistant to antibiotics.",
    link: "#"
  },
  {
    title: "Vaccines and Immune Memory",
    relatedContent: "How Vaccines Train Immune Memory",
    status: "Planned",
    plannedLength: "3–5 minutes",
    description:
      "A planned video explaining how immune memory works.",
    link: "#"
  }
];

const teamRoles = [
  {
    role: "Project Lead",
    responsibility: "Overall direction, planning, and school communication."
  },
  {
    role: "Research Team",
    responsibility: "Topic selection and source gathering."
  },
  {
    role: "Article Writers",
    responsibility: "Writing research-based articles."
  },
  {
    role: "Editors",
    responsibility: "Checking clarity, accuracy, and citations."
  },
  {
    role: "Video Team",
    responsibility: "Script writing, recording, and editing."
  },
  {
    role: "Web Team",
    responsibility: "Website structure and updates."
  }
];

const roadmap = [
  {
    phase: "June Prototype",
    description:
      "Build a simple proof-of-work website showing our mission, topic plans, and content structure."
  },
  {
    phase: "Summer Archive",
    description:
      "Publish the first set of research-based articles and explainer videos."
  },
  {
    phase: "Future Platform",
    description:
      "Develop course pages, practice questions, and carefully reviewed personalized learning tools."
  }
];

const homeButtons = [
  {
    label: "Explore Topics",
    description: "See the medical and scientific topics our team is researching.",
    href: "topics.html",
    style: "primary"
  },
  {
    label: "Read Articles",
    description: "View our research-based article archive and current drafts.",
    href: "articles.html",
    style: "secondary"
  },
  {
    label: "Watch Videos",
    description: "Explore planned and uploaded student-friendly explainer videos.",
    href: "videos.html",
    style: "secondary"
  },
  {
    label: "Future Platform",
    description: "Learn how this prototype may grow into a larger learning platform.",
    href: "future.html",
    style: "secondary"
  },
  {
    label: "Who We Are",
    description: "Learn about our team structure, mission, and project roles.",
    href: "about.html",
    style: "secondary"
  },
  {
    label: "Contact / Join",
    description: "Share feedback, suggest topics, or express interest in joining.",
    href: "contact.html",
    style: "secondary"
  }
];

const featuredVideo = {
  label: "Latest Explainer",
  title: "Antibiotic Resistance Explained in 90 Seconds",
  description:
    "Our newest student-made video explains how bacteria can become resistant to antibiotics through mutation and natural selection.",
  status: "Script Writing",
  thumbnail: "assets/placeholders/video-placeholder.png",
  link: "#",
  relatedArticle: "How Evolution Creates Antibiotic Resistance"
};
