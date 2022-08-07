const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const CeramicController = require('../controllers/ceramic.mjs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Set up the addresses of your DAO, we will save it for all your incoming requests.'),
  async execute(interaction) {
    console.log('Starting...');
    console.log(interaction)
    const GuildID = interaction.guildId
    console.log("Guild ID: ", GuildID)

    CeramiController.addDAO();
    //cREATING A MODAL

    const modal = new ModalBuilder()
      .setCustomId('modalAddress')
      .setTitle('⚡️⚡️Please type the address of the governance contract of your DAO')

    //CREATING AN INOUT 
    // Create the text input components
    const contractAddressInput = new TextInputBuilder()
      .setCustomId('inputAddress')
      // The label is the prompt the user sees for this input
      .setLabel("⚡️⚡️Please type the address of the governance contract of your DAO')")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Short);
    //Creting an action 

    const firstActionRow = new ActionRowBuilder().addComponents(contractAddressInput);
    //Adding input to the contract 
    modal.addComponents(firstActionRow)
    
    //Triggering the modal 
    await interaction.showModal(modal);

  }

}