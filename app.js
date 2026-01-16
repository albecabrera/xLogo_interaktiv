/* ========================================
   xLogo Lernwelt - Hauptanwendung
   Neue Syntax: fd(100), rt(90), repeat 4: mit Einrückung
   ======================================== */

// ==========================================
// Konsolen-Klasse
// ==========================================

class Console {
    constructor(outputElement) {
        this.output = outputElement;
    }

    clear() {
        this.output.innerHTML = '<div class="console-welcome">Konsole gelöscht.</div>';
    }

    log(message, type = 'info') {
        const line = document.createElement('div');
        line.className = `console-line console-${type}`;
        line.textContent = message;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    success(message) {
        this.log(message, 'success');
    }

    error(message) {
        this.log(message, 'error');
    }

    print(message) {
        this.log(message, 'print');
    }

    step(message) {
        this.log(message, 'step');
    }
}

// ==========================================
// Schildkröten-Klasse (Turtle) - Verbesserte Grafik
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

        // Geschwindigkeit für Animation (1-10)
        this.speed = options.speed || 5;

        // Pfad-Historie für Vergleich und Undo
        this.pathHistory = [];

        // Zustands-Historie für Schritt zurück
        this.stateHistory = [];

        // Schildkröte sichtbar
        this.turtleVisible = true;

        // Animation
        this.isAnimating = false;

        // Initiales Zeichnen
        this.clear();
    }

    // Zustand speichern (für Schritt zurück)
    saveState() {
        this.stateHistory.push({
            x: this.x,
            y: this.y,
            angle: this.angle,
            penDown: this.penDown,
            penColor: this.penColor,
            penWidth: this.penWidth,
            pathHistoryLength: this.pathHistory.length
        });
    }

    // Letzten Zustand wiederherstellen
    restoreLastState() {
        if (this.stateHistory.length === 0) return false;

        const state = this.stateHistory.pop();
        this.x = state.x;
        this.y = state.y;
        this.angle = state.angle;
        this.penDown = state.penDown;
        this.penColor = state.penColor;
        this.penWidth = state.penWidth;

        // Pfad kürzen
        this.pathHistory = this.pathHistory.slice(0, state.pathHistoryLength);
        this.redraw();
        return true;
    }

    // Canvas löschen und Schildkröte zurücksetzen
    clear() {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.drawGrid();
        this.drawTurtle();
    }

    // Gitter zeichnen
    drawGrid() {
        this.ctx.strokeStyle = '#f0f0f0';
        this.ctx.lineWidth = 1;

        for (let x = 0; x <= this.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }

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

    // Verbesserte Schildkröten-Grafik
    drawTurtle() {
        if (!this.turtleVisible) return;

        const size = 18;
        const angleRad = (this.angle * Math.PI) / 180;

        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(angleRad + Math.PI / 2);

        // Schatten
        this.ctx.shadowColor = 'rgba(0,0,0,0.2)';
        this.ctx.shadowBlur = 5;
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;

        // Panzer (Shell) - dunkelgrün mit Muster
        this.ctx.fillStyle = '#2d8a4e';
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, size * 0.7, size, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Panzer-Muster (hexagonales Muster)
        this.ctx.shadowColor = 'transparent';
        this.ctx.strokeStyle = '#1e6b3a';
        this.ctx.lineWidth = 1.5;

        // Zentrale Linie
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size * 0.7);
        this.ctx.lineTo(0, size * 0.7);
        this.ctx.stroke();

        // Seitliche Linien
        this.ctx.beginPath();
        this.ctx.moveTo(-size * 0.4, -size * 0.5);
        this.ctx.lineTo(-size * 0.4, size * 0.5);
        this.ctx.moveTo(size * 0.4, -size * 0.5);
        this.ctx.lineTo(size * 0.4, size * 0.5);
        this.ctx.stroke();

        // Diagonale Linien
        for (let i = -2; i <= 2; i++) {
            if (i === 0) continue;
            this.ctx.beginPath();
            this.ctx.moveTo(-size * 0.5, i * size * 0.25);
            this.ctx.lineTo(size * 0.5, i * size * 0.25);
            this.ctx.stroke();
        }

        // Kopf (etwas größer und realistischer)
        this.ctx.fillStyle = '#3cb371';
        this.ctx.beginPath();
        this.ctx.ellipse(0, -size * 1.1, size * 0.35, size * 0.4, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Augen
        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.arc(-size * 0.15, -size * 1.2, 4, 0, Math.PI * 2);
        this.ctx.arc(size * 0.15, -size * 1.2, 4, 0, Math.PI * 2);
        this.ctx.fill();

        // Pupillen
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(-size * 0.15, -size * 1.22, 2, 0, Math.PI * 2);
        this.ctx.arc(size * 0.15, -size * 1.22, 2, 0, Math.PI * 2);
        this.ctx.fill();

        // Beine (4 Stück, realistischer)
        this.ctx.fillStyle = '#3cb371';
        const legPositions = [
            { x: -size * 0.6, y: -size * 0.4, angle: -30 },
            { x: size * 0.6, y: -size * 0.4, angle: 30 },
            { x: -size * 0.6, y: size * 0.4, angle: -150 },
            { x: size * 0.6, y: size * 0.4, angle: 150 }
        ];

        legPositions.forEach(pos => {
            this.ctx.save();
            this.ctx.translate(pos.x, pos.y);
            this.ctx.rotate((pos.angle * Math.PI) / 180);
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, 5, 8, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });

        // Schwanz
        this.ctx.fillStyle = '#3cb371';
        this.ctx.beginPath();
        this.ctx.moveTo(-3, size * 0.9);
        this.ctx.lineTo(3, size * 0.9);
        this.ctx.lineTo(0, size * 1.3);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.restore();
    }

    // Neuzeichnen
    redraw() {
        this.clear();

        // Pfad neu zeichnen
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
            'rot': '#e74c3c', 'red': '#e74c3c',
            'grün': '#2ecc71', 'green': '#2ecc71',
            'blau': '#3498db', 'blue': '#3498db',
            'gelb': '#f1c40f', 'yellow': '#f1c40f',
            'orange': '#e67e22',
            'lila': '#9b59b6', 'purple': '#9b59b6',
            'pink': '#fd79a8',
            'schwarz': '#000000', 'black': '#000000',
            'weiß': '#ffffff', 'white': '#ffffff',
            'braun': '#8b4513', 'brown': '#8b4513'
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

    hideTurtle() {
        this.turtleVisible = false;
        this.redraw();
    }

    showTurtle() {
        this.turtleVisible = true;
        this.redraw();
    }

    reset() {
        this.x = this.width / 2;
        this.y = this.height / 2;
        this.angle = -90;
        this.penDown = true;
        this.penColor = '#00aa00';
        this.penWidth = 2;
        this.pathHistory = [];
        this.stateHistory = [];
        this.turtleVisible = true;
        this.clear();
    }

    getPathSignature() {
        if (this.pathHistory.length === 0) return '';

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
// xLogo Interpreter - Neue Syntax mit Klammern und Einrückung
// ==========================================

class XLogoInterpreter {
    constructor(turtle, console = null) {
        this.turtle = turtle;
        this.console = console;
        this.procedures = {};
        this.executionSteps = [];
        this.flatSteps = []; // Flache Liste aller Schritte für Stepping
        this.currentStep = 0;
        this.errors = [];
        this.speed = 5;
    }

    setSpeed(speed) {
        this.speed = Math.max(1, Math.min(10, speed));
    }

    // Code parsen und ausführen
    execute(code, stepByStep = false) {
        this.errors = [];
        this.executionSteps = [];
        this.flatSteps = [];
        this.currentStep = 0;
        this.turtle.stateHistory = [];

        try {
            // Einrückung prüfen
            this.validateIndentation(code);

            // Code parsen
            const commands = this.parseIndentedCode(code);

            if (stepByStep) {
                this.flattenCommands(commands);
                return { success: true, steps: this.flatSteps.length };
            }

            this.runCommands(commands);
            return { success: true, steps: this.countCommands(commands) };
        } catch (error) {
            this.errors.push(error.message);
            if (this.console) {
                this.console.error(`Fehler: ${error.message}`);
            }
            return { success: false, error: error.message };
        }
    }

    // Befehle abflachen für Step-by-Step
    flattenCommands(commands, repeatContext = null) {
        for (const cmd of commands) {
            if (cmd.type === 'repeat') {
                for (let i = 0; i < cmd.count; i++) {
                    this.flattenCommands(cmd.commands, { iteration: i + 1, total: cmd.count });
                }
            } else {
                this.flatSteps.push({ ...cmd, repeatContext });
            }
        }
    }

    // Befehle zählen
    countCommands(commands) {
        let count = 0;
        for (const cmd of commands) {
            if (cmd.type === 'repeat') {
                count += cmd.count * this.countCommands(cmd.commands);
            } else {
                count++;
            }
        }
        return count;
    }

    // Einrückung validieren
    validateIndentation(code) {
        const lines = code.split('\n');
        let expectedIndent = 0;
        const indentStack = [0];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const lineNum = i + 1;

            // Leere Zeilen und Kommentare überspringen
            if (line.trim() === '' || line.trim().startsWith('#')) continue;

            // Aktuelle Einrückung berechnen
            const currentIndent = line.match(/^(\s*)/)[1].length;

            // Tabs in Spaces umrechnen (1 Tab = 4 Spaces)
            const normalizedLine = line.replace(/\t/g, '    ');
            const normalizedIndent = normalizedLine.match(/^(\s*)/)[1].length;

            // Prüfen ob die Zeile mit : endet (Block-Start)
            const trimmed = line.trim();
            const startsBlock = trimmed.endsWith(':') && !trimmed.startsWith('#');

            // Prüfen ob Einrückung konsistent ist
            if (normalizedIndent > indentStack[indentStack.length - 1]) {
                // Einrückung erhöht sich
                if (indentStack.length > 1 || startsBlock) {
                    // OK wenn vorherige Zeile Block-Start war oder wir bereits eingerückt sind
                    indentStack.push(normalizedIndent);
                } else if (normalizedIndent !== indentStack[indentStack.length - 1]) {
                    throw new Error(`Zeile ${lineNum}: Unerwartete Einrückung. Einrückung nur nach Doppelpunkt (:) erlaubt.`);
                }
            } else if (normalizedIndent < indentStack[indentStack.length - 1]) {
                // Einrückung verringert sich
                while (indentStack.length > 1 && indentStack[indentStack.length - 1] > normalizedIndent) {
                    indentStack.pop();
                }
                if (indentStack[indentStack.length - 1] !== normalizedIndent) {
                    throw new Error(`Zeile ${lineNum}: Inkonsistente Einrückung. Erwartete ${indentStack[indentStack.length - 1]} Leerzeichen, gefunden ${normalizedIndent}.`);
                }
            }

            // Wenn Block-Start, erwarten wir erhöhte Einrückung
            if (startsBlock) {
                expectedIndent = normalizedIndent + 4;
            }
        }
    }

    // Code mit Einrückung parsen
    parseIndentedCode(code) {
        const lines = code.split('\n')
            .map((line, index) => ({
                content: line.replace(/\t/g, '    '), // Tabs zu Spaces
                lineNum: index + 1
            }))
            .filter(line => line.content.trim() !== '' && !line.content.trim().startsWith('#'));

        return this.parseLines(lines, 0);
    }

    // Zeilen rekursiv parsen
    parseLines(lines, minIndent) {
        const commands = [];
        let i = 0;

        while (i < lines.length) {
            const line = lines[i];
            const indent = line.content.match(/^(\s*)/)[1].length;

            // Überspringen wenn Einrückung zu hoch
            if (indent < minIndent) break;

            if (indent === minIndent) {
                const trimmed = line.content.trim();

                // repeat-Block
                if (trimmed.match(/^repeat\s*\(?(\d+)\)?:/i)) {
                    const match = trimmed.match(/^repeat\s*\(?(\d+)\)?:/i);
                    const count = parseInt(match[1]);

                    // Block-Inhalt finden
                    const blockLines = [];
                    let j = i + 1;
                    while (j < lines.length) {
                        const blockLine = lines[j];
                        const blockIndent = blockLine.content.match(/^(\s*)/)[1].length;
                        if (blockIndent > indent) {
                            blockLines.push(blockLine);
                            j++;
                        } else {
                            break;
                        }
                    }

                    if (blockLines.length === 0) {
                        throw new Error(`Zeile ${line.lineNum}: repeat-Block braucht eingerückte Befehle darunter.`);
                    }

                    const innerCommands = this.parseLines(blockLines, indent + 4);
                    commands.push({ type: 'repeat', count, commands: innerCommands, lineNum: line.lineNum });
                    i = j;
                    continue;
                }

                // Einzelner Befehl
                const cmd = this.parseCommand(trimmed, line.lineNum);
                if (cmd) {
                    commands.push(cmd);
                }
            }

            i++;
        }

        return commands;
    }

    // Einzelnen Befehl parsen (neue Syntax mit Klammern)
    parseCommand(text, lineNum) {
        text = text.trim().toLowerCase();

        // Leere oder Kommentar
        if (!text || text.startsWith('#')) return null;

        // fd(100) - forward
        let match = text.match(/^fd\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'forward', value: parseFloat(match[1]), lineNum };

        // forward(100)
        match = text.match(/^forward\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'forward', value: parseFloat(match[1]), lineNum };

        // bk(100) - backward
        match = text.match(/^bk\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'backward', value: parseFloat(match[1]), lineNum };

        // backward(100)
        match = text.match(/^backward?\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'backward', value: parseFloat(match[1]), lineNum };

        // rt(90) - right
        match = text.match(/^rt\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'right', value: parseFloat(match[1]), lineNum };

        // right(90)
        match = text.match(/^right\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'right', value: parseFloat(match[1]), lineNum };

        // lt(90) - left
        match = text.match(/^lt\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'left', value: parseFloat(match[1]), lineNum };

        // left(90)
        match = text.match(/^left\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'left', value: parseFloat(match[1]), lineNum };

        // pu() - pen up
        if (text.match(/^pu\s*\(\s*\)$/)) return { type: 'penup', lineNum };
        if (text.match(/^penup\s*\(\s*\)$/)) return { type: 'penup', lineNum };

        // pd() - pen down
        if (text.match(/^pd\s*\(\s*\)$/)) return { type: 'pendown', lineNum };
        if (text.match(/^pendown\s*\(\s*\)$/)) return { type: 'pendown', lineNum };

        // setpc("rot") oder setpc("red") oder setpc("#ff0000")
        match = text.match(/^setpc\s*\(\s*["']([^"']+)["']\s*\)$/);
        if (match) return { type: 'color', value: match[1], lineNum };

        // setpencolor
        match = text.match(/^setpencolor\s*\(\s*["']([^"']+)["']\s*\)$/);
        if (match) return { type: 'color', value: match[1], lineNum };

        // setpw(3) - pen width
        match = text.match(/^setpw\s*\(\s*(\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'width', value: parseFloat(match[1]), lineNum };

        // setpenwidth
        match = text.match(/^setpenwidth\s*\(\s*(\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'width', value: parseFloat(match[1]), lineNum };

        // home()
        if (text.match(/^home\s*\(\s*\)$/)) return { type: 'home', lineNum };

        // cs() - clear screen
        if (text.match(/^cs\s*\(\s*\)$/)) return { type: 'clearscreen', lineNum };
        if (text.match(/^clearscreen\s*\(\s*\)$/)) return { type: 'clearscreen', lineNum };

        // ht() - hide turtle
        if (text.match(/^ht\s*\(\s*\)$/)) return { type: 'hideturtle', lineNum };
        if (text.match(/^hideturtle\s*\(\s*\)$/)) return { type: 'hideturtle', lineNum };

        // st() - show turtle
        if (text.match(/^st\s*\(\s*\)$/)) return { type: 'showturtle', lineNum };
        if (text.match(/^showturtle\s*\(\s*\)$/)) return { type: 'showturtle', lineNum };

        // print("text") oder print('text')
        match = text.match(/^print\s*\(\s*["'](.*)["']\s*\)$/);
        if (match) return { type: 'print', value: match[1], lineNum };

        // print(variable) - für Zahlen
        match = text.match(/^print\s*\(\s*(\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'print', value: match[1], lineNum };

        // Alte Syntax ohne Klammern (für Abwärtskompatibilität)
        // fd 100
        match = text.match(/^fd\s+(-?\d+(?:\.\d+)?)$/);
        if (match) return { type: 'forward', value: parseFloat(match[1]), lineNum };

        // bk 100
        match = text.match(/^bk\s+(-?\d+(?:\.\d+)?)$/);
        if (match) return { type: 'backward', value: parseFloat(match[1]), lineNum };

        // rt 90
        match = text.match(/^rt\s+(-?\d+(?:\.\d+)?)$/);
        if (match) return { type: 'right', value: parseFloat(match[1]), lineNum };

        // lt 90
        match = text.match(/^lt\s+(-?\d+(?:\.\d+)?)$/);
        if (match) return { type: 'left', value: parseFloat(match[1]), lineNum };

        // pu / pd ohne Klammern
        if (text === 'pu') return { type: 'penup', lineNum };
        if (text === 'pd') return { type: 'pendown', lineNum };

        // Unbekannter Befehl
        throw new Error(`Zeile ${lineNum}: Unbekannter Befehl "${text}"`);
    }

    // Einzelnen Schritt ausführen (vorwärts)
    executeStep() {
        if (this.currentStep < this.flatSteps.length) {
            const cmd = this.flatSteps[this.currentStep];
            this.turtle.saveState();
            this.runCommand(cmd);
            this.currentStep++;
            return {
                done: this.currentStep >= this.flatSteps.length,
                currentStep: this.currentStep,
                totalSteps: this.flatSteps.length,
                command: cmd
            };
        }
        return { done: true };
    }

    // Schritt zurück
    stepBack() {
        if (this.currentStep > 0 && this.turtle.restoreLastState()) {
            this.currentStep--;
            return {
                done: false,
                currentStep: this.currentStep,
                totalSteps: this.flatSteps.length,
                command: this.flatSteps[this.currentStep]
            };
        }
        return { done: true, atStart: true };
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
            case 'print':
                if (this.console) {
                    this.console.print(cmd.value);
                }
                break;
        }
    }

    // Befehl als String (für Anzeige)
    commandToString(cmd) {
        switch (cmd.type) {
            case 'forward': return `fd(${cmd.value})`;
            case 'backward': return `bk(${cmd.value})`;
            case 'right': return `rt(${cmd.value})`;
            case 'left': return `lt(${cmd.value})`;
            case 'penup': return 'pu()';
            case 'pendown': return 'pd()';
            case 'repeat': return `repeat ${cmd.count}:`;
            case 'color': return `setpc("${cmd.value}")`;
            case 'width': return `setpw(${cmd.value})`;
            case 'home': return 'home()';
            case 'clearscreen': return 'cs()';
            case 'hideturtle': return 'ht()';
            case 'showturtle': return 'st()';
            case 'print': return `print("${cmd.value}")`;
            default: return cmd.type;
        }
    }
}

// ==========================================
// Aufgaben-System (aktualisiert für neue Syntax)
// ==========================================

const defaultTasks = {
    beginner: [
        {
            id: 'b1',
            title: 'Erste Schritte',
            description: 'Lass die Schildkröte 100 Schritte vorwärts gehen! Benutze den Befehl <code>fd(100)</code>.',
            hint: 'Schreibe einfach: fd(100)',
            solution: 'fd(100)',
            reward: 10
        },
        {
            id: 'b2',
            title: 'Hin und zurück',
            description: 'Gehe 50 Schritte vorwärts und dann 50 Schritte rückwärts.',
            hint: 'Benutze fd(50) und dann bk(50)',
            solution: 'fd(50)\nbk(50)',
            reward: 10
        },
        {
            id: 'b3',
            title: 'Die erste Ecke',
            description: 'Gehe 80 Schritte vorwärts und drehe dich dann um 90 Grad nach rechts.',
            hint: 'Benutze fd(80) und dann rt(90)',
            solution: 'fd(80)\nrt(90)',
            reward: 10
        },
        {
            id: 'b4',
            title: 'Der Winkel',
            description: 'Zeichne einen Winkel: Gehe 60 Schritte, drehe 90° rechts, gehe nochmal 60.',
            hint: 'fd(60), rt(90), fd(60)',
            solution: 'fd(60)\nrt(90)\nfd(60)',
            reward: 10
        },
        {
            id: 'b5',
            title: 'Das einfache Quadrat',
            description: 'Zeichne ein Quadrat mit Seitenlänge 80.',
            hint: '4 mal: vorwärts 80, rechts 90',
            solution: 'fd(80)\nrt(90)\nfd(80)\nrt(90)\nfd(80)\nrt(90)\nfd(80)',
            reward: 15
        }
    ],
    intermediate: [
        {
            id: 'i1',
            title: 'Quadrat mit Schleife',
            description: 'Zeichne ein Quadrat mit Seitenlänge 100 mit einer <code>repeat</code>-Schleife!',
            hint: 'repeat 4:\n    fd(100)\n    rt(90)',
            solution: 'repeat 4:\n    fd(100)\n    rt(90)',
            reward: 25
        },
        {
            id: 'i2',
            title: 'Das gleichseitige Dreieck',
            description: 'Zeichne ein gleichseitiges Dreieck mit Seitenlänge 100.',
            hint: 'Bei einem Dreieck drehst du 120°',
            solution: 'repeat 3:\n    fd(100)\n    rt(120)',
            reward: 25
        },
        {
            id: 'i3',
            title: 'Das Sechseck',
            description: 'Zeichne ein regelmäßiges Sechseck mit Seitenlänge 60.',
            hint: '6 Seiten, 360°/6 = 60° pro Drehung',
            solution: 'repeat 6:\n    fd(60)\n    rt(60)',
            reward: 25
        },
        {
            id: 'i4',
            title: 'Die Treppe',
            description: 'Zeichne eine Treppe mit 4 Stufen (je 30 Schritte).',
            hint: 'Vorwärts, rechts, vorwärts, links - 4 mal',
            solution: 'repeat 4:\n    fd(30)\n    rt(90)\n    fd(30)\n    lt(90)',
            reward: 30
        },
        {
            id: 'i5',
            title: 'Der Stern',
            description: 'Zeichne einen 5-zackigen Stern mit Seitenlänge 100.',
            hint: '5 mal mit 144° Drehung',
            solution: 'repeat 5:\n    fd(100)\n    rt(144)',
            reward: 30
        }
    ],
    advanced: [
        {
            id: 'a1',
            title: 'Spirale',
            description: 'Zeichne eine quadratische Spirale (10, 20, 30... bis 80).',
            hint: 'Jede Seite 10 größer als die vorherige',
            solution: 'fd(10)\nrt(90)\nfd(20)\nrt(90)\nfd(30)\nrt(90)\nfd(40)\nrt(90)\nfd(50)\nrt(90)\nfd(60)\nrt(90)\nfd(70)\nrt(90)\nfd(80)',
            reward: 50
        },
        {
            id: 'a2',
            title: 'Kreis',
            description: 'Zeichne einen Kreis mit kleinen Schritten.',
            hint: '36 mal: 10 Schritte, 10° drehen',
            solution: 'repeat 36:\n    fd(10)\n    rt(10)',
            reward: 50
        },
        {
            id: 'a3',
            title: 'Blume',
            description: 'Zeichne eine Blume: 6 Kreise, die sich in der Mitte treffen.',
            hint: '6 Kreise mit je 60° Versatz',
            solution: 'repeat 6:\n    repeat 36:\n        fd(5)\n        rt(10)\n    rt(60)',
            reward: 60
        },
        {
            id: 'a4',
            title: 'Das Haus vom Nikolaus',
            description: 'Zeichne das bekannte "Haus vom Nikolaus" in einem Zug.',
            hint: 'Start unten links, diagonale Linien = 141 Schritte',
            solution: 'fd(100)\nrt(45)\nfd(141)\nrt(135)\nfd(100)\nlt(135)\nfd(141)\nrt(135)\nfd(100)\nrt(90)\nfd(100)\nrt(135)\nfd(141)\nlt(135)\nfd(100)',
            reward: 75
        },
        {
            id: 'a5',
            title: 'Verschachtelte Quadrate',
            description: 'Zeichne 5 Quadrate (20, 40, 60, 80, 100).',
            hint: 'Nutze pu() und pd() zum Bewegen ohne Zeichnen',
            solution: 'repeat 4:\n    fd(20)\n    rt(90)\npu()\nbk(10)\nlt(90)\nbk(10)\nrt(90)\npd()\nrepeat 4:\n    fd(40)\n    rt(90)\npu()\nbk(10)\nlt(90)\nbk(10)\nrt(90)\npd()\nrepeat 4:\n    fd(60)\n    rt(90)\npu()\nbk(10)\nlt(90)\nbk(10)\nrt(90)\npd()\nrepeat 4:\n    fd(80)\n    rt(90)\npu()\nbk(10)\nlt(90)\nbk(10)\nrt(90)\npd()\nrepeat 4:\n    fd(100)\n    rt(90)',
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

    addRubox(amount) {
        this.rubox += amount;
        this.checkLevelUp();
        this.save();
        return amount;
    }

    spendRubox(amount) {
        if (this.rubox >= amount) {
            this.rubox -= amount;
            this.save();
            return true;
        }
        return false;
    }

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
            return true;
        }
        return false;
    }

    getTasks(difficulty) {
        return [...defaultTasks[difficulty], ...this.customTasks[difficulty]];
    }

    getCurrentTask() {
        const tasks = this.getTasks(this.currentDifficulty);
        if (this.currentTaskIndex < tasks.length) {
            return tasks[this.currentTaskIndex];
        }
        return null;
    }

    completeTask(taskId, reward) {
        if (!this.completedTasks.has(taskId)) {
            this.completedTasks.add(taskId);
            this.streak++;
            const earnedRubox = this.addRubox(reward);
            return { earnedRubox, isNew: true };
        }
        this.streak++;
        const earnedRubox = this.addRubox(Math.floor(reward / 2));
        return { earnedRubox, isNew: false };
    }

    resetStreak() {
        this.streak = 0;
        this.save();
    }

    addCustomTask(task) {
        const id = 'custom_' + Date.now();
        const newTask = { ...task, id };
        this.customTasks[task.difficulty].push(newTask);
        this.save();
        return newTask;
    }

    deleteCustomTask(taskId) {
        for (const difficulty of Object.keys(this.customTasks)) {
            this.customTasks[difficulty] = this.customTasks[difficulty].filter(t => t.id !== taskId);
        }
        this.save();
    }

    exportTasks() {
        return JSON.stringify(this.customTasks, null, 2);
    }

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
        this.speed = 5;
        this.isRunning = false;
        this.animationId = null;

        this.initCanvases();
        this.initConsoles();
        this.initInterpreters();
        this.initEventListeners();
        this.initLineNumbers();
        this.updateUI();
        this.loadCurrentTask();
    }

    initCanvases() {
        this.mainTurtle = new Turtle(document.getElementById('turtleCanvas'));
        this.sandboxTurtle = new Turtle(document.getElementById('sandboxCanvas'));
        this.expectedTurtle = new Turtle(document.getElementById('expectedCanvas'), { penWidth: 1 });
        this.adminTurtle = new Turtle(document.getElementById('adminPreviewCanvas'));
    }

    initConsoles() {
        this.mainConsole = new Console(document.getElementById('consoleOutput'));
        this.sandboxConsole = new Console(document.getElementById('sandboxConsoleOutput'));
    }

    initInterpreters() {
        this.mainInterpreter = new XLogoInterpreter(this.mainTurtle, this.mainConsole);
        this.sandboxInterpreter = new XLogoInterpreter(this.sandboxTurtle, this.sandboxConsole);
        this.expectedInterpreter = new XLogoInterpreter(this.expectedTurtle);
        this.adminInterpreter = new XLogoInterpreter(this.adminTurtle);
    }

    initLineNumbers() {
        const updateLineNumbers = (textarea, lineNumbersDiv) => {
            const lines = textarea.value.split('\n').length;
            let html = '';
            for (let i = 1; i <= Math.max(lines, 10); i++) {
                html += `<span>${i}</span>\n`;
            }
            lineNumbersDiv.innerHTML = html;
        };

        const codeInput = document.getElementById('codeInput');
        const lineNumbers = document.getElementById('lineNumbers');
        const sandboxCode = document.getElementById('sandboxCode');
        const sandboxLineNumbers = document.getElementById('sandboxLineNumbers');

        // Initial
        updateLineNumbers(codeInput, lineNumbers);
        updateLineNumbers(sandboxCode, sandboxLineNumbers);

        // Bei Änderung
        codeInput.addEventListener('input', () => updateLineNumbers(codeInput, lineNumbers));
        codeInput.addEventListener('scroll', () => {
            lineNumbers.scrollTop = codeInput.scrollTop;
        });

        sandboxCode.addEventListener('input', () => updateLineNumbers(sandboxCode, sandboxLineNumbers));
        sandboxCode.addEventListener('scroll', () => {
            sandboxLineNumbers.scrollTop = sandboxCode.scrollTop;
        });
    }

    initEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            if (btn.id !== 'shareBtn') {
                btn.addEventListener('click', (e) => this.switchView(e.target.dataset.view));
            }
        });

        // Schwierigkeitsgrad
        document.querySelectorAll('.difficulty-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectDifficulty(e.currentTarget.dataset.difficulty));
        });

        // Haupt-Steuerung
        document.getElementById('runBtn').addEventListener('click', () => this.runCode());
        document.getElementById('stopBtn').addEventListener('click', () => this.stopCode());
        document.getElementById('stepForwardBtn').addEventListener('click', () => this.stepForward());
        document.getElementById('stepBackBtn').addEventListener('click', () => this.stepBack());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetCanvas());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearCode());
        document.getElementById('clearConsoleBtn').addEventListener('click', () => this.mainConsole.clear());

        // Geschwindigkeit
        document.getElementById('speedSlider').addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            document.getElementById('speedValue').textContent = `${this.speed}x`;
            this.mainInterpreter.setSpeed(this.speed);
        });

        // Hinweis
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());

        // Sandbox-Steuerung
        document.getElementById('sandboxRunBtn').addEventListener('click', () => this.runSandboxCode());
        document.getElementById('sandboxStopBtn').addEventListener('click', () => this.stopSandboxCode());
        document.getElementById('sandboxStepForwardBtn').addEventListener('click', () => this.stepSandboxForward());
        document.getElementById('sandboxStepBackBtn').addEventListener('click', () => this.stepSandboxBack());
        document.getElementById('sandboxResetBtn').addEventListener('click', () => this.sandboxTurtle.reset());
        document.getElementById('sandboxClearBtn').addEventListener('click', () => {
            document.getElementById('sandboxCode').value = '';
            this.sandboxTurtle.reset();
            this.sandboxConsole.clear();
        });
        document.getElementById('sandboxClearConsoleBtn').addEventListener('click', () => this.sandboxConsole.clear());

        // Sandbox Farbe/Breite
        document.getElementById('penColor').addEventListener('input', (e) => {
            this.sandboxTurtle.setColor(e.target.value);
        });
        document.getElementById('penWidth').addEventListener('input', (e) => {
            this.sandboxTurtle.setWidth(parseInt(e.target.value));
        });

        // Sandbox Geschwindigkeit
        document.getElementById('sandboxSpeedSlider').addEventListener('input', (e) => {
            this.sandboxInterpreter.setSpeed(parseInt(e.target.value));
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
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Share
        this.initShareListeners();
    }

    handleKeyboard(e) {
        const activeElement = document.activeElement;
        const isTextarea = activeElement.tagName === 'TEXTAREA';
        const isInput = activeElement.tagName === 'INPUT';

        // F5 zum Ausführen
        if (e.key === 'F5') {
            e.preventDefault();
            const view = document.querySelector('.view.active');
            if (view.id === 'sandboxView') {
                this.runSandboxCode();
            } else if (view.id === 'learnView') {
                this.runCode();
            }
        }

        // Escape zum Stoppen
        if (e.key === 'Escape') {
            this.stopCode();
            this.stopSandboxCode();
        }

        // Pfeiltasten nur wenn nicht in Textarea
        if (!isTextarea && !isInput) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const view = document.querySelector('.view.active');
                if (view.id === 'sandboxView') {
                    this.stepSandboxForward();
                } else {
                    this.stepForward();
                }
            }

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const view = document.querySelector('.view.active');
                if (view.id === 'sandboxView') {
                    this.stepSandboxBack();
                } else {
                    this.stepBack();
                }
            }
        }

        // Ctrl+Enter zum Ausführen
        if (e.ctrlKey && e.key === 'Enter') {
            const view = document.querySelector('.view.active');
            if (view.id === 'sandboxView') {
                this.runSandboxCode();
            } else if (view.id === 'learnView') {
                this.runCode();
            }
        }
    }

    switchView(view) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`${view}View`).classList.add('active');

        if (view === 'admin') {
            this.renderCustomTasksList();
        }
    }

    selectDifficulty(difficulty) {
        document.querySelectorAll('.difficulty-card').forEach(card => card.classList.remove('active'));
        document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('active');

        this.gameState.currentDifficulty = difficulty;
        this.gameState.currentTaskIndex = 0;
        this.loadCurrentTask();
    }

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

            document.getElementById('hintContent').classList.remove('visible');
            document.getElementById('hintContent').textContent = '';

            this.expectedTurtle.reset();
            this.expectedInterpreter.execute(task.solution);

            this.mainTurtle.reset();
            document.getElementById('codeInput').value = '';
            this.mainConsole.clear();
            this.mainConsole.log('Neue Aufgabe geladen. Viel Erfolg!', 'info');
        } else {
            document.getElementById('taskContent').innerHTML = `
                <p class="task-description">Alle Aufgaben abgeschlossen! Probiere einen anderen Schwierigkeitsgrad.</p>
            `;
            document.getElementById('taskNumber').textContent = '✓';
        }
    }

    runCode() {
        const code = document.getElementById('codeInput').value.trim();

        if (!code) {
            this.mainConsole.error('Bitte gib zuerst Code ein!');
            return;
        }

        this.mainConsole.clear();
        this.mainConsole.log('Code wird ausgeführt...', 'info');
        this.mainTurtle.reset();

        const result = this.mainInterpreter.execute(code);

        if (!result.success) {
            this.gameState.resetStreak();
            this.updateUI();
            return;
        }

        this.mainConsole.success(`${result.steps} Befehle erfolgreich ausgeführt!`);
        this.checkSolution();
    }

    stopCode() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.mainConsole.log('Ausführung gestoppt.', 'info');
    }

    stepForward() {
        if (this.mainInterpreter.currentStep === 0 || this.mainInterpreter.currentStep >= this.mainInterpreter.flatSteps.length) {
            const code = document.getElementById('codeInput').value.trim();

            if (!code) {
                this.mainConsole.error('Bitte gib zuerst Code ein!');
                return;
            }

            this.mainTurtle.reset();
            this.mainConsole.clear();
            const result = this.mainInterpreter.execute(code, true);

            if (!result.success) return;

            this.mainConsole.log(`Bereit für Schritt-für-Schritt (${result.steps} Schritte)`, 'info');
        }

        const stepResult = this.mainInterpreter.executeStep();

        if (stepResult.done) {
            this.mainConsole.success('Alle Schritte ausgeführt!');
            this.checkSolution();
        } else {
            const cmdStr = this.mainInterpreter.commandToString(stepResult.command);
            this.mainConsole.step(`Schritt ${stepResult.currentStep}/${stepResult.totalSteps}: ${cmdStr}`);
        }
    }

    stepBack() {
        const result = this.mainInterpreter.stepBack();

        if (result.atStart) {
            this.mainConsole.log('Bereits am Anfang.', 'info');
        } else if (!result.done) {
            const cmdStr = this.mainInterpreter.commandToString(result.command);
            this.mainConsole.step(`Zurück zu Schritt ${result.currentStep}/${result.totalSteps}: ${cmdStr}`);
        }
    }

    checkSolution() {
        const task = this.gameState.getCurrentTask();
        if (!task) return;

        const playerPath = this.mainTurtle.getPathSignature();
        const expectedPath = this.expectedTurtle.getPathSignature();

        if (playerPath === expectedPath) {
            const result = this.gameState.completeTask(task.id, task.reward);
            this.showReward(result.earnedRubox, result.isNew);

            if (this.gameState.checkLevelUp()) {
                setTimeout(() => this.showLevelUp(), 1500);
            }
        } else {
            this.mainConsole.error('Das sieht noch nicht ganz richtig aus. Versuche es nochmal!');
            this.gameState.resetStreak();
            this.updateUI();
        }
    }

    resetCanvas() {
        this.mainTurtle.reset();
        this.mainInterpreter.currentStep = 0;
        this.mainInterpreter.flatSteps = [];
        this.mainConsole.clear();
        this.mainConsole.log('Canvas zurückgesetzt.', 'info');
    }

    clearCode() {
        document.getElementById('codeInput').value = '';
        this.resetCanvas();
    }

    showHint() {
        const task = this.gameState.getCurrentTask();
        if (!task) return;

        if (!this.gameState.hintsUsed.has(task.id)) {
            if (this.gameState.rubox < 5) {
                this.mainConsole.error('Du brauchst mindestens 5 Rubox für einen Hinweis!');
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

    showReward(amount, isNew) {
        document.getElementById('rewardAmount').textContent = `+${amount}`;
        document.getElementById('rewardMessage').textContent = isNew
            ? 'Du hast die Aufgabe zum ersten Mal gelöst!'
            : 'Du hast die Aufgabe erneut gemeistert!';
        document.getElementById('rewardPopup').classList.add('visible');
        this.updateUI();
        this.createConfetti();
    }

    showLevelUp() {
        document.getElementById('levelupMessage').textContent = `Du hast Level ${this.gameState.level} erreicht!`;
        document.getElementById('levelupPopup').classList.add('visible');
    }

    nextTask() {
        document.getElementById('rewardPopup').classList.remove('visible');
        this.gameState.currentTaskIndex++;
        this.loadCurrentTask();
    }

    createConfetti() {
        const colors = ['#6c5ce7', '#00cec9', '#fd79a8', '#fdcb6e', '#00b894'];

        for (let i = 0; i < 50; i++) {
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

        if (!document.getElementById('confettiStyle')) {
            const style = document.createElement('style');
            style.id = 'confettiStyle';
            style.textContent = `
                @keyframes confettiFall {
                    to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    updateUI() {
        document.getElementById('ruboxCount').textContent = this.gameState.rubox;
        document.getElementById('playerLevel').textContent = `Level ${this.gameState.level}`;
        document.getElementById('streakCount').textContent = this.gameState.streak;
    }

    // Sandbox
    runSandboxCode() {
        const code = document.getElementById('sandboxCode').value.trim();

        if (!code) {
            this.sandboxConsole.error('Bitte gib Code ein!');
            return;
        }

        this.sandboxConsole.clear();
        this.sandboxConsole.log('Code wird ausgeführt...', 'info');
        this.sandboxTurtle.reset();

        const color = document.getElementById('penColor').value;
        const width = parseInt(document.getElementById('penWidth').value);
        this.sandboxTurtle.setColor(color);
        this.sandboxTurtle.setWidth(width);

        const result = this.sandboxInterpreter.execute(code);

        if (result.success) {
            this.sandboxConsole.success(`${result.steps} Befehle erfolgreich ausgeführt!`);
        }
    }

    stopSandboxCode() {
        this.sandboxConsole.log('Ausführung gestoppt.', 'info');
    }

    stepSandboxForward() {
        if (this.sandboxInterpreter.currentStep === 0 || this.sandboxInterpreter.currentStep >= this.sandboxInterpreter.flatSteps.length) {
            const code = document.getElementById('sandboxCode').value.trim();

            if (!code) {
                this.sandboxConsole.error('Bitte gib Code ein!');
                return;
            }

            this.sandboxTurtle.reset();
            this.sandboxConsole.clear();

            const color = document.getElementById('penColor').value;
            const width = parseInt(document.getElementById('penWidth').value);
            this.sandboxTurtle.setColor(color);
            this.sandboxTurtle.setWidth(width);

            const result = this.sandboxInterpreter.execute(code, true);

            if (!result.success) return;

            this.sandboxConsole.log(`Bereit (${result.steps} Schritte)`, 'info');
        }

        const stepResult = this.sandboxInterpreter.executeStep();

        if (stepResult.done) {
            this.sandboxConsole.success('Alle Schritte ausgeführt!');
        } else {
            const cmdStr = this.sandboxInterpreter.commandToString(stepResult.command);
            this.sandboxConsole.step(`Schritt ${stepResult.currentStep}/${stepResult.totalSteps}: ${cmdStr}`);
        }
    }

    stepSandboxBack() {
        const result = this.sandboxInterpreter.stepBack();

        if (result.atStart) {
            this.sandboxConsole.log('Bereits am Anfang.', 'info');
        } else if (!result.done) {
            const cmdStr = this.sandboxInterpreter.commandToString(result.command);
            this.sandboxConsole.step(`Zurück zu Schritt ${result.currentStep}/${result.totalSteps}`);
        }
    }

    // Admin
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

    saveCustomTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const difficulty = document.getElementById('taskDifficulty').value;
        const solution = document.getElementById('taskSolution').value.trim();
        const hint = document.getElementById('taskHint').value.trim();

        if (!title || !description || !solution) {
            alert('Bitte fülle alle Pflichtfelder aus!');
            return;
        }

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

        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskSolution').value = '';
        document.getElementById('taskHint').value = '';
        this.adminTurtle.reset();

        alert('Aufgabe erfolgreich gespeichert!');
        this.renderCustomTasksList();
    }

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
                alert('Fehler beim Importieren.');
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    }

    renderCustomTasksList() {
        const container = document.getElementById('customTasksList');
        const allTasks = [
            ...this.gameState.customTasks.beginner.map(t => ({ ...t, difficulty: 'beginner' })),
            ...this.gameState.customTasks.intermediate.map(t => ({ ...t, difficulty: 'intermediate' })),
            ...this.gameState.customTasks.advanced.map(t => ({ ...t, difficulty: 'advanced' }))
        ];

        if (allTasks.length === 0) {
            container.innerHTML = '<p style="color: #636e72;">Noch keine eigenen Aufgaben.</p>';
            return;
        }

        const labels = {
            beginner: '🌱 Anfänger',
            intermediate: '🌿 Fortgeschritten',
            advanced: '🌳 Experte'
        };

        container.innerHTML = allTasks.map(task => `
            <div class="custom-task-item">
                <div class="custom-task-info">
                    <h4>${task.title}</h4>
                    <span>${labels[task.difficulty]} | ${task.reward} Rubox</span>
                </div>
                <div class="custom-task-actions">
                    <button class="task-action-btn delete" onclick="app.deleteCustomTask('${task.id}')">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    deleteCustomTask(taskId) {
        if (confirm('Möchtest du diese Aufgabe wirklich löschen?')) {
            this.gameState.deleteCustomTask(taskId);
            this.renderCustomTasksList();
        }
    }

    // Share
    initShareListeners() {
        document.getElementById('shareBtn').addEventListener('click', () => this.openSharePopup());
        document.getElementById('closeShareBtn').addEventListener('click', () => this.closeSharePopup());
        document.getElementById('sharePopup').addEventListener('click', (e) => {
            if (e.target.id === 'sharePopup') this.closeSharePopup();
        });
        document.getElementById('copyLinkBtn').addEventListener('click', () => this.copyShareLink());
        document.getElementById('shareWhatsApp').addEventListener('click', () => this.shareViaWhatsApp());
        document.getElementById('shareEmail').addEventListener('click', () => this.shareViaEmail());
        document.getElementById('downloadQR').addEventListener('click', () => this.downloadQRCode());
    }

    openSharePopup() {
        const popup = document.getElementById('sharePopup');
        const currentUrl = window.location.href;
        document.getElementById('shareLink').value = currentUrl;
        this.generateQRCode(currentUrl);
        popup.classList.add('visible');
    }

    closeSharePopup() {
        document.getElementById('sharePopup').classList.remove('visible');
        document.getElementById('copyFeedback').textContent = '';
    }

    generateQRCode(url) {
        const canvas = document.getElementById('qrCanvas');

        if (typeof QRCode !== 'undefined') {
            QRCode.toCanvas(canvas, url, {
                width: 200,
                margin: 2,
                color: { dark: '#6c5ce7', light: '#ffffff' }
            }, (error) => {
                if (error) console.error('QR-Code Fehler:', error);
            });
        } else {
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
            linkInput.select();
            document.execCommand('copy');
            feedback.textContent = '✓ Link kopiert!';
            setTimeout(() => { feedback.textContent = ''; }, 3000);
        });
    }

    shareViaWhatsApp() {
        const url = document.getElementById('shareLink').value;
        const text = encodeURIComponent(`Lerne spielerisch Programmieren mit xLogo!\n${url}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }

    shareViaEmail() {
        const url = document.getElementById('shareLink').value;
        const subject = encodeURIComponent('xLogo Lernwelt - Spielerisch Programmieren lernen');
        const body = encodeURIComponent(`Hallo!\n\nHier ist ein Link zum Programmieren lernen:\n${url}\n\nViel Spaß!`);
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

// App starten
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new XLogoApp();
});
