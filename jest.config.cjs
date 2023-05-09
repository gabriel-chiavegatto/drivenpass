// module.exports = {
//     preset: "ts-jest",
//     testEnvironment: "node",
//     moduleDirectories: ["node_modules", "src"],
//     transform: {
//       ".+\\.ts$": "ts-jest",
//     },
//     testMatch: ["<rootDir>/tests/*.(test|spec).ts"],
//   };

// {import('ts-jest/dist/types').InitialOptionsTsJest}
const esModules = ['@agm', 'ngx-bootstrap', 'lodash-es','src'].join('|');

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  transform: {
    ".+\\.ts$": "ts-jest", 
    [`(${esModules}).+\\.js$`]: 'babel-jest',
    ".+\\.js$": "ts-jest", 
  },

  testPathIgnorePatterns: ["<rootDir>/node_modules/", "^.+\\.(ios|android)\\.js$"],

  moduleNameMapper: {
    "^(\.{1,2}/.)\.js$": "$1",
    '@test/(.*)': '<rootDir>/tests/$1',
  },
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ['ts','js'],
};