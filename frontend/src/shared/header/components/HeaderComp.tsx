'use client';

import { useHeader } from '../utils/HeaderUtils';
import {
  StyledHeaderContainer,
  StyledHeaderLeft,
  StyledGreeting,
  StyledSubtitle,
  StyledHeaderRight,
  StyledSearchInput,
  StyledSearchIcon,
  StyledPrimaryButton,
  StyledButtonText,
  StyledIconButton,
  StyledBadge,
  StyledUserDropdownWrapper,
  StyledUserButton,
  StyledUserAvatar,
  StyledUserChevron,
  StyledUserDropdown,
  StyledDropdownUserInfo,
  StyledDropdownUserName,
  StyledDropdownUserEmail,
  StyledDropdownItem,
  StyledDropdownLogoutItem,
} from '../styles/HeaderStyles';

export default function HeaderComp() {
  const { state, actions, theme } = useHeader();
  const data = state.data;

  if (!data) return null;

  return (
    <StyledHeaderContainer>
      <StyledHeaderLeft>
        <StyledGreeting>{data.greeting}</StyledGreeting>
        <StyledSubtitle>{data.subtitle}</StyledSubtitle>
      </StyledHeaderLeft>

      <StyledHeaderRight>
        <StyledSearchInput>
          <StyledSearchIcon>🔍</StyledSearchIcon>
          <input type="text" placeholder={data.searchPlaceholder} />
        </StyledSearchInput>

        <StyledPrimaryButton>
          <span>+</span>
          <StyledButtonText>{data.newTransactionText}</StyledButtonText>
          <span style={{ fontSize: 10 }}>▼</span>
        </StyledPrimaryButton>

        <StyledIconButton $hasBadge>
          🔔
          {data.notificationCount > 0 && <StyledBadge />}
        </StyledIconButton>

        <StyledIconButton>❓</StyledIconButton>

        <StyledUserDropdownWrapper>
          <StyledUserButton
            data-testid="header-user-button"
            onClick={actions.toggleDropdown}
          >
            <StyledUserAvatar theme={theme}>{data.userName.charAt(0).toUpperCase()}</StyledUserAvatar>
            <StyledUserChevron>▼</StyledUserChevron>
          </StyledUserButton>

          {state.dropdownOpen && (
            <StyledUserDropdown theme={theme} data-testid="header-user-dropdown">
              <StyledDropdownUserInfo theme={theme}>
                <StyledUserAvatar theme={theme}>{data.userName.charAt(0).toUpperCase()}</StyledUserAvatar>
                <div>
                  <StyledDropdownUserName theme={theme}>{data.userName}</StyledDropdownUserName>
                  <StyledDropdownUserEmail theme={theme}>victor@email.com</StyledDropdownUserEmail>
                </div>
              </StyledDropdownUserInfo>

              <StyledDropdownItem theme={theme} data-testid="header-profile-item">
                ⚙️ Configurações
              </StyledDropdownItem>

              <StyledDropdownLogoutItem
                theme={theme}
                data-testid="header-logout"
                onClick={actions.handleLogout}
              >
                🚪 Sair da conta
              </StyledDropdownLogoutItem>
            </StyledUserDropdown>
          )}
        </StyledUserDropdownWrapper>
      </StyledHeaderRight>
    </StyledHeaderContainer>
  );
}