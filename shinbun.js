/* ═══════════════════════════════════════════
   ARISE: newsletter-shinbun.js (v3, PDF links)
   - issues carry type: "monthly" | "weekly"
   - the page opens on the newest MONTHLY issue, even if a
     newer weekly exists
   - 1 issue total = paper only; 2+ = sidebar with filter
   - "Read full issue" opens the issue's PDF in a new tab
   Assumes the array is ordered newest first.
   Data lives in newsletterData.js (edit that file, not this one).
═══════════════════════════════════════════ */
function initNewsletter(issues) {
  const viewer  = document.getElementById('newsletterViewer');
  const paper   = document.getElementById('issueReader');
  const sidebar = document.getElementById('newsletterSidebar');
  const tabList = document.getElementById('issueTabList');
  if (!viewer || !paper || !issues || !issues.length) return;

  const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const typeOf = it => (it.type === 'weekly' ? 'weekly' : 'monthly');
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  /* monthly takes priority for the main view */
  const firstMonthly = issues.findIndex(it => typeOf(it) === 'monthly');
  const featured = firstMonthly === -1 ? 0 : firstMonthly;

  /* adaptive layout */
  const many = issues.length > 1;
  viewer.dataset.count = many ? 'many' : 'one';
  if (sidebar) sidebar.hidden = !many;

  /* sidebar: filter + list */
  let filter = 'all';
  const hasBoth = issues.some(i => typeOf(i) === 'weekly') && issues.some(i => typeOf(i) === 'monthly');
  let active = featured;

  function buildTabs() {
    if (!tabList) return;
    tabList.innerHTML = issues.map((it, i) => {
      if (filter !== 'all' && typeOf(it) !== filter) return '';
      return `
      <li>
        <button type="button" class="issueTab${i === active ? ' isActive' : ''}"
                data-issue="${i}" aria-pressed="${i === active}">
          <span class="issueTabDate">${esc(it.date)} &nbsp;/&nbsp; ${cap(typeOf(it))}</span>
          <span class="issueTabTitle">${esc(it.title)}</span>
        </button>
      </li>`;
    }).join('');
  }

  if (many && hasBoth && tabList) {
    const bar = document.createElement('div');
    bar.className = 'issueFilter';
    bar.innerHTML = ['all', 'monthly', 'weekly'].map(f =>
      `<button type="button" data-filter="${f}" class="${f === 'all' ? 'isOn' : ''}">${cap(f)}</button>`).join('');
    tabList.before(bar);
    bar.addEventListener('click', e => {
      const b = e.target.closest('button[data-filter]');
      if (!b) return;
      filter = b.dataset.filter;
      bar.querySelectorAll('button').forEach(x => x.classList.toggle('isOn', x === b));
      buildTabs();
    });
  }
  if (many) buildTabs();

  /* render one issue */
  function render(i) {
    const it = issues[i];
    if (!it) return;
    const type   = typeOf(it);
    const num    = issues.slice(i).filter(x => typeOf(x) === type).length;  // oldest = 1
    const [head, ...rest] = it.title.split(':');
    const banner = it.banner || head;
    const lead   = rest.length ? rest.join(':').trim() : it.title;
    const badge  = it.badge || (i === featured ? 'Featured' : 'Archive');
    const accent = it.accent || 'blue';
    const n2     = String(num).padStart(2, '0');

    paper.dataset.accent = accent;
    paper.dataset.type = type;
    paper.innerHTML = `
      <header class="paperMast">
        <span class="paperMastName">The ARISE Shinbun</span>
        <span>${esc(it.date)} &nbsp;/&nbsp; ${cap(type)} Edition &nbsp;/&nbsp; No. ${n2}</span>
      </header>

      <div class="paperHead">
        <h2 class="paperBanner" id="issueTitle">${esc(banner)}!!</h2>
        <aside class="paperBadge"><span><small>${cap(type)}</small><b>${n2}</b><small>${esc(badge)}</small></span></aside>
      </div>

      <div class="paperBody">
        <section class="paperLead">
          <span class="paperKicker">${esc(it.label || (i === featured ? 'Latest issue' : 'Past issue'))}</span>
          <h3 class="paperLeadTitle">${esc(lead)}</h3>
          <p class="paperText">${esc(it.summary)}</p>
        </section>
        <figure class="paperFig">
          <div class="paperFigFrame">
            ${it.image ? `<img src="${esc(it.image)}" alt="" />` : '<span>Illustration</span>'}
          </div>
          <figcaption>${esc(it.caption || 'Fresh off the press! Read on for the full story.')}</figcaption>
        </figure>
      </div>

      <ol class="paperStories">
        ${(it.highlights || []).slice(0, 4).map((t, n) => `
          <li class="paperStory"><span class="paperStoryNum">${n + 1}</span><p>${esc(t)}</p></li>`).join('')}
      </ol>

      <footer class="paperFoot">
        <span>University of Toronto Scarborough, ARISE</span>
        ${it.pdf
          ? `<a href="${esc(it.pdf)}" target="_blank" rel="noopener" class="btnPrimary issueReadBtn">
              Open the PDF <span class="material-icons" style="font-size:1rem;">open_in_new</span>
            </a>`
          : `<span class="paperSoon">PDF coming soon</span>`}
      </footer>`;

    paper.style.animation = 'none';
    void paper.offsetWidth;
    paper.style.animation = '';
  }

  render(featured);

  const stacked = window.matchMedia('(max-width: 1024px)');
  if (tabList) {
    tabList.addEventListener('click', e => {
      const tab = e.target.closest('.issueTab');
      if (!tab) return;
      active = Number(tab.dataset.issue);
      tabList.querySelectorAll('.issueTab').forEach(b => {
        const on = b === tab;
        b.classList.toggle('isActive', on);
        b.setAttribute('aria-pressed', String(on));
      });
      render(active);
      if (stacked.matches) paper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

/* start automatically once the page has loaded */
document.addEventListener('DOMContentLoaded', () => initNewsletter(window.ARISE_NEWSLETTERS));