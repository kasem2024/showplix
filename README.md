

<!-- Folder Structure -->
<!-- 
/app
  /[username]              → Public portfolio pages (dynamic)
    page.tsx

  /dashboard               → Authenticated dashboard
    layout.tsx            → Dashboard shell (sidebar, header)
    page.tsx              → Dashboard home
    /edit
      page.tsx            → Portfolio editor (form-based or visual)
    /preview
      page.tsx            → Live preview of portfolio
    /settings
      page.tsx            → Account settings

      
  /auth
    /login
      page.tsx
    /register
      page.tsx

  /api
    /auth                 → Auth routes (e.g. login/register handlers)
    /portfolio
      [username]/route.ts → Public API route
      me/route.ts         → Get logged-in user’s portfolio
      update/route.ts     → Update user portfolio

/components                → Reusable UI components
  DashboardLayout.tsx
  PortfolioTemplate.tsx

/lib
  auth.ts                 → Authentication helpers
  portfolio.ts            → Portfolio data handlers

/styles
  globals.css
  tailwind.config.ts

/middleware.ts            → Auth middleware for protected routes -->