/*
 * Tabaka Content Registry
 */

const registry = {
  reference: {
    version: "1.0.0",
    title: "Bibliographic Reference",
    core: true
  },

  table: {
    version: "1.0.0",
    title: "Structured Table",
    core: true
  },

  equation: {
    version: "1.0.0",
    title: "Mathematical Expression",
    core: true
  },

  "soil-profile": {
    version: "1.0.0",
    title: "Soil Profile",
    core: true
  },

  "soil-classification": {
    version: "1.0.0",
    title: "Soil Classification",
    core: true
  },

  "statistical-results": {
    version: "1.0.0",
    title: "Statistical Results",
    core: true
  },

  "document-analysis": {
    version: "1.0.0",
    title: "Document Analysis",
    core: true
  }
};

export function getContentRegistry() {
  return structuredClone(registry);
}

export function getContentType(identifier) {
  return registry[identifier] || null;
}

export function isRegisteredContentType(identifier) {
  return Boolean(registry[identifier]);
}

export function registerContentType(identifier, definition) {

  if (!identifier || typeof identifier !== "string") {
    throw new Error("Content type identifier is required.");
  }

  if (registry[identifier]) {
    throw new Error(
      `Content type '${identifier}' is already registered.`
    );
  }

  registry[identifier] = {
    version: "1.0.0",
    core: false,
    ...definition
  };

  return registry[identifier];
}