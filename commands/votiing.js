const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const RequestsController = require('../controllers/requests');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('See votes information abour the DAO and vote On-chain directly from Discord')
    .addIntegerOption(option =>
      option.setName("size")
        .setDescription("Number of votes returned. The latest are returned. (5 by default)"))
    //Question 
    .addStringOption(option =>
      option.setName("status")
        .setDescription("Status of the proposal. (Active by default)")
        .addChoices(
          { name: 'All', value: 'all' },
          { name: 'Active', value: 'active' },
          { name: 'Pending', value: 'pending' },
          { name: 'Closed', value: 'closed' },
          { name: 'Core', value: 'core' }
        )),
  async execute(interaction) {
    //Adding an embed 

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Choose the information that you want to see about the votes ')
      .setDescription('Votes: Get all the information about votes in this DAOk\n');
    //Adding the options for the buttons
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('numberTotalVotes')
          .setLabel('⚡️Number of total votes')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId('numberLastWeekVotes')
          .setLabel('⚡️Number of total votes last week')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('percentageOfGrowth')
          .setLabel('⚡️%of growth  in # of votes')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('vote')
          .setLabel('⚡️Vote on proposals')
          //In the case of failure this could be a link
          .setStyle(ButtonStyle.Secondary)
      );

    console.log(interaction.options)
    await interaction.reply({ content: '⚡️⚡️Thanks for using SpeeDao⚡️⚡️', embeds: [embed], components: [row] });
  }
}