// INITIALIZATION LAYER: Event handlers and app startup

document.addEventListener('DOMContentLoaded', async () => {
  // Load data first
  await fetchBlockedWords();

  // Initial Renders
  renderComments();
  renderPendingComments();

  // Setup View Switcher
  const btnCommenter = document.getElementById('btn-view-commenter');
  const btnOP = document.getElementById('btn-view-op');

  if (btnCommenter) btnCommenter.addEventListener('click', () => switchView('commenter'));
  if (btnOP) btnOP.addEventListener('click', () => switchView('op'));

  // Setup Comment Form Submission
  const form = document.getElementById('comment-form');
  const input = document.getElementById('comment-input');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      const result = processNewComment('guest_user', text);
      input.value = '';

      if (result.status === 'published') {
        renderComments();
        showBannerMessage('Comment posted!', 'success');
      } else {
        showBannerMessage('Your comment contains sensitive terms and was sent to the post owner for review before going live.', 'warning');
        renderPendingComments();
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
        approvePendingComment(commentId);
        renderComments();
        renderPendingComments();
      } else if (target.classList.contains('btn-reject')) {
        rejectPendingComment(commentId);
        renderPendingComments();
      }
    });
  }
});
