#!/usr/bin/env bash
# Arrête les conteneurs jugés inutiles SANS les supprimer (réversible).
# Ils ne redémarreront plus au reboot. Pour relancer : docker start <nom> && docker update --restart unless-stopped <nom>
# Relire la liste et commenter ce qu'il faut garder AVANT de lancer : sudo ./arret.sh
set -eu

A_ARRETER=(
  whisper_frontend          # Speech-to-Text v1, remplacé par la v2 (8686)
  whisper_backend
  maya-ssh-mysql-web        # unhealthy, 13 mois
  dashboard_app             # StudyAssur dev, 16 mois, pas de port
  mongodb                   # base de StudyAssur, exposée sur 27017
  nginx-proxy-letsencrypt   # orphelin, plus de nginx-proxy
  # --- À décider après lecture de l'audit ---
  # TNPortalFront TNPortalBack
  # clustering_app
  # elk-kibana-1 elk-es01-1 elk-es02-1 elk-es03-1
)

for c in "${A_ARRETER[@]}"; do
  if docker inspect "$c" >/dev/null 2>&1; then
    docker update --restart=no "$c" >/dev/null
    docker stop "$c" >/dev/null && echo "arrêté : $c"
  else
    echo "absent : $c"
  fi
done
