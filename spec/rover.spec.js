const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", function() {
    let object = new Rover(111);
    expect(object.position).toBe(111);
    expect(object.mode).toBe("NORMAL");
    expect(object.generatorWatts).toBe(110);
  });

  test("response returned by receiveMessage contains the name of the message", function() {
    let rover = new Rover(111);
    let message = new Message("John", []);
    expect(rover.receiveMessage(message).message).toBe("John")
  });

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(111);
    let commands = [new Command("a","b"), new Command("c","d")];
    let message = new Message("John", commands);
    expect(rover.receiveMessage(message).results.length).toEqual(2);
  });

  test("responds correctly to the status check command", function() {
    let commands = [new Command("STATUS_CHECK", "none")];
    let message = new Message('Test message', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let roverStatus = rover.receiveMessage(message).results[0];
    expect(roverStatus).toEqual({
      completed: true,
      roverStatus: {
        mode: "NORMAL",
        generatorWatts: 110,
        position: 98382,
      },
    });
  });

  test("responds correctly to the mode change command", function() {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let message = new Message('Test message', commands);
    let rover = new Rover(98382);
    let roverStatus = rover.receiveMessage(message).results[0];
    expect(rover.mode).toBe("LOW_POWER");
    expect(roverStatus).toEqual({completed: true});
    commands = [new Command("MODE_CHANGE", "NORMAL")];
    message = new Message('Test message', commands);
    roverStatus = rover.receiveMessage(message).results[0];
    expect(rover.mode).toBe("NORMAL");
    expect(roverStatus).toEqual({completed: true});

  });

  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let message = new Message('Test message', commands);
    let rover = new Rover(98382);
    let roverStatus = rover.receiveMessage(message).results[0];
    expect(rover.mode).toBe("LOW_POWER");
    expect(roverStatus).toEqual({completed: true});
    commands = [new Command("MOVE", 10000)];
    message = new Message('Test message', commands);
    roverStatus = rover.receiveMessage(message).results[0];
    expect(roverStatus).toEqual({completed: false});
    expect(rover.position).toBe(98382)
  });

  test("responds with the position for the move command", function() {
    let commands = [new Command("MOVE", 10000)];
    let message = new Message('Test message', commands);
    let rover = new Rover(98382);
    expect(rover.position).toBe(98382);
    let roverStatus = rover.receiveMessage(message).results[0];
    expect(rover.position).toBe(108382);
    expect(roverStatus).toEqual({completed: true});

  });


});
