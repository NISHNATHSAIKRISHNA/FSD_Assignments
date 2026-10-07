// AFTER SPLIT: route-based code splitting + prefetch on intent + error boundary
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shell from "./Shell";
import PageSkeleton from "./PageSkeleton";
import ErrorBoundary from "./ErrorBoundary";

const loaders = {
  "/": () => import("./pages/Dashboard"),
  "/reports": () => import("./pages/Reports"),
  "/settings": () => import("./pages/Settings"),
  "/admin": () => import("./pages/Admin"),
};

const Dashboard = lazy(loaders["/"]);
const Reports = lazy(loaders["/reports"]);
const Settings = lazy(loaders["/settings"]);
const Admin = lazy(loaders["/admin"]);

// Prefetch a route chunk when the user shows intent, unless Save-Data is on.
const prefetch = (path) => {
  if (navigator.connection?.saveData) return;
  loaders[path]?.();
};

export default function App() {
  return (
    <BrowserRouter>
      <Shell onIntent={prefetch}>
        <ErrorBoundary>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Shell>
    </BrowserRouter>
  );
}
