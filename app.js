/* ========================================
   xLogo Lernwelt - Hauptanwendung
   Neue Syntax: fd(100), rt(90), repeat 4: mit Einrückung
   ======================================== */

// ==========================================
// Internationalization (i18n)
// ==========================================

const translations = {
    de: {
        'nav.learn': 'Lernen',
        'nav.sandbox': 'Sandbox',
        'nav.admin': 'Aufgaben',
        'nav.share': 'Teilen',
        'difficulty.beginner': 'Anfänger',
        'difficulty.intermediate': 'Fortgeschritten',
        'difficulty.advanced': 'Experte',
        'task.current': 'Aufgabe',
        'task.selectDifficulty': 'Wähle einen Schwierigkeitsgrad!',
        'task.hint': 'Hinweis',
        'task.expected': 'Erwartet:',
        'code.title': 'Code',
        'console.title': 'Konsole',
        'console.welcome': 'Drücke F5 zum Ausführen',
        'console.ready': 'Bereit!',
        'console.running': 'Code wird ausgeführt...',
        'console.success': 'Befehle erfolgreich ausgeführt!',
        'console.error': 'Fehler',
        'console.indentError': 'Einrückungsfehler in Zeile',
        'console.mustBe4': 'Einrückung muss genau 4 Leerzeichen sein',
        'console.enterCode': 'Bitte gib zuerst Code ein!',
        'console.stopped': 'Ausführung gestoppt.',
        'console.reset': 'Canvas zurückgesetzt.',
        'console.atStart': 'Bereits am Anfang.',
        'console.allDone': 'Alle Schritte ausgeführt!',
        'console.step': 'Schritt',
        'console.backTo': 'Zurück zu Schritt',
        'console.readySteps': 'Bereit für Schritt-für-Schritt',
        'console.steps': 'Schritte',
        'console.wrongSolution': 'Das sieht noch nicht ganz richtig aus. Versuche es nochmal!',
        'console.taskLoaded': 'Neue Aufgabe geladen. Viel Erfolg!',
        'console.needRubox': 'Du brauchst mindestens 5 Rubox für einen Hinweis!',
        'reference.title': 'Befehle:',
        'reward.title': 'Fantastisch!',
        'reward.message': 'Aufgabe gelöst!',
        'reward.firstTime': 'Du hast die Aufgabe zum ersten Mal gelöst!',
        'reward.again': 'Du hast die Aufgabe erneut gemeistert!',
        'reward.next': 'Weiter',
        'admin.title': 'Aufgaben erstellen',
        'admin.taskTitle': 'Titel:',
        'admin.difficulty': 'Schwierigkeit:',
        'admin.description': 'Beschreibung:',
        'admin.solution': 'Musterlösung:',
        'admin.hint': 'Hinweis:',
        'admin.save': 'Speichern',
        'admin.preview': 'Vorschau',
        'admin.saved': 'Gespeichert:',
        'share.title': 'Teilen',
        'error.unknownCmd': 'Unbekannter Befehl',
        'error.repeatNeedsBlock': 'repeat-Block braucht eingerückte Befehle darunter.',
        'error.unexpectedIndent': 'Unerwartete Einrückung. Einrückung nur nach Doppelpunkt (:) erlaubt.',
        'error.inconsistentIndent': 'Inkonsistente Einrückung.'
    },
    en: {
        'nav.learn': 'Learn',
        'nav.sandbox': 'Sandbox',
        'nav.admin': 'Tasks',
        'nav.share': 'Share',
        'difficulty.beginner': 'Beginner',
        'difficulty.intermediate': 'Intermediate',
        'difficulty.advanced': 'Expert',
        'task.current': 'Task',
        'task.selectDifficulty': 'Select a difficulty level!',
        'task.hint': 'Hint',
        'task.expected': 'Expected:',
        'code.title': 'Code',
        'console.title': 'Console',
        'console.welcome': 'Press F5 to run',
        'console.ready': 'Ready!',
        'console.running': 'Running code...',
        'console.success': 'commands executed successfully!',
        'console.error': 'Error',
        'console.indentError': 'Indentation error in line',
        'console.mustBe4': 'Indentation must be exactly 4 spaces',
        'console.enterCode': 'Please enter code first!',
        'console.stopped': 'Execution stopped.',
        'console.reset': 'Canvas reset.',
        'console.atStart': 'Already at the beginning.',
        'console.allDone': 'All steps executed!',
        'console.step': 'Step',
        'console.backTo': 'Back to step',
        'console.readySteps': 'Ready for step-by-step',
        'console.steps': 'steps',
        'console.wrongSolution': 'That doesn\'t look quite right. Try again!',
        'console.taskLoaded': 'New task loaded. Good luck!',
        'console.needRubox': 'You need at least 5 Rubox for a hint!',
        'reference.title': 'Commands:',
        'reward.title': 'Fantastic!',
        'reward.message': 'Task solved!',
        'reward.firstTime': 'You solved the task for the first time!',
        'reward.again': 'You mastered the task again!',
        'reward.next': 'Continue',
        'admin.title': 'Create Tasks',
        'admin.taskTitle': 'Title:',
        'admin.difficulty': 'Difficulty:',
        'admin.description': 'Description:',
        'admin.solution': 'Solution:',
        'admin.hint': 'Hint:',
        'admin.save': 'Save',
        'admin.preview': 'Preview',
        'admin.saved': 'Saved:',
        'share.title': 'Share',
        'error.unknownCmd': 'Unknown command',
        'error.repeatNeedsBlock': 'repeat block needs indented commands below.',
        'error.unexpectedIndent': 'Unexpected indentation. Indentation only allowed after colon (:).',
        'error.inconsistentIndent': 'Inconsistent indentation.'
    }
};

let currentLang = 'de';

function t(key) {
    return translations[currentLang][key] || translations['de'][key] || key;
}

function updateUILanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
}

// ==========================================
// Konsolen-Klasse
// ==========================================

class Console {
    constructor(outputElement) {
        this.output = outputElement;
    }

    clear() {
        this.output.innerHTML = `<div class="console-welcome">${t('console.welcome')}</div>`;
    }

    log(message, type = 'info') {
        const line = document.createElement('div');
        line.className = `console-line console-${type}`;
        line.textContent = message;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    success(message) { this.log(message, 'success'); }
    error(message) { this.log(message, 'error'); }
    print(message) { this.log(message, 'print'); }
    step(message) { this.log(message, 'step'); }
}

// ==========================================
// Schildkröten-Klasse (Turtle)
// ==========================================

class Turtle {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.x = this.width / 2;
        this.y = this.height / 2;
        this.angle = -90;
        this.penDown = true;
        this.penColor = options.penColor || '#00aa00';
        this.penWidth = options.penWidth || 2;
        this.speed = options.speed || 5;
        this.pathHistory = [];
        this.stateHistory = [];
        this.turtleVisible = true;
        this.isAnimating = false;
        this.clear();
    }

    saveState() {
        this.stateHistory.push({
            x: this.x, y: this.y, angle: this.angle,
            penDown: this.penDown, penColor: this.penColor,
            penWidth: this.penWidth, pathHistoryLength: this.pathHistory.length
        });
    }

    restoreLastState() {
        if (this.stateHistory.length === 0) return false;
        const state = this.stateHistory.pop();
        this.x = state.x;
        this.y = state.y;
        this.angle = state.angle;
        this.penDown = state.penDown;
        this.penColor = state.penColor;
        this.penWidth = state.penWidth;
        this.pathHistory = this.pathHistory.slice(0, state.pathHistoryLength);
        this.redraw();
        return true;
    }

    clear() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        this.ctx.fillStyle = isDark ? '#1f2335' : '#ffffff';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.drawGrid();
        this.drawTurtle();
    }

    drawGrid() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        this.ctx.strokeStyle = isDark ? '#2a2e42' : '#f0f0f0';
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
        this.ctx.fillStyle = isDark ? '#565f89' : '#ddd';
        this.ctx.beginPath();
        this.ctx.arc(this.width / 2, this.height / 2, 3, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawTurtle() {
        if (!this.turtleVisible) return;
        const size = 18;
        const angleRad = (this.angle * Math.PI) / 180;
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(angleRad + Math.PI / 2);
        this.ctx.shadowColor = 'rgba(0,0,0,0.2)';
        this.ctx.shadowBlur = 5;
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;

        // Shell
        this.ctx.fillStyle = '#2d8a4e';
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, size * 0.7, size, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Pattern
        this.ctx.shadowColor = 'transparent';
        this.ctx.strokeStyle = '#1e6b3a';
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size * 0.7);
        this.ctx.lineTo(0, size * 0.7);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(-size * 0.4, -size * 0.5);
        this.ctx.lineTo(-size * 0.4, size * 0.5);
        this.ctx.moveTo(size * 0.4, -size * 0.5);
        this.ctx.lineTo(size * 0.4, size * 0.5);
        this.ctx.stroke();
        for (let i = -2; i <= 2; i++) {
            if (i === 0) continue;
            this.ctx.beginPath();
            this.ctx.moveTo(-size * 0.5, i * size * 0.25);
            this.ctx.lineTo(size * 0.5, i * size * 0.25);
            this.ctx.stroke();
        }

        // Head
        this.ctx.fillStyle = '#3cb371';
        this.ctx.beginPath();
        this.ctx.ellipse(0, -size * 1.1, size * 0.35, size * 0.4, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Eyes
        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.arc(-size * 0.15, -size * 1.2, 4, 0, Math.PI * 2);
        this.ctx.arc(size * 0.15, -size * 1.2, 4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(-size * 0.15, -size * 1.22, 2, 0, Math.PI * 2);
        this.ctx.arc(size * 0.15, -size * 1.22, 2, 0, Math.PI * 2);
        this.ctx.fill();

        // Legs
        this.ctx.fillStyle = '#3cb371';
        const legs = [
            { x: -size * 0.6, y: -size * 0.4, a: -30 },
            { x: size * 0.6, y: -size * 0.4, a: 30 },
            { x: -size * 0.6, y: size * 0.4, a: -150 },
            { x: size * 0.6, y: size * 0.4, a: 150 }
        ];
        legs.forEach(leg => {
            this.ctx.save();
            this.ctx.translate(leg.x, leg.y);
            this.ctx.rotate((leg.a * Math.PI) / 180);
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, 5, 8, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });

        // Tail
        this.ctx.beginPath();
        this.ctx.moveTo(-3, size * 0.9);
        this.ctx.lineTo(3, size * 0.9);
        this.ctx.lineTo(0, size * 1.3);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.restore();
    }

    redraw() {
        this.clear();
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        for (const seg of this.pathHistory) {
            if (seg.type === 'dot') {
                // Draw dot
                this.ctx.beginPath();
                this.ctx.arc(seg.x, seg.y, seg.diameter / 2, 0, Math.PI * 2);
                this.ctx.fillStyle = seg.color;
                this.ctx.fill();
            } else {
                // Draw line
                this.ctx.strokeStyle = seg.color;
                this.ctx.lineWidth = seg.width;
                this.ctx.beginPath();
                this.ctx.moveTo(seg.x1, seg.y1);
                this.ctx.lineTo(seg.x2, seg.y2);
                this.ctx.stroke();
            }
        }
        this.drawTurtle();
    }

    forward(distance) {
        const angleRad = (this.angle * Math.PI) / 180;
        const newX = this.x + distance * Math.cos(angleRad);
        const newY = this.y + distance * Math.sin(angleRad);
        if (this.penDown) {
            this.pathHistory.push({
                x1: this.x, y1: this.y, x2: newX, y2: newY,
                color: this.penColor, width: this.penWidth
            });
        }
        this.x = newX;
        this.y = newY;
        this.redraw();
    }

    backward(d) { this.forward(-d); }
    right(deg) { this.angle = (this.angle + deg) % 360; this.redraw(); }
    left(deg) { this.angle = (this.angle - deg) % 360; this.redraw(); }
    penUp() { this.penDown = false; }
    penDownFunc() { this.penDown = true; }

    setColor(color) {
        // Vollständige Farbtabelle aus XLogo Cheatsheet
        const colorMap = {
            // Deutsche Namen
            'rot': '#ff0000', 'grün': '#00ff00', 'blau': '#0000ff',
            'gelb': '#ffff00', 'lila': '#8000ff', 'weiß': '#ffffff',
            'schwarz': '#000000', 'braun': '#996600',
            // English names (from cheatsheet)
            'black': '#000000', 'red': '#ff0000', 'green': '#00ff00',
            'yellow': '#ffff00', 'blue': '#0000ff', 'magenta': '#ff00ff',
            'cyan': '#00ffff', 'white': '#ffffff', 'darkgray': '#808080',
            'lightgray': '#c0c0c0', 'darkred': '#800000', 'darkgreen': '#008000',
            'darkblue': '#000080', 'orange': '#ffc800', 'pink': '#ffafaf',
            'purple': '#8000ff', 'brown': '#996600'
        };
        if (color.startsWith('#')) {
            this.penColor = color;
        } else if (color.startsWith('{') || color.startsWith('[')) {
            // RGB format: {R G B} or [R, G, B]
            const rgb = color.replace(/[{}\[\]]/g, '').split(/[\s,]+/).map(Number);
            if (rgb.length === 3) {
                this.penColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
            }
        } else {
            this.penColor = colorMap[color.toLowerCase()] || '#00aa00';
        }
    }

    setWidth(w) { this.penWidth = Math.max(1, Math.min(20, w)); }

    // Position commands
    setX(x) {
        const centerX = this.width / 2;
        this.x = centerX + x;
        this.redraw();
    }

    setY(y) {
        const centerY = this.height / 2;
        this.y = centerY - y; // Y is inverted in canvas
        this.redraw();
    }

    setXY(x, y) {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const newX = centerX + x;
        const newY = centerY - y;
        if (this.penDown) {
            this.pathHistory.push({
                x1: this.x, y1: this.y, x2: newX, y2: newY,
                color: this.penColor, width: this.penWidth
            });
        }
        this.x = newX;
        this.y = newY;
        this.redraw();
    }

    setPos(x, y) {
        // Move without drawing
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        this.x = centerX + x;
        this.y = centerY - y;
        this.redraw();
    }

    moveTo(x, y) {
        // Move with drawing (like setXY)
        this.setXY(x, y);
    }

    getX() {
        return this.x - this.width / 2;
    }

    getY() {
        return this.height / 2 - this.y;
    }

    // Heading commands
    setHeading(angle) {
        // 0 = up, 90 = right, 180 = down, 270 = left
        this.angle = angle - 90; // Convert to canvas coordinates
        this.redraw();
    }

    getHeading() {
        return (this.angle + 90 + 360) % 360;
    }

    setRandomHeading() {
        this.angle = Math.random() * 360 - 90;
        this.redraw();
    }

    home() {
        this.x = this.width / 2;
        this.y = this.height / 2;
        this.angle = -90;
        this.redraw();
    }

    hideTurtle() { this.turtleVisible = false; this.redraw(); }
    showTurtle() { this.turtleVisible = true; this.redraw(); }

    // Drawing commands
    dot(diameter) {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, diameter / 2, 0, Math.PI * 2);
        this.ctx.fillStyle = this.penColor;
        this.ctx.fill();
        // Store dot in path history for redraw
        this.pathHistory.push({
            type: 'dot', x: this.x, y: this.y, diameter: diameter, color: this.penColor
        });
    }

    // Clear commands
    wash() {
        // Clear lines but keep turtle position
        this.pathHistory = [];
        this.redraw();
    }

    clean() {
        // Same as wash
        this.pathHistory = [];
        this.redraw();
    }

    // Background color
    setScreenColor(color) {
        this.backgroundColor = color;
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
        this.backgroundColor = null;
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
// xLogo Interpreter - Strikte 4-Space Einrückung
// ==========================================

class XLogoInterpreter {
    constructor(turtle, console = null) {
        this.turtle = turtle;
        this.console = console;
        this.flatSteps = [];
        this.currentStep = 0;
        this.errors = [];
        this.speed = 5;
    }

    setSpeed(speed) { this.speed = Math.max(1, Math.min(10, speed)); }

    execute(code, stepByStep = false) {
        this.errors = [];
        this.flatSteps = [];
        this.currentStep = 0;
        this.turtle.stateHistory = [];

        try {
            this.validateIndentation(code);
            const commands = this.parseIndentedCode(code);
            if (stepByStep) {
                this.flattenCommands(commands);
                return { success: true, steps: this.flatSteps.length };
            }
            this.runCommands(commands);
            return { success: true, steps: this.countCommands(commands) };
        } catch (error) {
            this.errors.push(error.message);
            if (this.console) this.console.error(`${t('console.error')}: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

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

    // Strikte Einrückungsprüfung: nur 0, 4, 8, 12... Leerzeichen erlaubt
    validateIndentation(code) {
        const lines = code.split('\n');
        const indentStack = [0];
        let prevEndsWithColon = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const lineNum = i + 1;

            if (line.trim() === '' || line.trim().startsWith('#')) continue;

            const normalizedLine = line.replace(/\t/g, '    ');
            const indent = normalizedLine.match(/^(\s*)/)[1].length;
            const trimmed = normalizedLine.trim();
            const endsWithColon = trimmed.endsWith(':') && !trimmed.startsWith('#');

            // Prüfen ob Einrückung ein Vielfaches von 4 ist
            if (indent % 4 !== 0) {
                throw new Error(`${t('console.indentError')} ${lineNum}: ${t('console.mustBe4')} (${indent} gefunden)`);
            }

            const expectedIndent = indentStack[indentStack.length - 1];

            if (indent > expectedIndent) {
                if (prevEndsWithColon && indent === expectedIndent + 4) {
                    indentStack.push(indent);
                } else if (!prevEndsWithColon) {
                    throw new Error(`${t('console.indentError')} ${lineNum}: ${t('error.unexpectedIndent')}`);
                } else {
                    throw new Error(`${t('console.indentError')} ${lineNum}: ${t('console.mustBe4')}`);
                }
            } else if (indent < expectedIndent) {
                while (indentStack.length > 1 && indentStack[indentStack.length - 1] > indent) {
                    indentStack.pop();
                }
                if (indentStack[indentStack.length - 1] !== indent) {
                    throw new Error(`${t('console.indentError')} ${lineNum}: ${t('error.inconsistentIndent')}`);
                }
            }

            prevEndsWithColon = endsWithColon;
        }
    }

    parseIndentedCode(code) {
        const lines = code.split('\n')
            .map((line, index) => ({ content: line.replace(/\t/g, '    '), lineNum: index + 1 }))
            .filter(line => line.content.trim() !== '' && !line.content.trim().startsWith('#'));
        return this.parseLines(lines, 0);
    }

    parseLines(lines, minIndent) {
        const commands = [];
        let i = 0;
        while (i < lines.length) {
            const line = lines[i];
            const indent = line.content.match(/^(\s*)/)[1].length;
            if (indent < minIndent) break;

            if (indent === minIndent) {
                const trimmed = line.content.trim();

                if (trimmed.match(/^repeat\s*\(?(\d+)\)?:/i)) {
                    const match = trimmed.match(/^repeat\s*\(?(\d+)\)?:/i);
                    const count = parseInt(match[1]);
                    const blockLines = [];
                    let j = i + 1;
                    while (j < lines.length) {
                        const blockLine = lines[j];
                        const blockIndent = blockLine.content.match(/^(\s*)/)[1].length;
                        if (blockIndent > indent) {
                            blockLines.push(blockLine);
                            j++;
                        } else break;
                    }
                    if (blockLines.length === 0) {
                        throw new Error(`Zeile ${line.lineNum}: ${t('error.repeatNeedsBlock')}`);
                    }
                    const innerCommands = this.parseLines(blockLines, indent + 4);
                    commands.push({ type: 'repeat', count, commands: innerCommands, lineNum: line.lineNum });
                    i = j;
                    continue;
                }

                const cmd = this.parseCommand(trimmed, line.lineNum);
                if (cmd) commands.push(cmd);
            }
            i++;
        }
        return commands;
    }

    parseCommand(text, lineNum) {
        text = text.trim().toLowerCase();
        if (!text || text.startsWith('#')) return null;

        let match;

        // fd(100) / forward(100)
        match = text.match(/^(?:fd|forward)\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'forward', value: parseFloat(match[1]), lineNum };

        // bk(100) / backward(100)
        match = text.match(/^(?:bk|backward?)\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'backward', value: parseFloat(match[1]), lineNum };

        // rt(90) / right(90)
        match = text.match(/^(?:rt|right)\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'right', value: parseFloat(match[1]), lineNum };

        // lt(90) / left(90)
        match = text.match(/^(?:lt|left)\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'left', value: parseFloat(match[1]), lineNum };

        // pu() / penup()
        if (text.match(/^(?:pu|penup)\s*\(\s*\)$/)) return { type: 'penup', lineNum };

        // pd() / pendown()
        if (text.match(/^(?:pd|pendown)\s*\(\s*\)$/)) return { type: 'pendown', lineNum };

        // setpc("color") / setpencolor("color")
        match = text.match(/^(?:setpc|setpencolor)\s*\(\s*["']([^"']+)["']\s*\)$/);
        if (match) return { type: 'color', value: match[1], lineNum };

        // setpw(3) / setpenwidth(3)
        match = text.match(/^(?:setpw|setpenwidth)\s*\(\s*(\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'width', value: parseFloat(match[1]), lineNum };

        // home()
        if (text.match(/^home\s*\(\s*\)$/)) return { type: 'home', lineNum };

        // cs() / clearscreen()
        if (text.match(/^(?:cs|clearscreen)\s*\(\s*\)$/)) return { type: 'clearscreen', lineNum };

        // ht() / hideturtle()
        if (text.match(/^(?:ht|hideturtle)\s*\(\s*\)$/)) return { type: 'hideturtle', lineNum };

        // st() / showturtle()
        if (text.match(/^(?:st|showturtle)\s*\(\s*\)$/)) return { type: 'showturtle', lineNum };

        // print("text") / print('text') / print(number)
        match = text.match(/^print\s*\(\s*["'](.*)["']\s*\)$/);
        if (match) return { type: 'print', value: match[1], lineNum };
        match = text.match(/^print\s*\(\s*(\d+(?:\.\d+)?)\s*\)$/);
        if (match) return { type: 'print', value: match[1], lineNum };

        // setx(x) - set X coordinate
        match = text.match(/^setx\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/i);
        if (match) return { type: 'setx', value: parseFloat(match[1]), lineNum };

        // sety(y) - set Y coordinate
        match = text.match(/^sety\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/i);
        if (match) return { type: 'sety', value: parseFloat(match[1]), lineNum };

        // setxy(x, y) / setpos(x, y) - set both coordinates
        match = text.match(/^(?:setxy|setpos)\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)$/i);
        if (match) return { type: 'setxy', x: parseFloat(match[1]), y: parseFloat(match[2]), lineNum };

        // moveto(x, y) - move to with drawing
        match = text.match(/^moveto\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)$/i);
        if (match) return { type: 'moveto', x: parseFloat(match[1]), y: parseFloat(match[2]), lineNum };

        // setheading(angle) / heading(angle) - set turtle direction
        match = text.match(/^(?:setheading|heading)\s*\(\s*(-?\d+(?:\.\d+)?)\s*\)$/i);
        if (match) return { type: 'setheading', value: parseFloat(match[1]), lineNum };

        // setrandomheading() - random direction
        if (text.match(/^setrandomheading\s*\(\s*\)$/i)) return { type: 'randomheading', lineNum };

        // dot(diameter) - draw filled circle
        match = text.match(/^dot\s*\(\s*(\d+(?:\.\d+)?)\s*\)$/i);
        if (match) return { type: 'dot', value: parseFloat(match[1]), lineNum };

        // wash() / clean() - clear lines but keep position
        if (text.match(/^(?:wash|clean)\s*\(\s*\)$/i)) return { type: 'wash', lineNum };

        // clear() - clear and hide turtle
        if (text.match(/^clear\s*\(\s*\)$/i)) return { type: 'clear', lineNum };

        // setsc("color") / setscreencolor("color") - background color
        match = text.match(/^(?:setsc|setscreencolor)\s*\(\s*["']([^"']+)["']\s*\)$/i);
        if (match) return { type: 'screencolor', value: match[1], lineNum };

        // delay(ms) / wait(ms) - pause execution
        match = text.match(/^(?:delay|wait)\s*\(\s*(\d+)\s*\)$/i);
        if (match) return { type: 'delay', value: parseInt(match[1]), lineNum };

        // speed(value) - turtle speed
        match = text.match(/^speed\s*\(\s*(-?\d+)\s*\)$/i);
        if (match) return { type: 'speed', value: parseInt(match[1]), lineNum };

        // setPenColor with spc alias
        match = text.match(/^spc\s*\(\s*["']([^"']+)["']\s*\)$/i);
        if (match) return { type: 'color', value: match[1], lineNum };

        // setPenWidth with spw alias
        match = text.match(/^spw\s*\(\s*(\d+(?:\.\d+)?)\s*\)$/i);
        if (match) return { type: 'width', value: parseFloat(match[1]), lineNum };

        // setLineWidth alias
        match = text.match(/^setlinewidth\s*\(\s*(\d+(?:\.\d+)?)\s*\)$/i);
        if (match) return { type: 'width', value: parseFloat(match[1]), lineNum };

        // makeTurtle() - ignored (compatibility)
        if (text.match(/^maketurtle\s*\(\s*\)$/i)) return { type: 'noop', lineNum };

        // from gturtle import * - ignored (compatibility)
        if (text.match(/^from\s+gturtle\s+import\s+\*$/i)) return { type: 'noop', lineNum };

        // Legacy syntax without parentheses (XLogo classic)
        match = text.match(/^fd\s+(-?\d+(?:\.\d+)?)$/i);
        if (match) return { type: 'forward', value: parseFloat(match[1]), lineNum };
        match = text.match(/^bk\s+(-?\d+(?:\.\d+)?)$/i);
        if (match) return { type: 'backward', value: parseFloat(match[1]), lineNum };
        match = text.match(/^rt\s+(-?\d+(?:\.\d+)?)$/i);
        if (match) return { type: 'right', value: parseFloat(match[1]), lineNum };
        match = text.match(/^lt\s+(-?\d+(?:\.\d+)?)$/i);
        if (match) return { type: 'left', value: parseFloat(match[1]), lineNum };

        // XLogo legacy: setpc color / setpw number
        match = text.match(/^setpc\s+(\w+)$/i);
        if (match) return { type: 'color', value: match[1], lineNum };
        match = text.match(/^setpw\s+(\d+)$/i);
        if (match) return { type: 'width', value: parseFloat(match[1]), lineNum };
        match = text.match(/^setsc\s+(\w+)$/i);
        if (match) return { type: 'screencolor', value: match[1], lineNum };

        // XLogo legacy: setx, sety, setxy, setheading without parentheses
        match = text.match(/^setx\s+(-?\d+(?:\.\d+)?)$/i);
        if (match) return { type: 'setx', value: parseFloat(match[1]), lineNum };
        match = text.match(/^sety\s+(-?\d+(?:\.\d+)?)$/i);
        if (match) return { type: 'sety', value: parseFloat(match[1]), lineNum };
        match = text.match(/^setxy\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)$/i);
        if (match) return { type: 'setxy', x: parseFloat(match[1]), y: parseFloat(match[2]), lineNum };
        match = text.match(/^setheading\s+(-?\d+(?:\.\d+)?)$/i);
        if (match) return { type: 'setheading', value: parseFloat(match[1]), lineNum };

        // Single word commands
        if (text.toLowerCase() === 'pu') return { type: 'penup', lineNum };
        if (text.toLowerCase() === 'pd') return { type: 'pendown', lineNum };
        if (text.toLowerCase() === 'ht') return { type: 'hideturtle', lineNum };
        if (text.toLowerCase() === 'st') return { type: 'showturtle', lineNum };
        if (text.toLowerCase() === 'home') return { type: 'home', lineNum };
        if (text.toLowerCase() === 'cs') return { type: 'clearscreen', lineNum };
        if (text.toLowerCase() === 'wash') return { type: 'wash', lineNum };
        if (text.toLowerCase() === 'clean') return { type: 'wash', lineNum };

        throw new Error(`Zeile ${lineNum}: ${t('error.unknownCmd')} "${text}"`);
    }

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

    runCommands(commands) {
        for (const cmd of commands) this.runCommand(cmd);
    }

    runCommand(cmd) {
        switch (cmd.type) {
            case 'forward': this.turtle.forward(cmd.value); break;
            case 'backward': this.turtle.backward(cmd.value); break;
            case 'right': this.turtle.right(cmd.value); break;
            case 'left': this.turtle.left(cmd.value); break;
            case 'penup': this.turtle.penUp(); break;
            case 'pendown': this.turtle.penDownFunc(); break;
            case 'repeat':
                for (let i = 0; i < cmd.count; i++) this.runCommands(cmd.commands);
                break;
            case 'color': this.turtle.setColor(cmd.value); break;
            case 'width': this.turtle.setWidth(cmd.value); break;
            case 'home': this.turtle.home(); break;
            case 'clearscreen': this.turtle.reset(); break;
            case 'hideturtle': this.turtle.hideTurtle(); break;
            case 'showturtle': this.turtle.showTurtle(); break;
            case 'print': if (this.console) this.console.print(cmd.value); break;
            // New commands from cheatsheet
            case 'setx': this.turtle.setX(cmd.value); break;
            case 'sety': this.turtle.setY(cmd.value); break;
            case 'setxy': this.turtle.setPos(cmd.x, cmd.y); break;
            case 'moveto': this.turtle.moveTo(cmd.x, cmd.y); break;
            case 'setheading': this.turtle.setHeading(cmd.value); break;
            case 'randomheading': this.turtle.setRandomHeading(); break;
            case 'dot': this.turtle.dot(cmd.value); break;
            case 'wash': this.turtle.wash(); break;
            case 'clear': this.turtle.clean(); this.turtle.hideTurtle(); break;
            case 'screencolor': this.turtle.setScreenColor(cmd.value); break;
            case 'delay': /* delay is handled differently for animation */ break;
            case 'speed': this.turtle.speed = cmd.value; break;
            case 'noop': /* do nothing - compatibility commands */ break;
        }
    }

    commandToString(cmd) {
        const map = {
            'forward': `fd(${cmd.value})`,
            'backward': `bk(${cmd.value})`,
            'right': `rt(${cmd.value})`,
            'left': `lt(${cmd.value})`,
            'penup': 'pu()',
            'pendown': 'pd()',
            'repeat': `repeat ${cmd.count}:`,
            'color': `setpc("${cmd.value}")`,
            'width': `setpw(${cmd.value})`,
            'home': 'home()',
            'clearscreen': 'cs()',
            'hideturtle': 'ht()',
            'showturtle': 'st()',
            'print': `print("${cmd.value}")`,
            'setx': `setx(${cmd.value})`,
            'sety': `sety(${cmd.value})`,
            'setxy': `setxy(${cmd.x}, ${cmd.y})`,
            'moveto': `moveTo(${cmd.x}, ${cmd.y})`,
            'setheading': `setheading(${cmd.value})`,
            'randomheading': 'setRandomHeading()',
            'dot': `dot(${cmd.value})`,
            'wash': 'wash()',
            'clear': 'clear()',
            'screencolor': `setsc("${cmd.value}")`,
            'delay': `delay(${cmd.value})`,
            'speed': `speed(${cmd.value})`,
            'noop': ''
        };
        return map[cmd.type] || cmd.type;
    }
}

// ==========================================
// Aufgaben (Tasks)
// ==========================================

const defaultTasks = {
    beginner: [
        { id: 'b1', title: 'Erste Schritte', description: 'Lass die Schildkröte 100 Schritte vorwärts gehen! Benutze <code>fd(100)</code>.', hint: 'Schreibe: fd(100)', solution: 'fd(100)', reward: 10 },
        { id: 'b2', title: 'Hin und zurück', description: 'Gehe 50 Schritte vorwärts und dann 50 Schritte rückwärts.', hint: 'fd(50) dann bk(50)', solution: 'fd(50)\nbk(50)', reward: 10 },
        { id: 'b3', title: 'Die erste Ecke', description: 'Gehe 80 Schritte vorwärts und drehe 90° nach rechts.', hint: 'fd(80) dann rt(90)', solution: 'fd(80)\nrt(90)', reward: 10 },
        { id: 'b4', title: 'Der Winkel', description: 'Zeichne einen Winkel: 60 Schritte, 90° rechts, nochmal 60.', hint: 'fd(60), rt(90), fd(60)', solution: 'fd(60)\nrt(90)\nfd(60)', reward: 10 },
        { id: 'b5', title: 'Das einfache Quadrat', description: 'Zeichne ein Quadrat mit Seitenlänge 80.', hint: '4 mal: vorwärts 80, rechts 90', solution: 'fd(80)\nrt(90)\nfd(80)\nrt(90)\nfd(80)\nrt(90)\nfd(80)', reward: 15 }
    ],
    intermediate: [
        { id: 'i1', title: 'Quadrat mit Schleife', description: 'Zeichne ein Quadrat (100) mit <code>repeat</code>-Schleife!', hint: 'repeat 4:\n    fd(100)\n    rt(90)', solution: 'repeat 4:\n    fd(100)\n    rt(90)', reward: 25 },
        { id: 'i2', title: 'Das Dreieck', description: 'Zeichne ein gleichseitiges Dreieck (100).', hint: '120° Drehung', solution: 'repeat 3:\n    fd(100)\n    rt(120)', reward: 25 },
        { id: 'i3', title: 'Das Sechseck', description: 'Zeichne ein Sechseck (60).', hint: '360°/6 = 60°', solution: 'repeat 6:\n    fd(60)\n    rt(60)', reward: 25 },
        { id: 'i4', title: 'Die Treppe', description: 'Zeichne eine Treppe mit 4 Stufen (30).', hint: 'Vorwärts, rechts, vorwärts, links', solution: 'repeat 4:\n    fd(30)\n    rt(90)\n    fd(30)\n    lt(90)', reward: 30 },
        { id: 'i5', title: 'Der Stern', description: 'Zeichne einen 5-zackigen Stern (100).', hint: '144° Drehung', solution: 'repeat 5:\n    fd(100)\n    rt(144)', reward: 30 }
    ],
    advanced: [
        { id: 'a1', title: 'Spirale', description: 'Zeichne eine quadratische Spirale (10, 20, 30... bis 80).', hint: 'Jede Seite 10 größer', solution: 'fd(10)\nrt(90)\nfd(20)\nrt(90)\nfd(30)\nrt(90)\nfd(40)\nrt(90)\nfd(50)\nrt(90)\nfd(60)\nrt(90)\nfd(70)\nrt(90)\nfd(80)', reward: 50 },
        { id: 'a2', title: 'Kreis', description: 'Zeichne einen Kreis.', hint: '36 mal: 10 Schritte, 10° drehen', solution: 'repeat 36:\n    fd(10)\n    rt(10)', reward: 50 },
        { id: 'a3', title: 'Blume', description: 'Zeichne eine Blume: 6 Kreise.', hint: '6 Kreise mit 60° Versatz', solution: 'repeat 6:\n    repeat 36:\n        fd(5)\n        rt(10)\n    rt(60)', reward: 60 },
        { id: 'a4', title: 'Haus vom Nikolaus', description: 'Zeichne das "Haus vom Nikolaus" in einem Zug.', hint: 'Diagonale = 141', solution: 'fd(100)\nrt(45)\nfd(141)\nrt(135)\nfd(100)\nlt(135)\nfd(141)\nrt(135)\nfd(100)\nrt(90)\nfd(100)\nrt(135)\nfd(141)\nlt(135)\nfd(100)', reward: 75 },
        { id: 'a5', title: 'Verschachtelte Quadrate', description: 'Zeichne 5 Quadrate (20, 40, 60, 80, 100).', hint: 'Nutze pu() und pd()', solution: 'repeat 4:\n    fd(20)\n    rt(90)\npu()\nbk(10)\nlt(90)\nbk(10)\nrt(90)\npd()\nrepeat 4:\n    fd(40)\n    rt(90)\npu()\nbk(10)\nlt(90)\nbk(10)\nrt(90)\npd()\nrepeat 4:\n    fd(60)\n    rt(90)\npu()\nbk(10)\nlt(90)\nbk(10)\nrt(90)\npd()\nrepeat 4:\n    fd(80)\n    rt(90)\npu()\nbk(10)\nlt(90)\nbk(10)\nrt(90)\npd()\nrepeat 4:\n    fd(100)\n    rt(90)', reward: 80 }
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
        localStorage.setItem('xlogoGameState', JSON.stringify({
            rubox: this.rubox, level: this.level, streak: this.streak,
            completedTasks: Array.from(this.completedTasks),
            customTasks: this.customTasks,
            hintsUsed: Array.from(this.hintsUsed)
        }));
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
        const thresholds = [0, 50, 150, 300, 500, 750, 1000, 1500, 2000, 3000, 5000];
        let newLevel = 1;
        for (let i = thresholds.length - 1; i >= 0; i--) {
            if (this.rubox >= thresholds[i]) { newLevel = i + 1; break; }
        }
        if (newLevel > this.level) { this.level = newLevel; return true; }
        return false;
    }

    getTasks(difficulty) { return [...defaultTasks[difficulty], ...this.customTasks[difficulty]]; }
    getCurrentTask() {
        const tasks = this.getTasks(this.currentDifficulty);
        return this.currentTaskIndex < tasks.length ? tasks[this.currentTaskIndex] : null;
    }

    completeTask(taskId, reward) {
        if (!this.completedTasks.has(taskId)) {
            this.completedTasks.add(taskId);
            this.streak++;
            return { earnedRubox: this.addRubox(reward), isNew: true };
        }
        this.streak++;
        return { earnedRubox: this.addRubox(Math.floor(reward / 2)), isNew: false };
    }

    resetStreak() { this.streak = 0; this.save(); }

    addCustomTask(task) {
        const newTask = { ...task, id: 'custom_' + Date.now() };
        this.customTasks[task.difficulty].push(newTask);
        this.save();
        return newTask;
    }

    deleteCustomTask(taskId) {
        for (const d of Object.keys(this.customTasks)) {
            this.customTasks[d] = this.customTasks[d].filter(t => t.id !== taskId);
        }
        this.save();
    }

    exportTasks() { return JSON.stringify(this.customTasks, null, 2); }

    importTasks(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            for (const d of Object.keys(imported)) {
                if (this.customTasks[d]) this.customTasks[d].push(...imported[d]);
            }
            this.save();
            return true;
        } catch (e) { return false; }
    }
}

// ==========================================
// Code Editor mit Syntax Highlighting
// ==========================================

class CodeEditor {
    constructor(textareaId, displayId, panelId) {
        this.textarea = document.getElementById(textareaId);
        this.display = document.getElementById(displayId);
        this.panel = document.getElementById(panelId);
        this.displayContent = this.display.querySelector('.code-display-content');
        this.currentLine = 0;
        this.lines = [];
        this.isFullscreen = false;

        this.init();
    }

    init() {
        // Initial render
        this.updateDisplay();

        // Listen for textarea changes
        this.textarea.addEventListener('input', () => this.updateDisplay());
        this.textarea.addEventListener('keydown', (e) => this.handleTextareaKey(e));

        // Click on display to edit
        this.displayContent.addEventListener('click', (e) => this.handleDisplayClick(e));

        // Keyboard navigation on display
        this.displayContent.addEventListener('keydown', (e) => this.handleDisplayKey(e));
        this.displayContent.setAttribute('tabindex', '0');
    }

    updateDisplay() {
        const code = this.textarea.value;
        this.lines = code.split('\n');

        // Build line numbers and code lines
        let lineNumbersHtml = '';
        let codeHtml = '';

        const lineCount = Math.max(this.lines.length, 1);
        for (let i = 0; i < lineCount; i++) {
            const lineNum = i + 1;
            const highlighted = i < this.lines.length ? this.highlightLine(this.lines[i]) : '';
            const isActive = i === this.currentLine;

            // Line number with inline style for active state
            const lineNumStyle = isActive
                ? 'background:#eab308;color:#1a1a1a;font-weight:700;border-radius:4px;padding:0.2rem 0.4rem;'
                : '';
            lineNumbersHtml += `<span class="${isActive ? 'active' : ''}" style="${lineNumStyle}">${lineNum}</span>`;

            // Code line with inline style for active state
            const lineStyle = isActive
                ? 'background:#fef08a;border-left:6px solid #eab308;color:#1a1a1a;font-weight:500;border-radius:4px;'
                : '';
            codeHtml += `<div class="code-line ${isActive ? 'active' : ''}" data-line="${i}" style="${lineStyle}">${highlighted || '&nbsp;'}</div>`;
        }

        this.displayContent.innerHTML = `
            <div class="code-display-lines">${lineNumbersHtml}</div>
            <div class="code-display-code">${codeHtml}</div>
        `;
    }

    highlightLine(line) {
        if (!line.trim()) return '';

        // Escape HTML
        let result = line
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Comments (must be first)
        if (result.trim().startsWith('#')) {
            return `<span class="syntax-comment">${result}</span>`;
        }

        // Preserve leading whitespace for indentation
        const leadingSpace = result.match(/^(\s*)/)[1];
        let content = result.substring(leadingSpace.length);

        // Functions: words followed by () - matches QUADRAT(), hideTurtle(), fd(), etc.
        content = content.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\s*(\()/g, (match, func, paren) => {
            return `<span class="syntax-function">${func}</span><span class="syntax-paren">${paren}</span>`;
        });

        // Closing parenthesis
        content = content.replace(/\)/g, '<span class="syntax-paren">)</span>');

        // Keywords: repeat, if, else, etc.
        content = content.replace(/\b(repeat|if|else|while|for|def|to|end)\b/gi, '<span class="syntax-keyword">$1</span>');

        // Numbers
        content = content.replace(/\b(-?\d+(?:\.\d+)?)\b/g, '<span class="syntax-number">$1</span>');

        // Strings
        content = content.replace(/(["'])([^"']*)\1/g, '<span class="syntax-string">$1$2$1</span>');

        return leadingSpace + content;
    }

    handleDisplayClick(e) {
        const lineEl = e.target.closest('.code-line');
        if (lineEl) {
            const lineNum = parseInt(lineEl.dataset.line);
            this.setActiveLine(lineNum);
        }
        this.displayContent.focus();
    }

    handleDisplayKey(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.moveLine(1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.moveLine(-1);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            this.editCurrentLine();
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
            e.preventDefault();
            this.deleteCurrentLine();
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            // Start typing on current line
            this.editCurrentLine(e.key);
        }
    }

    handleTextareaKey(e) {
        // Auto-close parentheses
        if (e.key === '(') {
            e.preventDefault();
            const start = this.textarea.selectionStart;
            const text = this.textarea.value;
            this.textarea.value = text.substring(0, start) + '()' + text.substring(start);
            this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;
            this.updateDisplay();
        }

        // Tab for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.textarea.selectionStart;
            const text = this.textarea.value;
            this.textarea.value = text.substring(0, start) + '    ' + text.substring(start);
            this.textarea.selectionStart = this.textarea.selectionEnd = start + 4;
            this.updateDisplay();
        }

        // On Enter, sync and update
        if (e.key === 'Enter') {
            setTimeout(() => {
                this.updateDisplay();
                this.currentLine = Math.min(this.currentLine + 1, this.lines.length);
                this.updateActiveLineDisplay();
            }, 0);
        }

        // Escape to exit editing
        if (e.key === 'Escape') {
            this.textarea.blur();
            this.displayContent.focus();
            this.updateDisplay();
        }
    }

    moveLine(direction) {
        const newLine = this.currentLine + direction;
        if (newLine >= 0 && newLine < this.lines.length) {
            this.setActiveLine(newLine);
        }
    }

    setActiveLine(lineNum) {
        this.currentLine = lineNum;
        this.updateActiveLineDisplay();
    }

    updateActiveLineDisplay() {
        const allLines = this.displayContent.querySelectorAll('.code-line');
        const allLineNumbers = this.displayContent.querySelectorAll('.code-display-lines span');

        // Active line style
        const activeLineStyle = 'background:#fef08a;border-left:6px solid #eab308;color:#1a1a1a;font-weight:500;border-radius:4px;';
        const activeNumStyle = 'background:#eab308;color:#1a1a1a;font-weight:700;border-radius:4px;padding:0.2rem 0.4rem;';

        allLines.forEach((el, i) => {
            const isActive = i === this.currentLine;
            el.classList.toggle('active', isActive);
            el.style.cssText = isActive ? activeLineStyle : '';
        });

        allLineNumbers.forEach((el, i) => {
            const isActive = i === this.currentLine;
            el.classList.toggle('active', isActive);
            el.style.cssText = isActive ? activeNumStyle : '';
        });

        // Scroll into view
        const activeLine = this.displayContent.querySelector('.code-line.active');
        if (activeLine) {
            activeLine.scrollIntoView({ block: 'nearest' });
        }
    }

    editCurrentLine(initialChar = '') {
        this.textarea.classList.remove('code-input-hidden');
        this.display.style.display = 'none';

        // Position cursor at the right line
        let charPos = 0;
        for (let i = 0; i < this.currentLine; i++) {
            charPos += this.lines[i].length + 1; // +1 for newline
        }

        this.textarea.focus();
        this.textarea.selectionStart = this.textarea.selectionEnd = charPos + this.lines[this.currentLine].length;

        if (initialChar) {
            const text = this.textarea.value;
            this.textarea.value = text.substring(0, charPos + this.lines[this.currentLine].length) + initialChar + text.substring(charPos + this.lines[this.currentLine].length);
            this.textarea.selectionStart = this.textarea.selectionEnd = charPos + this.lines[this.currentLine].length + 1;
        }
    }

    deleteCurrentLine() {
        if (this.lines.length <= 1) {
            this.lines[0] = '';
        } else {
            this.lines.splice(this.currentLine, 1);
            if (this.currentLine >= this.lines.length) {
                this.currentLine = this.lines.length - 1;
            }
        }
        this.textarea.value = this.lines.join('\n');
        this.updateDisplay();
    }

    exitEditMode() {
        this.textarea.classList.add('code-input-hidden');
        this.display.style.display = '';
        this.updateDisplay();
        this.displayContent.focus();
    }

    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        this.panel.classList.toggle('code-editor-fullscreen', this.isFullscreen);

        if (this.isFullscreen) {
            // Start at first line when entering fullscreen
            this.currentLine = 0;
            // Force re-render with active class
            this.updateDisplay();
            // Small delay to ensure DOM is updated
            setTimeout(() => {
                this.displayContent.focus();
                this.updateActiveLineDisplay();
            }, 50);
        }
    }

    exitFullscreen() {
        if (this.isFullscreen) {
            this.isFullscreen = false;
            this.panel.classList.remove('code-editor-fullscreen');
        }
    }

    getCode() {
        return this.textarea.value;
    }

    setCode(code) {
        this.textarea.value = code;
        this.currentLine = 0;
        this.updateDisplay();
    }
}

// ==========================================
// Hauptanwendung
// ==========================================

class XLogoApp {
    constructor() {
        this.gameState = new GameState();
        this.speed = 5;
        this.initTheme();
        this.initLanguage();
        this.initCanvases();
        this.initConsoles();
        this.initInterpreters();
        this.initCodeEditors();
        this.initEditorFeatures();
        this.initEventListeners();
        this.updateUI();
        this.loadCurrentTask();
    }

    initCodeEditors() {
        this.mainEditor = new CodeEditor('codeInput', 'codeDisplay', 'codePanel');
        this.sandboxEditor = new CodeEditor('sandboxCode', 'sandboxCodeDisplay', 'sandboxCodePanel');
    }

    initTheme() {
        const savedTheme = localStorage.getItem('xlogoTheme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        document.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
    }

    toggleTheme() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('xlogoTheme', newTheme);
        this.updateThemeIcon();
        this.mainTurtle.redraw();
        this.sandboxTurtle.redraw();
        this.expectedTurtle.redraw();
        this.adminTurtle.redraw();
    }

    initLanguage() {
        const savedLang = localStorage.getItem('xlogoLang') || 'de';
        currentLang = savedLang;
        document.getElementById('languageSelect').value = savedLang;
        updateUILanguage();
    }

    setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('xlogoLang', lang);
        updateUILanguage();
        this.mainConsole.clear();
        this.sandboxConsole.clear();
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

    initEditorFeatures() {
        // Setup task solution textarea (not using CodeEditor class for this one)
        const taskSolution = document.getElementById('taskSolution');
        if (taskSolution) {
            taskSolution.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = taskSolution.selectionStart;
                    const text = taskSolution.value;
                    taskSolution.value = text.substring(0, start) + '    ' + text.substring(start);
                    taskSolution.selectionStart = taskSolution.selectionEnd = start + 4;
                }
            });
        }
    }

    initEventListeners() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            if (btn.id !== 'shareBtn') {
                btn.addEventListener('click', (e) => this.switchView(e.target.closest('.nav-btn').dataset.view));
            }
        });

        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('languageSelect').addEventListener('change', (e) => this.setLanguage(e.target.value));

        document.querySelectorAll('.difficulty-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectDifficulty(e.currentTarget.dataset.difficulty));
        });

        document.getElementById('runBtn').addEventListener('click', () => this.runCode());
        document.getElementById('stopBtn').addEventListener('click', () => this.stopCode());
        document.getElementById('stepForwardBtn').addEventListener('click', () => this.stepForward());
        document.getElementById('stepBackBtn').addEventListener('click', () => this.stepBack());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetCanvas());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearCode());
        document.getElementById('clearConsoleBtn').addEventListener('click', () => this.mainConsole.clear());

        document.getElementById('speedSlider').addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            this.mainInterpreter.setSpeed(this.speed);
        });

        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());

        document.getElementById('sandboxRunBtn').addEventListener('click', () => this.runSandboxCode());
        document.getElementById('sandboxStopBtn').addEventListener('click', () => this.stopSandboxCode());
        document.getElementById('sandboxStepForwardBtn').addEventListener('click', () => this.stepSandboxForward());
        document.getElementById('sandboxStepBackBtn').addEventListener('click', () => this.stepSandboxBack());
        document.getElementById('sandboxResetBtn').addEventListener('click', () => this.sandboxTurtle.reset());
        document.getElementById('sandboxClearBtn').addEventListener('click', () => {
            this.sandboxEditor.setCode('');
            this.sandboxTurtle.reset();
            this.sandboxConsole.clear();
        });
        document.getElementById('sandboxClearConsoleBtn').addEventListener('click', () => this.sandboxConsole.clear());

        document.getElementById('penColor').addEventListener('input', (e) => this.sandboxTurtle.setColor(e.target.value));
        document.getElementById('penWidth').addEventListener('input', (e) => this.sandboxTurtle.setWidth(parseInt(e.target.value)));
        document.getElementById('sandboxSpeedSlider').addEventListener('input', (e) => this.sandboxInterpreter.setSpeed(parseInt(e.target.value)));

        document.getElementById('previewSolutionBtn').addEventListener('click', () => this.previewAdminSolution());
        document.getElementById('saveTaskBtn').addEventListener('click', () => this.saveCustomTask());
        document.getElementById('exportTasksBtn').addEventListener('click', () => this.exportTasks());
        document.getElementById('importTasksBtn').addEventListener('click', () => document.getElementById('importFile').click());
        document.getElementById('importFile').addEventListener('change', (e) => this.importTasks(e));

        document.getElementById('nextTaskBtn').addEventListener('click', () => this.nextTask());
        document.getElementById('closeLevelupBtn').addEventListener('click', () => document.getElementById('levelupPopup').classList.remove('visible'));

        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        this.initShareListeners();
    }

    handleKeyboard(e) {
        const active = document.activeElement;
        const isTextarea = active.tagName === 'TEXTAREA';
        const isInput = active.tagName === 'INPUT';
        const view = document.querySelector('.view.active');

        // Cmd+L (Mac) or Ctrl+L (Windows) for fullscreen toggle
        if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
            e.preventDefault();
            if (view.id === 'sandboxView') {
                this.sandboxEditor.toggleFullscreen();
            } else if (view.id === 'learnView') {
                this.mainEditor.toggleFullscreen();
            }
            return;
        }

        // Escape to exit fullscreen
        if (e.key === 'Escape') {
            if (this.mainEditor && this.mainEditor.isFullscreen) {
                this.mainEditor.exitFullscreen();
                return;
            }
            if (this.sandboxEditor && this.sandboxEditor.isFullscreen) {
                this.sandboxEditor.exitFullscreen();
                return;
            }
            // Also exit edit mode
            if (this.mainEditor) this.mainEditor.exitEditMode();
            if (this.sandboxEditor) this.sandboxEditor.exitEditMode();
            this.stopCode();
            this.stopSandboxCode();
        }

        if (e.key === 'F5') {
            e.preventDefault();
            if (view.id === 'sandboxView') this.runSandboxCode();
            else if (view.id === 'learnView') this.runCode();
        }

        if (!isTextarea && !isInput) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (view.id === 'sandboxView') this.stepSandboxForward();
                else this.stepForward();
            }

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (view.id === 'sandboxView') this.stepSandboxBack();
                else this.stepBack();
            }
        }

        if (e.ctrlKey && e.key === 'Enter') {
            if (view.id === 'sandboxView') this.runSandboxCode();
            else if (view.id === 'learnView') this.runCode();
        }
    }

    switchView(view) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(`${view}View`).classList.add('active');
        if (view === 'admin') this.renderCustomTasksList();
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
            document.getElementById('taskContent').innerHTML = `<h4>${task.title}</h4><p class="task-description">${task.description}</p>`;
            const tasks = this.gameState.getTasks(this.gameState.currentDifficulty);
            document.getElementById('taskNumber').textContent = `${this.gameState.currentTaskIndex + 1}/${tasks.length}`;
            document.getElementById('hintContent').classList.remove('visible');
            document.getElementById('hintContent').textContent = '';
            this.expectedTurtle.reset();
            this.expectedInterpreter.execute(task.solution);
            this.mainTurtle.reset();
            this.mainEditor.setCode('');
            this.mainConsole.clear();
            this.mainConsole.log(t('console.taskLoaded'), 'info');
        } else {
            document.getElementById('taskContent').innerHTML = `<p class="task-description">${t('task.selectDifficulty')}</p>`;
            document.getElementById('taskNumber').textContent = '✓';
        }
    }

    runCode() {
        const code = this.mainEditor.getCode().trim();
        if (!code) { this.mainConsole.error(t('console.enterCode')); return; }

        this.mainConsole.clear();
        this.mainConsole.log(t('console.running'), 'info');
        this.mainTurtle.reset();

        const result = this.mainInterpreter.execute(code);
        if (!result.success) { this.gameState.resetStreak(); this.updateUI(); return; }

        this.mainConsole.success(`${result.steps} ${t('console.success')}`);
        this.checkSolution();
    }

    stopCode() { this.mainConsole.log(t('console.stopped'), 'info'); }

    stepForward() {
        if (this.mainInterpreter.currentStep === 0 || this.mainInterpreter.currentStep >= this.mainInterpreter.flatSteps.length) {
            const code = this.mainEditor.getCode().trim();
            if (!code) { this.mainConsole.error(t('console.enterCode')); return; }

            this.mainTurtle.reset();
            this.mainConsole.clear();
            const result = this.mainInterpreter.execute(code, true);
            if (!result.success) return;
            this.mainConsole.log(`${t('console.readySteps')} (${result.steps} ${t('console.steps')})`, 'info');
        }

        const stepResult = this.mainInterpreter.executeStep();
        if (stepResult.done) { this.mainConsole.success(t('console.allDone')); this.checkSolution(); }
        else {
            const cmdStr = this.mainInterpreter.commandToString(stepResult.command);
            this.mainConsole.step(`${t('console.step')} ${stepResult.currentStep}/${stepResult.totalSteps}: ${cmdStr}`);
        }
    }

    stepBack() {
        const result = this.mainInterpreter.stepBack();
        if (result.atStart) this.mainConsole.log(t('console.atStart'), 'info');
        else if (!result.done) {
            const cmdStr = this.mainInterpreter.commandToString(result.command);
            this.mainConsole.step(`${t('console.backTo')} ${result.currentStep}/${result.totalSteps}: ${cmdStr}`);
        }
    }

    checkSolution() {
        const task = this.gameState.getCurrentTask();
        if (!task) return;

        if (this.mainTurtle.getPathSignature() === this.expectedTurtle.getPathSignature()) {
            const result = this.gameState.completeTask(task.id, task.reward);
            this.showReward(result.earnedRubox, result.isNew);
            if (this.gameState.checkLevelUp()) setTimeout(() => this.showLevelUp(), 1500);
        } else {
            this.mainConsole.error(t('console.wrongSolution'));
            this.gameState.resetStreak();
            this.updateUI();
        }
    }

    resetCanvas() {
        this.mainTurtle.reset();
        this.mainInterpreter.currentStep = 0;
        this.mainInterpreter.flatSteps = [];
        this.mainConsole.clear();
        this.mainConsole.log(t('console.reset'), 'info');
    }

    clearCode() { this.mainEditor.setCode(''); this.resetCanvas(); }

    showHint() {
        const task = this.gameState.getCurrentTask();
        if (!task) return;

        if (!this.gameState.hintsUsed.has(task.id)) {
            if (this.gameState.rubox < 5) { this.mainConsole.error(t('console.needRubox')); return; }
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
        document.getElementById('rewardMessage').textContent = isNew ? t('reward.firstTime') : t('reward.again');
        document.getElementById('rewardPopup').classList.add('visible');
        this.updateUI();
        this.createConfetti();
    }

    showLevelUp() {
        document.getElementById('levelupMessage').textContent = `Level ${this.gameState.level}!`;
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
            confetti.style.cssText = `position:fixed;width:10px;height:10px;background:${colors[Math.floor(Math.random() * colors.length)]};left:${Math.random() * 100}vw;top:-10px;border-radius:${Math.random() > 0.5 ? '50%' : '0'};pointer-events:none;z-index:1001;animation:confettiFall ${2 + Math.random() * 2}s linear forwards;`;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }
        if (!document.getElementById('confettiStyle')) {
            const style = document.createElement('style');
            style.id = 'confettiStyle';
            style.textContent = '@keyframes confettiFall { to { transform: translateY(100vh) rotate(720deg); opacity: 0; } }';
            document.head.appendChild(style);
        }
    }

    updateUI() {
        document.getElementById('ruboxCount').textContent = this.gameState.rubox;
        document.getElementById('playerLevel').textContent = `Level ${this.gameState.level}`;
        document.getElementById('streakCount').textContent = this.gameState.streak;
    }

    runSandboxCode() {
        const code = this.sandboxEditor.getCode().trim();
        if (!code) { this.sandboxConsole.error(t('console.enterCode')); return; }

        this.sandboxConsole.clear();
        this.sandboxConsole.log(t('console.running'), 'info');
        this.sandboxTurtle.reset();

        const color = document.getElementById('penColor').value;
        const width = parseInt(document.getElementById('penWidth').value);
        this.sandboxTurtle.setColor(color);
        this.sandboxTurtle.setWidth(width);

        const result = this.sandboxInterpreter.execute(code);
        if (result.success) this.sandboxConsole.success(`${result.steps} ${t('console.success')}`);
    }

    stopSandboxCode() { this.sandboxConsole.log(t('console.stopped'), 'info'); }

    stepSandboxForward() {
        if (this.sandboxInterpreter.currentStep === 0 || this.sandboxInterpreter.currentStep >= this.sandboxInterpreter.flatSteps.length) {
            const code = this.sandboxEditor.getCode().trim();
            if (!code) { this.sandboxConsole.error(t('console.enterCode')); return; }

            this.sandboxTurtle.reset();
            this.sandboxConsole.clear();

            const color = document.getElementById('penColor').value;
            const width = parseInt(document.getElementById('penWidth').value);
            this.sandboxTurtle.setColor(color);
            this.sandboxTurtle.setWidth(width);

            const result = this.sandboxInterpreter.execute(code, true);
            if (!result.success) return;
            this.sandboxConsole.log(`${t('console.readySteps')} (${result.steps})`, 'info');
        }

        const stepResult = this.sandboxInterpreter.executeStep();
        if (stepResult.done) this.sandboxConsole.success(t('console.allDone'));
        else {
            const cmdStr = this.sandboxInterpreter.commandToString(stepResult.command);
            this.sandboxConsole.step(`${t('console.step')} ${stepResult.currentStep}/${stepResult.totalSteps}: ${cmdStr}`);
        }
    }

    stepSandboxBack() {
        const result = this.sandboxInterpreter.stepBack();
        if (result.atStart) this.sandboxConsole.log(t('console.atStart'), 'info');
        else if (!result.done) this.sandboxConsole.step(`${t('console.backTo')} ${result.currentStep}/${result.totalSteps}`);
    }

    previewAdminSolution() {
        const code = document.getElementById('taskSolution').value.trim();
        if (!code) { alert('Bitte gib eine Musterlösung ein!'); return; }
        this.adminTurtle.reset();
        const result = this.adminInterpreter.execute(code);
        if (!result.success) alert(`Fehler: ${result.error}`);
    }

    saveCustomTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const difficulty = document.getElementById('taskDifficulty').value;
        const solution = document.getElementById('taskSolution').value.trim();
        const hint = document.getElementById('taskHint').value.trim();

        if (!title || !description || !solution) { alert('Bitte fülle alle Pflichtfelder aus!'); return; }

        this.adminTurtle.reset();
        const result = this.adminInterpreter.execute(solution);
        if (!result.success) { alert(`Fehler in der Musterlösung: ${result.error}`); return; }

        const rewards = { beginner: 10, intermediate: 25, advanced: 50 };
        this.gameState.addCustomTask({ title, description, difficulty, solution, hint: hint || 'Versuche es Schritt für Schritt!', reward: rewards[difficulty] });

        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskSolution').value = '';
        document.getElementById('taskHint').value = '';
        this.adminTurtle.reset();

        alert('Aufgabe gespeichert!');
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
            if (this.gameState.importTasks(e.target.result)) {
                alert('Aufgaben importiert!');
                this.renderCustomTasksList();
            } else alert('Fehler beim Importieren.');
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
            container.innerHTML = '<p style="color: var(--text-secondary);">Keine Aufgaben.</p>';
            return;
        }

        const labels = { beginner: '🌱', intermediate: '🌿', advanced: '🌳' };
        container.innerHTML = allTasks.map(task => `
            <div class="custom-task-item">
                <div class="custom-task-info">
                    <h4>${task.title}</h4>
                    <span>${labels[task.difficulty]} ${task.reward}</span>
                </div>
                <button class="task-action-btn delete" onclick="app.deleteCustomTask('${task.id}')">🗑️</button>
            </div>
        `).join('');
    }

    deleteCustomTask(taskId) {
        if (confirm('Aufgabe löschen?')) {
            this.gameState.deleteCustomTask(taskId);
            this.renderCustomTasksList();
        }
    }

    initShareListeners() {
        document.getElementById('shareBtn').addEventListener('click', () => this.openSharePopup());
        document.getElementById('closeShareBtn').addEventListener('click', () => this.closeSharePopup());
        document.getElementById('sharePopup').addEventListener('click', (e) => { if (e.target.id === 'sharePopup') this.closeSharePopup(); });
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
            QRCode.toCanvas(canvas, url, { width: 180, margin: 2, color: { dark: '#6c5ce7', light: '#ffffff' } }, (error) => {
                if (error) console.error('QR-Code Fehler:', error);
            });
        } else {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, 180, 180);
            ctx.fillStyle = '#6c5ce7';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('QR-Code', 90, 80);
            ctx.fillText('lädt...', 90, 100);
        }
    }

    copyShareLink() {
        const linkInput = document.getElementById('shareLink');
        const feedback = document.getElementById('copyFeedback');
        navigator.clipboard.writeText(linkInput.value).then(() => {
            feedback.textContent = '✓ Kopiert!';
            setTimeout(() => { feedback.textContent = ''; }, 3000);
        }).catch(() => {
            linkInput.select();
            document.execCommand('copy');
            feedback.textContent = '✓ Kopiert!';
            setTimeout(() => { feedback.textContent = ''; }, 3000);
        });
    }

    shareViaWhatsApp() {
        const url = document.getElementById('shareLink').value;
        const text = encodeURIComponent(`Lerne Programmieren mit xLogo!\n${url}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }

    shareViaEmail() {
        const url = document.getElementById('shareLink').value;
        const subject = encodeURIComponent('xLogo Lernwelt');
        const body = encodeURIComponent(`Hallo!\n\nProgrammieren lernen:\n${url}\n\nViel Spaß!`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
    }

    downloadQRCode() {
        const canvas = document.getElementById('qrCanvas');
        const link = document.createElement('a');
        link.download = 'xlogo-qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => { app = new XLogoApp(); });
