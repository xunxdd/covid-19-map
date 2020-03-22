module.exports = {
  root: true,

  env: {
    commonjs: true,
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'func-call-spacing': ['off'],
    'implicit-arrow-linebreak': ['off'],
    'keyword-spacing': ['error', {
      'before': true,
      'after': true,
    }],
    'import/no-unresolved': ['off'],
    'import/prefer-default-export': ['off'],
    'import/order': ['off'],
    'keyword-spacing': ['error', {
      'before': true,
      'after': true,
    }],
    'max-len': [
      'error', {
        code: 100,
        ignorePattern: '^import |^export ',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-use-before-define': ['error', {
      functions: false,
      classes: true,
      variables: true,
    }],
    'padding-line-between-statements': [
      'error',
      {
        'blankLine': 'always',
        'prev': 'block-like',
        'next': '*',
      },
      {
        'blankLine': 'always',
        'prev': 'multiline-block-like',
        'next': '*',
      },
      {
        'blankLine': 'always',
        'prev': 'multiline-expression',
        'next': '*',
      },
    ],
    'prefer-destructuring': [
      'error',
      {
        'array': false,
        'object': true,
      },
    ],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': false }],
    'sort-imports': ['error', {
      ignoreCase: true,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
    }],
    'space-before-blocks': ['error'],
    'vue/no-v-html': ['off'],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: false,
      ignores: [],
    }],
    'vue/name-property-casing': ['error', 'kebab-case'],
  }
}
