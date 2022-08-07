const fs = require('node:fs');
const path = require('node:path')
const token = process.env['TOKEN'];
const { Client, Collection, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
//importing queries 
const activeProposalsFunctions = require('./commands/activeProposals');
const closedProposalsFunctions = require('./commands/closedProposals');

const RequestsController = require('./controllers/requests');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  // adding commands for commands variable in the instance of client
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}
client.once('ready', () => {
  const Guilds = client.guilds.cache.map(guild => guild.id);
  console.log(Guilds);
  console.log('Ready!');
});



//Slash interactions
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;
  // console.log(interaction);

  try {
    await command.execute(interaction);
  }
  catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command',
      ephemeral: true
    });
  }

});

//interaction with buttons

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  //Building the embeds
  let title;
  let content;

  //Setting conditions for the clicked dbutton
  //Porposals interactions 
  //Active proposals

  if (interaction.customId == "activeP") {
    try {
      let response = await RequestsController.getOpenProposals();
      console.log("RESPONSE>>>")
      console.log(response)
      let proposalsString = await activeProposalsFunctions.createProposalResponse(response.proposals);
      title = `⚡️⚡️ Active proposals for: ${response.proposals[0].space.name}-DAO⚡️⚡️\n\n🚀`
      content = proposalsString;
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(title)
        .setDescription(content);
      await interaction.reply({ content: '⚡️⚡️Thanks for using SpeeDao⚡️⚡️', embeds: [embed] }
      );
    }
    catch (err) {
      console.log("ERRORRRRR")
      console.log(err)
      await interaction.reply({
        content: 'There was an error while executing this command',
        ephemeral: true
      });
    }
  }
  //Closed proposals 
  if (interaction.customId == "closedP") {
    try {
      let response = await RequestsController.getClosedProposals();
      console.log("RESPONSE>>>")
      console.log(response)
      let proposalsString = await closedProposalsFunctions.createProposalResponse(response.proposals);
      title = `⚡️⚡️ Close proposals for: ${response.proposals[0].space.name}-DAO⚡️⚡️\n\n🚀`
      content = proposalsString;
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(title)
        .setDescription(content);
      console.log('RESPONSE >>>>> ')
      console.log(response)
      await interaction.reply({ content: '⚡️⚡️Thanks for using SpeeDao⚡️⚡️', embeds: [embed] }
      );
    }
    catch (err) {
      console.log("PUTO ERRORRRRR")
      console.log(err)
      await interaction.reply({
        content: 'There was an error while executing this command',
        ephemeral: true
      });
    }
    console.log("Dope")
  };

  //VOTES 
  //#OF VOTES
  if (interaction.customId == "numberTotalVotes") {
    try {
      let response = await RequestsController.getTotalVotes();
      console.log("RESPONSE>>>")
      console.log(response)
      // console.log("DAOOOOOOO")
      console.log(response.votes.length)
      title = `⚡️⚡️ #Of total Votes ⚡️⚡️\n\n🚀`
      content = response.votes.length.toString();
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(title)
        .setDescription(content);
      await interaction.reply({ content: '⚡️⚡️Thanks for using SpeeDao⚡️⚡️', embeds: [embed] }
      );
    }
    catch (err) {
      console.log("PUTO ERRORRRRR")
      console.log(err)
      await interaction.reply({
        content: 'There was an error while executing this command',
        ephemeral: true
      });
    }
    console.log("Dope")
  };

});

client.login(token);