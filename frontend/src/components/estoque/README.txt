# Estoque Component Structure

## Top-Level Subdirectories:
- EstoqueConfirm/ - Confirmation dialog for item deletion
- EstoqueDetalhe/ - Detail view of specific item
- EstoqueHeader/ - Header with add new item button
- EstoqueInfo/ - Info modal
- EstoqueList/ - Item list with filtering
- EstoqueModal/ - Modal for create/edit items
- EstoqueResumo/ - Summary/resume component
- EstoqueTermometro/ - Thermometer stock visualization
- main/ - Main container component

## Main Directory (main/):
- components/EstoqueMainComp.tsx - Top-level composer
- routes/EstoqueRoutes.tsx - Route definitions
- services/EstoqueServices.tsx - API services
- styles/EstoqueMainStyles.tsx - Layout styles
- types/EstoqueTypes.tsx - Core types (EstoqueItem, EstoqueFiltros, etc.)
- utils/EstoqueUtils.tsx - State hook with filters, helpers, CRUD actions

## Architecture:
EstoqueMainComp composes all subcomponents using state from useEstoqueUtils(), passing filters, callbacks, and helper functions (formatarValor, getStatusCor, getStatusLabel) throughout the component tree.

## Key Features:
- CRUD operations via modal
- Filtering by name, category, location, status
- Stock status color coding (ok/baixo/crítico)
- Thermometer visualization showing % of minimum stock
- Sidebar layout with header
- Confirmation dialogs before deletion
- Feedback system for user notifications