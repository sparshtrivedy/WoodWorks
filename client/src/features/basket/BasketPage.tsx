import { Delete, Add, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { removeItem, setBasket } from "./basketSlice";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
    const [loading, setLoading] = useState(true);
    const {basket} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    function handleRemoveItem(productId: number, quantity: number = 1) {
        setLoading(true);
        agent.Basket.removeItem(productId, quantity)
            .then(() => dispatch(removeItem({productId, quantity})))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    function handleAddItem(productId: number) {
        setLoading(true);
        agent.Basket.addItem(productId)
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    const subtotal = basket?.items.reduce((sum, item) => sum += ((item.price/100)*item.quantity), 0);

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <>
            <TableContainer component={Paper} sx={{backgroundColor: '#faf0dc'}}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {basket.items.map((item) => (
                        <TableRow
                        key={item.productId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            <Box style={{display:'flex', alignItems:'center'}}>
                                <img src={item.pictureUrl} height={50} />
                                <span>{item.name}</span>
                            </Box>
                        </TableCell>
                        <TableCell align="right">${(item.price/100).toFixed(2)}</TableCell>
                        <TableCell align="center">
                            <LoadingButton color='warning' onClick={() => handleRemoveItem(item.productId)}>
                                <Remove />
                            </LoadingButton>
                            {item.quantity}
                            <LoadingButton color='warning' onClick={() => handleAddItem(item.productId)}>
                                <Add />
                            </LoadingButton>
                        </TableCell>
                        <TableCell align="right">${((item.price/100) * item.quantity).toFixed(2)}</TableCell>
                        <TableCell align="right">
                            <LoadingButton color='error' onClick={() => handleRemoveItem(item.productId, item.quantity)}>
                                <Delete />
                            </LoadingButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6} >
                    <BasketSummary subtotal={subtotal? parseInt(subtotal.toFixed(2)): 0} />
                    <Button component={Link} to={'/checkout'} variant='contained' size='large' color="warning" fullWidth>Checkout</Button>
                </Grid>
            </Grid>
        </>
    )
}