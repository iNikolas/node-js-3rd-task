const yup = require("yup");
const CATEGORIES = require("../repositories/constants");

const noteSchema = yup
  .object({
    name: yup.mixed().required(),
    created: yup
      .string()
      .matches(/^[A-Za-z]{3}\s\d{2},\s\d{4}$/)
      .required(),
    category: yup.mixed().oneOf(CATEGORIES),
    content: yup.mixed().required(),
    dates: yup.mixed().required(),
  })
  .noUnknown(true)
  .strict();

module.exports = noteSchema;
