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

const EnergyAnimation = () => {
  const [state, setState] = useState({ x: 10, y: 10, rot: 0, ep: 100, ek: 0 });

  useEffect(() => {
    let start = null;
    const durationFall = 1000;
    const durationRoll = 2000;
    const delay = 500;
    const totalDuration = durationFall + durationRoll + delay;
    let frameId;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) % totalDuration;

      let x = 10;
      let y = 10;
      let rot = 0;
      let ep = 100;
      let ek = 0;

      if (progress < durationFall) {
        const t = progress / durationFall;
        y = 10 + 100 * (t * t);
        ep = Math.round(100 - (t * t) * 100);
        ek = 100 - ep;
      } else if (progress < durationFall + durationRoll) {
        const t = (progress - durationFall) / durationRoll;
        y = 110;
        const easeOutT = t * (2 - t);
        x = 10 + 180 * easeOutT;
        rot = easeOutT * 720;
        ep = 0;
        ek = Math.round(100 * Math.max(0, 1 - t));
      } else {
        y = 110;
        x = 190;
        rot = 720;
        ep = 0;
        ek = 0;
      }

      setState({ x, y, rot, ep, ek });
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '140px', overflow: 'hidden', borderBottom: '2px solid var(--border)' }}>
      <div style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(255,255,255,0.8)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', zIndex: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div>Ep: {state.ep}%</div>
        <div>Ek: {state.ek}%</div>
      </div>
      <div style={{
        position: 'absolute',
        top: `${state.y}px`,
        left: `${state.x}px`,
        transform: `rotate(${state.rot}deg)`,
        width: '25px',
        height: '25px',
        background: 'radial-gradient(circle at 30% 30%, #ef4444, #991b1b)',
        borderRadius: '50%',
        boxShadow: 'inset -2px -2px 6px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          position: 'absolute', top: '5px', left: '12px', width: '4px', height: '4px', background: 'rgba(255,255,255,0.5)', borderRadius: '50%'
        }}></div>
      </div>
    </div>
  );
};

const EnergiExperiment = () => {
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

  // Jumlah Data State
  const [jumlahKinetik, setJumlahKinetik] = useState(3);
  const [jumlahPotensial, setJumlahPotensial] = useState(3);

  // Kinetik State
  const [pengamatanKinetik, setPengamatanKinetik] = useState([]);
  const [dataKinetik, setDataKinetik] = useState([]);

  // Potensial State
  const [pengamatanPotensial, setPengamatanPotensial] = useState([]);
  const [dataPotensial, setDataPotensial] = useState([]);

  // Initialization
  useEffect(() => {
    setPengamatanKinetik(Array.from({ length: Math.max(1, Math.min(15, jumlahKinetik)) }, (_, i) => ({ id: i + 1, massa: '', jarak: '', waktu: '', kecepatan: '' })));
    setDataKinetik(Array.from({ length: Math.max(1, Math.min(15, jumlahKinetik)) }, (_, i) => ({ id: i + 1, massa: '', jarak: '', waktu: '', kecepatan: '', ek: '' })));
  }, [jumlahKinetik]);

  useEffect(() => {
    setPengamatanPotensial(Array.from({ length: Math.max(1, Math.min(15, jumlahPotensial)) }, (_, i) => ({
      id: i + 1, massa: '', g: '10', kecepatan: '', ketinggian: ''
    })));
    setDataPotensial(Array.from({ length: Math.max(1, Math.min(15, jumlahPotensial)) }, (_, i) => ({ id: i + 1, massa: '', g: '10', kecepatan: '', ketinggian: '', ep: '' })));
  }, [jumlahPotensial]);

  // Simulation Kinetik
  const [simKinetikMass, setSimKinetikMass] = useState(2);
  const [simKinetikDistance, setSimKinetikDistance] = useState(10);
  const [simKinetikTime, setSimKinetikTime] = useState(2);
  const [isKinetikRunning, setIsKinetikRunning] = useState(false);
  const [kinetikPos, setKinetikPos] = useState(0);

  // Simulation Potensial
  const [simPotensialMass, setSimPotensialMass] = useState(2);
  const [simPotensialHeight, setSimPotensialHeight] = useState(10);
  const [isPotensialRunning, setIsPotensialRunning] = useState(false);
  const [potensialY, setPotensialY] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateTableData = (tableStateUpdater, id, field, value) => {
    tableStateUpdater(prev => prev.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const runKinetikSim = () => {
    setIsKinetikRunning(true);
    setKinetikPos(0);
    let start = null;
    const duration = simKinetikTime * 1000;
    const targetPos = 200; // max visual pixels

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      
      setKinetikPos(percent * targetPos);
      
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setIsKinetikRunning(false);
        // Auto Fill ALL ROWS
        const newData = [];
        const totalRows = Math.min(15, Math.max(1, jumlahKinetik));
        const stepDist = totalRows > 1 ? simKinetikDistance / (totalRows - 1) : simKinetikDistance;
        const stepTime = totalRows > 1 ? simKinetikTime / (totalRows - 1) : simKinetikTime;
        for (let i = 0; i < totalRows; i++) {
          const varDist = stepDist * i;
          const varTime = stepTime * i;
          const v = varDist === 0 ? "0.0" : (varDist / varTime).toFixed(1);
          newData.push({
            id: i + 1,
            massa: simKinetikMass,
            jarak: varDist.toFixed(1),
            waktu: varTime.toFixed(1),
            kecepatan: v
          });
        }
        setPengamatanKinetik(newData);
      }
    };
    requestAnimationFrame(step);
  };

  const runPotensialSim = () => {
    setIsPotensialRunning(true);
    setPotensialY(0);
    let currentY = 0;
    
    // Kalkulasi jarak jatuh agar tepat menyentuh lantai
    const canvasHeight = 300;
    const groundHeight = 20;
    const startTop = 10;
    const objectSize = 30 + (simPotensialMass * 2);
    const maxTop = canvasHeight - groundHeight - objectSize;
    const targetY = maxTop - startTop; // Jarak total yang harus ditempuh
    
    let velocity = 0;
    const gravity = 0.5; // abstract visual gravity
    
    const animate = () => {
      velocity += gravity;
      currentY += velocity;
      
      if (currentY < targetY) {
        setPotensialY(currentY);
        requestAnimationFrame(animate);
      } else {
        setPotensialY(targetY);
        setIsPotensialRunning(false);
        // Auto Fill ALL ROWS
        const newData = [];
        const g_real = 10;
        const totalRows = Math.min(15, Math.max(1, jumlahPotensial));
        const step = totalRows > 1 ? simPotensialHeight / (totalRows - 1) : simPotensialHeight;
        for (let i = 0; i < totalRows; i++) {
          const varHeight = step * i;
          const calcHeight = Math.max(0, simPotensialHeight - varHeight);
          const v_calc = varHeight === 0 ? "0.0" : Math.sqrt(2 * g_real * varHeight).toFixed(1);
          newData.push({
            id: i + 1,
            massa: simPotensialMass,
            g: g_real,
            ketinggian: calcHeight.toFixed(1),
            kecepatan: v_calc
          });
        }
        setPengamatanPotensial(newData);
      }
    };
    requestAnimationFrame(animate);
  };

  const exportPDF = () => {
    alert("Tips: Pada jendela cetak yang muncul, pastikan Anda memilih 'Save as PDF' (Simpan sebagai PDF) sebagai tujuan printer Anda untuk mengunduh laporan ini secara sempurna dan tidak terpotong.");
    window.print();
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)', fontSize: '2rem', textAlign: 'center' }}>Eksperimen: Energi Kinetik & Potensial</h1>
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
          <div style={{ background: 'rgba(251, 196, 116, 0.08)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--secondary)' }} className="print-avoid-break">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
              <div style={{ flex: '1 1 300px' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--primary)' }}>📖 Narasi Mengenai Fenomena yang Ada</h4>
                <div style={{ marginBottom: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <p style={{ lineHeight: '1.6', textAlign: 'justify', color: 'var(--text)' }}>
                    Sebuah bola jatuh dari ketinggian tertentu. Bola yang awalnya diam, kemudian mulai bergerak turun dengan kecepatan yang semakin cepat hingga menyentuh permukaan lantai. Setelah menyentuh lantai, bola tidak berhenti begitu saja, melainkan terus menggelinding ke arah depan. Namun, lama-kelamaan gerakan bola tersebut melambat hingga akhirnya berhenti.
                  </p>
                </div>

                <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--primary)' }}>📺 Materi Pengantar - Energi</h4>
                <p style={{ marginBottom: '0.75rem' }}>Energi adalah kemampuan untuk melakukan usaha. Ada dua bentuk energi yang akan kita pelajari:</p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}><strong>Energi Potensial (Ep):</strong> Energi yang dimiliki benda karena posisinya (ketinggian). Semakin tinggi benda, semakin besar energi potensialnya. Rumus: <code>Ep = m × g × h</code></li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>Energi Kinetik (Ek):</strong> Energi yang dimiliki benda karena gerakannya (kecepatan). Semakin cepat benda bergerak, semakin besar energi kinetiknya. Rumus: <code>Ek = ½ × m × v²</code></li>
                </ul>
                <p><strong>Hukum Kekekalan Energi:</strong> Energi tidak dapat diciptakan atau dimusnahkan, hanya berubah bentuk. <code>Ep + Ek = Konstan</code></p>
                
                {/* Pertanyaan Pemantik */}
                <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.9)', borderRadius: '8px', border: '1px solid var(--primary)' }} className="print-avoid-break">
                  <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Pertanyaan Pemantik:</h4>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: '1 1 200px', fontSize: '0.95rem', fontWeight: '500' }}>
                      1. Saat bola terjatuh dari ketinggian, bagaimana perubahan energi yang terjadi dari awal hingga bola mulai menggelinding? Jelaskan prosesnya menurut pengetahuanmu.
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                      <textarea name="jawabanPemantik1" value={formData.jawabanPemantik1} onChange={handleInputChange} className="input-field" placeholder="Tuliskan jawaban Anda di sini..." style={{ width: '100%', minHeight: '80px' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ flex: '1 1 200px', fontSize: '0.95rem', fontWeight: '500' }}>
                      2. Mengapa setelah menyentuh lantai, bola masih dapat menggelinding meskipun sudah tidak berada di ketinggian?
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
                  <img src="/gambar-energi.jpg" alt="Bola Jatuh" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
                  <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem', textAlign: 'center' }}>Fenomena Bola Jatuh</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <EnergyAnimation />
                  <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem', textAlign: 'center' }}>Jatuh (Potensial &rarr; Kinetik) lalu Menggelinding (Kinetik)</p>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* 3. Merumuskan Masalah */}
        <SectionCard title="3. Merumuskan Masalah" icon={<Lightbulb />} delay={0.3}>
          <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}><strong>Panduan Merumuskan Masalah:</strong><br/>Identifikasi variabel yang berubah dan yang dikontrol dalam percobaan. Selanjutnya, gunakan temuan tersebut untuk merumuskan pertanyaan penelitian yang dapat mengarahkan Anda dalam mengkaji bagaimana perubahan suatu variabel mempengaruhi energi sistem, serta bagaimana hubungan antar energi dapat dipahami selama proses berlangsung.</p>
          <textarea name="rumusanMasalah" value={formData.rumusanMasalah} onChange={handleInputChange} className="input-field" placeholder="Tuliskan rumusan masalah Anda..." style={{ width: '100%' }} />
        </SectionCard>

        {/* 4. Merumuskan Hipotesis */}
        <SectionCard title="4. Merumuskan Hipotesis" icon={<Beaker />} delay={0.4}>
          <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}><strong>Panduan Merumuskan Hipotesis:</strong><br/>Hipotesis adalah jawaban sementara atas rumusan masalah. Gunakan format:<br/>"Jika [variabel independen] meningkat, maka [variabel dependen] akan [naik/turun/berubah]"<br/>Contoh: "Jika ketinggian benda meningkat, maka energi potensial akan meningkat"</p>
          <textarea name="hipotesis" value={formData.hipotesis} onChange={handleInputChange} className="input-field" placeholder="Tuliskan hipotesis Anda..." style={{ width: '100%' }} />
        </SectionCard>

        {/* 5. Mengumpulkan Data Eksperimen */}
        <SectionCard title="5. Mengumpulkan Data Eksperimen" icon={<FileSpreadsheet />} delay={0.5}>          {/* SIMULASI KINETIK */}
          <div className="print-avoid-break" style={{ background: 'rgba(255,255,255,0.5)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--primary)' }}>A. Simulasi Energi Kinetik</h3>
            </div>
 
            <div className="simulation-container no-print">
              <div className="simulation-canvas" style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '20px' }}>
                {/* Lantai */}
                <div style={{ position: 'absolute', bottom: '0', width: '100%', height: '20px', background: '#9CA3AF' }}></div>
                {/* Mobil */}
                <div style={{
                  position: 'absolute', bottom: '20px', left: `${20 + kinetikPos}px`,
                  transition: isKinetikRunning ? 'none' : 'left 0.3s ease-out'
                }}>
                  <svg width={`${60 + (simKinetikMass * 2)}`} height={`${30 + (simKinetikMass)}`} viewBox="0 0 80 40" style={{ display: 'block' }}>
                    {/* Bodi Bawah Mobil */}
                    <rect x="0" y="15" width="80" height="15" fill="#3B82F6" rx="4" />
                    {/* Atap Mobil */}
                    <path d="M 15 15 L 25 5 L 55 5 L 65 15 Z" fill="#2563EB" />
                    {/* Jendela */}
                    <path d="M 28 7 L 40 7 L 40 15 L 20 15 Z" fill="#DBEAFE" />
                    <path d="M 43 7 L 52 7 L 60 15 L 43 15 Z" fill="#DBEAFE" />
                    {/* Roda Kiri */}
                    <circle cx="20" cy="32" r="8" fill="#111827" />
                    <circle cx="20" cy="32" r="3" fill="#D1D5DB" />
                    {/* Roda Kanan */}
                    <circle cx="60" cy="32" r="8" fill="#111827" />
                    <circle cx="60" cy="32" r="3" fill="#D1D5DB" />
                    {/* Teks Massa */}
                    <text x="40" y="26" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{simKinetikMass} kg</text>
                  </svg>
                </div>
              </div>
              <div className="simulation-controls">
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Massa Benda (kg)</label>
                  <input type="number" value={simKinetikMass} onChange={(e) => setSimKinetikMass(Number(e.target.value))} className="input-field" style={{ width: '90px' }} />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Total Jarak (m)</label>
                  <input type="number" value={simKinetikDistance} onChange={(e) => setSimKinetikDistance(Number(e.target.value))} className="input-field" style={{ width: '90px' }} />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Waktu (s)</label>
                  <input type="number" value={simKinetikTime} onChange={(e) => setSimKinetikTime(Number(e.target.value))} className="input-field" style={{ width: '90px' }} />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Jumlah Data</label>
                  <input type="number" min="1" max="15" value={jumlahKinetik} onChange={(e) => setJumlahKinetik(Number(e.target.value))} className="input-field" style={{ width: '90px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <button onClick={runKinetikSim} disabled={isKinetikRunning} className="btn btn-secondary">Mulai Simulasi</button>
                  <button onClick={() => {
                    setKinetikPos(0); setIsKinetikRunning(false);
                    setPengamatanKinetik(Array.from({ length: Math.max(1, Math.min(15, jumlahKinetik)) }, (_, i) => ({ id: i + 1, massa: '', jarak: '', waktu: '', kecepatan: '' })));
                  }} className="btn btn-outline">Reset</button>
                </div>
              </div>
            </div>
            
            <p className="no-print" style={{ marginTop: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '0.85rem' }}>
              Klik "Mulai Simulasi" untuk menghasilkan {jumlahKinetik} set data bervariasi ke tabel hasil pengamatan.
            </p>

            <h4 style={{ margin: '1rem 0' }}>Tabel Hasil Pengamatan Kinetik</h4>
            <div className="print-avoid-break" style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table>
                <thead>
                  <tr>
                    <th>No</th><th>Massa (Kg)</th><th>Jarak (m)</th><th>Waktu (s)</th><th>Kecepatan (m/s)</th>
                  </tr>
                </thead>
                <tbody>
                  {pengamatanKinetik.map(row => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td><input type="number" value={row.massa} onChange={(e) => updateTableData(setPengamatanKinetik, row.id, 'massa', e.target.value)} className="input-field" style={{width:'100%', padding:'0.5rem'}} /></td>
                      <td><input type="number" value={row.jarak} onChange={(e) => updateTableData(setPengamatanKinetik, row.id, 'jarak', e.target.value)} className="input-field" style={{width:'100%', padding:'0.5rem'}} /></td>
                      <td><input type="number" value={row.waktu} onChange={(e) => updateTableData(setPengamatanKinetik, row.id, 'waktu', e.target.value)} className="input-field" style={{width:'100%', padding:'0.5rem'}} /></td>
                      <td><input type="number" value={row.kecepatan} onChange={(e) => updateTableData(setPengamatanKinetik, row.id, 'kecepatan', e.target.value)} className="input-field" style={{width:'100%', padding:'0.5rem'}} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 style={{ margin: '1rem 0' }}>Tabel Data Kinetik</h4>
            <div className="print-avoid-break" style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>No</th><th>Massa (Kg)</th><th>Jarak (m)</th><th>Waktu (s)</th><th>Kecepatan (m/s)</th><th>Ek (J)</th>
                  </tr>
                </thead>
                <tbody>
                  {dataKinetik.map(row => {
                    const dist = parseFloat(row.jarak);
                    const time = parseFloat(row.waktu);
                    const m = parseFloat(row.massa);
                    const v = parseFloat(row.kecepatan);
                    const ek = parseFloat(row.ek);

                    const refRow = pengamatanKinetik.find(p => p.id === row.id) || {};
                    const refM = parseFloat(refRow.massa);
                    const refDist = parseFloat(refRow.jarak);
                    const refTime = parseFloat(refRow.waktu);
                    const refV = parseFloat(refRow.kecepatan);

                    const isMValid = !isNaN(m) && !isNaN(refM) && Math.abs(m - refM) < 0.01;
                    const isDistValid = !isNaN(dist) && !isNaN(refDist) && Math.abs(dist - refDist) < 0.01;
                    const isTimeValid = !isNaN(time) && !isNaN(refTime) && Math.abs(time - refTime) < 0.01;

                    const expectedV = (!isNaN(dist) && !isNaN(time) && time > 0) ? (dist / time) : 0;
                    const expectedEk1 = !isNaN(m) && !isNaN(v) ? 0.5 * m * v * v : NaN;
                    const expectedEk2 = !isNaN(m) && !isNaN(expectedV) ? 0.5 * m * expectedV * expectedV : NaN;

                    const isVValid = !isNaN(v) && Math.abs(v - expectedV) < 0.15;
                    const hintV = expectedV.toFixed(1);

                    const isEkValid = !isNaN(ek) && ((!isNaN(expectedEk1) && Math.abs(ek - expectedEk1) < 0.5) || (!isNaN(expectedEk2) && Math.abs(ek - expectedEk2) < 0.5));
                    const hintEk = !isNaN(expectedEk1) ? expectedEk1.toFixed(1) : (!isNaN(expectedEk2) ? expectedEk2.toFixed(1) : '-');

                    return (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>
                          <ValidatedInput
                            value={row.massa}
                            isValid={isMValid}
                            correctHint={!isNaN(refM) ? refM.toFixed(1) : '-'}
                            onChange={(e) => updateTableData(setDataKinetik, row.id, 'massa', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.jarak}
                            isValid={isDistValid}
                            correctHint={!isNaN(refDist) ? refDist.toFixed(1) : '-'}
                            onChange={(e) => updateTableData(setDataKinetik, row.id, 'jarak', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.waktu}
                            isValid={isTimeValid}
                            correctHint={!isNaN(refTime) ? refTime.toFixed(1) : '-'}
                            onChange={(e) => updateTableData(setDataKinetik, row.id, 'waktu', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.kecepatan}
                            isValid={isVValid}
                            correctHint={hintV}
                            onChange={(e) => updateTableData(setDataKinetik, row.id, 'kecepatan', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.ek}
                            isValid={isEkValid}
                            correctHint={hintEk}
                            onChange={(e) => updateTableData(setDataKinetik, row.id, 'ek', e.target.value)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* SIMULASI POTENSIAL */}
          <div className="print-avoid-break" style={{ background: 'rgba(255,255,255,0.5)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--primary)' }}>B. Simulasi Energi Potensial</h3>
            </div>
 
            <div className="simulation-container no-print">
              <div className="simulation-canvas" style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  position: 'absolute', top: `${10 + potensialY}px`,
                  width: `${30 + (simPotensialMass * 2)}px`, height: `${30 + (simPotensialMass * 2)}px`,
                  background: '#EF4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px',
                  zIndex: 10,
                  border: '2px solid #991b1b'
                }}>Benda</div>
                <div style={{ position: 'absolute', bottom: '0', width: '100%', height: '20px', background: '#9CA3AF' }}></div>
              </div>
              <div className="simulation-controls">
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Massa Benda (kg)</label>
                  <input type="number" value={simPotensialMass} onChange={(e) => setSimPotensialMass(Number(e.target.value))} className="input-field" style={{ width: '90px' }} />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Ketinggian (m)</label>
                  <input type="number" value={simPotensialHeight} onChange={(e) => setSimPotensialHeight(Number(e.target.value))} className="input-field" style={{ width: '90px' }} />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Gravitasi (m/s²)</label>
                  <input type="number" value={10} readOnly className="input-field" style={{ width: '90px', background: '#f3f4f6' }} />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label">Jumlah Data</label>
                  <input type="number" min="1" max="15" value={jumlahPotensial} onChange={(e) => setJumlahPotensial(Number(e.target.value))} className="input-field" style={{ width: '90px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <button onClick={runPotensialSim} disabled={isPotensialRunning} className="btn btn-secondary">Jatuhkan Benda</button>
                  <button onClick={() => {
                    setPotensialY(0); setIsPotensialRunning(false);
                    setPengamatanPotensial(Array.from({ length: Math.max(1, Math.min(15, jumlahPotensial)) }, (_, i) => ({ id: i + 1, massa: '', g: '10', kecepatan: '', ketinggian: '' })));
                  }} className="btn btn-outline">Reset</button>
                </div>
              </div>
            </div>
            
            <p className="no-print" style={{ marginTop: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary)', fontSize: '0.85rem' }}>
              Klik "Jatuhkan Benda" untuk menghasilkan {jumlahPotensial} set data bervariasi ke tabel hasil pengamatan.
            </p>

            <h4 style={{ margin: '1rem 0' }}>Tabel Hasil Pengamatan Potensial</h4>
            <div className="print-avoid-break" style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table>
                <thead>
                  <tr>
                    <th>No</th><th>Massa (Kg)</th><th>g (m/s^2)</th><th>Ketinggian (m)</th><th>Kecepatan (m/s)</th>
                  </tr>
                </thead>
                <tbody>
                  {pengamatanPotensial.map(row => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td><input type="number" value={row.massa} onChange={(e) => updateTableData(setPengamatanPotensial, row.id, 'massa', e.target.value)} className="input-field" style={{width:'100%', padding:'0.5rem'}} /></td>
                      <td><input type="number" value={row.g} onChange={(e) => updateTableData(setPengamatanPotensial, row.id, 'g', e.target.value)} className="input-field" style={{width:'100%', padding:'0.5rem'}} /></td>
                      <td><input type="number" value={row.ketinggian} onChange={(e) => updateTableData(setPengamatanPotensial, row.id, 'ketinggian', e.target.value)} className="input-field" style={{width:'100%', padding:'0.5rem'}} /></td>
                      <td><input type="number" value={row.kecepatan} onChange={(e) => updateTableData(setPengamatanPotensial, row.id, 'kecepatan', e.target.value)} className="input-field" style={{width:'100%', padding:'0.5rem'}} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 style={{ margin: '1rem 0' }}>Tabel Data Potensial</h4>
            <div className="print-avoid-break" style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>No</th><th>Massa (Kg)</th><th>g (m/s^2)</th><th>Kecepatan (m/s)</th><th>Ketinggian (m)</th><th>Ep (J)</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPotensial.map(row => {
                    const m = parseFloat(row.massa);
                    const g = parseFloat(row.g);
                    const h_current = parseFloat(row.ketinggian);
                    const v = parseFloat(row.kecepatan);
                    const ep = parseFloat(row.ep);

                    const refRow = pengamatanPotensial.find(p => p.id === row.id) || {};
                    const refM = parseFloat(refRow.massa);
                    const refG = parseFloat(refRow.g);
                    const refH = parseFloat(refRow.ketinggian);
                    const refV = parseFloat(refRow.kecepatan);

                    const isMValid = !isNaN(m) && !isNaN(refM) && Math.abs(m - refM) < 0.01;
                    const isGValid = !isNaN(g) && !isNaN(refG) && Math.abs(g - refG) < 0.01;
                    const isHValid = !isNaN(h_current) && !isNaN(refH) && Math.abs(h_current - refH) < 0.01;

                    const h_initial = simPotensialHeight;
                    const fallenHeight = h_initial - h_current;
                    const expectedV = (!isNaN(fallenHeight) && fallenHeight >= 0 && !isNaN(g)) ? Math.sqrt(2 * g * fallenHeight) : 0;
                    const expectedEp = !isNaN(m) && !isNaN(g) && !isNaN(h_current) ? m * g * h_current : NaN;

                    const isVValid = !isNaN(v) && Math.abs(v - expectedV) < 0.25;
                    const hintV = expectedV.toFixed(1);

                    const isEpValid = !isNaN(ep) && !isNaN(expectedEp) && Math.abs(ep - expectedEp) < 0.5;
                    const hintEp = !isNaN(expectedEp) ? expectedEp.toFixed(1) : '-';

                    return (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>
                          <ValidatedInput
                            value={row.massa}
                            isValid={isMValid}
                            correctHint={!isNaN(refM) ? refM.toFixed(1) : '-'}
                            onChange={(e) => updateTableData(setDataPotensial, row.id, 'massa', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.g}
                            isValid={isGValid}
                            correctHint={!isNaN(refG) ? refG.toFixed(1) : '-'}
                            onChange={(e) => updateTableData(setDataPotensial, row.id, 'g', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.kecepatan}
                            isValid={isVValid}
                            correctHint={hintV}
                            onChange={(e) => updateTableData(setDataPotensial, row.id, 'kecepatan', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.ketinggian}
                            isValid={isHValid}
                            correctHint={!isNaN(refH) ? refH.toFixed(1) : '-'}
                            onChange={(e) => updateTableData(setDataPotensial, row.id, 'ketinggian', e.target.value)}
                          />
                        </td>
                        <td>
                          <ValidatedInput
                            value={row.ep}
                            isValid={isEpValid}
                            correctHint={hintEp}
                            onChange={(e) => updateTableData(setDataPotensial, row.id, 'ep', e.target.value)}
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
              1. Bagaimana hubungan antara massa benda dengan energi kinetik yang dihasilkan saat bergerak? Jelaskan berdasarkan hasil percobaan.
            </label>
            <textarea name="analisis1" value={formData.analisis1} onChange={handleInputChange} className="input-field" style={{ minHeight: '80px' }} />
          </div>
          
          <div className="input-group print-avoid-break" style={{ marginTop: '1.5rem' }}>
            <label className="input-label" style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>
              2. Apa pengaruh ketinggian terhadap energi potensial benda? Analisis hubungan tersebut menggunakan data praktikum.
            </label>
            <textarea name="analisis2" value={formData.analisis2} onChange={handleInputChange} className="input-field" style={{ minHeight: '80px' }} />
          </div>

          <div className="input-group print-avoid-break" style={{ marginTop: '1.5rem' }}>
            <label className="input-label" style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>
              3. Apakah energi mekanik (jumlah energi kinetik dan potensial) selalu konstan dalam percobaan? Jelaskan berdasarkan hasil pengamatan.
            </label>
            <textarea name="analisis3" value={formData.analisis3} onChange={handleInputChange} className="input-field" style={{ minHeight: '80px' }} />
          </div>

          <div className="input-group print-avoid-break" style={{ marginTop: '1.5rem' }}>
            <label className="input-label" style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>
              4. Berdasarkan data praktikum yang telah kamu peroleh, apakah hasil perhitungan usaha sesuai dengan perubahan energi yang terjadi pada benda? Jelaskan kemungkinan penyebab jika terdapat perbedaan.
            </label>
            <textarea name="analisis4" value={formData.analisis4} onChange={handleInputChange} className="input-field" style={{ minHeight: '80px' }} />
          </div>
        </SectionCard>

        {/* 7. Kesimpulan */}
        <SectionCard title="7. Kesimpulan" icon={<CheckCircle />} delay={0.7}>
          <div className="print-avoid-break">
            <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}><strong>Panduan Menulis Kesimpulan:</strong><br/>Apakah hipotesis Anda terbukti atau tidak terbukti? Jelaskan!<br/>Apa yang dapat disimpulkan tentang hubungan antara variabel yang diteliti?<br/>Apakah hukum kekekalan energi berlaku dalam eksperimen ini?<br/>Apa implikasi atau aplikasi hasil penelitian ini dalam kehidupan sehari-hari?</p>
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

export default EnergiExperiment;
