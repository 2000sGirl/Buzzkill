HANDOFF

Goal: Build an Instagram-style app that intercepts hate comments and insulting slang, routing them to the Original Poster for approval before publishing.

Live link and repo: Pending deployment to GitHub Pages.

Files:

index.html - Main HTML structure with view toggles and Instagram post container

README.md - Overview of the project

HANDOFF.md - Status tracking document

1_data/blocked_words.json - List of hate speech, toxic keywords, and insulting slang

2_scripts/1_data.js - Data layer: loads blocked words list and manages state

2_scripts/2_rules.js - Processing layer: checks text against toxic keywords/slang

2_scripts/3_display.js - Presentation layer: updates Instagram card UI and view modes

2_scripts/4_start.js - App initialization and event listeners

3_styles/style.css - Instagram-like styling (mobile and desktop)

Working now: Initial project structure setup with a functional post card, comment submission, slang/hate speech interception, and an OP review panel.

Last session: Created initial project template and core moderation logic.

Next step: Push files to GitHub, enable GitHub Pages, and test comment interception live.

Decisions:

Splitting into Commenter View and OP View using a top toggle bar to simulate two user perspectives easily on one device.

Storing blocked terms in 1_data/blocked_words.json for easy additions and updates.

APIs and data:

1_data/blocked_words.json: Local JSON list containing offensive keywords and modern insulting slang.

How to check it:

Open index.html in your browser.

In Commenter View, try posting a harmless comment like "Great photo!" (it publishes immediately).

Try posting a comment with blocked slang like "you are a npc trash" (it will say submitted for review and will NOT show on the post).

Switch to OP View at the top. Notice the comment in the "Pending Review" queue with Approve and Reject options.
