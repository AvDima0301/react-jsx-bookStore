import React from "react";
import Button  from '@mui/material/Button';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { getSingleBook, editBook } from '../../services/bookService';
//import { withRouter } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAuthors } from '../../services/authorService';


class EditBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: parseInt(this.props.match.params.id),
            title: '',
            description: '',
            image: '',
            year: '',
            authorName: '',
            authors: []
        }
    }

    componentDidMount() {
        getSingleBook(this.state.id).then(book => {
            if(book) {
                this.setState({
                    title: book.title,
                    description: book.description,
                    image: book.image,
                    year: book.year,
                });
            }
        });

        getAuthors().then(a => {
            this.setState({
                authors: a
            })
            console.log(this.state.authors);
        })
    }

    editBook = ( ) => {
        const book = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            image: this.state.image,
            year: this.state.year,
            authorName: this.state.authorName
        }

        editBook(book).then(res => {
            if(res.status === 200) {
                console.log("Succsesfuly edit");
                this.props.history.push('/');
            }
        })
    }

    render () {
        return (
            <div className="book-input">
            <h1>Edit Book</h1>
                <TextField  label="Title" variant="standard" value={this.state.title} onChange={(event) => {this.setState({title: event.target.value})}} />

                <TextField label="Description" variant="standard" value={this.state.description} onChange={(event) => {this.setState({description: event.target.value})}} />

                <TextField label="Image" variant="standard" value={this.state.image} onChange={(event) => {this.setState({image: event.target.value})}} />

                <TextField label="Year" variant="standard" value={this.state.year} onChange={(event) => {this.setState({year: event.target.value})}} />

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Author</InputLabel>
                <Select labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={this.state.author}
                        onChange={(event) => {this.setState({authorName: event.target.value})}}
                        label="Author">
                    {this.state.authors.map( a => { return (
                        <MenuItem key={a.fullName}
                            value={a.fullName}>
                        {a.fullName}
                      </MenuItem>
                    )})}
                </Select>
                </FormControl>


                <Button variant="contained" color="success" style={{margin: '15px'}} onClick={this.editBook}>
                    Edit
                </Button>

                <Link to="/"><Button color="secondary">Back to book's list</Button></Link>
            </div>
        );
    }
}

export default EditBook;