import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, MapPin, Bell, Home, Map, Info, X, ChevronRight, Phone, Cloud, Droplets, Navigation } from 'lucide-react';

// Zonas de la ciudad
const ZONAS = [
  { 
    id: 1, 
    nombre: 'Barrio de Francia', 
    riesgo: 'bajo',
    tipo: 'Deslizamiento',
    distancia: '2.3 km',
    mensaje: 'Todo tranquilo',
    detalle: 'Sin movimientos detectados',
    recomendacion: 'Puedes circular con normalidad por esta zona.'
  },
  { 
    id: 2, 
    nombre: 'Arroyo Xoloco', 
    riesgo: 'medio',
    tipo: 'Inundación',
    distancia: '1.8 km',
    mensaje: 'Agua creciendo',
    detalle: 'Nivel 65% - Monitoreo activo',
    recomendacion: 'Evita cruzar el arroyo. Usa rutas alternas si es posible.'
  },
  { 
    id: 3, 
    nombre: 'Col. El Paraíso', 
    riesgo: 'bajo',
    tipo: 'Deslizamiento',
    distancia: '3.1 km',
    mensaje: 'Todo tranquilo',
    detalle: 'Sin movimientos detectados',
    recomendacion: 'Puedes circular con normalidad por esta zona.'
  },
  { 
    id: 4, 
    nombre: 'Río Clavijero', 
    riesgo: 'alto',
    tipo: 'Inundación',
    distancia: '0.9 km',
    mensaje: '¡PELIGRO EXTREMO!',
    detalle: 'Nivel 92% - Desborde inminente',
    recomendacion: 'NO te acerques. Busca rutas alejadas de esta zona.'
  },
  { 
    id: 5, 
    nombre: 'Loma Bonita', 
    riesgo: 'bajo',
    tipo: 'Deslizamiento',
    distancia: '4.2 km',
    mensaje: 'Todo tranquilo',
    detalle: 'Sin movimientos detectados',
    recomendacion: 'Puedes circular con normalidad por esta zona.'
  },
];

const NOTICIAS = [
  { 
    id: 1, 
    titulo: '¡Alerta Crítica!',
    descripcion: 'Río Clavijero en nivel peligroso',
    hora: 'Hace 15 min',
    nivel: 'alto',
    icono: '🚨'
  },
  { 
    id: 2, 
    titulo: 'Precaución',
    descripcion: 'Arroyo Xoloco con nivel elevado',
    hora: 'Hace 45 min',
    nivel: 'medio',
    icono: '⚠️'
  },
  { 
    id: 3, 
    titulo: 'Información',
    descripcion: 'Lluvia moderada prevista para hoy',
    hora: 'Hace 2 horas',
    nivel: 'info',
    icono: '🌧️'
  },
];

const CONSEJOS = [
  { icono: '🚗', texto: 'No cruces zonas inundadas, aunque parezcan poco profundas' },
  { icono: '📱', texto: 'Mantén tu celular cargado en caso de emergencia' },
  { icono: '👥', texto: 'Avisa a familiares si vas a zonas de riesgo' },
  { icono: '🏃', texto: 'Aléjate de laderas con grietas o movimiento' },
];

// Componente de tarjeta de zona mejorado
const TarjetaZona = ({ zona, onClick }) => {
  const estilos = {
    bajo: { 
      gradient: 'from-green-400 to-green-500',
      bg: 'bg-white',
      border: 'border-green-200',
      shadow: 'shadow-green-100'
    },
    medio: { 
      gradient: 'from-yellow-400 to-yellow-500',
      bg: 'bg-white',
      border: 'border-yellow-200',
      shadow: 'shadow-yellow-100'
    },
    alto: { 
      gradient: 'from-red-500 to-red-600',
      bg: 'bg-white',
      border: 'border-red-200',
      shadow: 'shadow-red-100'
    }
  };

  const estilo = estilos[zona.riesgo];

  return (
    <div
      onClick={() => onClick(zona)}
      className={`${estilo.bg} rounded-2xl border-2 ${estilo.border} shadow-lg ${estilo.shadow} overflow-hidden active:scale-98 transition-all`}
    >
      <div className={`bg-gradient-to-r ${estilo.gradient} p-4 ${zona.riesgo === 'alto' ? 'animate-pulse' : ''}`}>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            {zona.riesgo === 'bajo' ? 
              <CheckCircle className="w-6 h-6" /> : 
              <AlertTriangle className="w-6 h-6" />
            }
            <div>
              <h3 className="font-bold text-lg">{zona.nombre}</h3>
              <p className="text-xs opacity-90">{zona.distancia} de ti</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-800">{zona.mensaje}</p>
            <p className="text-xs text-gray-600 mt-1">{zona.detalle}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            zona.riesgo === 'alto' ? 'bg-red-100 text-red-700' :
            zona.riesgo === 'medio' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {zona.tipo}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const App = () => {
  const [vistaActual, setVistaActual] = useState('inicio');
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const alertasActivas = ZONAS.filter(z => z.riesgo !== 'bajo').length;
  const hayPeligro = ZONAS.some(z => z.riesgo === 'alto');

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col max-w-md mx-auto">
      
      {/* Header mejorado */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-4 pt-4 pb-6 shadow-2xl rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <Bell className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Alerta Ciudadana</h1>
              <p className="text-xs text-blue-100">Teziutlán · {hora.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>

          {alertasActivas > 0 && (
            <div className="bg-red-500 w-10 h-10 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <span className="text-lg font-bold">{alertasActivas}</span>
            </div>
          )}
        </div>

        {/* Clima mini */}
        <div className="flex items-center gap-4 bg-white bg-opacity-20 rounded-xl p-3 backdrop-blur-sm">
          <Cloud className="w-8 h-8" />
          <div className="flex-1">
            <p className="text-sm font-semibold">Clima actual</p>
            <p className="text-xs text-blue-100">Nublado · 18°C · Humedad 75%</p>
          </div>
          <Droplets className="w-6 h-6" />
        </div>

        {/* Alerta destacada */}
        {hayPeligro && (
          <div className="bg-red-500 mt-3 p-3 rounded-xl flex items-center gap-3 shadow-lg animate-pulse">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold">¡Zona de peligro detectada!</p>
              <p className="text-xs text-red-100">Evita Río Clavijero</p>
            </div>
          </div>
        )}
      </header>

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Vista Inicio */}
        {vistaActual === 'inicio' && (
          <div className="p-4 space-y-4 pb-24">
            
            {/* Resumen visual mejorado */}
            <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                Estado de zonas cercanas
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-1">{ZONAS.filter(z => z.riesgo === 'bajo').length}</div>
                  <div className="text-xs text-gray-600 font-medium">Seguras</div>
                  <CheckCircle className="w-4 h-4 text-green-600 mx-auto mt-2" />
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl border border-yellow-200">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">{ZONAS.filter(z => z.riesgo === 'medio').length}</div>
                  <div className="text-xs text-gray-600 font-medium">Precaución</div>
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mx-auto mt-2" />
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200">
                  <div className="text-3xl font-bold text-red-600 mb-1">{ZONAS.filter(z => z.riesgo === 'alto').length}</div>
                  <div className="text-xs text-gray-600 font-medium">Peligro</div>
                  <AlertTriangle className="w-4 h-4 text-red-600 mx-auto mt-2" />
                </div>
              </div>
            </div>

            {/* Lista de zonas mejorada */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-800 px-1 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Todas las zonas
              </h3>
              {ZONAS.map(zona => (
                <TarjetaZona key={zona.id} zona={zona} onClick={setZonaSeleccionada} />
              ))}
            </div>

            {/* Consejos de seguridad */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-6 h-6" />
                <h3 className="font-bold text-lg">Consejos de seguridad</h3>
              </div>
              <div className="space-y-2">
                {CONSEJOS.map((consejo, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white bg-opacity-20 rounded-xl p-3 backdrop-blur-sm">
                    <span className="text-2xl">{consejo.icono}</span>
                    <p className="text-sm flex-1">{consejo.texto}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón de emergencia destacado */}
            <a 
              href="tel:911" 
              className="block w-full bg-gradient-to-r from-red-500 to-red-600 text-white text-center font-bold py-5 rounded-3xl active:scale-98 transition shadow-xl"
            >
              <Phone className="w-6 h-6 inline-block mr-2" />
              Emergencias 911
            </a>
          </div>
        )}

        {/* Vista Mapa mejorada */}
        {vistaActual === 'mapa' && (
          <div className="p-4 pb-24 space-y-4">
            <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-600" />
                Mapa interactivo
              </h3>
              
              {/* Mapa mejorado */}
              <div className="relative h-96 bg-gradient-to-br from-green-200 via-blue-200 to-green-100 rounded-2xl overflow-hidden shadow-inner border border-gray-200">
                {/* Elementos decorativos del mapa */}
                <div className="absolute inset-0">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-green-300 opacity-30 rounded-full blur-xl"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300 opacity-30 rounded-full blur-xl"></div>
                </div>

                {ZONAS.map((zona, idx) => {
                  const colores = {
                    bajo: 'bg-gradient-to-br from-green-400 to-green-500',
                    medio: 'bg-gradient-to-br from-yellow-400 to-yellow-500',
                    alto: 'bg-gradient-to-br from-red-500 to-red-600'
                  };
                  
                  const posiciones = [
                    'top-[20%] left-[25%]',
                    'top-[50%] left-[30%]',
                    'bottom-[25%] right-[25%]',
                    'top-[50%] right-[30%]',
                    'bottom-[30%] left-[50%]'
                  ];
                  
                  return (
                    <div
                      key={zona.id}
                      onClick={() => setZonaSeleccionada(zona)}
                      className={`absolute ${posiciones[idx]} active:scale-110 transition-transform cursor-pointer`}
                    >
                      <div className={`${colores[zona.riesgo]} p-3 rounded-full shadow-2xl ${zona.riesgo === 'alto' ? 'animate-pulse' : ''} border-2 border-white`}>
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-lg text-xs font-bold whitespace-nowrap">
                        {zona.nombre.split(' ')[0]}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Leyenda mejorada */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="flex items-center gap-2 bg-green-50 p-2 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium">Seguro</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 p-2 rounded-lg">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs font-medium">Cuidado</span>
                </div>
                <div className="flex items-center gap-2 bg-red-50 p-2 rounded-lg">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs font-medium">Peligro</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vista Notificaciones mejorada */}
        {vistaActual === 'notificaciones' && (
          <div className="p-4 space-y-3 pb-24">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Notificaciones recientes
            </h3>
            {NOTICIAS.map(noticia => {
              const estilos = {
                alto: 'from-red-500 to-red-600 border-red-300',
                medio: 'from-yellow-500 to-yellow-600 border-yellow-300',
                info: 'from-blue-500 to-blue-600 border-blue-300'
              };
              
              return (
                <div key={noticia.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className={`bg-gradient-to-r ${estilos[noticia.nivel]} p-4 text-white`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{noticia.icono}</span>
                        <h4 className="font-bold">{noticia.titulo}</h4>
                      </div>
                      <span className="text-xs opacity-90">{noticia.hora}</span>
                    </div>
                    <p className="text-sm opacity-95">{noticia.descripcion}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Barra de navegación mejorada */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl max-w-md mx-auto rounded-t-3xl">
        <div className="flex justify-around py-3 px-2">
          <button
            onClick={() => setVistaActual('inicio')}
            className={`flex flex-col items-center py-2 px-6 rounded-2xl transition-all ${
              vistaActual === 'inicio' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'text-gray-400'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Inicio</span>
          </button>
          
          <button
            onClick={() => setVistaActual('mapa')}
            className={`flex flex-col items-center py-2 px-6 rounded-2xl transition-all ${
              vistaActual === 'mapa' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'text-gray-400'
            }`}
          >
            <Map className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Mapa</span>
          </button>

          <button
            onClick={() => setVistaActual('notificaciones')}
            className={`flex flex-col items-center py-2 px-6 rounded-2xl transition-all relative ${
              vistaActual === 'notificaciones' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'text-gray-400'
            }`}
          >
            <Bell className="w-6 h-6" />
            {alertasActivas > 0 && (
              <div className="absolute top-1 right-3 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold animate-pulse">
                {alertasActivas}
              </div>
            )}
            <span className="text-xs mt-1 font-medium">Alertas</span>
          </button>
        </div>
      </nav>

      {/* Modal mejorado */}
      {zonaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-end z-50 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-t-3xl w-full max-h-[85vh] overflow-auto animate-slideUp"
            style={{ maxWidth: '28rem', margin: '0 auto' }}
          >
            <div className="sticky top-0 bg-white pt-3 pb-2 px-6 border-b border-gray-100">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3"></div>
            </div>
            
            <div className="p-6">
              <div className={`bg-gradient-to-r ${
                zonaSeleccionada.riesgo === 'alto' ? 'from-red-500 to-red-600' :
                zonaSeleccionada.riesgo === 'medio' ? 'from-yellow-500 to-yellow-600' :
                'from-green-500 to-green-600'
              } p-5 rounded-3xl mb-5 text-white shadow-xl`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-8 h-8" />
                    <div>
                      <h3 className="text-2xl font-bold">{zonaSeleccionada.nombre}</h3>
                      <p className="text-sm opacity-90">{zonaSeleccionada.distancia} de tu ubicación</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setZonaSeleccionada(null)} 
                    className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full active:scale-95 transition backdrop-blur-sm"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
                  <p className="font-bold text-xl mb-1">
                    {zonaSeleccionada.riesgo === 'alto' ? '🚨 PELIGRO EXTREMO' :
                     zonaSeleccionada.riesgo === 'medio' ? '⚠️ PRECAUCIÓN NECESARIA' :
                     '✅ ZONA SEGURA'}
                  </p>
                  <p className="text-sm opacity-95">{zonaSeleccionada.mensaje}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1 font-medium">Estado actual</p>
                  <p className="font-bold text-gray-800 text-lg">{zonaSeleccionada.detalle}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1 font-medium">Tipo de riesgo</p>
                  <p className="font-bold text-gray-800 text-lg">{zonaSeleccionada.tipo}</p>
                </div>

                <div className="bg-blue-50 p-5 rounded-2xl border-2 border-blue-200">
                  <p className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Recomendación
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{zonaSeleccionada.recomendacion}</p>
                </div>
              </div>

              <button 
                onClick={() => setZonaSeleccionada(null)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 rounded-2xl active:scale-98 transition shadow-lg mt-5"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .active\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default App;