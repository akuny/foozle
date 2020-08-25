import { Command } from './Command';
import jest from 'jest';

describe('Command class', () => {
    describe('isValid() method', () => {
        test('Returns true when a movement command is passed', () => {
            const movementCommand = new Command('north');
            const valid = movementCommand.isValid();
            expect(valid).toBe(true);
        });
        test('Returns false when an invalid command is passed', () => {
            const garbageCommand = new Command('foo');
            const valid = garbageCommand.isValid();
            expect(valid).toBe(false);
        });
    });
    describe('getCommand() method', () => {
        test('Returns a movement command as expected', () => {
            const validMovementObj = {
                type: 'move',
                action: 'north',
                items: ['none'],
            };
            const movementCommand = new Command('north');
            const commandObj = movementCommand.getCommand();
            expect(commandObj).toMatchObject(validMovementObj);
        });
        test('Returns a take command as expected', () => {
            const validTakeObj = {
                type: 'take',
                action: 'take',
                items: ['the', 'key'],
            };
            const takeCommand = new Command('Take the key');
            const takeObj = takeCommand.getCommand();
            expect(takeObj).toMatchObject(validTakeObj);
        });
    });
});
