const STORAGE_KEY = 'ibge-aca-iguatu-checklist-v1';
const TASKS = [
  {id:'govbr',group:'agora',title:'Conta GOV.BR com nível prata ou ouro',description:'O edital exige conta ativa com selo prata ou superior para viabilizar convocação e admissão. No app GOV.BR, toque em “Aumentar nível” e siga uma das validações disponíveis.',links:[['Ver como aumentar o nível', 'https://www.gov.br/governodigital/pt-br/identidade/conta-gov-br/niveis-da-conta-govbr']],deadline:'Preparar agora · requisito expresso no item 15.2'},
  {id:'identidade',group:'agora',title:'Documento oficial de identidade',description:'Separe um documento válido, legível e em bom estado. Digitalize frente e verso, quando houver. O edital pede o documento de identidade no envio digital.',links:[],deadline:'Preparar agora'},
  {id:'eleitoral',group:'agora',title:'Título de eleitor e quitação eleitoral',description:'Tenha o título e emita a Certidão de Quitação Eleitoral para comprovar que está em dia com a Justiça Eleitoral. A emissão é gratuita pelo TSE ou pelo e-Título.',links:[['Emitir certidão no TSE', 'https://www.tse.jus.br/servicos-eleitorais/certidoes']],deadline:'Preparar agora · requisito do item 4.1'},
  {id:'escolaridade',group:'agora',title:'Comprovante de conclusão do ensino médio',description:'O edital aceita diploma OU histórico escolar acompanhado de declaração da instituição de ensino atestando a escolaridade. Peça à secretaria da escola se ainda não tiver o documento.',links:[],deadline:'Preparar agora · requisito do ACA'},
  {id:'contatos',group:'agora',title:'Conferir e-mail e telefone cadastrados',description:'Confirme que o e-mail e o telefone informados na inscrição continuam ativos. A convocação pode chegar pelos dois meios; confira também a caixa de spam. Depois do resultado final, atualize mudanças junto ao IBGE conforme o item 15.7.',links:[],deadline:'Preparar agora · convocação por e-mail e telefone'},
  {id:'pasta-digital',group:'agora',title:'Pasta digital privada com cópias legíveis',description:'Crie uma pasta segura “IBGE - ACA Iguatu”. Organize os PDFs e mantenha cópia de segurança. Não coloque documentos pessoais no repositório público do GitHub.',links:[],deadline:'Preparar agora'},
  {id:'pasta-fisica',group:'agora',title:'Pasta física com originais e cópias',description:'Deixe os originais organizados e algumas cópias para consulta. O edital exige envio digital no ato da contratação, mas os originais podem ser necessários para conferência.',links:[],deadline:'Preparar agora'},
  {id:'militar',group:'condicional',title:'Comprovante de situação militar',description:'Somente se você for brasileiro do sexo masculino: certificado de reservista, documento de alistamento com dispensa ou outro documento hábil que comprove cumprimento/liberação do serviço militar.',links:[['Orientações e emissão de certificado no gov.br', 'https://www.gov.br/pt-br/servicos/alistar-se-no-servico-militar-obrigatorio']],deadline:'Se aplicável · item 15.3(c)'},
  {id:'pis',group:'condicional',title:'Comprovante de PIS/PASEP (se possuir)',description:'A redação do edital é “se possuir”. Se já teve emprego formal, procure o número em seus documentos trabalhistas, Carteira de Trabalho Digital, extrato do FGTS ou CNIS. Não há ordem no edital para criar um número novo.',links:[['Meu INSS / CNIS', 'https://meu.inss.gov.br/']],deadline:'Se possuir · item 15.3(d)'},
  {id:'casamento',group:'condicional',title:'Certidão de casamento',description:'Somente se seu estado civil for casado. Separe uma cópia legível da certidão.',links:[],deadline:'Se aplicável · item 15.3(j)'},
  {id:'nacionalidade',group:'condicional',title:'Documento de naturalização ou igualdade de direitos',description:'Somente para os casos específicos do edital: pessoa estrangeira naturalizada ou cidadão português amparado pelo estatuto de igualdade. Não se aplica à maioria dos candidatos brasileiros natos.',links:[],deadline:'Se aplicável · item 15.3(e–f)'},
  {id:'atestado',group:'convocacao',title:'Atestado de sanidade física e mental',description:'O edital pede atestado emitido por médico de qualquer especialidade, comprovando capacidade para as atribuições do ACA. Não especifica médico do trabalho, ASO ou exames laboratoriais. A emissão deve ser combinada após esclarecer com o IBFC a regra dos 12 meses.',links:[['Enviar dúvida ao IBFC por e-mail','mailto:concurso@ibfc.org.br?subject=D%C3%BAvida%20sobre%20atestado%20m%C3%A9dico%20-%20Edital%2001%2F2026']],deadline:'Na contratação · não pagar por exames antes de confirmar a data aceita'},
  {id:'epatri',group:'convocacao',title:'Comprovante de entrega da declaração e-Patri',description:'No momento da admissão, siga a orientação do IBGE para enviar a declaração patrimonial no e-Patri. Guarde o comprovante de entrega destinado ao RH (não confunda com o recibo pessoal de acesso). O acesso exige GOV.BR prata ou ouro.',links:[['Orientações oficiais do e-Patri','https://www.gov.br/pt-br/servicos/apresentar-declaracao-de-bens-patrimonial-no-e-patri'],['Abrir o e-Patri','https://epatri.cgu.gov.br/']],deadline:'Na contratação · item 15.3(g)'},
  {id:'banco',group:'convocacao',title:'Dados bancários em seu próprio nome',description:'O edital prevê conta-salário para remuneração e conta-corrente de titularidade do contratado (conta digital é aceita para diárias/indenizações/auxílio-locomoção). Não abra conta específica antes de receber instruções do IBGE.',links:[],deadline:'Na contratação · itens 15.4 e 15.5'},
  {id:'declaracoes',group:'convocacao',title:'Declarações exigidas no ato da contratação',description:'O edital informa que o convocado assinará declarações sobre não recebimento de seguro-desemprego, gerência/administração de sociedade privada, vínculos e contratação temporária nos últimos 24 meses. Serão orientadas na admissão.',links:[],deadline:'Assinar quando o IBGE solicitar · item 15.6'}
];

let saved = loadSaved();
let activeFilter = 'todos';
const $ = (selector) => document.querySelector(selector);

function loadSaved(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); }
function groupName(group){return ({agora:'Preparar agora',convocacao:'Na convocação',condicional:'Se aplicável'})[group] || '';}
function renderTasks(){
  const filtered = TASKS.filter(task => activeFilter === 'todos' || task.group === activeFilter);
  $('#checklist').innerHTML = filtered.map(task => {
    const done = saved[task.id] === 'done' || saved[task.id] === true;
    const notApplicable = saved[task.id] === 'na';
    const links = task.links.map(([label,url]) => `<a href="${url}" target="${url.startsWith('mailto:')?'_self':'_blank'}" ${url.startsWith('mailto:')?'':'rel="noopener"'}>${label} ↗</a>`).join('');
    return `<article class="task-card ${done?'done':''}">
      <input class="task-check" type="checkbox" id="task-${task.id}" data-task="${task.id}" ${done?'checked':''} ${notApplicable?'disabled':''} aria-label="Marcar ${task.title} como concluído">
      <div class="task-body">
        <div class="task-meta"><span class="task-category">${groupName(task.group)}</span><span class="task-status">${done?'Concluído':notApplicable?'Não se aplica':'Pendente'}</span></div>
        <h3>${task.title}</h3><p>${task.description}</p>
        ${links?`<div class="task-links">${links}</div>`:''}
        <div class="task-actions">${task.group==='condicional'?`<button class="task-na" data-na="${task.id}" aria-pressed="${notApplicable}">${notApplicable?'Marcado: não se aplica':'Não se aplica a mim'}</button>`:''}</div>
        <span class="task-deadline">${task.deadline}</span>
      </div>
    </article>`;
  }).join('');
  $('#checklist').querySelectorAll('[data-task]').forEach(input => input.addEventListener('change', event => {
    const id = event.currentTarget.dataset.task;
    if(event.currentTarget.checked) saved[id] = 'done'; else delete saved[id];
    save(); renderTasks(); updateProgress();
  }));
  $('#checklist').querySelectorAll('[data-na]').forEach(button => button.addEventListener('click', event => {
    const id = event.currentTarget.dataset.na;
    if(saved[id] === 'na') delete saved[id]; else saved[id] = 'na';
    save(); renderTasks();
  }));
  updateProgress();
}
function updateProgress(){
  const completed = TASKS.filter(task => saved[task.id] === 'done' || saved[task.id] === true).length;
  const notApplicable = TASKS.filter(task => saved[task.id] === 'na').length;
  const resolved = completed + notApplicable;
  const percent = Math.round(resolved/TASKS.length*100);
  $('#progress-count').textContent = `${completed} concluídos · ${notApplicable} não se aplicam`;
  $('#progress-percent').textContent = `${percent}%`;
  $('#progress-bar').style.width = `${percent}%`;
}
function updateCountdowns(){
  const now = new Date();
  document.querySelectorAll('[data-countdown]').forEach(el => {
    const target = new Date(el.dataset.countdown);
    let remaining = target.getTime() - now.getTime();
    if(remaining <= 0){el.querySelector('strong').textContent='Hoje';el.querySelector('span').textContent='confira a publicação oficial';return;}
    const days = Math.ceil(remaining/86400000);
    el.querySelector('strong').textContent = days === 1 ? '1 dia' : `${days} dias`;
    el.querySelector('span').textContent = 'restantes';
  });
}
let toastTimer;
function toast(message){
  const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3000);
}

$('.filter-row').addEventListener('click', event => {
  const btn=event.target.closest('[data-filter]');if(!btn)return;
  activeFilter=btn.dataset.filter;
  document.querySelectorAll('.filter-btn').forEach(item=>item.classList.toggle('active',item===btn));
  renderTasks();
});

$('#enable-notifications').addEventListener('click', async () => {
  if(!('Notification' in window)){ $('#notification-status').textContent='Este navegador não oferece notificações.';return; }
  const permission=await Notification.requestPermission();
  if(permission==='granted'){
    $('#notification-status').textContent='Notificações ativadas. Os avisos aparecem nos dias do cronograma, enquanto o painel estiver aberto.';
    toast('Notificações ativadas neste navegador.');
    checkReminder(true);
  } else {
    $('#notification-status').textContent='Permissão não concedida. Você ainda verá os prazos no painel.';
  }
});
function checkReminder(showNow=false){
  if(!('Notification' in window) || Notification.permission!=='granted')return;
  const now=new Date();
  const milestones=[
    {date:new Date('2026-12-11T09:00:00-03:00'),name:'Classificação preliminar prevista para hoje'},
    {date:new Date('2026-12-14T09:00:00-03:00'),name:'Abre hoje o prazo de recursos (10h)'},
    {date:new Date('2026-12-15T09:00:00-03:00'),name:'Último dia para recursos (até 17h)'},
    {date:new Date('2026-12-18T09:00:00-03:00'),name:'Resultado final previsto para hoje'}
  ];
  const target=milestones.find(item=>item.date.toDateString()===now.toDateString());
  if(target){
    const key=`reminded-${target.date.toISOString().slice(0,10)}`;
    if(!sessionStorage.getItem(key)){new Notification('Atenção ao processo do IBGE',{body:target.name});sessionStorage.setItem(key,'1');}
  } else if(showNow){new Notification('Painel IBGE ACA Iguatu',{body:'Notificações ativadas. Você receberá alertas de marcos do cronograma enquanto esta página estiver aberta.'});}
}

$('#export-data').addEventListener('click',()=>{
  const backup={project:'IBGE ACA Iguatu',createdAt:new Date().toISOString(),completedTasks:saved};
  const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='progresso-ibge-aca-iguatu.json';a.click();URL.revokeObjectURL(url);toast('Cópia do seu progresso exportada.');
});
$('#reset-data').addEventListener('click',()=>{
  if(confirm('Tem certeza de que deseja apagar todas as marcações deste navegador?')){saved={};save();renderTasks();toast('Marcações apagadas.');}
});

renderTasks();updateCountdowns();checkReminder();
setInterval(()=>{updateCountdowns();checkReminder();},60000);
if('Notification' in window && Notification.permission==='granted')$('#notification-status').textContent='Notificações permitidas neste navegador. Os avisos aparecem nos dias do cronograma, enquanto a página está aberta.';
