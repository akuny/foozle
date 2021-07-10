import { IInventory, IRoom } from '../../ts/interfaces';
import { Item, RoomConnection, RoomState, RoomTemplate } from '../../ts/types';
import HasInventory from '../HasInventory';

export class Room extends HasInventory implements IRoom {
    name: string;
    hasPlayer: boolean;
    inactiveRoomStates: RoomState[];
    currentRoomState: RoomState;
    connections: RoomConnection[];

    constructor(room: RoomTemplate, inventory: IInventory) {
        super(inventory, room.items);

        this.name = room.name;
        this.hasPlayer = room.hasPlayer;
        this.connections = room.connections.map((connection) => connection);

        this.inactiveRoomStates = room.roomStates.filter((roomState) => {
            return roomState.active === false;
        });

        const [current] = room.roomStates.filter((obj) => {
            return obj.active;
        });

        this.currentRoomState = current;
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

    showState() {
        return this.currentRoomState.description;
    }

    updateState(item: Item) {
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

    private unlockConnection(item: Item) {
        const updatedConnections = this.connections.map((connection) => {
            connection.locked = false;
            return connection;
        });

        this.connections = updatedConnections;
    }
}
