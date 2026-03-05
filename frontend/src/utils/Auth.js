export const isAdmin = () => {
  const user = localStorage.getItem('user');
  if (!user) return false;
  try {
    const parsedUser = JSON.parse(user);
    return parsedUser.role === 'ADMIN';
  } catch {
    return false;
  }
};

export const login = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
