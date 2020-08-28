import Room from './';

const mockInventory = jest.fn();

const room = {
    name: 'dinning room',
    hasPlayer: false,
    connections: [{ direction: 'west', room: 'foyer', locked: false }],
    roomStates: [
        {
            active: true,
            trigger: 'default',
            description:
                'You are in the dining room. The table is set for a lavish meal. There is a rusty key on the table. You can go west to the foyer.',
        },
        {
            active: false,
            trigger: 'takekey',
            description:
                'You are in the dining room. The table is set for a lavish meal. You can go west to the foyer.',
        },
        {
            active: false,
            trigger: 'eatmeal',
            description: 'You are stuffed.',
        },
    ],
    items: [
        {
            id: 2,
            canTake: true,
            itemName: 'key',
            canUseOn: 'cellar door',
            descriptionPhrase: 'there is a rusty key on the table. ',
            result: 'you take the rusty key and put it in your pocket.',
            triggers: ['takekey', 'usekey'],
        },
    ],
};

beforeEach(() => {
    mockInventory.mockClear();
});

describe('Room class', () => {
    test('Changes room state as expected when valid trigger is passed', () => {
        let TestRoom = new Room(room);
        TestRoom.changeCurrentRoomState([
            'ranaway',
            'takekey',
            'fiffle faffle',
        ]);
        expect(TestRoom.currentRoomState.active).toBe(true);
        expect(TestRoom.currentRoomState.trigger).toBe('takekey');
        expect(TestRoom.currentRoomState.description).toBe(
            'You are in the dining room. The table is set for a lavish meal. You can go west to the foyer.'
        );
    });
});
