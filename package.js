import {
  TBK_SCHEMA,
  TBK_SCHEMA_VERSION,
  EXTRACTION_STATUS
}
from "./constants.js";

import {
  validateTabakaPackage
}
from "./validation.js";

import {
  createIntegrityPlaceholder
}
from "./integrity.js";

function wrapContent(
  type,
  value
) {

  if (
    value === null ||
    value === undefined
  ) {

    return {
      type,
      status: EXTRACTION_STATUS.UNPROCESSED,
      itemCount: 0,
      data: [],
      error: null
    };
  }

  if (
    value.type &&
    value.status &&
    Array.isArray(value.data)
  ) {

    return value;
  }

  const data =
    Array.isArray(value)
      ? value
      : [value];

  return {
    type,
    status:
      data.length > 0
        ? EXTRACTION_STATUS.COMPLETED
        : EXTRACTION_STATUS.EMPTY,

    itemCount: data.length,
    data,
    error: null
  };
}

export async function createTabakaPackage({

  source = {},
  content = {},
  metadata = {},
  provenance = {}

} = {}) {

  const pkg = {

    schema: TBK_SCHEMA,

    schemaVersion:
      TBK_SCHEMA_VERSION,

    packageId:
      "tbk_" +
      Date.now().toString(36),

    created:
      new Date().toISOString(),

    source: {
      application:
        source.application ||
        "UnknownApplication",

      document:
        source.document ||
        "Untitled"
    },

    content: {},

    provenance: {
      extractedAt:
        new Date().toISOString(),

      ...provenance
    },

    integrity:
      createIntegrityPlaceholder(),

    diagnostics: [],

    metadata
  };

  for (
    const [name, block]
    of Object.entries(content)
  ) {

    pkg.content[name] =
      wrapContent(
        block.type,
        block.data
      );
  }

  pkg.diagnostics =
    validateTabakaPackage(pkg);

  return pkg;
}

export async function readTabakaFile(
  fileOrBlob
) {

  let text;

  if (
    typeof fileOrBlob === "string"
  ) {

    text = fileOrBlob;

  } else if (
    fileOrBlob?.text
  ) {

    text =
      await fileOrBlob.text();

  } else {

    throw new Error(
      "Expected JSON string, File, or Blob."
    );
  }

  const pkg = JSON.parse(text);

  pkg.diagnostics =
    validateTabakaPackage(pkg);

  return pkg;
}

export function serializeTabakaPackage(
  pkg
) {

  validateTabakaPackage(pkg);

  return JSON.stringify(
    pkg,
    null,
    2
  );
}