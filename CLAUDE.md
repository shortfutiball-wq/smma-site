# INSTRUCTIONS — jay-won (MédRev)

Ce repo est UNIQUEMENT l'application de révisions médicales MédRev.

## Projet
- **Vercel project** : `jay-won` / `prj_sYfB0QAx5pJtCbsNFiKhh29Ote9U`
- **Org ID** : `team_HBnaELG0F0ovcKgqMNpIxAIT`
- **URL production** : https://jay-won.vercel.app

## RÈGLES ABSOLUES
1. `src/app/page.tsx` doit TOUJOURS contenir `redirect("/dashboard")` — jamais de landing SMMA
2. `src/components/landing/` ne doit PAS exister dans ce repo — c'est le projet SMMA séparé
3. Pour déployer : `VERCEL_PROJECT_ID=prj_sYfB0QAx5pJtCbsNFiKhh29Ote9U VERCEL_ORG_ID=team_HBnaELG0F0ovcKgqMNpIxAIT vercel deploy --prod --yes`
4. Avant chaque déploiement : supprimer `.next/`, vérifier que `page.tsx` = redirect, puis `npm run build`

## Projet SMMA (séparé)
- Dossier : `C:/Users/hugod/smma-site/`
- URL : https://smma-site-blush.vercel.app
- NE PAS mélanger avec ce repo
