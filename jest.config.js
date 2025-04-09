/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // No longer using preset, defining transforms manually
  // preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    // Use ts-jest for ts/tsx files, and configure Babel inline for Jest
    '^.+\\.tsx?$': ['ts-jest', {
      // Provide Babel configuration directly for Jest environment
      babelConfig: {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
      },
      // ts-jest configuration options go here
      // e.g., tsconfig: 'tsconfig.test.json' if you have a specific one
    }],
    // Re-add babel-jest specifically for JS/MJS files, configured inline
    '^.+\\.(js|jsx|mjs)$': ['babel-jest', {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    }],
  },
  // Explicitly match only TypeScript test files in the src directory
  testMatch: [
    '<rootDir>/src/**/*.spec.ts',
    '<rootDir>/src/**/*.test.ts',
  ],
  moduleNameMapper: {
    // Map the specific deep import path used in the source code
    // to its actual location within node_modules for Jest's resolver.
    '^@bldrs-ai/conway/compiled/src/rendering/threejs/html_viewer\\.js$':
      '<rootDir>/node_modules/@bldrs-ai/conway/compiled/src/rendering/threejs/html_viewer.js',
    // Add mappings for other similar deep imports if needed
  },
  // By default, node_modules are ignored by Jest's transformer.
  // We need to explicitly tell Jest *not* to ignore the @bldrs-ai/conway module
  // as it uses ES Module syntax that needs transformation.
  // The pattern uses a negative lookahead `(?!...)` to exclude specific modules from being ignored.
  // We need to transform both @bldrs-ai/conway and three/examples/jsm because they use ES Modules.
  transformIgnorePatterns: [
    // Ignore node_modules except for @bldrs-ai/conway and three/examples/jsm
    '/node_modules/(?!(@bldrs-ai/conway|three/examples/jsm)/).+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    // Keep the default pnp ignore
    '\\.pnp\\.[^\\/]+$',
  ],
  // Add any other Jest configurations here
}
