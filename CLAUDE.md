# Sonattatrip - Project Guidance

## Project Overview
Sonattatrip is a production-ready SaaS travel planning application built with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, and Supabase.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (Email + Google OAuth)
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Maps**: Leaflet + OpenStreetMap
- **Animations**: Framer Motion

## Project Structure

### App Router Structure
```
src/app/
├── (auth)/           # Auth pages (login, register, etc.)
├── (dashboard)/      # Protected dashboard pages
│   ├── dashboard/    # Main dashboard
│   ├── trips/        # Trip management
│   ├── expenses/     # Expense tracking
│   ├── destinations/ # Destination explorer
│   ├── favorites/    # Saved favorites
│   ├── analytics/     # Analytics dashboard
│   ├── notifications/ # Notifications
│   ├── profile/       # User profile
│   ├── settings/      # App settings
│   └── admin/         # Admin dashboard
├── api/              # API routes
└── page.tsx          # Landing page
```

### Components
- `components/ui/` - shadcn/ui base components
- `components/forms/` - Form components
- `components/layout/` - Layout components (sidebar, header)

### Database Tables
- `profiles` - User profiles
- `trips` - Trip data
- `trip_members` - Trip collaborators
- `expenses` - Expense records
- `itineraries` - Daily itinerary items
- `packing_lists` - Packing items
- `destinations` - Destination database
- `favorites` - User favorites
- `notifications` - User notifications
- `budget_allocations` - Budget per category
- `user_preferences` - User settings

## Important Notes

### When Implementing New Features
1. Always use TypeScript strict mode
2. Use shadcn/ui components when available
3. Follow the existing folder structure
4. Add proper validation with Zod
5. Implement RLS policies in Supabase

### Supabase Setup
1. Run migrations from `supabase/migrations/`
2. Enable RLS on all tables
3. Create proper policies for user isolation
4. Setup storage buckets for receipts

### Environment Variables
Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_OPENWEATHER_API_KEY`

### Common Commands
```bash
npm run dev          # Start development
npm run build        # Build for production
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript check
```

## Implementation Priority

### Phase 1 - Core (Done)
- [x] Project setup
- [x] UI components (shadcn/ui)
- [x] Authentication (login, register)
- [x] Dashboard layout
- [x] Basic trip CRUD

### Phase 2 - Features
- [ ] Trip detail page with tabs
- [ ] Expense tracker
- [ ] Itinerary planner
- [ ] Packing list
- [ ] Destination explorer with map

### Phase 3 - Advanced
- [ ] Analytics dashboard
- [ ] PDF export
- [ ] Notifications system
- [ ] Real-time collaboration

### Phase 4 - Polish
- [ ] Admin dashboard
- [ ] Mobile optimization
- [ ] Performance optimization
- [ ] Accessibility audit
