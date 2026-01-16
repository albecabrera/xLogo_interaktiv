/* ========================================
   xLogo Lernwelt - Hauptanwendung
   ======================================== */

// ==========================================
// Schildkröten-Klasse (Turtle)
// ==========================================

class Turtle {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;

        // Position und Winkel
        this.x = this.width / 2;
        this.y = this.height / 2;
        this.angle = -90; // Startet nach oben

        // Stift-Einstellungen
        this.penDown = true;
        this.penColor = options.penColor || '#00aa00';
        this.penWidth = options.penWidth || 2;

        // Geschwindigkeit für Animation
        this.speed = options.speed || 5;
        this.animationDelay = options.animationDelay || 50;

        // Pfad-Historie für Vergleich
        this.pathHistory = [];

        // Animation
        this.isAnimating = false;
        this.commandQueue = [];

        // Schildkröte sichtbar
        this.turtleVisible = true;

        // Initiales Zeichnen
        this.clear();
    }

    // Canvas löschen und Schildkröte zurücksetzen
    clear() {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.drawGrid();
        this.drawTurtle();
    }

    // Gitter zeichnen (optional, für Orientierung)
    drawGrid() {
        this.ctx.strokeStyle = '#f0f0f0';
        this.ctx.lineWidth = 1;

        // Vertikale Linien
        for (let x = 0; x <= this.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }

        // Horizontale Linien
        for (let y = 0; y <= this.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }

        // Mittelpunkt markieren
        this.ctx.fillStyle = '#ddd';
        this.ctx.beginPath();
        this.ctx.arc(this.width / 2, this.height / 2, 3, 0, Math.PI * 2);
        this.ctx.fill();
    }

    // Schildkröte zeichnen
    drawTurtle() {
        if (!this.turtleVisible) return;

        const size = 15;
        const angleRad = (this.angle * Math.PI) / 180;

        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(angleRad + Math.PI / 2);

        // Körper (grün)
        this.ctx.fillStyle = '#2ecc71';
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, size * 0.6, size, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.strokeStyle = '#27ae60';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Kopf
        this.ctx.fillStyle = '#27ae60';
        this.ctx.beginPath();
        this.ctx.arc(0, -size * 0.8, size * 0.35, 0, Math.PI * 2);
        this.ctx.fill();

        // Augen
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(-3, -size * 0.9, 3, 0, Math.PI * 2);
        this.ctx.arc(3, -size * 0.9, 3, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.arc(-3, -size * 0.9, 1.5, 0, Math.PI * 2);
        this.ctx.arc(3, -size * 0.9, 1.5, 0, Math.PI * 2);
        this.ctx.fill();

        // Beine
        this.ctx.fillStyle = '#27ae60';
        const legPositions = [
            { x: -size * 0.5, y: -size * 0.3 },
            { x: size * 0.5, y: -size * 0.3 },
            { x: -size * 0.5, y: size * 0.3 },
            { x: size * 0.5, y: size * 0.3 }
        ];
        legPositions.forEach(pos => {
            this.ctx.beginPath();
            this.ctx.ellipse(pos.x, pos.y, 4, 6, 0, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Schwanz
        this.ctx.beginPath();
        this.ctx.moveTo(0, size * 0.8);
        this.ctx.lineTo(0, size * 1.1);
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = '#27ae60';
        this.ctx.stroke();

        this.ctx.restore();
    }

    // Neuzeichnen
    redraw() {
        this.clear();

        // Pfad neu zeichnen
        this.ctx.strokeStyle = this.penColor;
        this.ctx.lineWidth = this.penWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        for (const segment of this.pathHistory) {
            this.ctx.strokeStyle = segment.color;
            this.ctx.lineWidth = segment.width;
            this.ctx.beginPath();
            this.ctx.moveTo(segment.x1, segment.y1);
            this.ctx.lineTo(segment.x2, segment.y2);
            this.ctx.stroke();
        }

        this.drawTurtle();
    }

    // Vorwärts bewegen
    forward(distance) {
        const angleRad = (this.angle * Math.PI) / 180;
        const newX = this.x + distance * Math.cos(angleRad);
        const newY = this.y + distance * Math.sin(angleRad);

        if (this.penDown) {
            this.pathHistory.push({
                x1: this.x,
                y1: this.y,
                x2: newX,
                y2: newY,
                color: this.penColor,
                width: this.penWidth
            });
        }

        this.x = newX;
        this.y = newY;
        this.redraw();
    }

    // Rückwärts bewegen
    backward(distance) {
        this.forward(-distance);
    }

    // Rechts drehen
    right(degrees) {
        this.angle = (this.angle + degrees) % 360;
        this.redraw();
    }

    // Links drehen
    left(degrees) {
        this.angle = (this.angle - degrees) % 360;
        this.redraw();
    }

    // Stift heben
    penUp() {
        this.penDown = false;
    }

    // Stift senken
    penDownFunc() {
        this.penDown = true;
    }

    // Farbe setzen
    setColor(color) {
        const colorMap = {
            'rot': '#e74c3c',
            'red': '#e74c3c',
            'grün': '#2ecc71',
            'green': '#2ecc71',
            'blau': '#3498db',
            'blue': '#3498db',
            'gelb': '#f1c40f',
            'yellow': '#f1c40f',
            'orange': '#e67e22',
            'lila': '#9b59b6',
            'purple': '#9b59b6',
            'pink': '#fd79a8',
            'schwarz': '#000000',
            'black': '#000000',
            'weiß': '#ffffff',
            'white': '#ffffff',
            'braun': '#8b4513',
            'brown': '#8b4513'
        };

        if (color.startsWith('#')) {
            this.penColor = color;
        } else {
            this.penColor = colorMap[color.toLowerCase()] || '#00aa00';
        }
    }

    // Stiftbreite setzen
    setWidth(width) {
        this.penWidth = Math.max(1, Math.min(20, width));
    }

    // Zur Mitte zurück
    home() {
        this.x = this.width / 2;
        this.y = this.height / 2;
        this.angle = -90;
        this.redraw();
    }

    // Schildkröte verstecken
    hideTurtle() {
        this.turtleVisible = false;
        this.redraw();
    }

    // Schildkröte zeigen
    showTurtle() {
        this.turtleVisible = true;
        this.redraw();
    }

    // Alles zurücksetzen
    reset() {
        this.x = this.width / 2;
        this.y = this.height / 2;
        this.angle = -90;
        this.penDown = true;
        this.penColor = '#00aa00';
        this.penWidth = 2;
        this.pathHistory = [];
        this.turtleVisible = true;
        this.clear();
    }

    // Pfad-Signatur für Vergleich
    getPathSignature() {
        if (this.pathHistory.length === 0) return '';

        // Normalisiere den Pfad (relativ zum Startpunkt)
        const startX = this.width / 2;
        const startY = this.height / 2;

        const normalized = this.pathHistory.map(seg => ({
            dx1: Math.round((seg.x1 - startX) / 5) * 5,
            dy1: Math.round((seg.y1 - startY) / 5) * 5,
            dx2: Math.round((seg.x2 - startX) / 5) * 5,
            dy2: Math.round((seg.y2 - startY) / 5) * 5
        }));

        return JSON.stringify(normalized);
    }
}

// ==========================================
// xLogo Interpreter
// ==========================================

class XLogoInterpreter {
    constructor(turtle) {
        this.turtle = turtle;
        this.procedures = {};
        this.executionSteps = [];
        this.currentStep = 0;
        this.errors = [];
    }

    // Code parsen und ausführen
    execute(code, stepByStep = false) {
        this.errors = [];
        this.executionSteps = [];
        this.currentStep = 0;

        try {
            const tokens = this.tokenize(code);
            const commands = this.parse(tokens);

            if (stepByStep) {
                this.executionSteps = commands;
                return { success: true, steps: commands.length };
            }

            this.runCommands(commands);
            return { success: true, steps: commands.length };
        } catch (error) {
            this.errors.push(error.message);
            return { success: false, error: error.message };
        }
    }

    // Einzelnen Schritt ausführen
    executeStep() {
        if (this.currentStep < this.executionSteps.length) {
            const cmd = this.executionSteps[this.currentStep];
            this.runCommand(cmd);
            this.currentStep++;
            return {
                done: this.currentStep >= this.executionSteps.length,
                currentStep: this.currentStep,
                totalSteps: this.executionSteps.length,
                command: cmd
            };
        }
        return { done: true };
    }

    // Tokenisierung
    tokenize(code) {
        // Kommentare entfernen
        code = code.replace(/;.*/g, '');

        // Normalisieren
        code = code.toLowerCase().trim();

        // Tokens erstellen
        const tokens = [];
        let current = '';
        let inBracket = 0;
        let inString = false;

        for (let i = 0; i < code.length; i++) {
            const char = code[i];

            if (char === '"' && !inString) {
                inString = true;
                current += char;
            } else if (char === '"' && inString) {
                inString = false;
                current += char;
            } else if (inString) {
                current += char;
            } else if (char === '[') {
                if (current.trim()) tokens.push(current.trim());
                current = '';
                tokens.push('[');
                inBracket++;
            } else if (char === ']') {
                if (current.trim()) tokens.push(current.trim());
                current = '';
                tokens.push(']');
                inBracket--;
            } else if (/\s/.test(char)) {
                if (current.trim()) tokens.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }

        if (current.trim()) tokens.push(current.trim());

        return tokens;
    }

    // Parsing
    parse(tokens) {
        const commands = [];
        let i = 0;

        while (i < tokens.length) {
            const token = tokens[i];

            // Vorwärts (fd = forward, vw = vorwärts)
            if (['fd', 'forward', 'vw', 'vorwärts'].includes(token)) {
                const value = parseFloat(tokens[++i]);
                if (isNaN(value)) throw new Error(`Ungültiger Wert nach "${token}"`);
                commands.push({ type: 'forward', value });
            }
            // Rückwärts (bk = back, rw = rückwärts)
            else if (['bk', 'back', 'backward', 'rw', 'rückwärts'].includes(token)) {
                const value = parseFloat(tokens[++i]);
                if (isNaN(value)) throw new Error(`Ungültiger Wert nach "${token}"`);
                commands.push({ type: 'backward', value });
            }
            // Rechts (rt = right, re = rechts)
            else if (['rt', 'right', 're', 'rechts'].includes(token)) {
                const value = parseFloat(tokens[++i]);
                if (isNaN(value)) throw new Error(`Ungültiger Wert nach "${token}"`);
                commands.push({ type: 'right', value });
            }
            // Links (lt = left, li = links)
            else if (['lt', 'left', 'li', 'links'].includes(token)) {
                const value = parseFloat(tokens[++i]);
                if (isNaN(value)) throw new Error(`Ungültiger Wert nach "${token}"`);
                commands.push({ type: 'left', value });
            }
            // Stift hoch (pu = penup)
            else if (['pu', 'penup', 'sh', 'stifthoch'].includes(token)) {
                commands.push({ type: 'penup' });
            }
            // Stift runter (pd = pendown)
            else if (['pd', 'pendown', 'sr', 'stiftrunter'].includes(token)) {
                commands.push({ type: 'pendown' });
            }
            // Wiederholung (repeat)
            else if (['repeat', 'wh', 'wiederhole'].includes(token)) {
                const count = parseInt(tokens[++i]);
                if (isNaN(count)) throw new Error(`Ungültige Anzahl nach "${token}"`);

                // Finde die Befehle in Klammern
                if (tokens[++i] !== '[') throw new Error('Erwarte "[" nach Wiederholungsanzahl');

                const innerTokens = [];
                let bracketCount = 1;
                i++;

                while (bracketCount > 0 && i < tokens.length) {
                    if (tokens[i] === '[') bracketCount++;
                    else if (tokens[i] === ']') bracketCount--;

                    if (bracketCount > 0) innerTokens.push(tokens[i]);
                    i++;
                }
                i--; // Korrektur für die äußere Schleife

                const innerCommands = this.parse(innerTokens);
                commands.push({ type: 'repeat', count, commands: innerCommands });
            }
            // Farbe (setpc = setpencolor, setcolor)
            else if (['setpc', 'setpencolor', 'setcolor', 'farbe', 'stiftfarbe'].includes(token)) {
                let colorValue = tokens[++i];
                // Entferne Anführungszeichen
                colorValue = colorValue.replace(/"/g, '');
                commands.push({ type: 'color', value: colorValue });
            }
            // Stiftbreite (setpw = setpenwidth)
            else if (['setpw', 'setpenwidth', 'setwidth', 'breite', 'stiftbreite'].includes(token)) {
                const value = parseFloat(tokens[++i]);
                if (isNaN(value)) throw new Error(`Ungültiger Wert nach "${token}"`);
                commands.push({ type: 'width', value });
            }
            // Home
            else if (['home', 'heim', 'zurück'].includes(token)) {
                commands.push({ type: 'home' });
            }
            // Bildschirm löschen (cs = clearscreen)
            else if (['cs', 'clearscreen', 'clean', 'löschen'].includes(token)) {
                commands.push({ type: 'clearscreen' });
            }
            // Schildkröte verstecken (ht = hideturtle)
            else if (['ht', 'hideturtle', 'verstecke'].includes(token)) {
                commands.push({ type: 'hideturtle' });
            }
            // Schildkröte zeigen (st = showturtle)
            else if (['st', 'showturtle', 'zeige'].includes(token)) {
                commands.push({ type: 'showturtle' });
            }
            // Unbekannter Befehl
            else if (token && token !== '[' && token !== ']') {
                throw new Error(`Unbekannter Befehl: "${token}"`);
            }

            i++;
        }

        return commands;
    }

    // Befehle ausführen
    runCommands(commands) {
        for (const cmd of commands) {
            this.runCommand(cmd);
        }
    }

    // Einzelnen Befehl ausführen
    runCommand(cmd) {
        switch (cmd.type) {
            case 'forward':
                this.turtle.forward(cmd.value);
                break;
            case 'backward':
                this.turtle.backward(cmd.value);
                break;
            case 'right':
                this.turtle.right(cmd.value);
                break;
            case 'left':
                this.turtle.left(cmd.value);
                break;
            case 'penup':
                this.turtle.penUp();
                break;
            case 'pendown':
                this.turtle.penDownFunc();
                break;
            case 'repeat':
                for (let i = 0; i < cmd.count; i++) {
                    this.runCommands(cmd.commands);
                }
                break;
            case 'color':
                this.turtle.setColor(cmd.value);
                break;
            case 'width':
                this.turtle.setWidth(cmd.value);
                break;
            case 'home':
                this.turtle.home();
                break;
            case 'clearscreen':
                this.turtle.reset();
                break;
            case 'hideturtle':
                this.turtle.hideTurtle();
                break;
            case 'showturtle':
                this.turtle.showTurtle();
                break;
        }
    }
}

// ==========================================
// Aufgaben-System
// ==========================================

const defaultTasks = {
    beginner: [
        {
            id: 'b1',
            title: 'Erste Schritte',
            description: 'Lass die Schildkröte 100 Schritte vorwärts gehen! Benutze den Befehl <code>fd</code> (forward).',
            hint: 'Benutze den Befehl "fd" gefolgt von einer Zahl. Beispiel: fd 100',
            solution: 'fd 100',
            reward: 10
        },
        {
            id: 'b2',
            title: 'Hin und zurück',
            description: 'Gehe 50 Schritte vorwärts (<code>fd</code>) und dann 50 Schritte rückwärts (<code>bk</code>).',
            hint: 'Benutze zuerst "fd 50" und dann "bk 50"',
            solution: 'fd 50\nbk 50',
            reward: 10
        },
        {
            id: 'b3',
            title: 'Die erste Ecke',
            description: 'Gehe 80 Schritte vorwärts und drehe dich dann um 90 Grad nach rechts (<code>rt</code> = right turn).',
            hint: 'Benutze "fd 80" und dann "rt 90"',
            solution: 'fd 80\nrt 90',
            reward: 10
        },
        {
            id: 'b4',
            title: 'Der Winkel',
            description: 'Zeichne einen Winkel: Gehe 60 Schritte vorwärts, drehe 90 Grad nach rechts und gehe nochmal 60 Schritte.',
            hint: 'Kombiniere: fd 60, rt 90, fd 60',
            solution: 'fd 60\nrt 90\nfd 60',
            reward: 10
        },
        {
            id: 'b5',
            title: 'Das einfache Quadrat',
            description: 'Zeichne ein Quadrat mit Seitenlänge 80. Tipp: Ein Quadrat hat 4 Seiten und 4 rechte Winkel (90°).',
            hint: 'Du musst 4 mal vorwärts gehen und 4 mal rechts drehen: fd 80 rt 90 fd 80 rt 90 ...',
            solution: 'fd 80\nrt 90\nfd 80\nrt 90\nfd 80\nrt 90\nfd 80\nrt 90',
            reward: 15
        }
    ],
    intermediate: [
        {
            id: 'i1',
            title: 'Quadrat mit Schleife',
            description: 'Zeichne ein Quadrat mit Seitenlänge 100, aber benutze diesmal eine Schleife (<code>repeat</code>)!',
            hint: 'Mit "repeat 4 [fd 100 rt 90]" wiederholst du den Code in den Klammern 4 mal.',
            solution: 'repeat 4 [fd 100 rt 90]',
            reward: 25
        },
        {
            id: 'i2',
            title: 'Das gleichseitige Dreieck',
            description: 'Zeichne ein gleichseitiges Dreieck mit Seitenlänge 100. Tipp: Bei einem gleichseitigen Dreieck beträgt der Außenwinkel 120°.',
            hint: 'Benutze: repeat 3 [fd 100 rt 120]',
            solution: 'repeat 3 [fd 100 rt 120]',
            reward: 25
        },
        {
            id: 'i3',
            title: 'Das Sechseck',
            description: 'Zeichne ein regelmäßiges Sechseck mit Seitenlänge 60.',
            hint: 'Ein Sechseck hat 6 Seiten. Der Außenwinkel ist 360°/6 = 60°',
            solution: 'repeat 6 [fd 60 rt 60]',
            reward: 25
        },
        {
            id: 'i4',
            title: 'Die Treppe',
            description: 'Zeichne eine Treppe mit 4 Stufen. Jede Stufe ist 30 Schritte hoch und 30 Schritte breit.',
            hint: 'Wiederhole 4 mal: vorwärts gehen, rechts drehen, vorwärts gehen, links drehen (lt = left turn)',
            solution: 'repeat 4 [fd 30 rt 90 fd 30 lt 90]',
            reward: 30
        },
        {
            id: 'i5',
            title: 'Der bunte Stern',
            description: 'Zeichne einen 5-zackigen Stern mit Seitenlänge 100.',
            hint: 'Bei einem 5-zackigen Stern ist der Drehwinkel 144° (= 720°/5)',
            solution: 'repeat 5 [fd 100 rt 144]',
            reward: 30
        }
    ],
    advanced: [
        {
            id: 'a1',
            title: 'Spirale',
            description: 'Zeichne eine quadratische Spirale, die immer größer wird. Starte mit 10 Schritten und erhöhe um 10 bei jeder Drehung.',
            hint: 'Da wir keine Variablen haben, schreibe die Befehle einzeln: fd 10 rt 90 fd 20 rt 90 fd 30 rt 90 ...',
            solution: 'fd 10 rt 90 fd 20 rt 90 fd 30 rt 90 fd 40 rt 90 fd 50 rt 90 fd 60 rt 90 fd 70 rt 90 fd 80 rt 90',
            reward: 50
        },
        {
            id: 'a2',
            title: 'Kreis-Annäherung',
            description: 'Zeichne einen Kreis, indem du viele kleine Schritte machst und dich jedes Mal ein bisschen drehst.',
            hint: 'Benutze: repeat 36 [fd 10 rt 10] - Das macht 360°/10° = 36 Wiederholungen',
            solution: 'repeat 36 [fd 10 rt 10]',
            reward: 50
        },
        {
            id: 'a3',
            title: 'Blume',
            description: 'Zeichne eine Blume: 6 Kreise, die sich in der Mitte treffen.',
            hint: 'Zeichne 6 mal einen Kreis und drehe dich dazwischen um 60°: repeat 6 [repeat 36 [fd 5 rt 10] rt 60]',
            solution: 'repeat 6 [repeat 36 [fd 5 rt 10] rt 60]',
            reward: 60
        },
        {
            id: 'a4',
            title: 'Das Haus vom Nikolaus',
            description: 'Zeichne das bekannte "Haus vom Nikolaus" - ein Quadrat mit einem Dreieck als Dach, in einem Zug ohne abzusetzen.',
            hint: 'Start unten links, dann: diagonal hoch, runter, diagonal hoch rechts, links, diagonal runter, hoch, diagonal runter.',
            solution: 'fd 100 rt 45 fd 141 rt 135 fd 100 lt 135 fd 141 rt 135 fd 100 rt 90 fd 100 rt 135 fd 141 lt 135 fd 100',
            reward: 75
        },
        {
            id: 'a5',
            title: 'Verschachtelte Quadrate',
            description: 'Zeichne 5 Quadrate, die ineinander verschachtelt sind. Das kleinste hat Seitenlänge 20, jedes weitere ist 20 Schritte größer.',
            hint: 'Zeichne jedes Quadrat einzeln und bewege die Schildkröte dazwischen ohne zu zeichnen (pu = pen up, pd = pen down).',
            solution: 'repeat 4 [fd 20 rt 90] pu bk 10 lt 90 bk 10 rt 90 pd repeat 4 [fd 40 rt 90] pu bk 10 lt 90 bk 10 rt 90 pd repeat 4 [fd 60 rt 90] pu bk 10 lt 90 bk 10 rt 90 pd repeat 4 [fd 80 rt 90] pu bk 10 lt 90 bk 10 rt 90 pd repeat 4 [fd 100 rt 90]',
            reward: 80
        }
    ]
};

// ==========================================
// Spielstatus
// ==========================================

class GameState {
    constructor() {
        this.rubox = 0;
        this.level = 1;
        this.streak = 0;
        this.completedTasks = new Set();
        this.customTasks = { beginner: [], intermediate: [], advanced: [] };
        this.currentDifficulty = 'beginner';
        this.currentTaskIndex = 0;
        this.hintsUsed = new Set();

        this.load();
    }

    // Speichern
    save() {
        const data = {
            rubox: this.rubox,
            level: this.level,
            streak: this.streak,
            completedTasks: Array.from(this.completedTasks),
            customTasks: this.customTasks,
            hintsUsed: Array.from(this.hintsUsed)
        };
        localStorage.setItem('xlogoGameState', JSON.stringify(data));
    }

    // Laden
    load() {
        const saved = localStorage.getItem('xlogoGameState');
        if (saved) {
            const data = JSON.parse(saved);
            this.rubox = data.rubox || 0;
            this.level = data.level || 1;
            this.streak = data.streak || 0;
            this.completedTasks = new Set(data.completedTasks || []);
            this.customTasks = data.customTasks || { beginner: [], intermediate: [], advanced: [] };
            this.hintsUsed = new Set(data.hintsUsed || []);
        }
    }

    // Rubox hinzufügen
    addRubox(amount) {
        this.rubox += amount;
        this.checkLevelUp();
        this.save();
        return amount;
    }

    // Rubox abziehen
    spendRubox(amount) {
        if (this.rubox >= amount) {
            this.rubox -= amount;
            this.save();
            return true;
        }
        return false;
    }

    // Level-Up prüfen
    checkLevelUp() {
        const levelsThresholds = [0, 50, 150, 300, 500, 750, 1000, 1500, 2000, 3000, 5000];
        let newLevel = 1;

        for (let i = levelsThresholds.length - 1; i >= 0; i--) {
            if (this.rubox >= levelsThresholds[i]) {
                newLevel = i + 1;
                break;
            }
        }

        if (newLevel > this.level) {
            this.level = newLevel;
            return true; // Level-Up!
        }
        return false;
    }

    // Alle Aufgaben für einen Schwierigkeitsgrad
    getTasks(difficulty) {
        const tasks = [...defaultTasks[difficulty], ...this.customTasks[difficulty]];
        return tasks;
    }

    // Aktuelle Aufgabe
    getCurrentTask() {
        const tasks = this.getTasks(this.currentDifficulty);
        if (this.currentTaskIndex < tasks.length) {
            return tasks[this.currentTaskIndex];
        }
        return null;
    }

    // Aufgabe abschließen
    completeTask(taskId, reward) {
        if (!this.completedTasks.has(taskId)) {
            this.completedTasks.add(taskId);
            this.streak++;
            const earnedRubox = this.addRubox(reward);
            return { earnedRubox, isNew: true };
        }
        // Bereits abgeschlossen, halbe Punkte
        this.streak++;
        const earnedRubox = this.addRubox(Math.floor(reward / 2));
        return { earnedRubox, isNew: false };
    }

    // Streak zurücksetzen
    resetStreak() {
        this.streak = 0;
        this.save();
    }

    // Benutzerdefinierte Aufgabe hinzufügen
    addCustomTask(task) {
        const id = 'custom_' + Date.now();
        const newTask = { ...task, id };
        this.customTasks[task.difficulty].push(newTask);
        this.save();
        return newTask;
    }

    // Benutzerdefinierte Aufgabe löschen
    deleteCustomTask(taskId) {
        for (const difficulty of Object.keys(this.customTasks)) {
            this.customTasks[difficulty] = this.customTasks[difficulty].filter(t => t.id !== taskId);
        }
        this.save();
    }

    // Alle benutzerdefinierten Aufgaben exportieren
    exportTasks() {
        return JSON.stringify(this.customTasks, null, 2);
    }

    // Aufgaben importieren
    importTasks(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            for (const difficulty of Object.keys(imported)) {
                if (this.customTasks[difficulty]) {
                    this.customTasks[difficulty].push(...imported[difficulty]);
                }
            }
            this.save();
            return true;
        } catch (e) {
            return false;
        }
    }
}

// ==========================================
// Hauptanwendung
// ==========================================

class XLogoApp {
    constructor() {
        this.gameState = new GameState();

        // Canvases und Turtles initialisieren
        this.initCanvases();

        // Interpreter
        this.mainInterpreter = new XLogoInterpreter(this.mainTurtle);
        this.sandboxInterpreter = new XLogoInterpreter(this.sandboxTurtle);
        this.expectedInterpreter = new XLogoInterpreter(this.expectedTurtle);
        this.adminInterpreter = new XLogoInterpreter(this.adminTurtle);

        // Event-Listener
        this.initEventListeners();

        // UI aktualisieren
        this.updateUI();

        // Erste Aufgabe laden
        this.loadCurrentTask();
    }

    initCanvases() {
        // Haupt-Canvas
        const turtleCanvas = document.getElementById('turtleCanvas');
        this.mainTurtle = new Turtle(turtleCanvas);

        // Sandbox-Canvas
        const sandboxCanvas = document.getElementById('sandboxCanvas');
        this.sandboxTurtle = new Turtle(sandboxCanvas);

        // Erwartetes Ergebnis (klein)
        const expectedCanvas = document.getElementById('expectedCanvas');
        this.expectedTurtle = new Turtle(expectedCanvas, { penWidth: 1 });

        // Admin-Vorschau
        const adminCanvas = document.getElementById('adminPreviewCanvas');
        this.adminTurtle = new Turtle(adminCanvas);
    }

    initEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchView(e.target.dataset.view));
        });

        // Schwierigkeitsgrad
        document.querySelectorAll('.difficulty-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectDifficulty(e.currentTarget.dataset.difficulty));
        });

        // Haupt-Canvas Steuerung
        document.getElementById('runBtn').addEventListener('click', () => this.runCode());
        document.getElementById('stepBtn').addEventListener('click', () => this.stepCode());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetCanvas());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearCode());

        // Hinweis
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());

        // Sandbox-Steuerung
        document.getElementById('sandboxRunBtn').addEventListener('click', () => this.runSandboxCode());
        document.getElementById('sandboxStepBtn').addEventListener('click', () => this.stepSandboxCode());
        document.getElementById('sandboxResetBtn').addEventListener('click', () => this.sandboxTurtle.reset());
        document.getElementById('sandboxClearBtn').addEventListener('click', () => {
            document.getElementById('sandboxCode').value = '';
            this.sandboxTurtle.reset();
        });

        // Sandbox Farbe/Breite
        document.getElementById('penColor').addEventListener('input', (e) => {
            this.sandboxTurtle.setColor(e.target.value);
        });
        document.getElementById('penWidth').addEventListener('input', (e) => {
            this.sandboxTurtle.setWidth(parseInt(e.target.value));
        });

        // Admin
        document.getElementById('previewSolutionBtn').addEventListener('click', () => this.previewAdminSolution());
        document.getElementById('saveTaskBtn').addEventListener('click', () => this.saveCustomTask());
        document.getElementById('exportTasksBtn').addEventListener('click', () => this.exportTasks());
        document.getElementById('importTasksBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });
        document.getElementById('importFile').addEventListener('change', (e) => this.importTasks(e));

        // Popups
        document.getElementById('nextTaskBtn').addEventListener('click', () => this.nextTask());
        document.getElementById('closeLevelupBtn').addEventListener('click', () => {
            document.getElementById('levelupPopup').classList.remove('visible');
        });

        // Tastaturkürzel
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.runCode();
            }
        });
    }

    // Ansicht wechseln
    switchView(view) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`${view}View`).classList.add('active');

        if (view === 'admin') {
            this.renderCustomTasksList();
        }
    }

    // Schwierigkeitsgrad auswählen
    selectDifficulty(difficulty) {
        document.querySelectorAll('.difficulty-card').forEach(card => card.classList.remove('active'));
        document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('active');

        this.gameState.currentDifficulty = difficulty;
        this.gameState.currentTaskIndex = 0;
        this.loadCurrentTask();
    }

    // Aktuelle Aufgabe laden
    loadCurrentTask() {
        const task = this.gameState.getCurrentTask();

        if (task) {
            document.getElementById('taskContent').innerHTML = `
                <h4>${task.title}</h4>
                <p class="task-description">${task.description}</p>
            `;

            const tasks = this.gameState.getTasks(this.gameState.currentDifficulty);
            document.getElementById('taskNumber').textContent =
                `${this.gameState.currentTaskIndex + 1}/${tasks.length}`;

            // Hinweis zurücksetzen
            document.getElementById('hintContent').classList.remove('visible');
            document.getElementById('hintContent').textContent = '';

            // Erwartetes Ergebnis zeichnen
            this.expectedTurtle.reset();
            this.expectedInterpreter.execute(task.solution);

            // Hauptcanvas zurücksetzen
            this.mainTurtle.reset();
            document.getElementById('codeInput').value = '';
            this.clearFeedback();
        } else {
            document.getElementById('taskContent').innerHTML = `
                <p class="task-description">🎉 Du hast alle Aufgaben in diesem Schwierigkeitsgrad abgeschlossen! Probiere einen anderen Schwierigkeitsgrad oder erstelle eigene Aufgaben.</p>
            `;
            document.getElementById('taskNumber').textContent = '✓';
        }
    }

    // Code ausführen
    runCode() {
        const code = document.getElementById('codeInput').value.trim();

        if (!code) {
            this.showFeedback('Bitte gib zuerst Code ein!', 'info');
            return;
        }

        this.mainTurtle.reset();
        const result = this.mainInterpreter.execute(code);

        if (!result.success) {
            this.showFeedback(`❌ Fehler: ${result.error}`, 'error');
            this.gameState.resetStreak();
            this.updateUI();
            return;
        }

        // Prüfen ob die Lösung korrekt ist
        this.checkSolution();
    }

    // Schritt-für-Schritt ausführen
    stepCode() {
        if (this.mainInterpreter.currentStep === 0 || this.mainInterpreter.currentStep >= this.mainInterpreter.executionSteps.length) {
            const code = document.getElementById('codeInput').value.trim();

            if (!code) {
                this.showFeedback('Bitte gib zuerst Code ein!', 'info');
                return;
            }

            this.mainTurtle.reset();
            const result = this.mainInterpreter.execute(code, true);

            if (!result.success) {
                this.showFeedback(`❌ Fehler: ${result.error}`, 'error');
                return;
            }
        }

        const stepResult = this.mainInterpreter.executeStep();

        if (stepResult.done) {
            this.showFeedback(`✓ Alle ${stepResult.currentStep} Schritte ausgeführt!`, 'info');
            this.checkSolution();
        } else {
            this.showFeedback(`Schritt ${stepResult.currentStep}/${stepResult.totalSteps}: ${this.commandToString(stepResult.command)}`, 'info');
        }
    }

    // Befehl als String
    commandToString(cmd) {
        switch (cmd.type) {
            case 'forward': return `fd ${cmd.value}`;
            case 'backward': return `bk ${cmd.value}`;
            case 'right': return `rt ${cmd.value}`;
            case 'left': return `lt ${cmd.value}`;
            case 'penup': return 'pu';
            case 'pendown': return 'pd';
            case 'repeat': return `repeat ${cmd.count} [...]`;
            case 'color': return `setpc "${cmd.value}"`;
            case 'width': return `setpw ${cmd.value}`;
            case 'home': return 'home';
            case 'clearscreen': return 'cs';
            case 'hideturtle': return 'ht';
            case 'showturtle': return 'st';
            default: return cmd.type;
        }
    }

    // Lösung prüfen
    checkSolution() {
        const task = this.gameState.getCurrentTask();
        if (!task) return;

        // Vergleiche die Pfade
        const playerPath = this.mainTurtle.getPathSignature();
        const expectedPath = this.expectedTurtle.getPathSignature();

        if (playerPath === expectedPath) {
            // Richtig!
            const result = this.gameState.completeTask(task.id, task.reward);
            this.showReward(result.earnedRubox, result.isNew);

            // Level-Up prüfen
            if (this.gameState.checkLevelUp()) {
                setTimeout(() => this.showLevelUp(), 1500);
            }
        } else {
            // Falsch
            this.showFeedback('🤔 Das sieht noch nicht ganz richtig aus. Versuche es nochmal oder nutze einen Hinweis!', 'error');
            this.gameState.resetStreak();
            this.updateUI();
        }
    }

    // Canvas zurücksetzen
    resetCanvas() {
        this.mainTurtle.reset();
        this.mainInterpreter.currentStep = 0;
        this.clearFeedback();
    }

    // Code löschen
    clearCode() {
        document.getElementById('codeInput').value = '';
        this.resetCanvas();
    }

    // Hinweis anzeigen
    showHint() {
        const task = this.gameState.getCurrentTask();
        if (!task) return;

        // Prüfen ob bereits Hinweis genutzt
        if (!this.gameState.hintsUsed.has(task.id)) {
            // Kosten: 5 Rubox
            if (this.gameState.rubox < 5) {
                this.showFeedback('Du brauchst mindestens 5 Rubox für einen Hinweis!', 'error');
                return;
            }
            this.gameState.spendRubox(5);
            this.gameState.hintsUsed.add(task.id);
            this.gameState.save();
            this.updateUI();
        }

        document.getElementById('hintContent').textContent = task.hint;
        document.getElementById('hintContent').classList.add('visible');
    }

    // Feedback anzeigen
    showFeedback(message, type) {
        const feedbackEl = document.getElementById('feedbackMessage');
        feedbackEl.textContent = message;
        feedbackEl.className = 'feedback-message ' + type;
    }

    // Feedback löschen
    clearFeedback() {
        const feedbackEl = document.getElementById('feedbackMessage');
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback-message';
    }

    // Belohnung anzeigen
    showReward(amount, isNew) {
        document.getElementById('rewardAmount').textContent = `+${amount}`;
        document.getElementById('rewardMessage').textContent = isNew
            ? 'Du hast die Aufgabe zum ersten Mal gelöst!'
            : 'Du hast die Aufgabe erneut gemeistert!';
        document.getElementById('rewardPopup').classList.add('visible');
        this.updateUI();

        // Confetti-Effekt
        this.createConfetti();
    }

    // Level-Up anzeigen
    showLevelUp() {
        document.getElementById('levelupMessage').textContent = `Du hast Level ${this.gameState.level} erreicht!`;
        document.getElementById('levelupPopup').classList.add('visible');
    }

    // Nächste Aufgabe
    nextTask() {
        document.getElementById('rewardPopup').classList.remove('visible');
        this.gameState.currentTaskIndex++;
        this.loadCurrentTask();
    }

    // Confetti-Effekt
    createConfetti() {
        const colors = ['#6c5ce7', '#00cec9', '#fd79a8', '#fdcb6e', '#00b894'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 1001;
                animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
            `;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }

        // Animation hinzufügen wenn noch nicht vorhanden
        if (!document.getElementById('confettiStyle')) {
            const style = document.createElement('style');
            style.id = 'confettiStyle';
            style.textContent = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // UI aktualisieren
    updateUI() {
        document.getElementById('ruboxCount').textContent = this.gameState.rubox;
        document.getElementById('playerLevel').textContent = `Level ${this.gameState.level}`;
        document.getElementById('streakCount').textContent = this.gameState.streak;
    }

    // Sandbox Code ausführen
    runSandboxCode() {
        const code = document.getElementById('sandboxCode').value.trim();

        if (!code) {
            document.getElementById('sandboxFeedback').textContent = 'Bitte gib Code ein!';
            document.getElementById('sandboxFeedback').style.color = '#e17055';
            return;
        }

        this.sandboxTurtle.reset();

        // Farbe und Breite beibehalten
        const color = document.getElementById('penColor').value;
        const width = parseInt(document.getElementById('penWidth').value);
        this.sandboxTurtle.setColor(color);
        this.sandboxTurtle.setWidth(width);

        const result = this.sandboxInterpreter.execute(code);

        if (result.success) {
            document.getElementById('sandboxFeedback').textContent = `✓ ${result.steps} Befehle ausgeführt!`;
            document.getElementById('sandboxFeedback').style.color = '#00b894';
        } else {
            document.getElementById('sandboxFeedback').textContent = `❌ ${result.error}`;
            document.getElementById('sandboxFeedback').style.color = '#e17055';
        }
    }

    // Sandbox Schritt
    stepSandboxCode() {
        if (this.sandboxInterpreter.currentStep === 0 || this.sandboxInterpreter.currentStep >= this.sandboxInterpreter.executionSteps.length) {
            const code = document.getElementById('sandboxCode').value.trim();

            if (!code) {
                document.getElementById('sandboxFeedback').textContent = 'Bitte gib Code ein!';
                return;
            }

            this.sandboxTurtle.reset();
            const color = document.getElementById('penColor').value;
            const width = parseInt(document.getElementById('penWidth').value);
            this.sandboxTurtle.setColor(color);
            this.sandboxTurtle.setWidth(width);

            this.sandboxInterpreter.execute(code, true);
        }

        const stepResult = this.sandboxInterpreter.executeStep();

        if (stepResult.done) {
            document.getElementById('sandboxFeedback').textContent = '✓ Alle Schritte ausgeführt!';
        } else {
            document.getElementById('sandboxFeedback').textContent = `Schritt ${stepResult.currentStep}/${stepResult.totalSteps}`;
        }
    }

    // Admin: Vorschau der Lösung
    previewAdminSolution() {
        const code = document.getElementById('taskSolution').value.trim();

        if (!code) {
            alert('Bitte gib eine Musterlösung ein!');
            return;
        }

        this.adminTurtle.reset();
        const result = this.adminInterpreter.execute(code);

        if (!result.success) {
            alert(`Fehler in der Musterlösung: ${result.error}`);
        }
    }

    // Admin: Aufgabe speichern
    saveCustomTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const difficulty = document.getElementById('taskDifficulty').value;
        const solution = document.getElementById('taskSolution').value.trim();
        const hint = document.getElementById('taskHint').value.trim();

        if (!title || !description || !solution) {
            alert('Bitte fülle alle Pflichtfelder aus (Titel, Beschreibung, Musterlösung)!');
            return;
        }

        // Lösung validieren
        this.adminTurtle.reset();
        const result = this.adminInterpreter.execute(solution);
        if (!result.success) {
            alert(`Die Musterlösung enthält Fehler: ${result.error}`);
            return;
        }

        const rewards = { beginner: 10, intermediate: 25, advanced: 50 };

        const task = {
            title,
            description,
            difficulty,
            solution,
            hint: hint || 'Versuche es Schritt für Schritt!',
            reward: rewards[difficulty]
        };

        this.gameState.addCustomTask(task);

        // Formular zurücksetzen
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskSolution').value = '';
        document.getElementById('taskHint').value = '';
        this.adminTurtle.reset();

        alert('Aufgabe erfolgreich gespeichert!');
        this.renderCustomTasksList();
    }

    // Admin: Aufgaben exportieren
    exportTasks() {
        const data = this.gameState.exportTasks();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'xlogo-aufgaben.json';
        a.click();

        URL.revokeObjectURL(url);
    }

    // Admin: Aufgaben importieren
    importTasks(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const success = this.gameState.importTasks(e.target.result);
            if (success) {
                alert('Aufgaben erfolgreich importiert!');
                this.renderCustomTasksList();
            } else {
                alert('Fehler beim Importieren. Bitte prüfe das Dateiformat.');
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // Reset
    }

    // Admin: Aufgaben-Liste rendern
    renderCustomTasksList() {
        const container = document.getElementById('customTasksList');
        const allTasks = [
            ...this.gameState.customTasks.beginner.map(t => ({ ...t, difficulty: 'beginner' })),
            ...this.gameState.customTasks.intermediate.map(t => ({ ...t, difficulty: 'intermediate' })),
            ...this.gameState.customTasks.advanced.map(t => ({ ...t, difficulty: 'advanced' }))
        ];

        if (allTasks.length === 0) {
            container.innerHTML = '<p style="color: #636e72;">Noch keine eigenen Aufgaben erstellt.</p>';
            return;
        }

        const difficultyLabels = {
            beginner: '🌱 Anfänger',
            intermediate: '🌿 Fortgeschritten',
            advanced: '🌳 Experte'
        };

        container.innerHTML = allTasks.map(task => `
            <div class="custom-task-item">
                <div class="custom-task-info">
                    <h4>${task.title}</h4>
                    <span>${difficultyLabels[task.difficulty]} | ${task.reward} Rubox</span>
                </div>
                <div class="custom-task-actions">
                    <button class="task-action-btn delete" onclick="app.deleteCustomTask('${task.id}')" title="Löschen">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    // Admin: Aufgabe löschen
    deleteCustomTask(taskId) {
        if (confirm('Möchtest du diese Aufgabe wirklich löschen?')) {
            this.gameState.deleteCustomTask(taskId);
            this.renderCustomTasksList();
        }
    }

    // ==========================================
    // Share-Funktionalität
    // ==========================================

    initShareListeners() {
        // Share-Button
        document.getElementById('shareBtn').addEventListener('click', () => this.openSharePopup());

        // Popup schließen
        document.getElementById('closeShareBtn').addEventListener('click', () => this.closeSharePopup());

        // Klick außerhalb schließt Popup
        document.getElementById('sharePopup').addEventListener('click', (e) => {
            if (e.target.id === 'sharePopup') this.closeSharePopup();
        });

        // Link kopieren
        document.getElementById('copyLinkBtn').addEventListener('click', () => this.copyShareLink());

        // Share-Optionen
        document.getElementById('shareWhatsApp').addEventListener('click', () => this.shareViaWhatsApp());
        document.getElementById('shareEmail').addEventListener('click', () => this.shareViaEmail());
        document.getElementById('downloadQR').addEventListener('click', () => this.downloadQRCode());
    }

    openSharePopup() {
        const popup = document.getElementById('sharePopup');
        const linkInput = document.getElementById('shareLink');

        // Aktuelle URL verwenden
        const currentUrl = window.location.href;
        linkInput.value = currentUrl;

        // QR-Code generieren
        this.generateQRCode(currentUrl);

        popup.classList.add('visible');
    }

    closeSharePopup() {
        document.getElementById('sharePopup').classList.remove('visible');
        document.getElementById('copyFeedback').textContent = '';
    }

    generateQRCode(url) {
        const canvas = document.getElementById('qrCanvas');

        // QRCode-Bibliothek verwenden
        if (typeof QRCode !== 'undefined') {
            QRCode.toCanvas(canvas, url, {
                width: 200,
                margin: 2,
                color: {
                    dark: '#6c5ce7',
                    light: '#ffffff'
                }
            }, function(error) {
                if (error) console.error('QR-Code Fehler:', error);
            });
        } else {
            // Fallback: Einfaches Textbild
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, 200, 200);
            ctx.fillStyle = '#6c5ce7';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('QR-Code', 100, 90);
            ctx.fillText('wird geladen...', 100, 110);
        }
    }

    copyShareLink() {
        const linkInput = document.getElementById('shareLink');
        const feedback = document.getElementById('copyFeedback');

        navigator.clipboard.writeText(linkInput.value).then(() => {
            feedback.textContent = '✓ Link kopiert!';
            setTimeout(() => { feedback.textContent = ''; }, 3000);
        }).catch(() => {
            // Fallback
            linkInput.select();
            document.execCommand('copy');
            feedback.textContent = '✓ Link kopiert!';
            setTimeout(() => { feedback.textContent = ''; }, 3000);
        });
    }

    shareViaWhatsApp() {
        const url = document.getElementById('shareLink').value;
        const text = encodeURIComponent(`Lerne spielerisch Programmieren mit xLogo! 🐢\n${url}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }

    shareViaEmail() {
        const url = document.getElementById('shareLink').value;
        const subject = encodeURIComponent('xLogo Lernwelt - Spielerisch Programmieren lernen');
        const body = encodeURIComponent(`Hallo!\n\nHier ist ein toller Link zum spielerischen Programmieren lernen:\n${url}\n\nViel Spaß! 🐢`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
    }

    downloadQRCode() {
        const canvas = document.getElementById('qrCanvas');
        const link = document.createElement('a');
        link.download = 'xlogo-lernwelt-qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
}

// ==========================================
// App starten
// ==========================================

let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new XLogoApp();
    app.initShareListeners();
});
