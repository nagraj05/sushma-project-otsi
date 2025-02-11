import { makeAutoObservable } from "mobx";

class EmployeeStore {
  profileData = {
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

  constructor() {
    makeAutoObservable(this);
    this.loadProfile();
  }

  loadProfile() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      this.profileData = JSON.parse(savedProfile);
    }
  }

  updateProfile(newData) {
    this.profileData = { ...this.profileData, ...newData };
    localStorage.setItem('userProfile', JSON.stringify(this.profileData));
  }


  get hasExperienceField() {
    return this.profileData.hasExperience === "yes";
  }

}

const employeeStore = new EmployeeStore();
export default employeeStore;