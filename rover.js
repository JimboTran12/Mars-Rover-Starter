class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }
   
   receiveMessage(messageObject) {
      let results = [];
      let temp = {};
      for (let i = 0; i < messageObject.commands.length; i++) {
         if (messageObject.commands[i].commandType === "STATUS_CHECK") {
            temp = {
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position,
               },
            };

         }
         else if (messageObject.commands[i].commandType === "MODE_CHANGE") {
            temp = {completed: true,};
            this.mode = messageObject.commands[i].value;
         }
         else if (messageObject.commands[i].commandType === "MOVE") {
            if (this.mode === "LOW_POWER") {
               temp = {completed: false,};
            }
            else {
               this.position += messageObject.commands[i].value;
               temp = {completed: true,};
            }
         }

         

         results.push(temp);


      }

      return {
         message: messageObject.name,
         results: results,
      }
   }
}

module.exports = Rover;