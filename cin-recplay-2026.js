(function () {
  "use strict";

  // Dias do evento: cada dia vale 24h a partir de "ini" (horário de Brasília).
  var DIAS = [
    { d: "11", ini: "2026-11-11T00:00:00-03:00" },
    { d: "12", ini: "2026-11-12T00:00:00-03:00" },
    { d: "13", ini: "2026-11-13T00:00:00-03:00" },
    { d: "14", ini: "2026-11-14T00:00:00-03:00" }
  ];

  // Dia selecionado automaticamente: dentro do evento, o dia corrente;
  // antes do evento, o primeiro dia (pré-seleção); depois do último, o último dia.
  function diaAtual(agora) {
    var t = agora.getTime(), sel = DIAS[0].d;
    DIAS.forEach(function (x) {
      if (t >= new Date(x.ini).getTime()) sel = x.d;
    });
    return sel;
  }

  var A = [
    { t:0, n:"Dirigindo entre dois mundos: experiências automotivas do futuro", p:["Francisco Simões","João Marcelo Teixeira","João Moizes"], h:"10:00–18:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Mobilidade","Tecnologia"], d:["11","12"] },
    { t:0, n:"IA e a nova geração de devs", p:["Giordano Cabral","Pedro Heimann","Josiane Assis"], h:"11:00–12:00", l:"Espaço Educa REC'n'Play · Paço Alfândega", q:"Paço Alfândega, R. Alfândega, 35, Recife - PE", g:["IA","Educação"], d:["11"] },
    { t:0, n:"Muito além do networking: o poder das comunidades de tecnologia", p:["Larissa Cavalcanti","Elisa Santos","Lucas Ximenes","Italo Araújo"], h:"14:20–15:20", l:"E.T.E. Porto Digital · Sala 3", q:"E.T.E. Porto Digital, Av. Rio Branco, 193, Recife - PE", g:["Carreira","Comunidades"], d:["11"] },
    { t:0, n:"Empreendedorismo na universidade: formando quem transforma o futuro", p:["Daniel Fernandes","Ricardo Rocha","Gabriel Albuquerque"], h:"15:20–16:20", l:"CESAR School · Bloco A, Sala 204", q:"Cesar School, Av. Cais do Apolo, 77, Recife - PE", g:["Empreendedorismo","Inovação"], d:["11"] },
    { t:0, n:"Construindo tecnologias de ponta: desmistificando a relação entre pós-graduação e o mercado", p:["Francisco Simões","Thifany Souza","André Buarque"], h:"15:20–16:20", l:"Casa Zero · Auditório Urbano Vitalino", q:"Casa Zero, R. do Bom Jesus, 237, Recife - PE", g:["Carreira","Pesquisa"], d:["11"] },
    { t:0, n:"Gambiarra LLM Club: demonstração e conversa sobre IA caseira", p:["Filipe Calegario","Arthur Medeiros","Jonathas Rocha"], h:"16:40–17:40", l:"CESAR School · Bloco B, Salas 001/002", q:"Cesar School, Av. Cais do Apolo, 77, Recife - PE", g:["IA","Games"], d:["11"] },
    { t:0, n:"Deep techs: ciência e impacto global", p:["Simone Almeida","José William","Poliana Silva","José Yago Silva"], h:"11:40–12:40", l:"E.T.E. Porto Digital · Sala 3", q:"E.T.E. Porto Digital, Av. Rio Branco, 193, Recife - PE", g:["Deep Tech","Inovação"], d:["11"] },
    { t:0, n:"Entre conjecturas e análises: o papel da quântica no desenvolvimento do Nordeste", p:["Ludmila Magnani","João Victor Cardoso","Sérgio Vasconcelos"], h:"10:20–11:20", l:"CESAR School · Bloco A, Arquibancada", q:"Cesar School, Av. Cais do Apolo, 77, Recife - PE", g:["Quântica","Tecnologia"], d:["11"] },
    { t:0, n:"Quantum Recife: explorando o Entanglion na capital do frevo", p:["Ludmila Magnani","Artur Reis","Telmo Calheiros","Luiz Felipe Santos"], h:"15:00–18:00", l:"Livraria Jaqueira · Adega", q:"Livraria Jaqueira, R. Me. de Deus, 110, Recife - PE", g:["Quântica","Games"], d:["11","12","13"] },
    { t:0, n:"Da primeira oportunidade à liderança: mulheres que abriram caminho", p:["Virgínia Heimann","Melissa Dezan","Maria Clara Barroso"], h:"18:00–19:00", l:"Livraria Jaqueira · Galeria", q:"Livraria Jaqueira, R. Me. de Deus, 110, Recife - PE", g:["Carreira","Diversidade"], d:["11"] },
    { t:0, n:"Quem é o profissional de desenvolvimento de software na era dos agentes inteligentes?", p:["Paulo Borba","Andrea Queiroz","Massilon Júnior","Carlos Victor Gomes"], h:"11:20–12:20", l:"UNIAESO · Sala 1", q:"UNIAESO, Rua do Bom Jesus, 137, Recife - PE", g:["IA","Engenharia de Software"], d:["12"] },
    { t:0, n:"Do seu conhecimento à IA e Ciência de Dados: transforme sua carreira com o CIn-UFPE", p:["Paulo Salgado"], h:"15:20–16:20", l:"E.T.E. Porto Digital · Sala 3", q:"E.T.E. Porto Digital, Av. Rio Branco, 193, Recife - PE", g:["Dados","Carreira"], d:["12"] },
    { t:0, n:"CIn/UFPE Conecta: universidade, empresas e governo pela inovação", p:["Juliano Iyoda","Cleber Zanchettin"], h:"18:00–19:00", l:"CESAR School · Bloco A, Sala 204", q:"Cesar School, Av. Cais do Apolo, 77, Recife - PE", g:["Inovação","Empreendedorismo"], d:["12"] },
    { t:0, n:"As novas fronteiras da alfabetização digital: o que significa incluir digitalmente uma pessoa idosa em 2026?", p:["Millena Marçal","Yasmin Soares","João Guilherme Ramos"], h:"18:00–19:00", l:"CESAR School · Bloco C, Sala 111", q:"Cesar School, Av. Cais do Apolo, 77, Recife - PE", g:["Inclusão Digital","Educação"], d:["12"] },
    { t:0, n:"O mar de possibilidades de uma carreira em tecnologia", p:["Letícia Pedrosa","Eduarda Santana","Byanca Silva","Karem Santos","Alany Siqueira"], h:"10:00–11:00", l:"CESAR School · Bloco A, Arquibancada", q:"Cesar School, Av. Cais do Apolo, 77, Recife - PE", g:["Carreira","Tecnologia"], d:["12"] },
    { t:0, n:"TDC Stage: adoção, cultura e letramento em IA — e se Chico Science encontrasse a inteligência artificial?", p:["Aguinaldo Flor"], h:"11:35", l:"Moinho Recife · Sala Manguezal", q:"Moinho Recife, Av. Alfredo Lisboa, 810, Recife - PE", g:["IA","Cultura"], d:["11"] },
    { t:0, n:"Construindo tecnologias de ponta: desmistificando a relação entre pós-graduação e o mercado", p:["Francisco Simões","Thifany Souza","André Buarque","Willams Costa","João Moizes"], h:"15:40–16:40", l:"E.T.E. Porto Digital · Sala 4", q:"E.T.E. Porto Digital, Av. Rio Branco, 193, Recife - PE", g:["Carreira","Pesquisa"], d:["12"] },
    { t:0, n:"Supertalentos: iniciativas de apoio a jovens superdotados", p:["Paulo Adeodato","Pierre Lucena","Olzeni Ribeiro","Ricardo Matheus","Carla Brolezzi"], h:"13:00–14:00", l:"Arena de Educação CESAR · Palco Externo", q:"Arena de Educação CESAR, Rua Bione, Cais do Apolo, 220, Recife - PE", g:["Educação","Inovação"], d:["12"] },
    { t:0, n:"Jovens supertalentos em ação: projetos de macroalgas e tecnologia", p:["Estudantes do Programa Supertalentos","Especialistas do SENAC-PE","UFPE"], h:"14:20–16:20", l:"Arena de Educação CESAR · Mezanino", q:"Arena de Educação CESAR, Rua Bione, Cais do Apolo, 220, Recife - PE", g:["Educação","Ciência"], d:["12"] },
    { t:0, n:"Mostra Supertalentos: ciência, tecnologia e resultados em exposição", p:["Paulo Adeodato","Severino Alves Júnior","Bruno Campello de Souza","Starch Melo de Souza","Ana de Cássia Monteiro de Lemos Silva","Jessica Acioly dos Santos"], h:"09:00–12:40", l:"Senac · Galeria", q:"Senac, R. do Apolo, 235, Recife - PE", g:["Educação","Ciência"], d:["13"] },
    { t:0, n:"Copiloto ou piloto? Até onde a IA pode pensar no lugar de quem programa", p:["Kiev Gama","Vinícius Garcia","Rodrigo Bonifácio","Paola Accioly"], h:"10:00–11:00", l:"E.T.E. Porto Digital · Sala 3", q:"E.T.E. Porto Digital, Av. Rio Branco, 193, Recife - PE", g:["IA","Engenharia de Software"], d:["13"] },
    { t:0, n:"Dirigindo entre dois mundos: experiências automotivas do futuro", p:["Francisco Simões","João Marcelo Teixeira","João Moizes"], h:"10:00–11:00", l:"Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Mobilidade","Tecnologia"], d:["13"] },
    { t:0, n:"Fluência em IA para empresas: como se manter sempre à frente na corrida tecnológica?", p:["Giordano Cabral","Filipe Calegario","Rafael Palermo"], h:"10:00–11:00", l:"CESAR School · Bloco A, Arquibancada", q:"Cesar School, Av. Cais do Apolo, 77, Recife - PE", g:["IA","Empreendedorismo"], d:["13"] },
    { t:0, n:"Como construir um plano estratégico de IA para meu negócio", p:["Germano Vasconcelos","Geber Ramalho","Giordano Cabral"], h:"12:40–13:40", l:"CESAR School · Bloco A, Sala 204", q:"Cesar School, Av. Cais do Apolo, 77, Recife - PE", g:["IA","Empreendedorismo"], d:["13"] },
    { t:0, n:"Debug Arena", p:["André Bartholomeu","Nathanael Silva","Douglas Silva"], h:"13:20–16:20", l:"UNIAESO · LAB", q:"UNIAESO, Rua do Bom Jesus, 137, Recife - PE", g:["Engenharia de Software","Games"], d:["13"] },
    { t:0, n:"Como a IA está transformando a Engenharia de Software?", p:["Paulo Borba","Rodrigo Bonifácio"], h:"14:00–14:45", l:"Ponto BB · Palco BBDW", q:"Ponto BB - Palco BBDW, Av. Rio Branco, 240, Recife - PE", g:["IA","Engenharia de Software"], d:["13"] },
    { t:1, n:"Live", p:[], h:"10:00–18:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Tecnologia"], d:["11"] },
    { t:1, n:"SEAL", p:[], h:"12:00–18:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Tecnologia"], d:["11"] },
    { t:1, n:"LAJE", p:[], h:"15:00–18:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Games"], d:["11"] },
    { t:1, n:"Live", p:[], h:"10:00–12:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Tecnologia"], d:["12"] },
    { t:1, n:"SEAL", p:[], h:"10:00–12:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Tecnologia"], d:["12"] },
    { t:1, n:"Voxar", p:[], h:"12:00–15:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Visão Computacional"], d:["12"] },
    { t:1, n:"LED", p:[], h:"15:00–18:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Tecnologia"], d:["12"] },
    { t:1, n:"LAJE", p:[], h:"15:00–18:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Games"], d:["12"] },
    { t:1, n:"RobôCIn", p:[], h:"10:00–18:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Robótica"], d:["13"] },
    { t:1, n:"LED", p:[], h:"10:00–18:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Tecnologia"], d:["13"] },
    { t:1, n:"LAJE", p:[], h:"10:00–15:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Games"], d:["13"] },
    { t:1, n:"SEAL", p:[], h:"12:00–15:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Tecnologia"], d:["13"] },
    { t:1, n:"Laser", p:[], h:"12:00–18:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Tecnologia"], d:["13"] },
    { t:1, n:"RobôCIn", p:[], h:"10:00–18:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Robótica"], d:["14"] },
    { t:1, n:"LED", p:[], h:"10:00–18:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Tecnologia"], d:["14"] },
    { t:1, n:"LAJE", p:[], h:"10:00–15:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Games"], d:["14"] },
    { t:1, n:"Laser", p:[], h:"12:00–18:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Tecnologia"], d:["14"] },
    { t:1, n:"SEAL", p:[], h:"12:00–18:00", l:"Stand do CIn · Espaço CIn-UFPE", q:"Espaço CIn-UFPE, R. Vig. Tenório, 95, Recife - PE", g:["Tecnologia"], d:["14"] }
  ];

  var N = [
    {
      slug:"supertalentos",
      t:"Conheça a iniciativa do CIn-UFPE para desenvolver jovens com superdotação intelectual",
      s:"No REC’n’Play 2026, instituição apresentará o Programa Supertalentos, que oferece formação científica gratuita a jovens com superdotação intelectual",
      dt:"09/11/2026, 10:55",
      img:"",
      url:"/noticias/supertalentos/",
      x:"O CIn-UFPE apresentará o Programa Supertalentos no REC’n’Play 2026, com debate, pitches e mostra nos dias 12 e 13 de novembro.",
      html:`<p>O Centro de Informática (CIn) da Universidade Federal de Pernambuco (UFPE) colocará o desenvolvimento de estudantes com superdotação intelectual em pauta no REC’n’Play 2026. Nos dias 12 e 13 de novembro, a instituição apresentará o Programa Supertalentos, conduzido pela UFPE, coordenado pelo CIn, em parceria com o Serviço Nacional de Aprendizagem Comercial em Pernambuco (SENAC-PE), o fundo Social Entrepreneurship Holding Ltda. e a AppCETech, empresa deep tech do Porto Digital.</p>
<p>O Programa Supertalentos promove formação científica gratuita nas áreas de Ciência, Tecnologia, Engenharia e Matemática (STEM), com atividades de pesquisa, desenvolvimento e inovação. A iniciativa busca desenvolver as competências dos participantes e ampliar suas oportunidades de formação e carreira. O programa também oferece acompanhamento psicopedagógico, voltado às necessidades educacionais e emocionais dos participantes.</p>
<p>No dia 12 de novembro, das 13h às 14h, na Arena de Educação CESAR - Palco Externo, o professor Paulo Adeodato (CIn-UFPE) participará do debate “Supertalentos: iniciativas de apoio a jovens superdotados”, ao lado de Pierre Lucena (Porto Digital), Olzeni Ribeiro (Instituto do Neurodesenvolvimento), do professor Ricardo D’Elias Matheus (Instituto Principia) e de Carla Brolezzi (Superdotação no Mapa).</p>
<p>Na sequência, das 14h20 às 16h20, na Arena de Educação CESAR - Mezanino, estudantes participantes do programa apresentarão pitches de soluções desenvolvidas nas áreas de macroalgas e tecnologia. Já no dia 13 de novembro, das 9h às 12h40, a Mostra Supertalentos reunirá demonstrações práticas de projetos, experimentos e resultados conduzidos pela equipe e pelos jovens do programa, na Galeria do SENAC-PE, no Porto Digital.</p>
<p>O professor Paulo Adeodato, do CIn-UFPE, base tecnológica do programa, ressalta que a universidade já atua como agente de desenvolvimento e geração de riqueza para Pernambuco. Segundo ele, iniciativas como o Programa Supertalentos podem contribuir para reter talentos e a riqueza patrimonial gerada no estado, podendo essa metodologia vir a ser replicada para reter os talentos e riqueza nos seus locais de origem.</p>
<h2>Confira a programação</h2>
<p><strong>12 de novembro | Arena de Educação CESAR - Palco Externo</strong></p>
<p><strong>Das 13h às 14h | Debate: Supertalentos: iniciativas de apoio a jovens superdotados</strong></p>
<p>Com Pierre Lucena (Porto Digital), o professor Paulo Adeodato (CIn-UFPE), Olzeni Ribeiro (Instituto do Neurodesenvolvimento), o professor Ricardo D’Elias Matheus (Instituto Principia) e Carla Brolezzi (Superdotação no Mapa).</p>
<p>Entrada com inscrição prévia.</p>
<p><strong>12 de novembro | Arena de Educação CESAR - Mezanino</strong></p>
<p><strong>Das 14h20 às 16h20 | Pitches: Jovens supertalentos em ação: projetos de macroalgas e tecnologia</strong></p>
<p>Apresentação das soluções dos estudantes, com a presença de especialistas do SENAC-PE, da UFPE e da AppCETech.</p>
<p>Acesso por ordem de chegada.</p>
<p><strong>13 de novembro, das 9h às 12h40 | SENAC-PE - Galeria (Porto Digital)</strong></p>
<p>Mostra Supertalentos: demonstração prática de projetos, experimentos e resultados conduzidos pela equipe e pelos jovens do programa.</p>
<h2>Sobre o Programa Supertalentos</h2>
<p>O Programa Supertalentos é uma iniciativa conduzida pela UFPE, coordenada pelo CIn-UFPE, em parceria com o SENAC-PE, o fundo Social Entrepreneurship Holding Ltda. e a AppCETech. Seu objetivo é identificar e acompanhar estudantes de 12 a 17 anos com indicadores de superdotação intelectual, oferecendo percursos de aprofundamento e acompanhamento pedagógico. Por meio da Aprendizagem Baseada em Projetos (PBL), os participantes desenvolvem atividades de pesquisa em STEM, com capacitação em métodos científicos e uso de inteligência artificial generativa.</p>
<h2>Sobre o REC’n’Play</h2>
<p>O REC’n’Play é um festival gratuito de inovação, tecnologia, criatividade e cultura. Em 2026, será realizado de 11 a 14 de novembro, no Bairro do Recife, com oficinas, debates, experiências e apresentações culturais. A programação e as inscrições para o festival estão disponíveis em <a href="https://recnplay.pe/" target="_blank" rel="noopener">recnplay.pe</a>.</p>
<h2>Sobre o CIn-UFPE</h2>
<p>Com cinco décadas de história, o Centro de Informática (CIn) da UFPE é reconhecido como um dos principais polos de ensino e pesquisa em Computação na América Latina. Oferecendo quatro cursos de graduação (Ciência da Computação, Engenharia da Computação, Sistemas de Informação e Inteligência Artificial), o CIn-UFPE recebe, anualmente, cerca de 350 novos alunos e já formou mais de 2.300 profissionais que atuam em nível nacional e internacional.</p>
<p>O Centro também é referência pela excelência de seus programas de pós-graduação, especialmente o Programa Acadêmico em Ciência da Computação, que possui nota máxima (7) na avaliação da Capes. No Ranking Universitário Folha (RUF) 2026, o CIn-UFPE figura entre os cinco melhores do país na área de Computação. Além disso, o Centro atua na formação de startups de tecnologia e na colaboração com mais de 40 empresas, nacionais e internacionais, por meio de parcerias estratégicas.</p>`
    }
  ];

  var L =
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='146 113 561 76' role='img' aria-label='REC n Play 2026'><g fill='#ec008c'><path d='M343.28,161.12v-17.8c0-4.98-4.05-9.03-9.03-9.03-1.84,0-6.31.99-11.22,2.23v-3.87h-8.45v32.2h8.45v-19.55c5.25-1.35,9.79-2.45,10.56-2.45s1.22,1.59,1.22,4.23v1.45h0v12.59c0,7,5.66,12.76,12.75,12.76h5.43v-8.63h-5.59c-2.49,0-4.12-1.63-4.12-4.12Z'/><path d='M294.03,118.22h-20.42c-7.13,0-12.81,5.69-12.81,12.81v40.9c0,7.03,5.68,12.81,12.81,12.81h20.42c7.13,0,12.81-5.78,12.81-12.81v-6.94h-8.67v6.94c0,2.5-1.64,4.14-4.14,4.14h-20.42c-2.5,0-4.14-1.64-4.14-4.14v-40.9c0-2.5,1.64-4.14,4.14-4.14h20.42c2.5,0,4.14,1.64,4.14,4.14v7.22h8.67v-7.22c0-7.13-5.69-12.81-12.81-12.81Z'/><path d='M186.62,118.22h-38.67v8.67h5.43v56.89h8.67v-11.85h0v-7.03l20.84-3.03,3.52,19.6c.29,1.64,2.12,3.28,4.14,3.28h8.87v-8.67h-4.73c-.77,0-.96-1.25-.96-1.25l-2.36-14.58c4.71-1.99,8.05-4.63,8.05-13.36v-17.1c0-2.19-.8-4.18-2.08-5.76-2.28-3.5-6.21-5.8-10.73-5.8ZM190.76,138.74v5.73c0,4.24-.19,6.55-2.89,7.71l-25.81,3.87v-8.69h0v-20.47h24.57c2.5,0,4.14,1.64,4.14,4.14v7.71Z'/><path d='M240.32,118.22h-20.42c-7.13,0-12.81,5.69-12.81,12.81v41.19h.03s0,.02,0,.03c.02.85.12,1.68.3,2.49.03.12.08.23.11.35.17.67.37,1.33.64,1.96.17.4.4.75.61,1.12.18.32.33.66.54.97.41.61.88,1.16,1.38,1.68.05.05.09.12.14.16,1.72,1.73,3.92,2.97,6.42,3.48.02,0,.04.01.06.02.84.17,1.7.26,2.59.26h20.42c7.13,0,12.81-5.69,12.81-12.81v-6.94h-8.67v6.94c0,2.5-1.64,4.14-4.14,4.14h-20.42c-2.5,0-4.13-1.64-4.14-4.13v-13.53s23.44-3.56,26.49-4.1c5.79-1.04,10.89-3.95,10.89-13.91v-9.36c0-7.13-5.69-12.81-12.81-12.81ZM244.47,137.99c0,4.24-.19,6.55-2.89,7.71l-25.81,3.93v-8.75h0v-9.19c0-3.15,1.64-4.79,4.14-4.79h20.42c2.5,0,4.14,1.64,4.14,4.14v6.96Z'/><path d='M423.11,174.29v-55.71h-8.73v55.71c0,7,5.66,12.75,12.75,12.75h5.95v-8.63h-5.75c-2.49,0-4.22-1.63-4.22-4.12Z'/><path d='M463.72,118.45h-18.22c-7.09,0-12.75,5.66-12.75,12.75v1.63h8.63v-1.63c0-2.49,1.63-4.12,4.12-4.12h18.22c2.49,0,4.12,1.63,4.12,4.12v7l-27.71,4.03c-5.47,2.11-9.49,4.31-9.49,13.91v8.53c0,5.08,4.12,9.21,9.21,9.21s28-6.91,28-6.91v6.91h8.63v-42.87c0-6.9-5.66-12.56-12.75-12.56ZM467.85,158.34s-25.31,6.81-27.33,6.81c-.76,0-1.25-1.63-1.25-4.31v-2.3c0-4.22.19-6.52,2.88-7.67l25.7-4.51v11.99Z'/><path d='M527.54,119.31h-8.63l-6.82,42.35c-5.59,1.46-12.89,3.32-14.12,3.32-.76,0-2.6-.29-3.34-4.05l-6.7-41.62h-8.82l7.9,46.47c.04.3.09.59.15.88l.02.11h0c.96,4.06,4.6,7.1,8.95,7.1,2.73,0,8.95-1.49,14.16-2.88l-.22,2.88-2.21,14h8.24l11.41-68.37-.1.09.1-.28Z'/><path d='M396.81,118.26c-4.2,0-21.81,5.02-27.84,6.78v-6.59h-8.63v69.24h8.63v-13.81h24.29c7.09,0,12.75-5.75,12.75-12.76v-33.66c0-5.08-4.13-9.21-9.21-9.21ZM397.39,150.08v11.04c0,2.49-1.63,4.12-4.12,4.12h-24.29v-31.44c6.35-1.71,25.49-6.82,27.17-6.82.76,0,1.25,1.63,1.25,4.31v18.78Z'/><polygon points='343.23 128.58 348.65 139.86 354.76 137.1 350.17 125.43 343.23 128.58'/></g><g fill='#ec5515'><path d='M573.45,175.13c.98-.43,1.82-1.21,2.53-2.32.7-1.11,1.44-2.84,2.2-5.17l1.71.57-2.85,8.72-1.55,4.81h-33.89v-1.87c5.98-6.57,10.85-12.29,14.63-17.15,3.77-4.86,6.86-9.82,9.25-14.87,2.39-5.05,3.59-9.99,3.59-14.83,0-3.64-.8-6.54-2.4-8.72-1.6-2.17-4.06-3.26-7.37-3.26-3.97,0-7.05,1.68-9.25,5.05-2.2,3.37-3.35,7.96-3.46,13.77h-1.96c0-4.89.71-9.19,2.12-12.91,1.41-3.72,3.43-6.6,6.07-8.64,2.63-2.04,5.77-3.06,9.41-3.06,4.51,0,7.93,1.39,10.27,4.16,2.33,2.77,3.5,6.33,3.5,10.67,0,7.17-2.54,14.52-7.62,22.04-5.08,7.52-11.53,15.33-19.35,23.42v.24h20.29c1.79,0,3.18-.22,4.16-.65Z'/><path d='M593.28,178.47c-2.74-2.99-4.81-7.06-6.19-12.22-1.38-5.16-2.08-10.94-2.08-17.35s.69-12.07,2.08-17.15c1.38-5.08,3.45-9.1,6.19-12.06,2.74-2.96,6.1-4.44,10.06-4.44s7.32,1.48,10.06,4.44c2.74,2.96,4.81,6.98,6.19,12.06,1.39,5.08,2.08,10.8,2.08,17.15s-.69,12.19-2.08,17.35c-1.38,5.16-3.45,9.23-6.19,12.22-2.74,2.99-6.1,4.48-10.06,4.48s-7.32-1.49-10.06-4.48ZM611.74,171.55c1.79-5.59,2.69-13.14,2.69-22.65s-.9-16.78-2.69-22.32c-1.79-5.54-4.59-8.31-8.39-8.31s-6.6,2.77-8.39,8.31c-1.79,5.54-2.69,12.98-2.69,22.32s.9,17.06,2.69,22.65c1.79,5.59,4.59,8.39,8.39,8.39s6.6-2.8,8.39-8.39Z'/><path d='M658.1,175.13c.98-.43,1.82-1.21,2.53-2.32.7-1.11,1.44-2.84,2.2-5.17l1.71.57-2.85,8.72-1.55,4.81h-33.89v-1.87c5.98-6.57,10.85-12.29,14.63-17.15,3.77-4.86,6.86-9.82,9.25-14.87,2.39-5.05,3.59-9.99,3.59-14.83,0-3.64-.8-6.54-2.4-8.72-1.6-2.17-4.06-3.26-7.37-3.26-3.97,0-7.05,1.68-9.25,5.05-2.2,3.37-3.35,7.96-3.46,13.77h-1.96c0-4.89.71-9.19,2.12-12.91,1.41-3.72,3.43-6.6,6.07-8.64,2.63-2.04,5.77-3.06,9.41-3.06,4.51,0,7.93,1.39,10.27,4.16,2.33,2.77,3.5,6.33,3.5,10.67,0,7.17-2.54,14.52-7.62,22.04-5.08,7.52-11.53,15.33-19.35,23.42v.24h20.29c1.79,0,3.18-.22,4.16-.65Z'/><path d='M701.24,143.31c2.58,3.99,3.87,8.98,3.87,14.95,0,4.18-.64,8.16-1.91,11.94-1.28,3.78-3.22,6.86-5.83,9.25s-5.79,3.58-9.53,3.58-7.06-1.14-9.78-3.42c-2.72-2.28-4.79-5.49-6.23-9.61-1.44-4.13-2.16-8.88-2.16-14.26,0-6.9,1.24-13.21,3.71-18.94,2.47-5.73,6.11-10.5,10.92-14.3,4.81-3.8,10.55-6.33,17.23-7.58v1.79c-6.3,1.74-11.34,5-15.11,9.78-3.78,4.78-6.42,10.43-7.94,16.95,1.36-1.79,3.03-3.26,5.01-4.4,1.98-1.14,4.14-1.71,6.48-1.71,4.94,0,8.7,2,11.28,5.99ZM695.25,174.72c1.68-3.48,2.52-8.36,2.52-14.67,0-5.65-.77-10.31-2.32-13.97s-4.06-5.5-7.54-5.5c-2.07,0-3.98.58-5.74,1.75-1.77,1.17-3.25,2.84-4.44,5.01-.49,3.26-.73,6.52-.73,9.78,0,7.06.95,12.63,2.85,16.7,1.9,4.07,4.56,6.11,7.99,6.11s5.73-1.74,7.41-5.21Z'/></g></svg>";

  var CSS =
    ":host{all:initial;display:block}*{box-sizing:border-box}" +
    ".w{--m:'Space Grotesk',system-ui,sans-serif;--k:#f7f2e8;--u:#a49c90;--p:#ec008c;--o:#ec5515;--l:#ec5515;--c:linear-gradient(110deg,#fff,#ffb3e1 22%,#ff7a3c 40%,#b6ff8a 62%,#b49bff 80%,#fff);background:radial-gradient(70% 55% at 12% 0,#3a0044,transparent 60%),#050505;color:var(--k);font:16px/1.5 var(--m);position:relative;overflow:hidden}" +
    "header{display:flex;align-items:center;justify-content:flex-start;gap:16px;flex-wrap:wrap;padding:16px 4vw;border-bottom:1px solid #fff2}" +
    ".brand{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.cn{color:#ec008c;font:700 clamp(18px,2.4vw,30px)/1 var(--m);letter-spacing:-.01em}.brand svg{display:block;height:clamp(18px,2.4vw,30px);width:auto}" +
    ".hero{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center;padding:6vw 4vw}" +
    ".k{font:700 10px var(--m);color:var(--l);margin:0}" +
    "h1{font:700 clamp(48px,10vw,120px)/.86 'Barlow Condensed',Impact,sans-serif;margin:14px 0 18px}" +
    "h1 em{font-style:normal;background:var(--c);-webkit-background-clip:text;background-clip:text;color:transparent}" +
    ".star{display:block;width:clamp(90px,18vw,190px);aspect-ratio:1;background:var(--c);clip-path:polygon(50% 0,58% 34%,85% 15%,66% 42%,100% 50%,66% 58%,85% 85%,58% 66%,50% 100%,42% 66%,15% 85%,34% 58%,0 50%,34% 42%,15% 15%,42% 34%)}" +
    "main{padding:0 4vw 48px}.sec{display:flex;align-items:center;gap:9px;font:700 11px var(--m);margin:0 0 18px}" +
    ".vtabs{display:flex;gap:26px;border-bottom:1px solid #fff2;margin:0 0 22px}" +
    ".vtab{background:none;border:0;border-bottom:2px solid transparent;margin-bottom:-1px;padding:0 0 12px;color:var(--u);font:600 15px var(--m);cursor:pointer;transition:.2s}.vtab[aria-pressed=true]{color:var(--k);border-color:var(--l)}" +
    ".news{display:grid;grid-template-columns:minmax(220px,40%) 1fr;gap:24px;background:linear-gradient(#0b0b0b,#080808) padding-box,var(--c) border-box;border:1px solid transparent;border-radius:12px;padding:20px;margin:0 0 18px}.news.noimg{grid-template-columns:1fr}" +
    ".news-img{display:flex;align-items:center;justify-content:center;background:#0b0b0b;border-radius:8px;overflow:hidden}.news-img img{display:block;width:100%;height:auto;max-height:340px;object-fit:contain}" +
    ".news-date{font:600 11px var(--m);letter-spacing:.08em;color:var(--l);text-transform:uppercase;margin-bottom:8px}" +
    ".news h3{font:700 clamp(24px,3vw,32px)/1.06 'Barlow Condensed',Impact,sans-serif;margin:0 0 8px}" +
    ".news-sub{font:600 16px/1.4 var(--m);color:var(--k);font-style:italic;margin:0 0 12px}" +
    ".news-text{font-size:15px;line-height:1.6;color:var(--u);margin:0;white-space:pre-line}.news h3 a{color:inherit;text-decoration:none}.news h3 a:hover{background:var(--c);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}.news-link{display:inline-block;margin-top:14px;color:#ec008c;font:600 12px var(--m);text-decoration:underline;text-underline-offset:3px}.news-img{text-decoration:none}" +
    ".art .hero,.art .vtabs,.art #programa{display:none}.art main{padding-top:36px}.art #noticias{display:block}" +
    ".article{max-width:760px;margin:0 auto}.back{display:inline-block;margin:0 0 18px;color:#ec008c;font:600 12px var(--m);text-decoration:underline;text-underline-offset:3px}.article-img{display:block;width:100%;max-width:600px;height:auto;margin:0 auto 22px;border-radius:12px}.article-meta{font:600 11px var(--m);letter-spacing:.08em;color:var(--l);text-transform:uppercase;margin:0 0 10px}.article-title{font:700 clamp(30px,4.6vw,46px)/1.05 'Barlow Condensed',Impact,sans-serif;margin:0 0 12px}.article-sub{font:600 18px/1.4 var(--m);color:var(--k);font-style:italic;margin:0 0 24px}.article-body{font-size:17px;line-height:1.7;color:var(--u)}.article-body p{margin:0 0 16px}.article-body h2{font:700 clamp(24px,3vw,34px)/1.1 'Barlow Condensed',Impact,sans-serif;color:var(--k);margin:30px 0 10px}.article-body strong{color:var(--k)}.article-body a{color:#ec008c}" +
    ".days{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px}" +
    ".day{text-align:left;background:#0c0c0c;border:1px solid #fff2;border-radius:10px;padding:14px;color:var(--k);cursor:pointer}" +
    ".day b{display:block;font:700 clamp(30px,4vw,44px)/1 'Barlow Condensed',Impact,sans-serif}" +
    ".day span{font:600 9px var(--m);color:var(--u)}" +
    ".day[aria-selected=true]{background:var(--c);border-color:transparent;color:#050505}.day[aria-selected=true] span{color:#050505b3}" +
    ":focus-visible{outline:2px solid var(--l)}" +
    ".filters{display:flex;gap:10px;flex-wrap:wrap;margin:0 0 26px}.filters[hidden]{display:none}" +
    ".f{background:none;border:1px solid #fff3;color:var(--u);border-radius:99px;width:108px;padding:12px 0;text-align:center;font:600 12px var(--m);cursor:pointer}" +
    ".f[aria-pressed=true]{background:var(--l);border-color:var(--l);color:#050505}" +
    ".grp{margin:0 0 34px}.gh{display:flex;align-items:center;gap:10px;margin:0 0 14px}" +
    ".gh h3{font:700 clamp(22px,3vw,30px)/1 'Barlow Condensed',Impact,sans-serif;margin:0}" +
    ".cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:14px}" +
    ".card{background:linear-gradient(#0b0b0b,#080808) padding-box,var(--c) border-box;border:1px solid transparent;border-radius:12px;padding:24px}" +
    ".tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}" +
    ".tags span{display:inline-block;font:600 11px var(--m);color:var(--l);background:#ec55151f;border:1px solid #ec551566;border-radius:4px;padding:5px 8px}" +
    ".card h4{font:600 20px/1.2 var(--m);margin:0 0 10px}" +
    ".who{display:flex;align-items:flex-start;gap:8px;font-size:14px;color:var(--u);margin:0 0 14px}.who .pt{flex:1}" +
    ".meta{display:flex;align-items:center;gap:8px;border-top:1px solid #fff2;padding-top:8px;margin-top:8px;font-size:14px}.mic{flex:none;width:16px;height:16px}.mic.u{color:#ec008c}.mic.c,.mic.p{color:#ec5515}.mic svg{display:block;width:100%;height:100%;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.map{color:#e9e2d6;text-decoration:underline;text-decoration-color:#ec008c;text-underline-offset:3px}.map:hover{color:#ec008c}" +
    ".mapbtn{display:inline-flex;align-items:center;gap:8px;margin-top:8px;background:var(--l);color:#050505;border:0;border-radius:999px;padding:12px 18px;font:600 12px var(--m);cursor:pointer;transition:transform .2s,box-shadow .2s}.mapbtn:hover{transform:translateY(-2px);box-shadow:0 8px 24px #ec551540}.mapbtn svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}" +
    ".modal{position:fixed;inset:0;z-index:99;display:flex;align-items:center;justify-content:center;padding:24px;background:#050505;overflow:auto}.modal[hidden]{display:none}.modal-body{position:relative;width:min(100%,760px);text-align:center}.modal-body img{display:block;width:auto;max-width:100%;max-height:calc(100vh - 120px);margin:0 auto;border-radius:12px;box-shadow:0 24px 70px #000}.modal-close{position:absolute;top:-14px;right:-14px;width:42px;height:42px;border-radius:50%;background:#050505;border:1px solid #fff3;color:#f7f2e8;display:flex;align-items:center;justify-content:center;cursor:pointer}.modal-close svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}.mapsbtn{display:inline-flex;align-items:center;gap:8px;margin-top:16px;background:#ec008c;color:#fff;border-radius:999px;padding:12px 20px;font:600 12px var(--m);text-decoration:none;transition:background .2s}.mapsbtn:hover{background:#ff2da6}.mapsbtn svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}" +
    ".hint,.empty{border:1px dashed #fff3;border-radius:14px;padding:36px 24px;text-align:center;color:var(--u)}" +
    ".hint b,.empty b{display:block;font:700 clamp(22px,3vw,30px)/1.1 'Barlow Condensed',Impact,sans-serif;color:var(--k);margin-bottom:8px}" +
    "footer{border-top:1px solid #fff2;padding:26px 4vw 34px;text-align:center;font-size:12px;color:#8f8880}footer a{color:#ec008c}" +
    ".sec,.gh h3,.hint b,.empty b,.day span,.k,.hero h1{text-transform:uppercase}" +
    "@media(max-width:640px){.hero{gap:14px}.star{width:clamp(70px,20vw,90px)}.days{grid-template-columns:repeat(2,1fr)}.f{width:auto;padding:12px 18px}.modal{padding:16px}.modal-body img{max-height:calc(100vh - 96px)}}" +
    "@media(max-width:700px){.news{grid-template-columns:1fr;gap:14px}.news-img img{max-height:none}}";

  var T =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="i-u" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></symbol><symbol id="i-c" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol><symbol id="i-p" viewBox="0 0 24 24"><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></symbol></svg>' +
    '<div class=w><header><div class=brand><span class=cn>CIn no</span>' + L + '</div></header>' +
    '<section class=hero><div><p class=k>CIn-UFPE no REC\'n\'Play 2026 · 11–14 NOV · Recife</p><h1>O futuro<br>nasce<br><em>aqui.</em></h1><button class=mapbtn id=mapbtn aria-haspopup=dialog aria-expanded=false><svg viewBox="0 0 24 24" aria-hidden=true><use href="#i-p"/></svg>Mapa do Stand</button></div><i class=star></i></section>' +
    '<main><div class=vtabs><button class=vtab id=tab-prog aria-pressed=true>Programação</button><button class=vtab id=tab-news aria-pressed=false>Notícias</button></div><section id=programa><div class=days>' +
    '<button class=day data-d=11><b>11</b><span>QUA</span></button>' +
    '<button class=day data-d=12><b>12</b><span>QUI</span></button>' +
    '<button class=day data-d=13><b>13</b><span>SEX</span></button>' +
    '<button class=day data-d=14><b>14</b><span>SÁB</span></button></div>' +
    '<div class=filters hidden><button class=f data-f=all aria-pressed=true>Tudo</button>' +
    '<button class=f data-f=a aria-pressed=false>Atividades</button><button class=f data-f=s aria-pressed=false>Stand</button></div>' +
    '<div id=panel></div></section><section id=noticias hidden></section></main>' +
    '<footer><p>Feito com <span style=color:var(--p)>♥</span> pela <a href=https://ascom.cin.ufpe.br/>ASCOM CIn</a></p>' +
    '<p>Não nos responsabilizamos por eventuais mudanças na programação do REC\'n\'Play.</p>' +
    '<p>Última atualização: <span id=up></span></p></footer>' +
    '<div class=modal id=mapa hidden><div class=modal-body role=dialog aria-modal=true aria-label="Mapa do Stand"><button class=modal-close id=mapa-close aria-label="Fechar mapa"><svg viewBox="0 0 24 24" aria-hidden=true><path d="M6 6l12 12M18 6L6 18"/></svg></button><img id=mapa-img alt="Mapa do stand do CIn no REC\'n\'Play, R. Vig. Tenório, 95" data-src="mapa-como-chegar.png"><a class=mapsbtn href="https://www.google.com/maps/search/?api=1&amp;query=R.%20Vig.%20Ten%C3%B3rio%2C%2095%2C%20Recife%20-%20PE" target=_blank rel=noopener><svg viewBox="0 0 24 24" aria-hidden=true><use href="#i-p"/></svg>Abrir no Google Maps</a></div></div>' +
    '</div>';


  function init() {
    if (document.getElementById("cin26")) return;
    var h = document.createElement("div");
    h.id = "cin26";
    var r = h.attachShadow({ mode: "open" });
    r.innerHTML = "<style>" + CSS + "</style>" + T;
    document.body.appendChild(h);
    document.body.style.cssText += "margin:0;background:#050505";

    var P = r.getElementById("panel"), F = r.querySelector(".filters");
    var Ds = [...r.querySelectorAll(".day")], Fs = [...r.querySelectorAll(".f")];
    var s = null, f = "all";

    var C = function (a) {
      var q = encodeURIComponent(a.q || a.l);
      return '<article class=card><div class=tags>' + a.g.map(function (g) { return "<span>" + g + "</span>"; }).join("") +
        "</div><h4>" + a.n + "</h4>" + (a.p.length ? '<p class=who><span class="mic u" role=img aria-label="Palestrantes"><svg aria-hidden="true"><use href="#i-u"/></svg></span><span class=pt>' + a.p.join(" · ") + "</span></p>" : "") +
        '<div class=meta><span class="mic c" role=img aria-label="Horário"><svg aria-hidden="true"><use href="#i-c"/></svg></span>' + (a.h || "A confirmar") + '</div>' +
        '<div class=meta><span class="mic p" role=img aria-label="Local"><svg aria-hidden="true"><use href="#i-p"/></svg></span><a class=map href="https://www.google.com/maps/search/?api=1&amp;query=' + q + '" target=_blank rel=noopener>' + a.l + ' ↗</a></div></article>';
    };
    var G = function (t, l) {
      return '<section class=grp><div class=gh><h3>' + (t ? "Stand do CIn" : "Atividades") + '</h3></div><div class=cards>' + l.map(C).join("") + "</div></section>";
    };
    function R() {
      if (!s) {
        F.hidden = true;
        P.innerHTML = '<div class=hint><b>Escolha um dia</b><span>Selecione uma data.</span></div>';
        return;
      }
      F.hidden = false;
      var m = function (x) {
        var b = String(x.h || "").split("–")[0].split("-")[0].replace(/\D/g, "");
        return b ? parseInt(b, 10) : 9999;
      };
      var a = A.filter(function (x) { return x.d.indexOf(s) > -1; }).sort(function (x, y) { return (x.t ? 1 : 0) - (y.t ? 1 : 0) || m(x) - m(y); });
      var l = f == "all" ? a : a.filter(function (x) { return f == "a" ? !x.t : !!x.t; });
      var h = "";
      if (l.some(function (x) { return !x.t; })) h += G(0, l.filter(function (x) { return !x.t; }));
      if (l.some(function (x) { return x.t; })) h += G(1, l.filter(function (x) { return x.t; }));
      P.innerHTML = h || '<div class=empty><b>Nada por aqui</b><span>Nada neste filtro.</span></div>';
    }

    var NT = r.getElementById("noticias"), TP = r.getElementById("tab-prog"), TN = r.getElementById("tab-news"), SP = r.getElementById("programa");
    function RN() {
      NT.innerHTML = N.length ? N.map(function (n) {
        var im = n.img ? '<a class=news-img href="' + n.url + '"><img src="' + n.img + '" alt="' + n.t + '" loading=lazy></a>' : '';
        return '<article class="news' + (n.img ? '' : ' noimg') + '">' + im + '<div><div class=news-date>' + n.dt + '</div><h3><a href="' + n.url + '">' + n.t + '</a></h3><p class=news-sub>' + n.s + '</p><p class=news-text>' + n.x + '</p><a class=news-link href="' + n.url + '">Ler notícia →</a></div></article>';
      }).join("") : '<div class=empty><b>Nenhuma notícia ainda</b><span>As novidades aparecerão aqui.</span></div>';
    }
    function SV(v) {
      SP.hidden = v;
      NT.hidden = !v;
      TP.setAttribute("aria-pressed", !v);
      TN.setAttribute("aria-pressed", v);
    }
    TP.onclick = function () { SV(false); };
    TN.onclick = function () { SV(true); };
    var ART = document.documentElement.getAttribute("data-news");
    function RA(n) {
      return '<article class=article><a class=back href="/">← Voltar para a programação</a>' + (n.img ? '<img class=article-img src="' + n.img + '" alt="' + n.t + '">' : '') + '<div class=article-meta>' + n.dt + '</div><h1 class=article-title>' + n.t + '</h1><p class=article-sub>' + n.s + '</p><div class=article-body>' + n.html + '</div></article>';
    }
    if (ART) {
      var aa = N.filter(function (n) { return n.slug === ART; })[0];
      r.querySelector(".w").classList.add("art");
      SP.hidden = true;
      NT.hidden = false;
      NT.innerHTML = aa ? RA(aa) : '<div class=empty><b>Notícia não encontrada</b><span>Volte para a programação.</span></div>';
    } else {
      RN();
    }

    Ds.forEach(function (b) {
      b.onclick = function () {
        s = s == b.dataset.d ? null : b.dataset.d;
        Ds.forEach(function (x) { x.setAttribute("aria-selected", x.dataset.d == s); });
        R();
      };
    });
    // Seleciona automaticamente o dia de hoje (ou o último dia já ocorrido).
    (function () {
      var d = diaAtual(new Date());
      if (!d) return;
      s = d;
      Ds.forEach(function (x) { x.setAttribute("aria-selected", x.dataset.d == s); });
      R();
    })();
    Fs.forEach(function (b) {
      b.onclick = function () {
        f = b.dataset.f;
        Fs.forEach(function (x) { x.setAttribute("aria-pressed", x.dataset.f == f); });
        R();
      };
    });
    var MB = r.getElementById("mapbtn"), MD = r.getElementById("mapa"), MI = r.getElementById("mapa-img"), MC = r.getElementById("mapa-close");
    function closeMap() {
      MD.hidden = true;
      document.body.style.overflow = "";
      MB.setAttribute("aria-expanded", "false");
      MB.focus();
    }
    MB.onclick = function () {
      if (!MI.getAttribute("src")) MI.src = MI.getAttribute("data-src");
      MD.hidden = false;
      document.body.style.overflow = "hidden";
      MB.setAttribute("aria-expanded", "true");
      MC.focus();
    };
    MC.onclick = closeMap;
    MD.onclick = function (e) { if (e.target === MD) closeMap(); };
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !MD.hidden) closeMap(); });
    r.getElementById("up").textContent = "10/11/2026, 13:40";
    R();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
