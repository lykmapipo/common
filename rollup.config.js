import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    external: ['lodash', 'read-pkg', 'statuses', 'os', 'randomcolor', 'moment'],
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
