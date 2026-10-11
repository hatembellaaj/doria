#!/usr/bin/env bash
# Audit en lecture seule des conteneurs : état, ressources, activité récente, titre HTTP.
# Usage : sudo ./audit.sh > audit-$(date +%F).md
set -u

echo "# Audit Docker – $(hostname) – $(date '+%F %H:%M')"
echo
echo "## Port 80"
ss -ltnp 2>/dev/null | grep -E ':80\s' || echo "Port 80 libre."
echo
echo "## Ressources"
echo '```'
docker stats --no-stream --format 'table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}' | sort -k1
echo '```'
echo
echo "## Détail par conteneur"
echo
echo "| Conteneur | Statut | Redémarrages | Lignes de log (7 j) | Dernière ligne de log | Port public | Titre HTTP |"
echo "|---|---|---|---|---|---|---|"
for c in $(docker ps -a --format '{{.Names}}' | sort); do
  st=$(docker inspect -f '{{.State.Status}}{{if .State.Health}} ({{.State.Health.Status}}){{end}}' "$c")
  rc=$(docker inspect -f '{{.RestartCount}}' "$c")
  nl=$(docker logs --since 168h "$c" 2>&1 | wc -l)
  last=$(docker logs --tail 1 --timestamps "$c" 2>&1 | cut -c1-19)
  port=$(docker port "$c" 2>/dev/null | grep -oE '0\.0\.0\.0:[0-9]+' | head -1 | cut -d: -f2)
  title=""
  if [ -n "$port" ]; then
    title=$(curl -s -m 4 "http://127.0.0.1:$port/" | grep -oi '<title>[^<]*' | head -1 | sed 's/<title>//I')
  fi
  echo "| $c | $st | $rc | $nl | $last | ${port:--} | ${title:--} |"
done
echo
echo "## Logs de speechtotext-v2-api (redémarre en boucle)"
echo '```'
docker logs --tail 40 speechtotext-v2-api-1 2>&1
echo '```'
echo
echo "## Ports sensibles exposés publiquement"
docker ps --format '{{.Names}} {{.Ports}}' | grep -E '0\.0\.0\.0:(5432|27017|9200|6333|8088)->' || echo "Aucun."
