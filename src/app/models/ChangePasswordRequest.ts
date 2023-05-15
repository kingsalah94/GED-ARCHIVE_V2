export class ChangePasswordRequest {
  public username!: string;
  public password!: string;
  public newPassword!: string;
  public confirmNewPassword!: string;

  constructor() {
    this.username = "";
    this.password = "";
    this.newPassword = "";
    this.confirmNewPassword = "";
  }
}
