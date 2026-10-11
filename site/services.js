// Catalogue des solutions hébergées sur ns3229033.
// status : "actif" | "reparer" | "verifier" | "arreter"
// port   : port public (null = pas exposé). path : chemin ajouté à l'URL.
// Éditer ce fichier puis recharger la page : aucun rebuild nécessaire (volume monté).
window.SERVICES = [
  {
    name: "Plateforme Annonceur",
    category: "Applications",
    port: 8087,
    status: "actif",
    tech: "Streamlit · PostgreSQL 16",
    summary: "Application Streamlit de gestion des annonceurs, adossée à une base PostgreSQL. Adminer est fourni pour l'administration de la base.",
    containers: ["platform-annonceur-app", "platform-annonceur-db", "platform-annonceur-adminer"]
  },
  {
    name: "ASSP",
    category: "Applications",
    port: 18400,
    status: "actif",
    tech: "Front Nginx · API Node (4000) · PostgreSQL 16",
    summary: "Application web complète (frontend + API + base). API publique sur le port 18401.",
    containers: ["assp-frontend-1", "assp-backend-1", "assp-postgres-1"]
  },
  {
    name: "Apothicare – Pharmacies de garde",
    category: "Applications",
    port: 8421,
    status: "actif",
    tech: "Front Nginx · FastAPI",
    summary: "Collecte et affiche la liste des pharmacies de garde en Tunisie à partir de l'API Apothicare. API sur le port 8420.",
    containers: ["apothicare-frontend", "apothicare-backend"]
  },
  {
    name: "Prix Panier",
    category: "Applications",
    port: 18200,
    status: "actif",
    tech: "Python / Flask",
    summary: "Suivi et comparaison du prix d'un panier de produits.",
    containers: ["prix-panier-app"]
  },
  {
    name: "VU Pharmaco",
    category: "Santé & recherche",
    port: 19200,
    status: "actif",
    tech: "Streamlit",
    summary: "Application Streamlit orientée pharmacologie / pharmacovigilance.",
    containers: ["vu-pharmaco-app"]
  },
  {
    name: "Tomato Quality",
    category: "Vision & agro",
    port: 18095,
    status: "actif",
    tech: "Front Nginx · FastAPI · PostgreSQL 16",
    summary: "Évaluation de la qualité des tomates par IA (analyse d'images et de vidéos), avec historique en base.",
    containers: ["tomato-quality-frontend", "tomato-quality-backend", "tomato-quality-db"]
  },
  {
    name: "TN Agentic – Rédaction automatisée",
    category: "Médias & agents",
    port: 18090,
    status: "actif",
    tech: "FastAPI · n8n · PostgreSQL 15 · Nginx",
    summary: "Chaîne éditoriale agentique : scrapers Météo, Énergie et BCT (Banque Centrale de Tunisie) alimentent un noyau éditorial, orchestré par n8n.",
    containers: ["tn-nginx", "tn-editorial-core", "tn-scraper-weather", "tn-scraper-energy", "tn-scraper-bct", "tn-n8n", "tn-postgres", "tn-adminer"]
  },
  {
    name: "Speech-to-Text v2",
    category: "Audio",
    port: 8686,
    status: "reparer",
    tech: "FastAPI · Worker · Redis · PostgreSQL 15 · Nginx",
    summary: "Transcription audio (version utilisée au quotidien). Le conteneur API redémarre en boucle : le service est probablement inutilisable tant qu'il n'est pas corrigé.",
    containers: ["speechtotext-v2-nginx-1", "speechtotext-v2-frontend-1", "speechtotext-v2-api-1", "speechtotext-v2-worker-1", "speechtotext-v2-redis-1", "speechtotext-v2-postgres-1"]
  },
  {
    name: "MD Groupe IA",
    category: "Sites vitrines",
    port: 8093,
    status: "actif",
    tech: "Nginx statique",
    summary: "Site web IA pour MD Groupe (Tunisie Numérique).",
    containers: ["mdgroupe-ia-web"]
  },
  {
    name: "Doria Profiler",
    category: "Santé & recherche",
    port: 8080,
    status: "actif",
    tech: "Front Nginx · API Node · service d'embeddings · pgvector",
    summary: "Profilage par recherche sémantique : les contenus sont vectorisés (service embed) et interrogés dans PostgreSQL/pgvector.",
    containers: ["doria-profiler-web", "doria-profiler-api", "doria-profiler-embed", "doria-profiler-db"]
  },
  {
    name: "Infra LLM / RAG",
    category: "Plateforme IA",
    port: 19080,
    status: "verifier",
    tech: "Front Node (3000) · passerelle LLM Nginx · Qdrant · PostgreSQL 16",
    summary: "Socle RAG : interface web, passerelle LLM (port 19090), base vectorielle Qdrant (port 6333). À confirmer : quelles applis l'utilisent encore ?",
    containers: ["infra-frontend-1", "infra-llm-1", "infra-qdrant-1", "infra-postgres-1"]
  },
  {
    name: "Tunisie Numérique – Portail IA (v1)",
    category: "Médias & agents",
    port: 18887,
    status: "verifier",
    tech: "Front Nginx · Python",
    summary: "Ancien portail IA Tunisie Numérique (10 mois). Probablement remplacé par la chaîne TN Agentic : à arrêter si plus consulté.",
    containers: ["TNPortalFront", "TNPortalBack"]
  },
  {
    name: "Verbatim Clustering",
    category: "Plateforme IA",
    port: null,
    status: "verifier",
    tech: "Streamlit",
    summary: "Regroupement thématique de verbatims. Aucun port publié : l'application est inaccessible depuis l'extérieur en l'état.",
    containers: ["clustering_app"]
  },
  {
    name: "ELK – Elasticsearch & Kibana",
    category: "Plateforme IA",
    port: 5601,
    status: "verifier",
    tech: "Elasticsearch 9 (3 nœuds) · Kibana",
    summary: "Cluster de recherche et d'analyse de logs. Très gourmand en mémoire : à garder uniquement si une appli l'utilise.",
    containers: ["elk-kibana-1", "elk-es01-1", "elk-es02-1", "elk-es03-1"]
  },
  {
    name: "Speech-to-Text v1",
    category: "Audio",
    port: 8787,
    status: "arreter",
    tech: "Front Nginx · Python",
    summary: "Ancienne version de la transcription, remplacée par la v2 (port 8686).",
    containers: ["whisper_frontend", "whisper_backend"]
  },
  {
    name: "Maya SSH MySQL Web",
    category: "Outils",
    port: 8000,
    status: "arreter",
    tech: "Python",
    summary: "Outil web d'accès MySQL via SSH, 13 mois, healthcheck en échec (unhealthy).",
    containers: ["maya-ssh-mysql-web"]
  },
  {
    name: "StudyAssur Dashboard",
    category: "Outils",
    port: null,
    status: "arreter",
    tech: "Node (image :dev) · MongoDB 7",
    summary: "Tableau de bord de développement (16 mois) sans port publié, alors que sa base MongoDB est exposée publiquement sur 27017.",
    containers: ["dashboard_app", "mongodb"]
  },
  {
    name: "Let's Encrypt companion (orphelin)",
    category: "Outils",
    port: null,
    status: "arreter",
    tech: "nginx-proxy-letsencrypt",
    summary: "Compagnon de certificats qui n'a plus de nginx-proxy associé : il ne sert à rien.",
    containers: ["nginx-proxy-letsencrypt"]
  }
];

// Outils d'administration (affichés à part)
window.ADMIN_TOOLS = [
  { name: "Adminer (Annonceur)", port: 8088 },
  { name: "Kibana", port: 5601 },
  { name: "Qdrant dashboard", port: 6333, path: "/dashboard" },
  { name: "API Apothicare (docs)", port: 8420, path: "/docs" },
  { name: "API ASSP", port: 18401 }
];
