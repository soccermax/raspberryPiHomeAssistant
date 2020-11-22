import React from "react";
import SnackbarMaterial from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function Snackbar({ state }) {
  const { snackbarState, setSnackbarState } = state;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarState({
      shouldBeOpen: false,
      message: ""
    });
  };

  return (
    <div>
      <SnackbarMaterial
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={snackbarState.shouldBeOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarState.message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small"/>
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
