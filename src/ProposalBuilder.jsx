import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const PHONE = "529988450533";
const BUSINESS_EMAIL = "jill@cancunpicnic.com";

const COUNTRY_CODES = [
  {code:"+1",country:"US",flag:"\ud83c\uddfa\ud83c\uddf8",label:"United States"},
  {code:"+1",country:"CA",flag:"\ud83c\udde8\ud83c\udde6",label:"Canada"},
  {code:"+52",country:"MX",flag:"\ud83c\uddf2\ud83c\uddfd",label:"Mexico"},
  {code:"+44",country:"GB",flag:"\ud83c\uddec\ud83c\udde7",label:"United Kingdom"},
  {code:"+33",country:"FR",flag:"\ud83c\uddeb\ud83c\uddf7",label:"France"},
  {code:"+49",country:"DE",flag:"\ud83c\udde9\ud83c\uddea",label:"Germany"},
  {code:"+34",country:"ES",flag:"\ud83c\uddea\ud83c\uddf8",label:"Spain"},
  {code:"+39",country:"IT",flag:"\ud83c\uddee\ud83c\uddf9",label:"Italy"},
  {code:"+31",country:"NL",flag:"\ud83c\uddf3\ud83c\uddf1",label:"Netherlands"},
  {code:"+32",country:"BE",flag:"\ud83c\udde7\ud83c\uddea",label:"Belgium"},
  {code:"+41",country:"CH",flag:"\ud83c\udde8\ud83c\udded",label:"Switzerland"},
  {code:"+43",country:"AT",flag:"\ud83c\udde6\ud83c\uddf9",label:"Austria"},
  {code:"+46",country:"SE",flag:"\ud83c\uddf8\ud83c\uddea",label:"Sweden"},
  {code:"+47",country:"NO",flag:"\ud83c\uddf3\ud83c\uddf4",label:"Norway"},
  {code:"+45",country:"DK",flag:"\ud83c\udde9\ud83c\uddf0",label:"Denmark"},
  {code:"+358",country:"FI",flag:"\ud83c\uddeb\ud83c\uddee",label:"Finland"},
  {code:"+353",country:"IE",flag:"\ud83c\uddee\ud83c\uddea",label:"Ireland"},
  {code:"+351",country:"PT",flag:"\ud83c\uddf5\ud83c\uddf9",label:"Portugal"},
  {code:"+48",country:"PL",flag:"\ud83c\uddf5\ud83c\uddf1",label:"Poland"},
  {code:"+420",country:"CZ",flag:"\ud83c\udde8\ud83c\uddff",label:"Czech Republic"},
  {code:"+36",country:"HU",flag:"\ud83c\udded\ud83c\uddfa",label:"Hungary"},
  {code:"+40",country:"RO",flag:"\ud83c\uddf7\ud83c\uddf4",label:"Romania"},
  {code:"+30",country:"GR",flag:"\ud83c\uddec\ud83c\uddf7",label:"Greece"},
  {code:"+90",country:"TR",flag:"\ud83c\uddf9\ud83c\uddf7",label:"Turkey"},
  {code:"+7",country:"RU",flag:"\ud83c\uddf7\ud83c\uddfa",label:"Russia"},
  {code:"+380",country:"UA",flag:"\ud83c\uddfa\ud83c\udde6",label:"Ukraine"},
  {code:"+55",country:"BR",flag:"\ud83c\udde7\ud83c\uddf7",label:"Brazil"},
  {code:"+54",country:"AR",flag:"\ud83c\udde6\ud83c\uddf7",label:"Argentina"},
  {code:"+56",country:"CL",flag:"\ud83c\udde8\ud83c\uddf1",label:"Chile"},
  {code:"+57",country:"CO",flag:"\ud83c\udde8\ud83c\uddf4",label:"Colombia"},
  {code:"+51",country:"PE",flag:"\ud83c\uddf5\ud83c\uddea",label:"Peru"},
  {code:"+58",country:"VE",flag:"\ud83c\uddfb\ud83c\uddea",label:"Venezuela"},
  {code:"+593",country:"EC",flag:"\ud83c\uddea\ud83c\udde8",label:"Ecuador"},
  {code:"+591",country:"BO",flag:"\ud83c\udde7\ud83c\uddf4",label:"Bolivia"},
  {code:"+595",country:"PY",flag:"\ud83c\uddf5\ud83c\uddfe",label:"Paraguay"},
  {code:"+598",country:"UY",flag:"\ud83c\uddfa\ud83c\uddfe",label:"Uruguay"},
  {code:"+506",country:"CR",flag:"\ud83c\udde8\ud83c\uddf7",label:"Costa Rica"},
  {code:"+507",country:"PA",flag:"\ud83c\uddf5\ud83c\udde6",label:"Panama"},
  {code:"+502",country:"GT",flag:"\ud83c\uddec\ud83c\uddf9",label:"Guatemala"},
  {code:"+503",country:"SV",flag:"\ud83c\uddf8\ud83c\uddfb",label:"El Salvador"},
  {code:"+504",country:"HN",flag:"\ud83c\udded\ud83c\uddf3",label:"Honduras"},
  {code:"+505",country:"NI",flag:"\ud83c\uddf3\ud83c\uddee",label:"Nicaragua"},
  {code:"+501",country:"BZ",flag:"\ud83c\udde7\ud83c\uddff",label:"Belize"},
  {code:"+509",country:"HT",flag:"\ud83c\udded\ud83c\uddf9",label:"Haiti"},
  {code:"+1809",country:"DO",flag:"\ud83c\udde9\ud83c\uddf4",label:"Dominican Republic"},
  {code:"+53",country:"CU",flag:"\ud83c\udde8\ud83c\uddfa",label:"Cuba"},
  {code:"+1876",country:"JM",flag:"\ud83c\uddef\ud83c\uddf2",label:"Jamaica"},
  {code:"+1868",country:"TT",flag:"\ud83c\uddf9\ud83c\uddf9",label:"Trinidad and Tobago"},
  {code:"+1242",country:"BS",flag:"\ud83c\udde7\ud83c\uddf8",label:"Bahamas"},
  {code:"+1246",country:"BB",flag:"\ud83c\udde7\ud83c\udde7",label:"Barbados"},
  {code:"+61",country:"AU",flag:"\ud83c\udde6\ud83c\uddfa",label:"Australia"},
  {code:"+64",country:"NZ",flag:"\ud83c\uddf3\ud83c\uddff",label:"New Zealand"},
  {code:"+81",country:"JP",flag:"\ud83c\uddef\ud83c\uddf5",label:"Japan"},
  {code:"+82",country:"KR",flag:"\ud83c\uddf0\ud83c\uddf7",label:"South Korea"},
  {code:"+86",country:"CN",flag:"\ud83c\udde8\ud83c\uddf3",label:"China"},
  {code:"+852",country:"HK",flag:"\ud83c\udded\ud83c\uddf0",label:"Hong Kong"},
  {code:"+886",country:"TW",flag:"\ud83c\uddf9\ud83c\uddfc",label:"Taiwan"},
  {code:"+65",country:"SG",flag:"\ud83c\uddf8\ud83c\uddec",label:"Singapore"},
  {code:"+60",country:"MY",flag:"\ud83c\uddf2\ud83c\uddfe",label:"Malaysia"},
  {code:"+66",country:"TH",flag:"\ud83c\uddf9\ud83c\udded",label:"Thailand"},
  {code:"+84",country:"VN",flag:"\ud83c\uddfb\ud83c\uddf3",label:"Vietnam"},
  {code:"+63",country:"PH",flag:"\ud83c\uddf5\ud83c\udded",label:"Philippines"},
  {code:"+62",country:"ID",flag:"\ud83c\uddee\ud83c\udde9",label:"Indonesia"},
  {code:"+91",country:"IN",flag:"\ud83c\uddee\ud83c\uddf3",label:"India"},
  {code:"+92",country:"PK",flag:"\ud83c\uddf5\ud83c\uddf0",label:"Pakistan"},
  {code:"+880",country:"BD",flag:"\ud83c\udde7\ud83c\udde9",label:"Bangladesh"},
  {code:"+94",country:"LK",flag:"\ud83c\uddf1\ud83c\uddf0",label:"Sri Lanka"},
  {code:"+977",country:"NP",flag:"\ud83c\uddf3\ud83c\uddf5",label:"Nepal"},
  {code:"+971",country:"AE",flag:"\ud83c\udde6\ud83c\uddea",label:"United Arab Emirates"},
  {code:"+966",country:"SA",flag:"\ud83c\uddf8\ud83c\udde6",label:"Saudi Arabia"},
  {code:"+974",country:"QA",flag:"\ud83c\uddf6\ud83c\udde6",label:"Qatar"},
  {code:"+973",country:"BH",flag:"\ud83c\udde7\ud83c\udded",label:"Bahrain"},
  {code:"+968",country:"OM",flag:"\ud83c\uddf4\ud83c\uddf2",label:"Oman"},
  {code:"+965",country:"KW",flag:"\ud83c\uddf0\ud83c\uddfc",label:"Kuwait"},
  {code:"+962",country:"JO",flag:"\ud83c\uddef\ud83c\uddf4",label:"Jordan"},
  {code:"+961",country:"LB",flag:"\ud83c\uddf1\ud83c\udde7",label:"Lebanon"},
  {code:"+972",country:"IL",flag:"\ud83c\uddee\ud83c\uddf1",label:"Israel"},
  {code:"+20",country:"EG",flag:"\ud83c\uddea\ud83c\uddec",label:"Egypt"},
  {code:"+212",country:"MA",flag:"\ud83c\uddf2\ud83c\udde6",label:"Morocco"},
  {code:"+216",country:"TN",flag:"\ud83c\uddf9\ud83c\uddf3",label:"Tunisia"},
  {code:"+213",country:"DZ",flag:"\ud83c\udde9\ud83c\uddff",label:"Algeria"},
  {code:"+234",country:"NG",flag:"\ud83c\uddf3\ud83c\uddec",label:"Nigeria"},
  {code:"+233",country:"GH",flag:"\ud83c\uddec\ud83c\udded",label:"Ghana"},
  {code:"+254",country:"KE",flag:"\ud83c\uddf0\ud83c\uddea",label:"Kenya"},
  {code:"+27",country:"ZA",flag:"\ud83c\uddff\ud83c\udde6",label:"South Africa"},
  {code:"+255",country:"TZ",flag:"\ud83c\uddf9\ud83c\uddff",label:"Tanzania"},
  {code:"+256",country:"UG",flag:"\ud83c\uddfa\ud83c\uddec",label:"Uganda"},
  {code:"+251",country:"ET",flag:"\ud83c\uddea\ud83c\uddf9",label:"Ethiopia"},
  {code:"+237",country:"CM",flag:"\ud83c\udde8\ud83c\uddf2",label:"Cameroon"},
  {code:"+225",country:"CI",flag:"\ud83c\udde8\ud83c\uddee",label:"Ivory Coast"},
  {code:"+221",country:"SN",flag:"\ud83c\uddf8\ud83c\uddf3",label:"Senegal"},
  {code:"+354",country:"IS",flag:"\ud83c\uddee\ud83c\uddf8",label:"Iceland"},
  {code:"+372",country:"EE",flag:"\ud83c\uddea\ud83c\uddea",label:"Estonia"},
  {code:"+371",country:"LV",flag:"\ud83c\uddf1\ud83c\uddfb",label:"Latvia"},
  {code:"+370",country:"LT",flag:"\ud83c\uddf1\ud83c\uddf9",label:"Lithuania"},
  {code:"+385",country:"HR",flag:"\ud83c\udded\ud83c\uddf7",label:"Croatia"},
  {code:"+386",country:"SI",flag:"\ud83c\uddf8\ud83c\uddee",label:"Slovenia"},
  {code:"+421",country:"SK",flag:"\ud83c\uddf8\ud83c\uddf0",label:"Slovakia"},
  {code:"+359",country:"BG",flag:"\ud83c\udde7\ud83c\uddec",label:"Bulgaria"},
  {code:"+381",country:"RS",flag:"\ud83c\uddf7\ud83c\uddf8",label:"Serbia"},
  {code:"+352",country:"LU",flag:"\ud83c\uddf1\ud83c\uddfa",label:"Luxembourg"},
  {code:"+356",country:"MT",flag:"\ud83c\uddf2\ud83c\uddf9",label:"Malta"},
  {code:"+357",country:"CY",flag:"\ud83c\udde8\ud83c\uddfe",label:"Cyprus"},
];


const IMG = {
  // Venues - from cancunpicnic.com
  hero: "https://cancunpicnic.com/wp-content/uploads/2023/07/Cancun-Photographer_3031.jpg",
  beach: "https://cancunpicnic.com/wp-content/uploads/2023/07/Cancun-Photographer_3028-768x512.jpg",
  lagoon: "https://cancunpicnic.com/wp-content/uploads/2023/07/Cancun-Photographer_3024-1-scaled.jpg",
  rooftop: "https://cancunpicnic.com/wp-content/uploads/2023/07/Cancun-Photographer_3025-1.jpg",
  // Centerpieces
  bigLetters: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
  medLettersFull: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  medLettersShort: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  stackedLetters: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80",
  flowerHeart: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
  candleHeart: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
  neonSign: "https://images.unsplash.com/photo-1516967124798-10656f7dca28?w=600&q=80",
  keepSimple: "https://cancunpicnic.com/wp-content/uploads/2023/07/Cancun-Photographer_3031.jpg",
  // Activities
  picnic: "https://images.unsplash.com/photo-1526234362653-3b75a0c07438?w=600&q=80",
  dinner: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
  // Music
  musician: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&q=80",
  mariachi: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
  // Photo/Video
  photo30: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  photo60: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  video30: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
  video60: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
  drone: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
  // Flowers
  bouquet: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
  petals: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&q=80",
  arr4: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
  arr8: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
  roses50: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
  roses100: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
  // Structures
  woodenFrame: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80",
  gazeboStructure: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  metalStructure: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
  structureNeon: "https://images.unsplash.com/photo-1516967124798-10656f7dca28?w=600&q=80",
  // WOW factor
  sparklers2: "https://images.unsplash.com/photo-1481162854517-d9e353af153d?w=600&q=80",
  sparklers4: "https://images.unsplash.com/photo-1481162854517-d9e353af153d?w=600&q=80",
  sparklers6: "https://images.unsplash.com/photo-1481162854517-d9e353af153d?w=600&q=80",
  sparklers8: "https://images.unsplash.com/photo-1481162854517-d9e353af153d?w=600&q=80",
  gazebo: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80",
  teepee: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80",
};

const VENUES = [
  { id:"beach",name:"Beach",price:450,img:IMG.beach,badge:"SIGNATURE",desc:"Our beachfront location with stunning ocean views. Weekdays recommended for a more intimate experience.",priv:false },
  { id:"lagoon",name:"Lagoon",price:350,img:IMG.lagoon,badge:"BEST VALUE",desc:"A private waterfront setting with the best sunset view in Cancun.",priv:true },
  { id:"rooftop",name:"Rooftop",price:450,img:IMG.rooftop,badge:"PRIVATE",desc:"City skyline, ferris wheel, and panoramic sunset views. Truly unforgettable.",priv:true },
];
const CENTERPIECES = [
  { id:"big-letters",name:'Big Letters "MARRY ME"',price:625,img:IMG.bigLetters,desc:"6ft tall, 25ft wide — our biggest statement piece",badge:"MOST POPULAR" },
  { id:"med-letters-full",name:'"Will You Marry Me?"',price:495,img:IMG.medLettersFull,desc:"2ft letters on risers, standing 4ft high" },
  { id:"med-letters-short",name:'"Marry Me?"',price:350,img:IMG.medLettersShort,desc:"2ft letters on risers — clean and classic" },
  { id:"stacked-letters",name:"Stacked Letters",price:350,img:IMG.stackedLetters,desc:"6ft tall stacked display — elegant and intimate" },
  { id:"flower-structure",name:"Flower Design",price:625,img:IMG.flowerHeart,desc:"400 fresh roses shaped into a heart, ring, or circle" },
];
const ACTIVITIES = [
  { id:"picnic",name:"Romantic Picnic",price:250,img:IMG.picnic,desc:"Curated charcuterie spread for two with a complimentary bottle of wine, styled at your venue" },
  { id:"dinner",name:"Candlelit Dinner",price:250,img:IMG.dinner,desc:"Intimate 3-course dinner for two with a complimentary glass of wine under the stars" },
];
const FLOWERS = [
  { id:"bouquet",name:"Rose Bouquet",price:99,img:IMG.bouquet,desc:"3 dozen fresh roses — the first gift after saying yes",badge:"POPULAR" },
  { id:"petals",name:"Rose Petal Walkway",price:50,img:IMG.petals,desc:"2 bags of red rose petals for a romantic walkway" },
  { id:"arrangements",name:"Flower Arrangements",pricePerUnit:120,unitStep:1,unitMin:1,img:IMG.arr4,desc:"Elegant arrangements around your setup — 2 arrangements per bundle, $120 each",qty:true,perBundle:2 },
  { id:"standing-roses",name:"Standing Roses",pricePerUnit:60,unitStep:1,unitMin:1,img:IMG.roses50,desc:"Roses in sand lining your walkway — 24 roses per bundle, $60 each",qty:true,perBundle:24,bundleUnit:"roses" },
  { id:"candle-heart",name:"Candle Heart",price:150,img:IMG.candleHeart,desc:"LED candles and rose petals — beautifully simple" },
];

const STRUCTURES = [
  { id:"wooden-frame",name:"Wooden Structure / Giant Frame",price:150,img:IMG.woodenFrame,desc:"Wooden Gazebo or Giant Frame w/ fabric and lighting. Add a Neon sign and florals to complete the look" },
  { id:"gazebo-structure",name:"Gazebo Structure",price:200,img:IMG.gazeboStructure,desc:"Wooden Gazebo w/ fabric and lighting. Add a Neon sign and florals to complete the look" },
  { id:"metal-structure",name:"Metal Structures (Heart, Circle or Rectangle)",price:100,img:IMG.metalStructure,desc:"Choose from our selection of metal structures. This simple structure can be taken to the next level with fabric, Neon sign and florals" },
  { id:"structure-neon",name:"Neon Sign",price:125,img:IMG.structureNeon,desc:"Add a glowing neon sign to your structure" },
  { id:"teepee",name:"Boho TeePee",price:150,img:IMG.teepee,desc:"12ft teepee with hanging spheres and boho arrangement" },
];
const STRUCTURE_NEON_MESSAGES=["Will you marry me?","It was always you","Te casas conmigo?","Will you be my Wife?","This is our love story","Let's grow old together","You & Me","She said yes"];

const WOW = [];

const SPARKLER_PRICES = {0:0,2:225,4:330,6:435,8:540};
const SPARKLER_MAX = 8;

const PORTFOLIO = [
  // Beach (8)
  { img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", venue:"beach", centerpiece:"big-letters", time:"sunset", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&q=80", venue:"beach", centerpiece:"big-letters", time:"sunset", flowers:["petals"], wow:["sparklers-2"] },
  { img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80", venue:"beach", centerpiece:"big-letters", time:"evening", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80", venue:"beach", centerpiece:"flower-structure", time:"sunset", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80", venue:"beach", centerpiece:"none", time:"evening", flowers:["candle-heart"], wow:[] },
  { img: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80", venue:"beach", centerpiece:"none", time:"sunset", flowers:["petals","candle-heart"], wow:[] },
  { img: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=80", venue:"beach", centerpiece:"none", time:"evening", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=80", venue:"beach", centerpiece:"none", time:"sunset", flowers:[], wow:[] },
  // Lagoon (6)
  { img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80", venue:"lagoon", centerpiece:"big-letters", time:"sunset", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80", venue:"lagoon", centerpiece:"big-letters", time:"sunset", flowers:[], wow:["sparklers-2"] },
  { img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80", venue:"lagoon", centerpiece:"flower-structure", time:"sunset", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80", venue:"lagoon", centerpiece:"none", time:"evening", flowers:["bouquet","candle-heart"], wow:[] },
  { img: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80", venue:"lagoon", centerpiece:"stacked-letters", time:"sunset", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=800&q=80", venue:"lagoon", centerpiece:"none", time:"sunset", flowers:[], wow:[] },
  // Rooftop (6)
  { img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", venue:"rooftop", centerpiece:"big-letters", time:"evening", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", venue:"rooftop", centerpiece:"big-letters", time:"evening", flowers:[], wow:["sparklers-2"] },
  { img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", venue:"rooftop", centerpiece:"none", time:"evening", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80", venue:"rooftop", centerpiece:"none", time:"evening", flowers:["candle-heart"], wow:[], structures:["teepee"] },
  { img: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80", venue:"rooftop", centerpiece:"flower-structure", time:"sunset", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", venue:"rooftop", centerpiece:"none", time:"evening", flowers:[], wow:[] },
];

const ADDONS = {
  music:[
    { id:"solo-musician",name:"Solo Musician",price:295,img:IMG.musician,desc:"Sax, guitar, violin, cello, or harp — 30-45 min" },
    { id:"mariachi",name:"Mariachi Band",price:325,img:IMG.mariachi,desc:"5-6 musicians, 7 songs — 25-30 min" },
  ],
  capture:[
    { id:"photo-30",name:"Photography (30 min)",price:295,img:IMG.photo30,desc:"50 digital images — proposal + mini engagement session" },
    { id:"photo-60",name:"Photography (60 min)",price:350,img:IMG.photo60,desc:"100 digital images — full proposal + extended shoot" },
    { id:"video-30",name:"Video (30 min)",price:325,img:IMG.video30,desc:"2-3 minute professionally edited proposal video" },
    { id:"video-60",name:"Video (60 min)",price:375,img:IMG.video60,desc:"5-8 minute cinematic proposal film" },
    { id:"drone",name:"Drone Footage",price:150,img:IMG.drone,desc:"Aerial footage add-on — stunning bird's eye views" },
  ],
};
const NEON_MESSAGES=["Will you marry me?","It was always you","Te casas conmigo?","Marry me?","This is our love story","Let's grow old together","You & Me","They said yes"];

const SOCIAL_PROOF = {
  venue:{ headline:"What 1,500+ couples chose", stats:[{label:"chose Beach",pct:68},{label:"chose Rooftop",pct:19},{label:"chose Lagoon",pct:13}], tip:"Beach is our signature — but Lagoon has the best sunset views and total privacy." },
  centerpiece:{ headline:"Most popular setups", stats:[{label:"pick Big Letters",pct:45},{label:"pick Flower Design",pct:22},{label:"pick Neon Sign",pct:15}], tip:'Big Letters creates the most dramatic reaction when your partner turns around.' },
  addons:{ headline:"What others add to their proposal", stats:[{label:"add Photography",pct:94},{label:"add Video",pct:52},{label:"add a Musician",pct:44}], tip:"The #1 regret we hear? 'I wish I had gotten photos.'" },
};

const PACKAGES = [
  {
    id: "simple",
    name: "Simple & Sweet",
    price: 850,
    badge: "INTIMATE",
    desc: "An intimate and romantic proposal experience designed to let the moment speak for itself. Featuring soft candlelight, elegant roses, and a beautifully styled setting for just the two of you.",
    includes: ["Venue of your choice", "Candle Heart setup", "Rose Bouquet (3 dozen)", "Rose Petal Walkway", "Coordination · 1.5 hrs · Sparkling wine · Server"],
    imgs: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80",
    ],
  },
  {
    id: "glamorous",
    name: "Glamorous",
    price: 1500,
    badge: "MOST POPULAR",
    desc: "A show-stopping proposal experience designed to leave a lasting impression. Featuring bold statement lettering, glowing sparklers, and elegantly styled roses, every detail is thoughtfully designed to take their breath away.",
    includes: ["Venue of your choice", 'Big Letters "MARRY ME"', "Rose Bouquet (3 dozen)", "Rose Petal Walkway", "Fountain Sparklers (x4)", "Coordination · 1.5 hrs · Sparkling wine · Server"],
    imgs: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    ],
  },
  {
    id: "artist",
    name: "Artist Touch",
    price: 2200,
    badge: "PREMIUM",
    desc: "Our signature luxury experience, created for those who expect nothing but the exceptional. With over 10 years of expertise, we curate an unforgettable, bespoke moment for your special partner — one that will be remembered forever.",
    includes: ["Venue of your choice", 'Big Letters "MARRY ME"', "Flower Heart Design (400 roses)", "100 Standing Roses", "Fountain Sparklers (x4)", "Wooden Structure with lighting", "Coordination · 1.5 hrs · Sparkling wine · Server"],
    imgs: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    ],
  },
];

const fmt=(n)=>"$"+n.toLocaleString("en-US");
function getBudgetLabel(t){if(t<800)return{label:"Intimate & Simple",color:"#8B7355",icon:"💛"};if(t<1500)return{label:"Popular Range",color:"#B8860B",icon:"🧡"};if(t<2500)return{label:"Premium Experience",color:"#C4944A",icon:"❤️"};return{label:"Ultimate Proposal",color:"#D4AF37",icon:"💎"};}

function ProofBar({pct,label}){return(<div style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#6B5744",marginBottom:3}}><span>{pct}% {label}</span></div><div style={{height:6,background:"#EDE8E0",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,borderRadius:3,background:"linear-gradient(90deg,#C4944A,#D4AF37)",transition:"width 1s cubic-bezier(0.4,0,0.2,1)"}}/></div></div>);}

function SocialProofCard({data}){const[open,setOpen]=useState(false);return(<div style={{maxWidth:500,margin:"28px auto 0"}}><button onClick={()=>setOpen(!open)} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",padding:"12px 20px",borderRadius:10,border:"1px dashed #D4C5B0",background:open?"rgba(196,148,74,0.04)":"transparent",cursor:"pointer",transition:"all 0.2s"}}><span style={{fontSize:13,color:"#8B7355",fontWeight:500}}>{open?"Hide":"See"} what others choose</span><span style={{fontSize:12,color:"#C4944A",transition:"transform 0.2s",transform:open?"rotate(180deg)":"rotate(0)"}}></span></button>{open&&(<div style={{marginTop:12,background:"#fff",border:"1px solid #EDE8E0",borderRadius:14,padding:"18px 22px",boxShadow:"0 2px 12px rgba(59,36,18,0.04)",animation:"fadeIn 0.3s ease"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#C4944A,#D4AF37)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#fff"}}>📊</div><span style={{fontSize:14,fontWeight:700,color:"#3B2412"}}>{data.headline}</span></div>{data.stats.map((s,i)=><ProofBar key={i} pct={s.pct} label={s.label}/>)}{data.combo&&(<div style={{marginTop:14,padding:"12px 14px",background:"rgba(196,148,74,0.06)",borderRadius:10,borderLeft:"3px solid #C4944A"}}><div style={{fontSize:11,fontWeight:700,color:"#C4944A",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{data.combo.label}</div><div style={{fontSize:13,color:"#3B2412",fontWeight:600}}>{data.combo.items}</div><div style={{fontSize:12,color:"#8B7355",marginTop:2}}>Average total spend: {data.combo.avgSpend}</div></div>)}<div style={{marginTop:12,fontSize:12,color:"#8B7355",fontStyle:"italic",lineHeight:1.4,paddingLeft:10,borderLeft:"2px solid #E8E0D4"}}>💡 {data.tip}</div></div>)}</div>);}

function StepIndicator({current,total,labels}){return(<div style={{padding:"24px 0 8px"}}><div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:8}}>{Array.from({length:total},(_,i)=>(<div key={i} style={{width:i===current?36:10,height:6,borderRadius:3,background:i<=current?"#C4944A":"#E8E0D4",transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)"}}/>))}</div><div style={{textAlign:"center",fontSize:12,color:"#B0A090",fontWeight:500}}>Step {current+1} of {total} — {labels[current]}</div></div>);}
function SectionTitle({title,subtitle}){return(<div style={{textAlign:"center",marginBottom:28}}><h2 style={{fontSize:"clamp(26px,5vw,36px)",fontWeight:700,color:"#3B2412",margin:0,fontFamily:"'Playfair Display',Georgia,serif",lineHeight:1.2}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:"#8B7355",margin:"10px auto 0",lineHeight:1.6,maxWidth:520}}>{subtitle}</p>}</div>);}

function VenueCard({venue,selected,onSelect,onPreview}){const sel=selected===venue.id;return(<div onClick={()=>onSelect(venue.id)} style={{position:"relative",borderRadius:16,overflow:"hidden",cursor:"pointer",border:sel?"3px solid #C4944A":"3px solid transparent",boxShadow:sel?"0 8px 32px rgba(196,148,74,0.35)":"0 4px 20px rgba(0,0,0,0.08)",transition:"all 0.3s ease",transform:sel?"scale(1.02)":"scale(1)",flex:"1 1 260px",maxWidth:360,background:"#fff"}}><div style={{position:"relative",height:200,backgroundImage:`url(${venue.img})`,backgroundSize:"cover",backgroundPosition:"center"}}><EyeButton onClick={e=>{e.stopPropagation();onPreview(venue.img,venue.name);}}/></div>{venue.badge&&<div style={{position:"absolute",top:12,right:12,background:venue.badge==="BEST VALUE"?"#2D5016":"#C4944A",color:"#fff",padding:"5px 14px",borderRadius:20,fontSize:10,fontWeight:700,letterSpacing:1.2}}>{venue.badge}</div>}{venue.priv&&<div style={{position:"absolute",top:12,left:12,background:"rgba(0,0,0,0.65)",color:"#fff",padding:"5px 12px",borderRadius:20,fontSize:10,fontWeight:600}}>PRIVATE</div>}{sel&&<div style={{position:"absolute",top:85,left:"50%",transform:"translateX(-50%)",background:"#C4944A",color:"#fff",width:44,height:44,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}}>✓</div>}<div style={{padding:"16px 20px 20px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}><h3 style={{margin:0,fontSize:22,color:"#3B2412",fontFamily:"'Playfair Display',Georgia,serif"}}>{venue.name}</h3><span style={{fontSize:22,fontWeight:700,color:"#C4944A",fontFamily:"'Playfair Display',Georgia,serif"}}>{fmt(venue.price)}</span></div><p style={{margin:"8px 0 0",fontSize:13,color:"#6B5744",lineHeight:1.5}}>{venue.desc}</p><div style={{marginTop:8,fontSize:11,color:"#B0A090",lineHeight:1.5}}>Includes: Coordination · 1.5 hrs · Cocktail table · Sparkling wine · Server · Speaker</div></div></div>);}


function CenterpieceCard({item,selected,onSelect,onPreview}){const sel=selected===item.id;return(<div onClick={()=>onSelect(item.id)} style={{position:"relative",borderRadius:14,overflow:"hidden",cursor:"pointer",border:sel?"3px solid #C4944A":"3px solid transparent",boxShadow:sel?"0 6px 24px rgba(196,148,74,0.3)":"0 3px 14px rgba(0,0,0,0.06)",transition:"all 0.3s ease",transform:sel?"scale(1.03)":"scale(1)",width:"100%",background:"#fff"}}><div style={{position:"relative",height:130,backgroundImage:`url(${item.img})`,backgroundSize:"cover"}}><EyeButton onClick={e=>{e.stopPropagation();onPreview(item.img,item.name);}}/></div>{item.badge&&<div style={{position:"absolute",top:8,left:8,background:"#C4944A",color:"#fff",padding:"3px 10px",borderRadius:14,fontSize:9,fontWeight:700}}>{item.badge}</div>}{sel&&<div style={{position:"absolute",top:8,right:8,background:"#C4944A",color:"#fff",width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>✓</div>}<div style={{padding:"12px 14px 14px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:6}}><h4 style={{margin:0,fontSize:14,color:"#3B2412",fontFamily:"'Playfair Display',Georgia,serif",flex:1,lineHeight:1.3}}>{item.name}</h4><span style={{fontSize:15,fontWeight:700,color:item.price===0?"#2D5016":"#C4944A",whiteSpace:"nowrap"}}>{item.price===0?"Free":fmt(item.price)}</span></div><p style={{margin:"6px 0 0",fontSize:11,color:"#8B7355",lineHeight:1.4}}>{item.desc}</p></div></div>);}

function AddonToggle({item,active,onToggle,popular}){return(<div onClick={onToggle} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:12,cursor:"pointer",background:active?"rgba(196,148,74,0.08)":"#fff",border:active?"2px solid #C4944A":"2px solid #EDE8E0",transition:"all 0.25s ease",position:"relative"}}>{popular&&!active&&<div style={{position:"absolute",top:-8,right:12,background:"#C4944A",color:"#fff",padding:"2px 8px",borderRadius:8,fontSize:9,fontWeight:700}}>POPULAR</div>}<div style={{width:52,height:52,borderRadius:10,flexShrink:0,backgroundImage:`url(${item.img})`,backgroundSize:"cover"}}/><div style={{flex:1,minWidth:0}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:600,fontSize:13,color:"#3B2412"}}>{item.name}</span><span style={{fontWeight:700,fontSize:14,color:"#C4944A",whiteSpace:"nowrap",marginLeft:8}}>{fmt(item.price)}</span></div><p style={{margin:"3px 0 0",fontSize:11,color:"#8B7355",lineHeight:1.3}}>{item.desc}</p></div><div style={{width:22,height:22,borderRadius:6,flexShrink:0,border:active?"none":"2px solid #D4C5B0",background:active?"#C4944A":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",color:"#fff",fontSize:13,fontWeight:700}}>{active?"✓":""}</div></div>);}

function AddonSection({title,items,selected,onToggle,popularIds=[]}){return(<div style={{marginBottom:24}}><h3 style={{fontSize:12,color:"#C4944A",fontWeight:700,marginBottom:10,textTransform:"uppercase",letterSpacing:2}}>{title}</h3><div style={{display:"flex",flexDirection:"column",gap:10}}>{items.map(item=><AddonToggle key={item.id} item={item} active={selected.includes(item.id)} onToggle={()=>onToggle(item.id)} popular={popularIds.includes(item.id)}/>)}</div></div>);}

function SummaryItem({label,price,sub,onRemove}){return(<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #F0EBE3"}}><div style={{flex:1,minWidth:0}}><div style={{fontWeight:600,color:"#3B2412",fontSize:14}}>{label}</div>{sub&&<div style={{fontSize:12,color:"#8B7355",marginTop:2}}>{sub}</div>}</div><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{fontWeight:700,color:"#C4944A",fontSize:15}}>{fmt(price)}</div>{onRemove&&<button onClick={onRemove} style={{background:"none",border:"none",color:"#D4C5B0",cursor:"pointer",fontSize:16,fontWeight:700,padding:0,lineHeight:1,transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#C4944A"} onMouseLeave={e=>e.currentTarget.style.color="#D4C5B0"}>✕</button>}</div></div>);}

function PhotoPreviewModal({img,name,onClose}){if(!img)return null;return(<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.85)",backdropFilter:"blur(8px)",padding:20,cursor:"pointer"}}><button onClick={onClose} style={{position:"absolute",top:20,right:20,background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",width:40,height:40,borderRadius:"50%",fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button><div style={{maxWidth:800,maxHeight:"80vh",width:"100%"}}><img src={img} alt={name} style={{width:"100%",height:"auto",maxHeight:"75vh",objectFit:"contain",borderRadius:12}}/>{name&&<div style={{textAlign:"center",marginTop:16,color:"#fff",fontSize:18,fontWeight:600,fontFamily:"'Playfair Display',Georgia,serif"}}>{name}</div>}</div></div>);}

function EyeButton({onClick}){return(<button onClick={onClick} style={{position:"absolute",bottom:12,right:12,background:"rgba(0,0,0,0.6)",border:"none",color:"#fff",width:32,height:32,borderRadius:"50%",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",zIndex:10}} onMouseEnter={e=>e.currentTarget.style.background="rgba(196,148,74,0.9)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(0,0,0,0.6)"}>👁</button>);}

function RunningTotal({total,visible,step,onBack,onNext,showBack,nextLabel="Next",disabled=false}){if(!visible)return null;return(<div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,background:"linear-gradient(135deg,#3B2412,#5C3A1E)",padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 -4px 24px rgba(0,0,0,0.3)",gap:12}}>{showBack?(<button onClick={onBack} style={{padding:"10px 18px",borderRadius:20,border:"1px solid rgba(245,230,200,0.3)",background:"transparent",color:"#F5E6C8",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>&#8592; Back</button>):(<div style={{width:70}}/>)}<div style={{textAlign:"center"}}><div style={{fontSize:10,color:"rgba(245,230,200,0.5)",fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Total</div><div style={{fontSize:24,fontWeight:700,color:"#F5E6C8",fontFamily:"'Playfair Display',Georgia,serif"}}>{fmt(total)}</div></div><button onClick={()=>{if(!disabled)onNext();}} style={{padding:"10px 22px",borderRadius:20,border:"none",background:disabled?"rgba(196,148,74,0.4)":"linear-gradient(135deg,#C4944A,#D4AF37)",color:"#fff",fontSize:13,fontWeight:700,cursor:disabled?"not-allowed":"pointer",whiteSpace:"nowrap",opacity:disabled?0.5:1,transition:"all 0.3s"}}>{nextLabel} &#8594;</button></div>);}

function SavePlanModal({visible,onClose,onSave}){const[email,setEmail]=useState("");const[name,setName]=useState("");const[saved,setSaved]=useState(false);if(!visible)return null;const handleSave=()=>{if(!email.includes("@"))return;setSaved(true);onSave({email,name});};return(<div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(30,15,5,0.7)",backdropFilter:"blur(4px)",padding:20}} onClick={onClose}><div onClick={e=>e.stopPropagation()} style={{background:"#FBF8F3",borderRadius:20,padding:"32px 28px",maxWidth:420,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,0.3)",position:"relative"}}><button onClick={onClose} style={{position:"absolute",top:16,right:16,background:"none",border:"none",fontSize:20,color:"#B0A090",cursor:"pointer"}}>✕</button>{!saved?(<><div style={{textAlign:"center",marginBottom:24}}><div style={{fontSize:36,marginBottom:8}}>💾</div><h3 style={{margin:0,fontSize:22,color:"#3B2412",fontFamily:"'Playfair Display',Georgia,serif"}}>Save Your Plan</h3><p style={{margin:"8px 0 0",fontSize:14,color:"#8B7355",lineHeight:1.5}}>We'll email you a link to your custom proposal. Come back anytime to edit or book.</p></div><div style={{marginBottom:14}}><label style={{display:"block",fontSize:11,fontWeight:600,color:"#8B7355",marginBottom:4}}>Your Name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g., Marcus" style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"2px solid #EDE8E0",fontSize:14,fontFamily:"inherit",background:"#fff"}}/></div><div style={{marginBottom:20}}><label style={{display:"block",fontSize:11,fontWeight:600,color:"#8B7355",marginBottom:4}}>Email Address *</label><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" type="email" style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"2px solid #EDE8E0",fontSize:14,fontFamily:"inherit",background:"#fff"}}/></div><button onClick={handleSave} style={{width:"100%",padding:"16px",borderRadius:30,border:"none",cursor:"pointer",background:email.includes("@")?"linear-gradient(135deg,#C4944A,#D4AF37)":"#D4C5B0",color:"#fff",fontSize:16,fontWeight:700,opacity:email.includes("@")?1:0.5,transition:"all 0.3s"}}>Save & Email My Plan</button><p style={{textAlign:"center",fontSize:11,color:"#C4B8A8",marginTop:12}}>No spam. Just your saved proposal plan.</p></>):(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:48,marginBottom:12}}>✅</div><h3 style={{margin:"0 0 8px",fontSize:22,color:"#3B2412",fontFamily:"'Playfair Display',Georgia,serif"}}>Plan Saved!</h3><p style={{fontSize:14,color:"#8B7355",lineHeight:1.5,margin:"0 0 8px"}}>Check your inbox{name?`, ${name}`:""}. Your custom proposal plan is on its way.</p><p style={{fontSize:13,color:"#C4944A",fontWeight:600}}>Jill usually responds within a few hours if you decide to book.</p><button onClick={onClose} style={{marginTop:20,padding:"14px 40px",borderRadius:30,border:"2px solid #C4944A",background:"transparent",color:"#C4944A",fontSize:14,fontWeight:600,cursor:"pointer"}}>Back to My Plan</button></div>)}</div></div>);}

function ProposalDatePicker({value,onChange}){
  const[open,setOpen]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const handler=(e)=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",handler);
    return()=>document.removeEventListener("mousedown",handler);
  },[]);
  const formatted=value?value.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"}):"";
  return(
    <div ref={ref} style={{position:"relative"}}>
      <div onClick={()=>setOpen(o=>!o)} style={{padding:"12px 16px",borderRadius:10,border:"2px solid #EDE8E0",fontSize:14,background:"#FDFBF7",cursor:"pointer",color:value?"#3B2412":"#B0A090",display:"flex",justifyContent:"space-between",alignItems:"center",fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
        <span>{formatted||"Select your proposal date"}</span>
        <span style={{fontSize:16}}>📅</span>
      </div>
      {open&&(
        <div style={{position:"absolute",top:"calc(100% + 8px)",left:0,zIndex:50,background:"#FBF8F3",borderRadius:16,boxShadow:"0 8px 40px rgba(59,36,18,0.18)",border:"1px solid #EDE8E0",padding:"8px"}}>
          <DayPicker mode="single" selected={value} onSelect={(date)=>{onChange(date);setOpen(false);}} disabled={{before:new Date()}}/>
        </div>
      )}
    </div>
  );
}

export default function ProposalBuilder(){
  const[step,setStep]=useState(0);const[venue,setVenue]=useState(null);
  const[centerpieces,setCenterpieces]=useState([]);const[neonMsg,setNeonMsg]=useState(NEON_MESSAGES[0]);
  const[flowers,setFlowers]=useState([]);const[flowerQtys,setFlowerQtys]=useState({});const[structures,setStructures]=useState([]);const[structureNeonMsg,setStructureNeonMsg]=useState(null);const[wow,setWow]=useState([]);const[sparklerQty,setSparklerQty]=useState(0);const[addons,setAddons]=useState([]);const[proposalDate,setProposalDate]=useState(null);
  const[hotelName,setHotelName]=useState("");const[partnerName,setPartnerName]=useState("");
  const[contactEmail,setContactEmail]=useState("");const[contactPhone,setContactPhone]=useState("");const[countryCode,setCountryCode]=useState("+1");
  const[fade,setFade]=useState(true);const[showSave,setShowSave]=useState(false);
  const[planSaved,setPlanSaved]=useState(false);const[preview,setPreview]=useState(null);const[carouselIdx,setCarouselIdx]=useState(0);const[toast,setToast]=useState(false);const[frozenMatches,setFrozenMatches]=useState([]);const topRef=useRef(null);
  const[planMode,setPlanMode]=useState(null);const[selectedPackage,setSelectedPackage]=useState(null);const[pkgCarouselIdx,setPkgCarouselIdx]=useState(0);
  const showToast=()=>{setToast(true);setTimeout(()=>setToast(false),2000);};
  useEffect(()=>{if(step===7&&planMode==="custom")setFrozenMatches(findBestMatches());},[step,planMode]);

  const toggleAddon=(id)=>setAddons(p=>p.includes(id)?p.filter(a=>a!==id):[...p,id]);
  const toggleFlower=(id)=>{
    const item=FLOWERS.find(x=>x.id===id);
    if(item?.qty){
      if(flowers.includes(id)){setFlowers(p=>p.filter(a=>a!==id));setFlowerQtys(q=>{const n={...q};delete n[id];return n;});}
      else{setFlowers(p=>[...p,id]);setFlowerQtys(q=>({...q,[id]:item.unitMin}));}
    }else{setFlowers(p=>p.includes(id)?p.filter(a=>a!==id):[...p,id]);}
  };
  const adjustFlowerQty=(id,delta)=>{
    const item=FLOWERS.find(x=>x.id===id);if(!item)return;
    setFlowerQtys(q=>{const cur=q[id]||item.unitMin;const next=cur+delta;if(next<item.unitMin)return q;return{...q,[id]:next};});
  };
  const toggleStructure=(id)=>{setStructures(p=>p.includes(id)?p.filter(a=>a!==id):[...p,id]);if(id==="structure-neon")setStructureNeonMsg(null);};
  const toggleWow=(id)=>setWow(p=>p.includes(id)?p.filter(a=>a!==id):[...p,id]);
  const toggleCenterpiece=(id)=>setCenterpieces(p=>p.includes(id)?p.filter(a=>a!==id):[...p,id]);

  const findBestMatches = () => {
    const sameVenue = PORTFOLIO.filter(p => p.venue === venue);
    const pool = sameVenue.length > 0 ? sameVenue : PORTFOLIO;
    return pool
      .map(photo => {
        let score = 0;
        if (centerpieces.includes(photo.centerpiece)) score += 3;
        if (photo.time === "sunset") score += 2;
        flowers.forEach(f => { if (photo.flowers.includes(f)) score += 1; });
        wow.forEach(w => { if (photo.wow.includes(w)) score += 1; });
        if (sparklerQty > 0 && photo.wow.some(w => w.startsWith("sparklers"))) score += 1;
        return { ...photo, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const getExtras = (photo) => {
    const extras = [];
    centerpieces.forEach(id => {
      if (id !== photo.centerpiece && id !== "none") {
        const item = CENTERPIECES.find(c => c.id === id) || ACTIVITIES.find(c => c.id === id);
        if (item) extras.push({ id: item.id, name: item.name, type: "centerpiece" });
      }
    });
    flowers.forEach(id => {
      if (!photo.flowers.includes(id)) {
        const item = FLOWERS.find(f => f.id === id);
        if (item) extras.push({ id: item.id, name: item.name, type: "flower" });
      }
    });
    if (sparklerQty > 0 && !photo.wow.some(w => w.startsWith("sparklers"))) {
      extras.push({ id: "sparklers", name: `Fountain Sparklers x${sparklerQty}`, type: "wow" });
    }
    wow.forEach(id => {
      if (!photo.wow.includes(id)) {
        const item = WOW.find(w => w.id === id);
        if (item) extras.push({ id: item.id, name: item.name, type: "wow" });
      }
    });
    addons.forEach(id => {
      const all = [...ADDONS.music, ...ADDONS.capture];
      const item = all.find(a => a.id === id);
      if (item) extras.push({ id: item.id, name: item.name, type: "addon" });
    });
    return extras;
  };

  const getUpsells = (photo) => {
    const upsells = [];
    if (photo.centerpiece && photo.centerpiece !== "none" && !centerpieces.includes(photo.centerpiece)) {
      const item = CENTERPIECES.find(c => c.id === photo.centerpiece);
      if (item) upsells.push({ id: item.id, name: item.name, price: item.price, type: "centerpiece" });
    }
    photo.flowers.forEach(id => {
      if (!flowers.includes(id)) {
        const item = FLOWERS.find(f => f.id === id);
        if (item) upsells.push({ id: item.id, name: item.name, price: item.price, type: "flower" });
      }
    });
    photo.wow.forEach(id => {
      if (id.startsWith("sparklers")) {
        if (sparklerQty === 0) {
          const qty = parseInt(id.split("-")[1]);
          upsells.push({ id, name: `Fountain Sparklers x${qty}`, price: SPARKLER_PRICES[qty], type: "sparkler" });
        }
      } else if (!wow.includes(id)) {
        const item = WOW.find(w => w.id === id);
        if (item) upsells.push({ id: item.id, name: item.name, price: item.price, type: "wow" });
      }
    });
    return upsells;
  };

  const selectVenue=(id)=>{setVenue(id);setTimeout(()=>go(1),400);};
  const selectPlanMode=(mode)=>{setPlanMode(mode);go(1);};
  const getTotal=()=>{if(planMode==="premade"){let t=0;const pkg=PACKAGES.find(p=>p.id===selectedPackage);if(pkg)t+=pkg.price;const all=[...ADDONS.music,...ADDONS.capture];addons.forEach(id=>{const a=all.find(x=>x.id===id);if(a)t+=a.price;});return t;}let t=0;if(venue)t+=VENUES.find(v=>v.id===venue)?.price||0;centerpieces.forEach(id=>{const c=CENTERPIECES.find(x=>x.id===id)||ACTIVITIES.find(x=>x.id===id);if(c)t+=c.price;});flowers.forEach(id=>{const f=FLOWERS.find(x=>x.id===id);if(f){if(f.qty)t+=(flowerQtys[id]||f.unitMin)*f.pricePerUnit;else t+=f.price;}});structures.forEach(id=>{const s=STRUCTURES.find(x=>x.id===id);if(s)t+=s.price;});wow.forEach(id=>{const w=WOW.find(x=>x.id===id);if(w)t+=w.price;});t+=SPARKLER_PRICES[sparklerQty]||0;const all=[...ADDONS.music,...ADDONS.capture];addons.forEach(id=>{const a=all.find(x=>x.id===id);if(a)t+=a.price;});return t;};
  const go=(dir)=>{setFade(false);setTimeout(()=>{setStep(s=>s+dir);setFade(true);topRef.current?.scrollIntoView({behavior:"smooth",block:"start"});},250);};
  const canProceed=()=>{if(planMode==="custom"){if(step===2)return!!venue;if(step===3)return centerpieces.length>0;return true;}if(planMode==="premade"){if(step===2)return!!selectedPackage;return true;}return true;};
  const buildMsg=()=>{if(planMode==="premade"){const pkg=PACKAGES.find(p=>p.id===selectedPackage);const all=[...ADDONS.music,...ADDONS.capture];const sel=addons.map(id=>all.find(x=>x.id===id)).filter(Boolean);let m=`Hey Jill! I just chose a proposal package and I'm ready to make it happen 💍\n\n📦 Package: ${pkg?.name} (${fmt(pkg?.price||0)})\n`;if(pkg){m+=`\nIncludes:\n`;pkg.includes.forEach(item=>{m+=`- ${item}\n`;});}if(sel.length){m+=`\n🎶 Add-ons:\n`;sel.forEach(a=>m+=`- ${a.name} (${fmt(a.price)})\n`);}m+=`\n💰 Est. Total: ${fmt(getTotal())}\n`;if(proposalDate)m+=`\n📅 Proposal Date: ${proposalDate.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}\n`;if(partnerName)m+=`💕 Partner's name: ${partnerName}\n`;if(contactEmail)m+=`\n📧 Email: ${contactEmail}\n`;if(contactPhone)m+=`📱 Phone: ${countryCode} ${contactPhone}\n`;m+=`\nLooking forward to hearing from you!`;return encodeURIComponent(m);}const v=VENUES.find(x=>x.id===venue);const selCenterpieces=centerpieces.map(id=>CENTERPIECES.find(x=>x.id===id)||ACTIVITIES.find(x=>x.id===id)).filter(Boolean);const selFlowers=flowers.map(id=>FLOWERS.find(x=>x.id===id)).filter(Boolean);const selWow=wow.map(id=>WOW.find(x=>x.id===id)).filter(Boolean);const all=[...ADDONS.music,...ADDONS.capture];const sel=addons.map(id=>all.find(x=>x.id===id)).filter(Boolean);let m=`Hey Jill! I just built my proposal plan and I'm ready to make it happen 💍\n\n📍 Venue: ${v?.name} (${fmt(v?.price||0)})\n`;if(selCenterpieces.length){m+=`\n✨ Statement Prop:\n`;selCenterpieces.forEach(c=>{m+=`- ${c.name} (${fmt(c.price)})\n`;});}if(selFlowers.length){m+=`\n🌹 Flowers:\n`;selFlowers.forEach(f=>{if(f.qty){const q=flowerQtys[f.id]||f.unitMin;if(f.perBundle)m+=`- ${f.name} — ${q} ${q===1?"bundle":"bundles"} (${q*f.perBundle} ${f.bundleUnit||"arrangements"}) (${fmt(q*f.pricePerUnit)})\n`;else m+=`- ${q} ${f.name} (${fmt(q*f.pricePerUnit)})\n`;}else{m+=`- ${f.name} (${fmt(f.price)})\n`;}});}const selStructures=structures.map(id=>STRUCTURES.find(x=>x.id===id)).filter(Boolean);if(selStructures.length){m+=`\n🏛️ Structures:\n`;selStructures.forEach(s=>{m+=`- ${s.name} (${fmt(s.price)})`;if(s.id==="structure-neon")m+=` — "${structureNeonMsg}"`;m+=`\n`;});}if(selWow.length||sparklerQty>0){m+=`\n🎆 WOW Factor:\n`;if(sparklerQty>0)m+=`- Fountain Sparklers x${sparklerQty} (${fmt(SPARKLER_PRICES[sparklerQty])})\n`;selWow.forEach(w=>m+=`- ${w.name} (${fmt(w.price)})\n`);}if(sel.length){m+=`\n🎶 Add-ons:\n`;sel.forEach(a=>m+=`- ${a.name} (${fmt(a.price)})\n`);}m+=`\n💰 Est. Total: ${fmt(getTotal())}\n`;if(proposalDate)m+=`\n📅 Proposal Date: ${proposalDate.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}\n`;if(partnerName)m+=`💕 Partner's name: ${partnerName}\n`;if(contactEmail)m+=`\n📧 Email: ${contactEmail}\n`;if(contactPhone)m+=`📱 Phone: ${countryCode} ${contactPhone}\n`;m+=`\nLooking forward to hearing from you!`;return encodeURIComponent(m);};
  const buildEmailBody=()=>decodeURIComponent(buildMsg());
  const buildEmailSubject=()=>encodeURIComponent(`Proposal Inquiry${partnerName?` — for ${partnerName}`:""} — ${fmt(getTotal())}`);
  const inquiryReady=contactEmail.includes("@")&&contactPhone.length>=4;
  const handleSavePlan=({email,name})=>{console.log("LEAD CAPTURED:",{email,name,venue,centerpieces,neonMsg,flowers,structures,structureNeonMsg,wow,addons,total:getTotal()});setPlanSaved(true);};

  const total=getTotal();
  const anim={opacity:fade?1:0,transform:fade?"translateY(0)":"translateY(16px)",transition:"all 0.35s ease"};
  const btnMain=(ok)=>({padding:"16px 48px",borderRadius:30,border:"none",cursor:ok?"pointer":"default",background:ok?"linear-gradient(135deg,#C4944A,#D4AF37)":"#D4C5B0",color:"#fff",fontSize:16,fontWeight:700,boxShadow:ok?"0 4px 20px rgba(196,148,74,0.4)":"none",opacity:ok?1:0.4,transition:"all 0.3s"});
  const btnBack={padding:"16px 28px",borderRadius:30,border:"2px solid #C4944A",cursor:"pointer",background:"transparent",color:"#C4944A",fontSize:14,fontWeight:600};
  const customLabels=["Location","Statement Prop","Flowers","Setup Enhancements","Add-ons","Review & Book"];
  const premadeLabels=["Package","Extras","Review & Book"];
  const labels=planMode==="premade"?premadeLabels:customLabels;

  return(
    <div ref={topRef} style={{fontFamily:"'DM Sans','Segoe UI',sans-serif",minHeight:"100vh",background:"#FBF8F3"}}>
      <style>{`*{box-sizing:border-box;}body{margin:0;}input:focus{border-color:#C4944A !important;outline:none;}.rdp-root{--rdp-accent-color:#C4944A;--rdp-accent-color-dark:#3B2412;--rdp-day-height:40px;--rdp-day-width:40px;font-family:'DM Sans','Segoe UI',sans-serif;}.rdp-day_button:hover:not([disabled]){background:rgba(196,148,74,0.12);border-radius:8px;}.rdp-selected .rdp-day_button{background:#C4944A;color:#fff;border-radius:8px;}.rdp-today:not(.rdp-selected) .rdp-day_button{color:#C4944A;font-weight:700;}.rdp-chevron{fill:#C4944A;}.rdp-month_caption{color:#3B2412;font-weight:700;}@keyframes fadeIn{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}`}</style>
      <SavePlanModal visible={showSave} onClose={()=>setShowSave(false)} onSave={handleSavePlan}/>
      <PhotoPreviewModal img={preview?.img} name={preview?.name} onClose={()=>setPreview(null)}/>
      <div style={{position:"fixed",bottom:90,left:"50%",transform:`translateX(-50%) translateY(${toast?0:12}px)`,zIndex:999,background:"#3B2412",color:"#F5E6C8",padding:"12px 24px",borderRadius:30,fontSize:14,fontWeight:600,boxShadow:"0 4px 20px rgba(0,0,0,0.3)",opacity:toast?1:0,transition:"all 0.3s ease",pointerEvents:"none"}}>✓ Added to your plan</div>

      {step===0&&(<div style={{...anim,minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",background:"linear-gradient(160deg,#1A0E06,#3B2412 40%,#5C3A1E)",padding:28,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-80,right:-80,width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,148,74,0.15),transparent 70%)"}}/>
        <div style={{position:"absolute",bottom:-60,left:-60,width:250,height:250,borderRadius:"50%",background:"radial-gradient(circle,rgba(196,148,74,0.1),transparent 70%)"}}/>
        <div style={{fontSize:12,color:"#C4944A",fontWeight:700,letterSpacing:4,marginBottom:24,textTransform:"uppercase"}}>CANCUN PROPOSAL PLANNER</div>
        <h1 style={{fontSize:"clamp(44px,10vw,80px)",color:"#FFF8EE",margin:"0 0 20px",fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700,lineHeight:1.05,maxWidth:550}}>They're going to say <em style={{color:"#D4AF37",fontStyle:"italic"}}>yes.</em></h1>
        <p style={{fontSize:17,color:"rgba(255,248,238,0.75)",margin:"0 0 44px",maxWidth:420,lineHeight:1.7}}>Build your dream Cancun proposal in under 3 minutes. We handle every detail — you just show up and ask.</p>
        <button onClick={()=>go(1)} style={{...btnMain(true),padding:"20px 64px",fontSize:18}}>Start Planning</button>
        <div style={{marginTop:56,display:"flex",gap:40,flexWrap:"wrap",justifyContent:"center"}}>
          {[["1,500+","Successful Proposals"],["Since 2018","Years of Experience"],["5.0 ★","Client Rating"]].map(([n,l])=>(<div key={l} style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:700,color:"#D4AF37",fontFamily:"'Playfair Display',Georgia,serif"}}>{n}</div><div style={{fontSize:11,color:"rgba(255,248,238,0.5)",marginTop:4}}>{l}</div></div>))}
        </div>
      </div>)}

      {step===1&&(<div style={{...anim,maxWidth:920,margin:"0 auto",padding:"40px 20px 60px"}}>
        <button onClick={()=>{setFade(false);setTimeout(()=>{setStep(0);setPlanMode(null);setFade(true);topRef.current?.scrollIntoView({behavior:"smooth",block:"start"});},250);}} style={{background:"none",border:"none",color:"#B0A090",fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:24,padding:0}}>&#8592; Back</button>
        <SectionTitle title="How Would You Like to Plan?" subtitle="Choose your path — build every detail yourself, or pick one of our expertly curated packages."/>
        <div style={{display:"flex",gap:20,flexWrap:"wrap",justifyContent:"center"}}>
          {/* Premade Packages */}
          <div onClick={()=>selectPlanMode("premade")} style={{position:"relative",borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,0.08)",transition:"all 0.3s ease",flex:"1 1 320px",maxWidth:420,background:"#fff"}}>
            <div style={{position:"relative",height:260,backgroundImage:`url(${IMG.rooftop})`,backgroundSize:"cover",backgroundPosition:"center"}}>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 30%,rgba(0,0,0,0.75))"}}>
                <div style={{position:"absolute",bottom:16,left:20,right:20}}>
                  <div style={{fontSize:24,fontWeight:700,color:"#FFF8EE",fontFamily:"'Playfair Display',Georgia,serif"}}>Premade Packages</div>
                  <div style={{fontSize:13,color:"rgba(255,248,238,0.8)",marginTop:4}}>Curated by Jill — ready to book</div>
                </div>
              </div>
            </div>
            <div style={{padding:"16px 20px 20px"}}>
              <p style={{margin:"0 0 12px",fontSize:14,color:"#6B5744",lineHeight:1.6}}>Choose from three expertly designed packages. Everything is included — just add optional extras and you're set.</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:13,color:"#B0A090"}}>Starting from <strong style={{color:"#C4944A",fontSize:16}}>{fmt(1000)}</strong></span>
                <span style={{fontSize:13,fontWeight:700,color:"#C4944A"}}>Browse Packages &#8594;</span>
              </div>
            </div>
          </div>
          {/* Build Your Own */}
          <div onClick={()=>selectPlanMode("custom")} style={{position:"relative",borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,0.08)",transition:"all 0.3s ease",flex:"1 1 320px",maxWidth:420,background:"#fff"}}>
            <div style={{position:"relative",height:260,backgroundImage:`url(${IMG.beach})`,backgroundSize:"cover",backgroundPosition:"center"}}>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 30%,rgba(0,0,0,0.75))"}}>
                <div style={{position:"absolute",bottom:16,left:20,right:20}}>
                  <div style={{fontSize:24,fontWeight:700,color:"#FFF8EE",fontFamily:"'Playfair Display',Georgia,serif"}}>Build Your Own</div>
                  <div style={{fontSize:13,color:"rgba(255,248,238,0.8)",marginTop:4}}>Full creative control over every detail</div>
                </div>
              </div>
            </div>
            <div style={{padding:"16px 20px 20px"}}>
              <p style={{margin:"0 0 12px",fontSize:14,color:"#6B5744",lineHeight:1.6}}>Pick your venue, statement props, flowers, structures, and more. Perfect for those who want to customize everything.</p>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:13,color:"#B0A090"}}>Starting from <strong style={{color:"#C4944A",fontSize:16}}>{fmt(350)}</strong></span>
                <span style={{fontSize:13,fontWeight:700,color:"#C4944A"}}>Customize &#8594;</span>
              </div>
            </div>
          </div>
        </div>
      </div>)}

      {step>1&&((planMode==="custom"&&step<8)||(planMode==="premade"&&step<5))&&(<div style={{maxWidth:920,margin:"0 auto",padding:"12px 20px 110px"}}>
        <StepIndicator current={step-2} total={labels.length} labels={labels}/>

        {step===2&&planMode==="custom"&&(<div style={anim}><div style={{display:"flex",justifyContent:"flex-start",marginBottom:8}}><button onClick={()=>{setPlanMode(null);setFade(false);setTimeout(()=>{setStep(1);setFade(true);topRef.current?.scrollIntoView({behavior:"smooth",block:"start"});},250);}} style={{background:"none",border:"none",color:"#B0A090",fontSize:13,fontWeight:600,cursor:"pointer",padding:0}}>&#8592; Change path</button></div><SectionTitle title="Choose Your Setting" subtitle="Every location includes coordination, 1.5 hours, cocktail table, sparkling wine, personal server, and bluetooth speaker."/><div style={{display:"flex",gap:20,flexWrap:"wrap",justifyContent:"center"}}>{VENUES.map(v=><VenueCard key={v.id} venue={v} selected={venue} onSelect={selectVenue} onPreview={(img,name)=>setPreview({img,name})}/>)}</div><SocialProofCard data={SOCIAL_PROOF.venue}/></div>)}

        {step===3&&planMode==="custom"&&(<div style={anim}><SectionTitle title="Choose Your Statement Prop" subtitle="This is the moment they'll replay forever. Choose at least one statement prop to make it unforgettable."/>
          <h3 style={{fontSize:12,color:"#C4944A",fontWeight:700,marginBottom:10,marginTop:4,textTransform:"uppercase",letterSpacing:2}}>Decoratives</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
            {CENTERPIECES.map(item=>(<div key={item.id} onClick={()=>toggleCenterpiece(item.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:14,cursor:"pointer",background:centerpieces.includes(item.id)?"rgba(196,148,74,0.08)":"#fff",border:centerpieces.includes(item.id)?"2px solid #C4944A":"2px solid #EDE8E0",transition:"all 0.25s ease",position:"relative"}}>{item.badge&&!centerpieces.includes(item.id)&&<div style={{position:"absolute",top:-8,right:12,background:"#C4944A",color:"#fff",padding:"2px 8px",borderRadius:8,fontSize:9,fontWeight:700}}>{item.badge}</div>}<div style={{width:60,height:60,borderRadius:12,flexShrink:0,backgroundImage:`url(${item.img})`,backgroundSize:"cover",backgroundPosition:"center"}}/><div style={{flex:1,minWidth:0}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:600,fontSize:14,color:"#3B2412"}}>{item.name}</span><span style={{fontWeight:700,fontSize:15,color:item.price===0?"#2D5016":"#C4944A",whiteSpace:"nowrap",marginLeft:8}}>{item.price===0?"Free":fmt(item.price)}</span></div><p style={{margin:"4px 0 0",fontSize:12,color:"#8B7355",lineHeight:1.4}}>{item.desc}</p></div><div style={{width:24,height:24,borderRadius:6,flexShrink:0,border:centerpieces.includes(item.id)?"none":"2px solid #D4C5B0",background:centerpieces.includes(item.id)?"#C4944A":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",color:"#fff",fontSize:14,fontWeight:700}}>{centerpieces.includes(item.id)?"✓":""}</div></div>))}
          </div>
          <h3 style={{fontSize:12,color:"#C4944A",fontWeight:700,marginBottom:10,marginTop:28,textTransform:"uppercase",letterSpacing:2}}>Activities</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
            {ACTIVITIES.map(item=>(<div key={item.id} onClick={()=>toggleCenterpiece(item.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:14,cursor:"pointer",background:centerpieces.includes(item.id)?"rgba(196,148,74,0.08)":"#fff",border:centerpieces.includes(item.id)?"2px solid #C4944A":"2px solid #EDE8E0",transition:"all 0.25s ease",position:"relative"}}><div style={{width:60,height:60,borderRadius:12,flexShrink:0,backgroundImage:`url(${item.img})`,backgroundSize:"cover",backgroundPosition:"center"}}/><div style={{flex:1,minWidth:0}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:600,fontSize:14,color:"#3B2412"}}>{item.name}</span><span style={{fontWeight:700,fontSize:15,color:"#C4944A",whiteSpace:"nowrap",marginLeft:8}}>{fmt(item.price)}</span></div><p style={{margin:"4px 0 0",fontSize:12,color:"#8B7355",lineHeight:1.4}}>{item.desc}</p></div><div style={{width:24,height:24,borderRadius:6,flexShrink:0,border:centerpieces.includes(item.id)?"none":"2px solid #D4C5B0",background:centerpieces.includes(item.id)?"#C4944A":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",color:"#fff",fontSize:14,fontWeight:700}}>{centerpieces.includes(item.id)?"✓":""}</div></div>))}
          </div>
          <SocialProofCard data={SOCIAL_PROOF.centerpiece}/></div>)}

        {step===4&&planMode==="custom"&&(<div style={anim}><SectionTitle title="Flowers & Roses" subtitle="Add romantic floral touches to your setup. Select as many as you like, or skip."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
            {FLOWERS.map(item=>{const sel=flowers.includes(item.id);const isQty=!!item.qty;const qty=flowerQtys[item.id]||item.unitMin;const price=isQty?(sel?qty*item.pricePerUnit:item.unitMin*item.pricePerUnit):item.price;return(<div key={item.id} onClick={()=>{if(!isQty||!sel)toggleFlower(item.id);}} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:14,cursor:"pointer",background:sel?"rgba(196,148,74,0.08)":"#fff",border:sel?"2px solid #C4944A":"2px solid #EDE8E0",transition:"all 0.25s ease",position:"relative"}}>{item.badge&&!sel&&<div style={{position:"absolute",top:-8,right:12,background:"#C4944A",color:"#fff",padding:"2px 8px",borderRadius:8,fontSize:9,fontWeight:700}}>{item.badge}</div>}<div style={{width:60,height:60,borderRadius:12,flexShrink:0,backgroundImage:`url(${item.img})`,backgroundSize:"cover",backgroundPosition:"center"}}/><div style={{flex:1,minWidth:0}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:600,fontSize:14,color:"#3B2412"}}>{isQty&&sel?(item.perBundle?`${qty} ${qty===1?"bundle":"bundles"} (${qty*item.perBundle} ${item.bundleUnit||"arrangements"})`:`${qty} ${item.name}`):item.name}</span><span style={{fontWeight:700,fontSize:15,color:"#C4944A",whiteSpace:"nowrap",marginLeft:8}}>{fmt(price)}</span></div><p style={{margin:"4px 0 0",fontSize:12,color:"#8B7355",lineHeight:1.4}}>{item.desc}</p>{isQty&&sel&&(<div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}} onClick={e=>e.stopPropagation()}><button onClick={()=>{const next=qty-item.unitStep;if(next<item.unitMin)toggleFlower(item.id);else adjustFlowerQty(item.id,-item.unitStep);}} style={{width:32,height:32,borderRadius:"50%",border:"2px solid #C4944A",background:"transparent",color:"#C4944A",fontSize:18,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button><span style={{fontSize:16,fontWeight:700,color:"#3B2412",minWidth:36,textAlign:"center"}}>{qty}</span><button onClick={()=>adjustFlowerQty(item.id,item.unitStep)} style={{width:32,height:32,borderRadius:"50%",border:"none",background:"#C4944A",color:"#fff",fontSize:18,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button></div>)}</div>{!isQty&&<div style={{width:24,height:24,borderRadius:6,flexShrink:0,border:sel?"none":"2px solid #D4C5B0",background:sel?"#C4944A":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",color:"#fff",fontSize:14,fontWeight:700}}>{sel?"✓":""}</div>}{isQty&&!sel&&<div style={{width:24,height:24,borderRadius:6,flexShrink:0,border:"2px solid #D4C5B0",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}/>}</div>);})}
          </div>
          </div>)}

        {step===5&&planMode==="custom"&&(<div style={anim}><SectionTitle title="Setup Enhancements" subtitle="Add sparklers and structures to elevate your proposal. Select as many as you like, or skip."/>
          {/* Sparklers */}
          <h3 style={{fontSize:12,color:"#C4944A",fontWeight:700,marginBottom:10,marginTop:4,textTransform:"uppercase",letterSpacing:2}}>Sparklers</h3>
            <div onClick={()=>{if(sparklerQty===0)setSparklerQty(2);}} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:14,cursor:"pointer",background:sparklerQty>0?"rgba(196,148,74,0.08)":"#fff",border:sparklerQty>0?"2px solid #C4944A":"2px solid #EDE8E0",transition:"all 0.25s ease"}}>
              <div style={{width:60,height:60,borderRadius:12,flexShrink:0,backgroundImage:`url(${IMG.sparklers2})`,backgroundSize:"cover",backgroundPosition:"center"}}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:600,fontSize:14,color:"#3B2412"}}>{sparklerQty>0?`${sparklerQty} Fountain Sparklers`:"Fountain Sparklers"}</span><span style={{fontWeight:700,fontSize:15,color:"#C4944A",whiteSpace:"nowrap",marginLeft:8}}>{sparklerQty>0?fmt(SPARKLER_PRICES[sparklerQty]):fmt(SPARKLER_PRICES[2])}</span></div>
                <p style={{margin:"4px 0 0",fontSize:12,color:"#8B7355",lineHeight:1.4}}>Cold sparkler fountains — a dramatic WOW moment</p>
                {sparklerQty>0&&sparklerQty<SPARKLER_MAX&&<p style={{margin:"2px 0 0",fontSize:10,color:"#B0A090",lineHeight:1.4}}>+2 more: +{fmt(SPARKLER_PRICES[sparklerQty+2]-SPARKLER_PRICES[sparklerQty])}</p>}
                {sparklerQty>0&&(<div style={{display:"flex",alignItems:"center",gap:10,marginTop:8}} onClick={e=>e.stopPropagation()}><button onClick={()=>setSparklerQty(q=>q-2)} style={{width:32,height:32,borderRadius:"50%",border:"2px solid #C4944A",background:"transparent",color:"#C4944A",fontSize:18,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button><span style={{fontSize:16,fontWeight:700,color:"#3B2412",minWidth:36,textAlign:"center"}}>{sparklerQty}</span><button onClick={()=>setSparklerQty(q=>Math.min(SPARKLER_MAX,q+2))} disabled={sparklerQty===SPARKLER_MAX} style={{width:32,height:32,borderRadius:"50%",border:"none",background:sparklerQty===SPARKLER_MAX?"#EDE8E0":"#C4944A",color:sparklerQty===SPARKLER_MAX?"#B0A090":"#fff",fontSize:18,fontWeight:700,cursor:sparklerQty===SPARKLER_MAX?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button></div>)}
              </div>
              {sparklerQty===0&&<div style={{width:24,height:24,borderRadius:6,flexShrink:0,border:"2px solid #D4C5B0",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}/>}
            </div>
          {/* Structures */}
          <h3 style={{fontSize:12,color:"#C4944A",fontWeight:700,marginBottom:10,marginTop:24,textTransform:"uppercase",letterSpacing:2}}>Structures</h3>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {STRUCTURES.map(item=>(<div key={item.id}><div onClick={()=>toggleStructure(item.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:14,cursor:"pointer",background:structures.includes(item.id)?"rgba(196,148,74,0.08)":"#fff",border:structures.includes(item.id)?"2px solid #C4944A":"2px solid #EDE8E0",transition:"all 0.25s ease",position:"relative"}}><div style={{width:60,height:60,borderRadius:12,flexShrink:0,backgroundImage:`url(${item.img})`,backgroundSize:"cover",backgroundPosition:"center"}}/><div style={{flex:1,minWidth:0}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:600,fontSize:14,color:"#3B2412"}}>{item.name}</span><span style={{fontWeight:700,fontSize:15,color:"#C4944A",whiteSpace:"nowrap",marginLeft:8}}>{fmt(item.price)}</span></div><p style={{margin:"4px 0 0",fontSize:12,color:"#8B7355",lineHeight:1.4}}>{item.desc}</p></div><div style={{width:24,height:24,borderRadius:6,flexShrink:0,border:structures.includes(item.id)?"none":"2px solid #D4C5B0",background:structures.includes(item.id)?"#C4944A":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",color:"#fff",fontSize:14,fontWeight:700}}>{structures.includes(item.id)?"✓":""}</div></div>{item.id==="structure-neon"&&structures.includes("structure-neon")&&(<div style={{marginTop:8,padding:"16px 20px",background:"rgba(196,148,74,0.07)",borderRadius:14,marginLeft:4,marginRight:4}}><p style={{margin:"0 0 10px",fontSize:13,fontWeight:600,color:"#3B2412"}}>Choose your message:</p><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{STRUCTURE_NEON_MESSAGES.map(msg=>(<button key={msg} onClick={()=>setStructureNeonMsg(msg)} style={{padding:"8px 16px",borderRadius:20,border:"none",cursor:"pointer",background:structureNeonMsg===msg?"#C4944A":"#F5E6C8",color:structureNeonMsg===msg?"#fff":"#3B2412",fontSize:12,fontWeight:600,transition:"all 0.2s"}}>"{msg}"</button>))}</div></div>)}</div>))}
          </div>
          {structures.includes("structure-neon")&&!structureNeonMsg&&(<div style={{textAlign:"center",marginTop:20,padding:"10px 16px",background:"#FFF8EE",border:"1px solid #F0E6D0",borderRadius:10,fontSize:13,color:"#8B6914",fontWeight:600}}>Please select a message for your Neon Sign above</div>)}</div>)}

        {step===6&&planMode==="custom"&&(<div style={anim}><SectionTitle title="Capture & Music" subtitle="Add photography, video, or live music. Everything here is optional."/><SocialProofCard data={SOCIAL_PROOF.addons}/><div style={{maxWidth:500,margin:"0 auto"}}><AddonSection title="📸 Capture the Moment" items={ADDONS.capture} selected={addons} onToggle={toggleAddon} popularIds={["photo-30","photo-60"]}/><AddonSection title="🎵 Music" items={ADDONS.music} selected={addons} onToggle={toggleAddon}/></div><div style={{display:"flex",justifyContent:"center",gap:14,marginTop:28}}><button onClick={()=>go(-1)} style={btnBack}>Back</button><button onClick={()=>go(1)} style={btnMain(true)}>Review Your Proposal</button></div></div>)}

        {step===7&&planMode==="custom"&&(<div style={anim}><SectionTitle title="Your Perfect Proposal" subtitle="Review everything and book with Jill."/>
          <div style={{background:"#fff",borderRadius:20,overflow:"hidden",boxShadow:"0 8px 40px rgba(59,36,18,0.08)"}}>
            {/* Portfolio Carousel */}
            {(() => {
              const matches = frozenMatches;
              const fallbackImg = VENUES.find(v => v.id === venue)?.img;
              const extras = matches[0] ? getExtras(matches[0]) : [];
              const idx = Math.min(carouselIdx, matches.length - 1);
              const current = matches[idx];
              const currentUpsells = current ? getUpsells(current) : [];
              return (
                <div>
                  {/* Carousel title */}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px 0"}}>
                    <div style={{fontSize:16,fontWeight:700,color:"#3B2412",letterSpacing:0.5}}>Similar Setups From Our Portfolio</div>
                    {matches.length > 1 && <div style={{fontSize:12,color:"#B0A090",fontWeight:600}}>{idx + 1}/{matches.length}</div>}
                  </div>
                  {/* Carousel slide */}
                  <div style={{position:"relative",overflow:"hidden"}}>
                    {matches.length > 0 ? (
                      <div style={{position:"relative",cursor:"pointer"}} onClick={() => setPreview({img:current.img,name:`Similar setup ${idx+1}`})}>
                        <div style={{height:320,backgroundImage:`url(${current.img})`,backgroundSize:"cover",backgroundPosition:"center",transition:"background-image 0.3s ease"}}/>
                        <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(transparent,rgba(0,0,0,0.85))"}}>
                          {/* Upsells overlay */}
                          {currentUpsells.length > 0 ? (
                            <div style={{padding:"60px 16px 16px"}}>
                              <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",fontWeight:600,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>Want it exactly like this? Add:</div>
                              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                                {currentUpsells.map((item) => (
                                  <button key={item.id} onClick={(e) => { e.stopPropagation(); if (item.type === "centerpiece") toggleCenterpiece(item.id); else if (item.type === "flower") toggleFlower(item.id); else if (item.type === "wow") toggleWow(item.id); else if (item.type === "sparkler") { const qty = parseInt(item.id.split("-")[1]); setSparklerQty(qty); } showToast(); }} style={{padding:"8px 16px",borderRadius:20,border:"1.5px solid rgba(255,255,255,0.4)",cursor:"pointer",background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",color:"#fff",fontSize:12,fontWeight:600,transition:"all 0.2s"}}>+ {item.name} {fmt(item.price)}</button>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div style={{padding:"50px 16px 16px"}}>
                              <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Your setup matches this photo</div>
                              <div style={{fontSize:16,color:"#fff",fontWeight:600,fontFamily:"'Playfair Display',Georgia,serif",marginTop:4}}>{VENUES.find(v=>v.id===venue)?.name} · Sunset</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{position:"relative"}}>
                        <div style={{height:320,backgroundImage:`url(${fallbackImg})`,backgroundSize:"cover",backgroundPosition:"center"}}/>
                        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"50px 16px 16px",background:"linear-gradient(transparent,rgba(0,0,0,0.8))"}}>
                          <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Your Setup</div>
                          <div style={{fontSize:16,color:"#fff",fontWeight:600,fontFamily:"'Playfair Display',Georgia,serif",marginTop:4}}>{VENUES.find(v=>v.id===venue)?.name} · Sunset</div>
                        </div>
                      </div>
                    )}
                    {/* Arrows */}
                    {matches.length > 1 && (
                      <>
                        <button onClick={(e) => { e.stopPropagation(); setCarouselIdx(i => (i - 1 + matches.length) % matches.length); }} style={{position:"absolute",top:"50%",left:10,transform:"translateY(-50%)",width:36,height:36,borderRadius:"50%",border:"none",background:"rgba(0,0,0,0.5)",color:"#fff",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>&#8249;</button>
                        <button onClick={(e) => { e.stopPropagation(); setCarouselIdx(i => (i + 1) % matches.length); }} style={{position:"absolute",top:"50%",right:10,transform:"translateY(-50%)",width:36,height:36,borderRadius:"50%",border:"none",background:"rgba(0,0,0,0.5)",color:"#fff",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>&#8250;</button>
                      </>
                    )}
                  </div>
                  {/* Dots */}
                  {matches.length > 1 && (
                    <div style={{display:"flex",justifyContent:"center",gap:8,padding:"12px 0"}}>
                      {matches.map((_, i) => (
                        <button key={i} onClick={() => setCarouselIdx(i)} style={{width:i===idx?24:8,height:8,borderRadius:4,border:"none",cursor:"pointer",background:i===idx?"#C4944A":"#E8E0D4",transition:"all 0.3s ease",padding:0}}/>
                      ))}
                    </div>
                  )}
                  {/* Yours will also include */}
                  {extras.length > 0 && (
                    <div style={{padding:"14px 20px",background:"rgba(196,148,74,0.06)",borderBottom:"1px solid #F0EBE3"}}>
                      <div style={{fontSize:12,fontWeight:700,color:"#8B7355",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Yours will also include:</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                        {extras.map((item) => (
                          <span key={item.id} style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(196,148,74,0.15)",color:"#6B5744",padding:"5px 12px",borderRadius:14,fontSize:12,fontWeight:600}}>+ {item.name}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
            <div style={{padding:"24px 28px",textAlign:"center",background:"linear-gradient(135deg,#3B2412,#5C3A1E)"}}><div style={{fontSize:11,color:"rgba(245,230,200,0.6)",fontWeight:600,letterSpacing:2,marginBottom:8}}>ESTIMATED TOTAL</div><div style={{fontSize:52,fontWeight:700,color:"#F5E6C8",fontFamily:"'Playfair Display',Georgia,serif"}}>{fmt(total)}</div></div>
            <div style={{padding:"20px 28px"}}><SummaryItem label={`${VENUES.find(v=>v.id===venue)?.name} Venue`} price={VENUES.find(v=>v.id===venue)?.price||0} sub={`Sunset · 1.5 hours · Sparkling wine included`}/>{centerpieces.map(id=>{const item=CENTERPIECES.find(x=>x.id===id)||ACTIVITIES.find(x=>x.id===id);return item&&item.id!=="none"?<SummaryItem key={id} label={item.name} price={item.price} onRemove={()=>toggleCenterpiece(id)}/>:null;})}{flowers.map(id=>{const item=FLOWERS.find(x=>x.id===id);if(!item)return null;if(item.qty){const q=flowerQtys[id]||item.unitMin;const lbl=item.perBundle?`${item.name} — ${q} ${q===1?"bundle":"bundles"} (${q*item.perBundle} ${item.bundleUnit||"arrangements"})`:`${q} ${item.name}`;return<SummaryItem key={id} label={lbl} price={q*item.pricePerUnit} onRemove={()=>toggleFlower(id)}/>;}return<SummaryItem key={id} label={item.name} price={item.price} onRemove={()=>toggleFlower(id)}/>;})}{structures.map(id=>{const item=STRUCTURES.find(x=>x.id===id);return item?<SummaryItem key={id} label={item.name} price={item.price} sub={id==="structure-neon"?`Message: "${structureNeonMsg}"`:null} onRemove={()=>toggleStructure(id)}/>:null;})}{sparklerQty>0&&<SummaryItem key="sparklers" label={`Fountain Sparklers x${sparklerQty}`} price={SPARKLER_PRICES[sparklerQty]} onRemove={()=>setSparklerQty(0)}/>}{wow.map(id=>{const item=WOW.find(x=>x.id===id);return item?<SummaryItem key={id} label={item.name} price={item.price} onRemove={()=>toggleWow(id)}/>:null;})}{addons.map(id=>{const all=[...ADDONS.music,...ADDONS.capture];const item=all.find(x=>x.id===id);return item?<SummaryItem key={id} label={item.name} price={item.price} onRemove={()=>toggleAddon(id)}/>:null;})}</div>

            <div style={{margin:"0 28px 16px",padding:"16px 18px",background:"linear-gradient(135deg,rgba(212,175,55,0.08),rgba(196,148,74,0.12))",borderRadius:12,borderLeft:"3px solid #D4AF37",display:"flex",alignItems:"flex-start",gap:12}}><div style={{fontSize:20,lineHeight:1,flexShrink:0,marginTop:1}}>🌅</div><div><div style={{fontSize:14,fontWeight:700,color:"#3B2412",marginBottom:4,fontFamily:"'Playfair Display',Georgia,serif"}}>Timed to golden hour</div><div style={{fontSize:13,color:"#6B5744",lineHeight:1.5}}>After a decade of planning professional proposals in Cancún, we know the best time for an unforgettable moment is sunset. That's why we always reserve yours for this special hour.</div></div></div>

            {!addons.some(a=>["photo-30","photo-60"].includes(a))&&(<div style={{margin:"0 28px 16px",padding:"14px 16px",background:"#FFF8EE",border:"1px solid #F0E6D0",borderRadius:10}}><div style={{fontSize:13,color:"#8B6914",fontWeight:600}}>📸 94% of our clients add photography. Want to add it?</div><div style={{display:"flex",gap:8,marginTop:8}}><button onClick={()=>toggleAddon("photo-30")} style={{padding:"8px 16px",borderRadius:20,border:"none",cursor:"pointer",background:"#C4944A",color:"#fff",fontSize:12,fontWeight:600}}>+ Add 30min ($295)</button><button onClick={()=>toggleAddon("photo-60")} style={{padding:"8px 16px",borderRadius:20,cursor:"pointer",background:"transparent",border:"1px solid #C4944A",color:"#C4944A",fontSize:12,fontWeight:600}}>+ Add 60min ($350)</button></div></div>)}

            <div style={{padding:"0 28px 24px",borderTop:"2px solid #F5F0E8"}}><h3 style={{fontSize:16,color:"#3B2412",margin:"20px 0 16px",fontFamily:"'Playfair Display',Georgia,serif"}}>Your contact & trip details</h3>
              <div style={{marginBottom:12}}><label style={{display:"block",fontSize:11,fontWeight:600,color:"#8B7355",marginBottom:4}}>Email Address *</label><input value={contactEmail} onChange={e=>setContactEmail(e.target.value)} placeholder="your@email.com" type="email" style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"2px solid #EDE8E0",fontSize:14,fontFamily:"inherit",background:"#FDFBF7",transition:"border 0.2s"}}/></div>
              <div style={{marginBottom:12}}><label style={{display:"block",fontSize:11,fontWeight:600,color:"#8B7355",marginBottom:4}}>Phone Number *</label>
                <div style={{display:"flex",gap:8}}>
                  <select value={`${countryCode}|${COUNTRY_CODES.find(c=>c.code===countryCode)?.country||"US"}`} onChange={e=>{const[code]=e.target.value.split("|");setCountryCode(code);}} style={{padding:"12px 8px",borderRadius:10,border:"2px solid #EDE8E0",fontSize:14,fontFamily:"inherit",background:"#FDFBF7",minWidth:120,cursor:"pointer",transition:"border 0.2s"}}>
                    {COUNTRY_CODES.map(c=><option key={c.country} value={`${c.code}|${c.country}`}>{c.flag} {c.code} {c.label}</option>)}
                  </select>
                  <input value={contactPhone} onChange={e=>setContactPhone(e.target.value.replace(/[^0-9]/g,""))} placeholder="Phone number" type="tel" style={{flex:1,padding:"12px 16px",borderRadius:10,border:"2px solid #EDE8E0",fontSize:14,fontFamily:"inherit",background:"#FDFBF7",transition:"border 0.2s"}}/>
                </div>
              </div>
              <div style={{marginBottom:12}}><label style={{display:"block",fontSize:11,fontWeight:600,color:"#8B7355",marginBottom:4}}>Proposal Date</label><ProposalDatePicker value={proposalDate} onChange={setProposalDate}/></div>
              <div style={{marginBottom:12}}><label style={{display:"block",fontSize:11,fontWeight:600,color:"#8B7355",marginBottom:4}}>Partner's First Name</label><input value={partnerName} onChange={e=>setPartnerName(e.target.value)} placeholder="e.g., Sarah" style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"2px solid #EDE8E0",fontSize:14,fontFamily:"inherit",background:"#FDFBF7",transition:"border 0.2s"}}/></div>
            </div>

            <div style={{padding:"16px 28px 28px",display:"flex",flexDirection:"column",gap:12,alignItems:"center"}}>
              <a href={inquiryReady?`mailto:${BUSINESS_EMAIL}?subject=${buildEmailSubject()}&body=${buildMsg()}`:undefined} onClick={e=>{if(!inquiryReady)e.preventDefault();}} style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"18px 48px",borderRadius:30,textDecoration:"none",background:inquiryReady?"linear-gradient(135deg,#C4944A,#D4AF37)":"#D4C5B0",color:"#fff",fontSize:17,fontWeight:700,boxShadow:inquiryReady?"0 4px 20px rgba(196,148,74,0.4)":"none",width:"100%",maxWidth:380,textAlign:"center",opacity:inquiryReady?1:0.5,cursor:inquiryReady?"pointer":"not-allowed",transition:"all 0.3s"}}>Send Inquiry via Email</a>
              {!inquiryReady&&<div style={{textAlign:"center",fontSize:12,color:"#C4944A",lineHeight:1.5,maxWidth:340}}>Please fill in your email and phone number above to send your inquiry</div>}
              <div style={{display:"flex",alignItems:"center",gap:12,width:"100%",maxWidth:380,margin:"4px 0"}}><div style={{flex:1,height:1,background:"#EDE8E0"}}/><span style={{fontSize:11,color:"#B0A090",fontWeight:600,whiteSpace:"nowrap"}}>Want a faster response?</span><div style={{flex:1,height:1,background:"#EDE8E0"}}/></div>
              <a href={`https://api.whatsapp.com/send?phone=${PHONE}&text=${buildMsg()}`} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"16px 48px",borderRadius:30,textDecoration:"none",background:"#25D366",color:"#fff",fontSize:15,fontWeight:700,boxShadow:"0 4px 20px rgba(37,211,102,0.35)",width:"100%",maxWidth:380,textAlign:"center"}}>Send via WhatsApp</a>
              <div style={{textAlign:"center",fontSize:12,color:"#6B5744",lineHeight:1.5,maxWidth:340,padding:"4px 0"}}>Jill typically responds within minutes on WhatsApp</div>
              <button onClick={()=>setShowSave(true)} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px 36px",borderRadius:30,border:"2px solid #C4944A",cursor:"pointer",background:planSaved?"rgba(196,148,74,0.08)":"transparent",color:"#C4944A",fontSize:14,fontWeight:600,width:"100%",maxWidth:380}}>{planSaved?"✓ Plan Saved — Check Your Email":"Save My Plan for Later"}</button>
              <button onClick={()=>go(-1)} style={{...btnBack,fontSize:13,padding:"12px 24px",border:"none",color:"#B0A090"}}>← Edit Selections</button>
            </div>
          </div>

          <div style={{marginTop:24,padding:"16px 20px",background:"#fff",borderRadius:12,border:"1px solid #EDE8E0",textAlign:"center"}}><div style={{fontSize:13,color:"#6B5744",fontWeight:600,marginBottom:4}}>🗓️ Sunset slots book 2-3 weeks in advance during peak season (Dec - April)</div><div style={{fontSize:12,color:"#B0A090"}}>Secure your date with a retainer — Jill will confirm everything.</div></div>
          <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:20,flexWrap:"wrap"}}>{["No hidden fees","1,500+ proposals since 2018","Jill responds within hours"].map(t=><span key={t} style={{fontSize:12,color:"#B0A090",fontWeight:500}}>✓ {t}</span>)}</div>
          <p style={{textAlign:"center",fontSize:11,color:"#C4B8A8",marginTop:12,lineHeight:1.5,maxWidth:440,margin:"12px auto 0"}}>Prices are estimates. Final pricing confirmed with Jill.</p>
        </div>)}

        {/* ===== PREMADE FLOW ===== */}
        {step===2&&planMode==="premade"&&!selectedPackage&&(<div style={anim}>
          <SectionTitle title="Choose Your Package" subtitle="Each package is designed by Jill with years of experience — everything you need for a perfect proposal."/>
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            {PACKAGES.map(pkg=>(
              <div key={pkg.id} onClick={()=>{setSelectedPackage(pkg.id);setPkgCarouselIdx(0);topRef.current?.scrollIntoView({behavior:"smooth",block:"start"});}} style={{borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,0.08)",transition:"all 0.3s ease",background:"#fff",display:"flex",flexDirection:"row",flexWrap:"wrap"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 8px 32px rgba(196,148,74,0.25)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.08)"}>
                <div style={{position:"relative",flex:"1 1 240px",minHeight:200,backgroundImage:`url(${pkg.imgs[0]})`,backgroundSize:"cover",backgroundPosition:"center"}}>
                  <div style={{position:"absolute",top:12,left:12,background:pkg.badge==="MOST POPULAR"?"#C4944A":pkg.badge==="PREMIUM"?"#3B2412":"#8B7355",color:"#fff",padding:"5px 14px",borderRadius:20,fontSize:10,fontWeight:700,letterSpacing:1.2}}>{pkg.badge}</div>
                </div>
                <div style={{flex:"1 1 300px",padding:"20px 24px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:12}}>
                    <h3 style={{margin:0,fontSize:24,color:"#3B2412",fontFamily:"'Playfair Display',Georgia,serif"}}>{pkg.name}</h3>
                    <span style={{fontSize:24,fontWeight:700,color:"#C4944A",fontFamily:"'Playfair Display',Georgia,serif",whiteSpace:"nowrap"}}>{fmt(pkg.price)}</span>
                  </div>
                  <p style={{margin:"10px 0 14px",fontSize:13,color:"#6B5744",lineHeight:1.6}}>{pkg.desc}</p>
                  <div style={{fontSize:13,fontWeight:700,color:"#C4944A"}}>View Details &#8594;</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:14,marginTop:28}}><button onClick={()=>{setPlanMode(null);setFade(false);setTimeout(()=>{setStep(1);setFade(true);topRef.current?.scrollIntoView({behavior:"smooth",block:"start"});},250);}} style={btnBack}>Back</button></div>
        </div>)}

        {step===2&&planMode==="premade"&&selectedPackage&&(()=>{const pkg=PACKAGES.find(p=>p.id===selectedPackage);const imgIdx=pkgCarouselIdx%pkg.imgs.length;return(<div style={anim}>
          {/* Hero carousel */}
          <div style={{position:"relative",borderRadius:20,overflow:"hidden",boxShadow:"0 8px 40px rgba(59,36,18,0.12)",marginBottom:28}}>
            <div style={{height:360,backgroundImage:`url(${pkg.imgs[imgIdx]})`,backgroundSize:"cover",backgroundPosition:"center",transition:"background-image 0.3s ease",cursor:"pointer"}} onClick={()=>setPreview({img:pkg.imgs[imgIdx],name:pkg.name})}/>
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"60px 24px 20px",background:"linear-gradient(transparent,rgba(0,0,0,0.85))"}}>
              <div style={{display:"inline-block",background:pkg.badge==="MOST POPULAR"?"#C4944A":pkg.badge==="PREMIUM"?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.15)",color:"#fff",padding:"4px 14px",borderRadius:20,fontSize:10,fontWeight:700,letterSpacing:1.2,marginBottom:10,backdropFilter:"blur(4px)"}}>{pkg.badge}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                <h2 style={{margin:0,fontSize:"clamp(28px,6vw,40px)",color:"#fff",fontFamily:"'Playfair Display',Georgia,serif"}}>{pkg.name}</h2>
                <span style={{fontSize:"clamp(28px,6vw,40px)",fontWeight:700,color:"#D4AF37",fontFamily:"'Playfair Display',Georgia,serif"}}>{fmt(pkg.price)}</span>
              </div>
            </div>
            {pkg.imgs.length>1&&(<>
              <button onClick={()=>setPkgCarouselIdx(i=>(i-1+pkg.imgs.length)%pkg.imgs.length)} style={{position:"absolute",top:"50%",left:12,transform:"translateY(-50%)",width:40,height:40,borderRadius:"50%",border:"none",background:"rgba(0,0,0,0.5)",color:"#fff",fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>&#8249;</button>
              <button onClick={()=>setPkgCarouselIdx(i=>(i+1)%pkg.imgs.length)} style={{position:"absolute",top:"50%",right:12,transform:"translateY(-50%)",width:40,height:40,borderRadius:"50%",border:"none",background:"rgba(0,0,0,0.5)",color:"#fff",fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)"}}>&#8250;</button>
            </>)}
          </div>
          {/* Photo thumbnails */}
          <div style={{display:"flex",gap:10,marginBottom:24}}>
            {pkg.imgs.map((img,i)=>(
              <div key={i} onClick={()=>{setPkgCarouselIdx(i);}} style={{flex:1,height:80,borderRadius:12,backgroundImage:`url(${img})`,backgroundSize:"cover",backgroundPosition:"center",cursor:"pointer",border:i===imgIdx?"3px solid #C4944A":"3px solid transparent",transition:"all 0.2s",opacity:i===imgIdx?1:0.6}} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>{if(i!==imgIdx)e.currentTarget.style.opacity="0.6";}}/>
            ))}
          </div>

          {/* Description */}
          <div style={{background:"#fff",borderRadius:16,padding:"24px 28px",boxShadow:"0 2px 16px rgba(59,36,18,0.06)",marginBottom:16}}>
            <p style={{margin:0,fontSize:16,color:"#3B2412",lineHeight:1.7,fontStyle:"italic",fontFamily:"'Playfair Display',Georgia,serif"}}>{pkg.desc}</p>
          </div>

          {/* What's Included */}
          <div style={{background:"#fff",borderRadius:16,padding:"24px 28px",boxShadow:"0 2px 16px rgba(59,36,18,0.06)",marginBottom:16}}>
            <h3 style={{margin:"0 0 18px",fontSize:18,color:"#3B2412",fontFamily:"'Playfair Display',Georgia,serif"}}>What's Included</h3>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {pkg.includes.map((item,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,rgba(196,148,74,0.15),rgba(212,175,55,0.1))",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{color:"#C4944A",fontSize:14,fontWeight:700}}>&#10003;</span></div>
                  <span style={{fontSize:14,color:"#3B2412",fontWeight:500}}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* The Experience */}
          <div style={{background:"linear-gradient(135deg,#3B2412,#5C3A1E)",borderRadius:16,padding:"24px 28px",marginBottom:20}}>
            <h3 style={{margin:"0 0 12px",fontSize:18,color:"#F5E6C8",fontFamily:"'Playfair Display',Georgia,serif"}}>The Experience</h3>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[["📍","Choose any of our stunning venues — Beach, Lagoon, or Rooftop"],["📋","Full event coordination from start to finish"],["🕐","1.5 hours private setup"],["🥂","Complimentary celebratory drinks"],["🌅","Timed to golden hour for the most magical lighting"]].map(([icon,text],i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10}}>
                  <span style={{fontSize:16,lineHeight:1.4,flexShrink:0}}>{icon}</span>
                  <span style={{fontSize:13,color:"rgba(245,230,200,0.85)",lineHeight:1.5}}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"flex",justifyContent:"center",gap:14,marginTop:8}}>
            <button onClick={()=>{setSelectedPackage(null);setPkgCarouselIdx(0);}} style={btnBack}>&#8592; Back to Packages</button>
            <button onClick={()=>go(1)} style={btnMain(true)}>Choose This Package</button>
          </div>
        </div>);})()}

        {step===3&&planMode==="premade"&&(<div style={anim}>
          <SectionTitle title="Add Extras" subtitle="Enhance your package with photography, video, or live music. Everything here is optional."/>
          <SocialProofCard data={SOCIAL_PROOF.addons}/>
          <div style={{maxWidth:500,margin:"0 auto"}}>
            <AddonSection title="&#128248; Capture the Moment" items={ADDONS.capture} selected={addons} onToggle={toggleAddon} popularIds={["photo-30","photo-60"]}/>
            <AddonSection title="&#127925; Music" items={ADDONS.music} selected={addons} onToggle={toggleAddon}/>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:14,marginTop:28}}><button onClick={()=>go(-1)} style={btnBack}>Back</button><button onClick={()=>go(1)} style={btnMain(true)}>Review Your Proposal</button></div>
        </div>)}

        {step===4&&planMode==="premade"&&(()=>{const pkg=PACKAGES.find(p=>p.id===selectedPackage);const all=[...ADDONS.music,...ADDONS.capture];return(<div style={anim}><SectionTitle title="Your Perfect Proposal" subtitle="Review everything and book with Jill."/>
          <div style={{background:"#fff",borderRadius:20,overflow:"hidden",boxShadow:"0 8px 40px rgba(59,36,18,0.08)"}}>
            {/* Package hero */}
            <div style={{position:"relative",height:320,backgroundImage:`url(${pkg?.imgs[0]})`,backgroundSize:"cover",backgroundPosition:"center"}}>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 40%,rgba(0,0,0,0.8))"}}>
                <div style={{position:"absolute",bottom:20,left:20,right:20}}>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>{pkg?.badge}</div>
                  <div style={{fontSize:28,fontWeight:700,color:"#FFF8EE",fontFamily:"'Playfair Display',Georgia,serif",marginTop:4}}>{pkg?.name}</div>
                </div>
              </div>
            </div>
            {/* Total banner */}
            <div style={{padding:"24px 28px",textAlign:"center",background:"linear-gradient(135deg,#3B2412,#5C3A1E)"}}>
              <div style={{fontSize:11,color:"rgba(245,230,200,0.6)",fontWeight:600,letterSpacing:2,marginBottom:8}}>ESTIMATED TOTAL</div>
              <div style={{fontSize:52,fontWeight:700,color:"#F5E6C8",fontFamily:"'Playfair Display',Georgia,serif"}}>{fmt(total)}</div>
            </div>
            {/* Summary items */}
            <div style={{padding:"20px 28px"}}>
              <SummaryItem label={`${pkg?.name} Package`} price={pkg?.price||0} sub={pkg?.desc}/>
              <div style={{padding:"14px 0"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#8B7355",marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Package includes:</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {pkg?.includes.map((item,i)=>(
                    <span key={i} style={{display:"inline-flex",alignItems:"center",background:"rgba(196,148,74,0.1)",color:"#6B5744",padding:"5px 12px",borderRadius:14,fontSize:12,fontWeight:600}}>{item}</span>
                  ))}
                </div>
              </div>
              {addons.map(id=>{const item=all.find(x=>x.id===id);return item?<SummaryItem key={id} label={item.name} price={item.price} onRemove={()=>toggleAddon(id)}/>:null;})}
            </div>

            {!addons.some(a=>["photo-30","photo-60"].includes(a))&&(<div style={{margin:"0 28px 16px",padding:"14px 16px",background:"#FFF8EE",border:"1px solid #F0E6D0",borderRadius:10}}><div style={{fontSize:13,color:"#8B6914",fontWeight:600}}>&#128248; 94% of our clients add photography. Want to add it?</div><div style={{display:"flex",gap:8,marginTop:8}}><button onClick={()=>toggleAddon("photo-30")} style={{padding:"8px 16px",borderRadius:20,border:"none",cursor:"pointer",background:"#C4944A",color:"#fff",fontSize:12,fontWeight:600}}>+ Add 30min ($295)</button><button onClick={()=>toggleAddon("photo-60")} style={{padding:"8px 16px",borderRadius:20,cursor:"pointer",background:"transparent",border:"1px solid #C4944A",color:"#C4944A",fontSize:12,fontWeight:600}}>+ Add 60min ($350)</button></div></div>)}

            <div style={{padding:"0 28px 24px",borderTop:"2px solid #F5F0E8"}}><h3 style={{fontSize:16,color:"#3B2412",margin:"20px 0 16px",fontFamily:"'Playfair Display',Georgia,serif"}}>Your contact & trip details</h3>
              <div style={{marginBottom:12}}><label style={{display:"block",fontSize:11,fontWeight:600,color:"#8B7355",marginBottom:4}}>Email Address *</label><input value={contactEmail} onChange={e=>setContactEmail(e.target.value)} placeholder="your@email.com" type="email" style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"2px solid #EDE8E0",fontSize:14,fontFamily:"inherit",background:"#FDFBF7",transition:"border 0.2s"}}/></div>
              <div style={{marginBottom:12}}><label style={{display:"block",fontSize:11,fontWeight:600,color:"#8B7355",marginBottom:4}}>Phone Number *</label>
                <div style={{display:"flex",gap:8}}>
                  <select value={`${countryCode}|${COUNTRY_CODES.find(c=>c.code===countryCode)?.country||"US"}`} onChange={e=>{const[code]=e.target.value.split("|");setCountryCode(code);}} style={{padding:"12px 8px",borderRadius:10,border:"2px solid #EDE8E0",fontSize:14,fontFamily:"inherit",background:"#FDFBF7",minWidth:120,cursor:"pointer",transition:"border 0.2s"}}>
                    {COUNTRY_CODES.map(c=><option key={c.country} value={`${c.code}|${c.country}`}>{c.flag} {c.code} {c.label}</option>)}
                  </select>
                  <input value={contactPhone} onChange={e=>setContactPhone(e.target.value.replace(/[^0-9]/g,""))} placeholder="Phone number" type="tel" style={{flex:1,padding:"12px 16px",borderRadius:10,border:"2px solid #EDE8E0",fontSize:14,fontFamily:"inherit",background:"#FDFBF7",transition:"border 0.2s"}}/>
                </div>
              </div>
              <div style={{marginBottom:12}}><label style={{display:"block",fontSize:11,fontWeight:600,color:"#8B7355",marginBottom:4}}>Proposal Date</label><ProposalDatePicker value={proposalDate} onChange={setProposalDate}/></div>
              <div style={{marginBottom:12}}><label style={{display:"block",fontSize:11,fontWeight:600,color:"#8B7355",marginBottom:4}}>Partner's First Name</label><input value={partnerName} onChange={e=>setPartnerName(e.target.value)} placeholder="e.g., Sarah" style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"2px solid #EDE8E0",fontSize:14,fontFamily:"inherit",background:"#FDFBF7",transition:"border 0.2s"}}/></div>
            </div>

            <div style={{padding:"16px 28px 28px",display:"flex",flexDirection:"column",gap:12,alignItems:"center"}}>
              <a href={inquiryReady?`mailto:${BUSINESS_EMAIL}?subject=${buildEmailSubject()}&body=${buildMsg()}`:undefined} onClick={e=>{if(!inquiryReady)e.preventDefault();}} style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"18px 48px",borderRadius:30,textDecoration:"none",background:inquiryReady?"linear-gradient(135deg,#C4944A,#D4AF37)":"#D4C5B0",color:"#fff",fontSize:17,fontWeight:700,boxShadow:inquiryReady?"0 4px 20px rgba(196,148,74,0.4)":"none",width:"100%",maxWidth:380,textAlign:"center",opacity:inquiryReady?1:0.5,cursor:inquiryReady?"pointer":"not-allowed",transition:"all 0.3s"}}>Send Inquiry via Email</a>
              {!inquiryReady&&<div style={{textAlign:"center",fontSize:12,color:"#C4944A",lineHeight:1.5,maxWidth:340}}>Please fill in your email and phone number above to send your inquiry</div>}
              <div style={{display:"flex",alignItems:"center",gap:12,width:"100%",maxWidth:380,margin:"4px 0"}}><div style={{flex:1,height:1,background:"#EDE8E0"}}/><span style={{fontSize:11,color:"#B0A090",fontWeight:600,whiteSpace:"nowrap"}}>Want a faster response?</span><div style={{flex:1,height:1,background:"#EDE8E0"}}/></div>
              <a href={`https://api.whatsapp.com/send?phone=${PHONE}&text=${buildMsg()}`} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"16px 48px",borderRadius:30,textDecoration:"none",background:"#25D366",color:"#fff",fontSize:15,fontWeight:700,boxShadow:"0 4px 20px rgba(37,211,102,0.35)",width:"100%",maxWidth:380,textAlign:"center"}}>Send via WhatsApp</a>
              <div style={{textAlign:"center",fontSize:12,color:"#6B5744",lineHeight:1.5,maxWidth:340,padding:"4px 0"}}>Jill typically responds within minutes on WhatsApp</div>
              <button onClick={()=>setShowSave(true)} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px 36px",borderRadius:30,border:"2px solid #C4944A",cursor:"pointer",background:planSaved?"rgba(196,148,74,0.08)":"transparent",color:"#C4944A",fontSize:14,fontWeight:600,width:"100%",maxWidth:380}}>{planSaved?"&#10003; Plan Saved — Check Your Email":"Save My Plan for Later"}</button>
              <button onClick={()=>go(-1)} style={{...btnBack,fontSize:13,padding:"12px 24px",border:"none",color:"#B0A090"}}>&#8592; Edit Selections</button>
            </div>
          </div>

          <div style={{marginTop:24,padding:"16px 20px",background:"#fff",borderRadius:12,border:"1px solid #EDE8E0",textAlign:"center"}}><div style={{fontSize:13,color:"#6B5744",fontWeight:600,marginBottom:4}}>&#128197; Sunset slots book 2-3 weeks in advance during peak season (Dec - April)</div><div style={{fontSize:12,color:"#B0A090"}}>Secure your date with a retainer — Jill will confirm everything.</div></div>
          <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:20,flexWrap:"wrap"}}>{["No hidden fees","1,500+ proposals since 2018","Jill responds within hours"].map(t=><span key={t} style={{fontSize:12,color:"#B0A090",fontWeight:500}}>&#10003; {t}</span>)}</div>
          <p style={{textAlign:"center",fontSize:11,color:"#C4B8A8",marginTop:12,lineHeight:1.5,maxWidth:440,margin:"12px auto 0"}}>Prices are estimates. Final pricing confirmed with Jill.</p>
        </div>);})()}

        {(()=>{const neonNeedsMsg=structures.includes("structure-neon")&&!structureNeonMsg;const stepHasSelection={2:centerpieces.length>0,3:flowers.length>0,4:flowers.length>0,5:structures.length>0||sparklerQty>0,6:addons.length>0};const hasSelection=stepHasSelection[step]||false;const isDisabled=step===5&&neonNeedsMsg;const label=step===6?"Review":hasSelection?"Next":"Skip";return<RunningTotal total={total} visible={(planMode==="custom"&&step>=2&&step<=6)||(planMode==="premade"&&step>=2&&step<=3)} step={step-1} showBack={(planMode==="custom"&&step>=2)||(planMode==="premade"&&step>=2)} onBack={()=>{if(step===2){setPlanMode(null);setFade(false);setTimeout(()=>{setStep(1);setFade(true);topRef.current?.scrollIntoView({behavior:"smooth",block:"start"});},250);}else{go(-1);}}} onNext={()=>go(1)} nextLabel={label} disabled={isDisabled}/>;})()}
      </div>)}
    </div>
  );
}
