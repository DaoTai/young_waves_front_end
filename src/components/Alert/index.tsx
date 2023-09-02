import { Snackbar, Typography } from "@mui/material";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../../redux-saga/redux/actions";
import { TIME_ALERT } from "../../utils/constants";
import { AlertProps } from "../../utils/interfaces/Props";
import { MyAlert } from "./styles";
import { alertState$ } from "../../redux-saga/redux/selectors";
const Alert = ({ message, title, mode, onClose }: AlertProps) => {
  const dispatch = useDispatch();
  const alert$ = useSelector(alertState$);
  const onCloseAlert = () => {
    onClose ? onClose() : dispatch(hideAlert());
  };

  useEffect(() => {
    return () => {
      dispatch(hideAlert());
    };
  }, []);

  return (
    <Snackbar
      open
      autoHideDuration={TIME_ALERT}
      message={message}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={onCloseAlert}
    >
      <MyAlert
        severity={mode || alert$.payload.mode}
        closeText="Close"
        variant="outlined"
        onClose={onCloseAlert}
      >
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{
            "&:first-letter": {
              textTransform: "uppercase",
            },
          }}
        >
          {title || alert$.payload.title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            "&:first-letter": {
              textTransform: "uppercase",
            },
          }}
        >
          {message || alert$.payload.message}
        </Typography>
      </MyAlert>
    </Snackbar>
  );
};

export default memo(Alert);
