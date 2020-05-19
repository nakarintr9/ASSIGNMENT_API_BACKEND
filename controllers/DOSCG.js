const config = require("../config/index");
const { Client, Status } = require("@googlemaps/google-maps-services-js");
const axiosInstance = require("axios");

exports.findXYZ = async (req, res, next) => {
  try {
    let numbers = [];
    const { startPosition, endPosition } = req.body;
    for (let index = startPosition; index <= endPosition + 1; index++) {
      numbers.push(index * index - index + 3);
    }
    return res.status(200).json({
      data: {
        x: numbers[0],
        y: numbers[1],
        z: numbers[numbers.length - 1],
        numbers: numbers,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "เกิดผิดพลาด " + error.message,
      },
    });
  }
};

exports.findBC = async (req, res, next) => {
  try {
    const { A, AplusB, AplusC } = req.body;
    let B = AplusB - A;
    let C = AplusC - A;
    return res.status(200).json({
      data: {
        B: B,
        C: C,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "เกิดผิดพลาด " + error.message,
      },
    });
  }
};

exports.findTheBestWay = async (req, res, next) => {
  try {
    const { origin, destination } = req.body;
    let baseurl = "https://maps.googleapis.com/maps/api/directions/json?";
    let param =
      "origin=" +
      origin.replace(" ","+") +
      "&destination=" +
      destination.replace(" ","+") +
      "&key=" +
      config.GOOGLE_MAPS_API_KEY;
    var request = require("request");
    var options = {
      method: "GET",
      url: 'https://maps.googleapis.com/maps/api/directions/json?origin=centralwaord&destination=SCG+Bangsue&key=AIzaSyBq1zC7Zuy5PRBq3boANPCaHfU4yQC4-nA',
      headers: {},
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      return res.status(200).json({
        data: JSON.parse(response.body),
      });
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "เกิดผิดพลาด " + error.message,
      },
    });
  }
};
