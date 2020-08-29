export default {
    player: {
        alive: true,
        inventory: [],
    },

    rooms: [
        {
            name: 'Foyer',
            hasPlayer: true,
            connections: [
                { direction: 'east', room: 'Dining Room', locked: false },
                { direction: 'west', room: 'Living Room', locked: false },
                { direction: 'north', room: 'Cellar', locked: true },
            ],
            roomStates: [
                {
                    active: true,
                    trigger: 'default',
                    description:
                        'You are in the foyer of a small white house. You can go east to the dining room or west to the living room. There is a cellar door to your north; it is locked.',
                },
                {
                    active: false,
                    trigger: 'useKey',
                    description:
                        'You are in the foyer of a small white house. You can go east to the dining room or west to the living room. There is a cellar door to your north; you opened it with a rusty key.',
                },
            ],
            items: [],
        },
        {
            name: 'Living Room',
            hasPlayer: false,
            connections: [{ direction: 'east', room: 'Foyer', locked: false }],
            roomStates: [
                {
                    active: true,
                    trigger: 'default',
                    description:
                        'You are in the tidy living room. There is a piano. You can go east to the foyer.',
                },
                {
                    active: false,
                    trigger: 'playMusic',
                    description:
                        'You are in the tidy living room. The piano is playing a sad tune on its own. You can go east to the foyer.',
                },
            ],
            items: [
                {
                    id: 1,
                    itemName: 'Piano',
                    canTake: false,
                    isKey: false,
                    canUseIn: 'Living Room',
                    result:
                        'You plink a sad melody. When you stop, the piano is still playing.',
                    triggers: ['playMusic'],
                },
            ],
        },
        {
            name: 'Dining Room',
            hasPlayer: false,
            connections: [{ direction: 'west', room: 'Foyer', locked: false }],
            roomStates: [
                {
                    active: true,
                    trigger: 'default',
                    description:
                        'You are in the dining room. The table is set for a lavish meal. There is a rusty key on the table. You can go west to the foyer.',
                },
                {
                    active: false,
                    trigger: 'takeKey',
                    description:
                        'You are in the dining room. The table is set for a lavish meal. You can go west to the foyer.',
                },
            ],
            items: [
                {
                    id: 2,
                    itemName: 'Key',
                    canTake: true,
                    isKey: true,
                    canUseIn: 'Foyer',
                    descriptionPhrase: 'There is a rusty key on the table. ',
                    result: 'You take the rusty key and put it in your pocket.',
                    triggers: ['takeKey', 'useKey'],
                },
            ],
        },
        {
            name: 'Cellar',
            hasPlayer: false,
            connections: [{ direction: 'south', room: 'Foyer', locked: false }],
            roomStates: [
                {
                    active: true,
                    trigger: 'default',
                    description:
                        "You are in the cellar. It is so cold...there's a letter on the ground.",
                },
                {
                    active: false,
                    trigger: 'takeLetter',
                    description:
                        "You are in the cellar. It is so cold...you can't see far into the darkness.",
                },
            ],
            items: [
                {
                    id: 3,
                    itemName: 'Letter',
                    canTake: true,
                    isKey: false,
                    canUseIn: 'Living room',
                    descriptionPhrase:
                        "It's a sad story. A face appears in the mirror...",
                    result: "It's a crumpled love note.",
                    triggers: ['takeLetter', 'readLetter'],
                },
            ],
        },
    ],
};
