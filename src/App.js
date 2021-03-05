import React, { useState } from 'react';
import axios from 'axios';
import contactService from "./services/person";


const Filter = ({ newFilter, handleFilter }) => {
    return (
        <div>
            filter shown with: <input value={newFilter} onChange={handleFilter} />
        </div>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addContact}>
            <div>
                name: <input value={props.newName} onChange={props.handleNameChanged} />
            </div>
            <div>number: <input value={props.newNumber} onChange={props.handleNumberChanged} />
            </div>

            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Persons = ({ list, removeClick }) => {
    const removePerson = (e, id) => {
        e.preventDefault();
        if (removeClick) {
            const willDelete = window.confirm(`Delete?`);
            if (willDelete) {
                removeClick(id)
            }
        }
    }
    return (
        <ul>
            {list.map(item =>
                <li key={list.indexOf(item)}>
                    {item.name} {item.number}
                    <button onClick={e => removePerson(e, item.id)}>delete</button> </li>
            )}
        </ul>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    React.useEffect(() => {
        contactService.getAll().then(response => setPersons(response));
        console.log(persons);
    }, [])

    const addContact = event => {
        event.preventDefault();
        var found = false;
        for (var i = 0; i < persons.length; i++) {
            if (persons[i].name === newName) {
                found = true;
                break;
            }
        }

        if (found) {
            const foundPerson = persons.find(n => n.name === newName);
            const willUpdate = window.confirm(
                `${ foundPerson.name } is alrady added to the phonebook, ` +
                "replace the old number with a new one?"
            );
            if (willUpdate) {
                const updatedPerson = { ...foundPerson, number: newNumber };
                contactService
                    .updatePerson(foundPerson.id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson))
                    })
                    .catch(error => {
                        console.log(error)
                    });
                setPersons(persons.filter((p) => p.id !== foundPerson.id));

                setNewName('');
                setNewNumber('');
            }
        } else {
            const contactObject = {
                name: newName,
                number: newNumber,
                id: persons.length + 1,
            }
            contactService
                .addPerson(contactObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                })
                .catch(error => {
                    console.log(error);
                })
            setNewName("");
            setNewNumber("");
        }
    }


    const remove = (id) => {
        let deleted = true;

        contactService
            .removePerson(id)
            .catch((err) => {
                console.log(err);
                deleted = false;
            })
            .finally(() => {
                if (deleted) {
                    setPersons(persons.filter((p) => p.id !== id));
                }
            });
    };

    const handleNameChanged = event => {
        console.log("event.target.value");
        setNewName(event.target.value);
    }

    const handleNumberChanged = event => {
        console.log("event.target.value");
        setNewNumber(event.target.value);
    }

    const handleFilter = event => {
        console.log("event.target.value");
        setNewFilter(event.target.value);
    }

    const filteredList = () =>
        newFilter.length > 0 ? persons.filter(person => person.name.toLocaleLowerCase().includes(newFilter)) : persons

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter newFilter={newFilter} handleFilter={handleFilter} />
            <h2>add new</h2>
            <PersonForm addContact={addContact} newName={newName} newNumber={newNumber}
                handleNameChanged={handleNameChanged} handleNumberChanged={handleNumberChanged} />
            <h2>Numbers</h2>
            <Persons list={filteredList()} removeClick={remove} />
        </div>
    )
}

export default App