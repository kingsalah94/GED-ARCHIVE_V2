export class User {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  profileImageUrl: string;
  lastLoginDate: Date;
  lastLoginDateDisplay: Date;
  joinDate: Date;
  role: string;
  authorities: string[];
  active: boolean;
  notLocked: boolean;

  constructor(
    id: number,
    userId: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
    profileImageUrl: string,
    lastLoginDate: Date,
    lastLoginDateDisplay: Date,
    joinDate: Date,
    role: string,
    authorities: string[],
    active: boolean,
    notLocked: boolean
  ) {
    this.id = id;
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.email = email;
    this.profileImageUrl = profileImageUrl;
    this.lastLoginDate = lastLoginDate;
    this.lastLoginDateDisplay = lastLoginDateDisplay;
    this.joinDate = joinDate;
    this.role = role;
    this.authorities = authorities;
    this.active = active;
    this.notLocked = notLocked;
  }
}
