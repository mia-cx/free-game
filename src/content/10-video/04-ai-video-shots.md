---
title: Generate AI shots without rerolls
summary: Draw first and last frames, write timed prompts, audit them, then fix clips in code.
---

> [!TLDR]
> - Lock style and character sheets first, with the position of every fixed detail written down.
> - Draw a first and last frame for every shot. Video generated between two frames breaks far less.
> - Write each clip prompt in seven sections, timed second by second, and have a fresh agent pass it before you pay.
> - Generate at 720p on the cheaper model, repair in code before reshooting, and review the final cut with a fresh agent.

## Lock the look before any shot

This picks up after *Plan an AI video before you pay for it*, with the same director setup. The prompts are English translations of @EianLu's Chinese originals.

Fix the art style from one reference image: soft warm hand-drawn, cut-paper, photoreal, US hand-drawn, whatever you chose. Then draw a sheet for each character and recurring prop: front, side and a few expressions.

**Write down where every fixed detail sits** ("tattoo on left forearm"). Without that, details drift from image to image.

## Draw both ends of every shot

Generating video between a drawn first and last frame, instead of from text alone, prevents most logic errors and disappearing details.

> [!TRICK] Draw first and last frames
> - Describe each shot's first frame, last frame and what happens between. Have the review agent pass that text before drawing; it saves image quota.
> - Draw the busier frame first (usually the last), then edit it into the first frame, keeping camera and composition identical.
> - Same location and angle as the previous shot: edit that image instead of redrawing. Codex supports local edits.
> - Push-in shots: make the last frame a cropped, enlarged region of the first. Identical framing gives no motion.
> - Check the aspect ratio (Codex doesn't always output 16:9) and crop before submitting. Both frames must be the same size.
> - Small things like rain, hats and tattoos must appear in both frames, or they vanish.
> - Codex re-renders the whole image even for a small edit, so paste the edited patch back onto the original.
>
> Then run this check:
>
> ```
> The first and last frames are done; check them item by item, zooming into every image. Tell me which image and what's wrong; edit only after I agree.
> Materials: [first frame], [last frame], [character sheet], [this shot's storyboard]
>
> 1. Anything used in the action must be in the first frame. If someone picks up a cup later, the cup must be visible in the first frame, or it appears from nowhere.
> 2. Stage others' reactions in advance. A clip is one shot and can't cut away to someone else, so the first frame must place one person doing something in front and another behind, facing the camera.
> 3. When many people appear, they mustn't share a pose, or the model will move them all at once.
> 4. Leave room for action. Clear the space where things will land or drift; leave headroom above people.
> 5. Wind direction must be consistent: no scarf blowing left while a sheet blows right.
> 6. View at phone size; if distant people are too small to read, fix it.
> 7. Zoom in for extra objects, like an extra kettle or a stray thin line.
> 8. Overlay first and last frames to check for misalignment. Anything that shouldn't change must be identical. If the wall colour differs, the wall will slowly change colour in the video; if the cup is slightly bigger, it will slowly grow.
>
> When editing images, note two things:
> - Even for a small edit, Codex reprocesses the whole image, so paste the edited patch back onto the original.
> - If Codex quota runs out, wait for it to reset; don't buy credits or draw too many at once.
> ```

## Write and audit every clip prompt

Most bad generations trace back to the prompt. Write every clip with the same seven sections, time each second, and **phrase fixes positively**: models often ignore "doesn't".

> [!TRICK] Use the seven-part clip prompt
> ```
> [Style] [one sentence, e.g. clean modern 2D hand-drawn animation, flat colour fills, crisp lines, no grain or texture]. Style, colour and character design throughout exactly match the first and last frames.
> [Camera] [X] seconds total, [shot size], [camera position], [move; if static write "no push, no pull, no pan, no cut"].
> [Composition and colour] [where people and objects are in frame, colour of walls and light; must match the first frame]
> [Characters] [each person's appearance, clothes, fixed props, locked]
> [Second by second]
> 0–0.2 s: frame completely still, identical to the first frame.
> [each segment: who does what, how expression changes, where hands are and what they must not touch, toward which side of frame]
> Final 0.3 s: everyone completely still, frame identical to the last frame.
> [Sound] Only [sounds with a visible cause]. Characters don't speak.
> [Constraints] Only the people and objects in the first frame appear throughout; faces and bodies never change; one continuous shot. Clean frame, no text, subtitles or watermark.
> ```

> [!TRICK] Fix common failures with tested phrasing
> The author's fixes for what went wrong in his films.
>
> | Failure | Fix |
> | --- | --- |
> | A group moves in unison | Name the order ("Dad first… a second or two later Grandma… the girl last"); don't pose them identically in the first frame |
> | A person does what wind should do (lifts a bag flap by hand) | State the cause; add "both hands never touch the bag" |
> | Clouds, moon or plants grow faces | Don't write "cartoon cloud"; write "fluffy grey-white cumulus, only cotton-like texture and shading"; describe only how it moves |
> | Walks the wrong way | Give direction in screen terms ("walks toward frame left, past the left shopfront") |
> | Ambiguous phrase ("the old man behind the window" put a person in a car) | Be specific ("in the window of the stone house, top left"); add "driver's seat stays empty" |
> | Object count changes | State counts ("only one yellow envelope; afterwards his arms are full of white envelopes") |
> | Negatives ignored ("spout doesn't pour" still pours) | Phrase positively ("only the people in the first frame appear") |
> | Model infers a prop's use (a kettle always pours) | Keep that prop out of action shots |
> | Objects appear from nowhere | Use only objects in the first frame |
> | Objects teleport | Describe the motion ("slides back off the head, caught, put back on") |
> | Rain, hats, tattoos vanish | Draw them in both frames |
> | Lightning too realistic | "a flash of white light in the clouds"; trim the start |
> | Too much action gets messy | One or two main actions per shot |
> | Timing differs from the prompt | Treat times as approximate, leave slack, retime in the edit |
> | Push-in weaker than written | Push further in code afterwards |
> | Mouths move | "characters don't speak"; fix in code if it persists |
> | Seedance 2.5 adds music despite "no music" | Discard clip audio; add sound in post |
> | Seedance 2.5 jumps to the last frame at the end | Freeze on a clean frame |
> | Seedance 2.5 first frame oversharpened | Drop that frame |
> | Seedance 2.0 mini drifts darker and cooler | Colour-match each clip to its first frame |

Before each paid clip, a fresh read-only agent compares the prompt and both frames line by line. Nothing is submitted until it says "pass".

> [!TRICK] Audit before every paid generation
> ```
> You are the reviewer; read only, don't edit. This shot is about to be submitted for video generation, which costs real money.
> Materials: [prompt file], [first frame], [last frame], [character sheet], [shot list], [colour rules].
> Check item by item, zooming into the images:
> 1. Does every sentence of the prompt match both images? (position, left/right, colour, headcount, prop count, clothes, expression)
> 2. Do both images share camera position, size and background?
> 3. Do they match the character sheet, colour rules, and neighbouring shots?
> 4. Are the actions realistic? Is the cause of each action written? Where are the hands?
> 5. Where might the model go wrong? (simultaneous action, things appearing from nowhere, faces growing on objects, walking the wrong way, ambiguous words)
> End with only "pass" or "fail". If fail, list what to change, item by item.
> ```

## Repair and finish in code

Spend the least you can per usable second. Then let the coding agent do post-production, and let a fresh agent watch the result as a first-time viewer.

> [!TRICK] Generate cheaply, repair before reshooting
> - Generate at 720p and upscale to 1080p in post.
> - Skip test clips. Shoot the first real shot; if it's usable, that's free progress.
> - For a new technique, try the one or two hardest shots first, then submit the rest.
> - Seedance 2.5 costs about 3x 2.0 mini. 2.0 mini is enough for most shots that aren't complex.
> - Listen before using clip audio: 2.0 mini's built-in effects are often usable; 2.5 may add music despite instructions.
> - Fix in this order: (1) trim, if the problem is only at the start or end; (2) ask Claude to fix it in code; (3) reshoot only after changing the prompt or frames, and keep the old take, since the new one isn't always better.

> [!TRICK] Post-produce in code, then review the cut
> Post-production prompt:
>
> ```
> Do post-production in code:
> 1. Transitions: [which shot to which, what object wipes the screen or carries across]. Motion blur with 8–16 sub-frames, half-frame shutter.
> 2. Grading: by story section. Adjust only saturation and brightness, never hue; protect accent colours; keep skin tones unchanged. No grain, bloom or vignette.
> 3. Decode Seedance mp4s as BT.601, use lossless intermediates, tag delivery as BT.709.
> 4. Upscale: 720p to 1080p with lanczos plus light sharpening. No whole-clip frame interpolation.
> 5. Cut to the bar: measure beats only on the original track, never on an edited file.
> Afterwards, spot-check 3 frames either side of each cut.
> ```
>
> Final review, for a fresh agent given only the final cut and none of your conclusions:
>
> ```
> This is the final cut: [file]. You're seeing it for the first time; I won't tell you any conclusions.
> 1. Decode everything; take several full-resolution frames per shot and 3 frames either side of each cut.
> 2. First write the story as you understood it, then list what you didn't understand.
> 3. Check shot by shot: repeated actions, prop counts, continuity errors, jumps, colour jumps, face distortion, text problems.
> 4. State explicitly what you can't check (feel of motion, sound).
> For each: time, frame number, problem. Split into "critical" and "minor".
> ```
>
> Finally, have the AI write a summary of the style, prompts and mistakes, and keep it as notes for your next film.

Agents can't feel motion or hear sound. Watching and listening stays your job.

> [!DO] Make one character sheet
> Pick one character for your film. List every fixed detail with its position ("tattoo on left forearm", "red scarf, knot on the right"), then generate a front view and a side view from that list. Save both images with the list as `characters/<name>.md`.

## Sources

- [@EianLu: AI video workflow with Claude Code, Codex and Seedance (original in Chinese)](https://x.com/EianLu/status/2118317430665613741)
