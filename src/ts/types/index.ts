export type Item = {
    id: number;
    itemName: string;
    isKey: boolean;
    canTake: boolean;
    canUse: boolean;
    canUseIn: string;
    takeResult: string;
    useResult: string;
    triggers: string[];
};

export type RoomConnection = {
    direction: string;
    room: string;
    locked: boolean;
};

export type RoomState = {
    active: boolean;
    trigger: string;
    description: string;
};

export type RoomTemplate = {
    name: string;
    hasPlayer: boolean;
    connections: RoomConnection[];
    roomStates: RoomState[];
    items: Item[];
};
