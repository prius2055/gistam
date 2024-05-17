export interface UserSignUpData {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  // avatar: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export type UistateVariables = {
  showLoginUi: boolean;
  showSignupUi: boolean;
  showLoadingUi: boolean;
  showLoginErrorUi: boolean;
};

export interface CurrentUserDetails {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}
