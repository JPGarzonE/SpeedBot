const id = require(process.env['id']);
const fs = require('node:fs');
const path = require('node:path');
const token = process.env['TOKEN']
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}


const rest = new REST({ version: '10' }).setToken(token);
const clientID = '839732718699020298';
const guildID = '1004818024299233340'; //discord identifier for servers 

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    
    await rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();