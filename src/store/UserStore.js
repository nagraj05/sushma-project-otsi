import { makeAutoObservable } from "mobx";

class UserStore {
  users = [];

  constructor() {
    makeAutoObservable(this);
  }

  addUser(user) {
    this.users.push(user);
    localStorage.setItem('userProfiles', JSON.stringify(this.users));
  }

  deleteUser(email) {
    this.users = this.users.filter(user => user.email !== email);
    localStorage.setItem('userProfiles', JSON.stringify(this.users));
  }

  loadUsers() {
    const savedProfiles = localStorage.getItem('userProfiles');
    if (savedProfiles) {
      this.users = JSON.parse(savedProfiles);
    }
  }
}

export const userStore = new UserStore();