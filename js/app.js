(function(){
var HOSPITAL="Northside Hospital";
var REASONS=["Broken castor","Bent frame","Damaged door or lid","Faulty brake","Damaged shelf","Other"];
var PIN="1234";

/* stroke-only icons, 24 x 24 */
var I={
 menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
 tag:'<path d="M3 7v4.6a2 2 0 0 0 .6 1.4l7.4 7.4a2 2 0 0 0 2.8 0l5.6-5.6a2 2 0 0 0 0-2.8L12 4.6A2 2 0 0 0 10.6 4H6a3 3 0 0 0-3 3z"/><circle cx="8" cy="8.5" r="1.4"/>',
 ward:'<path d="M4 20V8l8-4 8 4v12"/><path d="M9 20v-5h6v5M12 8v4M10 10h4"/>',
 sort:'<path d="M4 6h16M7 12h10M10 18h4"/>',
 wrench:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L4 16.8V20h3.2l5.3-5.3a4 4 0 0 0 5.2-5.4l-2.5 2.5-2.6-.6-.6-2.6z"/>',
 factory:'<path d="M3 21V10l5 3V10l5 3V10l5 3V4h3v17z"/><path d="M7 17h2M12 17h2M17 17h1"/>',
 phone:'<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.5h2"/>',
 box:'<path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/>',
 truck:'<path d="M2 6h11v10H2zM13 10h4l4 4v2h-8"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
 list:'<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
 warn:'<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17.5v.5"/>',
 tick:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
 x:'<path d="M6 6l12 12M18 6 6 18"/>',
 retry:'<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
 scan:'<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M8 8v8M11 8v8M14 8v8M17 8v8"/>',
 rfid:'<path d="M5 12a7 7 0 0 1 14 0"/><path d="M8 12a4 4 0 0 1 8 0"/><circle cx="12" cy="13" r="1.3"/><path d="M12 15v5"/>',
 camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
 bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
 qr:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 14h2M14 18v2M18 18h2v2M17 17v1"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 logout:'<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l-5-5 5-5M5 12h11"/>'
};
function ic(n,w){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+I[n]+'</svg>';}

var PAGES=[
 {id:"register",name:"Register",icon:"tag",title:"Register a trolley",sub:"Apply the barcode label and RFID chip, read the new tag, then enter the asset details. Barcode, QR code and RFID must all resolve to the same asset in Bundle Nexus."},
 {id:"hospital",name:"Hospital ward",icon:"ward",title:"Hospital damage reporting",sub:"Scan a trolley to see its status or report damage. A red card is optional: the report in the app is enough. Reports made offline are kept on the device and sync later."},
 {id:"soil",name:"Soil sort",icon:"sort",title:"Soil sort intake",sub:"Scan every trolley as it comes in. Faulty trolleys are flagged here whether or not a red card was attached. Damage found here can be recorded on the spot."},
 {id:"eng",name:"Engineering",icon:"wrench",title:"Engineering repair queue",sub:"Reported and flagged trolleys waiting for a technician. Complete the repair and confirm identity with a scan, or retire the trolley with admin approval."},
 {id:"production",name:"Production floor",icon:"factory",title:"Production floor check",sub:"Scan trolleys in use on the production floor. Report damage you find, and flag any trolley that is Faulty, In repair or retired and shouldn’t be in production."},
 {id:"packing",name:"Packing check",icon:"box",title:"Packing operator check",sub:"Scan before you pack. Only trolleys showing Available can be packed. If an unrepaired trolley turns up in production, notify engineering."},
 {id:"dispatch",name:"Dispatch",icon:"truck",title:"Dispatch verification",sub:"The dispatch portal reads every trolley on the run. One trolley that isn’t Available blocks the whole dispatch until it is swapped out."},
 {id:"portals",name:"RFID portals",icon:"rfid",title:"RFID portals",sub:"Fixed readers at the laundry read each trolley’s RFID chip (EPC) automatically. The inbound portal shows when a trolley arrives in the factory; the dispatch portal shows when it leaves."},
 {id:"fleet",name:"Fleet",icon:"list",title:"Trolley fleet",sub:"Every trolley in the shared pool and its current state."},
 {id:"log",name:"Activity log",icon:"clock",title:"Activity log",sub:"Every state change with who, when, where and the barcode, QR or RFID read that triggered it."}
];
var RECORDS=["portals","fleet","log"];   /* pages listed under "Records" in the sidebar */

/* Who can sign in and which pages each one sees. Edit `pages` to change access.
   Users only see their own stations; admin sees everything.
   admin:true also means sign-in needs the PIN, and they can retire trolleys without approval. */
var USERS=[
 {id:"admin",user:"A. Patel",role:"Asset admin",place:"Asset office, SPL Broadmeadows",admin:true,
  pages:["register","hospital","soil","eng","production","packing","dispatch","portals","fleet","log"]},
 {id:"ward",user:"J. Tan",role:"Ward staff",place:"Ward 4B, "+HOSPITAL,pages:["hospital"]},
 {id:"soil",user:"M. Rossi",role:"Soil sort operator",place:"Soil sort, SPL Broadmeadows",pages:["soil"]},
 {id:"eng",user:"S. Kumar",role:"Engineering technician",place:"Engineering, SPL Broadmeadows",pages:["eng","portals","fleet","log"]},
 {id:"production",user:"R. Singh",role:"Production operator",place:"Production floor, SPL Broadmeadows",pages:["production"]},
 {id:"packing",user:"L. Nguyen",role:"Packing operator",place:"Packing, SPL Broadmeadows",pages:["packing"]},
 {id:"dispatch",user:"D. Walsh",role:"Dispatch",place:"Dispatch dock, SPL Broadmeadows",pages:["dispatch"]}
];
var QR_LOOKUP_MS=900;   /* simulated Bundle Nexus round trip for a QR read */

function iso(h){return new Date(Date.now()-h*3600e3).toISOString();}
function seed(){
  var t={};
  function add(id,epc,desc,state,reason){t[id]={id:id,barcode:"SPL"+id.slice(2),qr:qrFor(epc),rfid:epc,desc:desc,pool:HOSPITAL,state:state,reason:reason||null,flag:null,repairs:[]};}
  add("T-1042","E280 6894 0000 4042 1A7C","Linen trolley, 3 shelf","Available");
  add("T-1077","E280 6894 0000 4077 2B11","Linen trolley, 3 shelf","Faulty",{code:"Broken castor",notes:"Front left castor won’t swivel",photo:true,reporter:"J. Tan",where:"Ward 4B, "+HOSPITAL,date:iso(20),redCard:false,count:1});
  add("T-1103","E280 6894 0000 4103 9C02","Cage trolley, lidded","In repair",{code:"Bent frame",notes:"Side rail bent after forklift contact",photo:false,reporter:"M. Rossi",where:"Soil sort, SPL Broadmeadows",date:iso(30),redCard:true,count:1});
  add("T-1121","E280 6894 0000 4121 0D3E","Linen trolley, 3 shelf","Available");
  add("T-1135","E280 6894 0000 4135 7F48","Cage trolley, lidded","Available");
  add("T-1150","E280 6894 0000 4150 AA90","Linen trolley, 2 shelf","Retired");
  t["T-1150"].retired={why:"Frame cracked at the base weld",date:iso(90),by:"S. Kumar"};
  add("T-1162","E280 6894 0000 4162 5E21","Linen trolley, 3 shelf","Available");
  /* where each trolley was last read by a fixed RFID portal */
  var L={"T-1042":["laundry",5],"T-1077":["hospital",50],"T-1103":["laundry",31],"T-1121":["laundry",8],"T-1135":["laundry",6],"T-1150":["laundry",90],"T-1162":["laundry",20]};
  Object.keys(L).forEach(function(k){t[k].loc={at:L[k][0],time:iso(L[k][1]),by:L[k][0]==="laundry"?"Inbound dock portal":"Dispatch portal, run 13"};});
  var reads=[
    {time:iso(50),portal:"Dispatch portal",epc:t["T-1077"].rfid,id:"T-1077",state:"Available",result:"Dispatched to "+HOSPITAL+" (run 13)",kind:"ok"},
    {time:iso(31),portal:"Inbound dock",epc:t["T-1103"].rfid,id:"T-1103",state:"Faulty",result:"Faulty trolley arrived. Engineering alerted.",kind:"fault"}];
  return {page:null,user:null,online:true,sidebar:true,current:{},qrRead:{},reads:reads,
    trolleys:t,newTags:[{barcode:"SPL1170",qr:qrFor("E280 6894 0000 4170 3A1C"),rfid:"E280 6894 0000 4170 3A1C"},{barcode:"SPL1171",qr:qrFor("E280 6894 0000 4171 6B0D"),rfid:"E280 6894 0000 4171 6B0D"}],
    queue:[],alerts:[{id:1,asset:"T-1077",msg:"Damage reported: Broken castor",from:"J. Tan, Ward 4B",time:iso(20),seen:false}],
    log:[{time:iso(20),asset:"T-1077",from:"Available",to:"Faulty",who:"J. Tan",where:"Ward 4B, "+HOSPITAL,read:"Barcode",note:"Damage report: Broken castor"},
         {time:iso(30),asset:"T-1103",from:"Faulty",to:"In repair",who:"M. Rossi",where:"Soil sort, SPL Broadmeadows",read:"Barcode",note:"Transferred to engineering"}],
    dispatch:{no:14,run:["T-1042","T-1103","T-1121","T-1135"],result:null,done:false,at:null},
    reg:{},offlineSince:null};
}
/* The QR label carries a Bundle Nexus asset key, not the RFID. The RFID (and asset no.)
   come back from a Bundle Nexus lookup, simulated by bundleLookup(). */
function qrFor(epc){return "BNX-"+epc.replace(/ /g,"").slice(-8);}
var STORE="spl-trolley-track-v4";   /* bump when the saved state's shape changes */
var S; try{var raw=localStorage.getItem(STORE);S=raw?JSON.parse(raw):seed();}catch(e){S=seed();}
var UI={dialog:null,toast:null,pin:"",pinErr:null,pinNext:null,form:{},lookup:null};
function save(){try{localStorage.setItem(STORE,JSON.stringify(S));}catch(e){}}
function U(){var id=S.user;return USERS.filter(function(u){return u.id===id;})[0]||null;}
function isAdmin(){var u=U();return !!(u&&u.admin);}
function allowed(pg){var u=U();return !!u&&u.pages.indexOf(pg)>-1;}
/* Bundle Nexus: QR payload -> asset record (asset no. + RFID). Offline uses the device's cached copy. */
function bundleLookup(qr,done){
  var id=Object.keys(S.trolleys).filter(function(k){return T(k).qr===qr;})[0]||null;
  setTimeout(function(){done(id,!S.online);},S.online?QR_LOOKUP_MS:250);
}

function P(id){return PAGES.filter(function(p){return p.id===(id||S.page);})[0];}
function T(id){return S.trolleys[id];}
function cur(){var id=S.current[S.page];return id?T(id):null;}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
function tm(d){return new Date(d).toLocaleTimeString("en-AU",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false});}
function dtm(d){d=new Date(d);return d.toLocaleDateString("en-AU",{day:"2-digit",month:"short"})+" "+tm(d);}
function actor(){return U()||{user:"Unknown",place:"Unknown"};}
var CLS={"Available":"ok","Faulty":"fault","In repair":"info","Retired":"off","Unregistered":"warn"};
function st(s){return '<span class="st '+s.replace(" ","-")+'"><span class="dot '+CLS[s]+'"></span>'+esc(s)+'</span>';}
function count(s){return Object.keys(S.trolleys).filter(function(k){return T(k).state===s;}).length;}

function log(asset,from,to,read,note){var a=actor();S.log.unshift({time:new Date().toISOString(),asset:asset,from:from,to:to,who:a.user,where:a.place,read:read||"App",note:note||""});}
function setState(id,to,read,note){var t=T(id),f=t.state;t.state=to;if(f!==to)staleRun(id);log(id,f,to,read,note);}
/* a trolley on the dispatch run changed after the portal read it: that read no longer counts */
function staleRun(id){var d=S.dispatch;if(d&&!d.done&&d.result&&d.run.indexOf(id)>-1){d.result=null;UI.swapOut=null;}}
function runNo(){return S.dispatch.no||14;}
/* engineering's repair queue: Faulty, In repair, or flagged (never Retired) */
function inQueue(t){return t.state!=="Retired"&&(t.state==="Faulty"||t.state==="In repair"||!!t.flag);}
/* damage reports saved on this device while offline, not yet synced */
function queuedFor(id){return S.queue.filter(function(r){return r.asset===id;});}
function alertEng(asset,msg){var a=actor();S.alerts.unshift({id:Date.now()+Math.random(),asset:asset,msg:msg,from:a.user+", "+a.place.split(",")[0],time:new Date().toISOString(),seen:false});}
function toast(kind,text){UI.toast={kind:kind,text:text,id:Date.now()};var id=UI.toast.id;setTimeout(function(){if(UI.toast&&UI.toast.id===id){UI.toast=null;refreshOverlay();}},3800);}
/* Re-renders that don't come from a button press (timers, lookups, camera, screen changes).
   Save what's typed in open fields first, or the re-render puts the old values back. */
function refresh(){readForm();render();}
function refreshOverlay(){readForm();renderOverlay();}

function applyReport(r){
  var t=T(r.asset);
  staleRun(r.asset);
  /* an Available trolley has no open Reason; if an old one was left behind, start a new one */
  if(t.reason&&t.state!=="Available"){
    t.reason.count=(t.reason.count||1)+1;
    if(r.notes)t.reason.notes=(t.reason.notes?t.reason.notes+" | ":"")+r.notes;
    if(r.redCard)t.reason.redCard=true;
    S.log.unshift({time:r.time,asset:r.asset,from:t.state,to:t.state,who:r.who,where:r.where,read:r.read,note:"Repeat report attached to open Reason ("+t.reason.code+")"});
  }else{
    t.reason={code:r.code,notes:r.notes,photo:r.photo,reporter:r.who,where:r.where,date:r.time,redCard:r.redCard,count:1};
    var f=t.state; if(t.state==="Available")t.state="Faulty";
    S.log.unshift({time:r.time,asset:r.asset,from:f,to:t.state,who:r.who,where:r.where,read:r.read,note:"Damage report: "+r.code+(r.redCard?", red card attached":", app only")});
  }
  S.alerts.unshift({id:Date.now()+Math.random(),asset:r.asset,msg:"Damage reported: "+r.code,from:r.who+", "+r.where.split(",")[0],time:r.time,seen:false});
}

/* ================= DOM patching =================
   Rather than replacing innerHTML (which recreates every element, so CSS transitions
   never run and enter animations replay on every click), patch() updates the live DOM
   in place. Unchanged elements are kept, so only what changed animates.
   data-key="…"  : match this element by key, not position; a new key = a new element (enter animation plays).
   data-exit     : when removed, add .is-leaving and keep it until its exit animation ends. */
var EXIT_MS=220;
function keyOf(n){return n.nodeType===1?(n.getAttribute("data-key")||n.id||null):null;}
function leaving(n){return n.nodeType===1&&n.classList.contains("is-leaving");}
function removeNode(n){
  if(n.nodeType===1&&n.hasAttribute("data-exit")){
    n.classList.add("is-leaving"); n.removeAttribute("data-key"); n.removeAttribute("id");
    /* a closing dialog keeps its fields for the exit animation: drop their ids so readForm() can't read them */
    [].forEach.call(n.querySelectorAll("[id]"),function(x){x.removeAttribute("id");});
    setTimeout(function(){if(n.parentNode)n.parentNode.removeChild(n);},EXIT_MS);
  } else n.parentNode.removeChild(n);
}
function morph(a,b){
  if(a.nodeType!==1){if(a.nodeValue!==b.nodeValue)a.nodeValue=b.nodeValue;return;}
  var i,at;
  for(i=a.attributes.length-1;i>=0;i--){at=a.attributes[i].name;if(!b.hasAttribute(at)&&at!=="data-label")a.removeAttribute(at);}
  for(i=0;i<b.attributes.length;i++){at=b.attributes[i];if(a.getAttribute(at.name)!==at.value)a.setAttribute(at.name,at.value);}
  /* live form values don't follow attributes once edited, so sync them explicitly.
     Read b's value first: morphChildren may move b's children (e.g. textarea text) into a. */
  var tag=a.tagName, box=tag==="INPUT"&&(a.type==="checkbox"||a.type==="radio"), form=tag==="INPUT"||tag==="TEXTAREA"||tag==="SELECT";
  var want=form?(box?b.checked:b.value):null;
  if(a.hasAttribute("data-keep")) return;   /* contents managed by code (e.g. the camera video): leave them alone */
  morphChildren(a,b);
  if(form){if(box){if(a.checked!==want)a.checked=want;}else if(a.value!==want)a.value=want;}
}
function morphChildren(from,to){
  var old=[],keyed={},unkeyed=[],used=[],u=0;
  for(var n=from.firstChild;n;n=n.nextSibling){if(leaving(n))continue;old.push(n);var k=keyOf(n);if(k)keyed[k]=n;else unkeyed.push(n);}
  var ref=from.firstChild, kids=Array.prototype.slice.call(to.childNodes);
  kids.forEach(function(nc){
    var k=keyOf(nc), m=null;
    if(k){m=keyed[k]; if(m&&m.nodeName===nc.nodeName)delete keyed[k]; else m=null;}
    else{var c=unkeyed[u]; if(c&&c.nodeType===nc.nodeType&&c.nodeName===nc.nodeName){m=c;u++;}}
    if(m){morph(m,nc);used.push(m);} else m=nc;
    while(ref&&leaving(ref))ref=ref.nextSibling;
    if(m===ref)ref=ref.nextSibling; else from.insertBefore(m,ref);
  });
  old.forEach(function(o){if(used.indexOf(o)<0&&o.parentNode===from)removeNode(o);});
}
function patch(root,html){var t=document.createElement("template");t.innerHTML=html;morphChildren(root,t.content);}

/* ================= render ================= */
var app=document.getElementById("app"), overlay=document.getElementById("overlay");
function topbar(u){
  return '<header class="topbar">'+
   (u?'<button class="icon-btn" data-act="menu" aria-label="Show or hide the menu">'+ic("menu",1.6)+'</button>':'')+
   '<div class="logo">SPL</div><div class="app-name">Trolley Track</div><div class="divider hide-sm"></div>'+
   '<div class="devs hide-sm"><span><span class="dot '+(S.online?"ok":"warn")+'"></span>Bundle Nexus</span><span class="hide-md"><span class="dot ok"></span>RFID portal</span>'+
   '<button data-act="net" title="Tap to simulate losing the connection"><span class="dot '+(S.online?"ok":"warn")+'"></span>'+(S.online?"Network":"Network offline")+'</button></div>'+
   '<div style="flex:1"></div>'+
   '<div class="status-chip hide-sm"><span class="dot '+(S.online?"ok live":"warn")+'"></span>'+(S.online?"Online":"Offline")+'</div>'+
   '<div class="clock" id="clock">'+tm(Date.now())+'</div>'+
   (u?'<div class="divider hide-sm"></div><div class="who hide-sm">'+ic("user",1.8)+'<div><div class="nm">'+esc(u.user)+'</div><div class="rl">'+esc(u.role)+'</div></div></div>'+
      '<button class="btn btn-sm hide-sm" data-act="logout">'+ic("logout")+'Sign out</button>':'')+
   '<div class="divider hide-sm"></div><button class="btn btn-sm theme-btn" data-act="theme" aria-label="Switch to '+(theme()==="dark"?"light":"dark")+' mode">'+ic(theme()==="dark"?"sun":"moon")+'<span class="hide-sm">'+(theme()==="dark"?"Light mode":"Dark mode")+'</span></button>'+
   '<button class="icon-btn hide-md" data-act="phone" title="Phone view: preview the phone app layout" aria-label="Phone view">'+ic("phone",1.8)+'</button>'+
   '<div class="site hide-md">Broadmeadows</div></header>';
}
/* ================= phone app layout =================
   html.phone switches the CSS to the app layout: app bar on top, tab bar at the bottom,
   dialogs as bottom sheets, one screen at a time. It turns on for narrow screens, or on
   desktop through "Phone view", which shows the app inside a phone-sized frame. */
var SHORT={register:"Register",hospital:"Ward",soil:"Soil sort",eng:"Repairs",production:"Production",packing:"Packing",dispatch:"Dispatch",portals:"Portals",fleet:"Fleet",log:"Log"};
var PREVIEW=false; try{PREVIEW=localStorage.getItem("spl-trolley-phone")==="1";}catch(e){}
var NARROW=window.matchMedia?matchMedia("(max-width:760px)"):null;
function narrow(){return !!(NARROW&&NARROW.matches);}
function isPhone(){return PREVIEW||narrow();}
function applyMode(tabs){var r=document.documentElement.classList;r.toggle("phone",isPhone());r.toggle("phone-frame",PREVIEW&&!narrow());r.toggle("has-tabs",!!tabs);}
function initials(u){return u.user.replace(/[^A-Z]/g,"").slice(0,2);}
function badge(pg){
  if(pg.id==="eng"){var n=Object.keys(S.trolleys).filter(function(k){return inQueue(T(k));}).length;return n||"";}
  if(pg.id==="hospital")return S.queue.length||"";
  if(pg.id==="fleet")return Object.keys(S.trolleys).length;
  return "";
}
function appbar(u,title){
  return '<header class="appbar"><div class="ab-title"><div class="ab-over">SPL Trolley Track</div><div class="ab-name">'+esc(title)+'</div></div>'+
   '<button class="ab-net" data-act="net" aria-label="'+(S.online?"Online. Tap to simulate going offline":"Offline. Tap to reconnect")+'"><span class="dot '+(S.online?"ok live":"warn")+'"></span>'+(S.online?"Online":"Offline")+'</button>'+
   (u?'<button class="avatar" data-act="account" aria-label="Account and settings">'+esc(initials(u))+'</button>'
     :'<button class="avatar ghost" data-act="theme" aria-label="Switch theme">'+ic(theme()==="dark"?"sun":"moon",1.8)+'</button>')+'</header>';
}
/* bottom tabs: up to 5; with more pages the 5th becomes "More" */
function tabbar(){
  var mine=PAGES.filter(function(pg){return allowed(pg.id);});
  if(mine.length<2) return '';
  var more=mine.length>5, show=more?mine.slice(0,4):mine, onMore=more&&show.every(function(pg){return pg.id!==S.page;});
  return '<nav class="tabbar" aria-label="Stations">'+show.map(function(pg){var b=pg.id==="fleet"?"":badge(pg);
    return '<button class="tb" data-act="go" data-p="'+pg.id+'"'+(pg.id===S.page?' aria-current="page"':'')+'>'+ic(pg.icon,1.8)+'<span>'+esc(SHORT[pg.id]||pg.name)+'</span>'+(b?'<em>'+b+'</em>':'')+'</button>';}).join("")+
   (more?'<button class="tb" data-act="more"'+(onMore?' aria-current="page"':'')+'>'+ic("menu",1.8)+'<span>More</span></button>':'')+'</nav>';
}
/* phone tables read as cards; each cell gets its column name as a label */
function labelTables(root){
  [].forEach.call(root.querySelectorAll("table.table"),function(tb){
    var hs=[].map.call(tb.querySelectorAll("thead th"),function(th){return th.textContent;});
    [].forEach.call(tb.querySelectorAll("tbody tr"),function(tr){[].forEach.call(tr.children,function(td,i){if(hs[i]&&td.getAttribute("data-label")!==hs[i])td.setAttribute("data-label",hs[i]);});});
  });
}
function gridOpen(){var L=UI.lookup&&UI.lookup.page===S.page;return '<div class="grid2 station'+(cur()||L?' has-result':'')+'">';}

/* Sign-in screen. In the live app this would be Microsoft Entra / badge sign-in;
   here you pick a demo user. Admin needs the PIN. */
function loginScreen(){
  return topbar(null)+appbar(null,"Sign in")+'<div class="main" data-key="login"><main class="content view login"><div class="login-card panel">'+
   '<div class="panel-head"><div><div class="panel-title">Sign in</div><div class="panel-desc">Pick who you are. You’ll only see the screens for your station.</div></div></div>'+
   '<div class="panel-body"><div class="rows">'+USERS.map(function(u){
     return '<button class="row" data-act="login" data-u="'+u.id+'"><span class="sq">'+ic(u.admin?"lock":"user")+'</span><span class="grow"><div class="id" style="font-size:21px">'+esc(u.user)+'</div><div class="meta txt">'+esc(u.role)+' · '+esc(u.place)+'</div><div class="meta txt">Sees: '+u.pages.map(function(id){return esc(P(id).name);}).join(", ")+'</div></span>'+(u.admin?'<span class="tag warn">PIN</span>':'')+'</button>';
   }).join("")+'</div></div>'+
   '<div class="panel-foot">'+ic("info")+'<span>Demo sign-in. Admin PIN is 1234. <button class="panel-link" data-act="reset">Reset demo data</button></span></div></div></main></div>';
}
function render(){
  var u=U();
  if(!u){applyMode(false);patch(app,loginScreen());renderOverlay();save();return;}
  if(!allowed(S.page)) S.page=u.pages[0];
  if(UI.cam&&UI.cam.page!==S.page) stopCam();
  var p=P();
  var unseen=S.alerts.filter(function(a){return !a.seen;}).length;
  var jobs=Object.keys(S.trolleys).filter(function(k){return inQueue(T(k));}).length;
  var h=topbar(u)+appbar(u,p.name);

  /* banners */
  if(!S.online){
    h+='<div class="banner warn" data-key="banner-offline">'+ic("warn",2.2)+'<div class="sev">Offline</div><div class="title">Network not connected</div><div class="bdiv hide-sm"></div>'+
      '<div class="body">Damage reports are kept on this device and sync when the connection returns. Dispatch can’t verify trolleys until then.</div>'+
      '<div class="doing"><span class="spin" style="display:flex">'+ic("retry")+'</span>'+(S.queue.length?S.queue.length+' report'+(S.queue.length>1?'s':'')+' queued':'Retrying every 5 s')+'</div>'+
      '<div class="when">Since '+tm(S.offlineSince||Date.now())+'</div><button class="btn btn-sm" data-act="net">Reconnect</button></div>';
  }
  if(S.page==="dispatch"&&S.dispatch.result&&S.dispatch.result.blocked.length&&!S.dispatch.done){
    var b=S.dispatch.result.blocked;
    h+='<div class="banner" data-key="banner-blocked">'+ic("warn",2.2)+'<div class="sev">Blocked</div><div class="title">Dispatch blocked: '+b.length+' trolley'+(b.length>1?'s':'')+' not Available</div><div class="bdiv hide-sm"></div>'+
      '<div class="body">'+b.map(function(id){var t=T(id);return '<span class="mono">'+esc(id)+'</span> is '+esc(t.state)+(t.reason?' ('+esc(t.reason.code)+')':'');}).join("; ")+'. Remove, replace and read the run again.</div>'+
      '<div class="when">Detected '+tm(S.dispatch.at)+'</div></div>';
  }

  /* sidebar */
  /* sidebar: only the pages this user is allowed to see */
  function navItem(pg){
    var c='';
    if(pg.id==="eng"&&jobs)c='<span class="nav-count">'+jobs+'</span>';
    if(pg.id==="hospital"&&S.queue.length)c='<span class="nav-count">'+S.queue.length+'</span>';
    if(pg.id==="fleet")c='<span class="nav-count">'+Object.keys(S.trolleys).length+'</span>';
    return '<button class="nav-item" data-act="go" data-p="'+pg.id+'"'+(pg.id===S.page?' aria-current="page"':'')+'>'+ic(pg.icon,1.7)+esc(pg.name)+c+'</button>';
  }
  var mine=PAGES.filter(function(pg){return allowed(pg.id);});
  var work=mine.filter(function(pg){return RECORDS.indexOf(pg.id)<0;}), recs=mine.filter(function(pg){return RECORDS.indexOf(pg.id)>-1;});
  h+='<div class="main" data-key="main"><nav class="sidebar'+(S.sidebar?'':' closed')+'" aria-label="Stations">';
  if(work.length) h+='<div class="section">'+(work.length>1?'Workflow':'Your station')+'</div>'+work.map(navItem).join("");
  if(recs.length) h+=(work.length?'<div class="nav-sep"></div>':'')+'<div class="section" style="padding-top:6px">Records</div>'+recs.map(navItem).join("");
  h+='<div class="signed"><div class="lab">SIGNED IN AS</div><div class="nm">'+esc(u.user)+'</div><div class="pl">'+esc(u.role)+'<br>'+esc(u.place)+'</div>'+
    '<button class="signout" data-act="logout">'+ic("logout",1.8)+'Sign out</button>'+
    '<div class="ver">Prototype v0.4<br>Bundle Nexus API (simulated)</div></div></nav>';

  /* content */
  /* keyed by page, so the enter animation plays when you change page and not on every click */
  h+='<main class="content view" data-key="page-'+S.page+'">'+pageHead(p)+pageBody()+'</main></div>';
  var tabs=tabbar(); h+=tabs;
  applyMode(tabs);
  patch(app,h);
  labelTables(app);
  /* phone: a new result replaces the scanner, so start it at the top */
  var c=app.querySelector(".content"), sk=S.page+":"+(cur()?cur().id:"")+(UI.lookup?":lookup":"");
  if(isPhone()&&c&&sk!==UI.scrollKey)c.scrollTop=0; UI.scrollKey=sk;
  renderOverlay(); save();
}

function pageHead(p){
  var act='';
  if(["hospital","soil","eng","production","packing","dispatch"].indexOf(S.page)>-1) act='<div class="actions"><button class="btn btn-danger-quiet" data-act="report-any">'+ic("warn")+'Report damage on any trolley</button></div>';
  if(S.page==="fleet"||S.page==="log") act='<div class="actions"><button class="btn btn-caps btn-sm" data-act="reset">Reset demo</button></div>';
  return '<div class="page-head"><div><h1 class="page-title">'+esc(p.title)+'</h1><div class="page-sub">'+esc(p.sub)+'</div></div>'+act+'</div>';
}

/* Location comes from the fixed RFID portals reading the trolley's EPC */
function locLine(t){var l=t.loc||{};return l.at==="laundry"?"In laundry, SPL Broadmeadows":l.at==="hospital"?"At "+t.pool:"Not read yet";}
function locShort(t){var l=t.loc||{};return l.at==="laundry"?"In laundry":l.at==="hospital"?"At hospital":"Not read yet";}
function locHtml(t){var l=t.loc;return esc(locLine(t))+(l?'<div class="sub">'+esc(l.by)+', '+esc(dtm(l.time))+'</div>':'');}
function bad(t){return t.state==="Faulty"||t.state==="In repair"||!!t.flag;}
/* a fixed portal reads a trolley's EPC */
function portalRead(id,portal){
  var t=T(id), now=new Date().toISOString(), b=bad(t);
  if(portal==="inbound"){
    t.loc={at:"laundry",time:now,by:"Inbound dock portal"};
    var res=t.state==="Retired"?"Retired trolley arrived. Take it off the line.":b?"Faulty trolley arrived. Engineering alerted.":"Arrived. Available.";
    S.reads.unshift({time:now,portal:"Inbound dock",epc:t.rfid,id:id,state:t.state,result:res,kind:t.state==="Retired"?"off":b?"fault":"ok"});
    S.log.unshift({time:now,asset:id,from:t.state,to:t.state,who:"RFID portal",where:"Inbound dock, SPL Broadmeadows",read:"RFID, EPC "+t.rfid,note:"Arrived at the laundry"+(b&&t.reason?"; open Reason: "+t.reason.code:"")});
    if(b) S.alerts.unshift({id:Date.now()+Math.random(),asset:id,msg:"Faulty trolley is now in the laundry"+(t.reason?" ("+t.reason.code+")":""),from:"Inbound RFID portal",time:now,seen:false});
  }
  return b;
}
function tile(label,n,kind,sub){return '<div class="stat '+(kind==="info"?"":kind)+'"><div class="overline">'+esc(label)+'</div><div class="stat-value"><span class="dot '+kind+'"></span>'+n+'</div><div class="stat-sub">'+esc(sub)+'</div></div>';}

/* ================= camera scanner =================
   Uses the phone's back camera (needs an https link). Reads QR codes and barcodes:
   the browser's own BarcodeDetector where it exists (Android Chrome), otherwise the
   ZXing library, loaded on first use (iPhone, desktop). A recognised label goes
   through the same Bundle Nexus lookup as tapping a trolley in the demo list. */
var APP_VERSION=10; /* shown in the camera status line; keep in step with ?v= in index.html */
var ZXING_URL="https://cdn.jsdelivr.net/npm/@zxing/library@0.20.0/umd/index.min.js";
var CAM={stream:null,timer:null,busy:false,last:null,info:null,lastTry:0,video:null};
var CAM_START_MS=15000;   /* give up on "Starting the camera…" after this long */
var ZXING_EVERY_MS=350, ZXING_MAX_PX=640;   /* ZXing runs on the main thread: check less often, on a smaller frame */
function loadScript(src){return new Promise(function(ok,bad){var el=document.createElement("script");el.src=src;el.onload=ok;el.onerror=function(){bad(new Error("Couldn’t load the barcode reader. Check the internet connection."));};document.head.appendChild(el);});}
function stopCam(){
  if(CAM.timer){clearInterval(CAM.timer);CAM.timer=null;}
  if(CAM.stream){CAM.stream.getTracks().forEach(function(t){t.stop();});CAM.stream=null;}
  if(CAM.video){CAM.video.srcObject=null;CAM.video=null;}
  CAM.busy=false;CAM.last=null;CAM.info=null;UI.cam=null;
}
/* iPhone Safari is strict about camera video. Build the <video> in the live page with
   createElement (not from a template), set muted + playsinline before attaching the stream,
   and keep it out of patch() (its box has data-keep). Same steps as cam-test.html. */
function attachVideo(stream){
  var box=document.getElementById("vfCam"); if(!box) return null;
  var v=document.createElement("video"); v.className="vf-video";
  v.setAttribute("playsinline",""); v.setAttribute("webkit-playsinline",""); v.setAttribute("muted",""); v.setAttribute("autoplay","");
  v.muted=true; v.defaultMuted=true; v.playsInline=true; v.autoplay=true;
  while(box.firstChild) box.removeChild(box.firstChild);
  box.appendChild(v);
  v.srcObject=stream; CAM.video=v;
  return v;
}
/* the phone's built-in scanner, only if it really works: some Android phones list
   BarcodeDetector but fail every call (scanner module not installed) */
function nativeDecoder(){
  if(!("BarcodeDetector" in window)) return Promise.resolve(null);
  var want=["qr_code","code_128","code_39","ean_13"];
  return BarcodeDetector.getSupportedFormats().then(function(sup){
    var f=want.filter(function(x){return sup.indexOf(x)>-1;});
    if(f.indexOf("qr_code")<0) return null;
    var d=new BarcodeDetector({formats:f}), probe=document.createElement("canvas"); probe.width=probe.height=16;
    return d.detect(probe).then(function(){
      return {name:"built-in scanner",fn:function(v){return d.detect(v).then(function(r){return r.length?r[0].rawValue:null;});}};
    },function(e){if(CAM.info)CAM.info.note="built-in scanner unavailable";return null;});
  }).catch(function(){return null;});
}
/* returns {name, fn(video) -> Promise<text|null>} */
function makeDecoder(){
  return nativeDecoder().then(function(nat){
    return nat||zxingDecoder();
  });
}
function zxingDecoder(){
    return (window.ZXing?Promise.resolve():loadScript(ZXING_URL)).then(function(){
      var Z=window.ZXing, hints=new Map(), reader=new Z.MultiFormatReader();
      hints.set(Z.DecodeHintType.POSSIBLE_FORMATS,[Z.BarcodeFormat.QR_CODE,Z.BarcodeFormat.CODE_128,Z.BarcodeFormat.CODE_39,Z.BarcodeFormat.EAN_13]);
      hints.set(Z.DecodeHintType.TRY_HARDER,true);
      reader.setHints(hints);
      var cv=document.createElement("canvas"), cx=cv.getContext("2d",{willReadFrequently:true});
      return {name:"ZXing reader",fn:function(v){
        var w=v.videoWidth,h=v.videoHeight; if(!w) return Promise.resolve(null);
        var k=Math.min(1,ZXING_MAX_PX/Math.max(w,h)); cv.width=Math.round(w*k); cv.height=Math.round(h*k);
        cx.drawImage(v,0,0,cv.width,cv.height);
        /* own greyscale: ZXing's HTMLCanvasElementLuminanceSource inverts every other frame,
           which together with TRY_HARDER never decodes */
        var px=cx.getImageData(0,0,cv.width,cv.height).data, lum=new Uint8ClampedArray(cv.width*cv.height);
        for(var i=0,j=0;j<lum.length;i+=4,j++) lum[j]=(px[i]*77+px[i+1]*150+px[i+2]*29)>>8;
        try{return Promise.resolve(reader.decodeWithState(new Z.BinaryBitmap(new Z.HybridBinarizer(new Z.RGBLuminanceSource(lum,cv.width,cv.height)))).getText());}
        catch(e){return Promise.resolve(null);}
      }};
    });
}
/* status line inside the live camera view, so problems are visible on the phone */
function camInfo(v){
  var el=document.getElementById("vfInfo"), i=CAM.info; if(!el||!i) return;
  var w=v&&v.videoWidth, parts=["v"+APP_VERSION, i.name||"loading reader…"];
  parts.push(w?w+"×"+v.videoHeight:"no picture yet");
  parts.push(i.frames+" checks");
  if(i.errs) parts.push(i.errs+" errors"+(i.lastErr?" ("+i.lastErr+")":""));
  if(i.note) parts.push(i.note);
  el.textContent=parts.join(" · ");
}
function camError(e){
  var n=e&&e.name;
  return n==="NotAllowedError"?"Camera access was blocked. Allow the camera for this site in your browser settings, then try again.":
         n==="NotFoundError"?"No camera was found on this device.":
         n==="NotReadableError"?"The camera is being used by another app. Close it and try again.":
         (e&&e.message)||"Couldn’t start the camera.";
}
/* ask for the back camera; if the phone rejects those settings, retry with simpler ones */
function openCamera(){
  var tries=[
    {audio:false,video:{facingMode:{ideal:"environment"},width:{ideal:1280},height:{ideal:720}}},
    {audio:false,video:{facingMode:"environment"}},
    {audio:false,video:true}];
  function next(i,lastErr){
    if(i>=tries.length) return Promise.reject(lastErr);
    return navigator.mediaDevices.getUserMedia(tries[i]).catch(function(e){
      if(e&&(e.name==="NotAllowedError"||e.name==="SecurityError")) throw e;   /* blocked: retrying won't help */
      return next(i+1,e);
    });
  }
  return next(0,null);
}
/* phones (iPhone in Low Power Mode especially) may refuse to start video without a tap */
function playVideo(v){
  v.muted=true; v.playsInline=true; v.setAttribute("playsinline",""); v.setAttribute("webkit-playsinline","");
  var p=v.play();
  if(p&&p.then) p.then(function(){if(UI.cam&&UI.cam.needTap){UI.cam.needTap=false;refresh();}},function(e){
    if(CAM.info){CAM.info.errs++;CAM.info.lastErr="video: "+(e.name||e);}
    if(UI.cam&&!UI.cam.needTap){UI.cam.needTap=true;refresh();}
  });
}
function startCam(){
  var pg=S.page;
  if(!window.isSecureContext){UI.cam={page:pg,status:"error",msg:"The camera only works on a secure https link (or localhost). Open the app from its https address, or tap a demo trolley below."};return render();}
  if(!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)){UI.cam={page:pg,status:"error",msg:"This browser can’t use the camera."};return render();}
  UI.cam={page:pg,status:"starting"}; render();
  /* never sit on "Starting the camera…" forever (e.g. the permission prompt was dismissed) */
  var watchdog=setTimeout(function(){
    if(UI.cam&&UI.cam.page===pg&&UI.cam.status==="starting"){stopCam();UI.cam={page:pg,status:"error",msg:"The camera didn’t start. Check the camera is allowed for this site (Safari: aA → Website Settings → Camera → Allow), then tap Try again."};refresh();}
  },CAM_START_MS);
  openCamera().then(function(stream){
    clearTimeout(watchdog);
    /* left the screen, stopped, or timed out meanwhile */
    if(!UI.cam||UI.cam.page!==S.page||UI.cam.status!=="starting"){stream.getTracks().forEach(function(t){t.stop();});return;}
    CAM.stream=stream; CAM.info={name:"",frames:0,errs:0,lastErr:"",note:""}; UI.cam.status="live"; refresh();
    var v=attachVideo(stream);
    if(!v){stopCam();UI.cam={page:pg,status:"error",msg:"Couldn’t show the camera picture. Tap Try again."};refresh();return;}
    playVideo(v);
    camInfo(v);
    /* the loop starts now so the status line updates while the reader is still loading */
    var dec=null;
    CAM.timer=setInterval(function(){
        camInfo(v);
        if(!dec||CAM.busy||!CAM.stream) return;
        if(!v.videoWidth) return;   /* no frame yet */
        if(dec.name==="ZXing reader"&&Date.now()-CAM.lastTry<ZXING_EVERY_MS) return;
        CAM.lastTry=Date.now(); CAM.busy=true; CAM.info.frames++;
        dec.fn(v).then(function(txt){CAM.busy=false; if(txt) onCode(String(txt).trim());},function(e){
          CAM.busy=false; CAM.info.errs++; CAM.info.lastErr=(e&&(e.message||e.name))||"decode failed";
          /* built-in scanner keeps failing: switch to the ZXing reader */
          if(dec.name!=="ZXing reader"&&CAM.info.errs>=5){dec={name:"switching…",fn:function(){return Promise.resolve(null);}};
            zxingDecoder().then(function(z){dec=z;if(CAM.info){CAM.info.name=z.name;CAM.info.errs=0;CAM.info.note="built-in scanner failed, using ZXing";}});}
        });
    },200);
    return makeDecoder().then(function(d){ if(CAM.stream&&CAM.info){dec=d; CAM.info.name=d.name;} });
  }).catch(function(e){clearTimeout(watchdog); stopCam(); UI.cam={page:pg,status:"error",msg:camError(e)}; refresh();});
}
/* a code was read: QR key, barcode or asset number */
function onCode(txt){
  var id=Object.keys(S.trolleys).filter(function(k){var t=T(k);return t.qr===txt||t.barcode===txt||k===txt;})[0];
  if(!id){ if(CAM.last!==txt){CAM.last=txt; toast("warn","That isn’t a trolley label: "+txt); refreshOverlay();} return; }
  if(navigator.vibrate) navigator.vibrate(60);
  var how=T(id).qr===txt?"QR code":"barcode";
  stopCam(); lookupTrolley(id,"Camera ("+how+")");
}
/* label -> Bundle Nexus -> asset no. + EPC, then show the trolley */
function lookupTrolley(id,how){
  var pg=S.page, qr=T(id).qr, who=S.user, L={page:pg,qr:qr};
  UI.lookup=L; S.current[pg]=null; render();
  bundleLookup(qr,function(rid,cached){
    /* ignore a result that's no longer wanted: signed out, demo reset, or a newer scan started */
    if(UI.lookup!==L||S.user!==who) return;
    UI.lookup=null; readForm();
    if(!rid) toast("fault","Bundle Nexus doesn’t recognise "+qr+". Try scanning again.");
    else{S.current[pg]=rid; S.qrRead[pg]={id:rid,cached:cached}; S.lastRead=how+(cached?" (cached Bundle data)":" via Bundle Nexus");}
    render();
  });
}
function viewfinder(){
  var cam=UI.cam&&UI.cam.page===S.page?UI.cam:null;
  var corners='<i></i><i></i><i></i><i></i><div class="vf-line"></div>';
  if(cam&&cam.status!=="error")
    return '<div class="viewfinder live" data-key="vf-live"><div class="vf-cam" id="vfCam" data-keep></div>'+
      '<div class="vf-frame" aria-hidden="true">'+corners+'</div>'+
      '<div class="vf-text">'+(cam.status==="starting"?"Starting the camera…":"Point at the QR code or barcode")+'<div class="vf-info" id="vfInfo"></div></div>'+
      (cam.needTap?'<button class="btn btn-primary vf-tap" data-act="cam-play">'+ic("camera")+'Tap to start the camera</button>':'')+
      '<button class="vf-stop" data-act="cam-stop" aria-label="Stop the camera">'+ic("x")+'</button></div>';
  return '<div class="viewfinder" data-key="vf-idle"><div class="vf-frame" aria-hidden="true">'+corners+ic("qr",1.4)+'</div>'+
    '<div class="vf-text">'+(cam?esc(cam.msg):"Scan the trolley’s QR code or barcode")+'<div class="vf-info">App v'+APP_VERSION+'</div></div>'+
    '<button class="btn btn-primary vf-btn" data-act="cam-start">'+ic("camera")+(cam?"Try again":"Scan with camera")+'</button></div>';
}

/* scan panel shared by stations: one camera scanner that reads the QR code or the barcode */
function scanPanel(opts){
  opts=opts||{};
  var ids=Object.keys(S.trolleys).sort();
  var sel=S.current[S.page], busy=UI.lookup&&UI.lookup.page===S.page;
  return '<section class="panel pick scan"><div class="panel-head"><div class="panel-title">'+esc(opts.title||"Scan the QR code or barcode")+'</div><div class="panel-desc">Tap a trolley to simulate a camera scan</div></div>'+
   /* phone only: camera viewfinder above the demo list */
   viewfinder()+
   '<div class="vf-demo only-phone">Or tap a demo trolley</div>'+
   '<div class="panel-body"><div class="rows">'+ids.map(function(id){var t=T(id);
     /* the label only carries the Bundle key; the asset no. and EPC come back from Bundle Nexus */
     var pending=UI.lookup&&UI.lookup.page===S.page&&UI.lookup.qr===t.qr;
     return '<button class="row" data-act="scan" data-id="'+id+'" aria-current="'+(sel===id)+'"'+(busy?' disabled':'')+'><span class="sq">'+ic("qr")+'</span><span class="grow"><div class="id">'+esc(id)+'</div><div class="meta">'+esc(t.qr)+' · '+esc(t.barcode)+'</div></span>'+
       (pending?'<span class="tag warn">Looking up…</span>':sel===id?'<span class="tag">Read</span>':'')+'</button>';}).join("")+'</div></div>'+
   '<div class="panel-foot">'+ic("info")+'<span>No labels yet? Open <b>test-labels.html</b> on a PC and scan those. The camera reads the QR code or the barcode. Bundle Nexus returns the trolley’s asset number and EPC, and every report is stored against that EPC. RFID itself is read by the fixed portals at the laundry, not by phones.</span></div></section>';
}
/* What Bundle Nexus returned for the last QR read on this page */
function qrNote(t){
  var q=S.qrRead[S.page]; if(!q||q.id!==t.id) return '';
  return '<div class="note '+(q.cached?'warn':'ok')+'">'+ic(q.cached?"warn":"qr").replace('<svg','<svg width="20" height="20"')+'<div><b>'+(q.cached?'Resolved from the device’s cached Bundle data':'Resolved by Bundle Nexus')+'</b> <span class="mono">'+esc(t.qr)+'</span> → <span class="mono">'+esc(t.id)+'</span>, EPC <span class="mono">'+esc(t.rfid)+'</span>'+
    (q.cached?'<div style="font-size:14px;color:var(--text-muted);margin-top:4px">Bundle Nexus can’t be reached. The status shown may be out of date.</div>':'')+'</div></div>';
}
function details(t,noReason){
  var q=queuedFor(t.id), h='';
  if(q.length) h+='<div class="note warn">'+ic("clock").replace('<svg','<svg width="20" height="20"')+'<div><b>'+(q.length>1?q.length+' damage reports':'A damage report')+' saved on this device, waiting to sync</b> ('+q.map(function(r){return esc(r.code);}).join(", ")+'). It will be sent when the connection is back. No need to report it again.</div></div>';
  h+='<dl class="kv"><dt>Asset</dt><dd class="mono">'+esc(t.id)+'</dd><dt>State</dt><dd>'+st(t.state)+'</dd><dt>Description</dt><dd>'+esc(t.desc)+'</dd><dt>Pool customer</dt><dd>'+esc(t.pool)+'</dd><dt>Location</dt><dd>'+locHtml(t)+'</dd><dt>Barcode</dt><dd class="mono">'+esc(t.barcode)+'</dd><dt>QR code</dt><dd class="mono">'+esc(t.qr||"Not linked")+'</dd><dt>EPC (RFID)</dt><dd class="mono">'+esc(t.rfid)+'</dd></dl>';
  if(t.reason&&!noReason){var r=t.reason;
    h+='<div class="panel" style="box-shadow:none"><div class="panel-head"><div class="panel-title">Open Reason: '+esc(r.code)+'</div>'+(r.count>1?'<span class="tag fault">'+r.count+' reports</span>':'')+'</div><div class="panel-body"><dl class="kv">'+
     '<dt>Reported by</dt><dd>'+esc(r.reporter)+'</dd><dt>Where</dt><dd>'+esc(r.where)+'</dd><dt>When</dt><dd class="mono">'+esc(dtm(r.date))+'</dd><dt>Notes</dt><dd>'+(r.notes?esc(r.notes):'<span style="color:var(--text-muted)">None</span>')+'</dd>'+
     '<dt>Photo</dt><dd>'+(r.photo?'<span class="thumb" style="display:block" role="img" aria-label="Damage photo"></span>':'<span style="color:var(--text-muted)">None</span>')+'</dd><dt>Red card</dt><dd>'+(r.redCard?'Attached':'Not attached, app report only')+'</dd></dl></div></div>';}
  if(t.reuses&&t.reuses.length) h+='<div class="note ok">'+ic("retry").replace('<svg','<svg width="20" height="20"')+'<div><b>Reused '+t.reuses.length+' time'+(t.reuses.length>1?'s':'')+'.</b> Last: '+esc(dtm(t.reuses[0].date))+', '+esc(t.reuses[0].notes)+'</div></div>';
  if(t.flag) h+='<div class="note warn">'+ic("bell").replace('<svg','<svg width="20" height="20"')+'<div><b>Flagged for repair.</b> '+esc(t.flag.msg)+'<div class="mono" style="font-size:13px;color:var(--text-muted);margin-top:4px">'+esc(t.flag.by)+', '+esc(dtm(t.flag.time))+'</div></div></div>';
  return h;
}
function resultPanel(title,inner){
  var c=cur(), L=UI.lookup&&UI.lookup.page===S.page?UI.lookup:null, key=L?'lookup':(c?c.id+'-'+c.state:'none');
  if(L) inner='<div class="empty lookup"><span class="spin" style="display:flex">'+ic("retry",1.7)+'</span><div>Looking up <span class="mono">'+esc(L.qr)+'</span> in '+(S.online?'Bundle Nexus':'cached Bundle data')+'…</div></div>';
  else if(c) inner=qrNote(c)+inner;
  return '<section class="panel result"><div class="panel-head"><div class="panel-title">'+esc(title)+'</div>'+(c&&!L?'<button class="panel-link" data-act="clear"><span class="hide-phone">Clear</span><span class="only-phone">‹ '+(S.page==="eng"?"Back to queue":"Scan another")+'</span></button>':'')+'</div><div class="panel-body"><div class="stack swap-in" data-key="res-'+key+'">'+inner+'</div></div></section>';
}
function emptyState(text){return '<div class="empty">'+ic("scan",1.7)+'<div>'+esc(text)+'</div></div>';}
function verdict(kind,word,text){return '<div class="verdict '+kind+'" data-key="v-'+esc(word)+'"><div class="w"><span class="dot '+kind+'"></span>'+esc(word)+'</div>'+(text?'<p>'+text+'</p>':'')+'</div>';}

function pageBody(){
  var t=cur();
  switch(S.page){
  case "register":
    var g=S.reg;
    var nextId="T-"+(Math.max.apply(null,Object.keys(S.trolleys).map(function(k){return +k.slice(2);}))+1);
    return '<div class="grid2"><section class="panel"><div class="panel-head"><div class="panel-title">1. Read the new tag</div><div class="panel-desc">Not yet linked to an asset</div></div><div class="panel-body"><div class="rows">'+
      (S.newTags.length?S.newTags.map(function(n,i){return '<button class="row" data-act="tag" data-i="'+i+'" aria-current="'+(g.barcode===n.barcode)+'"><span class="sq">'+ic("rfid")+'</span><span class="grow"><div class="id">'+esc(n.barcode)+'</div><div class="meta">QR '+esc(n.qr)+'</div><div class="meta">'+esc(n.rfid)+'</div></span><span class="tag '+(g.barcode===n.barcode?'':'warn')+'">'+(g.barcode===n.barcode?'Read':'Unregistered')+'</span></button>';}).join(""):'<div class="empty">No new tags left in this demo. Reset the demo from the Fleet page.</div>')+
      '</div></div></section>'+
      '<section class="panel"><div class="panel-head"><div class="panel-title">2. Asset details</div></div><div class="panel-body"><div class="stack">'+
      '<dl class="kv"><dt>Barcode</dt><dd class="mono">'+(g.barcode?esc(g.barcode):'<span style="color:var(--text-faint)">Not read</span>')+'</dd><dt>QR code</dt><dd class="mono">'+(g.qr?esc(g.qr):'<span style="color:var(--text-faint)">Not read</span>')+'</dd><dt>RFID</dt><dd class="mono">'+(g.rfid?esc(g.rfid):'<span style="color:var(--text-faint)">Not read</span>')+'</dd></dl>'+
      '<div class="note">'+ic("info").replace('<svg','<svg width="20" height="20"')+'<div>Saving writes the QR → RFID link to Bundle Nexus, so any later QR scan can look up this trolley’s RFID.</div></div>'+
      '<div class="field"><label for="rAsset">Asset number</label><input class="input mono" id="rAsset" value="'+esc(g.asset||nextId)+'"></div>'+
      '<div class="field"><label for="rDesc">Stock description</label><select class="input" id="rDesc">'+["Linen trolley, 3 shelf","Linen trolley, 2 shelf","Cage trolley, lidded"].map(function(o){return '<option'+(g.desc===o?' selected':'')+'>'+o+'</option>';}).join("")+'</select></div>'+
      '<div class="field"><label for="rPool">Pool customer</label><select class="input" id="rPool"><option>'+HOSPITAL+'</option><option'+(g.pool==="Eastgate Private Hospital"?' selected':'')+'>Eastgate Private Hospital</option></select></div>'+
      (g.err?'<div class="err">'+esc(g.err)+'</div>':'')+
      '<div class="btnrow"><button class="btn btn-primary" data-act="register">Save asset record</button></div></div></div></section></div>';

  case "hospital":
    var inner;
    if(!t) inner=emptyState("Scan the barcode on the trolley frame to see its status or report damage.");
    else if(t.state==="Retired") inner=verdict("off","Retired","This trolley is out of service. Send it back to SPL with the next pickup.")+details(t);
    else inner=verdict(CLS[t.state],t.state,t.state==="Available"?"No damage reported. If something’s wrong, report it below.":"Damage is already reported. You can add your report to the same Reason.")+details(t)+
      '<div class="btnrow"><button class="btn btn-danger" data-act="report">'+(t.reason?'Add to damage report':'Report damage')+'</button><button class="btn" data-act="clear">Done</button></div>';
    return gridOpen()+scanPanel()+resultPanel("Trolley",inner)+'</div>';

  case "soil":
    var si;
    if(!t) si=emptyState("Scan each trolley as it arrives at soil sort.");
    else if(t.state==="Faulty") si=verdict("fault","Faulty","Damage reported"+(t.reason&&!t.reason.redCard?" in the app. There’s no red card on this trolley.":".")+" Send it to engineering.")+details(t)+
      '<div class="btnrow"><button class="btn btn-primary" data-act="to-eng">Confirm transfer to engineering</button></div>';
    else if(t.state==="In repair") si=verdict("info","In repair","Already with engineering.")+details(t);
    else if(t.state==="Retired") si=verdict("off","Retired","Take it off the line and send it to engineering for disposal.")+details(t);
    else si=verdict("ok","No report","No damage reported. Check it over as the linen comes off.")+details(t)+
      '<div class="btnrow"><button class="btn btn-ok" data-act="clear">Looks fine, continue</button><button class="btn btn-danger-quiet" data-act="report">Damage found, record Reason</button></div>';
    return stats([["Faulty","fault","Reported, not yet in engineering"],["In repair","info","With engineering"]])+gridOpen()+scanPanel()+resultPanel("Intake check",si)+'</div>';

  case "eng":
    var unseen=S.alerts.filter(function(a){return !a.seen;});
    var jobs=Object.keys(S.trolleys).sort().map(T).filter(inQueue);
    var left='<section class="panel"><div class="panel-head"><div class="panel-title">Repair queue</div><div class="panel-desc">'+jobs.length+' trolley'+(jobs.length===1?'':'s')+'</div></div><div class="panel-body"><div class="rows">'+
      (jobs.length?jobs.map(function(x){return '<button class="row" data-act="scan" data-id="'+x.id+'" aria-current="'+(S.current.eng===x.id)+'"><span class="sq">'+ic("wrench")+'</span><span class="grow"><div class="id">'+esc(x.id)+'</div><div class="meta txt">'+esc(x.reason?x.reason.code:"No Reason recorded")+' · '+(x.loc&&x.loc.at==="laundry"?'<b class="here">In laundry</b>':'Still at hospital')+'</div>'+(x.flag?'<div class="flag" style="margin-top:4px">Flagged at '+esc(x.flag.by.split(",")[0])+'</div>':'')+'</span><span class="tag '+({"Faulty":"fault","In repair":"","Available":"ok","Retired":"off"}[x.state])+'">'+esc(x.state)+'</span></button>';}).join(""):'<div class="empty">'+ic("tick",1.7)+'<div>Nothing waiting. Every trolley is Available or retired.</div></div>')+
      '</div></div></section>';
    var retiredL=Object.keys(S.trolleys).sort().map(T).filter(function(x){return x.state==="Retired";});
    var retP=retiredL.length?'<section class="panel"><div class="panel-head"><div class="panel-title">Retired</div><div class="panel-desc">Can be checked and reused</div></div><div class="panel-body"><div class="rows">'+
      retiredL.map(function(x){return '<button class="row" data-act="scan" data-id="'+x.id+'" aria-current="'+(S.current.eng===x.id)+'"><span class="sq">'+ic("retry")+'</span><span class="grow"><div class="id">'+esc(x.id)+'</div><div class="meta txt">'+esc(x.retired?x.retired.why:"Retired")+'</div></span><span class="tag off">Retired</span></button>';}).join("")+'</div></div></section>':'';
    var alertsP='<section class="panel"><div class="panel-head"><div class="panel-title">Alerts</div>'+(unseen.length?'<button class="panel-link" data-act="ack">Mark all as seen</button>':'')+'</div><div class="panel-body">'+
      (S.alerts.length?'<div class="tablewrap"><table class="table"><thead><tr><th>Time</th><th>Trolley</th><th>Alert</th></tr></thead><tbody>'+S.alerts.slice(0,6).map(function(a){return '<tr><td class="mono">'+tm(a.time)+'</td><td class="mono">'+(a.seen?'':'<span class="dot fault" style="margin-right:8px"></span>')+esc(a.asset)+'</td><td>'+esc(a.msg)+'<div class="sub">'+esc(a.from)+'</div></td></tr>';}).join("")+'</tbody></table></div>':'<div class="empty">No alerts.</div>')+'</div></section>';
    var ei;
    if(!t) ei=emptyState("Pick a trolley from the queue, or scan one.");
    else{
      ei=verdict(CLS[t.state],t.state,{"Faulty":"Reported but not yet accepted into engineering.","In repair":"Accepted into engineering.","Available":"Nothing to repair.","Retired":"Removed from the fleet. It can be checked and reused."}[t.state])+details(t);
      if(bad(t)&&t.loc&&t.loc.at==="hospital") ei+='<div class="note warn">'+ic("rfid").replace('<svg','<svg width="20" height="20"')+'<div><b>Still at '+esc(t.pool)+'.</b> The inbound RFID portal will alert you when its EPC is read at the laundry.</div></div>';
      if(t.state==="Faulty") ei+='<div class="btnrow"><button class="btn btn-primary" data-act="accept">Accept into engineering</button></div>';
      if(t.state==="Retired"){
        if(t.retired) ei+='<div class="note">'+ic("info").replace('<svg','<svg width="20" height="20"')+'<div><b>Retired '+esc(dtm(t.retired.date))+'</b> by '+esc(t.retired.by)+': '+esc(t.retired.why)+'</div></div>';
        ei+='<div class="btnrow"><button class="btn btn-primary" data-act="reinstate">'+ic("retry")+'Reuse this trolley'+(isAdmin()?'':' '+ic("lock").replace('<svg','<svg width="16" height="16"'))+'</button></div>';
      }
      if(t.state==="In repair") ei+='<div class="btnrow"><button class="btn btn-ok" data-act="complete">Complete repair</button><button class="btn btn-danger-quiet" data-act="retire">Can’t be repaired, retire'+(isAdmin()?'':' '+ic("lock").replace('<svg','<svg width="16" height="16"'))+'</button></div>';
      if(t.repairs.length) ei+='<div class="tablewrap"><table class="table"><thead><tr><th>Repaired</th><th>Work done</th><th>Time</th></tr></thead><tbody>'+t.repairs.map(function(r){return '<tr><td class="mono">'+esc(dtm(r.date))+'</td><td>'+esc(r.work)+(r.parts?'<div class="sub">Parts: '+esc(r.parts)+'</div>':'')+'</td><td>'+esc(r.time)+'</td></tr>';}).join("")+'</tbody></table></div>';
    }
    var here=jobs.filter(function(x){return x.loc&&x.loc.at==="laundry";}).length;
    return '<div class="stats">'+tile("Faulty",count("Faulty"),"fault","Awaiting acceptance")+tile("In repair",count("In repair"),"info","On the bench")+tile("In laundry",here,"ok","Jobs physically here (RFID)")+tile("New alerts",unseen.length,"warn",S.alerts.length+" in total")+'</div>'+
      gridOpen()+'<div class="stack pick">'+left+alertsP+retP+'</div>'+resultPanel("Job",ei)+'</div>';

  case "packing":
    var pi;
    if(!t) pi=emptyState("Scan the trolley before you start packing.");
    else if(t.state==="Available") pi=verdict("ok","AVAILABLE","Go ahead and pack "+esc(t.id)+".")+details(t)+'<div class="btnrow"><button class="btn" data-act="clear">Next trolley</button><button class="btn btn-danger-quiet" data-act="report">Spotted damage? Report it</button></div>';
    else if(t.state==="Retired") pi=verdict("off","RETIRED","Do not pack. This trolley has been retired. Take it out of use and send it to engineering for disposal.")+details(t)+
       '<div class="btnrow"><button class="btn" data-act="clear">Next trolley</button></div>';
    else{
      var notified=t.flag&&t.flag.stage==="packing";
      pi=verdict("fault","UNDER REPAIR","Do not pack."+(t.reason?" Reason: "+esc(t.reason.code)+".":""))+details(t)+
       (notified?'<div class="note">'+ic("tick").replace('<svg','<svg width="20" height="20"')+'<div><b>Engineering notified at <span class="mono">'+tm(t.flag.time)+'</span>.</b> Move the trolley to the repair bay.</div></div>':
       '<div class="btnrow"><button class="btn btn-primary" data-act="notify">'+ic("bell")+'Notify engineering: found in production</button><button class="btn" data-act="clear">Next trolley</button></div>');
    }
    return gridOpen()+scanPanel()+resultPanel("Packing check",pi)+'</div>';

  case "production":
    /* production floor: check a trolley in use, report damage, flag one that shouldn't be in production */
    var pr;
    if(!t) pr=emptyState("Scan a trolley on the production floor to check it’s fit to use.");
    else if(t.state==="Available") pr=verdict("ok","OK TO USE",esc(t.id)+" is Available. No damage reported.")+details(t)+
      '<div class="btnrow"><button class="btn" data-act="clear">Next trolley</button><button class="btn btn-danger-quiet" data-act="report">Damage found, report it</button></div>';
    else if(t.state==="Retired") pr=verdict("off","RETIRED","This trolley has been retired. Take it out of use and send it to engineering for disposal.")+details(t)+
       '<div class="btnrow"><button class="btn" data-act="clear">Next trolley</button></div>';
    else{
      var flagged=t.flag&&t.flag.stage==="production";
      pr=verdict("fault","SHOULDN’T BE IN PRODUCTION","This trolley is "+esc(t.state)+(t.reason?" ("+esc(t.reason.code)+")":"")+". Take it out of use.")+details(t)+
       (flagged?'<div class="note">'+ic("tick").replace('<svg','<svg width="20" height="20"')+'<div><b>Flagged to engineering at <span class="mono">'+tm(t.flag.time)+'</span>.</b> Move the trolley to the repair bay.</div></div>':
       '<div class="btnrow"><button class="btn btn-primary" data-act="notify">'+ic("bell")+'Flag: found in production</button><button class="btn btn-danger-quiet" data-act="report">Add more damage</button><button class="btn" data-act="clear">Next trolley</button></div>');
    }
    return stats([["Faulty","fault","Should not be in use"],["In repair","info","Should be in engineering"]])+gridOpen()+scanPanel()+resultPanel("Production check",pr)+'</div>';

  case "dispatch":
    var d=S.dispatch, bl=d.result?d.result.blocked:[];
    var rows=d.run.map(function(id){var x=T(id),b=bl.indexOf(id)>-1;
      return '<tr><td class="mono">'+esc(id)+'</td><td>'+esc(x.desc)+'</td><td>'+(d.result?st(x.state):'<span style="color:var(--text-faint)">Not read</span>')+(b&&x.reason?'<div class="sub">Open Reason: '+esc(x.reason.code)+'</div>':'')+'</td><td>'+(b&&!d.done?(UI.swapOut===id?'<span class="tag warn">Pick a replacement below</span>':UI.swapOut?'':'<button class="btn btn-sm btn-blue" data-act="swap" data-id="'+id+'">Remove and notify engineering</button>'):'')+'</td></tr>';}).join("");
    var top='';
    if(d.done) top=verdict("ok","DISPATCHED",d.run.length+" trolleys sent to "+esc(HOSPITAL)+" at <span class='mono'>"+tm(d.at)+"</span>. The dispatch portal read each EPC, so every trolley now shows as at the hospital.")+'<div class="btnrow"><button class="btn btn-primary" data-act="new-run">Start next run</button></div>';
    else if(d.result&&!bl.length) top=verdict("ok","ALL CLEAR","Every trolley on this run is Available.")+'<div class="btnrow"><button class="btn btn-ok" data-act="dispatch"'+(S.online?'':' disabled')+'>'+ic("truck")+'Dispatch to '+esc(HOSPITAL)+'</button></div>';
    else if(d.result) top=verdict("fault","DISPATCH BLOCKED","Swap out the trolleys marked below, then read the run again.");
    var runP='<section class="panel"><div class="panel-head"><div class="panel-title">Run '+runNo()+' to '+esc(HOSPITAL)+'</div><div class="panel-desc">'+d.run.length+' trolleys at the portal</div></div><div class="panel-body"><div class="tablewrap"><table class="table"><thead><tr><th>Trolley</th><th>Description</th><th>State</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div></div>'+
      (d.done?'':'<div class="panel-foot" style="justify-content:flex-end;align-items:center">'+(S.online?'':'<span style="margin-right:auto">Offline: the portal can’t confirm states, so dispatch is held. (Offline rules still to be agreed.)</span>')+'<button class="btn btn-primary" data-act="verify"'+(S.online?'':' disabled')+'>'+ic("rfid")+(d.result?'Read the run again':'Read trolleys at portal')+'</button></div>')+'</section>';
    var pick='';
    if(UI.swapOut){
      var av=Object.keys(S.trolleys).sort().filter(function(id){return T(id).state==="Available"&&d.run.indexOf(id)<0&&T(id).loc&&T(id).loc.at==="laundry";});
      pick='<section class="panel"><div class="panel-head"><div class="panel-title">Pick a replacement for '+esc(UI.swapOut)+'</div><div class="panel-desc">Available, in the laundry, not on this run</div></div><div class="panel-body"><div class="rows">'+
       (av.length?av.map(function(id){return '<button class="row" data-act="replace" data-id="'+id+'"><span class="sq">'+ic("rfid")+'</span><span class="grow"><div class="id">'+esc(id)+'</div><div class="meta">'+esc(T(id).rfid)+'</div></span>'+st("Available")+'</button>';}).join(""):'<div class="empty">No spare Available trolleys in the laundry. Repair one in Engineering, or wait for one to arrive.</div>')+'</div></div></section>';
    }
    return (top?'<div class="stack">'+top+'</div>':'')+runP+pick;

  case "portals":
    var all=Object.keys(S.trolleys).sort().map(T), out=all.filter(function(x){return x.loc&&x.loc.at==="hospital";});
    var inL=all.filter(function(x){return x.loc&&x.loc.at==="laundry";}), badIn=inL.filter(bad).length;
    var lastIn=S.reads.filter(function(r){return r.portal==="Inbound dock";})[0], lastOut=S.reads.filter(function(r){return r.portal==="Dispatch portal";})[0];
    var sim='<section class="panel"><div class="panel-head"><div class="panel-title">Arriving at the laundry</div><div class="panel-desc">Trolleys last read at the hospital</div></div><div class="panel-body"><div class="rows">'+
      (out.length?out.map(function(x){return '<button class="row" data-act="portal-in" data-id="'+x.id+'"><span class="sq'+(bad(x)?' danger':'')+'">'+ic("truck")+'</span><span class="grow"><div class="id">'+esc(x.id)+'</div><div class="meta">EPC '+esc(x.rfid)+'</div></span>'+st(x.state)+'</button>';}).join(""):'<div class="empty">Every trolley is already in the laundry. Dispatch a run to send some out.</div>')+
      '</div></div><div class="panel-foot">'+ic("info")+'<span>Demo: tap a trolley to simulate the inbound portal reading its EPC as it comes through the dock door. Dispatch reads happen on the Dispatch page.</span></div></section>';
    var readers='<section class="panel"><div class="panel-head"><div class="panel-title">Readers</div></div><div class="panel-body"><div class="rows">'+
      [["Inbound dock portal","Laundry entrance, SPL Broadmeadows",lastIn],["Dispatch portal","Dispatch dock, SPL Broadmeadows",lastOut]].map(function(r){
        return '<div class="row static"><span class="sq">'+ic("rfid")+'</span><span class="grow"><div class="id sm">'+r[0]+'</div><div class="meta txt">'+r[1]+(r[2]?' · last read '+tm(r[2].time):'')+'</div></span><span class="st Available"><span class="dot ok live"></span>Online</span></div>';}).join("")+'</div></div></section>';
    var feed='<section class="panel"><div class="panel-head"><div class="panel-title">Live reads</div><div class="panel-desc">Newest first</div></div><div class="panel-body" style="padding:0">'+
      (S.reads.length?'<div class="tablewrap"><table class="table"><thead><tr><th>Trolley</th><th>When</th><th>Portal</th><th>Result</th></tr></thead><tbody>'+S.reads.slice(0,12).map(function(r){
        return '<tr><td class="mono">'+esc(r.id)+'<div class="sub">'+esc(r.epc)+'</div></td><td class="mono">'+esc(dtm(r.time))+'</td><td>'+esc(r.portal)+'</td><td style="min-width:200px"><span class="dot '+r.kind+'" style="margin-right:8px"></span>'+esc(r.result)+'</td></tr>';}).join("")+'</tbody></table></div>':'<div class="empty">No reads yet.</div>')+'</div></section>';
    return '<div class="stats">'+tile("In laundry",inL.length,"info","Last read by the inbound portal")+tile("Faulty in laundry",badIn,"fault","Ready for engineering")+tile("At hospital",out.length,"ok","Last read leaving on a run")+'</div>'+
      '<div class="grid2"><div class="stack">'+sim+readers+'</div>'+feed+'</div>';

  case "fleet":
    var ids=Object.keys(S.trolleys).sort();
    return stats([["Available","ok","Can be packed and dispatched"],["Faulty","fault","Reported damage"],["In repair","info","In engineering"],["Retired","off","Removed from fleet"]],S.queue.length?[S.queue.length,"warn","Queued offline","Not yet synced"]:null)+
     '<section class="panel"><div class="panel-head"><div class="panel-title">All trolleys</div><div class="panel-desc">Shared pool assets, '+ids.length+' in total</div></div><div class="panel-body" style="padding:0"><div class="tablewrap"><table class="table"><thead><tr><th>Asset</th><th>State</th><th>Location</th><th>Open Reason</th><th>Description</th><th>Barcode</th></tr></thead><tbody>'+
     ids.map(function(id){var x=T(id);return '<tr><td class="mono">'+esc(id)+'</td><td>'+st(x.state)+(x.flag?'<div class="flag" style="margin-top:6px">Flagged for repair</div>':'')+'</td><td>'+esc(locShort(x))+(x.loc?'<div class="sub">'+esc(x.loc.by)+', '+esc(dtm(x.loc.time))+'</div>':'')+'</td><td>'+(x.reason?esc(x.reason.code)+(x.reason.count>1?'<div class="sub">'+x.reason.count+' reports</div>':''):'<span style="color:var(--text-faint)">None</span>')+'</td><td>'+esc(x.desc)+'</td><td class="mono">'+esc(x.barcode)+'</td></tr>';}).join("")+
     '</tbody></table></div></div></section>';

  case "log":
    return '<section class="panel"><div class="panel-head"><div class="panel-title">Recent changes</div><div class="panel-desc">Newest first</div></div><div class="panel-body" style="padding:0"><div class="tablewrap"><table class="table"><thead><tr><th>When</th><th>Trolley</th><th>Change</th><th>Who and where</th><th>Read</th></tr></thead><tbody>'+
     S.log.map(function(l){var ch=l.from===l.to?'<span style="color:var(--text-muted)">No state change</span>':(CLS[l.from]?st(l.from):esc(l.from))+' <span style="color:var(--text-muted)">to</span> '+(CLS[l.to]?st(l.to):esc(l.to));
       return '<tr><td class="mono">'+esc(dtm(l.time))+'</td><td class="mono">'+esc(l.asset)+'</td><td>'+ch+(l.note?'<div class="sub">'+esc(l.note)+'</div>':'')+'</td><td>'+esc(l.who)+'<div class="sub">'+esc(l.where)+'</div></td><td>'+esc(l.read)+'</td></tr>';}).join("")+
     '</tbody></table></div></div></section>';
  }
  return "";
}
function stats(list,extra){
  var h='<div class="stats">'+list.map(function(s){return '<div class="stat '+(s[1]==="info"?"":s[1])+'"><div class="overline">'+esc(s[0])+'</div><div class="stat-value"><span class="dot '+s[1]+'"></span>'+count(s[0])+'</div><div class="stat-sub">'+esc(s[2])+'</div></div>';}).join("");
  if(extra) h+='<div class="stat '+extra[1]+'"><div class="overline">'+esc(extra[2])+'</div><div class="stat-value"><span class="dot '+extra[1]+'"></span>'+extra[0]+'</div><div class="stat-sub">'+esc(extra[3])+'</div></div>';
  return h+'</div>';
}

/* ================= overlays ================= */
function renderOverlay(){
  var h='';
  var d=UI.dialog, f=UI.form;
  if(d==="report"||d==="pick-report"){
    var t=T(UI.reportFor);
    if(d==="pick-report"){
      h+='<div class="backdrop" data-act="close" data-exit data-key="dlg-'+d+'"><div class="dialog" role="dialog" aria-modal="true" aria-label="Report damage"><div class="dialog-head">Report damage on any trolley<button class="round" data-act="close" aria-label="Close">'+ic("x")+'</button></div><div class="dialog-body">'+
        '<p style="margin:0">Anyone can report damage at any stage. Scan the trolley first.</p><div class="rows">'+Object.keys(S.trolleys).sort().filter(function(id){return T(id).state!=="Retired";}).map(function(id){return '<button class="row" data-act="pick-report" data-id="'+id+'"><span class="sq">'+ic("scan")+'</span><span class="grow"><div class="id">'+esc(id)+'</div><div class="meta">'+esc(T(id).barcode)+'</div></span></button>';}).join("")+'</div></div></div></div>';
    } else {
      h+='<div class="backdrop" data-act="close" data-exit data-key="dlg-'+d+'"><div class="dialog" role="dialog" aria-modal="true" aria-label="Report damage"><div class="dialog-head">Report damage on <span class="mono">'+esc(t.id)+'</span><button class="round" data-act="close" aria-label="Close">'+ic("x")+'</button></div><div class="dialog-body">'+
       (t.reason?'<div class="note warn">'+ic("info").replace('<svg','<svg width="20" height="20"')+'<div>This trolley already has an open Reason (<b>'+esc(t.reason.code)+'</b>). Your report will be added to it.</div></div>':'')+
       '<div class="field"><span class="lab">Reason</span><div class="chips">'+REASONS.map(function(r){return '<button class="chip" data-act="reason" data-r="'+esc(r)+'" aria-pressed="'+(f.code===r)+'">'+esc(r)+'</button>';}).join("")+'</div></div>'+
       '<div class="field"><label for="fNotes">Notes (optional)</label><textarea class="input" id="fNotes" placeholder="Where is the damage? What happened?">'+esc(f.notes||"")+'</textarea></div>'+
       '<div class="field"><span class="lab">Photo (optional)</span><div class="photo">'+(f.photo?'<span class="thumb" role="img" aria-label="Photo added"></span><button class="btn btn-sm" data-act="photo">Remove photo</button>':'<button class="btn btn-sm" data-act="photo">'+ic("camera")+'Take photo</button>')+'</div></div>'+
       (S.page==="hospital"?'<label class="check"><input type="checkbox" id="fRed"'+(f.redCard?' checked':'')+'> I attached a red card (optional)</label>':'')+
       (S.online?'':'<div class="note warn">'+ic("warn").replace('<svg','<svg width="20" height="20"')+'<div><b>You’re offline.</b> The report will be kept on this device and sent when the connection is back.</div></div>')+
       (f.err?'<div class="err">'+esc(f.err)+'</div>':'')+
       '</div><div class="dialog-foot"><button class="btn" data-act="close">Cancel</button><button class="btn btn-danger" data-act="submit-report">'+(S.online?'Submit report':'Save report on device')+'</button></div></div></div>';
    }
  }
  if(d==="complete"){
    var tc=cur();
    h+='<div class="backdrop" data-act="close" data-exit data-key="dlg-'+d+'"><div class="dialog" role="dialog" aria-modal="true" aria-label="Complete repair"><div class="dialog-head">Complete repair on <span class="mono">'+esc(tc.id)+'</span><button class="round" data-act="close" aria-label="Close">'+ic("x")+'</button></div><div class="dialog-body">'+
     '<div class="field"><label for="fWork">Work done</label><textarea class="input" id="fWork" placeholder="Replaced front left castor">'+esc(f.work||"")+'</textarea></div>'+
     '<div class="field"><label for="fTime">Time taken</label><select class="input" id="fTime">'+["15 min","30 min","45 min","1 h","1.5 h","2 h or more"].map(function(o){return '<option'+(f.time===o?' selected':'')+'>'+o+'</option>';}).join("")+'</select></div>'+
     '<div class="field"><label for="fParts">Parts used (if any)</label><input class="input" id="fParts" placeholder="1 × 125 mm swivel castor" value="'+esc(f.parts||"")+'"></div>'+
     '<div class="field"><span class="lab">Confirm identity</span><div class="btnrow">'+[tc.id,"T-1121"].filter(function(x,i,a){return a.indexOf(x)===i;}).map(function(id){return '<button class="chip" data-act="confirm-scan" data-id="'+id+'" aria-pressed="'+(f.confirmed===id)+'">'+ic("scan").replace('<svg','<svg width="18" height="18" style="vertical-align:-4px;margin-right:6px"')+'Scan '+esc(id)+'</button>';}).join("")+'</div><span style="font-size:14px;color:var(--text-muted)">Scan the trolley on the bench. Try the wrong one to see the check.</span></div>'+
     (f.err?'<div class="err">'+esc(f.err)+'</div>':'')+
     '</div><div class="dialog-foot"><button class="btn" data-act="close">Cancel</button><button class="btn btn-ok" data-act="finish-repair">Mark Available</button></div></div></div>';
  }
  if(d==="reinstate"){
    var tz=cur(), to=f.to||"Available";
    h+='<div class="backdrop" data-act="close" data-exit data-key="dlg-'+d+'"><div class="dialog" role="dialog" aria-modal="true" aria-label="Reuse trolley"><div class="dialog-head">Reuse <span class="mono">'+esc(tz.id)+'</span><button class="round" data-act="close" aria-label="Close">'+ic("x")+'</button></div><div class="dialog-body">'+
     '<p style="margin:0">Bring this retired trolley back into the fleet. It keeps the same QR code and EPC, so its history carries over.</p>'+
     '<div class="field"><span class="lab">Condition</span><div class="chips">'+
      [["Available","Ready to use now"],["In repair","Repair it first"]].map(function(o){return '<button class="chip" data-act="reinstate-to" data-to="'+o[0]+'" aria-pressed="'+(to===o[0])+'">'+o[1]+'</button>';}).join("")+'</div></div>'+
     '<div class="field"><label for="fReuse">'+(to==="Available"?"What was checked or fixed?":"What needs doing before it’s used?")+'</label><textarea class="input" id="fReuse" placeholder="'+(to==="Available"?"Weld repaired and load tested":"Replace base frame section")+'">'+esc(f.reuse||"")+'</textarea></div>'+
     (f.err?'<div class="err">'+esc(f.err)+'</div>':'')+
     '</div><div class="dialog-foot"><button class="btn" data-act="close">Cancel</button><button class="btn btn-primary" data-act="reinstate-confirm">'+(to==="Available"?"Return to service":"Send to repair queue")+'</button></div></div></div>';
  }
  if(d==="retire"){
    var tr=cur();
    h+='<div class="backdrop" data-act="close" data-exit data-key="dlg-'+d+'"><div class="dialog" role="dialog" aria-modal="true" aria-label="Retire trolley"><div class="dialog-head">Retire <span class="mono">'+esc(tr.id)+'</span><button class="round" data-act="close" aria-label="Close">'+ic("x")+'</button></div><div class="dialog-body">'+
     '<p style="margin:0">The trolley will be removed from the fleet and can’t be dispatched again. Who holds this authority is still to be confirmed; in this prototype it needs Admin.</p>'+
     '<div class="field"><label for="fWhy">Why can’t it be repaired?</label><textarea class="input" id="fWhy">'+esc(f.why||"")+'</textarea></div>'+(f.err?'<div class="err">'+esc(f.err)+'</div>':'')+
     '</div><div class="dialog-foot"><button class="btn" data-act="close">Cancel</button><button class="btn btn-danger" data-act="retire-confirm">Retire trolley</button></div></div></div>';
  }
  if(d==="pin"){
    var dots='';for(var i=0;i<4;i++)dots+='<div class="pin-dot'+(i<UI.pin.length?' filled':'')+'"></div>';
    var keys=["1","2","3","4","5","6","7","8","9","Clear","0","Del"];
    h+='<div class="backdrop" data-act="close" data-exit data-key="dlg-'+d+'"><div class="pin-card" role="dialog" aria-modal="true" aria-label="Admin PIN"><div class="pin-top"><div class="badge">'+ic("lock")+'</div><div><div class="pin-title">Enter admin PIN</div><div class="pin-sub">Demo PIN is 1234</div></div><button class="round" data-act="close" aria-label="Close">'+ic("x")+'</button></div>'+
     '<div class="pin-dots">'+dots+'</div><div class="pin-keys">'+keys.map(function(k){return '<button class="pin-key'+(k.length>1?' sm':'')+'" data-act="key" data-k="'+k+'">'+k+'</button>';}).join("")+'</div>'+
     (UI.pinErr?'<div class="pin-error">'+esc(UI.pinErr)+'</div>':'')+'</div></div>';
  }
  if(d==="account"&&U()){
    var au=U();
    h+='<div class="backdrop" data-act="close" data-exit data-key="dlg-account"><div class="dialog sheet" role="dialog" aria-modal="true" aria-label="Account"><div class="dialog-head">Account<button class="round" data-act="close" aria-label="Close">'+ic("x")+'</button></div><div class="dialog-body">'+
     '<div class="acct"><div class="avatar lg">'+esc(initials(au))+'</div><div><div class="nm">'+esc(au.user)+'</div><div class="rl">'+esc(au.role)+'</div><div class="rl">'+esc(au.place)+'</div></div></div>'+
     '<div class="rows">'+
      '<button class="row" data-act="net"><span class="sq">'+ic(S.online?"rfid":"warn")+'</span><span class="grow"><div class="id sm">'+(S.online?"Online":"Offline")+'</div><div class="meta">Demo: tap to '+(S.online?"simulate losing the connection":"reconnect")+'</div></span></button>'+
      '<button class="row" data-act="theme"><span class="sq">'+ic(theme()==="dark"?"sun":"moon")+'</span><span class="grow"><div class="id sm">'+(theme()==="dark"?"Light mode":"Dark mode")+'</div></span></button>'+
      (PREVIEW&&!narrow()?'<button class="row" data-act="phone"><span class="sq">'+ic("phone")+'</span><span class="grow"><div class="id sm">Back to desktop view</div></span></button>':'')+
      '<button class="row" data-act="reset"><span class="sq">'+ic("retry")+'</span><span class="grow"><div class="id sm">Reset demo data</div></span></button>'+
      '<button class="row" data-act="logout"><span class="sq danger">'+ic("logout")+'</span><span class="grow"><div class="id sm">Sign out</div></span></button>'+
     '</div><div class="ver">Prototype v0.4 · Bundle Nexus API (simulated)</div></div></div></div>';
  }
  if(d==="more"&&U()){
    h+='<div class="backdrop" data-act="close" data-exit data-key="dlg-more"><div class="dialog sheet" role="dialog" aria-modal="true" aria-label="All pages"><div class="dialog-head">All pages<button class="round" data-act="close" aria-label="Close">'+ic("x")+'</button></div><div class="dialog-body"><div class="rows">'+
     PAGES.filter(function(pg){return allowed(pg.id);}).map(function(pg){var b=badge(pg);return '<button class="row" data-act="go" data-p="'+pg.id+'" aria-current="'+(pg.id===S.page)+'"><span class="sq">'+ic(pg.icon)+'</span><span class="grow"><div class="id sm">'+esc(pg.name)+'</div></span>'+(b!==""?'<span class="tag">'+b+'</span>':'')+'</button>';}).join("")+
     '</div></div></div></div>';
  }
  if(UI.toast) h+='<div class="toast '+UI.toast.kind+'" role="status" data-exit data-key="toast-'+UI.toast.id+'">'+ic(UI.toast.kind==="ok"?"tick":(UI.toast.kind==="fault"||UI.toast.kind==="warn"?"warn":"info")).replace('<svg','<svg width="22" height="22" style="color:var(--'+(UI.toast.kind==="ok"?"ok":UI.toast.kind==="fault"?"fault":UI.toast.kind==="warn"?"warn":"spl-blue")+')"')+'<span>'+esc(UI.toast.text)+'</span></div>';
  patch(overlay,h);
}

/* ================= actions ================= */
function readForm(){
  var g=function(id){return document.getElementById(id);};
  if(g("fNotes"))UI.form.notes=g("fNotes").value;
  if(g("fRed"))UI.form.redCard=g("fRed").checked;
  if(g("fWork"))UI.form.work=g("fWork").value;
  if(g("fTime"))UI.form.time=g("fTime").value;
  if(g("fParts"))UI.form.parts=g("fParts").value;
  if(g("fWhy"))UI.form.why=g("fWhy").value;
  if(g("fReuse"))UI.form.reuse=g("fReuse").value;
  if(g("rAsset"))S.reg.asset=g("rAsset").value.trim();
  if(g("rDesc"))S.reg.desc=g("rDesc").value;
  if(g("rPool"))S.reg.pool=g("rPool").value;
}
/* the dispatch portal reads every EPC on the run; anything not Available blocks it */
function readRun(){
  var d=S.dispatch, n=runNo(); d.result={blocked:d.run.filter(function(id){return T(id).state!=="Available";})}; d.at=new Date().toISOString(); UI.swapOut=null;
  d.run.slice().reverse().forEach(function(id){var x=T(id),ok=x.state==="Available";S.reads.unshift({time:d.at,portal:"Dispatch portal",epc:x.rfid,id:id,state:x.state,result:ok?"Read on run "+n+". Available.":"Read on run "+n+". "+x.state+", run blocked.",kind:ok?"ok":"fault"});});
  log("Run "+n,"Check",d.result.blocked.length?"Blocked":"Clear","RFID portal",d.result.blocked.length?"Blocked by "+d.result.blocked.join(", "):"All "+d.run.length+" trolleys Available");
}
/* Admins go straight through; anyone else needs an admin to enter the PIN (approval). */
function needAdmin(next){if(isAdmin()){next();return;}UI.dialog="pin";UI.pin="";UI.pinErr=null;UI.pinNext=next;}
function signIn(u){S.user=u.id;S.page=u.pages[0];S.current={};S.qrRead={};toast("ok","Signed in as "+u.user+", "+u.role+".");}

var PUBLIC=["login","key","close","theme","net","reset","phone"];   /* actions allowed while signed out */
function act(a,el){
  readForm();
  if(!U()&&PUBLIC.indexOf(a)<0) return render();
  if(UI.cam&&["go","logout","phone","scan","report-any","account","more","reset"].indexOf(a)>-1) stopCam();
  var t=cur();
  switch(a){
  case "login":
    var lu=USERS.filter(function(x){return x.id===el.dataset.u;})[0];
    if(lu.admin){UI.dialog="pin";UI.pin="";UI.pinErr=null;UI.pinNext=function(){signIn(lu);};} else signIn(lu);
    break;
  case "account": UI.dialog="account"; break;
  case "more": UI.dialog="more"; break;
  case "phone": PREVIEW=!PREVIEW; try{localStorage.setItem("spl-trolley-phone",PREVIEW?"1":"0");}catch(e){} UI.dialog=null; break;
  case "logout": UI.dialog=null; S.user=null; S.page=null; S.current={}; S.qrRead={}; UI.lookup=null; UI.swapOut=null; S.reg={}; toast("info","Signed out."); break;
  case "menu": S.sidebar=!S.sidebar; break;
  case "go": if(!allowed(el.dataset.p))break; UI.dialog=null; S.page=el.dataset.p; UI.swapOut=null; if(window.innerWidth<=900)S.sidebar=false; break;
  case "net":
    S.online=!S.online;
    if(!S.online){S.offlineSince=new Date().toISOString();toast("warn","Network offline. Reports will be kept on the device.");}
    else{var n=S.queue.length;while(S.queue.length)applyReport(S.queue.shift());S.offlineSince=null;toast("ok",n?"Back online. "+n+" queued report"+(n>1?"s":"")+" synced.":"Back online.");}
    break;
  case "key":
    var k=el.dataset.k;
    if(k==="Clear")UI.pin=""; else if(k==="Del")UI.pin=UI.pin.slice(0,-1); else if(UI.pin.length<4)UI.pin+=k;
    UI.pinErr=null;
    if(UI.pin.length===4){ if(UI.pin===PIN){UI.dialog=null;var nx=UI.pinNext;UI.pinNext=null;UI.pin="";nx&&nx();} else {UI.pinErr="That PIN isn’t right. Try again.";UI.pin="";} }
    break;
  case "close": UI.dialog=null; UI.form={}; UI.pinNext=null; break;
  case "cam-start": startCam(); return;
  case "cam-stop": stopCam(); break;
  case "cam-play": if(CAM.video) playVideo(CAM.video); return;
  case "portal-in":
    var wasBad=portalRead(el.dataset.id,"inbound");
    toast(wasBad?"warn":"ok",el.dataset.id+" read at the inbound portal."+(wasBad?" It’s faulty, so engineering has been alerted.":""));
    break;
  case "scan":
    if(UI.lookup&&UI.lookup.page===S.page) break;
    if(S.page!=="eng"){ lookupTrolley(el.dataset.id,"Phone scan"); break; }
    S.current[S.page]=el.dataset.id; S.qrRead[S.page]=null; S.lastRead="Picked from repair queue"; break;
  case "clear": S.current[S.page]=null; S.qrRead[S.page]=null; break;
  case "report": UI.reportFor=t.id; UI.form={}; UI.dialog="report"; break;
  case "report-any": UI.form={}; UI.dialog="pick-report"; break;
  case "pick-report": UI.reportFor=el.dataset.id; S.lastRead="Phone scan via Bundle Nexus"; UI.dialog="report"; break;
  case "reason": UI.form.code=el.dataset.r; UI.form.err=null; break;
  case "photo": UI.form.photo=!UI.form.photo; break;
  case "submit-report":
    if(!UI.form.code){UI.form.err="Choose a Reason first.";break;}
    var a2=actor(), rep={asset:UI.reportFor,code:UI.form.code,notes:(UI.form.notes||"").trim(),photo:!!UI.form.photo,redCard:!!UI.form.redCard,who:a2.user,where:a2.place,time:new Date().toISOString(),read:S.lastRead||"Phone scan via Bundle Nexus"};
    if(S.online){applyReport(rep);toast("ok","Report sent. "+rep.asset+" is Faulty and engineering has been notified.");}
    else{S.queue.push(rep);toast("warn","Saved on this device. It will sync when you’re back online.");}
    UI.dialog=null; UI.form={}; break;
  case "to-eng": setState(t.id,"In repair",S.lastRead,"Transferred to engineering at soil sort"); toast("ok",t.id+" is In repair."); break;
  case "accept": setState(t.id,"In repair","Barcode","Accepted into engineering"); toast("ok",t.id+" accepted into engineering."); break;
  case "complete": UI.form={}; UI.dialog="complete"; break;
  case "confirm-scan":
    UI.form.confirmed=el.dataset.id;
    UI.form.err=el.dataset.id!==t.id?"That’s "+el.dataset.id+". Scan "+t.id+" to confirm you repaired the right trolley.":null; break;
  case "finish-repair":
    if(!(UI.form.work||"").trim()){UI.form.err="Record the work done first.";break;}
    if(UI.form.confirmed!==t.id){UI.form.err="Scan "+t.id+" to confirm its identity.";break;}
    t.repairs.unshift({work:UI.form.work.trim(),time:UI.form.time||"15 min",parts:(UI.form.parts||"").trim(),date:new Date().toISOString()});
    t.reason=null; t.flag=null;
    setState(t.id,"Available","Barcode","Repair completed: "+UI.form.work.trim()+(UI.form.parts?" (parts: "+UI.form.parts.trim()+")":"")+", "+(UI.form.time||"15 min"));
    S.alerts.forEach(function(x){if(x.asset===t.id)x.seen=true;});
    UI.dialog=null; UI.form={}; toast("ok",t.id+" repaired and back in laundry stock."); break;
  case "retire": needAdmin(function(){UI.form={};UI.dialog="retire";}); break;
  case "reinstate": needAdmin(function(){UI.form={to:"Available"};UI.dialog="reinstate";}); break;
  case "reinstate-to": UI.form.to=el.dataset.to; UI.form.err=null; break;
  case "reinstate-confirm":
    var rn=(UI.form.reuse||"").trim(), to2=UI.form.to||"Available", a5=actor(), now5=new Date().toISOString();
    if(!rn){UI.form.err=to2==="Available"?"Say what was checked or fixed.":"Say what needs doing first.";break;}
    t.reuses=t.reuses||[]; t.reuses.unshift({date:now5,notes:rn,by:a5.user,to:to2});
    t.retired=null; t.flag=null; t.reason=null;   /* reused: the old Reason is closed */
    if(to2==="In repair") t.reason={code:"Refurbish before reuse",notes:rn,photo:false,reporter:a5.user,where:a5.place,date:now5,redCard:false,count:1};
    setState(t.id,to2,"Phone scan via Bundle Nexus","Reused after retirement ("+(to2==="Available"?"ready to use":"repair first")+"): "+rn);
    UI.dialog=null; UI.form={};
    toast("ok",t.id+(to2==="Available"?" is back in service and Available.":" is back in the repair queue.")); break;
  case "retire-confirm":
    if(!(UI.form.why||"").trim()){UI.form.err="Say why it can’t be repaired.";break;}
    /* the open Reason is closed on retirement; keep its code with the retirement record */
    t.retired={why:UI.form.why.trim(),date:new Date().toISOString(),by:actor().user,reason:t.reason?t.reason.code:null};
    t.reason=null; t.flag=null; setState(t.id,"Retired","Barcode","Retired: "+UI.form.why.trim()); S.alerts.forEach(function(x){if(x.asset===t.id)x.seen=true;});
    UI.dialog=null; UI.form={}; toast("info",t.id+" retired and removed from the fleet."); break;
  case "ack": S.alerts.forEach(function(x){x.seen=true;}); break;
  case "notify":
    /* used by packing and production; the flag remembers which stage raised it */
    if(t.state==="Retired"||t.state==="Available") break;
    var a3=actor(), area=S.page==="production"?"on the production floor":"in the packing area";
    t.flag={by:a3.user+", "+a3.place.split(",")[0],where:a3.place,stage:S.page,time:new Date().toISOString(),msg:"Found "+area+" while "+t.state+". Set aside for repair."};
    alertEng(t.id,"Found "+area+", not repaired"); log(t.id,t.state,t.state,S.lastRead,"Engineering notified: found "+area+" while "+t.state);
    toast("ok","Engineering notified about "+t.id+"."); break;
  case "verify": if(S.online) readRun(); break;
  case "swap":
    if(UI.swapOut) break;   /* one at a time: finish picking a replacement first */
    var id=el.dataset.id, x=T(id), a4=actor(), rn1=runNo();
    x.flag={by:a4.user+", "+a4.place.split(",")[0],where:a4.place,stage:"dispatch",time:new Date().toISOString(),msg:"Pulled from dispatch run "+rn1+" while "+x.state+"."};
    alertEng(id,"Pulled from dispatch, not repaired"); log(id,x.state,x.state,"RFID portal","Removed from run "+rn1+"; engineering notified");
    UI.swapOut=id; toast("ok","Engineering notified. Pick a replacement for "+id+"."); break;
  case "replace":
    var dd=S.dispatch,i=dd.run.indexOf(UI.swapOut); if(i>-1)dd.run[i]=el.dataset.id;
    log(el.dataset.id,"Available","Available","RFID","Added to run "+runNo()+" in place of "+UI.swapOut);
    UI.swapOut=null; dd.result=null; toast("info","Replacement added. Read the run again."); break;
  case "dispatch":
    /* the portal read may be out of date: check again before anything leaves */
    if(!S.online){toast("warn","Offline. Dispatch is held until the connection is back.");break;}
    if(S.dispatch.done||!S.dispatch.result) break;
    var nowBad=S.dispatch.run.filter(function(id){return T(id).state!=="Available";});
    if(nowBad.length){readRun();toast("fault","Dispatch blocked: "+nowBad.join(", ")+" changed since the run was read.");break;}
    var rn2=runNo(); S.dispatch.done=true; S.dispatch.at=new Date().toISOString();
    S.dispatch.run.forEach(function(id){var x=T(id);x.loc={at:"hospital",time:S.dispatch.at,by:"Dispatch portal, run "+rn2};
      S.reads.unshift({time:S.dispatch.at,portal:"Dispatch portal",epc:x.rfid,id:id,state:x.state,result:"Dispatched to "+HOSPITAL+" (run "+rn2+")",kind:"ok"});
      S.log.unshift({time:S.dispatch.at,asset:id,from:x.state,to:x.state,who:"RFID portal",where:"Dispatch dock, SPL Broadmeadows",read:"RFID, EPC "+x.rfid,note:"Dispatched to "+HOSPITAL+" on run "+rn2});}); log("Run "+rn2,"Clear","Dispatched","RFID portal",S.dispatch.run.join(", ")+" to "+HOSPITAL); toast("ok","Run "+rn2+" dispatched."); break;
  case "new-run": S.dispatch={no:runNo()+1,run:Object.keys(S.trolleys).sort().filter(function(k){return T(k).state!=="Retired"&&T(k).loc&&T(k).loc.at==="laundry";}).slice(0,4),result:null,done:false,at:null}; UI.swapOut=null; break;
  case "tag": var tg=S.newTags[+el.dataset.i]; S.reg.barcode=tg.barcode; S.reg.qr=tg.qr; S.reg.rfid=tg.rfid; S.reg.i=+el.dataset.i; S.reg.err=null; break;
  case "register":
    var g=S.reg;
    if(!g.barcode){g.err="Read the new tag first, so the barcode and RFID chip are linked to the same asset.";break;}
    if(!/^T-\d{3,5}$/.test(g.asset||"")){g.err="Asset number should look like T-1170.";break;}
    if(S.trolleys[g.asset]){g.err=g.asset+" already exists.";break;}
    S.trolleys[g.asset]={id:g.asset,barcode:g.barcode,qr:g.qr,rfid:g.rfid,loc:{at:"laundry",time:new Date().toISOString(),by:"Registered at the asset office"},desc:g.desc||"Linen trolley, 3 shelf",pool:g.pool||HOSPITAL,state:"Unregistered",reason:null,flag:null,repairs:[]};
    S.newTags.splice(g.i,1); setState(g.asset,"Available","RFID","Registered; barcode "+g.barcode+", QR "+g.qr+" and RFID linked in Bundle Nexus");
    toast("ok",g.asset+" registered and Available."); S.reg={}; break;
  case "theme": setTheme(theme()==="dark"?"light":"dark"); toast("info",(theme()==="dark"?"Dark":"Light")+" mode on."); break;
  case "reset": var keep=S.user, kp=S.page; S=seed(); S.user=keep; S.page=kp; UI={dialog:null,toast:null,pin:"",pinErr:null,pinNext:null,form:{},lookup:null}; toast("info","Demo reset."); break;
  }
  render();
}
document.addEventListener("click",function(e){
  var el=e.target.closest("[data-act]"); if(!el) return;
  if(el.classList.contains("backdrop")&&e.target!==el) return;
  act(el.dataset.act,el);
});
document.addEventListener("keydown",function(e){
  if(e.key==="Escape"&&UI.dialog){act("close");}
  if(UI.dialog==="pin"&&/^[0-9]$/.test(e.key)){act("key",{dataset:{k:e.key}});}
});
/* stop the camera when the app goes to the background - but not while it is starting:
   on some phones the "Allow camera?" prompt itself hides the page */
document.addEventListener("visibilitychange",function(){if(document.hidden&&UI.cam&&UI.cam.status==="live"){stopCam();refresh();}});
setInterval(function(){var c=document.getElementById("clock");if(c)c.textContent=tm(Date.now());},1000);
function theme(){var t=document.documentElement.dataset.theme;if(t)return t;return window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}
function setTheme(t){document.documentElement.dataset.theme=t;try{localStorage.setItem("spl-trolley-theme",t);}catch(e){}}
try{var savedTheme=localStorage.getItem("spl-trolley-theme");if(savedTheme)document.documentElement.dataset.theme=savedTheme;}catch(e){}
if(window.matchMedia){try{matchMedia("(prefers-color-scheme: dark)").addEventListener("change",refresh);}catch(e){}}
if(window.innerWidth<=900)S.sidebar=false;
if(NARROW){try{NARROW.addEventListener("change",refresh);}catch(e){NARROW.addListener(refresh);}}
render();
})();
