

$(document).ready(function() {
		var activity = $('.activity');
		var button = $('.button');
		var leftCol = $('#left-col');
		var rightCol = $('#right-col');

		$('#left-col a.main_link').click(function() {
			if (activity.hasClass('active')) {

				if(activity.hasClass('left')) {

					activity.removeClass('active').removeClass('left');
					leftCol.addClass('pull-left');
					rightCol.addClass('pull-right');

				} else if(activity.hasClass('right')) {
					
					activity.removeClass('right').addClass('left');
				}
			} else {
					activity.addClass('active').addClass('left');
					leftCol.removeClass('pull-left');
					rightCol.removeClass('pull-right');

			}
		});


		$('#right-col a.main_link').click(function() {
			if (activity.hasClass('active')) {

				if(activity.hasClass('right')) {

					activity.removeClass('active').removeClass('right');
					leftCol.addClass('pull-left');
					rightCol.addClass('pull-right');

				} else if(activity.hasClass('left')) {
					
					activity.removeClass('left').addClass('right');

				}
			} else {
					activity.addClass('active').addClass('right');
					leftCol.removeClass('pull-left');
					rightCol.removeClass('pull-right');
			}
		});
})