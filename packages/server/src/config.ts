import * as dotenv from 'dotenv'

dotenv.config()

const serverPort = process.env.NODE_ENV === 'test' ? 4000 : process.env.SERVER_PORT

export const config = {
  serverPort,
}
