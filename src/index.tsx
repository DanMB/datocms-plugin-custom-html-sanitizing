import { type Field, connect } from 'datocms-plugin-sdk';
import { render } from './utils/render';
import 'datocms-react-ui/styles.css';
import './styles.css';
import { FieldConfigScreen } from './entrypoints/FieldConfigScreen';
import { FieldAddon } from './entrypoints/FieldAddon';
import { PluginConfigScreen } from './entrypoints/PluginConfigScreen';
import { defaultConfig } from './utils/config';
import { sanitize } from './utils/xss';

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
		render(<FieldAddon ctx={ctx} />);
	},
	renderManualFieldExtensionConfigScreen(_fieldExtensionId, ctx) {
		render(<FieldConfigScreen ctx={ctx} />);
	},
	onBeforeItemUpsert(item, ctx) {
		if (!ctx.fields || !item.data.attributes) return true;
		const fields = Object.values(ctx.fields).filter(field =>
			field?.attributes.appearance.addons.some(addon => addon.id === ctx.plugin.id)
		) as Field[];

		const keys = Object.keys(item.data.attributes);
		for (const key of keys) {
			const field = fields.find(field => field.attributes.api_key === key);
			if (!field) continue;

			const config = {
				...ctx.plugin.attributes.parameters,
				...field.attributes.appearance.addons.find(addon => addon.id === ctx.plugin.id)?.parameters,
				...defaultConfig,
			};

			try {
				const parsed = sanitize(item.data.attributes[key] as string, config);
				item.data.attributes[key] = parsed;
			} catch (e) {
				console.error(e);
				ctx.notice(`Error sanitizing field ${field.attributes.label}`);
			}
		}

		return true;
	},
});
