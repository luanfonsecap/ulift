const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
	clearMocks: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	coverageReporters: ['text-summary', 'lcov'],
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/__tests__/**/*.spec.ts'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/src/',
	}),
};
