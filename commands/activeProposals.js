// const covalentjs = require('covalentjs');
const { SlashCommandBuilder } = require('discord.js');
const RequestsController = require('../controllers/requests');


const createProposalResponse = (proposals) => {
  return new Promise(async resolve => {
    let proposalsString = '';
    for (let index = 0; index < proposals.length; index++) {
      proposalsString = `${proposalsString}\n\n${createProposalTemplate(proposals[index], index + 1)}`;
    }
    console.log(proposalsString)
    resolve(proposalsString)
  });
};

const createProposalTemplate = (proposal, index) => {
  let proposalOptions = proposal.choices.join(`\n`)

  let proposalString =
    `⚡️⚡️ Active proposals for: ${proposal.space.name}-DAO⚡️⚡️\n\n🚀#${index}\n⚡️Title:${proposal.title}\n\n⚡️Options:\n${proposalOptions}\n\n⚡️Author:${proposal.author}`;
  return proposalString
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('activeproposals')
    .setDescription('Get the active proposals in the DAO.'),
  async execute(interaction) {
    console.log("Waiting for the proposals...");
    let response = await RequestsController.getOpenProposals()
    // console.log(response)
    let proposalsString = await createProposalResponse(response.proposals);

    await interaction.reply(proposalsString);
  },
  createProposalResponse
}
