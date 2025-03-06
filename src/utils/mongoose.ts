import mongoose from "mongoose";
import env from "@/utils/env";

export async function mongoConnect() {
  return mongoose
    .connect(env.MONGO_URI)
    .then(() => {
      console.log("[mongoose]: connected to mongodb");
    })
    .catch((err) => {
      console.log(err);
    });
}
