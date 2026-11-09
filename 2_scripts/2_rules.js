// PROCESSING LAYER: Business logic and comment content moderation rules

function checkCommentSafety(text) {
  if (!text || !text.trim()) {
    return { isSafe: true, matchedWords: [] };
  }

  const normalizedText = text.toLowerCase();
  const matchedWords = [];

  for (const word of state.blockedWords) {
    // Check for whole word or exact phrase match using regex boundary
    const regex = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'i');
    if (regex.test(normalizedText)) {
      matchedWords.push(word);
    }
  }

  return {
    isSafe: matchedWords.length === 0,
    matchedWords: matchedWords
  };
}

// Utility helper to escape special characters for regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function processNewComment(author, text) {
  const safetyResult = checkCommentSafety(text);

  if (safetyResult.isSafe) {
    const newComment = {
      id: Date.now(),
      author: author,
      text: text
    };
    state.approvedComments.push(newComment);
    return { status: 'published', comment: newComment };
  } else {
    const pendingComment = {
      id: Date.now(),
      author: author,
      text: text,
      matchedWords: safetyResult.matchedWords
    };
    state.pendingComments.push(pendingComment);
    return { status: 'flagged', comment: pendingComment };
  }
}

function approvePendingComment(id) {
  const index = state.pendingComments.findIndex(c => c.id === id);
  if (index !== -1) {
    const [approved] = state.pendingComments.splice(index, 1);
    state.approvedComments.push(approved);
  }
}

function rejectPendingComment(id) {
  state.pendingComments = state.pendingComments.filter(c => c.id !== id);
