;(function() {
    var Game = function(canvasId) {
        var canvas = document.getElementById(canvasId);
        var screen = canvas.getContext('2d');
        var gameSize = {x: canvas.width, y: canvas.height};
        var XMIN = 10;
        var YPORTEE = 200;

        this.notes = [new Note(this, gameSize)];

        var self = this;

        var tick = function() {
            self.update();
            self.draw(screen, gameSize);
            setVisuals();
            requestAnimationFrame(tick);
        };

        var setVisuals = function() {
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
           var notes = this.notes;

           for(var i = 0; i < this.notes.length; i++) {
               notes[i].update();
           }
       },

        draw: function(screen, gameSize) {
            screen.clearRect(0, 0, gameSize.x, gameSize.y);
            console.log(this.notes.length);
            for(var i = 0; i < this.notes.length; i++) {
                drawNote(screen, this.notes[i]);
            }
        }
    };

    var Note = function(game, gameSize) {
        this.size = {x: 15, y: 15};
        this.center = {x: gameSize.x, y: gameSize.y / 2};
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
