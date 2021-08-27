import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [name, setName] = useState('');
    const [qty, setQuantity] = useState(0);
    const [description, setDescription] =useState('');
    const [userId, setAuthor] = useState(1);
    const [isWorking, setIsWorking] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const item = { name, qty, description, userId};

        setIsWorking(true);
    
        fetch('http://127.0.0.1:3000/items', {
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify(item)
        }).then(() => {
            setIsWorking(false);
            history.push('/');
        })

    };

    return ( 
        <div className="create">
            <h2>Add a New Item</h2>
            <form onSubmit={handleSubmit}>
                <label>Item name:</label>
                <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Item quantity:</label>
                <input
                    type="number" 
                    required
                    value={qty}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <label>Item description:</label>
                <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label>Item author:</label>
                <select
                    value={userId}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="1">Jay Singh</option>
                    <option value="2">Donald Trump</option>
                </select>
                { !isWorking && <button>Add Item</button> }
                { isWorking && <button disabled>Adding Item...</button> }
                
            </form>
        </div>
     );
}
 
export default Create;