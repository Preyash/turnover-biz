export const setUser = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("user", JSON.stringify(data));
  }
};

export const getUser = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem("user"));
  }
};

export const fakeLogout = () => {
  if (typeof window !== 'undefined') {
    const data = JSON.parse(localStorage.getItem("user"));
    data.loggedIn = false;
    localStorage.setItem("user", JSON.stringify(data));
  }
};

export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem("user")
    return !!JSON.parse(user)?.loggedIn;
  }
};
