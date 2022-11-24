import commentService from "../services/commentService";

let createNewComment = async (req, res) => {
  try {
    let infor = await commentService.createNewComment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

module.exports = {
  createNewComment: createNewComment,
};
