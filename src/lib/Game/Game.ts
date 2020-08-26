import { iCommandPayload, iDisk } from '../../ts/interfaces';
import Player from '../Player';
import Room from '../Room';

export class Game {
    currentRoom!: Room;
    otherRooms: Room[] = [];
    player: Player;

    constructor(disk: iDisk) {
        this.player = new Player(disk.player);

        disk.rooms.forEach((obj) => {
            obj.hasPlayer
                ? (this.currentRoom = new Room(obj))
                : this.otherRooms.push(new Room(obj));
        });
    }

    getCurrentRoom(): string {
        return this.currentRoom.description;
    }

    update(
        command: iCommandPayload,
        callback: (game: Game, output: string) => void
    ) {
        let output = '';
        let { type, action, items } = command;

        switch (type) {
            case 'move':
                output = this.movePlayer(action);
                break;
            case 'use':
                output = this.useItem(items);
                break;
            case 'take':
                output = this.takeItem(items);
            case 'other':
                switch (action) {
                    case 'help':
                        output = 'Here is some help...';
                        break;
                    case 'look':
                        output = this.currentRoom.description;
                        break;
                }
            default:
                break;
        }

        return callback(this, output);
    }

    private movePlayer(direction: string): string {
        let result = this.currentRoom.hasConnection(direction);

        if (result.hasRoom) {
            let roomSearchResult = this.otherRooms.find((room) => {
                return room.name === result.newRoom;
            });

            let newRoom: Room;

            if (roomSearchResult !== undefined) {
                newRoom = roomSearchResult;
            } else {
                newRoom = this.currentRoom;
            }

            newRoom.hasPlayer = true;
            this.currentRoom.hasPlayer = false;

            this.otherRooms.push(this.currentRoom);
            this.otherRooms = this.otherRooms.filter((room) => {
                return room.name !== result.newRoom;
            });

            this.currentRoom = newRoom;

            return this.currentRoom.description;
        } else {
            return 'Hmm, you can\'t go that way...';
        }
    }

    private takeItem(items: string[]) {
        return `take that ${items}`;
    }

    private useItem(items: string[]) {
        if (this.player.hasItem(items) || this.currentRoom.hasItem(items)) {
        }
        /*
        check if item is in player's inventory
            if yes, check if it has an effect if used in current room (TODO expand game.json structure)
        
        check if item is in current Room's canUse array
            if yes, retrive _result_ from item's object in canUse array
        */
        return `You are using ${items}`;
    }
}
