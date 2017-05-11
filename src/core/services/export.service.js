(function () {

  'use strict';
  
  angular
    .module('app.core')
    .service('ExportService', ExportService);
    
    ExportService.$inject = [];
    
    function ExportService () {
    
      let service = {
        savePresentation: savePresentation,
        initPresentation: initPresentation
      };
      
      return service;
      
      /**
      * Definição e formatação dos slides relacionados a fase de definição
      */
      function _putTextDefine (pptx, infoList) {
      
        let slide = pptx.addNewSlide();
        
        slide.addText('Definir', { x:0.0, y:0.0, w:'100%', h:1.25, align:'c', font_size: 48, color:'106CC8', fill:'F1F1F1' });
      
        slide.addText("Cliente e Dono do Processo", { x:1.0, y:2.4, w:'40%', h:0.38, color:'0088CC', font_size:24 });
        
        slide.addText(
            'Cliente: ' + infoList.answers.client + '\n' +
            'Dono do processo: ' + infoList.answers.processOwner + '\n'
            ,
            { x:1.0, y:3.9, w:'30%', color:'393939', font_size:20, bullet:{type:'number'} }
        );
        
        slide.addText("Informações sobre qualidade e possível Y", { x:7.0, y:2.4, w:'40%', h:0.38, color:'0088CC', font_size:24 });
        
        slide.addText(
            'Cliente: ' + infoList.answers.client + '\n' +
            'Dono do processo: ' + infoList.answers.processOwner + '\n' + 
            'Voz do cliente (VOC): ' + infoList.answers.voc + '\n' + 
            'Crítico para a Qualidade (CTQ): ' + infoList.answers.voc + '\n',
            { x:7.0, y:5.0, w:'30%', color:'393939', font_size:20, bullet:{type:'number'} }
        );
        
        let slide2 = pptx.addNewSlide();
        
        slide2.addText('Definir', { x:0.0, y:0.0, w:'100%', h:1.25, align:'c', font_size: 48, color:'106CC8', fill:'F1F1F1' });
      
        slide2.addText("Problema/Defeito", { x:2.0, y:2.4, w:'100%', h:0.38, color:'0088CC', font_size:24 });
        
        slide2.addText(
            'Problema: ' + infoList.answers.problem + '\n' +
            'Defeito: ' + infoList.answers.defect + '\n' +
            'Nível atual de defeitos: ' + infoList.answers.defectLevel + '\n'
            ,
            { x:2.0, y:3.9, w:'100%', color:'393939', font_size:20, bullet:{type:'number'} }
        );
        
        let slide3 = pptx.addNewSlide();
        
        slide3.addText('Definir', { x:0.0, y:0.0, w:'100%', h:1.25, align:'c', font_size: 48, color:'106CC8', fill:'F1F1F1' });
      
        slide3.addText("Projeto", { x:2.0, y:2.4, w:'100%', h:0.38, color:'0088CC', font_size:24 });
        
        slide3.addText(
            'Objetivo: ' + infoList.answers.objective + '\n' +
            'Escopo: ' + infoList.answers.scope + '\n' +
            'Ganho Previsto: ' + infoList.answers.earnings + '\n' +
            'Cronograma Macro: ' + infoList.answers.scheduling + '\n'
            ,
            { x:2.0, y:3.9, w:'100%', color:'393939', font_size:20, bullet:{type:'number'} }
        );
        
        let slide4 = pptx.addNewSlide();
        
        slide4.addText('Definir', { x:0.0, y:0.0, w:'100%', h:1.25, align:'c', font_size: 48, color:'106CC8', fill:'F1F1F1' });
      
        slide4.addText("Diagrama SIPOC do projeto", { x:2.0, y:2.4, w:'100%', h:0.38, color:'0088CC', font_size:24 });
        
        slide4.addMedia({ type:'online', link: infoList.answers.sipoc, x:0.5, y:3.0, w:5.00, h:3.00 });
        
      }
      
      /**
      * Definição e formatação dos slides relacionados a fase de medidas
      */
      function _putTextMeasure (pptx, infoList) {
      
        let slide = pptx.addNewSlide();
        
        slide.addText('Medir', { x:0.0, y:0.0, w:'100%', h:1.25, align:'c', font_size: 48, color:'106CC8', fill:'F1F1F1' });
      
        slide.addText("Dados", { x:1.0, y:2.4, w:'100%', h:0.38, color:'0088CC', font_size:24 });
        
        slide.addText(
            'Relação Y, Objetivo e Ganho: ' + infoList.answers.y + '\n' +
            'Dados do Y: ' + infoList.answers.dadosY + '\n' +
            'Possíveis X: ' + infoList.answers.possibleX + '\n' +
            'Meta de Melhoria: ' + infoList.answers.improvementTarget + '\n' +
            'Aposta Financeira: ' + infoList.answers.financialBet + '\n'
            ,
            { x:1.0, y:3.9, w:'100%', color:'393939', font_size:20, bullet:{type:'number'} }
        );
        
        slide.addText("Análises Estatísticas", { x:7.0, y:2.4, w:'40%', h:0.38, color:'0088CC', font_size:24 });
        
      }
      
      /**
      * Definição e formatação dos slides relacionados a fase de análise
      */
      function _putTextAnalyze (pptx, infoList) {
      
        let slide = pptx.addNewSlide();
        
        slide.addText('Analisar', { x:0.0, y:0.0, w:'100%', h:1.25, align:'c', font_size: 48, color:'106CC8', fill:'F1F1F1' });
      
        slide.addText("Revisão das análises estatísticas", { x:1.0, y:2.4, w:'100%', h:0.38, color:'0088CC', font_size:24 });
        
        slide.addText(
            infoList.answers.statistical
            ,
            { x:1.0, y:3.9, w:'100%', color:'393939', font_size:20, bullet:{type:'number'} }
        );
        
       let slide2 = pptx.addNewSlide();
        
        slide2.addText('Analisar', { x:0.0, y:0.0, w:'100%', h:1.25, align:'c', font_size: 48, color:'106CC8', fill:'F1F1F1' });
      
        slide2.addText("FMEA", { x:0.0, y:2.4, w:'100%', h:0.38, align:'c', color:'0088CC', font_size:24 });        
        
        let rows = [
          [
              { text: 'Etapa do Processo', opts: { valign:'t', align:'c', font_face:'Verdana' } },
              { text: 'Modo de Falha Potencial', opts: { valign:'t', align:'c', font_face:'Verdana' } },
              { text: 'Potencial Efeito', opts: { valign:'t', align:'c', font_face:'Verdana' } },
              { text: 'SEV', opts: { valign:'t', align:'c', font_face:'Verdana' } },
              { text: 'Potenciais Causas', opts: { valign:'t', align:'c', font_face:'Verdana' } },
              { text: 'OCC', opts: { valign:'t', align:'c', font_face:'Verdana' } },
              { text: 'Controles Atuais', opts: { valign:'t', align:'c', font_face:'Verdana' } },              
              { text: 'DET', opts: { valign:'t', align:'c', font_face:'Verdana' } },
              { text: 'RPN', opts: { valign:'t', align:'c', font_face:'Verdana' } }              
          ]
        ];
        
        angular.forEach(infoList.answers.fmea, function (item) {
          rows.push([
              { text: item.etapa, opts: { valign:'t', align:'c', font_face:'Verdana' } },
              { text: item.falha, opts: { valign:'t', align:'c', font_face:'Verdana' } },
              { text: item.efeito, opts: { valign:'t', align:'c', font_face:'Verdana' } },
              { text: item.sev, opts: { valign:'t', align:'c', font_face:'Verdana' } },
              { text: item.causas, opts: { valign:'t', align:'c', font_face:'Verdana' } },
              { text: item.occ, opts: { valign:'t', align:'c', font_face:'Verdana' } },
              { text: item.controles, opts: { valign:'t', align:'c', font_face:'Verdana' } },              
              { text: item.det, opts: { valign:'t', align:'c', font_face:'Verdana' } },
              { text: item.rpn.toString(), opts: { valign:'t', align:'c', font_face:'Verdana' } }              
          ]);
        });
        
        let tabOpts = { x:0.0, y:3.5, w:'100%' };
        let celOpts = {
          fill:'dfefff', font_size:18, color:'6f9fc9', rowH:0.6,
          valign:'m', align:'c', border:{ pt:'1', color:'FFFFFF' }
        };
        
        slide2.addTable( rows, tabOpts, celOpts );
        
      }
      
      /**
      * Definição e formatação dos slides relacionados a fase de melhoria
      */
      function _putTextImprove (pptx, infoList) {
      
        let slide = pptx.addNewSlide();
        
        slide.addText('Melhorar', { x:0.0, y:0.0, w:'100%', h:1.25, align:'c', font_size: 48, color:'106CC8', fill:'F1F1F1' });
      
        slide.addText("Dados", { x:1.0, y:2.4, w:'100%', h:0.38, color:'0088CC', font_size:24 });
        
        slide.addText(
            'Relação Y, Objetivo e Ganho: ' + infoList.answers.y + '\n' +
            'Dados do Y: ' + infoList.answers.dadosY + '\n' +
            'Possíveis X: ' + infoList.answers.possibleX + '\n' +
            'Meta de Melhoria: ' + infoList.answers.improvementTarget + '\n' +
            'Aposta Financeira: ' + infoList.answers.financialBet + '\n'
            ,
            { x:1.0, y:3.9, w:'100%', color:'393939', font_size:20, bullet:{type:'number'} }
        );
        
        slide.addText("Análises Estatísticas", { x:7.0, y:2.4, w:'40%', h:0.38, color:'0088CC', font_size:24 });
        
      }
      
      /**
      * Definição e formatação dos slides relacionados a fase de controle
      */
      function _putTextControl (pptx, infoList) {
      
        let slide = pptx.addNewSlide();
        
        slide.addText('Controlar', { x:0.0, y:0.0, w:'100%', h:1.25, align:'c', font_size: 48, color:'106CC8', fill:'F1F1F1' });
      
        slide.addText("Dados", { x:1.0, y:2.4, w:'100%', h:0.38, color:'0088CC', font_size:24 });
        
        slide.addText(
            'Relação Y, Objetivo e Ganho: ' + infoList.answers.y + '\n' +
            'Dados do Y: ' + infoList.answers.dadosY + '\n' +
            'Possíveis X: ' + infoList.answers.possibleX + '\n' +
            'Meta de Melhoria: ' + infoList.answers.improvementTarget + '\n' +
            'Aposta Financeira: ' + infoList.answers.financialBet + '\n'
            ,
            { x:1.0, y:3.9, w:'100%', color:'393939', font_size:20, bullet:{type:'number'} }
        );
        
        slide.addText("Análises Estatísticas", { x:7.0, y:2.4, w:'40%', h:0.38, color:'0088CC', font_size:24 });
        
      }
      
      function initPresentation (project) {
      
        let pptx = new PptxGenJS();
        pptx.setLayout('LAYOUT_WIDE');
        
        // init presentation with metadata
        pptx.setAuthor('SixSigma Helper');
        pptx.setCompany('Unicamp');
        pptx.setTitle(project.name);
        
        let main = pptx.addNewSlide();
        
        main.addText(project.name, { x:'50%', y:'50%', font_size:42, color: '106CC8' });       
           
        _putTextDefine(pptx, project.phases.define);
        
        _putTextMeasure(pptx, project.phases.measure);
        
        _putTextAnalyze(pptx, project.phases.analyze);
        
        _putTextImprove(pptx, project.phases.improve);
        
        _putTextControl(pptx, project.phases.control);
        
        return pptx;
      }
      
      function savePresentation (pptx) {
        pptx.save('Sample Presentation');
      } 
    }

})();