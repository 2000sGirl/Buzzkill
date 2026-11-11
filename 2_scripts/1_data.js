// DATA LAYER: State management and data fetching

const state = {
  currentView: 'commenter', // 'commenter' or 'op'
  blockedWords: [],
  approvedComments: [
    { id: 1, author: 'alex_art', text: 'Love this photo! The light is amazing ✨' },
    { id: 2, author: 'travel_bug', text: 'Where was this taken?' }
  ],
  pendingComments: []
};

// Load blocked words list from JSON file
async function fetchBlockedWords() {
  try {
    const response = await fetch('1_data/blocked_words.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not load blocked words');
    state.blockedWords = await response.json();
  } catch (err) {
    console.warn('Failed loading 1_data/blocked_words.json, falling back to default list.', err);
    state.blockedWords = ['hate', 'ugly', 'stupid', 'loser', 'idiot', 'trash', 'npc', 'mid', 'clown'];
  }
}

// Automatically fetch on script load
fetchBlockedWords();
