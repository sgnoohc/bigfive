// --- Helpers ---

function base64urlEncode(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return atob(str);
}

function scoreLabel(score) {
  if (score >= 70) return "High";
  if (score >= 40) return "Average";
  return "Low";
}

const DOMAIN_KEYS = ['O', 'C', 'E', 'A', 'N'];

// --- Routing ---

function getRoute() {
  const hash = location.hash.slice(1) || '/';
  if (hash.startsWith('/profile/')) {
    return { page: 'profile', id: hash.slice(9) };
  }
  if (hash.startsWith('/custom/')) {
    return { page: 'custom', data: hash.slice(8) };
  }
  return { page: 'home' };
}

function navigate(hash) {
  location.hash = hash;
}

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);

// --- Rendering ---

function render() {
  const app = document.getElementById('app');
  const route = getRoute();

  if (route.page === 'profile') {
    const person = PEOPLE.find(p => p.id === route.id);
    if (person) {
      app.innerHTML = renderProfile(person);
      initRadarChart(person);
      animateBars();
    } else {
      app.innerHTML = '<p>Person not found.</p>';
    }
  } else if (route.page === 'custom') {
    try {
      const person = JSON.parse(base64urlDecode(route.data));
      app.innerHTML = renderProfile(person);
      initRadarChart(person);
      animateBars();
    } catch (e) {
      app.innerHTML = '<p>Invalid profile data.</p>';
    }
  } else {
    app.innerHTML = renderHome();
    attachCardListeners();
  }

  window.scrollTo(0, 0);
}

// --- Home Page ---

function renderHome() {
  const cards = PEOPLE.map(p => {
    const bars = DOMAIN_KEYS.map(k => {
      const score = p.scores[k].domain;
      return `<div class="mini-bar" style="background: var(--${k}); width: ${score}%; max-width: 100%;"></div>`;
    }).join('');

    return `
      <div class="card" data-id="${p.id}">
        <img class="card-avatar" src="${p.image}" alt="${p.name}" loading="lazy"
             onerror="this.style.display='none'">
        <div class="card-info">
          <h3>${p.name}</h3>
          <div class="years">${p.years}</div>
          <div class="tagline">${p.tagline}</div>
          <div class="mini-bars">${bars}</div>
        </div>
      </div>
    `;
  }).join('');

  return `<div class="grid">${cards}</div>`;
}

function attachCardListeners() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      navigate('/profile/' + card.dataset.id);
    });
  });
}

// --- Profile Page ---

function renderProfile(person) {
  const domainBars = DOMAIN_KEYS.map(k => {
    const info = DOMAIN_INFO[k];
    const score = person.scores[k].domain;
    return `
      <div class="domain-row">
        <div class="domain-label" style="color: ${info.color}">${info.short}</div>
        <div class="domain-bar-bg">
          <div class="domain-bar-fill bar-animate" style="background: ${info.color};" data-width="${score}%"></div>
        </div>
        <div class="domain-score">${score}</div>
      </div>
    `;
  }).join('');

  const domainDetails = DOMAIN_KEYS.map(k => {
    const info = DOMAIN_INFO[k];
    const score = person.scores[k].domain;
    const facets = person.scores[k].facets;

    const facetBars = info.facets.map((fname, i) => {
      const fScore = facets[i];
      return `
        <div class="facet-row">
          <div class="facet-label">${fname}</div>
          <div class="facet-bar-bg">
            <div class="facet-bar-fill bar-animate" style="background: ${info.color};" data-width="${fScore}%"></div>
          </div>
          <div class="facet-score">${fScore}</div>
        </div>
      `;
    }).join('');

    const rationale = person.rationale && person.rationale[k]
      ? `<div class="rationale">
           <div class="rationale-label">Why this score?</div>
           <p>${person.rationale[k]}</p>
         </div>`
      : '';

    return `
      <div class="domain-detail">
        <div class="domain-detail-header" onclick="this.parentElement.classList.toggle('collapsed')">
          <h3 style="color: ${info.color}">
            ${info.name}
            <span class="toggle-icon">&#9660;</span>
          </h3>
          <span class="score-badge" style="background: ${info.color}">${score} &mdash; ${scoreLabel(score)}</span>
        </div>
        <div class="domain-detail-body">
          <div class="domain-description">${info.description}</div>
          ${facetBars}
          ${rationale}
        </div>
      </div>
    `;
  }).join('');

  const shareData = base64urlEncode(JSON.stringify({
    id: person.id,
    name: person.name,
    years: person.years,
    tagline: person.tagline,
    image: person.image,
    scores: person.scores,
    rationale: person.rationale
  }));

  const shareUrl = location.origin + location.pathname + '#/custom/' + shareData;

  return `
    <a href="#/" class="back-link">&larr; All Profiles</a>
    <div class="profile-header">
      <img class="profile-avatar" src="${person.image}" alt="${person.name}" loading="lazy"
           onerror="this.style.display='none'">
      <div class="profile-meta">
        <h2>${person.name}</h2>
        <div class="years">${person.years}</div>
        <div class="tagline">${person.tagline}</div>
      </div>
    </div>

    <div class="chart-section">
      <div class="radar-wrap">
        <canvas id="radarChart" width="320" height="320"></canvas>
      </div>
      <div class="score-summary">
        ${domainBars}
      </div>
    </div>

    ${domainDetails}

    <div class="share-section">
      <button class="share-btn" onclick="copyShareLink(this, '${shareUrl.replace(/'/g, "\\'")}')">
        Copy Shareable Link
      </button>
      <div class="share-msg" id="shareMsg"></div>
    </div>
  `;
}

// --- Chart ---

let radarChartInstance = null;

function initRadarChart(person) {
  const ctx = document.getElementById('radarChart');
  if (!ctx) return;

  if (radarChartInstance) {
    radarChartInstance.destroy();
  }

  const scores = DOMAIN_KEYS.map(k => person.scores[k].domain);
  const colors = DOMAIN_KEYS.map(k => DOMAIN_INFO[k].color);

  radarChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: DOMAIN_KEYS.map(k => DOMAIN_INFO[k].short),
      datasets: [{
        data: scores,
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        borderColor: 'rgba(139, 92, 246, 0.7)',
        borderWidth: 2,
        pointBackgroundColor: colors,
        pointBorderColor: colors,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            display: false
          },
          grid: {
            color: 'rgba(148, 163, 184, 0.15)'
          },
          angleLines: {
            color: 'rgba(148, 163, 184, 0.15)'
          },
          pointLabels: {
            color: colors,
            font: { size: 13, weight: '600' }
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${ctx.raw}/100`
          }
        }
      }
    }
  });
}

// --- Animations ---

function animateBars() {
  requestAnimationFrame(() => {
    document.querySelectorAll('.bar-animate').forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  });
}

// --- Share ---

function copyShareLink(btn, url) {
  navigator.clipboard.writeText(url).then(() => {
    document.getElementById('shareMsg').textContent = 'Link copied to clipboard!';
    setTimeout(() => {
      const msg = document.getElementById('shareMsg');
      if (msg) msg.textContent = '';
    }, 3000);
  }).catch(() => {
    // Fallback for older browsers
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    document.getElementById('shareMsg').textContent = 'Link copied!';
  });
}

// --- Collapsed state CSS (injected) ---
const style = document.createElement('style');
style.textContent = `
  .domain-detail.collapsed .domain-detail-body { display: none; }
  .domain-detail.collapsed .toggle-icon { transform: rotate(-90deg); }
  .toggle-icon { display: inline-block; transition: transform 0.2s; font-size: 0.65em; margin-left: 0.3em; }
  .bar-animate { width: 0; }
`;
document.head.appendChild(style);
