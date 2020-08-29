import { iRoom } from '../../ts/interfaces';
import { Item, RoomConnection, RoomState, RoomTemplate } from '../../ts/types';
import Inventory from '../Inventory';

export class Room extends Inventory implements iRoom {
    name: string;
    inactiveRoomStates: RoomState[];
    currentRoomState: RoomState;
    hasPlayer: boolean;
    connections: RoomConnection[];

    constructor(room: RoomTemplate) {
        super(room.items);
        this.name = room.name;
        this.hasPlayer = room.hasPlayer;
        this.connections = room.connections;
        this.inactiveRoomStates = room.roomStates.filter((obj) => {
            return obj.active === false;
        });

        const [current] = room.roomStates.filter((obj) => {
            return obj.active;
        });

        this.currentRoomState = current;
    }

    showCurrentRoomState(): string {
        return this.currentRoomState.description;
    }

    updateCurrentRoomState(item: Item): void {
        let matchingTrigger = '';

        const { triggers, isKey } = item;
        for (let i = 0; i < triggers.length; i++) {
            for (let j = 0; j < this.inactiveRoomStates.length; j++) {
                let storedObj = this.inactiveRoomStates[j];
                if (triggers[i] === storedObj.trigger) {
                    matchingTrigger = triggers[i];
                    break;
                }
            }
        }

        if (!matchingTrigger) {
            return;
        }

        let [newState] = this.inactiveRoomStates.filter((obj) => {
            return obj.trigger === matchingTrigger;
        });

        newState.active = true;

        let oldState = Object.assign({}, this.currentRoomState);

        oldState.active = false;

        const updatedInactiveRoomStates = this.inactiveRoomStates.filter(
            (obj) => {
                return obj.trigger !== matchingTrigger;
            }
        );

        if (isKey) {
            this.unlockConnection(item);
        }

        this.inactiveRoomStates = [oldState, ...updatedInactiveRoomStates];
        this.currentRoomState = newState;
    }

    hasConnection(direction: string) {
        const [matchingDirection] = this.connections.filter((connection) => {
            return connection.direction === direction;
        });

        if (matchingDirection) {
            if (!matchingDirection.locked) {
                return {
                    hasRoom: true,
                    newRoom: matchingDirection.room,
                };
            }
        }

        return { hasRoom: false, newRoom: '' };
    }

    private unlockConnection(item: Item) {
        const updatedConnections = this.connections.map((connection) => {
            connection.locked = false;
            return connection;
        });

        this.connections = updatedConnections;
    }
}
