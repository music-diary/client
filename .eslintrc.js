module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'import'],
  rules: {
    'react/react-in-jsx-scope': 'off', // JSX에서 'React' 임포트가 필요 없음 (React 17+ 자동 임포트).
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환 타입 명시 필요 없음.
    '@typescript-eslint/naming-convention': 'off', // 변수 및 함수 명명 규칙 강제 안 함.
    '@typescript-eslint/no-floating-promises': 'off', // 처리되지 않은 프로미스 경고 무시.
    '@typescript-eslint/strict-boolean-expressions': 'off', // 엄격한 boolean 표현식 사용 안 함.
    '@typescript-eslint/no-confusing-void-expression': 'off', // void 반환 표현식에 대한 규칙 무시.
    '@typescript-eslint/no-unused-vars': 'warn', // 사용되지 않는 변수 있을 시 경고.
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          'type',
        ],
        pathGroups: [
          { pattern: 'react', group: 'builtin', position: 'before' },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'never',
      },
    ],
  },
  ignorePatterns: ['node_modules/', '*.js', '*.d.ts'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
};
