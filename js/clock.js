(function(window, document, $) {
  $(function(){
    init();
  });

  function init() {
    var clock = new Clock();
    clock.startClock();
  }

  function Clock() {
    this.time = '';
  }
  Clock.prototype = {
    startClock: function() {
      var scope = this;
      setInterval(this.updateClock.bind(this, scope), 500);
    },
    updateClock: function(scope) {
      var strArr = scope.getTime();
      this.updateClockView(strArr);

    },
    updateClockView: function(strArr) {
      var targets = $('.clock-container>ul>li>span');
      for(var i = 0; i < 3; i++) {
        targets.eq(i).html(strArr[i]);
      }
    },
    getTime: function() {
      var today=new Date();
      var h=today.getUTCHours();
      var m=today.getUTCMinutes();
      var s=today.getUTCSeconds();

      var hoursArr = this.convertHourByTimeZone(h);

      m = this.fixLayout(m);
      s = this.fixLayout(s);

      var strArr = [];
      for(var i = 0; i < 3; i++) {
        var str = hoursArr[i] + ':' + m + ':' + s;
        strArr.push(str);
      }
      return strArr;
    },
    convertHourByTimeZone: function(h) {
      // order Tokyo, Riga, London
      var arr = [9, 2, 0,];
      var hourArr = [];

      for(var i = 0; i < 3; i++) {
        var hour = h + arr[i];
        if(24 <= hour) {
          hour = hour - 24;
        } else if(hour < 0) {
          hour = 24 + hour;
        }

        // push
        hourArr.push(hour);

      }

      return hourArr;
    },
    fixLayout: function(i) {
      if (i<10) {
        i = "0" + i;
      }  // add zero in front of numbers < 10
      return i;
    }
  };

})(window, document, window.jQuery);
