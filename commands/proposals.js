const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const RequestsController = require('../controllers/requests');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('proposals')
    .setDescription('Get the proposals in the DAO. By default it return the active ones (see the params)')
    .addIntegerOption(option =>
      option.setName("size")
        .setDescription("Number of proposals returned. The latest are returned. (5 by default)"))
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
      .setTitle('Choose the information that you want to see about the proposals ')
      .setDescription('Active proposals: Active proposals in the Dao sorted from newer to latest\nClosed proposals: Closed proposals in the DAO sorted from newer to latest\n Lasr week proposals: Closed and active proposals in the DAO created last week\n');
    //Adding the options for the buttons
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('activeP')
          .setLabel('⚡️Active Proposals')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId('closedP')
          .setLabel('⚡️Closed Proposals')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('lastWeekP')
          .setLabel('⚡️Last week Proposals')
          .setStyle(ButtonStyle.Secondary));

    console.log(interaction.options)
    await interaction.reply({ content: '⚡️⚡️Thanks for using SpeeDao⚡️⚡️', embeds: [embed], components: [row] });
  }
}