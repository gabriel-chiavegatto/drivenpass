module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleDirectories: ["node_modules", "src"],
    transform: {
      ".+\\.ts$": "ts-jest",
    },
    testMatch: ["<rootDir>/tests/*.(test|spec).ts"],
  };

// {import('ts-jest/dist/types').InitialOptionsTsJest}

// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   extensionsToTreatAsEsm: [".ts"],
//   globals: {
//     "ts-jest": {
//       useESM: true,
//     },
//   },
//   moduleNameMapper: {
//     "^(\.{1,2}/.)\.js$": "$1",
//   },
// };