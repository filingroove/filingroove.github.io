'use strict';

var app = angular.module('RKPIME', ['ngAnimate', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/main");
        //
        // Now set up the states
        $stateProvider.state('main', {
                url: "/main",
                templateUrl: "partials/main.html",
                controller: function controller($scope) {
                    (adsbygoogle = window.adsbygoogle || []).push({});
                }
        }).state('about', {
                url: '/about',
                templateUrl: "partials/about.html"
        });
});

app.directive('fadeIn', function ($timeout) {
        return {
                restrict: 'A',
                link: function link($scope, $element, attrs) {
                        $element.addClass("ng-hide-remove");
                        $element.on('load', function () {
                                $element.addClass("ng-hide-add");
                        });
                }
        };
});

app.controller('rkpimeController', function ($scope, $http) {

        "use strict";

        /*
              PRIVATE VARS
          */

        // API url (duh)

        var _apiURL = "http://api.rkpi.me:8081";
        var _streamURL = "http://api.rkpi.me:8000/pirate";

        // 	Basic HTML5 audio stream
        var _stream = new Audio();

        _stream.setAttribute("type", "audio/mpeg");
        _stream.setAttribute("src", _streamURL);
        _stream.load();

        //  DOM

        //  Not now...
        //var _ppm = document.querySelector('platinum-push-messaging');
        //var _copyToast = document.getElementById('copy-toast');
        //var _pushToast = document.getElementById('push-toast');

        var _player = document.getElementById('player');
        var _playButton = document.getElementById('player-btn');
        var _radioIcon = document.getElementById('radio-icon');
        var _songTitle = document.getElementById('song-title');
        var _preloader = document.getElementById('preloader');
        var _preloaderError = document.getElementById('preloader-error');
        var _artwork = document.getElementById('artwork');
        var _menu = document.querySelector('header .desktop .menu');

        //  Copy confirmation
        var _copyToast = true;

        //  Dummy metadata object for empty metadata or errors
        var _noMetaMessage = {
                artist: "РКПИми",
                song: "Похоже, что у этой песни нет названия...",
                atrworkURL: "images/fallback.png"
        };

        /*
        
            SCOPE VARS
          */

        //  Current song metadata
        $scope.metadata = {};

        $scope.state = {
                menuActive: false
        };

        $scope.featured = [{
                img: "/images/test/Panivalkova.jpg",
                title: "Panivalkova записали у нас альбом",
                desc: "ШОКСЕНСАЦИЯ!1 Лорем ипсум!1111адин"
        }, {
                img: "/images/test/stas.jpg",
                title: "Стас доволен",
                desc: "У него есть макбук, а у тебя — нет"
        }, {
                img: "/images/test/wasserwaage.jpg",
                title: "Новый альбом вагоновожатых выйдет на лейбле РКПИ",
                desc: "Вот такие вот дела, например"
        }, {
                img: "/images/test/gapochka.jpg",
                title: "Гапочка в проекте #трошкилайву",
                desc: "Не прошло и пять лет"
        }];

        /*
              SCOPE FUNCTIONS
          */

        $scope.showMenu = function () {
                $scope.state.menuActive = !$scope.state.menuActive;
        };

        /*
              PRIVATE FUNCTIONS
          */

        //  Decode HTML entity
        function _decodeHTMLEntity(str) {
                return str.replace(/&#(\d+);/g, function (match, dec) {
                        return String.fromCharCode(dec);
                });
        }

        //  Play|Pause button behaviour
        function _play() {
                if (_stream.paused) {
                        _radioIcon.className = _radioIcon.className.replace("flaticon-play87", "flaticon-pause20");
                        _stream.load();
                        _stream.play();
                } else {
                        _radioIcon.className = _radioIcon.className.replace("flaticon-pause20", "flaticon-play87");
                        _stream.pause();
                }
        }

        _playButton.addEventListener("click", _play, false);

        // Copy song metadata to clipboard
        var _copyClient = new ZeroClipboard(_songTitle);

        //console.log(_copyClient);
        _copyClient.on("copy", function (event) {
                if (_copyToast) {
                        var clipboard = event.clipboardData;
                        clipboard.setData("text/plain", _songTitle.textContent);
                        _copyToast.show();
                } else {
                        console.error('There is no #toast element, check your code');
                }
        });

        //	Retrieve JSON /w song's metadata in it
        function _getSongTitle(callback) {

                $http.get(_apiURL + '/getMeta').success(function (res) {

                        if (res.error) {

                                // Not quiet there...
                                console.error(res.error);

                                $scope.metadata = _noMetaMessage;
                        } else {

                                //  This happens to have HTML entities in them
                                res.artist = _decodeHTMLEntity(res.artist);
                                res.song = _decodeHTMLEntity(res.song);

                                $scope.metadata = res;

                                //.log($scope.metadata);
                        }
                }).error(function (res) {

                        console.error("Something's wrong with the remote server. Contact https://vk.com/filingroove if this error continues to occur");

                        $scope.metadata = _noMetaMessage;
                });

                if (callback && typeof callback == 'function') {
                        callback();
                }
        }

        _getSongTitle(function () {
                _preloader.className = 'invisible';
        });

        function _showPreloaderErrorMessage() {
                _preloaderError.className = 'show';
        }

        setInterval(_getSongTitle, 4000);

        setTimeout(_showPreloaderErrorMessage, 6800);
});