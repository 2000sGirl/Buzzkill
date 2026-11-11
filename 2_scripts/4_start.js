// INITIALIZATION LAYER: Event handlers and app startup

document.addEventListener('DOMContentLoaded', async () => {
  // Load data first
  if (typeof fetchBlockedWords === 'function') {
    await fetchBlockedWords();
  }

  // Initial Renders
  if (typeof renderComments === 'function') renderComments();
  if (typeof renderPendingComments === 'function') renderPendingComments();

  // Setup View Switcher
  const btnCommenter = document.getElementById('btn-view-commenter');
  const btnOP = document.getElementById('btn-view-op');

  if (btnCommenter) {
    btnCommenter.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof switchView === 'function') switchView('commenter');
    });
  }

  if (btnOP) {
    btnOP.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof switchView === 'function') switchView('op');
    });
  }

  // Setup Comment Form Submission
  const form = document.getElementById('comment-form');
  const input = document.getElementById('comment-input');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      if (typeof processNewComment === 'function') {
        const result = processNewComment('guest_user', text);
        input.value = '';

        if (result.status === 'published') {
          if (typeof renderComments === 'function') renderComments();
          if (typeof showBannerMessage === 'function') showBannerMessage('Comment posted!', 'success');
        } else {
          if (typeof showBannerMessage === 'function') showBannerMessage('Your comment contains sensitive terms and was sent to the post owner for review before going live.', 'warning');
          if (typeof renderPendingComments === 'function') renderPendingComments();
        }
      }
    });
  }

  // Setup OP Action Button Delegations (Approve/Reject)
  const pendingList = document.getElementById('pending-list');
  if (pendingList) {
    pendingList.addEventListener('click', (e) => {
      const target = e.target;
      const commentId = Number(target.getAttribute('data-id'));

      if (target.classList.contains('btn-approve')) {
        if (typeof approvePendingComment === 'function') approvePendingComment(commentId);
        if (typeof renderComments === 'function') renderComments();
        if (typeof renderPendingComments === 'function') renderPendingComments();
      } else if (target.classList.contains('btn-reject')) {
        if (typeof rejectPendingComment === 'function') rejectPendingComment(commentId);
        if (typeof renderPendingComments === 'function') renderPendingComments();
      }
    });
  }
});
