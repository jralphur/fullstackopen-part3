(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},36:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(13),c=n.n(u),o=n(2),l=function(e){var t=e.newName,n=e.newNumber,a=e.handleNameChange,u=e.handleSubmit,c=e.handleNumberChange;return r.a.createElement("form",{onSubmit:u},r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:a,value:t})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{onChange:c,value:n})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=function(e){var t=e.filterResults,n=e.setFilter;return r.a.createElement("div",null,"filter shown with",r.a.createElement("input",{onChange:function(e){n(e.target.value)},value:t}))},i=function(e){var t=e.filterResults,n=e.persons,a=e.handleNumberDelete;return r.a.createElement("ul",null,n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return r.a.createElement("li",{key:e.id}," ",e.name," ",e.number,r.a.createElement("button",{onClick:function(t){return a(e.id)}},"delete"))})))},m=function(e){var t=e.className,n=e.message;if(!n)return r.a.createElement(r.a.Fragment,null);var a="status ".concat(t);return r.a.createElement("h2",{className:a},n)},f=n(3),d=n.n(f),h="/api/persons",b=function(e){return d.a.post(h,e).then((function(e){return e.data}))},p=function(){return d.a.get(h).then((function(e){return e.data}))},g=function(e){return d.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},E=function(e,t){return d.a.put("".concat(h,"/").concat(e),t).then((function(e){return e.data}))},v=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],u=t[1],c=Object(a.useState)(""),f=Object(o.a)(c,2),d=f[0],h=f[1],v=Object(a.useState)(""),w=Object(o.a)(v,2),N=w[0],C=w[1],j=Object(a.useState)(""),O=Object(o.a)(j,2),y=O[0],S=O[1],k=Object(a.useState)({message:"",class:""}),R=Object(o.a)(k,2),x=R[0],D=R[1];return Object(a.useEffect)((function(){p().then((function(e){return u(e)}))}),[]),r.a.createElement("div",null,r.a.createElement(m,{className:x.class,message:x.message}),r.a.createElement("h1",null,"Phonebook"),r.a.createElement(s,{filterResults:d,setFilter:h}),r.a.createElement("h2",null,"add a new"),r.a.createElement(l,{newName:N,newNumber:y,setNewNumber:S,handleNameChange:function(e){C(e.target.value)},handleSubmit:function(e){e.preventDefault();var t=n.findIndex((function(e){return e.name.toUpperCase()===N.toUpperCase()})),a={name:N,number:y};if(-1===t)b(a).then((function(e){u(n.concat(e)),D({message:"Successfully added ".concat(N," to the phonebook")}),C(""),S("")})).catch((function(e){console.log("error:\n",e.response.data.error),D({message:e.response.data.error,error:"error"}),setTimeout((function(){return D({message:"",class:""})}),5e3)}));else{var r=n[t],c=r.name,o=r.id;window.confirm("".concat(c," is already in the phonebook, replace the old number with a new one?"))&&E(o,a).then((function(e){u(n.map((function(t){return t.id!==o?t:e}))),D({message:"Successfully updated ".concat(c," into the database"),class:"success"}),setTimeout((function(){return D({message:"",class:""})}),1e3)})).catch((function(e){return D({message:e.response.data,class:"error"})}))}},handleNumberChange:function(e){S(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(i,{filterResults:d,persons:n,handleNumberDelete:function(e){var t=n.find((function(t){return t.id===e}));void 0!==t?window.confirm("Are you sure you want to delete ".concat(t.name,"?"))&&g(e).then((function(t){u(n.filter((function(t){return t.id!==e}))),C(""),S("")})).catch((function(a){D({message:"".concat(t.name," is already deleted, or doesn't exist"),class:"error"}),u(n.filter((function(t){return t.id!==e}))),setTimeout((function(){return D({message:"",class:""})}),5e3)})):console.log("not available locally!")}}))};n(36);c.a.render(r.a.createElement(v,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.c61afaf0.chunk.js.map