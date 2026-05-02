import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, ZoomControl, Tooltip, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Navigation, 
  Activity,
  ChevronRight,
  Clock,
  Car,
  Target,
  Maximize2,
  Shield,
  TrendingUp,
  Map as MapIcon,
  Download,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import confetti from 'canvas-confetti';

// --- CONFIGURATION ---
const PUNE_CENTER = [18.5204, 73.8567];
const HIGH_DETAIL_MAP = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

// Custom Marker Icons
const createDivIcon = (color, emoji) => L.divIcon({
  className: 'custom-marker-wrapper',
  html: `<div class="main-marker" style="background: ${color}; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.2); font-size: 12px;">${emoji}</div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const blueDotIcon = L.divIcon({
  className: 'radar-marker',
  html: `<div style="background: #3b82f6; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px #3b82f6;"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

const pickupIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="background: #2563eb; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});
const dropIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="background: #ef4444; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

// Helper: Map Glide
const MapController = ({ focusPoint, routeBounds }) => {
  const map = useMap();
  useEffect(() => {
    if (focusPoint) map.flyTo([focusPoint.lat, focusPoint.lng], 16, { animate: true, duration: 1.5 });
  }, [focusPoint, map]);
  useEffect(() => {
    if (routeBounds) map.fitBounds(routeBounds, { padding: [80, 80], animate: true });
  }, [routeBounds, map]);
  return null;
};

// --- RADAR OVERLAY (REIMAGINED) ---
const ScanningRadar = () => {
  const [status, setStatus] = useState("Initializing Engine...");
  
  useEffect(() => {
    const phases = [
      "Locating nearby drivers...",
      "Optimizing Dijkstra path nodes...",
      "Syncing with Pune Hubs...",
      "Verifying driver availability...",
      "Finalizing trip dispatch..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setStatus(phases[i % phases.length]);
      i++;
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-[2000] flex items-center justify-center overflow-hidden pointer-events-none">
      {/* High-Tech Dark Glass Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-2xl"
      ></motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="relative flex flex-col items-center"
      >
        {/* Advanced Neural Radar Container */}
        <div className="relative w-[600px] h-[600px] flex items-center justify-center">
          {/* Concentric Pulse Rings */}
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className="absolute inset-0 border border-primary/20 rounded-full animate-pulse-ring" 
              style={{ animationDelay: `${i * 0.6}s` }}
            ></div>
          ))}

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'radial-gradient(circle, var(--primary) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }}></div>
          
          {/* High-Visibility Radar Sweeps */}
          <div className="radar-sweep !opacity-30 !bg-[conic-gradient(from_0deg,transparent_60%,var(--primary))]"></div>
          <div className="radar-sweep !opacity-10 !bg-[conic-gradient(from_0deg,transparent_80%,#fff)] animate-sweep-slow"></div>
          
          {/* Mock Driver Nodes (Pulsing Dots) */}
          {[
            { t: '15%', l: '30%', d: '0s' },
            { t: '45%', l: '10%', d: '1.2s' },
            { t: '70%', l: '25%', d: '0.5s' },
            { t: '20%', l: '75%', d: '2.1s' },
            { t: '60%', l: '85%', d: '0.8s' },
            { t: '80%', l: '60%', d: '1.5s' },
          ].map((node, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: idx * 0.4 }}
              className="absolute w-3 h-3 bg-primary rounded-full blur-[2px]"
              style={{ top: node.t, left: node.l }}
            >
              <div className="absolute inset-0 bg-primary rounded-full animate-ping"></div>
            </motion.div>
          ))}

          {/* Central Status Hub */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative mb-8">
              {/* Spinner Ring */}
              <div className="w-32 h-32 rounded-full border-[6px] border-white/5 border-t-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Car size={40} className="text-white animate-pulse" />
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary/30 blur-[40px] rounded-full -z-10 animate-pulse-soft"></div>
            </div>

            <div className="text-center space-y-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-primary tracking-[0.5em] uppercase mb-1">AI Dispatcher</span>
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-tight">
                  Finding <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Your Ride</span>
                </h2>
              </div>
              
              <div className="h-8 flex items-center justify-center">
                <div className="bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">{status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- UNIFIED PUNE DRIVER FLEET (GOOGLE MAPS PRECISION CENTERS) ---
const PUNE_DRIVERS = [
  { id: 1, name: "Arjun Singh", car: "Tata Nexon", plate: "MH 12 AB 4452", rating: 4.9, lat: 18.5913, lng: 73.7389 }, // Hinjewadi
  { id: 2, name: "Priya Sharma", car: "Maruti Swift", plate: "MH 14 CC 8910", rating: 4.8, lat: 18.5308, lng: 73.8475 }, // Shivajinagar
  { id: 3, name: "Rahul Verma", car: "Honda City", plate: "MH 12 XY 1234", rating: 4.7, lat: 18.5362, lng: 73.8940 }, // Koregaon Park
  { id: 4, name: "Suresh Mane", car: "Tata Tiago", plate: "MH 12 SM 2020", rating: 3.5, lat: 18.5018, lng: 73.8636 }, // Swargate
  { id: 5, name: "Vikram Patil", car: "Maruti Dzire", plate: "MH 14 VP 5566", rating: 4.5, lat: 18.5793, lng: 73.9089 }, // Airport
  { id: 6, name: "Nitin Shinde", car: "Honda Amaze", plate: "MH 12 NS 4040", rating: 4.8, lat: 18.4575, lng: 73.8677 }, // Katraj
  { id: 7, name: "Sagar Patil", car: "Maruti Swift", plate: "MH 14 SP 5050", rating: 4.2, lat: 18.4820, lng: 73.8942 }, // Kondhwa
  { id: 8, name: "Amol More", car: "Tata Tiago", plate: "MH 12 AM 6060", rating: 4.6, lat: 18.4891, lng: 73.8034 }, // Warje
  { id: 9, name: "Kiran Rao", car: "Hyundai Creta", plate: "MH 12 KR 7070", rating: 4.9, lat: 18.6420, lng: 73.7550 }, // Ravet
  { id: 10, name: "Aditi Deshpande", car: "Maruti Swift", plate: "MH 14 AD 8080", rating: 4.7, lat: 18.5590, lng: 73.7780 }, // Baner
  { id: 11, name: "Sameer Kulkarni", car: "Honda City", plate: "MH 12 SK 9090", rating: 4.8, lat: 18.5670, lng: 73.9140 }, // Viman Nagar
  { id: 12, name: "Megha Joshi", car: "Tata Nexon", plate: "MH 14 MJ 1111", rating: 4.5, lat: 18.5200, lng: 73.9250 }, // Magarpatta
  { id: 13, name: "Rohit Pawar", car: "Hyundai i20", plate: "MH 12 RP 2222", rating: 4.6, lat: 18.5070, lng: 73.8070 }, // Kothrud
  { id: 14, name: "Sneha Gite", car: "Maruti Dzire", plate: "MH 14 SG 3333", rating: 4.4, lat: 18.5580, lng: 73.8070 }, // Aundh
  { id: 15, name: "Prasad Bhide", car: "Tata Altroz", plate: "MH 12 PB 4444", rating: 4.7, lat: 18.5020, lng: 73.9300 }, // Hadapsar
  { id: 16, name: "Vivek Taware", car: "Honda Amaze", plate: "MH 14 VT 5555", rating: 4.3, lat: 18.4480, lng: 73.8240 }, // Dhayari
  { id: 17, name: "Manoj Kadam", car: "Hyundai Creta", plate: "MH 12 MK 6666", rating: 4.8, lat: 18.5417, lng: 73.7931 }, // Pashan
  { id: 18, name: "Deepak Shinde", car: "Maruti Ertiga", plate: "MH 14 DS 7777", rating: 4.6, lat: 18.5085, lng: 73.7744 }, // Bavdhan
  { id: 19, name: "Anil Gadgil", car: "Honda City", plate: "MH 12 AG 8888", rating: 4.9, lat: 18.5089, lng: 73.8340 }, // Erandwane
  { id: 20, name: "Sunil Mankar", car: "Tata Tiago", plate: "MH 14 SM 9999", rating: 4.2, lat: 18.5670, lng: 73.8770 }, // Vishrantwadi
  { id: 21, name: "Yogesh Dhone", car: "Maruti Swift", plate: "MH 12 YD 1010", rating: 4.5, lat: 18.5910, lng: 73.9000 }, // Dhanori
  { id: 22, name: "Ramesh Thorat", car: "Hyundai i10", plate: "MH 14 RT 2020", rating: 4.3, lat: 18.5980, lng: 73.7980 }, // Pimple Saudagar
  { id: 23, name: "Sanjay Lad", car: "Tata Nexon", plate: "MH 12 SL 3030", rating: 4.7, lat: 18.5960, lng: 73.7650 }, // Wakad
  { id: 24, name: "Ganesh Kale", car: "Honda Amaze", plate: "MH 14 GK 4040", rating: 4.6, lat: 18.5750, lng: 73.7700 }, // Balewadi
  { id: 25, name: "Vijay Gholap", car: "Maruti Dzire", plate: "MH 12 VG 5050", rating: 4.4, lat: 18.4750, lng: 73.9650 }, // Phursungi
  { id: 26, name: "Prakash Shelke", car: "Hyundai Venue", plate: "MH 14 PS 6060", rating: 4.8, lat: 18.4550, lng: 73.8350 }, // Ambegaon
];

export default function App() {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [trafficSegments, setTrafficSegments] = useState([]);
  const [bookingStep, setBookingStep] = useState("idle"); 
  const [suggestions, setSuggestions] = useState({ type: null, list: [] });
  const [pickupInput, setPickupInput] = useState("");
  const [destInput, setDestInput] = useState("");
  const [rideMetrics, setRideMetrics] = useState(null);
  const [mapFocus, setMapFocus] = useState(null);
  const [routeBounds, setRouteBounds] = useState(null);
  const [assignedDriver, setAssignedDriver] = useState(null);
  const [busyDriverIds, setBusyDriverIds] = useState([]); // Mechanism to track unavailable drivers
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  // Debounce Timer
  const [searchTimer, setSearchTimer] = useState(null);

  const fetchSuggestions = async (query, type) => {
    if (query.length < 3) {
      setSuggestions({ type: null, list: [] });
      return;
    }

    if (searchTimer) clearTimeout(searchTimer);
    setIsLoadingSuggestions(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`https://photon.komoot.io/api/?q=${query}&lat=18.5204&lon=73.8567&limit=10`);
        const data = await res.json();
        const seen = new Set();
        const filtered = data.features.filter(f => {
          const name = f.properties.name || f.properties.street || "";
          if (!name || seen.has(name)) return false;
          seen.add(name);
          return true;
        });
        setSuggestions({ type, list: filtered });
      } catch (e) { console.error(e); }
      finally { setIsLoadingSuggestions(false); }
    }, 400); // 400ms Debounce

    setSearchTimer(timer);
  };

  const findBestDriver = (pLocation) => {
    const availableDrivers = PUNE_DRIVERS.filter(d => !busyDriverIds.includes(d.id));
    if (availableDrivers.length === 0) return PUNE_DRIVERS[0]; // Fallback if all are busy

    const scores = availableDrivers.map(d => {
      const dist = Math.sqrt(Math.pow(d.lat - pLocation.lat, 2) + Math.pow(d.lng - pLocation.lng, 2));
      const score = dist / d.rating;
      return { ...d, score };
    });
    return scores.sort((a, b) => a.score - b.score)[0];
  };

  const [possibleRoutes, setPossibleRoutes] = useState([]);
  const [selectedRouteIdx, setSelectedRouteIdx] = useState(0);

  const calculateIntelligentRoute = async () => {
    if (!pickup || !destination) return;
    setBookingStep("searching");
    
    setTimeout(async () => {
      try {
        // Fetch Alternatives from OSRM
        const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson&alternatives=true`);
        const data = await res.json();
        
        if (data.routes && data.routes.length > 0) {
          const routesData = data.routes.map((route, idx) => {
            const allCoords = route.geometry.coordinates.map(c => [c[1], c[0]]);
            const segments = [];
            for (let i = 0; i < allCoords.length - 1; i += 5) {
              const chunk = allCoords.slice(i, i + 6);
              const rand = Math.random();
              segments.push({
                coords: chunk,
                color: rand > 0.85 ? "#ef4444" : rand > 0.6 ? "#f97316" : "#22c55e"
              });
            }
            return {
              allCoords,
              segments,
              bounds: L.latLngBounds(allCoords),
              distance: (route.distance / 1000).toFixed(1),
              duration: (route.duration / 60).toFixed(0),
              fare: ((route.distance / 1000) * 20).toFixed(0),
              label: idx === 0 ? "OPTIMAL" : idx === 1 ? "BALANCED" : "ALTERNATIVE"
            };
          });

          setPossibleRoutes(routesData);
          setSelectedRouteIdx(0);
          
          const main = routesData[0];
          setTrafficSegments(main.segments);
          
          // Fit all routes in view initially
          const allBounds = L.latLngBounds(routesData[0].allCoords);
          routesData.forEach(rt => allBounds.extend(rt.allCoords));
          setRouteBounds(allBounds);
          setRideMetrics({
            distance: `${main.distance} KM`,
            duration: `${main.duration} MIN`,
            fare: `₹${main.fare}`,
            surge: "FLAT RATE"
          });

          setAssignedDriver(findBestDriver(pickup));
          setBookingStep("ready");
        }
      } catch (e) { console.error(e); setBookingStep("idle"); }
    }, 2500); 
  };

  const handleRouteChange = (idx) => {
    const r = possibleRoutes[idx];
    setSelectedRouteIdx(idx);
    setTrafficSegments(r.segments);
    setRouteBounds(r.bounds);
    setRideMetrics({
      distance: `${r.distance} KM`,
      duration: `${r.duration} MIN`,
      fare: `₹${r.fare}`,
      surge: "FLAT RATE"
    });
  };

  const generateTicket = () => {
    const ticketContent = `
------------------------------------------
          PUNE RIDE OFFICIAL TICKET
------------------------------------------
Booking ID: PR-${Math.floor(Math.random()*90000) + 10000}
Date: ${new Date().toLocaleDateString()}

ROUTE:
Pickup: ${pickupInput}
Destination: ${destInput}

DRIVER:
Name: ${assignedDriver.name}
Vehicle: ${assignedDriver.car} (${assignedDriver.plate})
Rating: ${assignedDriver.rating}⭐

TRIP METRICS:
Total Distance: ${rideMetrics.distance}
Total Fare: ${rideMetrics.fare} (Rs. 20/KM)

------------------------------------------
   SAFE TRAVELS WITH PUNE RIDE ENGINE
------------------------------------------
    `;
    const element = document.createElement("a");
    const file = new Blob([ticketContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Pune_Ride_Ticket.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <LayoutGroup>
      <div className="h-full relative bg-slate-50 overflow-hidden">
        <motion.div layout className="floating-center">
          <div className="brand-section">
            <motion.div layout>
              <h1 className="brand-name flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <Activity className="text-white" size={24} />
                </div>
                PUNE RIDE
              </h1>
              <p className="brand-tagline">SMART MOBILITY ENGINE</p>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {bookingStep === "idle" && (
              <motion.div key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-8">
                <div className="input-group relative">
                  {isLoadingSuggestions && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10">
                      <Loader2 size={18} className="animate-spin text-primary opacity-40" />
                    </div>
                  )}
                  <div className="search-field">
                    <div className="w-2 h-2 bg-primary rounded-full ring-4 ring-primary/10" />
                    <input 
                      placeholder="Pickup point?" 
                      value={pickupInput}
                      onChange={(e) => { setPickupInput(e.target.value); fetchSuggestions(e.target.value, "pickup"); }}
                    />
                  </div>
                  {suggestions.type === "pickup" && (
                    <div className="suggestions-container animate-slide-up">
                      {suggestions.list.map((s, i) => (
                        <div key={i} className="suggestion-item" onClick={() => {
                          const coords = { lat: s.geometry.coordinates[1], lng: s.geometry.coordinates[0], name: s.properties.name };
                          setPickup(coords);
                          setPickupInput(s.properties.name);
                          setSuggestions({ type: null, list: [] });
                          setMapFocus(coords);
                        }}>
                          <MapPin size={16} className="text-primary opacity-40" />
                          <div className="flex-1 overflow-hidden">
                            <div className="text-sm font-bold text-slate-900 truncate">{s.properties.name}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.properties.district || s.properties.city || "Pune"}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="h-[1px] bg-slate-200/50 mx-6" />
                  <div className="search-field">
                    <div className="w-2 h-2 bg-danger rounded-full ring-4 ring-danger/10" />
                    <input 
                      placeholder="Where to?" 
                      value={destInput}
                      onChange={(e) => { setDestInput(e.target.value); fetchSuggestions(e.target.value, "dest"); }}
                    />
                  </div>
                  {suggestions.type === "dest" && (
                    <div className="suggestions-container animate-slide-up">
                      {suggestions.list.map((s, i) => (
                        <div key={i} className="suggestion-item" onClick={() => {
                          const coords = { lat: s.geometry.coordinates[1], lng: s.geometry.coordinates[0], name: s.properties.name };
                          setDestination(coords);
                          setDestInput(s.properties.name);
                          setSuggestions({ type: null, list: [] });
                          setMapFocus(coords);
                        }}>
                          <Navigation size={16} className="text-danger opacity-40" />
                          <div className="flex-1 overflow-hidden">
                            <div className="text-sm font-bold text-slate-900 truncate">{s.properties.name}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.properties.district || s.properties.city || "Pune"}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="btn-primary w-full group" onClick={calculateIntelligentRoute} disabled={!pickup || !destination}>
                  Find Best Driver
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {(bookingStep === "ready" || bookingStep === "searching") && rideMetrics && assignedDriver && (
              <motion.div key="ready" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                
                {/* Route Selection */}
                <div className="animate-slide-up">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Navigation size={14} className="text-primary" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Suggested Routes</span>
                    </div>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {possibleRoutes.map((route, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleRouteChange(idx)}
                        className={`cursor-pointer min-w-[150px] p-5 rounded-[32px] border-2 transition-all flex flex-col justify-between ${selectedRouteIdx === idx ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                      >
                        <div>
                          <div className={`text-[8px] font-black mb-2 px-2 py-1 rounded-full w-fit uppercase tracking-widest ${selectedRouteIdx === idx ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                            {route.label}
                          </div>
                          <div className="text-2xl font-black text-slate-900 mt-1">{route.duration}<span className="text-xs text-slate-400 ml-1">MIN</span></div>
                        </div>
                        <div className="flex items-end justify-between mt-4">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{route.distance} KM</div>
                          <div className="text-lg font-black text-primary">₹{route.fare}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <div className="stat-card !p-2">
                    <div className="flex flex-col items-center">
                      <MapIcon size={16} className="mb-1 text-primary opacity-50" />
                      <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-center leading-none mb-1">Distance</div>
                      <div className="text-[11px] font-black text-slate-900">{rideMetrics.distance}</div>
                    </div>
                  </div>
                  <div className="stat-card !p-2">
                    <div className="flex flex-col items-center">
                      <Clock size={16} className="mb-1 text-warning opacity-50" />
                      <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-center leading-none mb-1">Duration</div>
                      <div className="text-[11px] font-black text-slate-900">{rideMetrics.duration}</div>
                    </div>
                  </div>
                  <div className="stat-card !p-2">
                    <div className="flex flex-col items-center">
                      <TrendingUp size={16} className="mb-1 text-success opacity-50" />
                      <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-center leading-none mb-1 truncate w-full">{rideMetrics.surge}</div>
                      <div className="text-[11px] font-black text-slate-900">{rideMetrics.fare}</div>
                    </div>
                  </div>
                </div>

                <div className="driver-pill animate-slide-up shadow-2xl" style={{ animationDelay: '0.2s' }}>
                  <div className="driver-avatar ring-4 ring-white/10">
                    <Car size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xl tracking-tight">{assignedDriver.name}</div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1 opacity-60">{assignedDriver.car} • {assignedDriver.rating}★</div>
                  </div>
                </div>

                <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <button className="btn-primary flex-1 !py-5" onClick={() => { 
                    setBookingStep("confirmed"); 
                    setBusyDriverIds(prev => [...prev, assignedDriver.id]); // Mark driver as busy
                    confetti(); 
                  }}>Confirm Ride</button>
                  <button className="p-5 bg-slate-100 rounded-[28px] hover:bg-slate-200 transition-colors" onClick={() => { setBookingStep("idle"); setTrafficSegments([]); setAssignedDriver(null); }}>
                    <Maximize2 size={24} className="text-slate-400" />
                  </button>
                </div>
              </motion.div>
            )}

            {bookingStep === "confirmed" && (
              <motion.div key="confirmed" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8 py-4">
                <div className="text-center">
                  <div className="w-20 h-20 bg-success/10 rounded-[30px] flex items-center justify-center mx-auto mb-6 ring-8 ring-success/5 animate-pulse-soft">
                    <Shield size={36} className="text-success" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Ride Confirmed!</h2>
                  <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">Safe travels with Pune Ride</p>
                </div>

                <div className="ticket-container shadow-xl">
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between border-b border-dashed border-slate-200 pb-4">
                      <div className="flex flex-col gap-1">
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Pickup</div>
                        <div className="text-xs font-bold text-slate-900 truncate max-w-[150px]">{pickupInput}</div>
                      </div>
                      <div className="text-right flex flex-col gap-1">
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Drop</div>
                        <div className="text-xs font-bold text-slate-900 truncate max-w-[150px]">{destInput}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                          <Car size={24} className="text-slate-400" />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-sm font-black text-slate-900">{assignedDriver.name}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{assignedDriver.car}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black text-primary">{rideMetrics.fare}</div>
                        <div className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">Paid Via Wallet</div>
                      </div>
                    </div>

                    {/* Mock Barcode */}
                    <div className="flex justify-center gap-1 opacity-20 pt-4 border-t border-slate-100">
                      {[2, 4, 1, 3, 2, 5, 2, 4, 1, 3, 2, 5, 2, 4].map((w, i) => (
                        <div key={i} className="bg-slate-900 h-6" style={{ width: `${w}px` }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button onClick={generateTicket} className="btn-primary w-full !bg-primary shadow-primary/20">
                    <Download size={18} /> Download Ticket
                  </button>
                  <button 
                    onClick={() => { setBookingStep("idle"); setAssignedDriver(null); setMapFocus(null); setRouteBounds(null); }} 
                    className="w-full py-4 text-slate-400 font-black tracking-[0.3em] uppercase text-[9px] hover:text-slate-600 transition-colors border border-transparent hover:border-slate-100 rounded-2xl"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="map-viewport">
          <AnimatePresence>
            {bookingStep === "searching" && <ScanningRadar />}
          </AnimatePresence>

          <MapContainer center={PUNE_CENTER} zoom={13} zoomControl={false} style={{ height: '100%', width: '100%' }} maxZoom={19}>
            <TileLayer url={HIGH_DETAIL_MAP} attribution='&copy; OpenStreetMap' />
            <ZoomControl position="bottomright" />
            <MapController focusPoint={mapFocus} routeBounds={routeBounds} />
            
            {pickup && <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon} />}
            {destination && <Marker position={[destination.lat, destination.lng]} icon={dropIcon} />}
            
            {/* Render all possible routes */}
            {possibleRoutes.map((route, idx) => (
              <React.Fragment key={idx}>
                {/* Background line for selection and subdued view */}
                <Polyline 
                  positions={route.allCoords} 
                  color={selectedRouteIdx === idx ? "#2563eb" : "#94a3b8"} 
                  weight={selectedRouteIdx === idx ? 12 : 8}
                  opacity={selectedRouteIdx === idx ? 0.2 : 0.5}
                  lineCap="round"
                  eventHandlers={{
                    click: () => handleRouteChange(idx),
                    mouseover: (e) => {
                      if (selectedRouteIdx !== idx) {
                        e.target.setStyle({ opacity: 0.8, weight: 10 });
                      }
                    },
                    mouseout: (e) => {
                      if (selectedRouteIdx !== idx) {
                        e.target.setStyle({ opacity: 0.5, weight: 8 });
                      }
                    }
                  }}
                >
                  <Tooltip sticky>
                    <div className="p-1">
                      <div className="font-black text-xs text-slate-900">{route.duration} MIN</div>
                      <div className="text-[10px] text-slate-500 font-bold">{route.distance} KM • ₹{route.fare}</div>
                    </div>
                  </Tooltip>
                </Polyline>
                
                {/* Traffic segments for the selected route only */}
                {selectedRouteIdx === idx && trafficSegments.map((seg, si) => (
                  <Polyline 
                    key={`seg-${si}`} 
                    positions={seg.coords} 
                    color={seg.color} 
                    weight={8} 
                    opacity={1} 
                    lineCap="round" 
                    interactive={false}
                  />
                ))}
              </React.Fragment>
            ))}

            {PUNE_DRIVERS.map(d => (
              <Marker 
                key={d.id} 
                position={[d.lat, d.lng]} 
                icon={assignedDriver?.id === d.id ? createDivIcon('#000', '🚕') : blueDotIcon}
              >
                <Tooltip direction="top" permanent={assignedDriver?.id === d.id}>
                  <div className="text-[10px] font-bold">{assignedDriver?.id === d.id ? `${d.name} (${d.rating}⭐)` : ''}</div>
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </LayoutGroup>
  );
}
