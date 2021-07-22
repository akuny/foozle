import { Game } from './Game';
import fakeDisk from './fake-disk';

const mockPlayer = jest.fn();
const mockRoom = jest.fn();

beforeEach(() => {
    mockPlayer.mockClear();
    mockRoom.mockClear();
});

describe('Game class', () => {
    describe('getCurrentRoom() method', () => {
        test('Returns the current room when called', () => {
            const testGame = new Game(fakeDisk);
            const result = testGame.describe();
            expect(result).toBe(
                `You are in the foyer of a small white house. You can
                go east to the dining room or west to the living room.
                There is a cellar door to your north; it is locked.`
            );
        });
        test('', () => {});
    });
    describe('update() method', () => {
        test('', () => {});
    });
});
