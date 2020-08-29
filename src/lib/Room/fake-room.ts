export default {
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
            itemName: 'Key',
            canTake: true,
            isKey: true,
            canUseIn: 'Foyer',
            descriptionPhrase: 'There is a rusty key on the table. ',
            result: 'You take the rusty key and put it in your pocket.',
            triggers: ['takeKey', 'useKey'],
        },
    ],
};
