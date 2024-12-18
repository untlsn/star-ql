import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tsEslint.config(
	eslint.configs.recommended,
	tsEslint.configs.recommended,
	{
		rules: {
			'@typescript-eslint/interface-name-prefix':          0,
			'@typescript-eslint/explicit-function-return-type':  0,
			'@typescript-eslint/explicit-module-boundary-types': 0,
			'@typescript-eslint/no-explicit-any':                0,
		},
	},
	{
		plugins: {
			'@stylistic': stylistic,
		},
		rules: {
			'@stylistic/semi':                                   [1, 'always'],
			'@stylistic/curly':                                  0,
			'@stylistic/indent':                                 [1, 'tab', { SwitchCase: 1 }],
			'@stylistic/object-property-newline':                [1, { allowAllPropertiesOnSameLine: true }],
			'@stylistic/no-multiple-empty-lines':                [1, { max: 2, maxEOF: 0 }],
			'@stylistic/arrow-parens':                           [1, 'always'],
			'@stylistic/comma-dangle':                           [1, 'always-multiline'],
			'@stylistic/quote-props':                            [1, 'as-needed'],
			'@stylistic/object-curly-spacing':                   [1, 'always'],
			'@stylistic/object-curly-newline':                   [1, { multiline: true, consistent: true }],
			'@stylistic/no-trailing-spaces':                     1,
			'@stylistic/quotes':                                 [1, 'single'],
			'@stylistic/key-spacing':                            [1, { align: 'value' }],
			'@stylistic/space-before-blocks':                    1,
			'@stylistic/comma-spacing':                          1,
			'@typescript-eslint/consistent-type-imports':        1,
			'@typescript-eslint/explicit-module-boundary-types': 1,
		},
	},
);
