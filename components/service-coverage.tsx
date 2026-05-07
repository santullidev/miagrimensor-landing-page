import { CheckCircle } from "lucide-react";

interface ServiceCoverageProps {
  areas: string[]
  note?: string
  sectionTitle?: string
  sectionSubtitle?: string
}

const ServiceCoverage = ({
  areas,
  note,
  sectionTitle = "Algunas de las Zonas donde Trabajo",
  sectionSubtitle = "Ofrezco mis servicios profesionales de agrimensura en CABA y Gran Buenos Aires",
}: ServiceCoverageProps) => {
  return (
    <section id="cobertura" className="relative py-section section-lg bg-green-light/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            {sectionTitle}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        {/* Neighborhoods list container */}
        <div className="max-w-4xl mx-auto">
          {/* Neighborhoods list in elegant typography */}
          <div className="space-y-4">
            <div className="mb-6 text-center">
              <h3 className="font-headline text-2xl font-semibold mb-3 text-foreground">
                Barrios y Localidades
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Ofrezco servicios en las siguientes zonas del Gran Buenos Aires y CABA.
              </p>
            </div>

            {/* Elegant grid list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {areas.map((area, index) => (
                <div
                  key={`${area}-${index}`}
                  className="group flex items-center gap-3 p-3 rounded-modern bg-card border-soft hover:border-green/30 hover:shadow-soft transition-all duration-250 cursor-default"
                >
                  <CheckCircle 
                    className="w-5 h-5 text-green-400 flex-shrink-0 group-hover:text-green-500 transition-colors duration-250" 
                    strokeWidth={1.5}
                  />
                  <span className="font-medium text-foreground group-hover:text-foreground/90 transition-colors duration-250">
                    {area}
                  </span>
                </div>
              ))}
            </div>

            {/* Additional info */}
            {note && (
              <div className="mt-8 p-4 rounded-modern bg-green-light/30 border border-green/20 text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="font-semibold text-foreground">Nota:</strong> {note}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCoverage;
