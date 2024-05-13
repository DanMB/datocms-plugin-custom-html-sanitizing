import { connect } from 'datocms-plugin-sdk';
import { render } from './utils/render';
import 'datocms-react-ui/styles.css';
import './styles.css';
import { FieldConfigScreen } from './entrypoints/FieldConfigScreen';
import { FieldAddon } from './entrypoints/FieldAddon';
import { PluginConfigScreen } from './entrypoints/PluginConfigScreen';

connect({
	manualFieldExtensions() {
		return [
			{
				id: 'CustomHTMLSanitizing',
				name: 'Custom HTML Sanitizing',
				type: 'addon',
				fieldTypes: ['text'],
				configurable: true,
			},
		];
	},
	renderConfigScreen(ctx) {
		return render(<PluginConfigScreen ctx={ctx} />);
	},
	renderFieldExtension(_fieldExtensionId, ctx) {
		return render(<FieldAddon ctx={ctx} />);
	},
	renderManualFieldExtensionConfigScreen(_fieldExtensionId, ctx) {
		return render(<FieldConfigScreen ctx={ctx} />);
	},
});
