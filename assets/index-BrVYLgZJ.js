import{r as i,j as o,c as a}from"./vendor-r605aUjd.js";import{H as d,A as u,T as f}from"./components-CFoyNmAi.js";import"./index-BrVYLgZJ.js";import"./three-BBnhqZ3w.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();function y(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function p(){const r=i.useRef(null),[s,c]=i.useState({width:0,height:0});return i.useEffect(()=>{if(r.current){const{width:n,height:e}=r.current.getBoundingClientRect();c({width:n,height:e})}},[]),console.log(s),o.jsxs("div",{children:[o.jsxs("div",{className:"App",children:[o.jsx("a",{className:"skip",href:"#content",children:"Skip to Content"}),o.jsxs("div",{className:"wrapper",children:[o.jsx(d,{}),o.jsx("main",{id:"content",className:"MainContent",ref:r,children:o.jsx(u,{})})]})]}),o.jsx(f,{scrollableheight:s.height})]})}a(document.getElementById("root")).render(o.jsx(i.StrictMode,{children:o.jsx(p,{})}));export{y as g};