import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';

export default tseslint.config(
    {
        ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],

    eslintConfigPrettier,

    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                parser: tseslint.parser,
                project: ['./tsconfig.app.json', './tsconfig.node.json'],
                extraFileExtensions: ['.vue'],

            },
        },
    },

    {
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            '@stylistic/linebreak-style': ['error', 'unix'],
            '@stylistic/indent': ['warn', 4],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/quotes': ['warn', 'single'],

            'vue/html-indent': ['warn', 4],
            'vue/component-name-in-template-casing': [
                'error',
                'PascalCase',
                {
                    registeredComponentsOnly: false,
                },
            ],
            'vue/multi-word-component-names': 'off',
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'variableLike',
                    format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                    leadingUnderscore: 'allow',
                    trailingUnderscore: 'allow',
                },
                {
                    selector: 'parameter',
                    format: ['camelCase'],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase'],
                },
                {
                    selector: 'enumMember',
                    format: ['PascalCase'],
                },
                {
                    selector: 'property',
                    format: null,
                    modifiers: ['requiresQuotes'],
                },
            ],
        },
    },
);
