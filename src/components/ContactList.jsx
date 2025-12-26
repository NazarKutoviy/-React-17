import ContactItem from "./ContactItem";

export default function ContactList({ contacts, onDelete }) {
  return (
    <ul>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </ul>
  );
}
