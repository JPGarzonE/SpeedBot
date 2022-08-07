import { CeramicClient } from '@ceramicnetwork/http-client';
import { DAOSchema } from '../schemas.js';
import { TileDocument } from '@ceramicnetwork/stream-tile';

const ceramic = new CeramicClient();

const addDAO = async () => {
  const DAO = new DAOSchema("1004818024299233340", ["yam.eth"])
  
  return await TileDocument.create(
    ceramic, JSON.stringify(DAO)
  )
}

module.exports = {
  addDAO
}