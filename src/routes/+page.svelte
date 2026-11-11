<script lang="ts">
	import { page } from '$app/state';
	import CheckCard from '#lib/CheckCard.svelte';
	import Diagram from '#lib/Diagram.svelte';
	import { progress } from '#lib/progress.svelte.ts';
	import Route from '#lib/Route.svelte';
	import Seo from '#lib/Seo.svelte';

	let { data } = $props();

	const lessons = $derived(data.outline.flatMap((m) => m.lessons));
	const first = $derived(lessons[0]);
	const next = $derived(lessons.find((l) => !progress.done.has(l.id)));
	const minutes = $derived(Math.round(lessons.reduce((n, l) => n + l.minutes, 0) / lessons.length));
	const show = $derived(data.showcase);
</script>

<Seo
	title="Free Game: a free marketing course for builders with ADHD"
	description="{lessons.length} short lessons on positioning, writing, launches, SEO and marketing with AI agents, rewritten from the best free posts on X. Short version first, one small task per lesson, no sign-up."
	schema={[
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: 'Free Game',
			url: new URL('/', page.url.origin).href
		}
	]}
/>

<section class="hero">
	<h1>A free marketing course for builders with ADHD</h1>
	<p class="facts tabular-nums">
		{lessons.length} lessons · about {minutes} minutes each · {data.tricks} cheap tricks · no sign-up
	</p>
	<div class="actions">
		<a href={first.href} class="cta">Start lesson 1 <span aria-hidden="true">→</span></a>
		<!-- Space is held for returning readers, so the page doesn't jump when their progress loads. -->
		<span class="resume">
			{#if progress.done.size && next}
				<a href={next.href}>Continue with {next.title}</a>
			{/if}
		</span>
	</div>
	<nav class="strip" aria-label="Modules">
		{#each data.outline as module (module.slug)}
			<a href={module.href} data-hue style="--hue: {module.hue}" title={module.title}>
				<span class="sr-only">Module {module.number}: {module.title}</span>
				<span aria-hidden="true">{module.number}</span>
			</a>
		{/each}
	</nav>
</section>

<section class="anatomy" data-hue style="--hue: {show.hue}" aria-labelledby="anatomy">
	<h2 id="anatomy">How a lesson works</h2>
	<ol class="steps">
		<li class="step">
			<div class="say">
				<h3>Short version first</h3>
				<p>Read the box at the top and you have the lesson. Everything under it is detail for when you want it.</p>
			</div>
			<div class="piece lesson">
				<p class="from">From <a href={show.href}>{show.title}</a></p>
				<aside class="callout" data-kind="tldr">{@html show.tldr}</aside>
			</div>
		</li>
		{#if show.diagram}
			<li class="step">
				<div class="say">
					<h3>Diagrams you can use</h3>
					<p>Pick a symptom and see its cause. The idea works in front of you instead of being described.</p>
				</div>
				<div class="piece"><Diagram name={show.diagram} /></div>
			</li>
		{/if}
		{#if show.trick}
			<li class="step">
				<div class="say">
					<h3>Cheap tricks</h3>
					<p>Specific moves you can copy today, marked in yellow so you can find them again.</p>
				</div>
				<div class="piece lesson">
					<aside class="callout" data-kind="trick">
						<p class="callout-title">{show.trick.title}</p>
						{@html show.trick.html}
					</aside>
				</div>
			</li>
		{/if}
		<li class="step">
			<div class="say">
				<h3>One small task</h3>
				<p>Every lesson ends with something to do right away, while it's fresh.</p>
			</div>
			<div class="piece lesson">
				<aside class="callout" data-kind="do">
					<p class="callout-title">{show.task.title}</p>
					{@html show.task.html}
				</aside>
			</div>
		</li>
		{#if show.check}
			<li class="step">
				<div class="say">
					<h3>Questions that come back</h3>
					<p>
						Answer in your head, then check. Finished lessons return as review cards after 3, 7, 16 and 35 days.
					</p>
				</div>
				<div class="piece"><CheckCard question={show.check.question} answer={show.check.answer} /></div>
			</li>
		{/if}
	</ol>
	<a href={show.href} class="more">Read the whole lesson <span aria-hidden="true">→</span></a>
</section>

<section id="modules" class="modules" aria-labelledby="modules-title">
	<h2 id="modules-title">{data.outline.length} modules, from positioning to AI agents</h2>
	<Route outline={data.outline} />
</section>

<section class="credits" aria-labelledby="credits-title">
	<h2 id="credits-title">Rewritten from free posts, with credit</h2>
	<p>
		Every lesson links the posts it came from: {data.posts} posts by {data.authors.length} people who shared what
		worked for them on X.
	</p>
	<ul>
		{#each data.authors as handle (handle)}
			<li><a href="https://x.com/{handle}" target="_blank" rel="noopener">@{handle}</a></li>
		{/each}
	</ul>
</section>

<section class="agents" aria-labelledby="agents-title">
	<h2 id="agents-title">Give the course to your agent</h2>
	<p>
		The methods from these lessons are also {data.skills.reduce((n, g) => n + 1 + g.branches.length, 0)} agent skills:
		your coding agent follows the steps and you approve what goes out. Install them all:
	</p>
	<div class="lesson">
		<pre><code>npx skills add {page.url.origin}</code><button type="button" class="copy" data-copy>Copy</button></pre>
	</div>
	<p>
		Or read any of them as plain Markdown. The full list is <a href="/.well-known/agent-skills/index.json">index.json</a>,
		and <a href="/llms.txt">llms.txt</a> describes the whole site for agents.
	</p>
	<div class="skills">
		{#each data.skills as { entry, branches } (entry.name)}
			<div>
				<h3><a href={entry.href}>{entry.name}</a></h3>
				<ul>
					{#each branches as skill (skill.name)}
						<li><a href={skill.href}>{skill.name}</a></li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

<section class="end">
	<h2>Lesson 1 takes {first.minutes} minutes</h2>
	<a href={first.href} class="cta">Start lesson 1 <span aria-hidden="true">→</span></a>
</section>

<style>
	h2 {
		font-size: clamp(1.8rem, 1.2rem + 2.4vw, 3rem);
		line-height: 1.05;
		font-weight: 800;
		letter-spacing: -0.02em;
		text-wrap: balance;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.9rem 1.8rem;
		border-radius: 999px;
		background: var(--go);
		color: var(--go-ink);
		font-size: 1.15rem;
		font-weight: 800;
		transition: filter var(--duration-quick) var(--ease-out);
		&:hover {
			filter: brightness(1.1);
		}
	}

	/* Hero: the promise, the facts, one action, and the whole route as a strip of module colours. */
	.hero {
		padding-block: clamp(1.5rem, 6vw, 5rem) 0;
		& h1 {
			max-width: 14ch;
			font-size: clamp(2.6rem, 1.4rem + 6vw, 6.25rem);
			line-height: 0.95;
			font-weight: 800;
			letter-spacing: -0.035em;
			text-wrap: balance;
		}
	}

	.facts {
		margin-top: 1.5rem;
		font-size: 1.1rem;
		color: var(--muted);
	}

	.actions {
		margin-top: 2rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem 1.75rem;
	}

	.resume {
		min-height: 1.5em;
		& a {
			font-weight: 650;
			text-decoration: underline;
			text-underline-offset: 5px;
		}
	}

	.strip {
		margin-top: clamp(2.5rem, 7vw, 4.5rem);
		display: grid;
		grid-template-columns: repeat(13, minmax(0, 1fr));
		gap: 4px;
		& a {
			display: grid;
			place-items: end center;
			height: clamp(3.5rem, 9vw, 6rem);
			padding-bottom: 0.4rem;
			border-radius: 10px;
			background: var(--accent);
			color: var(--accent-ink);
			font-weight: 800;
			font-size: clamp(0.7rem, 0.5rem + 0.8vw, 1rem);
			font-variant-numeric: tabular-nums;
			transform-origin: bottom;
			transition: scale var(--duration-fast) var(--ease-bounce);
			&:hover,
			&:focus-visible {
				scale: 1 1.12;
			}
		}
	}

	/* A real lesson, taken apart: each step's piece rises in as it scrolls into view. */
	.anatomy {
		margin-top: clamp(5rem, 12vw, 9rem);
	}

	.steps {
		margin-top: 2.5rem;
		display: grid;
		gap: 3.5rem;
	}

	.step {
		display: grid;
		gap: 1.25rem;
	}

	.say {
		max-width: 26rem;
		& h3 {
			font-size: 1.5rem;
			font-weight: 800;
			letter-spacing: -0.01em;
		}
		& p {
			margin-top: 0.4rem;
			font-size: 1.1rem;
			line-height: 1.5;
			color: var(--muted);
		}
	}

	.piece {
		min-width: 0;
		max-width: 40rem;
		& :global(.callout),
		& :global(.diagram) {
			margin: 0;
		}
	}

	.from {
		margin-bottom: 0.75rem;
		font-size: 0.95rem;
		color: var(--muted);
	}

	.more {
		display: inline-block;
		margin-top: 2.5rem;
		font-weight: 700;
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 5px;
	}

	@media (min-width: 60rem) {
		.steps {
			gap: 0;
		}
		.step {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
			gap: 4rem;
			align-items: start;
			padding-block: 3rem;
			border-top: 1px solid var(--line);
		}
		.say {
			position: sticky;
			top: 30vh;
		}
	}

	@supports (animation-timeline: view()) {
		@media (prefers-reduced-motion: no-preference) {
			.piece {
				animation: rise linear both;
				animation-timeline: view();
				animation-range: entry 5% cover 35%;
			}
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			translate: 0 3rem;
			scale: 0.96;
		}
	}

	.modules {
		margin-top: clamp(5rem, 12vw, 9rem);
		scroll-margin-top: 1.5rem;
		& h2 {
			margin-bottom: 3rem;
		}
	}

	.credits {
		margin-top: clamp(5rem, 12vw, 9rem);
		& p {
			margin-top: 1rem;
			max-width: 40rem;
			font-size: 1.1rem;
			line-height: 1.55;
		}
		& ul {
			margin-top: 1.75rem;
			display: flex;
			flex-wrap: wrap;
			gap: 0.4rem;
		}
		& li a {
			display: inline-block;
			padding: 0.3rem 0.7rem;
			border-radius: 999px;
			background: var(--surface);
			font-size: 0.9rem;
			font-weight: 650;
			&:hover {
				background: var(--line);
			}
		}
	}

	.agents {
		margin-top: clamp(5rem, 12vw, 9rem);
		& > p {
			margin-top: 1rem;
			max-width: 40rem;
			font-size: 1.1rem;
			line-height: 1.55;
		}
		& .lesson {
			margin-top: 1.25rem;
		}
		& a {
			text-decoration: underline;
			text-underline-offset: 4px;
		}
	}

	.skills {
		margin-top: 2rem;
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		& h3 {
			font-size: 1.2rem;
			font-weight: 800;
		}
		& ul {
			margin-top: 0.5rem;
			display: grid;
			gap: 0.3rem;
			font-family: var(--font-mono);
			font-size: 0.9rem;
		}
	}

	.end {
		margin-top: clamp(5rem, 12vw, 9rem);
		padding: clamp(2rem, 6vw, 4rem);
		border-radius: 28px;
		background: var(--surface);
		display: grid;
		justify-items: start;
		gap: 1.75rem;
	}
</style>
