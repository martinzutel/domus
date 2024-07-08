import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useSession } from 'next-auth/react';
import InterestModal from '../interests/interestModal';
import InterestsForm from '../interests/form';

interface FormData {
  age: number;
  gender: string;
  about: string;
  contact: string;
}

interface RegisterFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

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

  const toggleModal = (): void => {
      setIsModalOpen(!isModalOpen);
  };

  const { data: session } = useSession();

  const [formData, setFormData] = useState<FormData>({
    age: 18,
    gender: '',
    about: '',
    contact: '',
  });

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
    onSubmit(formData)
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
                  required
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
                  required
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
            onClick={toggleModal}
            className='border-solid text-darkgre font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mr-[0.7rem] font-sofia-pro hover:bg-coolredhl active:bg-coolred mb-3'
          >
            Select you interests
          </button>

          <div className='w-full flex flex-col justify-center items-center'>
            {isModalOpen && (
                <InterestModal>
                    <div className="flex flex-col items-center space-y-4">
                        <div className='w-full'>
                            <button
                                onClick={toggleModal}
                                className="top-0 left-0 px-4 py-2 text-coolred text-3xl rounded"
                            >
                                <RxCross2 />
                            </button>
                        </div>
                       

                        <h1 className='text-4xl text-white font-sofia-pro'
                        >Search through interests:</h1>
                        
                        <InterestsForm 
                        closeModal={toggleModal} 
                        modalContext="ownTags" 
                        />
                       
                    </div>
                </InterestModal>
            )}
          </div>
          

          <button type="submit" className='border-solid text-darkgre font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mr-[0.7rem] font-sofia-pro hover:bg-coolredhl active:bg-coolreddrk'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
