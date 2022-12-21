import db from "../models/index";
let createNewComment = async (inputData) => {
  return new Promise(async (resolve, reject) => {
    await db.Comment.create({
      userId: inputData.userId, 
      text: inputData.text,
      name: inputData.name,
    });

    try {
      if (!inputData) {
        resolve({
          inputdata,
          errCode: 1,
          errMessage: `Missing parameter`,
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "Save infor doctor succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewComment: createNewComment,
};
