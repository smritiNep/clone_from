import React, { useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  Card,
  List as TailwindList,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { IoSearch } from "react-icons/io5";
import {
  WorkHistory,
  List as ListIcon,
  Notifications,
  AccountCircle,
} from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleFormClick = () => {
    console.log("Form clicked");
    navigate("/");
  };

  const handleUpdatesClick = () => {
    console.log("Updates clicked");
    navigate("/updates");
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const isActive = (path) => location.pathname === path ? 'text-blue-500' : '';

  return (
    <div>
      <Navbar
        color="grey"
        className="fixed top-0 max-w-screen-3xl left-0 w-full z-10 bg-[#333333] px-4 py-3 rounded-none"
      >
        <div className="flex items-center justify-between gap-y-4 text-[#FFFAFA] w-full">
          <Typography
            as="a"
            href="#"
            variant="h5"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            APP
          </Typography>

          <div className="flex items-center ml-auto space-x-4">
            <div className="flex px-7 py-2 rounded-md border-2 border-gray-600 overflow-hidden max-w-md mx-auto font-[sans-serif] focus-within:border-blue-500 transition-colors relative">
              <IoSearch
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size="0.875rem"
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full outline-none bg-transparent text-white text-sm pl-8"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <Button color="transparent" className="p-0" onClick={handleNotificationClick}>
              <Notifications className="text-white" />
            </Button>

            <Button color="transparent" className="p-0" onClick={handleProfileClick}>
              <AccountCircle className="text-white" />
            </Button>
          </div>
        </div>
      </Navbar>

      <Card className="fixed top-[4rem] left-0 h-[calc(100vh-4rem)] w-[6rem] p-1 bg-[#333333] rounded-none shadow-s border-none">
        <TailwindList>
          <ListItem
            className={`text-[#FFFAFA] p-2 w-[4rem] flex flex-col items-center justify-center hover:text-blue-500 hover:bg-transparent focus:ring-0 focus:outline-none active:bg-transparent ${isActive('/')}`}
            onClick={handleFormClick}
          >
            <ListItemPrefix>
              <WorkHistory className="ml-4" />
            </ListItemPrefix>
            <Link to="/" className="text-xs hover:text-blue-500">Form</Link>
          </ListItem>

          <ListItem
            className={`text-[#FFFAFA] p-1 w-[4rem] flex flex-col items-center justify-center hover:text-blue-500 hover:bg-transparent focus:ring-0 focus:outline-none active:bg-transparent ${isActive('/updates')}`}
            onClick={handleUpdatesClick}
          >
            <ListItemPrefix>
              <ListIcon fontSize="large" className="ml-4" />
            </ListItemPrefix>
            <Link to="/updates" className="text-xs ml-[4px] mt-[-6px] hover:text-blue-500">Updates</Link>
          </ListItem>
        </TailwindList>
      </Card>
    </div>
  );
};

export default Header;