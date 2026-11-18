import React, { useState, useEffect } from 'react';
import { allPlaces } from '../data/muarData';

export default function TripPlanner({ onBack, t, isDark }) {
  const [activeTab, setActiveTab] = useState('itinerary'); 
  
  const [searchQuery, setSearchQuery] = useState('');
  const [duration, setDuration] = useState(1); 
  const [itineraryDays, setItineraryDays] = useState([[]]); 
  const [draggedItem, setDraggedItem] = useState(null);
  
  // State for which day's map is being viewed
  const [activeMapDay, setActiveMapDay] = useState(0);

  useEffect(() => {
    const targetDays = Math.ceil(duration);
    setItineraryDays(prev => {
      const newDays = [...prev];
      if (newDays.length < targetDays) {
        while (newDays.length < targetDays) newDays.push([]);
      } else if (newDays.length > targetDays) {
        newDays.splice(targetDays);
      }
      return newDays;
    });
  }, [duration]);

  const togglePlace = (place) => {
    const exists = itineraryDays.some(day => day.some(p => p.id === place.id));
    if (exists) {
      const newItinerary = itineraryDays.map(day => day.filter(p => p.id !== place.id));
      setItineraryDays(newItinerary);
    } else {
      const newItinerary = [...itineraryDays];
      newItinerary[0] = [...newItinerary[0], place];
      setItineraryDays(newItinerary);
    }
  };

  const handleDragStart = (e, place, dayIndex, itemIndex) => {
    setDraggedItem({ place, dayIndex, itemIndex });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetDayIndex, targetItemIndex = null) => {
    e.preventDefault();
    if (!draggedItem) return;
    const newItinerary = itineraryDays.map(day => [...day]);
    newItinerary[draggedItem.dayIndex].splice(draggedItem.itemIndex, 1);
    if (targetItemIndex === null) {
      newItinerary[targetDayIndex].push(draggedItem.place);
    } else {
      newItinerary[targetDayIndex].splice(targetItemIndex, 0, draggedItem.place);
    }
    setItineraryDays(newItinerary);
    setDraggedItem(null);
  };

  const filteredPlaces = allPlaces.filter(place => 
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- LOGIK UNTUK TRAVEL TIPS & CUSTOMS DINAMIK ---
  const allSelectedPlaces = itineraryDays.flat();
  const hasHeritage = allSelectedPlaces.some(p => p.category === 'heritage');
  const hasFood = allSelectedPlaces.some(p => p.category === 'food');

  return (
    <div className="section" style={{ paddingTop: '2rem', paddingBottom: '4rem', minHeight: '80vh' }}>
      <button className="btn btn-outline" onClick={onBack} style={{ marginBottom: '2rem' }}>
        {t.backBtn}
      </button>

      <div className="section-head" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 className="section-title">{t.plannerTitle}</h2>
        <p className="section-sub" style={{ margin: '0 auto' }}>
          {t.plannerSub}
        </p>
      </div>

      {/* --- BAHAGIAN 1: PLACES (SENTIASA NAMPAK) --- */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Header & Search */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flex: 1 }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--green-800)', margin: 0 }}>{t.suggestedPlaces}</h3>
            <div className="filter-search" style={{ flex: 1, maxWidth: '400px' }}>
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Butang Clear All */}
          {allSelectedPlaces.length > 0 && (
            <button 
              onClick={() => setItineraryDays([[]])} 
              className="btn btn-outline" 
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#d9534f', borderColor: '#d9534f' }}
            >
              🗑️ {t.clearAll || "Clear All"}
            </button>
          )}
        </div>

        {/* Senarai Tempat */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {filteredPlaces.map(place => (
            <div key={place.id} className={`planner-place ${itineraryDays.some(day => day.some(p => p.id === place.id)) ? 'selected' : ''}`}>
              <input 
                type="checkbox" 
                checked={itineraryDays.some(day => day.some(p => p.id === place.id))}
                onChange={() => togglePlace(place)}
                style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--green-800)' }}
              />
              {place.image ? (
                <img src={place.image} alt={place.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '12px' }} />
              ) : (
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', display: 'grid', placeItems: 'center', background: 'rgba(45,134,89,0.25)', fontSize: '1.4rem' }}>
                  {place.category === 'accommodation' ? '🏨' : place.category === 'food' ? '🍜' : place.category === 'entertainment' ? '🎬' : '🏛️'}
                </div>
              )}
              <div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.2rem', color: 'var(--ink)' }}>{place.name}</h4>
                <span className="tag" style={{ fontSize: '0.65rem' }}>
                  {place.category === 'accommodation' ? '🏨' : place.category === 'food' ? '🍜' : place.category === 'entertainment' ? '🎬' : '🏛️'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- TAB NAVIGATION --- */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {['itinerary', 'tips', 'customs'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}
          >
            {tab === 'itinerary' ? t.tabItinerary : tab === 'tips' ? t.tabTips : t.tabCustoms}
          </button>
        ))}
      </div>

      {/* --- KANDUNGAN TAB --- */}
      <div>
        {/* TAB 1: ITINERARY & MAP */}
        {activeTab === 'itinerary' && (
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div className="planner-panel" style={{ flex: '1 1 400px', padding: '1.5rem' }}>
              <div className="planner-duration">
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem' }}>{t.tripDuration}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button className="planner-step" onClick={() => setDuration(Math.max(1, duration - 1))}> - </button>
                  <span style={{ fontWeight: 'bold', minWidth: '80px', textAlign: 'center', fontSize: '1.1rem' }}>{duration} {duration === 1 ? t.day : t.days}</span>
                  <button className="planner-step" onClick={() => setDuration(duration + 1)}> + </button>
                </div>
              </div>

              <div className="planner-days">
                {itineraryDays.map((dayPlaces, dayIndex) => (
                  <div key={dayIndex} style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.22)', paddingBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#f3dca4' }}>
                        {duration % 1 !== 0 && dayIndex === itineraryDays.length - 1 ? `${t.halfDay} ${dayIndex + 1}` : `${t.day} ${dayIndex + 1}`}
                      </h4>
                      {dayPlaces.length === 0 && <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>{t.restDay}</span>}
                    </div>
                    <ul onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, dayIndex)} style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '50px' }}>
                      {dayPlaces.map((place, itemIndex) => (
                        <li key={place.id} draggable onDragStart={(e) => handleDragStart(e, place, dayIndex, itemIndex)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, dayIndex, itemIndex)} className="planner-item" style={{ opacity: draggedItem?.place.id === place.id ? 0.5 : 1 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', color: 'rgba(255,255,255,0.4)' }}><span style={{ fontSize: '1.2rem', lineHeight: '1' }}>⋮⋮</span></div>
                          <div style={{ flex: 1 }}><strong style={{ display: 'block', fontWeight: '500' }}>{place.name}</strong><span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{place.category === 'accommodation' ? '🏨' : place.category === 'food' ? '🍜' : place.category === 'entertainment' ? '🎬' : '🏛️'}</span></div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button className="btn planner-download">{t.downloadPdf}</button>
            </div>

            {/* PETA DENGAN SMART START/END LOGIC */}
            <div style={{ flex: '1 1 400px', position: 'sticky', top: '100px' }}>
              {itineraryDays.some(day => day.length > 0) ? (
                <div className="glass-panel" style={{ padding: '1rem' }}>
                  
                  {/* Butang Pilihan Hari */}
                  <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginBottom: '1rem', paddingBottom: '0.5rem' }}>
                    {itineraryDays.map((dayPlaces, index) => {
                      if (dayPlaces.length === 0) return null;
                      return (
                        <button
                          key={index}
                          onClick={() => setActiveMapDay(index)}
                          className={`btn btn-sm ${activeMapDay === index ? 'btn-primary' : 'btn-outline'}`}
                          style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', whiteSpace: 'nowrap' }}
                        >
                          {t.day} {index + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Peta Dinamik */}
                  <div style={{ width: '100%', height: '450px', borderRadius: '16px', overflow: 'hidden' }}>
                    <iframe 
                      title="Google Maps Route" 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      style={{ border: 0 }} 
                      src={`https://maps.google.com/maps?q=${
                        (() => {
                          const currentDayPlaces = itineraryDays[activeMapDay] || [];
                          const hotelToday = currentDayPlaces.find(p => p.category === 'accommodation');
                          
                          let startHotel = null;
                          for (let i = activeMapDay - 1; i >= 0; i--) {
                            const pastHotel = itineraryDays[i]?.find(p => p.category === 'accommodation');
                            if (pastHotel) {
                              startHotel = pastHotel;
                              break;
                            }
                          }
                          
                          if (!startHotel && hotelToday) {
                            startHotel = hotelToday;
                          }

                          const routeParts = [];
                          
                          if (startHotel) {
                            routeParts.push(encodeURIComponent(startHotel.mapQuery));
                          }

                          currentDayPlaces.forEach(p => {
                            if (p.category === 'accommodation') return;
                            routeParts.push(encodeURIComponent(p.mapQuery));
                          });

                          if (hotelToday) {
                            routeParts.push(encodeURIComponent(hotelToday.mapQuery));
                          } else if (startHotel) {
                            routeParts.push(encodeURIComponent(startHotel.mapQuery));
                          }
                          
                          return routeParts.join('+to:');
                        })()
                      }&output=embed`} 
                      allowFullScreen
                    ></iframe>
                  </div>

                </div>
              ) : (
                <div className="glass-panel" style={{ padding: '2rem', borderStyle: 'dashed', textAlign: 'center', color: 'var(--ink-soft)' }}>
                  <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>🗺️</p>
                  <p style={{ fontSize: '0.9rem' }}>{t.mapEmpty}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: TRAVEL TIPS */}
        {activeTab === 'tips' && (
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{t.tipsTitle}</h2>
            <p style={{ textAlign: 'center', color: 'var(--ink-soft)', marginBottom: '2rem' }}>{t.tipsSub}</p>
            
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--green-800)', marginBottom: '0.5rem' }}>☀️ {t.tipsWeather}</h3>
              <p>{t.tipsWeatherDesc}</p>
            </div>

            {allSelectedPlaces.length > 1 && (
              <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--green-800)', marginBottom: '0.5rem' }}>🚗 {t.tipsTransport}</h3>
                <p>{t.tipsTransportDesc}</p>
              </div>
            )}

            {hasFood && (
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ color: 'var(--green-800)', marginBottom: '0.5rem' }}>🍜 {t.tipsFoodTitle || "Foodie Tips"}</h3>
                <p>{t.tipsFoodDesc || "Since you have food spots in your itinerary, try to visit during off-peak hours to avoid long queues."}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: LOCAL CUSTOMS */}
        {activeTab === 'customs' && (
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{t.customsTitle}</h2>
            <p style={{ textAlign: 'center', color: 'var(--ink-soft)', marginBottom: '2rem' }}>{t.customsSub}</p>
            
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--green-800)', marginBottom: '0.5rem' }}>🤝 {t.customsGreeting}</h3>
              <p>{t.customsGreetingDesc}</p>
            </div>

            {hasHeritage && (
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 style={{ color: 'var(--green-800)', marginBottom: '0.5rem' }}>👕 {t.customsDress}</h3>
                <p>{t.customsDressDesc}</p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}