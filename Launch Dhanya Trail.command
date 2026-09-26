#!/bin/zsh
# ─────────────────────────────────────────────
#  Dhanya Trail — Launch Dev Site
#  Double-click this file to start the server
#  and open your site in the browser.
# ─────────────────────────────────────────────

PROJECT_DIR="/Users/ankush/Fashion/DhanyaTrail/dhanya-trail"
PORT=3000
URL="http://localhost:$PORT"

echo "🌿 Starting Dhanya Trail..."
echo "📁 Project: $PROJECT_DIR"
echo ""

# Kill anything already on port 3000
lsof -ti tcp:$PORT | xargs kill -9 2>/dev/null

# Open browser after 4 seconds (gives server time to boot)
(sleep 4 && open "$URL") &

# Start the dev server
cd "$PROJECT_DIR" && npm run dev
