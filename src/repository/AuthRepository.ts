import db from "../config/ConnectDb";

export const QueryUserByEmail = async (userEmail: string) => {
  return db.user.findFirst({
    where: {
      email: userEmail,
    },
  });
};

export const CreateUser = async (nameInput: string, emailInput: string) => {
  const user = await db.user.create({
    data: {
      name: nameInput,
      email: emailInput,
    },
  });

  return user;
};

export const QueryAllUsers = async () => {
  const users = db.user.findMany();

  return users;
};
