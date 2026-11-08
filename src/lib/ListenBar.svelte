<script lang="ts">
	/** Plays a lesson's narration. Speed is remembered in this browser across lessons. */
	let { src }: { src: string } = $props();

	const SPEEDS = [1, 1.25, 1.5, 2];
	const SPEED_KEY = 'free-game:speed';

	let audio = $state<HTMLAudioElement>();
	let paused = $state(true);
	let time = $state(0);
	let duration = $state(0);
	let speed = $state(1);

	$effect(() => {
		try {
			const saved = Number(localStorage.getItem(SPEED_KEY));
			if (SPEEDS.includes(saved)) speed = saved;
		} catch {
			// Storage blocked: start at normal speed.
		}
	});

	const cycleSpeed = () => {
		speed = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
		try {
			localStorage.setItem(SPEED_KEY, String(speed));
		} catch {
			// Storage blocked: the speed lasts for this lesson.
		}
	};

	const clock = (seconds: number) =>
		`${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
</script>

<div class="listen">
	<audio bind:this={audio} {src} preload="metadata" bind:paused bind:currentTime={time} bind:duration bind:playbackRate={speed}
	></audio>
	<button
		type="button"
		class="play"
		aria-label={paused ? 'Listen to this lesson' : 'Pause'}
		onclick={() => (paused ? audio?.play() : audio?.pause())}
	>
		<svg viewBox="0 0 24 24" aria-hidden="true">
			{#if paused}<path d="M8 5.5v13l11-6.5z" />{:else}<path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />{/if}
		</svg>
	</button>
	<input
		type="range"
		min="0"
		max={duration || 0}
		step="1"
		bind:value={time}
		aria-label="Position"
		aria-valuetext="{clock(time)} of {clock(duration)}"
		style="--played: {duration ? (time / duration) * 100 : 0}%"
	/>
	<span class="time tabular-nums">{clock(paused && !time ? duration : time)}</span>
	<button type="button" class="speed tabular-nums" aria-label="Playback speed {speed} times" onclick={cycleSpeed}>
		{speed}×
	</button>
</div>

<style>
	.listen {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		max-width: 40rem;
		padding: 0.5rem 0.75rem 0.5rem 0.5rem;
		border-radius: 999px;
		background: var(--accent-soft);
		border: 1px solid var(--accent-line);
	}

	.play {
		display: grid;
		place-items: center;
		flex: none;
		width: 2.6rem;
		height: 2.6rem;
		border-radius: 50%;
		background: var(--accent);
		color: var(--accent-ink);
		& svg {
			width: 1.2rem;
			fill: currentColor;
		}
	}

	input {
		flex: 1;
		min-width: 0;
		height: 6px;
		appearance: none;
		border-radius: 3px;
		background: linear-gradient(to right, var(--accent) var(--played), var(--accent-line) var(--played));
		cursor: pointer;
		&::-webkit-slider-thumb {
			appearance: none;
			width: 16px;
			height: 16px;
			border-radius: 50%;
			background: var(--accent);
			border: 2px solid var(--paper);
		}
		&::-moz-range-thumb {
			width: 14px;
			height: 14px;
			border-radius: 50%;
			background: var(--accent);
			border: 2px solid var(--paper);
		}
	}

	.time {
		font-size: 0.85rem;
		color: var(--muted);
		min-width: 2.6rem;
		text-align: right;
	}

	.speed {
		flex: none;
		min-width: 3rem;
		padding: 0.25rem 0.5rem;
		border-radius: 999px;
		font-size: 0.85rem;
		font-weight: 800;
		border: 1.5px solid var(--accent-line);
		background: var(--paper);
		&:hover {
			border-color: var(--accent);
		}
	}
</style>
