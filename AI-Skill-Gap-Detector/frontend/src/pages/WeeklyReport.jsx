import React from "react";
import { Navigate } from "react-router-dom";

// Keeps old bookmarked links working after the weekly summary moved into Progress.
export default function WeeklyReport() {
  return <Navigate to="/progress#weekly-insights" replace />;
}
