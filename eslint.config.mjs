import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	...compat.config({
		rules: {
			// 'no-console': 'warn',
			// 'react/react-in-jsx-scope': 'off', // Next.js does not require React to be in scope
			// 'import/no-anonymous-default-export': 'off', // Allow anonymous default exports
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
		},
	}),
];

export default eslintConfig;
