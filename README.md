# vm-tipping

Leaderboard for vm-tippinga.

http://vm.wa.gd/

## Installer

    npm install

## Kjør

    npm run watch

(må desverre restartes når den tryner med feil..)

## Deploy

Pull-request på github, så merger og deployer @torgeir

## Flere features?

- [x] vise dagens kamper
- [ ] vise dagens resultater
- [ ] vise diff fra faktiske resultater
- [ ] cache apikall i localastorage i ~1 dag

Se Github Issues for konkrete oppgaver.


## Mulige APIer vi kan bruke?
Foreløpig har vi lagt opp til å hardkode kampoppsettet, og heller oppdatere daglig når sluttspill kampene blir klare. Alle gruppespill kampene er lagt inn i API.js fila.

Flagg kan hentes fra FIFA [http://img.fifa.com/images/flags/4/Bra.png](http://img.fifa.com/images/flags/4/Bra.png).

* API for å hente matcher per dag https://github.com/openfootball/api/blob/master/GAMES.md
* API for å hente lag https://github.com/openfootball/api/blob/master/TEAMS.md
* API for å hente kampdager https://github.com/openfootball/api/blob/master/ROUNDS.md
* Liste over kamper per dag view-source:http://apptitude.ch/worldcup/
