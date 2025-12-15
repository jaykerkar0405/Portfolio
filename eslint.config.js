import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';
import { fileURLToPath } from 'node:url';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import svelteConfig from './svelte.config.js';
import prettier from 'eslint-config-prettier';
import { includeIgnoreFile } from '@eslint/compat';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		rules: {
			'no-undef': 'off'
		},
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				svelteConfig,
				parser: ts.parser,
				projectService: true,
				extraFileExtensions: ['.svelte'],
			}
		}
	}
);
