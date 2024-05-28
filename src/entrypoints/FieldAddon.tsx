import type { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas } from 'datocms-react-ui';
import { defaultConfig, type Config } from '../utils/config';
import { useEffect } from 'react';
import { sanitize } from '../utils/xss';
import { getValueFromPath } from '../utils/getValueFromPath';

export const FieldAddon = ({ ctx }: { ctx: RenderFieldExtensionCtx }) => {
	useEffect(() => {
		const config: Config = {
			...defaultConfig,
			...ctx.plugin.attributes.parameters,
			...ctx.parameters,
		};

		const value = getValueFromPath(ctx.formValues, ctx.fieldPath);
		console.log(ctx.formValues, ctx.fieldPath, value)
		if(value !== undefined) {
			const parsed = sanitize(value as string, config);

			if (parsed !== value) {
				ctx.setFieldValue(ctx.fieldPath, parsed);
			}
		}
	}, [ctx.formValues[ctx.fieldPath]]);

	return (
		<Canvas ctx={ctx}>
			<div className='hint'>
				<ul>
					<li>
						<span>The field can't contain dangerous HTML</span>
					</li>
				</ul>
			</div>
		</Canvas>
	);
};
