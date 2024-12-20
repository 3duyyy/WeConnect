import { useDetectLayout } from "@hooks/index";
import { AccountCircle, HomeOutlined, Hub, Language, Message, People } from "@mui/icons-material";
import { Drawer, List, ListSubheader } from "@mui/material";
import { toggleDrawer } from "@redux/slices/settingSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SidebarContent = () => {
  return (
    <div className="flex w-64 flex-col gap-4">
      <List className="card flex flex-col gap-2 !p-4">
        <Link to="/" className="flex items-center gap-1">
          <HomeOutlined fontSize="small" />
          New Feeds
        </Link>
        <Link to="/message" className="flex items-center gap-1">
          <Message fontSize="small" />
          Messenger
        </Link>
        <Link to="/friends" className="flex items-center gap-1">
          <People fontSize="small" />
          Friends
        </Link>
        <Link to="/groups" className="flex items-center gap-1">
          <Hub fontSize="small" />
          Groups
        </Link>
      </List>

      <List className="card flex flex-col gap-2 !p-4">
        <ListSubheader className="mb-2 !px-0 !leading-none">Settings</ListSubheader>
        <Link to="/setting/account" className="flex items-center gap-1">
          <AccountCircle fontSize="small" />
          Account
        </Link>
        <Link to="/setting/languages" className="flex items-center gap-1">
          <Language fontSize="small" />
          Languages
        </Link>
      </List>
    </div>
  );
};

const Sidebar = () => {
  const { isMediumLayout } = useDetectLayout();

  const isShowDrawer = useSelector((state) => state.settings.isShowDrawer);

  const dispatch = useDispatch();

  return isMediumLayout ? (
    <div>
      <Drawer
        open={isShowDrawer}
        onClose={() => dispatch(toggleDrawer())}
        classes={{ paper: "p-4 flex flex-col gap-4 !bg-dark-200" }}
      >
        <Link to="/">
          <img src="weconnectlogo.png" className="m-auto h-8 w-8" />
        </Link>
        <SidebarContent />
      </Drawer>
    </div>
  ) : (
    <SidebarContent />
  );
};

export default Sidebar;
