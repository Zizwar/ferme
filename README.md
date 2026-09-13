# 🌿 Ferme Rêve d'Enfance — Site Web Officiel

> **Site vitrine multilingue et interactif pour la Ferme Rêve d'Enfance**, un éco-domaine privatisé et exclusif situé à Tnine Chtouka (Région Casablanca – El Jadida, Maroc).

---

## 📋 Sommaire

- [✨ Aperçu du Projet](#-aperçu-du-projet)
- [🚀 Technologies & Langages](#-technologies--langages)
- [📁 Structure des Fichiers](#-structure-des-fichiers)
- [🖼️ Gestion et Remplacement des Images](#️-gestion-et-remplacement-des-images)
- [📥 Installation et Clonage](#-installation-et-clonage)
- [🛠️ Guide d'Édition et Outils](#️-guide-dédition-et-outils)
  - [1. Visual Studio Code (VS Code)](#1-visual-studio-code-vs-code)
  - [2. Google Antigravity](#2-google-antigravity)
  - [3. Assistants IA (Claude Code, OpenAI Codex / Copilot)](#3-assistants-ia-claude-code-openai-codex--copilot)
- [📤 Enregistrer et Pousser les Modifications (Git Push)](#-enregistrer-et-pousser-les-modifications-git-push)
- [🌐 Déploiement](#-déploiement)
- [📞 Contact & Support](#-contact--support)

---

## ✨ Aperçu du Projet

Le site web de la **Ferme Rêve d'Enfance** a été conçu pour offrir une expérience immersive, haut de gamme et accessible à une clientèle nationale et internationale :

* **Domaine 100% privatisé :** 2 suites familiales (Alizé & Atlas), piscine privative (10x5m), tente caïdale marocaine, animaux de la ferme et potager bio à 12 minutes de la plage de Sidi Rahal / Haouzia.
* **Internationalisation complète (i18n) :** 4 langues avec sous-dossiers dédiés :
  * 🇫🇷 **Français :** `/fr/` (Langue par défaut)
  * 🇲🇦 **Arabe :** `/ar/` (Support complet RTL `dir="rtl"` avec typographie arabe optimisée)
  * 🇬🇧 **Anglais :** `/en/`
  * 🇪🇸 **Espagnol :** `/es/`
* **Redirection intelligente :** Détection automatique de la langue du navigateur et mémorisation du choix utilisateur dans `localStorage`.
* **Référencement & Réseaux Sociaux :** Balises OpenGraph, Twitter Cards, balises hreflang canoniques et données structurées Schema.org (JSON-LD `LodgingBusiness`).

---

## 🚀 Technologies & Langages

Le projet privilégie des technologies modernes, légères et performantes, assurant un chargement instantané sans dépendances lourdes :

| Domaine | Technologies & Outils | Description |
| :--- | :--- | :--- |
| **Balisage & Structure** | **HTML5 Sémantique** | Code propre, accessible (a11y), conforme aux normes W3C |
| **Styles & Design** | **Tailwind CSS (CDN) + CSS3** | Palette sur-mesure (Olive, Terracotta, Sand, Ocean), Glassmorphism, animations fluides |
| **Typographie & Icônes** | **Google Fonts + Lucide Icons** | Polices modernes et icônes vectorielles SVG interactives |
| **Interactivité** | **JavaScript (ES6+ Vanilla)** | Calculateur de tarifs en temps réel, galerie lightbox, FAQ accordéon, navigation sticky |
| **Backend & Serveur** | **Node.js (serveur natif)** | Serveur HTTP autonome `server.js` sans modules externes obligatoires |
| **Gestionnaire de Processus** | **PM2** | Gestion continue du serveur en production (redémarrage automatique, logs) |
| **Hébergement Cloud** | **Vercel / VPS Linux** | Prêt pour le déploiement serverless via `vercel.json` ou sur serveur VPS |

---

## 📁 Structure des Fichiers

```text
ferme-reve-denfance/
├── index.html            # Point d'entrée principal avec redirection automatique de langue
├── server.js             # Serveur HTTP Node.js local / production
├── package.json          # Métadonnées du projet et scripts d'exécution (PM2, start)
├── vercel.json           # Configuration de routage et déploiement Vercel
├── .gitignore            # Fichiers exclus du suivi Git
│
├── fr/                   # Version française (/fr/index.html)
├── ar/                   # Version arabe (/ar/index.html - Mode RTL)
├── en/                   # Version anglaise (/en/index.html)
├── es/                   # Version espagnole (/es/index.html)
│
├── assets/
│   └── images/           # Dossier source de toutes les images et photographies
├── images -> assets/images # Lien symbolique pour compatibilité des chemins relatifs
│
├── css/
│   └── styles.css        # Styles personnalisés, classes de verre (glassmorphism) et animations
│
└── js/
    ├── main.js           # Logique interactive (réservations, modales, FAQ, menus)
    └── translations.js   # Données et chaînes de traduction multilingues
```

---

## 🖼️ Gestion et Remplacement des Images

Toutes les photos et ressources visuelles du site sont centralisées dans le dossier :
👉 **`assets/images/`** (également accessible via le raccourci `images/`).

### Liste des images clés du site :

| Fichier | Emplacement dans la page | Description recommandée |
| :--- | :--- | :--- |
| `hero-bg.jpg` / `23-hero-bg.jpg` | Section d'en-tête (Hero) | Vue panoramique de la ferme ou de la piscine |
| `pool-day.jpg` / `pool-night.jpg` | Section Piscine | Piscine privée 10x5m de jour et sous éclairage nocturne |
| `suite-alize-main.jpg` | Suite Alizé | Vue principale de la suite Alizé |
| `suite-alize-bed.jpg` | Suite Alizé | Chambre / literie parentale |
| `suite-alize-bath.jpg` | Suite Alizé | Salle de bain privative |
| `suite-atlas-main.jpg` | Suite Atlas | Vue d'ensemble de la suite familiale Atlas |
| `suite-atlas-bed.jpg` | Suite Atlas | Literie de la suite Atlas |
| `suite-atlas-bath.jpg` | Suite Atlas | Salle de bain de la suite Atlas |
| `tent-caidale.jpg` | Espace Détente | Tente caïdale traditionnelle marocaine |
| `henhouse.jpg`, `lambs.jpg`, `horse.jpg` | Animaux de la Ferme | Poulailler, agneaux et chevaux |
| `garden.jpg` | Extérieurs | Potager bio et allées du domaine |
| `barbecue.jpg`, `kitchen.jpg` | Restauration | Espace barbecue extérieur et cuisine équipée |
| `workshop-*.jpg` | Ateliers | Ateliers tajine, thé à la menthe et botanique |

### Bonnes pratiques pour modifier ou ajouter une image :
1. **Remplacement direct :** Pour remplacer une photo existante, déposez votre nouvelle image dans `assets/images/` en conservant exactement le même nom de fichier (ex: `pool-day.jpg`).
2. **Formats recommandés :** `.webp` ou `.jpg` compressé pour le web (largeur idéale : 1920px pour le Hero, 1200px pour les galeries).
3. **Poids :** Idéalement inférieur à **350 Ko** par image pour garantir un temps de chargement ultra-rapide.

---

## 📥 Installation et Clonage

### 1. Cloner le dépôt Git
Ouvrez votre terminal et exécutez :
```bash
git clone <URL_DU_DEPOT_GIT>
cd ferme
```

### 2. Démarrer le serveur de développement local
Aucune installation de dépendance externe n'est requise (utilise le module HTTP natif de Node.js) :

```bash
# Démarrage direct avec Node
node server.js

# Ou via npm
npm start
```

Le site est immédiatement accessible sur :  
👉 **`http://localhost:3333`**

---

## 🛠️ Guide d'Édition et Outils

Vous pouvez modifier et faire évoluer ce projet selon votre environnement préféré :

### 1. Visual Studio Code (VS Code)
Pour ouvrir le projet dans VS Code :
```bash
code .
```
* **Extensions recommandées :**
  * *Live Server* (pour prévisualiser les pages en un clic).
  * *Tailwind CSS IntelliSense* (pour l'autocomplétion des classes CSS).
  * *HTML CSS Support*.

### 2. Google Antigravity
Si vous travaillez avec l'environnement **Antigravity** (CLI ou IDE) :
* Ouvrez le répertoire de travail :
  ```bash
  agy /chemin/vers/ferme
  ```
* Vous pouvez demander à Antigravity d'ajuster les textes, d'ajouter de nouvelles sections ou d'optimiser les composants dans toutes les langues en une seule commande.

### 3. Assistants IA (Claude Code, OpenAI Codex / Copilot)
Le projet dispose d'une architecture claire et sans dépendances superflues, ce qui le rend parfaitement adapté aux assistants IA :

* **Claude Code :**  
  Ouvrez simplement le terminal à la racine du projet et lancez :
  ```bash
  claude
  ```
  Vous pouvez lui confier des instructions telles que :
  > *"Mets à jour les tarifs de la haute saison dans toutes les langues (fr, ar, en, es)"*  
  > *"Ajoute une nouvelle image pour la suite Atlas et adapte la galerie"*

* **GitHub Copilot / Codex :**  
  Ouvrez le dossier dans votre éditeur compatible Copilot / Codex pour bénéficier de suggestions automatiques de code et de modifications intelligentes sur les 4 versions linguistiques.

---

## 📤 Enregistrer et Pousser les Modifications (Git Push)

Après avoir effectué vos modifications (textes, images, styles), suivez ces étapes simples pour sauvegarder et pousser votre travail sur le dépôt distant (GitHub / GitLab) :

```bash
# 1. Vérifier les fichiers modifiés
git status

# 2. Ajouter tous les changements
git add .

# 3. Créer un commit avec un message descriptif
git commit -m "feat: mise à jour des images et des contenus multilingues"

# 4. Pousser vers le serveur distant
git push origin main
```
*(Remplacez `main` par le nom de votre branche active si différent, ex: `master`).*

---

## 🌐 Déploiement

### Déploiement sur Vercel
Le fichier `vercel.json` est déjà configuré pour la gestion des routes et la mise en cache statique.  
Connectez simplement votre dépôt GitHub à [Vercel](https://vercel.com) pour un déploiement continu automatique.

### Déploiement sur VPS (Ubuntu / Debian) avec PM2
Pour faire tourner le site en arrière-plan permanent sur votre propre serveur :
```bash
# Démarrer avec PM2
npm run pm2:start

# Redémarrer après modifications
npm run pm2:restart

# Consulter les logs en temps réel
npm run pm2:logs

# Arrêter le serveur
npm run pm2:stop
```

---

## 📞 Contact & Support

* **Établissement :** Ferme Rêve d'Enfance
* **Localisation :** Tnine Chtouka, Région Casablanca - El Jadida, Maroc
* **Réservations & Informations :** Contact direct via WhatsApp et téléphone intégrés dans le site.

---
*Fait avec passion pour la valorisation du tourisme éco-responsable et rural au Maroc.*
