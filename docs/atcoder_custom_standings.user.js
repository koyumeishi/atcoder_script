// ==UserScript==
// @name        AtCoderCustomStandings
// @namespace   koyumeishi_scripts_AtCoderCustomStandings
// @description customize your standings on atcoder
// @author      koyumeishi
// @include     http://*.contest.atcoder.jp/standings*
// @downloadURL https://koyumeishi.github.io/atcoder_script/atcoder_custom_standings.user.js
// @version     1.0.3
// @run-at      document-idle
// @require     https://unpkg.com/react@15/dist/react.js
// @require     https://unpkg.com/react-dom@15/dist/react-dom.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js
// @resource    materialIcons https://fonts.googleapis.com/icon?family=Material+Icons
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue 
// @grant       GM_getResourceText
// @grant       GM_addStyle 
// ==/UserScript==

// LICENSE
// MIT

const accsVersion = "1.0.3";

console.log( "AtCoderCustomStandings ver.", accsVersion);
GM_listValues().forEach( (v) => {console.log( v, GM_getValue(v) );} );

GM_addStyle( GM_getResourceText('materialIcons') );



(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util.js');

var util = _interopRequireWildcard(_util);

var _appSettings = require('./appSettings.js');

var _appSettings2 = _interopRequireDefault(_appSettings);

var _friendsList = require('./friendsList.js');

var _friendsList2 = _interopRequireDefault(_friendsList);

var _contestData = require('./contestData.js');

var _contestData2 = _interopRequireDefault(_contestData);

var _stats = require('./stats.js');

var _stats2 = _interopRequireDefault(_stats);

var _controll = require('./controll.js');

var _controll2 = _interopRequireDefault(_controll);

var _standings = require('./standings.js');

var _standings2 = _interopRequireDefault(_standings);

var _pager = require('./pager.js');

var _pager2 = _interopRequireDefault(_pager);

var _userinfo = require('./userinfo.js');

var _userinfo2 = _interopRequireDefault(_userinfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AtCoderCustomStandings = function (_React$Component) {
  _inherits(AtCoderCustomStandings, _React$Component);

  function AtCoderCustomStandings() {
    _classCallCheck(this, AtCoderCustomStandings);

    var _this = _possibleConstructorReturn(this, (AtCoderCustomStandings.__proto__ || Object.getPrototypeOf(AtCoderCustomStandings)).call(this));

    _this.state = {};
    _this.state.settings = new _appSettings2.default(true);
    _this.state.friends = new _friendsList2.default(true);

    util.getStandings(function (s) {
      _this.standings = s;
    }, true);

    _this.contest = new _contestData2.default();

    _this.state.filteredStandings = _this.getFilteredStandings(_this.state.settings);
    _this.state.currentPage = 0; //zero-indexed
    _this.state.totalPage = Math.max(1, Math.floor((_this.state.filteredStandings.length + _this.state.settings.pageSize - 1) / _this.state.settings.pageSize));

    _this.getFilteredStandings.bind(_this);
    _this.getFilteredStandingsToRender.bind(_this);
    _this.updateStandings.bind(_this);

    _this.updateFriends.bind(_this);
    _this.updateSettings.bind(_this);
    return _this;
  }

  _createClass(AtCoderCustomStandings, [{
    key: 'updateSettings',
    value: function updateSettings(newSettings) {
      var _this2 = this;

      newSettings.save();
      this.setState(function (prevState) {
        var newFilteredStandings = _this2.getFilteredStandings(newSettings);
        var totalPage = Math.max(1, Math.floor((newFilteredStandings.length + newSettings.pageSize - 1) / newSettings.pageSize));
        var currentPage = Math.min(totalPage - 1, prevState.currentPage);

        return {
          settings: newSettings,
          filteredStandings: newFilteredStandings,
          totalPage: totalPage,
          currentPage: currentPage
        };
      });
    }
  }, {
    key: 'updateFriends',
    value: function updateFriends(handleNames, adding) {
      this.setState(function (prevState) {
        var newFriends = new _friendsList2.default(false);
        newFriends.friends = new Set(prevState.friends.getList());
        if (adding === true) {
          newFriends.add(handleNames);
        } else if (adding === false) {
          newFriends.remove(handleNames);
        }
        return { friends: newFriends };
      });
    }
  }, {
    key: 'updateStandings',
    value: function updateStandings() {
      var _this3 = this;

      console.log("started updating");

      util.getStandings(function (s) {
        _this3.standings = s;
        _this3.setState(function (prevState) {
          var newFilteredStandings = _this3.getFilteredStandings(_this3.state.settings);
          var totalPage = Math.max(1, Math.floor((newFilteredStandings.length + _this3.state.settings.pageSize - 1) / _this3.state.settings.pageSize));
          var currentPage = Math.min(totalPage - 1, prevState.currentPage);

          return {
            filteredStandings: newFilteredStandings,
            totalPage: totalPage,
            currentPage: currentPage
          };
        });
        console.log("standings updating successfully completed");
      }, false);
    }
  }, {
    key: 'getFilteredStandings',
    value: function getFilteredStandings(settings) {
      var _this4 = this;

      var r = util.rating;
      var nameReg = void 0;
      try {
        nameReg = new RegExp("^" + settings.filterName, "i");
      } catch (e) {
        nameReg = new RegExp("");
      }
      var fStandings = this.standings.filter(function (row) {
        if (settings.filterByFriends === true) {
          if (_this4.state.friends.isFriend(row.user_screen_name) === false && row.user_screen_name !== _userinfo2.default.user_screen_name) {
            return false;
          }
        }
        if (settings.filterByCountry === true) {
          if (row.country !== settings.filterCountry) {
            return false;
          }
        }
        if (settings.filterByRating === true) {
          // rating filter function
          // row.rating
          var level = r.getLevel(row.rating);
          if (settings.filterRating.has(level) === false) {
            return false;
          }
        }
        if (settings.filterByName === true) {
          if (nameReg.exec(row.user_screen_name) === null && nameReg.exec(row.user_name) === null) {
            return false;
          }
        }
        return true;
      });

      if (settings.sortingEnabled === true) {
        var f = util.getSortingFunction(settings.sortingKey);
        if (settings.sortingOrder === "ascending") return fStandings.sort(f);else return fStandings.sort(function (a, b) {
          return f(a, b) * -1;
        });
      } else {
        return fStandings;
      }
    }
  }, {
    key: 'getFilteredStandingsToRender',
    value: function getFilteredStandingsToRender() {
      var pageBegin = this.state.settings.pageSize * this.state.currentPage;
      var pageEnd = this.state.settings.pageSize * (this.state.currentPage + 1);
      return this.state.filteredStandings.slice(pageBegin, pageEnd);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var pageMe = function () {
        var pos = _this5.state.filteredStandings.findIndex(function (row) {
          return row.user_screen_name === _userinfo2.default.user_screen_name;
        });
        if (pos === -1) return null;
        return Math.floor(pos / _this5.state.settings.pageSize);
      }();
      var s = this.getFilteredStandingsToRender();
      var components = React.createElement(
        'div',
        null,
        React.createElement(_controll2.default, { standings: this.standings,
          updateFunc: function updateFunc() {
            return _this5.updateStandings();
          },
          contest: this.contest,
          settings: this.state.settings,
          settingsUpdateFunc: function settingsUpdateFunc(newSettings) {
            _this5.updateSettings(newSettings);
          },
          friends: this.state.friends,
          friendsUpdateFunc: function friendsUpdateFunc(name, adding) {
            return _this5.updateFriends(name, adding);
          },
          getActiveCountries: function getActiveCountries() {
            return [].concat(_toConsumableArray(new Set(_this5.standings.map(function (e) {
              return e.country;
            })))).sort(function (a, b) {
              return util.countries[a] < util.countries[b] ? -1 : 1;
            });
          } }),
        React.createElement(_pager2.default, { current: this.state.currentPage, total: this.state.totalPage,
          me: pageMe,
          onClickFunc: function onClickFunc(e) {
            var page = Number(e.target.getAttribute('data-page'));
            _this5.setState({ currentPage: page });
          } }),
        React.createElement(_standings2.default, { standings: s,
          taskData: this.contest.tasks,
          contestEnded: this.contest.contestEnded,
          settings: this.state.settings,
          friends: this.state.friends,
          friendsUpdateFunc: function friendsUpdateFunc(name, adding) {
            return _this5.updateFriends(name, adding);
          },
          offSet: this.state.currentPage * this.state.settings.pageSize }),
        React.createElement(_pager2.default, { current: this.state.currentPage, total: this.state.totalPage,
          me: pageMe,
          onClickFunc: function onClickFunc(e) {
            e.preventDefault();
            var page = Number(e.target.getAttribute('data-page'));
            _this5.setState({ currentPage: page });
          } })
      );
      return components;
    }
  }]);

  return AtCoderCustomStandings;
}(React.Component);

exports.default = AtCoderCustomStandings;

},{"./appSettings.js":2,"./contestData.js":3,"./controll.js":4,"./friendsList.js":7,"./pager.js":10,"./standings.js":14,"./stats.js":15,"./userinfo.js":19,"./util.js":20}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppSettings = function () {
    function AppSettings(load) {
        _classCallCheck(this, AppSettings);

        //options
        this.highlightFriends = true;
        this.disableRatingColor = false;
        this.displayNameStyle = "user_screen_name";
        this.pageSize = 50;
        this.showNationalFlag = true;

        this.saveFilteringState = false;

        this.filterCountry = null;
        this.filterRating = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        this.filterByFriends = false;
        this.filterByCountry = false;
        this.filterByRating = false;
        this.filterByName = false;
        this.filterName = "";

        if (load === true) this.load();

        if (this.saveFilteringState === false) {
            //reset temporary options
            this.filterByFriends = false;
            this.filterByCountry = false;
            this.filterByRating = false;
            this.filterByName = false;
            this.filterName = "";
        }

        this.sortingEnabled = false;
        // "rank", "user_screen_name", "rating", "country", "competitions", "task{i}"
        this.sortingKey = "rank";
        this.sortingOrder = "ascending";

        this.load.bind(this);
        this.save.bind(this);
    }

    _createClass(AppSettings, [{
        key: "load",
        value: function load() {
            //load
            try {
                var settings = JSON.parse(GM_getValue('settings', '{}'));
                Object.assign(this, settings);
                if (this.filterRating === undefined) this.filterRating = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);else this.filterRating = new Set(this.filterRating);

                console.log("loaded : settings");
                console.log(this);
            } catch (e) {
                console.log("faild to load settings");
                console.log(e);
            }
        }
    }, {
        key: "save",
        value: function save() {
            //save
            this.filterRating = [].concat(_toConsumableArray(this.filterRating));

            var settings = Object.assign({}, this);
            var str = JSON.stringify(settings);

            this.filterRating = new Set(this.filterRating);

            GM_setValue('settings', str);

            console.log("saved : settings");
            console.log(str);
        }
    }, {
        key: "isFiltersEnabled",
        value: function isFiltersEnabled() {
            return this.filterByFriends || this.filterByCountry || this.filterByRating || this.filterByName;
        }
    }]);

    return AppSettings;
}();

exports.default = AppSettings;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContestData = function ContestData() {
  _classCallCheck(this, ContestData);

  this.contstName = $("div.container > a.brand > span.contest-name").text();
  this.startTime = new Date(Date.parse($('time#contest-start-time').text()));
  this.endTime = new Date(Date.parse($('time#contest-end-time').text()));

  this.contestEnded = new Date() >= this.endTime;

  var thead = $('#contest-standings > thead > tr > th');
  this.numTasks = thead.length - 3;
  this.tasks = new Array(this.numTasks);
  for (var i = 0; i < this.numTasks; i++) {
    var taskName = thead.get(i + 2).getElementsByTagName('a')[0].textContent;
    var taskUrl = thead.get(i + 2).getElementsByTagName('a')[0].getAttribute('href');
    this.tasks[i] = new TaskData(taskName, taskUrl, i);
  }
};

exports.default = ContestData;

var TaskData = function TaskData(name, url, id) {
  _classCallCheck(this, TaskData);

  this.name = name;
  this.id = id;
  this.url = url;
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stats = require('./stats.js');

var _stats2 = _interopRequireDefault(_stats);

var _filter = require('./filter.js');

var _filter2 = _interopRequireDefault(_filter);

var _settings = require('./settings.js');

var _settings2 = _interopRequireDefault(_settings);

var _sorting = require('./sorting.js');

var _sorting2 = _interopRequireDefault(_sorting);

var _reload = require('./reload.js');

var _reload2 = _interopRequireDefault(_reload);

var _appSettings = require('./appSettings.js');

var _appSettings2 = _interopRequireDefault(_appSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FriendsButton = function (_React$Component) {
  _inherits(FriendsButton, _React$Component);

  function FriendsButton(props) {
    _classCallCheck(this, FriendsButton);

    var _this = _possibleConstructorReturn(this, (FriendsButton.__proto__ || Object.getPrototypeOf(FriendsButton)).call(this, props));

    _this.update.bind(_this);
    return _this;
  }

  _createClass(FriendsButton, [{
    key: 'update',
    value: function update(option) {
      var newSettings = Object.assign(new _appSettings2.default(), this.props.settings);
      for (var param in option) {
        newSettings[param] = option[param];
      }
      this.props.settingsUpdateFunc(newSettings);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var button = React.createElement(
        'a',
        { href: '#',
          className: 'atcoder-custom-standings ' + (this.props.settings.filterByFriends ? "filtering-enabled" : "filtering-disabled") },
        React.createElement(
          'i',
          { className: 'material-icons' },
          'people'
        ),
        'Friends'
      );

      return React.createElement(
        'div',
        { className: 'atcoder-custom-standings controller-button' },
        React.createElement(
          'div',
          { onClick: function onClick() {
              var newSettings = Object.assign(new _appSettings2.default(), _this2.props.settings);
              newSettings["filterByFriends"] = !_this2.props.settings.filterByFriends;
              _this2.props.settingsUpdateFunc(newSettings);
            } },
          button
        )
      );
    }
  }]);

  return FriendsButton;
}(React.Component);

var Controll = function (_React$Component2) {
  _inherits(Controll, _React$Component2);

  function Controll(props) {
    _classCallCheck(this, Controll);

    return _possibleConstructorReturn(this, (Controll.__proto__ || Object.getPrototypeOf(Controll)).call(this, props));
  }

  _createClass(Controll, [{
    key: 'render',
    value: function render() {
      var ret = React.createElement(
        'div',
        { style: { display: "grid", gridTemplateRows: "1fr", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr" } },
        React.createElement(
          'div',
          { style: { gridRow: "1/2", gridColumn: "1/2", padding: "4px" } },
          React.createElement(_reload2.default, {
            updateFunc: this.props.updateFunc
          })
        ),
        React.createElement(
          'div',
          { style: { gridRow: "1/2", gridColumn: "2/3", padding: "4px" } },
          React.createElement(FriendsButton, {
            settings: this.props.settings,
            settingsUpdateFunc: this.props.settingsUpdateFunc
          })
        ),
        React.createElement(
          'div',
          { style: { gridRow: "1/2", gridColumn: "3/4", padding: "4px" } },
          React.createElement(_filter2.default, {
            settings: this.props.settings,
            settingsUpdateFunc: this.props.settingsUpdateFunc,
            getActiveCountries: this.props.getActiveCountries
          })
        ),
        React.createElement(
          'div',
          { style: { gridRow: "1/2", gridColumn: "4/5", padding: "4px" } },
          React.createElement(_sorting2.default, {
            settings: this.props.settings,
            contest: this.props.contest,
            settingsUpdateFunc: this.props.settingsUpdateFunc
          })
        ),
        React.createElement(
          'div',
          { style: { gridRow: "1/2", gridColumn: "5/6", padding: "4px" } },
          React.createElement(_stats2.default, {
            standings: this.props.standings,
            contest: this.props.contest
          })
        ),
        React.createElement(
          'div',
          { style: { gridRow: "1/2", gridColumn: "6/7", padding: "4px" } },
          React.createElement(_settings2.default, {
            settings: this.props.settings,
            settingsUpdateFunc: this.props.settingsUpdateFunc,
            friends: this.props.friends,
            friendsUpdateFunc: this.props.friendsUpdateFunc
          })
        )
      );

      return ret;
    }
  }]);

  return Controll;
}(React.Component);

exports.default = Controll;

},{"./appSettings.js":2,"./filter.js":6,"./reload.js":11,"./settings.js":12,"./sorting.js":13,"./stats.js":15}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = injectCustomCSS;
function injectCustomCSS() {
  var css = '\n/* Rules for sizing the icon. */\n.material-icons.md-18 { font-size: 18px; }\n.material-icons.md-24 { font-size: 24px; }\n.material-icons.md-36 { font-size: 36px; }\n.material-icons.md-48 { font-size: 48px; }\n\n/* Rules for using icons as black on a light background. */\n.material-icons.md-dark { color: rgba(0, 0, 0, 0.54); }\n.material-icons.md-dark.md-inactive { color: rgba(0, 0, 0, 0.26); }\n\n/* Rules for using icons as white on a dark background. */\n.material-icons.md-light { color: rgba(255, 255, 255, 1); }\n.material-icons.md-light.md-inactive { color: rgba(255, 255, 255, 0.3); }\n\n/* Controller Button */\n.atcoder-custom-standings.controller-button {\n}\n.atcoder-custom-standings.controller-button:hover {\n  background-color: rgba(220,220,220,0.1);\n  box-shadow:2px 4px 8px 0px grey;\n  cursor:pointer;\n  text-decoration: underline;\n}\n\n/* Modal */\n.atcoder-custom-standings.modal-filter{\n  position        : fixed;\n  top             : 0;\n  left            : 0;\n  width           : 100%;\n  height          : 100%;\n  padding-top      : 50px;\n  background-color : rgba(0,0,0,0.5);\n}\n.atcoder-custom-standings.modal-content{\n  position: fixed;\n  top :50%;\n  left: 50%;\n  z-index:1050;\n  overflow:auto;\n  background-color:white;\n  box-shadow:0 3px 8px 3px rgba(0,0,0,0.3);\n  width : 850px;\n  height : 600px;\n  max-height : 600px;\n  margin : -300px 0 0 -425px;\n  padding: 25px;\n}\n\n/* Check Box */\n.material-icons.md-checked { color : rgba(0, 122, 20, 0.9); }\n\n/* Reloading On Off*/\n.atcoder-custom-standings.reloading-enabled  { color: rgb(230, 128, 63); }\n.atcoder-custom-standings.reloading-disabled { color: grey; }\n\n/* Sorting On Off*/\n.atcoder-custom-standings.sorting-enabled  { color: rgb(230, 128, 63); }\n.atcoder-custom-standings.sorting-disabled { color: grey; }\n\n/* Filter On Off*/\n.atcoder-custom-standings.filtering-enabled  { color: rgb(230, 128, 63); }\n.atcoder-custom-standings.filtering-disabled { color: grey; }\n\n/* Settings Item */\n.atcoder-custom-standings.settings-item {\n  padding: 4px;\n  display: block;\n}\n\n/* Standings table */\n.atcoder-custom-standings.timestamp { color:grey; display: block; }\n\n/* Other */\n.atcoder-custom-standings.cursor-link:hover{\n  cursor: pointer;\n  text-decoration: underline;\n}\n\n/* Standings pop down menu */\n.atcoder-custom-standings.user-dropdown-menu-box {\n  position:absolute;\n  padding-top:8px; \n  padding-bottom:8px; \n  background-color:white; \n  box-shadow:4px 4px 8px 4px grey; \n  border-radius:0px 0px 6px 0px;\n  cursor: auto;\n}\n.atcoder-custom-standings.user-dropdown-menu {\n  display : block;\n  line-height: 2em;\n  padding-left : 8px;\n  padding-right : 8px;\n}\n.atcoder-custom-standings.user-dropdown-menu:hover {\n  background : lightblue;\n}\n\n/* modify original */\na.user-red {\n  color:#FF0000;\n}\n\n.standings-friend td {background-color : rgba(0, 150, 100, 0.09) !important;}\n.standings-friend:hover td {background-color: rgba(0, 200, 150, 0.09) !important;}\n\n.standings-friend > td.standings-frozen {background-color : rgba(0, 82, 255, 0.27) !important;}\n.standings-friend > td.standings-frozen:hover {background-color: rgba(0, 82, 255, 0.27) !important;}\n\n\n.table-striped tbody tr:nth-child(odd) td, .table-striped tbody tr:nth-child(odd) th {background-color: #fefefe;}\n.table tbody tr:hover td, .table tbody tr:hover th {background-color: #fefefe;}\n\ntd.standings-username:hover {\n  cursor: pointer;\n  text-decoration: underline;\n}\n\n.table-sort th{\n  background-image: none !important;\n}\n\n.pagination .me a {\n  background-color: rgba(252, 0, 0, 0.09);\n  color : rgb(114,0,0);\n}\n\n.pagination .active-me a {\n  background-color: #f5f5f5;\n  color : rgb(200,0,0);\n}\n  ';

  $('head').append('<style type="text/css">' + css + '</style>');
}

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util.js');

var _appSettings = require('./appSettings.js');

var _appSettings2 = _interopRequireDefault(_appSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilterContent = function (_React$Component) {
  _inherits(FilterContent, _React$Component);

  function FilterContent(props) {
    _classCallCheck(this, FilterContent);

    var _this = _possibleConstructorReturn(this, (FilterContent.__proto__ || Object.getPrototypeOf(FilterContent)).call(this, props));

    _this.byFriendsList.bind(_this);
    _this.byCountry.bind(_this);
    _this.byRating.bind(_this);
    _this.byName.bind(_this);
    _this.update.bind(_this);
    return _this;
  }

  _createClass(FilterContent, [{
    key: 'update',
    value: function update(option) {
      var newSettings = Object.assign(new _appSettings2.default(), this.props.settings);
      for (var param in option) {
        newSettings[param] = option[param];
      }
      this.props.settingsUpdateFunc(newSettings);
    }
  }, {
    key: 'byFriendsList',
    value: function byFriendsList() {
      var _this2 = this;

      return React.createElement(
        'div',
        { style: { display: "table-row" },
          className: 'atcoder-custom-standings cursor-link ' + (this.props.settings.filterByFriends ? "filtering-enabled" : "filtering-disabled"),
          onClick: function onClick() {
            return _this2.update({ "filterByFriends": !_this2.props.settings.filterByFriends });
          } },
        React.createElement(
          'div',
          { style: { display: "table-cell" } },
          'Friends'
        )
      );
    }
  }, {
    key: 'byCountry',
    value: function byCountry() {
      var _this3 = this;

      var form = this.props.getActiveCountries().map(function (country) {
        var val = _util.countries[country];
        return React.createElement(
          'option',
          { value: country, key: 'country-filter-option-' + country },
          val
        );
      });
      return React.createElement(
        'div',
        { style: { display: "table-row" } },
        React.createElement(
          'div',
          { style: { display: "table-cell" },
            className: 'atcoder-custom-standings cursor-link ' + (this.props.settings.filterByCountry ? "filtering-enabled" : "filtering-disabled"),
            onClick: function onClick() {
              return _this3.update({ "filterByCountry": !_this3.props.settings.filterByCountry });
            }
          },
          'Country'
        ),
        React.createElement(
          'div',
          { style: { display: "table-cell", paddingLeft: "10px" } },
          React.createElement(
            'select',
            { defaultValue: this.props.settings.filterCountry,
              onChange: function onChange(e) {
                _this3.update({ "filterByCountry": true, "filterCountry": e.target.value });
              } },
            form
          )
        )
      );
    }
  }, {
    key: 'byRating',
    value: function byRating() {
      var _this4 = this;

      var buttons = _util.rating.lb.map(function (lb, idx) {
        if (idx === 0) return "";
        if (_this4.props.settings.filterRating.has(idx) === true) {
          return React.createElement(
            'a',
            { href: '#', style: { color: _util.rating.color[idx] }, onClick: function onClick() {
                var obj = new Set(_this4.props.settings.filterRating);
                obj.delete(idx);
                _this4.update({ "filterByRating": true, "filterRating": obj });
              }, title: lb + ' - ', key: 'rating-filter-rating-' + lb },
            React.createElement(
              'i',
              { className: 'material-icons md-24', style: { color: _util.rating.color[idx] } },
              'check_box'
            )
          );
        } else {
          return React.createElement(
            'a',
            { href: '#', style: { color: _util.rating.color[idx] }, onClick: function onClick() {
                var obj = new Set(_this4.props.settings.filterRating);
                obj.add(idx);
                _this4.update({ "filterByRating": true, "filterRating": obj });
              }, title: lb + ' - ', key: 'rating-filter-rating-' + lb },
            React.createElement(
              'i',
              { className: 'material-icons md-24', style: { color: _util.rating.color[idx] } },
              'check_box_outline_blank'
            )
          );
        }
      });

      var tool = function () {
        return React.createElement(
          'span',
          null,
          React.createElement(
            'a',
            { href: '#', className: 'atcoder-custom-standings filtering-disabled', onClick: function onClick() {
                var obj = new Set([1, 2, 3, 4]);
                _this4.update({ "filterByRating": true, "filterRating": obj });
              }, title: '0-1199' },
            "ABC"
          ),
          React.createElement(
            'span',
            null,
            ' '
          ),
          React.createElement(
            'a',
            { href: '#', className: 'atcoder-custom-standings filtering-disabled', onClick: function onClick() {
                var obj = new Set([1, 2, 3, 4, 5, 6, 7, 8]);
                _this4.update({ "filterByRating": true, "filterRating": obj });
              }, title: '0-2799' },
            "ARC"
          ),
          React.createElement(
            'span',
            null,
            ' '
          ),
          React.createElement(
            'a',
            { href: '#', className: 'atcoder-custom-standings filtering-disabled', onClick: function onClick() {
                var obj = new Set();
                _this4.update({ "filterByRating": true, "filterRating": obj });
              } },
            "None"
          ),
          React.createElement(
            'span',
            null,
            ' '
          ),
          React.createElement(
            'a',
            { href: '#', className: 'atcoder-custom-standings filtering-disabled', onClick: function onClick() {
                var obj = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                _this4.update({ "filterByRating": true, "filterRating": obj });
              } },
            "All"
          )
        );
      }();

      return React.createElement(
        'div',
        { style: { display: "table-row" } },
        React.createElement(
          'div',
          { style: { display: "table-cell" },
            className: 'atcoder-custom-standings cursor-link ' + (this.props.settings.filterByRating ? "filtering-enabled" : "filtering-disabled"),
            onClick: function onClick() {
              return _this4.update({ "filterByRating": !_this4.props.settings.filterByRating });
            }
          },
          'Rating'
        ),
        React.createElement(
          'div',
          { style: { display: "table-cell", paddingLeft: "10px" } },
          React.createElement(
            'p',
            null,
            buttons
          ),
          React.createElement(
            'p',
            null,
            tool
          )
        )
      );
    }
  }, {
    key: 'byName',
    value: function byName() {
      var _this5 = this;

      return React.createElement(
        'div',
        { style: { display: "table-row" } },
        React.createElement(
          'div',
          { style: { display: "table-cell" },
            className: 'atcoder-custom-standings cursor-link ' + (this.props.settings.filterByName ? "filtering-enabled" : "filtering-disabled"),
            onClick: function onClick() {
              return _this5.update({ "filterByName": !_this5.props.settings.filterByName });
            }
          },
          'Name'
        ),
        React.createElement(
          'div',
          { style: { display: "table-cell", paddingLeft: "10px" } },
          React.createElement('input', { type: 'text', defaultValue: this.props.settings.filterName, onChange: function onChange(e) {
              _this5.update({ "filterName": e.target.value, "filterByName": true });
            } })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var byFriend = this.byFriendsList();
      var byRating = this.byCountry();
      var byCountry = this.byRating();
      var byName = this.byName();
      return React.createElement(
        'div',
        { style: { position: "absolute",
            padding: "20px",
            backgroundColor: "white",
            boxShadow: "4px 4px 8px 4px grey",
            borderRadius: "6px 6px 6px 6px",
            top: this.props.posY + 40 + 'px',
            left: this.props.posX + 'px',
            cursor: "auto"
          },
          onClick: function onClick(e) {
            return e.stopPropagation();
          } },
        React.createElement(
          'div',
          { style: { display: "table", lineHeight: "2.5em" } },
          byFriend,
          byRating,
          byCountry,
          byName
        )
      );
    }
  }]);

  return FilterContent;
}(React.Component);

var Filter = function (_React$Component2) {
  _inherits(Filter, _React$Component2);

  function Filter(props) {
    _classCallCheck(this, Filter);

    var _this6 = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));

    _this6.state = {
      show: false,
      posX: 0,
      posY: 0
    };
    return _this6;
  }

  _createClass(Filter, [{
    key: 'render',
    value: function render() {
      var _this7 = this;

      var button = React.createElement(
        'a',
        { href: '#',
          className: 'atcoder-custom-standings ' + (this.props.settings.isFiltersEnabled() ? "filtering-enabled" : "filtering-disabled") },
        React.createElement(
          'i',
          { className: 'material-icons' },
          'filter_list'
        ),
        'Filter'
      );

      if (this.state.show === false) {
        return React.createElement(
          'div',
          { className: 'atcoder-custom-standings controller-button' },
          React.createElement(
            'div',
            { onClick: function onClick(e) {
                var rect = e.target.getBoundingClientRect();
                _this7.setState({ show: !_this7.state.show, posX: rect.left, posY: rect.top });
              } },
            button
          )
        );
      } else {
        return React.createElement(
          'div',
          { className: 'atcoder-custom-standings controller-button' },
          React.createElement(
            'div',
            { onClick: function onClick(e) {
                return _this7.setState({ show: !_this7.state.show });
              } },
            button
          ),
          React.createElement(
            'div',
            { style: { position: "fixed", left: 0, top: 0, width: "100%", height: "100%" },
              onClick: function onClick(e) {
                return _this7.setState({ show: false });
              } },
            React.createElement(FilterContent, { settings: this.props.settings,
              settingsUpdateFunc: this.props.settingsUpdateFunc,
              getActiveCountries: this.props.getActiveCountries,
              posX: this.state.posX,
              posY: this.state.posY })
          )
        );
      }
    }
  }]);

  return Filter;
}(React.Component);

exports.default = Filter;

},{"./appSettings.js":2,"./util.js":20}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FriendsList = function () {
  function FriendsList(load) {
    _classCallCheck(this, FriendsList);

    this.friends = new Set();
    if (load === true) this.load();

    //this.add("camypaper");
  }

  _createClass(FriendsList, [{
    key: 'load',
    value: function load() {
      //load
      //friend list object (old version)
      var friendsOld = JSON.parse(GM_getValue('GM_friend_list', 'null'));
      if (friendsOld !== null) {
        this.friends = new Set(Object.keys(friendsOld));
        GM_deleteValue('GM_friend_list');
        this.save();
      }

      //friend list array (new version)
      this.friends = new Set(JSON.parse(GM_getValue('friendsList', '[]')));

      console.log("loaded : friends list");
      console.log(this.friends);
    }
  }, {
    key: 'save',
    value: function save() {
      var str = JSON.stringify([].concat(_toConsumableArray(this.friends)));
      //save
      GM_setValue('friendsList', str);

      console.log("saved : friends list");
      console.log(str);
    }

    //[names...]

  }, {
    key: 'add',
    value: function add(handle) {
      var _this = this;

      handle.forEach(function (name) {
        return _this.friends.add(name);
      });
      this.save();
    }
  }, {
    key: 'remove',
    value: function remove(handle) {
      var _this2 = this;

      handle.forEach(function (name) {
        return _this2.friends.delete(name);
      });
      this.save();
    }
  }, {
    key: 'isFriend',
    value: function isFriend(handle) {
      return this.friends.has(handle);
    }
  }, {
    key: 'getList',
    value: function getList() {
      return [].concat(_toConsumableArray(this.friends));
    }
  }]);

  return FriendsList;
}();

exports.default = FriendsList;

},{}],8:[function(require,module,exports){
'use strict';

var _app = require('./app.js');

var _app2 = _interopRequireDefault(_app);

var _css = require('./css.js');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import React from 'react';
//import ReactDOM from 'react-dom';
$('div.table-responsive').hide();
$('#pagination-standings').hide();
$('#standings-csv-link').after('<div id="content"></div>');
//$('head').append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">');
(0, _css2.default)();

try {
  ReactDOM.render(React.createElement(_app2.default, null), document.getElementById('content'));
} catch (e) {
  console.log("some error occurred");
  console.log(e);
  $('div.table-responsive').show();
  $('#pagination-standings').show();
}

},{"./app.js":1,"./css.js":5}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalWindow = function (_React$Component) {
  _inherits(ModalWindow, _React$Component);

  function ModalWindow(props) {
    _classCallCheck(this, ModalWindow);

    return _possibleConstructorReturn(this, (ModalWindow.__proto__ || Object.getPrototypeOf(ModalWindow)).call(this, props));
  }

  _createClass(ModalWindow, [{
    key: "render",
    value: function render() {
      var head = React.createElement(
        "div",
        { style: { display: "grid", gridTemplateRows: "1fr", gridTemplateColumns: "1fr auto" } },
        React.createElement(
          "div",
          { style: { gridRow: "1/2", gridColumn: "1/2" } },
          React.createElement(
            "h3",
            null,
            this.props.title
          )
        ),
        React.createElement(
          "div",
          { style: { gridRow: "1/2", gridColumn: "2/3" }, onClick: this.props.closeFunc },
          React.createElement(
            "i",
            { className: "material-icons" },
            "clear"
          )
        )
      );

      return React.createElement(
        "div",
        null,
        head,
        this.props.children
      );
    }
  }]);

  return ModalWindow;
}(React.Component);

var Modal = function (_React$Component2) {
  _inherits(Modal, _React$Component2);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this2 = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this2.state = { show: false };
    return _this2;
  }

  _createClass(Modal, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var button = React.createElement(
        "div",
        { onClick: function onClick() {
            _this3.setState({ show: true });
          },
          className: "atcoder-custom-standings controller-button" },
        this.props.button
      );

      if (this.state.show === true) {
        return React.createElement(
          "div",
          null,
          button,
          React.createElement(
            "div",
            { className: "atcoder-custom-standings modal-filter", onClick: function onClick() {
                _this3.setState({ show: false });
              } },
            React.createElement(
              "div",
              { className: "atcoder-custom-standings modal-content", onClick: function onClick(e) {
                  e.stopPropagation();return false;
                } },
              React.createElement(
                ModalWindow,
                { closeFunc: function closeFunc() {
                    _this3.setState({ show: false });
                  }, title: this.props.title },
                this.props.children
              )
            )
          )
        );
      } else {
        return React.createElement(
          "div",
          null,
          button
        );
      }
    }
  }]);

  return Modal;
}(React.Component);

exports.default = Modal;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageButton = function (_React$Component) {
  _inherits(PageButton, _React$Component);

  function PageButton(props) {
    _classCallCheck(this, PageButton);

    return _possibleConstructorReturn(this, (PageButton.__proto__ || Object.getPrototypeOf(PageButton)).call(this));
  }

  _createClass(PageButton, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (this.props.current !== nextProps.current) return true;
      if (this.props.me !== nextProps.me) return true;
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var p = this.props.page;

      if (this.props.current === p) {
        return React.createElement(
          "li",
          { className: "li-pagination active " + (this.props.me === true ? "active-me" : "") },
          React.createElement(
            "a",
            null,
            p + 1
          )
        );
      } else {
        return React.createElement(
          "li",
          { className: "li-pagination " + (this.props.me === true ? "me" : "") },
          React.createElement(
            "a",
            { onClick: this.props.onClickFunc, "data-page": p, href: "#" },
            p + 1
          )
        );
      }
    }
  }]);

  return PageButton;
}(React.Component);

var Pager = function (_React$Component2) {
  _inherits(Pager, _React$Component2);

  /**
  * @param {number} current current page (0-indexed)
  * @param {number} total   total page
  * @param {number} me      page where i am
  * @param {function} onClickFunc 
  */
  function Pager(props) {
    _classCallCheck(this, Pager);

    return _possibleConstructorReturn(this, (Pager.__proto__ || Object.getPrototypeOf(Pager)).call(this, props));
  }

  _createClass(Pager, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (this.props.current !== nextProps.current) return true;
      if (this.props.total !== nextProps.total) return true;
      if (this.props.me !== nextProps.me) return true;
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var showingPages = new Array();
      for (var page = 0; page < this.props.total; page++) {
        if (page === 0 || page === this.props.total - 1 || page === this.props.me || Math.abs(this.props.current - page) <= 5) {
          showingPages.push(page);
        }
      }

      var res = new Array();
      var blankCount = 0;
      for (var i = 0; i < showingPages.length; i++) {
        if (i > 0 && showingPages[i] - showingPages[i - 1] > 1) {
          if (showingPages[i] - showingPages[i - 1] === 2) {
            res.push(React.createElement(PageButton, { current: this.props.current,
              page: showingPages[i] - 1,
              key: showingPages[i] - 1,
              onClickFunc: this.props.onClickFunc,
              me: showingPages[i] - 1 === this.props.me }));
          } else {
            res.push(React.createElement(
              "li",
              { className: "li-pagination disabled", key: "page-blank-" + blankCount++ },
              React.createElement(
                "a",
                null,
                "..."
              )
            ));
          }
        }
        res.push(React.createElement(PageButton, { current: this.props.current,
          page: showingPages[i],
          key: showingPages[i],
          onClickFunc: this.props.onClickFunc,
          me: showingPages[i] === this.props.me }));
      }

      return React.createElement(
        "div",
        { className: "pagination pagination-centered" },
        React.createElement(
          "ul",
          null,
          res
        )
      );
    }
  }]);

  return Pager;
}(React.Component);

exports.default = Pager;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Reloading = function (_React$Component) {
  _inherits(Reloading, _React$Component);

  function Reloading(props) {
    _classCallCheck(this, Reloading);

    var _this = _possibleConstructorReturn(this, (Reloading.__proto__ || Object.getPrototypeOf(Reloading)).call(this, props));

    _this.state = { autoUpdate: false };
    return _this;
  }

  _createClass(Reloading, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        { style: { display: "grid", gridTemplateRows: "1fr", gridTemplateColumns: "auto auto" } },
        React.createElement(
          "div",
          { style: { gridColumn: "1/2" }, className: "atcoder-custom-standings controller-button",
            onClick: function onClick(e) {
              return _this2.props.updateFunc();
            } },
          React.createElement(
            "a",
            { href: "#" },
            React.createElement(
              "i",
              { className: "material-icons" },
              "refresh"
            ),
            "Update"
          )
        ),
        React.createElement(
          "div",
          { style: { gridColumn: "2/3" }, className: "atcoder-custom-standings controller-button",
            onClick: function onClick(e) {
              if (!_this2.state.autoUpdate) {
                _this2.timerReloading = setInterval(_this2.props.updateFunc, 60 * 1000);
                console.log("create timer ", _this2.timerReloading);
              } else {
                try {
                  clearInterval(_this2.timerReloading);
                  console.log("erase timer ", _this2.timerReloading);
                } catch (e) {}
              }
              _this2.setState({ autoUpdate: !_this2.state.autoUpdate });
            } },
          React.createElement(
            "span",
            { className: "atcoder-custom-standings " + (this.state.autoUpdate ? "reloading-enabled" : "reloading-disabled") },
            React.createElement(
              "i",
              { className: "material-icons" },
              "update"
            ),
            "Auto (1min)"
          )
        )
      );
    }
  }]);

  return Reloading;
}(React.Component);

exports.default = Reloading;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _modal = require('./modal.js');

var _modal2 = _interopRequireDefault(_modal);

var _appSettings = require('./appSettings.js');

var _appSettings2 = _interopRequireDefault(_appSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SettingsContent = function (_React$Component) {
  _inherits(SettingsContent, _React$Component);

  function SettingsContent(props) {
    _classCallCheck(this, SettingsContent);

    var _this = _possibleConstructorReturn(this, (SettingsContent.__proto__ || Object.getPrototypeOf(SettingsContent)).call(this, props));

    _this.update.bind(_this);
    _this.generateForm.bind(_this);
    _this.generateFriendsListForm.bind(_this);
    return _this;
  }

  _createClass(SettingsContent, [{
    key: 'update',
    value: function update(option) {
      var newSettings = Object.assign(new _appSettings2.default(), this.props.settings);
      for (var param in option) {
        newSettings[param] = option[param];
      }
      console.log(option);
      this.props.settingsUpdateFunc(newSettings);
    }
  }, {
    key: 'generateForm',
    value: function generateForm(optionName, label) {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'atcoder-custom-standings settings-item' },
        React.createElement(
          'label',
          null,
          React.createElement('input', { checked: this.props.settings[optionName], type: 'checkbox', style: { display: "inline" },
            onChange: function onChange(e) {
              _this2.update(_defineProperty({}, optionName, e.target.checked));
            } }),
          React.createElement(
            'span',
            null,
            ' ',
            label
          )
        )
      );
    }
  }, {
    key: 'generateFriendsListForm',
    value: function generateFriendsListForm() {
      var _this3 = this;

      var friends = this.props.friends.getList().map(function (name) {
        return React.createElement(
          'option',
          { value: name, key: name },
          name
        );
      });
      return React.createElement(
        'div',
        { className: 'atcoder-custom-standings settings-item' },
        React.createElement(
          'p',
          null,
          'Friends List'
        ),
        React.createElement(
          'div',
          { className: 'atcoder-custom-standings settings-item' },
          React.createElement('input', { ref: 'addFriendForm', type: 'text', style: { display: "block" },
            onKeyDown: function onKeyDown(e) {
              if (e.key !== 'Enter') return;
              var element = _this3.refs.addFriendForm;
              if (element.value !== "") _this3.props.friendsUpdateFunc(element.value.split(" "), true);
              element.value = "";
              _this3.forceUpdate();
            } }),
          React.createElement(
            'button',
            { type: 'button', style: { display: "block" }, onClick: function onClick() {
                var element = _this3.refs.addFriendForm;
                if (element.value !== "") _this3.props.friendsUpdateFunc([element.value], true);
                element.value = "";
                _this3.forceUpdate();
              } },
            'Add Friend'
          )
        ),
        React.createElement(
          'div',
          { className: 'atcoder-custom-standings settings-item' },
          React.createElement(
            'select',
            { ref: 'friendsListForm', multiple: true, size: '10', style: { display: "block" } },
            friends
          ),
          React.createElement(
            'button',
            { type: 'button', style: { display: "block" }, onClick: function onClick() {
                var form = _this3.refs.friendsListForm;
                _this3.props.friendsUpdateFunc([].concat(_toConsumableArray(form.getElementsByTagName('option'))).filter(function (e) {
                  return e.selected;
                }).map(function (e) {
                  return e.value;
                }), false);
                _this3.forceUpdate();
              } },
            'Remove Friends'
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var pageSize = function () {
        var list = [10, 20, 50, 100, 200, 300, 400, 500, 1000, 5000, 10000].map(function (val) {
          return React.createElement(
            'option',
            { value: val, key: val },
            val
          );
        });
        return React.createElement(
          'div',
          { className: 'atcoder-custom-standings settings-item' },
          React.createElement(
            'span',
            null,
            'Page Size '
          ),
          React.createElement(
            'select',
            { defaultValue: _this4.props.settings.pageSize,
              onChange: function onChange(e) {
                _this4.update({ "pageSize": Number(e.target.value) });
              } },
            list
          )
        );
      }();

      var displayNameStyle = React.createElement(
        'div',
        { className: 'atcoder-custom-standings settings-item' },
        React.createElement(
          'span',
          null,
          'Display Name Style '
        ),
        React.createElement(
          'select',
          { defaultValue: this.props.settings.displayNameStyle,
            onChange: function onChange(e) {
              _this4.update({ "displayNameStyle": e.target.value });
            } },
          React.createElement(
            'option',
            { value: 'user_screen_name' },
            'User ID'
          ),
          React.createElement(
            'option',
            { value: 'user_name' },
            'User Name'
          ),
          React.createElement(
            'option',
            { value: 'user_screen_name_user_name' },
            'User ID / User Name'
          ),
          React.createElement(
            'option',
            { value: 'user_name_user_screen_name' },
            'User Name / User ID'
          )
        )
      );

      return React.createElement(
        'div',
        { style: { padding: "5px" } },
        pageSize,
        displayNameStyle,
        this.generateForm("disableRatingColor", "Disable Rating Color"),
        this.generateForm("highlightFriends", "Highlight Friends"),
        this.generateForm("showNationalFlag", "Show National Flag"),
        this.generateForm("saveFilteringState", "Save Filtering State (if this option is checked, your filtering state will be restored when you open standings page)"),
        React.createElement('hr', null),
        this.generateFriendsListForm()
      );
    }
  }]);

  return SettingsContent;
}(React.Component);

var Settings = function (_React$Component2) {
  _inherits(Settings, _React$Component2);

  function Settings(props) {
    _classCallCheck(this, Settings);

    return _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this, props));
  }

  _createClass(Settings, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (JSON.stringify(Object.assign({}, this.props.settings)) !== JSON.stringify(Object.assign({}, nextProps.settings))) return true;
      // if( JSON.stringify( this.props.friends.getList() ) !== JSON.stringify( nextProps.friends.getList() ) ) return true;
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var button = React.createElement(
        'a',
        { href: '#' },
        React.createElement(
          'i',
          { className: 'material-icons md-dark' },
          'settings'
        ),
        'Settings'
      );

      return React.createElement(
        _modal2.default,
        { button: button, title: 'Settings' },
        React.createElement(SettingsContent, {
          settings: this.props.settings,
          settingsUpdateFunc: this.props.settingsUpdateFunc,
          friends: this.props.friends,
          friendsUpdateFunc: this.props.friendsUpdateFunc
        })
      );
    }
  }]);

  return Settings;
}(React.Component);

exports.default = Settings;

},{"./appSettings.js":2,"./modal.js":9}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appSettings = require("./appSettings.js");

var _appSettings2 = _interopRequireDefault(_appSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SortingContent = function (_React$Component) {
  _inherits(SortingContent, _React$Component);

  function SortingContent(props) {
    _classCallCheck(this, SortingContent);

    var _this = _possibleConstructorReturn(this, (SortingContent.__proto__ || Object.getPrototypeOf(SortingContent)).call(this, props));

    _this.update.bind(_this);
    return _this;
  }

  _createClass(SortingContent, [{
    key: "update",
    value: function update(option) {
      var newSettings = Object.assign(new _appSettings2.default(), this.props.settings);
      for (var param in option) {
        newSettings[param] = option[param];
      }
      this.props.settingsUpdateFunc(newSettings);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var onOff = React.createElement(
        "div",
        null,
        React.createElement(
          "a",
          { className: "atcoder-custom-standings " + (this.props.settings.sortingEnabled ? "sorting-enabled" : "sorting-disabled"),
            href: "#", onClick: function onClick(e) {
              return _this2.update({ sortingEnabled: !_this2.props.settings.sortingEnabled });
            } },
          this.props.settings.sortingEnabled ? "ON" : "OFF"
        )
      );

      var keys = [];
      keys.push(React.createElement(
        "a",
        { className: "atcoder-custom-standings " + (this.props.settings.sortingKey === "rank" ? "sorting-enabled" : "sorting-disabled"),
          href: "#", style: { padding: "5px" }, onClick: function onClick(e) {
            return _this2.update({
              sortingKey: "rank",
              sortingEnabled: true,
              sortingOrder: _this2.props.settings.sortingKey !== "rank" ? "ascending" : _this2.props.settings.sortingOrder === "ascending" ? "descending" : "ascending"
            });
          }, key: "rank" },
        "Rank"
      ));

      keys.push(React.createElement(
        "a",
        { className: "atcoder-custom-standings " + (this.props.settings.sortingKey === "time" ? "sorting-enabled" : "sorting-disabled"),
          href: "#", style: { padding: "5px" }, onClick: function onClick(e) {
            return _this2.update({
              sortingKey: "time",
              sortingEnabled: true,
              sortingOrder: _this2.props.settings.sortingKey !== "time" ? "ascending" : _this2.props.settings.sortingOrder === "ascending" ? "descending" : "ascending"
            });
          }, key: "time" },
        "Time(without penalty)"
      ));

      keys.push(React.createElement(
        "a",
        { className: "atcoder-custom-standings " + (this.props.settings.sortingKey === "user_screen_name" ? "sorting-enabled" : "sorting-disabled"),
          href: "#", style: { padding: "5px" }, onClick: function onClick(e) {
            return _this2.update({
              sortingKey: "user_screen_name",
              sortingEnabled: true,
              sortingOrder: _this2.props.settings.sortingKey !== "user_screen_name" ? "ascending" : _this2.props.settings.sortingOrder === "ascending" ? "descending" : "ascending"
            });
          }, key: "user_screen_name" },
        "Name"
      ));

      keys.push(React.createElement(
        "a",
        { className: "atcoder-custom-standings " + (this.props.settings.sortingKey === "rating" ? "sorting-enabled" : "sorting-disabled"),
          href: "#", style: { padding: "5px" }, onClick: function onClick(e) {
            return _this2.update({
              sortingKey: "rating",
              sortingEnabled: true,
              sortingOrder: _this2.props.settings.sortingKey !== "rating" ? "descending" : _this2.props.settings.sortingOrder === "ascending" ? "descending" : "ascending"
            });
          }, key: "rating" },
        "Rating"
      ));
      keys.push(React.createElement(
        "a",
        { className: "atcoder-custom-standings " + (this.props.settings.sortingKey === "country" ? "sorting-enabled" : "sorting-disabled"),
          href: "#", style: { padding: "5px" }, onClick: function onClick(e) {
            return _this2.update({
              sortingKey: "country",
              sortingEnabled: true,
              sortingOrder: _this2.props.settings.sortingKey !== "country" ? "ascending" : _this2.props.settings.sortingOrder === "ascending" ? "descending" : "ascending"
            });
          }, key: "country" },
        "Country"
      ));

      var keysTasks = [];

      var _loop = function _loop(i) {
        keysTasks.push(React.createElement(
          "a",
          { className: "atcoder-custom-standings " + (_this2.props.settings.sortingKey === "task" + i ? "sorting-enabled" : "sorting-disabled"),
            href: "#", style: { padding: "5px" }, onClick: function onClick(e) {
              return _this2.update({
                sortingKey: "task" + i,
                sortingEnabled: true,
                sortingOrder: _this2.props.settings.sortingKey !== "task" + i ? "descending" : _this2.props.settings.sortingOrder === "ascending" ? "descending" : "ascending"
              });
            }, key: "task" + i },
          "Task-",
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i]
        ));
      };

      for (var i = 0; i < this.props.contest.numTasks; i++) {
        _loop(i);
      }

      var order = void 0;
      if (this.props.settings.sortingOrder === "ascending") {
        order = React.createElement(
          "a",
          { href: "#", onClick: function onClick(e) {
              return _this2.update({ sortingOrder: "descending", sortingEnabled: true });
            } },
          React.createElement(
            "i",
            { className: "material-icons", style: { transform: "scale(1,-1)" } },
            "sort"
          ),
          " Ascending"
        );
      } else {
        order = React.createElement(
          "a",
          { href: "#", onClick: function onClick(e) {
              return _this2.update({ sortingOrder: "ascending", sortingEnabled: true });
            } },
          React.createElement(
            "i",
            { className: "material-icons" },
            "sort"
          ),
          " Descending"
        );
      }
      return React.createElement(
        "div",
        { style: { position: "absolute",
            padding: "20px",
            backgroundColor: "white",
            boxShadow: "4px 4px 8px 4px grey",
            borderRadius: "6px 6px 6px 6px",
            top: this.props.posY + 40 + "px",
            left: this.props.posX + "px" },
          onClick: function onClick(e) {
            return e.stopPropagation();
          } },
        React.createElement(
          "div",
          { style: { display: "grid", gridTemplateRows: "auto auto auto", gridTemplateColumns: "auto 1fr" } },
          React.createElement(
            "div",
            { style: { gridRow: "1/2", gridColumn: "1/2", padding: "2px" } },
            onOff
          ),
          React.createElement(
            "div",
            { style: { gridRow: "2/3", gridColumn: "1/2", padding: "2px" } },
            "Key :"
          ),
          React.createElement(
            "div",
            { style: { gridRow: "2/3", gridColumn: "2/3", padding: "2px" } },
            keys,
            React.createElement("br", null),
            keysTasks
          ),
          React.createElement(
            "div",
            { style: { gridRow: "3/4", gridColumn: "1/2", padding: "2px" } },
            "Order :"
          ),
          React.createElement(
            "div",
            { style: { gridRow: "3/4", gridColumn: "2/3", padding: "2px" } },
            order
          )
        )
      );
    }
  }]);

  return SortingContent;
}(React.Component);

var Sorting = function (_React$Component2) {
  _inherits(Sorting, _React$Component2);

  function Sorting(props) {
    _classCallCheck(this, Sorting);

    var _this3 = _possibleConstructorReturn(this, (Sorting.__proto__ || Object.getPrototypeOf(Sorting)).call(this, props));

    _this3.state = {
      show: false,
      posX: 0,
      posY: 0
    };

    return _this3;
  }

  _createClass(Sorting, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var button = React.createElement(
        "a",
        { href: "#", className: "atcoder-custom-standings " + (this.props.settings.sortingEnabled ? "sorting-enabled" : "sorting-disabled") },
        React.createElement(
          "i",
          { className: "material-icons" },
          "sort"
        ),
        "Sort"
      );

      if (this.state.show === false) {
        return React.createElement(
          "div",
          { className: "atcoder-custom-standings controller-button" },
          React.createElement(
            "div",
            { onClick: function onClick(e) {
                var rect = e.target.getBoundingClientRect();
                _this4.setState({ show: !_this4.state.show, posX: rect.left, posY: rect.top });
              } },
            button
          )
        );
      } else {
        return React.createElement(
          "div",
          { className: "atcoder-custom-standings controller-button" },
          React.createElement(
            "div",
            { onClick: function onClick(e) {
                return _this4.setState({ show: !_this4.state.show });
              } },
            button
          ),
          React.createElement(
            "div",
            { style: { position: "fixed", left: 0, top: 0, width: "100%", height: "100%" },
              onClick: function onClick(e) {
                return _this4.setState({ show: false });
              } },
            React.createElement(SortingContent, { settings: this.props.settings,
              contest: this.props.contest,
              settingsUpdateFunc: this.props.settingsUpdateFunc,
              posX: this.state.posX,
              posY: this.state.posY })
          )
        );
      }
    }
  }]);

  return Sorting;
}(React.Component);

exports.default = Sorting;

},{"./appSettings.js":2}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util.js');

var _userinfo = require('./userinfo.js');

var _userinfo2 = _interopRequireDefault(_userinfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserDetails = function (_React$Component) {
  _inherits(UserDetails, _React$Component);

  function UserDetails(props) {
    _classCallCheck(this, UserDetails);

    return _possibleConstructorReturn(this, (UserDetails.__proto__ || Object.getPrototypeOf(UserDetails)).call(this, props));
  }

  _createClass(UserDetails, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      document.getElementById('user-dropdown-menu-' + this.props.row.user_name).addEventListener('click', function (e) {
        e.stopPropagation();
      });
      document.getElementById('user-dropdown-menu-' + this.props.row.user_name + '-friend').addEventListener('click', function (e) {
        _this2.props.friendsUpdateFunc([_this2.props.row.user_screen_name], !_this2.props.isFriend);
      });
      document.getElementsByTagName('body')[0].addEventListener('click', this.props.closeFunc, { once: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var link = 'https://atcoder.jp/user/' + this.props.row.user_screen_name;
      var submissions = React.createElement(
        'a',
        { href: '/submissions/all?user_screen_name=' + this.props.row.user_screen_name, target: '_blank' },
        React.createElement(
          'i',
          { className: 'material-icons md-18' },
          'search'
        ),
        'Submissions'
      );
      var ratingColor = _util.rating.getColorOriginal(this.props.row.rating);

      var friend = React.createElement(
        'span',
        { className: 'atcoder-custom-standings cursor-link' },
        React.createElement(
          'i',
          { className: 'material-icons md-18' },
          this.props.isFriend ? "person_outline" : "person_add"
        ),
        this.props.isFriend ? "Remove from Friends List" : "Add to Friends List"
      );

      return React.createElement(
        'div',
        { id: 'user-dropdown-menu-' + this.props.row.user_name,
          className: 'atcoder-custom-standings user-dropdown-menu-box' },
        React.createElement(
          'div',
          { className: 'atcoder-custom-standings user-dropdown-menu' },
          React.createElement(
            'a',
            { href: link, className: 'username ' + this.props.color, target: '_blank' },
            this.props.row.user_name,
            ' / ',
            this.props.row.user_screen_name
          )
        ),
        React.createElement(
          'div',
          { className: 'atcoder-custom-standings user-dropdown-menu' },
          submissions
        ),
        React.createElement(
          'div',
          { className: 'atcoder-custom-standings user-dropdown-menu' },
          'Rating : ',
          React.createElement(
            'span',
            { style: { color: ratingColor, fontWeight: "bold" } },
            this.props.row.rating
          )
        ),
        React.createElement(
          'div',
          { className: 'atcoder-custom-standings user-dropdown-menu' },
          'Country : ',
          React.createElement('img', { src: '/img/flag/' + this.props.row.country + '.png', style: { verticalAlign: "middle", width: "16px", height: "16px" } }),
          _util.countries[this.props.row.country]
        ),
        React.createElement(
          'div',
          { id: 'user-dropdown-menu-' + this.props.row.user_name + '-friend',
            className: 'atcoder-custom-standings user-dropdown-menu',
            style: this.props.row.user_screen_name === _userinfo2.default.user_screen_name ? { display: "none" } : {} },
          friend
        )
      );
    }
  }]);

  return UserDetails;
}(React.Component);

var Name = function (_React$Component2) {
  _inherits(Name, _React$Component2);

  function Name(props) {
    _classCallCheck(this, Name);

    var _this3 = _possibleConstructorReturn(this, (Name.__proto__ || Object.getPrototypeOf(Name)).call(this, props));

    _this3.state = {
      show: false
    };
    return _this3;
  }

  _createClass(Name, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.settings.displayNameStyle !== nextProps.settings.displayNameStyle) return true;
      if (this.props.settings.disableRatingColor !== nextProps.settings.disableRatingColor) return true;
      if (this.props.settings.showNationalFlag !== nextProps.settings.showNationalFlag) return true;
      if (this.state.show !== nextState.show) return true;
      if (this.props.isFriend !== nextProps.isFriend) return true;
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var row = this.props.row;
      var color = this.props.settings.disableRatingColor ? "" : _util.rating.userColor[_util.rating.getLevel(row.rating)];

      var displayName = function () {
        return {
          user_screen_name: row.user_screen_name,
          user_name: row.user_name,
          user_screen_name_user_name: row.user_screen_name + ' / ' + row.user_name,
          user_name_user_screen_name: row.user_name + ' / ' + row.user_screen_name
        }[_this4.props.settings.displayNameStyle];
      }();

      var countryFlag = this.props.settings.showNationalFlag ? React.createElement('img', { src: '/img/flag/' + row.country + '.png', style: { verticalAlign: "middle", width: "16px", height: "16px" } }) : "";

      var nameOnclick = function nameOnclick(e) {
        _this4.setState({
          show: !_this4.state.show
        });
      };

      if (this.state.show === false) {
        return React.createElement(
          'td',
          { className: 'standings-username', onClick: nameOnclick },
          countryFlag,
          " ",
          row.rating >= 3200 ? React.createElement('img', { src: '/img/icon/crown' + (row.rating - row.rating % 400) + '.gif', style: { verticalAlign: "middle" } }) : null,
          row.rating >= 3200 ? " " : null,
          React.createElement(
            'a',
            { className: 'username ' + color },
            displayName
          )
        );
      } else {
        return React.createElement(
          'td',
          { className: 'standings-username', onClick: function onClick() {
              return _this4.setState({ show: false });
            } },
          countryFlag,
          " ",
          row.rating >= 3200 ? React.createElement('img', { src: '/img/icon/crown' + (row.rating - row.rating % 400) + '.gif', style: { verticalAlign: "middle" } }) : null,
          row.rating >= 3200 ? " " : null,
          React.createElement(
            'a',
            { className: 'username ' + color },
            displayName
          ),
          React.createElement(UserDetails, { friendsUpdateFunc: this.props.friendsUpdateFunc,
            color: color,
            isFriend: this.props.isFriend,
            row: row,
            closeFunc: function closeFunc() {
              return _this4.setState({ show: false });
            } })
        );
      }
    }
  }]);

  return Name;
}(React.Component);

var Task = function (_React$Component3) {
  _inherits(Task, _React$Component3);

  function Task(props) {
    _classCallCheck(this, Task);

    return _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).call(this, props));
  }

  _createClass(Task, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (JSON.stringify(this.props.task) !== JSON.stringify(nextProps.task)) return true;
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var t = this.props.task;
      if (t.extras === true && this.props.me === false) {
        return React.createElement('td', { className: 'center standings-frozen' });
      }
      if (t.elapsed_time === undefined) {
        return React.createElement(
          'td',
          { className: 'center' },
          '-'
        );
      }
      if (t.score === 0) {
        return React.createElement(
          'td',
          { className: 'center standings-wa' },
          '(',
          t.failure,
          ')'
        );
      }
      var penalty = "";
      if (t.failure !== 0) {
        penalty = React.createElement(
          'span',
          { className: 'standings-wa' },
          '(',
          t.failure,
          ')'
        );
      }

      var submission = this.props.contestEnded ? React.createElement(
        'a',
        { href: this.props.submissionLink, target: '_blank' },
        React.createElement(
          'i',
          { className: 'material-icons md-18 md-dark', style: { verticalAlign: "bottom" } },
          'search'
        )
      ) : "";

      var timeMin = '' + (Math.floor(t.elapsed_time / 60) < 10 ? "0" : "") + Math.floor(t.elapsed_time / 60);
      var timeSec = ('00' + Math.floor(t.elapsed_time % 60)).slice(-2);
      return React.createElement(
        'td',
        { className: 'center' },
        React.createElement(
          'span',
          { className: 'standings-ac' },
          t.score / 100
        ),
        penalty,
        submission,
        React.createElement(
          'span',
          { className: 'atcoder-custom-standings timestamp' },
          timeMin,
          ':',
          timeSec
        )
      );
    }
  }]);

  return Task;
}(React.Component);

var Total = function (_React$Component4) {
  _inherits(Total, _React$Component4);

  function Total(props) {
    _classCallCheck(this, Total);

    return _possibleConstructorReturn(this, (Total.__proto__ || Object.getPrototypeOf(Total)).call(this, props));
  }

  _createClass(Total, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var comp = ["elapsed_time", "failure", "penalty", "score"];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = comp[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var param = _step.value;

          if (this.props.row[param] !== nextProps.row[param]) return true;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.row.elapsed_time === "0") {
        return React.createElement(
          'td',
          { className: 'center' },
          React.createElement(
            'p',
            null,
            '-'
          )
        );
      }
      var penalty = "";
      if (this.props.row.failure !== "0") {
        penalty = React.createElement(
          'span',
          { className: 'standings-wa' },
          '(',
          this.props.row.failure,
          ')'
        );
      }
      var timeMin = '' + (Math.floor(this.props.row.elapsed_time / 60) < 10 ? "0" : "") + Math.floor(this.props.row.elapsed_time / 60);
      var timeSec = ('00' + Math.floor(this.props.row.elapsed_time % 60)).slice(-2);

      var penaltyMin = '' + (Math.floor(this.props.row.penalty / 60) < 10 ? "0" : "") + Math.floor(this.props.row.penalty / 60);
      var penaltySec = ('00' + Math.floor(this.props.row.penalty % 60)).slice(-2);
      return React.createElement(
        'td',
        { className: 'center' },
        React.createElement(
          'span',
          { className: 'standings-score' },
          this.props.row.score / 100
        ),
        penalty,
        React.createElement(
          'span',
          { className: 'atcoder-custom-standings timestamp' },
          penaltyMin,
          ':',
          penaltySec,
          ' (',
          timeMin,
          ':',
          timeSec,
          ')'
        )
      );
    }
  }]);

  return Total;
}(React.Component);

/*
 rank
 name
 id
 rating
 country
 tasks[]
 score
 elapsed_time
 penalty
*/


var StandingsRow = function (_React$Component5) {
  _inherits(StandingsRow, _React$Component5);

  function StandingsRow(props) {
    _classCallCheck(this, StandingsRow);

    return _possibleConstructorReturn(this, (StandingsRow.__proto__ || Object.getPrototypeOf(StandingsRow)).call(this, props));
  }

  _createClass(StandingsRow, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (JSON.stringify(Object.assign({}, this.props.settings)) !== JSON.stringify(Object.assign({}, nextProps.settings))) return true;
      if (JSON.stringify(this.props.row) !== JSON.stringify(nextProps.row)) return true;
      if (this.props.isFriend !== nextProps.isFriend) return true;
      if (this.props.filteredRank !== nextProps.filteredRank) return true;
      if (this.props.contestEnded !== nextProps.contestEnded) return true;
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      var name = React.createElement(Name, { settings: this.props.settings,
        row: this.props.row,
        isFriend: this.props.isFriend,
        friendsUpdateFunc: this.props.friendsUpdateFunc });

      var tasks = this.props.row.tasks.map(function (t, i) {
        return React.createElement(Task, { task: t,
          key: i,
          me: _userinfo2.default.contestant === true && _this8.props.row.user_id === _userinfo2.default.user_id,
          submissionLink: './submissions/all?task_screen_name=' + _this8.props.taskData[i].url.slice(7) + '&user_screen_name=' + _this8.props.row.user_screen_name,
          contestEnded: _this8.props.contestEnded });
      });

      var total = React.createElement(Total, { row: this.props.row });

      var trClass = "";
      if (this.props.isFriend && this.props.settings.highlightFriends === true) trClass = "standings-friend";
      if (_userinfo2.default.contestant === true && this.props.row.user_id === _userinfo2.default.user_id) trClass = "standings-me";

      return React.createElement(
        'tr',
        { className: trClass },
        React.createElement(
          'td',
          { className: 'standings-rank' },
          this.props.row.rank,
          this.props.settings.isFiltersEnabled() || this.props.settings.sortingEnabled ? ' (' + this.props.filteredRank + ')' : ""
        ),
        name,
        tasks,
        total
      );
    }
  }]);

  return StandingsRow;
}(React.Component);

var StandingsHead = function (_React$Component6) {
  _inherits(StandingsHead, _React$Component6);

  function StandingsHead(props) {
    _classCallCheck(this, StandingsHead);

    return _possibleConstructorReturn(this, (StandingsHead.__proto__ || Object.getPrototypeOf(StandingsHead)).call(this, props));
  }

  _createClass(StandingsHead, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var tasks = this.props.taskData.map(function (t, i) {
        return React.createElement(
          'th',
          { className: 'center', key: 'task-' + i },
          React.createElement(
            'a',
            { href: t.url, target: '_blank' },
            t.name
          )
        );
      });
      return React.createElement(
        'tr',
        null,
        React.createElement(
          'th',
          { className: 'center' },
          "Rank"
        ),
        React.createElement(
          'th',
          { className: 'center' },
          "User Name"
        ),
        tasks,
        React.createElement(
          'th',
          { className: 'center' },
          "Score / Time"
        )
      );
    }
  }]);

  return StandingsHead;
}(React.Component);

var Standings = function (_React$Component7) {
  _inherits(Standings, _React$Component7);

  function Standings(props) {
    _classCallCheck(this, Standings);

    return _possibleConstructorReturn(this, (Standings.__proto__ || Object.getPrototypeOf(Standings)).call(this, props));
  }

  _createClass(Standings, [{
    key: 'render',
    value: function render() {
      var _this11 = this;

      var standingsRows = "";
      if (this.props.standings.length > 0) {
        standingsRows = this.props.standings.map(function (row, i) {
          var isFriend = _this11.props.friends.isFriend(row.user_screen_name);
          return React.createElement(StandingsRow, { row: row,
            settings: _this11.props.settings,
            key: row.user_id,
            isFriend: isFriend,
            friendsUpdateFunc: _this11.props.friendsUpdateFunc,
            filteredRank: _this11.props.offSet + i + 1,
            taskData: _this11.props.taskData,
            contestEnded: _this11.props.contestEnded });
        });
      }

      return React.createElement(
        'table',
        { className: 'table table-striped table-bordered table-condensed table-standings table-sort' },
        React.createElement(
          'thead',
          null,
          React.createElement(StandingsHead, { taskData: this.props.taskData })
        ),
        React.createElement(
          'tbody',
          null,
          standingsRows
        )
      );
    }
  }]);

  return Standings;
}(React.Component);

exports.default = Standings;

},{"./userinfo.js":19,"./util.js":20}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _summary = require('./stats/summary.js');

var _summary2 = _interopRequireDefault(_summary);

var _task = require('./stats/task.js');

var _task2 = _interopRequireDefault(_task);

var _modal = require('./modal.js');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatsContent = function (_React$Component) {
  _inherits(StatsContent, _React$Component);

  function StatsContent(props) {
    _classCallCheck(this, StatsContent);

    var _this = _possibleConstructorReturn(this, (StatsContent.__proto__ || Object.getPrototypeOf(StatsContent)).call(this, props));

    _this.state = { page: 0 };
    return _this;
  }

  _createClass(StatsContent, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.state.page !== nextState.page;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tab = this.props.contest.tasks.map(function (t, i) {
        if (_this2.state.page === i) {
          return React.createElement(
            'li',
            { className: 'active', key: '' + i },
            React.createElement(
              'a',
              { href: '#' },
              'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i]
            )
          );
        } else {
          return React.createElement(
            'li',
            { key: '' + i },
            React.createElement(
              'a',
              { href: '#', onClick: function onClick() {
                  _this2.setState({ page: i });
                } },
              'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i]
            )
          );
        }
      });

      var component = void 0;
      if (this.state.page === this.props.contest.numTasks) {
        tab.push(React.createElement(
          'li',
          { className: 'active', key: '' + this.props.contest.numTasks },
          React.createElement(
            'a',
            { href: '#' },
            'Summary'
          )
        ));
        component = React.createElement(_summary2.default, { standings: this.props.standings,
          contest: this.props.contest });
      } else {
        tab.push(React.createElement(
          'li',
          { key: '' + this.props.contest.numTasks },
          React.createElement(
            'a',
            { href: '#', onClick: function onClick() {
                _this2.setState({ page: _this2.props.contest.numTasks });
              } },
            'Summary'
          )
        ));
        component = React.createElement(_task2.default, { task: this.props.contest.tasks[this.state.page],
          standings: this.props.standings,
          contest: this.props.contest });
      }

      return React.createElement(
        'div',
        null,
        React.createElement(
          'ul',
          { className: 'nav nav-tabs' },
          tab
        ),
        component
      );
    }
  }]);

  return StatsContent;
}(React.Component);

var Stats = function (_React$Component2) {
  _inherits(Stats, _React$Component2);

  /**
  * @param props.standings
  * @param props.contest
  */
  function Stats(props) {
    _classCallCheck(this, Stats);

    return _possibleConstructorReturn(this, (Stats.__proto__ || Object.getPrototypeOf(Stats)).call(this, props));
  }

  _createClass(Stats, [{
    key: 'render',
    value: function render() {
      var button = React.createElement(
        'a',
        { href: '#' },
        React.createElement(
          'i',
          { className: 'material-icons' },
          'assessment'
        ),
        ' Statistics '
      );

      return React.createElement(
        _modal2.default,
        { button: button, title: 'Statistics' },
        React.createElement(StatsContent, { standings: this.props.standings, contest: this.props.contest })
      );
    }
  }]);

  return Stats;
}(React.Component);

exports.default = Stats;

},{"./modal.js":9,"./stats/summary.js":17,"./stats/task.js":18}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartComponent = function (_React$Component) {
  _inherits(ChartComponent, _React$Component);

  /**
  * canvasId
  * dataset
  * width
  * height
  */
  function ChartComponent(props) {
    _classCallCheck(this, ChartComponent);

    return _possibleConstructorReturn(this, (ChartComponent.__proto__ || Object.getPrototypeOf(ChartComponent)).call(this, props));
  }

  _createClass(ChartComponent, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement("canvas", { id: this.props.canvasId, width: this.props.width, height: this.props.height })
      );
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var ctx = document.getElementById(this.props.canvasId);
      // console.log(ctx);
      this.chart = new Chart(ctx, this.props.dataset);
      // console.log(this.chart);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.chart.destroy();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.chart.destroy();
      var ctx = document.getElementById(this.props.canvasId);
      // console.log(ctx);
      this.chart = new Chart(ctx, this.props.dataset);
      // console.log(this.chart);
    }
  }]);

  return ChartComponent;
}(React.Component);

exports.default = ChartComponent;

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../util.js');

var _chartComponent = require('./chartComponent.js');

var _chartComponent2 = _interopRequireDefault(_chartComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopOfColors = function (_React$Component) {
  _inherits(TopOfColors, _React$Component);

  function TopOfColors(props) {
    _classCallCheck(this, TopOfColors);

    return _possibleConstructorReturn(this, (TopOfColors.__proto__ || Object.getPrototypeOf(TopOfColors)).call(this, props));
  }

  _createClass(TopOfColors, [{
    key: 'render',
    value: function render() {
      var data = new Array(_util.rating.lb.length);
      data.fill(undefined);

      this.props.standings.forEach(function (s) {
        if (s.elapsed_time === "0") {
          var participating = false;
          s.tasks.forEach(function (t) {
            if (t.score !== undefined) participating = true;
          });
          if (participating === false) return;
        }

        var level = _util.rating.getLevel(s.rating);
        if (data[level] === undefined) {
          data[level] = {
            name: s.user_screen_name,
            rating: s.rating,
            rank: s.rank,
            score: Number(s.score) / 100,
            time: Number(s.elapsed_time),
            penalty: Number(s.penalty),
            failure: Number(s.failure)
          };
        }
      });

      // console.log(data);

      data = data.slice(1);

      var comp = data.map(function (d, idx) {
        if (d === undefined) {
          return React.createElement(
            'tr',
            { key: idx },
            React.createElement(
              'td',
              null,
              React.createElement(
                'span',
                { style: { color: _util.rating.colorOriginal[idx + 1] } },
                _util.rating.lb[idx + 1],
                ' - '
              )
            ),
            React.createElement(
              'td',
              null,
              ' - '
            ),
            React.createElement(
              'td',
              null,
              ' - '
            ),
            React.createElement(
              'td',
              null,
              ' - '
            ),
            React.createElement(
              'td',
              null,
              ' - '
            )
          );
        } else {
          return React.createElement(
            'tr',
            { key: idx },
            React.createElement(
              'td',
              null,
              React.createElement(
                'span',
                { style: { color: _util.rating.colorOriginal[idx + 1] } },
                _util.rating.lb[idx + 1],
                ' - '
              )
            ),
            React.createElement(
              'td',
              null,
              _util.rating.generateColoredName(d.name, d.rating)
            ),
            React.createElement(
              'td',
              null,
              d.rank
            ),
            React.createElement(
              'td',
              null,
              d.score,
              d.failure != 0 ? React.createElement(
                'span',
                null,
                ' (',
                d.failure,
                ')'
              ) : ""
            ),
            React.createElement(
              'td',
              null,
              Math.floor(d.time / 60),
              ' min ',
              d.time % 60,
              ' sec (',
              Math.floor(d.penalty / 60),
              ' min ',
              d.penalty % 60,
              ' sec)'
            )
          );
        }
      });

      comp.reverse();

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h3',
          null,
          'Top of Colors'
        ),
        React.createElement(
          'table',
          { className: 'table table-bordered table-condensed' },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'th',
                null,
                'Rating'
              ),
              React.createElement(
                'th',
                null,
                'Top'
              ),
              React.createElement(
                'th',
                null,
                'Rank'
              ),
              React.createElement(
                'th',
                null,
                'Score (Penalty)'
              ),
              React.createElement(
                'th',
                null,
                'Time (Penalty)'
              )
            )
          ),
          React.createElement(
            'tbody',
            null,
            comp
          )
        )
      );
    }
  }]);

  return TopOfColors;
}(React.Component);

var TopOfCountries = function (_React$Component2) {
  _inherits(TopOfCountries, _React$Component2);

  function TopOfCountries(props) {
    _classCallCheck(this, TopOfCountries);

    var _this2 = _possibleConstructorReturn(this, (TopOfCountries.__proto__ || Object.getPrototypeOf(TopOfCountries)).call(this, props));

    _this2.state = {
      sortingKey: "rank",
      ascending: true
    };
    return _this2;
  }

  _createClass(TopOfCountries, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var data = {};

      this.props.standings.forEach(function (s) {
        if (s.elapsed_time === "0") {
          var participating = false;
          s.tasks.forEach(function (t) {
            if (t.score !== undefined) participating = true;
          });
          if (participating === false) return;
        }

        var country = s.country;

        if (data[country] === undefined) {
          data[country] = {
            name: s.user_screen_name,
            country: s.country,
            rating: s.rating,
            rank: s.rank,
            score: Number(s.score) / 100,
            time: Number(s.elapsed_time),
            penalty: Number(s.penalty),
            failure: Number(s.failure),
            scoreTime: Number(s.score) * 1000000000 - Number(s.penalty)
          };
        }
      });

      data = Object.keys(data).map(function (c) {
        return data[c];
      });

      data.sort(function (x, y) {
        var res = x[_this3.state.sortingKey] < y[_this3.state.sortingKey];
        res = _this3.state.ascending ? res : !res;
        return res ? -1 : 1;
      });

      var comp = data.map(function (d, idx) {
        return React.createElement(
          'tr',
          { key: idx },
          React.createElement(
            'td',
            null,
            d.rank
          ),
          React.createElement(
            'td',
            null,
            React.createElement('img', { src: '/img/flag/' + d.country + '.png', style: { verticalAlign: "middle", width: "16px", height: "16px" } }),
            ' ',
            _util.countries[d.country]
          ),
          React.createElement(
            'td',
            null,
            _util.rating.generateColoredName(d.name, d.rating)
          ),
          React.createElement(
            'td',
            null,
            d.score,
            d.failure != 0 ? React.createElement(
              'span',
              null,
              ' (',
              d.failure,
              ')'
            ) : ""
          ),
          React.createElement(
            'td',
            null,
            Math.floor(d.time / 60),
            ' min ',
            d.time % 60,
            ' sec (',
            Math.floor(d.penalty / 60),
            ' min ',
            d.penalty % 60,
            ' sec)'
          )
        );
      });

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h3',
          null,
          'Top of Countries'
        ),
        React.createElement(
          'table',
          { className: 'table table-bordered table-condensed' },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'th',
                { onClick: function onClick() {
                    if (_this3.state.sortingKey == "rank") _this3.setState({ sortingKey: "rank", ascending: !_this3.state.ascending });else _this3.setState({ sortingKey: "rank", ascending: true });
                  } },
                'Rank'
              ),
              React.createElement(
                'th',
                { onClick: function onClick() {
                    if (_this3.state.sortingKey == "country") _this3.setState({ sortingKey: "country", ascending: !_this3.state.ascending });else _this3.setState({ sortingKey: "country", ascending: true });
                  } },
                'Country'
              ),
              React.createElement(
                'th',
                { onClick: function onClick() {
                    if (_this3.state.sortingKey == "name") _this3.setState({ sortingKey: "name", ascending: !_this3.state.ascending });else _this3.setState({ sortingKey: "name", ascending: true });
                  } },
                'Top'
              ),
              React.createElement(
                'th',
                { onClick: function onClick() {
                    if (_this3.state.sortingKey == "scoreTime") _this3.setState({ sortingKey: "scoreTime", ascending: !_this3.state.ascending });else _this3.setState({ sortingKey: "scoreTime", ascending: false });
                  } },
                'Score (Penalty)'
              ),
              React.createElement(
                'th',
                { onClick: function onClick() {
                    if (_this3.state.sortingKey == "scoreTime") _this3.setState({ sortingKey: "scoreTime", ascending: !_this3.state.ascending });else _this3.setState({ sortingKey: "scoreTime", ascending: true });
                  } },
                'Time (Penalty)'
              )
            )
          ),
          React.createElement(
            'tbody',
            null,
            comp
          )
        )
      );
    }
  }]);

  return TopOfCountries;
}(React.Component);

var NumberOfColorContestants = function (_React$Component3) {
  _inherits(NumberOfColorContestants, _React$Component3);

  function NumberOfColorContestants(props) {
    _classCallCheck(this, NumberOfColorContestants);

    var _this4 = _possibleConstructorReturn(this, (NumberOfColorContestants.__proto__ || Object.getPrototypeOf(NumberOfColorContestants)).call(this, props));

    _this4.state = {
      sortingKey: "rating",
      ascending: false
    };
    return _this4;
  }

  _createClass(NumberOfColorContestants, [{
    key: 'render',
    value: function render() {
      var _this5 = this;

      var data = new Array(_util.rating.lb.length);
      for (var i = 0; i < data.length; i++) {
        data[i] = { rating: i, contestants: 0 };
      }

      this.props.standings.forEach(function (s) {
        if (s.elapsed_time === "0") {
          var participating = false;
          s.tasks.forEach(function (t) {
            if (t.score !== undefined) participating = true;
          });
          if (participating === false) return;
        }

        var level = _util.rating.getLevel(s.rating);
        data[level].contestants += 1;
      });

      data = data.slice(1);

      data.sort(function (x, y) {
        var res = x[_this5.state.sortingKey] < y[_this5.state.sortingKey];
        res = _this5.state.ascending ? res : !res;
        return res ? -1 : 1;
      });

      var comp = data.map(function (d, idx) {
        return React.createElement(
          'tr',
          { key: idx },
          React.createElement(
            'td',
            null,
            React.createElement(
              'span',
              { style: { color: _util.rating.colorOriginal[d.rating] } },
              _util.rating.lb[d.rating],
              ' - '
            )
          ),
          React.createElement(
            'td',
            null,
            d.contestants
          )
        );
      });

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h3',
          null,
          'Number of Contestants (Color)'
        ),
        React.createElement(
          'table',
          { className: 'table table-bordered table-condensed' },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'th',
                { onClick: function onClick() {
                    if (_this5.state.sortingKey == "rating") _this5.setState({ sortingKey: "rating", ascending: !_this5.state.ascending });else _this5.setState({ sortingKey: "rating", ascending: false });
                  } },
                'Rating'
              ),
              React.createElement(
                'th',
                { onClick: function onClick() {
                    if (_this5.state.sortingKey == "contestants") _this5.setState({ sortingKey: "contestants", ascending: !_this5.state.ascending });else _this5.setState({ sortingKey: "contestants", ascending: false });
                  } },
                'Contestants'
              )
            )
          ),
          React.createElement(
            'tbody',
            null,
            comp
          )
        )
      );
    }
  }]);

  return NumberOfColorContestants;
}(React.Component);

var NumberOfCountryContestants = function (_React$Component4) {
  _inherits(NumberOfCountryContestants, _React$Component4);

  function NumberOfCountryContestants(props) {
    _classCallCheck(this, NumberOfCountryContestants);

    var _this6 = _possibleConstructorReturn(this, (NumberOfCountryContestants.__proto__ || Object.getPrototypeOf(NumberOfCountryContestants)).call(this, props));

    _this6.state = {
      sortingKey: "contestants",
      ascending: false
    };
    return _this6;
  }

  _createClass(NumberOfCountryContestants, [{
    key: 'render',
    value: function render() {
      var _this7 = this;

      var data = {};

      this.props.standings.forEach(function (s) {
        if (s.elapsed_time === "0") {
          var participating = false;
          s.tasks.forEach(function (t) {
            if (t.score !== undefined) participating = true;
          });
          if (participating === false) return;
        }

        var country = s.country;

        if (data[country] === undefined) {
          data[country] = {
            country: country,
            contestants: 1
          };
        } else {
          data[country].contestants += 1;
        }
      });

      data = Object.keys(data).map(function (c) {
        return data[c];
      });

      data.sort(function (x, y) {
        var res = x[_this7.state.sortingKey] < y[_this7.state.sortingKey];
        res = _this7.state.ascending ? res : !res;
        return res ? -1 : 1;
      });

      var comp = data.map(function (d, idx) {
        return React.createElement(
          'tr',
          { key: idx },
          React.createElement(
            'td',
            null,
            React.createElement('img', { src: '/img/flag/' + d.country + '.png', style: { verticalAlign: "middle", width: "16px", height: "16px" } }),
            ' ',
            _util.countries[d.country]
          ),
          React.createElement(
            'td',
            null,
            d.contestants
          )
        );
      });

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h3',
          null,
          'Number of Contestants (Country)'
        ),
        React.createElement(
          'table',
          { className: 'table table-bordered table-condensed' },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'th',
                { onClick: function onClick() {
                    if (_this7.state.sortingKey == "country") _this7.setState({ sortingKey: "country", ascending: !_this7.state.ascending });else _this7.setState({ sortingKey: "country", ascending: true });
                  } },
                'Country'
              ),
              React.createElement(
                'th',
                { onClick: function onClick() {
                    if (_this7.state.sortingKey == "contestants") _this7.setState({ sortingKey: "contestants", ascending: !_this7.state.ascending });else _this7.setState({ sortingKey: "contestants", ascending: false });
                  } },
                'Contestants'
              )
            )
          ),
          React.createElement(
            'tbody',
            null,
            comp
          )
        )
      );
    }
  }]);

  return NumberOfCountryContestants;
}(React.Component);

var StatsSummary = function (_React$Component5) {
  _inherits(StatsSummary, _React$Component5);

  function StatsSummary(props) {
    _classCallCheck(this, StatsSummary);

    var _this8 = _possibleConstructorReturn(this, (StatsSummary.__proto__ || Object.getPrototypeOf(StatsSummary)).call(this, props));

    _this8.genDataset.bind(_this8);
    return _this8;
  }

  _createClass(StatsSummary, [{
    key: 'genDataset',
    value: function genDataset() {
      var labels = _util.rating.lb.slice(1).map(function (r) {
        return String(r) + " -";
      });
      var color = _util.rating.color.slice(1);
      var count = _util.rating.color.map(function () {
        return new Map();
      });
      var scoreDistribution = new Set();
      this.props.standings.forEach(function (r) {
        if (r.tasks.map(function (t) {
          return t.elapsed_time !== undefined ? 1 : 0;
        }).reduce(function (a, b) {
          return a + b;
        }) !== 0) {
          var level = _util.rating.getLevel(r.rating);
          var score = r.score / 100;
          scoreDistribution.add(score);
          count[level].set(score, count[level].has(score) ? count[level].get(score) + 1 : 1);
        }
      });
      var scores = [].concat(_toConsumableArray(scoreDistribution)).sort(function (a, b) {
        return a < b ? -1 : 1;
      });
      var data = _util.rating.lb.map(function () {
        return new Array(scores.length).fill(0);
      });
      count.forEach(function (c, level) {
        c.forEach(function (cnt, score) {
          data[level][scores.indexOf(score)] = cnt;
        });
      });

      var dataset = {
        type: 'bar',
        data: {
          labels: scores,
          datasets: data.slice(1).map(function (d, i) {
            return {
              label: labels[i],
              data: d,
              backgroundColor: color[i]
            };
          })
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Score"
              },
              ticks: {
                beginAtZero: true
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: "People"
              },
              ticks: {
                beginAtZero: true
              },
              stacked: true
            }]
          },
          animation: {
            animate: false,
            animateScale: false
          }
        }
      };
      return dataset;
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          null,
          this.props.contest.contestEnded ? React.createElement(
            'span',
            null,
            'This stats is unofficial. You can check the official stats ',
            React.createElement(
              'a',
              { href: './statistics', target: '_blank' },
              'here'
            ),
            '.'
          ) : null
        ),
        React.createElement(
          'div',
          null,
          React.createElement(
            'h3',
            null,
            'Score Distribution'
          ),
          React.createElement(_chartComponent2.default, { canvasId: 'chartSummary', dataset: this.genDataset(), width: '500', height: '280' })
        ),
        React.createElement(TopOfColors, { standings: this.props.standings }),
        React.createElement(TopOfCountries, { standings: this.props.standings }),
        React.createElement(NumberOfColorContestants, { standings: this.props.standings }),
        React.createElement(NumberOfCountryContestants, { standings: this.props.standings })
      );
    }
  }]);

  return StatsSummary;
}(React.Component);

exports.default = StatsSummary;

},{"../util.js":20,"./chartComponent.js":16}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../util.js');

var _chartComponent = require('./chartComponent.js');

var _chartComponent2 = _interopRequireDefault(_chartComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatsTask = function (_React$Component) {
  _inherits(StatsTask, _React$Component);

  /**
  * task 
  * standings
  */
  function StatsTask(props) {
    _classCallCheck(this, StatsTask);

    var _this = _possibleConstructorReturn(this, (StatsTask.__proto__ || Object.getPrototypeOf(StatsTask)).call(this, props));

    _this.timeStep = 5 * 60;

    _this.getMaxScore.bind(_this);
    _this.getStatsValues.bind(_this);
    _this.generateDataset.bind(_this);
    return _this;
  }

  _createClass(StatsTask, [{
    key: 'getMaxScore',
    value: function getMaxScore() {
      var _this2 = this;

      var maxScore = 0;
      this.props.standings.forEach(function (data) {
        var d = data.tasks[_this2.props.task.id];
        if (d.score === undefined) return;
        maxScore = Math.max(maxScore, Number(d.score));
      });
      return maxScore;
    }
  }, {
    key: 'getStatsValues',
    value: function getStatsValues(standings) {
      var _this3 = this;

      var res = {};
      try {
        res.numAC = 0;
        res.numWA = 0;
        res.numPeopleTried = 0;
        res.numSubmissions = 0;
        res.firstAcceptedTime = 0;
        res.firstAcceptedPerson = [];

        var timeSum = 0;

        res.numContestants = 0;

        //set FA
        standings.forEach(function (data) {
          var d = data.tasks[_this3.props.task.id];
          if (d.score === undefined) return;

          if (_this3.maxScore == 0 || d.score != _this3.maxScore) {
            return;
          }

          if (res.firstAcceptedTime == 0) res.firstAcceptedTime = Number(d.elapsed_time);else res.firstAcceptedTime = Math.min(res.firstAcceptedTime, Number(d.elapsed_time));
        });

        //set other params
        standings.forEach(function (data) {
          //contestant made at least one submission
          if (data.tasks.map(function (t) {
            return t.elapsed_time !== undefined ? 1 : 0;
          }).reduce(function (a, b) {
            return a + b;
          }) !== 0) res.numContestants++;

          var d = data.tasks[_this3.props.task.id];
          if (d.score === undefined) return;

          res.numPeopleTried += 1;
          res.numSubmissions += d.failure;
          if (d.score != 0) res.numSubmissions += 1;

          if (_this3.maxScore == 0 || d.score != _this3.maxScore) {
            return;
          }

          res.numAC += 1;
          res.numWA += d.failure;
          timeSum += d.elapsed_time;

          if (res.firstAcceptedTime == d.elapsed_time) {
            res.firstAcceptedPerson.push(_util.rating.generateColoredName(data.user_screen_name, data.rating));
            res.firstAcceptedPerson.push(" ");
          }
        });

        if (res.numAC == 0) {
          res.averageTime = 0;
        } else {
          res.averageTime = Math.round(timeSum / res.numAC);
        }
      } catch (e) {
        console.log("failed to generate stats");
        console.log(e);
      }

      return res;
    }
  }, {
    key: 'generateDataset',
    value: function generateDataset() {
      var _this4 = this;

      var labels = _util.rating.lb.slice(1).map(function (r) {
        return String(r) + "-";
      });
      var color = _util.rating.color.slice(1);
      var contestDuration = (this.props.contest.endTime.getTime() - this.props.contest.startTime.getTime()) / 1000;

      // set solved histogram
      var data = _util.rating.lb.map(function () {
        return new Array(Math.floor((contestDuration + _this4.timeStep - 1) / _this4.timeStep)).fill(0);
      });
      this.props.standings.forEach(function (r) {
        var t = r.tasks[_this4.props.task.id];
        if (t.score === _this4.maxScore) {
          data[_util.rating.getLevel(r.rating)][Math.floor(t.elapsed_time / _this4.timeStep)] += 1;
        }
      });
      // dataset for the chart
      var dataset = {
        type: 'bar',
        data: {
          labels: function () {
            var arr = new Array(Math.floor((contestDuration + _this4.timeStep - 1) / _this4.timeStep));
            for (var i = 0; i < arr.length; i++) {
              arr[i] = 5 * i + '-';
            }
            return arr;
          }(),
          datasets: data.slice(1).map(function (d, i) {
            return {
              label: labels[i],
              data: d,
              backgroundColor: color[i]
            };
          })
        },
        options: {
          //responsive : false,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Time [min]"
              },
              ticks: {
                beginAtZero: true
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Solved"
              },
              ticks: {
                beginAtZero: true
              },
              stacked: true
            }]
          },
          animation: {
            animate: false,
            animateScale: false
          }
        }
      };

      return dataset;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      this.maxScore = this.getMaxScore();
      var dataAll = this.getStatsValues(this.props.standings);
      var rowAll = React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          'ALL'
        ),
        React.createElement(
          'td',
          null,
          dataAll.numAC
        ),
        React.createElement(
          'td',
          null,
          dataAll.numPeopleTried
        ),
        React.createElement(
          'td',
          null,
          dataAll.numSubmissions
        ),
        React.createElement(
          'td',
          null,
          (dataAll.numAC / Math.max(1, dataAll.numPeopleTried) * 100).toFixed(2),
          '%'
        ),
        React.createElement(
          'td',
          null,
          (dataAll.numAC / Math.max(1, dataAll.numContestants) * 100).toFixed(2),
          '%'
        ),
        React.createElement(
          'td',
          null,
          dataAll.firstAcceptedPerson,
          React.createElement('br', null),
          Math.floor(dataAll.firstAcceptedTime / 60) + ' min ' + dataAll.firstAcceptedTime % 60 + ' sec'
        ),
        React.createElement(
          'td',
          null,
          Math.floor(dataAll.averageTime / 60) + ' min ' + dataAll.averageTime % 60 + ' sec'
        ),
        React.createElement(
          'td',
          null,
          (dataAll.numWA / Math.max(1, dataAll.numAC)).toFixed(2)
        )
      );

      var dataColor = [];

      var _loop = function _loop(r) {
        var cStandings = _this5.props.standings.filter(function (s) {
          return _util.rating.lb[r] <= s.rating && s.rating < _util.rating.ub[r];
        });
        dataColor.push(_this5.getStatsValues(cStandings));
      };

      for (var r = 1; r <= 9; r++) {
        _loop(r);
      }
      var rowColor = dataColor.map(function (data, idx) {
        return React.createElement(
          'tr',
          { key: idx },
          React.createElement(
            'td',
            null,
            React.createElement(
              'span',
              { style: { color: _util.rating.colorOriginal[idx + 1] } },
              _util.rating.lb[idx + 1],
              ' - '
            )
          ),
          React.createElement(
            'td',
            null,
            data.numAC
          ),
          React.createElement(
            'td',
            null,
            data.numPeopleTried
          ),
          React.createElement(
            'td',
            null,
            data.numSubmissions
          ),
          React.createElement(
            'td',
            null,
            (data.numAC / Math.max(1, data.numPeopleTried) * 100).toFixed(2),
            '%'
          ),
          React.createElement(
            'td',
            null,
            (data.numAC / Math.max(1, data.numContestants) * 100).toFixed(2),
            '%'
          ),
          React.createElement(
            'td',
            null,
            data.firstAcceptedPerson,
            React.createElement('br', null),
            Math.floor(data.firstAcceptedTime / 60) + ' min ' + data.firstAcceptedTime % 60 + ' sec'
          ),
          React.createElement(
            'td',
            null,
            Math.floor(data.averageTime / 60) + ' min ' + data.averageTime % 60 + ' sec'
          ),
          React.createElement(
            'td',
            null,
            (data.numWA / Math.max(1, data.numAC)).toFixed(2)
          )
        );
      }).reverse();

      try {
        var res = React.createElement(
          'div',
          null,
          React.createElement(
            'h3',
            null,
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[this.props.task.id],
            ' : ',
            this.props.task.name
          ),
          React.createElement(
            'h4',
            null,
            React.createElement(
              'span',
              { title: 'the max score contestants got. this may be partial score' },
              'Max Score'
            ),
            ' : ',
            this.maxScore / 100
          ),
          React.createElement(
            'table',
            { className: 'table table-bordered table-condensed' },
            React.createElement(
              'thead',
              null,
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'th',
                  null,
                  'Rating'
                ),
                React.createElement(
                  'th',
                  null,
                  React.createElement(
                    'span',
                    { title: 'number of people who got max score (may be partial score)' },
                    'AC'
                  )
                ),
                React.createElement(
                  'th',
                  null,
                  React.createElement(
                    'span',
                    { title: 'number of people who made at least one submission for this task' },
                    'Attempted'
                  )
                ),
                React.createElement(
                  'th',
                  null,
                  React.createElement(
                    'span',
                    { title: 'number of submissions for this task' },
                    'Submissions'
                  )
                ),
                React.createElement(
                  'th',
                  null,
                  'AC / Attempted'
                ),
                React.createElement(
                  'th',
                  null,
                  'AC / Contestants'
                ),
                React.createElement(
                  'th',
                  null,
                  'Fastest'
                ),
                React.createElement(
                  'th',
                  null,
                  'Average Time'
                ),
                React.createElement(
                  'th',
                  null,
                  'Average WA'
                )
              )
            ),
            React.createElement(
              'tbody',
              null,
              rowAll
            )
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'h3',
              null,
              'AC Time Distribution'
            ),
            React.createElement(_chartComponent2.default, { canvasId: 'taskChart_' + this.props.task.id, dataset: this.generateDataset(),
              width: '800', height: '340' })
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'h3',
              null,
              'Color Stats'
            ),
            React.createElement(
              'table',
              { className: 'table table-bordered table-condensed' },
              React.createElement(
                'thead',
                null,
                React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'th',
                    null,
                    'Rating'
                  ),
                  React.createElement(
                    'th',
                    null,
                    React.createElement(
                      'span',
                      { title: 'number of people who got max score (may be partial score)' },
                      'AC'
                    )
                  ),
                  React.createElement(
                    'th',
                    null,
                    React.createElement(
                      'span',
                      { title: 'number of people who made at least one submission for this task' },
                      'Attempted'
                    )
                  ),
                  React.createElement(
                    'th',
                    null,
                    React.createElement(
                      'span',
                      { title: 'number of submissions for this task' },
                      'Submissions'
                    )
                  ),
                  React.createElement(
                    'th',
                    null,
                    'AC / Attempted'
                  ),
                  React.createElement(
                    'th',
                    null,
                    'AC / Contestants'
                  ),
                  React.createElement(
                    'th',
                    null,
                    'Fastest'
                  ),
                  React.createElement(
                    'th',
                    null,
                    'Average Time'
                  ),
                  React.createElement(
                    'th',
                    null,
                    'Average WA'
                  )
                )
              ),
              React.createElement(
                'tbody',
                null,
                rowColor
              )
            )
          )
        );
        return res;
      } catch (e) {
        console.log(e);
      }
    }
  }]);

  return StatsTask;
}(React.Component);

exports.default = StatsTask;

},{"../util.js":20,"./chartComponent.js":16}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserInfo = function UserInfo() {
  _classCallCheck(this, UserInfo);

  var cookie = {};
  document.cookie.split(/;\s/).forEach(function (s) {
    //"_user_screen_name=koyumeishi; __privilege=contestant; _user_id=11408; _user_name=koyumeishi".split(/;\s/).forEach( (s) => {
    var _s$split = s.split(/=/),
        _s$split2 = _slicedToArray(_s$split, 2),
        key = _s$split2[0],
        value = _s$split2[1];

    cookie[key] = value;
  });

  this.contestant = false;
  if ("__privilege" in cookie && cookie.__privilege === "contestant") {
    this.contestant = true;
    this.user_screen_name = cookie._user_screen_name;
    this.user_id = Number(cookie._user_id);
  }
  console.log(this);
};

var me = new UserInfo();

exports.default = me;

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getStandings(callback, initialize) {
  var reg = /\s*data:\s(\[.*\]),/;

  if (initialize) {
    var scriptText = $("html").find('script[type="text/JavaScript"]').text().split("\n");

    scriptText.forEach(function (txt) {
      var res = reg.exec(txt);
      if (res !== null) {
        var newStandings = JSON.parse(res[1]);
        callback(newStandings);
      }
    });
  } else {
    $.ajax({ url: "./standings" }).done(function (html) {
      var scriptText = $(html).find('script[type="text/JavaScript"]').text().split("\n");
      scriptText.forEach(function (txt) {
        var res = reg.exec(txt);
        if (res !== null) {
          console.log("successfully got new standings : ", res[1]);
          var newStandings = JSON.parse(res[1]);
          callback(newStandings);
        }
      });
    });
  }
}

function getSortingFunction(key) {
  // task{i}
  if (key.slice(0, 4) == "task") {
    var id = Number(key.slice(4));
    return function (l, r) {
      if (l.tasks[id].score === undefined && r.tasks[id].score === undefined) return 0;
      if (l.tasks[id].score === undefined) return -1;
      if (r.tasks[id].score === undefined) return 1;
      if (l.tasks[id].score !== r.tasks[id].score) {
        return Number(l.tasks[id].score) < Number(r.tasks[id].score) ? -1 : 1;
      } else {
        if (l.tasks[id].penalty !== r.tasks[id].penalty) {
          return Number(l.tasks[id].penalty) > Number(r.tasks[id].penalty) ? -1 : 1;
        } else {
          return 0;
        }
      }
    };
  }
  if (key == "user_screen_name") {
    return function (l, r) {
      if (l[key].toLowerCase() !== r[key].toLowerCase()) {
        return l[key].toLowerCase() < r[key].toLowerCase() ? -1 : 1;
      } else {
        return 0;
      }
    };
  }

  if (key == "time") {
    return function (l, r) {
      if (l.score !== r.score) return Number(l.score) > Number(r.score) ? -1 : 1;else if (l.elapsed_time !== r.elapsed_time) return Number(l.elapsed_time) < Number(r.elapsed_time) ? -1 : 1;
      return 0;
    };
  }

  return function (l, r) {
    if (l[key] !== r[key]) {
      return l[key] < r[key] ? -1 : 1;
    } else {
      return 0;
    }
  };
}

var Rating = function () {
  function Rating() {
    _classCallCheck(this, Rating);

    //[lb, ub)
    this.lb = [-1, 0, 1, 400, 800, 1200, 1600, 2000, 2400, 2800];
    this.ub = [0, 1, 400, 800, 1200, 1600, 2000, 2400, 2800, 5000];

    this.color = ["rgba(192,0,192,   0.5)", // "#C000C0",
    "rgba(0,0,0,       0.5)", // "#000000",
    "rgba(128,128,128, 0.5)", // "#808080",
    "rgba(128,64,0,    0.5)", // "#804000",
    "rgba(0,128,0,     0.5)", // "#008000",
    "rgba(0,192,192,   0.5)", // "#00C0C0",
    "rgba(0,0,255,     0.5)", // "#0000FF",
    "rgba(192,192,0,   0.5)", // "#C0C000",
    "rgba(255,128,0,   0.5)", // "#FF8000",
    "rgba(255,0,0,     0.5)" // "#FF0000"
    ];

    this.colorOriginal = ["#C000C0", "#000000", "#808080", "#804000", "#008000", "#00C0C0", "#0000FF", "#C0C000", "#FF8000", "#FF0000"];

    this.userColor = ["user-admin", // "#C000C0",
    "user-unrated", // "#000000",
    "user-gray", // "#808080",
    "user-brown", // "#804000",
    "user-green", // "#008000",
    "user-cyan", // "#00C0C0",
    "user-blue", // "#0000FF",
    "user-yellow", // "#C0C000",
    "user-orange", // "#FF8000",
    "user-red" // "#FF0000"
    ];
  }

  _createClass(Rating, [{
    key: "getLevel",
    value: function getLevel(rating) {
      for (var level = 0; level < this.color.length; level++) {
        if (this.lb[level] <= rating && rating < this.ub[level]) {
          return level;
        }
      }
      return 0;
    }
  }, {
    key: "getColor",
    value: function getColor(rating) {
      return this.color[this.getLevel(rating)];
    }
  }, {
    key: "getColorOriginal",
    value: function getColorOriginal(rating) {
      return this.colorOriginal[this.getLevel(rating)];
    }
  }, {
    key: "generateColoredName",
    value: function generateColoredName(user_screen_name, rating) {
      return React.createElement(
        "a",
        { href: "https://atcoder.jp/user/" + user_screen_name,
          className: "username " + this.userColor[this.getLevel(rating)],
          target: "_blank",
          key: "user-" + user_screen_name },
        user_screen_name
      );
    }
  }]);

  return Rating;
}();

var rating = new Rating();

var countries = {
  "AF": "Afghanistan", "AL": "Albania", "DZ": "Algeria", "AD": "Andorra", "AO": "Angola", "AG": "Antigua and Barbuda", "AR": "Argentina", "AM": "Armenia", "AU": "Australia", "AT": "Austria", "AZ": "Azerbaijan", "BS": "Bahamas", "BH": "Bahrain", "BD": "Bangladesh", "BB": "Barbados", "BY": "Belarus", "BE": "Belgium", "BZ": "Belize", "BJ": "Benin", "BT": "Bhutan", "BO": "Bolivia", "BA": "Bosnia and Herzegovina", "BW": "Botswana", "BR": "Brazil", "BN": "Brunei", "BG": "Bulgaria", "BF": "Burkina Faso", "BI": "Burundi", "KH": "Cambodia", "CM": "Cameroon", "CA": "Canada", "CV": "Cape Verde", "CF": "Central African Republic", "TD": "Chad", "CL": "Chile", "CN": "China", "CO": "Colombia", "KM": "Comoros", "CK": "Cook", "CR": "Costa Rica", "HR": "Croatia", "CU": "Cuba", "CY": "Cyprus", "CZ": "Czech Republic", "CI": "Côte d\'Ivoire", "CD": "Democratic Republic of the Congo", "DK": "Denmark", "DJ": "Djibouti", "DM": "Dominica", "DO": "Dominican Republic", "EC": "Ecuador", "EG": "Egypt", "SV": "El Salvador", "GQ": "Equatorial Guinea", "ER": "Eritrea", "EE": "Estonia", "ET": "Ethiopia", "FJ": "Fiji", "FI": "Finland", "MK": "Former Yugoslav Republic of Macedonia", "FR": "France", "GA": "Gabon", "GM": "Gambia", "GE": "Georgia", "DE": "Germany", "GH": "Ghana", "GR": "Greece", "GD": "Grenada", "GT": "Guatemala", "GN": "Guinea", "GW": "Guinea-Bissau", "GY": "Guyana", "HK": "Hong Kong", "HT": "Haiti", "HN": "Honduras", "HU": "Hungary", "IS": "Iceland", "IN": "India", "ID": "Indonesia", "IR": "Iran", "IQ": "Iraq", "IE": "Ireland", "IL": "Israel", "IT": "Italy", "JM": "Jamaica", "JP": "Japan", "JO": "Jordan", "KZ": "Kazakhstan", "KE": "Kenya", "KI": "Kiribati", "KW": "Kuwait", "KG": "Kyrgyz Republic", "LA": "Laos", "LV": "Latvia", "LB": "Lebanon", "LS": "Lesotho", "LR": "Liberia", "LY": "Libya", "LI": "Liechtenstein", "LT": "Lithuania", "LU": "Luxembourg", "MG": "Madagascar", "MW": "Malawi", "MY": "Malaysia", "MV": "Maldives", "ML": "Mali", "MT": "Malta", "MH": "Marshall", "MR": "Mauritania", "MU": "Mauritius", "MX": "Mexico", "FM": "Micronesia", "MD": "Moldova", "MC": "Monaco", "MN": "Mongolia", "ME": "Montenegro", "MA": "Morocco", "MZ": "Mozambique", "MM": "Myanmar", "NA": "Namibia", "NR": "Nauru", "NP": "Nepal", "NL": "Netherlands", "NZ": "New Zealand", "NI": "Nicaragua", "NE": "Niger", "NG": "Nigeria", "NU": "Niue", "NO": "Norway", "OM": "Oman", "PK": "Pakistan", "PW": "Palau", "PS": "Palestine", "PA": "Panama", "PG": "Papua New Guinea", "PY": "Paraguay", "PE": "Peru", "PH": "Philippines", "PL": "Poland", "PT": "Portugal", "QA": "Qatar", "CG": "Republic of Congo", "KR": "Republic of Korea", "ZA": "Republic of South Africa", "RO": "Romania", "RU": "Russia", "RW": "Rwanda", "KN": "Saint Christopher and Nevis", "LC": "Saint Lucia", "VC": "Saint Vincent", "WS": "Samoa", "SM": "San Marino", "ST": "Sao Tome and Principe", "SA": "Saudi Arabia", "SN": "Senegal", "RS": "Serbia", "SC": "Seychelles", "SL": "Sierra Leone", "SG": "Singapore", "SK": "Slovakia", "SI": "Slovenia", "SB": "Solomon", "SO": "Somalia", "SS": "South Sudan", "ES": "Spain", "LK": "Sri Lanka", "SD": "Sudan", "SR": "Suriname", "SZ": "Swaziland", "SE": "Sweden", "CH": "Switzerland", "SY": "Syria", "TW": "Taiwan", "TJ": "Tajikistan", "TZ": "Tanzania", "TH": "Thailand", "TL": "Timor-Leste", "TG": "Togo", "TO": "Tonga", "TT": "Trinidad and Tobago", "TN": "Tunisia", "TR": "Turkey", "TM": "Turkmenistan", "TV": "Tuvalu", "UG": "Uganda", "UA": "Ukraine", "AE": "United Arab Emirates", "GB": "United Kingdom", "US": "United States of America", "XX": "Unknown", "UY": "Uruguay", "UZ": "Uzbekistan", "VU": "Vanuatu", "VA": "Vatican", "VE": "Venezuela", "VN": "Viet Nam", "YE": "Yemen", "ZM": "Zambia", "ZW": "Zimbabwe"
};

exports.getStandings = getStandings;
exports.getSortingFunction = getSortingFunction;
exports.rating = rating;
exports.countries = countries;

},{}]},{},[8]);
