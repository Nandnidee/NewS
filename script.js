const key="9639faf63445cfff0595422d24ff4237";
const url="https://gnews.io/api/v4/search?q=";
let cur=null;
window.addEventListener("load",()=>fetchNews("India"));
async function fetchNews(query){
   const res= await fetch(`${url}${query}&apikey=${key}`);
   const data = await res.json();
   console.log(data);
   binddata(data.articles);
   
}
function binddata(articles){
   const card_container=document.getElementById('con');
   const news=document.getElementById('template-card');

   card_container.innerHTML=' ';

   articles.forEach((article)=> {
      if(!article.image) return;
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

   newimg.src=article.image;
   newtitle.innerHTML=article.title;
   newdesc.innerHTML=article.description;

   const date =new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/jakarta"});
   newscr.innerHTML=`${article.source.name} ~ ${date}`;

   cardclone.firstElementChild.addEventListener("click",()=>{
      window.open(article.url,"_blank");
   })
}


function onNavItemClick(id){
   fetchNews(id);
   const navItem =document.getElementById(id);
   if(cur.classList.contain('active'))
   cur.classList.remove('active');
   cur=navItem;
   cur.classList.add('active');
}

const but=document.getElementById('search-butn');
const inp=document.getElementById('inp');

but.addEventListener("click",()=>{
   const query = inp.value;
   if(!query) return;
   fetchNews(query);
   if(cur.classList.contain('active'))
   cur.classList.remove('active');
   cur=NULL;
})
function re(){
   fetchNews('india');
}