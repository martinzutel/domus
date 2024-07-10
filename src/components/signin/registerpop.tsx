import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useSession } from 'next-auth/react';
import InterestModal from '../interests/interestModal';
import CheckboxGroup from '../interests/CheckboxGroup';

interface FormData {
  age: number;
  gender: string;
  about: string;
  contact: string;
  interests: string[]; // Added interests field to the form data
}

interface RegisterFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

interface Interest {
  value: string;
  label: string;
}

const interests: Interest[] = [
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
];

const RegisterForm: React.FC<RegisterFormProps> = ({ isOpen, onClose, onSubmit }) => {

  

  useEffect(() => {
    // Add the class to the body to block scrolling
    document.body.classList.add('overflow-hidden');
    
    // Cleanup function to remove the class when the component is unmounted
    return () => {
        document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    age: 18,
    gender: '',
    about: '',
    contact: '',
    interests: [], // Initialize interests in form data
  });

  const { data: session } = useSession();

  const toggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const age = parseInt(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      age,
    }));
  };

  const handleCheckedChange = (checkedValues: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      interests: checkedValues,
    }));
  };

  const submitFormData = async (formData: FormData) => {
    try {
      const response = await fetch('/api/users/loginForm', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: { ...formData, email: session?.user?.email } }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Error:', result);
        return;
      }

      console.log('Success:', result);
      onSubmit(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitFormData(formData);
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-maincolor rounded-lg p-8 text-center relative">

        <button onClick={onClose} className="absolute top-2 left-2 text-coolred">
          <RxCross2 />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-white">Register</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex-row mb-[16px]">
            <label className="block text-left text-white mb-2">Age:</label>
            <div className='flex items-center'>
              <input
                type="range"
                name="age"
                value={formData.age}
                onChange={handleAgeChange}
                min={18}
                max={99}
                className="border rounded-md p-2 accent-coolred bg-darkgre active:accent-coolredhl w-[220px]"
              />
              <input
                type="number"
                value={formData.age}
                onChange={handleAgeChange}
                min={18}
                max={99}
                className="text-white ml-2 border rounded-md p-1 w-[40px] text-center bg-transparent text-sm appearance-none"
                maxLength={2}
              />
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-left text-white mb-2">Gender:</label>
            <div className="flex justify-between gap-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-darkgre accent-coolred"
                />
                <span className="ml-2 text-white">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-darkgre accent-coolred"
                />
                <span className="ml-2 text-white">Female</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-darkgre accent-coolred"
                />
                <span className="ml-2 text-white">Other</span>
              </label>
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-left text-white mb-3">About You:</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="border rounded-md p-2 accent-coolred bg-darkgre text-white w-[100%] h-[50px] border-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-left text-white mb-2">Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="border rounded-md p-2 w-full bg-darkgre text-white"
              required
            />
          </div>

          <button
            type="button"
            onClick={toggleModal}
            className='border-solid text-darkgre font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mr-[0.7rem] font-sofia-pro hover:bg-coolredhl active:bg-coolreddrk mb-3'
          >
            Select Your Interests
          </button>

          <div className='w-full flex flex-col justify-center items-center'>
            {isModalOpen && (
                <InterestModal onClose={toggleModal}>
                    <div className="flex flex-col items-center space-y-4">
                       

                        <h1 className='text-4xl text-white font-sofia-pro'>
                          Select Your Interests:
                        </h1>
                    
                        <div className='max-h-[300px] overflow-y-auto flex items-center'>
                          <CheckboxGroup interests={interests} onCheckedChange={handleCheckedChange} />
                        </div>

                    </div>
                </InterestModal>
            )}
          </div>

          <button
            type="submit"
            className='border-solid text-darkgre font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mr-[0.7rem] font-sofia-pro hover:bg-coolredhl active:bg-coolreddrk'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
