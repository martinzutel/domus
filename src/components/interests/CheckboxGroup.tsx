import React, { useState, useEffect } from "react";

interface Interest {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  interests: Interest[];
  onCheckedChange: (checkedValues: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ interests, onCheckedChange }) => {
  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(interests.length).fill(false)
  );

  useEffect(() => {
    if (checkedState.length !== interests.length) {
      setCheckedState(new Array(interests.length).fill(false));
    }
  }, [interests]);

  const handleCheckboxChange = (index: number) => {
    setCheckedState((prevCheckedState) => {
      const updatedCheckedState = [...prevCheckedState];
      updatedCheckedState[index] = !updatedCheckedState[index];

      const selectedInterests = interests
        .filter((_, idx) => updatedCheckedState[idx])
        .map((interest) => interest.value);

      onCheckedChange(selectedInterests);
      return updatedCheckedState;
    });
  };

  return (
    <div className="flex flex-wrap justify-center select-none mb-4">
      {interests.map((interest, index) => (
        <div
          key={interest.value}
          className={`rounded-lg p-2 inline-block m-[10px] cursor-pointer ${
            checkedState[index] ? "bg-coolredhl" : "bg-coolred"
          }`}
        >
          <input
            type="checkbox"
            id={interest.value}
            name={interest.value}
            value={interest.value}
            checked={checkedState[index]}
            onChange={() => handleCheckboxChange(index)}
            hidden
          />
          <label
            htmlFor={interest.value}
            className="text-white cursor-pointer flex items-center justify-center w-full h-full"
          >
            {interest.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxGroup;
