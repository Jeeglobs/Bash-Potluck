import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useContext } from "react";
import "../../styles/eventdetails.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/authcontext";

export function ReserveItemsButton({ items, setRefresh, setEvent }) {
  const token = useContext(AuthContext);

  function handleReserve() {
    for (const item of items) {
      const options = {
        method: "PATCH",
        url: `https://potluck.herokuapp.com/items/${item.pk}/reserved`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log("PATCH", response.data);
          setRefresh((r) => !r);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-30">
      <form>
        <Button
          onClick={handleReserve}
          className="rounded-full shadow-lg shadow-gray-600/50 bg-blue-900"
        >
          <div className="flex justify-center items-center">
            <FontAwesomeIcon icon={faCheck} className="w-5 h-5 mr-2" /> Reserve
            Items
          </div>
        </Button>
      </form>
    </div>
  );
}
