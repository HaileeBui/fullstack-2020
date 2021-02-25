import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' , number: '39-44-343342' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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
return (
    <div>
        <h2>Phonebook</h2>
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
            {persons.map(item =>
                <li key={persons.indexOf(item)}>{item.name} {item.number}</li>
            )}
        </ul>
    </div>
)
}

export default App