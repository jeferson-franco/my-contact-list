import React, { useState } from 'react';
import { Contact } from '../types';

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Função para adicionar um novo contato
  const addContact = () => {
    // Aqui você irá implementar a lógica para adicionar um novo contato à lista
  };

  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <div>{contact.nome}</div>
            <div>{contact.telefonePrincipal}</div>
            <div>{contact.telefoneCelular}</div>
            <div>{contact.telefoneTrabalho}</div>
          </li>
        ))}
      </ul>
      <button onClick={addContact}>Adicionar Contato</button>
    </div>
  );
};

export default ContactList;
