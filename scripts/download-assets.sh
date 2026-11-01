#!/usr/bin/env bash
# Downloads the Figma assets used by the onboarding screens into public/assets.
# These URLs are temporary and expire 7 days after they were generated (Oct 31, 2026).
# If they have expired, re-export the listed nodes from Figma instead.
set -euo pipefail
cd "$(dirname "$0")/../public/assets"

get() { curl -fL --silent --show-error "$1" -o "$2" && echo "ok  $2"; }

get https://www.figma.com/api/mcp/asset/28ee916e-5570-4584-8cb2-3b904b7b0206/53953.svg icons/kyra-star.svg
get https://www.figma.com/api/mcp/asset/28ee916e-5570-4584-8cb2-3b904b7b0206/61a8b.svg icons/user-profile.svg
get https://www.figma.com/api/mcp/asset/28ee916e-5570-4584-8cb2-3b904b7b0206/93ba8.svg brand/kyra-logo.svg
get https://www.figma.com/api/mcp/asset/28ee916e-5570-4584-8cb2-3b904b7b0206/2ab98.png brand/kyra-wordmark.png
get https://www.figma.com/api/mcp/asset/fb122e5a-8ad2-45e3-9ea5-e2c196e72dda/e60c5.svg icons/female-tops.svg
get https://www.figma.com/api/mcp/asset/fb122e5a-8ad2-45e3-9ea5-e2c196e72dda/f4097.svg icons/female-bottoms.svg
get https://www.figma.com/api/mcp/asset/e7743414-3768-41e6-823d-fb62fe2fa27a/df7bd.svg icons/female-accessories-boots.svg
get https://www.figma.com/api/mcp/asset/e7743414-3768-41e6-823d-fb62fe2fa27a/4fe26.svg icons/female-accessories-bag.svg
get https://www.figma.com/api/mcp/asset/7411ceab-87cb-46bc-a8f0-9b220bbe8c8f/03ff1.svg icons/voice-search.svg
get https://www.figma.com/api/mcp/asset/6e09cc20-e478-4735-a3a6-3a677746b29c/d959c.svg brand/kyra-talking.svg

cat <<'NOTE'

Still to export manually from Figma (too large to fetch automatically):
  icons/female-one-pieces.svg        node 2043:8383
  icons/male-tops.svg                node 2043:9945
  icons/male-bottoms.svg             node 2043:11830
  icons/male-accessories-a.svg       node 2043:11845
  icons/male-accessories-b.svg       node 2043:13003
NOTE
