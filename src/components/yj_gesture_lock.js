/** by yj https://www.fuwuzg.com qq 302949 */
function t(t, i) {
    if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
}

function i(t, i, h, e) {
    return Math.sqrt(Math.pow(t - h, 2) + Math.pow(i - e, 2));
}

function h(t, h, e, s, c) {
    return i(t, h, e, s) < c;
}

var e = function() {
    function t(t, i) {
        for (var h = 0; h < i.length; h++) {
            var e = i[h];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(t, e.key, e);
        }
    }
    return function(i, h, e) {
        return h && t(i.prototype, h), e && t(i, e), i;
    };
}();

module.exports = function() {
    function i(h, e, s, c) {
        t(this, i), this.touchPoints = [], this.checkPoints = [], this.canvasid = h, this.ctx = e, 
        this.width = c && c.width || 300, this.height = c && c.height || 300, this.cycleNum = c && c.cycleNum || 3, 
        this.radius = 0, this.marge = this.margeCircle = c.margeCircle, this.initColor = c && c.initColor || "#7087bc", 
        this.checkColor = c && c.checkColor || "#a0bcff", this.errorColor = c && c.errorColor || "#f29360", 
        this.touchState = "unTouch", this.pointlineWidth = c.pointlineWidth || 3, this.circleCentreRadius = c.circleCentreRadius, 
        this.lastCheckPoint = null, this.radius = (this.width - 6 - this.margeCircle * (this.cycleNum - 1)) / (2 * this.cycleNum), 
        this.radius = Math.floor(this.radius), this.calCircleParams(), this.onEnd = s;
    }
    return e(i, [ {
        key: "drawGestureLock",
        value: function() {
            for (var t = 0; t < this.touchPoints.length; t++) this.drawCircle(this.touchPoints[t].x, this.touchPoints[t].y, this.radius, this.initColor);
            this.ctx.draw(!0);
        }
    }, {
        key: "calCircleParams",
        value: function() {
            for (var t = this.cycleNum, i = 0; i < t; i++) for (var h = 0; h < t; h++) {
                var e = {
                    x: i * (2 * this.radius + this.margeCircle) + this.radius + 3,
                    y: h * (2 * this.radius + this.margeCircle) + this.radius + 3,
                    index: t * h + i + 1,
                    check: "uncheck"
                };
                this.touchPoints.push(e);
            }
        }
    }, {
        key: "drawCanvas",
        value: function(t, i) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            for (var h = 0; h < this.touchPoints.length; h++) {
                var e = this.touchPoints[h];
                "check" === e.check ? (this.drawCircle(e.x, e.y, this.radius, t), this.drawCircleCentre(e.x, e.y, t)) : this.drawCircle(this.touchPoints[h].x, this.touchPoints[h].y, this.radius, this.initColor);
            }
            if (this.checkPoints.length > 1) for (var s = this.checkPoints[0], c = 1; c < this.checkPoints.length; c++) this.drawLine(s, this.checkPoints[c], t), 
            s = this.checkPoints[c];
            this.lastCheckPoint && i && this.drawLine(this.lastCheckPoint, i, t), this.ctx.draw(!1);
        }
    }, {
        key: "drawCircle",
        value: function(t, i, h, e) {
            this.ctx.beginPath(), this.ctx.setStrokeStyle(e), this.ctx.setLineWidth(2), this.ctx.arc(t, i, h, 0, 2 * Math.PI, !0), 
            this.ctx.stroke();
        }
    }, {
        key: "drawCircleCentre",
        value: function(t, i, h) {
            this.ctx.beginPath(), this.ctx.setStrokeStyle(h), this.ctx.setFillStyle(h), this.ctx.setLineWidth(1), 
            this.ctx.arc(t, i, this.circleCentreRadius, 0, 2 * Math.PI, !0), this.ctx.stroke(), 
            this.ctx.fill();
        }
    }, {
        key: "drawLine",
        value: function(t, i, h) {
            this.ctx.beginPath(), this.ctx.setStrokeStyle(h), this.ctx.setLineWidth(this.pointlineWidth), 
            this.ctx.moveTo(t.x, t.y), this.ctx.lineTo(i.x, i.y), this.ctx.stroke();
        }
    }, {
        key: "gestureError",
        value: function() {
            this.drawCanvas(this.errorColor);
        }
    }, {
        key: "getCheckPoint",
        value: function() {
            return this.checkPoints;
        }
    }, {
        key: "reset",
        value: function() {
            for (var t = 0; t < this.touchPoints.length; t++) this.touchPoints[t].check = "uncheck";
            this.checkPoints = [], this.lastCheckPoint = null, this.drawCanvas(this.initColor);
        }
    }, {
        key: "checkTouch",
        value: function(t) {
            for (var i = 0; i < this.touchPoints.length; i++) {
                var e = this.touchPoints[i];
                if (h(t.touches[0].x, t.touches[0].y, e.x, e.y, this.radius)) return "uncheck" === e.check && (this.checkPoints.push(e), 
                this.lastCheckPoint = e), void (e.check = "check");
            }
        }
    }, {
        key: "onTouchStart",
        value: function(t) {
            if (t.touches.length > 1) this.touchState = "unTouch"; else {
                this.touchState = "startTouch", this.checkTouch(t);
                var i = {
                    x: t.touches[0].x,
                    y: t.touches[0].y
                };
                this.drawCanvas(this.checkColor, i);
            }
        }
    }, {
        key: "onTouchMove",
        value: function(t) {
            if ("unTouch" !== t.touchState) if (t.touches.length > 1) this.touchState = "unTouch"; else {
                this.checkTouch(t);
                var i = {
                    x: t.touches[0].x,
                    y: t.touches[0].y
                };
                this.drawCanvas(this.checkColor, i);
            }
        }
    }, {
        key: "onTouchEnd",
        value: function(t) {
            "function" == typeof this.onEnd && this.onEnd(this.checkPoints, !1);
        }
    }, {
        key: "onTouchCancel",
        value: function(t) {
            "function" == typeof this.onEnd && this.onEnd(this.checkPoints, !0);
        }
    } ]), i;
}();