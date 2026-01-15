import bcrypt from "bcrypt";

export const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw new Error(err.message);
        resolve(hash);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const comparePassword = (pwd1: string, pwd2: string) => {
  return bcrypt.compareSync(pwd1, pwd2);
};

export const decryptData = (data: any) => {
  // Placeholder 
  return data;
};

export const decryptRequestPayload = (payload: any) => {
  // Placeholder returning object with data property as expected by usage
  return { data: payload };
};
