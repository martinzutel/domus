'use client'

import React, { useState } from "react";

const interests = [
    { value: "sports", label: "Sports" },
    { value: "music", label: "Music" },
    { value: "movies", label: "Movies" },
    { value: "books", label: "Books" },
    { value: "travel", label: "Travel" },
    { value: "cooking", label: "Cooking" },
    { value: "art", label: "Art" },
    { value: "technology", label: "Technology" },
    { value: "fashion", label: "Fashion" },
    { value: "gaming", label: "Gaming" },
    { value: "fitness", label: "Fitness" },
    { value: "photography", label: "Photography" },
    { value: "nature", label: "Nature" },
    { value: "history", label: "History" },
    { value: "science", label: "Science" },
    { value: "food", label: "Food" },
    { value: "animals", label: "Animals" },
    { value: "gardening", label: "Gardening" },
    { value: "coding", label: "Coding" },
    { value: "dancing", label: "Dancing" },
];


interface InterestsFormProps {
    closeModal: () => void;
}

const InterestsForm: React.FC<InterestsFormProps> = ({ closeModal }) => {
    const [checkedState, setCheckedState] = useState(
        new Array(interests.length).fill(false)
    );

    const handleCheckboxChange = (index: number) => {
        const updatedCheckedState = checkedState.map((item, i) =>
            i === index ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const selectedInterests = interests
            .filter((_, index) => checkedState[index])
            .map(interest => interest.value);

        // Send the selected interests to the backend
        try {
            console.log(selectedInterests);
            closeModal(); // Close the modal upon successful form submission
        } catch (error) {
            console.error("Error submitting interests:", error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <form className="flex flex-wrap justify-center select-none" onSubmit={handleSubmit}>
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
                <div className="w-full flex justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-red-600 text-white p-2 rounded-lg"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InterestsForm;