import type { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas } from 'datocms-react-ui';
import { defaultConfig, type Config } from '../utils/config';

export const FieldAddon = ({ ctx }: { ctx: RenderFieldExtensionCtx }) => {
	const config: Config = {
		...defaultConfig,
		...ctx.plugin.attributes.parameters,
		...ctx.parameters,
	};

	config;

	return (
		<Canvas ctx={ctx}>
			<div className='addon'></div>
		</Canvas>
	);
};
