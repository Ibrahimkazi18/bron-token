import { Card, CardContent } from "@/components/ui/card"
import { Shield, Target, Award, Flame } from "lucide-react"

export default function FunFacts() {
  const facts = [
    {
      icon: Shield,
      title: "Most Chasedown Blocks",
      description: "LeBron's legendary defensive plays inspire our security features",
      color: "text-yellow-400",
    },
    {
      icon: Target,
      title: "Real-life GOAT",
      description: "4x NBA Champion, 4x Finals MVP - the stats speak for themselves",
      color: "text-purple-400",
    },
    {
      icon: Award,
      title: "Started Meme Revolution",
      description: "From 'The Decision' to 'LeGM' - a meme legend",
      color: "text-yellow-400",
    },
    {
      icon: Flame,
      title: "Still Dominating at 39",
      description: "Age is just a number when you're the King",
      color: "text-purple-400",
    },
  ]

  return (
    <section className="py-20 bg-black/30 scroll-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
              Fun Facts About The King
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Why LeBron James is the perfect inspiration for the ultimate meme coin
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facts.map((fact, index) => (
            <Card
              key={index}
              className="glass-effect border-gray-700/50 hover:border-yellow-400/40 transition-all duration-300 group hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <fact.icon
                  className={`h-16 w-16 ${fact.color} mx-auto mb-4 group-hover:scale-110 transition-transform`}
                />
                <h3 className="text-xl font-bold text-white mb-3">{fact.title}</h3>
                <p className="text-gray-400">{fact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
