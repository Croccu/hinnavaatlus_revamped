import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const pages: Record<string, { title: string; content: string }> = {
  reeglid: {
    title: "Foorumi reeglid",
    content: `1. Ole viisakas ja lugupidav teiste kasutajate suhtes.\n2. Ära postita solvavat, ähvardavat või diskrimineerivat sisu.\n3. Ära spämmi – iga postitus peab olema asjakohane.\n4. Isikuandmete jagamine on keelatud.\n5. Reklaamimine ilma administraatori loata on keelatud.\n6. Kasuta otsingut enne uue teema loomist.\n7. Postita teema õigesse kategooriasse.\n8. Reeglite rikkumine võib kaasa tuua ajutise või püsiva keelu.`,
  },
  kkk: {
    title: "Korduma kippuvad küsimused (KKK)",
    content: `K: Kuidas ma saan registreeruda?\nV: Klõpsake "Registreeru" nuppu ja sisestage kasutajanimi.\n\nK: Kuidas ma saan uue teema luua?\nV: Minge soovitud kategooriasse ja klõpsake "Uus teema" nuppu.\n\nK: Kuidas ma saan oma postitusi näha?\nV: Kasutage "Minu postitused" filtrit kategooria vaates.\n\nK: Kas foorum on tasuta?\nV: Jah, Hinnavaatlus foorum on täiesti tasuta.\n\nK: Kuidas ma saan oma kontot kustutada?\nV: Võtke ühendust administraatoriga Kontakt lehel.`,
  },
  kontakt: {
    title: "Kontakt",
    content: `Hinnavaatlus Foorum\n\nE-post: info@hinnavaatlus.ee\nTelefon: +372 5555 1234\n\nAadress:\nHinnavaatlus OÜ\nTartu mnt 1\n10145 Tallinn\nEesti\n\nTööaeg:\nE-R: 9:00 – 17:00\nL-P: Suletud\n\nSotsiaalmeedia vastused tööpäeviti 24 tunni jooksul.`,
  },
  pealeht: {
    title: "Hinnavaatlus Pealeht",
    content: `Tere tulemast Hinnavaatlusesse!\n\nHinnavaatlus on Eesti suurim hinnavõrdlusportaal, kus saad võrrelda tuhandete toodete hindu erinevatest poodidest.\n\nMeie eesmärk on aidata tarbijatel teha teadlikke ostuotsuseid, pakkudes usaldusväärset ja ajakohast hinnainfot.\n\nKülasta meie peamist veebilehte: hinnavaatlus.ee`,
  },
  poed: {
    title: "Poed",
    content: `Hinnavaatluses on esindatud üle 100 Eesti e-poe, sealhulgas:\n\n• Euronics\n• Photopoint\n• 1A.ee\n• Klick.ee\n• Hansapost\n• Kaup24\n• Hobby Hall\n• Prisma e-pood\n• Coop e-pood\n• Selver e-pood\n\nSoovid oma poodi lisada? Võta meiega ühendust Kontakt lehel.`,
  },
  hinnavordlus: {
    title: "Hinnavõrdlus",
    content: `Hinnavaatluse hinnavõrdlus aitab sul leida parima hinna!\n\nKuidas see töötab:\n1. Otsi soovitud toodet\n2. Võrdle hindu erinevates poodides\n3. Klõpsa parimat pakkumist\n4. Suunatakse otse poe lehele\n\nHinnavõrdluse kasutamine on täiesti tasuta. Hinnad uuendatakse iga päev.`,
  },
  kasutustingimused: {
    title: "Kasutustingimused",
    content: `Viimati uuendatud: 01.01.2026\n\n1. Üldsätted\nKäesolevad kasutustingimused reguleerivad Hinnavaatlus Foorumi kasutamist.\n\n2. Kasutajakonto\nIga kasutaja vastutab oma konto turvalisuse eest. Kasutajanimi peab olema unikaalne.\n\n3. Sisu\nKasutajad vastutavad oma postituste sisu eest. Hinnavaatlus jätab endale õiguse eemaldada sobimatut sisu.\n\n4. Privaatsus\nKasutajate isikuandmeid töödeldakse vastavalt privaatsuspoliitikale.\n\n5. Vastutuse piiramine\nHinnavaatlus ei vastuta foorumis jagatud info täpsuse eest.`,
  },
  privaatsus: {
    title: "Privaatsuspoliitika",
    content: `Viimati uuendatud: 01.01.2026\n\nHinnavaatlus austab teie privaatsust.\n\nMillist infot me kogume:\n• Kasutajanimi\n• Postituste sisu\n• Külastusstatistika\n\nKuidas me kasutame teie andmeid:\n• Foorumi teenuse pakkumine\n• Kasutajakogemuse parandamine\n• Statistika kogumine\n\nMe ei jaga teie isikuandmeid kolmandate osapooltega ilma teie nõusolekuta.\n\nKüsimuste korral võtke ühendust: info@hinnavaatlus.ee`,
  },
  kupsised: {
    title: "Küpsiste poliitika",
    content: `Mis on küpsised?\nKüpsised on väikesed tekstifailid, mis salvestatakse teie seadmesse veebilehe külastamisel.\n\nMilliseid küpsiseid me kasutame:\n• Vajalikud küpsised – foorumi toimimiseks\n• Eelistuste küpsised – teie seadete meeldejätmiseks (nt teema valik)\n• Statistika küpsised – külastusstatistika kogumiseks\n\nKuidas küpsiseid hallata:\nSaate küpsiseid hallata oma brauseri seadetes. Küpsiste blokeerimine võib mõjutada foorumi funktsionaalsust.\n\nKüsimuste korral: info@hinnavaatlus.ee`,
  },
};

export function InfoPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = pages[slug || ""];

  if (!page) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Lehte ei leitud
        </h1>
        <Link
          to="/"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          Tagasi avalehele
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Tagasi foorumisse
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {page.title}
        </h1>
        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
          {page.content}
        </div>
      </div>
    </div>
  );
}
