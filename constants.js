/*
 * Tabaka Core Constants
 */

export const TBK_SCHEMA = "tabaka";
export const TBK_MAJOR_VERSION = "1";
export const TBK_SCHEMA_VERSION = "1.0.0";

export const EXTRACTION_STATUS = Object.freeze({
  UNPROCESSED: "unprocessed",
  COMPLETED: "completed",
  EMPTY: "empty",
  FAILED: "failed"
});

export const RESERVED_CONTENT_TYPES = Object.freeze([
  "reference",
  "table",
  "equation",
  "soil-profile",
  "soil-classification",
  "statistical-results",
  "document-analysis"
]);