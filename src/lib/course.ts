/** Callout kinds a lesson can use: `> [!TLDR]`, `> [!TRICK] Title`, `> [!RISK] Title`, `> [!DO] Title`. */
export type CalloutKind = 'tldr' | 'trick' | 'risk' | 'do';

export type Callout = { kind: CalloutKind; title: string; body: string };

export type Trick = { title: string; html: string };

export type Lesson = {
	/** `<module>/<lesson>`, the key progress is stored under. */
	id: string;
	href: string;
	module: string;
	title: string;
	summary: string;
	html: string;
	/** The lesson's `##` headings, for the on-page outline. */
	sections: { id: string; title: string }[];
	tricks: Trick[];
};

export type Module = { slug: string; number: number; title: string; summary: string; lessons: Lesson[] };

export type Course = { modules: Module[]; lessons: Lesson[] };

/** A lesson without its body, for navigation. */
export type LessonLink = Pick<Lesson, 'id' | 'href' | 'module' | 'title' | 'summary'>;

export type Outline = (Omit<Module, 'lessons'> & { lessons: LessonLink[] })[];
