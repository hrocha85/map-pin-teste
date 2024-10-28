import { cpf as CPF } from "cpf-cnpj-validator";

export function isCpfValid(cpf: string) {
  return CPF.isValid(cpf);
}
