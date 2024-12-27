import{r as c,j as e,I as Se,A as Le,B as xe,l as Ce}from"./vendor-7vbCxL8o.js";import{S as Te,O as ze,W as Ae,I as Me,a as Ie,B as de,E as C,D as Be,G as We,M as Ge,V as g,C as me,b as He}from"./three-CxVmGKO2.js";import{a as Ue,c as Ye}from"./index-D8cjrhYJ.js";const De="_header_kmmfp_2",Ve="_title_kmmfp_15",qe="_subtitle_kmmfp_29",Fe="_shortdescription_kmmfp_43",Je="_jumplinks_kmmfp_49",Oe="_jumplinklist_kmmfp_58",Xe="_navindicator_kmmfp_65",Ze="_navtext_kmmfp_78",Ke="_jumplinkitem_kmmfp_87",Qe="_active_kmmfp_94",et="_current_kmmfp_103",tt="_sociallinks_kmmfp_111",nt="_sociallinkitem_kmmfp_120",it="_sociallinkicon_kmmfp_126",rt="_sociallinkindicator_kmmfp_134",l={header:De,title:Ve,subtitle:qe,shortdescription:Fe,jumplinks:Je,jumplinklist:Oe,navindicator:Xe,navtext:Ze,jumplinkitem:Ke,active:Qe,current:et,sociallinks:tt,sociallinkitem:nt,sociallinkicon:it,sociallinkindicator:rt},hn=()=>{const[n,r]=c.useState("About"),m=[{href:"#About",text:"About"},{href:"#Experience",text:"Experience"},{href:"#Projects",text:"Projects"}],k=()=>{for(let t=m.length-1;t>=0;t--){const o=document.getElementById(m[t].text);if(o){const y=o.getBoundingClientRect();if(y.top<=120&&y.bottom>=120){r(m[t].text);break}}}};c.useEffect(()=>{const t=()=>{k()};return window.addEventListener("scroll",t,{passive:!0}),()=>{window.removeEventListener("scroll",t)}},[]);const v=({href:t,text:o,isActive:y})=>{const u=P=>{const b=document.getElementById(P);if(b){const d=b.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:d,behavior:"smooth"})}};return e.jsx("li",{onClick:()=>u(o),children:e.jsxs("a",{className:`${l.jumplinkitem} ${n===o?l.active:""}`,children:[e.jsx("span",{className:l.navindicator}),e.jsx("span",{className:l.navtext,children:o})]})})},E=[{title:"github",icon:e.jsx(Le,{}),link:"https://github.com/CocoNautty"}],f=({title:t,icon:o,link:y})=>e.jsx("li",{className:l.sociallinkitem,title:t,children:e.jsxs("a",{href:y,target:"_blank",rel:"noopener noreferrer","aria-label":"Github (opens in a new tab)",style:{paddingTop:"10px"},children:[e.jsx("span",{className:l.sociallinkindicator,children:"Github"}),o]})});return e.jsxs("header",{className:l.header,children:[e.jsxs("div",{children:[e.jsx("a",{href:"/",children:e.jsx("h1",{className:l.title,children:"Yixuan Chen (陈奕煊)"})}),e.jsx("h2",{className:l.subtitle,children:"MSI Student in UMich"}),e.jsx("p",{className:l.shortdescription,children:"I learn, I code, I build. I put things together and make them work."}),e.jsx("nav",{className:l.jumplinks,"aria-label":"In-page jump links",children:e.jsx("ul",{className:l.jumplinklist,children:m.map(t=>e.jsx(v,{href:t.href,text:t.text},t.text))})})]}),e.jsx("ul",{className:l.sociallinks,children:e.jsx(Se.Provider,{value:{className:l.sociallinkicon},children:E.map(t=>e.jsx(f,{title:t.title,icon:t.icon,link:t.link},t.title))})})]})},st="_sectiontitle_17lkw_1",ot={sectiontitle:st},ct="_sectioncontainer_7bxy1_1",at="_titlecontainer_7bxy1_17",lt="_notPinned_7bxy1_31",dt="_Pinned_7bxy1_34",mt="_wordblock_7bxy1_61",ut="_inlinelink_7bxy1_65",pt="_cardcontainer_7bxy1_76",_t="_cardlist_7bxy1_94",ht="_card_7bxy1_76",xt="_experiencetimespan_7bxy1_131",gt="_cardtitlecontainer_7bxy1_147",jt="_cardtitle_7bxy1_147",wt="_titlecard_7bxy1_168",ft="_cardtagscontainer_7bxy1_191",yt="_cardtag_7bxy1_191",bt="_projectsimage_7bxy1_212",vt="_group_7bxy1_229",s={sectioncontainer:ct,titlecontainer:at,notPinned:lt,Pinned:dt,wordblock:mt,inlinelink:ut,cardcontainer:pt,cardlist:_t,card:ht,experiencetimespan:xt,cardtitlecontainer:gt,cardtitle:jt,titlecard:wt,cardtagscontainer:ft,cardtag:yt,projectsimage:bt,group:vt},F=({id:n,children:r})=>e.jsx("section",{id:n,className:s.sectioncontainer,children:r}),J=({children:n})=>{const[r,m]=c.useState(!1),k=c.useRef(null);return c.useEffect(()=>{const v=()=>{if(k.current){const E=window.innerWidth,{top:f}=k.current.getBoundingClientRect();E<=1024&&(m(f<=5),console.log("isPinned: ",r))}};return window.addEventListener("scroll",v),window.addEventListener("resize",v),()=>{window.removeEventListener("scroll",v),window.removeEventListener("resize",v)}},[]),e.jsx("div",{ref:k,className:`${s.titlecontainer} ${r?s.Pinned:s.notPinned}`,children:n})},U=({children:n})=>e.jsx("p",{className:s.wordblock,children:n}),q=({href:n,children:r})=>e.jsxs("a",{className:s.inlinelink,href:n,target:"_blank",rel:"noreferrer noopener",children:[" ",r," "]}),Y=({children:n})=>e.jsxs("div",{className:s.cardcontainer,children:[e.jsx("div",{className:s.card}),n]}),ue=({children:n})=>e.jsx("header",{className:s.experiencetimespan,children:n}),pe=({href:n,position:r,department:m})=>e.jsx("h3",{className:s.cardtitlecontainer,children:e.jsx("div",{children:e.jsxs("a",{className:s.cardtitle,href:n,target:"_blank",rel:"noreferrer noopener",children:[e.jsx("span",{className:s.titlecard}),e.jsxs("span",{children:[r," - ",e.jsxs("span",{style:{dislpay:"inline-block"},children:[m,e.jsx(xe,{style:{marginLeft:"0.25rem"}})]})]})]})})}),_e=({src:n,alt:r})=>e.jsx("img",{className:s.projectsimage,src:n,alt:r,loading:"lazy",decoding:"async"}),he=({href:n,title:r})=>e.jsx("h3",{className:s.cardtitlecontainer,children:e.jsx("div",{children:e.jsxs("a",{className:s.cardtitle,href:n,target:"_blank",rel:"noreferrer noopener",children:[e.jsx("span",{className:s.titlecard}),e.jsxs("span",{children:[r,e.jsx(xe,{style:{marginLeft:"0.25rem"}})]})]})})}),D=({tags:n})=>e.jsx("ul",{className:s.cardtagscontainer,children:n.map((r,m)=>e.jsx("li",{style:{marginRight:"0.375rem",marginTop:"0.5rem"},children:e.jsx("span",{className:s.cardtag,children:r})},m))}),ge=({children:n})=>e.jsx("ol",{className:s.cardlist,children:n}),xn=()=>e.jsxs(F,{id:"About",children:[e.jsx(J,{children:e.jsx("h2",{className:ot.sectiontitle,children:"About"})}),e.jsxs("div",{children:[e.jsx(U,{children:"As a dedicated student and passionate tech enthusiast, I am constantly exploring new technologies and discovering innovative ways to apply them to real-world challenges. I thrive on hands-on experiences, embracing the learning opportunities that arise from tackling complex problems along the way."}),e.jsxs(U,{children:["Currently, I'm pursuing a Master's degree in big data analytics in",e.jsx(q,{href:"https://www.si.umich.edu/",children:"University of Michigan School of Information (UMSI)"}),"and my coursework includes subjects such as databases, data mining, and machine learning, along with elective courses that align with my interests, like web development—a course that inspired the creation of this website."]}),e.jsxs(U,{children:["While data and web design are key components of my skill set, my expertise extends beyond these areas. I got my Bachelor's degree in Electrical and Computer Engineering from",e.jsx(q,{href:"https://en.sjtu.edu.cn/",children:"Shanghai Jiao Tong University (SJTU)"}),'where I developed a strong foundation in hardware design and programming. These experiences have greatly helped me on my journey to becoming a "full-stack engineer" (laughs).']}),e.jsxs(U,{children:["Currently, I actively engage with various technologies, including operating systems (",e.jsx(q,{href:"https://get.opensuse.org/tumbleweed/",children:"openSUSE Tumbleweed"}),"is my daily driver), web development, data analytics, machine learning, PCB design, and embedded systems. I also have different proficiencies in multiple programming languages, such as C, C++, Python, JavaScript (React.js), Go, Matlab, Verilog, and assembly."]})]})]}),kt="_sectioncontainer_jjebd_1",$t="_titlecontainer_jjebd_17",Nt="_notPinned_jjebd_31",Et="_Pinned_jjebd_34",Pt="_wordblock_jjebd_61",Rt="_inlinelink_jjebd_65",St="_cardcontainer_jjebd_76",Lt="_cardlist_jjebd_94",Ct="_card_jjebd_76",Tt="_experiencetimespan_jjebd_131",zt="_cardtitlecontainer_jjebd_147",At="_cardtitle_jjebd_147",Mt="_titlecard_jjebd_168",It="_cardtagscontainer_jjebd_191",Bt="_cardtag_jjebd_191",Wt="_projectsimage_jjebd_212",Gt="_group_jjebd_229",Ht="_sectiontitle_jjebd_240",Ut="_cardcontent_jjebd_252",Yt="_experiencecontent_jjebd_261",M={sectioncontainer:kt,titlecontainer:$t,notPinned:Nt,Pinned:Et,wordblock:Pt,inlinelink:Rt,cardcontainer:St,cardlist:Lt,card:Ct,experiencetimespan:Tt,cardtitlecontainer:zt,cardtitle:At,titlecard:Mt,cardtagscontainer:It,cardtag:Bt,projectsimage:Wt,group:Gt,sectiontitle:Ht,cardcontent:Ut,experiencecontent:Yt},gn=()=>e.jsxs(F,{id:"Experience",children:[e.jsx(J,{children:e.jsx("h2",{className:M.sectiontitle,children:"Experience"})}),e.jsx("div",{children:e.jsxs(ge,{children:[e.jsx("li",{style:{marginBottom:"3rem"},children:e.jsxs(Y,{children:[e.jsx(ue,{children:"2024.08 - Present"}),e.jsxs("div",{className:M.cardcontent,children:[e.jsx(pe,{href:"https://www.google.com/",position:"Big Data Analytics",department:"UMSI"}),e.jsx("p",{className:M.experiencecontent,children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, maxime aliquid praesentium dignissimos eveniet, totam obcaecati aperiam tempora repellat incidunt facere ea. Laborum odio veritatis nam totam facere recusandae fugit."}),e.jsx(D,{tags:["Data Mining","Machine Learning","Web Design"]})]})]})}),e.jsx("li",{style:{marginBottom:"3rem"},children:e.jsxs(Y,{children:[e.jsx(ue,{children:"2021.09 - 2025.08"}),e.jsxs("div",{className:M.cardcontent,children:[e.jsx(pe,{href:"https://www.google.com/",position:"Electrical and Computer Engineering",department:"SJTU"}),e.jsx("p",{className:M.experiencecontent,children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, maxime aliquid praesentium dignissimos eveniet, totam obcaecati aperiam tempora repellat incidunt facere ea. Laborum odio veritatis nam totam facere recusandae fugit."}),e.jsx(D,{tags:["Circuit","Algorithm","Programming","Embedded System"]})]})]})})]})})]}),jn=({scrollableheight:n})=>{const r=c.useRef(null),m=c.useRef(null),k=c.useRef(null),v=c.useRef(null),E=c.useRef(null),f=c.useRef(!1),t=c.useRef({x:0,y:0,z:0}),o=c.useRef({x:0,y:0,z:0}),y=c.useRef({x:0,y:0}),u=c.useRef(1);return c.useEffect(()=>{const P=window.matchMedia("(prefers-reduced-motion: reduce)").matches,b=new Te;let h=window.innerWidth,d=window.innerHeight;const je=h/d;let R=5;const O=R/je,p=new ze(-R,R,O,-O,.1,1e3),x=new Ae({alpha:!0,antialias:!0});x.setSize(h,d),x.setPixelRatio(window.devicePixelRatio*3/2),r.current.appendChild(x.domElement),x.domElement.style.height=`${d*1.5}px`,x.domElement.style.width=`${h*1.5}px`;const X=i=>new Be(i,0),Z=i=>Math.max(799/i,1);u.current=Z(h);let K=[[],[],[],[]];const B=(i,a,w)=>{const _=new We,S=new Ge({color:5657696,transparent:!0,opacity:.3});for(let N=0;N<a.attributes.position.count;N+=2){const A=new g().fromBufferAttribute(a.attributes.position,N),W=new g().fromBufferAttribute(a.attributes.position,N+1),G=new g().subVectors(W,A),L=G.length(),Pe=new g().addVectors(A,W).multiplyScalar(.5),Re=new me(w,w,L,8),H=new He(Re,S);H.position.copy(Pe),H.quaternion.setFromUnitVectors(new g(0,1,0),G.clone().normalize()),_.add(H),K[i].push(H)}return _},Q=(i,a,w)=>{for(let _=0;_<a.attributes.position.count;_+=2){const S=new g().fromBufferAttribute(a.attributes.position,_),N=new g().fromBufferAttribute(a.attributes.position,_+1),A=new g().subVectors(N,S),W=A.length(),G=new g().addVectors(S,N).multiplyScalar(.5),L=K[i][_/2];L.geometry.dispose(),L.geometry=new me(w,w,W,8),L.position.copy(G),L.quaternion.setFromUnitVectors(new g(0,1,0),A.clone().normalize())}},we=new Me(4*2/3,3),fe=X(u.current*4/9),ye=new Ie(1*2/3,0),be=new de(u.current*.4*2/3,u.current*.4*2/3,u.current*.4*2/3),ve=new C(we),ke=new C(fe),$e=new C(ye),Ne=new C(be),$=B(0,ve,.02),T=B(1,ke,.02),j=B(2,$e,.02),ee=B(3,Ne,.02);b.add($),b.add(T),b.add(j),b.add(ee);const te=()=>{const i=window.scrollY;p.position.y=-i*d*.003/n,p.position.x=-i*h*.003/n},V=()=>{const i=window.scrollY;j.position.x=-1+i*d*.002/n,j.position.y=13-i*d*.007/n,j.position.z=1-i*d*.002/n,j.rotation.x+=2e-5*i,j.rotation.y+=4e-5*i};p.position.set(0,0,14),te();let z=new g(4,1.8,0);p.lookAt(z),$.position.set(.4,.2,-2),T.position.set(4.7,4,1),j.position.set(-1,8,1),ee.position.set(z.x,z.y-1,z.z+1),V(),m.current=p,k.current=x,v.current=b;const ne=()=>{t.current={x:(Math.random()-.5)*.003,y:(Math.random()-.5)*.003,z:(Math.random()-.5)*.003}},ie=()=>{t.current={x:0,y:0,z:0}},re=()=>{o.current={x:(Math.random()-.5)*.01,y:(Math.random()-.5)*.01,z:(Math.random()-.5)*.01}};re(),ne();const se=()=>{P||(T.rotation.x-=(o.current.x-t.current.x)*.4,T.rotation.y-=(o.current.y-t.current.y)*.4,T.rotation.z-=(o.current.z-t.current.z)*.4,j.rotation.x+=(o.current.x-t.current.x)*.3,j.rotation.y+=(o.current.y-t.current.y)*.3,j.rotation.z+=(o.current.z-t.current.z)*.3,f.current||($.rotation.x+=t.current.x*.2,$.rotation.y+=t.current.y*.2,$.rotation.z+=t.current.z*.2),x.render(b,p),E.current=requestAnimationFrame(se))};P||se();const Ee=setInterval(()=>{re()},2e3),oe=Ce.throttle(i=>{if(f.current=!0,!P){ie();const a={x:i.clientX,y:i.clientY},w=a.x-y.current.x,_=a.y-y.current.y;$.rotation.x-=_*3e-5,$.rotation.y-=w*3e-5,y.current=a,ie()}clearTimeout(f.current),f.current=setTimeout(()=>{f.current=!1,ne()},10)},10),ce=()=>{P||(te(),V(),p.lookAt(z))};let ae=window.innerWidth;const le=()=>{const i=window.innerWidth;if(i===ae)return;ae=i,h=window.innerWidth,d=window.innerHeight;const a=h/d,w=R/a;p.left=-R,p.right=R,p.top=w,p.bottom=-w,p.updateProjectionMatrix(),x.setSize(h,d),x.domElement.style.height=`${d*1.5}px`,x.domElement.style.width=`${h*1.5}px`,V(),u.current=Z(h);const _=X(u.current*4/9);Q(1,new C(_),.02);const S=new de(u.current*.4*2/3,u.current*.4*2/3,u.current*.4*2/3);Q(3,new C(S),.02)};return window.addEventListener("mousemove",oe),window.addEventListener("scroll",ce),window.addEventListener("resize",le),()=>{clearInterval(Ee),window.removeEventListener("mousemove",oe),window.removeEventListener("scroll",ce),window.removeEventListener("resize",le),cancelAnimationFrame(E.current),r.current.removeChild(x.domElement)}},[]),e.jsx("div",{ref:r,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:-1}})},Dt="_sectioncontainer_c3mrv_1",Vt="_titlecontainer_c3mrv_17",qt="_notPinned_c3mrv_31",Ft="_Pinned_c3mrv_34",Jt="_wordblock_c3mrv_61",Ot="_inlinelink_c3mrv_65",Xt="_cardcontainer_c3mrv_76",Zt="_cardlist_c3mrv_94",Kt="_card_c3mrv_76",Qt="_experiencetimespan_c3mrv_131",en="_cardtitlecontainer_c3mrv_147",tn="_cardtitle_c3mrv_147",nn="_titlecard_c3mrv_168",rn="_cardtagscontainer_c3mrv_191",sn="_cardtag_c3mrv_191",on="_projectsimage_c3mrv_212",cn="_group_c3mrv_229",an="_sectiontitle_c3mrv_240",ln="_cardcontent_c3mrv_252",dn="_projectscontent_c3mrv_261",I={sectioncontainer:Dt,titlecontainer:Vt,notPinned:qt,Pinned:Ft,wordblock:Jt,inlinelink:Ot,cardcontainer:Xt,cardlist:Zt,card:Kt,experiencetimespan:Qt,cardtitlecontainer:en,cardtitle:tn,titlecard:nn,cardtagscontainer:rn,cardtag:sn,projectsimage:on,group:cn,sectiontitle:an,cardcontent:ln,projectscontent:dn},wn=()=>e.jsxs(F,{id:"Projects",children:[e.jsx(J,{children:e.jsx("h2",{className:I.sectiontitle,children:"Projects"})}),e.jsx("div",{children:e.jsxs(ge,{children:[e.jsx("li",{style:{marginBottom:"3rem"},children:e.jsxs(Y,{children:[e.jsx(_e,{src:Ue,alt:"Air32 devboard"}),e.jsxs("div",{className:I.cardcontent,children:[e.jsx(he,{href:"https://github.com/CocoNautty/Air32_MiniDevBoard",title:"Air32 Chip Super Tiny Dev Board"}),e.jsx("p",{className:I.projectscontent,children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, maxime aliquid praesentium dignissimos eveniet, totam obcaecati aperiam tempora repellat incidunt facere ea. Laborum odio veritatis nam totam facere recusandae fugit."}),e.jsx(D,{tags:["Circuit","PCB Design","Microcontroller","Soldering"]})]})]})}),e.jsx("li",{style:{marginBottom:"3rem"},children:e.jsxs(Y,{children:[e.jsx(_e,{src:Ye,alt:"custom zsh theme"}),e.jsxs("div",{className:I.cardcontent,children:[e.jsx(he,{href:"https://github.com/CocoNautty/cocofish-magic",title:"Custom ZSH Theme that Fits my Taste"}),e.jsx("p",{className:I.projectscontent,children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, maxime aliquid praesentium dignissimos eveniet, totam obcaecati aperiam tempora repellat incidunt facere ea. Laborum odio veritatis nam totam facere recusandae fugit."}),e.jsx(D,{tags:["Shell","Linux","ZSH"]})]})]})})]})})]});export{xn as A,gn as E,hn as H,wn as P,jn as T};
