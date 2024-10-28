export const saveUser = (email: string, hashedPassword: string) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push({ email, password: hashedPassword });
  localStorage.setItem("users", JSON.stringify(users));
};

export const deleteUser = (email: string) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const updatedUsers = users.filter(
    (user: { email: string; password: string }) => user.email !== email
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

export const getUser = (email: string) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.find((user: { email: string }) => user.email === email);
};

export const getContactsByUser = (email: string) => {
  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  return contacts[email] || [];
};

export const getInfoUser = () => {
  const email = localStorage.getItem("loggedInUser");
  return typeof email === "string" ? email : "";
};

export const setLoggedInUser = (email: string) => {
  localStorage.setItem("loggedInUser", email);
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("loggedInUser");
};

export const logoutUser = () => {
  localStorage.removeItem("loggedInUser");
};
