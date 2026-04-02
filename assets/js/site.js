(function () {
  const navItems = [
    { key: "home", label: "Home", href: "/" },
    { key: "about", label: "About", href: "/#about" },
    { key: "projects", label: "Projects", href: "/projects/" },
    { key: "blogs", label: "Blogs", href: "/blogs/" },
    { key: "resume", label: "Resume", href: "https://drive.google.com/file/d/1rK-iioi5mBZ_UGJb5s8rR_fZhgtDjMIJ/view?usp=sharing", external: true },
    { key: "contact", label: "Contact", href: "/contact/" }
  ];

  const socialIcons = [
    { label: "GitHub", href: "https://github.com/badri41", icon: "/assets/images/github.png" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/badribishaldas/", icon: "/assets/images/linkedin.png" },
    { label: "Email", href: "mailto:d.badri@iitg.ac.in", icon: "/assets/images/email.png" }
  ];

  const competitiveIcons = [
    { label: "Codeforces", href: "https://codeforces.com/profile/badri41", icon: "/assets/images/codeforces.png" },
    { label: "CodeChef", href: "https://www.codechef.com/users/badri41", icon: "/assets/images/codechef.png" },
    { label: "AtCoder", href: "https://atcoder.jp/users/badri41", icon: "/assets/images/atcoder.png" }
  ];

  class SiteSidebar extends HTMLElement {
    connectedCallback() {
      const current = this.getAttribute("page") || "";
      this.className = "site-sidebar";
      this.innerHTML = `
        <div class="sidebar-inner">
          <div>
            <img class="avatar" src="/assets/images/photo.jpg" alt="Badri Bishal Das">
            <h1 class="name">Badri Bishal Das</h1>
            <p class="subtitle">DSAI Undergrad @ IIT Guwahati</p>
            <p class="subtitle">Incoming ASD Intern @ Google</p>
          </div>

          <nav class="sidebar-nav" aria-label="Primary">
            ${navItems.map(navLink).join("")}
          </nav>

          <div>
            <p class="sidebar-section-label">CP Handles</p>
            <div class="icon-row">
              ${competitiveIcons.map(iconLink).join("")}
            </div>
          </div>

          <div>
            <p class="sidebar-section-label">Connect</p>
            <div class="icon-row">
              ${socialIcons.map(iconLink).join("")}
            </div>
          </div>

          <p class="sidebar-footer">© Badri Bishal Das 2026</p>
        </div>
      `;
    }
  }

  class MobileNav extends HTMLElement {
    connectedCallback() {
      const current = this.getAttribute("page") || "";
      this.className = "mobile-nav";
      this.setAttribute("aria-label", "Mobile");
      this.innerHTML = navItems
        .filter((item) => item.key !== "about")
        .map(navLink)
        .join("");
    }
  }

  class ThemeToggle extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<button class="theme-toggle" type="button" aria-label="Toggle color theme" title="Toggle color theme"></button>`;
      this.button = this.querySelector("button");
      this.render();
      this.button.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", next);
        document.documentElement.dataset.theme = next;
        this.render();
      });
    }

    render() {
      if (!this.button) return;
      this.button.textContent = document.documentElement.dataset.theme === "dark" ? "◐" : "◑";
    }
  }

  class BlogCard extends HTMLElement {
    connectedCallback() {
      const date = this.getAttribute("date") || "";
      const category = this.getAttribute("category") || "";
      const categoryHref = this.getAttribute("category-href") || "";
      const href = this.getAttribute("href") || "#";
      const title = this.getAttribute("title") || "";
      const description = this.getAttribute("description") || "";
      const categoryMarkup = categoryHref
        ? `<a href="${categoryHref}">${category}</a>`
        : category;

      this.className = "blog-card";
      this.innerHTML = `
        <div class="blog-card-meta">
          <span class="blog-card-date">${date}</span>
          <span class="blog-card-category">${categoryMarkup}</span>
        </div>
        <h2 class="blog-card-title"><a href="${href}">${title}</a></h2>
        <p class="blog-card-description">${description}</p>
        <a class="text-link" href="${href}">Read</a>
      `;
    }
  }

  function iconLink(item) {
    return `<a class="icon-link" href="${item.href}" aria-label="${item.label}" title="${item.label}" target="${item.href.startsWith("mailto:") ? "_self" : "_blank"}" ${item.href.startsWith("mailto:") ? "" : 'rel="noreferrer"'}><img src="${item.icon}" alt="${item.label}"></a>`;
  }

  function navLink(item) {
    const current = document.querySelector("site-sidebar")?.getAttribute("page") || document.querySelector("mobile-nav")?.getAttribute("page") || "";
    const activeClass = item.key === current ? "active" : "";
    const target = item.external ? ` target="_blank" rel="noreferrer"` : "";
    return `<a class="${activeClass}" href="${item.href}"${target}>${item.label}</a>`;
  }

  customElements.define("site-sidebar", SiteSidebar);
  customElements.define("mobile-nav", MobileNav);
  customElements.define("theme-toggle", ThemeToggle);
  customElements.define("blog-card", BlogCard);

  buildTableOfContents();

  function buildTableOfContents() {
    document.querySelectorAll(".toc[data-toc-target]").forEach((container) => {
      const targetSelector = container.getAttribute("data-toc-target");
      const target = document.querySelector(targetSelector);
      if (!target) return;

      const headings = Array.from(target.querySelectorAll("h2, h3"));
      if (!headings.length) {
        container.innerHTML = `<p class="toc-empty">No sections yet.</p>`;
        return;
      }

      const usedIds = new Set();
      let html = `<ul class="toc-list">`;
      let subItems = [];
      let openParent = false;
      let sectionNumber = 0;
      let subSectionNumber = 0;

      headings.forEach((heading, index) => {
        const text = heading.textContent.trim();
        if (!heading.id) {
          heading.id = uniqueId(slugify(text) || `section-${index + 1}`, usedIds);
        } else {
          heading.id = uniqueId(heading.id, usedIds);
        }

        if (heading.tagName === "H2") {
          sectionNumber += 1;
          subSectionNumber = 0;
          const label = `${sectionNumber}`;
          if (openParent) {
            html += renderSubItems(subItems) + `</li>`;
            subItems = [];
          }
          html += `<li><a href="#${heading.id}">${label} ${text}</a>`;
          openParent = true;
        } else if (openParent) {
          subSectionNumber += 1;
          const label = `${sectionNumber}.${subSectionNumber}`;
          subItems.push(`<li><a href="#${heading.id}">${label} ${text}</a></li>`);
        } else {
          sectionNumber += 1;
          const label = `${sectionNumber}`;
          html += `<li><a href="#${heading.id}">${label} ${text}</a></li>`;
        }
      });

      if (openParent) {
        html += renderSubItems(subItems) + `</li>`;
      }

      html += `</ul>`;
      container.innerHTML = html;
    });
  }

  function renderSubItems(items) {
    return items.length ? `<ul class="toc-sublist">${items.join("")}</ul>` : "";
  }

  function slugify(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function uniqueId(base, usedIds) {
    let id = base;
    let count = 2;
    while (usedIds.has(id) || document.getElementById(id)) {
      id = `${base}-${count}`;
      count += 1;
    }
    usedIds.add(id);
    return id;
  }
})();
