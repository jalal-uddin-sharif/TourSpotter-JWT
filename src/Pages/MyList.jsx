import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../component/Loader";
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider";

const MyList = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [mySpot, setMySpot] = useState([]);
  const [control, setControl] = useState(false);
  // console.log(mySpot);
  useEffect(() => {
    setLoading(true);
    fetch(`https://tourist-server-five.vercel.app/my-added-spot/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setMySpot(data);
      });
  }, [user, control]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://tourist-server-five.vercel.app/delete-spot/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            setControl(!control);
            // console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your data has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="min-h my-10 lg:mx-20">
      <div>
        <h1 className="text-center text-3xl font-semibold my-6">
          My listed Spot data
        </h1>
      </div>
      <div className="overflow-x-auto border">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Spot name</th>
              <th>Country name</th>
              <th>location</th>
              <th>Average cost</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {mySpot?.map((spot, idx) => (
              <tr key={spot._id}>
                <th>{idx + 1}</th>
                <td>{spot.tourists_spot_name}</td>
                <td>{spot.country_Name}</td>
                <td>{spot.location}</td>
                <td>{spot.average_cost}</td>
                <td>
                  <Link to={`/update-spot/${spot._id}`}>
                    <button className="btn-link btn  -ml-4">Update</button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(spot._id)}
                    className="btn btn-link -ml-4 text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyList;
