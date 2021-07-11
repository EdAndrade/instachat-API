module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},

	"parser": "@typescript-eslint/parser",
	"plugins": [
		"@typescript-eslint"
	],
	
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended"
	],
	
	rules: {
		indent: 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'no-tabs': 'off',
		semi: ['error', 'always']
	}
};