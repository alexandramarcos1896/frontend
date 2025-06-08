// src/utils/auth.js
export const getUserIdFromToken = () => {
  const token = localStorage.getItem('access');
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = JSON.parse(atob(base64));
    return jsonPayload.user_id;
  } catch (error) {
    console.error('Failed to parse token:', error);
    return null;
  }
};
