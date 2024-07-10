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
    const [checkedState, setCheckedState] = useState<boolean[]>(new Array(interests.length).fill(false));

    useEffect(() => {
        const initialCheckedState = new Array(interests.length).fill(false);
        setCheckedState(initialCheckedState);
    }, [interests]);

    const handleCheckboxChange = (index: number) => {
        const updatedCheckedState = [...checkedState];
        updatedCheckedState[index] = !updatedCheckedState[index];
        setCheckedState(updatedCheckedState);

        const selectedInterests = interests
            .filter((_, idx) => updatedCheckedState[idx])
            .map((interest) => interest.value);

        onCheckedChange(selectedInterests); // Inform the parent component about the changes
    };

    return (
        <div className="flex flex-wrap justify-center select-none mb-4 ">
            {interests.map((interest, index) => (
                <div
                    key={interest.value}
                    className={`rounded-lg p-2 inline-block m-[10px] cursor-pointer ${
                        checkedState[index] ? "bg-orange-400" : "bg-red-500"
                    }`}
                    onClick={() => handleCheckboxChange(index)}
                >
                    <label
                        htmlFor={interest.value}
                        className="cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {interest.label}
                    </label>
                    <input
                        type="checkbox"
                        id={interest.value}
                        name={interest.value}
                        value={interest.value}
                        checked={checkedState[index]}
                        onChange={(e) => {
                            e.stopPropagation();
                            handleCheckboxChange(index);
                        }}
                        hidden
                    />
                </div>
            ))}
        </div>
    );
};

export default CheckboxGroup;
