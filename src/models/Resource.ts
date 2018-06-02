
export interface Resource {

  schema(): void

  crudUrls(method: string, offset?: number, limit?: number): string
}