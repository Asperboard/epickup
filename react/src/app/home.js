
export default function Home() {
    return (
      <main className="flex-grow">
        <div className="mx-auto p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Guide du parcours du patient et parents</h2>
                <p className="text-gray-700">
                  Pour les personnes se questionnant sur un éventuel diagnostic, cela pourrait être précieux de savoir quelles démarches effectuer en premier lieu. Le site, en proposant un &quot;guide du parcours du patient&quot;, pourrait être en cela un premier interlocuteur clé.
                </p>
                <p className="text-right italic mt-4">- Aurélie De Saint Thibault, psychologue</p>
              </div>

              <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">L'offre</h2>
                <p className="text-gray-700">
                  Le livre des règles non écrites
                </p>
              </div>
            </div>

            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <p className="text-gray-700">
                Capacité sociale. Souvent mal comprise et difficulté d'intégration... Texte général expliquant le site web et son contenu.
              </p>
              <p className="text-gray-700 mt-4">
                Texte général sur les Aspies et les règles qu'ils ne connaissent pas, et comment cela leur pose des problèmes. Vous avez le diagnostic, où aller à partir d'ici...
              </p>
              <div className="mt-6 p-4 bg-blue-200 rounded-md">
                <p className="text-blue-800">
                  Explique ce qu'est le site web et que vous pouvez l'essayer gratuitement pendant 14 jours, sans avoir à fournir de détails de carte bancaire, puis avec un abonnement pouvant être arrêté à tout moment.
                </p>
              </div>
            </div>
          </div>
        </div>
        </main>
    )
}
