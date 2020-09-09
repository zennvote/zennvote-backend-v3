export class SongNotFoundError extends Error {
  query: any;

  constructor(query: any) {
    if (!query) {
      super('Song not found');
      return;
    }

    super(`Quiz not found (query: ${JSON.stringify(query)})`);
    this.query = query;
  }
}
