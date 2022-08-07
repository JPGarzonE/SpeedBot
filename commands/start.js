const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const CeramicController = require('../controllers/ceramic.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Set up the addresses of your DAO, we will save it for all your incoming requests.'),
  async execute(interaction) {
    const GuildID = interaction.guildId

    // let response = await CeramicController.addDAO();
    // console.log("Response: ", response);
    //cREATING A MODAL

    const modal = new ModalBuilder()
      .setCustomId('modalAddress')
      .setTitle('⚡️⚡️Governance contract')

    //CREATING AN INOUT 
    // Create the text input components
    const contractAddressInput = new TextInputBuilder()
      .setCustomId('inputAddress')
      // The label is the prompt the user sees for this input
      .setLabel("⚡️⚡️Type the address  your DAO ( Governance)")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Short);
    //Creting an action 

    const firstActionRow = new ActionRowBuilder().addComponents(contractAddressInput);
    //Adding input to the contract 
    modal.addComponents(firstActionRow)
    // Triggering the modal
    await interaction.showModal(modal);
    // await interaction.reply({content:"POPO"})

  }

}