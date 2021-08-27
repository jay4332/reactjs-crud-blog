import { Link, useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {

    const { id } = useParams();
    const {data: blog , isPending, error} = useFetch('http://127.0.0.1:3000/items/'+id);
    const history = useHistory();

    const handleClickDelete = () => {
        fetch('http://127.0.0.1:3000/items/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    return ( 
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{error}</div> }
            { blog && (
                <article>
                    <h2>{blog.name}</h2>
                    <p>Added By { blog.user ? blog.user.firstName : 'Unknown'} { blog.user && blog.user.lastName }</p>
                    {/* <p>Added By { blog.user ? ({ blog.user.firstName } { blog.user.lastName }): 'Unknown'}</p> */}
                    <div>{blog.description}</div> 
                                       
                    <Link to={`/update/${blog.id}`}>
                        <button>Edit</button>
                    </Link>
                    <button onClick={handleClickDelete}>Delete</button>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;