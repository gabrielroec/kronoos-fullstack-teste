export const validateInstallment = (
  vlTotal: number,
  qtPrestacoes: number,
  vlPresta: number
): boolean => {
  if (qtPrestacoes === 0) return false;

  const calculatedPresta = vlTotal / qtPrestacoes;

  const marginOfError = 0.01;

  return Math.abs(calculatedPresta - vlPresta) <= marginOfError;
};
