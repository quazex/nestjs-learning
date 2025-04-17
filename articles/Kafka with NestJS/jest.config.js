const config = require('../../jest.config');

module.exports = {
    ...config,
    setupFiles: [
        '<rootDir>/tests/testing.setup.ts',
    ],
}
