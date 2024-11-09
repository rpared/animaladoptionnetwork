/* eslint-disable @typescript-eslint/no-explicit-any */
// components/FormComponent.tsx
import React, { useState } from "react";

interface FormData {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  id: string;
  address: string;
  householdSize: number;
  hasOtherPets: boolean;
  salaryRange: string;
  personalReference: string;
  personalReferencePhone: string;
}

interface AdoptionRequestFormProps {
  closeModal: () => void;
  onSubmitForm: (data: Record<string, any>) => Promise<void>;
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
    id: "",
    address: "",
    householdSize: 1,
    hasOtherPets: false,
    salaryRange: "",
  personalReference: "",
  personalReferencePhone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
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
        <h2 className="text-lg font-semibold mb-4">Fill the Form with the adopter data</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fname"
            type="text"
            placeholder="First Name *"
            value={formData.fname}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="lname"
            type="text"
            placeholder="Last Name *"
            value={formData.lname}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone *"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="id"
            type="text"
            placeholder="Id or licence number *"
            value={formData.id}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="address"
            type="text"
            placeholder="Address *"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <label className="block">
          <span className="text-gray-700">Number of People in your Household *</span>
          <input
            name="householdSize"
            type="number"
            placeholder="Number of People in your Household"
            value={formData.householdSize}
            onChange={handleChange}
            min={1}
            required
            className="w-full p-2 border rounded"
          />
          </label>
          
          <label className="flex items-center">
            <input
              name="hasOtherPets"
              type="checkbox"
              checked={formData.hasOtherPets}
              onChange={handleChange}
              className="mr-2"
            />
            I Have Other Pets
          </label>
          <label className="block">
              <span className="text-gray-700">Salary Range *</span>
              <select
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded mt-1"
              >
                <option value="" disabled>Select Yearly Salary Range</option>
                <option value="Below $30,000">Below $30,000</option>
                <option value="$30,000 - $50,000">$30,000 - $50,000</option>
                <option value="$50,000 - $80,000">$50,000 - $80,000</option>
                <option value="Above $80,000">Above $80,000</option>
              </select>
            </label>
        <input
          name="personalReference"
          type="text"
          placeholder="Personal Reference *"
          value={formData.personalReference}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="personalReferencePhone"
          type="tel"
          placeholder="Personal Reference Phone *"
          value={formData.personalReferencePhone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

          <div className="flex justify-center space-x-2">
          <button
              type="submit"
              className="px-4 py-2 bg-violet-100 text-white rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionRequestForm;
