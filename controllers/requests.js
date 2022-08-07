// const fetch from 'node-fetch';
const axios = require('axios');

const queryProposal = (proposalId) => {
  const query = `
    query {
        proposal(id: ${proposalId} ) {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            author
            created
            scores
            scores_by_strategy
            scores_total
            scores_updated
            plugins
            network
            strategies {
                name
                network
                params
            }
            space {
                id
                name
            }
        }
    }
  `
  return query
}

const queryTypeProposal = (first, skip, spaces_array, state, orderBy) => {
  const query = `
    query {
        proposals (
            first: ${first},
            skip: ${skip},
            where: {
                space_in: ${spaces_array},
                state: ${state}
            },
            orderBy: ${orderBy},
            orderDirection: desc
        ) {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            scores
            scores_by_strategy
            scores_total
            scores_updated
            author
            space {
                id
                name
            }
        }
    }
  `
  return query
}

const queryVotePower = (voter_address, space, proposal_address) => {
  const query = `
    query {
      vp (
        voter: ${voter_address}
        space: ${space}
        proposal: ${proposal_address}
      ) {
        vp
        vp_by_strategy
        vp_state
      } 
    }
  `
  return query

}

const getOpenProposals = (query) => {
  return new Promise((resolve) => {
    axios.post(
      'https://hub.snapshot.org/graphql',
      {
        query: `
    query {
        proposals (
            first: 5,
            skip: 0,
            where: {
                space_in: ["aavegotchi.eth"],
                state: "active"
            },
            orderBy: "created",
            orderDirection: desc
        ) {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            scores
            scores_by_strategy
            scores_total
            scores_updated
            author
            space {
                id
                name
            }
        }
    }
  `,
        variables: {
          now: new Date().toISOString(),
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((result) => {
        resolve(result.data.data);
      });
  })
}
const getClosedProposals = (query) => {
  return new Promise((resolve) => {
    axios.post(
      'https://hub.snapshot.org/graphql',
      {
        query: `
    query {
        proposals (
            first: 5,
            skip: 0,
            where: {
                space_in: ["aavegotchi.eth"],
                state: "closed"
            },
            orderBy: "created",
            orderDirection: desc
        ) {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            scores
            scores_by_strategy
            scores_total
            scores_updated
            author
            space {
                id
                name
            }
        }
    }
  `,
        variables: {
          now: new Date().toISOString(),
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((result) => {
        resolve(result.data.data);
      });
  })
}

const getProposals = () => {
  return QueryRequest(queryProposal("QmWbpCtwdLzxuLKnMW4Vv4MPFd2pdPX71YBKPasfZxqLUS"))
};

//We are only getting the fists 5 proposals, planning pagination
// const getOpenProposals = () => {
//   return QueryRequest(queryTypeProposal(5, 0, ["yam.eth"], "active", "created"))
// };

// we are hardcoded the space_in
// const getClosedProposals = () => {
//   return QueryRequest(queryTypeProposal(5, 0, ["yam.eth"], "closed", "created"))
// };

//
// const getTotalVotes = () => {
//   return QueryRequest(queryTypeProposal(100000000, 0, ["yam.eth"], "", "created"))
// };
const getTotalVotes = (query) => {
  return new Promise((resolve) => {
    axios.post(
      'https://hub.snapshot.org/graphql',
      {
        query: `
    query {
  votes (
    first: 20000
    skip: 0
    where: {
     space_in: ["aavegotchi.eth"]
    }
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    voter
    vp
    vp_by_strategy
    vp_state
    created
    proposal {
      id
    }
    choice
    space {
      id
    }
  }
}
  `,
        variables: {
          now: new Date().toISOString(),
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((result) => {
        resolve(result.data.data);
      });
  })
}
const sendVote = (voter_address, space, proposal_address) => {
  return QueryRequest(queryVotePower(voter_address, space, proposal_address))
}

module.exports = {
  getProposals,
  getOpenProposals,
  getClosedProposals,
  getTotalVotes,
  sendVote
};