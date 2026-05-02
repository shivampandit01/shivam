:root {
    --bg-color: #030303;
    --text-primary: #ffffff;
    --text-secondary: #8a8a9d;
    --accent: #00ffcc;
    --accent-glow: rgba(0, 255, 204, 0.4);
    --glass-bg: rgba(10, 10, 15, 0.6);
    --glass-border: rgba(255, 255, 255, 0.08);
}

* { box-sizing: border-box; }

body {
    font-family: 'Space Grotesk', sans-serif;
    margin: 0; padding: 0;
    background-color: var(--bg-color);
    color: var(--text-primary);
    overflow-x: hidden;
    cursor: none;
}

/* Preloader */
.preloader { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #000; z-index: 99999; display: flex; align-items: center; justify-content: center; }
.preloader-content { text-align: center; width: 300px; }
.loading-text { font-family: 'Syncopate', sans-serif; font-size: 1rem; color: var(--accent); letter-spacing: 4px; margin-bottom: 20px;}
.counter { font-family: 'Space Grotesk', sans-serif; font-size: 3rem; font-weight: 700; margin-bottom: 20px; }
.progress-bar { width: 100%; height: 2px; background: #222; }
.progress { width: 0%; height: 100%; background: var(--accent); box-shadow: 0 0 10px var(--accent); }

/* Scanlines */
.scanlines { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)); background-size: 100% 4px, 3px 100%; z-index: -1; pointer-events: none; }

/* Cursor */
.cursor-dot { width: 4px; height: 4px; background-color: var(--accent); border-radius: 50%; position: fixed; transform: translate(-50%, -50%); pointer-events: none; z-index: 9999; box-shadow: 0 0 10px var(--accent); }
.cursor-outline { width: 30px; height: 30px; border: 1px solid rgba(255,255,255,0.5); border-radius: 50%; position: fixed; transform: translate(-50%, -50%); pointer-events: none; z-index: 9998; transition: width 0.2s, height 0.2s, border-color 0.2s; }

#canvas-container { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -2; }
.main-wrapper { position: relative; z-index: 1; opacity: 0; }
section { min-height: 100vh; padding: 100px 5vw; display: flex; flex-direction: column; justify-content: center; pointer-events: none; }
.video-thumbnail, .cyber-btn, .modal-content, .close-btn { pointer-events: auto; }

/* Hero */
.hero-content { display: flex; flex-direction: column; align-items: flex-start; }
.reveal-text { overflow: hidden; }
h1 { font-family: 'Syncopate', sans-serif; font-size: clamp(3.5rem, 9vw, 8rem); line-height: 1.1; margin: 0; text-transform: uppercase; letter-spacing: -2px; }
.outline-text { color: transparent; -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3); }
.solid-text { color: var(--text-primary); }
.glow-text { text-shadow: 0 0 40px rgba(0, 255, 204, 0.3); }
.hero-subtitle { font-size: clamp(1rem, 2vw, 1.2rem); color: var(--accent); margin-top: 20px; text-transform: uppercase; letter-spacing: 5px; font-weight: 700; }

.scroll-indicator { position: absolute; bottom: 50px; left: 5vw; display: flex; align-items: center; gap: 15px; color: var(--text-secondary); text-transform: uppercase; font-size: 0.7rem; letter-spacing: 2px; }
.mouse { width: 25px; height: 40px; border: 2px solid var(--text-secondary); border-radius: 20px; position: relative; }
.wheel { width: 4px; height: 8px; background: var(--text-primary); border-radius: 2px; position: absolute; top: 6px; left: 50%; transform: translateX(-50%); animation: scroll 1.5s infinite; }
@keyframes scroll { 0% { top: 6px; opacity: 1; } 100% { top: 20px; opacity: 0; } }

/* Marquee */
.marquee-container { width: 100vw; overflow: hidden; background: var(--accent); color: #000; padding: 15px 0; position: relative; z-index: 1; transform: rotate(-2deg); margin: 50px 0; }
.marquee-text { display: flex; white-space: nowrap; font-family: 'Syncopate', sans-serif; font-weight: 900; font-size: 1.5rem; text-transform: uppercase; letter-spacing: 2px; animation: marquee 15s linear infinite; }
.marquee-text span { margin: 0 30px; }
@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

/* Work Section */
.section-header { margin-bottom: 60px; }
.section-title { font-family: 'Syncopate', sans-serif; font-size: clamp(2rem, 4vw, 3rem); text-transform: uppercase; margin: 0; }
.section-desc { color: var(--text-secondary); font-size: 1.1rem; margin-top: 10px; }

/* FULL COLOR VIDEO CARDS */
.video-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 40px; }
.video-thumbnail { position: relative; border-radius: 8px; overflow: hidden; background: #111; border: 1px solid var(--glass-border); transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1); cursor: none; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
/* Grayscale removed, opacity set to 1 */
.video-thumbnail img { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; transition: transform 0.7s ease; opacity: 1; }
.video-thumbnail:hover { transform: translateY(-10px) scale(1.02); border-color: var(--accent); box-shadow: 0 15px 40px var(--accent-glow); }
.video-thumbnail:hover img { transform: scale(1.1); }

.video-info { position: absolute; bottom: 0; left: 0; width: 100%; padding: 30px 20px 20px; background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%); transform: translateY(20px); opacity: 0; transition: all 0.4s ease; }
.video-thumbnail:hover .video-info { transform: translateY(0); opacity: 1; }
.video-info p { margin: 0; font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: var(--text-primary); font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; }

/* About & Contact */
.glass-card { background: var(--glass-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--glass-border); padding: 60px; border-radius: 12px; max-width: 900px; pointer-events: auto; }
.about-content p { font-size: 1.2rem; line-height: 1.8; color: #cfcfd6; margin-bottom: 20px; }
.contact-section { text-align: center; align-items: center; }
.massive-text { font-family: 'Syncopate', sans-serif; font-size: clamp(3rem, 6vw, 6rem); line-height: 1.1; margin-bottom: 50px; font-weight: 900; }
.accent-text { color: var(--accent); text-shadow: 0 0 30px var(--accent-glow); }

.contact-links { display: flex; gap: 30px; justify-content: center; flex-wrap: wrap; }
.cyber-btn { position: relative; padding: 20px 40px; font-family: 'Syncopate', sans-serif; font-size: 0.9rem; font-weight: 700; text-transform: uppercase; text-decoration: none; letter-spacing: 2px; border: 1px solid var(--text-primary); color: var(--text-primary); overflow: hidden; transition: all 0.3s ease; background: transparent; }
.cyber-btn::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--accent); transform: scaleX(0); transform-origin: right; transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); z-index: -1; }
.cyber-btn:hover { border-color: var(--accent); color: #000; box-shadow: 0 0 20px var(--accent-glow); }
.cyber-btn:hover::before { transform: scaleX(1); transform-origin: left; }

/* Video Modal */
.modal { display: none; position: fixed; z-index: 10000; left: 0; top: 0; width: 100vw; height: 100vh; align-items: center; justify-content: center; }
.modal-backdrop { position: absolute; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.95); backdrop-filter: blur(15px); }
.modal-content { position: relative; width: 90%; max-width: 1200px; background: #000; border: 1px solid var(--accent); border-radius: 8px; overflow: hidden; box-shadow: 0 0 50px rgba(0, 255, 204, 0.2); z-index: 10001; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 15px 25px; border-bottom: 1px solid rgba(255,255,255,0.1); }
.video-title-display { font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 2px; font-size: 0.9rem; }
.close-btn { color: #fff; font-size: 28px; cursor: pointer; transition: color 0.3s; }
.close-btn:hover { color: var(--accent); }
.iframe-container { position: relative; width: 100%; padding-bottom: 56.25%; }
#youtube-player { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
