// const fetch from 'node-fetch';
const axios = require('axios');
const getProposals = () => {
  return new Promise(resolve => {

    // you hardcoded the Id of the DAO / Wallet / I don't know
    axios.post('https://hub.snapshot.org/graphql', {
      query: `
        query {
proposal(id:"QmWbpCtwdLzxuLKnMW4Vv4MPFd2pdPX71YBKPasfZxqLUS") {
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
      `,
      variables: {
        now: new Date().toISOString(),
      },
    },
      {
        // method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      .then((result) => {
        resolve(result.data.data)
      });
  });
};

//We are only getting the fists 5 proposals, planning pagination
const getOpenProposals = () => {
  return new Promise(resolve => {
    //TODO change space 
    axios.post('https://hub.snapshot.org/graphql', {
      query: `
        query {
  proposals (
    first: 5,
    skip: 0,
    where: {
      space_in: ["yam.eth"],
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
        // method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      .then((result) => {
        resolve(result.data.data)
      });
  });
};

// we are hardcoded the space_in
const getClosedProposals = () => {
  return new Promise(resolve => {
    //TODO change space 
    axios.post('https://hub.snapshot.org/graphql', {
      query: `
        query {
  proposals (
    first: 5,
    skip: 0,
    where: {
      space_in: ["yam.eth"],
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
        // method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      .then((result) => {
        resolve(result.data.data)
      });
  });
}
const getTotalVotes = () => {
  return new Promise(resolve => {
    //TODO change space 
    //TODOO CHANGE FIRST ARGUMENT
    axios.post('https://hub.snapshot.org/graphql', {
      query: `
       query {
  votes (
    first: 100000000,
    skip: 0
    where: {
      space_in: ["yam.eth"],
       
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
        // method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      .then((result) => {
        resolve(result.data.data)
      });
  });
}

module.exports = {
  getProposals,
  getOpenProposals,
  getClosedProposals,
  getTotalVotes
}