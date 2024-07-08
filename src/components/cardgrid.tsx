"use client";

import React, { useState, useEffect } from "react";
import CardComponent from "@/components/cardcomponent";

interface User {
  id: string;
  name: string;
  about: string;
  image: string;
  interests: string[];
}

const CardGrid: React.FC = () => {
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users/getAllUsers");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const result: User[] = await response.json();

        // Function to extract interests from ownTags
        const extractInterests = (ownTags: { [key: string]: boolean }) => {
          return Object.keys(ownTags).filter((key) => ownTags[key] === true);
        };

        // Update each user with their respective interests
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
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-[40px] bg-maincolor w-[1500px] justify-center mt-[120px]">
        {data.map((item) => (
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
