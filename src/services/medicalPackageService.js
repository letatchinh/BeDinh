import db from "../models/index";

let createMedicalPackage = (data) => {
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
        await db.MedicalPackage.create({
          title: data.title,
          address: data.address,
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

let getAllMedicalPackage = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const medicalPackages = await db.MedicalPackage.findAll({});

      if (!medicalPackages) {
        resolve({
          errCode: 1,
          errMessage: "Medical package not found",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "ok",
          data: medicalPackages
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getMedicalPackageById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const medicalPackage = await db.MedicalPackage.findOne({
        where: {
          id,
        }
      });

      if (!medicalPackage) {
        resolve({
          errCode: 1,
          errMessage: "Medical package not found",
        });
      } else {
        resolve({
          errCode: 0,
          errMessage: "ok",
          data: medicalPackage
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateMedicalPackage = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const medicalPackage = await db.MedicalPackage.findOne({
        where: {
          id,
        }
      });
      if (!medicalPackage) {
        resolve({
          errCode: 1,
          errMessage: "Specialty not found!",
        });
      } else {
        const medicalPackageUpdated = await db.MedicalPackage.update({
          title: data.title,
          address: data.address,
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
          data: medicalPackageUpdated,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteMedicalPackage = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.MedicalPackage.destroy({
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
  getAllMedicalPackage,
  getMedicalPackageById,
  createMedicalPackage,
  updateMedicalPackage,
  deleteMedicalPackage
}