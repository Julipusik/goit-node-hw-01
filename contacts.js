import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";


const contactsPath = path.resolve("db", "contacts.json");


export async function listContacts() {
  const result = JSON.parse(await fs.readFile(contactsPath));
  return result;
}

export async function getContactById(contactId) {
  const contactList = await listContacts();
  const index = contactList.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  return contactList[index];
}

export async function removeContact(contactId) {
  const contactList = await listContacts();
  const index = contactList.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  const [deleteContact] = contactList.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return deleteContact;
}

export async function addContact(name, email, phone) {
  const contactList = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contactList.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return newContact;
}