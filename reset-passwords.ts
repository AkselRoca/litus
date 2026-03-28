import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log("Recherche des utilisateurs...")
    const users = await prisma.user.findMany()
    
    if (users.length === 0) {
        console.log("Aucun utilisateur trouvé. Création de aksel@litus.fr...")
        const hash = await bcrypt.hash('litus2024!', 12)
        await prisma.user.create({
            data: {
                email: 'aksel@litus.fr',
                name: 'Aksel',
                password: hash,
                role: 'admin'
            }
        })
        console.log("Compte aksel@litus.fr créé avec succès. Mdp : litus2024!")
    } else {
        console.log(`Trouvé ${users.length} utilisateur(s). Réinitialisation des mots de passe à litus2024!`)
        const hash = await bcrypt.hash('litus2024!', 12)
        
        for (const user of users) {
             await prisma.user.update({
                 where: { id: user.id },
                 data: { password: hash }
             })
             console.log(`- Mot de passe de ${user.email} réinitialisé`)
        }
    }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
