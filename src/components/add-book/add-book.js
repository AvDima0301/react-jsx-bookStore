import React, { useEffect } from 'react'
import Button  from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { addBook } from '../../services/bookService'
import { useHistory } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAuthors } from '../../services/authorService';

import './add-book.css'

function AddBook(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [year, setYear] = useState('');
    const history = useHistory();
    const [author, setAuthor] = React.useState('');

    const [authors, setAuthors] = React.useState([]);

    useEffect(() => {
        if(!authors.length) {
            getAuthors().then(authors => {
                setAuthors(authors);
                console.log(authors);
            })
        }
    });


    const handleChange = (event) => {
        setAuthor(event.target.value);
        console.log(author);
    };


    const createBook = () => {
        const newBook = {
            title: title,
            description: description,
            image: image,
            year: parseInt(year),
            authorName: author
        }

        console.log(newBook)    
        addBook(newBook).then(res => {
            if(res.status === 200) {
                console.log("Successfully added");
                history.push('/get-book');
            } else {
                console.log(`addBook: Error; Code = ${res.status}`)
            }
        });
    }
     
    return (
        <div className="book-input">
            <h1>Add new book</h1>
            <TextField  label="Title" variant="standard" onChange={(event) => {setTitle(event.target.value)}} />

            <TextField label="Description" variant="standard" onChange={(event) => {setDescription(event.target.value)}} />

            <TextField label="Image" variant="standard" onChange={(event) => {setImage(event.target.value)}} />

            <TextField label="Year" variant="standard" onChange={(event) => {setYear(event.target.value)}} />

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Author</InputLabel>
                <Select labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={author}
                        onChange={handleChange}
                        label="Author">
                    {authors.map( a => { return (
                        <MenuItem key={a.fullName}
                            value={a.fullName}>
                        {a.fullName}
                      </MenuItem>
                    )})}
                </Select>
            </FormControl>

            <Button variant="contained" color="success" style={{margin: '15px'}} onClick={createBook}>
                Add
            </Button>

            <Link to="/get-book"><Button color="secondary">Back to book's list</Button></Link>
        </div>
    );
}

export default AddBook;