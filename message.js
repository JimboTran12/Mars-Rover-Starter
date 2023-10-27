class Message {
   // Write code here!
   constructor(name, commands) {
      this.name = name;
      if(!this.name || typeof this.name === "object") {
         throw Error("name is NOT passed into the constructor as the first parameter.")
      }
      this.commands = commands;
   }
}

module.exports = Message;