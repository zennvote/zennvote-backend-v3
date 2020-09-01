export class VoteDuplicatedError extends Error {
  email: string;

  constructor(email: string) {
    super(`Email is already existing (email: ${email})`);
    this.email = email;
  }
}
