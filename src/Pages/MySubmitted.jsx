import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MySubmitted = () => {
  const { user } = useContext(AuthContext);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/assignments/submitted?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, [user.email]);
  console.log(jobs[0]?.assignmentInfo?.feedback);
  return (
    <div className="overflow-x-auto container mx-auto my-24">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th className="text-base font-semibold border text-center">Sl.</th>
            <th className="text-base font-semibold border text-center">
              Title
            </th>
            <th className="text-base font-semibold border text-center">
              Status
            </th>
            <th className="text-base font-semibold border text-center">
              Total Marks
            </th>
            <th className="text-base font-semibold border text-center">
              Obtained Marks
            </th>
            <th className="text-base font-semibold border text-center">
              Feedback
            </th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {jobs.map((job, i) => (
            <tr key={job._id}>
              <th className="text-base border text-center">{i + 1}</th>
              <td className="text-base border text-start">{job?.title}</td>
              <td className="text-base border text-center">
                {job?.assignmentInfo?.isPending ? "Pending" : "Complete"}
              </td>
              <td className="text-base border text-center">{job?.marks}</td>
              <td className="text-base border text-center">
                {job?.assignmentInfo?.obtainMark >= 0 &&
                job?.assignmentInfo?.isPending === false
                  ? job?.assignmentInfo?.obtainMark
                  : "Pending evaluation"}
              </td>
              <td className="text-base border text-center">
                {job?.assignmentInfo?.isPending === false
                  ? job?.assignmentInfo?.feedback
                  : "Pending evaluation"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MySubmitted;