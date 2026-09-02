/*
  data.js
  Single source of truth for site configuration and content.

  config      — settings the console (B track) will eventually let staff edit:
                site identity, display labels, publish cadence, status pipeline,
                subject categories.
  collections — the only content structure. Two tiers: a collection (default
                display label "Season") holds items (default display label
                "Episode"). Each item optionally carries an `article`, `video`,
                and/or `paper` slot. Starts empty — no content is confirmed yet.

  topics / articles / videos below are derived (not authored) from
  `collections` so the existing page renderers in script.js keep working
  unmodified whether there are 0 items or many.
*/

const config = {
  projectName: "[Project Name Here]",
  tagline: "Student-led medical STEM education project",
  mission:
    "We create research-based articles and explanatory videos that make medical and scientific topics easier for students to understand.",
  currentStage:
    "June proof-of-work prototype. Full archive and platform features will be developed later.",

  labels: {
    collection: "Season",
    collectionPlural: "Seasons",
    item: "Episode",
    itemPlural: "Episodes"
  },

  // Order defines the pipeline. getBadgeClass() falls back to a default
  // badge style for any status not in this list.
  statusStages: ["Planned", "Researching", "Drafting", "Review", "Published"],

  // Not yet decided — filled in from the console once content exists.
  subjectCategories: [],

  // Not yet decided — null until set in the console (no cadence assumed).
  publishCadence: null
};

// Backward-compatible alias: script.js reads `siteInfo` directly.
const siteInfo = config;

// No seasons/episodes exist yet. Content is added from the console (B track),
// never hardcoded here.
const collections = [];

const allItems = collections.flatMap(collection => collection.items || []);

const topics = allItems.map(item => ({
  title: item.title,
  category: item.subject,
  difficulty: item.difficulty,
  status: item.status,
  description: item.description
}));

const articles = allItems
  .filter(item => item.article)
  .map(item => ({
    title: item.article.title || item.title,
    relatedTopic: item.title,
    status: item.article.status || item.status,
    lastUpdated: item.article.lastUpdated,
    summary: item.article.summary,
    link: item.article.link || "#"
  }));

const videos = allItems
  .filter(item => item.video)
  .map(item => ({
    title: item.video.title || item.title,
    relatedContent: item.title,
    status: item.video.status || item.status,
    plannedLength: item.video.plannedLength,
    description: item.video.description,
    link: item.video.link || "#"
  }));

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

// No featured video yet — there is no published content to feature.
// renderFeaturedVideo() in script.js already no-ops when this is falsy.
const featuredVideo = null;
