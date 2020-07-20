import { request } from 'graphql-request'
import { createTypeOrmConnection } from '../utils/createTypeormConnection'
import 'cross-fetch/polyfill'
import { host } from './constants'
import { User } from '../entity/User'

const email = 'user2@email.com'
const password = 'userpassword'

const mutation = `
mutation {
  register(email: "${email}", password: "${password}")
}
`

beforeAll(async () => {
  await createTypeOrmConnection()
})

test('Register user', async () => {
  const response = await request(host, mutation)
  expect(response).toEqual({ register: true })
  const users = await User.find({ where: { email } })
  expect(users).toHaveLength(1)
  const user = users[0]
  expect(user.email).toEqual(email)
  expect(user.password).not.toEqual(password)
})
