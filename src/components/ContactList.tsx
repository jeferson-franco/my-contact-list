import React, { useState } from 'react';
import { Contact, createContact } from '../types';

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Função para adicionar um novo contato
  const addContact = () => {
    const newContact = createContact('Novo Contato', '', '', '');
    setContacts([...contacts, newContact]);
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
