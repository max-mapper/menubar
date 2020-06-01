module.exports = {
	exclude: ['**/*spec.ts', '**/__mocks__/**'],
	excludeExternals: true,
	excludeNotExported: true,
	excludePrivate: true,
	excludeProtected: true,
	hideGenerator: true,
	includes: './src',
	module: 'commonjs',
	out: 'docs',
	stripInternal: 'true',
	theme: 'markdown',
};
