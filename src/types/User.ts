export interface Authority {
  authority: string;
}

export interface User {
  createdAt: string | null;
  updatedAt: string | null;
  id: string;
  username: string;
  email: string;
  preferredPhoneNumber: string;
  socialSecurityNumber: string;
  role: string;
  authProvider: string | null;
  authClientName: string;
  authProviderId: string | null;
  locked: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  expired: boolean;
  authorities: Authority[];
  credentialsNonExpired: boolean;
  enabled: boolean;
}
