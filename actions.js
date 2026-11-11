/*
 * Tabaka Open-With Action Model
 */

export const APPLICATIONS = Object.freeze({
  SOMA: "Soma",
  ASILI: "Asili",
  WORD: "Word",
  EXCEL: "Excel",
  R: "R",
  PYTHON: "Python"
});

export function getOpenWithActions(pkg) {

  const actions = new Map();

  const addAction = app => {
    actions.set(app, true);
  };

  Object.values(pkg.content || {})
    .forEach(block => {

      switch (block.type) {

        case "reference":

          addAction(APPLICATIONS.SOMA);
          addAction(APPLICATIONS.WORD);
          addAction(APPLICATIONS.EXCEL);
          addAction(APPLICATIONS.R);

          break;

        case "table":

          addAction(APPLICATIONS.EXCEL);
          addAction(APPLICATIONS.R);
          addAction(APPLICATIONS.SOMA);

          break;

        case "equation":

          addAction(APPLICATIONS.WORD);
          addAction(APPLICATIONS.R);

          break;

        case "soil-profile":

          addAction(APPLICATIONS.ASILI);
          addAction(APPLICATIONS.EXCEL);
          addAction(APPLICATIONS.R);

          break;

        case "soil-classification":

          addAction(APPLICATIONS.ASILI);
          addAction(APPLICATIONS.EXCEL);
          addAction(APPLICATIONS.R);

          break;

        case "statistical-results":

          addAction(APPLICATIONS.R);
          addAction(APPLICATIONS.EXCEL);
          addAction(APPLICATIONS.PYTHON);

          break;

        case "document-analysis":

          addAction(APPLICATIONS.SOMA);
          addAction(APPLICATIONS.WORD);

          break;

      }

    });

  return [...actions.keys()];
}