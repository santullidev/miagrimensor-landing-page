import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, Target, Layers } from "lucide-react";
import type { SpecializedEquipmentData } from "@/sanity/lib/types";

interface SpecializedEquipmentProps {
  data: SpecializedEquipmentData;
}

export default function SpecializedEquipment({ data }: SpecializedEquipmentProps) {
  if (!data || !data.active) return null;

  const icons = [Target, Zap, Layers];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-green-light/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge className="bg-green/10 text-green-700 border-green/20 mb-4 px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
            Tecnología de Vanguardia
          </Badge>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {data.title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="space-y-8 sm:space-y-10 order-2 lg:order-1">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {data.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {data.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-modern bg-white/50 border border-green/10 shadow-sm">
                  <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-headline font-bold text-lg text-foreground">¿Por qué elegir esta tecnología?</h4>
              <div className="grid gap-4">
                {data.benefits.map((benefit, idx) => {
                  const Icon = icons[idx % icons.length];
                  return (
                    <Card key={idx} className="border-green/10 bg-white/80 shadow-soft hover:shadow-soft-lg transition-all duration-300">
                      <CardContent className="p-4 sm:p-5 flex gap-4">
                        <div className="p-2.5 rounded-modern bg-green/10 border border-green/20 flex-shrink-0 h-fit">
                          <Icon className="text-green-600" size={22} />
                        </div>
                        <div>
                          <h5 className="font-semibold text-foreground mb-1">{benefit.title}</h5>
                          <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Image/Gallery Column */}
          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-green/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-green/10 rounded-full blur-3xl" />
            
            <div className="relative rounded-modern-lg overflow-hidden border border-green/20 shadow-soft-2xl bg-white">
              {data.videoUrl ? (
                <div className="aspect-[16/10] w-full">
                  {data.videoUrl.includes('youtube.com') || data.videoUrl.includes('youtu.be') ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${data.videoUrl.includes('youtu.be') ? data.videoUrl.split('/').pop() : data.videoUrl.split('v=')[1]?.split('&')[0]}?autoplay=1&mute=1&loop=1&playlist=${data.videoUrl.includes('youtu.be') ? data.videoUrl.split('/').pop() : data.videoUrl.split('v=')[1]?.split('&')[0]}`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : data.videoUrl.includes('vimeo.com') ? (
                    <iframe
                      src={`https://player.vimeo.com/video/${data.videoUrl.split('/').pop()}?autoplay=1&muted=1&loop=1`}
                      className="w-full h-full border-0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={data.videoUrl} type="video/mp4" />
                    </video>
                  )}
                </div>
              ) : data.mainImage ? (
                <img 
                  src={data.mainImage} 
                  alt={data.title} 
                  className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[16/10]"
                />
              ) : (
                <div className="aspect-[16/10] bg-green/5 flex items-center justify-center">
                  <span className="text-muted-foreground italic">Imagen no disponible</span>
                </div>
              )}
              
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-green/20 px-4 py-2 rounded-modern shadow-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-foreground">Equipamiento 2024</span>
              </div>
            </div>

            {/* Thumbnail Gallery (Optional) */}
            {data.gallery && data.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {data.gallery.slice(0, 3).map((img, idx) => (
                  <div key={idx} className="rounded-modern overflow-hidden border border-green/10 shadow-soft aspect-square bg-white">
                    <img src={img.url} alt={img.alt || "Ejemplo de escaneo"} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
