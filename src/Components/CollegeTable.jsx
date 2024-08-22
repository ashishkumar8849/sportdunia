import React, { useState, useEffect } from "react";
import data from "../data/collegeData";

const CollegeTable = () => {
  const [colleges, setColleges] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("ranking");
  const [sortOrder, setSortOrder] = useState("asc");
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const sortedData = [...data]
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortKey] > b[sortKey] ? 1 : -1;
        } else {
          return a[sortKey] < b[sortKey] ? 1 : -1;
        }
      })
      .filter((college) =>
        college.name.toLowerCase().includes(query.toLowerCase())
      );
    setColleges(sortedData.slice(0, visibleCount));
  }, [query, sortKey, sortOrder, visibleCount]);

  const handleScroll = (e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight &&
      visibleCount < data.length
    ) {
      setVisibleCount((prevCount) => prevCount + 10);
    }
  };

  return (
    <div onScroll={handleScroll} className="overflow-auto max-h-[80vh]">
      <input
        type="text"
        placeholder="Search by college name..."
        className="p-2 border border-gray-300 mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th onClick={() => setSortKey("ranking")} className="p-2">
              Ranking
            </th>
            <th className="p-2">College</th>
            <th onClick={() => setSortKey("fees")} className="p-2">
              Course Fees
            </th>
            <th onClick={() => setSortKey("placement")} className="p-2">
              Placement
            </th>
            <th onClick={() => setSortKey("user_reviews")} className="p-2">
              User Reviews
            </th>
          </tr>
        </thead>
        <tbody>
          {colleges.map((college) => (
            <tr
              key={college.id}
              className={`border-b ${college.featured ? "bg-yellow-50" : ""}`}
            >
              <td className="p-2">{college.ranking}</td>
              <td className="p-2">{college.name}</td>
              <td className="p-2">{college.fees}</td>
              <td className="p-2">{college.placement}</td>
              <td className="p-2">{college.user_reviews}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CollegeTable;
