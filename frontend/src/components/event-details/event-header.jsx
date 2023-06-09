import {
  faTrash,
  faCalendar,
  faLocation,
  faLocationDot,
  faUser,
  faPenToSquare,
  faAngleDown,
  faCopy,
  faMoneyBill,
  faDollar,
  faDollarSign,
  faCommentsDollar,
  faEllipsis,
  faEllipsisVertical,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Typography,
  Button,
  Dialog,
  Card,
  Chip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import moment from "moment";
import { useState, Fragment, useRef, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/eventdetails.css";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/authcontext";
import axios from "axios";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

export default function EventHeader({ event, mapsURL, calFile }) {
  const [showMore, setShowMore] = useState(false);
  const { pk } = useParams();
  const navigate = useNavigate();
  const token = useContext(AuthContext);

  function handleDelete() {
    const options = {
      method: "DELETE",
      url: `https://potluck.herokuapp.com/events/${pk}`,
      headers: {
        Authorization: token,
      },
    };

    axios.request(options).then(function (response) {
      navigate("/");
    });
  }

  const handleClickAttendees = () => {
    navigate(`/events/${pk}/invitations`);
  };

  return (
    <div className="m-1">
      <div className="flex">
        <div className="pb-2 flex-auto self-center">
          <Typography variant="h4" className="">
            {event.title}
          </Typography>
        </div>
        <EditMenu
          pk={event.pk}
          isHost={event.user_is_host}
          handleDelete={handleDelete}
          calFile={calFile}
        />
      </div>
      <Typography variant="h6">
        <FontAwesomeIcon icon={faCalendar} />{" "}
        {moment(event.date_scheduled).format("MMMM Do, YYYY")} @{" "}
        {moment(event.time_scheduled, "HH:mm:ss").format("h:mm A")}
        {event.end_time && " -"}{" "}
        {event.end_time && moment(event.end_time, "HH:mm:ss").format("h:mm A")}
      </Typography>
      <div className="border-b-2 pb-2 mt-1">
        <div className="mb-1 text-m">
          <div className="flex items-center justify-start rounded-full">
            {event.host.thumbnail ? (
              <img
                src={event.host.thumbnail}
                alt="user thumbnail"
                className="rounded-full h-5 w-5 object-cover -ml-1 mr-1"
              />
            ) : (
              <FontAwesomeIcon className="mr-1" icon={faUser} />
            )}{" "}
            <Typography className="" style={{ marginLeft: "-1px" }}>
              Hosted by {event.host.full_name}{" "}
            </Typography>
          </div>
        </div>
        <Typography className="mb-1 mr-1 text-m">
          <FontAwesomeIcon icon={faLocationDot} />{" "}
          <span style={{ marginLeft: "2px" }}>{event.location_name}</span>
        </Typography>
        {event.street_address && (
          <p className="ab-1 text-m">
            <FontAwesomeIcon icon={faLocation} />{" "}
            <a
              href={mapsURL}
              target="_blank"
              className=" text-blue-900 hover:text-blue-700"
            >
              {event.street_address} {event.city} {event.state}, {event.zipcode}{" "}
            </a>
          </p>
        )}
        {event.playlist_link && (
          <a href={event.playlist_link} target="_blank">
            {" "}
            <Chip
              className="my-1 cursor-pointer"
              color="green"
              value="Playlist"
              icon={
                <FontAwesomeIcon icon={faSpotify} className="ml-1" size="xl" />
              }
            />
          </a>
        )}
        {event.tip_jar && (
          <a href={`https://venmo.com/${event.tip_jar}`} target="_blank">
            {" "}
            <Chip
              className=" cursor-pointer z-0"
              style={{
                backgroundColor: "#3396cd",
              }}
              value="Tip the Host?"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1333.33 1333.33"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  imageRendering="optimizeQuality"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className=" h-6 -ml-.5 "
                  style={{ marginTop: "-2px" }}
                >
                  <g fillRule="nonzero">
                    <path
                      d="M995.24 271.32c28.68 47.29 41.55 96.05 41.55 157.62 0 196.38-167.62 451.42-303.67 630.49H422.45L297.88 314.34 570 288.5l66.17 530.15c61.5-100.31 137.55-257.93 137.55-365.32 0-58.84-10.08-98.84-25.84-131.78l247.36-50.23z"
                      fill="#fff"
                    />
                  </g>
                </svg>
              }
            />
          </a>
        )}
      </div>
      <div className="mt-2">
        <Typography>
          <span
            className={
              event.description.length > 250
                ? !showMore
                  ? "ellipsis-after-4"
                  : ""
                : ""
            }
          >
            {event.description}
          </span>
          {event.description.length > 250 && (
            <span
              className="font-bold text-blue-800 hover:text-blue-500"
              onClick={() => setShowMore(!showMore)}
            >
              {" "}
              Show {showMore ? "less" : "more"}
            </span>
          )}
        </Typography>
      </div>
      <div
        onClick={handleClickAttendees}
        className="pt-1 mt-2 flex justify-between items-center rounded hover:bg-gray-100 cursor-pointer border-t-2 border-b-2 pb-3"
      >
        <div className="">
          <Typography variant="h6" className="text-left mt-1 mb-1 font-bold">
            Guest List
          </Typography>
          <div className="flex justify-around gap-1">
            <Chip
              className="rounded-full"
              color="teal"
              value={`${event.rsvp_yes} Going`}
            />
            <Chip
              className="rounded-full"
              color="teal"
              value={`${event.rsvp_no} Can't go`}
            />
            <Chip
              className="rounded-full"
              color="teal"
              value={`${event.rsvp_tbd} TBD`}
            />
          </div>
        </div>
        <FontAwesomeIcon className="h-6 w-6 mt-1 mr-2" icon={faAnglesRight} />
      </div>
      <div className="">
        {event.dietary_restrictions_count && (
          <>
            <Typography variant="h6" className="text-left mt-1 font-bold">
              Guest Dietary Restrictions
            </Typography>
            <div className="flex pt-1 gap-x-1 flex-wrap justify-start">
              {Object.keys(event.dietary_restrictions_count)
                .filter((key) => key !== "null")
                .map((key) => (
                  <Chip
                    color="amber"
                    key={key}
                    className="h-fit my-1 rounded-full"
                    value={`${event.dietary_restrictions_count[key]} ${key}`}
                  />
                ))}
            </div>
          </>
        )}
        <div className=" border-b-2 mt-2 mb-2"></div>
      </div>
    </div>
  );
}

function EditMenu({ pk, handleDelete, calFile, isHost }) {
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const navigate = useNavigate();
  function handleDeleteConfirmation() {
    setIsConfirmDeleteOpen(true);
  }

  function handleDeleteCancel() {
    setIsConfirmDeleteOpen(false);
  }

  function handleDeleteConfirmed() {
    handleDelete();
    setIsConfirmDeleteOpen(false);
  }

  function handleEditButton() {
    navigate(`/events/${pk}/edit`);
  }

  function handleCopy() {
    navigate(`/events/${pk}/copy`);
  }

  return (
    <div className="m-auto">
      <Menu placement="bottom-end">
        <MenuHandler>
          <FontAwesomeIcon
            icon={faEllipsis}
            className="text-2xl cursor-pointer mr-2"
          />
        </MenuHandler>
        <MenuList>
          <div className="px-1 py-1 ">
            <MenuItem>
              <a href={calFile.url} download={calFile.download}>
                <FontAwesomeIcon className="w-5 h-5 mr-2" icon={faCalendar} />
                Add to Calendar
              </a>
            </MenuItem>
          </div>
          {isHost && (
            <>
              <div className="px-1 py-1 ">
                <MenuItem onClick={handleEditButton}>
                  <FontAwesomeIcon
                    className="w-5 h-5 mr-2"
                    icon={faPenToSquare}
                  />
                  Edit
                </MenuItem>
              </div>
              <div className="px-1 py-1 ">
                <MenuItem onClick={handleCopy}>
                  <FontAwesomeIcon className="w-5 h-5 mr-2" icon={faCopy} />
                  Duplicate
                </MenuItem>
              </div>
              <div className="px-1 py-1">
                <MenuItem onClick={handleDeleteConfirmation}>
                  <FontAwesomeIcon className="w-5 h-5 mr-2" icon={faTrash} />
                  Delete
                </MenuItem>
              </div>
            </>
          )}
        </MenuList>
      </Menu>
      {isConfirmDeleteOpen && (
        <div className="w-fit">
          <Dialog
            onClose={handleDeleteCancel}
            open={isConfirmDeleteOpen}
            className="w-3/5 max-w-[60%] flex items-center justify-center flex-col"
          >
            <Typography className="mt-4 mb-2 text-center" variant="h5">
              Are you sure?
            </Typography>
            <div className="flex mb-2 py-2 self-center gap-x-4">
              <Button className="bg-blue-900" onClick={handleDeleteConfirmed}>
                Yes
              </Button>
              <Button className="bg-blue-900" onClick={handleDeleteCancel}>
                Cancel
              </Button>
            </div>
          </Dialog>
        </div>
      )}
    </div>
  );
}
