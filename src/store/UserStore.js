import { makeAutoObservable } from "mobx";

class UserStore {
  users = [];

  constructor() {
    makeAutoObservable(this);
    // Load existing users when store is initialized
    this.loadUsers();
  }

  addUser(user) {
    // Check if user already exists
    const existingUserIndex = this.users.findIndex(u => u.email === user.email);
    
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

  deleteUser(email) {
    this.users = this.users.filter(user => user.email !== email);
    this.saveToLocalStorage();
  }

  loadUsers() {
    const savedProfiles = localStorage.getItem('userProfiles');
    if (savedProfiles) {
      this.users = JSON.parse(savedProfiles);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('userProfiles', JSON.stringify(this.users));
  }

  getAllUsers() {
    return this.users;
  }
}

export const userStore = new UserStore();