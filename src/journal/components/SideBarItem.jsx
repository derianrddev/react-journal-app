import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({ id, title, body, date, imageUrls = [] }) => {

  const dispatch = useDispatch();

  const onActiveNote = () => {
    dispatch( setActiveNote( { id, title, body, date, imageUrls } ) );
  }

  const newTitle = useMemo( () => {
    return title.length > 20
    ? title.substring(0, 20) + '...'
    : title
  }, [ title ]);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={ onActiveNote }>
          <ListItemIcon>
            <TurnedInNot />
          </ListItemIcon>
          <Grid container>
            <ListItemText primary={ newTitle } />
            <ListItemText secondary={ body } />
          </Grid>
        </ListItemButton>
      </ListItem>
    </>
  )
}
