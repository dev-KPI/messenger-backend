module.exports = ({ db, common }) => {
  const user = db('users')

  return {
    async read(id) {
      return await user.read(id, ['id', 'login'])
    },

    async create({ login, password }) {
      const passwordHash = await common.hash(password)
      return await user.create({ login, password: passwordHash })
    },

    async update(id, { login, password }) {
      const passwordHash = await common.hash(password)
      return await user.update(id, { login, password: passwordHash })
    },

    async delete(id) {
      return await user.delete(id)
    },

    async find(mask) {
      const sql = 'SELECT login from users where login like $1'
      return await user.query(sql, [mask])
    },
  }
}
