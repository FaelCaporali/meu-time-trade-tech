import type { Config } from 'jest'

const config: Config = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: 'jsdom',
    verbose: true,
    preset: 'ts-jest',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__tests__/__mocks__/fileMock.js',
        '^/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}

export default config
