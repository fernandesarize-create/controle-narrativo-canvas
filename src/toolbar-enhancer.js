import './toolbar-theme.css';
import './toolbar-v15.css';

const PAPER_OPTIONS={
  pt:[['a3l','A3 horizontal'],['a4l','A4 horizontal'],['a4p','A4 vertical']],
  en:[['a3l','A3 landscape'],['a4l','A4 landscape'],['a4p','A4 portrait']]
};

function currentLang(toolbar){
  const selected=toolbar?.querySelector('.toolbarGroup.lang .selected');
  return selected?.textContent.trim().toLowerCase()==='en'?'en':'pt';
}

function setPrintSize(size){
  const safe=['a3l','a4l','a4p'].includes(size)?size:'a3l';
  const page=document.querySelector('.page');
  if(page){
    const wanted=`print-${safe}`;
    if(!page.classList.contains(wanted)){
      page.classList.remove('print-a3l','print-a4l','print-a4p');
      page.classList.add(wanted);
    }
  }
  if(document.documentElement.dataset.printSize!==safe)document.documentElement.dataset.printSize=safe;
}

function updatePaperControl(toolbar){
  const lang=currentLang(toolbar);
  const label=toolbar.querySelector('.paperLabel');
  const select=toolbar.querySelector('.paperControl select');
  if(!label||!select)return;
  const value=select.value||document.documentElement.dataset.printSize||'a3l';
  const options=PAPER_OPTIONS[lang];
  const optionHTML=options.map(([v,t])=>`<option value="${v}">${t}</option>`).join('');
  if(select.innerHTML!==optionHTML)select.innerHTML=optionHTML;
  const wantedLabel=lang==='en'?'Paper':'Tamanho';
  if(label.textContent!==wantedLabel)label.textContent=wantedLabel;
  const next=options.some(([v])=>v===value)?value:'a3l';
  if(select.value!==next)select.value=next;
  setPrintSize(select.value);
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

  toolbar.querySelectorAll('.toolbarGroup.lang button').forEach(button=>{
    if(button.dataset.paperHook)return;
    button.dataset.paperHook='1';
    button.addEventListener('click',()=>setTimeout(()=>updatePaperControl(document.querySelector('.toolbar')),0));
  });

  updatePaperControl(toolbar);
}

const observer=new MutationObserver(()=>setupToolbar());
observer.observe(document.documentElement,{subtree:true,childList:true});
setupToolbar();
