import { request } from 'graphql-request'
import { createTypeOrmConnection } from '../../utils/createTypeormConnection'
import 'cross-fetch/polyfill'
import { User } from '../../entity/User'

const host = 'http://localhost:4000'

const email = 'user2@email.com'
const password = 'userpassword'

const mutation = `
mutation {
  register(email: "${email}", password: "${password}") {
    path
    message
  }
}
`

beforeAll(async () => {
  await createTypeOrmConnection()
})

test('Register user', async () => {
  const response = await request(host, mutation)
  expect(response).toEqual({ register: null })
  const users = await User.find({ where: { email } })
  expect(users).toHaveLength(1)
  const user = users[0]
  expect(user.email).toEqual(email)
  expect(user.password).not.toEqual(password)

  const response2: any = await request(host, mutation)
  expect(response2.register).toHaveLength(1)
  expect(response2.register[0].path).toEqual('email')
})
