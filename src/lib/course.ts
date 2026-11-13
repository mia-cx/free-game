/** Callout kinds a lesson can use. `check`, `diagram` and `form` are pulled out of the body; see `server/build-course.ts`. */
export type CalloutKind = 'tldr' | 'trick' | 'risk' | 'do' | 'check' | 'diagram' | 'form';

export type Callout = { kind: CalloutKind; title: string; body: string };

export type Trick = { title: string; html: string };

/** A retrieval-practice card: question shown first, answer revealed on request. */
export type Check = { id: string; question: string; answer: string };

/** A question the reader answers on the page; `text` is its Markdown for the export, `html` for the page. */
export type Question = { text: string; html: string };

/** A worksheet placed in the lesson: the reader answers each question and downloads the answers. */
export type Form = {
	/** Slug of the title, unique within its lesson. */
	id: string;
	title: string;
	questions: Question[];
};

/** A lesson body is HTML with interactive diagrams and forms mounted between the pieces. */
export type Block = { kind: 'html'; html: string } | { kind: 'diagram'; name: string } | { kind: 'form'; form: Form };

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
	/** The lesson's Markdown copy for agents, written by Svartz. */
	markdownHref?: string;
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
	/** The module's Markdown copy for agents, written by Svartz. */
	markdownHref?: string;
	lessons: Lesson[];
};

export type Course = { modules: Module[]; lessons: Lesson[] };

/** A lesson without its body, for navigation. */
export type LessonLink = Pick<Lesson, 'id' | 'href' | 'module' | 'number' | 'title' | 'summary' | 'minutes'> & {
	checks: number;
};

export type Outline = (Omit<Module, 'lessons'> & { lessons: LessonLink[] })[];
