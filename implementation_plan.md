# Medical STEM Education Prototype Website Implementation Plan

This document outlines the proposed file structure, architecture, and editing guide for the static proof-of-work website. 

## 1. Proposed File Structure & 2. List of Files to Create

```text
/
├── index.html                # Home page
├── topics.html               # Topics overview page
├── articles.html             # Articles listing page
├── videos.html               # Videos listing page
├── future-platform.html      # Roadmap and future features page
├── who-we-are.html           # Team roles and mission page
├── contact.html              # Contact page with Google Form placeholder
├── article-template.html     # Reusable article template page
├── css/
│   └── styles.css            # Global stylesheet with CSS variables
└── js/
    ├── data.js               # Centralized data storage for easy editing
    └── script.js             # Logic for dynamic rendering (header/footer, cards)
```

## 3. How `data.js` Makes the Website Easy to Update

The `data.js` file acts as a simple "database" for your static site. It will contain Javascript objects and arrays that hold all the text, titles, and links for your content.

Instead of hunting through multiple HTML files to change the name of a topic or update a team member's role, your team will only need to open `data.js` and modify a value. 

For example:
```javascript
const topics = [
    { title: "Cellular Biology", status: "Drafting", description: "Learn about the building blocks of life." },
    // Adding a new topic is as simple as adding another line here!
];
```
When the `topics.html` page loads, `script.js` will read this array and automatically generate the HTML cards for each topic. This adheres to the DRY (Don't Repeat Yourself) principle and ensures formatting remains perfectly consistent.

## 4. Which Parts Your Team Should Edit Later

Your team will primarily focus on editing two things:

1. **`js/data.js`**: 
   - Update `siteInfo` with the real project name and contact links.
   - Populate `topics`, `articles`, and `videos` with real educational content.
   - Update `teamRoles` as your team grows.
   - Modify `roadmap` and `futureFeatures` as your project evolves.
2. **`css/styles.css` (specifically the `:root` variables)**:
   - Change the primary colors, background colors, and font families to match your final branding.

The HTML files and `script.js` will largely remain untouched unless you want to add entirely new pages or change the fundamental layout of the cards.

## User Review Required
Please review the proposed structure and architecture above. Once you approve, I will proceed to generate the HTML, CSS, and JS files to build out the website.
