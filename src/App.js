import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const addContact = event => {
        event.preventDefault();
        console.log("button clicked", event.target);
        var found = false;
        for (var i = 0; i < persons.length; i++) {
            if (persons[i].name === newName) {
                found = true;
                break;
            }
        }

        if (found) {
            setNewName('');
            setNewNumber('');
            window.alert(`${ newName } is already added to phonebook`);
            console.log('else', persons);
        } else {
            setPersons(persons.concat({ name: newName, number: newNumber }));
            console.log('line23', persons);
            setNewName('');
        }

    }

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
            <div>
                filter shown with: <input value={newFilter} onChange={handleFilter} />
            </div>
            <h2>add new</h2>

            <form onSubmit={addContact}>
                <div>
                    name: <input value={newName} onChange={handleNameChanged} />
                </div>
                <div>number: <input value={newNumber} onChange={handleNumberChanged} />
                </div>

                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {filteredList().map(item =>
                    <li key={filteredList().indexOf(item)}>{item.name} {item.number}</li>
                )}
            </ul>
        </div>
    )
}

export default App