/*
 * Tabaka Package Inspection
 */

import { getContentRegistry }
  from "./registry.js";

export function inspectTabakaPackage(pkg) {

  const registry =
    getContentRegistry();

  const contentTypes =
    new Set();

  const supportedApplications =
    new Set();

  Object.values(pkg.content || {})
    .forEach(block => {

      if (!block?.type) {
        return;
      }

      contentTypes.add(
        block.type
      );

      const definition =
        registry[block.type];

      if (
        definition?.supportedApplications
      ) {

        definition
          .supportedApplications
          .forEach(app => {
            supportedApplications.add(app);
          });

      }

    });

  return {

    packageId:
      pkg.packageId,

    schemaVersion:
      pkg.schemaVersion,

    contentTypes:
      [...contentTypes],

    supportedApplications:
      [...supportedApplications]

  };
}