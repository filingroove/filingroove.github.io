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

	var lang, route, ending, qdb, source, template, html, currentQuestion;

	return {
		init: function() {
			console.info("Initializing...");

			$.getJSON("/json/questions.json", function(data) {
				
				qdb = data;
				console.info("Done!");

			}).fail(function() {

				console.error("Can't load JSON! Make sure it exists in a local folder and is valid.");

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
			  		retString += "<li class='answer' onClick='app.choose(this)' data-ansID='"+i+"' data-next='"+this.next[i]+"'>"+this.ans[i]+"</li>\n";
			  	}

			  	return new Handlebars.SafeString(retString);

			  } else {

			  	console.error("Ans and next array lenght are different. Check your JSON structure");
			  	return false;

			  }			  

			});

			source = $("#common-question-template").html();
			template = Handlebars.compile(source);

			$('#start').click(app.start);

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
		},
		setRoute: function(string) {
			route = string;
		},
		setEnding: function(string) {
			ending = string;
		},
		debug: function() {
		 	return qdb;
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

			if ($('.answer.chosen').lenght > 0) {

				$('#question').addClass('crossfade');

				setTimeout(function() {
					app.compileQuestion($('.answer.chosen').attr('data-next'))
					$('#question').removeClass('crossfade');			
				}, 300);			

			} else {
				alert("Выберите хотя бы один вариант ответа");
			}

		},
		prev: function(element) {

			$('#question').addClass('crossfade');

			setTimeout(function() {
				app.compileQuestion(element.getAttribute('data-prev'))
				$('#question').removeClass('crossfade');			
			}, 300);

		}
	};
}();

app.init();