import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|ico)$': '<rootDir>/src/view/__mocks__/fileMock.ts'
  },
  testPathIgnorePatterns: [
    '<rootDir>/src/view/'
  ],
  testMatch: ['<rootDir>/src/tests/**/*.test.{ts,tsx}'],
  modulePaths: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    
    // Adicione estas exclusões
    '!src/view/**/*.{ts,tsx}',
    '!src/**/index.ts',
    '!src/**/interfaces/*',
    '!src/**/*.stories.tsx',
    '!src/**/*.mock.ts'
  ],
}

export default config