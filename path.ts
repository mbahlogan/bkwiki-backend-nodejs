import path from "path";

export const uploadPath = path.join(process.cwd(), "/", process.env.UPLOADPATH || "")