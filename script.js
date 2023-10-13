const key="88a60de6d3784c1b9b963a2b2ca4196b";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("India"));
async function fetchNews(query){
   const res=await fetch(`${url}${query}&apiKey=${key}`);
   const data = await res.json();
   binddata(data.articles);
   
}
function binddata(articles){
   const card_container=document.getElementById('con');
   const news=document.getElementById('template-card');

   card_container.innerHTML=' ';

   articles.forEach((article)=> {
      if(!article.urlToImage) return;
      const cardclone=news.content.cloneNode(true);
      fillDataInCard(cardclone,article);
      card_container.appendChild(cardclone)
   });
}
function fillDataInCard(cardclone,article){
   const newimg=cardclone.querySelector('#img');
   const newtitle=cardclone.querySelector('#news-title');
   const newscr=cardclone.querySelector('#news-source');
   const newdesc=cardclone.querySelector('#news-desc');

   newimg.src=article.urlToImage;
   newtitle.innerHTML=article.title;
   newdesc.innerHTML=article.description;

   const date =new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/jakarta"});
   newscr.innerHTML=`${article.source.name} ~ ${date}`;

   cardclone.firstElementChild.addEventListener("click",()=>{
      window.open(article.url,"_blank");
   })
}

let cur=null;
function onNavItemClick(id){
   fetchNews(id);
   const navItem =document.getElementById(id);
   cur?.classList.remove('active');
   cur=navItem;
   cur.classList.add('active');
}

const but=document.getElementById('search-butn');
const inp=document.getElementById('inp');

but.addEventListener("click",()=>{
   const query = inp.value;
   if(!query) return;
   fetchNews(query);
   cur?.classList.remove('active');
   cur=null;
})
function re(){
   fetchNews('india');
}