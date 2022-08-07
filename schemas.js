class DAOSchema {
  constructor(serverId, addresses = []) {
    this.serverId = serverId;
    this.addresses = addresses;
  }
}

module.exports = {
  DAOSchema
}