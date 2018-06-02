export default class Resource {

  static schema() {
    throw new NotImplementError("schema")
  }

  static crudUrls(method: string, offset?: number, limit?: number): string {
    throw new NotImplementError("crudUrls")
  }
}

export type ResourceKlass = {
  new (...args: any[]): Resource
  schema(): void
  crudUrls(method: string, offset?: number, limit?: number): string
}

class NotImplementError extends Error {
}