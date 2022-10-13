import React, { Component } from 'react';
import shortid from 'shortid';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  }

  addContact = contact => {
    const { contacts } = this.state;
    if (contacts.find(({ name }) => name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [
          { ...contact, id: shortid.generate() },
          ...prevState.contacts,
        ],
      }));
    }
  };

  deleteContact = contactToDelete => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== contactToDelete
      ),
    }));
  };

  filterContacts = event => {
    this.setState({ filter: event.currentTarget.value.toLowerCase() });
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter)
    );
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '700px',
        }}
      >
        <h1 style={{ color: '#069b94' }}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <Filter onChange={this.filterContacts} />
        <h2 style={{ color: '#069b94' }}>Contacts</h2>
        <div style={{ color: 'blue', marginTop: '10px' }}>
          All contacts: {contacts.length}
        </div>
        <ContactList contacts={visibleContacts} onDelete={this.deleteContact} />
      </div>
    );
  }
}
