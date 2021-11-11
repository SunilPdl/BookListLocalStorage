import React from 'react';
import {MdDelete} from 'react-icons/all';

const ViewTable = ({books,deleteBook}) => {
    return books.map(book => (
        <tr key = {book.isbn}>
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td className="deleteBtn" 
            onClick = {()=> deleteBook(book.isbn)} ><MdDelete/></td>
        </tr>
    ))
}

export default ViewTable;
