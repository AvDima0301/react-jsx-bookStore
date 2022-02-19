import React from 'react'
import Button  from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { addAuthor } from '../../services/authorService'
import { useHistory } from 'react-router-dom';


import './add-author.css';

function AddAuthor(props) {
    const [fullName, setFullName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [image, setImage] = useState('');
    const history = useHistory();

    const createAuthor = () => {
        const newAuthor = {
            fullName: fullName,
            birthday: birthday,
            image: image
        }

        addAuthor(newAuthor).then(res => {
            if(res.status === 200) {
                console.log("Successfully added");
                history.push('/get-author');
            } else {
                console.log(`addAuthor: Error; Code = ${res.status}`)
            }
        });
    }

    return (
        <div className="author-input">
            <h1>Add new Author</h1>
            <TextField  label="Title" variant="standard" onChange={(event) => {setFullName(event.target.value)}} />

            <TextField label="Birthday(YYYY.MM.DD)" variant="standard" onChange={(event) => {setBirthday(event.target.value)}} />

            <TextField label="Image" variant="standard" onChange={(event) => {setImage(event.target.value)}} />
            
            <Button variant="contained" color="success" style={{margin: '15px'}} onClick={createAuthor}>
                Add
            </Button>

            <Link to="/get-author"><Button color="secondary">Back to author's list</Button></Link>
        </div>
    );
}

export default AddAuthor;

