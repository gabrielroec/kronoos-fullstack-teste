const validateCpf = (cpf: string): boolean => {
  if (typeof cpf !== "string") return false;
  cpf = cpf.replace(/[\s.-]*/g, "");

  if (
    !cpf ||
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  ) {
    return false;
  }

  let sum = 0;
  let remainder: number;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
};

const formatCpf = (cpf: string): string => {
  cpf = cpf.replace(/\D/g, "");
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const isValidCpfOrCnpj = (
  value: string
): { isValid: boolean; formattedValue: string } => {
  if (value.length === 11 && validateCpf(value)) {
    const formattedCpf = formatCpf(value);
    return { isValid: true, formattedValue: `Válido: ${formattedCpf}` };
  }
  return { isValid: false, formattedValue: `Inválido: ${value}` };
};
