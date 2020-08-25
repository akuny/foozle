import { Game } from './Game';
import mockGame from './mock-game';

const mockPlayer = jest.fn();
const mockRoom = jest.fn();

beforeEach(() => {
    mockPlayer.mockClear();
    mockRoom.mockClear();
});

describe('Game class', () => {
    describe('getCurrentRoom() method', () => {
        test('Returns the current room when called', () => {
            const testGame = new Game(mockGame);
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
