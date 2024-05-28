export const getValueFromPath = (form:Record<string, unknown>, path: string) => {
	const parts = path.split('.');

	let value:any = form;
	for (const part of parts) {
		if (value[part] === undefined) {
			return undefined;
		}
		value = value[part];
	}

	return value;
}
