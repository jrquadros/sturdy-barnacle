import { ValidationError } from 'yup'

export const formatYupError = (error: ValidationError) => {
  type GraphqlError = {
    path: string
    message: string
  }
  const errors: GraphqlError[] = []
  error.inner.map((e) =>
    errors.push({
      path: e.path,
      message: e.message,
    })
  )
  return errors
}
