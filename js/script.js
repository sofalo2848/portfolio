// main script for handling theme switching and page navigation
// this file manages the spa-like behavior of the portfolio

document.addEventListener('DOMContentLoaded', () => {
  // grab all the theme-related elements we'll need
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  // see if user had a theme preference from last time
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // let's apply their preferred theme (or dark if it's their first time)
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    setIconToSun();
  } else {
    body.classList.remove('light-theme');
    setIconToMoon();
  }

  // handle theme switching when user clicks the toggle
  themeToggleBtn.addEventListener('click', () => {
    const isLightTheme = body.classList.toggle('light-theme');
    
    // save their choice for next time
    if (isLightTheme) {
      localStorage.setItem('theme', 'light');
      setIconToSun();
    } else {
      localStorage.setItem('theme', 'dark');
      setIconToMoon();
    }
  });

  // helper function to draw the sun icon for light theme
  function setIconToSun() {
    themeIcon.innerHTML = `
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    `;
  }

  // helper function to draw the moon icon for dark theme
  function setIconToMoon() {
    themeIcon.innerHTML = `
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    `;
  }

  // grab all our navigation elements for the single page app
  const navSkills = document.getElementById('nav-skills');
  const navAbout = document.getElementById('nav-about');
  const navExperience = document.getElementById('nav-experience');
  const navProjects = document.getElementById('nav-projects');
  const mainContent = document.querySelector('main.main-content');

  // keep track of our dynamic stylesheets
  let skillsCssLink = null;
  let experienceCssLink = null;
  let aboutCssLink = null;

  // loads the about section and cleans up any other section's styles
  function loadAboutSection() {
    fetch('about.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load about page');
        }
        return response.text();
      })
      .then(html => {
        mainContent.innerHTML = html;

        // remove css for other sections
        if (aboutCssLink) {
            aboutCssLink.remove();
            aboutCssLink = null;
        }
        if (skillsCssLink) {
          skillsCssLink.remove();
          skillsCssLink = null;
        }
        if (experienceCssLink) {
          experienceCssLink.remove();
          experienceCssLink = null;
        }
      })
      .catch(error => {
        console.error('Error loading about section:', error);
        mainContent.innerHTML = '<p>Error loading content. Please try again.</p>';
      });
  }

  // start with the about section when page loads
  loadAboutSection();

  // navigation handlers for each section
  // these handle the spa-like page transitions

  // about section handler
  navAbout.addEventListener('click', (e) => {
    e.preventDefault();
    loadAboutSection();
  });

  // skills section handler - loads skills page and its specific styles
  navSkills.addEventListener('click', (e) => {
    e.preventDefault();

    // fetch skills.html content
    fetch('skills.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load skills page');
        }
        return response.text();
      })
      .then(html => {
        // replace main content with skills content
        mainContent.innerHTML = html;

        // remove existing css links
        if (skillsCssLink) {
          skillsCssLink.remove();
          skillsCssLink = null;
        }
        if (experienceCssLink) {
          experienceCssLink.remove();
          experienceCssLink = null;
        }
        if (aboutCssLink) {
          aboutCssLink.remove();
          aboutCssLink = null;
        }

        // add skills.css stylesheet dynamically
        skillsCssLink = document.createElement('link');
        skillsCssLink.rel = 'stylesheet';
        skillsCssLink.href = 'css/skills.css';
        document.head.appendChild(skillsCssLink);
      })
      .catch(error => {
        console.error(error);
      });
  });

  // experience section handler - loads work history and its styles
  navExperience.addEventListener('click', (e) => {
    e.preventDefault();

    // fetch experience.html content
    fetch('experience.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load experience page');
        }
        return response.text();
      })
      .then(html => {
        // replace main content with experience content
        mainContent.innerHTML = html;

        // remove existing css links
        if (experienceCssLink) {
          experienceCssLink.remove();
          experienceCssLink = null;
        }
        if (skillsCssLink) {
          skillsCssLink.remove();
          skillsCssLink = null;
        }
        if (aboutCssLink) {
          aboutCssLink.remove();
          aboutCssLink = null;
        }

        // add experience.css stylesheet dynamically
        experienceCssLink = document.createElement('link');
        experienceCssLink.rel = 'stylesheet';
        experienceCssLink.href = 'css/experience.css';
        document.head.appendChild(experienceCssLink);
      })
      .catch(error => {
        console.error(error);
      });
  });

  // projects section handler - shows off the portfolio work
  navProjects.addEventListener('click', (e) => {
    e.preventDefault();

    // fetch projects.html content
    fetch('projects.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load projects page');
        }
        return response.text();
      })
      .then(html => {
        // replace main content with projects content
        mainContent.innerHTML = html;

        // remove existing css links
        if (projectsCssLink) {
          projectsCssLink.remove();
          projectsCssLink = null;
        }
        if (skillsCssLink) {
          skillsCssLink.remove();
          skillsCssLink = null;
        }
        if (experienceCssLink) {
          experienceCssLink.remove();
          experienceCssLink = null;
        }
        if (aboutCssLink) {
          aboutCssLink.remove();
          aboutCssLink = null;
        }

        // add projects.css stylesheet dynamically
        projectsCssLink = document.createElement('link');
        projectsCssLink.rel = 'stylesheet';
        projectsCssLink.href = 'css/projects.css';
        document.head.appendChild(projectsCssLink);
      })
      .catch(error => {
        console.error(error);
      });
  });

  // contact info toggle functionality
  // we have two possible contact buttons - one in main area and one in sidebar
  const mainContactToggleBtn = document.getElementById('contact-toggle-btn');
  const mainContactInfo = document.querySelector('.contact-info');

  // handle the main contact toggle if it exists and isn't in the sidebar
  if (mainContactToggleBtn && mainContactInfo && !mainContactToggleBtn.closest('.sidebar')) {
    mainContactToggleBtn.addEventListener('click', () => {
      mainContactInfo.classList.toggle('active');
    });
  }

  // handle the sidebar contact toggle separately
  const sidebarContactToggleBtn = document.getElementById('sidebar-contact-toggle');
  const sidebarElement = document.querySelector('.sidebar');
  
  if (sidebarContactToggleBtn && sidebarElement) {
    const sidebarContactInfo = sidebarElement.querySelector('.contact-info');
    const sidebarHr = sidebarElement.querySelector('hr');

    if (sidebarContactInfo && sidebarHr) {
      sidebarContactToggleBtn.addEventListener('click', () => {
        const isOpen = sidebarContactToggleBtn.classList.toggle('open');
        sidebarContactToggleBtn.setAttribute('aria-expanded', isOpen);
        sidebarContactInfo.classList.toggle('open');
        
        // toggle hr visibility based on contact-info state
        if (isOpen) {
          sidebarHr.classList.remove('hidden-when-contact-closed');
        } else {
          sidebarHr.classList.add('hidden-when-contact-closed');
        }
      });

      // set initial state for hr based on contact-info
      if (!sidebarContactInfo.classList.contains('open')) {
          sidebarHr.classList.add('hidden-when-contact-closed');
      }
    }
  }
});
