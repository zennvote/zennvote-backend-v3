export class ChoiceNotFoundError extends Error {
  query: any;

  constructor(query: any) {
    if (!query) {
      super('Choice not found');
      return;
    }

    super(`Choice not found (query: ${JSON.stringify(query)})`);
    this.query = query;
  }
}
