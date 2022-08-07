const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get a quick overview of the DAO'),
  async execute(interaction) {
    console.log('INFO!!!');
    console.log(interaction)
    const GuildID = interaction.guildId
    console.log("Guild ID: ", GuildID)
    
    await interaction.reply("Info...");
    // const row = new ActionRowBuilder()
    //   .addComponents(
    //     new ButtonBuilder()
    //       .setCustomId('primary')
    //       .setLabel('Just click')
    //       .setStyle(ButtonStyle.Primary),
    //     new ButtonBuilder()
    //       .setCustomId('primary2')
    //       .setLabel('Just click2')
    //       .setStyle(ButtonStyle.Primary));
    // //You can add ephimeral interactions just by setting ephemeral: true
    // await interaction.reply({ content: 'Pong!', components: [row] });

  }

}