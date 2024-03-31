import React, { useState, useEffect } from 'react';
import { Contact, createContact } from '../types';

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Erro ao buscar contatos:', error));
  }, []);

  // Função para adicionar um novo contato
  const addContact = async () => {
    try {
      const newContact = createContact('Novo Contato', '', '', '');
      const response = await fetch('http://localhost:5000/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });
      if (response.ok) {
        // Atualizar a lista de contatos após a adição bem-sucedida
        setContacts([...contacts, newContact]);
      } else {
        console.error('Falha ao adicionar contato:', response.status);
      }
    } catch (error) {
      console.error('Erro ao adicionar contato:', error);
    }
  };

  // Função para editar um contato
  const editContact = async (id: string) => {
    // Encontrar o contato pelo ID
    const contactToEdit = contacts.find((contact) => contact.id === id);

    // Verificar se o contato foi encontrado
    if (contactToEdit) {
      // Pedir ao usuário para inserir novas informações
      const newName = prompt('Digite o novo nome:', contactToEdit.nome);
      const newMainPhone = prompt(
        'Digite o novo telefone principal:',
        contactToEdit.telefonePrincipal,
      );
      const newCellPhone = prompt(
        'Digite o novo telefone celular:',
        contactToEdit.telefoneCelular,
      );
      const newWorkPhone = prompt(
        'Digite o novo telefone de trabalho:',
        contactToEdit.telefoneTrabalho,
      );

      // Verificar se o usuário inseriu informações
      if (
        newName !== null &&
        newMainPhone !== null &&
        newCellPhone !== null &&
        newWorkPhone !== null
      ) {
        // Criar um novo objeto de contato com as informações atualizadas
        const updatedContact: Contact = {
          ...contactToEdit,
          nome: newName,
          telefonePrincipal: newMainPhone,
          telefoneCelular: newCellPhone,
          telefoneTrabalho: newWorkPhone,
        };

        try {
          const response = await fetch(`http://localhost:5000/contacts/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedContact),
          });
          if (response.ok) {
            // Atualizar a lista de contatos após a edição bem-sucedida
            setContacts(
              contacts.map((contact) =>
                contact.id === id ? updatedContact : contact,
              ),
            );
          } else {
            console.error('Falha ao editar contato:', response.status);
          }
        } catch (error) {
          console.error('Erro ao editar contato:', error);
        }
      }
    }
  };

  // Função para excluir um contato
  const deleteContact = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/contacts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Atualizar a lista de contatos após a exclusão bem-sucedida
        setContacts(contacts.filter((contact) => contact.id !== id));
      } else {
        console.error('Falha ao excluir contato:', response.status);
      }
    } catch (error) {
      console.error('Erro ao excluir contato:', error);
    }
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
            <button onClick={() => editContact(contact.id)}>Editar</button>
            <button onClick={() => deleteContact(contact.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <button onClick={addContact}>Adicionar Contato</button>
    </div>
  );
};

export default ContactList;
