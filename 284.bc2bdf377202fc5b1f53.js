"use strict";(self.webpackChunkissue3=self.webpackChunkissue3||[]).push([[284],{9944:(e,a,s)=>{s.d(a,{N:()=>i});const i=e=>null==e?void 0:e.reduce(((e,{name:a,code:s})=>(e.push({label:a,value:s}),e)),[])},981:(e,a,s)=>{s.d(a,{Y:()=>i});const i=e=>{var a;return null===(a=Object.entries(e))||void 0===a?void 0:a.reduce(((e,[a,s])=>(e.push({label:s,value:a}),e)),[])}},5736:(e,a,s)=>{s.d(a,{j:()=>i});const i=e=>{const{firstName:a,lastName:s,driverLicense:i,email:o,model:t,autoCategory:l,city:n}=e,{value:r}=l,{value:d}=t,{value:c}=n;return{status:{code:"DRAFT"},person:{firstName:a,lastName:s,driverLicense:i,email:o},auto:{autoCategory:{code:r},model:{code:d}},city:{code:c}}}},4284:(e,a,s)=>{s.r(a),s.d(a,{default:()=>y});var i=s(4848),o=s(6540),t=s(9785),l=s(1575),n=s(2082),r=s(4555),d=s(4215),c=s(5691),p=s(7183),u=s(981),g=s(1920),v=s(8223),m=s(5736),x=s(5549),j=s(7767),f=s(5749),b=s(9944);const h={page:"nLEN9Vtu",page__loader:"LK8prg3n",pageLoader:"LK8prg3n",page__validation:"Z7tiiWu3",pageValidation:"Z7tiiWu3",page__error:"HwaEdvbw",pageError:"HwaEdvbw",page__success:"EIuRlwUH",pageSuccess:"EIuRlwUH",page__additional:"HZWm6put",pageAdditional:"HZWm6put"};var _=function(e,a,s,i){return new(s||(s=Promise))((function(o,t){function l(e){try{r(i.next(e))}catch(e){t(e)}}function n(e){try{r(i.throw(e))}catch(e){t(e)}}function r(e){var a;e.done?o(e.value):(a=e.value,a instanceof s?a:new s((function(e){e(a)}))).then(l,n)}r((i=i.apply(e,a||[])).next())}))};function y(){var e,a,s,y,N,O,w,C,L,V,A;const{register:E,handleSubmit:S,reset:k,control:H,setValue:K,watch:R,formState:{errors:D,isValid:I}}=(0,t.mN)({mode:"onChange",resolver:(0,l.t)(g.ye)}),[B,{isSuccess:J,error:W,isLoading:Y}]=(0,x.AX)(),[Z,F]=(0,o.useState)([]),P=R("autoCategory"),{citiesDictionary:T,autoCategoriesNamesDictionary:U,autoCategoriesDictionary:z,autoDictionary:G}=(0,p.G)((e=>e.dictionaryReducer));return(0,o.useEffect)((()=>{if(void 0!==P){const e=U[P.value],a=G[e];K("model",{label:"",value:""}),F((0,b.N)(a))}}),[P]),(0,i.jsx)("main",{className:h.page,children:(0,i.jsxs)(n.l,{className:h.page__form,legend:"Создать заявку",name:"new-proposals",submitTitle:"Сохранить",loading:Y,isValid:I,onSubmit:S((e=>_(this,void 0,void 0,(function*(){try{const a=(0,m.j)(e);yield B(a).unwrap()}catch(e){console.log("Запрос выполнен с ошибкой: "+ +e)}k()})))),children:[(0,i.jsx)("p",{className:h.page__validation,children:null===(e=D.root)||void 0===e?void 0:e.message}),(0,i.jsx)(r.p,Object.assign({},E("firstName"),{type:"text",placeholder:"Имя",isValid:void 0===(null===(a=D.firstName)||void 0===a?void 0:a.message)})),(0,i.jsx)("p",{className:h.page__validation,children:null===(s=D.firstName)||void 0===s?void 0:s.message}),(0,i.jsx)(r.p,Object.assign({},E("lastName"),{type:"text",placeholder:"Фамилия",isValid:void 0===(null===(y=D.lastName)||void 0===y?void 0:y.message)})),(0,i.jsx)("p",{className:h.page__validation,children:null===(N=D.lastName)||void 0===N?void 0:N.message}),(0,i.jsx)(r.p,Object.assign({},E("email"),{type:"email",placeholder:"Email",isValid:void 0===(null===(O=D.email)||void 0===O?void 0:O.message)})),(0,i.jsx)("p",{className:h.page__validation,children:null===(w=D.email)||void 0===w?void 0:w.message}),(0,i.jsx)(r.p,Object.assign({},E("driverLicense"),{type:"text",placeholder:"Водительское удостоверение",isValid:void 0===(null===(C=D.driverLicense)||void 0===C?void 0:C.message)})),(0,i.jsx)("p",{className:h.page__validation,children:null===(L=D.driverLicense)||void 0===L?void 0:L.message}),(0,i.jsx)(t.xI,{name:"city",control:H,render:({field:e})=>(0,i.jsx)(d.Ay,Object.assign({},e,{styles:v.K,classNamePrefix:h.page__select,placeholder:"Выберите город",options:(0,u.Y)(T)}))}),(0,i.jsx)(t.xI,{name:"autoCategory",control:H,render:({field:e})=>(0,i.jsx)(d.Ay,Object.assign({},e,{styles:v.K,placeholder:"Выбирите марку автомобиля",options:(0,u.Y)(z)}))}),(0,i.jsx)(t.xI,{name:"model",control:H,render:({field:e})=>(0,i.jsx)(d.Ay,Object.assign({},e,{styles:v.K,placeholder:"Выбирите модель автомобиля",options:Z}))}),(0,i.jsx)("p",{className:h.page__validation,children:null===(A=null===(V=D.model)||void 0===V?void 0:V.label)||void 0===A?void 0:A.message}),Y&&(0,i.jsx)(c.a,{className:h.page__loader}),void 0!==W&&(0,i.jsxs)("p",{className:h.page__error,children:["Запрос выполнен с ошибкой: ",+W]}),J&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("p",{className:h.page__success,children:"Завяка успешно создана!"}),(0,i.jsx)(j.C5,{to:f.AY.proposals,replace:!0})]})]})})}},8223:(e,a,s)=>{s.d(a,{K:()=>i});const i={container:e=>Object.assign(Object.assign({},e),{width:"100%"}),control:e=>Object.assign(Object.assign({},e),{padding:"18px 24px",boxSizing:"border-box",width:"100%",display:"flex",font:"400 16px/24px 'JetBrains', arial, sans-serif",color:"#8585ad",backgroundColor:"var(--color-interface-input)",border:"2px dashed #4c4cff",borderRadius:"40px",boxShadow:"none"}),placeholder:e=>Object.assign(Object.assign({},e),{color:"var(--color-text-primary-light-text)",font:"400 16px/24px 'JetBrains', arial, sans-serif"}),singleValue:e=>Object.assign(Object.assign({},e),{color:"var(--color-text-primary-light-text)",font:"400 16px/24px 'JetBrains', arial, sans-serif"}),menu:e=>Object.assign(Object.assign({},e),{color:"#8585ad",font:"400 16px/24px 'JetBrains', arial, sans-serif",borderRadius:"40px",backgroundColor:"#2f2f37",border:"2px dashed #4c4cff",overflow:"hidden"}),option:e=>Object.assign(Object.assign({},e),{padding:"10px 20px",cursor:"pointer",textAlign:"center",transition:"all .6 ease"})}}}]);