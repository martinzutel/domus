import React, { useState } from 'react';

import { RxCross2 } from "react-icons/rx";

interface FormData {
  age: number;
  gender: string;
  about: string;  
}

interface RegisterFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ isOpen, onClose, onSubmit }) => {

  const [formData, setFormData] = useState<FormData>({
    age: 18,
    gender: '',
    about: '',
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

      <div className="bg-maincolor rounded-lg p-8 text-center relative">

        <button onClick={onClose} className="absolute top-2 left-2 text-coolred ">
          <RxCross2 />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-white">Register</h2>

        <form onSubmit={handleSubmit} className="mb-4">

          {/* AGE PART */}

          <div className=" flex-row mb-[16px]">
            
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
                className="text-white ml-2 border rounded-md p-1 w-[40px] text-center bg-transparent text-sm appearance-none  "
                maxLength={2}
              />

            </div>

          </div>

       
           
          {/* GENDER PART */}

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
            <label className="block text-left text-white mb-3" >About You:</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="border rounded-md p-2 accent-coolred bg-darkgre text-white w-[100%] h-[50px] border-none"
            />
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
