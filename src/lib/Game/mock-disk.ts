export default {
    player: {
        alive: true,
        inventory: [],
    },

    rooms: [
        {
            name: 'Foyer',
            roomStates: [
                {
                    active: true,
                    trigger: 'default',
                    description: 'You are in the foyer of a small white house.',
                },
                {
                    active: false,
                    trigger: 'usedKey',
                    description:
                        'You are in the foyer of a small white house. There is an open trap door',
                },
            ],
            hasPlayer: true,
            connections: [
                { direction: 'east', room: 'Dining Room', locked: false },
                { direction: 'west', room: 'Living Room', locked: false },
                { direction: 'north', room: 'Cellar', locked: true },
            ],
            items: [
                {
                    id: 2,
                    canTake: true,
                    itemName: 'Key',
                    canUseOn: 'Cellar door',
                    descriptionPhrase: 'There is a rusty key on the table. ',
                    result: 'You take the rusty key and put it in your pocket.',
                    triggers: ['tookKey', 'usedKey'],
                },
            ],
        },
    ],
};
