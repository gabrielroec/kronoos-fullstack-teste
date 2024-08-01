import validator, { cpf, cnpj } from "cpf-cnpj-validator";
const Joi = require("@hapi/joi").extend(validator);

const cnpjSchema = Joi.document().cnpj();
const cpfSchema = Joi.document().cpf();

export const isValidCpfOrCnpj = (
  value: string
): { formattedValue: string; isValid: boolean } => {
  const cleanValue = value.replace(/[^\d]+/g, "");

  if (cleanValue.length === 11) {
    const { error } = cpfSchema.validate(cleanValue);
    const formattedValue = cpf.format(cleanValue);
    if (error) {
      return { formattedValue: `${formattedValue} Inválido`, isValid: false };
    } else {
      return { formattedValue: `${formattedValue} Válido`, isValid: true };
    }
  } else if (cleanValue.length === 14) {
    const { error } = cnpjSchema.validate(cleanValue);
    const formattedValue = cnpj.format(cleanValue);
    if (error) {
      return { formattedValue: `${formattedValue} Inválido`, isValid: false };
    } else {
      return { formattedValue: `${formattedValue} Válido`, isValid: true };
    }
  } else {
    return { formattedValue: `${value} Inválido`, isValid: false };
  }
};
