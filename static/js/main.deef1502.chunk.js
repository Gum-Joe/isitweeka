(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{30:function(e,t,n){"use strict";var a=n(5),r=n(49).default,s=n(50).default,i=this&&this.__createBinding||(Object.create?function(e,t,n,a){void 0===a&&(a=n),Object.defineProperty(e,a,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,a){void 0===a&&(a=n),e[a]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),c=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&i(t,e,n);return o(t,e),t},l=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(r,s){function i(e){try{c(a.next(e))}catch(t){s(t)}}function o(e){try{c(a.throw(e))}catch(t){s(t)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,o)}c((a=a.apply(e,t||[])).next())}))},d=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var h=c(n(51)),u=d(n(52)),p=function(){function e(t,n,a){r(this,e),this.isWeekend=!1,this.weekMarkerDate=t,this.calendarURL=n,this.inputDate=new Date(a)}return s(e,[{key:"getMonday",value:function(e){var t=new Date(e),n=t.getDay(),a=t.getDate()-n+(6===n?8:1);return new Date(t.setDate(a))}},{key:"forwardOrRewindToDay",value:function(e,t,n){var a=new Date(e),r=a.getUTCDay(),s=a.getUTCDate()-r+t+(n.includes(r)?7:0);return new Date(a.setUTCDate(s))}},{key:"isItWeekAorB",value:function(){return l(this,void 0,void 0,a.mark((function e(){var t,n,r,s,i,o,c,l,d;return a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=this.forwardOrRewindToDay(this.inputDate,this.weekMarkerDate,[6])).setUTCHours(0,0,0,0),(n=new Date(t)).setUTCDate(n.getUTCDate()+1),n.setUTCHours(0,0,0,0),6!==(r=this.inputDate.getUTCDay())&&0!==r||(console.debug("Is Weekend"),this.isWeekend=!0),s=t.toISOString(),n.toISOString(),e.next=11,(0,u.default)(this.calendarURL,{method:"GET",mode:"no-cors",credentials:"same-origin"});case 11:return i=e.sent,e.next=14,i.text();case 14:if(o=e.sent,c=h.parseICS(o),(l=new Map(Object.entries(c))).forEach((function(e,n){var a,r,i=!0;(null===(a=e.start)||void 0===a?void 0:a.toISOString())===s&&(i=!1),e.start&&Math.abs(t.valueOf()-(null===(r=e.start)||void 0===r?void 0:r.valueOf()))<=864e5&&(i=!1),i&&l.delete(n)})),l.forEach((function(e,t){"Week A"===e.summary||"Week B"===e.summary?d=e:l.delete(t)})),l.size>1&&console.warn("More than one Week A/B marker event found! Got ".concat(l.size," events")),0!==l.size&&d){e.next=24;break}return e.abrupt("return",{week:"unknown",isWeekend:this.isWeekend});case 24:e.t0=d.summary,e.next="Week A"===e.t0?27:"Week B"===e.t0?29:31;break;case 27:return e.abrupt("return",{week:"A",isWeekend:this.isWeekend});case 29:return e.abrupt("return",{week:"B",isWeekend:this.isWeekend});case 31:return e.abrupt("return",{week:"unknown",isWeekend:this.isWeekend});case 33:case"end":return e.stop()}}),e,this)})))}}]),e}();t.default=p},31:function(e){e.exports=JSON.parse('{"name":"frontend","version":"2.0.1","private":true,"dependencies":{"@fortawesome/fontawesome-svg-core":"^1.2.36","@fortawesome/free-brands-svg-icons":"^5.15.4","@fortawesome/free-solid-svg-icons":"^5.15.4","@fortawesome/react-fontawesome":"^0.1.16","@fullcalendar/daygrid":"^5.10.1","@fullcalendar/icalendar":"^5.10.1","@fullcalendar/list":"^5.10.1","@fullcalendar/react":"^5.10.1","@testing-library/jest-dom":"^5.16.1","@testing-library/react":"^12.1.2","@testing-library/user-event":"^13.5.0","@types/ical":"^0.8.0","@types/jest":"^27.4.0","@types/node":"^17.0.7","@types/react":"^17.0.38","@types/react-bootstrap":"^0.32.29","@types/react-dom":"^17.0.11","@types/react-fontawesome":"^1.6.5","focus-trap-react":"^8.9.0","ical":"^0.8.0","js-cookie":"^3.0.1","libisitweeka":"^1.0.0","node-sass":"^6.0.0","react":"^17.0.2","react-bootstrap":"^2.1.0","react-circular-progressbar":"^2.0.4","react-cookie-consent":"^7.2.1","react-dom":"^17.0.2","react-portal":"^4.2.1","react-scripts":"v4.0.3","typescript":"^4.5.4","web-vitals":"^2.1.2"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject","lint":"eslint --ext ts --ext tsx src"},"eslintConfig":{"extends":["react-app","react-app/jest"]},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"devDependencies":{"@types/gapi":"^0.0.41","@types/gapi.client.calendar":"^3.0.10","@types/gtag.js":"^0.0.8","@types/js-cookie":"^3.0.1","@types/react-portal":"^4.0.4","@typescript-eslint/eslint-plugin":"^5.9.1","@typescript-eslint/parser":"^5.9.1","eslint":"7.11.0","eslint-plugin-react":"^7.28.0"}}')},40:function(e,t,n){},42:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),s=n(13),i=n.n(s),o=(n(40),n(14)),c=n(7),l=n(8),d=n(11),h=n(12),u=n(5),p=n.n(u),b="ga-disable-G-X4VMSWGN74";function j(e){document.cookie=b+"=".concat(e?"true":"false","; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/"),window[b]=e}n(42);var v=n(29),f=n.n(v);function m(e){return function(){window.scrollTo({top:window.innerHeight+e,behavior:"smooth"})}}function k(){window.scrollTo({top:0,behavior:"smooth"})}var g=n(2),w=n(0),O=function(e){return"fill"===(null===e||void 0===e?void 0:e.buttonType)?Object(w.jsx)("button",Object(g.a)(Object(g.a)({},e),{},{className:"filled-button","data-light":e.light,children:Object(w.jsx)("span",{children:e.children})})):Object(w.jsx)("button",Object(g.a)(Object(g.a)({},e),{},{className:"forward","data-light":e.light,children:Object(w.jsx)("span",{children:e.children})}))};O.displayName="Button.Forward";var y=O,x={backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center",display:"flex",flex:1,margin:"auto",width:"90%",maxHeight:"80%"};function T(){console.log("Reporting button click..."),gtag("event","outbound_events_button_click",{event_category:"ecommerce",value:"true",label:"outbound_events_button_click"})}function C(e){return{backgroundColor:e.backgroundColor,color:e.textColour||"#fff"}}var H,S,D=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e,t,n,a;switch(this.props.event.eventType){case H.CHARITY:return Object(w.jsxs)("div",{className:"events-row",style:C(this.props.event),children:[Object(w.jsx)("div",{children:Object(w.jsx)("div",{style:Object(g.a)({backgroundImage:"url(".concat(this.props.event.headerURL,")")},x)})}),Object(w.jsxs)("div",{children:[Object(w.jsx)("h3",{children:this.props.event.title}),"undefined"!==typeof this.props.event.when?Object(w.jsxs)("h4",{className:"no-margin",children:["When? ",this.props.event.when]}):null,"undefined"!==typeof this.props.event.description?Object(w.jsx)("h4",{className:"no-margin",children:this.props.event.description}):null,this.props.event.ticketsSale&&this.props.event.url&&new Date(this.props.event.ticketsSale.start).valueOf()<Date.now()?Object(w.jsx)("a",{href:this.props.event.url,children:Object(w.jsx)(y,{onClick:T,buttonType:(null===(e=this.props.event.cta)||void 0===e?void 0:e.type)||"underline",style:Object(g.a)({},this.props.event.cta),children:(null===(t=this.props.event.cta)||void 0===t?void 0:t.text)||"Buy Tickets"})}):null,this.props.event.ticketsSale&&new Date(this.props.event.ticketsSale.start).valueOf()>Date.now()?Object(w.jsxs)("h4",{children:["Tickets on sale ",this.props.event.ticketsSale.start]}):null]})]});case H.FUNDRIASER:return Object(w.jsxs)("div",{className:"events-row",style:C(this.props.event),children:[Object(w.jsx)("div",{children:Object(w.jsx)("div",{style:Object(g.a)({backgroundImage:"url(".concat(this.props.event.headerURL,")")},x)})}),Object(w.jsxs)("div",{children:[Object(w.jsx)("h3",{children:this.props.event.title}),"undefined"!==typeof this.props.event.description?Object(w.jsx)("h4",{className:"no-margin",children:this.props.event.description}):null,Object(w.jsxs)("h4",{className:"no-margin",children:["Target: ",this.props.event.target]}),Object(w.jsx)("a",{target:"__blanK",href:this.props.event.url,children:Object(w.jsx)(y,{onClick:T,buttonType:(null===(n=this.props.event.cta)||void 0===n?void 0:n.type)||"underline",style:Object(g.a)({},this.props.event.cta),children:(null===(a=this.props.event.cta)||void 0===a?void 0:a.text)||"Donate Now"})})]})]});case H.HOUSE:return Object(w.jsxs)("div",{className:"events-row",style:C(this.props.event),children:[Object(w.jsx)("div",{children:Object(w.jsx)("div",{style:Object(g.a)({backgroundImage:"url(".concat(this.props.event.headerURL,")")},x)})}),Object(w.jsxs)("div",{children:[Object(w.jsx)("h3",{children:this.props.event.title}),"undefined"!==typeof this.props.event.description?Object(w.jsx)("h4",{className:"no-margin",children:this.props.event.description}):null,Object(w.jsxs)("h4",{className:"no-margin",children:["Date: ",this.props.event.dateTime]}),"todo"!==this.props.event.state&&"undefined"!==typeof this.props.event.currentVictor?Object(w.jsxs)("h4",{className:"no-margin",children:["done"!==this.props.event.state?"Current ":"","Victor:\xa0",Object(w.jsx)("span",{className:"current-victor",children:this.props.event.currentVictor})]}):null]})]});default:return Object(w.jsx)("h1",{children:"There&s been an error - an invalid event type was provided. Please file an issue on GitHub (see footer)."})}}}]),n}(r.a.PureComponent);!function(e){e.HOUSE="house",e.CHARITY="charity",e.FUNDRIASER="fundraiser"}(H||(H={})),function(e){e.Beaufort="beaufort",e.Howard="Howard",e.Seymour="Seymour",e.Tudor="Tudor"}(S||(S={}));(new Date).toISOString();var R,A=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){var e=this.props.eventData.events.filter((function(e){return!0!==e.hidden}));return Object(w.jsxs)("div",{className:"isitweeka events",children:[Object(w.jsxs)("h2",{className:"",children:[Object(w.jsx)("button",{onClick:k,className:"back"})," Upcoming Events"]}),Object(w.jsx)("div",{className:"events-list",children:e.length>0?e.map((function(e,t){return Object(w.jsx)(D,{event:e},t)})):Object(w.jsx)("h1",{id:"no-events-header",children:"There are no events."})})]})}}]),n}(a.Component),N="SchoolPreference",U=2500,L="https://api.isitweeka.com",E="".concat(L,"/isitweeka/kechb"),I="".concat(L,"/isitweeka/kechg"),_="".concat(L,"/eventbrite/cw");!function(e){e.LOW="LOW",e.INFO="INFO",e.MODERATE="MODERATE",e.SUBSTANTIAL="SUBSTANTIAL",e.SEVERE="SEVERE",e.CRITICAL="CRITICAL",e.DEATH="DEATH"}(R||(R={}));var W=n(15),M=n(9),F=n(18);function B(e){switch(e){case R.LOW:return"r-banner-alert-LOW";case R.INFO:return"r-banner-alert-INFO";case R.MODERATE:return"r-banner-alert-MODERATE";case R.SUBSTANTIAL:return"r-banner-alert-SUBSTANTIAL";case R.SEVERE:return"r-banner-alert-SEVERE";case R.CRITICAL:return"r-banner-alert-CRITICAL";case R.DEATH:return"r-banner-alert-DEATH"}}var P=function(e){var t=Object(a.useState)(!1),n=Object(W.a)(t,2),r=n[0],s=n[1],i=Object(a.useState)(!1),o=Object(W.a)(i,2),c=o[0],l=o[1];function d(){console.log("Banner dismissed"),s(!0),gtag("event","alert_dimissed",{value:"true",label:"alert_dimissed"})}function h(){c?(console.log("Alert button clicked"),gtag("event","alert_link_clicked",{event_category:"engagement",value:"true",label:"alert_link_clicked"})):l(!0)}var u=e.alert.message.length>30&&!c;return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("div",{className:"r-banner-container",style:Object(g.a)({},r?{display:"none"}:{}),children:Object(w.jsxs)("div",{className:"".concat(B(e.alert.alertLevel)," r-banner"),children:[Object(w.jsxs)("h3",{className:"desktop",children:[e.alert.message,e.alert.linkTo?Object(w.jsx)("a",{className:"r-banner-link",href:e.alert.linkTo,target:"__blank",onClick:h,children:e.alert.linkText||"View More"}):null]}),Object(w.jsxs)("h3",{className:"mobile",children:[Object(w.jsx)("span",{children:u?"New Alert(s)":e.alert.message}),"\xa0",Object(w.jsx)("br",{}),!c||e.alert.linkTo?Object(w.jsx)("a",{className:"r-banner-link",href:c?e.alert.linkTo:void 0,target:"__blank",onClick:function(e){!c&&e.preventDefault(),h()},children:Object(w.jsx)("span",{children:c?e.alert.linkText||"View":"Expand"})}):null]}),Object(w.jsx)("h3",{className:"desktop",children:Object(w.jsx)(M.a,{onClick:d,className:"r-banner-dismiss",icon:F.c})}),Object(w.jsx)("h3",{className:"mobile",children:Object(w.jsx)(M.a,{onClick:d,className:"r-banner-dismiss",icon:F.c})})]})}),r?null:Object(w.jsx)("div",{className:"mobile not-x",style:{height:144}})]})},Y=n(20),G=function(e){return Object(w.jsxs)("div",{className:"social-container",children:[Object(w.jsx)("a",{href:"https://instagram.com/isitweeka",target:"__blank",className:"instagram",children:Object(w.jsx)(M.a,{size:"2x",icon:Y.b})}),Object(w.jsx)("a",{href:"https://twitter.com/IsItWeekA",target:"__blank",className:"twitter",children:Object(w.jsx)(M.a,{size:"2x",icon:Y.c})})]})},V=n(30),K=n.n(V).a,z=n(28),J=(n(53),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).fetchNotifications=Object(o.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.props.alertsFetcher();case 2:t=e.sent,a.setState({alert:t});case 4:case"end":return e.stop()}}),e)}))),a.state={week:"unknown",apiHasRan:!1,isWeekend:!1,eventData:{events:[],generatedAt:""},alert:{message:"ATTENTION: ALL EXAMS ARE CANCELLED - Albus Dumbledore",showAlert:!1,alertLevel:R.LOW},raised:{net:"0.00",ticketQuantity:0}},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){try{this.getCalendar(),this.fetchEvents(),this.fetchNotifications(),this.getAmountRaised()}catch(e){console.error("Error: "+(null===e||void 0===e?void 0:e.message))}}},{key:"getAmountRaised",value:function(){var e=Object(o.a)(p.a.mark((function e(){var t,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(_);case 2:return t=e.sent,e.next=5,t.json();case 5:1===(n=e.sent).net.split(".")[1].length&&(n.net=n.net+"0"),n.net.split(".")[0].length>3&&(n.net=n.net.split(".")[0]),this.setState({raised:n});case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"fetchEvents",value:function(){var e=Object(o.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=this,e.next=3,this.props.eventsFetcher();case 3:e.t1=e.sent,e.t2={eventData:e.t1},e.t0.setState.call(e.t0,e.t2);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getMonday",value:function(e){var t=new Date(e),n=t.getDay(),a=t.getDate()-n+(6===n?8:1);return new Date(t.setDate(a))}},{key:"forwardOrRewindToDay",value:function(e,t,n){var a=new Date(e),r=a.getUTCDay(),s=a.getUTCDate()-r+t+(n.includes(r)?7:0);return new Date(a.setUTCDate(s))}},{key:"getCalendar",value:function(){var e=Object(o.a)(p.a.mark((function e(){var t,n,a,r,s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new Date,e.prev=1,e.next=4,fetch(this.props.iiwaURL);case 4:return n=e.sent,e.next=7,n.json();case 7:if((a=e.sent).week&&"isWeekend"in a){e.next=10;break}throw new Error("One or both of week or isWeekend not in response");case 10:this.setState({apiHasRan:!0,week:a.week,isWeekend:a.isWeekend}),e.next=23;break;case 13:return e.prev=13,e.t0=e.catch(1),console.error("Error using IsItWeekA API!"),console.error(e.t0),console.error("Falling back to old API!"),r=new K(this.props.weekMarkerDate,this.props.calendarURL,t),e.next=21,r.isItWeekAorB();case 21:s=e.sent,this.setState({apiHasRan:!0,week:s.week,isWeekend:s.isWeekend});case 23:case"end":return e.stop()}}),e,this,[[1,13]])})));return function(){return e.apply(this,arguments)}}()},{key:"getStatus",value:function(){return"unknown"===this.state.week?Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("h2",{children:"It is neither Week A nor B."}),Object(w.jsx)("h3",{children:"This means it's probably a holiday."}),Object(w.jsx)(y,{style:{marginRight:"auto"},className:"forward",onClick:m(0),children:Object(w.jsx)("div",{children:"events"})}),Object(w.jsxs)("h5",{id:"neitherAB-contact",children:["If you believe this is in error, please email\xa0",Object(w.jsx)("a",{href:"mailto:info@isitweeka.com",children:"info@isitweeka.com"})]}),Object(w.jsx)(G,{})]}):Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)("h2",{className:"desktop",children:this.state.isWeekend?"Next week will be":"It is"})," ",Object(w.jsxs)("h1",{className:"desktop",children:["Week ",this.state.week]}),Object(w.jsx)("h2",{className:"mobile",children:this.state.isWeekend?"Next week will be week":"It is week"})," ",Object(w.jsx)("h1",{className:"mobile",children:this.state.week}),Object(w.jsxs)("div",{className:"cw-widget",children:[Object(w.jsx)("h2",{children:"Charity Week"}),Object(w.jsxs)("div",{className:"raised-content",children:[Object(w.jsx)("div",{className:"ring-cont",children:Object(w.jsx)(z.a,{strokeWidth:10,value:parseFloat(this.state.raised.net)/U*100,text:(parseFloat(this.state.raised.net)/U*100).toFixed(0)+"%"})}),Object(w.jsxs)("div",{className:"raised-text",children:[Object(w.jsxs)("h1",{children:["\xa3",this.state.raised.net]}),Object(w.jsx)("h3",{children:"raised"})]})]}),Object(w.jsx)("a",{href:"https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite",children:Object(w.jsxs)("button",{children:[Object(w.jsx)("p",{children:"Buy tickets Now"})," ",Object(w.jsx)(M.a,{icon:F.a})]})})]}),Object(w.jsx)(y,{style:{marginRight:"auto",marginTop:25},className:"forward",id:"event-scroll-button",onClick:m(0),children:"events"}),Object(w.jsx)(G,{})]})}},{key:"render",value:function(){return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsxs)("div",{className:"isitweeka-jumbotron",children:[this.state.alert.showAlert?Object(w.jsx)(P,{alert:this.state.alert}):null,Object(w.jsx)("div",{className:"isitweeka",children:this.state.apiHasRan?this.getStatus():Object(w.jsx)("h2",{children:"Loading..."})}),Object(w.jsxs)("div",{className:"cw-cards",children:[Object(w.jsx)("div",{className:"cw-header",children:Object(w.jsx)("h1",{children:"Charity Week"})}),Object(w.jsx)("div",{className:"cw-content",children:Object(w.jsxs)("div",{children:[Object(w.jsxs)("div",{className:"cw-buy",children:[Object(w.jsx)("h2",{children:"About"}),Object(w.jsx)("h4",{children:"Camp Hill's return to charity events, with Who Wants to Be a Millionaire?, THE GRAND DEBATE, a Mario Kart tournament, Camp Hill's Got Talent and Would I Lie To You: Students vs Teachers!"}),Object(w.jsx)("a",{href:"https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite",children:Object(w.jsxs)("button",{children:[Object(w.jsx)("p",{children:"Donate & Buy Tickets Now"})," ",Object(w.jsx)(M.a,{icon:F.a})]})})]}),Object(w.jsxs)("div",{className:"cw-raised",children:[Object(w.jsx)("h2",{children:"Ticket Stats"}),Object(w.jsxs)("div",{className:"raised-content",children:[Object(w.jsx)("div",{className:"ring-cont",children:Object(w.jsx)(z.a,{strokeWidth:10,value:parseFloat(this.state.raised.net)/U*100,text:(parseFloat(this.state.raised.net)/U*100).toFixed(0)+"%"})}),Object(w.jsxs)("div",{className:"raised-text",children:[Object(w.jsxs)("h1",{children:["\xa3",this.state.raised.net]}),Object(w.jsx)("h3",{children:"raised"})]}),Object(w.jsxs)("div",{className:"raised-text",children:[Object(w.jsx)("h1",{children:this.state.raised.ticketQuantity}),Object(w.jsx)("h3",{children:"sold"})]})]})]}),Object(w.jsxs)("div",{className:"cw-charity-link",children:[Object(w.jsx)("p",{children:"Supporting Beat -"}),Object(w.jsx)("a",{target:"__blank",href:"https://www.beateatingdisorders.org.uk/about-beat/",children:"more info >>>"})]})]})})]})]}),Object(w.jsx)(A,{eventData:this.state.eventData})]})}}]),n}(a.Component)),Q=function(e){return Object(w.jsx)("div",{className:"r-tab-row",children:e.children})},q=function(e){return Object(w.jsx)("button",{className:"r-tab".concat(e.active?" active":""),onClick:e.onClick,children:Object(w.jsx)("span",{children:e.children})})},X=function(e){var t=r.a.useState(e.initialTab||0),n=Object(W.a)(t,2),a=n[0],s=n[1];function i(t,n){"undefined"!==typeof e.onTabChange&&e.onTabChange(t,n)}return r.a.useEffect((function(){return i(e.tabs[a].tab,a)})),Object(w.jsxs)("div",{className:"r-tab-container",children:[Object(w.jsx)(Q,{children:e.tabs.map((function(e,t){var n=e.tab;return Object(w.jsx)(q,{onClick:function(){s(t),i(n,t)},active:a===t,children:n},t)}))}),Object(w.jsx)("div",{children:e.tabs.map((function(e,t){var n=e.component;return t===a?Object(w.jsx)("div",{children:n},t):null}))})]})},Z=n(57),$=n(24),ee=n.n($),te="#752023",ne="#4286BB",ae={generatedAt:"0",events:[{eventType:H.CHARITY,title:"Charity Week 2022",description:"It's been 2 years since the last charity event. Let's change that, with a whole week of tremendous events.",headerURL:"/events/CharityWeek.png",when:"w/c 14th February",url:"https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite",backgroundColor:"#202435",ticketsSale:{start:"02/02/22"}},{eventType:H.CHARITY,title:"THE GRAND DEBATE",description:"Get your brains ready, tone primed and dramatic pauses fixed as you face the undisputable masters of debate - the teachers.",headerURL:"/events/Logo-Charity-Commitee.png",when:"Charity Week",url:"https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite",backgroundColor:"#ffffff",ticketsSale:{start:"02/02/22"},textColour:"#000000",cta:{backgroundColor:"#5ab947",type:"fill"}},{eventType:H.CHARITY,title:"Mario Kart Tournament",description:"Get ready to race your classmates in Camp Hill's first Mario Kart tournament!",headerURL:"/events/CharityWeek.png",when:"Charity Week",url:"https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite",backgroundColor:"#000000",ticketsSale:{start:"02/02/22"}},{eventType:H.CHARITY,title:"Who Wants To Be A Millionaire?",description:'Get ready to take to the stage, as you could be in your chance to win a \xa350 Amazon Giftcard in "Who Wants to Be a Millionaire?"',headerURL:"/events/who_wants_to_be_a_millionaire__uk_2018_logo_remake_by_zackthetimelordrblx_dcm12hz-fullview.png",when:"Charity Week",url:"https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite",backgroundColor:"#1e012d",ticketsSale:{start:"02/02/22"}},{hidden:!1,eventType:H.CHARITY,title:"Camp Hill's Got Talent",description:"Following its tremendous success in 2018, Omar will return to the stage to host the return of Camp Hill\u2019s Got Talent!",headerURL:"/events/CharityWeek.png",when:"Charity Week",url:"https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite",backgroundColor:"#0f192a",ticketsSale:{start:"02/02/22"}},{title:"Would I Lie To You?",description:"Come hear teachers tell their funny & embarrassing stories!",url:"https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite",ticketsSale:{start:"01/01/2020"},headerURL:"/events/WILTY_Logo.png",backgroundColor:"#2C1F39",eventType:H.CHARITY},{eventType:H.HOUSE,title:"House Chess",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"starts Monday 17th January 2022",state:"todo",backgroundColor:te},{eventType:H.HOUSE,title:"House Swimming Gala",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"Thursday 3rd February 2022",state:"todo",backgroundColor:te},{eventType:H.HOUSE,title:"House Handball",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"starts w/c 7th February 2022",state:"todo",backgroundColor:te},{eventType:H.HOUSE,title:"House Volleyball",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"starts w/c 14th March 2022",state:"todo",backgroundColor:te},{eventType:H.HOUSE,title:"Intermediate & Senior House Hockey",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"Monday 21st & Wednesday 23rd March 2022",state:"todo",backgroundColor:te},{eventType:H.HOUSE,title:"Senior 7s House Rugby",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"Wednesday 30th March 2022",state:"todo",backgroundColor:te},{eventType:H.HOUSE,title:"House Table Tennis (all years)",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"Monday 4th April - Wednesday 6th April 2022",state:"todo",backgroundColor:te},{eventType:H.HOUSE,title:"House Music",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"Tuesday 5th April 2022",state:"todo",backgroundColor:te},{eventType:H.CHARITY,title:"Year 11 & 13 December Mocks",headerURL:"/events/School-Logo.png",description:"Year 11 & 13 contingency assessments - check your emails for the official details.",when:"Monday 6th - Friday 17th December",backgroundColor:"#752023",hidden:!0},{eventType:H.CHARITY,title:"Prize Giving",headerURL:"/events/School-Logo.png",description:"A celebration of students' achievements, with a chance to reflect on the past academic year",when:"Friday 3rd December",backgroundColor:"#752023",hidden:!0},{eventType:H.HOUSE,title:"House Quiz",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"Intermediate competition starts Tuesday 15th March 2022",state:"ongoing",currentVictor:"Beaufort",description:"Beaufort win House Quiz for the seniors - but will runner-up Seymour speed past them in the lower years?",backgroundColor:"#CC4545"},{eventType:H.HOUSE,title:"House Rugby",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"started Monday 4th October 2021",state:"ongoing",currentVictor:"Howard",description:"IsItWeekA understands, with just the Seniors left to play, Howard has the lead with Seymour second and Tudor & Beaufort tied for 4th (as of 01/12/21)",backgroundColor:ne},{eventType:H.HOUSE,title:"House Cross Country",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"standards w/c 15th November 2021, final Thursday 2nd December",state:"done",currentVictor:"Howard",backgroundColor:ne},{eventType:H.HOUSE,title:"House Badminton - Seniors & Juniors",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"Wednesday 1st December 2021",state:"done",currentVictor:"Howard",description:"Howard wins House Badminton, after blitzing past the other houses in the Seniors section.",backgroundColor:ne},{eventType:H.HOUSE,title:"House Football",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"w/c 27th September",state:"ongoing",currentVictor:"Howard",description:"Howard wins Senior Football - but will they win overall?",backgroundColor:ne},{eventType:H.CHARITY,title:"Head's Hotseat",headerURL:"/events/School-Logo.png",description:"The chance to give your questions to Mr Bowen!",when:"TBC",backgroundColor:"#752023",hidden:!0},{eventType:H.CHARITY,title:"Year 7, 10 and 12 Photographs",headerURL:"/events/School-Logo.png",description:"The all-important school photographs.",when:"Wednesday 8th September 2021",backgroundColor:"#752023",hidden:!0},{eventType:H.CHARITY,title:"Online Open Evening",headerURL:"/events/School-Logo.png",description:"Open evening - in an online format. There will be a half-day for filming on Thursday 30th September",backgroundColor:"#752023",hidden:!0},{eventType:H.CHARITY,title:"Teacher Training Day",headerURL:"/events/School-Logo.png",description:"A day off school for pupils.",when:"Friday 1st October 2021",backgroundColor:"#752023",hidden:!0},{eventType:H.HOUSE,title:"House Basketball",headerURL:"/events/TMPHouseChampionshipDefault.jpg",dateTime:"w/c 13th December 2021",state:"todo",backgroundColor:te}]},re={events:[{eventType:H.CHARITY,title:"Macmillan Coffee Morning",when:"Friday 1st October",backgroundColor:"#f7f7f7",textColour:"#00754F",headerURL:"/events/Macmillan_Cancer_Support.svg",url:"https://coffee.macmillan.org.uk",cta:{color:"#fff",type:"fill",backgroundColor:"#00754F",text:"more info"},ticketsSale:{start:"01/10/21"},hidden:!0},{eventType:H.CHARITY,title:"Teacher Training Day",headerURL:"/events/School-Logo.png",description:"A day off school for pupils.",when:"Tuesday 4th January 2022",backgroundColor:"#752023",hidden:!0},{eventType:H.CHARITY,title:"Songs from the Shows (Show Choir)",headerURL:"/events/School-Logo.png",description:'A performance of songs from the musicals "Matilda" and "Chicago" by ~100 students, along with acting and dance!',when:"15th & 16th February",backgroundColor:"#752023",hidden:!1},{eventType:H.CHARITY,title:"Year 13 December Mocks",headerURL:"/events/School-Logo.png",description:"Year 13 mock exams.",when:"Monday 6th - Friday 17th December",backgroundColor:"#752023",hidden:!0},{eventType:H.HOUSE,title:"Year 13 House Dance",headerURL:"/events/KECHGTMPHouseChampionshipDefault.jpg",dateTime:"Wednesday 20th October 2021",state:"done",currentVictor:"Lichfield",description:"Lichfield wins the Year 13 House Dance competition, where all houses choreographed a dance to 'Kiss You' by One Direction.",backgroundColor:"#F8F9F4",textColour:"#E70420"},{eventType:H.HOUSE,title:"Year 12 Christmas Quiz",headerURL:"/events/KECHGTMPHouseChampionshipDefault.jpg",dateTime:"Wednesday 15th December 2021",state:"done",currentVictor:"Stratford",description:"Stratford wins the Year 12 House Christmas Quiz, gaining 100 house points, whilst Lichfield places 2nd and Priory 3rd.",textColour:"#6690B3",backgroundColor:"#F8F9F4"},{eventType:H.HOUSE,title:"House Fair",headerURL:"/events/KECHGTMPHouseChampionshipDefault.jpg",dateTime:"Friday 1st April 2022",state:"todo",description:"The House Fair.",backgroundColor:te}],generatedAt:"0"},se=(H.CHARITY,H.FUNDRIASER,H.HOUSE,H.CHARITY,H.HOUSE,H.HOUSE,n(31)),ie=function(){return Object(w.jsxs)("div",{className:"footer",children:[Object(w.jsx)("a",{id:"feedback-buttom",target:"__blank",href:"https://forms.gle/KaS2VUAmZqfS1Nf26",children:Object(w.jsx)(y,{children:"give feedback"})}),Object(w.jsxs)("p",{children:["\xa9 ",(new Date).getFullYear(),", source available on GitHub under the MIT license.",Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),"Data controller information: data controlled by ","a KECH pupil ","and will only ever be viewed by KECH pupils.",Object(w.jsx)("br",{}),"All changes to this site are reviewed, merged and deployed by a KECH pupil.",Object(w.jsx)("br",{}),Object(w.jsx)("br",{}),"Version ",se.version]}),Object(w.jsx)(G,{}),Object(w.jsxs)("div",{className:"outbound-links",children:[Object(w.jsxs)("a",{target:"__blank",href:"https://github.com/Gum-Joe/isitweeka",children:[Object(w.jsx)(M.a,{icon:Y.a}),"\xa0",Object(w.jsx)("u",{children:"GitHub"})]}),Object(w.jsx)("a",{target:"__blank",href:"https://github.com/Gum-Joe/isitweeka/issues",children:Object(w.jsx)("u",{children:"Feature Tracker"})}),Object(w.jsxs)("a",{target:"__blank",href:"mailto:info@isitweeka.com",children:[Object(w.jsx)(M.a,{icon:F.b}),"\xa0",Object(w.jsx)("u",{children:"Email us"})]}),Object(w.jsx)("a",{target:"__blank",href:"/privacy.html",children:Object(w.jsx)("u",{children:"Privacy Policy"})})]})]})},oe={showAlert:!1,alertLevel:R.INFO,message:"Charity Week update: discussions for new dates for events are ongoing."},ce={showAlert:!0,message:"Remember to get your tickets for Songs from the Shows!",alertLevel:R.INFO},le=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).hideCookieConsent=void 0,a.hideCookieConsent=new URLSearchParams(window.location.search).has("autoDeclineCookies"),a}return Object(l.a)(n,[{key:"updateCookie",value:function(e,t){"true"===ee.a.get("CookieConsent")&&(ee.a.set(N,JSON.stringify({school:e,tabIndex:t}),{secure:!0,sameSite:"strict"}),"undefined"!==typeof gtag&&(console.log("Setting to "+e),gtag("set","user_properties",{school:e})))}},{key:"render",value:function(){return Object(w.jsxs)("div",{className:"App",children:[Object(w.jsx)(X,{tabs:[{tab:"KECHB",component:Object(w.jsx)(J,{calendarURL:"/cal/KECHB/basic.ics",iiwaURL:E,weekMarkerDate:1,eventsFetcher:Object(o.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ae);case 1:case"end":return e.stop()}}),e)}))),alertsFetcher:Object(o.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",oe);case 1:case"end":return e.stop()}}),e)})))})},{tab:"KECHG",component:Object(w.jsx)(J,{calendarURL:"/cal/KECHG/basic.ics",iiwaURL:I,weekMarkerDate:0,eventsFetcher:Object(o.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",re);case 1:case"end":return e.stop()}}),e)}))),alertsFetcher:Object(o.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",ce);case 1:case"end":return e.stop()}}),e)})))})}],onTabChange:this.updateCookie,initialTab:function(){var e;return(null===(e=JSON.parse(ee.a.get(N)||"{}"))||void 0===e?void 0:e.tabIndex)||0}()}),Object(w.jsx)(ie,{}),Object(w.jsx)(Z.a,{fixed:"bottom",children:Object(w.jsxs)(f.a,{enableDeclineButton:!0,flipButtons:!0,buttonText:"I understand",declineButtonText:"No thanks",onAccept:function(){j(!1),window.location.reload()},onDecline:function(){j(!0),window.location.reload()},style:this.hideCookieConsent?{display:"none"}:void 0,visible:this.hideCookieConsent?"hidden":"byCookieValue",children:["This website uses cookies for preferences and analytics (via Google Analytics).",Object(w.jsx)("a",{href:"/privacy.html",children:" View Privacy Policy"})]})})]})}}]),n}(a.Component),de=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,58)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),s(e),i(e)}))};i.a.render(Object(w.jsx)(r.a.StrictMode,{children:Object(w.jsx)(le,{})}),document.getElementById("root")),de()}},[[54,1,2]]]);
//# sourceMappingURL=main.deef1502.chunk.js.map