import db from "../models/index";

let createMedicalProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.price ||
        !data.title ||
        !data.image ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        await db.MedicalProduct.create({
          title: data.title,
          price: data.price,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });

        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}

let getAllMedicalProduct = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const medicalProducts = await db.MedicalProduct.findAll({});

      if (!medicalProducts) {
        resolve({
          errCode: 1,
          errMessage: "Medical product not found",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "ok",
          data: medicalProducts
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getMedicalProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const medicalProduct = await db.MedicalProduct.findOne({
        where: {
          id,
        }
      });

      if (!medicalProduct) {
        resolve({
          errCode: 1,
          errMessage: "Medical product not found",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "ok",
          data: medicalProduct
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateMedicalProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const medicalProduct = await db.MedicalProduct.findOne({
        where: {
          id,
        }
      });
      if (!medicalProduct) {
        resolve({
          errCode: 1,
          errMessage: "Medical Product not found!",
        });
      } else {
        const medicalProductUpdated = await db.MedicalProduct.update({
          title: data.title,
          price: data.price,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown
        }, {
          where: {
            id,
          }
        });

        resolve({
          errCode: 0,
          errMessage: "ok",
          data: medicalProductUpdated,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteMedicalProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.MedicalProduct.destroy({
        where: {
          id,
        }
      });
      resolve({
        errCode: 0,
        errMessage: "ok",
      });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  createMedicalProduct,
  getAllMedicalProduct,
  getMedicalProductById,
  updateMedicalProduct,
  deleteMedicalProduct
}