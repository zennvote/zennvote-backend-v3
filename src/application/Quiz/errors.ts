export class QuizNotFoundError extends Error {
  query: any;

  constructor(query: any) {
    if (!query) {
      super('Quiz not found');
      return;
    }

    super(`Quiz not found (query: ${JSON.stringify(query)})`);
    this.query = query;
  }
}
