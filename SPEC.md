# Todo App Technical Specification

## Overview
A modern Todo application built with React, TypeScript, and Supabase, featuring user authentication and real-time updates.

## Architecture

### Frontend Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Redux Toolkit + RTK Query
- **UI Library**: Material-UI (MUI)
- **Type System**: TypeScript
- **Testing**: Jest + React Testing Library

### Backend/Database
- **Platform**: Supabase
- **Features**:
  - User Authentication
  - Real-time updates
  - Row Level Security (RLS)
  - PostgreSQL Database

## Core Features

### Authentication
- Email/Password authentication via Supabase Auth
- Persistent sessions
- Protected routes and API endpoints
- Login/Logout functionality

### Todo Management
- CRUD operations for todos
- Real-time updates across clients
- Filtering (All/Active/Completed)
- Clear completed todos
- Todo count tracking

### Data Model

```typescript
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  user_id: string;
  created_at: string;
}

interface User {
  id: string;
  email: string;
}
```

### Component Structure
```
src/
├── components/
│   ├── TodoApp/
│   │   ├── index.tsx       # Main todo container
│   │   ├── TodoItem.tsx    # Individual todo item
│   │   ├── TodoInput.tsx   # New todo input
│   │   └── TodoFooter.tsx  # Filters and actions
│   ├── Header.tsx          # App header with auth
│   └── Login.tsx           # Login dialog
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── store/
│   ├── api/
│   │   └── todoApi.ts      # RTK Query API
│   ├── filterSlice.ts      # Filter state
│   └── todoSelectors.ts    # State selectors
└── lib/
    └── supabase.ts         # Supabase client
```

### API Endpoints

#### Todos
```typescript
// Get todos
GET /todos
- Requires: Authentication
- Returns: Todo[]
- Filters: user_id (RLS)

// Add todo
POST /todos
- Requires: Authentication, { title: string }
- Returns: Todo
- Sets: user_id automatically

// Toggle todo
PATCH /todos/:id
- Requires: Authentication, Todo ID
- Updates: completed status
- Returns: Updated Todo

// Delete todo
DELETE /todos/:id
- Requires: Authentication, Todo ID
- Returns: Success status

// Edit todo
PATCH /todos/:id
- Requires: Authentication, Todo ID, { title: string }
- Returns: Updated Todo

// Clear completed
DELETE /todos
- Requires: Authentication
- Deletes: All completed todos for user
```

### State Management
```typescript
interface RootState {
  filter: {
    value: 'all' | 'active' | 'completed'
  };
  [todoApi.reducerPath]: TodoApiState;
}
```

### Environment Variables
```
VITE_SUPABASE_URL=<supabase-project-url>
VITE_SUPABASE_ANON_KEY=<supabase-anon-key>
```

### Testing Strategy
- Unit tests for components
- Integration tests for API calls
- Mock Supabase client for tests
- Test user interactions and state changes

#### Test Structure
```
src/
├── __tests__/                    # Test files
│   ├── components/               # Component tests
│   │   ├── TodoApp.test.tsx
│   │   ├── TodoItem.test.tsx
│   │   └── Login.test.tsx
│   └── store/                    # Store tests
│       └── api/
│           └── todoApi.test.ts
├── __mocks__/                    # Mock files
│   └── @/lib/
│       └── supabase.ts          # Supabase client mock
```

#### Test Coverage
- Components: UI rendering, user interactions
- Store: API calls, state updates
- Auth: Login/logout flows
- Error handling

### Database Schema

#### Tables
```sql
-- Todos table
create table todos (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  completed boolean default false,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()),
);

-- Row Level Security (RLS) Policies
create policy "Users can view their own todos" on todos
  for select using (auth.uid() = user_id);

create policy "Users can create their own todos" on todos
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own todos" on todos
  for update using (auth.uid() = user_id);

create policy "Users can delete their own todos" on todos
  for delete using (auth.uid() = user_id);
```

### Error Handling
```typescript
interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

-- Common error scenarios
- 401: Unauthorized (not logged in)
- 403: Forbidden (no permission)
- 404: Todo not found
- 500: Server error
```

### Security Considerations
- Environment variables for sensitive data
- Row Level Security in Supabase
- User authentication required for all operations
- CORS configuration
- XSS prevention via MUI

### Performance Optimizations
- RTK Query caching
- Optimistic updates
- Debounced input
- Memoized selectors
- Lazy loading components

### Deployment
- Platform: Vercel
- Environment: Production
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables: Configured in Vercel dashboard 