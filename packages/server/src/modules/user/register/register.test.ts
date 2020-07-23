import 'cross-fetch/polyfill'
import { User } from '../../../entity/User'
import { TestClient } from '../../../utils/testClient'
import { createTestConn } from '../../../utils/createTestConnection'
import { getHost } from '../../../utils/getHost'

const host = getHost()
const email = 'user2@email.com'
const name = 'username'

const client = new TestClient(host)

let conn: any

beforeAll(async () => {
  conn = await createTestConn(true)
})

afterAll(async () => {
  conn.close()
})

test('Register user', async () => {
  // test if can create a user
  const response = await client.register(email, name)
  expect(response.data).toEqual({ register: null })
  const users = await User.find({ where: { email } })
  expect(users).toHaveLength(1)
  const user = users[0]
  expect(user.email).toEqual(email)
  // expect(user.password).not.toEqual(password)

  // test duplicate email
  const response2 = await client.register(email, name)
  expect(response2.data.register).toHaveLength(1)
  expect(response2.data.register[0].path).toEqual('email')

  // test input validation

  // bad email
  const response3: any = await client.register('wrongemailformat', name)
  expect(response3.data.register[0].path).toEqual('email')

  // bad name
  const response4: any = await client.register(email, 'p')
  expect(response4.data.register[0].path).toEqual('name')
})
