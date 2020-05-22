const config = require("../config/index");
const { Client, Status } = require("@googlemaps/google-maps-services-js");
const axiosInstance = require("axios");

exports.findXYZ = async (req, res, next) => {
  try {
    let numbers = [];
    const { startPosition, endPosition } = req.body;
    let start = parseInt(startPosition);
    let end = parseInt(endPosition);
    for (let index = start; index <= end + 1; index++) {
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
    var request = require("request");
    var options = {
      method: "POST",
      url: "http://localhost:9000/DOSCG/findTheBestWay",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin:
          "เซ็นทรัลเวิลด์+999%2F9+ถนน+พระรามที่+๑+แขวง+ปทุมวัน+เขตปทุมวัน+กรุงเทพมหานคร+10330",
        destination:
          "SCG+สำนักงานใหญ่+บางซื่อ+1+ซอย+ปูนซีเมนต์ไทย+แขวง+บางซื่อ+เขตบางซื่อ+กรุงเทพมหานคร+10800",
      }),
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      return res.status(200).json({
        data: mockWay,
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
  
const mockWay = {
  "geocoded_waypoints": [
     {
        "geocoder_status": "OK",
        "place_id": "ChIJ4VX0ws-e4jARBGaQ2IACrcQ",
        "types": [
           "establishment",
           "point_of_interest",
           "shopping_mall"
        ]
     },
     {
        "geocoder_status": "OK",
        "place_id": "ChIJe5WIpnOc4jARoEQ-IqXo9HA",
        "types": [
           "establishment",
           "point_of_interest"
        ]
     }
  ],
  "routes": [
     {
        "bounds": {
           "northeast": {
              "lat": 13.8059442,
              "lng": 100.550221
           },
           "southwest": {
              "lat": 13.7428959,
              "lng": 100.5319349
           }
        },
        "copyrights": "Map data ©2020 Google",
        "legs": [
           {
              "distance": {
                 "text": "11.1 km",
                 "value": 11067
              },
              "duration": {
                 "text": "20 mins",
                 "value": 1228
              },
              "end_address": "1 Siam Cement Alley, Khwaeng Bang Sue, Khet Bang Sue, Krung Thep Maha Nakhon 10800, Thailand",
              "end_location": {
                 "lat": 13.8059442,
                 "lng": 100.5373727
              },
              "start_address": "999/9 Rama I Rd, Khwaeng Pathum Wan, Khet Pathum Wan, Krung Thep Maha Nakhon 10330, Thailand",
              "start_location": {
                 "lat": 13.7464548,
                 "lng": 100.5405057
              },
              "steps": [
                 {
                    "distance": {
                       "text": "0.2 km",
                       "value": 193
                    },
                    "duration": {
                       "text": "1 min",
                       "value": 59
                    },
                    "end_location": {
                       "lat": 13.7447333,
                       "lng": 100.540297
                    },
                    "html_instructions": "Head <b>south</b> on <b>ถนน ราชดำริ</b>",
                    "polyline": {
                       "points": "iz{rAeysdRRBx@FXBZBJ@N@TB@?R@F@Z@R@f@@j@B"
                    },
                    "start_location": {
                       "lat": 13.7464548,
                       "lng": 100.5405057
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "1.1 km",
                       "value": 1100
                    },
                    "duration": {
                       "text": "4 mins",
                       "value": 244
                    },
                    "end_location": {
                       "lat": 13.7428959,
                       "lng": 100.550221
                    },
                    "html_instructions": "Turn <b>left</b> at <b>แยก ราชประสงค์</b> onto <b>ถนน เพลินจิต</b>",
                    "maneuver": "turn-left",
                    "polyline": {
                       "points": "qo{rA{wsdRJAJCJw@@KFq@DY@K@YHw@?A@CDk@@GH{@@SDk@Dc@@GFi@BWBWJkAJkAD_@BYHy@BQHw@BUDc@JcA@K@IXcD@MHw@LyALgABQ?A?A@?Hw@Dc@Jy@@OBSFq@Fo@Fo@BWBULaA@KDY?GBU?C"
                    },
                    "start_location": {
                       "lat": 13.7447333,
                       "lng": 100.540297
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "0.3 km",
                       "value": 335
                    },
                    "duration": {
                       "text": "1 min",
                       "value": 52
                    },
                    "end_location": {
                       "lat": 13.7458741,
                       "lng": 100.550043
                    },
                    "html_instructions": "Turn <b>left</b><div style=\"font-size:0.9em\">Toll road</div>",
                    "maneuver": "turn-left",
                    "polyline": {
                       "points": "cd{rA{uudRm@DeALkBJmAF]?c@@c@@c@?O@w@@c@BSAKCAAEACCAA"
                    },
                    "start_location": {
                       "lat": 13.7428959,
                       "lng": 100.550221
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "1.2 km",
                       "value": 1247
                    },
                    "duration": {
                       "text": "1 min",
                       "value": 67
                    },
                    "end_location": {
                       "lat": 13.7555188,
                       "lng": 100.5453648
                    },
                    "html_instructions": "Merge onto <b>ทางพิเศษเฉลิมมหานคร</b> (signs for <b>Rama IX Road</b>)<div style=\"font-size:0.9em\">Toll road</div>",
                    "maneuver": "merge",
                    "polyline": {
                       "points": "uv{rAwtudR]@S@mAFmAF{@Fy@HS@q@DcAF_@@[BI?G@iBH}@Dw@HK?K@g@D]BaBVsA`@s@XIDYNC@GBk@XYNQL_@XST]\\QNc@n@c@p@IJEHGLc@t@OTW^GL]f@MRUZCBGDEFC@MNWRWRKFq@`@KFk@ZwAl@A@C@E@EBA?A@GBUFA?KD"
                    },
                    "start_location": {
                       "lat": 13.7458741,
                       "lng": 100.550043
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "1.0 km",
                       "value": 988
                    },
                    "duration": {
                       "text": "1 min",
                       "value": 60
                    },
                    "end_location": {
                       "lat": 13.7567788,
                       "lng": 100.5477951
                    },
                    "html_instructions": "Take the exit toward <b>Suvarnabhumi Airport</b>/<wbr/><b>Rama IX Rd.</b>/<wbr/><b>Chaeng Watthana</b><div style=\"font-size:0.9em\">Toll road</div>",
                    "maneuver": "ramp-left",
                    "polyline": {
                       "points": "_s}rAowtdROJA?GFMFMFMHOFKDSJGBKDULC@MFGDKFMFA?CBEBSJOJi@X[VA@QNC@?@OJYTc@VWNC?UJ]FUDM?Q?M?UGOEWICCQIUQEEGIEIGMGKCKEMEIACCK?MAW@C?M@G?A?C@E@C?E@CBI@GJ[NWBCVYBCTQPKt@k@x@i@^UDAHG@AJGZSDC@A^WPKNIl@e@HKDEDG@AJOFKFOF[@YA[AUCU"
                    },
                    "start_location": {
                       "lat": 13.7555188,
                       "lng": 100.5453648
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "2.4 km",
                       "value": 2365
                    },
                    "duration": {
                       "text": "2 mins",
                       "value": 122
                    },
                    "end_location": {
                       "lat": 13.7709313,
                       "lng": 100.5332784
                    },
                    "html_instructions": "Keep <b>left</b> at the fork, follow signs for <b>Dao Khanong Chaeng Watthana</b> and merge onto <b>ทางพิเศษศรีรัช</b><div style=\"font-size:0.9em\">Toll road</div>",
                    "maneuver": "fork-left",
                    "polyline": {
                       "points": "{z}rAwfudRGKOQCCCGGGIIGGKEKGOEOCMCGAIAA?O?KAQ@K@MBMBC@IBE@I@C@MDC@g@TULKFA@e@N]Xa@Xw@n@e@`@{ApASNEB[VMJKHQPEDOJCDIFC@IFA@EDA@GDC@GFkB`BsBhBEDIHKHs@l@A@_BzAEDIJMLCFWd@_@t@Uf@CFABCH[~@Y|@KVADO^Ob@Ob@GJCDCFm@nA]p@QZ_@f@i@r@k@n@q@l@EBa@\\UPc@XYRMFKFMHMFEDGBGBYNOJIDoAp@OH_@RUNm@d@QLUTi@h@y@dAi@|@EFEJA?ABIP]v@_@t@MXUf@Ud@Sd@Sb@Qb@Qd@g@jAGNINEH?@m@rACFGLc@~@Q^?@Ub@ABKTSb@"
                    },
                    "start_location": {
                       "lat": 13.7567788,
                       "lng": 100.5477951
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "1.4 km",
                       "value": 1371
                    },
                    "duration": {
                       "text": "1 min",
                       "value": 71
                    },
                    "end_location": {
                       "lat": 13.7823189,
                       "lng": 100.5341268
                    },
                    "html_instructions": "Keep <b>right</b> at the fork to stay on <b>ทางพิเศษศรีรัช</b>, follow signs for <b>Ngam Wong Wan</b>/<wbr/><b>Chaeng Watthana</b><div style=\"font-size:0.9em\">Toll road</div>",
                    "maneuver": "fork-right",
                    "polyline": {
                       "points": "is`sA_lrdRIJEFKTGLABEHGJINc@x@UTIJc@\\C@E@EBA@IDMFC@c@Jk@F}@BGAG?A?WEWEKCgAY{@UICKCUGq@KMCAAKAGAa@EOAMAQAUCq@?qABeAF[@K@A?W?Q?M?i@@]?c@?y@AE?c@CMAq@Es@Iu@O_@IYIQESAUAmCy@o@SSGEAICQEo@Qm@S]I]IKEkBg@WGICMCWIWIQGQGMEGAA?ECCA"
                    },
                    "start_location": {
                       "lat": 13.7709313,
                       "lng": 100.5332784
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "0.6 km",
                       "value": 586
                    },
                    "duration": {
                       "text": "1 min",
                       "value": 60
                    },
                    "end_location": {
                       "lat": 13.786027,
                       "lng": 100.5355085
                    },
                    "html_instructions": "Take exit <b>2-05</b> for <b>Rama VI Rd.</b> toward <b>คลองประปา</b><div style=\"font-size:0.9em\">Toll road</div>",
                    "maneuver": "ramp-left",
                    "polyline": {
                       "points": "ozbsAiqrdR[Ag@MqDcAgD_AK?K?G?K?A?IBE@E@GBGDGDC@GFA@UTOTEDKJQHA@[LA?OBU@OAKAIAUKMIEEGGGMEIEKCOAM?G?G@UD]ZqA"
                    },
                    "start_location": {
                       "lat": 13.7823189,
                       "lng": 100.5341268
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "0.7 km",
                       "value": 687
                    },
                    "duration": {
                       "text": "1 min",
                       "value": 84
                    },
                    "end_location": {
                       "lat": 13.7917612,
                       "lng": 100.5378617
                    },
                    "html_instructions": "Turn <b>left</b> onto <b>Rama 6 Road</b>/<wbr/><b>ถนน พระรามที่ 6</b>",
                    "maneuver": "turn-left",
                    "polyline": {
                       "points": "uqcsA}yrdRMEEAGCg@IYKaBg@AAgA[EAw@YgA]gAa@ECSGGCqBs@u@QqBm@w@UiBk@eA[QEq@Sy@U"
                    },
                    "start_location": {
                       "lat": 13.786027,
                       "lng": 100.5355085
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "0.3 km",
                       "value": 341
                    },
                    "duration": {
                       "text": "2 mins",
                       "value": 95
                    },
                    "end_location": {
                       "lat": 13.7924917,
                       "lng": 100.5349567
                    },
                    "html_instructions": "Turn <b>left</b> onto <b>ถนน ประดิพัทธิ์</b>",
                    "maneuver": "turn-left",
                    "polyline": {
                       "points": "oudsAshsdRS?KCI~@AZI~@MpAG^CTEZEd@e@rCEPADAHEj@"
                    },
                    "start_location": {
                       "lat": 13.7917612,
                       "lng": 100.5378617
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "0.7 km",
                       "value": 665
                    },
                    "duration": {
                       "text": "1 min",
                       "value": 77
                    },
                    "end_location": {
                       "lat": 13.7978406,
                       "lng": 100.5372656
                    },
                    "html_instructions": "Turn <b>right</b> at <b>แยก เทอดดำริ</b> onto <b>ถนน เทอดดำริ</b>",
                    "maneuver": "turn-right",
                    "polyline": {
                       "points": "azdsAovrdREXSWyAY}Aa@kCy@{Ag@wCeAgCu@eBm@c@UWQa@YcA_@MGA?OGk@U"
                    },
                    "start_location": {
                       "lat": 13.7924917,
                       "lng": 100.5349567
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "0.6 km",
                       "value": 601
                    },
                    "duration": {
                       "text": "1 min",
                       "value": 56
                    },
                    "end_location": {
                       "lat": 13.802894,
                       "lng": 100.5392211
                    },
                    "html_instructions": "Continue onto <b>ถนน เทอดดำริห์</b>",
                    "polyline": {
                       "points": "o{esA}dsdReCs@a@KcA[aI{B]M[IkF_BkBg@QGGAAAE?CAC?C?C?"
                    },
                    "start_location": {
                       "lat": 13.7978406,
                       "lng": 100.5372656
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "0.1 km",
                       "value": 109
                    },
                    "duration": {
                       "text": "1 min",
                       "value": 14
                    },
                    "end_location": {
                       "lat": 13.8033736,
                       "lng": 100.538371
                    },
                    "html_instructions": "<b>ถนน เทอดดำริห์</b> turns <b>left</b> and becomes <b>ซอย ปูนซีเมนต์ไทย</b>",
                    "polyline": {
                       "points": "a{fsAcqsdRG@C@C@A@CBGLe@bAGPEPGRER"
                    },
                    "start_location": {
                       "lat": 13.802894,
                       "lng": 100.5392211
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "35 m",
                       "value": 35
                    },
                    "duration": {
                       "text": "1 min",
                       "value": 18
                    },
                    "end_location": {
                       "lat": 13.8036312,
                       "lng": 100.5385281
                    },
                    "html_instructions": "Turn <b>right</b><div style=\"font-size:0.9em\">Restricted usage road</div>",
                    "maneuver": "turn-right",
                    "polyline": {
                       "points": "a~fsAyksdRACCEEEEAECECEAOC"
                    },
                    "start_location": {
                       "lat": 13.8033736,
                       "lng": 100.538371
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "0.2 km",
                       "value": 232
                    },
                    "duration": {
                       "text": "1 min",
                       "value": 72
                    },
                    "end_location": {
                       "lat": 13.8046899,
                       "lng": 100.5366857
                    },
                    "html_instructions": "Turn <b>left</b><div style=\"font-size:0.9em\">Restricted usage road</div>",
                    "maneuver": "turn-left",
                    "polyline": {
                       "points": "u_gsAylsdRGNaAnBQX}@jB?BAJQb@e@t@"
                    },
                    "start_location": {
                       "lat": 13.8036312,
                       "lng": 100.5385281
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "51 m",
                       "value": 51
                    },
                    "duration": {
                       "text": "1 min",
                       "value": 12
                    },
                    "end_location": {
                       "lat": 13.8050578,
                       "lng": 100.5369547
                    },
                    "html_instructions": "Turn <b>right</b><div style=\"font-size:0.9em\">Restricted usage road</div>",
                    "maneuver": "turn-right",
                    "polyline": {
                       "points": "ifgsAiasdRKOGIMESKA?QG"
                    },
                    "start_location": {
                       "lat": 13.8046899,
                       "lng": 100.5366857
                    },
                    "travel_mode": "DRIVING"
                 },
                 {
                    "distance": {
                       "text": "0.2 km",
                       "value": 161
                    },
                    "duration": {
                       "text": "1 min",
                       "value": 65
                    },
                    "end_location": {
                       "lat": 13.8059442,
                       "lng": 100.5373727
                    },
                    "html_instructions": "Turn <b>left</b><div style=\"font-size:0.9em\">Restricted usage road</div><div style=\"font-size:0.9em\">Destination will be on the right</div>",
                    "maneuver": "turn-left",
                    "polyline": {
                       "points": "shgsA}bsdRILEFEFC@E@A@I@E?E?AAKCwAe@?A?A?A@EBIDMDOBGg@Q"
                    },
                    "start_location": {
                       "lat": 13.8050578,
                       "lng": 100.5369547
                    },
                    "travel_mode": "DRIVING"
                 }
              ],
              "traffic_speed_entry": [],
              "via_waypoint": []
           }
        ],
        "overview_polyline": {
           "points": "iz{rAeysdRvDZjAFrADVETuBRwB`@yEr@sHn@mGf@sF^uDj@mFl@}FBYsBRyDRaA@oCDc@B_@EMImER{DXiCLqBJuBN_AF_CZsA`@s@XIDYNqAn@q@f@q@r@u@~@m@|@q@lAmAjBc@n@KHo@l@aBdAcChAEBOFk@Pg@ZuBbA_Af@c@Vi@X[VSPCBi@`@{@f@YJs@L_@?c@G}@][WMSYs@GMCY@q@DYDQZs@t@s@`CaBp@a@pBoAv@q@JM\\m@Hu@Cq@CUGKSU]a@w@Wa@G[A]Bi@La@JmAl@g@P_Ar@mErD{@p@eA|@{FbFwDjDWX[l@{@hBwBlG}@hBo@lAiAzA}A|Ag@`@aBfAwAv@yBlAu@b@_Ar@_A~@y@dAi@|@KRCBuAxC_ArBwBdFgCrF_@x@ORUf@{@~A_@`@c@\\QHWLg@Lk@F}@BOA}@OmCs@aB[UEqAKgACwCJaABgB@gCE_AGiBYy@Se@GUAmCy@cA[qA]qGeBqBo@_@CyEqAgD_AK?S?]DUJUPe@j@QPq@Xe@D[C_@MSOOUKUE]?OFs@ZqAMEMEaAUqDgAmE}A[KqBs@u@QiDcAoDgAcAYy@US?KCI~@KzA_@bDs@pEMnASWyAY}Aa@kCy@sFmBgCu@eBm@{@g@a@YcA_@OG{@]mPwEqK_Dm@MSDs@vA[jAEIKGa@MyCdGANw@xASYa@QSGOTQLW?cBk@Ty@g@Q"
        },
        "summary": "ทางพิเศษศรีรัช",
        "warnings": [],
        "waypoint_order": []
     }
  ],
  "status": "OK"
}; 