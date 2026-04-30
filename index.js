import{a as w,S as v,i as a}from"./assets/vendor-Do60_h77.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const S="55650574-c6a86cff692a63e47839b2642",M="https://pixabay.com/api/";async function f(r,t){return(await w.get(M,{params:{key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}})).data}const m=document.querySelector(".gallery"),p=document.querySelector(".loader"),y=document.querySelector(".load-more"),$=new v(".gallery a",{captionsData:"alt",captionDelay:250});function h(r){const t=r.map(s=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${s.largeImageURL}">
          <img
            class="gallery-image"
            src="${s.webformatURL}"
            alt="${s.tags}"
          />
        </a>

        <div class="info">
          <p class="info-item"><b>Likes:</b> ${s.likes}</p>
          <p class="info-item"><b>Views:</b> ${s.views}</p>
          <p class="info-item"><b>Comments:</b> ${s.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${s.downloads}</p>
        </div>
      </li>
    `).join("");m.insertAdjacentHTML("beforeend",t),$.refresh()}function q(){m.innerHTML=""}function g(){p.classList.remove("hidden")}function L(){p.classList.add("hidden")}function B(){y.classList.remove("hidden")}function d(){y.classList.add("hidden")}const O=document.querySelector(".form"),E=document.querySelector(".load-more");let i="",n=1,l=0;O.addEventListener("submit",H);E.addEventListener("click",P);async function H(r){if(r.preventDefault(),i=r.target.elements.search.value.trim(),!!i){n=1,q(),d(),g();try{const t=await f(i,n);if(l=t.totalHits,!t.hits.length){a.error({message:"No images found"});return}h(t.hits),a.success({message:`Hooray! We found ${l} images.`}),b()}catch{a.error({message:"Something went wrong"})}finally{L()}}}async function P(){n+=1,d(),g();try{const r=await f(i,n);h(r.hits),b()}catch{a.error({message:"Failed to load more"})}finally{L()}}function b(){if(n*15>=l){d(),a.info({message:"We're sorry, but you've reached the end of search results."});return}B()}
//# sourceMappingURL=index.js.map
