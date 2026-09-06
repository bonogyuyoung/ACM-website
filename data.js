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
    // article.html?id= renders the full 7-section article for any item
    // that has an article slot, so the link never depends on a manually
    // entered URL.
    link: `article.html?id=${encodeURIComponent(item.id)}`
  }));

const videos = allItems
  .filter(item => item.video)
  .map(item => ({
    title: item.video.title || item.title,
    relatedContent: item.title,
    status: item.video.status || item.status,
    plannedLength: item.video.plannedLength,
    description: item.video.description,
    // YouTube video id for the 16:9 embed (script.js renderVideoEmbed()).
    // No id yet -> the embed falls back to a "Coming Soon" placeholder.
    youtubeId: item.video.youtubeId
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

// The long-term platform (future.html) has three structural parts, per
// PLAN.md's architecture — this describes what the platform is made of, not
// confirmed content, so it isn't subject to the no-content-hardcoding rule.
// Part 3 depends on a gate (guardian consent + staff approval before any
// account or personal learning data exists) that hasn't opened yet, so its
// entry carries `gated: true` instead of a timeline claim.
const futurePlatform = [
  {
    title: "Science Communication",
    description:
      "Research-based articles and explainer videos on medical and scientific topics, organized into collections of items.",
    gated: false
  },
  {
    title: "Academic Courses",
    description:
      "Structured courses with units, lessons, and practice questions, built and edited from the console.",
    gated: false
  },
  {
    title: "Personalized Learning",
    description:
      "Account-based progress tracking, strength/weakness analysis, and a reviewed AI tutor built on course content.",
    gated: true,
    gateNote:
      "Waiting on guardian consent and staff approval before any account or personal learning data can be stored."
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

// Featured video: automatically the video slot of the most recently updated
// published item (never a manually chosen one, so it never needs editing
// here as content changes). "Published" means the last stage in
// config.statusStages, read live rather than assumed. "Most recent" compares
// item.video.lastUpdated, an optional field set per video slot. No qualifying
// item -> featuredVideo is null and renderFeaturedVideo() in script.js hides
// the section entirely instead of showing an empty one.
const finalStatusStage = config.statusStages.length
  ? config.statusStages[config.statusStages.length - 1].toLowerCase()
  : null;

const publishedVideoItems = finalStatusStage
  ? allItems.filter(item => {
      if (!item.video) return false;
      const status = (item.video.status || item.status || '').toLowerCase();
      return status === finalStatusStage;
    })
  : [];

const mostRecentVideoItem = publishedVideoItems.reduce((latest, current) => {
  if (!latest) return current;
  const latestDate = latest.video.lastUpdated ? new Date(latest.video.lastUpdated) : null;
  const currentDate = current.video.lastUpdated ? new Date(current.video.lastUpdated) : null;
  if (!currentDate) return latest;
  if (!latestDate) return current;
  return currentDate > latestDate ? current : latest;
}, null);

const featuredVideo = mostRecentVideoItem
  ? {
      label: "Featured Video",
      title: mostRecentVideoItem.video.title || mostRecentVideoItem.title,
      status: mostRecentVideoItem.video.status || mostRecentVideoItem.status,
      description: mostRecentVideoItem.video.description,
      relatedArticle: mostRecentVideoItem.title,
      youtubeId: mostRecentVideoItem.video.youtubeId
    }
  : null;
