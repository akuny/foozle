import { iCommand, iDisk, iGame } from '../../ts/interfaces';
import { RoomTemplate } from '../../ts/types';
import Player from '../Player';
import Room from '../Room';

export class Game implements iGame {
    currentRoom!: Room;
    otherRooms: Room[] = [];
    player: Player;

    constructor(disk: iDisk) {
        const cleanDisk = JSON.parse(
            JSON.stringify(disk, (key, value) => {
                return typeof value === 'string' &&
                    key !== 'description' &&
                    key !== 'takeResult' &&
                    key !== 'useResult'
                    ? value.toLowerCase()
                    : value;
            })
        );

        this.player = new Player(cleanDisk.player);

        cleanDisk.rooms.forEach((obj: RoomTemplate) => {
            obj.hasPlayer
                ? (this.currentRoom = new Room(obj))
                : this.otherRooms.push(new Room(obj));
        });
    }

    getCurrentRoom(): string {
        return this.currentRoom.showCurrentRoomState();
    }

    update(
        command: iCommand,
        callback: (game: Game, output: string) => void
    ): void {
        let output = '';
        let { type, action, items } = command.getPayload();

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
                        output = this.currentRoom.showCurrentRoomState();
                        break;
                    case 'inventory':
                        output = this.player.showItems();
                        break;
                }
            default:
                break;
        }

        return callback(this, output);
    }

    private movePlayer(direction: string): string {
        let result = this.currentRoom.hasConnection(direction);

        if (!result.hasRoom) {
            return 'Hmm, you can\'t go that way...';
        }

        let roomSearchResult = this.otherRooms.find((room) => {
            return room.name === result.newRoom;
        });

        let newRoom: Room;

        if (roomSearchResult) {
            newRoom = roomSearchResult;
        } else {
            newRoom = this.currentRoom;
        }

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

        return this.currentRoom.showCurrentRoomState();
    }

    private takeItem(items: string[]) {
        const result = this.currentRoom.findItem(items);

        if (result.hasItem && result.item.canTake) {
            this.currentRoom.removeItem(result.item);
            this.player.addItem(result.item);
            this.currentRoom.updateCurrentRoomState(result.item);
            return result.item.takeResult;
        }
        return 'I don\'t think you can pick that up.';
    }

    private useItem(items: string[]) {
        const playerSearchResult = this.player.findItem(items);
        if (playerSearchResult.hasItem && playerSearchResult.item.canUse) {
            this.currentRoom.updateCurrentRoomState(playerSearchResult.item);
            return playerSearchResult.item.useResult;
        }
        const roomSearchResult = this.currentRoom.findItem(items);
        if (roomSearchResult.hasItem && roomSearchResult.item.canUse) {
            this.currentRoom.updateCurrentRoomState(roomSearchResult.item);
            return roomSearchResult.item.useResult;
        }
        return 'You don\'t have one of those!';
    }
}
