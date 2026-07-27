/* ============================================================
   CSS Cheat Sheet — Application Logic
   ============================================================ */

(function() {
  'use strict';

  // ---- State ----
  const state = {
    data: null,
    activeSection: 'selectors',
    searchQuery: '',
    browserFilter: 'all',
    theme: localStorage.getItem('css-cheat-theme') || 'dark'
  };

  // ---- DOM Ref ----
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const contentEl = $('#content');
  const tabsEl = $('.section-tabs');
  const statsEl = $('.stats-bar');
  const searchInput = $('#search');
  const browserSelect = $('#browser-filter');
  const themeBtn = $('#theme-toggle');

  // ---- Theme ----
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    localStorage.setItem('css-cheat-theme', theme);
  }

  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  }

  // ---- Browser Support Helpers ----
  const BROWSERS = [
    { id: 'chrome', label: 'Chrome' },
    { id: 'firefox', label: 'Firefox' },
    { id: 'safari', label: 'Safari' }
  ];

  function getBrowserStatus(item, browserId) {
    if (!item.support || !item.support[browserId]) return 'yes';
    return item.support[browserId];
  }

  function meetsBrowserFilter(item) {
    if (state.browserFilter === 'all') return true;
    const status = getBrowserStatus(item, state.browserFilter);
    return status !== 'no';
  }

  // ---- Search ----
  function matchesSearch(item) {
    if (!state.searchQuery) return true;
    const q = state.searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(q)
        || (item.desc && item.desc.toLowerCase().includes(q))
        || (item.descEn && item.descEn.toLowerCase().includes(q));
  }

  // ---- Render ----
  function renderBadges(item) {
    if (!item.support) return '';
    let html = '<span class="browser-badge">';
    BROWSERS.forEach(b => {
      const status = item.support[b.id] || 'yes';
      const labels = { yes: '✓', partial: '◐', no: '✗' };
      html += `<span class="badge badge-${status}" title="${b.label}: ${status}">${labels[status] || '?'}</span>`;
    });
    html += '</span>';
    return html;
  }

  function renderItem(item) {
    const name = item.url
      ? `<a href="${item.url}" target="_blank" rel="noopener">${item.name}</a>`
      : item.name;
    const badges = renderBadges(item);
    const enDesc = item.descEn ? `<span class="en">${item.descEn}</span>` : '';
    return `
      <div class="item-row" data-name="${item.name.toLowerCase()}">
        <span class="item-name">${name}</span>
        <span class="item-desc">${item.desc || ''}${enDesc}</span>
        ${badges}
        <button class="copy-btn" data-copy="${item.name}" title="复制 / Copy">📋</button>
      </div>
    `;
  }

  function renderGroup(group, sectionId) {
    let html = `<div class="card" data-section="${sectionId}">`;
    html += `<div class="card-header"><span>${group.name}</span><span class="en-name">${group.nameEn || ''}</span></div>`;
    html += `<div class="card-body">`;
    (group.items || []).forEach(item => {
      html += renderItem(item);
    });
    html += `</div></div>`;
    return html;
  }

  function renderSection(section) {
    let html = `<div class="section ${section.id === state.activeSection ? 'active' : ''}" id="section-${section.id}">
      <h2 class="section-title">${section.name} <span class="en-name" style="font-weight:400;font-size:0.85rem;color:var(--text-muted)">${section.nameEn}</span></h2>
      <div class="card-grid">`;
    (section.groups || []).forEach(group => {
      html += renderGroup(group, section.id);
    });
    html += `</div></div>`;
    return html;
  }

  function renderAll() {
    let html = '';
    state.data.sections.forEach(section => {
      html += renderSection(section);
    });
    contentEl.innerHTML = html;
  }

  function renderTabs() {
    let html = '';
    state.data.sections.forEach(section => {
      html += `<button class="tab-btn ${section.id === state.activeSection ? 'active' : ''}" data-section="${section.id}">${section.name}</button>`;
    });
    tabsEl.innerHTML = html;
  }

  function renderStats() {
    const section = state.data.sections.find(s => s.id === state.activeSection);
    if (!section) return;
    let total = 0;
    let visible = 0;
    section.groups.forEach(g => {
      (g.items || []).forEach(item => {
        total++;
        if (matchesSearch(item) && meetsBrowserFilter(item)) visible++;
      });
    });
    const searchInfo = state.searchQuery ? `，搜索"${state.searchQuery}"` : '';
    const browserInfo = state.browserFilter !== 'all' ? `，${BROWSERS.find(b => b.id === state.browserFilter)?.label || ''} 兼容` : '';
    statsEl.innerHTML = `<span class="count">${section.name}：<em>${visible}</em> / ${total} 项${searchInfo}${browserInfo}</span>
      <span>数据来源：<a href="https://developer.mozilla.org/zh-CN/" target="_blank" rel="noopener">MDN</a></span>`;
  }

  // ---- Filter (search + browser) ----
  function applyFilters() {
    const rows = $$('.item-row');
    rows.forEach(row => {
      const name = row.dataset.name || '';
      const desc = row.querySelector('.item-desc')?.textContent?.toLowerCase() || '';
      const q = state.searchQuery.toLowerCase();
      const matchSearch = !q || name.includes(q) || desc.includes(q);
      // Browser filter: find the item in data
      const section = state.data.sections.find(s => s.id === state.activeSection);
      let matchBrowser = true;
      if (state.browserFilter !== 'all' && section) {
        const fullName = row.querySelector('.item-name a')?.textContent || row.querySelector('.item-name')?.textContent?.trim() || '';
        // find matching data item
        let found = false;
        section.groups.forEach(g => {
          (g.items || []).forEach(item => {
            if (item.name === fullName) {
              found = true;
              if (!meetsBrowserFilter(item)) matchBrowser = false;
            }
          });
        });
      }
      row.style.display = (matchSearch && matchBrowser) ? '' : 'none';
    });

    // Hide empty cards
    $$('.card').forEach(card => {
      const visibleRows = $$('.item-row', card).filter(r => r.style.display !== 'none');
      card.style.display = visibleRows.length === 0 ? 'none' : '';
    });

    // Show/hide empty state
    const totalVisible = $$('.item-row').filter(r => r.style.display !== 'none').length;
    let emptyEl = $('.empty-state');
    if (totalVisible === 0) {
      if (!emptyEl) {
        emptyEl = document.createElement('div');
        emptyEl.className = 'empty-state';
        emptyEl.innerHTML = `<div class="icon">🔍</div><p>没有匹配结果，试试其他关键词</p>`;
        contentEl.appendChild(emptyEl);
      }
      emptyEl.style.display = '';
    } else if (emptyEl) {
      emptyEl.style.display = 'none';
    }

    renderStats();
  }

  // ---- Switch Section ----
  function switchSection(sectionId) {
    state.activeSection = sectionId;

    // Toggle sections
    $$('.section').forEach(el => el.classList.remove('active'));
    const target = $(`#section-${sectionId}`);
    if (target) target.classList.add('active');

    // Toggle tabs
    $$('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === sectionId);
    });

    applyFilters();
  }

  // ---- Copy to Clipboard ----
  function copyText(text) {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  function showToast(text) {
    let toast = $('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = `已复制: ${text}`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  // ---- Event Delegation ----
  function setupEvents() {
    // Tab switching
    tabsEl.addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (btn) switchSection(btn.dataset.section);
    });

    // Search
    searchInput.addEventListener('input', e => {
      state.searchQuery = e.target.value;
      applyFilters();
    });

    // Browser filter
    browserSelect.addEventListener('change', e => {
      state.browserFilter = e.target.value;
      applyFilters();
    });

    // Copy buttons (delegated)
    contentEl.addEventListener('click', e => {
      const btn = e.target.closest('.copy-btn');
      if (!btn) return;
      const text = btn.dataset.copy;
      copyText(text);
      showToast(text);
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 1200);
    });

    // Theme toggle
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    // Keyboard shortcut
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  // ---- Init ----
  async function init() {
    try {
      const res = await fetch('data/css-data.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      state.data = await res.json();
    } catch (err) {
      contentEl.innerHTML = `<div class="empty-state"><p>❌ 数据加载失败: ${err.message}</p></div>`;
      statsEl.textContent = '数据加载失败';
      return;
    }

    renderTabs();
    renderAll();
    applyTheme(state.theme);
    setupEvents();
    renderStats();
  }

  // ---- Start ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
