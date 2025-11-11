/**
 * Represents a structured API error response.
 */
export interface ApiError {
  /** Brief, human-readable title describing the error */
  title: string;

  /** A string indicating the error type or category */
  type: string;

  /** HTTP status code associated with the error */
  status: number;

  /**
   * Detailed validation or processing errors.
   *
   * The keys are field names or error categories,
   * and the values are arrays of error messages for each key.
   */
  errors: Record<string, string[]>;
}
