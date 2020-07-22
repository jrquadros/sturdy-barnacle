import { request } from 'graphql-request'
import { createTypeOrmConnection } from '../../utils/createTypeormConnection'
import 'cross-fetch/polyfill'
import { User } from '../../entity/User'

const host = 'http://localhost:4000'

const email = 'user2@email.com'
const password = 'userpassword'

const mutation = (emailFromInput: string, passwordFromInput: string) => `
mutation {
  register(email: "${emailFromInput}", password: "${passwordFromInput}") {
    path
    message
  }
}
`

beforeAll(async () => {
  await createTypeOrmConnection()
})

test('Register user', async () => {
  // test if can create a user
  const response = await request(host, mutation(email, password))
  expect(response).toEqual({ register: null })
  const users = await User.find({ where: { email } })
  expect(users).toHaveLength(1)
  const user = users[0]
  expect(user.email).toEqual(email)
  expect(user.password).not.toEqual(password)

  // test duplicate email
  const response2: any = await request(host, mutation(email, password))
  expect(response2.register).toHaveLength(1)
  expect(response2.register[0].path).toEqual('email')

  // test input validation

  // bad email
  const response3: any = await request(host, mutation('wrongemailformat', password))
  expect(response3.register[0].path).toEqual('email')

  // bad password
  const response4: any = await request(host, mutation(email, 'p'))
  expect(response4.register[0].path).toEqual('password')
})
