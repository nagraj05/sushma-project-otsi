import { makeAutoObservable } from "mobx";

class UserStore {
  users = [];

  constructor() {
    makeAutoObservable(this);
  }

  deleteUser(email) {
    this.users = this.users.filter(user => user.email !== email);
    if (this.users.length > 0) {
      localStorage.setItem('userProfile', JSON.stringify(this.users[0]));
    } else {
      localStorage.removeItem('userProfile');
    }
  }

  loadUsers() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      this.users = [JSON.parse(savedProfile)];
    }
  }
}

export const userStore = new UserStore();