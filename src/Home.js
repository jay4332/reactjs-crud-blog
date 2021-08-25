import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const Home = () => {

    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:3000/items')
            .then( res => {
                if(!res.ok){
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then( data => {
                setBlogs(data.items);
                setIsPending(false);
            })
            .catch( err => {
                setError(err.message);
                setIsPending(false);
            });
    },[]);

    return ( 
        <div className="home">
            { error && <div>{error}</div> }
            { isPending && <div>Loading...</div> }
            { blogs && <BlogList blogs={blogs} title='All Items!' />}

        </div>
     );
}
 
export default Home;