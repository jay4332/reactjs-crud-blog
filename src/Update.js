import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Update = () => {

    const [name, setName] = useState('');
    const [qty, setQuantity] = useState(0);
    const [description, setDescription] =useState('');
    const [userId, setAuthor] = useState(1);
    const [isWorking, setIsWorking] = useState(false);
    const history = useHistory();

    const { id } = useParams();
    const { data, isPending, error } = useFetch('http://127.0.0.1:3000/items/'+id);

    useEffect(() => {
        if(data){
            setName(data.name);
            setQuantity(data.qty);
            setDescription(data.description);
            setAuthor(data.authorId);
        }            
    },[data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const item = { name, qty, description};
        // const item = { name, qty, description, userId};

        setIsWorking(true);
    
        fetch('http://127.0.0.1:3000/items/'+id, {
            method: 'PUT',
            headers: {"content-type": "application/json"},
            body: JSON.stringify(item)
        }).then(() => {
            setIsWorking(false);
            history.push('/blogs/'+id);
        })

    };

    return ( 
        <div className="create">
            { error && <div>{error}</div> }
            { isPending && <div>Loading...</div> }
            { data && (
                <article>
                    <h2>Update an Existing Item</h2>
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
                        
                        { !isWorking && <button>Update Item</button> }
                        { isWorking && <button disabled>Updating Item...</button> }
                        
                    </form>
                    </article>
            )}
        </div>
     );
}
 
export default Update;