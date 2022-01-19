
tags = document.querySelectorAll(".lr-imso-ss-wdm.lr-imso-ss-bb table tr")
dd = document.querySelector('.imso_mh__tm-scr.imso_mh__mh-bd.imso_mh__nma')
jour = dd.children[0].children[0].children[0].children[1].children[1].innerText
score = dd.children[0].children[1].children[0].children[0].children[1].children[0].textContent.split('-')

butteur1='';
if(dd.children[1] != undefined && dd.children[1].children[0].children[0] != undefined) {
  for(let j=0; j < dd.children[1].children[0].children[0].children.length; j++) { 
     butteur1 += dd.children[1].children[0].children[0].children[j].textContent + "; "
  }
}


butteur2='';
if(dd.children[1] != undefined && dd.children[1].children[0].children[2] != undefined) {
  for(let j=0; j < dd.children[1].children[0].children[2].children.length; j++) { 
     butteur2 += dd.children[1].children[0].children[2].children[j].textContent + "; "
  }
} 


data = {
  'pays': [],
  'tirs': [],
  'tirs cadrés': [],
  'possession': [],
  'passes': [],
  'précision des passes': [],
  'fautes': [],
  'cartons jaunes': [],
  'cartons rouge': [],
  'hors-jeu': [],
  'corners': [],
  'journée': [],
  'date': [],
  'score': [],
  'points': [],
  'butteurs': []
}

const remplir_stat = (data,tags, i, j) => {
  switch(i) {
            case 1:
                   data['tirs'].push(tags[i].children[j].innerText);
                   break;
            case 2: data['tirs cadrés'].push(tags[i].children[j].innerText);
                   break;
            case 3: data['possession'].push(tags[i].children[j].innerText);
                   break;
            case 3: data['possession'].push(tags[i].children[j].innerText);
                   break;
            case 4: data['passes'].push(tags[i].children[j].innerText);
                   break;
            case 5: data['précision des passes'].push(tags[i].children[j].innerText);
                   break;
            case 6: data['fautes'].push(tags[i].children[j].innerText);
                   break;
            case 7: data['cartons jaunes'].push(tags[i].children[j].innerText);
                   break;
            case 8: data['cartons rouge'].push(tags[i].children[j].innerText);
                   break;
            case 9: data['hors-jeu'].push(tags[i].children[j].innerText);
                   break;
            case 10: data['corners'].push(tags[i].children[j].innerText);
                   break;
         }
}

let dt = new Date()
if(jour == 'Hier')
  dt.setDate(dt.getDate()-1)


let jourSemaine = ['Dim. ', 'Lun. ', 'Mar. ', 'Mer. ', 'Jeu. ', 'Ven. ', 'Sam. ']

for(let i=0; i < tags.length; i++) {
   for(let j=0; j < tags[0].children.length ; j++) {
    	if(i==0 && j==0) {
              data['pays'].push(tags[i].children[j].children[0].children[0].getAttribute('alt'));
              data['journée'].push(2)
              
              if(jour=='Hier') 
                data['date'].push(jourSemaine[dt.getDay()] + dt.getMonth()+1 + '/' + dt.getFullYear())
              else if(jour=="Aujourd’hui")
                data['date'].push(jourSemaine[dt.getDay()] + dt.getMonth()+1 + '/' + dt.getFullYear())
              else
                data['date'].push(jour)

              data['score'].push(score[0])
              if(parseInt(score[0])>parseInt(score[1])) {
                 data['points'].push(3)
              } else if(parseInt(score[0])==parseInt(score[1])) {
                  data['points'].push(1)
              } else {
                  data['points'].push(0)
              }
              data['butteurs'].push(butteur1)
       	} else if(i==0 && j==2) {
              data['pays'].push(tags[i].children[j].children[0].children[0].getAttribute('alt'))
              data['journée'].push(2)

              if(jour=='Hier') 
                data['date'].push(jourSemaine[dt.getDay()] +  dt.getDate()+'/'+ dt.getMonth()+1)
              else if(jour=="Aujourd’hui")
                data['date'].push(jourSemaine[dt.getDay()] +  dt.getDate()+'/'+ dt.getMonth()+1)
              else
                data['date'].push(jour)
              
              data['score'].push(score[1])

              if(parseInt(score[1])>parseInt(score[0])) {
                 data['points'].push(3)
              } else if(parseInt(score[0])==parseInt(score[1])) {
                  data['points'].push(1)
              } else {
                  data['points'].push(0)
              }

              data['butteurs'].push(butteur2)
       	} else if(i!=0 && j == 0) {
              remplir_stat(data,tags, i, j);
       	} else if(i!=0 && j == 2) {
              remplir_stat(data,tags, i, j);
        } 
  }
}

let fichier = data['pays'][0]+'_vs_'+data['pays'][1];
const nomDuFichier = fichier.replace(' ', '_')+'.json';

const telecharger = (contenu, nomDuFichier, contentType) => {
 const a = document.createElement("a");
 const fichier = new Blob([contenu], { type: contentType });
 a.href = URL.createObjectURL(fichier);
 a.download = nomDuFichier;
 a.click();
}



const lancerTelechargement = () => telecharger(JSON.stringify(data), nomDuFichier, "text/plain");


lancerTelechargement()
