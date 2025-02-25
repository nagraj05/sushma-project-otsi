import { makeAutoObservable } from "mobx";

class UserStore {
  users = [];

  isDialogOpen = false;  // New state for dialog

  constructor() {
    makeAutoObservable(this);
  }

  addUser(user) {
    const existingUserIndex = this.users.findIndex(u => u.id === user.id);
    
    if (existingUserIndex !== -1) {
      // Update existing user
      this.users[existingUserIndex] = { ...user };
    } else {
      // Add new user
      this.users.push({ ...user });
    }
    
    // Save to localStorage
    this.saveToLocalStorage();
  }

  setDialogOpen(isOpen) {  // New method to control dialog
    this.isDialogOpen = isOpen;
  }

  deleteUser(id) {
    this.users = this.users.filter(user => user.id !== id);
    this.saveToLocalStorage();
  }

  loadUsers() {
    const savedProfiles = localStorage.getItem('userProfiles');
    const profiles = savedProfiles ? JSON.parse(savedProfiles) || {} : {}; // Ensures a valid object
  
    this.users = Object.entries(profiles).map(([id, profile]) => ({
      id,
      ...profile
    }));
  }  

  saveToLocalStorage() {
    // Convert array back to object with ID as key
    const profilesObject = this.users.reduce((acc, user) => {
      if (user && user.id) {
        acc[user.id] = {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          dob: user.dob,
          gender: user.gender,
          phoneNumber: user.phoneNumber,
          address: user.address,
          skills: user.skills,
          hasExperience: user.hasExperience,
          experience: user.experience
        };
      }
      return acc;
    }, {});
    
    localStorage.setItem('userProfiles', JSON.stringify(profilesObject));
  }

  getAllUsers() {
    return this.users;
  }
}

export const userStore = new UserStore();