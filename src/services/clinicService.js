import db, { Sequelize } from "../models/index";
const Op = Sequelize.Op;
let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
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
};

let getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "ok",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getClinicByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataClinic = await db.Clinic.findAll({
        where: {
          name: { [Op.like]: "%" + name.toLowerCase().trim() + "%" },
        },
      });
      let dataSpecialty = await db.Specialty.findAll({
        where: {
          name: { [Op.like]: "%" + name.toLowerCase().trim() + "%" },
        },
      });
      let dataUser = await db.User.findAll({
        where: {
          [Op.and]: [
            {
              roleId: "R2",
              [Op.or]: [
                {
                  firstName: {
                    [Op.like]: "%" + name.toLowerCase().trim() + "%",
                  },
                },
                {
                  lastName: {
                    [Op.like]: "%" + name.toLowerCase().trim() + "%",
                  },
                },
              ],
            },
          ],
        },
      });
      const data = [...dataClinic, ...dataSpecialty, ...dataUser];
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "ok",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });

        if (data) {
          let doctorClinic = [];
          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });
          data.doctorClinic = doctorClinic;
        } else data = {};

        resolve({
          errCode: 0,
          errMessage: "ok",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateClinic = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const clinic = await db.Clinic.findOne({
        where: {
          id,
        }
      });
      if (!clinic) {
        resolve({
          errCode: 1,
          errMessage: "clinic not found!",
        });
      } else {
        const clinicUpdated = await db.Clinic.update({
          name: data.name,
          address: data.image,
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
          data: clinicUpdated,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteClinic = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Clinic.destroy({
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
};

module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
  getClinicByName:getClinicByName,
  updateClinic: updateClinic,
  deleteClinic: deleteClinic
};
