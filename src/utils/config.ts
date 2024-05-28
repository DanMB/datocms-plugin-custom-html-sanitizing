export type Config = {
	allowedTags: string[];
	allowedAttributes: Record<string, string[]>;
	allowedSchemes: string[];
	allowedStyles: string[];
	strippedTags: string[];
	shouldTrimContent: boolean;
	transformTags: Record<string, string>;
};

export const defaultConfig: Config = {
	allowedTags: [
		'q',
		'pre',
		'span',
		'code',
		'blockquote',
		'cite',
		'img',
		'figcaption',
		'figure',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'p',
		'a',
		'table',
		'tbody',
		'td',
		'tfoot',
		'th',
		'thead',
		'tr',
		'col',
		'colgroup',
		'ol',
		'ul',
		'li',
		'i',
		's',
		'b',
		'u',
		'em',
		'strong',
		'br',
	],
	allowedAttributes: {
		'*': ['style', 'abbr', 'title'],
		table: ['border', 'cellpadding', 'cellspacing', 'width', 'align', 'valign'],
		tbody: ['align', 'valign'],
		td: ['scope', 'headers', 'width', 'rowspan', 'colspan', 'align', 'valign'],
		th: ['scope', 'headers', 'width', 'rowspan', 'colspan', 'align', 'valign'],
		tfoot: ['align', 'valign'],
		thead: ['align', 'valign'],
		tr: ['rowspan', 'align', 'valign'],
		col: ['align', 'valign', 'span', 'width'],
		colgroup: ['align', 'valign', 'span', 'width'],
		a: ['target', 'href', 'name', 'title'],
		img: ['src', 'srcset', 'alt', 'width', 'height', 'loading'],
	},
	allowedStyles: [
		'text-decoration',
		'text-align',
		'vertical-align',
		'padding-left',
		'border',
		'border-collapse',
		'border',
		'background-color',
	],
	allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel'],
	strippedTags: ['script', 'iframe'],
	shouldTrimContent: false,
	transformTags: {
		em: 'i',
		strong: 'b',
	},
};
