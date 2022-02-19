import React, { Fragment } from 'react';
import { delAuthor, getAuthors, getFilterAuthor } from '../../services/authorService';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button  from '@mui/material/Button';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TextField from '@mui/material/TextField';


class GetAuthors extends React.Component {
    constructor() {
        super();
        this.state = {
            authors: [],
            filter: ''
        };
    }

    componentDidMount() {
        getAuthors().then(authors => {
            console.log(authors);
            this.setState({
                authors: authors
            });
        });
    }

    deleteAuthor(id) {
        delAuthor(id).then(res => {
            console.log(res);
            getAuthors().then(authors => {
                this.setState({
                    authors: authors
                });
            });
        })
    }

    useFilter(filter) {
        if(filter !== '')
        {
            getFilterAuthor(filter).then(authors => {
                this.setState({
                    authors: authors
                });
                console.log(authors);
            });
        } else {
            getAuthors().then(authors => {
                console.log(authors);
                this.setState({
                    authors: authors
                });
            });
        }
    }

    reset() {
        this.setState({filter: ''});
        getAuthors().then(authors => {
            console.log(authors);
            this.setState({
                authors: authors
            });
        });
    }

    render() {
        return(
            <div>
                <Grid item xs={12} md={5}>
                <div className="nav">
                    <div className="btn">
                        <Link to="/add-author" className="withOutUL"><Button variant="outlined" style={{margin: 20+"px"}}>Create new author</Button></Link>
                        <Link to="/get-book" className="withOutUL"><Button variant="contained" style={{margin: 20+"px"}}>Go to Book</Button></Link>  
                    </div>
                    <div className="tf" >
                        <TextField label="Search" variant="standard" value={this.state.filter} onChange={(event) => {this.setState({filter: event.target.value})}} />
                        <Button variant="outlined" style={{margin: 10+"px"}} onClick={() => this.useFilter(this.state.filter)}>Search</Button> 
                        <Button variant="text" style={{margin: 10+"px"}} onClick={() => this.reset()}>Reset</Button>
                    </div>
                </div>
                    <List >
                        {this.state.authors.map(author =>
                            <ListItem
                                secondaryAction={
                                    <Fragment >
                                        <Link to={`/edit-author/${author.id}`}>
                                            <IconButton 
                                                edge="end"
                                                aria-label="edit">
                                                <EditOutlinedIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => this.deleteAuthor(author.id)}>
                                            <DeleteOutlinedIcon />
                                        </IconButton>
                                    </Fragment>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        src={author.image}
                                        sx={{width: 50, height: 50 }}
                                    >
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={author.fullName}
                                    secondary={moment(author.birthday).format("DD.MM.yyyy")}
                                />
                            </ListItem>
                        )}
                    </List>
                </Grid>
            </div>
        );
    }
}

export default GetAuthors;