import { makeAutoObservable } from "mobx";

class AddUserStore {
  formData = {
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    address: "",
    skills: "",
    hasExperience: "",
    experience: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  // Update individual form fields
  setField(field, value) {
    this.formData[field] = value;
  }

  // Update multiple fields at once
  updateFormData(data) {
    Object.assign(this.formData, data);
  }

  // Reset form to initial state
  resetForm() {
    this.formData = {
      firstname: "",
      lastname: "",
      email: "",
      dob: "",
      gender: "",
      phoneNumber: "",
      address: "",
      skills: "",
      hasExperience: "",
      experience: "",
    };
  }



  // Validate form data
  validateForm() {
    const required = [
      'firstname',
      'lastname',
      'email',
      'gender',
      'phoneNumber',
      'address',
      'skills',
      'hasExperience'
    ];

    const missingFields = required.filter(field => !this.formData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    if (this.formData.hasExperience === 'yes' && !this.formData.experience) {
      throw new Error('Experience details are required when has experience is set to yes');
    }

    // Add email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      throw new Error('Invalid email format');
    }

    return true;
  }
}

export const addUserStore = new AddUserStore();