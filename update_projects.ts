
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const updates = [
    { title: "Femmes des Territoires", link: "https://www.femmesdesterritoires.fr/" },
    { title: "Loumor Débarras", link: "https://www.loumor.com/" },
    { title: "Japan Hunter", link: "https://japanhunter.fr/" },
    { title: "Azra Photographie", link: "https://www.azraphotographie.fr/" },
    { title: "Murasaki Team", link: "https://murasaki.team/" },
    { title: "Geoproxio", link: "https://www.geoproxio.fr/" },
    { title: "Aspire Marketing", link: "https://www.aspire-marketing.fr/" },
    { title: "Menuiserie Jérôme Rio", link: "https://www.menuiserie-jeromerio.fr/" },
    { title: "Réflexologie Lorient", link: "https://www.reflexologielorient.fr/" },
    { title: "Aire des Îles", link: "https://www.airedesiles.fr/" },
    { title: "BR'Z Couverture", link: "https://www.brzcouverture.fr/" },
    { title: "Carnac Immobilier", link: "https://www.carnacimmobilier.fr/" },
    { title: "Del Rio Pizzeria", link: "https://www.delriopizzeria.fr/" },
    { title: "Maïiana LG", link: "https://www.maiiana.fr/" },
    { title: "Gîte des Oiseaux", link: "https://www.gitesdesoiseaux.com/" },
    { title: "Plomberie 84", link: "https://www.plomberie84.fr/" },
    { title: "Concept Coiffure", link: "https://www.conceptcoiffure.com/" },
    { title: "Le Bolay Paysagiste", link: "http://lebolaypaysagiste.fr/" }
]

async function main() {
    console.log('--- UPDATING PROJECTS ---')
    for (const update of updates) {
        const p = await prisma.project.findFirst({
            where: { title: { contains: update.title } } // Use contains to be safe, but based on list it matches well
        })

        if (p) {
            await prisma.project.update({
                where: { id: p.id },
                data: { link: update.link }
            })
            console.log(`Updated ${p.title} -> ${update.link}`)
        } else {
            console.warn(`Project not found for title containing: ${update.title}`)
        }
    }
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
