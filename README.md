# App pour le projet cyber sécu A5 CESI

## Déploiement

1. ### Cloner le projet

```bash
git clone https://github.com/OscarPALISSOT/App_projet_cyber_cesi_a5.git
```

2. ### Mettre à jour le DNS du serveur

Ce projet utilise un nom de domaine dont je ne suis pas propriétaire. Il faut donc mettre à jour le fichier `/etc/hosts` de votre serveur pour que le nom de domaine pointe vers votre serveur.

```bash
sudo vi /etc/hosts
```

Ajouter la ligne suivante à la fin du fichier :

```bash
127.0.0.1 killerbee.fr
127.0.0.1 apiUsers.killerbee.fr
127.0.0.1 apiFrisbee.killerbee.fr
```

3. ### Mettre à jour les variables d'environnement

Les variables d'environnement sont stockées dans le fichier `.env` à la racine du projet, dans les racines des micro-services et dans la racine du client front-end. Il faut les mettre à jour avec les valeurs de votre serveur.

Il faut aussi mettre à jour les adresses IP dans la configuration de Nginx à la racine du projet.

4. ### Lancer les containers

```bash
cd App_projet_cyber_cesi_a5
docker-compose up -d
```

5. ### Mettre à jour la base de données

Les containers auth-1 et frisbee-1 nécessitent d'être redémarrés pour que la base de données soit mise à jour.

6. ### Accéder à l'application

L'application est accessible à l'adresse suivante : [https://killerbee.fr](https://killerbee.fr)

Les certificats sont auto-signés, il faut donc accepter l'exception de sécurité pour accéder à l'application. De même, il faut accepter l'exception de sécurité pour accéder à l'API. L'API est accessible à l'adresse suivante : [https://apiUsers.killerbee.fr](https://apiUsers.killerbee.fr) et [https://apiFrisbee.killerbee.fr](https://apiFrisbee.killerbee.fr)