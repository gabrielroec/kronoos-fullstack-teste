const validateCpf = (cpf: string): boolean => {
  if (typeof cpf !== "string") {
    return false;
  }

  const cleanCpf = cpf.replace(/[\s.-]*/g, "");

  if (
    !cleanCpf ||
    cleanCpf.length !== 11 ||
    cleanCpf === "00000000000" ||
    cleanCpf === "11111111111" ||
    cleanCpf === "22222222222" ||
    cleanCpf === "33333333333" ||
    cleanCpf === "44444444444" ||
    cleanCpf === "55555555555" ||
    cleanCpf === "66666666666" ||
    cleanCpf === "77777777777" ||
    cleanCpf === "88888888888" ||
    cleanCpf === "99999999999"
  ) {
    return false;
  }

  let sum = 0;
  let remainder: number;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanCpf.substring(9, 10))) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanCpf.substring(10, 11))) {
    return false;
  }

  return true;
};

function validateCnpj(cnpj: string): boolean {
  const cleanCnpj = cnpj.replace(/[^\d]+/g, "");

  if (cleanCnpj === "" || cleanCnpj.length !== 14) return false;

  if (
    cleanCnpj === "00000000000000" ||
    cleanCnpj === "11111111111111" ||
    cleanCnpj === "22222222222222" ||
    cleanCnpj === "33333333333333" ||
    cleanCnpj === "44444444444444" ||
    cleanCnpj === "55555555555555" ||
    cleanCnpj === "66666666666666" ||
    cleanCnpj === "77777777777777" ||
    cleanCnpj === "88888888888888" ||
    cleanCnpj === "99999999999999"
  )
    return false;

  let size = cleanCnpj.length - 2;
  let numbers = cleanCnpj.substring(0, size);
  let checkDigits = cleanCnpj.substring(size);
  let sum = 0;
  let position = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * position--;
    if (position < 2) position = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(checkDigits.charAt(0))) return false;

  size += 1;
  numbers = cleanCnpj.substring(0, size);
  sum = 0;
  position = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * position--;
    if (position < 2) position = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(checkDigits.charAt(1))) return false;

  return true;
}

const formatCpf = (cpf: string): string => {
  cpf = cpf.replace(/\D/g, "");
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const formatCnpj = (cnpj: string): string => {
  cnpj = cnpj.replace(/\D/g, "");

  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
};

export const isValidCpfOrCnpj = (
  value: string
): { isValid: boolean; formattedValue: string } => {
  if (value.length === 11 && validateCpf(value)) {
    const formattedCpf = formatCpf(value);
    return { isValid: true, formattedValue: `Válido: ${formattedCpf}` };
  } else if (value.length === 14 && validateCnpj(value)) {
    const formattedCnpj = formatCnpj(value);
    return { isValid: true, formattedValue: `Válido: ${formattedCnpj}` };
  }
  return { isValid: false, formattedValue: `Inválido: ${value}` };
};
