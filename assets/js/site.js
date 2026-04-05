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
  initCppSyntaxHighlight();
  initCodeCopyButtons();

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

  function initCppSyntaxHighlight() {
    const cppBlocks = document.querySelectorAll('.post-body pre > code[class*="language-cpp"]');
    if (!cppBlocks.length) return;

    cppBlocks.forEach((code) => {
      const raw = code.textContent || "";
      code.innerHTML = highlightCppCode(raw);
    });
  }

  function highlightCppCode(code) {
    const keywords = new Set([
      "alignas", "alignof", "asm", "auto", "break", "case", "catch", "class", "const", "constexpr",
      "consteval", "constinit", "continue", "decltype", "default", "delete", "do", "else", "enum",
      "explicit", "export", "extern", "for", "friend", "goto", "if", "inline", "mutable", "namespace",
      "new", "noexcept", "operator", "private", "protected", "public", "register", "reinterpret_cast",
      "requires", "return", "sizeof", "static", "static_assert", "struct", "switch", "template", "this",
      "thread_local", "throw", "try", "typedef", "typeid", "typename", "union", "using", "virtual",
      "volatile", "while", "co_await", "co_return", "co_yield", "concept", "module", "import"
    ]);

    const typeNames = new Set([
      "bool", "char", "char8_t", "char16_t", "char32_t", "double", "float", "int", "long", "short",
      "signed", "unsigned", "void", "wchar_t", "size_t", "std", "string", "vector", "map", "set", "pair"
    ]);

    const constants = new Set(["true", "false", "nullptr", "NULL"]);
    let out = "";
    let i = 0;
    let lineStart = true;

    while (i < code.length) {
      const c = code[i];
      const next = code[i + 1] || "";

      if (lineStart && c === "#") {
        let j = i;
        while (j < code.length && code[j] !== "\n") j += 1;
        out += token("tok-preproc", code.slice(i, j));
        i = j;
        lineStart = false;
        continue;
      }

      if (c === "\n") {
        out += "\n";
        i += 1;
        lineStart = true;
        continue;
      }

      if (lineStart && (c === " " || c === "\t")) {
        out += c;
        i += 1;
        continue;
      }

      lineStart = false;

      if (c === "/" && next === "/") {
        let j = i;
        while (j < code.length && code[j] !== "\n") j += 1;
        out += token("tok-comment", code.slice(i, j));
        i = j;
        continue;
      }

      if (c === "/" && next === "*") {
        let j = i + 2;
        while (j < code.length && !(code[j] === "*" && code[j + 1] === "/")) j += 1;
        j = Math.min(j + 2, code.length);
        out += token("tok-comment", code.slice(i, j));
        i = j;
        continue;
      }

      if (c === '"' || c === "'") {
        const quote = c;
        let j = i + 1;
        while (j < code.length) {
          if (code[j] === "\\") {
            j += 2;
            continue;
          }
          if (code[j] === quote) {
            j += 1;
            break;
          }
          j += 1;
        }
        out += token("tok-string", code.slice(i, j));
        i = j;
        continue;
      }

      if (isDigit(c)) {
        let j = i + 1;
        while (j < code.length && /[0-9a-fA-FxX'.]/.test(code[j])) j += 1;
        out += token("tok-number", code.slice(i, j));
        i = j;
        continue;
      }

      if (isIdentStart(c)) {
        let j = i + 1;
        while (j < code.length && isIdentPart(code[j])) j += 1;
        const word = code.slice(i, j);
        if (keywords.has(word)) {
          out += token("tok-keyword", word);
        } else if (typeNames.has(word)) {
          out += token("tok-type", word);
        } else if (constants.has(word)) {
          out += token("tok-constant", word);
        } else {
          out += escapeHtml(word);
        }
        i = j;
        continue;
      }

      out += escapeHtml(c);
      i += 1;
    }

    return out;
  }

  function token(className, value) {
    return `<span class="${className}">${escapeHtml(value)}</span>`;
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function isDigit(char) {
    return char >= "0" && char <= "9";
  }

  function isIdentStart(char) {
    return /[A-Za-z_]/.test(char);
  }

  function isIdentPart(char) {
    return /[A-Za-z0-9_]/.test(char);
  }

  function initCodeCopyButtons() {
    const blocks = document.querySelectorAll(".post-body pre > code");
    if (!blocks.length) return;

    blocks.forEach((code) => {
      const pre = code.parentElement;
      if (!pre || pre.querySelector(".code-copy-button")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy-button";
      button.textContent = "Copy";
      button.setAttribute("aria-label", "Copy code to clipboard");

      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(code.textContent || "");
          button.textContent = "Copied";
          button.classList.add("copied");
        } catch {
          button.textContent = "Failed";
        }

        setTimeout(() => {
          button.textContent = "Copy";
          button.classList.remove("copied");
        }, 1200);
      });

      pre.appendChild(button);
    });
  }
})();
