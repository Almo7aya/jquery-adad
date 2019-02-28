(function () {
  jQuery.fn.adad = function (options) {
    var defualtOptions = {
      abbreviate: true,
      duration: 1000
    };
    if (!options || typeof options !== "object") {
      option = defualtOptions;
    }
    defualtOptions = $.extend(defualtOptions, options);
    var $this = this;

    $this
      .prop("counter", 0)
      .animate({
        counter: $(this).text()
      }, {
        duration: defualtOptions.duration,
        easing: "swing",
        step: function (now) {
          var number = defualtOptions.abbreviate ? number = abbreviateNumber(Math.ceil(now)) : Math.ceil(now);
          $(this).text(number);
        }
      });
    
    /**
     * @function abbreviateNumber
     * @param  {number} num { Number to be abbreviate }
     * @return {string} { The abbreviated number }
     */
    function abbreviateNumber(num) {
      if (typeof num !== "number") {
        throw new TypeError("Expected a number");
      }
      if (num > 1e19) {
        throw new RangeError("Input expected to be < 1e19");
      }
      if (num < -1e19) {
        throw new RangeError("Input expected to be > 1e19");
      }
      if (Math.abs(num) < 1000) {
        return num;
      }
      var shortNumber;
      var exponent;
      var size;
      var sign = num < 0 ? "-" : "";
      var suffixes = {
        K: 6,
        M: 9,
        B: 12,
        T: 16
      };
      num = Math.abs(num);
      size = Math.floor(num).toString().length;
      exponent = size % 3 === 0 ? size - 3 : size - size % 3;
      shortNumber = Math.round(10 * (num / Math.pow(10, exponent))) / 10;
      for (var suffix in suffixes) {
        if (exponent < suffixes[suffix]) {
          shortNumber += suffix;
          break;
        }
      }
      return sign + shortNumber;
    }
  };
})(jQuery);