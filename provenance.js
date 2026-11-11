/*
 * Provenance Helpers
 */

export function createProvenance(options = {}) {
  return {
    createdAt: new Date().toISOString(),
    ...options
  };
}

export function createRecordProvenance({
  page = null,
  source = null,
  extractionMethod = null
} = {}) {

  return {
    page,
    source,
    extractionMethod
  };
}