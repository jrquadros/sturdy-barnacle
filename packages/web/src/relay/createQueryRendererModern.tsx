import * as React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { QueryRenderer } from 'react-relay'

// @ts-ignore
import { GraphQLTaggedNode, Variables } from 'react-relay'

import Environment from './Environment'

type Config = {
  query: GraphQLTaggedNode
  queriesParams?: (props: Object) => object
  variables?: Variables
  hideSplash?: boolean
}

// @ts-ignore
export default function createQueryRenderer(FragmentComponent, Component, config: Config) {
  const { query, queriesParams } = config

  class QueryRendererWrapper extends React.Component<{}> {
    render() {
      const variables = queriesParams ? queriesParams(this.props) : config.variables

      return (
        <QueryRenderer
          // @ts-ignore
          environment={Environment}
          query={query}
          variables={variables}
          render={({ error, props }) => {
            if (error) {
              return <span>{error.toString()}</span>
            }

            if (props) {
              return <FragmentComponent {...this.props} query={props} />
            }

            return <span>loading</span>
          }}
        />
      )
    }
  }

  return hoistStatics(QueryRendererWrapper, Component)
}
