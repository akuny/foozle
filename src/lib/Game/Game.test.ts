import { Game } from './Game';
import mockDisk from './mock-disk';

const mockPlayer = jest.fn();
const mockRoom = jest.fn();

beforeEach(() => {
    mockPlayer.mockClear();
    mockRoom.mockClear();
});

describe('Game class', () => {
    describe('getCurrentRoom() method', () => {
        test('Returns the current room when called', () => {
            const testGame = new Game(mockDisk);
            const result = testGame.getCurrentRoom();
            expect(result).toBe('You are in the foyer of a small white house.');
        });
        test('', () => {});
    });
    describe(' method', () => {
        test('', () => {});
        test('', () => {});
    });
});
