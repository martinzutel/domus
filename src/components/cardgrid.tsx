"use client";

import React, { useState, useEffect } from "react";
import CardComponent from "@/components/cardcomponent";

const CardGrid = () => {
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users/getAllUsers");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const result = await response.json();
        setData(result);
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
      <p
        className="font-sofia-pro font-bold text text-white text-center
        sm:text-center"
      >
        Loading...
      </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-[40px] bg-maincolor w-[1500px] justify-center mt-[120px]">
        {data.map((item, index) => (
          <CardComponent
            key={index}
            name={item.name}
            about={item.about}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
