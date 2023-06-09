import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { AuthContext } from "../context/authcontext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faRightFromBracket,
  faUser,
  faBell,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import UserAvatar from "./avatar";
import { useNavigate } from "react-router-dom";

export default function Header({ setToken, notifications, setNotifications }) {
  const token = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    const options = {
      method: "POST",
      url: "https://potluck.herokuapp.com/accounts/logout/",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: {},
    };

    axios
      .request(options)
      .then((response) => {
        setToken(null);
        setMobileMenuOpen(false);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
    setToken(null);
  }

  useEffect(() => {
    if (token) {
      axios
        .get("https://potluck.herokuapp.com/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(error);
          if (error.response.data.detail === "Invalid token.") {
            setToken(null);
            navigate("/");
          }
        });

      axios
        .get(`https://potluck.herokuapp.com/notifications`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((response) => {
          setNotifications(response.data);
        });
    }
  }, [token]);

  useEffect(() => {
    if (location.pathname !== "/notifications") {
      axios
        .get(`https://potluck.herokuapp.com/notifications`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((response) => {
          setNotifications(response.data);
        });
    }
  }, [location.pathname]);

  function handleProfile() {
    navigate("/profile");
  }
  function handleNotifications() {
    navigate("/notifications");
  }

  return (
    <>
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center">
              <img
                className="h-8 w-auto"
                src="https://potluckprofilepics.s3.us-east-2.amazonaws.com/1-removebg-preview_480.png"
                alt=""
              />
              <span className=" text-3xl font-bold">Bash</span>
            </Link>
          </div>
          {token && (
            <Menu placement="bottom-end">
              <MenuHandler>
                <div className="flex">
                  <button
                    type="button"
                    className="-m-2.5 gap-1 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  >
                    {userData && (
                      <UserAvatar user={userData} className="w-6 h-6">
                        {notifications.filter((n) => n.is_read === false)
                          .length > 0 && (
                          <div className="flex items-center justify-center bg-blue-900 text-white cursor-pointer rounded-full absolute -top-1 -left-1 h-5 w-5 text-xs text-center m-auto">
                            {
                              notifications.filter((n) => n.is_read === false)
                                .length
                            }
                          </div>
                        )}
                      </UserAvatar>
                    )}
                    <FontAwesomeIcon icon={faAngleDown} />
                  </button>
                </div>
              </MenuHandler>
              <MenuList className="">
                <MenuItem onClick={handleProfile}>
                  <FontAwesomeIcon icon={faUser} className="mr-1" /> Profile
                </MenuItem>
                <MenuItem
                  onClick={handleNotifications}
                  className="flex items-center"
                >
                  {notifications.filter((n) => n.is_read === false).length >
                  0 ? (
                    <div
                      className="flex items-center justify-center bg-blue-900
                      text-white cursor-pointer rounded-full h-5 w-5 text-xs text-center mr-1 -ml-1 "
                    >
                      {notifications.filter((n) => n.is_read === false).length}
                    </div>
                  ) : (
                    <FontAwesomeIcon icon={faBell} className="mr-2 " />
                  )}
                  Notifications
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </nav>
      </header>
      {!mobileMenuOpen && <Outlet />}
    </>
  );
}
