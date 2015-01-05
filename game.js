;(function() {
    var Game = function(canvasId) {
        var canvas = document.getElementById(canvasId);
        var screen = canvas.getContext('2d');
        var gameSize = {x: canvas.width, y: canvas.height};
        var XMIN = 10;
        var YPORTEE = 200;
        var ticker = 0;

        this.notes = [];

        var self = this;

        var tick = function() {
            screen.clearRect(0, 0, gameSize.x, gameSize.y);
            self.update();
            setBackground();
            self.draw(screen);

            if(ticker == 30) {
                self.addNote(new Note(gameSize.x, YPORTEE + 25 * Math.floor((Math.random() * 9) - 2)));
                ticker = 0;
            }

            ticker++;
            requestAnimationFrame(tick);
        };

        var setBackground = function() {
            drawVerticalLine();
            drawPortee();
        };

        var drawVerticalLine = function() {
            screen.beginPath();
            screen.moveTo(XMIN, 0);
            screen.lineTo(XMIN, gameSize.y);
            screen.stroke();
        };

        var drawPortee = function() {

            for(var i = 0; i < 5; i++) {
                screen.beginPath();
                screen.moveTo(XMIN, YPORTEE + i * 25);
                screen.lineTo(gameSize.x, YPORTEE + i * 25);
                screen.stroke();
            }
        };

        tick();
    };

    Game.prototype = {
       update: function() {
           for(var i = 0; i < this.notes.length; i++) {
               this.notes[i].update();
           }
       },

        draw: function(screen) {
            for(var i = 0; i < this.notes.length; i++) {
                drawNote(screen, this.notes[i]);
            }
        },

        addNote: function(note) {
            this.notes.push(note);
        }
    };

    var Note = function(x, y) {
        this.size = {x: 15, y: 15};
        this.center = {x: x, y: y};
    };

    Note.prototype = {
        update: function() {
            this.center.x -= 2;
        }
    };

    var drawNote = function(screen, note) {
        screen.fillRect(note.center.x - note.size.x / 2,
                        note.center.y - note.size.y / 2,
                        note.size.x,
                        note.size.y);
    };

    window.onload = function() {
        new Game("screen");
    };
})();
