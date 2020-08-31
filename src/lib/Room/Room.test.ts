import Room from './';
import fakeDiningRoom from './fake-room';
const mockInventory = jest.fn();

beforeEach(() => {
    mockInventory.mockClear();
});

describe('Room class', () => {
    describe('hasConnection() method', () => {
        test('Returns a success response if a connection exists', () => {
            let TestRoom = new Room(fakeDiningRoom);
            expect(TestRoom.hasConnection('west')).toEqual({
                hasRoom: true,
                newRoom: 'foyer',
            });
        });
        test("Returns a failure response if a connection doesn't exist", () => {
            let TestRoom = new Room(fakeDiningRoom);
            expect(TestRoom.hasConnection('north')).toEqual({
                hasRoom: false,
                newRoom: '',
            });
        });
    });
    describe('showCurrentRoomState() method', () => {
        test("Retuns descriptin of room's current state", () => {
            const TestRoom = new Room(fakeDiningRoom);
            expect(TestRoom.showCurrentRoomState()).toBe(
                'You are in the dining room. The table is set for a lavish meal. There is a rusty key on the table. You can go west to the foyer.'
            );
        });
    });
    describe('updateCurrentRoomState() method', () => {
        test('Changes room state as expected when valid trigger is passed', () => {
            let TestRoom = new Room(fakeDiningRoom);
            TestRoom.updateCurrentRoomState(fakeDiningRoom.items[0]);
            expect(TestRoom.currentRoomState.active).toBe(true);
            expect(TestRoom.currentRoomState.trigger).toBe('takekey');
            expect(TestRoom.currentRoomState.description).toBe(
                'You are in the dining room. The table is set for a lavish meal. You can go west to the foyer.'
            );
        });
    });
});
