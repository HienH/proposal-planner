import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const PHONE = "529988450533";

const IMG = {
  // Venues - from cancunpicnic.com
  hero: "https://cancunpicnic.com/wp-content/uploads/2023/07/Cancun-Photographer_3031.jpg",
  beach: "https://cancunpicnic.com/wp-content/uploads/2023/07/Cancun-Photographer_3028-768x512.jpg",
  lagoon: "https://cancunpicnic.com/wp-content/uploads/2023/07/Cancun-Photographer_3024-1-scaled.jpg",
  rooftop: "https://cancunpicnic.com/wp-content/uploads/2023/07/Cancun-Photographer_3025-1.jpg",
  // Times
  morning: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  sunset: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=600&q=80",
  evening: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
  // Centerpieces
  bigLetters: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
  medLettersFull: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  medLettersShort: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  stackedLetters: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80",
  flowerHeart: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
  candleHeart: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
  neonSign: "https://images.unsplash.com/photo-1516967124798-10656f7dca28?w=600&q=80",
  keepSimple: "https://cancunpicnic.com/wp-content/uploads/2023/07/Cancun-Photographer_3031.jpg",
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
const TIMES = [
  { id:"morning",name:"Morning",img:IMG.morning,desc:"Soft golden light, calm waters, peaceful and private" },
  { id:"sunset",name:"Sunset",img:IMG.sunset,desc:"Golden hour magic — our most popular and romantic option",badge:"POPULAR" },
  { id:"evening",name:"Evening",img:IMG.evening,desc:"Candlelit intimacy under the stars" },
];
const CENTERPIECES = [
  { id:"big-letters",name:'Big Letters "MARRY ME"',price:625,img:IMG.bigLetters,desc:"6ft tall, 25ft wide — our biggest statement piece",badge:"MOST POPULAR" },
  { id:"med-letters-full",name:'"Will You Marry Me?"',price:495,img:IMG.medLettersFull,desc:"2ft letters on risers, standing 4ft high" },
  { id:"med-letters-short",name:'"Marry Me?"',price:350,img:IMG.medLettersShort,desc:"2ft letters on risers — clean and classic" },
  { id:"stacked-letters",name:"Stacked Letters",price:350,img:IMG.stackedLetters,desc:"6ft tall stacked display — elegant and intimate" },
  { id:"flower-structure",name:"Flower Design",price:625,img:IMG.flowerHeart,desc:"400 fresh roses shaped into a heart, ring, or circle" },
  { id:"candle-heart",name:"Candle Heart",price:150,img:IMG.candleHeart,desc:"LED candles and rose petals — beautifully simple" },
  { id:"neon-sign",name:"Neon Sign",price:150,img:IMG.neonSign,desc:'Choose your message: "Will you marry me?", "It was always you" + more' },
];
const FLOWERS = [
  { id:"bouquet",name:"Rose Bouquet",price:99,img:IMG.bouquet,desc:"3 dozen fresh roses — her first gift after saying yes",badge:"POPULAR" },
  { id:"petals",name:"Rose Petal Walkway",price:50,img:IMG.petals,desc:"2 bags of red rose petals for a romantic walkway" },
  { id:"arrangements-4",name:"4 Flower Arrangements",price:240,img:IMG.arr4,desc:"4 elegant arrangements around your setup" },
  { id:"arrangements-8",name:"8 Flower Arrangements",price:480,img:IMG.arr8,desc:"8 arrangements for a dramatic look" },
  { id:"standing-50",name:"50 Standing Roses",price:125,img:IMG.roses50,desc:"Roses in sand lining your walkway" },
  { id:"standing-100",name:"100 Standing Roses",price:250,img:IMG.roses100,desc:"Full rose-lined path — stunning in photos" },
];

const WOW = [
  { id:"sparklers-2",name:"Fountain Sparklers (x2)",price:225,img:IMG.sparklers2,desc:"Cold sparkler fountains — a dramatic WOW moment",badge:"POPULAR" },
  { id:"sparklers-4",name:"Fountain Sparklers (x4)",price:330,img:IMG.sparklers4,desc:"Double the sparkle — perfect for letters backdrop",badge:"POPULAR" },
  { id:"sparklers-6",name:"Fountain Sparklers (x6)",price:435,img:IMG.sparklers6,desc:"Full sparkler display — the ultimate statement" },
  { id:"sparklers-8",name:"Fountain Sparklers (x8)",price:540,img:IMG.sparklers8,desc:"Maximum impact" },
  { id:"gazebo",name:"Wooden Gazebo",price:150,img:IMG.gazebo,desc:"Gazebo with fabric and lighting" },
  { id:"teepee",name:"Boho TeePee",price:150,img:IMG.teepee,desc:"12ft teepee with hanging spheres and boho arrangement" },
];

const PORTFOLIO = [
  // Beach (8)
  { img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", venue:"beach", centerpiece:"big-letters", time:"sunset", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&q=80", venue:"beach", centerpiece:"big-letters", time:"sunset", flowers:["petals"], wow:["sparklers-2"] },
  { img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80", venue:"beach", centerpiece:"big-letters", time:"evening", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80", venue:"beach", centerpiece:"flower-structure", time:"sunset", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80", venue:"beach", centerpiece:"candle-heart", time:"evening", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80", venue:"beach", centerpiece:"candle-heart", time:"sunset", flowers:["petals"], wow:[] },
  { img: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=80", venue:"beach", centerpiece:"neon-sign", time:"evening", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=80", venue:"beach", centerpiece:"none", time:"sunset", flowers:[], wow:[] },
  // Lagoon (6)
  { img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80", venue:"lagoon", centerpiece:"big-letters", time:"sunset", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80", venue:"lagoon", centerpiece:"big-letters", time:"sunset", flowers:[], wow:["sparklers-2"] },
  { img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80", venue:"lagoon", centerpiece:"flower-structure", time:"sunset", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80", venue:"lagoon", centerpiece:"candle-heart", time:"evening", flowers:["bouquet"], wow:[] },
  { img: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80", venue:"lagoon", centerpiece:"stacked-letters", time:"sunset", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=800&q=80", venue:"lagoon", centerpiece:"none", time:"sunset", flowers:[], wow:[] },
  // Rooftop (6)
  { img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", venue:"rooftop", centerpiece:"big-letters", time:"evening", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", venue:"rooftop", centerpiece:"big-letters", time:"evening", flowers:[], wow:["sparklers-2"] },
  { img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", venue:"rooftop", centerpiece:"neon-sign", time:"evening", flowers:[], wow:[] },
  { img: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80", venue:"rooftop", centerpiece:"candle-heart", time:"evening", flowers:[], wow:["teepee"] },
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
const NEON_MESSAGES=["Will you marry me?","It was always you","Te casas conmigo?","Will you be my Wife?","This is our love story","Let's grow old together","You & Me","She said yes"];

const SOCIAL_PROOF = {
  venue:{ headline:"What 1,500+ guys chose", stats:[{label:"chose Beach",pct:68},{label:"chose Rooftop",pct:19},{label:"chose Lagoon",pct:13}], tip:"Beach is our signature — but Lagoon has the best sunset views and total privacy." },
  time:{ headline:"When guys pop the question", stats:[{label:"choose Sunset",pct:82},{label:"choose Evening",pct:12},{label:"choose Morning",pct:6}], tip:"Sunset is the clear favorite. Golden hour photos are unbeatable." },
  centerpiece:{ headline:"Most popular setups", stats:[{label:"pick Big Letters",pct:45},{label:"pick Flower Design",pct:22},{label:"pick Neon Sign",pct:15}], tip:'Big Letters creates the most dramatic reaction when she turns around.' },
  addons:{ headline:"What guys add to their proposal", stats:[{label:"add Photography",pct:94},{label:"add Video",pct:52},{label:"add a Musician",pct:44}], tip:"The #1 regret we hear? 'I wish I had gotten photos.'" },
};

const fmt=(n)=>"$"+n.toLocaleString("en-US");
function getBudgetLabel(t){if(t<800)return{label:"Intimate & Simple",color:"#8B7355",icon:"💛"};if(t<1500)return{label:"Popular Range",color:"#B8860B",icon:"🧡"};if(t<2500)return{label:"Premium Experience",color:"#C4944A",icon:"❤️"};return{label:"Ultimate Proposal",color:"#D4AF37",icon:"💎"};}

function ProofBar({pct,label}){return(<div style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#6B5744",marginBottom:3}}><span>{pct}% {label}</span></div><div style={{height:6,background:"#EDE8E0",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,borderRadius:3,background:"linear-gradient(90deg,#C4944A,#D4AF37)",transition:"width 1s cubic-bezier(0.4,0,0.2,1)"}}/></div></div>);}

function SocialProofCard({data}){const[open,setOpen]=useState(false);return(<div style={{maxWidth:500,margin:"28px auto 0"}}><button onClick={()=>setOpen(!open)} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",padding:"12px 20px",borderRadius:10,border:"1px dashed #D4C5B0",background:open?"rgba(196,148,74,0.04)":"transparent",cursor:"pointer",transition:"all 0.2s"}}><span style={{fontSize:13,color:"#8B7355",fontWeight:500}}>{open?"Hide":"See"} what others choose</span><span style={{fontSize:12,color:"#C4944A",transition:"transform 0.2s",transform:open?"rotate(180deg)":"rotate(0)"}}></span></button>{open&&(<div style={{marginTop:12,background:"#fff",border:"1px solid #EDE8E0",borderRadius:14,padding:"18px 22px",boxShadow:"0 2px 12px rgba(59,36,18,0.04)",animation:"fadeIn 0.3s ease"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}><div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#C4944A,#D4AF37)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#fff"}}>📊</div><span style={{fontSize:14,fontWeight:700,color:"#3B2412"}}>{data.headline}</span></div>{data.stats.map((s,i)=><ProofBar key={i} pct={s.pct} label={s.label}/>)}{data.combo&&(<div style={{marginTop:14,padding:"12px 14px",background:"rgba(196,148,74,0.06)",borderRadius:10,borderLeft:"3px solid #C4944A"}}><div style={{fontSize:11,fontWeight:700,color:"#C4944A",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{data.combo.label}</div><div style={{fontSize:13,color:"#3B2412",fontWeight:600}}>{data.combo.items}</div><div style={{fontSize:12,color:"#8B7355",marginTop:2}}>Average total spend: {data.combo.avgSpend}</div></div>)}<div style={{marginTop:12,fontSize:12,color:"#8B7355",fontStyle:"italic",lineHeight:1.4,paddingLeft:10,borderLeft:"2px solid #E8E0D4"}}>💡 {data.tip}</div></div>)}</div>);}

function StepIndicator({current,total,labels}){return(<div style={{padding:"24px 0 8px"}}><div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:8}}>{Array.from({length:total},(_,i)=>(<div key={i} style={{width:i===current?36:10,height:6,borderRadius:3,background:i<=current?"#C4944A":"#E8E0D4",transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)"}}/>))}</div><div style={{textAlign:"center",fontSize:12,color:"#B0A090",fontWeight:500}}>Step {current+1} of {total} — {labels[current]}</div></div>);}
function SectionTitle({title,subtitle}){return(<div style={{textAlign:"center",marginBottom:28}}><h2 style={{fontSize:"clamp(26px,5vw,36px)",fontWeight:700,color:"#3B2412",margin:0,fontFamily:"'Playfair Display',Georgia,serif",lineHeight:1.2}}>{title}</h2>{subtitle&&<p style={{fontSize:15,color:"#8B7355",margin:"10px auto 0",lineHeight:1.6,maxWidth:520}}>{subtitle}</p>}</div>);}

function VenueCard({venue,selected,onSelect,onPreview}){const sel=selected===venue.id;return(<div onClick={()=>onSelect(venue.id)} style={{position:"relative",borderRadius:16,overflow:"hidden",cursor:"pointer",border:sel?"3px solid #C4944A":"3px solid transparent",boxShadow:sel?"0 8px 32px rgba(196,148,74,0.35)":"0 4px 20px rgba(0,0,0,0.08)",transition:"all 0.3s ease",transform:sel?"scale(1.02)":"scale(1)",flex:"1 1 260px",maxWidth:360,background:"#fff"}}><div style={{position:"relative",height:200,backgroundImage:`url(${venue.img})`,backgroundSize:"cover",backgroundPosition:"center"}}><EyeButton onClick={e=>{e.stopPropagation();onPreview(venue.img,venue.name);}}/></div>{venue.badge&&<div style={{position:"absolute",top:12,right:12,background:venue.badge==="BEST VALUE"?"#2D5016":"#C4944A",color:"#fff",padding:"5px 14px",borderRadius:20,fontSize:10,fontWeight:700,letterSpacing:1.2}}>{venue.badge}</div>}{venue.priv&&<div style={{position:"absolute",top:12,left:12,background:"rgba(0,0,0,0.65)",color:"#fff",padding:"5px 12px",borderRadius:20,fontSize:10,fontWeight:600}}>PRIVATE</div>}{sel&&<div style={{position:"absolute",top:85,left:"50%",transform:"translateX(-50%)",background:"#C4944A",color:"#fff",width:44,height:44,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}}>✓</div>}<div style={{padding:"16px 20px 20px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}><h3 style={{margin:0,fontSize:22,color:"#3B2412",fontFamily:"'Playfair Display',Georgia,serif"}}>{venue.name}</h3><span style={{fontSize:22,fontWeight:700,color:"#C4944A",fontFamily:"'Playfair Display',Georgia,serif"}}>{fmt(venue.price)}</span></div><p style={{margin:"8px 0 0",fontSize:13,color:"#6B5744",lineHeight:1.5}}>{venue.desc}</p><div style={{marginTop:8,fontSize:11,color:"#B0A090",lineHeight:1.5}}>Includes: Coordination · 1.5 hrs · Cocktail table · Sparkling wine · Server · Speaker</div></div></div>);}

function TimeCard({time,selected,onSelect,onPreview}){const sel=selected===time.id;return(<div onClick={()=>onSelect(time.id)} style={{position:"relative",borderRadius:16,overflow:"hidden",cursor:"pointer",border:sel?"3px solid #C4944A":"3px solid transparent",boxShadow:sel?"0 8px 32px rgba(196,148,74,0.35)":"0 4px 20px rgba(0,0,0,0.08)",transition:"all 0.3s ease",transform:sel?"scale(1.03)":"scale(1)",flex:"1 1 180px",maxWidth:300,background:"#fff"}}><div style={{position:"relative",height:180,backgroundImage:`url(${time.img})`,backgroundSize:"cover"}}><EyeButton onClick={e=>{e.stopPropagation();onPreview(time.img,time.name);}}/><div style={{position:"absolute",bottom:0,left:0,right:0,padding:"40px 16px 14px",background:"linear-gradient(transparent,rgba(0,0,0,0.75))"}}><h3 style={{margin:0,color:"#fff",fontSize:24,fontFamily:"'Playfair Display',Georgia,serif"}}>{time.name}</h3></div>{time.badge&&<div style={{position:"absolute",top:12,right:12,background:"#C4944A",color:"#fff",padding:"4px 12px",borderRadius:16,fontSize:10,fontWeight:700}}>{time.badge}</div>}{sel&&<div style={{position:"absolute",top:12,left:12,background:"#C4944A",color:"#fff",width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>✓</div>}</div><p style={{margin:0,padding:"14px 16px",fontSize:13,color:"#6B5744",lineHeight:1.4}}>{time.desc}</p></div>);}

function CenterpieceCard({item,selected,onSelect,onPreview}){const sel=selected===item.id;return(<div onClick={()=>onSelect(item.id)} style={{position:"relative",borderRadius:14,overflow:"hidden",cursor:"pointer",border:sel?"3px solid #C4944A":"3px solid transparent",boxShadow:sel?"0 6px 24px rgba(196,148,74,0.3)":"0 3px 14px rgba(0,0,0,0.06)",transition:"all 0.3s ease",transform:sel?"scale(1.03)":"scale(1)",width:"100%",background:"#fff"}}><div style={{position:"relative",height:130,backgroundImage:`url(${item.img})`,backgroundSize:"cover"}}><EyeButton onClick={e=>{e.stopPropagation();onPreview(item.img,item.name);}}/></div>{item.badge&&<div style={{position:"absolute",top:8,left:8,background:"#C4944A",color:"#fff",padding:"3px 10px",borderRadius:14,fontSize:9,fontWeight:700}}>{item.badge}</div>}{sel&&<div style={{position:"absolute",top:8,right:8,background:"#C4944A",color:"#fff",width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>✓</div>}<div style={{padding:"12px 14px 14px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:6}}><h4 style={{margin:0,fontSize:14,color:"#3B2412",fontFamily:"'Playfair Display',Georgia,serif",flex:1,lineHeight:1.3}}>{item.name}</h4><span style={{fontSize:15,fontWeight:700,color:item.price===0?"#2D5016":"#C4944A",whiteSpace:"nowrap"}}>{item.price===0?"Free":fmt(item.price)}</span></div><p style={{margin:"6px 0 0",fontSize:11,color:"#8B7355",lineHeight:1.4}}>{item.desc}</p></div></div>);}

function AddonToggle({item,active,onToggle,popular}){return(<div onClick={onToggle} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:12,cursor:"pointer",background:active?"rgba(196,148,74,0.08)":"#fff",border:active?"2px solid #C4944A":"2px solid #EDE8E0",transition:"all 0.25s ease",position:"relative"}}>{popular&&!active&&<div style={{position:"absolute",top:-8,right:12,background:"#C4944A",color:"#fff",padding:"2px 8px",borderRadius:8,fontSize:9,fontWeight:700}}>POPULAR</div>}<div style={{width:52,height:52,borderRadius:10,flexShrink:0,backgroundImage:`url(${item.img})`,backgroundSize:"cover"}}/><div style={{flex:1,minWidth:0}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:600,fontSize:13,color:"#3B2412"}}>{item.name}</span><span style={{fontWeight:700,fontSize:14,color:"#C4944A",whiteSpace:"nowrap",marginLeft:8}}>{fmt(item.price)}</span></div><p style={{margin:"3px 0 0",fontSize:11,color:"#8B7355",lineHeight:1.3}}>{item.desc}</p></div><div style={{width:22,height:22,borderRadius:6,flexShrink:0,border:active?"none":"2px solid #D4C5B0",background:active?"#C4944A":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",color:"#fff",fontSize:13,fontWeight:700}}>{active?"✓":""}</div></div>);}

function AddonSection({title,items,selected,onToggle,popularIds=[]}){return(<div style={{marginBottom:24}}><h3 style={{fontSize:12,color:"#C4944A",fontWeight:700,marginBottom:10,textTransform:"uppercase",letterSpacing:2}}>{title}</h3><div style={{display:"flex",flexDirection:"column",gap:10}}>{items.map(item=><AddonToggle key={item.id} item={item} active={selected.includes(item.id)} onToggle={()=>onToggle(item.id)} popular={popularIds.includes(item.id)}/>)}</div></div>);}

function SummaryItem({label,price,sub,onRemove}){return(<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #F0EBE3"}}><div style={{flex:1,minWidth:0}}><div style={{fontWeight:600,color:"#3B2412",fontSize:14}}>{label}</div>{sub&&<div style={{fontSize:12,color:"#8B7355",marginTop:2}}>{sub}</div>}</div><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{fontWeight:700,color:"#C4944A",fontSize:15}}>{fmt(price)}</div>{onRemove&&<button onClick={onRemove} style={{background:"none",border:"none",color:"#D4C5B0",cursor:"pointer",fontSize:16,fontWeight:700,padding:0,lineHeight:1,transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#C4944A"} onMouseLeave={e=>e.currentTarget.style.color="#D4C5B0"}>✕</button>}</div></div>);}

function PhotoPreviewModal({img,name,onClose}){if(!img)return null;return(<div onClick={onClose} style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.85)",backdropFilter:"blur(8px)",padding:20,cursor:"pointer"}}><button onClick={onClose} style={{position:"absolute",top:20,right:20,background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",width:40,height:40,borderRadius:"50%",fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button><div style={{maxWidth:800,maxHeight:"80vh",width:"100%"}}><img src={img} alt={name} style={{width:"100%",height:"auto",maxHeight:"75vh",objectFit:"contain",borderRadius:12}}/>{name&&<div style={{textAlign:"center",marginTop:16,color:"#fff",fontSize:18,fontWeight:600,fontFamily:"'Playfair Display',Georgia,serif"}}>{name}</div>}</div></div>);}

function EyeButton({onClick}){return(<button onClick={onClick} style={{position:"absolute",bottom:12,right:12,background:"rgba(0,0,0,0.6)",border:"none",color:"#fff",width:32,height:32,borderRadius:"50%",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",zIndex:10}} onMouseEnter={e=>e.currentTarget.style.background="rgba(196,148,74,0.9)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(0,0,0,0.6)"}>👁</button>);}

function RunningTotal({total,visible,step,onBack,onNext}){if(!visible)return null;return(<div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100,background:"linear-gradient(135deg,#3B2412,#5C3A1E)",padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 -4px 24px rgba(0,0,0,0.3)",gap:12}}>{step>1?(<button onClick={onBack} style={{padding:"10px 18px",borderRadius:20,border:"1px solid rgba(245,230,200,0.3)",background:"transparent",color:"#F5E6C8",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>← Back</button>):(<div style={{width:70}}/>)}<div style={{textAlign:"center"}}><div style={{fontSize:10,color:"rgba(245,230,200,0.5)",fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Total</div><div style={{fontSize:24,fontWeight:700,color:"#F5E6C8",fontFamily:"'Playfair Display',Georgia,serif"}}>{fmt(total)}</div></div><button onClick={onNext} style={{padding:"10px 22px",borderRadius:20,border:"none",background:"linear-gradient(135deg,#C4944A,#D4AF37)",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Next →</button></div>);}

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
  const[step,setStep]=useState(0);const[venue,setVenue]=useState(null);const[time,setTime]=useState(null);
  const[centerpieces,setCenterpieces]=useState([]);const[neonMsg,setNeonMsg]=useState(NEON_MESSAGES[0]);
  const[flowers,setFlowers]=useState([]);const[wow,setWow]=useState([]);const[addons,setAddons]=useState([]);const[proposalDate,setProposalDate]=useState(null);
  const[hotelName,setHotelName]=useState("");const[partnerName,setPartnerName]=useState("");
  const[fade,setFade]=useState(true);const[showSave,setShowSave]=useState(false);
  const[planSaved,setPlanSaved]=useState(false);const[preview,setPreview]=useState(null);const[carouselIdx,setCarouselIdx]=useState(0);const[toast,setToast]=useState(false);const[frozenMatches,setFrozenMatches]=useState([]);const topRef=useRef(null);
  const showToast=()=>{setToast(true);setTimeout(()=>setToast(false),2000);};
  useEffect(()=>{if(step===7)setFrozenMatches(findBestMatches());},[step]);

  const toggleAddon=(id)=>setAddons(p=>p.includes(id)?p.filter(a=>a!==id):[...p,id]);
  const toggleFlower=(id)=>setFlowers(p=>p.includes(id)?p.filter(a=>a!==id):[...p,id]);
  const toggleWow=(id)=>setWow(p=>p.includes(id)?p.filter(a=>a!==id):[...p,id]);
  const toggleCenterpiece=(id)=>setCenterpieces(p=>p.includes(id)?p.filter(a=>a!==id):[...p,id]);

  const findBestMatches = () => {
    const sameVenue = PORTFOLIO.filter(p => p.venue === venue);
    const pool = sameVenue.length > 0 ? sameVenue : PORTFOLIO;
    return pool
      .map(photo => {
        let score = 0;
        if (centerpieces.includes(photo.centerpiece)) score += 3;
        if (photo.time === time) score += 2;
        flowers.forEach(f => { if (photo.flowers.includes(f)) score += 1; });
        wow.forEach(w => { if (photo.wow.includes(w)) score += 1; });
        return { ...photo, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  };

  const getExtras = (photo) => {
    const extras = [];
    centerpieces.forEach(id => {
      if (id !== photo.centerpiece && id !== "none") {
        const item = CENTERPIECES.find(c => c.id === id);
        if (item) extras.push({ id: item.id, name: item.name, type: "centerpiece" });
      }
    });
    flowers.forEach(id => {
      if (!photo.flowers.includes(id)) {
        const item = FLOWERS.find(f => f.id === id);
        if (item) extras.push({ id: item.id, name: item.name, type: "flower" });
      }
    });
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
      if (!wow.includes(id)) {
        const item = WOW.find(w => w.id === id);
        if (item) upsells.push({ id: item.id, name: item.name, price: item.price, type: "wow" });
      }
    });
    return upsells;
  };

  const selectVenue=(id)=>{setVenue(id);setTimeout(()=>go(1),400);};
  const selectTime=(id)=>{setTime(id);setTimeout(()=>go(1),400);};
  const getTotal=()=>{let t=0;if(venue)t+=VENUES.find(v=>v.id===venue)?.price||0;centerpieces.forEach(id=>{const c=CENTERPIECES.find(x=>x.id===id);if(c)t+=c.price;});flowers.forEach(id=>{const f=FLOWERS.find(x=>x.id===id);if(f)t+=f.price;});wow.forEach(id=>{const w=WOW.find(x=>x.id===id);if(w)t+=w.price;});const all=[...ADDONS.music,...ADDONS.capture];addons.forEach(id=>{const a=all.find(x=>x.id===id);if(a)t+=a.price;});return t;};
  const go=(dir)=>{setFade(false);setTimeout(()=>{setStep(s=>s+dir);setFade(true);topRef.current?.scrollIntoView({behavior:"smooth",block:"start"});},250);};
  const canProceed=()=>{if(step===1)return!!venue;if(step===2)return!!time;return true;};
  const buildMsg=()=>{const v=VENUES.find(x=>x.id===venue);const t=TIMES.find(x=>x.id===time);const selCenterpieces=centerpieces.map(id=>CENTERPIECES.find(x=>x.id===id)).filter(Boolean);const selFlowers=flowers.map(id=>FLOWERS.find(x=>x.id===id)).filter(Boolean);const selWow=wow.map(id=>WOW.find(x=>x.id===id)).filter(Boolean);const all=[...ADDONS.music,...ADDONS.capture];const sel=addons.map(id=>all.find(x=>x.id===id)).filter(Boolean);let m=`Hi Jill! I'd like to book a proposal:\n\nVenue: ${v?.name} (${fmt(v?.price||0)})\nTime: ${t?.name}\n`;if(selCenterpieces.length){m+=`\nCenterpiece:\n`;selCenterpieces.forEach(c=>{m+=`- ${c.name} (${fmt(c.price)})`;if(c.id==="neon-sign")m+=` - "${neonMsg}"`;m+=`\n`;});}if(selFlowers.length){m+=`\nFlowers:\n`;selFlowers.forEach(f=>m+=`- ${f.name} (${fmt(f.price)})\n`);}if(selWow.length){m+=`\nWOW Factor:\n`;selWow.forEach(w=>m+=`- ${w.name} (${fmt(w.price)})\n`);}if(sel.length){m+=`\nAdd-ons:\n`;sel.forEach(a=>m+=`- ${a.name} (${fmt(a.price)})\n`);}m+=`\nEst. Total: ${fmt(getTotal())}\n`;if(proposalDate)m+=`Proposal Date: ${proposalDate.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}\n`;if(partnerName)m+=`Partner: ${partnerName}\n`;return encodeURIComponent(m);};
  const handleSavePlan=({email,name})=>{console.log("LEAD CAPTURED:",{email,name,venue,time,centerpieces,neonMsg,flowers,wow,addons,total:getTotal()});setPlanSaved(true);};

  const total=getTotal();
  const anim={opacity:fade?1:0,transform:fade?"translateY(0)":"translateY(16px)",transition:"all 0.35s ease"};
  const btnMain=(ok)=>({padding:"16px 48px",borderRadius:30,border:"none",cursor:ok?"pointer":"default",background:ok?"linear-gradient(135deg,#C4944A,#D4AF37)":"#D4C5B0",color:"#fff",fontSize:16,fontWeight:700,boxShadow:ok?"0 4px 20px rgba(196,148,74,0.4)":"none",opacity:ok?1:0.4,transition:"all 0.3s"});
  const btnBack={padding:"16px 28px",borderRadius:30,border:"2px solid #C4944A",cursor:"pointer",background:"transparent",color:"#C4944A",fontSize:14,fontWeight:600};
  const labels=["Location","Time","Statement Prop","Flowers","WOW Factor","Add-ons","Review & Book"];

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
        <h1 style={{fontSize:"clamp(44px,10vw,80px)",color:"#FFF8EE",margin:"0 0 20px",fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700,lineHeight:1.05,maxWidth:550}}>She's going to say <em style={{color:"#D4AF37",fontStyle:"italic"}}>yes.</em></h1>
        <p style={{fontSize:17,color:"rgba(255,248,238,0.75)",margin:"0 0 44px",maxWidth:420,lineHeight:1.7}}>Build your dream Cancun proposal in under 3 minutes. We handle every detail — you just show up and ask.</p>
        <button onClick={()=>go(1)} style={{...btnMain(true),padding:"20px 64px",fontSize:18}}>Start Planning</button>
        <div style={{marginTop:56,display:"flex",gap:40,flexWrap:"wrap",justifyContent:"center"}}>
          {[["1,500+","Successful Proposals"],["Since 2018","Years of Experience"],["5.0 ★","Client Rating"]].map(([n,l])=>(<div key={l} style={{textAlign:"center"}}><div style={{fontSize:24,fontWeight:700,color:"#D4AF37",fontFamily:"'Playfair Display',Georgia,serif"}}>{n}</div><div style={{fontSize:11,color:"rgba(255,248,238,0.5)",marginTop:4}}>{l}</div></div>))}
        </div>
      </div>)}

      {step>0&&step<8&&(<div style={{maxWidth:920,margin:"0 auto",padding:"12px 20px 110px"}}>
        <StepIndicator current={step-1} total={7} labels={labels}/>

        {step===1&&(<div style={anim}><SectionTitle title="Choose Your Setting" subtitle="Every location includes coordination, 1.5 hours, cocktail table, sparkling wine, personal server, and bluetooth speaker."/><div style={{display:"flex",gap:20,flexWrap:"wrap",justifyContent:"center"}}>{VENUES.map(v=><VenueCard key={v.id} venue={v} selected={venue} onSelect={selectVenue} onPreview={(img,name)=>setPreview({img,name})}/>)}</div><SocialProofCard data={SOCIAL_PROOF.venue}/></div>)}

        {step===2&&(<div style={anim}><SectionTitle title="Choose Your Moment" subtitle="When do you want to pop the question?"/><div style={{display:"flex",gap:20,flexWrap:"wrap",justifyContent:"center"}}>{TIMES.map(t=><TimeCard key={t.id} time={t} selected={time} onSelect={selectTime} onPreview={(img,name)=>setPreview({img,name})}/>)}</div><SocialProofCard data={SOCIAL_PROOF.time}/><div style={{textAlign:"center",marginTop:20}}><button onClick={()=>go(-1)} style={btnBack}>Back</button></div></div>)}

        {step===3&&(<div style={anim}><SectionTitle title="Choose Your Statement Prop" subtitle="The focal point — what she'll see when she turns around. Select as many as you like, or skip."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
            {CENTERPIECES.map(item=>(<div key={item.id} onClick={()=>toggleCenterpiece(item.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:14,cursor:"pointer",background:centerpieces.includes(item.id)?"rgba(196,148,74,0.08)":"#fff",border:centerpieces.includes(item.id)?"2px solid #C4944A":"2px solid #EDE8E0",transition:"all 0.25s ease",position:"relative"}}>{item.badge&&!centerpieces.includes(item.id)&&<div style={{position:"absolute",top:-8,right:12,background:"#C4944A",color:"#fff",padding:"2px 8px",borderRadius:8,fontSize:9,fontWeight:700}}>{item.badge}</div>}<div style={{width:60,height:60,borderRadius:12,flexShrink:0,backgroundImage:`url(${item.img})`,backgroundSize:"cover",backgroundPosition:"center"}}/><div style={{flex:1,minWidth:0}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:600,fontSize:14,color:"#3B2412"}}>{item.name}</span><span style={{fontWeight:700,fontSize:15,color:item.price===0?"#2D5016":"#C4944A",whiteSpace:"nowrap",marginLeft:8}}>{item.price===0?"Free":fmt(item.price)}</span></div><p style={{margin:"4px 0 0",fontSize:12,color:"#8B7355",lineHeight:1.4}}>{item.desc}</p></div><div style={{width:24,height:24,borderRadius:6,flexShrink:0,border:centerpieces.includes(item.id)?"none":"2px solid #D4C5B0",background:centerpieces.includes(item.id)?"#C4944A":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",color:"#fff",fontSize:14,fontWeight:700}}>{centerpieces.includes(item.id)?"✓":""}</div></div>))}
          </div>
          {centerpieces.includes("neon-sign")&&(<div style={{marginTop:20,padding:20,background:"rgba(196,148,74,0.07)",borderRadius:14}}><p style={{margin:"0 0 12px",fontSize:14,fontWeight:600,color:"#3B2412"}}>Choose your neon sign message:</p><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{NEON_MESSAGES.map(msg=>(<button key={msg} onClick={()=>setNeonMsg(msg)} style={{padding:"8px 16px",borderRadius:20,border:"none",cursor:"pointer",background:neonMsg===msg?"#C4944A":"#F5E6C8",color:neonMsg===msg?"#fff":"#3B2412",fontSize:12,fontWeight:600,transition:"all 0.2s"}}>"{msg}"</button>))}</div></div>)}
          <SocialProofCard data={SOCIAL_PROOF.centerpiece}/>
          <div style={{display:"flex",justifyContent:"center",gap:14,marginTop:28}}><button onClick={()=>go(-1)} style={btnBack}>Back</button><button onClick={()=>go(1)} style={{...btnMain(true),background:centerpieces.length===0?"transparent":"linear-gradient(135deg,#C4944A,#D4AF37)",border:centerpieces.length===0?"2px solid #C4944A":"none",color:centerpieces.length===0?"#C4944A":"#fff"}}>{centerpieces.length===0?"Skip":"Continue"}</button></div></div>)}

        {step===4&&(<div style={anim}><SectionTitle title="Flowers & Roses" subtitle="Add romantic floral touches to your setup. Select as many as you like, or skip."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
            {FLOWERS.map(item=>(<div key={item.id} onClick={()=>toggleFlower(item.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:14,cursor:"pointer",background:flowers.includes(item.id)?"rgba(196,148,74,0.08)":"#fff",border:flowers.includes(item.id)?"2px solid #C4944A":"2px solid #EDE8E0",transition:"all 0.25s ease",position:"relative"}}>{item.badge&&!flowers.includes(item.id)&&<div style={{position:"absolute",top:-8,right:12,background:"#C4944A",color:"#fff",padding:"2px 8px",borderRadius:8,fontSize:9,fontWeight:700}}>{item.badge}</div>}<div style={{width:60,height:60,borderRadius:12,flexShrink:0,backgroundImage:`url(${item.img})`,backgroundSize:"cover",backgroundPosition:"center"}}/><div style={{flex:1,minWidth:0}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:600,fontSize:14,color:"#3B2412"}}>{item.name}</span><span style={{fontWeight:700,fontSize:15,color:"#C4944A",whiteSpace:"nowrap",marginLeft:8}}>{fmt(item.price)}</span></div><p style={{margin:"4px 0 0",fontSize:12,color:"#8B7355",lineHeight:1.4}}>{item.desc}</p></div><div style={{width:24,height:24,borderRadius:6,flexShrink:0,border:flowers.includes(item.id)?"none":"2px solid #D4C5B0",background:flowers.includes(item.id)?"#C4944A":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",color:"#fff",fontSize:14,fontWeight:700}}>{flowers.includes(item.id)?"✓":""}</div></div>))}
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:14,marginTop:28}}><button onClick={()=>go(-1)} style={btnBack}>Back</button><button onClick={()=>go(1)} style={{...btnMain(true),background:flowers.length===0?"transparent":"linear-gradient(135deg,#C4944A,#D4AF37)",border:flowers.length===0?"2px solid #C4944A":"none",color:flowers.length===0?"#C4944A":"#fff"}}>{flowers.length===0?"Skip":"Continue"}</button></div></div>)}

        {step===5&&(<div style={anim}><SectionTitle title="The WOW Factor" subtitle="Add dramatic effects to make the moment unforgettable. Select as many as you like, or skip."/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
            {WOW.map(item=>(<div key={item.id} onClick={()=>toggleWow(item.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:14,cursor:"pointer",background:wow.includes(item.id)?"rgba(196,148,74,0.08)":"#fff",border:wow.includes(item.id)?"2px solid #C4944A":"2px solid #EDE8E0",transition:"all 0.25s ease",position:"relative"}}>{item.badge&&!wow.includes(item.id)&&<div style={{position:"absolute",top:-8,right:12,background:"#C4944A",color:"#fff",padding:"2px 8px",borderRadius:8,fontSize:9,fontWeight:700}}>{item.badge}</div>}<div style={{width:60,height:60,borderRadius:12,flexShrink:0,backgroundImage:`url(${item.img})`,backgroundSize:"cover",backgroundPosition:"center"}}/><div style={{flex:1,minWidth:0}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:600,fontSize:14,color:"#3B2412"}}>{item.name}</span><span style={{fontWeight:700,fontSize:15,color:"#C4944A",whiteSpace:"nowrap",marginLeft:8}}>{fmt(item.price)}</span></div><p style={{margin:"4px 0 0",fontSize:12,color:"#8B7355",lineHeight:1.4}}>{item.desc}</p></div><div style={{width:24,height:24,borderRadius:6,flexShrink:0,border:wow.includes(item.id)?"none":"2px solid #D4C5B0",background:wow.includes(item.id)?"#C4944A":"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",color:"#fff",fontSize:14,fontWeight:700}}>{wow.includes(item.id)?"✓":""}</div></div>))}
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:14,marginTop:28}}><button onClick={()=>go(-1)} style={btnBack}>Back</button><button onClick={()=>go(1)} style={{...btnMain(true),background:wow.length===0?"transparent":"linear-gradient(135deg,#C4944A,#D4AF37)",border:wow.length===0?"2px solid #C4944A":"none",color:wow.length===0?"#C4944A":"#fff"}}>{wow.length===0?"Skip":"Continue"}</button></div></div>)}

        {step===6&&(<div style={anim}><SectionTitle title="Capture & Music" subtitle="Add photography, video, or live music. Everything here is optional."/><SocialProofCard data={SOCIAL_PROOF.addons}/><div style={{maxWidth:500,margin:"0 auto"}}><AddonSection title="📸 Capture the Moment" items={ADDONS.capture} selected={addons} onToggle={toggleAddon} popularIds={["photo-30","photo-60"]}/><AddonSection title="🎵 Music" items={ADDONS.music} selected={addons} onToggle={toggleAddon}/></div><div style={{display:"flex",justifyContent:"center",gap:14,marginTop:28}}><button onClick={()=>go(-1)} style={btnBack}>Back</button><button onClick={()=>go(1)} style={btnMain(true)}>Review Your Proposal</button></div></div>)}

        {step===7&&(<div style={anim}><SectionTitle title="Your Perfect Proposal" subtitle="Review everything and book with Jill."/>
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
                                  <button key={item.id} onClick={(e) => { e.stopPropagation(); if (item.type === "centerpiece") toggleCenterpiece(item.id); else if (item.type === "flower") toggleFlower(item.id); else if (item.type === "wow") toggleWow(item.id); showToast(); }} style={{padding:"8px 16px",borderRadius:20,border:"1.5px solid rgba(255,255,255,0.4)",cursor:"pointer",background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",color:"#fff",fontSize:12,fontWeight:600,transition:"all 0.2s"}}>+ {item.name} {fmt(item.price)}</button>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div style={{padding:"50px 16px 16px"}}>
                              <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Your setup matches this photo</div>
                              <div style={{fontSize:16,color:"#fff",fontWeight:600,fontFamily:"'Playfair Display',Georgia,serif",marginTop:4}}>{VENUES.find(v=>v.id===venue)?.name} · {TIMES.find(t=>t.id===time)?.name}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{position:"relative"}}>
                        <div style={{height:320,backgroundImage:`url(${fallbackImg})`,backgroundSize:"cover",backgroundPosition:"center"}}/>
                        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"50px 16px 16px",background:"linear-gradient(transparent,rgba(0,0,0,0.8))"}}>
                          <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>Your Setup</div>
                          <div style={{fontSize:16,color:"#fff",fontWeight:600,fontFamily:"'Playfair Display',Georgia,serif",marginTop:4}}>{VENUES.find(v=>v.id===venue)?.name} · {TIMES.find(t=>t.id===time)?.name}</div>
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
            <div style={{padding:"20px 28px"}}><SummaryItem label={`${VENUES.find(v=>v.id===venue)?.name} Venue`} price={VENUES.find(v=>v.id===venue)?.price||0} sub={`${TIMES.find(t=>t.id===time)?.name||""} · 1.5 hours · Sparkling wine included`}/>{centerpieces.map(id=>{const item=CENTERPIECES.find(x=>x.id===id);return item&&item.id!=="none"?<SummaryItem key={id} label={item.name} price={item.price} sub={id==="neon-sign"?`Message: "${neonMsg}"`:null} onRemove={()=>toggleCenterpiece(id)}/>:null;})}{flowers.map(id=>{const item=FLOWERS.find(x=>x.id===id);return item?<SummaryItem key={id} label={item.name} price={item.price} onRemove={()=>toggleFlower(id)}/>:null;})}{wow.map(id=>{const item=WOW.find(x=>x.id===id);return item?<SummaryItem key={id} label={item.name} price={item.price} onRemove={()=>toggleWow(id)}/>:null;})}{addons.map(id=>{const all=[...ADDONS.music,...ADDONS.capture];const item=all.find(x=>x.id===id);return item?<SummaryItem key={id} label={item.name} price={item.price} onRemove={()=>toggleAddon(id)}/>:null;})}</div>

            {!addons.some(a=>["photo-30","photo-60"].includes(a))&&(<div style={{margin:"0 28px 16px",padding:"14px 16px",background:"#FFF8EE",border:"1px solid #F0E6D0",borderRadius:10}}><div style={{fontSize:13,color:"#8B6914",fontWeight:600}}>📸 94% of guys add photography. Want to add it?</div><div style={{display:"flex",gap:8,marginTop:8}}><button onClick={()=>toggleAddon("photo-30")} style={{padding:"8px 16px",borderRadius:20,border:"none",cursor:"pointer",background:"#C4944A",color:"#fff",fontSize:12,fontWeight:600}}>+ Add 30min ($295)</button><button onClick={()=>toggleAddon("photo-60")} style={{padding:"8px 16px",borderRadius:20,cursor:"pointer",background:"transparent",border:"1px solid #C4944A",color:"#C4944A",fontSize:12,fontWeight:600}}>+ Add 60min ($350)</button></div></div>)}

            <div style={{padding:"0 28px 24px",borderTop:"2px solid #F5F0E8"}}><h3 style={{fontSize:16,color:"#3B2412",margin:"20px 0 16px",fontFamily:"'Playfair Display',Georgia,serif"}}>Add your trip details</h3>
              <div style={{marginBottom:12}}><label style={{display:"block",fontSize:11,fontWeight:600,color:"#8B7355",marginBottom:4}}>Proposal Date</label><ProposalDatePicker value={proposalDate} onChange={setProposalDate}/></div>
              <div style={{marginBottom:12}}><label style={{display:"block",fontSize:11,fontWeight:600,color:"#8B7355",marginBottom:4}}>Partner's First Name</label><input value={partnerName} onChange={e=>setPartnerName(e.target.value)} placeholder="e.g., Sarah" style={{width:"100%",padding:"12px 16px",borderRadius:10,border:"2px solid #EDE8E0",fontSize:14,fontFamily:"inherit",background:"#FDFBF7",transition:"border 0.2s"}}/></div>
            </div>

            <div style={{padding:"16px 28px 28px",display:"flex",flexDirection:"column",gap:12,alignItems:"center"}}>
              <a href={`https://api.whatsapp.com/send?phone=${PHONE}&text=${buildMsg()}`} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"18px 48px",borderRadius:30,textDecoration:"none",background:"#25D366",color:"#fff",fontSize:17,fontWeight:700,boxShadow:"0 4px 20px rgba(37,211,102,0.35)",width:"100%",maxWidth:380,textAlign:"center"}}>Book Now via WhatsApp</a>
              <div style={{textAlign:"center",fontSize:12,color:"#6B5744",lineHeight:1.5,maxWidth:340,padding:"8px 0"}}>📋 You'll receive a detailed proposal with the full breakdown of everything included</div>
              <button onClick={()=>setShowSave(true)} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px 36px",borderRadius:30,border:"2px solid #C4944A",cursor:"pointer",background:planSaved?"rgba(196,148,74,0.08)":"transparent",color:"#C4944A",fontSize:14,fontWeight:600,width:"100%",maxWidth:380}}>{planSaved?"✓ Plan Saved — Check Your Email":"💾 Save My Plan for Later"}</button>
              <button onClick={()=>go(-1)} style={{...btnBack,fontSize:13,padding:"12px 24px",border:"none",color:"#B0A090"}}>← Edit Selections</button>
            </div>
          </div>

          <div style={{marginTop:24,padding:"16px 20px",background:"#fff",borderRadius:12,border:"1px solid #EDE8E0",textAlign:"center"}}><div style={{fontSize:13,color:"#6B5744",fontWeight:600,marginBottom:4}}>🗓️ Sunset slots book 2-3 weeks in advance during peak season (Dec - April)</div><div style={{fontSize:12,color:"#B0A090"}}>Secure your date with a retainer — Jill will confirm everything.</div></div>
          <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:20,flexWrap:"wrap"}}>{["No hidden fees","1,500+ proposals since 2018","Jill responds within hours"].map(t=><span key={t} style={{fontSize:12,color:"#B0A090",fontWeight:500}}>✓ {t}</span>)}</div>
          <p style={{textAlign:"center",fontSize:11,color:"#C4B8A8",marginTop:12,lineHeight:1.5,maxWidth:440,margin:"12px auto 0"}}>Prices are estimates. Final pricing confirmed with Jill.</p>
        </div>)}

        <RunningTotal total={total} visible={step>=1&&step<=6} step={step} onBack={()=>go(-1)} onNext={()=>go(1)}/>
      </div>)}
    </div>
  );
}
