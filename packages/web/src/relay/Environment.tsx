// @ts-ignore
import { installRelayDevTools } from 'relay-devtools'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
// @ts-ignore
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger'

import cacheHandler from './cacheHandler'

const __DEV__ = process.env.NODE_ENV === 'development'
if (__DEV__) {
  installRelayDevTools()
}

const network = Network.create(__DEV__ ? RelayNetworkLogger.wrapFetch(cacheHandler) : cacheHandler)

const source = new RecordSource()
const store = new Store(source)

const env = new Environment({
  network,
  store,
})

export default env
