import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import type { CtaData, SiteSettings } from "@/sanity/lib/types";

interface CTASectionProps {
  cta: CtaData
  settings: Pick<SiteSettings, 'phone' | 'email' | 'address'>
}

export default function CTASection({ cta, settings }: CTASectionProps) {
  return (
    <section className="bg-green/5 border-t border-b border-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-section section-lg">
        <div className="text-center">
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            {cta.heading}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {cta.subheading}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              asChild 
              size="lg" 
              className="text-lg px-8 py-6 min-h-[48px] bg-green hover:bg-green-100 text-white border-soft rounded-modern shadow-soft-lg hover:shadow-soft-xl font-semibold transition-all duration-250 focus:ring-2 focus:ring-green-50 focus:ring-offset-2"
            >
              <a href={cta.primaryButton.href} target="_blank" rel="noopener noreferrer">
                {cta.primaryButton.text}
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 min-h-[48px] bg-background hover:bg-green/5 text-foreground border-green/30 hover:border-green/50 rounded-modern shadow-soft font-medium transition-all duration-250"
            >
              <Link href={cta.secondaryButton.href || "#"}>
                {cta.secondaryButton.text}
              </Link>
            </Button>
          </div>

          {/* Información de contacto */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-3 p-4 rounded-modern bg-card/50 border border-green-200/30 transition-all duration-250 hover:shadow-soft hover:border-green-200">
              <Phone className="text-green" size={24} strokeWidth={2} />
              <span className="font-medium text-foreground">{settings.phone}</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-4 rounded-modern bg-card/50 border border-green-200/30 transition-all duration-250 hover:shadow-soft hover:border-green-200">
              <Mail className="text-green" size={24} strokeWidth={2} />
              <span className="font-medium text-foreground">{settings.email}</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-4 rounded-modern bg-card/50 border border-green-200/30 transition-all duration-250 hover:shadow-soft hover:border-green-200">
              <MapPin className="text-green" size={24} strokeWidth={2} />
              <span className="font-medium text-foreground">{settings.address}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
