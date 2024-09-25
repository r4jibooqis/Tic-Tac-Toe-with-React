import { useState } from 'react'

export default function Player({ name, symbol, isActive, changeName }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setplayerName] = useState(name);

    const handleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            changeName(symbol, playerName);
        }
    };

    const setName = (event) => {
        let name = event.target.value;
        setplayerName(name);
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {isEditing ? <input onChange={event => setName(event)} type="text" value={playerName} required />
                    : <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}