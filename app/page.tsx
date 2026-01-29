"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { 
  Droplets, 
  Zap, 
  DollarSign, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  MessageCircle,
  Home as HomeIcon,
  Building,
  Store,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Check
} from "lucide-react";

type SlideType = "hero" | "benefit" | "form" | "contact" | "summary";
type ClientType = "hogar" | "oficina" | "negocio";
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

export default function Home() {
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
      description: "Agua purificada premium",
      icon: <Droplets className="w-24 h-24 text-blue-600" strokeWidth={1} />
    },
    {
      id: 2,
      type: "benefit",
      title: "Más de 10 años de experiencia",
      description: "Garantizando hidratación de calidad en Tijuana",
      icon: <CheckCircle className="w-20 h-20 text-blue-600" strokeWidth={1} />
    },
    {
      id: 3,
      type: "benefit",
      title: "Tecnología de Filtrado",
      description: "4 etapas de purificación avanzada"
    },
    {
      id: 4,
      type: "benefit",
      title: "Precios competitivos",
      description: "Calidad premium",
      icon: <DollarSign className="w-20 h-20 text-blue-600" strokeWidth={1} />
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
    { value: "oficina" as ClientType, label: "Oficina", icon: <Building className="w-6 h-6" strokeWidth={1} /> },
    { value: "negocio" as ClientType, label: "Negocio/Comercio", icon: <Store className="w-6 h-6" strokeWidth={1} /> }
  ];

  const zones = [
    { value: "otay" as ZoneType, label: "Otay", icon: <MapPin className="w-5 h-5" strokeWidth={1} /> },
    { value: "playas" as ZoneType, label: "Playas", icon: <MapPin className="w-5 h-5" strokeWidth={1} /> },
    { value: "centro" as ZoneType, label: "Centro", icon: <MapPin className="w-5 h-5" strokeWidth={1} /> },
    { value: "rio" as ZoneType, label: "Río", icon: <MapPin className="w-5 h-5" strokeWidth={1} /> },
    { value: "mesa" as ZoneType, label: "La Mesa", icon: <MapPin className="w-5 h-5" strokeWidth={1} /> },
    { value: "otros" as ZoneType, label: "Otra zona...", icon: <MapPin className="w-5 h-5" strokeWidth={1} /> }
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
    // Validación por tipo de slide
    const currentSlideData = slides[currentSlide];
    
    if (currentSlideData.type === "form" && currentSlideData.id === 5) {
      // Validación para Tipo de Cliente
      if (!formData.clientType) {
        return; // No avanza si no hay tipo de cliente seleccionado
      }
    }
    
    if (currentSlideData.type === "form" && currentSlideData.id === 6) {
      // Validación para Ubicación (ahora es slide 6)
      if (!formData.zone || (formData.zone === "otros" && !customZone.trim())) {
        return; // No avanza si no hay zona seleccionada o zona personalizada vacía
      }
    }
    
    if (currentSlideData.type === "form" && currentSlideData.id === 7) {
      // Validación para Consumo (ahora es slide 7)
      const minimum = frequency === "dia" ? 10 : getMinimumConsumption();
      if (!formData.weeklyConsumption || formData.weeklyConsumption < minimum) {
        return; // No avanza si no hay consumo o es menor al mínimo requerido
      }
    }
    
    if (currentSlideData.type === "contact") {
      // Validación para Datos de Contacto
      if (!formData.name.trim() || !formData.phone.trim() || formData.phone.length < 10) {
        return; // No avanza si nombre o teléfono están vacíos o teléfono muy corto
      }
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.clientType && formData.weeklyConsumption && formData.zone) {
      setIsSubmitted(true);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getWhatsAppMessage = () => {
    const clientTypeLabel = clientTypes.find(t => t.value === formData.clientType)?.label || formData.clientType;
    const zoneLabel = formData.zone === "otros" && customZone ? customZone : zones.find(z => z.value === formData.zone)?.label || formData.zone;
    
    // Cálculo de impacto para frecuencia diaria
    let consumoText = "";
    if (frequency === "dia" && formData.weeklyConsumption) {
      const consumoDiario = formData.weeklyConsumption;
      const consumoSemanal = consumoDiario * 6; // Lunes a sábado
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

  // Función para determinar el mínimo dinámico basado en la zona
  const getMinimumConsumption = () => {
    // Zonas Locales: La Mesa, Centro, Río
    const localZones: ZoneType[] = ["mesa", "centro", "rio"];
    // Zonas Extendidas: Playas, Otay, Otra zona
    const extendedZones: ZoneType[] = ["playas", "otay", "otros"];
    
    if (formData.zone && localZones.includes(formData.zone)) {
      return 15; // Mínimo para zonas locales
    } else if (formData.zone && extendedZones.includes(formData.zone)) {
      return 25; // Mínimo para zonas extendidas
    }
    
    return 15; // Valor por defecto si no hay zona seleccionada
  };

  // Función para obtener el mensaje de advertencia dinámico
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

  // Función para determinar si el botón "Siguiente" debe estar habilitado
  const isNextButtonEnabled = () => {
    const currentSlideData = slides[currentSlide];
    
    if (currentSlideData.type === "form" && currentSlideData.id === 5) {
      return !!formData.clientType; // Habilitado si hay tipo de cliente seleccionado
    }
    
    if (currentSlideData.type === "form" && currentSlideData.id === 6) {
      // Validación para Ubicación (ahora es slide 6)
      if (!formData.zone) return false;
      if (formData.zone === "otros") {
        return !!customZone.trim(); // Habilitado si hay zona personalizada
      }
      return true; // Habilitado si hay zona seleccionada (no "otros")
    }
    
    if (currentSlideData.type === "form" && currentSlideData.id === 7) {
      // Validación para Consumo (ahora es slide 7)
      const minimum = frequency === "dia" ? 10 : getMinimumConsumption();
      return !!formData.weeklyConsumption && formData.weeklyConsumption >= minimum; // Habilitado si hay consumo ≥ mínimo dinámico
    }
    
    if (currentSlideData.type === "contact") {
      return !!formData.name.trim() && !!formData.phone.trim() && formData.phone.length >= 10; // Habilitado si nombre y teléfono válidos
    }
    
    // Para otros slides (hero, benefit, summary) siempre habilitado
    return true;
  };

  // Función para determinar el color del botón "Siguiente"
  const getNextButtonColor = () => {
    const isEnabled = isNextButtonEnabled();
    return isEnabled ? "bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20" : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20";
  };

  useEffect(() => {
    if (slides[currentSlide].type === "form" && !isSubmitted) {
      setIsSubmitted(false);
    }
  }, [currentSlide, isSubmitted]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-100 font-sans overflow-hidden">
      {/* Contenedor principal adaptativo */}
      <div className="w-full h-full sm:w-[450px] sm:h-[850px] flex flex-col justify-between bg-gradient-to-b from-white/90 via-white/80 to-white/70 backdrop-blur-3xl rounded-none sm:rounded-[40px] shadow-none sm:shadow-2xl sm:shadow-gray-400/20 overflow-hidden">
        {/* Header - Marca a la izquierda */}
        <div className="px-8 py-6 sm:px-10 sm:py-8 border-b border-gray-200/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shadow-sm">
              <Droplets className="w-5 h-5 sm:w-7 sm:h-7 text-blue-600" strokeWidth={1} />
            </div>
            <div className="text-left">
              <h1 className="text-lg sm:text-xl font-bold text-blue-900">BIOSANA</h1>
              <p className="text-xs text-slate-500">AGUA PURIFICADA PREMIUM</p>
            </div>
          </div>
        </div>

        {/* Contenido central - Scroll natural */}
        <div className="flex-1 overflow-y-auto">
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
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              className="px-8 py-10 sm:px-10 sm:py-12"
            >
              {slides[currentSlide].type === "hero" && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-12 bg-transparent">
                  {/* Emoji Hero - Animación de flotación suave */}
                  <div className="relative">
                    <div className="text-8xl sm:text-9xl animate-[float_3s_ease-in-out_infinite]">
                      💧
                    </div>
                    <style jsx>{`
                      @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-12px); }
                      }
                    `}</style>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-blue-900 mb-2 leading-tight">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-500 leading-relaxed">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                </div>
              )}

              {slides[currentSlide].type === "benefit" && slides[currentSlide].id === 2 && (
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-center space-y-8">
                    <div className="flex justify-center">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shadow-sm">
                        {slides[currentSlide].icon}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 leading-tight">
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-lg sm:text-xl text-slate-500 leading-relaxed">
                        {slides[currentSlide].description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {slides[currentSlide].type === "benefit" && slides[currentSlide].id === 4 && (
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-center space-y-8">
                    <div className="flex justify-center">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shadow-sm">
                        {slides[currentSlide].icon}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 leading-tight">
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-lg sm:text-xl text-slate-500 leading-relaxed">
                        {slides[currentSlide].description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {slides[currentSlide].type === "form" && slides[currentSlide].id === 5 && (
                <div className="h-full flex flex-col space-y-14">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-500">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-xs font-semibold text-slate-500 tracking-widest uppercase">
                      Tipo de cliente
                    </h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {clientTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleInputChange("clientType", type.value)}
                          className={`flex flex-col items-center p-6 rounded-3xl transition-all duration-300 min-w-[110px] ${
                            formData.clientType === type.value
                              ? "bg-gradient-to-br from-blue-600 to-blue-500 border-2 border-blue-600 shadow-lg shadow-blue-600/20"
                              : "bg-white/80 border border-gray-200 hover:border-gray-300 shadow-sm"
                          }`}
                        >
                          <div className={`mb-3 p-4 rounded-full ${
                            formData.clientType === type.value
                              ? "bg-white"
                              : "bg-gray-50"
                          }`}>
                            {type.icon}
                          </div>
                          <span className={`text-sm font-medium ${
                            formData.clientType === type.value
                              ? "text-white"
                              : "text-gray-700"
                          }`}>
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {slides[currentSlide].type === "form" && slides[currentSlide].id === 6 && (
                <div className="h-full flex flex-col space-y-14">
                  <div className="text-center space-y-4">
                    <h2 className="text-4xl font-extrabold text-blue-900">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-gray-600 text-lg">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
                      Zona en Tijuana
                    </h3>
                    <div className="flex flex-wrap gap-3 justify-center">
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
                          className={`px-6 py-4 rounded-full transition-all duration-300 flex items-center gap-3 ${
                            formData.zone === zone.value
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {zone.icon}
                          <span className="font-medium">
                            {zone.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    
                    {formData.zone === "otros" && (
                      <div className="mt-6 space-y-4">
                        <label className="text-sm font-medium text-gray-700">
                          Escribe tu colonia o zona específica
                        </label>
                        <input
                          type="text"
                          value={customZone}
                          onChange={(e) => setCustomZone(e.target.value)}
                          className="w-full p-4 text-lg border-2 border-gray-300 rounded-3xl bg-white/50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                          placeholder="Ej: Colonia Libertad, Zona Río, etc."
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {slides[currentSlide].type === "benefit" && slides[currentSlide].id === 3 && (
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-center space-y-8">
                    {/* Icono central - Cambiado a filtro de agua */}
                    <div className="text-7xl">💧</div>
                    
                    {/* Título principal */}
                    <div className="space-y-2">
                      <h2 className="text-3xl font-extrabold text-blue-900 leading-tight">
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {slides[currentSlide].description}
                      </p>
                    </div>
                    
                    {/* Cuadrícula de 4 etapas - Diseño mejorado */}
                    <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 shadow-sm">
                        <div className="text-3xl">🔬</div>
                        <h4 className="font-semibold text-blue-900 text-sm text-center">Microfiltración</h4>
                        <p className="text-xs text-blue-600 text-center">Sedimentos</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 shadow-sm">
                        <div className="text-3xl">🌫️</div>
                        <h4 className="font-semibold text-blue-900 text-sm text-center">Carbón activado</h4>
                        <p className="text-xs text-blue-600 text-center">Granular</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 shadow-sm">
                        <div className="text-3xl">💡</div>
                        <h4 className="font-semibold text-blue-900 text-sm text-center">Luz UV</h4>
                        <p className="text-xs text-blue-600 text-center">Esterilización</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 flex flex-col items-center justify-center space-y-2 shadow-sm">
                        <div className="text-3xl">🌊</div>
                        <h4 className="font-semibold text-blue-900 text-sm text-center">Ozonización</h4>
                        <p className="text-xs text-blue-600 text-center">Pulido final</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {slides[currentSlide].type === "form" && slides[currentSlide].id === 7 && (
                <div className="h-full flex flex-col space-y-14">
                  <div className="text-center space-y-4">
                    <h2 className="text-4xl font-extrabold text-blue-900">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-gray-600 text-lg">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
                      Volumen corporativo
                    </h3>
                    
                    {/* Selector de Frecuencia */}
                    <div className="flex justify-center">
                      <div className="inline-flex rounded-full bg-gray-100 p-1">
                        <button
                          type="button"
                          onClick={() => setFrequency("semana")}
                          className={`px-6 py-2 rounded-full transition-all duration-300 ${
                            frequency === "semana"
                              ? "bg-blue-600 text-white shadow-md"
                              : "text-gray-700 hover:text-gray-900"
                          }`}
                        >
                          Por Semana
                        </button>
                        <button
                          type="button"
                          onClick={() => setFrequency("dia")}
                          className={`px-6 py-2 rounded-full transition-all duration-300 ${
                            frequency === "dia"
                              ? "bg-blue-600 text-white shadow-md"
                              : "text-gray-700 hover:text-gray-900"
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
                        className="w-full max-w-[220px] p-5 text-3xl text-center border-2 border-gray-300 rounded-3xl bg-white/50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        placeholder={frequency === "dia" ? "10" : getMinimumConsumption().toString()}
                      />
                      <p className="text-sm text-gray-500">
                        Garrafones por {frequency === "dia" ? "día" : "semana"} (mínimo {frequency === "dia" ? 10 : getMinimumConsumption()})
                      </p>
                      
                      {/* Opciones de cantidad rápidas - actualizadas dinámicamente */}
                      <div className="flex flex-wrap gap-3 justify-center mt-4">
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
                                className={`px-5 py-3 rounded-full transition-all duration-300 ${
                                  isSelected
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                <span className="font-medium">{range}</span>
                              </button>
                            );
                          });
                        })()}
                      </div>
                      
                      {/* Aviso de pedido mínimo dinámico */}
                      <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500 italic">
                          {frequency === "dia" 
                            ? "Suministro mínimo diario: 10 garrafones (recurrencia justifica el viaje)" 
                            : getZoneWarningMessage()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {slides[currentSlide].type === "contact" && (
                <div className="h-full flex flex-col space-y-14">
                  <div className="text-center space-y-4">
                    <h2 className="text-4xl font-extrabold text-blue-900">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-gray-600 text-lg">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-gray-700">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full p-5 text-lg border-2 border-gray-300 rounded-3xl bg-white/50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        placeholder="Tu nombre"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <label className="text-sm font-medium text-gray-700">
                        Número de teléfono
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full p-5 text-lg border-2 border-gray-300 rounded-3xl bg-white/50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        placeholder="664 123 4567"
                      />
                    </div>
                  </div>
                </div>
              )}

              {slides[currentSlide].type === "summary" && (
                <div className="h-full flex flex-col space-y-14">
                  <div className="text-center space-y-4">
                    <h2 className="text-4xl font-extrabold text-blue-900">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-gray-600 text-lg">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="bg-gray-50/50 rounded-3xl p-8 space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Resumen de tu cotización
                      </h3>
                      
                      <div className="space-y-4">
                        {formData.name && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Nombre:</span>
                            <span className="font-medium text-gray-900">{formData.name}</span>
                          </div>
                        )}
                        
                        {formData.phone && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Teléfono:</span>
                            <span className="font-medium text-gray-900">{formData.phone}</span>
                          </div>
                        )}
                        
                        {formData.clientType && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Tipo de cliente:</span>
                            <span className="font-medium text-gray-900">
                              {clientTypes.find(t => t.value === formData.clientType)?.label}
                            </span>
                          </div>
                        )}
                        
                        {formData.weeklyConsumption && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Consumo semanal:</span>
                            <span className="font-medium text-gray-900">{formData.weeklyConsumption} garrafones</span>
                          </div>
                        )}
                        
                        {formData.zone && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Zona en Tijuana:</span>
                            <span className="font-medium text-gray-900">
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
                      className="w-full py-5 bg-green-600 text-white font-bold rounded-3xl hover:bg-green-700 transition-all shadow-xl shadow-green-600/30 text-lg flex items-center justify-center gap-3"
                    >
                      <MessageCircle className="w-6 h-6" strokeWidth={1} />
                      Enviar por WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Botones de navegación - Parte inferior fija */}
        <div className="flex-shrink-0 py-6 px-8 border-t border-gray-200/30">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 text-gray-600 font-medium rounded-full border-2 border-gray-300 hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1} />
            </button>
            
            <div className="text-sm text-slate-400">
              Desliza para navegar
            </div>
            
            <button
              onClick={handleNext}
              disabled={currentSlide === slides.length - 1 || !isNextButtonEnabled()}
              className={`px-6 py-2.5 text-white font-medium rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-md ${getNextButtonColor()}`}
            >
              <ArrowRight className="w-5 h-5" strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
