(function(){
	var defaults = {
		coolDown : 10,
		defaultText: '获取验证码', 
		countDownText: '%s秒重新发送',
		validate: function(){
			return true;
		},
	};
	$.fn.sms = function(options){
		var opt = $.extend(defaults, options);
		
		function countDown(obj) {
			var countDown = opt.coolDown;
			var timer = setInterval(function(){
				if ( -- countDown > 0) {
					$(this).html(opt.countDownText.replace('%s', countDown));
				} else {
					clearInterval(timer);
					$(this).html('获取验证码');
					$(this).removeClass('disabled');
				}
			}.bind(obj), 1000);
		}
		function sendCode() {
			console.log('send code');
			/*$.getJSON(apiUrl, apiParams, function(data){
				console.log(data);
			});*/
		}
			
		return this.each(function(){
			$(this).on('click', function(){
				if ($(this).hasClass('disabled'))
					return false;
				if (opt.validate(opt.mobile)) {
					$(this).addClass('disabled');
					countDown(this);
					sendCode();
				}
			});
		});
	}
})(Zepto);