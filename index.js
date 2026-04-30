import{a as w,S as v,i as a}from"./assets/vendor-Do60_h77.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const S="55650574-c6a86cff692a63e47839b2642",q="https://pixabay.com/api/";async function f(s,e){return(await w.get(q,{params:{key:S,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e}})).data}const m=document.querySelector(".gallery"),y=document.querySelector(".loader"),h=document.querySelector(".load-more"),M=new v(".gallery a",{captionsData:"alt",captionDelay:250});function p(s){const e=s.map(o=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${o.largeImageURL}">
          <img
            class="gallery-image"
            src="${o.webformatURL}"
            alt="${o.tags}"
          />
        </a>

        <div class="info">
          <p class="info-item"><b>Likes:</b> ${o.likes}</p>
          <p class="info-item"><b>Views:</b> ${o.views}</p>
          <p class="info-item"><b>Comments:</b> ${o.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${o.downloads}</p>
        </div>
      </li>
    `).join("");m.insertAdjacentHTML("beforeend",e),M.refresh()}function $(){m.innerHTML=""}function g(){y.classList.remove("hidden")}function L(){y.classList.add("hidden")}function B(){h.classList.remove("hidden")}function d(){h.classList.add("hidden")}const E=document.querySelector(".form"),P=document.querySelector(".load-more");document.querySelector(".gallery");const O=15;let i="",n=1,l=0;E.addEventListener("submit",A);P.addEventListener("click",H);async function A(s){if(s.preventDefault(),i=s.target.elements.search.value.trim(),!!i){n=1,$(),d(),g();try{const e=await f(i,n);if(l=e.totalHits,!e.hits.length){a.error({message:"No images found"});return}p(e.hits),a.success({message:`Hooray! We found ${l} images.`}),b()}catch{a.error({message:"Something went wrong"})}finally{L()}}}async function H(){n+=1,d(),g();try{const s=await f(i,n);p(s.hits);const e=document.querySelector(".gallery-item");if(e){const o=e.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}b()}catch{a.error({message:"Failed to load more"})}finally{L()}}function b(){if(n*O>=l){d(),a.info({message:"We're sorry, but you've reached the end of search results."});return}B()}
//# sourceMappingURL=index.js.map
