import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addName = event => {
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
            window.alert(`${ newName } is already added to phonebook`);
            console.log('else', persons);
        } else {
            setPersons(persons.concat({ name: newName }));
            console.log('line23', persons);
            setNewName('');
        }

    }

const handleNameChanged = event => {
    console.log("event.target.value");
    setNewName(event.target.value);
}
return (
    <div>
        <h2>Phonebook</h2>
        <form onSubmit={addName}>
            <div>
                name: <input value={newName} onChange={handleNameChanged} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        <h2>Numbers</h2>
        <ul>
            {persons.map(item =>
                <li key={persons.indexOf(item)}>{item.name}</li>
            )}
        </ul>
    </div>
)
}

export default App