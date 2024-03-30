import { v4 as uuidv4 } from 'uuid';

export interface Contact {
  id: string;
  nome: string;
  telefonePrincipal: string;
  telefoneCelular: string;
  telefoneTrabalho: string;
}

// Função utilitária para criar um novo contato com um ID único
export const createContact = (
  nome: string,
  telefonePrincipal: string,
  telefoneCelular: string,
  telefoneTrabalho: string,
): Contact => {
  return {
    id: uuidv4(),
    nome,
    telefonePrincipal,
    telefoneCelular,
    telefoneTrabalho,
  };
};
