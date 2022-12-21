import express from "express";
import doctorController from "../controllers/doctorController";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import commentController from "../controllers/commentController";
import medicalPackageController from '../controllers/medicalPackageController';
import medicalProductController from '../controllers/medicalProductController'

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser); //get
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-infor-doctors", doctorController.postInforDoctor);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );
  router.delete(
    "/api/delete-schedule-doctor-by-date",
    doctorController.DeleteScheduleByDates
  );
  router.get(
    "/api/get-extra-infor-doctor-by-id",
    doctorController.getExtraInforDoctorById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );
  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );
  router.get(
    "/api/get-list-patient-for-doctor-s3",
    doctorController.getListPatientForDoctorS3
  );
  router.post("/api/send-remedy", doctorController.sendRemedy);

  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );
    router.delete("/api/deleteBooking/:id",
    patientController.deleteBooking
    )
  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.get("/api/get-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );
  router.put("/api/update-specialty", specialtyController.updateSpecialty);
  router.delete("/api/delete-specialty", specialtyController.deleteSpecialty);

  router.post("/api/create-new-clinic", clinicController.createClinic);
  router.get("/api/get-clinic", clinicController.getAllClinic);
  router.get("/api/get-clinic-by-name", clinicController.getDetailClinicByName);
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicById
  );
  router.put("/api/update-clinic", clinicController.updateClinic);
  router.delete("/api/delete-clinic", clinicController.deleteClinic);

  //comment
  router.get(
    "/api/getCommentById",
    commentController.getCommentByUserId
  );
  router.post(
    "/api/createComment",
    commentController.createNewComment
  );
    router.post("/api/allCode2",userController.getAllCodePrice)
  // Medical package router (Gói khám)
  router.post("/api/create-medical-package",medicalPackageController.createMedicalPackage);
  router.get("/api/get-all-medical-package", medicalPackageController.getAllMedicalPackage);
  router.get("/api/get-medical-package-by-id", medicalPackageController.getMedicalPackageById);
  router.put("/api/update-medical-package", medicalPackageController.updateMedicalPackage);
  router.delete("/api/delete-medical-package", medicalPackageController.deleteMedicalPackage);

  // Medical products router (Sản phẩm y tế)
  router.post("/api/create-medical-product",medicalProductController.createMedicalProduct);
  router.get("/api/get-all-medical-product", medicalProductController.getAllMedicalProduct);
  router.get("/api/get-medical-product-by-id", medicalProductController.getMedicalProductById);
  router.put("/api/update-medical-product", medicalProductController.updateMedicalProduct);
  router.delete("/api/delete-medical-product", medicalProductController.deleteMedicalProduct);

  return app.use("/", router);
};

module.exports = initWebRoutes;
