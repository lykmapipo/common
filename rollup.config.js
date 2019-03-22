import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    external: ['path', 'read-pkg'],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        interop: false,
        esModule: false,
        preferConst: true,
        strict: true,
      },
      { file: pkg.module, format: 'es' },
    ],
  },
];
