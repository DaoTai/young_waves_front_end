import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Badge, Divider, Popover, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../../redux-saga/redux/actions";
import { authState$ } from "../../../redux-saga/redux/selectors";
import { MyAvtar, Option } from "../styles";
const ToggleActions = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { payload } = useSelector(authState$);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (url: string) => {
    navigate(url);
    handleClose();
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <>
      <Badge onClick={handleClick}>
        <MyAvtar src={payload.user.avatar} />
      </Badge>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableScrollLock
        sx={{
          top: 12,
        }}
      >
        <Stack>
          <Option fullWidth onClick={() => handleNavigate(`/user/profile/${payload?.user._id}`)}>
            <AccountBoxIcon fontSize="medium" color="inherit" />
            <Typography variant="body1">Profile</Typography>
          </Option>
          <Divider />

          <Option fullWidth onClick={() => handleNavigate("/user/trash/posts")}>
            <RestoreFromTrashIcon fontSize="medium" color="inherit" />
            <Typography variant="body1" whiteSpace="pre" textOverflow="ellipsis" overflow="hidden">
              Trash post
            </Typography>
          </Option>
          <Divider />
          <Option fullWidth onClick={handleSignOut}>
            <LogoutIcon fontSize="medium" color="inherit" />
            <Typography variant="body1">Log out</Typography>
          </Option>
        </Stack>
      </Popover>
    </>
  );
};

export default ToggleActions;
