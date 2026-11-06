# Détection et mitigation d'une attaque DoS par gas dans un smart contract Ethereum
 
Étude d'une vulnérabilité de **déni de service par consommation de gas** : un contrat volontairement vulnérable, sa version corrigée, puis la validation par analyse statique et par tests sur un réseau local.
 
## Problème
Sur Ethereum, chaque opération consomme du gas. Une boucle qui parcourt un tableau non borné fait croître le coût avec le nombre d'utilisateurs. Quand la liste devient trop grande, la fonction dépasse la limite de gas et échoue, ce qui la rend inutilisable.
 
## Contrats
| Contrat | Description |
|---|---|
| `GasDoSVulnerable` | Tableau dynamique d'utilisateurs et fonction qui le parcourt en entier, avec une consommation de gas croissante |
| `GasDoSSecure` | Traitement **par lots (batch)** et nombre d'itérations limité, donc pas de dépassement de gas |
 
## Démarche
1. **Environnement :** projet Node.js et Hardhat, contrats en Solidity 0.8.x.
2. **Analyse statique :**
   - **Slither** confirme le risque de DoS par gas dans le contrat vulnérable (boucle dangereuse, alertes liées au gas).
   - Sur le contrat sécurisé, Slither signale des appels externes. C'est un faux positif partiel : ils sont faits dans une boucle bornée.
   - **Solhint** vérifie la qualité du code et le respect des standards. Il ne détecte pas ce type de DoS.
3. **Déploiement local** sur le réseau Hardhat.
4. **Tests dynamiques :** le contrat vulnérable échoue quand la liste grandit, le contrat sécurisé continue de fonctionner.
5. **Rapport de gas :** la consommation du contrat vulnérable augmente fortement, celle du contrat sécurisé reste stable.
## Résultat
La vulnérabilité est identifiée, corrigée par une bonne pratique (traitement par lots avec boucle bornée) et validée par des outils statiques et dynamiques.
 
## Outils
Solidity 0.8.x, Node.js / npm, Hardhat, Slither, Solhint, Ethereum Virtual Machine.
 
## Lancer le projet
```bash
npm install
npx hardhat compile
npx hardhat test
```
 
> Usage pédagogique. Le contrat vulnérable est volontairement faillible, ne le déployez pas sur un réseau réel.
 
