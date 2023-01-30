import { Avatar, Box, Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { User } from "../../app/models/user";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function LoginPage() {
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    const [user, setUser] = useState<User | null>(null);
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
            handleClickOpen();
            history.push('/catalog');
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
                    {"hello"}
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
                Login
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
                    <Button variant="outlined" color='warning' onClick={() => agent.User.get(value, value1).then(user => setUser(user[0]))} sx={{width: 120, marginBottom: 2}} size='large'>Login</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="outlined" color='warning' onClick={() => history.push('/Register')} sx={{width: 120}} size='large'>Register</Button>
                </Grid>
            </Grid>
            </Box>
        </Container>
        </>
    )
}