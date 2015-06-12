/*  /
    /
   /                   *************************                                     \
  /                *****@@@@*************@@@@@@@@*****                           \
 /            *****@@@@@@@**:::::::::::::**@@@@@@@@@@@*****                     \ 
/          ***@@@@@@@@@@**:::::::::::::::::**@@@@@@@@@@@*..*****               \
       ****@@@@@@@@@@@*:::::::::::::::::::::*@@@@@@@@@@@*......*****           \ 
     **..*@@@@@@@@@@@*:::::::::::::::::::::::*@@@@@@@@@@@*..........*****      \
   **...*@@@@@@@@@@@*:::::::::::::::::::::::::*@@@@@@@@@@@*..............***   \
 **....*@@@@@@@@@@@*::::::::::::     ::::::::::*@@@@@@@@@@@*................**  \
**.....*@@@@@@@@@@@*:::::::::::       :::::::::*@@@@@@@@@@@*.................**  \
 **....*@@@@@@@@@@@*::::::::::::     ::::::::::*@@@@@@@@@@@*................**    \
   **...*@@@@@@@@@@@*:::::::::::::::::::::::::*@@@@@@@@@@@*..............***       \
     **..*@@@@@@@@@@@*:::::::::::::::::::::::*@@@@@@@@@@@*..........*****           \
       ****@@@@@@@@@@@*:::::::::::::::::::::*@@@@@@@@@@@*......*****                  \
          ***@@@@@@@@@@**:::::::::::::::::**@@@@@@@@@@@*..*****                         \
             *****@@@@@@@**:::::::::::::**@@@@@@@@@@@*****                                 \
                  ******@@@@************@@@@@@@@*****                                         \
                        ************************                                                    \
                                                                                                             \
                                                                                                              \                                                                                                             
				Made by filingr000ve@gmail.com                                                     \
		                                                                                                   \
*/

var app = function() {
	"use strict"; 

	var lang, route, ending, qdb, source, template, FinalHeadingTemplate, html, currentQuestion, owl;

	return {
		init: function() {
			console.info("Initializing...");

			$.getJSON("json/questions.json", function(data) {
				
				qdb = data;
				console.info("Done!");
				$('footer, #artwork, #loader').removeClass('hide');

			}).fail(function() {

				console.error("Can't load JSON! Make sure it exists in a local folder and is valid.");
				app.showError();

			});

			Handlebars.registerHelper('listAnswers', function() {
			  var retString = "";

			  if (this.ans.length === this.next.length) {

			  	if (this.lang) {

			  		app.setLang(this.lang);

			  	}

			  	if (this.route) {

			  		app.setRoute(this.route);

			  	}

			  	if (this.ending) {

			  		app.setEnding(this.ending);

			  	}
			  	
			  	for (var i = this.ans.length - 1; i >= 0; i--) {
			  		retString += "<li class='answer' onClick='app.choose(this)' data-ansID='"+i;
			  		
			  		if (this.endings) {
			  			retString += "' data-end='"+this.endings[i];
			  		}

			  		retString += "' data-next='"+this.next[i]+"'>"+this.ans[i]+"</li>\n";
			  	}

			  	return new Handlebars.SafeString(retString);

			  } else {

			  	app.showError();
			  	console.error("Ans and next array lenght are different. Check your JSON structure");
			  	return false;

			  }			  

			});

			Handlebars.registerHelper('generateHeading', function() {
				
				var retString = "<h2>";

				if (app.retRoute() === "hanako") {

					retString += "История Ханако";

				} else if (app.retRoute() === "emi") {

					retString += "История Эми";

				} else if (app.retRoute() === "lilly") {

					retString += "История Лилли";

				}

				retString += "</h2>\n<em>";

				if (app.retEnding() === "neg") {

					retString += "Негативная концовка";

				} else if (app.retEnding() === "neu") {

					retString += "Нейтральная концовка";

				} else if (app.retEnding() === "pos") {

					retString += "Позитивная концовка";

				}

				retString += "</em>\n<small>";

				if (app.retLang() === "en") {

					$('#artwork-container').removeClass('ru');
					$('#artwork-container').addClass('en');

					retString += "Английский - оригинал от Four Leaf Studios";

				} else if (app.retLang() === "ru") {

					$('#artwork-container').removeClass('en');
					$('#artwork-container').addClass('ru');

					retString += "Русский - перевод от Novellae Subs";

				}

				retString += "</small>";

				return new Handlebars.SafeString(retString);

			});

			template = Handlebars.compile($("#common-question-template").html());
			FinalHeadingTemplate = Handlebars.compile($("#final-heading-template").html());

			$('#start').click(app.start);

			//app.loadFinal();

			var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

			elems.forEach(function(html) {
			  var switchery = new Switchery(html);
			});

		},
		compileQuestion: function(int) {

			if (int == "not_found") {
				return false;
			} else if (int == "final") {
				return false;
			}
			
			html = template(qdb.questions[int]);
			currentQuestion = int;

			$('#question').html(html);
		},
		setLang: function(string) {
			lang = string;
			console.log("Language was set to "+string);
		},
		setRoute: function(string) {
			route = string;
			console.log("Route was set to "+string);
		},
		setEnding: function(string) {
			ending = string;
			console.log("Ending was set to "+string);
		},
		retLang: function() {
			return lang;
		},
		retRoute: function() {
			return route;
		},
		retEnding: function() {
			return ending;
		},
		getDB: function(prop) {
			return qdb[prop];
		},
		start: function() {
			
			app.compileQuestion(0);

			$('footer, #artwork, #loader').addClass('hide');
			$('#question').removeClass('hide');

		},
		choose: function(element) {

			$('.answer').removeClass('chosen');
			element.className = element.className + " chosen";

			document.cookie = currentQuestion+"="+element.getAttribute('data-ansID');

		},
		next: function(element) {

			if ($('.answer.chosen').length > 0) {

					if ($('.answer.chosen').attr('data-end')) {

						app.setEnding($('.answer.chosen').attr('data-end'));

					}

					if ($('.answer.chosen').attr('data-next') == "not_found") {
						
						$("#NF-prev").attr('data-prev', currentQuestion);
						app.loadNF();

					} else if ($('.answer.chosen').attr('data-next') == "final") {
						
						app.loadFinal();

					} else {
						
						app.crossfadeTo('#question', function() {
							app.compileQuestion($('.answer.chosen').attr('data-next'));
						});

					}

			} else {
				alert("Выберите хотя один вариант ответа");
			}

		},
		prev: function(element) {

			setTimeout(function() {
				app.compileQuestion(element.getAttribute('data-prev'));
				app.crossfadeTo('#question');		
			}, 300);

		},
		showError: function() {
			app.hideAll();
			$('#error').removeClass('hide');
		},
		loadNF: function() {
			app.crossfadeTo('#not_found');
		},
		loadFinal: function() {

			$('#final-heading').html(FinalHeadingTemplate());

			$('#owl-container').owlCarousel({
			    navigation: true,
			    singleItem: true,
			    beforeInit: function() {
			    	console.log('owl is alive');

			    	var data = app.getDB(app.retRoute());
  			    	var content = "";

			    	for (var i in data["pictures"]) {

			    		content += "<img src=\"css/assets/"+data["pictures"][i]+"\">";

			    	}

			    	$("#owl-container").html(content);

			    }
			});

			owl = $('#owl-container').data('owlCarousel');

			app.crossfadeTo('#final');

		},
		hideAll: function() {
			$('footer, #loader, #question, #final, #not_found, #error').addClass('hide');
		},
		crossfadeTo: function(query, func) {
			
			$('#loader, #question, #final, #not_found, #error').addClass('crossfade');

			setTimeout(function() {
				
				if(func) {
					func();
				}
				
				$(query).removeClass('crossfade');	
			}, 300);
			
		}
	};
}();

app.init();