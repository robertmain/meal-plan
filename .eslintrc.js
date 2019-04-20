module.exports = {
  'parser':  '@typescript-eslint/parser',  // Specifies the ESLint parser
  'extends': [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'airbnb-base'
  ],
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
    'jest': true,
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    '@typescript-eslint/indent': ['error', 2],
    'indent': ['error', 2],
    'arrow-parens': [
      'warn',
      'always'
    ],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'never'
      }
    ],
    'consistent-return': 'off',
    'func-names': ['warn', 'as-needed'],
    'id-length': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': true
      }
    ],
    'import/prefer-default-export': 'off',
    'max-len': [
      'error',
      {
        'code': 80,
        'ignoreComments': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreUrls': true,
        'ignoreRegExpLiterals': true,
        'tabWidth': 2
      }
    ],
    'max-params': [
      'warn',
      {
        'max': 3
      }
    ],
    'no-plusplus': [
      'warn', {
        'allowForLoopAfterthoughts': true
      }
    ],
    'no-underscore-dangle': 'off',
    'prefer-arrow-callback': 0,
    'prefer-template': 'off',
    'prefer-destructuring': ['error',
    {
      'VariableDeclarator': {
        'array': false,
        'object': true
      },
      'AssignmentExpression': {
        'array': false,
        'object': true
      }
    },
    {
      'enforceForRenamedProperties': false
    }
  ],
  'radix': 'off',
  'class-methods-use-this': 'off'
},
'settings': {
  'import/resolver': {
    'node': {
      'paths': ['src'],
      'extensions': ['.ts']
    }
  }
}
};
