(this.webpackJsonpfridayproject=this.webpackJsonpfridayproject||[]).push([[0],{102:function(e,t,a){e.exports={superInput:"SuperInputText_superInput__1Gc67",errorInput:"SuperInputText_errorInput__2sjb_",error:"SuperInputText_error__1oSiw"}},124:function(e,t,a){},125:function(e,t,a){},148:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(11),s=a.n(c),i=a(7),o=(a(124),a(13)),d=a(14),l=(a(125),a(10)),j=a(67),u=a(95),b=a.n(u).a.create({baseURL:"https://neko-back.herokuapp.com/2.0/",withCredentials:!0}),h=function(e,t,a){return b.post("auth/login",{email:e,password:t,rememberMe:a})},m=function(){return b.post("auth/me")},O=function(e){return b.post("auth/register",e)},p=function(){return b.delete("auth/me")},x=function(e){return b.put("auth/me",e)},f=function(e,t){return b.post("auth/forgot",{email:e,message:t})},v=function(e,t){return b.post("auth/set-new-password",{password:e,resetPasswordToken:t})},g=function(){return b.get("cards/pack")},_=function(e){return b.post("cards/pack",{cardsPack:{name:e}})},w=function(e){return b.delete("cards/pack/?id=".concat(e))},C=function(e,t){return b.put("cards/pack",{cardsPack:{_id:e,name:t}})},P=Object(j.b)({name:"auth",initialState:{isLogged:!1,user:{id:"",email:"",name:"",avatar:""},isRegister:!1,commonError:"",isUpdatedPassword:!1,fogot:!1,isInitialized:!1,updatedUser:{name:"",avatar:""}},reducers:{switchIsRegister:function(e,t){e.isRegister=t.payload.newValueIsRegister},setCommonRegister:function(e,t){e.commonError=t.payload.error},logIn:function(e,t){e.isLogged=t.payload.value},setUser:function(e,t){e.user=t.payload.user},setUpdateUser:function(e,t){e.updatedUser=t.payload.data},setNewPassword:function(e,t){e.isUpdatedPassword=t.payload.isUpPassword},isInitialized:function(e,t){e.isInitialized=t.payload.value},switchFogot:function(e,t){e.fogot=t.payload.newFogot}}}),S=P.reducer,N=P.actions,y=N.switchIsRegister,k=N.setCommonRegister,I=N.logIn,E=N.setUser,A=N.setUpdateUser,L=N.setNewPassword,R=N.isInitialized,U=N.switchFogot,F=a(181),T=a(185),W=a(188),B=a(187),q=a(186),G=a(189),D=a(151),K=a(54),z=a.n(K),M=a(1),Z=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.auth.user.name})),a=Object(i.c)((function(e){return e.auth.user.email})),r=Object(i.c)((function(e){return e.auth.user.avatar})),c=Object(i.c)((function(e){return e.auth.isLogged}));return Object(n.useEffect)((function(){e((function(e){m().then((function(t){var a=t.data,n=a.id,r=a.email,c=a.name,s=a.avatar;e(E({user:{id:n,email:r,name:c,avatar:s}}))}))}))}),[e]),c?Object(M.jsxs)(F.a,{className:z.a.root,children:[Object(M.jsxs)(T.a,{children:[Object(M.jsx)(q.a,{className:z.a.media,image:r,title:"Contemplative Reptile"}),Object(M.jsxs)(B.a,{children:[Object(M.jsxs)(D.a,{gutterBottom:!0,variant:"h5",component:"h2",children:["Name: ",t]}),Object(M.jsxs)(D.a,{gutterBottom:!0,variant:"h5",component:"h2",children:["Email: ",a]}),Object(M.jsx)(D.a,{variant:"body2",color:"textSecondary",component:"p",children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime magnam veritatis suscipit. Dolor, quas iste eveniet et saepe quibusdam expedita nihil incidunt quo odio cum culpa, delectus aliquam earum nemo."})]})]}),Object(M.jsx)(W.a,{children:Object(M.jsx)(G.a,{size:"small",color:"primary",children:"Learn More"})})]}):Object(M.jsx)(d.a,{to:Le.SIGN_IN})},V=function(){return Object(M.jsx)("div",{children:Object(M.jsx)("h1",{})})},H=a(193),J=a(36),$=a(42),Y=a.n($),Q=a(80),X=a.n(Q),ee=function(){var e=Object(i.c)((function(e){return e.auth.fogot})),t=Object(i.c)((function(e){return e.auth.commonError})),a=Object(i.b)(),n=Object(J.a)({initialValues:{email:""},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Email required",t},onSubmit:function(e){a(function(e,t){return function(a){f(e,t).then((function(e){e.data.error?a(k({error:e.data.error})):a(U({newFogot:!0}))})).catch((function(e){var t=e.res?e.res.data.error:e.message+", more details in the console";console.log("Error:",Object(l.a)({},e)),a(k({error:t}))}))}}(e.email,"<div style=\"background-color: lime; padding: 15px\"> \n    password recovery link: <a href='https://tengrix.github.io/fridayproject/#/new-pass/$token$'>Click to here</a></div>")),n.resetForm()}});return e?Object(M.jsxs)("div",{className:Y.a.authBlock,children:[Object(M.jsx)("div",{children:"Checked your email!"}),Object(M.jsx)("div",{children:Object(M.jsx)(o.b,{to:Le.SIGN_IN,children:Object(M.jsx)(G.a,{variant:"outlined",children:Object(M.jsx)(X.a,{})})})})]}):Object(M.jsx)("div",{className:Y.a.authBlock,children:Object(M.jsxs)("form",{onSubmit:n.handleSubmit,className:Y.a.inputBlock,children:[Object(M.jsx)(H.a,{placeholder:"email",name:"email",fullWidth:!0,variant:"outlined",onChange:n.handleChange,value:n.values.email}),Object(M.jsx)(G.a,{type:"submit",variant:"contained",color:"secondary",children:"Send message"}),Object(M.jsx)(o.b,{to:Le.SIGN_IN,children:Object(M.jsx)(G.a,{variant:"outlined",children:Object(M.jsx)(X.a,{})})}),n.errors.email&&Object(M.jsx)("div",{style:{color:"red"},children:n.errors.email}),t&&Object(M.jsx)("div",{style:{color:"red"},children:t})]})})},te=a(50),ae=a(69),ne=a.n(ae),re=function(e){var t=e.red,a=e.className,n=e.type,r=Object(te.a)(e,["red","className","type"]),c="".concat(ne.a.default).concat(t?ne.a.red:ne.a.default," ").concat(a);return Object(M.jsx)(G.a,Object(l.a)(Object(l.a)({type:n,fullWidth:!0,variant:"contained",color:"secondary",className:c},r),{},{children:"Sign In "}))},ce=a(102),se=a.n(ce),ie=function(e){var t=e.type,a=e.onChange,n=e.onChangeText,r=e.onKeyPress,c=e.onEnter,s=e.error,i=(e.className,e.spanClassName),o=e.placeholder,d=Object(te.a)(e,["type","onChange","onChangeText","onKeyPress","onEnter","error","className","spanClassName","placeholder"]),j="".concat(se.a.error," ").concat(i||"");return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(H.a,Object(l.a)({variant:"outlined",margin:"normal",required:!0,fullWidth:!0,label:o,type:t,onChange:function(e){a&&a(e),n&&n(e.currentTarget.value)},onKeyPress:function(e){r&&r(e),c&&"Enter"===e.key&&c()}},d)),s&&Object(M.jsx)("span",{className:j,children:s})]})},oe=a(190),de=a(194),le=a(81),je=a.n(le),ue=function(e){e.type;var t=e.onChange,a=e.onChangeChecked,n=e.className,r=(e.spanClassName,e.children),c=Object(te.a)(e,["type","onChange","onChangeChecked","className","spanClassName","children"]),s="".concat(je.a.checkbox," ").concat(n||"");return Object(M.jsxs)(M.Fragment,{children:[Object(M.jsx)(oe.a,{control:Object(M.jsx)(de.a,Object(l.a)(Object(l.a)({className:s,onChange:function(e){t&&t(e),a&&a(e.currentTarget.checked)}},c),{},{value:"remember",color:"secondary"})),label:"Remember me"}),r&&Object(M.jsx)("span",{className:je.a.spanClassName,children:r})]})},be=a(29),he=a.n(be),me=a(195),Oe=a(192),pe=a(191),xe=a(65),fe=a.n(xe),ve=a(82),ge=a.n(ve);var _e=function(){return Object(M.jsx)(M.Fragment,{children:Object(M.jsx)("div",{className:ge.a.loadPage,children:Object(M.jsx)("div",{className:ge.a.loader,children:Object(M.jsx)("div",{children:Object(M.jsx)("div",{children:Object(M.jsx)("div",{children:Object(M.jsx)("div",{children:Object(M.jsx)("div",{children:Object(M.jsx)("div",{children:Object(M.jsx)("div",{children:Object(M.jsx)("div",{children:Object(M.jsx)("div",{})})})})})})})})})})})})},we=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.auth.isLogged})),a=Object(J.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Email required",e.password?e.password.length<4&&(t.password="Invalid password"):t.password="Password required",t},onSubmit:function(t){var n,r,c;e((n=t.email,r=t.password,c=t.rememberMe,function(e){h(n,r,c).then((function(t){e(I({value:!0}))})).catch((function(t){var a=t.res?t.res.data.error:t.message+", more details in the console";console.log("Error:",Object(l.a)({},t)),e(k({error:a}))})).finally((function(){}))})),a.resetForm()}});return t?Object(M.jsx)(d.a,{to:Le.PROFILE}):Object(M.jsx)("div",{children:t?Object(M.jsx)(_e,{}):Object(M.jsx)(pe.a,{component:"main",maxWidth:"xs",children:Object(M.jsxs)("div",{className:he.a.paper,children:[Object(M.jsx)("div",{className:he.a.avatarConatiner,children:Object(M.jsx)(me.a,{className:he.a.avatar,children:Object(M.jsx)(fe.a,{})})}),Object(M.jsx)("div",{className:he.a.typographyContainer,children:Object(M.jsx)(D.a,{component:"h1",variant:"h5",children:"Sign In"})}),Object(M.jsxs)("form",{onSubmit:a.handleSubmit,className:he.a.form,noValidate:!0,children:[Object(M.jsx)(ie,Object(l.a)({placeholder:"Username or email",type:"email"},a.getFieldProps("email"))),a.touched.email&&a.errors.email&&Object(M.jsx)("div",{style:{color:"red"},children:a.errors.email}),Object(M.jsx)(ie,Object(l.a)({placeholder:"Password",type:"password"},a.getFieldProps("password"))),a.touched.password&&a.errors.password&&Object(M.jsx)("div",{style:{color:"red"},children:a.errors.password}),Object(M.jsx)(ue,Object(l.a)({type:"rememberMe"},a.getFieldProps("rememberMe"))),Object(M.jsx)(re,{type:"submit"}),Object(M.jsx)(Oe.a,{container:!0,children:Object(M.jsxs)(Oe.a,{item:!0,xs:!0,children:[Object(M.jsx)(o.b,{to:Le.RENEWAL_PASS,children:Object(M.jsx)(G.a,{fullWidth:!0,variant:"outlined",children:Object(M.jsx)("span",{children:"Forgot password"})})}),Object(M.jsx)(o.b,{to:Le.SIGN_UP,children:Object(M.jsx)(G.a,{fullWidth:!0,variant:"outlined",children:"Don't have an account? Sign Up"})})]})})]})]})})})},Ce=function(){var e=Object(i.c)((function(e){return e.auth.isRegister})),t=Object(i.c)((function(e){return e.auth.commonError})),a=Object(i.b)(),n=function(e,t){a(function(e,t){var a={email:e,password:t};return function(e){O(a).then((function(t){t.data.addedUser?e(y({newValueIsRegister:!0})):e(k({error:t.data.error}))})).catch((function(t){var a=t.res?t.res.data.error:t.message+", more details in the console";console.log("Error:",Object(l.a)({},t)),e(k(a))}))}}(e,t))},r=Object(J.a)({initialValues:{email:"",password:"",confPass:""},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Email required",e.password?e.password.length<7&&(t.password="Password should be longer 7 symbols"):t.password="Password required",e.password!==e.confPass&&(t.password="Password not identical"),t},onSubmit:function(e){r.resetForm(),n(e.email,e.password)}});return e?Object(M.jsx)(d.a,{to:"/sign-in"}):Object(M.jsx)(pe.a,{component:"main",maxWidth:"xs",children:Object(M.jsxs)("div",{className:he.a.paper,children:[Object(M.jsx)("div",{className:he.a.avatarConatiner,children:Object(M.jsx)(me.a,{className:he.a.avatar,children:Object(M.jsx)(fe.a,{})})}),Object(M.jsx)("div",{className:he.a.typographyContainer,children:Object(M.jsx)(D.a,{component:"h1",variant:"h5",children:"Sign Up"})}),Object(M.jsxs)("form",{onSubmit:r.handleSubmit,className:he.a.form,noValidate:!0,children:[Object(M.jsx)(H.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,placeholder:"Email",name:"email",onChange:r.handleChange,value:r.values.email}),r.touched.email&&r.errors.email&&Object(M.jsx)("div",{style:{color:"red"},children:r.errors.email}),Object(M.jsx)(H.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,placeholder:"Password",name:"password",type:"password",onChange:r.handleChange,value:r.values.password}),Object(M.jsx)(H.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,placeholder:"Confirm password:",name:"confPass",type:"password",onChange:r.handleChange,value:r.values.confPass}),r.errors.password&&Object(M.jsx)("div",{style:{color:"red"},children:r.errors.password}),Object(M.jsx)(G.a,{fullWidth:!0,variant:"contained",color:"secondary",children:"Sign Up"}),Object(M.jsx)("div",{style:{color:"red"},children:t}),Object(M.jsx)(Oe.a,{container:!0,children:Object(M.jsx)(Oe.a,{item:!0,xs:!0,children:Object(M.jsx)(o.b,{to:Le.SIGN_IN,children:Object(M.jsx)(G.a,{fullWidth:!0,variant:"outlined",children:"Sign In"})})})})]})]})})},Pe=function(){var e=Object(i.c)((function(e){return e.auth.isUpdatedPassword})),t=Object(i.c)((function(e){return e.auth.commonError})),a=Object(i.b)(),n=Object(d.g)().token,r=Object(J.a)({initialValues:{password:"",confPass:""},validate:function(e){var t={};return e.password.length<7&&(t.password="Password should be longer 7 symbols"),e.password!==e.confPass&&(t.password="Password not identical"),t},onSubmit:function(e){var t,c;a((t=e.password,c=n,function(e){v(t,c).then((function(t){t.data.error?e(k({error:t.data.error})):e(L({isUpPassword:!0}))})).catch((function(t){var a=t.res?t.res.data.error:t.message+", more details in the console";console.log("Error:",Object(l.a)({},t)),e(k({error:a}))}))})),r.resetForm()}});return e?Object(M.jsx)(d.a,{to:"/sign-in"}):Object(M.jsx)("div",{className:Y.a.authBlock,children:Object(M.jsxs)("form",{onSubmit:r.handleSubmit,className:Y.a.inputBlock,children:[Object(M.jsx)(H.a,{variant:"outlined",placeholder:"Password:",name:"password",type:"password",onChange:r.handleChange,value:r.values.password}),Object(M.jsx)(H.a,{variant:"outlined",placeholder:"Confirm password:",name:"confPass",type:"password",onChange:r.handleChange,value:r.values.confPass}),r.errors.password&&Object(M.jsx)("div",{style:{color:"red"},children:r.errors.password}),Object(M.jsx)(G.a,{variant:"contained",color:"secondary",type:"submit",children:"Change password"}),Object(M.jsx)("div",{style:{color:"red"},children:t})]})})},Se=a(56),Ne=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.auth.user.name})),a=Object(i.c)((function(e){return e.auth.user.avatar})),r=Object(n.useState)(t),c=Object(Se.a)(r,2),s=c[0],o=c[1],d=Object(n.useState)(a),j=Object(Se.a)(d,2),u=j[0],b=j[1],h={name:s,avatar:u};return Object(M.jsxs)("div",{className:z.a.updateProfile,children:[Object(M.jsx)(H.a,{placeholder:"New name",value:s,type:"text",onChange:function(e){o(e.currentTarget.value)}}),Object(M.jsx)(H.a,{placeholder:"New URL for Ava",value:u,type:"text",onChange:function(e){b(e.currentTarget.value)}}),Object(M.jsx)(G.a,{variant:"contained",color:"primary",onClick:function(){var t;e((t=h,function(e){x(t).then((function(a){e(A({data:t}))})).finally((function(){console.log("check profile")})).catch((function(t){var a=t.res?t.res.data.error:t.message+", more details in the console";console.log("Error:",Object(l.a)({},t)),e(k({error:a}))}))}))},children:"Submit"})]})},ye=function(){return Object(i.c)((function(e){return e.auth.isLogged}))?Object(M.jsxs)("div",{children:[Object(M.jsxs)("table",{cellPadding:"7",width:"100%",children:[Object(M.jsxs)("tr",{children:[Object(M.jsx)("th",{children:"Qustion"}),Object(M.jsx)("th",{children:"Answer"}),Object(M.jsx)("th",{children:"Grade"}),Object(M.jsx)("th",{children:"Updated"}),Object(M.jsx)("th",{children:Object(M.jsx)("button",{children:"add card"})})]}),[{answer:"fgdfgdgd efgdf df",question:"sgdsgg?",cardsPack_id:"no name",grade:4.98,shots:1,user_id:"1",created:"1",updated:"1",_id:"1"},{answer:"fgdfgdgd efgdf df",question:"sgdsgg?",cardsPack_id:"no name",grade:4.98,shots:1,user_id:"1",created:"1",updated:"1",_id:"2"},{answer:"fgdfgdgd efgdf df",question:"sgdsgg?",cardsPack_id:"no name",grade:4.98,shots:1,user_id:"1",created:"1",updated:"1",_id:"3"}].map((function(e){return Object(M.jsxs)("tr",{children:[Object(M.jsx)("td",{align:"center",children:e.question}),Object(M.jsx)("td",{align:"center",children:e.answer}),Object(M.jsx)("td",{align:"center",children:e.grade}),Object(M.jsx)("td",{align:"center",children:e.updated}),Object(M.jsx)("td",{align:"center",children:Object(M.jsx)("button",{children:"show answer"})})]})}))]}),Object(M.jsx)("div",{children:"1,2,3,4...5"})]}):Object(M.jsx)(d.a,{to:"/sign-in"})},ke={cardPacks:[{name:"HELLO",_id:"",user_id:"",cardsCount:5}],cardPacksTotalCount:14,maxCardsCount:4,minCardsCount:1,page:0,pageCount:4},Ie=function(){return function(e){g().then((function(t){e({type:"GET-CARDS-PACK",cardPacks:t.data.cardPacks})})).catch((function(t){var a=t.res?t.res.data.error:t.message+", more details in the console";console.log("Error:",Object(l.a)({},t)),e(k(a))}))}},Ee=function(e){var t=Object(i.b)(),a=Object(n.useState)(""),r=Object(Se.a)(a,2);r[0],r[1];Object(n.useEffect)((function(){t(Ie())}),[]);return Object(M.jsxs)("tr",{children:[Object(M.jsx)("td",{align:"center",children:e.cardsPack.name}),Object(M.jsx)("td",{align:"center",children:e.cardsPack.cardsCount}),Object(M.jsx)("td",{align:"center",children:e.cardsPack.created}),Object(M.jsx)("td",{align:"center",children:e.cardsPack.updated}),Object(M.jsxs)("td",{align:"center",children:[Object(M.jsx)("button",{children:"learn"}),Object(M.jsx)("button",{children:"update"}),Object(M.jsx)("button",{children:"delete"})]})]})},Ae=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.cardsPack.cardPacks})),a=function(t,a){var n,r;e((n=a,r=t,function(e){C(n,r).then((function(t){e(Ie())}))}))},r=Object(n.useCallback)((function(t){var a;e((a=t,function(e,t){_(a).then((function(t){e(Ie())})).catch((function(e){e.res?e.res.data.error:e.message,console.log("Error:",Object(l.a)({},e))}))}))}),[e]),c=function(t){e(function(e){return function(t){w(e).then((function(){t(Ie())}))}}(t))};return Object(M.jsxs)("div",{children:[Object(M.jsxs)("div",{children:["Search: ",Object(M.jsx)("input",{placeholder:"cards name"}),Object(M.jsx)("input",{type:"range",max:"100",min:"0",value:"75"}),Object(M.jsx)("input",{type:"range",max:"100",min:"0",value:"25"}),Object(M.jsx)("button",{children:"Search"})]}),Object(M.jsxs)("table",{cellPadding:"7",width:"100%",children:[Object(M.jsxs)("tr",{children:[Object(M.jsx)("th",{children:"Card name"}),Object(M.jsxs)("th",{children:["Cards count",Object(M.jsx)("input",{type:"button",value:"Max"}),Object(M.jsx)("input",{type:"button",value:"Min"})]}),Object(M.jsx)("th",{children:"Created"}),Object(M.jsx)("th",{children:"Updated"}),Object(M.jsx)("th",{children:"Control"})]}),t.map((function(e){return Object(M.jsx)(Ee,{cardsPack:e,newCardPack:r,delPack:c,updateTitle:a},e._id)}))]})]})},Le={PROFILE:"/profile",SIGN_IN:"/sign-in",SIGN_UP:"/sign-up",NEW_PASS:"/new-pass/:token?",RENEWAL_PASS:"/renewal-pass",ERROR:"/404",UPDATE_USER:"/update-user",PACKS:"/packs",CARDS:"/cards",PACKS_RAW:"/packs-raw"},Re=function(){return Object(M.jsx)("div",{children:Object(M.jsxs)(d.d,{children:[Object(M.jsx)(d.b,{path:"/",exact:!0,component:Z}),Object(M.jsx)(d.b,{path:Le.PROFILE,component:Z}),Object(M.jsx)(d.b,{path:Le.PROFILE,component:V}),Object(M.jsx)(d.b,{path:Le.SIGN_IN,component:we}),Object(M.jsx)(d.b,{path:Le.SIGN_UP,component:Ce}),Object(M.jsx)(d.b,{path:Le.NEW_PASS,component:Pe}),Object(M.jsx)(d.b,{path:Le.RENEWAL_PASS,component:ee}),Object(M.jsx)(d.b,{path:Le.UPDATE_USER,component:Ne}),Object(M.jsx)(d.b,{path:Le.PACKS,component:Ae}),Object(M.jsx)(d.b,{path:Le.CARDS,component:ye}),Object(M.jsx)(d.b,{path:Le.PACKS_RAW,component:Ee}),Object(M.jsx)(d.b,{path:"/404",render:function(){return Object(M.jsx)("h1",{children:"404:PAGE NOT FOUND"})}}),Object(M.jsx)(d.a,{from:"*",to:Le.ERROR})]})})},Ue=a(20),Fe=a.n(Ue),Te=a(103),We=a.n(Te),Be=function(){var e=Object(i.b)(),t=Object(n.useCallback)((function(){e((function(e){p().then((function(t){t.data.info&&e(I({value:!1}))})).catch((function(t){var a=t.res?t.res.data.error:t.message+", more details in the console";console.log("Error:",Object(l.a)({},t)),e(k({error:a}))}))}))}),[e]);return Object(M.jsx)("div",{children:Object(M.jsxs)(G.a,{variant:"contained",color:"secondary",onClick:t,children:["Logout",Object(M.jsx)(We.a,{})]})})},qe=a(57),Ge=a.n(qe),De=a(70),Ke=a.n(De),ze=a(104),Me=a.n(ze);var Ze=function(){var e=Object(i.c)((function(e){return e.auth.isLogged}));return Object(M.jsx)(M.Fragment,{children:e&&Object(M.jsxs)("nav",{className:Fe.a.nav,children:[Object(M.jsx)("div",{children:Object(M.jsx)(o.b,{to:Le.PROFILE,replace:!0,children:Object(M.jsx)(me.a,{children:Object(M.jsx)(Ge.a,{})})})}),Object(M.jsxs)("div",{className:Fe.a.headerLink,children:[Object(M.jsx)("div",{className:Fe.a.item,children:Object(M.jsx)(o.b,{to:Le.PROFILE,activeClassName:Fe.a.activeLink,replace:!0,children:Object(M.jsxs)(G.a,{variant:"outlined",children:[Object(M.jsx)(Ge.a,{}),"My Profile"," "]})})}),Object(M.jsx)("div",{className:Fe.a.item,children:Object(M.jsx)(o.b,{to:Le.PACKS,activeClassName:Fe.a.activeLink,replace:!0,children:Object(M.jsxs)(G.a,{variant:"outlined",children:[Object(M.jsx)(Ge.a,{}),"Packs"]})})}),Object(M.jsx)("div",{className:Fe.a.item,children:Object(M.jsx)(o.b,{to:Le.CARDS,activeClassName:Fe.a.activeLink,replace:!0,children:Object(M.jsxs)(G.a,{variant:"outlined",children:[Object(M.jsx)(Ge.a,{}),"Cards"]})})}),Object(M.jsx)("div",{className:Fe.a.item,children:Object(M.jsx)(o.b,{to:Le.NEW_PASS,activeClassName:Fe.a.activeLink,replace:!0,children:Object(M.jsxs)(G.a,{variant:"outlined",children:[Object(M.jsx)(Me.a,{}),"New Password"]})})}),Object(M.jsx)("div",{className:Fe.a.item,children:Object(M.jsx)(o.b,{to:Le.UPDATE_USER,activeClassName:Fe.a.activeLink,replace:!0,children:Object(M.jsxs)(G.a,{variant:"outlined",children:[Object(M.jsx)(Ke.a,{})," Settings"," "]})})}),Object(M.jsx)("div",{className:Fe.a.item,children:Object(M.jsx)(o.b,{to:Le.PACKS,activeClassName:Fe.a.activeLink,replace:!0,children:Object(M.jsxs)(G.a,{variant:"outlined",children:[Object(M.jsx)(Ke.a,{})," PACKS"," "]})})}),Object(M.jsx)("div",{className:Fe.a.item,children:Object(M.jsx)(o.b,{to:Le.PACKS_RAW,activeClassName:Fe.a.activeLink,replace:!0,children:Object(M.jsxs)(G.a,{variant:"outlined",children:[Object(M.jsx)(Ke.a,{})," PACKS-RAW"," "]})})}),Object(M.jsx)(Be,{})]})]})})};var Ve=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.auth.isInitialized})),a=Object(i.c)((function(e){return e.auth.isLogged}));return Object(n.useEffect)((function(){e((function(e){m().then((function(t){e(I({value:!0}))})).catch((function(){})).finally((function(){e(R({value:!0}))}))}))}),[]),t?Object(M.jsxs)(o.a,{children:[!a&&Object(M.jsx)(d.a,{to:Le.SIGN_IN}),Object(M.jsxs)("div",{className:"mainPage",children:[Object(M.jsx)(Ze,{}),Object(M.jsx)(Re,{})]})]}):Object(M.jsx)(_e,{})},He=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,197)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),c(e),s(e)}))},Je=a(28),$e=a(53),Ye=Object(Je.b)({auth:S,cardsPack:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ke,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET-CARDS-PACK":return Object(l.a)(Object(l.a)({},e),{},{cardPacks:t.cardPacks});case"GET-CARD":default:return Object(l.a)({},e)}}}),Qe=Object(j.a)({reducer:Ye,middleware:function(e){return e().prepend($e.a)}});window.store=Qe;var Xe=Qe;s.a.render(Object(M.jsx)(r.a.StrictMode,{children:Object(M.jsx)(i.a,{store:Xe,children:Object(M.jsx)(Ve,{})})}),document.getElementById("root")),He()},20:function(e,t,a){e.exports={nav:"Header_nav__1BzxD",item:"Header_item__1Kwze",activeLink:"Header_activeLink__DiCTj",headerLink:"Header_headerLink__3zD2_"}},29:function(e,t,a){e.exports={paper:"SignIn_paper__3UzwU",avatarConatiner:"SignIn_avatarConatiner__2ch1G",avatar:"SignIn_avatar__1t8EG",typographyContainer:"SignIn_typographyContainer__31MH1",form:"SignIn_form__1qcJ5"}},42:function(e,t,a){e.exports={authBlock:"CommonStylesForAuth_authBlock__15zKS",inputBlock:"CommonStylesForAuth_inputBlock__20tX8"}},54:function(e,t,a){e.exports={root:"Profile_root__3tTyy",media:"Profile_media__UVu6J",updateProfile:"Profile_updateProfile__1zJUr"}},69:function(e,t,a){e.exports={default:"SuperButton_default__18Len",red:"SuperButton_red__3BY6U",button:"SuperButton_button__1Ymxf",blink:"SuperButton_blink__3T8lZ"}},81:function(e,t,a){e.exports={checkbox:"SuperCheckbox_checkbox__2dgcj",spanClassName:"SuperCheckbox_spanClassName__3r9pY"}},82:function(e,t,a){e.exports={loadPage:"Loading_loadPage__2KB7b",loader:"Loading_loader__2_ZAn",rotate:"Loading_rotate__24D8Z"}}},[[148,1,2]]]);
//# sourceMappingURL=main.a10a112a.chunk.js.map