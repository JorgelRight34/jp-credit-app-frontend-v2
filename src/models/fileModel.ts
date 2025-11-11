/**
 * Represents a file retrieved from an API, including metadata and URL.
 */
export interface ApiFile {
  /** URL to access or download the file */
  url: string;
  publicId?: string;

  /** Optional internal database ID */
  id?: number;

  /** Optional original or display name of the file */
  name?: string;

  /** Optional ISO 8601 date string representing when the file was created */
  createdAt?: string | Date;

  /** Optional ISO date string for the last modification timestamp */
  lastModified?: string | Date;

  /** Optional type or file extension */
  fileType: string;
}
