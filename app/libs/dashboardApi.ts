import { fetchWithErrorHandling } from "./api";

export const getDashboardOverview = () =>
  fetchWithErrorHandling('/api/dashboard/overview');

export const getTopServices = () =>
  fetchWithErrorHandling('/api/dashboard/top-services');

export const getRecentDemoRequests = () =>
  fetchWithErrorHandling('/api/dashboard/demo-requests');

export const getUnreadGrievances = () =>
  fetchWithErrorHandling('/api/dashboard/grievances');
export const getSubscriptionTrends = () =>
    fetchWithErrorHandling('/api/dashboard/subscription-trends');
  