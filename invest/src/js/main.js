

$(document).ready(function() {
		var activity = $('.activity');
		var button = $('.button');

		$('#left-col a.main_link').click(function() {
			if (activity.hasClass('active')) {

				if(activity.hasClass('left')) {

					activity.removeClass('active').removeClass('left');

				} else if(activity.hasClass('right')) {
					
					activity.removeClass('right').addClass('left');
				}
			} else {
					activity.addClass('active').addClass('left');

			}
		});


		$('#right-col a.main_link').click(function() {
			if (activity.hasClass('active')) {

				if(activity.hasClass('right')) {

					activity.removeClass('active').removeClass('right');

				} else if(activity.hasClass('left')) {
					
					activity.removeClass('left').addClass('right');
				}
			} else {
					activity.addClass('active').addClass('right');	
			}
		});
})