import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const Home = () => {

    const [blogs, setBlogs] = useState();

    useEffect(() => {
        fetch('http://127.0.0.1:3000/items')
            .then( res => {
                return res.json();
            })
            .then( data => {
                setBlogs(data.items);
            });
    },[]);

    return ( 
        <div className="home">
            
            { blogs && <BlogList blogs={blogs} title='All Items!' />}
            
        </div>
     );
}
 
export default Home;