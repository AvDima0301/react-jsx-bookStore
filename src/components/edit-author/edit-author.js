import React from "react";
import Button  from '@mui/material/Button';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { getSingleAuthor, editAuthor } from '../../services/authorService';
//import { withRouter } from 'react-router-dom';
import moment from 'moment';


class EditAuthor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: parseInt(this.props.match.params.id),
            fullName: '',
            birthday: '',
            image: ''
        }
    }

    componentDidMount() {
        getSingleAuthor(this.state.id).then(author => {
            if(author) {
                this.setState({
                    fullName: author.fullName,
                    birthday: moment(author.birthday).format("yyyy.MM.DD"),
                    image: author.image
                });
            }
        });
    }

    editAuthor = ( ) => {
        const author = {
            id: this.state.id,
            fullName: this.state.fullName,
            birthday: this.state.birthday,
            image: this.state.image
        }

        editAuthor(author).then(res => {
            if(res.status === 200) {
                console.log("Succsesfuly edit");
                this.props.history.push('/get-author');
            }
        })
    }

    render () {
        return (
            <div className="author-input">
            <h1>Edit Author</h1>
                <TextField  label="Fullname" variant="standard" value={this.state.fullName} onChange={(event) => {this.setState({fullName: event.target.value})}} />

                <TextField label="Birthday" variant="standard" value={this.state.birthday} onChange={(event) => {this.setState({birthday: event.target.value})}} />

                <TextField label="Image" variant="standard" value={this.state.image} onChange={(event) => {this.setState({image: event.target.value})}} />

                <Button variant="contained" color="success" style={{margin: '15px'}} onClick={this.editAuthor}>
                    Edit
                </Button>

                <Link to="/get-author"><Button color="secondary">Back to author's list</Button></Link>
            </div>
        );
    }
}

export default EditAuthor;