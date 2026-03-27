import "./styles.css";
import washULogo from "../WashU-RGB-removebg-preview.png";

const logs = [
  ["08:14:08", "CALC", "Recalculating tensor field..."],
  ["08:14:10", "CALC", "Schrodinger equation solved for t+100."],
  ["08:14:11", "SYS", "Writing state vector to memory dump."],
  ["08:14:12", "CALC", "Entanglement entropy: S = 0.892 nat"],
  ["08:14:15", "CALC", "Perturbation series expansion (order 4)"],
  ["08:14:16", "SYS", "Awaiting next parameter input..."],
  ["08:14:02", "SYS", "Initializing manifold constraints..."],
  ["08:14:03", "CALC", "Hamiltonian operator applied matrix[256x256]"],
  ["08:14:05", "CALC", "Eigenvalue extraction: λ = 1.41421"],
  ["08:14:06", "WARN", "Probability density fluctuation detected at boundary."]
];

const universityPartners = [
  {
    logo: washULogo,
    alt: "Washington University in St. Louis logo"
  }
];

const desktopItems = [
  {
    id: "about",
    label: "About Us.txt",
    windowTitle: "About Us.txt",
    iconPositionClass: "desktop-file--about",
    windowPositionClass: "desktop-window--about",
    eyebrow: "Vidura Labs / About",
    headline: "Physics-native systems for agentic intelligence.",
    paragraphs: [
      "Vidura Labs builds the layer where simulation, scientific structure, and agent workflows meet. Eureka is the desktop expression of that thesis: a product surface for models that need more than autocomplete.",
      "We focus on tooling that lets AI operate with grounded physical context, long-horizon computation, and interfaces that feel closer to a workstation than a marketing page."
    ]
  },
  {
    id: "products",
    label: "Products.txt",
    windowTitle: "Products.txt",
    iconPositionClass: "desktop-file--products",
    windowPositionClass: "desktop-window--products",
    eyebrow: "Vidura Labs / Products",
    headline: "The current stack is built around Eureka and its simulation core.",
    paragraphs: [
      "Eureka acts as the operator surface: inspect live runs, route agent decisions through structured tools, and keep high-signal outputs visible in one place.",
      "Underneath it sits a physics-aware execution layer for experimentation, model steering, and domain workflows where raw language models are not enough on their own."
    ]
  },
  {
    id: "docs",
    label: "Docs.txt",
    windowTitle: "Docs.txt",
    iconPositionClass: "desktop-file--docs",
    windowPositionClass: "desktop-window--docs",
    eyebrow: "Vidura Labs / Docs",
    headline: "Documentation is organized like an operating manual for the system.",
    paragraphs: [
      "Start with architecture and runtime concepts, then move into product flows, deployment notes, and experiment setup. The goal is to make research-grade behavior legible to operators.",
      "Early release docs cover onboarding, environment expectations, product surfaces, and contact paths for teams working with Vidura directly.",
      "Placeholder section: Runtime Overview. Eureka coordinates agent execution, live process inspection, simulation outputs, and operator review inside one desktop-like surface. Each subsystem is intended to be observable instead of opaque.",
      "Placeholder section: Workspace Model. Sessions are organized around active runs, persisted context, tool invocation traces, and artifact capture. Operators should be able to reopen prior runs without losing the reasoning trail that led to a result.",
      "Placeholder section: Product Flow. Open a workspace, inspect the current execution state, review structured logs, compare generated artifacts, and route the next action through the relevant agent or simulation layer. The interface is meant to support deliberate handoff rather than passive monitoring.",
      "Placeholder section: Environment Expectations. The current build assumes a desktop-first workflow, long-lived runs, and enough surface area for simultaneous observation of logs, charts, and generated outputs. Small-screen support exists, but the product bias is still toward workstation use.",
      "Placeholder section: Operator Controls. Primary actions include opening desktop files, inspecting active windows, maximizing into full-page reading mode, and returning to the floating desktop state when a broad overview is more useful than document depth.",
      "Placeholder section: Deployment Notes. Internal builds should document runtime dependencies, access patterns, supported environments, and observability hooks before broader release. External docs can later replace this placeholder copy with exact setup steps and support policy."
    ]
  }
];

const footerNavLinks = desktopItems.map(({ id, label }) => ({
  id,
  label: label.replace(".txt", "")
}));

const app = document.querySelector("#app");

const desktopState = {
  openIds: [],
  maximizedId: null
};

let footerOpenSequence = 0;

function getDesktopItem(itemId) {
  return desktopItems.find(({ id }) => id === itemId);
}

function createSeededRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function createHistogramMarkup() {
  const random = createSeededRandom(42);
  const values = [10, 16, 24, 35, 49, 66, 81, 94, 91, 83, 72, 59, 46, 35, 27, 20, 15, 11, 8, 6];
  const baseline = 176;
  const startX = 30;
  const barWidth = 13;
  const gap = 5;
  const bars = values
    .map((value, index) => {
      const height = value * 1.26;
      const x = startX + index * (barWidth + gap);
      const y = baseline - height;
      const delay = (index * 0.18).toFixed(2);
      const duration = (6.8 + random() * 1.8).toFixed(2);
      const opacity = (0.78 + random() * 0.2).toFixed(2);

      return `
        <rect
          class="hist-bar"
          x="${x}"
          y="${y.toFixed(2)}"
          width="${barWidth}"
          height="${height.toFixed(2)}"
          rx="1.8"
          style="animation-delay:${delay}s; animation-duration:${duration}s; opacity:${opacity};"
        />
      `;
    })
    .join("");

  const guideLine = values
    .map((value, index) => {
      const x = startX + index * (barWidth + gap) + barWidth / 2;
      const y = baseline - value * 1.26;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return `
    <svg class="histogram-svg" viewBox="0 0 420 210" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <g class="hist-grid">
        <line x1="30" y1="36" x2="30" y2="176"></line>
        <line x1="30" y1="176" x2="396" y2="176"></line>
        <line x1="30" y1="148" x2="396" y2="148"></line>
        <line x1="30" y1="120" x2="396" y2="120"></line>
        <line x1="30" y1="92" x2="396" y2="92"></line>
        <line x1="30" y1="64" x2="396" y2="64"></line>
      </g>
      <g class="hist-bars">
        ${bars}
      </g>
      <g class="hist-overlay">
        <path class="hist-line" d="${guideLine}"></path>
        <circle class="hist-core" cx="174" cy="63" r="3.5"></circle>
      </g>
    </svg>
  `;
}

function initPartnershipTicker() {
  const marquee = document.querySelector(".partnerships__marquee");
  const track = marquee?.querySelector(".partnerships__track");
  const baseSegment = track?.querySelector(".partnerships__segment");

  if (!marquee || !track || !baseSegment) {
    return () => {};
  }

  let frameId = 0;
  let resizeFrameId = 0;
  let lastTimestamp = 0;
  let offset = 0;
  let segmentWidth = 0;
  const imageNodes = Array.from(baseSegment.querySelectorAll("img"));

  const getTickerSpeed = () => {
    if (window.matchMedia("(max-width: 780px)").matches) return 24;
    if (window.matchMedia("(max-width: 1100px)").matches) return 28;
    return 32;
  };

  const removeClones = () => {
    track.querySelectorAll(".partnerships__segment:not(:first-child)").forEach((node) => node.remove());
  };

  const rebuildTrack = () => {
    removeClones();
    segmentWidth = baseSegment.getBoundingClientRect().width;

    if (!segmentWidth) {
      return;
    }

    const marqueeWidth = marquee.getBoundingClientRect().width;
    const targetWidth = marqueeWidth * 2 + segmentWidth;
    const segmentCount = Math.max(3, Math.ceil(targetWidth / segmentWidth));

    for (let index = 1; index < segmentCount; index += 1) {
      track.appendChild(baseSegment.cloneNode(true));
    }

    offset = ((offset % segmentWidth) + segmentWidth) % segmentWidth;
    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
  };

  const onResize = () => {
    if (resizeFrameId) {
      cancelAnimationFrame(resizeFrameId);
    }

    resizeFrameId = requestAnimationFrame(() => {
      rebuildTrack();
    });
  };

  const tick = (timestamp) => {
    if (!lastTimestamp) {
      lastTimestamp = timestamp;
    }

    const deltaSeconds = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    if (segmentWidth) {
      offset = (offset + getTickerSpeed() * deltaSeconds) % segmentWidth;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    }

    frameId = requestAnimationFrame(tick);
  };

  rebuildTrack();
  frameId = requestAnimationFrame(tick);
  window.addEventListener("resize", onResize);
  imageNodes.forEach((imageNode) => {
    if (!imageNode.complete) {
      imageNode.addEventListener("load", onResize);
    }
  });

  return () => {
    cancelAnimationFrame(frameId);
    cancelAnimationFrame(resizeFrameId);
    window.removeEventListener("resize", onResize);
    imageNodes.forEach((imageNode) => {
      imageNode.removeEventListener("load", onResize);
    });
  };
}

function createDesktopFileMarkup(item) {
  return `
    <button
      class="desktop-file ${item.iconPositionClass}"
      type="button"
      data-open-file="${item.id}"
      aria-label="Open ${item.windowTitle}"
    >
      <span class="desktop-file__icon" aria-hidden="true">
        <span class="desktop-file__fold"></span>
        <span class="desktop-file__lines"></span>
      </span>
      <span class="desktop-file__label">${item.label}</span>
    </button>
  `;
}

function createDesktopWindowMarkup(item, index) {
  const isMaximized = desktopState.maximizedId === item.id;
  const isPreviewWindow = item.id === "docs";

  return `
    <article
      class="desktop-window ${item.windowPositionClass}${isPreviewWindow ? " desktop-window--document" : ""}${isMaximized ? " desktop-window--maximized" : ""}"
      data-focus-window="${item.id}"
      data-window-root="${item.id}"
      style="z-index:${12 + index};"
      tabindex="0"
      aria-label="${item.windowTitle}"
    >
      <header class="desktop-window__bar" data-focus-window="${item.id}">
        <div class="traffic-lights traffic-lights--desktop-window">
          <button
            class="dot dot--red dot-button dot-button--close"
            type="button"
            data-close-window="${item.id}"
            aria-label="Close ${item.windowTitle}"
          ></button>
          <span class="dot dot--yellow"></span>
          <button
            class="dot dot--green dot-button dot-button--maximize"
            type="button"
            data-toggle-maximize="${item.id}"
            aria-label="${isMaximized ? "Restore" : "Maximize"} ${item.windowTitle}"
          ></button>
        </div>
        <div class="desktop-window__title">${item.windowTitle}</div>
      </header>

      <div class="desktop-window__body" data-focus-window="${item.id}">
        <div class="desktop-window__scroll">
          <div class="desktop-window__eyebrow">${item.eyebrow}</div>
          <h2 class="desktop-window__headline">${item.headline}</h2>
          ${item.paragraphs
            .map((paragraph) => `<p class="desktop-window__copy">${paragraph}</p>`)
            .join("")}
        </div>
        ${
          isPreviewWindow && !isMaximized
            ? `
              <div class="desktop-window__fade" aria-hidden="true"></div>
              <button
                class="desktop-window__expand"
                type="button"
                data-toggle-maximize="${item.id}"
                aria-label="Expand ${item.windowTitle}"
              >
                Expand
              </button>
            `
            : ""
        }
      </div>
    </article>
  `;
}

function renderDesktopWindows() {
  const desktopWindowsRoot = document.querySelector("[data-desktop-windows]");

  if (!desktopWindowsRoot) {
    return;
  }

  desktopWindowsRoot.innerHTML = desktopState.openIds
    .map((itemId, index) => createDesktopWindowMarkup(getDesktopItem(itemId), index))
    .join("");

  syncDesktopWindowMode();
}

function openDesktopWindow(itemId) {
  const item = getDesktopItem(itemId);

  if (!item) {
    return;
  }

  desktopState.openIds = desktopState.openIds.filter((openId) => openId !== itemId);
  desktopState.openIds.push(itemId);
  renderDesktopWindows();

  const activeWindow = document.querySelector(`[data-window-root="${itemId}"]`);
  activeWindow?.focus();
}

function closeDesktopWindow(itemId) {
  if (desktopState.maximizedId === itemId) {
    desktopState.maximizedId = null;
  }

  desktopState.openIds = desktopState.openIds.filter((openId) => openId !== itemId);
  renderDesktopWindows();
}

function focusDesktopWindow(itemId) {
  if (!desktopState.openIds.includes(itemId)) {
    return;
  }

  if (desktopState.openIds[desktopState.openIds.length - 1] === itemId) {
    const activeWindow = document.querySelector(`[data-window-root="${itemId}"]`);
    activeWindow?.focus();
    return;
  }

  openDesktopWindow(itemId);
}

function syncDesktopWindowMode() {
  const windowsRoot = document.querySelector("[data-desktop-windows]");
  const stage = document.querySelector(".stage");
  const hasMaximizedWindow = Boolean(desktopState.maximizedId);

  windowsRoot?.classList.toggle("desktop-windows--maximized", hasMaximizedWindow);
  stage?.classList.toggle("stage--desktop-focus", hasMaximizedWindow);
  document.body.classList.toggle("body--desktop-focus", hasMaximizedWindow);
}

function toggleMaximizeWindow(itemId) {
  if (!desktopState.openIds.includes(itemId)) {
    return;
  }

  desktopState.openIds = desktopState.openIds.filter((openId) => openId !== itemId);
  desktopState.openIds.push(itemId);
  desktopState.maximizedId = desktopState.maximizedId === itemId ? null : itemId;
  renderDesktopWindows();

  requestAnimationFrame(() => {
    const activeWindow = document.querySelector(`[data-window-root="${itemId}"]`);
    activeWindow?.focus();
  });
}

const logMarkup = logs
  .map(
    ([time, tag, message]) => `
      <div class="log-line">
        <span class="log-time">${time}</span>
        <span class="log-tag log-tag--${tag.toLowerCase()}">${tag}</span>
        <span class="log-message">${message}</span>
      </div>
    `
  )
  .join("");

const logLoopChunk = `${logMarkup}${logMarkup}${logMarkup}`;
const histogramMarkup = createHistogramMarkup();
const partnerItemMarkup = universityPartners
  .map(
    ({ logo, alt }) => `
      <li class="partner-logo">
        <img class="partner-logo__image" src="${logo}" alt="${alt}" decoding="async" />
      </li>
    `
  )
  .join("");

function createSiteFooterMarkup() {
  const links = footerNavLinks
    .map(
      ({ id, label }) => `
        <button class="site-footer__link" type="button" data-open-file="${id}">
          ${label}
        </button>
      `
    )
    .join("");

  return `
    <footer class="site-footer" aria-label="Site footer" id="docs">
      <div class="site-footer__grid">
        <div class="site-footer__block">
          <div class="site-footer__eyebrow">Vidura Labs</div>
          <p class="site-footer__copy">
            Building the layer of physics intelligence for AI.
          </p>
        </div>

        <div class="site-footer__block">
          <div class="site-footer__eyebrow">Navigation</div>
          <div class="site-footer__links">
            ${links}
          </div>
        </div>

        <div class="site-footer__block">
          <div class="site-footer__eyebrow">Release</div>
          <div class="site-footer__meta">
            <div>macOS build</div>
            <div>0.1.0</div>
            <div>support@viduralabs.com</div>
            <div>built with ❤️ in St. Louis</div>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function createHomeMarkup() {
  return `
  <main class="shell">
    <section class="stage" aria-label="Vidura Labs" id="products">
      <div class="noise"></div>
      <div class="brand-mark">Vidura Labs</div>
      <div class="title title--top">~ Alpha</div>

      <aside class="desktop-files" aria-label="Desktop text files">
        ${desktopItems.map((item) => createDesktopFileMarkup(item)).join("")}
      </aside>

      <aside class="folders" aria-label="Simulation folders">
        <div class="folder-item">
          <span class="folder-icon" aria-hidden="true"></span>
          <span class="folder-label">LHCb_sims</span>
        </div>
        <div class="folder-item">
          <span class="folder-icon" aria-hidden="true"></span>
          <span class="folder-label">DUNE_exp</span>
        </div>
        <div class="folder-item">
          <span class="folder-icon" aria-hidden="true"></span>
          <span class="folder-label">Muon_tracking</span>
        </div>
      </aside>

      <section class="window window--core" aria-label="Agent console">
        <header class="window-bar">
          <div class="traffic-lights" aria-hidden="true">
            <span class="dot dot--red"></span>
            <span class="dot dot--yellow"></span>
            <span class="dot dot--green"></span>
          </div>
          <div class="window-title">Agent_ETHER_v3.exe</div>
        </header>

        <div class="visual-panel">
          <div class="plot-field">
            ${histogramMarkup}
          </div>
        </div>

        <div class="terminal-panel">
          <div class="terminal-head">
            <span>[VIDURA_CORE2] PROCESS LOG</span>
            <span>UPTIME: 9482.11s</span>
          </div>
          <div class="log-scroll">
            <div class="log-marquee" aria-hidden="true">
              <div class="log-track">
                ${logLoopChunk}
              </div>
              <div class="log-track log-track--clone">
                ${logLoopChunk}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="desktop-windows" data-desktop-windows aria-live="polite"></div>

      <div class="cta-block" id="download">
        <a class="download-button" href="#download" aria-label="Download for macOS">
          <span class="download-button__label">Download for macOS</span>
        </a>
      </div>

      <div class="title title--bottom">Physics Teammate._</div>

      <footer class="footer-note">
        <div>continuous simulation logic</div>
      </footer>
    </section>

    <section class="partnerships" aria-label="University partnerships">
      <div class="partnerships__inner">
        <div class="partnerships__eyebrow">University Partnerships</div>
        <div class="partnerships__marquee" aria-label="Partner universities">
          <div class="partnerships__track">
            <ul class="partnerships__segment">
              ${partnerItemMarkup}
            </ul>
          </div>
        </div>
      </div>
    </section>
    ${createSiteFooterMarkup()}
  </main>
  `;
}

function scrollToAnchor(anchor) {
  return scrollToAnchorWithBehavior(anchor, "auto");
}

function scrollToAnchorWithBehavior(anchor, behavior = "auto") {
  if (!anchor) {
    return null;
  }

  const target = document.getElementById(anchor);

  if (!target) {
    return null;
  }

  requestAnimationFrame(() => {
    target.scrollIntoView({
      block: "start",
      behavior
    });
  });

  return target;
}

function focusWindowFromFooter(itemId) {
  const stage = scrollToAnchorWithBehavior("products", "smooth");

  if (!stage) {
    openDesktopWindow(itemId);
    return;
  }

  footerOpenSequence += 1;
  const sequence = footerOpenSequence;
  const targetTop = stage.offsetTop;
  let frameCount = 0;

  const settleAndOpen = () => {
    if (sequence !== footerOpenSequence) {
      return;
    }

    const distance = Math.abs(window.scrollY - targetTop);

    if (distance <= 18 || frameCount >= 120) {
      openDesktopWindow(itemId);
      return;
    }

    frameCount += 1;
    requestAnimationFrame(settleAndOpen);
  };

  requestAnimationFrame(settleAndOpen);
}

app.innerHTML = createHomeMarkup();
document.title = "Vidura Labs";
renderDesktopWindows();

if (window.__partnershipTickerCleanup) {
  window.__partnershipTickerCleanup();
}

window.__partnershipTickerCleanup = initPartnershipTicker();

app.addEventListener("click", (event) => {
  const closeButton = event.target.closest("[data-close-window]");

  if (closeButton) {
    closeDesktopWindow(closeButton.dataset.closeWindow);
    return;
  }

  const maximizeButton = event.target.closest("[data-toggle-maximize]");

  if (maximizeButton) {
    toggleMaximizeWindow(maximizeButton.dataset.toggleMaximize);
    return;
  }

  const openButton = event.target.closest("[data-open-file]");

  if (openButton) {
    if (openButton.closest(".site-footer")) {
      focusWindowFromFooter(openButton.dataset.openFile);
      return;
    }

    openDesktopWindow(openButton.dataset.openFile);
    return;
  }

  const windowRoot = event.target.closest("[data-focus-window]");

  if (windowRoot) {
    focusDesktopWindow(windowRoot.dataset.focusWindow);
  }
});

if (window.location.hash) {
  const initialAnchor = window.location.hash.replace(/^#/, "").trim().toLowerCase();
  scrollToAnchor(initialAnchor);
}

window.addEventListener("hashchange", () => {
  const anchor = window.location.hash.replace(/^#/, "").trim().toLowerCase();
  scrollToAnchor(anchor);
});
