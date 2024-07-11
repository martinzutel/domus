"use client";

import React, { useState, useEffect } from "react";
import CardComponent from "@/components/cardcomponent";

interface User {
  id: string;
  name: string;
  about: string;
  image: string;
  ownTags: { [key: string]: boolean } | null;
  interests: string[];
}

const CardGrid: React.FC = () => {
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users/getAllUsers");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const result: User[] = await response.json();

        const extractInterests = (ownTags: { [key: string]: boolean } | null) => {
          if (!ownTags) return [];
          return Object.keys(ownTags).filter((key) => ownTags[key] === true);
        };

        const updatedResult = result.map((user) => {
          const interestsArray = extractInterests(user.ownTags);
          return {
            ...user,
            interests: interestsArray,
          };
        });

        setData(updatedResult);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = searchTerm
    ? data.filter((user) =>
        user.interests.some((interest) =>
          interest.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p className="font-sofia-pro font-bold text text-white text-center sm:text-center">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Search by interests..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="flex flex-wrap gap-[40px] bg-maincolor w-[1500px] justify-center mt-[120px]">
        {filteredData.map((item) => (
          <CardComponent
            key={item.id}
            id={item.id}
            name={item.name}
            about={item.about}
            image={item.image}
            interests={item.interests}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
