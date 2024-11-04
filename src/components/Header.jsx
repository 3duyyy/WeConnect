import { useTheme } from "@emotion/react";
import { useLogout } from "@hooks/useLogout";
import { useUserInfo } from "@hooks/useUserInfo";
import { Notifications, SearchOutlined, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { toggleDrawer } from "@redux/slices/settingSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { logOut } = useLogout();

  const userInfo = useUserInfo();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();

  const renderMenu = (
    <Menu
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem onClick={() => logOut()}>Logout</MenuItem>
    </Menu>
  );

  const handleUserProfileClick = (e) => {
    setAnchorEl(e.target);
  };

  return (
    <div>
      <AppBar color="white" position="sticky" className="py-4">
        <Toolbar className="!min-h-fit justify-between">
          {isMobile ? (
            <IconButton onClick={() => dispatch(toggleDrawer())}>
              <MenuIcon />
            </IconButton>
          ) : (
            <div className="flex items-center gap-8">
              <Link to="/">
                <img src="weconnectlogo.png" className="h-8 w-8" />
              </Link>
              <div className="flex items-center gap-1">
                <SearchOutlined />
                <TextField
                  slotProps={{
                    input: { className: "h-10 px-3 py-2 " },
                    htmlInput: { className: "!p-0" },
                  }}
                  name="search"
                  placeholder="Search"
                  variant="standard"
                  sx={{
                    ".MuiInputBase-root::before": {
                      display: "none",
                    },
                  }}
                />
              </div>
            </div>
          )}
          <div>
            {isMobile && (
              <IconButton>
                <SearchOutlined />
              </IconButton>
            )}
            <IconButton size="large">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton size="large" onClick={handleUserProfileClick}>
              <Avatar className="!bg-primary-main">{userInfo.fullName?.[0].toUpperCase()}</Avatar>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default Header;