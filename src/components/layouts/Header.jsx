import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Input,
  Card,
  List as TailwindList,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { IoSearch } from "react-icons/io5";
import { WorkHistory, List as ListIcon, Notifications, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      {/* Navbar */}
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
            {/* Search Bar */}
            <div className="relative flex w-full md:w-max">
              <Input
                type="search"
                color="white"
                placeholder="Type here..."
                className="pr-10 pl-10"
                containerProps={{
                  className: "min-w-[288px] flex-1 ml-1",
                }}
              />
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" size="1rem" />
            </div>

            {/* Notification Icon */}
            <Button color="transparent" className="p-0">
              <Notifications className="text-white" />
            </Button>

            {/* Profile Icon */}
            <Button color="transparent" className="p-0">
              <AccountCircle className="text-white" />
            </Button>
          </div>
        </div>
      </Navbar>

      {/* Sidebar */}
      <Card className="fixed top-[4rem] left-0 h-[calc(100vh-4rem)] w-[12rem] p-4 bg-[#333333] rounded-none">
        <TailwindList>
          <ListItem className="text-[#FFFAFA] cursor-pointer hover:bg-[#B0B0B0] p-2 rounded-md transition-all duration-200 w-[7.5rem]">
            <ListItemPrefix>
              <WorkHistory className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/">Form</Link>
          </ListItem>

          <ListItem className="text-[#FFFAFA] cursor-pointer hover:bg-[#B0B0B0] p-2 rounded-md transition-all duration-200 w-[7.5rem]">
            <ListItemPrefix>
              <ListIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/updates">Updates</Link>
          </ListItem>
        </TailwindList>
      </Card>
    </div>
  );
};

export default Header;
