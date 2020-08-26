import Inventory from '../Inventory';
import { iRoomState, iRoom, iRoomConnection } from '../../ts/interfaces';

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

    changeCurrentRoomState(triggerArr: string[]) {
        const [matchingTrigger] = triggerArr.filter((str) => {
            return this.inactiveRoomStates.filter((roomState) => {
                return roomState.trigger === str;
            });
        });

        if (typeof matchingTrigger !== 'undefined') {
            const [newState] = this.inactiveRoomStates.filter((obj) => {
                return obj.trigger === matchingTrigger;
            });
            this.currentRoomState.active = false;
            this.currentRoomState = newState;
        }
    }

    hasConnection(direction: string) {
        let result = this.connections.filter((obj) => {
            return obj.direction === direction;
        });

        if (result.length > 0) {
            let matchedDirection = result[0];

            if (!matchedDirection.locked) {
                return {
                    hasRoom: true,
                    newRoom: matchedDirection.room,
                };
            }
        }

        return { hasRoom: false, newRoom: null };
    }
}
