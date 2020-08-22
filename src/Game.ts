import { iPlayer, Player } from './Player';
import { iRoom, Room } from './Room';
import { iCommand } from './CommandParser';

interface iGame {
    player: iPlayer;
    rooms: iRoom[];
}

export class Game {
    currentRoom!: Room;
    otherRooms: Room[] = [];
    player: Player;

    constructor(game: iGame) {
        this.player = new Player(game.player);

        game.rooms.forEach((obj) => {
            obj.hasPlayer
                ? (this.currentRoom = new Room(obj))
                : this.otherRooms.push(new Room(obj));
        });
    }

    update(command: iCommand, callback: (game: Game, output: string) => void) {
        let output = '';

        switch (command.action) {
            case 'north':
            case 'south':
            case 'east':
            case 'west':
                output = this.movePlayer(command.action);
                break;
            case 'help':
                output = 'Here is some help...';
                break;
            case 'look':
                output = this.currentRoom.description;
                break;
            case 'use':
                output = this.useItem(command.item);
        }

        return callback(this, output);
    }

    movePlayer(direction: string): string {
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

    useItem(item: string) {
        /*
        check if item is in player's inventory
            if yes, check if it has an effect if used in current room (TODO expand game.json structure)
        
        check if item is in current Room's canUse array
            if yes, retrive _result_ from item's object in canUse array
        */
        return '';
    }

    getCurrentRoom() {
        return this.currentRoom.description;
    }
}
