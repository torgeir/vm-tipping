var matches = {
  group: [
      {'day':'Thu','date': new Date('Jun 12, 2014 17:00:00 GMT-03:00'),id: 715619,'from':'Brasil','to':'Kroatia','place':'Sao Paulo', homegoals: 3, awaygoals: 1, outcome: 'h'},
      {'day':'Fri','date': new Date('Jun 13, 2014 13:00:00 GMT-03:00'),id: 715620,'from':'Mexico','to':'Kamerun','place':'Natal', homegoals: 1, awaygoals: 0, outcome: 'h'},
      {'day':'Fri','date': new Date('Jun 13, 2014 16:00:00 GMT-03:00'),id: 715625,'from':'Spania','to':'Nederland','place':'Salvador', homegoals: 1, awaygoals: 5, outcome: 'b'},
      {'day':'Fri','date': new Date('Jun 13, 2014 19:00:00 GMT-03:00'),id: 715626,'from':'Chile','to':'Australia','place':'Curitiba', homegoals: 3, awaygoals: 1, outcome: 'h'},
      {'day':'Sat','date': new Date('Jun 14, 2014 13:00:00 GMT-03:00'),id: 715631,'from':'Colombia','to':'Hellas','place':'Belo Horizonte', homegoals: 3, awaygoals: 0, outcome: 'h'},
      {'day':'Sat','date': new Date('Jun 14, 2014 22:00:00 GMT-03:00'),id: 715632,'from':'Elfenbenskysten','to':'Japan','place':'Recife', homegoals: 2, awaygoals: 1, outcome: 'h'},
      {'day':'Sat','date': new Date('Jun 14, 2014 16:00:00 GMT-03:00'),id: 715637,'from':'Uruguay','to':'Costa Rica','place':'Fortaleza', homegoals: 1, awaygoals: 3, outcome: 'b'},
      {'day':'Sat','date': new Date('Jun 14, 2014 19:00:00 GMT-03:00'),id: 715638,'from':'England','to':'Italia','place':'Manaus', homegoals: 1, awaygoals: 2, outcome: 'b'},
      {'day':'Sun','date': new Date('Jun 15, 2014 13:00:00 GMT-03:00'),id: 715643,'from':'Sveits','to':'Ecuador','place':'Brasilia', homegoals: 2, awaygoals: 1, outcome: 'h'},
      {'day':'Sun','date': new Date('Jun 15, 2014 16:00:00 GMT-03:00'),id: 715644,'from':'Frankrike','to':'Honduras','place':'Porto Alegre', homegoals: 3, awaygoals: 0, outcome: 'h'},
      {'day':'Sun','date': new Date('Jun 15, 2014 19:00:00 GMT-03:00'),id: 715649,'from':'Argentina','to':'Bosnia-Hercegovina','place':'Rio De Janeiro', homegoals: 2, awaygoals: 1, outcome: 'h'},
      {'day':'Mon','date': new Date('Jun 16, 2014 13:00:00 GMT-03:00'),id: 715655,'from':'Tyskland','to':'Portugal','place':'Salvador', homegoals: 4, awaygoals: 0, outcome: 'h'},
      {'day':'Mon','date': new Date('Jun 16, 2014 16:00:00 GMT-03:00'),id: 715650,'from':'Iran','to':'Nigeria','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: 'u'},
      {'day':'Mon','date': new Date('Jun 16, 2014 19:00:00 GMT-03:00'),id: 715656,'from':'Ghana','to':'USA','place':'Natal', homegoals: 1, awaygoals: 2, outcome: 'b'},
      {'day':'Tue','date': new Date('Jun 17, 2014 13:00:00 GMT-03:00'),id: 715661,'from':'Belgia','to':'Algerie','place':'Belo Horizonte', homegoals: 2, awaygoals: 1, outcome: 'h'},
      {'day':'Tue','date': new Date('Jun 17, 2014 16:00:00 GMT-03:00'),id: 715621,'from':'Brasil','to':'Mexico','place':'Fortaleza', homegoals: 0, awaygoals: 0, outcome: 'u'},
      {'day':'Tue','date': new Date('Jun 17, 2014 19:00:00 GMT-03:00'),id: 715662,'from':'Russland','to':'Sør-Korea','place':'Cuiaba', homegoals: 1, awaygoals: 1, outcome: 'u'},
      {'day':'Wed','date': new Date('Jun 18, 2014 13:00:00 GMT-03:00'),id: 715627,'from':'Australia','to':'Nederland','place':'Porto Alegre', homegoals: 2, awaygoals: 3, outcome: 'b'},
      {'day':'Wed','date': new Date('Jun 18, 2014 19:00:00 GMT-03:00'),id: 715622,'from':'Kamerun','to':'Kroatia','place':'Manaus', homegoals: 0, awaygoals: 4, outcome: 'b'},
      {'day':'Wed','date': new Date('Jun 18, 2014 16:00:00 GMT-03:00'),id: 715628,'from':'Spania','to':'Chile','place':'Rio De Janeiro', homegoals: 0, awaygoals: 2, outcome: 'b'},
      {'day':'Thu','date': new Date('Jun 19, 2014 13:00:00 GMT-03:00'),id: 715633,'from':'Colombia','to':'Elfenbenskysten','place':'Brasilia', homegoals: 2, awaygoals: 1, outcome: 'h'},
      {'day':'Thu','date': new Date('Jun 19, 2014 16:00:00 GMT-03:00'),id: 715639,'from':'Uruguay','to':'England','place':'Sao Paulo', homegoals: 2, awaygoals: 1, outcome: 'h'},
      {'day':'Thu','date': new Date('Jun 19, 2014 19:00:00 GMT-03:00'),id: 715634,'from':'Japan','to':'Hellas','place':'Natal', homegoals: 0, awaygoals: 0, outcome: 'u'},
      {'day':'Fri','date': new Date('Jun 20, 2014 13:00:00 GMT-03:00'),id: 715640,'from':'Italia','to':'Costa Rica','place':'Recife', homegoals: 0, awaygoals: 1, outcome: 'b'},
      {'day':'Fri','date': new Date('Jun 20, 2014 16:00:00 GMT-03:00'),id: 715645,'from':'Sveits','to':'Frankrike','place':'Salvador', homegoals: 2, awaygoals: 5, outcome: 'b'},
      {'day':'Fri','date': new Date('Jun 20, 2014 19:00:00 GMT-03:00'),id: 715646,'from':'Honduras','to':'Ecuador','place':'Curitiba', homegoals: 1, awaygoals: 2, outcome: 'b'},
      {'day':'Sat','date': new Date('Jun 21, 2014 13:00:00 GMT-03:00'),id: 715651,'from':'Argentina','to':'Iran','place':'Belo Horizonte', homegoals: 1, awaygoals: 0, outcome: 'h'},
      {'day':'Sat','date': new Date('Jun 21, 2014 16:00:00 GMT-03:00'),id: 715657,'from':'Tyskland','to':'Ghana','place':'Fortaleza', homegoals: 2, awaygoals: 2, outcome: 'u'},
      {'day':'Sat','date': new Date('Jun 21, 2014 19:00:00 GMT-03:00'),id: 715652,'from':'Nigeria','to':'Bosnia-Hercegovina','place':'Cuiaba', homegoals: 1, awaygoals: 0, outcome: 'h'},
      {'day':'Sun','date': new Date('Jun 22, 2014 16:00:00 GMT-03:00'),id: 715664,'from':'Sør-Korea','to':'Algerie','place':'Porto Alegre', homegoals: 2, awaygoals: 4, outcome: 'b'},
      {'day':'Sun','date': new Date('Jun 22, 2014 19:00:00 GMT-03:00'),id: 715658,'from':'USA','to':'Portugal','place':'Manaus', homegoals: 2, awaygoals: 2, outcome: 'u'},
      {'day':'Sun','date': new Date('Jun 22, 2014 13:00:00 GMT-03:00'),id: 715663,'from':'Belgia','to':'Russland','place':'Rio De Janeiro', homegoals: 1, awaygoals: 0, outcome: 'h'},
      {'day':'Mon','date': new Date('Jun 23, 2014 13:00:00 GMT-03:00'),id: 715629,'from':'Australia','to':'Spania','place':'Curitiba', homegoals: 0, awaygoals: 3, outcome: 'b'},
      {'day':'Mon','date': new Date('Jun 23, 2014 13:00:00 GMT-03:00'),id: 715630,'from':'Nederland','to':'Chile','place':'Sao Paulo', homegoals: 2, awaygoals: 0, outcome: 'h'},
      {'day':'Mon','date': new Date('Jun 23, 2014 17:00:00 GMT-03:00'),id: 715623,'from':'Kamerun','to':'Brasil','place':'Brasilia', homegoals: 1, awaygoals: 4, outcome: 'b'},
      {'day':'Mon','date': new Date('Jun 23, 2014 17:00:00 GMT-03:00'),id: 715624,'from':'Kroatia','to':'Mexico','place':'Recife', homegoals: 1, awaygoals: 3, outcome: 'b'},
      {'day':'Tue','date': new Date('Jun 24, 2014 13:00:00 GMT-03:00'),id: 715642,'from':'Italia','to':'Uruguay','place':'Natal', homegoals: 0, awaygoals: 1, outcome: 'b'},
      {'day':'Tue','date': new Date('Jun 24, 2014 13:00:00 GMT-03:00'),id: 715641,'from':'Costa Rica','to':'England','place':'Belo Horizonte', homegoals: 0, awaygoals: 0, outcome: 'u'},
      {'day':'Tue','date': new Date('Jun 24, 2014 17:00:00 GMT-03:00'),id: 715636,'from':'Japan','to':'Colombia','place':'Cuiaba', homegoals: 1, awaygoals: 4, outcome: 'b'},
      {'day':'Tue','date': new Date('Jun 24, 2014 17:00:00 GMT-03:00'),id: 715635,'from':'Hellas','to':'Elfenbenskysten','place':'Fortaleza', homegoals: 2, awaygoals: 1, outcome: 'h'},
      {'day':'Wed','date': new Date('Jun 25, 2014 13:00:00 GMT-03:00'),id: 715653,'from':'Nigeria','to':'Argentina','place':'Porto Alegre', homegoals: 2, awaygoals: 3, outcome: 'b'},
      {'day':'Wed','date': new Date('Jun 25, 2014 13:00:00 GMT-03:00'),id: 715654,'from':'Bosnia-Hercegovina','to':'Iran','place':'Salvador', homegoals: 3, awaygoals: 1, outcome: 'h'},
      {'day':'Wed','date': new Date('Jun 25, 2014 17:00:00 GMT-03:00'),id: 715647,'from':'Honduras','to':'Sveits','place':'Manaus', homegoals: 0, awaygoals: 3, outcome: 'b'},
      {'day':'Wed','date': new Date('Jun 25, 2014 17:00:00 GMT-03:00'),id: 715648,'from':'Ecuador','to':'Frankrike','place':'Rio De Janeiro', homegoals: 0, awaygoals: 0, outcome: 'u'},
      {'day':'Thu','date': new Date('Jun 26, 2014 13:00:00 GMT-03:00'),id: 715660,'from':'USA','to':'Tyskland','place':'Recife', homegoals: 0, awaygoals: 1, outcome: 'b'},
      {'day':'Thu','date': new Date('Jun 26, 2014 13:00:00 GMT-03:00'),id: 715659,'from':'Portugal','to':'Ghana','place':'Brasilia', homegoals: 2, awaygoals: 1, outcome: 'h'},
      {'day':'Thu','date': new Date('Jun 26, 2014 17:00:00 GMT-03:00'),id: 715665,'from':'Sør-Korea','to':'Belgia','place':'Sao Paulo', homegoals: 0, awaygoals: 1, outcome: 'b'},
      {'day':'Thu','date': new Date('Jun 26, 2014 17:00:00 GMT-03:00'),id: 715666,'from':'Algerie','to':'Russland','place':'Curitiba', homegoals: 1, awaygoals: 1, outcome: 'u'}
  ],
  eight: [
      // A1 vs B2
      {'day':'Thu','date': new Date('Jun 28, 2014 13:00:00 GMT-03:00'),id: 713927,'from':'Brasil','to':'Chile','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''},
      // B1 vs A2
      {'day':'Thu','date': new Date('Jun 29, 2014 13:00:00 GMT-03:00'),id: 713929,'from':'Nederland','to':'Mexico','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''},
      // C1 vs D2
      {'day':'Thu','date': new Date('Jun 28, 2014 17:00:00 GMT-03:00'),id: 713928,'from':'Colombia','to':'Uruguay','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''},
      // D1 vs C2
      {'day':'Thu','date': new Date('Jun 29, 2014 17:00:00 GMT-03:00'),id: 713930,'from':'Costa Rica','to':'Hellas','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''},
      // E1 vs F2
      {'day':'Thu','date': new Date('Jun 30, 2014 13:00:00 GMT-03:00'),id: 713931,'from':'Frankrike','to':'Nigeria','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''},
      // F1 vs F2
      {'day':'Thu','date': new Date('Jul 01, 2014 13:00:00 GMT-03:00'),id: 713933,'from':'Argentina','to':'Sveits','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''},
      // G1 vs H2
      {'day':'Thu','date': new Date('Jun 30, 2014 17:00:00 GMT-03:00'),id: 713932,'from':'Tyskland','to':'Algerie','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''},
      // H1 vs G2
      {'day':'Thu','date': new Date('Jul 01, 2014 17:00:00 GMT-03:00'),id: 713934,'from':'Belgia','to':'USA','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''}
  ],
  kvart: [
    // 8-1 vs 8-2
    {'day':'Thu','date': new Date('Jul 04, 2014 13:00:00 GMT-03:00'),id: 715433,'from':'Brasil','to':'Colombia','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''},
    // 8-3 vs 8-4
    {'day':'Thu','date': new Date('Jul 04, 2014 13:00:00 GMT-03:00'),id: 715432,'from':'Ukjent','to':'Ukjent','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''},
    // 8-5 vs 8-6
    {'day':'Thu','date': new Date('Jul 05, 2014 13:00:00 GMT-03:00'),id: 715434,'from':'Ukjent','to':'Ukjent','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''},
    // 8-7 vs 8-8
    {'day':'Thu','date': new Date('Jul 05, 2014 13:00:00 GMT-03:00'),id: 715435,'from':'Ukjent','to':'Ukjent','place':'Curitiba', homegoals: 0, awaygoals: 0, outcome: ''}
  ],
  translations : {
    "Algerie": { shortname: "ALG", englishname: "Algerie" },
    "Argentina": { shortname: "ARG", englishname: "Argentina" },
    "Australia": { shortname: "AUS", englishname: "Australia" },
    "Belgia": { shortname: "BEL",  englishname: "Belgium" },
    "Bosnia-Hercegovina": { shortname: "BIH",  englishname: "Bosnia and Herzegovina" },
    "Brasil": { shortname: "BRA",  englishname: "Brazil" },
    "Chile": { shortname: "CHI", englishname: "Chile" },
    "Colombia": { shortname: "COL",  englishname: "Colombia" },
    "Costa Rica": { shortname: "CRC",  englishname: "Costa Rica" },
    "Ecuador": { shortname: "ECU", englishname: "Ecuador" },
    "Elfenbenskysten": { shortname: "CIV", englishname: "Côte d'Ivoire" },
    "England": { shortname: "ENG", englishname: "England" },
    "Frankrike": { shortname: "FRA", englishname: "France" },
    "Ghana": { shortname: "GHA", englishname: "Ghana" },
    "Hellas": { shortname: "GRE",  englishname: "Greece" },
    "Honduras": { shortname: "HON",  englishname: "Honduras" },
    "Iran": { shortname: "IRN",  englishname: "Iran" },
    "Italia": { shortname: "ITA",  englishname: "Italy" },
    "Japan": { shortname: "JPN", englishname: "Japan" },
    "Kamerun": { shortname: "CMR", englishname: "Cameroon" },
    "Kroatia": { shortname: "CRO", englishname: "Croatia" },
    "Mexico": { shortname: "MEX",  englishname: "Mexico" },
    "Nederland": { shortname: "NED", englishname: "Netherlands" },
    "Nigeria": { shortname: "NGA", englishname: "Nigeria" },
    "Portugal": { shortname: "POR",  englishname: "Portugal" },
    "Russland": { shortname: "RUS",  englishname: "Russia" },
    "Spania": { shortname: "ESP",  englishname: "Spain" },
    "Sveits": { shortname: "SUI",  englishname: "Swizerland" },
    "Sør-Korea": { shortname: "KOR", englishname: "Korea Republic" },
    "Tyskland": { shortname: "GER",  englishname: "Germany" },
    "USA": { shortname: "USA", englishname: "USA" },
    "Uruguay": { shortname: "URU", englishname: "Uruguay" },
    "Ukjent": { shortname: "UNK", englishname: "Unknown" }
  },
  betaling: {
    'Dag Stuan': false,
    'Jonas Follesø': true,
    'Linda Andreassen Follesø': true,
    'Erik Alexander Løkken': true,
    'Sveinung Andreassen Follesø': true,
    'Nils-Helge Garli Hegvik': false,
    'Torgeir Thoresen': true,
    'Eivind Sorteberg': true,
    'Anna Karine Lunna': false,
    'Lars Iver Strand': false,
    'May Helen Johansen': true,
    'Aud Jane Stokkeland Stender': false,
    'Morten Stokkeland Stender': false,
    'Erik Hildrum': true,
    'Hilde Follesø': true,
    'Ermin Bektesevic': false,
    'Geir Olav Olsen': false
  }
};

module.exports = matches;
