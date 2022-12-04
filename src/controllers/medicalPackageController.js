import medicalPackageService from '../services/medicalPackageService';

let createMedicalPackage = async (req, res) => {
  try {
    let newMedicalPackage = await medicalPackageService.createMedicalPackage(req.body);
    return res.status(200).json(newMedicalPackage);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
}

let getAllMedicalPackage = async (req, res) => {
  try {
    const medicalPackages = await medicalPackageService.getAllMedicalPackage();

    return res.status(200).json(medicalPackages);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getMedicalPackageById = async (req, res) => {
  try {
    let medicalPackage = await medicalPackageService.getMedicalPackageById(
      req.query.id,
    );
    return res.status(200).json(medicalPackage);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let updateMedicalPackage = async (req, res) => {
  try {
    let medicalPackage = await medicalPackageService.updateMedicalPackage(
      req.query.id,
      req.body
    );
    return res.status(200).json(medicalPackage);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let deleteMedicalPackage = async (req, res) => {
  try {
    await medicalPackageService.deleteMedicalPackage(req.query.id);
    return res.status(200).json('Delete medical package success!');
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
}

module.exports = {
  createMedicalPackage,
  getAllMedicalPackage,
  getMedicalPackageById,
  updateMedicalPackage,
  deleteMedicalPackage
}

