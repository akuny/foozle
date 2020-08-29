import Inventory from '../Inventory';
import { iItem, iRoomState, iRoom, iRoomConnection } from '../../ts/interfaces';

export class Room extends Inventory {
    name: string;
    inactiveRoomStates: iRoomState[];
    currentRoomState: iRoomState;
    hasPlayer: boolean;
    connections: iRoomConnection[];

    constructor(room: iRoom) {
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

    changeCurrentRoomState(item: iItem) {
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
            return false;
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
        return (this.currentRoomState = newState);
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

        return { hasRoom: false, newRoom: null };
    }

    private unlockConnection(item: iItem) {
        const updatedConnections = this.connections.map((connection) => {
            connection.locked = false;
            return connection;
        });

        this.connections = updatedConnections;
    }
}
