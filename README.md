# Portail IA – ns3229033

Page d'accueil sur le port 80 qui liste les 18 solutions du serveur (rôle, technos, conteneurs, état en direct) et signale celles à arrêter.

## Contenu

| Fichier | Rôle |
|---|---|
| `site/index.html` | Le portail (recherche, filtres par état, test en ligne/injoignable de chaque port) |
| `site/services.js` | Le catalogue : seul fichier à éditer pour ajouter une solution ou changer un état |
| `docker-compose.yml`, `nginx.conf` | Nginx sur le port 80 |
| `audit.sh` | Audit en lecture seule (statut, RAM, activité des 7 derniers jours, titres HTTP) |
| `arret.sh` | Arrête (sans supprimer) les conteneurs inutiles |

## Déploiement

```bash
scp -r portail-ia debian@57.128.75.61:~/IA/
ssh debian@57.128.75.61
cd ~/IA/portail-ia && chmod +x *.sh
sudo ss -ltnp | grep ':80 '            # vérifier que le port 80 est libre (sinon arrêter apache/nginx hôte)
sudo docker compose up -d
```

Puis ouvrir http://57.128.75.61

## Nettoyage conseillé

1. `sudo ./audit.sh > audit.md` puis le relire (ou me l'envoyer : j'ajusterai les fiches et les états).
2. Relire `arret.sh`, puis `sudo ./arret.sh`. Les conteneurs sont **arrêtés, pas supprimés** : c'est réversible.

| État | Solutions |
|---|---|
| À arrêter | Speech-to-Text v1 (8787/5610), Maya SSH MySQL (unhealthy), StudyAssur dashboard + MongoDB, companion Let's Encrypt orphelin |
| À réparer | Speech-to-Text v2 : `speechtotext-v2-api-1` redémarre en boucle (les logs sont dans l'audit) |
| À vérifier | Portail TN v1 (doublon probable de TN Agentic), Verbatim Clustering (aucun port), ELK (3 nœuds, gros consommateur de RAM), Infra LLM/RAG |

## Sécurité (important)

Ces ports sont ouverts à tout Internet : **PostgreSQL 5432, MongoDB 27017, Elasticsearch 9200, Qdrant 6333, Adminer 8088**.
Docker contourne `ufw`, donc il faut les restreindre dans les `docker-compose.yml` concernés :

```yaml
ports:
  - "127.0.0.1:5432:5432"   # au lieu de "5432:5432"
```

Protéger le portail par mot de passe :

```bash
sudo apt install apache2-utils
htpasswd -c .htpasswd hatem
# décommenter les lignes auth_basic dans nginx.conf et le volume .htpasswd dans docker-compose.yml
sudo docker compose up -d --force-recreate
```

## Suite possible

Passer en sous-domaines HTTPS (`apothicare.mondomaine.tn`, …) avec un reverse proxy (Caddy ou Traefik) : les liens `http://IP:port` disparaissent et seuls les ports 80/443 restent ouverts.
