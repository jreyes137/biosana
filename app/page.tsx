"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { 
  Droplets, 
  DollarSign, 
  CheckCircle, 
  Building,
  Store,
  MapPin,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  ChevronRight,
  Home,
  Sparkles,
  Shield,
  Zap
} from "lucide-react";

type SlideType = "hero" | "benefit" | "form" | "contact" | "summary";
type ClientType = "oficina" | "negocio";
type ZoneType = "centro" | "playas" | "otay" | "mesa" | "rio" | "otros";
type FrequencyType = "semana" | "dia";

interface Slide {
  id: number;
  type: SlideType;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface FormData {
  name: string;
  phone: string;
  clientType: ClientType | "";
  weeklyConsumption: number | "";
  zone: ZoneType | "";
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    clientType: "",
    weeklyConsumption: "",
    zone: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customZone, setCustomZone] = useState("");
  const [frequency, setFrequency] = useState<FrequencyType>("semana");

  const slides: Slide[] = [
    {
      id: 1,
      type: "hero",
      title: "BIOSANA",
      description: "Agua purificada premium para empresas",
      icon: <Droplets className="w-24 h-24 text-blue-500" strokeWidth={1.5} />
    },
    {
      id: 2,
      type: "benefit",
      title: "Más de 10 años de experiencia",
      description: "Garantizando hidratación de calidad en Tijuana",
      icon: <CheckCircle className="w-20 h-20 text-emerald-500" strokeWidth={1.5} />
    },
    {
      id: 3,
      type: "benefit",
      title: "Tecnología de Filtrado",
      description: "8 etapas de purificación avanzada"
    },
    {
      id: 4,
      type: "benefit",
      title: "Precios competitivos",
      description: "Calidad premium al mejor costo",
      icon: <DollarSign className="w-20 h-20 text-amber-500" strokeWidth={1.5} />
    },
    {
      id: 5,
      type: "form",
      title: "Tipo de Cliente",
      description: "¿Para quién es el servicio?"
    },
    {
      id: 6,
      type: "form",
      title: "Ubicación en Tijuana",
      description: "Selecciona tu zona"
    },
    {
      id: 7,
      type: "form",
      title: "Consumo",
      description: "¿Cuántos garrafones necesitas?"
    },
    {
      id: 8,
      type: "contact",
      title: "Tus Datos",
      description: "Para contactarte personalmente"
    },
    {
      id: 9,
      type: "summary",
      title: "¡Listo!",
      description: "Resumen de tu cotización"
    }
  ];

  const clientTypes = [
    { 
      value: "oficina" as ClientType, 
      label: "Oficina", 
      icon: <Building className="w-6 h-6 text-blue-500" strokeWidth={1.5} />,
      color: "from-blue-100 to-blue-50"
    },
    { 
      value: "negocio" as ClientType, 
      label: "Negocio", 
      icon: <Store className="w-6 h-6 text-emerald-500" strokeWidth={1.5} />,
      color: "from-emerald-100 to-emerald-50"
    }
  ];

  const zones = [
    { value: "otay" as ZoneType, label: "Otay", icon: <MapPin className="w-5 h-5" strokeWidth={1.5} /> },
    { value: "playas" as ZoneType, label: "Playas", icon: <MapPin className="w-5 h-5" strokeWidth={1.5} /> },
    { value: "centro" as ZoneType, label: "Centro", icon: <MapPin className="w-5 h-5" strokeWidth={1.5} /> },
    { value: "rio" as ZoneType, label: "Río", icon: <MapPin className="w-5 h-5" strokeWidth={1.5} /> },
    { value: "mesa" as ZoneType, label: "La Mesa", icon: <MapPin className="w-5 h-5" strokeWidth={1.5} /> },
    { value: "otros" as ZoneType, label: "Otra zona...", icon: <MapPin className="w-5 h-5" strokeWidth={1.5} /> }
  ];

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0 && currentSlide > 0) {
        handlePrevious();
      } else if (info.offset.x < 0 && currentSlide < slides.length - 1) {
        handleNext();
      }
    }
  };

  const handleNext = () => {
    const currentSlideData = slides[currentSlide];
    
    if (currentSlideData.type === "form" && currentSlideData.id === 5) {
      if (!formData.clientType) return;
    }
    
    if (currentSlideData.type === "form" && currentSlideData.id === 6) {
      if (!formData.zone || (formData.zone === "otros" && !customZone.trim())) return;
    }
    
    if (currentSlideData.type === "form" && currentSlideData.id === 7) {
      const minimum = frequency === "dia" ? 10 : getMinimumConsumption();
      if (!formData.weeklyConsumption || formData.weeklyConsumption < minimum) return;
    }
    
    if (currentSlideData.type === "contact") {
      if (!formData.name.trim() || !formData.phone.trim() || formData.phone.length < 10) return;
    }
    
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getWhatsAppMessage = () => {
    const clientTypeLabel = clientTypes.find(t => t.value === formData.clientType)?.label || formData.clientType;
    const zoneLabel = formData.zone === "otros" && customZone ? customZone : zones.find(z => z.value === formData.zone)?.label || formData.zone;
    
    let consumoText = "";
    if (frequency === "dia" && formData.weeklyConsumption) {
      const consumoDiario = formData.weeklyConsumption;
      const consumoSemanal = consumoDiario * 6;
      consumoText = `${consumoDiario} garrafones/día (${consumoSemanal} garrafones/semana)`;
    } else {
      consumoText = `${formData.weeklyConsumption} garrafones/semana`;
    }
    
    return `¡Hola BIOSANA! 💧 Soy de ${zoneLabel} y me interesa surtir mi ${clientTypeLabel}. Ocupo ${consumoText}. Mi nombre es ${formData.name} y mi teléfono es ${formData.phone}. ¿Me pueden enviar precios por volumen?`;
  };

  const getWhatsAppLink = () => {
    const message = encodeURIComponent(getWhatsAppMessage());
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "526644514914";
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  const getMinimumConsumption = () => {
    const localZones: ZoneType[] = ["mesa", "centro", "rio"];
    const extendedZones: ZoneType[] = ["playas", "otay", "otros"];
    
    if (formData.zone && localZones.includes(formData.zone)) return 15;
    if (formData.zone && extendedZones.includes(formData.zone)) return 25;
    return 15;
  };

  const getZoneWarningMessage = () => {
    const minimum = getMinimumConsumption();
    const localZones: ZoneType[] = ["mesa", "centro", "rio"];
    
    if (formData.zone && localZones.includes(formData.zone)) {
      return `Suministro mínimo para esta zona: ${minimum} garrafones`;
    } else if (formData.zone) {
      return `Debido a la distancia, el suministro mínimo para esta zona es de ${minimum} garrafones`;
    }
    return "Suministro mínimo para rutas corporativas: 15 garrafones";
  };

  const isNextButtonEnabled = () => {
    const currentSlideData = slides[currentSlide];
    
    if (currentSlideData.type === "form" && currentSlideData.id === 5) {
      return !!formData.clientType;
    }
    
    if (currentSlideData.type === "form" && currentSlideData.id === 6) {
      if (!formData.zone) return false;
      if (formData.zone === "otros") return !!customZone.trim();
      return true;
    }
    
    if (currentSlideData.type === "form" && currentSlideData.id === 7) {
      const minimum = frequency === "dia" ? 10 : getMinimumConsumption();
      return !!formData.weeklyConsumption && formData.weeklyConsumption >= minimum;
    }
    
    if (currentSlideData.type === "contact") {
      return !!formData.name.trim() && !!formData.phone.trim() && formData.phone.length >= 10;
    }
    
    return true;
  };

  const getNextButtonColor = () => {
    const isEnabled = isNextButtonEnabled();
    return isEnabled 
      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/20" 
      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/20";
  };

  useEffect(() => {
    if (slides[currentSlide].type === "form" && !isSubmitted) {
      setIsSubmitted(false);
    }
  }, [currentSlide, isSubmitted]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      y: 20
    }),
    center: {
      x: 0,
      opacity: 1,
      y: 0
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      y: -20
    })
  };

  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-slate-50 font-sans overflow-hidden py-4">
      {/* Contenedor principal con dimensiones fijas */}
      <div className="w-full max-w-[420px] min-h-[650px] h-[650px] flex flex-col justify-between bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden mx-4">
        {/* Header fijo - Siempre arriba */}
        <div className="shrink-0">
          {/* Barra de progreso estilo Instagram Stories */}
          <div className="flex gap-1.5 px-6 pt-5 pb-3">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="flex-1 h-0.5 bg-slate-200 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full bg-slate-900 transition-all duration-500 ${
                    index < currentSlide ? 'w-full' : index === currentSlide ? 'w-1/2' : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Header minimalista y elegante */}
          <div className="px-6 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div className="text-left">
                <h1 className="text-base font-bold text-slate-900 tracking-tight">BIOSANA</h1>
                <p className="text-[11px] text-slate-500 font-medium">Agua purificada premium</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido central - Flex-1 con overflow scroll */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-2 min-h-0">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                y: { duration: 0.3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              className="min-h-full"
            >
              {/* Hero Slide */}
              {slides[currentSlide].type === "hero" && (
                <div className="min-h-full flex flex-col py-4">
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10">
                    <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                      <div className="text-7xl animate-[float_4s_ease-in-out_infinite]">
                        💧
                      </div>
                      <style jsx>{`
                        @keyframes float {
                          0%, 100% { transform: translateY(0px); }
                          50% { transform: translateY(-15px); }
                        }
                      `}</style>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold text-slate-900 leading-tight tracking-tight">
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-base text-slate-500 leading-relaxed font-medium">
                        {slides[currentSlide].description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefit Slides */}
              {slides[currentSlide].type === "benefit" && slides[currentSlide].id === 2 && (
                <div className="min-h-full flex flex-col py-4">
                  <div className="flex-1 flex flex-col justify-center space-y-10">
                    <div className="text-center">
                      <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                          {slides[currentSlide].icon}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-slate-900 leading-tight tracking-tight">
                          {slides[currentSlide].title}
                        </h2>
                        <p className="text-base text-slate-500 leading-relaxed font-medium">
                          {slides[currentSlide].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {slides[currentSlide].type === "benefit" && slides[currentSlide].id === 4 && (
                <div className="min-h-full flex flex-col py-4">
                  <div className="flex-1 flex flex-col justify-center space-y-10">
                    <div className="text-center">
                      <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                          {slides[currentSlide].icon}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-slate-900 leading-tight tracking-tight">
                          {slides[currentSlide].title}
                        </h2>
                        <p className="text-base text-slate-500 leading-relaxed font-medium">
                          {slides[currentSlide].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Technology Slide - 8 Etapas de Filtrado */}
              {slides[currentSlide].type === "benefit" && slides[currentSlide].id === 3 && (
                <div className="min-h-full flex flex-col justify-center py-4">
                  <div className="flex-1 flex flex-col justify-center space-y-6">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 flex items-center justify-center mx-auto shrink-0">
                        <div className="text-4xl">🔬</div>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 leading-tight tracking-tight">
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {slides[currentSlide].description}
                      </p>
                    </div>
                    
                    {/* Grid de 8 etapas */}
                    <div className="grid grid-cols-2 gap-2.5 px-2">
                      <div className="bg-blue-50/50 rounded-xl p-3 flex flex-col items-center justify-center space-y-2 min-h-[85px]">
                        <div className="text-2xl">💧</div>
                        <h4 className="font-bold text-slate-900 text-xs text-center leading-tight">Ósmosis Inversa</h4>
                      </div>
                      
                      <div className="bg-blue-50/50 rounded-xl p-3 flex flex-col items-center justify-center space-y-2 min-h-[85px]">
                        <div className="text-2xl">💡</div>
                        <h4 className="font-bold text-slate-900 text-xs text-center leading-tight">Luces Ultravioleta</h4>
                      </div>
                      
                      <div className="bg-blue-50/50 rounded-xl p-3 flex flex-col items-center justify-center space-y-2 min-h-[85px]">
                        <div className="text-2xl">✨</div>
                        <h4 className="font-bold text-slate-900 text-xs text-center leading-tight">Sistema de Suavizadores</h4>
                      </div>
                      
                      <div className="bg-blue-50/50 rounded-xl p-3 flex flex-col items-center justify-center space-y-2 min-h-[85px]">
                        <div className="text-2xl">🔋</div>
                        <h4 className="font-bold text-slate-900 text-xs text-center leading-tight">Tanque de Carbón Activado</h4>
                      </div>
                      
                      <div className="bg-blue-50/50 rounded-xl p-3 flex flex-col items-center justify-center space-y-2 min-h-[85px]">
                        <div className="text-2xl">🌊</div>
                        <h4 className="font-bold text-slate-900 text-xs text-center leading-tight">Sistema de Ozonización</h4>
                      </div>
                      
                      <div className="bg-blue-50/50 rounded-xl p-3 flex flex-col items-center justify-center space-y-2 min-h-[85px]">
                        <div className="text-2xl">🌫️</div>
                        <h4 className="font-bold text-slate-900 text-xs text-center leading-tight">Filtros de Carbón Activado</h4>
                      </div>
                      
                      <div className="bg-blue-50/50 rounded-xl p-3 flex flex-col items-center justify-center space-y-2 min-h-[85px]">
                        <div className="text-2xl">🧪</div>
                        <h4 className="font-bold text-slate-900 text-xs text-center leading-tight">Filtros de Sedimento</h4>
                      </div>
                      
                      <div className="bg-blue-50/50 rounded-xl p-3 flex flex-col items-center justify-center space-y-2 min-h-[85px]">
                        <div className="text-2xl">🌬️</div>
                        <h4 className="font-bold text-slate-900 text-xs text-center leading-tight">Filtros de Aire</h4>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Slides */}
              {slides[currentSlide].type === "form" && slides[currentSlide].id === 5 && (
                <div className="min-h-full flex flex-col justify-between py-6">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                      Tipo de cliente
                    </h3>
                    <div className="flex flex-col gap-3">
                      {clientTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleInputChange("clientType", type.value)}
                          className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                            formData.clientType === type.value
                              ? "bg-slate-900 shadow-[0_4px_12px_rgb(0,0,0,0.15)]"
                              : "bg-slate-50 hover:bg-slate-100"
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                            formData.clientType === type.value
                              ? "bg-white/10"
                              : "bg-white"
                          }`}>
                            <Building className={`w-6 h-6 ${formData.clientType === type.value ? "text-white" : "text-slate-700"}`} strokeWidth={1.5} />
                          </div>
                          <span className={`text-base font-semibold ${
                            formData.clientType === type.value
                              ? "text-white"
                              : "text-slate-900"
                          }`}>
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div></div>
                </div>
              )}

              {slides[currentSlide].type === "form" && slides[currentSlide].id === 6 && (
                <div className="min-h-full flex flex-col justify-between py-6">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                  
                  <div className="space-y-4 flex-1 overflow-y-auto">
                    <h3 className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                      Zona en Tijuana
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      {zones.map((zone) => (
                        <button
                          key={zone.value}
                          type="button"
                          onClick={() => {
                            handleInputChange("zone", zone.value);
                            if (zone.value !== "otros") {
                              setCustomZone("");
                            }
                          }}
                          className={`p-4 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center space-y-2 min-h-[90px] ${
                            formData.zone === zone.value
                              ? "bg-slate-900 text-white shadow-[0_4px_12px_rgb(0,0,0,0.15)]"
                              : "bg-slate-50 hover:bg-slate-100 text-slate-900"
                          }`}
                        >
                          <MapPin className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                          <span className="text-sm font-semibold">
                            {zone.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    
                    {formData.zone === "otros" && (
                      <div className="mt-4 space-y-3">
                        <label className="text-sm font-semibold text-slate-700">
                          Escribe tu colonia o zona específica
                        </label>
                        <input
                          type="text"
                          value={customZone}
                          onChange={(e) => setCustomZone(e.target.value)}
                          className="w-full p-3 text-sm border border-slate-200 rounded-2xl bg-slate-50 focus:outline-none focus:border-slate-900 focus:bg-white transition-all placeholder:text-slate-400"
                          placeholder="Ej: Colonia Libertad, Zona Río, etc."
                        />
                      </div>
                    )}
                  </div>
                  <div></div>
                </div>
              )}

              {slides[currentSlide].type === "form" && slides[currentSlide].id === 7 && (
                <div className="min-h-full flex flex-col justify-between py-6">
                  <div className="text-center space-y-3 shrink-0">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                  
                  <div className="space-y-4 flex-1 overflow-y-auto py-2">
                    <h3 className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                      Volumen corporativo
                    </h3>
                    
                    {/* Selector de Frecuencia */}
                    <div className="flex justify-center">
                      <div className="inline-flex rounded-full bg-slate-100 p-1">
                        <button
                          type="button"
                          onClick={() => setFrequency("semana")}
                          className={`px-5 py-2 rounded-full transition-all duration-300 text-sm font-semibold ${
                            frequency === "semana"
                              ? "bg-slate-900 text-white"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          Por Semana
                        </button>
                        <button
                          type="button"
                          onClick={() => setFrequency("dia")}
                          className={`px-5 py-2 rounded-full transition-all duration-300 text-sm font-semibold ${
                            frequency === "dia"
                              ? "bg-slate-900 text-white"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          Por Día
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-4">
                      <input
                        type="number"
                        min={frequency === "dia" ? 10 : getMinimumConsumption()}
                        max="500"
                        value={formData.weeklyConsumption || ""}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || "";
                          const minimum = frequency === "dia" ? 10 : getMinimumConsumption();
                          if (value === "" || value >= minimum) {
                            handleInputChange("weeklyConsumption", value);
                          }
                        }}
                        className="w-full max-w-[160px] p-3 text-xl font-bold text-center border border-slate-200 rounded-2xl bg-slate-50 focus:outline-none focus:border-slate-900 focus:bg-white transition-all placeholder:text-slate-400"
                        placeholder={frequency === "dia" ? "10" : getMinimumConsumption().toString()}
                      />
                      <p className="text-xs text-slate-500 font-medium">
                        Garrafones por {frequency === "dia" ? "día" : "semana"} (mínimo {frequency === "dia" ? 10 : getMinimumConsumption()})
                      </p>
                      
                      {/* Opciones de cantidad rápidas */}
                      <div className="flex flex-wrap gap-2 justify-center">
                        {(() => {
                          const minimum = frequency === "dia" ? 10 : getMinimumConsumption();
                          let ranges;
                          
                          if (frequency === "dia") {
                            ranges = ["10-15", "15-25", "25-50", "50+"];
                          } else if (minimum === 15) {
                            ranges = ["15-20", "20-50", "50-100", "100+"];
                          } else {
                            ranges = ["25-50", "50-100", "100-200", "200+"];
                          }
                          
                          return ranges.map((range) => {
                            const [min, max] = range === "200+" ? [200, 500] : 
                                              range === "100+" ? [100, 500] : 
                                              range === "50+" ? [50, 500] : 
                                              range.split("-").map(Number);
                            const currentValue = formData.weeklyConsumption;
                            const isSelected = typeof currentValue === "number" && 
                                              currentValue >= min && 
                                              currentValue <= (max || 500);
                            return (
                              <button
                                key={range}
                                type="button"
                                onClick={() => handleInputChange("weeklyConsumption", min)}
                                className={`px-3 py-1.5 rounded-full transition-all duration-300 text-xs font-semibold ${
                                  isSelected
                                    ? "bg-slate-900 text-white shadow-[0_4px_12px_rgb(0,0,0,0.15)]"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                {range}
                              </button>
                            );
                          });
                        })()}
                      </div>
                      
                      {/* Aviso de pedido mínimo dinámico */}
                      <div className="text-center">
                        <p className="text-[10px] text-slate-500 italic">
                          {frequency === "dia" 
                            ? "Suministro mínimo diario: 10 garrafones (recurrencia justifica el viaje)" 
                            : getZoneWarningMessage()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0"></div>
                </div>
              )}

              {slides[currentSlide].type === "contact" && (
                <div className="min-h-full flex flex-col justify-between py-6">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-700">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full p-3 text-sm border border-slate-200 rounded-2xl bg-slate-50 focus:outline-none focus:border-slate-900 focus:bg-white transition-all placeholder:text-slate-400"
                        placeholder="Tu nombre"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-700">
                        Número de teléfono
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full p-3 text-sm border border-slate-200 rounded-2xl bg-slate-50 focus:outline-none focus:border-slate-900 focus:bg-white transition-all placeholder:text-slate-400"
                        placeholder="664 123 4567"
                      />
                    </div>
                  </div>
                  <div className="shrink-0"></div>
                </div>
              )}

              {slides[currentSlide].type === "summary" && (
                <div className="min-h-full flex flex-col justify-between py-6">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-2xl p-4 space-y-3 overflow-y-auto max-h-[280px]">
                      <h3 className="text-base font-bold text-slate-900">
                        Resumen de tu cotización
                      </h3>
                      
                      <div className="space-y-2.5">
                        {formData.name && (
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-slate-500 text-xs font-medium">Nombre:</span>
                            <span className="font-semibold text-slate-900 text-sm text-right">{formData.name}</span>
                          </div>
                        )}
                        
                        {formData.phone && (
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-slate-500 text-xs font-medium">Teléfono:</span>
                            <span className="font-semibold text-slate-900 text-sm text-right">{formData.phone}</span>
                          </div>
                        )}
                        
                        {formData.clientType && (
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-slate-500 text-xs font-medium">Tipo de cliente:</span>
                            <span className="font-semibold text-slate-900 text-sm text-right">
                              {clientTypes.find(t => t.value === formData.clientType)?.label}
                            </span>
                          </div>
                        )}
                        
                        {formData.weeklyConsumption && (
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-slate-500 text-xs font-medium">Consumo:</span>
                            <span className="font-semibold text-slate-900 text-sm text-right">{formData.weeklyConsumption} garrafones/{frequency === "dia" ? "día" : "semana"}</span>
                          </div>
                        )}
                        
                        {formData.zone && (
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-slate-500 text-xs font-medium">Zona:</span>
                            <span className="font-semibold text-slate-900 text-sm text-right">
                              {zones.find(z => z.value === formData.zone)?.label}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-[0_4px_12px_rgb(0,0,0,0.15)] text-sm flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" strokeWidth={2} />
                      Enviar por WhatsApp
                    </a>
                  </div>
                  <div className="shrink-0"></div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Botones de navegación - Siempre en la misma posición */}
        <div className="shrink-0 py-4 px-6 border-t border-slate-100">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center shrink-0"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>
            
            <button
              onClick={handleNext}
              disabled={currentSlide === slides.length - 1 || !isNextButtonEnabled()}
              className={`flex-1 max-w-[280px] py-3.5 rounded-full transition-all flex items-center justify-center gap-2 font-semibold text-base shadow-[0_4px_12px_rgb(0,0,0,0.15)] disabled:opacity-30 disabled:cursor-not-allowed ${
                isNextButtonEnabled() && currentSlide < slides.length - 1
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
