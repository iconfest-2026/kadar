import React, { useState, useEffect, useRef } from 'react';

// Web Audio API Synthesizer (No external asset files needed, zero lag, reliable everywhere)
class SoundFx {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playJump() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            const now = this.ctx.currentTime;
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(540, now + 0.15);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.15);
        } catch (e) {}
    }

    playCollect() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            [659.25, 880, 1046.5].forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + i * 0.04);
                gain.gain.setValueAtTime(0.15, now + i * 0.04);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.12);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + i * 0.04);
                osc.stop(now + i * 0.04 + 0.12);
            });
        } catch (e) {}
    }

    playHazard() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.exponentialRampToValueAtTime(60, now + 0.25);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.25);
        } catch (e) {}
    }

    playPowerup() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            [440, 554.37, 659.25, 880].forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + i * 0.06);
                gain.gain.setValueAtTime(0.2, now + i * 0.06);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.06 + 0.2);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + i * 0.06);
                osc.stop(now + i * 0.06 + 0.2);
            });
        } catch (e) {}
    }

    playGameOver() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            [392, 349.23, 311.13, 261.63].forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, now + i * 0.12);
                gain.gain.setValueAtTime(0.2, now + i * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.25);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + i * 0.12);
                osc.stop(now + i * 0.12 + 0.25);
            });
        } catch (e) {}
    }
}

const sfx = new SoundFx();

export default function MetabolicRunner2D() {
    const canvasRef = useRef(null);
    const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'gameover'
    const [selectedChar, setSelectedChar] = useState('dimas');
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [highScore, setHighScore] = useState(() => {
        return parseInt(localStorage.getItem('aevyra_runner_highscore') || '0', 10);
    });

    // Run Stats
    const [finalStats, setFinalStats] = useState({
        score: 0,
        distance: 0,
        fiberCollected: 0,
        peakGlucose: 95,
        tir: 100,
        character: 'Dimas Aryo',
    });

    // Character Profiles
    const characters = {
        dimas: {
            id: 'dimas',
            name: 'Dimas Aryo',
            role: 'Product Manager',
            color: '#1b8b6a',
            accent: '#82d6b3',
            trait: 'Stamina Stabil',
            desc: 'Daya tahan standar, pemulihan hidrasi cepat',
            jumpPower: 13,
            maxJumps: 1,
            speedMod: 1.0,
            avatar: '🏃‍♂️',
        },
        sarah: {
            id: 'sarah',
            name: 'Sarah Nindya',
            role: 'UI Designer',
            color: '#0e7490',
            accent: '#67e8f9',
            trait: 'Double Jump & Fiber Multiplier',
            desc: 'Dapat lompat dua kali dan +50% poin dari serat sayuran',
            jumpPower: 11.5,
            maxJumps: 2,
            speedMod: 1.05,
            avatar: '🏃‍♀️',
        },
        bramantyo: {
            id: 'bramantyo',
            name: 'dr. Bramantyo, Sp.PD',
            role: 'Dokter Spesialis',
            color: '#b45309',
            accent: '#fcd34d',
            trait: 'Tameng Insulin & Resisten Lonjakan',
            desc: 'Mulai dengan pelindung insulin aktif dan lonjakan glukosa 30% lebih lambat',
            jumpPower: 12,
            maxJumps: 1,
            speedMod: 0.95,
            avatar: '👨‍⚕️',
        },
    };

    // Toggle Sound
    const toggleSound = () => {
        setSoundEnabled(!soundEnabled);
        sfx.muted = soundEnabled;
        if (!soundEnabled) sfx.init();
    };

    // Game Loop Ref
    const gameLoopRef = useRef(null);
    const gameEngineRef = useRef(null);

    // Start Game Function
    const startGame = (charKey) => {
        const char = characters[charKey || selectedChar];
        setGameState('playing');
        sfx.init();

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Init Game Engine
        const engine = {
            width: 800,
            height: 380,
            groundY: 300,
            speed: 5.5 * char.speedMod,
            distance: 0,
            score: 0,
            combo: 0,
            glucose: 90, // mg/dL
            peakGlucose: 90,
            inRangeTicks: 0,
            totalTicks: 0,
            fiberCount: 0,
            lives: 3,
            shieldTimer: char.id === 'bramantyo' ? 400 : 0, // dr. Bramantyo starts with shield
            char: char,

            // Player State
            player: {
                x: 90,
                y: 240,
                w: 36,
                h: 60,
                vy: 0,
                isGrounded: true,
                isSliding: false,
                slideTimer: 0,
                jumpCount: 0,
                animTimer: 0,
            },

            // Entities
            obstacles: [],
            collectibles: [],
            particles: [],
            floatingTexts: [],
            spawnTimer: 0,

            // Parallax layers
            clouds: [
                { x: 50, y: 40, s: 0.3, w: 70 },
                { x: 300, y: 70, s: 0.5, w: 90 },
                { x: 620, y: 35, s: 0.4, w: 110 },
            ],
            cityTrees: [
                { x: 0, w: 40 },
                { x: 180, w: 50 },
                { x: 370, w: 45 },
                { x: 560, w: 60 },
                { x: 740, w: 40 },
            ],
        };

        gameEngineRef.current = engine;

        // Setup Canvas Resolution
        canvas.width = engine.width;
        canvas.height = engine.height;

        let lastTime = performance.now();

        const loop = (now) => {
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;

            updateGame(engine, dt);
            renderGame(canvas, engine);

            if (engine.lives > 0 && engine.glucose < 260) {
                gameLoopRef.current = requestAnimationFrame(loop);
            } else {
                // Game Over
                sfx.playGameOver();
                const finalTir = Math.max(
                    15,
                    Math.round((engine.inRangeTicks / Math.max(1, engine.totalTicks)) * 100)
                );
                const stats = {
                    score: Math.floor(engine.score),
                    distance: Math.floor(engine.distance),
                    fiberCollected: engine.fiberCount,
                    peakGlucose: Math.round(engine.peakGlucose),
                    tir: finalTir,
                    character: char.name,
                };
                setFinalStats(stats);
                if (stats.score > highScore) {
                    setHighScore(stats.score);
                    localStorage.setItem('aevyra_runner_highscore', stats.score.toString());
                }
                setGameState('gameover');
            }
        };

        gameLoopRef.current = requestAnimationFrame(loop);
    };

    // User Input Handling
    const handleJump = () => {
        const engine = gameEngineRef.current;
        if (!engine || gameState !== 'playing') return;

        const p = engine.player;
        if (p.isGrounded) {
            p.vy = -engine.char.jumpPower;
            p.isGrounded = false;
            p.jumpCount = 1;
            p.isSliding = false;
            sfx.playJump();
            createDust(engine, p.x + p.w / 2, engine.groundY, 8);
        } else if (p.jumpCount < engine.char.maxJumps) {
            p.vy = -engine.char.jumpPower * 0.92;
            p.jumpCount += 1;
            sfx.playJump();
            createSparkle(engine, p.x + p.w / 2, p.y + p.h, '#67e8f9', 6);
        }
    };

    const handleSlide = () => {
        const engine = gameEngineRef.current;
        if (!engine || gameState !== 'playing') return;

        const p = engine.player;
        if (p.isGrounded && !p.isSliding) {
            p.isSliding = true;
            p.slideTimer = 35; // ~0.6s
            p.h = 32;
            p.y = engine.groundY - 32;
            createDust(engine, p.x + p.w / 2, engine.groundY, 6);
        }
    };

    // Listen to Arrow Keys & Space
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
                e.preventDefault();
                if (gameState === 'playing') {
                    handleJump();
                } else if (gameState === 'menu' || gameState === 'gameover') {
                    startGame();
                }
            } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
                e.preventDefault();
                if (gameState === 'playing') {
                    handleSlide();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState, selectedChar]);

    // Cleanup Game Loop on Unmount
    useEffect(() => {
        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
        };
    }, []);

    // Particle Creators
    const createDust = (engine, x, y, count) => {
        for (let i = 0; i < count; i++) {
            engine.particles.push({
                x: x + (Math.random() - 0.5) * 15,
                y: y - Math.random() * 6,
                vx: -Math.random() * 3 - 1,
                vy: (Math.random() - 0.5) * 2,
                r: Math.random() * 3 + 1.5,
                color: 'rgba(180, 205, 195, 0.7)',
                life: 1.0,
            });
        }
    };

    const createSparkle = (engine, x, y, color, count) => {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = Math.random() * 4 + 1.5;
            engine.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                r: Math.random() * 3.5 + 2,
                color: color || '#82d6b3',
                life: 1.0,
            });
        }
    };

    const addFloatingText = (engine, text, x, y, color) => {
        engine.floatingTexts.push({
            text,
            x,
            y,
            vy: -1.8,
            color: color || '#1b8b6a',
            life: 1.0,
        });
    };

    // Game Update Step
    const updateGame = (engine, dt) => {
        // Increase speed slightly with distance
        engine.distance += engine.speed * dt * 3.5;
        engine.speed = Math.min(11, (5.5 + engine.distance * 0.003) * engine.char.speedMod);
        engine.score += engine.speed * 0.2;

        engine.totalTicks++;
        if (engine.glucose >= 70 && engine.glucose <= 130) {
            engine.inRangeTicks++;
        }

        // Shield Timer
        if (engine.shieldTimer > 0) {
            engine.shieldTimer--;
        }

        // Natural metabolic glucose metabolism (drifts gently toward baseline 90)
        if (engine.glucose > 90) {
            engine.glucose -= 0.035;
        } else if (engine.glucose < 90) {
            engine.glucose += 0.02;
        }

        // Player Physics
        const p = engine.player;
        p.animTimer += dt * 10;

        // Slide countdown
        if (p.isSliding) {
            p.slideTimer--;
            if (p.slideTimer <= 0) {
                p.isSliding = false;
                p.h = 60;
                p.y = engine.groundY - 60;
            }
        }

        // Gravity
        p.vy += 0.58; // Gravity constant
        p.y += p.vy;

        if (p.y + p.h >= engine.groundY) {
            p.y = engine.groundY - p.h;
            p.vy = 0;
            if (!p.isGrounded) {
                p.isGrounded = true;
                p.jumpCount = 0;
                createDust(engine, p.x + p.w / 2, engine.groundY, 4);
            }
        }

        // Parallax Movement
        engine.clouds.forEach((c) => {
            c.x -= engine.speed * c.s * 0.35;
            if (c.x + c.w < 0) c.x = engine.width + Math.random() * 50;
        });

        engine.cityTrees.forEach((t) => {
            t.x -= engine.speed * 0.75;
            if (t.x + t.w < 0) t.x = engine.width + Math.random() * 80;
        });

        // Spawn Entities
        engine.spawnTimer++;
        if (engine.spawnTimer > Math.max(48, 90 - engine.distance * 0.03)) {
            engine.spawnTimer = 0;
            const isHazard = Math.random() > 0.42;

            if (isHazard) {
                // Hazard Types
                const types = [
                    { name: 'Donat Manis', h: 36, w: 36, yOffset: 0, sugar: +28, icon: '🍩' },
                    { name: 'Gelas Boba Aren', h: 54, w: 34, yOffset: 0, sugar: +35, icon: '🧋' },
                    { name: 'Soda Kemasan', h: 32, w: 26, yOffset: 45, sugar: +30, icon: '🥤' }, // floating soda (slide under!)
                    { name: 'Gorengan Trans-Fat', h: 30, w: 34, yOffset: 0, sugar: +22, icon: '🍟' },
                ];
                const hType = types[Math.floor(Math.random() * types.length)];
                engine.obstacles.push({
                    x: engine.width + 20,
                    y: engine.groundY - hType.h - hType.yOffset,
                    w: hType.w,
                    h: hType.h,
                    type: hType,
                });
            } else {
                // Collectibles
                const healthyTypes = [
                    { name: 'Brokoli Serat', pts: 100, sugarMod: -15, type: 'fiber', icon: '🥦', color: '#10b981' },
                    { name: 'Air Hidrasi', pts: 70, sugarMod: -8, type: 'water', icon: '💧', color: '#06b6d4' },
                    { name: 'Beri Antioksidan', pts: 120, sugarMod: -12, type: 'berry', icon: '🫐', color: '#a855f7' },
                    { name: 'Tameng Insulin', pts: 150, sugarMod: -20, type: 'shield', icon: '🛡️', color: '#eab308' },
                ];
                const cType = healthyTypes[Math.floor(Math.random() * healthyTypes.length)];
                const isAirborne = Math.random() > 0.5;
                const cHeight = 32;
                engine.collectibles.push({
                    x: engine.width + 20,
                    y: engine.groundY - cHeight - (isAirborne ? 55 : 12),
                    w: 32,
                    h: cHeight,
                    type: cType,
                    bounce: 0,
                });
            }
        }

        // Update Obstacles
        for (let i = engine.obstacles.length - 1; i >= 0; i--) {
            const obs = engine.obstacles[i];
            obs.x -= engine.speed;

            // Collision check
            if (
                p.x < obs.x + obs.w &&
                p.x + p.w > obs.x &&
                p.y < obs.y + obs.h &&
                p.y + p.h > obs.y
            ) {
                // Collided!
                if (engine.shieldTimer > 0) {
                    // Shield protected!
                    sfx.playPowerup();
                    addFloatingText(engine, '🛡️ TERLINDUNGI!', obs.x, obs.y - 10, '#eab308');
                    createSparkle(engine, obs.x, obs.y, '#facc15', 12);
                    engine.obstacles.splice(i, 1);
                    continue;
                }

                // Takes Hit
                sfx.playHazard();
                engine.lives--;
                engine.combo = 0;
                engine.glucose += obs.type.sugar;
                if (engine.glucose > engine.peakGlucose) engine.peakGlucose = engine.glucose;

                addFloatingText(engine, `⚠️ ${obs.type.name} (+${obs.type.sugar} mg/dL)`, p.x, p.y - 15, '#e11d48');
                createSparkle(engine, p.x + p.w / 2, p.y + p.h / 2, '#f43f5e', 14);
                engine.obstacles.splice(i, 1);
                continue;
            }

            // Remove off-screen
            if (obs.x + obs.w < -20) {
                engine.obstacles.splice(i, 1);
            }
        }

        // Update Collectibles
        for (let i = engine.collectibles.length - 1; i >= 0; i--) {
            const item = engine.collectibles[i];
            item.x -= engine.speed;
            item.bounce += 0.08;

            // Magnet effect if shield is active
            if (engine.shieldTimer > 0 && Math.abs(p.x - item.x) < 180) {
                item.x += (p.x - item.x) * 0.12;
                item.y += (p.y - item.y) * 0.12;
            }

            // Collision
            if (
                p.x < item.x + item.w &&
                p.x + p.w > item.x &&
                p.y < item.y + item.h &&
                p.y + p.h > item.y
            ) {
                sfx.playCollect();
                engine.combo++;

                let earnedPts = item.type.pts * (1 + (engine.combo - 1) * 0.2);
                if (engine.char.id === 'sarah' && item.type.type === 'fiber') {
                    earnedPts *= 1.5; // Sarah trait
                }
                engine.score += earnedPts;

                if (item.type.type === 'fiber') engine.fiberCount++;
                if (item.type.type === 'shield') {
                    engine.shieldTimer = 350; // ~6 seconds
                    sfx.playPowerup();
                }

                // Modulate Glucose safely down
                engine.glucose = Math.max(70, engine.glucose + item.type.sugarMod);

                addFloatingText(
                    engine,
                    `+${Math.round(earnedPts)} ${item.type.name}`,
                    item.x,
                    item.y - 12,
                    item.type.color
                );
                createSparkle(engine, item.x + item.w / 2, item.y + item.h / 2, item.type.color, 10);
                engine.collectibles.splice(i, 1);
                continue;
            }

            if (item.x + item.w < -20) {
                engine.collectibles.splice(i, 1);
            }
        }

        // Update Particles
        for (let i = engine.particles.length - 1; i >= 0; i--) {
            const pt = engine.particles[i];
            pt.x += pt.vx;
            pt.y += pt.vy;
            pt.life -= 0.035;
            if (pt.life <= 0) engine.particles.splice(i, 1);
        }

        // Update Floating Texts
        for (let i = engine.floatingTexts.length - 1; i >= 0; i--) {
            const ft = engine.floatingTexts[i];
            ft.y += ft.vy;
            ft.life -= 0.025;
            if (ft.life <= 0) engine.floatingTexts.splice(i, 1);
        }
    };

    // Render Canvas
    const renderGame = (canvas, engine) => {
        const ctx = canvas.getContext('2d');
        const w = engine.width;
        const h = engine.height;

        ctx.clearRect(0, 0, w, h);

        // Sky Gradient (Morning / Daylight)
        const skyGrad = ctx.createLinearGradient(0, 0, 0, engine.groundY);
        skyGrad.addColorStop(0, '#eaf4ee');
        skyGrad.addColorStop(1, '#f7faf8');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, engine.groundY);

        // Sun Glow
        ctx.save();
        const sunGrad = ctx.createRadialGradient(w - 120, 60, 5, w - 120, 60, 70);
        sunGrad.addColorStop(0, 'rgba(253, 224, 71, 0.4)');
        sunGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(w - 120, 60, 70, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Parallax Clouds
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        engine.clouds.forEach((c) => {
            ctx.beginPath();
            ctx.ellipse(c.x, c.y, c.w * 0.45, 16, 0, 0, Math.PI * 2);
            ctx.fill();
        });

        // Parallax Trees & City Skyline Silhouette
        ctx.fillStyle = '#d2e7dc';
        engine.cityTrees.forEach((t) => {
            ctx.beginPath();
            ctx.arc(t.x + t.w / 2, engine.groundY - 15, t.w / 2, Math.PI, 0);
            ctx.fill();
            ctx.fillRect(t.x + t.w / 2 - 4, engine.groundY - 15, 8, 15);
        });

        // Ground & Running Track
        const groundGrad = ctx.createLinearGradient(0, engine.groundY, 0, h);
        groundGrad.addColorStop(0, '#00433e');
        groundGrad.addColorStop(1, '#002926');
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0, engine.groundY, w, h - engine.groundY);

        // Ground Line & Grass accent
        ctx.fillStyle = '#10b981';
        ctx.fillRect(0, engine.groundY, w, 4);

        // Track Dashes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        const dashOffset = (engine.distance * 1.5) % 40;
        for (let x = -dashOffset; x < w; x += 40) {
            ctx.fillRect(x, engine.groundY + 22, 20, 3);
        }

        // Render Collectibles
        engine.collectibles.forEach((c) => {
            const floatY = Math.sin(c.bounce) * 4;
            ctx.save();
            ctx.font = '22px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // Subtle glow
            ctx.shadowColor = c.type.color;
            ctx.shadowBlur = 10;
            ctx.fillText(c.type.icon, c.x + c.w / 2, c.y + c.h / 2 + floatY);
            ctx.restore();
        });

        // Render Obstacles
        engine.obstacles.forEach((obs) => {
            ctx.save();
            ctx.font = `${obs.h * 0.8}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(225, 29, 72, 0.4)';
            ctx.shadowBlur = 8;
            ctx.fillText(obs.type.icon, obs.x + obs.w / 2, obs.y + obs.h / 2);
            ctx.restore();
        });

        // Render Player
        const p = engine.player;
        ctx.save();

        // Shield Aura
        if (engine.shieldTimer > 0) {
            ctx.beginPath();
            ctx.arc(p.x + p.w / 2, p.y + p.h / 2, 42, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(234, 179, 8, 0.2)';
            ctx.strokeStyle = '#eab308';
            ctx.lineWidth = 2.5;
            ctx.setLineDash([6, 3]);
            ctx.fill();
            ctx.stroke();
        }

        // Draw Player Avatar
        ctx.font = p.isSliding ? '30px sans-serif' : '42px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Bobbing effect when running
        const bobY = p.isGrounded && !p.isSliding ? Math.sin(p.animTimer) * 3 : 0;
        ctx.fillText(engine.char.avatar, p.x + p.w / 2, p.y + p.h / 2 + bobY);
        ctx.restore();

        // Render Particles
        engine.particles.forEach((pt) => {
            ctx.save();
            ctx.globalAlpha = Math.max(0, pt.life);
            ctx.fillStyle = pt.color;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        // Render Floating Texts
        engine.floatingTexts.forEach((ft) => {
            ctx.save();
            ctx.globalAlpha = Math.max(0, ft.life);
            ctx.font = 'bold 12px sans-serif';
            ctx.fillStyle = ft.color;
            ctx.shadowColor = 'rgba(255,255,255,0.8)';
            ctx.shadowBlur = 4;
            ctx.fillText(ft.text, ft.x, ft.y);
            ctx.restore();
        });

        // Canvas In-Game Minimal HUD
        ctx.save();
        ctx.fillStyle = 'rgba(0, 67, 62, 0.85)';
        ctx.roundRect(14, 14, 190, 48, 12);
        ctx.fill();

        // Glucose indicator in HUD
        const glucColor =
            engine.glucose < 135 ? '#10b981' : engine.glucose < 180 ? '#f59e0b' : '#ef4444';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('GLUKOSA REAL-TIME', 26, 30);
        ctx.font = 'bold 16px sans-serif';
        ctx.fillStyle = glucColor;
        ctx.fillText(`${Math.round(engine.glucose)} mg/dL`, 26, 48);

        // Distance & Hearts
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`${Math.floor(engine.distance)} m`, w - 24, 30);

        // Hearts
        let heartStr = '';
        for (let i = 0; i < 3; i++) {
            heartStr += i < engine.lives ? '❤️ ' : '🖤 ';
        }
        ctx.font = '14px sans-serif';
        ctx.fillText(heartStr, w - 24, 50);

        // Combo Counter
        if (engine.combo >= 2) {
            ctx.font = 'italic bold 16px sans-serif';
            ctx.fillStyle = '#f59e0b';
            ctx.textAlign = 'center';
            ctx.fillText(`${engine.combo}x COMBO METABOLIK!`, w / 2, 35);
        }
        ctx.restore();
    };

    return (
        <div className="w-full bg-surface rounded-3xl border border-surface-container shadow-xl overflow-hidden flex flex-col">
            {/* Top Game Bar */}
            <div className="px-5 py-3.5 bg-primary text-white flex flex-wrap items-center justify-between gap-3 border-b border-primary-container">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                        <span className="material-symbols-outlined text-[19px] text-[#82d6b3]">sports_esports</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-heading font-black text-sm tracking-tight">GLUCOSE DASH 2D</h2>
                            <span className="px-2 py-0.5 rounded-full bg-[#82d6b3]/20 text-[#82d6b3] text-[9px] font-mono font-bold">
                                60 FPS • Canvas
                            </span>
                        </div>
                        <p className="text-[10px] text-[#cbe5d8]">
                            Kendalikan lonjakan glukosa, hindari jebakan karbohidrat sederhana
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-xl bg-white/10 text-xs font-mono font-semibold text-white/90">
                        🏆 Rekor: <strong>{highScore}</strong>
                    </div>

                    <button
                        type="button"
                        onClick={toggleSound}
                        className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white transition-all flex items-center gap-1 cursor-pointer"
                        title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            {soundEnabled ? 'volume_up' : 'volume_off'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Game Screen Canvas Container */}
            <div className="relative w-full aspect-video max-h-115 bg-[#f7faf8] flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain cursor-pointer select-none"
                    onClick={() => {
                        if (gameState === 'playing') handleJump();
                    }}
                />

                {/* OVERLAY: Menu / Start Screen */}
                {gameState === 'menu' && (
                    <div className="absolute inset-0 bg-primary/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white text-center space-y-5 animate-in fade-in duration-200">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-mono font-bold border border-white/10">
                            <span>🎮 ARENA GAMIFIKASI METABOLIK 2D</span>
                        </div>

                        <div>
                            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                                Pilih Karakter & Mulai Lari
                            </h3>
                            <p className="text-xs text-[#cbe5d8] max-w-md mx-auto mt-1">
                                Hindari donat, boba, dan soda bergula. Ambil serat brokoli, air hidrasi, dan tameng insulin untuk menjaga glukosa dalam batas sehat (70–130 mg/dL)!
                            </p>
                        </div>

                        {/* Character Selector */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl">
                            {Object.values(characters).map((char) => {
                                const isSel = selectedChar === char.id;
                                return (
                                    <div
                                        key={char.id}
                                        onClick={() => setSelectedChar(char.id)}
                                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${
                                            isSel
                                                ? 'bg-white text-primary border-emerald-400 shadow-lg scale-102 ring-2 ring-emerald-300'
                                                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span className="text-2xl">{char.avatar}</span>
                                            <div>
                                                <h4 className="font-bold text-xs leading-tight">{char.name}</h4>
                                                <span className={`text-[9px] font-mono ${isSel ? 'text-primary/80' : 'text-[#cbe5d8]'}`}>
                                                    {char.role}
                                                </span>
                                            </div>
                                        </div>
                                        <p className={`text-[10px] mt-2 line-clamp-2 ${isSel ? 'text-slate-600' : 'text-slate-300'}`}>
                                            {char.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Start Button */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                            <button
                                type="button"
                                onClick={() => startGame(selectedChar)}
                                className="px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                                <span>MULAI LARI SEKARANG</span>
                            </button>
                            <span className="text-[11px] text-[#cbe5d8]">
                                Tekan <strong>SPASI</strong> atau <strong>⬆️</strong> untuk Lompat • <strong>⬇️</strong> untuk Meluncur
                            </span>
                        </div>
                    </div>
                )}

                {/* OVERLAY: Game Over Screen */}
                {gameState === 'gameover' && (
                    <div className="absolute inset-0 bg-[#002926]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white text-center space-y-4 animate-in fade-in duration-200">
                        <span className="text-3xl">🏁</span>
                        <div>
                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-300">
                                Sesi Lari Selesai!
                            </h3>
                            <p className="text-xs text-[#cbe5d8] mt-0.5">
                                Evaluasi respon metabolik tubuh {finalStats.character} terhadap asupan glukosa:
                            </p>
                        </div>

                        {/* Performance Scorecard */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg">
                            <div className="p-3 bg-white/10 rounded-2xl border border-white/15">
                                <span className="text-[10px] text-[#cbe5d8] block">Total Skor</span>
                                <span className="text-xl font-mono font-black text-emerald-300">{finalStats.score}</span>
                            </div>
                            <div className="p-3 bg-white/10 rounded-2xl border border-white/15">
                                <span className="text-[10px] text-[#cbe5d8] block">Jarak Ditempuh</span>
                                <span className="text-xl font-mono font-black text-white">{finalStats.distance} m</span>
                            </div>
                            <div className="p-3 bg-white/10 rounded-2xl border border-white/15">
                                <span className="text-[10px] text-[#cbe5d8] block">Time In Range</span>
                                <span className={`text-xl font-mono font-black ${finalStats.tir >= 70 ? 'text-emerald-300' : 'text-amber-300'}`}>
                                    {finalStats.tir}%
                                </span>
                            </div>
                            <div className="p-3 bg-white/10 rounded-2xl border border-white/15">
                                <span className="text-[10px] text-[#cbe5d8] block">Puncak Gula</span>
                                <span className={`text-xl font-mono font-black ${finalStats.peakGlucose > 180 ? 'text-rose-400' : 'text-emerald-300'}`}>
                                    {finalStats.peakGlucose} <span className="text-[9px]">mg/dL</span>
                                </span>
                            </div>
                        </div>

                        {/* Clinical Insight */}
                        <div className="p-3.5 bg-white/10 rounded-2xl border border-white/10 max-w-lg text-left text-xs leading-relaxed text-[#d4ede2]">
                            <strong className="text-emerald-300 block mb-0.5">💡 Catatan Klinis dr. Bramantyo, Sp.PD:</strong>
                            {finalStats.tir >= 80 ? (
                                <span>Luar biasa! Kontrol glukosa Anda stabil di atas 80% rentang aman (TIR). Konsistensi memilih serat dan hidrasi berhasil meredam lonjakan beban pankreas!</span>
                            ) : (
                                <span>Peringatan: Gula darah sempat melonjak hingga {finalStats.peakGlucose} mg/dL akibat asupan gula olahan. Di dunia nyata, lonjakan ini memicu kelelahan kronis dan resistensi insulin.</span>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                            <button
                                type="button"
                                onClick={() => startGame(selectedChar)}
                                className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[17px]">replay</span>
                                <span>Main Lagi</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setGameState('menu')}
                                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                                <span>Ganti Karakter</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Touch Controls (Adaptive Touch Ergonomics 44px+) */}
            {gameState === 'playing' && (
                <div className="p-3 bg-surface-container-low border-t border-surface-container flex items-center justify-between sm:hidden">
                    <div className="text-[11px] text-on-surface-variant font-medium">
                        Sentuh tombol untuk kendali:
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onTouchStart={(e) => {
                                e.preventDefault();
                                handleSlide();
                            }}
                            onClick={handleSlide}
                            className="px-5 py-3 min-h-11 rounded-2xl bg-surface-container text-on-surface font-bold text-xs border border-surface-container-high active:bg-surface-container-highest transition-all flex items-center gap-1 cursor-pointer"
                        >
                            <span>MELUNCUR ⬇️</span>
                        </button>
                        <button
                            type="button"
                            onTouchStart={(e) => {
                                e.preventDefault();
                                handleJump();
                            }}
                            onClick={handleJump}
                            className="px-6 py-3 min-h-11 rounded-2xl bg-primary text-white font-bold text-xs active:bg-primary-container shadow-md transition-all flex items-center gap-1 cursor-pointer"
                        >
                            <span>LOMPAT ⬆️</span>
                        </button>
                    </div>
                </div>
            )}

            {/* In-Game Legend & Health Mechanics Footer */}
            <div className="p-4 bg-surface-container-lowest border-t border-surface-container grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🥦</span>
                    <div>
                        <strong className="block text-[11px] text-on-surface">Serat Sayuran</strong>
                        <span className="text-[10px] text-emerald-700 font-medium">-15 mg/dL Glukosa</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl">💧</span>
                    <div>
                        <strong className="block text-[11px] text-on-surface">Air Hidrasi</strong>
                        <span className="text-[10px] text-cyan-700 font-medium">+Stamina & Pemulihan</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl">🍩</span>
                    <div>
                        <strong className="block text-[11px] text-on-surface">Donat & Gula Pasir</strong>
                        <span className="text-[10px] text-rose-700 font-medium">+28 mg/dL Lonjakan</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl">🛡️</span>
                    <div>
                        <strong className="block text-[11px] text-on-surface">Tameng Insulin</strong>
                        <span className="text-[10px] text-amber-700 font-medium">Kebal Bahaya 6 Detik</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
