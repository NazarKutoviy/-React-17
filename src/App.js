import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

const INITIAL_CONTACTS = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("contacts");
    if (saved) {
      setContacts(JSON.parse(saved));
    } else {
      setContacts(INITIAL_CONTACTS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const normalizedName = name.toLowerCase();

    if (
      contacts.some((contact) => contact.name.toLowerCase() === normalizedName)
    ) {
      alert(`${name} вже є в телефонній книзі!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts((prev) => [...prev, newContact]);
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Phonebook</h1>

      <ContactForm onAdd={addContact} />

      <h2>Contacts</h2>

      <Filter value={filter} onChange={setFilter} />

      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
}
