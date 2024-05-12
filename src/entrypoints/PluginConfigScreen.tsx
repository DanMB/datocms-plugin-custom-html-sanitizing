import { RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import { Button, Canvas, TextareaField, type TextareaInputChangeEventHandler } from 'datocms-react-ui';
import { useState } from 'react';

export const PluginConfigScreen = ({ ctx }: { ctx: RenderConfigScreenCtx }) => {
	const [config, setConfig] = useState<string>(JSON.stringify(ctx.plugin.attributes.parameters, null, 2));

	const handleChange: TextareaInputChangeEventHandler = event => {
		setConfig(event);
	};

	const handleSave = () => {
		const data = JSON.parse(config);
		ctx.updatePluginParameters(data);
		setConfig(JSON.stringify(data, null, 2));
		ctx.notice('Global settings updated successfully!');
	};

	return (
		<Canvas ctx={ctx}>
			<div className='container'>
				<h3>Global config</h3>
				<TextareaField
					id={'global'}
					name={'global'}
					label='JSON config'
					value={JSON.stringify(ctx.plugin.attributes.parameters, null, 2)}
					onChange={handleChange}
				/>
				<Button buttonType='primary' onClick={handleSave}>
					Save
				</Button>
			</div>
		</Canvas>
	);
};
