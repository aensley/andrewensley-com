import love from 'eslint-config-love'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    ...love,
    files: ['**/*.ts', '**/*.tsx']
  },
  eslintConfigPrettier,
  {
    ignores: ['.lighthouseci/', '.next/', '.vscode/', 'functions/', 'out/', 'next-env.d.ts', 'tsconfig.tsbuildinfo']
  }
]
