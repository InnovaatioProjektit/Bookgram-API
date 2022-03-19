import React, {Fragment, forwardRef} from "react";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


/**
 * Ilmoita käyttäjälle tapahtumien kulusta pienellä pienellä paneelilla sivussa
 * 
 * Esimerkki käyttö:
 * 
 *      <Toast message="Hello World" severity="success" vertical="top" horizontal="center" />
 * 
 * Severity: 
 *      success
 *      warning
 *      info
 *      error
 */


 const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default (props) => {
    const [open, setOpen] = React.useState(true);

    const {vertical, horizontal} = props;

    return (
        <Fragment>
          <Snackbar
            autoHideDuration={6000}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
            message={props.message}
            open={open}
            onClose={(event, reason) => {
              // `reason === 'escapeKeyDown'` if `Escape` was pressed
              setOpen(false);
              // call `event.preventDefault` to only close one Snackbar at a time.
            }}
          >
              <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                This is a success message!
            </Alert>
          </Snackbar>
          <Snackbar open={open} onClose={() => setOpen(false)} />
        </Fragment>
      );

}