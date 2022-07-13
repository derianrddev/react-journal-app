import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {

  const { isSaving, active } = useSelector( state => state.journal );
  const dispatch = useDispatch();

  const onNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <>
      <JournalLayout>

        {
          (!!active) 
            ? <NoteView />
            : <NothingSelectedView />
        }

        <IconButton
          onClick={ onNewNote }
          disabled={ isSaving }
          size='large'
          sx={{
            color:'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
            position: 'fixed',
            right: 50,
            bottom: 5
          }}
        >
          <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton>
        
      </JournalLayout>
    </>
  )
}
