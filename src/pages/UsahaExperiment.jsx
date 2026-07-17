import React, { useState, useEffect } from 'react';
import { Users, HelpCircle, Lightbulb, Beaker, FileSpreadsheet, Activity, CheckCircle, Download, Play, RotateCcw } from 'lucide-react';
import SectionCard from '../components/SectionCard';

const ValidatedInput = ({ value, isValid, correctHint, onChange, placeholder, style, step, type = "number" }) => {
  const isFilled = value !== '' && value !== null && value !== undefined;

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
      <input
        type={type}
        step={step}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
        style={{
          width: '100%',
          padding: '0.5rem',
          paddingRight: isFilled ? '1.8rem' : '0.5rem',
          borderColor: isFilled ? (isValid ? '#10B981' : '#EF4444') : '',
          backgroundColor: isFilled ? (isValid ? '#ECFDF5' : '#FEF2F2') : '',
          transition: 'all 0.2s ease',
          ...style
        }}
      />
      {isFilled && (
        <span style={{
          position: 'absolute',
          right: '8px',
          color: isValid ? '#10B981' : '#EF4444',
          fontWeight: 'bold',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          cursor: 'help'
        }} title={isValid ? 'Jawaban Benar! ✅' : `Jawaban Kurang Tepat. Seharusnya: ${correctHint}`}>
          {isValid ? '✓' : '✗'}
        </span>
      )}
    </div>
  );
};

const UsahaExperiment = () => {
  const [formData, setFormData] = useState({
    namaKelompok: '',
    anggota: '',
    jawabanPemantik1: '',
    jawabanPemantik2: '',
    rumusanMasalah: '',
    hipotesis: '',
    analisis1: '',
    analisis2: '',
    analisis3: '',
    analisis4: '',
    kesimpulan: ''
  });

  // Praktikum 1: Manipulasi Massa
  const [pengamatan1, setPengamatan1] = useState([]);
  const [dataUsaha1, setDataUsaha1] = useState([]);
  const [simMass1, setSimMass1] = useState('5, 7, 10, 15');
  const [simAngle1, setSimAngle1] = useState(30);
  const [simDistance1, setSimDistance1] = useState(2);
  const [isSimRunning1, setIsSimRunning1] = useState(false);
  const [cartProgress1, setCartProgress1] = useState(0);

  // Praktikum 2: Manipulasi Sudut
  const [pengamatan2, setPengamatan2] = useState([]);
  const [dataUsaha2, setDataUsaha2] = useState([]);
  const [simMass2, setSimMass2] = useState(5);
  const [simAngle2, setSimAngle2] = useState('10, 20, 30, 45');
  const [simDistance2, setSimDistance2] = useState(2);
  const [isSimRunning2, setIsSimRunning2] = useState(false);
  const [cartProgress2, setCartProgress2] = useState(0);

  useEffect(() => {
    const massArray = String(simMass1).split(',').map(m => Number(m.trim())).filter(m => !isNaN(m) && m > 0);
    const count = Math.min(15, Math.max(1, massArray.length));
    setPengamatan1(Array.from({ length: count }, (_, i) => ({
      id: i + 1, massa: '', sudut: '', g: '9.8', d: ''
    })));
    setDataUsaha1(Array.from({ length: count }, (_, i) => ({
      id: i + 1, massa: '', sudut: '', g: '9.8', d: '', f: '', w: ''
    })));
  }, [simMass1]);

  useEffect(() => {
    const angleArray = String(simAngle2).split(',').map(a => Number(a.trim())).filter(a => !isNaN(a) && a > 0);
    const count = Math.min(15, Math.max(1, angleArray.length));
    setPengamatan2(Array.from({ length: count }, (_, i) => ({
      id: i + 1, massa: '', sudut: '', g: '9.8', d: ''
    })));
    setDataUsaha2(Array.from({ length: count }, (_, i) => ({
      id: i + 1, massa: '', sudut: '', g: '9.8', d: '', f: '', w: ''
    })));
  }, [simAngle2]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateTableData = (tableStateUpdater, id, field, value) => {
    tableStateUpdater(prev => prev.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const runSimulation1 = () => {
    setIsSimRunning1(true);
    setCartProgress1(0);
    let start = null;
    const duration = 2000;
    
    const massArray = String(simMass1).split(',').map(m => Number(m.trim())).filter(m => !isNaN(m) && m > 0);
    const count = Math.min(15, Math.max(1, massArray.length));

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      setCartProgress1(percent);
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setIsSimRunning1(false);
        const newData = [];
        for(let i = 0; i < count; i++) {
          const varM = massArray[i] || massArray[0];
          const g = 9.8;
          const w = varM * g;
          const f_res = (w * Math.sin(simAngle1 * Math.PI / 180)).toFixed(1);
          newData.push({
            id: i + 1, massa: varM, sudut: simAngle1, g: '9.8', d: simDistance1, f: f_res
          });
        }
        setPengamatan1(newData);
      }
    };
    requestAnimationFrame(animate);
  };

  const runSimulation2 = () => {
    setIsSimRunning2(true);
    setCartProgress2(0);
    let start = null;
    const duration = 2000;

    const angleArray = String(simAngle2).split(',').map(a => Number(a.trim())).filter(a => !isNaN(a) && a > 0);
    const count = Math.min(15, Math.max(1, angleArray.length));

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      setCartProgress2(percent);
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setIsSimRunning2(false);
        const newData = [];
        for(let i = 0; i < count; i++) {
          const varA = angleArray[i] || angleArray[0];
          const g = 9.8;
          const w = simMass2 * g;
          const f_res = (w * Math.sin(varA * Math.PI / 180)).toFixed(1);
          newData.push({
            id: i + 1, massa: simMass2, sudut: varA, g: '9.8', d: simDistance2, f: f_res
          });
        }
        setPengamatan2(newData);
      }
    };
    requestAnimationFrame(animate);
  };

  const exportPDF = () => {
    alert("Tips: Pada jendela cetak yang muncul, pastikan Anda memilih 'Save as PDF' (Simpan sebagai PDF) sebagai tujuan printer Anda untuk mengunduh laporan ini secara sempurna.");
    window.print();
  };

  const renderSVG = (simAngle, simMass, cartProgress) => {
    const maxAngle = Math.min(Math.max(simAngle, 10), 80);
    const angleRad = (maxAngle * Math.PI) / 180;
    const L = 280;
    const b = L * Math.cos(angleRad);
    const h = L * Math.sin(angleRad);
    const originX = 50;
    const originY = 220;
    const cartX = originX + (cartProgress * b);
    const cartY = originY - (cartProgress * h);

    return (
      <svg width="400" height="260" viewBox="0 0 400 260">
        <line x1="0" y1={originY} x2="400" y2={originY} stroke="#9CA3AF" strokeWidth="4" />
        <polygon points={`${originX},${originY} ${originX + b},${originY} ${originX + b},${originY - h}`} fill="#E5E7EB" stroke="#6B7280" strokeWidth="2" strokeLinejoin="round" />
        <line x1={originX} y1={originY} x2={originX + b} y2={originY - h} stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
        <path d={`M ${originX + 30} ${originY} A 30 30 0 0 0 ${originX + 30 * Math.cos(angleRad)} ${originY - 30 * Math.sin(angleRad)}`} fill="none" stroke="#3B82F6" strokeWidth="2" />
        <text x={originX + 35} y={originY - 10} fontSize="14" fill="#3B82F6" fontWeight="bold">{simAngle}°</text>

        <g transform={`translate(${cartX}, ${cartY}) rotate(${-maxAngle})`}>
          <rect x="-15" y="-27" width="40" height="20" fill="#4F46E5" rx="4" />
          <line x1="-15" y1="-17" x2="-30" y2="-25" stroke="#111" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-5" cy="-7" r="7" fill="#111" />
          <circle cx="-5" cy="-7" r="3" fill="#D1D5DB" />
          <circle cx="15" cy="-7" r="7" fill="#111" />
          <circle cx="15" cy="-7" r="3" fill="#D1D5DB" />
          <circle cx="-40" cy="-45" r="6" fill="#EF4444" />
          <line x1="-40" y1="-39" x2="-40" y2="-15" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <line x1="-40" y1="-32" x2="-30" y2="-25" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <line x1="-40" y1="-15" x2="-48" y2="0" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <line x1="-40" y1="-15" x2="-32" y2="0" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <text x="5" y="-13" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{simMass} kg</text>
        </g>
      </svg>
    );
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)', fontSize: '2rem', textAlign: 'center' }}>Eksperimen: Usaha Pada Bidang Miring</h1>
      </div>

      <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
        
        {/* 1. Identitas Kelompok */}
        <SectionCard title="1. Identitas Kelompok" icon={<Users />} delay={0.1}>
          <div className="input-group">
            <label className="input-label">Nama Kelompok</label>
            <input type="text" name="namaKelompok" value={formData.namaKelompok} onChange={handleInputChange} className="input-field" placeholder="Masukkan nama kelompok" />
          </div>
          <div className="input-group">
            <label className="input-label">Anggota Kelompok</label>
            <textarea name="anggota" value={formData.anggota} onChange={handleInputChange} className="input-field" placeholder="1. ...&#10;2. ...&#10;3. ..." style={{ minHeight: '80px' }} />
          </div>
        </SectionCard>
        {/* 2. Orientasi Masalah */}
        <SectionCard title="2. Orientasi Masalah" icon={<HelpCircle />} delay={0.2}>
          <div style={{ background: 'rgba(92, 124, 150, 0.08)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary)' }} className="print-avoid-break">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
              <div style={{ flex: '1 1 300px' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--primary)' }}>📖 Narasi Mengenai Fenomena yang Ada</h4>
                <div style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <p style={{ lineHeight: '1.6', textAlign: 'justify', color: 'var(--text)' }}>
                    Seorang pedagang sedang mendorong gerobak berisi barang dagangan di sebuah pasar. Pada awalnya, ia mendorong gerobak di jalan yang datar. Gerobak tersebut dapat bergerak dengan cukup lancar meskipun tetap membutuhkan tenaga. Namun, ketika ia melanjutkan perjalanan ke area yang sedikit menanjak, gerobak terasa menjadi jauh lebih berat. Ia harus mengeluarkan gaya yang lebih besar agar gerobak tetap bergerak. Bahkan, ketika ia mengurangi sedikit saja dorongannya, gerobak mulai melambat and hampir berhenti. Pedagang tersebut merasa bingung, karena jarak yang ditempuh tidak jauh berbeda, tetapi tenaga yang dikeluarkan terasa jauh lebih besar saat melewati jalan menanjak dibandingkan jalan datar.
                  </p>
                </div>

                <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--primary)' }}>📺 Materi Pengantar - Usaha</h4>
                <p style={{ marginBottom: '0.75rem' }}>
                  Usaha adalah energi yang disalurkan gaya ke sebuah benda sehingga benda tersebut bergerak. Persamaan usaha dapat dituliskan sebagai berikut:
                </p>
                <p style={{ marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.1rem', background: 'rgba(255,255,255,0.5)', padding: '0.5rem', display: 'inline-block', borderRadius: '4px' }}>
                  W = F ⋅ d ⋅ cos(θ)
                </p>

                {/* Pertanyaan Pemantik */}
                <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.9)', borderRadius: '8px', border: '1px solid var(--primary)' }} className="print-avoid-break">
                  <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Pertanyaan Pemantik:</h4>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: '1 1 200px', fontSize: '0.95rem', fontWeight: '500' }}>
                      1. Mengapa pedagang merasa dorongannya lebih berat ketika melewati jalan menanjak, padahal jarak yang ditempuh tidak jauh berbeda dengan jalan datar?
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                      <textarea name="jawabanPemantik1" value={formData.jawabanPemantik1} onChange={handleInputChange} className="input-field" placeholder="Tuliskan jawaban Anda di sini..." style={{ width: '100%', minHeight: '80px' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: '1 1 200px', fontSize: '0.95rem', fontWeight: '500' }}>
                      2. Apa yang menyebabkan gerobak hampir berhenti ketika gaya dorong sedikit dikurangi saat di jalan menanjak, tetapi tidak terjadi hal yang sama di jalan datar?
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                      <textarea name="jawabanPemantik2" value={formData.jawabanPemantik2} onChange={handleInputChange} className="input-field" placeholder="Tuliskan jawaban Anda di sini..." style={{ width: '100%', minHeight: '80px' }} />
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Bagian Kanan: Gambar & Animasi */}
              <div className="no-print" style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <img src="/gambar-usaha.jpg" alt="Pedagang Mendorong Gerobak" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
                  <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem', textAlign: 'center' }}>Fenomena Mendorong Gerobak</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <svg width="200" height="150" viewBox="0 0 200 150">
                    <defs>
                      <marker id="arrowUsaha" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
                      </marker>
                    </defs>
                    <polygon points="20,130 180,130 180,50" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
                    <line x1="20" y1="130" x2="180" y2="50" stroke="#3B82F6" strokeWidth="4" />
                    
                    {/* Sudut θ */}
                    <path d="M 50 130 A 30 30 0 0 0 46.8 116.6" fill="none" stroke="#666" strokeWidth="2" />
                    <text x="52" y="125" fontSize="12" fill="#666" fontWeight="bold">θ</text>

                    {/* Panah Arah Gaya */}
                    <g transform="translate(100, 90) rotate(-26.5deg)">
                      <line x1="-30" y1="-30" x2="30" y2="-30" stroke="#10B981" strokeWidth="3" markerEnd="url(#arrowUsaha)" />
                      <text x="0" y="-38" fontSize="11" fill="#10B981" textAnchor="middle" fontWeight="bold">Gaya &amp; Gerak</text>
                    </g>

                    <style>
                      {`
                        @keyframes pushUpCartLoop {
                          0% { transform: translate(30px, 125px) rotate(-26.5deg); opacity: 0; }
                          5% { opacity: 1; }
                          95% { transform: translate(170px, 55px) rotate(-26.5deg); opacity: 1; }
                          100% { transform: translate(170px, 55px) rotate(-26.5deg); opacity: 0; }
                        }
                        .anim-cart-loop {
                          animation: pushUpCartLoop 3.5s linear infinite;
                        }
                      `}
                    </style>
                    <g className="anim-cart-loop">
                      <rect x="-10" y="-18" width="25" height="12" fill="#4F46E5" rx="2" />
                      <line x1="-10" y1="-12" x2="-20" y2="-17" stroke="#111" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="-3" cy="-5" r="4" fill="#111" />
                      <circle cx="9" cy="-5" r="4" fill="#111" />
                      <circle cx="-25" cy="-30" r="4" fill="#EF4444" />
                      <line x1="-25" y1="-26" x2="-25" y2="-10" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                      <line x1="-25" y1="-22" x2="-20" y2="-17" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                      <line x1="-25" y1="-10" x2="-30" y2="0" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                      <line x1="-25" y1="-10" x2="-20" y2="0" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                    </g>
                  </svg>
                  <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem', textAlign: 'center' }}>Ilustrasi Mendorong Gerobak</p>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* 3. Merumuskan Masalah */}
        <SectionCard title="3. Merumuskan Masalah" icon={<Lightbulb />} delay={0.3}>
          <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}><strong>Panduan Merumuskan Masalah:</strong><br/>Identifikasi variabel manipulasi, kontrol, dan respon pada percobaan usaha. Kemudian, buatlah pertanyaan penelitian untuk mengetahui bagaimana perubahan suatu variabel memengaruhi besar usaha, serta bagaimana hubungan antara gaya dan perpindahan dalam percobaan tersebut.</p>
          <textarea name="rumusanMasalah" value={formData.rumusanMasalah} onChange={handleInputChange} className="input-field" placeholder="Tuliskan rumusan masalah Anda..." style={{ width: '100%' }} />
        </SectionCard>

        {/* 4. Merumuskan Hipotesis */}
        <SectionCard title="4. Merumuskan Hipotesis" icon={<Beaker />} delay={0.4}>
          <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}><strong>Panduan Merumuskan Hipotesis:</strong><br/>Hipotesis adalah jawaban sementara atas rumusan masalah. Gunakan format:<br/>"Jika [variabel independen] meningkat, maka [variabel dependen] akan [naik/turun/berubah]"<br/>Contoh: "Jika gaya yang diberikan meningkat, maka usaha yang dilakukan akan meningkat."</p>
          <textarea name="hipotesis" value={formData.hipotesis} onChange={handleInputChange} className="input-field" placeholder="Tuliskan hipotesis Anda..." style={{ width: '100%' }} />
        </SectionCard>

        {/* 5A. Mengumpulkan Data Eksperimen 1 */}
        <SectionCard title="5A. Eksperimen 1 (Manipulasi Massa)" icon={<FileSpreadsheet />} delay={0.5}>
          
          <div className="print-avoid-break" style={{ background: 'rgba(255,255,255,0.5)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--primary)' }}>Simulasi Bidang Miring (Massa Berubah)</h3>
            </div>

            <div className="simulation-container no-print" style={{ background: '#F8FAFC' }}>
              <div className="simulation-canvas" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px', background: 'transparent' }}>
                {renderSVG(simAngle1, Number(String(simMass1).split(',')[0]) || 5, cartProgress1)}
              </div>

              <div className="simulation-controls">
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Manipulasi Massa (kg)</label>
                  <input type="text" value={simMass1} onChange={(e) => setSimMass1(e.target.value)} className="input-field" style={{ width: '150px' }} placeholder="5, 7, 10" />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Sudut (°) [Tetap]</label>
                  <input type="number" value={simAngle1} onChange={(e) => setSimAngle1(Number(e.target.value))} className="input-field" style={{ width: '90px' }} />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Perpindahan (m) [Tetap]</label>
                  <input type="number" value={simDistance1} step="0.5" onChange={(e) => setSimDistance1(Number(e.target.value))} className="input-field" style={{ width: '100px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <button onClick={runSimulation1} disabled={isSimRunning1} className="btn btn-primary">
                    <Play size={16} /> Mulai
                  </button>
                  <button onClick={() => {
                    setCartProgress1(0); setIsSimRunning1(false);
                    const massArray = String(simMass1).split(',').map(m => Number(m.trim())).filter(m => !isNaN(m) && m > 0);
                    const count = Math.min(15, Math.max(1, massArray.length));
                    setPengamatan1(Array.from({ length: count }, (_, i) => ({ id: i + 1, massa: '', sudut: '', g: '9.8', d: '', f: '' })));
                  }} className="btn btn-outline">
                    <RotateCcw size={16} /> Reset
                  </button>
                </div>
              </div>
            </div>
            
            <p className="no-print" style={{ marginTop: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '0.85rem' }}>
              Klik "Mulai" untuk auto-fill tabel. Massa divariasikan sesuai input data yang dipisahkan koma.
            </p>

            <h4 style={{ margin: '1rem 0' }}>Tabel Hasil Pengamatan 1</h4>
            <div className="print-avoid-break" style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table>
                <thead>
                  <tr>
                    <th>No</th><th>Massa (Kg)</th><th>Sudut (°)</th><th>g (m/s²)</th><th>Perpindahan (m)</th><th>Gaya (N)</th>
                  </tr>
                </thead>
                <tbody>
                  {pengamatan1.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td><input type="number" value={row.massa} onChange={(e) => updateTableData(setPengamatan1, row.id, 'massa', e.target.value)} className="input-field" style={{ width: '100%', padding: '0.5rem' }} /></td>
                      <td><input type="number" value={row.sudut} onChange={(e) => updateTableData(setPengamatan1, row.id, 'sudut', e.target.value)} className="input-field" style={{ width: '100%', padding: '0.5rem' }} /></td>
                      <td><input type="number" value={row.g} onChange={(e) => updateTableData(setPengamatan1, row.id, 'g', e.target.value)} className="input-field" style={{ width: '100%', padding: '0.5rem' }} /></td>
                      <td><input type="number" value={row.d} onChange={(e) => updateTableData(setPengamatan1, row.id, 'd', e.target.value)} className="input-field" style={{ width: '100%', padding: '0.5rem' }} /></td>
                      <td><input type="number" value={row.f} onChange={(e) => updateTableData(setPengamatan1, row.id, 'f', e.target.value)} className="input-field" style={{ width: '100%', padding: '0.5rem' }} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 style={{ margin: '1rem 0' }}>Tabel Data 1</h4>
            <div className="print-avoid-break" style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>No</th><th>Massa (Kg)</th><th>Sudut (°)</th><th>g (m/s²)</th><th>Perpindahan (m)</th><th>Gaya (N)</th><th>Usaha (J)</th>
                  </tr>
                </thead>
                <tbody>
                  {dataUsaha1.map((row) => {
                    const m = parseFloat(row.massa);
                    const s = parseFloat(row.sudut);
                    const g = parseFloat(row.g);
                    const d = parseFloat(row.d);
                    const f = parseFloat(row.f);
                    const w = parseFloat(row.w);

                    const refRow = pengamatan1.find(p => p.id === row.id) || {};
                    const refM = parseFloat(refRow.massa);
                    const refS = parseFloat(refRow.sudut);
                    const refG = parseFloat(refRow.g);
                    const refD = parseFloat(refRow.d);

                    const isMValid = !isNaN(m) && !isNaN(refM) && Math.abs(m - refM) < 0.01;
                    const isSValid = !isNaN(s) && !isNaN(refS) && Math.abs(s - refS) < 0.01;
                    const isGValid = !isNaN(g) && !isNaN(refG) && Math.abs(g - refG) < 0.01;
                    const isDValid = !isNaN(d) && !isNaN(refD) && Math.abs(d - refD) < 0.01;

                    const expectedF = !isNaN(m) && !isNaN(s) && !isNaN(g) ? (m * g * Math.sin(s * Math.PI / 180)) : NaN;
                    const expectedW1 = !isNaN(f) && !isNaN(d) ? f * d : NaN;
                    const expectedW2 = !isNaN(expectedF) && !isNaN(d) ? expectedF * d : NaN;

                    const isFValid = !isNaN(f) && !isNaN(expectedF) && Math.abs(f - expectedF) < 0.25;
                    const hintF = !isNaN(expectedF) ? expectedF.toFixed(1) : '-';

                    const isWValid = !isNaN(w) && ((!isNaN(expectedW1) && Math.abs(w - expectedW1) < 0.25) || (!isNaN(expectedW2) && Math.abs(w - expectedW2) < 0.25));
                    const hintW = !isNaN(expectedW1) ? expectedW1.toFixed(1) : (!isNaN(expectedW2) ? expectedW2.toFixed(1) : '-');

                    return (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>
                          <ValidatedInput
                            value={row.massa}
                            isValid={isMValid}
                            correctHint={!isNaN(refM) ? refM.toFixed(1) : '-'}
                            onChange={(e) => updateTableData(setDataUsaha1, row.id, 'massa', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.sudut}
                            isValid={isSValid}
                            correctHint={!isNaN(refS) ? refS.toFixed(1) : '-'}
                            onChange={(e) => updateTableData(setDataUsaha1, row.id, 'sudut', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.g}
                            isValid={isGValid}
                            correctHint={!isNaN(refG) ? refG.toFixed(1) : '-'}
                            onChange={(e) => updateTableData(setDataUsaha1, row.id, 'g', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.d}
                            isValid={isDValid}
                            correctHint={!isNaN(refD) ? refD.toFixed(1) : '-'}
                            onChange={(e) => updateTableData(setDataUsaha1, row.id, 'd', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.f}
                            isValid={isFValid}
                            correctHint={hintF}
                            onChange={(e) => updateTableData(setDataUsaha1, row.id, 'f', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.w}
                            isValid={isWValid}
                            correctHint={hintW}
                            onChange={(e) => updateTableData(setDataUsaha1, row.id, 'w', e.target.value)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        {/* 5B. Mengumpulkan Data Eksperimen 2 */}
        <SectionCard title="5B. Eksperimen 2 (Manipulasi Sudut)" icon={<FileSpreadsheet />} delay={0.5}>
          
          <div className="print-avoid-break" style={{ background: 'rgba(255,255,255,0.5)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--primary)' }}>Simulasi Bidang Miring (Sudut Berubah)</h3>
            </div>

            <div className="simulation-container no-print" style={{ background: '#F8FAFC' }}>
              <div className="simulation-canvas" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '280px', background: 'transparent' }}>
                {renderSVG(Number(String(simAngle2).split(',')[0]) || 30, simMass2, cartProgress2)}
              </div>

              <div className="simulation-controls">
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Massa (kg) [Tetap]</label>
                  <input type="number" value={simMass2} onChange={(e) => setSimMass2(Number(e.target.value))} className="input-field" style={{ width: '90px' }} />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Manipulasi Sudut (°)</label>
                  <input type="text" value={simAngle2} onChange={(e) => setSimAngle2(e.target.value)} className="input-field" style={{ width: '150px' }} placeholder="10, 20, 30" />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Perpindahan (m) [Tetap]</label>
                  <input type="number" value={simDistance2} step="0.5" onChange={(e) => setSimDistance2(Number(e.target.value))} className="input-field" style={{ width: '100px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <button onClick={runSimulation2} disabled={isSimRunning2} className="btn btn-primary">
                    <Play size={16} /> Mulai
                  </button>
                  <button onClick={() => {
                    setCartProgress2(0); setIsSimRunning2(false);
                    const angleArray = String(simAngle2).split(',').map(a => Number(a.trim())).filter(a => !isNaN(a) && a > 0);
                    const count = Math.min(15, Math.max(1, angleArray.length));
                    setPengamatan2(Array.from({ length: count }, (_, i) => ({ id: i + 1, massa: '', sudut: '', g: '9.8', d: '', f: '' })));
                  }} className="btn btn-outline">
                    <RotateCcw size={16} /> Reset
                  </button>
                </div>
              </div>
            </div>
            
            <p className="no-print" style={{ marginTop: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '0.85rem' }}>
              Klik "Mulai" untuk auto-fill tabel. Sudut divariasikan sesuai input data yang dipisahkan koma.
            </p>

            <h4 style={{ margin: '1rem 0' }}>Tabel Hasil Pengamatan 2</h4>
            <div className="print-avoid-break" style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table>
                <thead>
                  <tr>
                    <th>No</th><th>Massa (Kg)</th><th>Sudut (°)</th><th>g (m/s²)</th><th>Perpindahan (m)</th><th>Gaya (N)</th>
                  </tr>
                </thead>
                <tbody>
                  {pengamatan2.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td><input type="number" value={row.massa} onChange={(e) => updateTableData(setPengamatan2, row.id, 'massa', e.target.value)} className="input-field" style={{ width: '100%', padding: '0.5rem' }} /></td>
                      <td><input type="number" value={row.sudut} onChange={(e) => updateTableData(setPengamatan2, row.id, 'sudut', e.target.value)} className="input-field" style={{ width: '100%', padding: '0.5rem' }} /></td>
                      <td><input type="number" value={row.g} onChange={(e) => updateTableData(setPengamatan2, row.id, 'g', e.target.value)} className="input-field" style={{ width: '100%', padding: '0.5rem' }} /></td>
                      <td><input type="number" value={row.d} onChange={(e) => updateTableData(setPengamatan2, row.id, 'd', e.target.value)} className="input-field" style={{ width: '100%', padding: '0.5rem' }} /></td>
                      <td><input type="number" value={row.f} onChange={(e) => updateTableData(setPengamatan2, row.id, 'f', e.target.value)} className="input-field" style={{ width: '100%', padding: '0.5rem' }} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 style={{ margin: '1rem 0' }}>Tabel Data 2</h4>
            <div className="print-avoid-break" style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>No</th><th>Massa (Kg)</th><th>Sudut (°)</th><th>g (m/s²)</th><th>Perpindahan (m)</th><th>Gaya (N)</th><th>Usaha (J)</th>
                  </tr>
                </thead>
                <tbody>
                  {dataUsaha2.map((row) => {
                    const m = parseFloat(row.massa);
                    const s = parseFloat(row.sudut);
                    const g = parseFloat(row.g);
                    const d = parseFloat(row.d);
                    const f = parseFloat(row.f);
                    const w = parseFloat(row.w);

                    const refRow = pengamatan2.find(p => p.id === row.id) || {};
                    const refM = parseFloat(refRow.massa);
                    const refS = parseFloat(refRow.sudut);
                    const refG = parseFloat(refRow.g);
                    const refD = parseFloat(refRow.d);

                    const isMValid = !isNaN(m) && !isNaN(refM) && Math.abs(m - refM) < 0.01;
                    const isSValid = !isNaN(s) && !isNaN(refS) && Math.abs(s - refS) < 0.01;
                    const isGValid = !isNaN(g) && !isNaN(refG) && Math.abs(g - refG) < 0.01;
                    const isDValid = !isNaN(d) && !isNaN(refD) && Math.abs(d - refD) < 0.01;

                    const expectedF = !isNaN(m) && !isNaN(s) && !isNaN(g) ? (m * g * Math.sin(s * Math.PI / 180)) : NaN;
                    const expectedW1 = !isNaN(f) && !isNaN(d) ? f * d : NaN;
                    const expectedW2 = !isNaN(expectedF) && !isNaN(d) ? expectedF * d : NaN;

                    const isFValid = !isNaN(f) && !isNaN(expectedF) && Math.abs(f - expectedF) < 0.25;
                    const hintF = !isNaN(expectedF) ? expectedF.toFixed(1) : '-';

                    const isWValid = !isNaN(w) && ((!isNaN(expectedW1) && Math.abs(w - expectedW1) < 0.25) || (!isNaN(expectedW2) && Math.abs(w - expectedW2) < 0.25));
                    const hintW = !isNaN(expectedW1) ? expectedW1.toFixed(1) : (!isNaN(expectedW2) ? expectedW2.toFixed(1) : '-');

                    return (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>
                          <ValidatedInput
                            value={row.massa}
                            isValid={isMValid}
                            correctHint={!isNaN(refM) ? refM.toFixed(1) : '-'}
                            onChange={(e) => updateTableData(setDataUsaha2, row.id, 'massa', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.sudut}
                            isValid={isSValid}
                            correctHint={!isNaN(refS) ? refS.toFixed(1) : '-'}
                            onChange={(e) => updateTableData(setDataUsaha2, row.id, 'sudut', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.g}
                            isValid={isGValid}
                            correctHint={!isNaN(refG) ? refG.toFixed(1) : '-'}
                            onChange={(e) => updateTableData(setDataUsaha2, row.id, 'g', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.d}
                            isValid={isDValid}
                            correctHint={!isNaN(refD) ? refD.toFixed(1) : '-'}
                            onChange={(e) => updateTableData(setDataUsaha2, row.id, 'd', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.f}
                            isValid={isFValid}
                            correctHint={hintF}
                            onChange={(e) => updateTableData(setDataUsaha2, row.id, 'f', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.w}
                            isValid={isWValid}
                            correctHint={hintW}
                            onChange={(e) => updateTableData(setDataUsaha2, row.id, 'w', e.target.value)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>

        {/* 6. Analisis Hasil */}
        <SectionCard title="6. Analisis Hasil" icon={<Activity />} delay={0.6}>
          <div className="input-group print-avoid-break">
            <label className="input-label" style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>
              1. Jika massa gerobak diperbesar dan sudut kemiringan juga diperbesar, bagaimana pengaruh gabungan kedua variabel tersebut terhadap gaya?
            </label>
            <textarea name="analisis1" value={formData.analisis1} onChange={handleInputChange} className="input-field" style={{ minHeight: '80px' }} />
          </div>
          
          <div className="input-group print-avoid-break" style={{ marginTop: '1.5rem' }}>
            <label className="input-label" style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>
              2. Karena perpindahan dijaga tetap, bagaimana perubahan gaya akibat variasi massa dan sudut mempengaruhi besar usaha yang dilakukan?
            </label>
            <textarea name="analisis2" value={formData.analisis2} onChange={handleInputChange} className="input-field" style={{ minHeight: '80px' }} />
          </div>

          <div className="input-group print-avoid-break" style={{ marginTop: '1.5rem' }}>
            <label className="input-label" style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>
              3. Apakah terdapat kondisi di mana usaha yang dilakukan relatif sama meskipun gaya yang diberikan berbeda?
            </label>
            <textarea name="analisis3" value={formData.analisis3} onChange={handleInputChange} className="input-field" style={{ minHeight: '80px' }} />
          </div>

          <div className="input-group print-avoid-break" style={{ marginTop: '1.5rem' }}>
            <label className="input-label" style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>
              4. Berdasarkan data hasil praktikum, nilai apakah hubungan antara massa, sudut kemiringan, gaya, dan usaha sudah sesuai dengan teori usaha dalam fisika, jelaskan! Jika terdapat ketidaksesuaian, jelaskan alasan yang paling mungkin.
            </label>
            <textarea name="analisis4" value={formData.analisis4} onChange={handleInputChange} className="input-field" style={{ minHeight: '80px' }} />
          </div>
        </SectionCard>

        {/* 7. Kesimpulan */}
        <SectionCard title="7. Kesimpulan" icon={<CheckCircle />} delay={0.7}>
          <div className="print-avoid-break">
            <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}><strong>Panduan Menulis Kesimpulan:</strong><br/>Apakah hipotesis Anda terbukti atau tidak terbukti? Jelaskan!<br/>Apa yang dapat disimpulkan tentang hubungan antara variabel yang diteliti?<br/>Apakah hasil percobaan sesuai dengan konsep usaha?<br/>Apa implikasi atau aplikasi hasil penelitian ini dalam kehidupan sehari-hari?</p>
            <textarea name="kesimpulan" value={formData.kesimpulan} onChange={handleInputChange} className="input-field" placeholder="Tuliskan kesimpulan akhir Anda..." style={{ width: '100%' }} />
          </div>
        </SectionCard>
      </div>

      <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <button onClick={exportPDF} className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          <Download size={20} /> Unduh Laporan (PDF)
        </button>
      </div>
    </div>
  );
};

export default UsahaExperiment;
