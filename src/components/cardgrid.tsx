"use client";

import React, { useState, useEffect } from "react";
import CardComponent from "@/components/cardcomponent";
import { useUserContext } from "@/components/UserContext";

const CardGrid: React.FC = () => {
  const { users, setUsers } = useUserContext();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users/getAllUsers");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const result = await response.json();

        const updatedResult = result.map((user: any) => {
          const interestsArray = user.ownTags.map((tag: string) => {
            return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase().replace(/_/g, " ");
          });
          return {
            ...user,
            ownTags: interestsArray,
          };
        });

        setUsers(updatedResult); // Update global context instead of local state
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [setUsers]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (users.length === 0) {
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
        {users.map((item) => (
          <CardComponent
            key={item.id}
            id={item.id}
            name={item.name}
            about={item.about}
            image={item.image}
            interests={item.ownTags}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
