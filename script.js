/*
  script.js
  This file handles the dynamic rendering of the website using data from data.js.
  It safely checks if an HTML container exists before trying to render content into it.
*/

// Render the header with navigation
function renderHeader() {
  const container = document.getElementById("header-container");
  if (!container) return; // Safely return if container doesn't exist on this page

  // Get current path to highlight active nav link
  const currentPath = window.location.pathname;
  
  // Helper function to determine if a link is active
  const isActive = (path) => currentPath.endsWith(path) || (currentPath.endsWith('/') && path === 'index.html') ? 'active' : '';

  container.innerHTML = `
    <header>
      <div class="header-content">
        <div class="header-top">
          <div class="header-brand">
            <h1>${siteInfo.projectName}</h1>
            <p>${siteInfo.tagline}</p>
          </div>
          <div class="header-actions">
            <button class="settings-button" id="settings-btn" aria-expanded="false" aria-controls="settings-panel">⚙ Settings</button>
            <div class="settings-panel" id="settings-panel">
              <ul>
                <li>Display preferences — Coming soon</li>
                <li>Accessibility options — Coming soon</li>
                <li>Account features — Future feature</li>
              </ul>
              <p>Settings are not active in this prototype.</p>
            </div>
          </div>
        </div>
        <div class="explore-nav">
          <button class="explore-button" id="explore-btn" aria-expanded="false" aria-controls="explore-menu">Explore ▾</button>
          <nav class="explore-menu" id="explore-menu">
            <a href="index.html" class="${isActive('index.html')}">Home</a>
            <a href="seasons.html" class="${isActive('seasons.html')}">${escapeHTML(config.labels.collectionPlural)}</a>
            <a href="topics.html" class="${isActive('topics.html')}">Topics</a>
            <a href="articles.html" class="${isActive('articles.html')}">Articles</a>
            <a href="videos.html" class="${isActive('videos.html')}">Videos</a>
            <a href="future.html" class="${isActive('future.html')}">Future Platform</a>
            <a href="about.html" class="${isActive('about.html')}">Who We Are</a>
            <a href="contact.html" class="${isActive('contact.html')}">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  `;

  // Initialize interactive menus
  initSettingsMenu();
  initExploreMenu();
}

function initSettingsMenu() {
  const btn = document.getElementById("settings-btn");
  const panel = document.getElementById("settings-panel");
  if (!btn || !panel) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = panel.classList.contains("open");
    if (isOpen) {
      panel.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    } else {
      // Close other menus if open
      document.getElementById("explore-menu")?.classList.remove("open");
      document.getElementById("explore-btn")?.setAttribute("aria-expanded", "false");

      panel.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });

  document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) {
      panel.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      panel.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

function initExploreMenu() {
  const btn = document.getElementById("explore-btn");
  const menu = document.getElementById("explore-menu");
  const nav = document.querySelector(".explore-nav");
  if (!btn || !menu || !nav) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.contains("open");
    if (isOpen) {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    } else {
      // Close other menus if open
      document.getElementById("settings-panel")?.classList.remove("open");
      document.getElementById("settings-btn")?.setAttribute("aria-expanded", "false");

      menu.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  // Update aria-expanded on hover for completeness
  nav.addEventListener("mouseenter", () => {
    btn.setAttribute("aria-expanded", "true");
  });
  nav.addEventListener("mouseleave", () => {
    if (!menu.classList.contains("open")) {
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

// Render the footer with disclaimers
function renderFooter() {
  const container = document.getElementById("footer-container");
  if (!container) return;

  container.innerHTML = `
    <footer>
      <div class="footer-content">
        <p class="footer-disclaimer">This website is created by students for educational purposes only. It does not provide medical advice, diagnosis, or treatment.</p>
        <p class="footer-privacy">This prototype does not collect passwords, phone numbers, medical information, academic records, or personal study data.</p>
        <p class="footer-stage">${siteInfo.currentStage}</p>
      </div>
    </footer>
  `;
}

// Render basic site info on the home page
function renderSiteInfo() {
  const nameEl = document.getElementById("site-name");
  const taglineEl = document.getElementById("site-tagline");
  const missionEl = document.getElementById("site-mission");
  const stageEl = document.getElementById("site-stage");

  if (nameEl) nameEl.textContent = siteInfo.projectName;
  if (taglineEl) taglineEl.textContent = siteInfo.tagline;
  if (missionEl) missionEl.textContent = siteInfo.mission;
  if (stageEl) stageEl.textContent = siteInfo.currentStage;
}

// Helper function to generate status badge class.
// Falls back to "badge default" for any status not listed in config.statusStages,
// since the CSS has no color defined for unrecognized status strings.
function getBadgeClass(status) {
  const normalize = (str) => (str || '').toLowerCase().replace(/\s+/g, '-');
  const normalized = normalize(status);
  const knownStages = (typeof config !== 'undefined' && Array.isArray(config.statusStages))
    ? config.statusStages
    : [];
  const isKnown = knownStages.some(stage => normalize(stage) === normalized);
  return isKnown ? `badge ${normalized}` : 'badge default';
}

// Render an empty-state block into a container. Used by every list render
// function so an empty list is a designed screen, not a blank/broken one.
function renderEmptyState(container, message) {
  container.innerHTML = `
    <div class="empty-state">
      <p>${escapeHTML(message)}</p>
    </div>
  `;
}

// Render collection cards (default label: Season) on seasons.html.
// Each collection card shows its title, optional subtitle, item count, and
// progress toward the final status stage — all read from config/collections,
// never assumed.
function renderCollections() {
  const container = document.getElementById("collections-grid");
  if (!container) return;

  const collectionLabel = config.labels.collection;
  const collectionPlural = config.labels.collectionPlural;
  const itemPlural = config.labels.itemPlural;

  const headingEl = document.getElementById("collections-heading");
  const subheadingEl = document.getElementById("collections-subheading");
  if (headingEl) headingEl.textContent = collectionPlural;
  if (subheadingEl) {
    subheadingEl.textContent =
      `Browse each ${collectionLabel.toLowerCase()} and how many ${itemPlural.toLowerCase()} it contains.`;
  }
  document.title = `${collectionPlural} | ${siteInfo.projectName}`;

  if (!collections || collections.length === 0) {
    renderEmptyState(container, `No ${collectionPlural.toLowerCase()} have been published yet. Check back soon.`);
    return;
  }

  const stages = config.statusStages || [];
  const finalStage = stages.length ? stages[stages.length - 1].toLowerCase() : null;

  container.innerHTML = collections.map(collection => {
    const items = collection.items || [];
    const total = items.length;
    const doneCount = finalStage
      ? items.filter(item => (item.status || '').toLowerCase() === finalStage).length
      : 0;
    const progress = total > 0 ? Math.round((doneCount / total) * 100) : 0;
    const subtitleHtml = collection.subtitle ? `<p>${escapeHTML(collection.subtitle)}</p>` : '';

    return `
      <div class="card">
        <h3>${escapeHTML(collection.title)}</h3>
        ${subtitleHtml}
        <div class="card-meta">
          <strong>${escapeHTML(itemPlural)}:</strong> ${total}<br>
          <strong>Progress:</strong> ${progress}%
        </div>
      </div>
    `;
  }).join('');
}

// Find an item (default label: Episode) by id across every collection.
function findItemById(id) {
  for (const collection of collections) {
    const items = collection.items || [];
    const item = items.find(candidate => String(candidate.id) === String(id));
    if (item) return { item, collection };
  }
  return null;
}

// Render a single item's detail page (episode.html?id=...). One page handles
// every item regardless of how many exist. An invalid/missing id shows a
// guide back to the collection list instead of a broken page.
function renderEpisode() {
  const container = document.getElementById("episode-container");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const match = id ? findItemById(id) : null;

  const itemLabel = config.labels.item;
  const collectionPlural = config.labels.collectionPlural;

  if (!match) {
    document.title = `${itemLabel} Not Found | ${siteInfo.projectName}`;
    container.innerHTML = `
      <div class="empty-state">
        <p>We couldn't find that ${escapeHTML(itemLabel.toLowerCase())}.</p>
        <a href="seasons.html" class="btn btn-active">Back to ${escapeHTML(collectionPlural)}</a>
      </div>
    `;
    return;
  }

  const { item, collection } = match;
  document.title = `${item.title} | ${siteInfo.projectName}`;

  const coreConceptsHtml = item.coreConcepts && item.coreConcepts.length
    ? `<ul>${item.coreConcepts.map(concept => `<li>${escapeHTML(concept)}</li>`).join('')}</ul>`
    : `<p>Coming soon.</p>`;

  const bigQuestionHtml = item.bigQuestion
    ? `<p>${escapeHTML(item.bigQuestion)}</p>`
    : `<p>Coming soon.</p>`;

  const renderSlot = (label, slot) => {
    const isReady = slot && slot.link && slot.link !== "#";
    const button = isReady
      ? `<a href="${escapeHTML(slot.link)}" class="btn btn-active">View ${escapeHTML(label)}</a>`
      : `<span class="btn btn-disabled">Coming Soon</span>`;
    return `
      <div class="card">
        <h4>${escapeHTML(label)}</h4>
        ${button}
      </div>
    `;
  };

  container.innerHTML = `
    <div class="card">
      <div class="article-header">
        <span class="${getBadgeClass(item.status)}">${escapeHTML(item.status || '')}</span>
        <h2>${escapeHTML(item.title)}</h2>
        <div class="card-meta">
          <strong>${escapeHTML(config.labels.collection)}:</strong> ${escapeHTML(collection.title)}
        </div>
      </div>

      <section>
        <h3>Core Concepts</h3>
        ${coreConceptsHtml}
      </section>

      <section>
        <h3>Big Question</h3>
        ${bigQuestionHtml}
      </section>

      <section class="grid-container">
        ${renderSlot("Article", item.article)}
        ${renderSlot("Video", item.video)}
        ${renderSlot("Paper", item.paper)}
      </section>
    </div>
  `;
}

// Render topic cards
// The cards are rendered from the topics array in data.js
function renderTopics() {
  const container = document.getElementById("topics-grid");
  if (!container) return;

  if (!topics || topics.length === 0) {
    renderEmptyState(container, "No topics have been published yet. Check back soon.");
    return;
  }

  container.innerHTML = topics.map(topic => `
    <div class="card">
      <span class="${getBadgeClass(topic.status)}">${topic.status}</span>
      <h3>${topic.title}</h3>
      <div class="card-meta">
        <strong>Category:</strong> ${topic.category}<br>
        <strong>Difficulty:</strong> ${topic.difficulty}
      </div>
      <p>${topic.description}</p>
    </div>
  `).join('');
}

// Render article cards
function renderArticles() {
  const container = document.getElementById("articles-grid");
  if (!container) return;

  if (!articles || articles.length === 0) {
    renderEmptyState(container, "No articles have been published yet. Check back soon.");
    return;
  }

  // Render articles and determine button state based on link
  // If link is "#", show a disabled "Coming Soon" button.
  container.innerHTML = articles.map(article => {
    const isReady = article.link && article.link !== "#";
    const buttonHtml = isReady 
      ? `<a href="${article.link}" class="btn btn-active">View Article</a>`
      : `<span class="btn btn-disabled">Coming Soon</span>`;

    return `
      <div class="card">
        <span class="${getBadgeClass(article.status)}">${article.status}</span>
        <h3>${article.title}</h3>
        <div class="card-meta">
          <strong>Topic:</strong> ${article.relatedTopic}<br>
          <strong>Last Updated:</strong> ${article.lastUpdated}
        </div>
        <p>${article.summary}</p>
        ${buttonHtml}
      </div>
    `;
  }).join('');
}

// Render video cards
function renderVideos() {
  const container = document.getElementById("videos-grid");
  if (!container) return;

  if (!videos || videos.length === 0) {
    renderEmptyState(container, "No videos have been published yet. Check back soon.");
    return;
  }

  // Render videos and determine button state based on link
  container.innerHTML = videos.map(video => {
    const isReady = video.link && video.link !== "#";
    const buttonHtml = isReady 
      ? `<a href="${video.link}" class="btn btn-active">Watch Video</a>`
      : `<span class="btn btn-disabled">Coming Soon</span>`;

    return `
      <div class="card">
        <span class="${getBadgeClass(video.status)}">${video.status}</span>
        <h3>${video.title}</h3>
        <div class="card-meta">
          <strong>Related Content:</strong> ${video.relatedContent}<br>
          <strong>Length:</strong> ${video.plannedLength}
        </div>
        <p>${video.description}</p>
        ${buttonHtml}
      </div>
    `;
  }).join('');
}

// Render team roles on the About page
function renderTeamRoles() {
  const container = document.getElementById("team-roles-grid");
  if (!container) return;

  if (!teamRoles || teamRoles.length === 0) {
    renderEmptyState(container, "Team roles haven't been added yet.");
    return;
  }

  container.innerHTML = teamRoles.map(role => `
    <div class="card">
      <h3>${role.role}</h3>
      <p>${role.responsibility}</p>
    </div>
  `).join('');
}

// Render roadmap on the Future page
function renderRoadmap() {
  const container = document.getElementById("roadmap-list");
  if (!container) return;

  if (!roadmap || roadmap.length === 0) {
    renderEmptyState(container, "Roadmap hasn't been added yet.");
    return;
  }

  container.innerHTML = roadmap.map(phase => `
    <div class="card">
      <h3>${phase.phase}</h3>
      <p>${phase.description}</p>
    </div>
  `).join('');
}

// Helper to escape HTML characters
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Render homepage navigation buttons
function renderHomeButtons() {
  const container = document.getElementById("home-buttons");
  if (!container) return;

  if (typeof homeButtons === 'undefined' || !homeButtons || homeButtons.length === 0) {
    renderEmptyState(container, "No navigation links configured yet.");
    return;
  }

  container.innerHTML = homeButtons.map(btn => `
    <a href="${escapeHTML(btn.href)}" class="home-button-card home-button-${escapeHTML(btn.style)}">
      <span class="home-button-label">${escapeHTML(btn.label)}</span>
      <span class="home-button-description">${escapeHTML(btn.description)}</span>
    </a>
  `).join('');
}

// Render featured video section on the home page
function renderFeaturedVideo() {
  const container = document.getElementById("featured-video-container");
  if (!container) return;
  if (typeof featuredVideo === 'undefined' || !featuredVideo) return;

  const isReady = featuredVideo.link && featuredVideo.link !== "#";
  const buttonHtml = isReady 
    ? `<a href="${featuredVideo.link}" class="btn btn-active">Watch Video</a>`
    : `<span class="btn btn-disabled">Coming Soon</span>`;

  container.innerHTML = `
    <div class="featured-video-section">
      <h3>${featuredVideo.label}</h3>
      <div class="featured-video-content">
        <div class="featured-video-text">
          <h4>${featuredVideo.title}</h4>
          <span class="${getBadgeClass(featuredVideo.status)}">${featuredVideo.status}</span>
          <p>${featuredVideo.description}</p>
          <p><strong>Related Article:</strong> ${featuredVideo.relatedArticle}</p>
          <div class="featured-video-actions">
            ${buttonHtml}
          </div>
        </div>
        <div class="featured-video-media">
          <img src="${featuredVideo.thumbnail}" alt="Video Thumbnail" class="featured-video-thumbnail">
        </div>
      </div>
    </div>
  `;
}

// Initialize all render functions
// Functions will safely return if their respective containers are not on the page
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderSiteInfo();
  renderFeaturedVideo();
  renderCollections();
  renderEpisode();
  renderTopics();
  renderArticles();
  renderVideos();
  renderTeamRoles();
  renderRoadmap();
  renderHomeButtons();
});
