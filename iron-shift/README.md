# IRON SHIFT 2.3.1

Three-stage robot FPS, included in あそびのにわ.

Open `index.html` in a current WebGL-capable browser. All runtime scripts, styles, icon and Japanese voice clips are embedded. No API key or server is required.

Touch: left stick moves. The outer ring of the direction pad turns the gun/camera. Its small central fire button fires continuously while held. Slide the same thumb between ring and center: entering the center settles for 140ms to avoid firing when merely crossing it; pressing the center directly fires immediately. Leaving the center or releasing stops firing. Scope remains independent. Rotation/interruption clears input. Landscape and portrait supported.

PC: WASD, mouse, left/right click, 1–3, R, Esc/P. The original three stages, bosses and audio remain intact.

Tested with installed Chrome desktop, mobile viewport/touch emulation, CDP simultaneous touch input, and automated campaign checks. Physical iPhone/Safari performance and audio output have not been verified. Touch devices default to lightweight graphics; quality is adjustable.

Three.js is distributed under its MIT license, retained in the bundled code and `LICENSE-three.txt`. Japanese voice clips are the existing locally generated Microsoft Haruka clips. No new external assets or paid services are used.

## Mobile ease-of-use update

Touch aiming is another third slower than the unpublished 2.3.0 update: horizontal aiming runs at 33⅓% of the published 2.2.3 speed, vertical at 26⅔%, while desktop mouse sensitivity is unchanged. The small center fire button and same-thumb ring/center gesture remain. Default-on mobile assistance gently tracks visible targets within 9 degrees (5 scoped) only while the center is held. Shots wait until the camera ray intersects a target before a wall, preventing empty-space firing. Empty magazines automatically reload while held. Turn off “スマホ：照準補助・空撃ち防止” in settings for unrestricted manual fire. Boss body armor, three stages, weapons and other games are unchanged.

Run `node iron-shift/test-controls.cjs` from the repository for the mobile control regression tests. Version 2.3.1 passes embedded JavaScript syntax checks and automated aim/fire/input regressions; the cloud browser preview relay was unavailable, so real-device and visual browser verification of this update remain unverified.
