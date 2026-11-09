// PRESENTATION LAYER: Updates DOM and user interfaces

function renderComments() {
  const listEl = document.getElementById('comments-list');
  if (!listEl) return;

  listEl.innerHTML = '';
  state.approvedComments.forEach(comment => {
    const item = document.createElement('div');
    item.className = 'comment-item';
    item.innerHTML = `<span class="username">${escapeHtml(comment.author)}</span>${escapeHtml(comment.text)}`;
    listEl.appendChild(item);
  });
}

function renderPendingComments() {
  const pendingContainer = document.getElementById('pending-list');
  const countBadge = document.getElementById('pending-count');
  if (!pendingContainer) return;

  pendingContainer.innerHTML = '';
  if (countBadge) countBadge.textContent = state.pendingComments.length;

  if (state.pendingComments.length === 0) {
    pendingContainer.innerHTML = '<div class="empty-state">No comments currently waiting for review.</div>';
    return;
  }

  state.pendingComments.forEach(comment => {
    const item = document.createElement('div');
    item.className = 'pending-item';
    item.innerHTML = `
      <div class="pending-text"><span class="username">${escapeHtml(comment.author)}:</span> "${escapeHtml(comment.text)}"</div>
      <div class="pending-reason">⚠️ Flagged term(s): ${comment.matchedWords.join(', ')}</div>
      <div class="pending-actions">
        <button class="action-btn btn-approve" data-id="${comment.id}">Approve</button>
        <button class="action-btn btn-reject" data-id="${comment.id}">Reject</button>
      </div>
    `;
    pendingContainer.appendChild(item);
  });
}

function showBannerMessage(message, type) {
  const banner = document.getElementById('status-banner');
  if (!banner) return;

  banner.textContent = message;
  banner.className = `status-banner show ${type}`;

  setTimeout(() => {
    banner.className = 'status-banner';
  }, 4000);
}

function switchView(viewName) {
  state.currentView = viewName;
  const btnCommenter = document.getElementById('btn-view-commenter');
  const btnOP = document.getElementById('btn-view-op');
  const opPanel = document.getElementById('op-panel');
  const commentForm = document.getElementById('comment-form');

  if (viewName === 'commenter') {
    btnCommenter.classList.add('active');
    btnOP.classList.remove('active');
    opPanel.classList.add('hidden');
    commentForm.classList.remove('hidden');
  } else {
    btnOP.classList.add('active');
    btnCommenter.classList.remove('active');
    opPanel.classList.remove('hidden');
    commentForm.classList.add('hidden');
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
