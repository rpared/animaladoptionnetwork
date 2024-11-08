// components/FormComponent.tsx
import React, { useState } from "react";

interface FormData {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  address: string;
  householdSize: number;
  hasOtherPets: boolean;
}

interface AdoptionRequestFormProps {
  closeModal: () => void;
  onSubmitForm: (data: unknown) => void;
}

const AdoptionRequestForm: React.FC<AdoptionRequestFormProps> = (
  props: AdoptionRequestFormProps
) => {
  const { closeModal, onSubmitForm } = props;
  const [formData, setFormData] = useState<FormData>({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    householdSize: 1,
    hasOtherPets: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitForm(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Fill the Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fname"
            type="text"
            placeholder="First Name"
            value={formData.fname}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="lname"
            type="text"
            placeholder="Last Name"
            value={formData.lname}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="address"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="householdSize"
            type="number"
            placeholder="Household Size"
            value={formData.householdSize}
            onChange={handleChange}
            min={1}
            required
            className="w-full p-2 border rounded"
          />
          <label className="flex items-center">
            <input
              name="hasOtherPets"
              type="checkbox"
              checked={formData.hasOtherPets}
              onChange={handleChange}
              className="mr-2"
            />
            Has Other Pets
          </label>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionRequestForm;
