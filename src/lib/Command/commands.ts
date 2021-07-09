export const MOVEMENT_COMMANDS = [
    'n',
    'north',
    's',
    'south',
    'e',
    'east',
    'w',
    'west',
];

export const USE_COMMANDS = ['use', 'play', 'open'];

export const TAKE_COMMANDS = ['take'];

export const UTILITY_COMMANDS = [
    'h',
    'help',
    'l',
    'look',
    'i',
    'inventory',
];

export const ALL_COMMANDS = MOVEMENT_COMMANDS
    .concat(USE_COMMANDS)
    .concat(TAKE_COMMANDS)
    .concat(UTILITY_COMMANDS);
