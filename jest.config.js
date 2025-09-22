module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    moduleNameMapper: {
        "\\.(css|scss)$": "<rootDir>/mocks/styleMock.js",
        "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/mocks/fileMock.js"
    }
};
