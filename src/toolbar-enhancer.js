const PAPER_OPTIONS={
  pt:[['a3l','A3 horizontal'],['a4l','A4 horizontal'],['a4p','A4 vertical']],
  en:[['a3l','A3 landscape'],['a4l','A4 landscape'],['a4p','A4 portrait']]
};

function currentLang(toolbar){
  const selected=toolbar?.querySelector('.toolbarGroup.lang .selected');
  return selected?.textContent.trim().toLowerCase()==='en'?'en':'pt';
}

function setupToolbar(){
  const toolbar=document.querySelector('.toolbar');
  if(!toolbar)return;

  if(!toolbar.querySelector('.brandLockup')){
    const brand=document.createElement('div');
    brand.className='brandLockup';
    brand.setAttribute('aria-label','Impulsa — Controle Narrativo');
    brand.innerHTML='<span class="impulsaMark" aria-hidden="true"><i></i><i></i></span><strong>im.pulsa</strong><b>CONTROLE NARRATIVO</b>';
    toolbar.prepend(brand);
  }

  let paper=toolbar.querySelector('.paperControl');
  if(!paper){
    paper=document.createElement('label');
    paper.className='paperControl';
    paper.innerHTML='<span class="paperLabel"></span><select aria-label="Paper size"></select>';
    toolbar.querySelector('.printBtn')?.before(paper);
    paper.querySelector('select').addEventListener('change',e=>setPrintSize(e.target.value));
  }

  updatePaperControl(toolbar);
}

function updatePaperControl(toolbar){
  const lang=currentLang(toolbar);
  const label=toolbar.querySelector('.paperLabel');
  const select=toolbar.querySelector('.paperControl select');
  if(!label||!select)return;
  const value=select.value||document.documentElement.dataset.printSize||'a3l';
  label.textContent=lang==='en'?'Paper':'Tamanho';
  select.innerHTML=PAPER_OPTIONS[lang].map(([v,t])=>`<option value="${v}">${t}</option>`).join('');
  select.value=PAPER_OPTIONS[lang].some(([v])=>v===value)?value:'a3l';
  setPrintSize(select.value);
}

function setPrintSize(size){
  const page=document.querySelector('.page');
  if(page){
    page.classList.remove('print-a3l','print-a4l','print-a4p');
    page.classList.add(`print-${size}`);
  }
  document.documentElement.dataset.printSize=size;
}

const observer=new MutationObserver(()=>setupToolbar());
observer.observe(document.documentElement,{subtree:true,childList:true});
setupToolbar();
