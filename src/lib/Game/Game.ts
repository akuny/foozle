import { ICommand, IGame } from '../../ts/interfaces';
import { Disk, RoomTemplate } from '../../ts/types';
import Inventory from '../Inventory';
import Player from '../Player';
import Room from '../Room';

export class Game implements IGame {
    currentRoom!: Room;
    otherRooms: Room[] = [];
    player: Player;

    constructor(disk: Disk) {
        const spinningDisk = JSON.parse(
            JSON.stringify(disk, (key, value) => {
                return typeof value === 'string' &&
                    key !== 'description' &&
                    key !== 'takeResult' &&
                    key !== 'useResult'
                    ? value.toLowerCase()
                    : value;
            })
        );

        this.player = new Player(spinningDisk.player, new Inventory());

        spinningDisk.rooms.forEach((obj: RoomTemplate) => {
            obj.hasPlayer
                ? (this.currentRoom = new Room(obj, new Inventory()))
                : this.otherRooms.push(new Room(obj, new Inventory()));
        });
    }

    start() {
        return this.currentRoom.showState();
    }

    update(command: ICommand) {
        let { type, action, items } = command.getPayload();
        let description = this.currentRoom.showState();

        switch (type) {
            case 'move':
                description = this.movePlayer(action);
                break;
            case 'use':
                description = this.useItem(items);
                break;
            case 'take':
                description = this.takeItem(items);
                break;
            case 'other':
                switch (action) {
                    case 'help':
                        description = `Try these commands: north, south, east, west; 
                                        look; inventory; take [thing in room]; 
                                        use [thing in room or inventory]`;
                        break;
                    case 'inventory':
                        description = this.player.look();
                        break;
                    default:
                }
            default:
        }

        return this.respond(description);
    }

    private respond(description: string) {
        return { game: this, description };
    }

    private movePlayer(direction: string) {
        let result = this.currentRoom.hasConnection(direction);

        if (!result.hasRoom) {
            return 'Hmm, you can\'t go that way...';
        }

        let roomSearchResult = this.otherRooms.find((room) => {
            return room.name === result.newRoom;
        });

        if (!roomSearchResult) {
            return this.currentRoom.showState();
        }

        let newRoom = roomSearchResult;
        newRoom.hasPlayer = true;
        this.currentRoom.hasPlayer = false;

        this.otherRooms.push(this.currentRoom);

        const newOtherRooms = (this.otherRooms = this.otherRooms.filter(
            (room) => {
                return room.name !== result.newRoom;
            }
        ));

        this.otherRooms = newOtherRooms;
        this.currentRoom = newRoom;

        return this.currentRoom.showState();
    }

    private takeItem(items: string[]) {
        const soughtItem = this.currentRoom.search(items);

        if (!soughtItem.canTake) {
            return 'I don\'t think you can pick that up.';
        }

        this.currentRoom.drop(soughtItem);
        this.player.take(soughtItem);
        this.currentRoom.updateState(soughtItem);
        return soughtItem.takeResult;
    }

    private useItem(terms: string[]): string {
        const items = [];
        items.push(this.player.search(terms));
        items.push(this.currentRoom.search(terms));

        const [item] = items.filter((v) => v.canUse);

        if (item) {
            this.currentRoom.updateState(item);
            return item.useResult;
        }

        return 'You can\'t use that!';
    }
}
