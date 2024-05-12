import { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk';
import { Button, Canvas, TextareaField, type TextareaInputChangeEventHandler } from 'datocms-react-ui';
import { useState } from 'react';

export const FieldConfigScreen = ({ ctx }: { ctx: RenderManualFieldExtensionConfigScreenCtx }) => {
	const [config, setConfig] = useState<string>(JSON.stringify(ctx.parameters, null, 2));

	const handleChange: TextareaInputChangeEventHandler = event => {
		setConfig(event);
	};

	const handleSave = () => {
		const data = JSON.parse(config);
		ctx.setParameters(data);
		setConfig(JSON.stringify(data, null, 2));
		ctx.notice('Field settings updated successfully!');
	};

	return (
		<Canvas ctx={ctx}>
			<div className='container'>
				<h3>Field config</h3>
				<TextareaField
					id={'global'}
					name={'global'}
					label='JSON config'
					placeholder='Override the default configuration for this field.'
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
