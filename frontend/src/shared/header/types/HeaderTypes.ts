export interface HeaderData {
  greeting: string;
  subtitle: string;
  searchPlaceholder: string;
  newTransactionText: string;
  notificationCount: number;
  userName: string;
  userAvatar: string;
}

export interface HeaderTypes {}

export interface HeaderState {
  data: HeaderData | undefined;
  isLoading: boolean;
  dropdownOpen: boolean;
}

export interface HeaderActions {
  toggleDropdown: () => void;
  closeDropdown: () => void;
  handleLogout: () => void;
}

export interface HeaderHelpers {
  logout: () => void;
}
