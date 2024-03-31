# my-contact-list

## 1. configurando ambiente

`yarn create vite my-contact-list`
SELECT react
SELECT typescript

`cd my-contact-list`

`yarn`

`yarn dev`
OPEN http://localhost:5173

## 2. limpando ambiente

excluir na pasta public:
`public/vite.svg`

excluir na pasta src:
`src/assets`
`src/App.css`
`src/index.css`

alterar na pasta src:
`src/App.tsx`

```tsx
function App() {
  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}

export default App;
```

`yarn dev`
OPEN http://localhost:5173

## 3. criando componente

criar na pasta src/components:
`src/components/ContactList.tsx`

```tsx
import React from 'react';

const ContactList: React.FC = () => {
  return (
    <div>
      <h2>Contact List</h2>
      {/* Aqui iremos exibir a lista de contatos */}
    </div>
  );
};

export default ContactList;
```

alterar na pasta src:
`src/App.tsx`

```tsx
import React from 'react';
import ContactList from './components/ContactList';

function App() {
  return (
    <>
      <h1>My Contact List</h1>
      <ContactList />
    </>
  );
}

export default App;
```

`yarn dev`
OPEN http://localhost:5173

## 4. adicionando e exibindo contato

criar na pasta src:
`src/types.ts`

```ts
export interface Contact {
  id: number;
  nome: string;
  telefonePrincipal: string;
  telefoneCelular: string;
  telefoneTrabalho: string;
}
```

alterar na pasta src/components:
`src/components/ContactList.tsx`

```tsx
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
```

## 5. implementando uuid

`yarn add uuid @types/uuid`

alterar na pasta src:
`src/types.ts`

```ts
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
```

alterar na pasta src/components:
`src/components/ContactList.tsx`

```tsx
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
```

## 6. editando e excluindo contato

alterar na pasta src/components:
`src/components/ContactList.tsx`

```tsx
import React, { useState } from 'react';
import { Contact, createContact } from '../types';

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Função para adicionar um novo contato
  const addContact = () => {
    const newContact = createContact('Novo Contato', '', '', '');
    setContacts([...contacts, newContact]);
  };

  // Função para editar um contato
  const editContact = (id: string) => {
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

        // Atualizar a lista de contatos com o contato editado
        setContacts(
          contacts.map((contact) =>
            contact.id === id ? updatedContact : contact,
          ),
        );
      }
    }
  };

  // Função para excluir um contato
  const deleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
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
```

## 7. utilizando json-server

`yarn add json-server --dev`

criar na raiz:
`db.json`

```json
{
  "contacts": []
}
```

alterar na raiz:
`package.json`

```json
"scripts": {
  "start": "vite",
  "dev": "vite",
  "build": "vite build",
  "serve": "json-server --watch db.json --port 5000"
}
```

`yarn serve`

alterar na pasta src/components:
`src/components/ContactList.tsx`

```tsx
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
```

## 8.
