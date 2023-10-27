const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    test("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect(function(){new Message()}).toThrow(new Error("name is NOT passed into the constructor as the first parameter."));
        expect(function(){new Message([new Command("a","b"), new Command("c","d")])}).toThrow(new Error("name is NOT passed into the constructor as the first parameter."));
    });

    test("constructor sets name", function() {
        let object = new Message("John");
        expect(object.name).toBe("John");
    });

    test("contains a commands array passed into the constructor as the 2nd argument", function() {
        let object = new Message("a",[new Command("a","b"), new Command("c","d")]);
        expect(typeof object.commands).toBe("object");
        expect(typeof object.commands[0]).toBe("object");
        let object2 = new Message("a",new Command("a","b"));
        expect(typeof object2.commands[0]).not.toBe("object");

    });
});
