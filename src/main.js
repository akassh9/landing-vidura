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

document.querySelector("#app").innerHTML = `
  <main class="shell">
    <section class="stage" aria-label="Eureka landing page">
      <div class="noise"></div>
      <div class="brand-mark">Vidura Labs</div>
      <div class="title title--top">~ Eureka!</div>

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

      <section class="window" aria-label="Agent console">
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

      <div class="cta-block">
        <a class="download-button" href="#" aria-label="Download for macOS">
          <span class="download-button__label">Download for macOS</span>
        </a>
      </div>

      <div class="title title--bottom">The Agent._</div>

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

    <footer class="site-footer" aria-label="Site footer">
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
            <a href="#">Products</a>
            <a href="#">Platform</a>
            <a href="#">Docs</a>
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
  </main>
`;

if (window.__partnershipTickerCleanup) {
  window.__partnershipTickerCleanup();
}

window.__partnershipTickerCleanup = initPartnershipTicker();
