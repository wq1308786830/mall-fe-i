module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  env: {
    browser: true,
    jest: true,
  },
  settings: {
    react: {
      version: '16.9',
    },
  },
  globals: {
    __dirname: true,
    WeixinJSBridge: true,
    ENV_DEBUG: true,
    ENV_NAME: true,
    gio: true,
    history: true,
  },
  rules: {
    'jsx-a11y/href-no-hash': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
      },
    ],
    'prefer-destructuring': [1],
    'react/jsx-wrap-multilines': [1],
    'react/jsx-props-no-spreading': [0],
    'react/no-array-index-key': [1],
    'consistent-return': [0],
    radix: [1],
    'react/react-in-jsx-scope': [0],
    'react/forbid-prop-types': [0],
    'react/jsx-filename-extension': [1, { extensions: ['.js', 'jsx', 'tsx'] }],
    'global-require': [0],
    'import/prefer-default-export': [0],
    'react/jsx-no-bind': [0],
    'react/prop-types': [0],
    'react-hooks/rules-of-hooks': [2], // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': [1], // 检查 effect 的依赖
    'react/button-has-type': [0],
    'no-restricted-syntax': [0],
    'import/no-extraneous-dependencies': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'no-nested-ternary': [0],
    'arrow-body-style': [0],
    'import/extensions': [0],
    'no-bitwise': [0],
    'no-cond-assign': [0],
    'require-yield': [1],
    'no-shadow': [0],
    'no-underscore-dangle': [0],
    'func-names': [0],
    'object-curly-newline': [0],
    'function-paren-newline': [0],
    'no-new': [0],
    'no-console': [0],
  },
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
};
