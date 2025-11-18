const $=s=>document.querySelector(s)
const guard=()=>{try{const a=JSON.parse(localStorage.getItem('adminAuth')||'null');if(!a||Date.now()>a.expires){location.href='login.html?redirect=admin.html'}}catch{location.href='login.html?redirect=admin.html'}}
guard()
const fileToDataURL=f=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(f)})
const defaultSettings={palette:{navy:'#0B1B3F',gold:'#C9A227',white:'#ffffff',red:'#B22234'},heroPhoto:'',gallery:[],chat:{enabled:true}}
const load=()=>{try{return {...defaultSettings,...JSON.parse(localStorage.getItem('siteSettings')||'{}')}}catch{return defaultSettings}}
const save=s=>localStorage.setItem('siteSettings',JSON.stringify(s))
const S=load()
$('#color-navy').value=S.palette.navy
$('#color-gold').value=S.palette.gold
$('#color-white').value=S.palette.white
$('#color-red').value=S.palette.red
$('#chat-enabled').checked=!!(S.chat&&S.chat.enabled)
const status=$('#admin-status')
$('#save-settings').addEventListener('click',async()=>{
  const palette={navy:$('#color-navy').value,gold:$('#color-gold').value,white:$('#color-white').value,red:$('#color-red').value}
  const heroInput=$('#hero-photo')
  const galleryInput=$('#gallery-photos')
  let heroPhoto=S.heroPhoto
  let gallery=S.gallery
  if(heroInput.files&&heroInput.files[0]){heroPhoto=await fileToDataURL(heroInput.files[0])}
  if(galleryInput.files&&galleryInput.files.length){gallery=[];for(const f of galleryInput.files){const d=await fileToDataURL(f);gallery.push(d)}}
  const chat={enabled:$('#chat-enabled').checked}
  const newSettings={palette,heroPhoto,gallery,chat}
  save(newSettings)
  status.textContent='Configurações salvas. Volte à página inicial para ver as mudanças.'
})
$('#clear-settings').addEventListener('click',()=>{localStorage.removeItem('siteSettings');status.textContent='Configurações removidas. O site voltará ao padrão.'})
const logoutBtn=document.createElement('button')
logoutBtn.className='btn btn-outline'
logoutBtn.textContent='Sair'
document.querySelector('.nav').appendChild(logoutBtn)
logoutBtn.addEventListener('click',()=>{localStorage.removeItem('adminAuth');location.href='login.html'})
const toHex=b=>Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('')
const sha256=async s=>{const enc=new TextEncoder().encode(s);const buf=await crypto.subtle.digest('SHA-256',enc);return toHex(buf)}
const getCreds=()=>{try{return JSON.parse(localStorage.getItem('adminCredentials')||'null')}catch{return null}}
const setCreds=c=>localStorage.setItem('adminCredentials',JSON.stringify(c))
const secSave=$('#sec-save')
const secStatus=$('#sec-status')
if(secSave){secSave.addEventListener('click',async()=>{const cur=$('#sec-current').value;const nxt=$('#sec-new').value;const conf=$('#sec-confirm').value;const c=getCreds();if(!cur||!nxt||!conf){secStatus.textContent='Preencha todos os campos.';return}const curHash=await sha256(cur);if(!c||curHash!==c.passHash){secStatus.textContent='Senha atual incorreta.';return}if(nxt.length<8){secStatus.textContent='Nova senha deve ter ao menos 8 caracteres.';return}if(nxt!==conf){secStatus.textContent='Confirmação diferente.';return}const nxtHash=await sha256(nxt);setCreds({user:c.user,passHash:nxtHash});secStatus.textContent='Senha atualizada com sucesso.'})}