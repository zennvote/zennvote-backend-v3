export class UnexpectedQueryResultError extends Error {
  query: string | undefined;

  result: any | undefined;

  constructor(query: string | undefined, result: any | undefined, message?: string) {
    super(message);
    this.query = query;
    this.result = result;
  }
}
