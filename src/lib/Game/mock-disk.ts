export default {
    player: {
        alive: true,
        inventory: [],
    },

    rooms: [
        {
            name: 'Foyer',
            description: 'You are in the foyer of a small white house.',
            hasPlayer: true,
            connections: [
                { direction: 'east', room: 'Dining Room', locked: false },
                { direction: 'west', room: 'Living Room', locked: false },
                { direction: 'north', room: 'Cellar', locked: true },
            ],
            items: [],
        },
    ],
};
