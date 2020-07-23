import { config } from '../config'
export const getHost = () => `http://localhost:${config.serverPort || 4000}`
