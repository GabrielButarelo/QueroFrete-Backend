import * as Repo from './repository'

const create = (req, res) => Repo.create(req, res);

const getUser = (req, res) => Repo.getUser(req, res);

module.exports = {
  create,
  getUser,
};