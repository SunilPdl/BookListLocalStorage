import React, {useState, useEffect} from 'react';
import ViewTable from '../ViewTable';
import './BookList.css';

const getDataFromLS=()=>{
    const data = localStorage.getItem('books');
    if(data){
        return JSON.parse(data);
    }else{
        return [];
    }
}

const BookList = () => {

    const [title , setTitle ] = useState('');
    const [author , setAuthor ] = useState('');
    const [isbn , setIsbn ] = useState('');

    const [books , setBooks ] = useState(getDataFromLS());

    const addBookSubmit =(event) =>{
        event.preventDefault();

        let book = {
            title,
            author,
            isbn
        };

        setBooks([...books,book]);
        setTitle('');
        setAuthor('');
        setIsbn('');
    }

    const deleteBook=(isbn)=>{
        const filteredBooks = books.filter((element,index)=>{
            return element.isbn !== isbn;
        });
        setBooks(filteredBooks);
    }

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books));
    }, [books]);

    return (
        <>
           <div className="wrapper">
            <h2>BookList</h2>
            <p className="info">All BookList are here</p>

            <div className="main-container">
                <div className="form-container">
                    <form autoComplete = 'off' className="form"
                    onSubmit={addBookSubmit}>
                        <label>Title :</label><br/>
                        <input type="text" className="form-input" required
                        onChange = {(e)=>{setTitle(e.target.value)}} 
                        value = {title} /> <br/><br/>
                        <label>Author :</label><br/>
                        <input type="text" className="form-input" required 
                        onChange = {(e)=>{setAuthor(e.target.value)}} 
                        value = {author}/> <br/><br/>
                        <label>Isbn :</label><br/>
                        <input type="text" className="form-input" required 
                        onChange = {(e)=>{setIsbn(e.target.value)}} 
                        value = {isbn}/> <br/><br/>
                        <button type ="submit" className="addBtn">Add</button>
                    </form>
                </div>

                <div className="view-container">
                    
                    { books.length >0 && <>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ISBN</th>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Delete</th>                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    <ViewTable 
                                    books = {books}
                                    deleteBook = {deleteBook} />
                                </tbody>                                
                            </table>
                            <button className="removeAll"
                            onClick = {() => setBooks([])} >Remove All</button>
                        </div>                        
                        
                    </>
                    }

                    {books.length < 1 && <div> No books are added yet </div> }
                </div>
            </div>
            </div> 
        </>
    )
}

export default BookList;
