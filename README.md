# xLogo Lernwelt

<div align="center">

## 🐢 [LIVE DEMO STARTEN](https://albecabrera.github.io/xLogo_interaktiv/) 🐢

[![Live Demo](https://img.shields.io/badge/🚀_LIVE_DEMO-Jetzt_starten!-6c5ce7?style=for-the-badge&labelColor=2d3436)](https://albecabrera.github.io/xLogo_interaktiv/)

### 📋 Link zum Teilen:
```
https://albecabrera.github.io/xLogo_interaktiv/
```

</div>

---

Eine interaktive Lernplattform zum spielerischen Erlernen der Programmiersprache xLogo.

## Features

### Lern-Modus
- **3 Schwierigkeitsgrade**: Anfänger, Fortgeschritten, Experte
- **15+ vorinstallierte Aufgaben** mit steigender Komplexität
- **Visuelle Schildkröten-Simulation** - die Schildkröte bewegt sich genau wie in xLogo
- **Erwartetes Ergebnis** als Vorschau für jede Aufgabe
- **Sofortiges Feedback** bei jedem Versuch
- **Hinweis-System** für Schüler, die nicht weiterkommen

### Belohnungssystem
- **Rubox** als virtuelle Währung
- **Level-System** basierend auf gesammelten Punkten
- **Streak-Zähler** für aufeinanderfolgende richtige Antworten
- **Konfetti-Animation** bei erfolgreicher Lösung

### Sandbox-Modus
- Freies Experimentieren ohne Aufgaben
- Anpassbare Stiftfarbe und -breite
- Vollständige Befehlsreferenz

### Admin-Bereich
- Eigene Aufgaben erstellen
- Musterlösung mit Vorschau
- Export/Import als JSON-Datei
- Aufgaben lokal speichern

### Teilen-Funktion
- QR-Code zum Scannen
- Link zum Kopieren
- WhatsApp und E-Mail Teilen
- QR-Code als Bild speichern

## xLogo Befehle

| Befehl | Beschreibung |
|--------|--------------|
| `fd(X)` | Forward: X Schritte vorwärts |
| `bk(X)` | Back: X Schritte rückwärts |
| `rt(X)` | Right Turn: X Grad nach rechts drehen |
| `lt(X)` | Left Turn: X Grad nach links drehen |
| `pu()` | Pen Up: Stift heben (nicht zeichnen) |
| `pd()` | Pen Down: Stift senken (zeichnen) |
| `repeat X:` | Befehle X mal wiederholen (mit Einrückung!) |
| `setpc("farbe")` | Stiftfarbe ändern |
| `setpw(X)` | Stiftbreite setzen |
| `cs()` | Clear Screen: Bildschirm löschen |
| `home()` | Zur Mitte zurückkehren |
| `ht()` | Hide Turtle: Schildkröte verstecken |
| `st()` | Show Turtle: Schildkröte zeigen |
| `print("text")` | Text in der Konsole ausgeben |

## Tastaturkürzel

| Kürzel | Funktion |
|--------|----------|
| `F5` | Code ausführen |
| `Esc` | Ausführung stoppen / Fullscreen beenden |
| `→` | Schritt vorwärts |
| `←` | Schritt zurück |
| `Ctrl+Enter` | Code ausführen |
| `⌘J` / `Ctrl+J` | Konsole ein-/ausblenden |
| `⌘L` / `Ctrl+L` | Editor-Fullscreen ein-/ausschalten |

## Beispiele

**Quadrat zeichnen:**
```python
repeat 4:
    fd(100)
    rt(90)
```

**Dreieck zeichnen:**
```python
repeat 3:
    fd(100)
    rt(120)
```

**Stern zeichnen:**
```python
repeat 5:
    fd(100)
    rt(144)
```

**Kreis (Annäherung):**
```python
repeat 36:
    fd(10)
    rt(10)
```

**Blume:**
```python
repeat 6:
    repeat 36:
        fd(5)
        rt(10)
    rt(60)
```

## Lokale Entwicklung

1. Repository klonen
2. `index.html` im Browser öffnen oder einen lokalen Server starten:
   ```bash
   python3 -m http.server 8080
   ```
3. Im Browser öffnen: `http://localhost:8080`

## Referenzen

- [xLogo Online (ETH Zürich)](https://xlogo.inf.ethz.ch/release/latest/)
- [Einführung in xLogo (Uni Saarland)](https://informatikdidaktik.cs.uni-saarland.de/einfuehrung-in-xlogo/)

## Lizenz

Dieses Projekt ist für Bildungszwecke gedacht.
