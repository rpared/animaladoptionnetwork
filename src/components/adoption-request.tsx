/* eslint-disable @typescript-eslint/no-explicit-any */
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
      <div className="bg-white p-6 rounded-xl shadow-xl w-full sm:w-96 md:w-1/2 lg:w-1/3 text-gray-700 overflow-auto max-h-[80vh]">
        <h2 className="text-2xl font-semibold mb-6 text-center text-violet-100">
          Adoption Request Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="flex gap-4">
            <input
              name="fname"
              type="text"
              placeholder="First Name *"
              value={formData.fname}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              name="lname"
              type="text"
              placeholder="Last Name *"
              value={formData.lname}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Contact Info */}
          <div className="flex gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone *"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* ID & Address */}
          <div>
            <input
              name="id"
              type="text"
              placeholder="ID or License Number *"
              value={formData.id}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              name="address"
              type="text"
              placeholder="Address *"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Household Size */}
          <div>
            <label className="text-gray-700 mb-1" htmlFor="householdSize">
              Number of People in the Household *
            </label>
            <input
              name="householdSize"
              type="number"
              placeholder="Household Size"
              value={formData.householdSize}
              onChange={handleChange}
              min={1}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Has Other Pets */}
          <div className="flex items-center space-x-2 text-gray-700">
            <input
              name="hasOtherPets"
              type="checkbox"
              checked={formData.hasOtherPets}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <span>The adopter has other pets</span>
          </div>

          {/* Salary Range */}
          <div>
            <label className="text-gray-700 mb-1" htmlFor="salaryRange">
              Salary Range *
            </label>
            <select
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled>Select Yearly Salary Range</option>
              <option value="Below $30,000">Below $30,000</option>
              <option value="$30,000 - $50,000">$30,000 - $50,000</option>
              <option value="$50,000 - $80,000">$50,000 - $80,000</option>
              <option value="Above $80,000">Above $80,000</option>
            </select>
          </div>

          {/* Personal Reference */}
          <div>
            <input
              name="personalReference"
              type="text"
              placeholder="Personal Reference *"
              value={formData.personalReference}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              name="personalReferencePhone"
              type="tel"
              placeholder="Personal Reference Phone *"
              value={formData.personalReferencePhone}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-violet-100 text-white rounded-lg hover:bg-violet-70 transition"
            >
              Submit Request
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition"
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
