import Room from './';
import fakeRoom from './fake-room';
const mockInventory = jest.fn();

beforeEach(() => {
    mockInventory.mockClear();
});

describe('Room class', () => {
    test('Changes room state as expected when valid trigger is passed', () => {
        let TestRoom = new Room(fakeRoom);
        TestRoom.changeCurrentRoomState(fakeRoom.items[0]);
        expect(TestRoom.currentRoomState.active).toBe(true);
        expect(TestRoom.currentRoomState.trigger).toBe('takekey');
        expect(TestRoom.currentRoomState.description).toBe(
            'You are in the dining room. The table is set for a lavish meal. You can go west to the foyer.'
        );
    });
});
