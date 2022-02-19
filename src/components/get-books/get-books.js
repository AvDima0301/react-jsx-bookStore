import React, { Fragment } from 'react';
import {getBook, delBook, getFilterBook} from '../../services/bookService';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import FolderIcon from '@mui/icons-material/Folder';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button  from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import './get-books.css';
import TextField from '@mui/material/TextField';


class GetBooks extends React.Component {
    constructor() {
        super();
        this.state = {
            books: [],
            filter: ''
        };
    }

    componentDidMount() {
        getBook().then(books => {
            this.setState({
                books: books
            });
            console.log(books);
        });
    }

    deleteBook(id) {
        delBook(id).then(res => {
            getBook().then(books => {
                this.setState({
                    books: books
                });
            });
        })
    }

    useFilter(filter) {
        if(filter !== '')
        {
            getFilterBook(filter).then(books => {
                this.setState({
                    books: books
                });
                console.log(books);
            });
        } else {
            getBook().then(books => {
                this.setState({
                    books: books
                });
                console.log(books);
            });
        }
    }

    reset() {
        this.setState({filter: ''});
        getBook().then(books => {
            this.setState({
                books: books
            });
            console.log(books);
        });
    }

    render() {
        return(
            <div>
                {/* <Grid item xs={12} md={5}>  
                <Link to="/add-book"><Button color="secondary">Create new book</Button></Link>
                    <List >
                        {this.state.books.map(book =>
                            <ListItem
                                secondaryAction={
                                    <Fragment >
                                        <Link to={`/edit-book/${book.id}`}>
                                            <IconButton 
                                                edge="end"
                                                aria-label="edit">
                                                <EditOutlinedIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton 
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => this.deleteBook(book.id)}>
                                            <DeleteOutlinedIcon />
                                        </IconButton>
                                    </Fragment>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        src={book.image}
                                        sx={{width: 50, height: 50 }}
                                    >
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={book.title}
                                    secondary={book.description}
                                />
                            </ListItem>
                        )}
                    </List>
                    <Link to="/get-author">Go to Authors</Link>  
                </Grid> */}
                <div className="nav">
                    <div className="btn">
                        <Link to="/add-book" className="withOutUL"><Button variant="outlined" style={{margin: 20+"px", marginRight: 10+"px"}}>Create new book</Button></Link>
                        <Link to="/get-author" className="withOutUL"><Button variant="contained" style={{margin: 20+"px", marginLeft: 10+"px"}}>Go to author</Button></Link> 
                    </div>
                    <div className="tf" >
                        <TextField label="Search" variant="standard" value={this.state.filter} onChange={(event) => {this.setState({filter: event.target.value})}} />
                        <Button variant="outlined" style={{margin: 10+"px"}} onClick={() => this.useFilter(this.state.filter)}>Search</Button> 
                        <Button variant="text" style={{margin: 10+"px"}} onClick={() => this.reset()}>Reset</Button>
                    </div>
                </div>
                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                        {this.state.books.map(book =>
                        <Card sx={{ minWidth: 245, maxWidth: 245 }} style={{margin: 20+"px"}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="340"
                                    image = {book.image}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {book.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {book.year}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {book.author?.fullName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {book.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={`/edit-book/${book.id}`} className="withOutUL">
                                        <Button variant="outlined" href="#contained-buttons" className="withOutUL">Edit</Button>
                                    </Link>
                                    <Button variant="outlined" href="#contained-buttons" onClick={() => this.deleteBook(book.id)}>Delete</Button>
                                </CardActions>
                            </CardActionArea>
                        </Card>
                        )}
                </Grid>
                        
            </div>
        );
    }
}

export default GetBooks;