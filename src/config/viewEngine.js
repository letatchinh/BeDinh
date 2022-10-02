// var khai bao kieu global(ko kiem xoat dc tham so)
// let chi trong pham vi 1 file
import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public"))
    app.set("view engine", "ejs");
    app.set("views", "./src/views")
}

module.exports = configViewEngine;