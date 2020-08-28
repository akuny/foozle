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

    changeCurrentRoomState(triggers: string[]) {
        let matchingTrigger = '';

        for (let i = 0; i < triggers.length; i++) {
            for (let j = 0; j < this.inactiveRoomStates.length; j++) {
                let storedObj = this.inactiveRoomStates[j];
                if (triggers[i] === storedObj.trigger) {
                    matchingTrigger = triggers[i];
                    break;
                }
            }
        }

        if (matchingTrigger) {
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

            this.inactiveRoomStates = [oldState, ...updatedInactiveRoomStates];
            this.currentRoomState = newState;
        }

        return;
    }

    hasConnection(direction: string) {
        const [matchingDirection] = this.connections.filter((obj) => {
            return obj.direction === direction;
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
}
