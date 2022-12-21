import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address
      ) {
        console.log("check data: ", data);
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let token = uuidv4();
        let user = await db.User.findOrCreate({
          where: {
            email: data.email,
            firstName : data.fullName
          },
          defaults: {
            email: data.email,
            roleId: "R3",
            gender: data.selectedGender,
            address: data.address,
            firstName: data.fullName,
            phonenumber : data.phoneNumber
          },
        });

        // if (user && user[0]) {
        //   await db.Booking.findOrCreate({
        //     where: { patientId: user[0].id , date : data.date },
        //     defaults: {
        //       statusId: "S1",
        //       doctorId: data.doctorId,
        //       patientId: user[0].id,
        //       date: data.date,
        //       timeType: data.timeType,
        //       token: token,
        //     },
        //   });
        // }
        const book = await db.Booking.findOne({where : {doctorId : data.doctorId , timeType : data.timeType , date : data.date}})
        if(book){
          resolve({
            book,
            errCode: -1,
            errMessage: "Lich nay đã có người đặt",
          });
        }
        else{
          const newBooking = await db.Booking.create({
                  statusId: "S1",
                  doctorId: data.doctorId,
                  patientId: user[0].id,
                  date: data.date,
                  timeType: data.timeType,
                  token: token,
                })
                await emailService.sendSimpleEmail({
                  reciverEmail: data.email,
                  patientName: data.fullName,
                  time: data.timeString,
                  doctorName: data.doctorName,
                  language: data.language,
                  redirectLink: buildUrlEmail(data.doctorId, token),
                }); 
        
                resolve({
                  // data: book,
                  errCode: 0,
                  errMessage: "Save infor patient Success!",
                });
        }
        
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteBooking = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Booking.destroy({
        where: {
          id,
        }
      });
      resolve({
        data: id,
        errCode: 0,
        errMessage: "Save infor patient Success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        // console.log("check data: ", data);
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();

          resolve({
            errCode: 0,
            errMessage: "Save infor appointment succeed!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activated or does not exist",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
  deleteBooking: deleteBooking,
};
