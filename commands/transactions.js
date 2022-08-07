// const covalentjs = require('covalentjs');
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const RequestsController = require('../controllers/requests');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('transactions')
    .setDescription('Get the last X transactions made by the DAO.'),
  async execute(interaction) {
    console.log("Waiting for the transactions...");
    let response = await RequestsController.getProposals()
    console.log(response.proposal)
    let title = response.proposal.title

    let choices = response.proposal.choices.toString();
    // for (let i =0 ; i< choices.length i++){
    //    let element = choices[i]

    // } 
    // const result = await covalentjs.classA.getTransactions(
    //   137,
    //   '0x6A4f8453DE0ACCe2E610414794f12cD874F96B72',
    //   {
    //     'page-size': 20,
    //     'page-number': 03
    //   }
    // );
    // console.log('result')
    // console.log(result)
    // console.log(result.data.items)
    // console.log('log_events: ', result.data.items[0].log_events);
    // const resultString = JSON.stringify(result)
    await interaction.reply(` This is the proposal: ${title}, and this are the options are:  ${choices}`);
  }
}