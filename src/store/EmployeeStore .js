import { makeAutoObservable } from "mobx";

class EmployeeStore {
  profileData = {
    id:"",
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    address: "",
    skills: "",
    experience: "",
    hasExperience: "",
  };

  isDialogOpen = false;  // New state for dialog
  hasUserData = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadProfile(userId) {
    const profiles = JSON.parse(localStorage.getItem('userProfiles')) || {};
    if (profiles[userId]) {
      this.profileData = profiles[userId];
      this.hasUserData = true;
    } else {
      this.clearProfileData();
      this.hasUserData = false;
    }
  }

  updateProfile(newData, userId) {
    if (!userId) return;

    const profiles = JSON.parse(localStorage.getItem('userProfiles')) || {};
    profiles[userId] = { ...newData };
    localStorage.setItem('userProfiles', JSON.stringify(profiles));
    this.profileData = profiles[userId];
    this.hasUserData = true;
  }

  setDialogOpen(isOpen) {  // New method to control dialog
    this.isDialogOpen = isOpen;
  }


clearProfileData() {
    const emptyProfile = {
      id:"",
      firstname: "",
      lastname: "",
      email: "",
      dob: "",
      gender: "",
      phoneNumber: "",
      address: "",
      skills: "",
      experience: "",
      hasExperience: ""
    };
    this.updateProfile(emptyProfile);  // Using the existing updateProfile method
    this.hasUserData = false;  // Using the existing updateProfile method
  }

  get hasExperienceField() {
    return this.profileData.hasExperience === "yes";
  }
}

const employeeStore = new EmployeeStore();
export default employeeStore;