const $=s=>document.querySelector(s)
const $$=s=>document.querySelectorAll(s)
const yearEl=$('#year')
if(yearEl)yearEl.textContent=new Date().getFullYear()
const toggle=$('.menu-toggle')
const menu=$('.menu')
toggle&&toggle.addEventListener('click',()=>{const open=menu.classList.toggle('show');toggle.setAttribute('aria-expanded',open)} )
$$('.menu a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('show')))
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');const el=id&&$(id);if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'})}}))
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal-in');io.unobserve(e.target)}})},{threshold:.2})
$$('.reveal').forEach(el=>io.observe(el))
const topBtn=$('.back-to-top')
window.addEventListener('scroll',()=>{if(window.scrollY>480)topBtn.classList.add('show');else topBtn.classList.remove('show')})
topBtn&&topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}))
const modal=$('#modal')
const modalContent=$('#modal-content')
const modalClose=$('.modal-close')
modalClose&&modalClose.addEventListener('click',()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')})
$$('[data-modal]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();const type=el.getAttribute('data-modal');modal.classList.add('open');modal.setAttribute('aria-hidden','false');if(type==='termos'){modalContent.innerHTML=`<h3>Termos de Uso</h3><p>Este site institucional apresenta informações públicas, conteúdos editoriais e formulários de contato. Ao utilizar, você concorda em fazê-lo com respeito, boa-fé e conformidade com as leis vigentes.</p><p>Os dados enviados nos formulários são utilizados para retorno da equipe e organização de voluntariado. O envio não constitui vínculo jurídico.</p>`}else{modalContent.innerHTML=`<h3>Política de Privacidade</h3><p>Coletamos nome, e-mail, cidade e mensagem para comunicação com o usuário. Os dados são tratados com segurança, não compartilhados indevidamente e podem ser removidos mediante solicitação.</p><p>Cookies podem ser usados para métricas e melhoria da experiência. Você pode desativá-los no navegador.</p>`}}))
const utm=location.search
const apoioUtm=$('#apoio-utm')
const contatoUtm=$('#contato-utm')
if(apoioUtm)apoioUtm.value=utm
if(contatoUtm)contatoUtm.value=utm
const isEmail=v=>/.+@.+\..+/.test(v)
const setStatus=(el,msg)=>{el.textContent=msg}
const apoioForm=$('#apoio-form')
const apoioStatus=$('#apoio-status')
apoioForm&&apoioForm.addEventListener('submit',e=>{e.preventDefault();const nome=$('#apoio-nome').value.trim();const email=$('#apoio-email').value.trim();const cidade=$('#apoio-cidade').value.trim();const termos=$('#apoio-termos').checked;if(!nome||!isEmail(email)||!cidade||!termos){setStatus(apoioStatus,'Preencha os campos corretamente.');return}setStatus(apoioStatus,'Obrigado pelo apoio! Em breve entraremos em contato.')})
const contatoForm=$('#contato-form')
const contatoStatus=$('#contato-status')
contatoForm&&contatoForm.addEventListener('submit',e=>{e.preventDefault();const nome=$('#contato-nome').value.trim();const email=$('#contato-email').value.trim();const assunto=$('#contato-assunto').value.trim();const mensagem=$('#contato-mensagem').value.trim();if(!nome||!isEmail(email)||!assunto||!mensagem){setStatus(contatoStatus,'Preencha os campos corretamente.');return}setStatus(contatoStatus,'Mensagem enviada! Obrigado pelo contato.')})
const waBtn=$('#whatsapp-btn')
waBtn&&waBtn.addEventListener('click',e=>{e.preventDefault();const phone=waBtn.getAttribute('data-phone');const text=encodeURIComponent('Olá! Quero apoiar o movimento.');const url=`https://wa.me/${phone}?text=${text}`;window.open(url,'_blank')})
const defaultPalette={navy:'#0B1B3F',gold:'#C9A227',white:'#ffffff',red:'#B22234'}
const getSettings=()=>{try{return JSON.parse(localStorage.getItem('siteSettings')||'{}')}catch{return {}}}
const applyPalette=p=>{const r=document.documentElement;const pal={...defaultPalette,...p};r.style.setProperty('--navy',pal.navy);r.style.setProperty('--gold',pal.gold);r.style.setProperty('--white',pal.white);r.style.setProperty('--red',pal.red)}
const applyHeroPhoto=src=>{
  const hp=$('.hero-photo');
  if(!hp)return;
  const setImg=u=>{hp.style.background='none';hp.style.backgroundImage=`url('${u}')`;hp.style.backgroundSize='cover';hp.style.backgroundPosition='center`}`
  if(src){setImg(src);return}
  fetch('assets/padre.jpg',{method:'HEAD'}).then(res=>{if(res.ok){setImg('assets/padre.jpg')}else{const ph='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="#0B1B3F"/><text x="50%" y="50%" font-family="Montserrat,Arial" font-size="48" fill="#C9A227" text-anchor="middle" dominant-baseline="middle">Foto oficial aqui</text></svg>');setImg(ph)}}).catch(()=>{const ph='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="#0B1B3F"/><text x="50%" y="50%" font-family="Montserrat,Arial" font-size="48" fill="#C9A227" text-anchor="middle" dominant-baseline="middle">Foto oficial aqui</text></svg>');setImg(ph)})
}
const S=getSettings();applyPalette(S.palette);applyHeroPhoto(S.heroPhoto)
const agendaData=[
  {date:'20/11',title:'Missa',place:'Paróquia local'},
  {date:'22/11',title:'Encontro com comunidade',place:'Centro cultural'},
  {date:'25/11',title:'Entrevista',place:'Rádio regional'},
  {date:'28/11',title:'Ato cívico',place:'Praça central'},
  {date:'30/11',title:'Reunião de campanha',place:'Comitê'},
  {date:'02/12',title:'Visita pastoral',place:'Comunidade'}
]
const agendaList=$('#agenda-list')
if(agendaList){agendaList.innerHTML=agendaData.map(i=>`<div class="agenda-item"><div class="date">${i.date}</div><div class="title">${i.title}</div><div class="place">${i.place}</div></div>`).join('')}
const newsData=[
  {title:'Comunicado oficial',excerpt:'Mensagem à comunidade e aos apoiadores.',url:'#'},
  {title:'Artigo: fé e cidadania',excerpt:'Reflexões sobre ética e participação.',url:'#'},
  {title:'Análise: transparência pública',excerpt:'Compromissos com a boa gestão.',url:'#'}
]
const newsList=$('#news-list')
if(newsList){newsList.innerHTML=newsData.map(n=>`<div class="news-item"><h3>${n.title}</h3><p>${n.excerpt}</p><a class="btn btn-outline" href="${n.url}">Ler mais</a></div>`).join('')}
const gallery=$('#gallery')
const ph='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="#0B1B3F"/><text x="50%" y="50%" font-family="Montserrat,Arial" font-size="64" fill="#C9A227" text-anchor="middle" dominant-baseline="middle">Galeria</text></svg>')
const galleryItems=(S.gallery&&S.gallery.length?S.gallery.map(src=>({src,tag:'oficiais'})):[
  {src:ph,tag:'encontros'},
  {src:ph,tag:'eventos'},
  {src:ph,tag:'acoes'},
  {src:ph,tag:'oficiais'},
  {src:ph,tag:'eventos'},
  {src:ph,tag:'encontros'}
])
const renderGallery=items=>{if(!gallery)return;gallery.innerHTML=items.map(i=>`<figure class="gallery-item"><img alt="Imagem" src="${i.src}"><figcaption class="tag">${i.tag}</figcaption></figure>`).join('')}
renderGallery(galleryItems)
$$('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{$$('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.getAttribute('data-filter');if(f==='all')renderGallery(galleryItems);else renderGallery(galleryItems.filter(i=>i.tag===f))}))
const chatWidget=$('#chat-widget')
if(S.chat&&S.chat.enabled){chatWidget&&chatWidget.classList.add('open')}
const chatToggle=$('.chat-toggle')
const chatBody=$('#chat-body')
const chatForm=$('#chat-form')
const addMsg=(text,who)=>{const div=document.createElement('div');div.className=`chat-msg ${who}`;div.textContent=text;chatBody.appendChild(div);chatBody.scrollTop=chatBody.scrollHeight}
chatToggle&&chatToggle.addEventListener('click',()=>{chatWidget.classList.toggle('open')})
chatForm&&chatForm.addEventListener('submit',e=>{e.preventDefault();const txt=$('#chat-text').value.trim();if(!txt)return;addMsg(txt,'user');$('#chat-text').value='';
  setTimeout(()=>{
    const lower=txt.toLowerCase()
    let reply='Obrigado pela mensagem. Estamos à disposição para servir com fé, família e Brasil.'
    if(lower.includes('proposta')||lower.includes('bandeira')) reply='Conheça as propostas: Família e Vida, Liberdade Religiosa, Patriotismo e Ordem, Segurança Pública.'
    else if(lower.includes('agenda')||lower.includes('evento')) reply='Confira a agenda na página: missas, encontros, entrevistas e atos cívicos.'
    else if(lower.includes('apoio')||lower.includes('volunt')) reply='Para apoiar, use o formulário em “Apoie a Campanha” ou fale no WhatsApp.'
    else if(lower.includes('contato')||lower.includes('email')) reply='Envie mensagem pelo formulário de Contato ou e-mail institucional.'
    addMsg(reply,'bot')
  },500)
})