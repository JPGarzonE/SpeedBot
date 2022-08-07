// const { CeramicClient } = require('@ceramicnetwork/http-client');
// const { DAOSchema } = require('../schemas.js');
// const { TileDocument } = require('@ceramicnetwork/stream-tile');

// const ceramic = new CeramicClient();

// const addDAO = async () => {
//   const DAO = new DAOSchema("1004818024299233340", ["yam.eth"])

//   return await TileDocument.create(
//     ceramic, JSON.stringify(DAO)
//   )
// }
const { posts, store, ethereum } = require('aleph-js');

// var api_server = 'https://api2.aleph.im'
// async function addDAO() {
//   await posts.get_posts(
//     'chat',
//     {
//       'refs': ['hall'],
//       'api_server': api_server
//     }
//   )

// }
async function addDAO(contractAddress) {

  account = await ethereum.import_account({ mnemonics: 'decide thumb rally buyer enemy apology awkward roof spatial share song walk' })
  //TODO BUILD OBJECT
  return await posts.submit(
    account.address,
    'mytype',
    { 'body': contractAddress },
    {
      'account': account,
      'channel': 'TEST',
      'api_server': 'https://api2.aleph.im'
    }
  )

  // let item_hash = '74880e1b69a501e8d26099c97caf9caa62691b8f00c9897c323f4f8eb1e9ccb1';
}
async function getDaoContract(itemHash) {
  let post_type = 'mytype'
  let buffer = await posts.get_posts(post_type, {
    hashes: [itemHash]
  })
  let contentText = buffer.posts[0].item_content
  let contentParsed = JSON.parse(contentText).content.body
  let string = buffer.toString('utf8');
  console.log("<<<BUFFER")
  console.log(buffer)
  console.log("<<<STRING")
  console.log(contentParsed)
  return contentParsed
}

module.exports = {
  addDAO,
  getDaoContract
}