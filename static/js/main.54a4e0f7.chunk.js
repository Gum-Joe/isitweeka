(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{29:function(e){e.exports=JSON.parse('{"a":"1.0.0-beta.5"}')},40:function(e,t,n){},42:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var s=n(0),a=n(2),r=n.n(a),i=n(8),c=n.n(i),o=(n(40),n(6)),l=n.n(o),u=n(12),d=n(10),h=n(11),b=n(15),j=n(14),p="ga-disable-G-X4VMSWGN74";function O(e){document.cookie=p+"=".concat(e?"true":"false","; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/"),window[p]=e}n(42);var m=n(26),v=n.n(m);function f(e){return function(){window.scrollTo({top:window.innerHeight+e,behavior:"smooth"})}}function x(){window.scrollTo({top:0,behavior:"smooth"})}var k=n(9),g=function(e){return"fill"===(null===e||void 0===e?void 0:e.buttonType)?Object(s.jsx)("button",Object(k.a)(Object(k.a)({},e),{},{className:"filled-button","data-light":e.light,children:Object(s.jsx)("span",{children:e.children})})):Object(s.jsx)("button",Object(k.a)(Object(k.a)({},e),{},{className:"forward","data-light":e.light,children:Object(s.jsx)("span",{children:e.children})}))};g.displayName="Button.Forward";var w=g,y={backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center",display:"flex",flex:1,margin:"auto",width:"90%",maxHeight:"80%"};function C(){console.log("Reporting button click..."),gtag("event","outbound_events_button_click",{event_category:"ecommerce",value:"true",label:"outbound_events_button_click"})}var T,N,D=function(e){Object(b.a)(n,e);var t=Object(j.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var e;switch(this.props.event.eventType){case T.CHARITY:return Object(s.jsxs)("div",{className:"events-row",style:{backgroundColor:this.props.event.backgroundColor},children:[Object(s.jsx)("div",{children:Object(s.jsx)("div",{style:Object(k.a)({backgroundImage:"url(".concat(this.props.event.headerURL,")")},y)})}),Object(s.jsxs)("div",{children:[Object(s.jsx)("h3",{children:this.props.event.title}),"undefined"!==typeof this.props.event.when?Object(s.jsxs)("h4",{className:"no-margin",children:["When? ",this.props.event.when]}):null,"undefined"!==typeof this.props.event.description?Object(s.jsx)("h4",{className:"no-margin",children:this.props.event.description}):null,this.props.event.ticketsSale&&this.props.event.url&&new Date(this.props.event.ticketsSale.start).valueOf()<Date.now()?Object(s.jsx)("a",{href:this.props.event.url,children:Object(s.jsx)(w,{onClick:C,style:Object(k.a)({},this.props.event.cta),children:"Buy Tickets"})}):null,this.props.event.ticketsSale&&new Date(this.props.event.ticketsSale.start).valueOf()>Date.now()?Object(s.jsxs)("h4",{children:["Tickets on sale ",this.props.event.ticketsSale.start]}):null]})]});case T.FUNDRIASER:return Object(s.jsxs)("div",{className:"events-row",style:{backgroundColor:this.props.event.backgroundColor,color:this.props.event.textColour||"#fff"},children:[Object(s.jsx)("div",{children:Object(s.jsx)("div",{style:Object(k.a)({backgroundImage:"url(".concat(this.props.event.headerURL,")")},y)})}),Object(s.jsxs)("div",{children:[Object(s.jsx)("h3",{children:this.props.event.title}),"undefined"!==typeof this.props.event.description?Object(s.jsx)("h4",{className:"no-margin",children:this.props.event.description}):null,Object(s.jsxs)("h4",{className:"no-margin",children:["Target: ",this.props.event.target]}),Object(s.jsx)("a",{target:"__blanK",href:this.props.event.url,children:Object(s.jsx)(w,{onClick:C,buttonType:(null===(e=this.props.event.cta)||void 0===e?void 0:e.type)||"underline",style:Object(k.a)({},this.props.event.cta),children:"Donate Now"})})]})]});case T.HOUSE:return Object(s.jsxs)("div",{className:"events-row",style:{backgroundColor:this.props.event.backgroundColor},children:[Object(s.jsx)("div",{children:Object(s.jsx)("div",{style:Object(k.a)({backgroundImage:"url(".concat(this.props.event.headerURL,")")},y)})}),Object(s.jsxs)("div",{children:[Object(s.jsx)("h3",{children:this.props.event.title}),"undefined"!==typeof this.props.event.description?Object(s.jsx)("h4",{className:"no-margin",children:this.props.event.description}):null,Object(s.jsxs)("h4",{className:"no-margin",children:["Date: ",this.props.event.dateTime]}),"todo"!==this.props.event.state&&"undefined"!==typeof this.props.event.currentVictor?Object(s.jsxs)("h4",{className:"no-margin",children:["done"!==this.props.event.state?"Current ":"","Victor: ",this.props.event.currentVictor]}):null]})]});default:return Object(s.jsx)("h1",{children:"There&s been an error - an invalid event type was provided. Please file an issue on GitHub (see footer)."})}}}]),n}(r.a.PureComponent);!function(e){e.HOUSE="house",e.CHARITY="charity",e.FUNDRIASER="fundraiser"}(T||(T={})),function(e){e.Beaufort="beaufort",e.Howard="Howard",e.Seymour="Seymour",e.Tudor="Tudor"}(N||(N={}));(new Date).toISOString();var S,E=function(e){Object(b.a)(n,e);var t=Object(j.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return Object(s.jsxs)("div",{className:"isitweeka events",children:[Object(s.jsxs)("h2",{className:"",children:[Object(s.jsx)("button",{onClick:x,className:"back"})," Upcoming Events"]}),Object(s.jsx)("div",{className:"events-list",children:this.props.eventData.events.length>0?this.props.eventData.events.filter((function(e){return!0!==e.hidden})).map((function(e,t){return Object(s.jsx)(D,{event:e},t)})):Object(s.jsx)("h1",{id:"no-events-header",children:"There are no events."})})]})}}]),n}(a.Component);!function(e){e.LOW="LOW",e.INFO="INFO",e.MODERATE="MODERATE",e.SUBSTANTIAL="SUBSTANTIAL",e.SEVERE="SEVERE",e.CRITICAL="CRITICAL"}(S||(S={}));var A=n(18),I=n(7),_=n(16);function R(e){switch(e){case S.LOW:return"r-banner-alert-LOW";case S.INFO:return"r-banner-alert-INFO";case S.MODERATE:return"r-banner-alert-MODERATE";case S.SUBSTANTIAL:return"r-banner-alert-SUBSTANTIAL";case S.SEVERE:return"r-banner-alert-SEVERE";case S.CRITICAL:return"r-banner-alert-CRITICAL"}}var L=function(e){var t=Object(a.useState)(!1),n=Object(A.a)(t,2),r=n[0],i=n[1],c=Object(a.useState)(!1),o=Object(A.a)(c,2),l=o[0],u=o[1];function d(){console.log("Banner dismissed"),i(!0),gtag("event","alert_dimissed",{value:"true",label:"alert_dimissed"})}function h(){l?(console.log("Alert button clicked"),gtag("event","alert_link_clicked",{event_category:"engagement",value:"true",label:"alert_link_clicked"})):u(!0)}var b=e.alert.message.length>30&&!l;return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("div",{className:"r-banner-container",style:Object(k.a)({},r?{display:"none"}:{}),children:Object(s.jsxs)("div",{className:"".concat(R(e.alert.alertLevel)," r-banner"),children:[Object(s.jsxs)("h3",{className:"desktop",children:[e.alert.message,e.alert.linkTo?Object(s.jsx)("a",{className:"r-banner-link",href:e.alert.linkTo,target:"__blank",onClick:h,children:e.alert.linkText||"View More"}):null]}),Object(s.jsxs)("h3",{className:"mobile",children:[Object(s.jsx)("span",{children:b?"New Alert(s)":e.alert.message}),"\xa0",Object(s.jsx)("br",{}),Object(s.jsx)("a",{className:"r-banner-link",href:l?e.alert.linkTo:void 0,target:"__blank",onClick:function(e){!l&&e.preventDefault(),h()},children:Object(s.jsx)("span",{children:l?e.alert.linkText||"View":"Expand"})})]}),Object(s.jsx)("h3",{className:"desktop",children:Object(s.jsx)(I.a,{onClick:d,className:"r-banner-dismiss",icon:_.d})}),Object(s.jsx)("h3",{className:"mobile",children:Object(s.jsx)(I.a,{onClick:d,className:"r-banner-dismiss",icon:_.d})})]})}),r?null:Object(s.jsx)("div",{className:"mobile not-x",style:{height:144}})]})},W=n(58),F=function(e){return Object(s.jsxs)("div",{className:e.isListForMobile?"sosumi sosumi-mobile":"sosumi sosumi-desktop",children:[e.isListForMobile&&Object(s.jsx)("h3",{className:"sosumi-dismiss",children:Object(s.jsx)(I.a,{className:"r-banner-dismiss",icon:_.d,onClick:e.dimisser})}),Object(s.jsx)("h3",{children:"Want updates on the exciting things we have in store?"}),e.isListForMobile&&Object(s.jsx)("h4",{id:"required-message",children:"(All fields are required)"}),Object(s.jsxs)("form",{action:"https://isitweeka.us7.list-manage.com/subscribe/post",method:"POST",children:[Object(s.jsx)("input",{type:"hidden",name:"u",value:"1a205026e7a571c5b62dd369d"}),Object(s.jsx)("input",{type:"hidden",name:"id",value:"249833b0f4"}),Object(s.jsxs)("div",{className:"input-container",children:[Object(s.jsx)("label",{htmlFor:"name-input",children:"Name:"}),Object(s.jsx)("input",{required:!0,placeholder:"Anakin Skywalker",id:"name-input MERGE6",type:"text",name:"MERGE6"})]}),Object(s.jsxs)("div",{className:"input-container",children:[Object(s.jsx)("label",{htmlFor:"email-input",children:"Email:"}),Object(s.jsx)("input",{required:!0,placeholder:"anakin@gmail.com",id:"email-input MERGE0",type:"email",name:"MERGE0"})]}),Object(s.jsxs)("div",{className:"input-checkbox-container",children:[Object(s.jsx)("label",{htmlFor:"dob-input",children:"I am age 13 or above & accept the privacy policy:"}),Object(s.jsx)("input",{required:!0,id:"dob-input gdpr[49308]",type:"checkbox",name:"gdpr[49308]"})]}),Object(s.jsx)(w,{buttonType:"fill",style:{fontSize:"1em"},type:"submit",onClick:function(){gtag("event","maillist_signup",{event_category:"engagement",value:"true",label:"maillist_signup"})},light:!0,children:"Sign up"}),Object(s.jsx)("a",{className:"privacy-policy-link",href:"/privacy.html",children:"Privacy\xa0Policy"})]})]})},U=function(e){var t=Object(a.useState)(!1),n=Object(A.a)(t,2),r=n[0],i=n[1];return Object(a.useEffect)((function(){setTimeout((function(){if(window.innerWidth<=1050){var e=window.scrollY;console.log(e),document.body.style.position="fixed",document.body.style.top="-".concat(e,"px"),i(!0)}}),4500)}),[]),Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(F,{isListForMobile:!1}),r&&Object(s.jsxs)(W.a,{children:[Object(s.jsx)("div",{className:"mobile-bg-cover"}),Object(s.jsx)(F,{isListForMobile:!0,dimisser:function(){var e=document.body.style.top;document.body.style.position="",document.body.style.top="",window.scrollTo(0,-1*parseInt(e||"0")),i(!1)}})]})]})},H=n(17),M=function(e){return Object(s.jsxs)("div",{className:"social-container",children:[Object(s.jsx)("a",{href:"https://instagram.com/isitweeka",target:"__blank",className:"instagram",children:Object(s.jsx)(I.a,{size:"2x",icon:H.b})}),Object(s.jsx)("a",{href:"https://twitter.com/IsItWeekA",target:"__blank",className:"twitter",children:Object(s.jsx)(I.a,{size:"2x",icon:H.c})})]})},B=n(27),G=function(){function e(t,n,s){Object(d.a)(this,e),this.calendarURL=void 0,this.weekMarkerDate=void 0,this.inputDate=void 0,this.isWeekend=!1,this.weekMarkerDate=t,this.calendarURL=n,this.inputDate=new Date(s)}return Object(h.a)(e,[{key:"getMonday",value:function(e){var t=new Date(e),n=t.getDay(),s=t.getDate()-n+(6===n?8:1);return new Date(t.setDate(s))}},{key:"forwardOrRewindToDay",value:function(e,t,n){var s=new Date(e),a=s.getUTCDay(),r=s.getUTCDate()-a+t+(n.includes(a)?7:0);return new Date(s.setUTCDate(r))}},{key:"isItWeekAorB",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,s,a,r,i,c,o,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=this.forwardOrRewindToDay(this.inputDate,this.weekMarkerDate,[6])).setUTCHours(0,0,0,0),(n=new Date(t)).setUTCDate(n.getUTCDate()+1),n.setUTCHours(0,0,0,0),6!==(s=this.inputDate.getUTCDay())&&0!==s||(console.debug("Is Weekend"),this.isWeekend=!0),a=t.toISOString(),n.toISOString(),e.next=11,fetch(this.calendarURL,{method:"GET",mode:"no-cors",credentials:"same-origin"});case 11:return r=e.sent,e.next=14,r.text();case 14:if(i=e.sent,c=B.parseICS(i),(o=new Map(Object.entries(c))).forEach((function(e,n){var s,r,i=!0;(null===(s=e.start)||void 0===s?void 0:s.toISOString())===a&&(i=!1),e.start&&Math.abs(t.valueOf()-(null===(r=e.start)||void 0===r?void 0:r.valueOf()))<=864e5&&(i=!1),i&&o.delete(n)})),o.forEach((function(e,t){"Week A"===e.summary||"Week B"===e.summary?u=e:o.delete(t)})),o.size>1&&console.warn("More than one Week A/B marker event found! Got ".concat(o.size," events")),0!==o.size&&u){e.next=24;break}return e.abrupt("return",{week:"unknown",isWeekend:this.isWeekend});case 24:e.t0=u.summary,e.next="Week A"===e.t0?27:"Week B"===e.t0?29:31;break;case 27:return e.abrupt("return",{week:"A",isWeekend:this.isWeekend});case 29:return e.abrupt("return",{week:"B",isWeekend:this.isWeekend});case 31:return e.abrupt("return",{week:"unknown",isWeekend:this.isWeekend});case 33:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),V=n(32),P=n(33),K=n(34),Y=function(e){Object(b.a)(n,e);var t=Object(j.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return Object(s.jsxs)("div",{style:{padding:50},children:[Object(s.jsx)("h1",{style:{fontSize:"3em",marginBottom:0},children:"Year 12 Calendar"}),Object(s.jsx)("h2",{children:"Contains Exam Details."}),Object(s.jsx)("h3",{style:{marginBottom:30},children:"Other year groups to follow later."}),Object(s.jsx)(V.a,{plugins:[K.a,P.a],initialView:"listWeek",events:{url:"/cal/KECHB/Year12.ics",format:"ics"},visibleRange:{start:"2021-06-06",end:"2021-06-12"},eventBackgroundColor:"#fe5000",viewDidMount:function(e){e.view.calendar.gotoDate("2021-06-06")},height:"auto"})]})}}]),n}(r.a.Component),z=function(e){Object(b.a)(n,e);var t=Object(j.a)(n);function n(e){var s;return Object(d.a)(this,n),(s=t.call(this,e)).fetchNotifications=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.props.alertsFetcher();case 2:t=e.sent,s.setState({alert:t});case 4:case"end":return e.stop()}}),e)}))),s.state={week:"unknown",apiHasRan:!1,isWeekend:!1,eventData:{events:[],generatedAt:""},alert:{message:"ATTENTION: ALL EXAMS ARE CANCELLED - Albus Dumbledore",showAlert:!1,alertLevel:S.LOW}},s}return Object(h.a)(n,[{key:"componentDidMount",value:function(){try{this.getCalendar(),this.fetchEvents(),this.fetchNotifications()}catch(e){console.error("Error: "+(null===e||void 0===e?void 0:e.message))}}},{key:"fetchEvents",value:function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,this.props.eventsFetcher();case 3:e.t1=e.sent,e.t2={eventData:e.t1},e.t0.setState.call(e.t0,e.t2);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getMonday",value:function(e){var t=new Date(e),n=t.getDay(),s=t.getDate()-n+(6===n?8:1);return new Date(t.setDate(s))}},{key:"forwardOrRewindToDay",value:function(e,t,n){var s=new Date(e),a=s.getUTCDay(),r=s.getUTCDate()-a+t+(n.includes(a)?7:0);return new Date(s.setUTCDate(r))}},{key:"getCalendar",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new Date,n=new G(this.props.weekMarkerDate,this.props.calendarURL,t),e.next=4,n.isItWeekAorB();case 4:s=e.sent,this.setState({apiHasRan:!0,week:s.week,isWeekend:s.isWeekend});case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getStatus",value:function(){return"unknown"===this.state.week?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h2",{children:"It is neither Week A nor B."}),Object(s.jsx)("h3",{children:"This means it's probably a holiday."}),Object(s.jsx)(w,{style:{marginRight:"auto"},className:"forward",onClick:f(0),children:Object(s.jsx)("div",{children:"events"})}),Object(s.jsxs)("h5",{children:["If you believe this is in error, please email\xa0",Object(s.jsx)("a",{href:"mailto:info@isitweeka.com",children:"info@isitweeka.com"})]}),Object(s.jsx)(M,{})]}):Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h2",{className:"desktop",children:this.state.isWeekend?"Next week will be":"It is"})," ",Object(s.jsxs)("h1",{className:"desktop",children:["Week ",this.state.week]}),Object(s.jsx)("h2",{className:"mobile",children:this.state.isWeekend?"Next week will be week":"It is week"})," ",Object(s.jsx)("h1",{className:"mobile",children:this.state.week}),Object(s.jsx)("h4",{children:"More coming soon..."}),Object(s.jsx)(w,{style:{marginRight:"auto",marginTop:25},className:"forward",onClick:f(0),children:"events"}),Object(s.jsx)(M,{})]})}},{key:"render",value:function(){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)("div",{className:"isitweeka isitweeka-jumbotron",children:[this.state.alert.showAlert?Object(s.jsx)(L,{alert:this.state.alert}):null,this.state.apiHasRan?this.getStatus():Object(s.jsx)("h2",{children:"Loading..."})]}),Object(s.jsx)(U,{}),Object(s.jsx)(Y,{}),Object(s.jsx)(E,{eventData:this.state.eventData})]})}}]),n}(a.Component),J=function(e){return Object(s.jsx)("div",{className:"r-tab-row",children:e.children})},q=function(e){return Object(s.jsx)("button",{className:"r-tab".concat(e.active?" active":""),onClick:e.onClick,children:Object(s.jsx)("span",{children:e.children})})},X=function(e){var t=r.a.useState(e.initialTab||0),n=Object(A.a)(t,2),a=n[0],i=n[1];function c(t,n){"undefined"!==typeof e.onTabChange&&e.onTabChange(t,n)}return r.a.useEffect((function(){return c(e.tabs[a].tab,a)})),Object(s.jsxs)("div",{className:"r-tab-container",children:[Object(s.jsx)(J,{children:e.tabs.map((function(e,t){var n=e.tab;return Object(s.jsx)(q,{onClick:function(){i(t),c(n,t)},active:a===t,children:n},t)}))}),Object(s.jsx)("div",{children:e.tabs.map((function(e,t){var n=e.component;return t===a?Object(s.jsx)("div",{children:n},t):null}))})]})},Z=n(57),Q=n(21),$=n.n(Q),ee="SchoolPreference",te={events:[{title:"Would I Lie To You?",description:"Come here teachers tell their embarrassing stories!",url:"https://www.eventbrite.co.uk/e/would-i-lie-to-you-students-vs-teachers-tickets-133890123965?aff=isitweeka",ticketsSale:{start:"01/01/2020"},headerURL:"/events/WILTY_Logo.png",backgroundColor:"#2C1F39",eventType:T.CHARITY,hidden:!0},{title:"LockdownRuns\xad4Charity",description:"A group of students aiming to run 1000km.",url:"https://www.gofundme.com/f/khsjye-lockdownruns4charity",headerURL:"https://youngminds.org.uk/assets/logos/youngminds-logo.svg",backgroundColor:"#ffffff",eventType:T.FUNDRIASER,target:"\xa32000",textColour:"#000000",cta:{color:"#fff",type:"fill"},hidden:!0},{eventType:T.CHARITY,title:"CHAOS",headerURL:"/events/School-Logo.png",ticketsSale:{start:"01/01/2020"},description:"Countdown to CHAOS: the Camp Hill Amateur Operatic Society.  Little else is known at the moment.",when:"Thursday 1st & Friday 2nd July",backgroundColor:"#752023",hidden:!1},{eventType:T.HOUSE,title:"House Cross-Country",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"Autumn 2020",state:"done",currentVictor:"Seymour",backgroundColor:"#FFBE5A"},{eventType:T.HOUSE,title:"House Touch Rugby",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"Autumn 2020",state:"done",currentVictor:"Beaufort",backgroundColor:"#CC4545"}],generatedAt:"0"},ne={events:[],generatedAt:"0"},se=n(29),ae=function(){return Object(s.jsxs)("div",{className:"footer",children:[Object(s.jsx)("a",{id:"feedback-buttom",target:"__blank",href:"https://forms.gle/KaS2VUAmZqfS1Nf26",children:Object(s.jsx)(w,{children:"give feedback"})}),Object(s.jsxs)("p",{children:["Created by Kishan Sambhi & Madeline Hart.",Object(s.jsx)("br",{}),"\xa9 ",(new Date).getFullYear(),", source available on GitHub under the MIT license.",Object(s.jsx)("br",{}),Object(s.jsx)("br",{}),"Data controller information: data controlled by Kishan Sambhi, a KECH pupil, and will only ever be viewed by KECH pupils.",Object(s.jsx)("br",{}),"All changes to this site are reviewed, merged and deployed by a KECH pupil.",Object(s.jsx)("br",{}),Object(s.jsx)("br",{}),"Version ",se.a]}),Object(s.jsx)(M,{}),Object(s.jsxs)("div",{className:"outbound-links",children:[Object(s.jsxs)("a",{target:"__blank",href:"https://github.com/Gum-Joe/isitweeka",children:[Object(s.jsx)(I.a,{icon:H.a}),"\xa0",Object(s.jsx)("u",{children:"GitHub"})]}),Object(s.jsx)("a",{target:"__blank",href:"https://github.com/Gum-Joe/isitweeka/issues",children:Object(s.jsx)("u",{children:"Feature Tracker"})}),Object(s.jsxs)("a",{target:"__blank",href:"mailto:info@isitweeka.com",children:[Object(s.jsx)(I.a,{icon:_.b}),"\xa0",Object(s.jsx)("u",{children:"Email us"})]}),Object(s.jsx)("a",{target:"__blank",href:"/privacy.html",children:Object(s.jsx)("u",{children:"Privacy Policy"})})]}),Object(s.jsxs)("div",{className:"container-credits",children:[Object(s.jsxs)("div",{children:[Object(s.jsx)("h4",{children:"Find Kishan here:"}),Object(s.jsxs)("ul",{children:[Object(s.jsx)("a",{target:"__blank",href:"https://github.com/Gum-Joe",children:Object(s.jsxs)("li",{children:[Object(s.jsx)(I.a,{icon:H.a})," GitHub"]})}),Object(s.jsx)("a",{target:"__blank",href:"https://twitter.com/k_sam_mighty",children:Object(s.jsxs)("li",{children:[Object(s.jsx)(I.a,{icon:H.c})," Twitter"]})}),Object(s.jsx)("a",{target:"__blank",href:"https://instagram.com/k_sam_mighty",children:Object(s.jsxs)("li",{children:[Object(s.jsx)(I.a,{icon:H.b})," Instagram"]})}),Object(s.jsx)("a",{target:"__blank",href:"mailto:15Sambhi614@camphillboys.bham.sch.uk",children:Object(s.jsxs)("li",{children:[Object(s.jsx)(I.a,{icon:_.b})," Email"]})})]})]}),Object(s.jsxs)("div",{children:[Object(s.jsx)("h4",{children:"Find Madeline here:"}),Object(s.jsxs)("ul",{children:[Object(s.jsx)("a",{target:"__blank",href:"https://github.com/ILikeTeaALot",children:Object(s.jsxs)("li",{children:[Object(s.jsx)(I.a,{icon:H.a})," GitHub"]})}),Object(s.jsx)("a",{target:"__blank",href:"https://www.rykan.net",children:Object(s.jsxs)("li",{children:[Object(s.jsx)(I.a,{icon:_.c})," rykan.net"]})}),Object(s.jsx)("a",{target:"__blank",href:"mailto:madeline@rykan.net",children:Object(s.jsxs)("li",{children:[Object(s.jsx)(I.a,{icon:_.a})," Email"]})})]})]})]})]})},re={showAlert:!0,message:"Good luck to all those taking exams! And wishing our Year 13s all the best as they leave the school - good luck & have fun!",alertLevel:S.LOW,linkText:"view more",linkTo:"https://twitter.com/IsItWeekA/status/1393264907043450883?s=20"},ie={showAlert:!0,message:"Welcome to IsItWeekA!  We'll use these banner for important alerts in the future.",alertLevel:S.LOW},ce=function(e){Object(b.a)(n,e);var t=Object(j.a)(n);function n(e){return Object(d.a)(this,n),t.call(this,e)}return Object(h.a)(n,[{key:"updateCookie",value:function(e,t){"true"===$.a.get("CookieConsent")&&($.a.set(ee,{school:e,tabIndex:t},{secure:!0,sameSite:"strict"}),"undefined"!==typeof gtag&&(console.log("Setting to "+e),gtag("set","user_properties",{school:e})))}},{key:"render",value:function(){return Object(s.jsxs)("div",{className:"App",children:[Object(s.jsx)(X,{tabs:[{tab:"KECHB",component:Object(s.jsx)(z,{calendarURL:"/cal/KECHB/basic.ics",weekMarkerDate:1,eventsFetcher:Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",te);case 1:case"end":return e.stop()}}),e)}))),alertsFetcher:Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",re);case 1:case"end":return e.stop()}}),e)})))})},{tab:"KECHG",component:Object(s.jsx)(z,{calendarURL:"/cal/KECHG/basic.ics",weekMarkerDate:0,eventsFetcher:Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ne);case 1:case"end":return e.stop()}}),e)}))),alertsFetcher:Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ie);case 1:case"end":return e.stop()}}),e)})))})}],onTabChange:this.updateCookie,initialTab:function(){var e;return(null===(e=$.a.getJSON(ee))||void 0===e?void 0:e.tabIndex)||0}()}),Object(s.jsx)(ae,{}),Object(s.jsx)(Z.a,{fixed:"bottom",children:Object(s.jsxs)(v.a,{enableDeclineButton:!0,flipButtons:!0,buttonText:"I understand",declineButtonText:"No thanks",onAccept:function(){O(!1),window.location.reload()},onDecline:function(){O(!0),window.location.reload()},children:["This website uses cookies for preferences and analytics (via Google Analytics).",Object(s.jsx)("a",{href:"/privacy.html",children:" View Privacy Policy"})]})})]})}}]),n}(a.Component),oe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,59)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),s(e),a(e),r(e),i(e)}))};c.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(ce,{})}),document.getElementById("root")),oe()}},[[52,1,2]]]);
//# sourceMappingURL=main.54a4e0f7.chunk.js.map