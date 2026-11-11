/** Callout kinds a lesson can use. `check` and `diagram` are pulled out of the body; see `server/course.ts`. */
export type CalloutKind = 'tldr' | 'trick' | 'risk' | 'do' | 'check' | 'diagram';

export type Callout = { kind: CalloutKind; title: string; body: string };

export type Trick = { title: string; html: string };

/** A retrieval-practice card: question shown first, answer revealed on request. */
export type Check = { id: string; question: string; answer: string };

/** A lesson body is HTML with interactive diagrams mounted between the pieces. */
export type Block = { kind: 'html'; html: string } | { kind: 'diagram'; name: string };

export type Lesson = {
	/** `<module>/<lesson>`, the key progress is stored under. */
	id: string;
	href: string;
	module: string;
	/** 1-based position within its module. */
	number: number;
	title: string;
	summary: string;
	minutes: number;
	blocks: Block[];
	/** The lesson's source list (HTML), shown after the review cards. */
	sources: string;
	/** The lesson's `##` headings, for the on-page outline. */
	sections: { id: string; title: string }[];
	/** The `[!TLDR]` body (HTML), also inside `blocks`; pulled out for previews. */
	tldr: string;
	/** The `[!DO]` callout, also inside `blocks`; pulled out for previews. */
	task: Trick;
	tricks: Trick[];
	checks: Check[];
};

export type Module = {
	slug: string;
	href: string;
	number: number;
	/** Colour-wheel hue that tints everything belonging to this module. */
	hue: number;
	title: string;
	summary: string;
	/** Signature diagram shown on the module page. */
	diagram?: string;
	lessons: Lesson[];
};

export type Course = { modules: Module[]; lessons: Lesson[] };

/** A lesson without its body, for navigation. */
export type LessonLink = Pick<Lesson, 'id' | 'href' | 'module' | 'number' | 'title' | 'summary' | 'minutes'> & {
	checks: number;
};

export type Outline = (Omit<Module, 'lessons'> & { lessons: LessonLink[] })[];
