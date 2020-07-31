export class ChoiceNotFoundError extends Error {
  query: any;

  constructor(query: any) {
    if (!query) {
      super('Choice not found');
      return;
    }

    this.query = query;
    super(`Choice not found (query: ${query})`);
  }
}
