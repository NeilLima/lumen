export const theme = {
  // Background colors
  bgPrimary: '#0f0f1a',
  bgSecondary: '#1a1a2e',
  bgTertiary: '#252542',
  bgCard: 'rgba(26, 26, 46, 0.8)',
  bgNavbar: '#0a0a14',
  bgSidebar: '#12121f',
  bgHover: 'rgba(139, 92, 246, 0.1)',
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#a0a0b0',
  textMuted: '#6b6b7b',
  textAccent: '#8b5cf6',
  
  // Brand colors
  primary: '#8b5cf6',
  primaryLight: '#a78bfa',
  primaryDark: '#7c3aed',
  primaryGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
  
  // Semantic colors
  success: '#10b981',
  successLight: '#34d399',
  successBg: 'rgba(16, 185, 129, 0.1)',
  
  danger: '#ef4444',
  dangerLight: '#f87171',
  dangerBg: 'rgba(239, 68, 68, 0.1)',
  
  warning: '#f59e0b',
  warningLight: '#fbbf24',
  warningBg: 'rgba(245, 158, 11, 0.1)',
  
  info: '#3b82f6',
  infoLight: '#60a5fa',
  infoBg: 'rgba(59, 130, 246, 0.1)',
  
  // Category colors
  categoryPurple: '#8b5cf6',
  categoryGreen: '#10b981',
  categoryOrange: '#f59e0b',
  categoryBlue: '#3b82f6',
  categoryRed: '#ef4444',
  categoryGray: '#6b7280',
  
  // Borders
  borderColor: 'rgba(255, 255, 255, 0.05)',
  borderColorHover: 'rgba(255, 255, 255, 0.1)',
  
  // Shadows
  shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
  shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
  shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
  shadowGlow: '0 0 20px rgba(139, 92, 246, 0.3)',
  
  // Typography
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  
  // Spacing
  sidebarWidth: '260px',
  navbarHeight: '64px',
  
  // Border radius
  radiusSm: '6px',
  radiusMd: '8px',
  radiusLg: '12px',
  radiusXl: '16px',
  radiusFull: '9999px',
  
  // Transitions
  transitionFast: '150ms',
  transitionBase: '200ms',
  transitionSlow: '300ms',
  
  // Z-index
  zIndexSidebar: 100,
  zIndexNavbar: 200,
  zIndexModal: 1000,

  // Sidebar accents (values mirror the previous hard-coded colors so other pages stay identical)
  navSectionColor: '#6b6b7b',
  navActiveBg: 'rgba(16, 185, 129, 0.1)',
  navActiveColor: '#10b981',
  brandGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
};

export type Theme = typeof theme;

/**
 * Neon "CRM" theme (magenta + cyan) used ONLY on the dashboard.
 * Spreading the base theme keeps the shape/type identical to `Theme`.
 */
export const dashboardTheme: Theme = {
  ...theme,

  // Backgrounds (mesmos tons escuros da página de despesas: #0a0a14 → #12121f)
  bgPrimary: '#0a0a14',
  bgSecondary: '#12121f',
  bgTertiary: '#1a1a2e',
  bgCard: 'rgba(26, 26, 46, 0.8)',
  bgNavbar: '#0a0a14',
  bgSidebar: '#12121f',
  bgHover: 'rgba(139, 92, 246, 0.1)',

  // Text (mesmos tons da página de despesas)
  textPrimary: '#ffffff',
  textSecondary: '#a0a0b0',
  textMuted: '#6b6b7b',
  textAccent: '#8b5cf6',

  // Brand (roxo/índigo da página de despesas)
  primary: '#8b5cf6',
  primaryLight: '#a78bfa',
  primaryDark: '#7c3aed',
  primaryGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',

  // Semantic (cores de status da página de despesas)
  success: '#10b981',
  successLight: '#34d399',
  successBg: 'rgba(16, 185, 129, 0.1)',

  danger: '#ef4444',
  dangerLight: '#f87171',
  dangerBg: 'rgba(239, 68, 68, 0.1)',

  warning: '#f59e0b',
  warningLight: '#fbbf24',
  warningBg: 'rgba(245, 158, 11, 0.1)',

  info: '#3b82f6',
  infoLight: '#60a5fa',
  infoBg: 'rgba(59, 130, 246, 0.1)',

  // Category colors (mesmas da página de despesas)
  categoryPurple: '#8b5cf6',
  categoryGreen: '#10b981',
  categoryOrange: '#f59e0b',
  categoryBlue: '#3b82f6',
  categoryRed: '#ef4444',
  categoryGray: '#6b7280',

  // Borders (mesmo tom da página de despesas)
  borderColor: 'rgba(255, 255, 255, 0.05)',
  borderColorHover: 'rgba(255, 255, 255, 0.1)',

  // Shadows (glow roxo da página de despesas)
  shadowGlow: '0 0 20px rgba(139, 92, 246, 0.3)',

  // Sidebar accents (cores da página de despesas)
  navSectionColor: '#6b6b7b',
  navActiveBg: 'rgba(16, 185, 129, 0.1)',
  navActiveColor: '#10b981',
  brandGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
};