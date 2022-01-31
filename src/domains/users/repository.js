import { v4 as uuidGenerate } from 'uuid';
import bcrypt from 'bcrypt';

import User from '../../models/User';

const saltRounds = 10;

export const create = async (req, res) => {
  const { name, type, password, email } = req.body;
  if (!name) {
    return res.json({ status: 400, message: 'O nome do usuario precisa ser preenchido!' });
  }

  if (!type) {
    return res.json({ status: 400, message: 'O tipo do usuario precisa ser preenchido!' });
  }

  if (!password) {
    return res.json({ status: 400, message: 'A senha do usuario precisa ser preenchida!' });
  }

  if (!email) {
    return res.json({ status: 400, message: 'O email do usuario precisa ser preenchido!' });
  }

  const user = await User.find({ email }).exec();

  if (user.length) {
    return res.json({ status: 400, message: 'Esse usuario ja esta cadastrado' });
  }

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    await User.create({
      id: uuidGenerate(),
      name,
      type,
      password: hash,
      email,
      is_active: true,
      created_at: Date.now(),
      updated_at: null,
      deleted_at: null,
    })
  });

  return res.json({ status: 200, message: 'Usuario criado com sucesso!' });
}

export const getUser = async (req, res) => {
  const { email, password } = req.query;
  if (!password) {
    return res.send({ status: 400, message: 'A senha do usuario precisa ser preenchida!' });
  }

  if (!email) {
    return res.send({ status: 400, message: 'O email do usuario precisa ser preenchido!' });
  }

  const user = await User.find({ email }).exec();

  console.log(user)

  if (!user.length) {
    return res.send({ status: 400, message: 'Usuario nao encontrado na base de dados!' });
  }

  bcrypt.compare(password, user[0].password, function (err, result) {
    console.log(password, '\n', user[0].password)
    if (result) {
      return res.send({ status: 200, user });
    } else {
      return res.send({ status: 400, message: 'A senha esta incorreta!' });
    }
  });

}