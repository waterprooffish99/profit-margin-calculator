/**
 * Environment Detection Utility
 * 
 * Used to identify if the application is running on a local development server
 * (localhost or 127.0.0.1) or in a production environment (such as Vercel).
 */

export const IS_DEV = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' || 
   window.location.hostname.startsWith('192.168.'));
