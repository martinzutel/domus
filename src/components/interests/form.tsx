import React, { useState } from "react";

const interests = [
    { value: "fitness", label: "Fitness" },
    { value: "football", label: "Football" },
    { value: "basketball", label: "Basketball" },
    { value: "tennis", label: "Tennis" },
    { value: "golf", label: "Golf" },
    { value: "hockey", label: "Hockey" },
    { value: "baseball", label: "Baseball" },
    { value: "rugby", label: "Rugby" },
    { value: "boxing", label: "Boxing" },
    { value: "skateboarding", label: "Skateboarding" },
    { value: "martial_arts", label: "Martial Arts" },
    { value: "reading", label: "Reading" },
    { value: "movies", label: "Movies" },
    { value: "gaming", label: "Gaming" },
    { value: "anime", label: "Anime" },
    { value: "photography", label: "Photography" },
    { value: "music", label: "Music" },
    { value: "writing", label: "Writing" },
    { value: "programming", label: "Programming" },
    { value: "hiking", label: "Hiking" },
    { value: "cooking", label: "Cooking" },
    { value: "gardening", label: "Gardening" },
    { value: "fishing", label: "Fishing" },
    { value: "eating", label: "Eating" },
    { value: "politics", label: "Politics" },
    { value: "musician", label: "Musician" },
    { value: "art", label: "Art" },
    { value: "stylist", label: "Stylist" },
    { value: "cycling", label: "Cycling" },
    { value: "yoga", label: "Yoga" },
    { value: "traveling", label: "Traveling" },
    { value: "swimming", label: "Swimming" },
    { value: "philosophy", label: "Philosophy" },
    { value: "cars", label: "Cars" },
    { value: "boats", label: "Boats" },
    { value: "airplanes", label: "Airplanes" },
    { value: "running", label: "Running" }
];

interface InterestsFormProps {
    closeModal: () => void;
    modalContext: "search" | "ownTags" | "likedTags";  // Define modalContext with specific string literals
}

const InterestsForm: React.FC<InterestsFormProps> = ({ closeModal, modalContext }: InterestsFormProps) => {
    const [checkedState, setCheckedState] = useState<boolean[]>(
        new Array(interests.length).fill(false)
    );

    const handleCheckboxChange = (index: number) => {
        const updatedCheckedState = [...checkedState];
        updatedCheckedState[index] = !updatedCheckedState[index];
        setCheckedState(updatedCheckedState);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const selectedInterests = interests
            .filter((_, index) => checkedState[index])
            .map(interest => interest.value);

        let fetchUrl = '';
        let tagsBody
        switch (modalContext) {
            case 'search':
                fetchUrl = '/api/tagSearch';
                tagsBody = JSON.stringify({searchTags: selectedInterests})
                break;
            case 'ownTags':
                fetchUrl = '/api/users/ownUserTags';
                break;
            case 'likedTags':
                fetchUrl = '/api/users/likedTags';
                break;
            default:
                console.error('Invalid modal context');
                return;
        }

        // Send the selected interests to the backend
        try {
            const response = await fetch(fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: tagsBody
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Successfully submitted interests');
            closeModal(); // Close the modal upon successful form submission
        } catch (error) {
            console.error("Error submitting interests:", error);
        }
    };

    return (
        <form
            className="flex flex-col max-h-[300px] p-2"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-wrap justify-center select-none mb-4 overflow-y-auto ">
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
            <button
                type="submit"
                className="border-solid text-darkgre font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mt-auto mx-auto hover:bg-coolredhl active:bg-coolreddrk sticky"
            >
                Submit
            </button>
        </form>
    );
};

export default InterestsForm;
