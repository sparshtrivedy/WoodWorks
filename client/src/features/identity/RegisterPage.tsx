import { Alert, Avatar, Box, Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import agent from "../../app/api/agent";
import { User } from "../../app/models/user";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function RegisterPage() {
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [status, setStatus] = useState<User | null>(null);
    const [content, setContent] = useState('');
    const history = useHistory();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, [user])
    
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{backgroundColor: '#faf0dc'}}>
                    {"Invalid registration"}
                </DialogTitle>
                <DialogContent sx={{backgroundColor: '#faf0dc'}}>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{backgroundColor: '#faf0dc'}}>
                    <Button color='warning' onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        padding: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#faf0dc'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'darkOrange' }}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{marginBottom: 2}}>
                        Register
                    </Typography>
                    <TextField  id="outlined-basic" 
                                label="Email" 
                                variant="outlined" 
                                onChange={event => {
                                    setValue(event.target.value);
                                }}
                                sx={{marginBottom: 2, width: 300}}
                    />
                    <TextField  id="outlined-basic" 
                                label="Password" 
                                variant="outlined"
                                onChange={event => {
                                    setValue1(event.target.value);
                                }}
                                sx={{marginBottom: 2, width: 300}}
                    />
                    <Grid container>
                        <Grid item xs={12} sm={6} pl={4}>
                            <Button variant="outlined" color='warning'
                                    sx={{width: 120}} size='large'
                                    onClick={() => {
                                        if (value.includes('@') && value.includes('.com') && value1.length >= 8) {
                                            agent.User.get(value, value1).then(u => setStatus(u[0]));
                                            if (!status) {
                                                agent.User.register(value, value1).then(user => setUser(user[0]));
                                            } else {
                                                setContent('Looks like you already have an account. Try signing in.');
                                                handleClickOpen();
                                            }
                                        } else {
                                            setContent('Make sure you are entering a valid email and a password with atleast 8 characters.');
                                            handleClickOpen();
                                        }
                                    }}>
                                Register
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="outlined" color='warning' onClick={() => history.push('/Login')} sx={{width: 120}} size='large'>Login</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}