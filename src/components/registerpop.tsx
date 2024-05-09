import React, { useState } from 'react';

interface FormData {
  age: string;
  ownsPets: boolean;
  gender: string;
  roommateAgeRange: [number, number];
  preferredRoommateGender: string[];
}

interface RegisterFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    ownsPets: false,
    gender: '',
    roommateAgeRange: [18, 35],
    preferredRoommateGender: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'preferredRoommateGender') {
      const updatedGenders = formData.preferredRoommateGender.includes(value)
        ? formData.preferredRoommateGender.filter((gender) => gender !== value)
        : [...formData.preferredRoommateGender, value];
      setFormData((prevData) => ({
        ...prevData,
        preferredRoommateGender: updatedGenders,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-maincolor rounded-lg p-8 text-center relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">Register</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label className="block text-left text-white mb-2">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full border rounded-md p-2"
              placeholder="Enter your age"
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-white mb-2">
              Do you own any pets?
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="ownsPets"
                checked={formData.ownsPets}
                onChange={(e) => setFormData({ ...formData, ownsPets: e.target.checked })}
                className="form-checkbox h-5 w-5 text-darkgre accent-coolred"
              />
              <span className="ml-2 text-white">Yes, I own pets</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-left text-white mb-2">Gender:</label>
            <div className="flex justify-between">
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
          <div className="mb-4">
            <label className="block text-left text-white mb-2">Preferred Roommate Gender:</label>
            <div className="flex items-center">
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="preferredRoommateGender"
                  value="male"
                  checked={formData.preferredRoommateGender.includes('male')}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-darkgre accent-coolred"
                />

                <span className="ml-2 text-white">Male</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="preferredRoommateGender"
                  value="female"
                  checked={formData.preferredRoommateGender.includes('female')}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-darkgre accent-coolred"
                />
                <span className="ml-2 text-white">Female</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="preferredRoommateGender"
                  value="other"
                  checked={formData.preferredRoommateGender.includes('other')}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-darkgre accent-coolred"
                />
                <span className="ml-2 text-white">Other</span>
              </label>
            </div>
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
