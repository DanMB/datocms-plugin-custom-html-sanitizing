import xss from 'xss';
import { Config } from './config';

const emptyTags = /<[^>]+>\s*<\/[^>]+>/g;
const startingWhitespace = /(?<=>)\s+/g;
const endingWhitespace = /\s+(?=<)/g;

export const sanitize = (html: string, config: Config): string => {
	/* Convert config allowedTags and allowedAttributes into XSS whitelist object */
	const whiteList: XSS.IWhiteList = {};
	for (const tag of config.allowedTags) {
		const attributes = config.allowedAttributes[tag] || [];
		if (config.allowedAttributes['*']) attributes.push(...config.allowedAttributes['*']);
		whiteList[tag] = attributes;
	}

	/* Convert config allowedStyles into XSS CSSFIlter object */
	const cssWhiteList: Record<string, boolean> = {};
	for (const style of config.allowedStyles) {
		cssWhiteList[style] = true;
	}

	/* Regex tester for config allowedSchemes, plus #, /, ./, and ../ */
	const schemesReg = new RegExp(`^(${config.allowedSchemes.map(s => s + ':').join('|')}|#|\.{0,2}\/)`);

	/* Run XSS function */
	const parsed = xss(html, {
		whiteList,
		stripIgnoreTag: true,
		stripIgnoreTagBody: config.strippedTags,
		css: {
			whiteList: cssWhiteList,
		},
		onTag: (tag, html) => {
			if (config.transformTags[tag]) {
				return html.replace(tag, config.transformTags[tag]);
			}
		},
		safeAttrValue: (_, name, value) => {
			value = value.trim();

			/* Attributes to test schemes */
			if (name === 'href' || name === 'src' || name === 'cite') {
				if (!schemesReg.test(value)) return '';
			}

			return value;
		},
	});

	/* Trim content to remove whitespace at the start and end of elements */
	if (config.shouldTrimContent) {
		return parsed.replaceAll(emptyTags, '').replaceAll(startingWhitespace, '').replace(endingWhitespace, '');
	}

	return parsed;
};
