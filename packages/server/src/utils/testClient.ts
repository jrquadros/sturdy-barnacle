import * as rp from 'request-promise'

export class TestClient {
  url: string
  options: {
    jar: any
    withCredentials: boolean
    json: boolean
  }
  constructor(url: string) {
    this.url = url
    this.options = {
      withCredentials: true,
      jar: rp.jar(),
      json: true,
    }
  }

  async register(email: string, password: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            register(email: "${email}", name: "${password}") {
              path
              message
            }
          }
        `,
      },
    })
  }

  async me() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          {
            me {
              id
              email
            }
          }
        `,
      },
    })
  }
  async addTodo(title: string, author: string, description?: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
        {
          mutation {
            addTodo(title: "${title}", description: "${description}", author: "${author}")
          } 
        }
       `,
      },
    })
  }
}
