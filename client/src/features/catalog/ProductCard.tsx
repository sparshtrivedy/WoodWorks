import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../basket/basketSlice";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    function handleAddItem(productId: number) {
        setLoading(true);
        agent.Basket.addItem(productId)
            .then (basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return (
        <Card sx={{backgroundColor:'#faf0dc'}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: 'darkOrange'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color: '#5A5A5A'}
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: '#d5b895' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color="#556B2F" variant="h5" component="div">
                    ${(product.price/100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton 
                    loading={loading} 
                    onClick={() => handleAddItem(product.id)} 
                    size="small"
                    sx={{color: 'darkOrange'}}
                >
                    Add to cart
                </LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small" sx={{color: 'darkOrange'}}>View</Button>
            </CardActions>
        </Card>
    )
}