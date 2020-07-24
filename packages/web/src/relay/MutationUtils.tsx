import { ConnectionHandler } from 'relay-runtime'
import { isObject, isArray } from 'lodash/fp'

// @ts-ignore
import { Store, RecordProxy, ConcreteNode } from 'relay-runtime'

type ListRecordRemoveUpdaterOptions = {
  parentId: string
  itemId: string
  parentFieldName: string
  store: Store
}

type ListRecordAddUpdaterOptions = {
  parentId: string
  item: Object
  type: string
  parentFieldName: string
  store: Store
}

type OptimisticConnectionUpdaterOptions = {
  parentId: string
  store: Store
  connectionName: string
  item: Object
  // @ts-ignore
  customNode: ?ConcreteNode
  itemType: string
}

type ConnectionDeleteEdgeUpdaterOptions = {
  parentId: string
  connectionName: string
  nodeId: string
  store: Store
}

type CopyObjScalarsToProxyOptions = {
  object: Object
  proxy: RecordProxy
}

export function listRecordRemoveUpdater({
  parentId,
  itemId,
  parentFieldName,
  store,
}: ListRecordRemoveUpdaterOptions) {
  // @ts-ignore
  const parentProxy = store.get(parentId)
  const items = parentProxy.getLinkedRecords(parentFieldName)

  parentProxy.setLinkedRecords(
    // @ts-ignore
    items.filter((record) => record._dataID !== itemId),
    parentFieldName
  )
}

export function listRecordAddUpdater({
  parentId,
  item,
  type,
  parentFieldName,
  store,
}: ListRecordAddUpdaterOptions) {
  // @ts-ignore
  const node = store.create(item.id, type)

  Object.keys(item).forEach((key) => {
    // @ts-ignore
    node.setValue(item[key], key)
  })

  // @ts-ignore
  const parentProxy = store.get(parentId)
  const items = parentProxy.getLinkedRecords(parentFieldName)

  parentProxy.setLinkedRecords([...items, node], parentFieldName)
}

export function connectionUpdater(
  store: Store,
  parentId: string,
  connectionName: string,
  edge: RecordProxy,
  // @ts-ignore
  before?: boolean = false
) {
  if (edge) {
    // @ts-ignore
    const parentProxy = store.get(parentId)
    const conn = ConnectionHandler.getConnection(parentProxy, connectionName)
    if (!conn) {
      return
    }

    if (before) {
      ConnectionHandler.insertEdgeBefore(conn, edge)
    } else {
      ConnectionHandler.insertEdgeAfter(conn, edge)
    }
  }
}

export function optimisticConnectionUpdater({
  parentId,
  store,
  connectionName,
  item,
  customNode,
  itemType,
}: OptimisticConnectionUpdaterOptions) {
  // @ts-ignore
  const node = customNode || store.create(item.id, itemType)

  !customNode &&
    Object.keys(item).forEach((key) => {
      // @ts-ignore
      node.setValue(item[key], key)
    })

  // @ts-ignore
  const edge = store.create('client:newEdge:' + node._dataID.match(/[^:]+$/)[0], `${itemType}Edge`)
  edge.setLinkedRecord(node, 'node')

  connectionUpdater(store, parentId, connectionName, edge)
}

export function connectionDeleteEdgeUpdater({
  parentId,
  connectionName,
  nodeId,
  store,
}: ConnectionDeleteEdgeUpdaterOptions) {
  // @ts-ignore
  const parentProxy = store.get(parentId)
  const conn = ConnectionHandler.getConnection(parentProxy, connectionName)

  if (!conn) {
    // eslint-disable-next-line
    console.warn(`Connection ${connectionName} not found on ${parentId}`)
    return
  }

  ConnectionHandler.deleteNode(conn, nodeId)
}

export function copyObjScalarsToProxy({ object, proxy }: CopyObjScalarsToProxyOptions) {
  Object.keys(object).forEach((key) => {
    // @ts-ignore
    if (isObject(object[key]) || isArray(object[key])) return
    // @ts-ignore
    proxy.setValue(object[key], key)
  })
}
