import { LoadingButton } from "@mui/lab";
import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "../basket/basketSlice";

export default function ProductDetails() {
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const {basket} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const item = basket?.items.find(i => i.productId === product?.id);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        agent.Catalog.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id])

    useEffect(() => {
        if (item) setQuantity(item.quantity);
    }, [item])

    function handleAddItem(productId: number, quantity: number) {
        setLoading(true);
        let num = quantity;
        if (item) {
            num = quantity - item.quantity;
        }
        if (item === undefined || num > 0) {
            agent.Basket.addItem(productId, num)
                .then((basket) => dispatch(setBasket(basket)))
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        } else if (num < 0) {
            num = Math.abs(num);
            agent.Basket.removeItem(productId, num)
                .then(() => dispatch(removeItem({productId: productId, quantity: num})))
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        }
    }

    function handleInputChange(event: any) {
        if (event.target.value > 0) {
            setQuantity(event.target.value);
        }
    }

    if (loading) return <h3>Loading...</h3>

    if (!product) return <h3>Product not found</h3>

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb: 2}}/>
                <Typography variant='h4' color='secondary'>${(product.price/100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            sx={{heigth: '55px'}}
                            onChange={event => handleInputChange(event)}
                            variant='outlined'
                            type='number'
                            label='Quantity in cart'
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            sx={{heigth: 55, p:1.7}}
                            onClick={() => handleAddItem(parseInt(id), quantity)}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item? 'Update cart': 'Add to cart'}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}