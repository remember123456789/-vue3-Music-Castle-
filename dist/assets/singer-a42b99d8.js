import{_ as p,v,e as h,a as u,x as m,g as o,k as _,q as s,F as g,l as b,m as x,i as S,j as I,A as r,z as n,G as k,H as y}from"./index-16ebe1dd.js";const a=e=>(k("data-v-4f79bb40"),e=e(),y(),e),L={class:"container"},z={class:"container-left"},B={class:"item"},C=a(()=>s("em",{class:"circle"},null,-1)),w={href:"/singer?id=3684",class:"faceImg"},F={class:"el-image"},N=["src"],V={class:"info","data-v-7a5b151f":""},j={class:"info-header","data-v-7a5b151f":""},q={href:"/singer?id=3684",class:"name","data-v-7a5b151f":""},A=a(()=>s("i",{class:"iconfont icon-collect","data-v-7a5b151f":""},null,-1)),D={class:"info-num","data-v-7a5b151f":""},E=a(()=>s("span",{class:"albumSize","data-v-7a5b151f":""},[s("em",{"data-v-7a5b151f":""},"专辑"),n("66")],-1)),G=a(()=>s("span",{class:"musicSize","data-v-7a5b151f":""},[s("em",{"data-v-7a5b151f":""},"单曲"),n("582")],-1)),H={class:"fansSize","data-v-7a5b151f":""},M=a(()=>s("em",{"data-v-7a5b151f":""},"粉丝",-1)),O={__name:"singer",setup(e){let{proxy:d}=v(),c=h({arList:[]});const l=async()=>{let i=await d.$http.getSonger();c.arList=i.artists};return u(()=>{l()}),(i,T)=>{const f=m("router-link");return o(),_("div",L,[s("div",z,[(o(!0),_(g,null,b(x(c).arList,t=>(o(),S(f,{class:"songer-box",to:{name:""}},{default:I(()=>[s("div",B,[C,s("a",w,[s("div",F,[s("img",{src:t.picUrl,class:"el-image__inner"},null,8,N)])]),s("div",V,[s("div",j,[s("a",q,r(t.name),1),A]),s("div",D,[E,G,s("span",H,[M,n(r(t.fansCount),1)])])])])]),_:2},1024))),256))])])}}},$=p(O,[["__scopeId","data-v-4f79bb40"]]);export{$ as default};