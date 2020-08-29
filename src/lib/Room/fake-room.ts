export default {
    name: 'dining room',
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
    ],
    items: [
        {
            id: 2,
            itemName: 'key',
            isKey: true,
            canTake: true,
            canUse: true,
            canUseIn: 'foyer',
            takeResult: 'You take the rusty key and put it in your pocket.',
            useResult: 'You unlock the cellar door.',
            triggers: ['takekey', 'usekey'],
        },
    ],
};
