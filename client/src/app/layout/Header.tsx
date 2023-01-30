import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
    {title: 'Catalog', path: '/catalog'},
    {title: 'About', path: '/about'},
    {title: 'Contact', path: '/contact'},
]

const rightLinks = [
    {title: 'Login', path: '/login'},
    {title: 'Register', path: '/register'},
]

const navStyles = {
    color: 'inherit', 
    textDecoration: 'none',
    typography: 'h6', 
    '&:hover':{color: 'grey.500'}, 
    '&.active':{color: 'text.secondary'}
}

export default function Header({darkMode, handleThemeChange}: Props) {
    const [loading, setLoading] = useState(true);
    const {basket} = useAppSelector(state => state.basket);

    const itemCount = basket?.items.reduce((sum, item) => sum += item.quantity, 0);
    
    return (
        <AppBar position="static" sx={{mb: 4, backgroundColor: '#556B2F'}}>
            <Toolbar sx={{display:'flex', justifyContent:'space-between', alignItems: 'center'}}>   
                <Box display='flex' alignItems='center'>
                    <Typography variant="h6" component={NavLink} to={'/'} exact sx={navStyles}>
                        WoodWorks
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>

                <List sx={{display: 'flex'}}>
                    {midLinks.map(({title, path}) => (
                        <ListItem 
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title}
                        </ListItem>
                    ))}
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' size='large' sx={{color: 'inherit'}}>
                        <Badge badgeContent={itemCount} color='warning'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    {/* <List sx={{display: 'flex'}}>
                        {rightLinks.map(({title, path}) => (
                            <ListItem 
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title}
                            </ListItem>
                        ))}
                    </List> */}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
