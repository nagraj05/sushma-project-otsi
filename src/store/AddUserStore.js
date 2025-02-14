import { makeAutoObservable } from "mobx";
import moment from "moment";

class AddUserStore {
  formData = {
    id:"",
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
      'dob',
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

    if (this.formData.lastname && this.formData.firstname) {
      // Validate lastname and firstname (only alphabets allowed)
      const nameRegex = /^[A-Za-z]+$/;
      
      if (!nameRegex.test(this.formData.firstname)) {
        throw new Error('First name should contain only alphabets');
      }
      
      if (!nameRegex.test(this.formData.lastname)) {
        throw new Error('Last name should contain only alphabets');
      }
    
      const cleanedNumber = this.formData.phoneNumber.replace(/[\s\-()]/g, '');
    
      // Remove any plus sign if present
      const nationalNumber = cleanedNumber.replace(/^\+/, '');
    
      // Check for only digits
      if (!/^\d+$/.test(nationalNumber)) {
        throw new Error('Phone number should contain only digits');
      }
    
    }
    

    // DOB validation
    if (this.formData.dob) {
      const dob = moment(this.formData.dob, 'DD MMM YYYY');
      
      if (!dob.isValid()) {
        throw new Error('Date of birth is not in a valid format');
      }
      
      if (dob.isAfter(moment())) {
        throw new Error('Date of birth cannot be in the future');
      }
      
      if (dob.isBefore('1900-01-01')) {
        throw new Error('Date of birth cannot be before 1900');
      }
      
      const age = moment().diff(dob, 'years');
      if (age < 18) {
        throw new Error('You must be at least 18 years old');
      }
    }

    // Phone number validation for India
    if (this.formData.phoneNumber) {
      // Strip spaces, dashes, parentheses
      const cleanedNumber = this.formData.phoneNumber.replace(/[\s\-()]/g, '');
      
      // Remove any plus sign if present
      const nationalNumber = cleanedNumber.replace(/^\+/, '');
      
      // Check for only digits
      if (!/^\d+$/.test(nationalNumber)) {
        throw new Error('Phone number should contain only digits');
      }
      
      // Check for exactly 10 digits
      if (nationalNumber.length !== 10) {
        throw new Error('Phone number must be exactly 10 digits');
      }
      
      // Check if starts with valid Indian mobile prefix
      const firstDigit = parseInt(nationalNumber.charAt(0));
      if (![6, 7, 8, 9].includes(firstDigit)) {
        throw new Error('Mobile numbers must start with 6, 7, 8,9');
      }
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