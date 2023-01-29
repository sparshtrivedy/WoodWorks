import { Checkbox, Divider, FormControl, Grid, IconButton, InputBase, InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import SearchIcon from '@mui/icons-material/Search';

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [types, setTypes] = useState<any>([]);
    const [brands, setBrands] = useState<any>([]);
    const [checked, setChecked] = useState([0]);
    const [checked2, setChecked2] = useState([0]);
    const [value, setValue] = useState('');
    const [order, setOrder] = useState('');

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
    };

    const handleToggle2 = (value: number) => () => {
        const currentIndex = checked2.indexOf(value);
        const newChecked = [...checked2];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked2(newChecked);
    };
    
    const handleChange = (event: SelectChangeEvent) => {
        setOrder(event.target.value as string);
    };

    useEffect(() => {
        agent.Catalog.fetchFilters().then(res => {setTypes(res["types"]); setBrands(res["brands"])});
    }, [])

    useEffect(() => {
        let sortBy = '';
        if (order == '20') {
            sortBy = "price";
        } else if (order == '30') {
            sortBy = "priceDesc";
        }
        agent.Catalog.list(sortBy, '', '', types).then(products => setProducts(products))
    }, [order])

    useEffect(() => {
        let types = '';
        for (let i=1; i<checked.length; i++) {
            types += `${checked[i]},`
        }
        agent.Catalog.list('', '', '', types).then(products => setProducts(products));
    }, [checked])

    useEffect(() => {
        let brands = '';
        for (let i=1; i<checked2.length; i++) {
            brands += `${checked2[i]},`
        }
        agent.Catalog.list('', '', brands, '').then(products => setProducts(products));
    }, [checked2])

    useEffect(() => {
        agent.Catalog.list().then(products => setProducts(products))
    }, [])

    return (
        <Grid container spacing={4} sx={{marginBottom: 5}}>
            <Grid item xs={2}>
                <FormControl sx={{width: 150, marginBottom: 2}}>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={order}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Alphabetical</MenuItem>
                        <MenuItem value={20}>Price High to Low</MenuItem>
                        <MenuItem value={30}>Price Low to High</MenuItem>
                    </Select>
                </FormControl>
                <List sx={{ width: '100%', maxWidth: 360, backgroundColor:'#faf0dc' }}>
                    <Typography variant="h6" ml={1}>Types</Typography>
                    {types.map((value: any) => {
                        const labelId = `checkbox-list-label-${value}`;
                
                        return (
                        <ListItem
                            key={value}
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                            <ListItemIcon>
                                <Checkbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value}`} />
                            </ListItemButton>
                        </ListItem>
                        );
                    })}
                </List>
                <List sx={{ width: '100%', maxWidth: 360, backgroundColor:'#faf0dc', marginTop: 2 }}>
                    <Typography variant="h6" ml={1}>Brands</Typography>
                    {brands.map((value: any) => {
                        const labelId = `checkbox-list-label-${value}`;
                
                        return (
                        <ListItem
                            key={value}
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle2(value)} dense>
                            <ListItemIcon>
                                <Checkbox
                                edge="start"
                                checked={checked2.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value}`} />
                            </ListItemButton>
                        </ListItem>
                        );
                    })}
                </List>
            </Grid>
            <Grid item xs={10}>
                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500, marginBottom: 4, backgroundColor:'#faf0dc'}}>
                    <InputBase 
                        sx={{ ml: 1, flex: 1 }} 
                        placeholder="Search Products" 
                        inputProps={{ 'aria-label': 'search products' }}
                        onChange={event => {
                            setValue(event.target.value);
                        }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => agent.Catalog.list('', value, '', '').then(products => setProducts(products))}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <ProductList products={products} />
            </Grid>
        </Grid>
    )
}