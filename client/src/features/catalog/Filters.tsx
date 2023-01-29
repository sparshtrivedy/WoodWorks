import { Checkbox, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

export default function Filters() {
    const [types, setTypes] = useState<any>([]);
    const [brands, setBrands] = useState<any>([]);
    const [checked, setChecked] = useState([0]);

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

    useEffect(() => {
        agent.Catalog.fetchFilters().then(res => {setTypes(res["types"]); setBrands(res["brands"])});
    }, [])

    useEffect(() => {
        agent.Catalog.fetchFilters().then(res => {setTypes(res["types"]); setBrands(res["brands"])});
    }, [checked])
    
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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
    );
}