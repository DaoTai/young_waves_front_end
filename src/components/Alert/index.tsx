import { AlertTitle } from "@mui/material";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideAlert } from "../../redux-saga/redux/actions";
import { TIME_ALERT } from "../../utils/constants";
import { AlertProps } from "../../utils/interfaces/Props";
import { MyAlert } from "./styles";
const Alert = ({ message, title = "Error", mode = "error" }: AlertProps) => {
   const dispatch = useDispatch();
   const onClose = () => {
      dispatch(hideAlert());
   };
   useEffect(() => {
      const timerId = setTimeout(() => {
         onClose();
      }, TIME_ALERT);
      return () => {
         clearTimeout(timerId);
      };
   }, []);
   return (
      <MyAlert severity={mode} closeText="Close" variant="outlined" onClose={onClose}>
         <AlertTitle>{title}</AlertTitle>
         {message}
      </MyAlert>
   );
};

export default memo(Alert);
