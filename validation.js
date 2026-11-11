import {
  TBK_SCHEMA,
  TBK_MAJOR_VERSION,
  EXTRACTION_STATUS
}
from "./constants.js";

import {
  isRegisteredContentType
}
from "./registry.js";

export function validateContentBlock(
  key,
  block,
  diagnostics = []
) {

  if (!block || typeof block !== "object") {
    throw new Error(
      `Content block '${key}' must be an object.`
    );
  }

  if (!block.type) {
    throw new Error(
      `Content block '${key}' missing type.`
    );
  }

  if (
    !Object.values(EXTRACTION_STATUS)
      .includes(block.status)
  ) {
    throw new Error(
      `Content block '${key}' has invalid status.`
    );
  }

  if (!Array.isArray(block.data)) {
    throw new Error(
      `Content block '${key}' data must be an array.`
    );
  }

  if (block.itemCount !== block.data.length) {
    throw new Error(
      `Content block '${key}' itemCount mismatch.`
    );
  }

  if (
    block.status === EXTRACTION_STATUS.EMPTY &&
    block.data.length > 0
  ) {
    throw new Error(
      `Content block '${key}' marked EMPTY but has data.`
    );
  }

  if (
    block.status === EXTRACTION_STATUS.FAILED &&
    !block.error
  ) {
    throw new Error(
      `Content block '${key}' marked FAILED but no error supplied.`
    );
  }

  /*
   * TAB-CORE-003
   *
   * Unknown content is preserved,
   * not rejected.
   */
  if (!isRegisteredContentType(block.type)) {

    diagnostics.push({
      level: "warning",
      code: "UNKNOWN_CONTENT_TYPE",
      contentType: block.type
    });
  }

  return true;
}

export function validateTabakaPackage(pkg) {

  const diagnostics = [];

  if (!pkg || typeof pkg !== "object") {
    throw new Error(
      "Package must be an object."
    );
  }

  if (pkg.schema !== TBK_SCHEMA) {
    throw new Error(
      `Expected schema '${TBK_SCHEMA}'.`
    );
  }

  const [major] =
    pkg.schemaVersion.split(".");

  if (major !== TBK_MAJOR_VERSION) {

    throw new Error(
      `Incompatible schema version '${pkg.schemaVersion}'.`
    );
  }

  if (!pkg.packageId) {
    throw new Error(
      "Missing packageId."
    );
  }

  if (!pkg.content) {
    throw new Error(
      "Missing content."
    );
  }

  Object.entries(pkg.content)
    .forEach(([key, block]) => {

      validateContentBlock(
        key,
        block,
        diagnostics
      );

    });

  return diagnostics;
}