import { iPlayer, Player } from './Player';
import { iRoom, Room } from './Room';

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

    update(command: string, callback: (game: Game, output: string) => void) {
        let output = '';

        switch (command) {
            case 'north':
            case 'south':
            case 'east':
            case 'west':
                output = this.movePlayer(command);
                break;
            case 'help':
                output = 'Here is some help...';
                break;
            case 'look':
                output = this.currentRoom.description;
                break;
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

    getCurrentRoom() {
        return this.currentRoom.description;
    }
}
