const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!')
    .addIntegerOption(option =>
      option.setName("number")
        .setDescription("Number of pongs returned!")),
  async execute(interaction) {
    console.log('It works and we are rocking!!!');
    console.log(interaction.options)
    
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('primary')
          .setLabel('Just click')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('primary2')
          .setLabel('Just click2')
          .setStyle(ButtonStyle.Primary));
    //You can add ephimeral interactions just by setting ephemeral: true
    await interaction.reply({ content: 'Pong!', components: [row] });

  }

}