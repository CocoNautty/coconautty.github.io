import{j as e,I as V,A as q,r as n}from"./vendor-DUH9f-n-.js";import{S as U,O as J,W as K,D as Q,M as Z,a as B,I as ee,V as te}from"./three-CQxPM2B4.js";const ne="_header_16mr5_2",ie="_title_16mr5_15",oe="_subtitle_16mr5_29",re="_shortdescription_16mr5_43",se="_jumplinks_16mr5_49",ae="_jumplinklist_16mr5_58",ce="_jumplinkitem_16mr5_65",le="_navindicator_16mr5_72",de="_navtext_16mr5_91",ue="_sociallinks_16mr5_105",he="_sociallinkitem_16mr5_114",me="_sociallinkicon_16mr5_120",pe="_sociallinkindicator_16mr5_128",o={header:ne,title:ie,subtitle:oe,shortdescription:re,jumplinks:se,jumplinklist:ae,jumplinkitem:ce,navindicator:le,navtext:de,sociallinks:ue,sociallinkitem:he,sociallinkicon:me,sociallinkindicator:pe},Ie=()=>{const c=[{href:"#about",text:"About"},{href:"#experience",text:"Experiences"},{href:"#projects",text:"Projects"}],d=({href:t,text:h})=>e.jsx("li",{children:e.jsxs("a",{className:o.jumplinkitem,href:t,children:[e.jsx("span",{className:o.navindicator}),e.jsx("span",{className:o.navtext,children:h})]})}),x=[{title:"github",icon:e.jsx(q,{}),link:"https://github.com/CocoNautty"}],u=({title:t,icon:h,link:r})=>e.jsx("li",{className:o.sociallinkitem,title:t,children:e.jsxs("a",{href:r,target:"_blank",rel:"noopener noreferrer","aria-label":"Github (opens in a new tab)",children:[e.jsx("span",{className:o.sociallinkindicator,children:"Github"}),h]})});return e.jsxs("header",{className:o.header,children:[e.jsxs("div",{children:[e.jsx("a",{href:"/",children:e.jsx("h1",{className:o.title,children:"Yixuan Chen (陈奕煊)"})}),e.jsx("h2",{className:o.subtitle,children:"MSI Student in UMich"}),e.jsx("p",{className:o.shortdescription,children:"I learn, I code, I build. I put things together and make them work."}),e.jsx("nav",{className:o.jumplinks,"aria-label":"In-page jump links",children:e.jsx("ul",{className:o.jumplinklist,children:c.map(t=>e.jsx(d,{href:t.href,text:t.text},t.href))})})]}),e.jsx("ul",{className:o.sociallinks,children:e.jsx(V.Provider,{value:{className:o.sociallinkicon},children:x.map(t=>e.jsx(u,{title:t.title,icon:t.icon,link:t.link},t.title))})})]})},fe="_sectiontitle_pkgss_1",ge={sectiontitle:fe},xe="_sectioncontainer_1ysaj_1",be="_titlecontainer_1ysaj_17",we="_notPinned_1ysaj_31",ye="_Pinned_1ysaj_34",ve="_wordblock_1ysaj_70",j={sectioncontainer:xe,titlecontainer:be,notPinned:we,Pinned:ye,wordblock:ve},ke=({id:c,children:d})=>e.jsx("section",{id:c,className:j.sectioncontainer,children:d}),je=({children:c})=>{const[d,x]=n.useState(!1),u=n.useRef(null),[t,h]=n.useState(window.innerWidth);return n.useEffect(()=>{const r=()=>{if(u.current){const s=window.innerWidth,b=window.getComputedStyle(u.current),{top:w}=u.current.getBoundingClientRect();s===t?x(w<=0):(x(w<=0&&b.opacity!=="0"),h(s))}};return window.addEventListener("scroll",r),window.addEventListener("resize",r),()=>{window.removeEventListener("scroll",r),window.removeEventListener("resize",r)}},[]),e.jsx("div",{ref:u,className:`${j.titlecontainer} ${d?j.Pinned:j.notPinned}`,children:c})},l=({children:c})=>e.jsx("p",{className:j.wordblock,children:c}),Se=()=>e.jsxs(ke,{id:"About",children:[e.jsx(je,{children:e.jsx("h2",{className:ge.sectiontitle,children:"About"})}),e.jsxs("div",{children:[e.jsx(l,{children:"I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability."}),e.jsx(l,{children:"I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability."}),e.jsx(l,{children:"I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability."}),e.jsx(l,{children:"I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability."}),e.jsx(l,{children:"I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability."}),e.jsx(l,{children:"I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability."}),e.jsx(l,{children:"I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability."}),e.jsx(l,{children:"I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability."}),e.jsx(l,{children:"I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability."}),e.jsx(l,{children:"I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability."})]})]}),ze=({scrollableheight:c})=>{const d=n.useRef(null),x=n.useRef(null),u=n.useRef(null),t=n.useRef(null),h=n.useRef(null),r=n.useRef(!1),s=n.useRef({x:0,y:0,z:0}),b=n.useRef({x:0,y:0,z:0}),w=n.useRef({x:0,y:0}),_=n.useRef(1);return n.useEffect(()=>{const R=window.matchMedia("(prefers-reduced-motion: reduce)").matches,M=new U;let m=window.innerWidth,y=window.innerHeight;const $=m/y;let v=5;const S=v/$,i=new J(-v,v,S,-S,.1,1e3),p=new K({alpha:!0,antialias:!0});p.setSize(m,y),p.setPixelRatio(window.devicePixelRatio),d.current.appendChild(p.domElement);const z=a=>new ee(a),N=a=>Math.max(999/a,1);_.current=N(m);const F=new Q(5,1),X=z(_.current),E=new Z({color:11184810,wireframe:!0}),k=new B(F,E),f=new B(X,E);M.add(k),M.add(f);const P=()=>{const a=window.scrollY;i.position.y=-a*y*.01/c,i.position.x=-a*m*.005/c};i.position.set(0,0,10),P();let A=new te(2,6,0);i.lookAt(A),f.position.set(5.5,8,1),x.current=i,u.current=p,t.current=M;const C=()=>{s.current={x:(Math.random()-.5)*.003,y:(Math.random()-.5)*.003,z:(Math.random()-.5)*.003}},L=()=>{s.current={x:0,y:0,z:0}},W=()=>{b.current={x:(Math.random()-.5)*.01,y:(Math.random()-.5)*.01,z:(Math.random()-.5)*.01}};W(),C();const H=()=>{R||(f.rotation.x-=(b.current.x-s.current.x)*.1,f.rotation.y-=(b.current.y-s.current.y)*.1,f.rotation.z-=(b.current.z-s.current.z)*.1,r.current||(k.rotation.x+=s.current.x,k.rotation.y+=s.current.y,k.rotation.z+=s.current.z),p.render(M,i),h.current=requestAnimationFrame(H))};R||H();const D=setInterval(()=>{W()},2e3),T=a=>{if(r.current=!0,!R){L();const g={x:a.clientX,y:a.clientY},I=g.x-w.current.x,O=g.y-w.current.y;k.rotation.x-=O*3e-4,k.rotation.y-=I*3e-4,w.current=g,L()}clearTimeout(r.current),r.current=setTimeout(()=>{r.current=!1,C()},10)},G=()=>{R||(P(),console.log("Camera position: ",i.position),i.lookAt(A))},Y=()=>{m=window.innerWidth,y=window.innerHeight;const a=m/y,g=v/a;i.left=-v,i.right=v,i.top=g,i.bottom=-g,i.updateProjectionMatrix(),p.setSize(m,y),_.current=N(m);const I=z(_.current);f.geometry.dispose(),f.geometry=I};return window.addEventListener("mousemove",T),window.addEventListener("scroll",G),window.addEventListener("resize",Y),()=>{clearInterval(D),window.removeEventListener("mousemove",T),window.removeEventListener("scroll",G),window.removeEventListener("resize",Y),cancelAnimationFrame(h.current),d.current.removeChild(p.domElement)}},[]),e.jsx("div",{ref:d,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:-1}})};export{Se as A,Ie as H,ze as T};
