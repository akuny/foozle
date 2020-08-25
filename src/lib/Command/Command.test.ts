import { Command } from './Command';

describe('Command class', () => {
    describe('isValid() method', () => {
        test('Returns true when a movement command is passed', () => {
            const movementCommand = new Command('north');
            expect(movementCommand.isValid()).toBe(true);
        });
        test('Returns false when an invalid command is passed', () => {
            const garbageCommand = new Command('foo');
            expect(garbageCommand.isValid()).toBe(false);
        });
    });
    describe('getCommand() method', () => {
        test('Returns a movement command as expected', () => {
            const validMovementPayload = {
                type: 'move',
                action: 'north',
                items: ['none'],
            };
            const movementCommand = new Command('north');
            expect(movementCommand.getPayload()).toMatchObject(
                validMovementPayload
            );
        });
        test('Returns a take command as expected', () => {
            const validTakePayload = {
                type: 'take',
                action: 'take',
                items: ['the', 'key'],
            };
            const takeCommand = new Command('Take the key');
            expect(takeCommand.getPayload()).toMatchObject(validTakePayload);
        });
    });
});
