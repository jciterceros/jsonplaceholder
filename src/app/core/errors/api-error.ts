export class ApiError extends Error {
  public constructor(
    public readonly userMessage: string,
    public readonly status: number,
    public readonly url: string | null,
    public override readonly cause?: unknown,
  ) {
    super(userMessage);
    this.name = 'ApiError';
  }
}
