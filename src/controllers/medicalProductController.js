import medicalProductService from '../services/medicalProductService';

let createMedicalProduct = async (req, res) => {
  try {
    let newMedicalProduct = await medicalProductService.createMedicalProduct(req.body);
    return res.status(200).json(newMedicalProduct);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
}

let getAllMedicalProduct = async (req, res) => {
  try {
    const medicalProducts = await medicalProductService.getAllMedicalProduct();

    return res.status(200).json(medicalProducts);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getMedicalProductById = async (req, res) => {
  try {
    let medicalProduct = await medicalProductService.getMedicalProductById(
      req.query.id,
    );
    return res.status(200).json(medicalProduct);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let updateMedicalProduct = async (req, res) => {
  try {
    let medicalPackage = await medicalProductService.updateMedicalProduct(
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

let deleteMedicalProduct = async (req, res) => {
  try {
    await medicalProductService.deleteMedicalProduct(req.query.id);
    return res.status(200).json('Delete medical product success!');
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
}

module.exports = {
  createMedicalProduct,
  getAllMedicalProduct,
  getMedicalProductById,
  updateMedicalProduct,
  deleteMedicalProduct
}