import { TextEncoder, TextDecoder } from 'util';
import failOnConsole from 'jest-fail-on-console'

failOnConsole()

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([]), // Mock response
}),
);
