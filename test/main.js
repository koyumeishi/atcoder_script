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

        this.filterCountry = null;
        this.filterRating = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        if (load === true) this.load();

        //reset temporary options
        this.filterByFriends = false;
        this.filterByCountry = false;
        this.filterByRating = false;
        this.filterByName = false;
        this.filterName = "";

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controll = function (_React$Component) {
  _inherits(Controll, _React$Component);

  function Controll(props) {
    _classCallCheck(this, Controll);

    return _possibleConstructorReturn(this, (Controll.__proto__ || Object.getPrototypeOf(Controll)).call(this, props));
  }

  _createClass(Controll, [{
    key: 'render',
    value: function render() {
      var ret = React.createElement(
        'div',
        { style: { display: "grid", gridTemplateRows: "1fr", gridTemplateColumns: "auto auto auto auto auto" } },
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
          React.createElement(_filter2.default, {
            settings: this.props.settings,
            settingsUpdateFunc: this.props.settingsUpdateFunc,
            getActiveCountries: this.props.getActiveCountries
          })
        ),
        React.createElement(
          'div',
          { style: { gridRow: "1/2", gridColumn: "3/4", padding: "4px" } },
          React.createElement(_sorting2.default, {
            settings: this.props.settings,
            contest: this.props.contest,
            settingsUpdateFunc: this.props.settingsUpdateFunc
          })
        ),
        React.createElement(
          'div',
          { style: { gridRow: "1/2", gridColumn: "4/5", padding: "4px" } },
          React.createElement(_stats2.default, {
            standings: this.props.standings,
            contest: this.props.contest
          })
        ),
        React.createElement(
          'div',
          { style: { gridRow: "1/2", gridColumn: "5/6", padding: "4px" } },
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

},{"./filter.js":6,"./reload.js":11,"./settings.js":12,"./sorting.js":13,"./stats.js":15}],5:[function(require,module,exports){
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
        this.fiends = new Set(Object.keys(friendsOld));
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

var _summery = require('./stats/summery.js');

var _summery2 = _interopRequireDefault(_summery);

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
            'Summery'
          )
        ));
        component = React.createElement(_summery2.default, { standings: this.props.standings,
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
            'Summery'
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

},{"./modal.js":9,"./stats/summery.js":17,"./stats/task.js":18}],16:[function(require,module,exports){
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

var StatsSummery = function (_React$Component) {
  _inherits(StatsSummery, _React$Component);

  function StatsSummery(props) {
    _classCallCheck(this, StatsSummery);

    var _this = _possibleConstructorReturn(this, (StatsSummery.__proto__ || Object.getPrototypeOf(StatsSummery)).call(this, props));

    _this.genDataset.bind(_this);
    return _this;
  }

  _createClass(StatsSummery, [{
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
        React.createElement(_chartComponent2.default, { canvasId: 'chartSummery', dataset: this.genDataset(), width: '500', height: '280' })
      );
    }
  }]);

  return StatsSummery;
}(React.Component);

exports.default = StatsSummery;

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
              '-'
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
          React.createElement(_chartComponent2.default, { canvasId: 'taskChart_' + this.props.task.id, dataset: this.generateDataset(),
            width: '800', height: '340' }),
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

},{}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0tvdS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcYXBwU2V0dGluZ3MuanMiLCJzcmNcXGNvbnRlc3REYXRhLmpzIiwic3JjXFxjb250cm9sbC5qcyIsInNyY1xcY3NzLmpzIiwic3JjXFxmaWx0ZXIuanMiLCJzcmNcXGZyaWVuZHNMaXN0LmpzIiwic3JjXFxtYWluLmpzIiwic3JjXFxtb2RhbC5qcyIsInNyY1xccGFnZXIuanMiLCJzcmNcXHJlbG9hZC5qcyIsInNyY1xcc2V0dGluZ3MuanMiLCJzcmNcXHNvcnRpbmcuanMiLCJzcmNcXHN0YW5kaW5ncy5qcyIsInNyY1xcc3RhdHMuanMiLCJzcmNcXHN0YXRzXFxjaGFydENvbXBvbmVudC5qcyIsInNyY1xcc3RhdHNcXHN1bW1lcnkuanMiLCJzcmNcXHN0YXRzXFx0YXNrLmpzIiwic3JjXFx1c2VyaW5mby5qcyIsInNyY1xcdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7O0lBQVksSTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCLHNCOzs7QUFDbkIsb0NBQWE7QUFBQTs7QUFBQTs7QUFFWCxVQUFLLEtBQUwsR0FBYSxFQUFiO0FBQ0EsVUFBSyxLQUFMLENBQVcsUUFBWCxHQUF1QiwwQkFBaUIsSUFBakIsQ0FBdkI7QUFDQSxVQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXVCLDBCQUFpQixJQUFqQixDQUF2Qjs7QUFFQSxTQUFLLFlBQUwsQ0FBbUIsVUFBQyxDQUFELEVBQU87QUFDeEIsWUFBSyxTQUFMLEdBQWlCLENBQWpCO0FBQ0QsS0FGRCxFQUVJLElBRko7O0FBSUEsVUFBSyxPQUFMLEdBQWdCLDJCQUFo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RUFDZ3ZGLE1BQUssYUFEcnZGLEVBQ213RixNQUFLLE9BRHh3RixFQUNneEYsTUFBSyxRQURyeEYsRUFDOHhGLE1BQUssWUFEbnlGLEVBQ2d6RixNQUFLLFVBRHJ6RixFQUNnMEYsTUFBSyxVQURyMEYsRUFDZzFGLE1BQUssYUFEcjFGLEVBQ20yRixNQUFLLE1BRHgyRixFQUMrMkYsTUFBSyxPQURwM0YsRUFDNDNGLE1BQUsscUJBRGo0RixFQUN1NUYsTUFBSyxTQUQ1NUYsRUFDczZGLE1BQUssUUFEMzZGLEVBQ283RixNQUFLLGNBRHo3RixFQUN3OEYsTUFBSyxRQUQ3OEYsRUFDczlGLE1BQUssUUFEMzlGLEVBQ28rRixNQUFLLFNBRHorRixFQUNtL0YsTUFBSyxzQkFEeC9GLEVBQytnRyxNQUFLLGdCQURwaEcsRUFDcWlHLE1BQUssMEJBRDFpRyxFQUNxa0csTUFBSyxTQUQxa0csRUFDb2xHLE1BQUssU0FEemxHLEVBQ21tRyxNQUFLLFlBRHhtRyxFQUNxbkcsTUFBSyxTQUQxbkcsRUFDb29HLE1BQUssU0FEem9HLEVBQ21wRyxNQUFLLFdBRHhwRyxFQUNvcUcsTUFBSyxVQUR6cUcsRUFDb3JHLE1BQUssT0FEenJHLEVBQ2lzRyxNQUFLLFFBRHRzRyxFQUMrc0csTUFBSztBQURwdEcsQ0FBbEI7O1FBSVEsWSxHQUFBLFk7UUFBYyxrQixHQUFBLGtCO1FBQW9CLE0sR0FBQSxNO1FBQVEsUyxHQUFBLFMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuL3V0aWwuanMnO1xyXG5pbXBvcnQgQXBwU2V0dGluZ3MgZnJvbSAnLi9hcHBTZXR0aW5ncy5qcyc7XHJcbmltcG9ydCBGcmllbmRzTGlzdCBmcm9tICcuL2ZyaWVuZHNMaXN0LmpzJztcclxuaW1wb3J0IENvbnRlc3REYXRhIGZyb20gJy4vY29udGVzdERhdGEuanMnO1xyXG5pbXBvcnQgU3RhdHMgZnJvbSAnLi9zdGF0cy5qcyc7XHJcbmltcG9ydCBDb250cm9sbCBmcm9tICcuL2NvbnRyb2xsLmpzJztcclxuaW1wb3J0IFN0YW5kaW5ncyBmcm9tICcuL3N0YW5kaW5ncy5qcyc7XHJcbmltcG9ydCBQYWdlciBmcm9tICcuL3BhZ2VyLmpzJztcclxuaW1wb3J0IE1lIGZyb20gJy4vdXNlcmluZm8uanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXRDb2RlckN1c3RvbVN0YW5kaW5ncyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnN0YXRlID0ge307XHJcbiAgICB0aGlzLnN0YXRlLnNldHRpbmdzICA9IG5ldyBBcHBTZXR0aW5ncyggdHJ1ZSApO1xyXG4gICAgdGhpcy5zdGF0ZS5mcmllbmRzICAgPSBuZXcgRnJpZW5kc0xpc3QoIHRydWUgKTtcclxuXHJcbiAgICB1dGlsLmdldFN0YW5kaW5ncyggKHMpID0+IHtcclxuICAgICAgdGhpcy5zdGFuZGluZ3MgPSBzO1xyXG4gICAgfSAsIHRydWUpO1xyXG5cclxuICAgIHRoaXMuY29udGVzdCAgPSBuZXcgQ29udGVzdERhdGEoKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlLmZpbHRlcmVkU3RhbmRpbmdzID0gdGhpcy5nZXRGaWx0ZXJlZFN0YW5kaW5ncyggdGhpcy5zdGF0ZS5zZXR0aW5ncyApO1xyXG4gICAgdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9IDA7IC8vemVyby1pbmRleGVkXHJcbiAgICB0aGlzLnN0YXRlLnRvdGFsUGFnZSAgID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vciggKHRoaXMuc3RhdGUuZmlsdGVyZWRTdGFuZGluZ3MubGVuZ3RoICsgdGhpcy5zdGF0ZS5zZXR0aW5ncy5wYWdlU2l6ZSAtIDEpIC8gdGhpcy5zdGF0ZS5zZXR0aW5ncy5wYWdlU2l6ZSApICk7XHJcblxyXG4gICAgdGhpcy5nZXRGaWx0ZXJlZFN0YW5kaW5ncy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5nZXRGaWx0ZXJlZFN0YW5kaW5nc1RvUmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnVwZGF0ZVN0YW5kaW5ncy5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlRnJpZW5kcy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy51cGRhdGVTZXR0aW5ncy5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlU2V0dGluZ3MoIG5ld1NldHRpbmdzICl7XHJcbiAgICBuZXdTZXR0aW5ncy5zYXZlKCk7XHJcbiAgICB0aGlzLnNldFN0YXRlKCAocHJldlN0YXRlKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5ld0ZpbHRlcmVkU3RhbmRpbmdzID0gdGhpcy5nZXRGaWx0ZXJlZFN0YW5kaW5ncyggbmV3U2V0dGluZ3MgKTtcclxuICAgICAgY29uc3QgdG90YWxQYWdlID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vciggKG5ld0ZpbHRlcmVkU3RhbmRpbmdzLmxlbmd0aCArIG5ld1NldHRpbmdzLnBhZ2VTaXplIC0gMSkgLyBuZXdTZXR0aW5ncy5wYWdlU2l6ZSApICk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gTWF0aC5taW4odG90YWxQYWdlLTEsICBwcmV2U3RhdGUuY3VycmVudFBhZ2UpO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzZXR0aW5ncyA6IG5ld1NldHRpbmdzLFxyXG4gICAgICAgIGZpbHRlcmVkU3RhbmRpbmdzIDogbmV3RmlsdGVyZWRTdGFuZGluZ3MsXHJcbiAgICAgICAgdG90YWxQYWdlIDogdG90YWxQYWdlLFxyXG4gICAgICAgIGN1cnJlbnRQYWdlIDogY3VycmVudFBhZ2VcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRnJpZW5kcyggaGFuZGxlTmFtZXMsIGFkZGluZyApe1xyXG4gICAgdGhpcy5zZXRTdGF0ZSggKHByZXZTdGF0ZSkgPT4ge1xyXG4gICAgICBsZXQgbmV3RnJpZW5kcyA9IG5ldyBGcmllbmRzTGlzdCggZmFsc2UgKTtcclxuICAgICAgbmV3RnJpZW5kcy5mcmllbmRzID0gbmV3IFNldCggcHJldlN0YXRlLmZyaWVuZHMuZ2V0TGlzdCgpICk7XHJcbiAgICAgIGlmKCBhZGRpbmcgPT09IHRydWUgKXtcclxuICAgICAgICBuZXdGcmllbmRzLmFkZChoYW5kbGVOYW1lcyk7XHJcbiAgICAgIH1lbHNlIGlmKCBhZGRpbmcgPT09IGZhbHNlICl7XHJcbiAgICAgICAgbmV3RnJpZW5kcy5yZW1vdmUoaGFuZGxlTmFtZXMpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB7IGZyaWVuZHMgOiBuZXdGcmllbmRzIH07XHJcbiAgICB9ICk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTdGFuZGluZ3MoKXtcclxuICAgIGNvbnNvbGUubG9nKFwic3RhcnRlZCB1cGRhdGluZ1wiKTtcclxuXHJcbiAgICB1dGlsLmdldFN0YW5kaW5ncyggKHMpID0+IHtcclxuICAgICAgdGhpcy5zdGFuZGluZ3MgPSBzO1xyXG4gICAgICB0aGlzLnNldFN0YXRlKCAocHJldlN0YXRlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV3RmlsdGVyZWRTdGFuZGluZ3MgPSB0aGlzLmdldEZpbHRlcmVkU3RhbmRpbmdzKCB0aGlzLnN0YXRlLnNldHRpbmdzICk7XHJcbiAgICAgICAgY29uc3QgdG90YWxQYWdlID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vciggKG5ld0ZpbHRlcmVkU3RhbmRpbmdzLmxlbmd0aCArIHRoaXMuc3RhdGUuc2V0dGluZ3MucGFnZVNpemUgLSAxKSAvIHRoaXMuc3RhdGUuc2V0dGluZ3MucGFnZVNpemUgKSApO1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gTWF0aC5taW4odG90YWxQYWdlLTEsICBwcmV2U3RhdGUuY3VycmVudFBhZ2UpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgZmlsdGVyZWRTdGFuZGluZ3MgOiBuZXdGaWx0ZXJlZFN0YW5kaW5ncyxcclxuICAgICAgICAgIHRvdGFsUGFnZSA6IHRvdGFsUGFnZSxcclxuICAgICAgICAgIGN1cnJlbnRQYWdlIDogY3VycmVudFBhZ2VcclxuICAgICAgICB9O1xyXG4gICAgICB9ICk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCBcInN0YW5kaW5ncyB1cGRhdGluZyBzdWNjZXNzZnVsbHkgY29tcGxldGVkXCIgKTtcclxuICAgIH0gLCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0RmlsdGVyZWRTdGFuZGluZ3Moc2V0dGluZ3Mpe1xyXG4gICAgY29uc3QgciA9IHV0aWwucmF0aW5nO1xyXG4gICAgbGV0IG5hbWVSZWc7XHJcbiAgICB0cnl7XHJcbiAgICAgIG5hbWVSZWcgPSBuZXcgUmVnRXhwKCBcIl5cIiArIHNldHRpbmdzLmZpbHRlck5hbWUgLCBcImlcIik7XHJcbiAgICB9Y2F0Y2goZSl7XHJcbiAgICAgIG5hbWVSZWcgPSBuZXcgUmVnRXhwKCBcIlwiICk7XHJcbiAgICB9XHJcbiAgICBsZXQgZlN0YW5kaW5ncyA9IHRoaXMuc3RhbmRpbmdzLmZpbHRlciggcm93ID0+IHtcclxuICAgICAgaWYoc2V0dGluZ3MuZmlsdGVyQnlGcmllbmRzID09PSB0cnVlKXtcclxuICAgICAgICBpZih0aGlzLnN0YXRlLmZyaWVuZHMuaXNGcmllbmQoIHJvdy51c2VyX3NjcmVlbl9uYW1lICkgPT09IGZhbHNlICYmXHJcbiAgICAgICAgICAgcm93LnVzZXJfc2NyZWVuX25hbWUgIT09IE1lLnVzZXJfc2NyZWVuX25hbWUpe1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZihzZXR0aW5ncy5maWx0ZXJCeUNvdW50cnkgPT09IHRydWUpe1xyXG4gICAgICAgIGlmKCByb3cuY291bnRyeSAhPT0gc2V0dGluZ3MuZmlsdGVyQ291bnRyeSApe1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZihzZXR0aW5ncy5maWx0ZXJCeVJhdGluZyA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgLy8gcmF0aW5nIGZpbHRlciBmdW5jdGlvblxyXG4gICAgICAgIC8vIHJvdy5yYXRpbmdcclxuICAgICAgICBjb25zdCBsZXZlbCA9IHIuZ2V0TGV2ZWwoIHJvdy5yYXRpbmcgKTtcclxuICAgICAgICBpZiggc2V0dGluZ3MuZmlsdGVyUmF0aW5nLmhhcyhsZXZlbCkgPT09IGZhbHNlICl7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKHNldHRpbmdzLmZpbHRlckJ5TmFtZSA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgaWYoIG5hbWVSZWcuZXhlYyggcm93LnVzZXJfc2NyZWVuX25hbWUgKSA9PT0gbnVsbCAmJiBuYW1lUmVnLmV4ZWMoIHJvdy51c2VyX25hbWUgKSA9PT0gbnVsbCApe1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gKTtcclxuXHJcbiAgICBpZiggc2V0dGluZ3Muc29ydGluZ0VuYWJsZWQgPT09IHRydWUgKXtcclxuICAgICAgbGV0IGYgPSB1dGlsLmdldFNvcnRpbmdGdW5jdGlvbiggc2V0dGluZ3Muc29ydGluZ0tleSApO1xyXG4gICAgICBpZiggc2V0dGluZ3Muc29ydGluZ09yZGVyID09PSBcImFzY2VuZGluZ1wiKSByZXR1cm4gZlN0YW5kaW5ncy5zb3J0KCBmICk7XHJcbiAgICAgIGVsc2UgcmV0dXJuIGZTdGFuZGluZ3Muc29ydCggKGEsYik9PmYoYSxiKSotMSApO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHJldHVybiBmU3RhbmRpbmdzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RmlsdGVyZWRTdGFuZGluZ3NUb1JlbmRlcigpe1xyXG4gICAgY29uc3QgcGFnZUJlZ2luID0gdGhpcy5zdGF0ZS5zZXR0aW5ncy5wYWdlU2l6ZSAqIHRoaXMuc3RhdGUuY3VycmVudFBhZ2U7XHJcbiAgICBjb25zdCBwYWdlRW5kICAgPSB0aGlzLnN0YXRlLnNldHRpbmdzLnBhZ2VTaXplICogKHRoaXMuc3RhdGUuY3VycmVudFBhZ2UrMSk7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5maWx0ZXJlZFN0YW5kaW5ncy5zbGljZSggcGFnZUJlZ2luLCBwYWdlRW5kICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IHBhZ2VNZSA9ICgoKT0+e1xyXG4gICAgICBjb25zdCBwb3MgPSB0aGlzLnN0YXRlLmZpbHRlcmVkU3RhbmRpbmdzLmZpbmRJbmRleCggKHJvdyk9PntyZXR1cm4gcm93LnVzZXJfc2NyZWVuX25hbWUgPT09IE1lLnVzZXJfc2NyZWVuX25hbWV9ICk7XHJcbiAgICAgIGlmKCBwb3MgPT09IC0xICkgcmV0dXJuIG51bGw7XHJcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKCBwb3MvdGhpcy5zdGF0ZS5zZXR0aW5ncy5wYWdlU2l6ZSApO1xyXG4gICAgfSkoKTtcclxuICAgIGxldCBzID0gdGhpcy5nZXRGaWx0ZXJlZFN0YW5kaW5nc1RvUmVuZGVyKCk7XHJcbiAgICBsZXQgY29tcG9uZW50cyA9IChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8Q29udHJvbGwgc3RhbmRpbmdzPXt0aGlzLnN0YW5kaW5nc31cclxuICAgICAgICAgICAgICAgICAgdXBkYXRlRnVuYz17KCk9PnRoaXMudXBkYXRlU3RhbmRpbmdzKCl9XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRlc3Q9e3RoaXMuY29udGVzdH1cclxuICAgICAgICAgICAgICAgICAgc2V0dGluZ3M9e3RoaXMuc3RhdGUuc2V0dGluZ3N9XHJcbiAgICAgICAgICAgICAgICAgIHNldHRpbmdzVXBkYXRlRnVuYz17IChuZXdTZXR0aW5ncyk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNldHRpbmdzKG5ld1NldHRpbmdzKTtcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgZnJpZW5kcz17dGhpcy5zdGF0ZS5mcmllbmRzfVxyXG4gICAgICAgICAgICAgICAgICBmcmllbmRzVXBkYXRlRnVuYz17KG5hbWUsIGFkZGluZyk9PnRoaXMudXBkYXRlRnJpZW5kcyhuYW1lLGFkZGluZyl9XHJcbiAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZUNvdW50cmllcz17KCk9PntcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLihuZXcgU2V0KCB0aGlzLnN0YW5kaW5ncy5tYXAoIChlKT0+ZS5jb3VudHJ5ICkgKSldLnNvcnQoIChhLGIpPT4ge3JldHVybiB1dGlsLmNvdW50cmllc1thXSA8IHV0aWwuY291bnRyaWVzW2JdID8gLTEgOiAxO30gKTtcclxuICAgICAgICAgICAgICAgICAgfX0vPlxyXG4gICAgICAgIDxQYWdlciBjdXJyZW50PXt0aGlzLnN0YXRlLmN1cnJlbnRQYWdlfSB0b3RhbD17dGhpcy5zdGF0ZS50b3RhbFBhZ2V9XHJcbiAgICAgICAgICAgICAgIG1lPXtwYWdlTWV9XHJcbiAgICAgICAgICAgICAgIG9uQ2xpY2tGdW5jPXsgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICBjb25zdCBwYWdlID0gTnVtYmVyKCBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZScpICk7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgge2N1cnJlbnRQYWdlIDogcGFnZX0gKTtcclxuICAgICAgICAgICAgICAgfSB9Lz5cclxuICAgICAgICA8U3RhbmRpbmdzIHN0YW5kaW5ncz17c31cclxuICAgICAgICAgICAgICAgICAgIHRhc2tEYXRhPXt0aGlzLmNvbnRlc3QudGFza3N9XHJcbiAgICAgICAgICAgICAgICAgICBjb250ZXN0RW5kZWQ9e3RoaXMuY29udGVzdC5jb250ZXN0RW5kZWR9XHJcbiAgICAgICAgICAgICAgICAgICBzZXR0aW5ncz17dGhpcy5zdGF0ZS5zZXR0aW5nc31cclxuICAgICAgICAgICAgICAgICAgIGZyaWVuZHM9e3RoaXMuc3RhdGUuZnJpZW5kc31cclxuICAgICAgICAgICAgICAgICAgIGZyaWVuZHNVcGRhdGVGdW5jPXsobmFtZSwgYWRkaW5nKT0+dGhpcy51cGRhdGVGcmllbmRzKG5hbWUsYWRkaW5nKX1cclxuICAgICAgICAgICAgICAgICAgIG9mZlNldD17dGhpcy5zdGF0ZS5jdXJyZW50UGFnZSp0aGlzLnN0YXRlLnNldHRpbmdzLnBhZ2VTaXplfS8+XHJcbiAgICAgICAgPFBhZ2VyIGN1cnJlbnQ9e3RoaXMuc3RhdGUuY3VycmVudFBhZ2V9IHRvdGFsPXt0aGlzLnN0YXRlLnRvdGFsUGFnZX1cclxuICAgICAgICAgICAgICAgbWU9e3BhZ2VNZX1cclxuICAgICAgICAgICAgICAgb25DbGlja0Z1bmM9eyAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICBjb25zdCBwYWdlID0gTnVtYmVyKCBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZScpICk7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgge2N1cnJlbnRQYWdlIDogcGFnZX0gKTtcclxuICAgICAgICAgICAgICAgfSB9Lz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcFNldHRpbmdze1xyXG4gIGNvbnN0cnVjdG9yKCBsb2FkICl7XHJcbiAgICAvL29wdGlvbnNcclxuICAgIHRoaXMuaGlnaGxpZ2h0RnJpZW5kcyAgID0gdHJ1ZTtcclxuICAgIHRoaXMuZGlzYWJsZVJhdGluZ0NvbG9yID0gZmFsc2U7XHJcbiAgICB0aGlzLmRpc3BsYXlOYW1lU3R5bGUgICA9IFwidXNlcl9zY3JlZW5fbmFtZVwiO1xyXG4gICAgdGhpcy5wYWdlU2l6ZSAgICAgICAgICAgPSA1MDtcclxuICAgIHRoaXMuc2hvd05hdGlvbmFsRmxhZyAgID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmZpbHRlckNvdW50cnkgICAgPSBudWxsO1xyXG4gICAgdGhpcy5maWx0ZXJSYXRpbmcgICAgID0gbmV3IFNldChbMSwyLDMsNCw1LDYsNyw4LDldKTtcclxuXHJcbiAgICBpZihsb2FkID09PSB0cnVlKSB0aGlzLmxvYWQoKTtcclxuXHJcbiAgICAvL3Jlc2V0IHRlbXBvcmFyeSBvcHRpb25zXHJcbiAgICB0aGlzLmZpbHRlckJ5RnJpZW5kcyA9IGZhbHNlO1xyXG4gICAgdGhpcy5maWx0ZXJCeUNvdW50cnkgPSBmYWxzZTtcclxuICAgIHRoaXMuZmlsdGVyQnlSYXRpbmcgID0gZmFsc2U7XHJcbiAgICB0aGlzLmZpbHRlckJ5TmFtZSAgICA9IGZhbHNlO1xyXG4gICAgdGhpcy5maWx0ZXJOYW1lICAgICAgPSBcIlwiO1xyXG5cclxuICAgIHRoaXMuc29ydGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgIC8vIFwicmFua1wiLCBcInVzZXJfc2NyZWVuX25hbWVcIiwgXCJyYXRpbmdcIiwgXCJjb3VudHJ5XCIsIFwiY29tcGV0aXRpb25zXCIsIFwidGFza3tpfVwiXHJcbiAgICB0aGlzLnNvcnRpbmdLZXkgICAgID0gXCJyYW5rXCI7XHJcbiAgICB0aGlzLnNvcnRpbmdPcmRlciAgID0gXCJhc2NlbmRpbmdcIjtcclxuXHJcbiAgICB0aGlzLmxvYWQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgbG9hZCgpe1xyXG4gICAgLy9sb2FkXHJcbiAgICB0cnl7XHJcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBKU09OLnBhcnNlKCBHTV9nZXRWYWx1ZSgnc2V0dGluZ3MnLCAne30nKSApO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24oIHRoaXMsIHNldHRpbmdzKTtcclxuICAgICAgICBpZiggdGhpcy5maWx0ZXJSYXRpbmcgPT09IHVuZGVmaW5lZCkgdGhpcy5maWx0ZXJSYXRpbmcgPSBuZXcgU2V0KFsxLDIsMyw0LDUsNiw3LDgsOV0pO1xyXG4gICAgICAgIGVsc2UgdGhpcy5maWx0ZXJSYXRpbmcgPSBuZXcgU2V0KHRoaXMuZmlsdGVyUmF0aW5nKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2FkZWQgOiBzZXR0aW5nc1wiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgIH1jYXRjaChlKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImZhaWxkIHRvIGxvYWQgc2V0dGluZ3NcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNhdmUoKXtcclxuICAgIC8vc2F2ZVxyXG4gICAgdGhpcy5maWx0ZXJSYXRpbmcgPSBbLi4udGhpcy5maWx0ZXJSYXRpbmddO1xyXG5cclxuICAgIGNvbnN0IHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcyk7XHJcbiAgICBjb25zdCBzdHIgPSBKU09OLnN0cmluZ2lmeSggc2V0dGluZ3MgKTtcclxuXHJcbiAgICB0aGlzLmZpbHRlclJhdGluZyA9IG5ldyBTZXQodGhpcy5maWx0ZXJSYXRpbmcpO1xyXG5cclxuICAgIEdNX3NldFZhbHVlKCdzZXR0aW5ncycsIHN0cik7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJzYXZlZCA6IHNldHRpbmdzXCIpO1xyXG4gICAgY29uc29sZS5sb2coc3RyKTtcclxuICB9XHJcblxyXG4gIGlzRmlsdGVyc0VuYWJsZWQoKXtcclxuICAgIHJldHVybiB0aGlzLmZpbHRlckJ5RnJpZW5kcyB8fCB0aGlzLmZpbHRlckJ5Q291bnRyeSB8fCB0aGlzLmZpbHRlckJ5UmF0aW5nIHx8IHRoaXMuZmlsdGVyQnlOYW1lO1xyXG4gIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlc3REYXRhe1xyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICB0aGlzLmNvbnRzdE5hbWUgPSAkKFwiZGl2LmNvbnRhaW5lciA+IGEuYnJhbmQgPiBzcGFuLmNvbnRlc3QtbmFtZVwiKS50ZXh0KCk7XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCBEYXRlLnBhcnNlKCQoJ3RpbWUjY29udGVzdC1zdGFydC10aW1lJykudGV4dCgpKSApO1xyXG4gICAgdGhpcy5lbmRUaW1lICAgPSBuZXcgRGF0ZSggRGF0ZS5wYXJzZSgkKCd0aW1lI2NvbnRlc3QtZW5kLXRpbWUnKS50ZXh0KCkpICk7XHJcblxyXG4gICAgdGhpcy5jb250ZXN0RW5kZWQgPSAobmV3IERhdGUoKSkgPj0gdGhpcy5lbmRUaW1lO1xyXG5cclxuICAgIGNvbnN0IHRoZWFkID0gICQoJyNjb250ZXN0LXN0YW5kaW5ncyA+IHRoZWFkID4gdHIgPiB0aCcpO1xyXG4gICAgdGhpcy5udW1UYXNrcyA9IHRoZWFkLmxlbmd0aCAtIDM7XHJcbiAgICB0aGlzLnRhc2tzID0gbmV3IEFycmF5KCB0aGlzLm51bVRhc2tzICk7XHJcbiAgICBmb3IobGV0IGk9MDsgaTx0aGlzLm51bVRhc2tzOyBpKyspe1xyXG4gICAgICBjb25zdCB0YXNrTmFtZSA9IHRoZWFkLmdldChpKzIpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylbMF0udGV4dENvbnRlbnQ7XHJcbiAgICAgIGNvbnN0IHRhc2tVcmwgID0gdGhlYWQuZ2V0KGkrMikuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKVswXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgICAgdGhpcy50YXNrc1tpXSA9IG5ldyBUYXNrRGF0YSggdGFza05hbWUsIHRhc2tVcmwsIGkgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFRhc2tEYXRhe1xyXG4gIGNvbnN0cnVjdG9yKCBuYW1lLCB1cmwsIGlkICl7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5pZCAgID0gaWQ7XHJcbiAgICB0aGlzLnVybCAgPSB1cmw7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBTdGF0cyBmcm9tICcuL3N0YXRzLmpzJ1xyXG5pbXBvcnQgRmlsdGVyIGZyb20gJy4vZmlsdGVyLmpzJ1xyXG5pbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9zZXR0aW5ncy5qcydcclxuaW1wb3J0IFNvcnRpbmcgZnJvbSAnLi9zb3J0aW5nLmpzJ1xyXG5pbXBvcnQgUmVsb2FkaW5nIGZyb20gJy4vcmVsb2FkLmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IHJldCA9IChcclxuICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJncmlkXCIsIGdyaWRUZW1wbGF0ZVJvd3M6XCIxZnJcIiwgZ3JpZFRlbXBsYXRlQ29sdW1uczpcImF1dG8gYXV0byBhdXRvIGF1dG8gYXV0b1wifX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIxLzJcIiwgZ3JpZENvbHVtbjpcIjEvMlwiLCBwYWRkaW5nOlwiNHB4XCJ9fT5cclxuICAgICAgICAgIDxSZWxvYWRpbmdcclxuICAgICAgICAgICAgdXBkYXRlRnVuYz17dGhpcy5wcm9wcy51cGRhdGVGdW5jfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7Z3JpZFJvdzpcIjEvMlwiLCBncmlkQ29sdW1uOlwiMi8zXCIsIHBhZGRpbmc6XCI0cHhcIn19PlxyXG4gICAgICAgICAgPEZpbHRlclxyXG4gICAgICAgICAgICBzZXR0aW5ncz17dGhpcy5wcm9wcy5zZXR0aW5nc31cclxuICAgICAgICAgICAgc2V0dGluZ3NVcGRhdGVGdW5jPXt0aGlzLnByb3BzLnNldHRpbmdzVXBkYXRlRnVuY31cclxuICAgICAgICAgICAgZ2V0QWN0aXZlQ291bnRyaWVzPXt0aGlzLnByb3BzLmdldEFjdGl2ZUNvdW50cmllc31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIxLzJcIiwgZ3JpZENvbHVtbjpcIjMvNFwiLCBwYWRkaW5nOlwiNHB4XCJ9fT5cclxuICAgICAgICAgIDxTb3J0aW5nXHJcbiAgICAgICAgICAgIHNldHRpbmdzPXt0aGlzLnByb3BzLnNldHRpbmdzfVxyXG4gICAgICAgICAgICBjb250ZXN0PXt0aGlzLnByb3BzLmNvbnRlc3R9XHJcbiAgICAgICAgICAgIHNldHRpbmdzVXBkYXRlRnVuYz17dGhpcy5wcm9wcy5zZXR0aW5nc1VwZGF0ZUZ1bmN9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tncmlkUm93OlwiMS8yXCIsIGdyaWRDb2x1bW46XCI0LzVcIiwgcGFkZGluZzpcIjRweFwifX0+XHJcbiAgICAgICAgICA8U3RhdHNcclxuICAgICAgICAgICAgc3RhbmRpbmdzPXt0aGlzLnByb3BzLnN0YW5kaW5nc31cclxuICAgICAgICAgICAgY29udGVzdD17dGhpcy5wcm9wcy5jb250ZXN0fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7Z3JpZFJvdzpcIjEvMlwiLCBncmlkQ29sdW1uOlwiNS82XCIsIHBhZGRpbmc6XCI0cHhcIn19PlxyXG4gICAgICAgICAgPFNldHRpbmdzXHJcbiAgICAgICAgICAgIHNldHRpbmdzPXt0aGlzLnByb3BzLnNldHRpbmdzfVxyXG4gICAgICAgICAgICBzZXR0aW5nc1VwZGF0ZUZ1bmM9e3RoaXMucHJvcHMuc2V0dGluZ3NVcGRhdGVGdW5jfVxyXG4gICAgICAgICAgICBmcmllbmRzPXt0aGlzLnByb3BzLmZyaWVuZHN9XHJcbiAgICAgICAgICAgIGZyaWVuZHNVcGRhdGVGdW5jPXt0aGlzLnByb3BzLmZyaWVuZHNVcGRhdGVGdW5jfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiByZXQ7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluamVjdEN1c3RvbUNTUygpe1xyXG4gIGxldCBjc3MgPSBgXHJcbi8qIFJ1bGVzIGZvciBzaXppbmcgdGhlIGljb24uICovXHJcbi5tYXRlcmlhbC1pY29ucy5tZC0xOCB7IGZvbnQtc2l6ZTogMThweDsgfVxyXG4ubWF0ZXJpYWwtaWNvbnMubWQtMjQgeyBmb250LXNpemU6IDI0cHg7IH1cclxuLm1hdGVyaWFsLWljb25zLm1kLTM2IHsgZm9udC1zaXplOiAzNnB4OyB9XHJcbi5tYXRlcmlhbC1pY29ucy5tZC00OCB7IGZvbnQtc2l6ZTogNDhweDsgfVxyXG5cclxuLyogUnVsZXMgZm9yIHVzaW5nIGljb25zIGFzIGJsYWNrIG9uIGEgbGlnaHQgYmFja2dyb3VuZC4gKi9cclxuLm1hdGVyaWFsLWljb25zLm1kLWRhcmsgeyBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjU0KTsgfVxyXG4ubWF0ZXJpYWwtaWNvbnMubWQtZGFyay5tZC1pbmFjdGl2ZSB7IGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjYpOyB9XHJcblxyXG4vKiBSdWxlcyBmb3IgdXNpbmcgaWNvbnMgYXMgd2hpdGUgb24gYSBkYXJrIGJhY2tncm91bmQuICovXHJcbi5tYXRlcmlhbC1pY29ucy5tZC1saWdodCB7IGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpOyB9XHJcbi5tYXRlcmlhbC1pY29ucy5tZC1saWdodC5tZC1pbmFjdGl2ZSB7IGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyk7IH1cclxuXHJcbi8qIENvbnRyb2xsZXIgQnV0dG9uICovXHJcbi5hdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MuY29udHJvbGxlci1idXR0b24ge1xyXG59XHJcbi5hdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MuY29udHJvbGxlci1idXR0b246aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjIwLDIyMCwyMjAsMC4xKTtcclxuICBib3gtc2hhZG93OjJweCA0cHggOHB4IDBweCBncmV5O1xyXG4gIGN1cnNvcjpwb2ludGVyO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG59XHJcblxyXG4vKiBNb2RhbCAqL1xyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLm1vZGFsLWZpbHRlcntcclxuICBwb3NpdGlvbiAgICAgICAgOiBmaXhlZDtcclxuICB0b3AgICAgICAgICAgICAgOiAwO1xyXG4gIGxlZnQgICAgICAgICAgICA6IDA7XHJcbiAgd2lkdGggICAgICAgICAgIDogMTAwJTtcclxuICBoZWlnaHQgICAgICAgICAgOiAxMDAlO1xyXG4gIHBhZGRpbmctdG9wICAgICAgOiA1MHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3IgOiByZ2JhKDAsMCwwLDAuNSk7XHJcbn1cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy5tb2RhbC1jb250ZW50e1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICB0b3AgOjUwJTtcclxuICBsZWZ0OiA1MCU7XHJcbiAgei1pbmRleDoxMDUwO1xyXG4gIG92ZXJmbG93OmF1dG87XHJcbiAgYmFja2dyb3VuZC1jb2xvcjp3aGl0ZTtcclxuICBib3gtc2hhZG93OjAgM3B4IDhweCAzcHggcmdiYSgwLDAsMCwwLjMpO1xyXG4gIHdpZHRoIDogODUwcHg7XHJcbiAgaGVpZ2h0IDogNjAwcHg7XHJcbiAgbWF4LWhlaWdodCA6IDYwMHB4O1xyXG4gIG1hcmdpbiA6IC0zMDBweCAwIDAgLTQyNXB4O1xyXG4gIHBhZGRpbmc6IDI1cHg7XHJcbn1cclxuXHJcbi8qIENoZWNrIEJveCAqL1xyXG4ubWF0ZXJpYWwtaWNvbnMubWQtY2hlY2tlZCB7IGNvbG9yIDogcmdiYSgwLCAxMjIsIDIwLCAwLjkpOyB9XHJcblxyXG4vKiBSZWxvYWRpbmcgT24gT2ZmKi9cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy5yZWxvYWRpbmctZW5hYmxlZCAgeyBjb2xvcjogcmdiKDIzMCwgMTI4LCA2Myk7IH1cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy5yZWxvYWRpbmctZGlzYWJsZWQgeyBjb2xvcjogZ3JleTsgfVxyXG5cclxuLyogU29ydGluZyBPbiBPZmYqL1xyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLnNvcnRpbmctZW5hYmxlZCAgeyBjb2xvcjogcmdiKDIzMCwgMTI4LCA2Myk7IH1cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy5zb3J0aW5nLWRpc2FibGVkIHsgY29sb3I6IGdyZXk7IH1cclxuXHJcbi8qIEZpbHRlciBPbiBPZmYqL1xyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLmZpbHRlcmluZy1lbmFibGVkICB7IGNvbG9yOiByZ2IoMjMwLCAxMjgsIDYzKTsgfVxyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLmZpbHRlcmluZy1kaXNhYmxlZCB7IGNvbG9yOiBncmV5OyB9XHJcblxyXG4vKiBTZXR0aW5ncyBJdGVtICovXHJcbi5hdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3Muc2V0dGluZ3MtaXRlbSB7XHJcbiAgcGFkZGluZzogNHB4O1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4vKiBTdGFuZGluZ3MgdGFibGUgKi9cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy50aW1lc3RhbXAgeyBjb2xvcjpncmV5OyBkaXNwbGF5OiBibG9jazsgfVxyXG5cclxuLyogT3RoZXIgKi9cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy5jdXJzb3ItbGluazpob3ZlcntcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbn1cclxuXHJcbi8qIFN0YW5kaW5ncyBwb3AgZG93biBtZW51ICovXHJcbi5hdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MudXNlci1kcm9wZG93bi1tZW51LWJveCB7XHJcbiAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgcGFkZGluZy10b3A6OHB4OyBcclxuICBwYWRkaW5nLWJvdHRvbTo4cHg7IFxyXG4gIGJhY2tncm91bmQtY29sb3I6d2hpdGU7IFxyXG4gIGJveC1zaGFkb3c6NHB4IDRweCA4cHggNHB4IGdyZXk7IFxyXG4gIGJvcmRlci1yYWRpdXM6MHB4IDBweCA2cHggMHB4O1xyXG4gIGN1cnNvcjogYXV0bztcclxufVxyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLnVzZXItZHJvcGRvd24tbWVudSB7XHJcbiAgZGlzcGxheSA6IGJsb2NrO1xyXG4gIGxpbmUtaGVpZ2h0OiAyZW07XHJcbiAgcGFkZGluZy1sZWZ0IDogOHB4O1xyXG4gIHBhZGRpbmctcmlnaHQgOiA4cHg7XHJcbn1cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy51c2VyLWRyb3Bkb3duLW1lbnU6aG92ZXIge1xyXG4gIGJhY2tncm91bmQgOiBsaWdodGJsdWU7XHJcbn1cclxuXHJcbi8qIG1vZGlmeSBvcmlnaW5hbCAqL1xyXG5hLnVzZXItcmVkIHtcclxuICBjb2xvcjojRkYwMDAwO1xyXG59XHJcblxyXG4uc3RhbmRpbmdzLWZyaWVuZCB0ZCB7YmFja2dyb3VuZC1jb2xvciA6IHJnYmEoMCwgMTUwLCAxMDAsIDAuMDkpICFpbXBvcnRhbnQ7fVxyXG4uc3RhbmRpbmdzLWZyaWVuZDpob3ZlciB0ZCB7YmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAyMDAsIDE1MCwgMC4wOSkgIWltcG9ydGFudDt9XHJcblxyXG4uc3RhbmRpbmdzLWZyaWVuZCA+IHRkLnN0YW5kaW5ncy1mcm96ZW4ge2JhY2tncm91bmQtY29sb3IgOiByZ2JhKDAsIDgyLCAyNTUsIDAuMjcpICFpbXBvcnRhbnQ7fVxyXG4uc3RhbmRpbmdzLWZyaWVuZCA+IHRkLnN0YW5kaW5ncy1mcm96ZW46aG92ZXIge2JhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgODIsIDI1NSwgMC4yNykgIWltcG9ydGFudDt9XHJcblxyXG5cclxuLnRhYmxlLXN0cmlwZWQgdGJvZHkgdHI6bnRoLWNoaWxkKG9kZCkgdGQsIC50YWJsZS1zdHJpcGVkIHRib2R5IHRyOm50aC1jaGlsZChvZGQpIHRoIHtiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZWZlO31cclxuLnRhYmxlIHRib2R5IHRyOmhvdmVyIHRkLCAudGFibGUgdGJvZHkgdHI6aG92ZXIgdGgge2JhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7fVxyXG5cclxudGQuc3RhbmRpbmdzLXVzZXJuYW1lOmhvdmVyIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbn1cclxuXHJcbi50YWJsZS1zb3J0IHRoe1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmUgIWltcG9ydGFudDtcclxufVxyXG5cclxuLnBhZ2luYXRpb24gLm1lIGEge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjUyLCAwLCAwLCAwLjA5KTtcclxuICBjb2xvciA6IHJnYigxMTQsMCwwKTtcclxufVxyXG5cclxuLnBhZ2luYXRpb24gLmFjdGl2ZS1tZSBhIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xyXG4gIGNvbG9yIDogcmdiKDIwMCwwLDApO1xyXG59XHJcbiAgYDtcclxuXHJcbiAgJCgnaGVhZCcpLmFwcGVuZChgPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPiR7Y3NzfTwvc3R5bGU+YCk7XHJcbn0iLCJpbXBvcnQge2NvdW50cmllcywgcmF0aW5nfSBmcm9tICcuL3V0aWwuanMnO1xyXG5pbXBvcnQgQXBwU2V0dGluZ3MgZnJvbSAnLi9hcHBTZXR0aW5ncy5qcyc7XHJcblxyXG5jbGFzcyBGaWx0ZXJDb250ZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgdGhpcy5ieUZyaWVuZHNMaXN0LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmJ5Q291bnRyeS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5ieVJhdGluZy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5ieU5hbWUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMudXBkYXRlLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoIG9wdGlvbiApe1xyXG4gICAgbGV0IG5ld1NldHRpbmdzID0gT2JqZWN0LmFzc2lnbihuZXcgQXBwU2V0dGluZ3MoKSwgdGhpcy5wcm9wcy5zZXR0aW5ncyk7XHJcbiAgICBmb3IobGV0IHBhcmFtIGluIG9wdGlvbil7XHJcbiAgICAgIG5ld1NldHRpbmdzW3BhcmFtXSA9IG9wdGlvbltwYXJhbV07XHJcbiAgICB9XHJcbiAgICB0aGlzLnByb3BzLnNldHRpbmdzVXBkYXRlRnVuYyggbmV3U2V0dGluZ3MgKTtcclxuICB9XHJcblxyXG4gIGJ5RnJpZW5kc0xpc3QoKXtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwidGFibGUtcm93XCJ9fVxyXG4gICAgICAgICAgIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBjdXJzb3ItbGluayAke3RoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyQnlGcmllbmRzID8gXCJmaWx0ZXJpbmctZW5hYmxlZFwiIDogXCJmaWx0ZXJpbmctZGlzYWJsZWRcIn1gfVxyXG4gICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeUZyaWVuZHNcIjogIXRoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyQnlGcmllbmRzfSApfT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlLWNlbGxcIn19PlxyXG4gICAgICAgICAgRnJpZW5kc1xyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBieUNvdW50cnkoKXtcclxuICAgIGNvbnN0IGZvcm0gPSB0aGlzLnByb3BzLmdldEFjdGl2ZUNvdW50cmllcygpLm1hcCggKGNvdW50cnkpID0+IHtcclxuICAgICAgY29uc3QgdmFsID0gY291bnRyaWVzW2NvdW50cnldO1xyXG4gICAgICByZXR1cm4gKDxvcHRpb24gdmFsdWU9e2NvdW50cnl9IGtleT17YGNvdW50cnktZmlsdGVyLW9wdGlvbi0ke2NvdW50cnl9YH0+e3ZhbH08L29wdGlvbj4pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlLXJvd1wifX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJ0YWJsZS1jZWxsXCJ9fVxyXG4gICAgICAgICAgICAgY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGN1cnNvci1saW5rICR7dGhpcy5wcm9wcy5zZXR0aW5ncy5maWx0ZXJCeUNvdW50cnkgPyBcImZpbHRlcmluZy1lbmFibGVkXCIgOiBcImZpbHRlcmluZy1kaXNhYmxlZFwifWB9XHJcbiAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZSgge1wiZmlsdGVyQnlDb3VudHJ5XCI6ICF0aGlzLnByb3BzLnNldHRpbmdzLmZpbHRlckJ5Q291bnRyeX0gKX1cclxuICAgICAgICAgICAgID5cclxuICAgICAgICAgIENvdW50cnlcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlLWNlbGxcIiwgcGFkZGluZ0xlZnQ6XCIxMHB4XCJ9fT5cclxuICAgICAgICAgIDxzZWxlY3QgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLnNldHRpbmdzLmZpbHRlckNvdW50cnl9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge3RoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeUNvdW50cnlcIjp0cnVlLCBcImZpbHRlckNvdW50cnlcIjogZS50YXJnZXQudmFsdWV9ICl9IH0+XHJcbiAgICAgICAgICAgIHtmb3JtfVxyXG4gICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGJ5UmF0aW5nKCl7XHJcbiAgICBsZXQgYnV0dG9ucyA9IHJhdGluZy5sYi5tYXAoIChsYiwgaWR4KSA9PiB7XHJcbiAgICAgIGlmKGlkeCA9PT0gMCkgcmV0dXJuIFwiXCI7XHJcbiAgICAgIGlmKCB0aGlzLnByb3BzLnNldHRpbmdzLmZpbHRlclJhdGluZy5oYXMoaWR4KSA9PT0gdHJ1ZSApe1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiIHN0eWxlPXt7Y29sb3IgOiByYXRpbmcuY29sb3JbaWR4XX19IG9uQ2xpY2s9eyAoKT0+e1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gbmV3IFNldCggdGhpcy5wcm9wcy5zZXR0aW5ncy5maWx0ZXJSYXRpbmcgKTtcclxuICAgICAgICAgICAgb2JqLmRlbGV0ZSggaWR4ICk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeVJhdGluZ1wiOnRydWUsIFwiZmlsdGVyUmF0aW5nXCI6IG9ian0gKTtcclxuICAgICAgICAgIH19IHRpdGxlPXtgJHtsYn0gLSBgfSBrZXk9e2ByYXRpbmctZmlsdGVyLXJhdGluZy0ke2xifWB9PlxyXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29ucyBtZC0yNFwiIHN0eWxlPXt7Y29sb3IgOiByYXRpbmcuY29sb3JbaWR4XX19PmNoZWNrX2JveDwvaT5cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICApO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiBzdHlsZT17e2NvbG9yIDogcmF0aW5nLmNvbG9yW2lkeF19fSBvbkNsaWNrPXsgKCk9PntcclxuICAgICAgICAgICAgbGV0IG9iaiA9IG5ldyBTZXQoIHRoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyUmF0aW5nICk7XHJcbiAgICAgICAgICAgIG9iai5hZGQoIGlkeCApO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgge1wiZmlsdGVyQnlSYXRpbmdcIjp0cnVlLCBcImZpbHRlclJhdGluZ1wiOiBvYmp9ICk7XHJcbiAgICAgICAgICB9fSB0aXRsZT17YCR7bGJ9IC0gYH0ga2V5PXtgcmF0aW5nLWZpbHRlci1yYXRpbmctJHtsYn1gfT5cclxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnMgbWQtMjRcIiBzdHlsZT17e2NvbG9yIDogcmF0aW5nLmNvbG9yW2lkeF19fT5jaGVja19ib3hfb3V0bGluZV9ibGFuazwvaT5cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgdG9vbCA9ICgoKT0+e1xyXG4gICAgICByZXR1cm4oXHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBmaWx0ZXJpbmctZGlzYWJsZWRcIiBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gbmV3IFNldChbMSwyLDMsNF0pO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgge1wiZmlsdGVyQnlSYXRpbmdcIjp0cnVlLCBcImZpbHRlclJhdGluZ1wiOiBvYmp9ICk7XHJcbiAgICAgICAgICB9fSB0aXRsZT1cIjAtMTE5OVwiPntcIkFCQ1wifTwvYT5cclxuICAgICAgICAgIDxzcGFuPiA8L3NwYW4+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBmaWx0ZXJpbmctZGlzYWJsZWRcIiBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gbmV3IFNldChbMSwyLDMsNCw1LDYsNyw4XSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeVJhdGluZ1wiOnRydWUsIFwiZmlsdGVyUmF0aW5nXCI6IG9ian0gKTtcclxuICAgICAgICAgIH19IHRpdGxlPVwiMC0yNzk5XCI+e1wiQVJDXCJ9PC9hPlxyXG4gICAgICAgICAgPHNwYW4+IDwvc3Bhbj5cclxuICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGZpbHRlcmluZy1kaXNhYmxlZFwiIG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeVJhdGluZ1wiOnRydWUsIFwiZmlsdGVyUmF0aW5nXCI6IG9ian0gKTtcclxuICAgICAgICAgIH19PntcIk5vbmVcIn08L2E+XHJcbiAgICAgICAgICA8c3Bhbj4gPC9zcGFuPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgZmlsdGVyaW5nLWRpc2FibGVkXCIgb25DbGljaz17KCk9PntcclxuICAgICAgICAgICAgbGV0IG9iaiA9IG5ldyBTZXQoWzEsMiwzLDQsNSw2LDcsOCw5XSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeVJhdGluZ1wiOnRydWUsIFwiZmlsdGVyUmF0aW5nXCI6IG9ian0gKTtcclxuICAgICAgICAgIH19PntcIkFsbFwifTwvYT5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICk7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwidGFibGUtcm93XCJ9fT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlLWNlbGxcIn19XHJcbiAgICAgICAgICAgICBjbGFzc05hbWU9e2BhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgY3Vyc29yLWxpbmsgJHt0aGlzLnByb3BzLnNldHRpbmdzLmZpbHRlckJ5UmF0aW5nID8gXCJmaWx0ZXJpbmctZW5hYmxlZFwiIDogXCJmaWx0ZXJpbmctZGlzYWJsZWRcIn1gfVxyXG4gICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGUoIHtcImZpbHRlckJ5UmF0aW5nXCI6ICF0aGlzLnByb3BzLnNldHRpbmdzLmZpbHRlckJ5UmF0aW5nfSApfVxyXG4gICAgICAgICAgICAgPlxyXG4gICAgICAgICAgUmF0aW5nXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJ0YWJsZS1jZWxsXCIsIHBhZGRpbmdMZWZ0OlwiMTBweFwifX0+XHJcbiAgICAgICAgICA8cD57YnV0dG9uc308L3A+XHJcbiAgICAgICAgICA8cD57dG9vbH08L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGJ5TmFtZSgpe1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJ0YWJsZS1yb3dcIn19PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwidGFibGUtY2VsbFwifX1cclxuICAgICAgICAgICAgIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBjdXJzb3ItbGluayAke3RoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyQnlOYW1lID8gXCJmaWx0ZXJpbmctZW5hYmxlZFwiIDogXCJmaWx0ZXJpbmctZGlzYWJsZWRcIn1gfVxyXG4gICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGUoIHtcImZpbHRlckJ5TmFtZVwiOiAhdGhpcy5wcm9wcy5zZXR0aW5ncy5maWx0ZXJCeU5hbWV9ICl9XHJcbiAgICAgICAgICAgICA+XHJcbiAgICAgICAgICBOYW1lXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJ0YWJsZS1jZWxsXCIsIHBhZGRpbmdMZWZ0OlwiMTBweFwifX0+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyTmFtZX0gb25DaGFuZ2U9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJOYW1lXCI6IGUudGFyZ2V0LnZhbHVlLCBcImZpbHRlckJ5TmFtZVwiOiB0cnVlfSApXHJcbiAgICAgICAgICB9IH0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBjb25zdCBieUZyaWVuZCA9IHRoaXMuYnlGcmllbmRzTGlzdCgpO1xyXG4gICAgY29uc3QgYnlSYXRpbmcgPSB0aGlzLmJ5Q291bnRyeSgpO1xyXG4gICAgY29uc3QgYnlDb3VudHJ5ID0gdGhpcy5ieVJhdGluZygpO1xyXG4gICAgY29uc3QgYnlOYW1lID0gdGhpcy5ieU5hbWUoKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246XCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6XCIyMHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOlwid2hpdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6XCI0cHggNHB4IDhweCA0cHggZ3JleVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czpcIjZweCA2cHggNnB4IDZweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogYCR7dGhpcy5wcm9wcy5wb3NZICsgNDB9cHhgLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6YCR7dGhpcy5wcm9wcy5wb3NYfXB4YCxcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6XCJhdXRvXCJcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICBvbkNsaWNrPXsoZSk9PmUuc3RvcFByb3BhZ2F0aW9uKCl9PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwidGFibGVcIiwgbGluZUhlaWdodDpcIjIuNWVtXCJ9fT5cclxuICAgICAgICAgIHtieUZyaWVuZH1cclxuICAgICAgICAgIHtieVJhdGluZ31cclxuICAgICAgICAgIHtieUNvdW50cnl9XHJcbiAgICAgICAgICB7YnlOYW1lfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc2hvdyA6IGZhbHNlLFxyXG4gICAgICBwb3NYIDogMCxcclxuICAgICAgcG9zWSA6IDBcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IChcclxuICAgICAgPGEgaHJlZj1cIiNcIlxyXG4gICAgICAgICBjbGFzc05hbWU9e2BhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgJHsgdGhpcy5wcm9wcy5zZXR0aW5ncy5pc0ZpbHRlcnNFbmFibGVkKCkgPyBcImZpbHRlcmluZy1lbmFibGVkXCIgOiBcImZpbHRlcmluZy1kaXNhYmxlZFwifWB9PlxyXG4gICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+ZmlsdGVyX2xpc3Q8L2k+XHJcbiAgICAgICAgRmlsdGVyIFxyXG4gICAgICA8L2E+XHJcbiAgICApO1xyXG5cclxuICAgIGlmKCB0aGlzLnN0YXRlLnNob3cgPT09IGZhbHNlICl7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgY29udHJvbGxlci1idXR0b25cIj5cclxuICAgICAgICAgIDxkaXYgb25DbGljaz17IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZWN0ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHtzaG93IDogIXRoaXMuc3RhdGUuc2hvdywgcG9zWDpyZWN0LmxlZnQsIHBvc1k6cmVjdC50b3AgfSkgO1xyXG4gICAgICAgICAgfSB9PntidXR0b259PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGNvbnRyb2xsZXItYnV0dG9uXCI+XHJcbiAgICAgICAgICA8ZGl2IG9uQ2xpY2s9eyAoZSkgPT4gdGhpcy5zZXRTdGF0ZSgge3Nob3cgOiAhdGhpcy5zdGF0ZS5zaG93IH0pIH0+e2J1dHRvbn08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjpcImZpeGVkXCIsIGxlZnQ6MCwgdG9wOjAsIHdpZHRoOlwiMTAwJVwiLCBoZWlnaHQ6XCIxMDAlXCJ9fVxyXG4gICAgICAgICAgICAgICBvbkNsaWNrPXsoZSk9PnRoaXMuc2V0U3RhdGUoe3Nob3c6ZmFsc2V9KX0+XHJcbiAgICAgICAgICAgIDxGaWx0ZXJDb250ZW50IHNldHRpbmdzPXt0aGlzLnByb3BzLnNldHRpbmdzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nc1VwZGF0ZUZ1bmM9e3RoaXMucHJvcHMuc2V0dGluZ3NVcGRhdGVGdW5jfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVDb3VudHJpZXM9e3RoaXMucHJvcHMuZ2V0QWN0aXZlQ291bnRyaWVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NYPXt0aGlzLnN0YXRlLnBvc1h9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc1k9e3RoaXMuc3RhdGUucG9zWX0vPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJpZW5kc0xpc3R7XHJcbiAgY29uc3RydWN0b3IoIGxvYWQgKXtcclxuICAgIHRoaXMuZnJpZW5kcyA9IG5ldyBTZXQoKTtcclxuICAgIGlmKGxvYWQgPT09IHRydWUpIHRoaXMubG9hZCgpO1xyXG5cclxuICAgIC8vdGhpcy5hZGQoXCJjYW15cGFwZXJcIik7XHJcbiAgfVxyXG5cclxuICBsb2FkKCl7XHJcbiAgICAvL2xvYWRcclxuICAgIC8vZnJpZW5kIGxpc3Qgb2JqZWN0IChvbGQgdmVyc2lvbilcclxuICAgIGxldCBmcmllbmRzT2xkID0gSlNPTi5wYXJzZSggR01fZ2V0VmFsdWUoJ0dNX2ZyaWVuZF9saXN0JywgJ251bGwnKSApO1xyXG4gICAgaWYoZnJpZW5kc09sZCAhPT0gbnVsbCl7XHJcbiAgICAgIHRoaXMuZmllbmRzID0gbmV3IFNldCggT2JqZWN0LmtleXMoZnJpZW5kc09sZCkgKTtcclxuICAgICAgR01fZGVsZXRlVmFsdWUoICdHTV9mcmllbmRfbGlzdCcgKTtcclxuICAgICAgdGhpcy5zYXZlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vZnJpZW5kIGxpc3QgYXJyYXkgKG5ldyB2ZXJzaW9uKVxyXG4gICAgdGhpcy5mcmllbmRzID0gbmV3IFNldChKU09OLnBhcnNlKCBHTV9nZXRWYWx1ZSgnZnJpZW5kc0xpc3QnLCAnW10nKSApKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcImxvYWRlZCA6IGZyaWVuZHMgbGlzdFwiKTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZnJpZW5kcyk7XHJcbiAgfVxyXG5cclxuICBzYXZlKCl7XHJcbiAgICBsZXQgc3RyID0gSlNPTi5zdHJpbmdpZnkoWy4uLnRoaXMuZnJpZW5kc10pO1xyXG4gICAgLy9zYXZlXHJcbiAgICBHTV9zZXRWYWx1ZSgnZnJpZW5kc0xpc3QnLCBzdHIpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwic2F2ZWQgOiBmcmllbmRzIGxpc3RcIik7XHJcbiAgICBjb25zb2xlLmxvZyhzdHIpO1xyXG4gIH1cclxuXHJcbiAgLy9bbmFtZXMuLi5dXHJcbiAgYWRkKGhhbmRsZSl7XHJcbiAgICBoYW5kbGUuZm9yRWFjaCggKG5hbWUpID0+IHRoaXMuZnJpZW5kcy5hZGQobmFtZSkgKTtcclxuICAgIHRoaXMuc2F2ZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKGhhbmRsZSl7XHJcbiAgICBoYW5kbGUuZm9yRWFjaCggKG5hbWUpID0+IHRoaXMuZnJpZW5kcy5kZWxldGUobmFtZSkgKTtcclxuICAgIHRoaXMuc2F2ZSgpO1xyXG4gIH1cclxuXHJcblxyXG4gIGlzRnJpZW5kKGhhbmRsZSl7XHJcbiAgICByZXR1cm4gdGhpcy5mcmllbmRzLmhhcyggaGFuZGxlICk7XHJcbiAgfVxyXG5cclxuICBnZXRMaXN0KCl7XHJcbiAgICByZXR1cm4gWy4uLnRoaXMuZnJpZW5kc107XHJcbiAgfVxyXG59IiwiLy9pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG4vL2ltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgQXRDb2RlckN1dG9tU3RhbmRpbmdzIGZyb20gJy4vYXBwLmpzJ1xyXG5pbXBvcnQgaW5qZWN0Q3VzdG9tQ1NTIGZyb20gJy4vY3NzLmpzJ1xyXG5cclxuJCgnZGl2LnRhYmxlLXJlc3BvbnNpdmUnKS5oaWRlKCk7XHJcbiQoJyNwYWdpbmF0aW9uLXN0YW5kaW5ncycpLmhpZGUoKTtcclxuJCgnI3N0YW5kaW5ncy1jc3YtbGluaycpLmFmdGVyKCc8ZGl2IGlkPVwiY29udGVudFwiPjwvZGl2PicpO1xyXG4vLyQoJ2hlYWQnKS5hcHBlbmQoJzxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zXCIgcmVsPVwic3R5bGVzaGVldFwiPicpO1xyXG5pbmplY3RDdXN0b21DU1MoKTtcclxuXHJcbnRyeXtcclxuICBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8QXRDb2RlckN1dG9tU3RhbmRpbmdzIC8+LFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxyXG4gICk7XHJcbn1jYXRjaChlKXtcclxuICBjb25zb2xlLmxvZyggXCJzb21lIGVycm9yIG9jY3VycmVkXCIgKTtcclxuICBjb25zb2xlLmxvZyggZSApO1xyXG4gICQoJ2Rpdi50YWJsZS1yZXNwb25zaXZlJykuc2hvdygpO1xyXG4gICQoJyNwYWdpbmF0aW9uLXN0YW5kaW5ncycpLnNob3coKTtcclxufVxyXG4iLCJjbGFzcyBNb2RhbFdpbmRvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IGhlYWQgPSAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwiZ3JpZFwiLCBncmlkVGVtcGxhdGVSb3dzOlwiMWZyXCIsIGdyaWRUZW1wbGF0ZUNvbHVtbnM6XCIxZnIgYXV0b1wifX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIxLzJcIiwgZ3JpZENvbHVtbjpcIjEvMlwifX0+PGgzPnt0aGlzLnByb3BzLnRpdGxlfTwvaDM+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIxLzJcIiwgZ3JpZENvbHVtbjpcIjIvM1wifX0gb25DbGljaz17dGhpcy5wcm9wcy5jbG9zZUZ1bmN9PjxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+Y2xlYXI8L2k+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIHtoZWFkfVxyXG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtzaG93OiBmYWxzZX07XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGxldCBidXR0b24gPSAoXHJcbiAgICAgIDxkaXYgb25DbGljaz17ICgpID0+IHt0aGlzLnNldFN0YXRlKCB7c2hvdzogdHJ1ZX0gKTsgfSB9XHJcbiAgICAgICAgICAgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGNvbnRyb2xsZXItYnV0dG9uXCI+XHJcbiAgICAgICAge3RoaXMucHJvcHMuYnV0dG9ufVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcblxyXG4gICAgaWYoIHRoaXMuc3RhdGUuc2hvdyA9PT0gdHJ1ZSApe1xyXG4gICAgICByZXR1cm4oXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIHtidXR0b259XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBtb2RhbC1maWx0ZXJcIiBvbkNsaWNrPXsgKCk9PnsgdGhpcy5zZXRTdGF0ZSh7IHNob3c6IGZhbHNlfSkgfSB9PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBtb2RhbC1jb250ZW50XCIgb25DbGljaz17IChlKSA9PiB7ZS5zdG9wUHJvcGFnYXRpb24oKTsgcmV0dXJuIGZhbHNlO30gfT5cclxuICAgICAgICAgICAgICA8TW9kYWxXaW5kb3cgY2xvc2VGdW5jPXsgKCk9PnsgdGhpcy5zZXRTdGF0ZSh7IHNob3c6IGZhbHNlfSkgfSB9IHRpdGxlPXt0aGlzLnByb3BzLnRpdGxlfT5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgIDwvTW9kYWxXaW5kb3c+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICB7YnV0dG9ufVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJjbGFzcyBQYWdlQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcyApe1xyXG4gICAgaWYoIHRoaXMucHJvcHMuY3VycmVudCAhPT0gbmV4dFByb3BzLmN1cnJlbnQgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKCB0aGlzLnByb3BzLm1lICE9PSBuZXh0UHJvcHMubWUgKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgY29uc3QgcCA9IHRoaXMucHJvcHMucGFnZTtcclxuXHJcbiAgICBpZiggdGhpcy5wcm9wcy5jdXJyZW50ID09PSBwICl7XHJcbiAgICAgIHJldHVybiAoPGxpIGNsYXNzTmFtZT17YGxpLXBhZ2luYXRpb24gYWN0aXZlICR7dGhpcy5wcm9wcy5tZSA9PT0gdHJ1ZSA/IFwiYWN0aXZlLW1lXCI6XCJcIn1gfT48YT57cCArIDF9PC9hPjwvbGk+KTtcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gKDxsaSBjbGFzc05hbWU9e2BsaS1wYWdpbmF0aW9uICR7dGhpcy5wcm9wcy5tZSA9PT0gdHJ1ZSA/IFwibWVcIjpcIlwifWB9ID48YSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2tGdW5jfSBkYXRhLXBhZ2U9e3B9IGhyZWY9XCIjXCI+e3AgKyAxfTwvYT48L2xpPik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgLyoqXHJcbiAgKiBAcGFyYW0ge251bWJlcn0gY3VycmVudCBjdXJyZW50IHBhZ2UgKDAtaW5kZXhlZClcclxuICAqIEBwYXJhbSB7bnVtYmVyfSB0b3RhbCAgIHRvdGFsIHBhZ2VcclxuICAqIEBwYXJhbSB7bnVtYmVyfSBtZSAgICAgIHBhZ2Ugd2hlcmUgaSBhbVxyXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gb25DbGlja0Z1bmMgXHJcbiAgKi9cclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcyApe1xyXG4gICAgaWYoIHRoaXMucHJvcHMuY3VycmVudCAhPT0gbmV4dFByb3BzLmN1cnJlbnQgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKCB0aGlzLnByb3BzLnRvdGFsICE9PSBuZXh0UHJvcHMudG90YWwgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKCB0aGlzLnByb3BzLm1lICE9PSBuZXh0UHJvcHMubWUgKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IHNob3dpbmdQYWdlcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgZm9yKGxldCBwYWdlPTA7IHBhZ2U8dGhpcy5wcm9wcy50b3RhbDsgcGFnZSsrKXtcclxuICAgICAgaWYocGFnZSA9PT0gMCB8fCBwYWdlID09PSB0aGlzLnByb3BzLnRvdGFsLTEgfHwgcGFnZT09PXRoaXMucHJvcHMubWUgfHwgTWF0aC5hYnModGhpcy5wcm9wcy5jdXJyZW50IC0gcGFnZSkgPD0gNSApe1xyXG4gICAgICAgIHNob3dpbmdQYWdlcy5wdXNoKHBhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgbGV0IGJsYW5rQ291bnQgPSAwO1xyXG4gICAgZm9yKGxldCBpPTA7IGk8c2hvd2luZ1BhZ2VzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgaWYoaSA+IDAgJiYgc2hvd2luZ1BhZ2VzW2ldIC0gc2hvd2luZ1BhZ2VzW2ktMV0gPiAxKXtcclxuICAgICAgICBpZiggc2hvd2luZ1BhZ2VzW2ldIC0gc2hvd2luZ1BhZ2VzW2ktMV0gPT09IDIgKXtcclxuICAgICAgICAgIHJlcy5wdXNoKCA8UGFnZUJ1dHRvbiBjdXJyZW50PXt0aGlzLnByb3BzLmN1cnJlbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZT17c2hvd2luZ1BhZ2VzW2ldLTF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtzaG93aW5nUGFnZXNbaV0tMX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrRnVuYz17dGhpcy5wcm9wcy5vbkNsaWNrRnVuY31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZT17c2hvd2luZ1BhZ2VzW2ldLTE9PT10aGlzLnByb3BzLm1lfSAvPiApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgcmVzLnB1c2goIDxsaSBjbGFzc05hbWU9XCJsaS1wYWdpbmF0aW9uIGRpc2FibGVkXCIga2V5PXtgcGFnZS1ibGFuay0ke2JsYW5rQ291bnQrK31gfT48YT57XCIuLi5cIn08L2E+PC9saT4gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmVzLnB1c2goIDxQYWdlQnV0dG9uIGN1cnJlbnQ9e3RoaXMucHJvcHMuY3VycmVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U9e3Nob3dpbmdQYWdlc1tpXX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17c2hvd2luZ1BhZ2VzW2ldfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGlja0Z1bmM9e3RoaXMucHJvcHMub25DbGlja0Z1bmN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZT17c2hvd2luZ1BhZ2VzW2ldPT09dGhpcy5wcm9wcy5tZX0gLz4gKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwicGFnaW5hdGlvbiBwYWdpbmF0aW9uLWNlbnRlcmVkXCI+PHVsPntyZXN9PC91bD48L2Rpdj4pO1xyXG4gIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbG9hZGluZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgYXV0b1VwZGF0ZTpmYWxzZSB9O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICByZXR1cm4gKDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwiZ3JpZFwiLCBncmlkVGVtcGxhdGVSb3dzOlwiMWZyXCIsIGdyaWRUZW1wbGF0ZUNvbHVtbnM6XCJhdXRvIGF1dG9cIn19PlxyXG4gICAgICA8ZGl2IHN0eWxlPXt7Z3JpZENvbHVtbjpcIjEvMlwifX0gY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGNvbnRyb2xsZXItYnV0dG9uXCJcclxuICAgICAgICAgICBvbkNsaWNrPXsgKGUpPT50aGlzLnByb3BzLnVwZGF0ZUZ1bmMoKSB9PlxyXG4gICAgICAgIDxhIGhyZWY9XCIjXCI+XHJcbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnJlZnJlc2g8L2k+VXBkYXRlXHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBzdHlsZT17e2dyaWRDb2x1bW46XCIyLzNcIn19IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBjb250cm9sbGVyLWJ1dHRvblwiXHJcbiAgICAgICAgICAgb25DbGljaz17IChlKT0+e1xyXG4gICAgICAgICAgICBpZighdGhpcy5zdGF0ZS5hdXRvVXBkYXRlKXtcclxuICAgICAgICAgICAgICB0aGlzLnRpbWVyUmVsb2FkaW5nID0gc2V0SW50ZXJ2YWwoIHRoaXMucHJvcHMudXBkYXRlRnVuYywgNjAqMTAwMCApO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcImNyZWF0ZSB0aW1lciBcIiwgdGhpcy50aW1lclJlbG9hZGluZyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoIHRoaXMudGltZXJSZWxvYWRpbmcgKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcImVyYXNlIHRpbWVyIFwiLCB0aGlzLnRpbWVyUmVsb2FkaW5nKTtcclxuICAgICAgICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgge2F1dG9VcGRhdGU6IXRoaXMuc3RhdGUuYXV0b1VwZGF0ZX0pXHJcbiAgICAgICAgICB9IH0+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzICR7dGhpcy5zdGF0ZS5hdXRvVXBkYXRlID8gXCJyZWxvYWRpbmctZW5hYmxlZFwiIDogXCJyZWxvYWRpbmctZGlzYWJsZWRcIn1gfT5cclxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+dXBkYXRlPC9pPkF1dG8gKDFtaW4pXHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2Pik7XHJcbiAgfVxyXG59IiwiaW1wb3J0IE1vZGFsIGZyb20gJy4vbW9kYWwuanMnXHJcbmltcG9ydCBBcHBTZXR0aW5ncyBmcm9tICcuL2FwcFNldHRpbmdzLmpzJ1xyXG5jbGFzcyBTZXR0aW5nc0NvbnRlbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZ2VuZXJhdGVGb3JtLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmdlbmVyYXRlRnJpZW5kc0xpc3RGb3JtLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoIG9wdGlvbiApe1xyXG4gICAgbGV0IG5ld1NldHRpbmdzID0gT2JqZWN0LmFzc2lnbihuZXcgQXBwU2V0dGluZ3MoKSwgdGhpcy5wcm9wcy5zZXR0aW5ncyk7XHJcbiAgICBmb3IobGV0IHBhcmFtIGluIG9wdGlvbil7XHJcbiAgICAgIG5ld1NldHRpbmdzW3BhcmFtXSA9IG9wdGlvbltwYXJhbV07XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyggb3B0aW9uICk7XHJcbiAgICB0aGlzLnByb3BzLnNldHRpbmdzVXBkYXRlRnVuYyggbmV3U2V0dGluZ3MgKTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlRm9ybSggb3B0aW9uTmFtZSwgbGFiZWwgKXtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHNldHRpbmdzLWl0ZW1cIj5cclxuICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXQgY2hlY2tlZD17dGhpcy5wcm9wcy5zZXR0aW5nc1tvcHRpb25OYW1lXX0gdHlwZT1cImNoZWNrYm94XCIgc3R5bGU9e3tkaXNwbGF5OlwiaW5saW5lXCJ9fVxyXG4gICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSk9PnsgdGhpcy51cGRhdGUoIHsgW29wdGlvbk5hbWVdIDogZS50YXJnZXQuY2hlY2tlZCB9ICkgfX0gLz5cclxuICAgICAgICAgIDxzcGFuPiB7bGFiZWx9PC9zcGFuPlxyXG4gICAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlRnJpZW5kc0xpc3RGb3JtKCl7XHJcbiAgICBjb25zdCBmcmllbmRzID0gdGhpcy5wcm9wcy5mcmllbmRzLmdldExpc3QoKS5tYXAoIChuYW1lKSA9PiB7XHJcbiAgICAgIHJldHVybiAoPG9wdGlvbiB2YWx1ZT17bmFtZX0ga2V5PXtuYW1lfT57bmFtZX08L29wdGlvbj4pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHNldHRpbmdzLWl0ZW1cIj5cclxuICAgICAgICA8cD5GcmllbmRzIExpc3Q8L3A+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3Mgc2V0dGluZ3MtaXRlbVwiPlxyXG4gICAgICAgICAgPGlucHV0IHJlZj1cImFkZEZyaWVuZEZvcm1cIiB0eXBlPVwidGV4dFwiIHN0eWxlPXt7ZGlzcGxheTpcImJsb2NrXCJ9fVxyXG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17KGUpPT57XHJcbiAgICAgICAgICAgICAgICAgIGlmKCBlLmtleSAhPT0gJ0VudGVyJyApIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMucmVmcy5hZGRGcmllbmRGb3JtO1xyXG4gICAgICAgICAgICAgICAgICBpZiggZWxlbWVudC52YWx1ZSAhPT0gXCJcIiApIHRoaXMucHJvcHMuZnJpZW5kc1VwZGF0ZUZ1bmMoIGVsZW1lbnQudmFsdWUuc3BsaXQoXCIgXCIpLCB0cnVlICk7XHJcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgfX0vPlxyXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgc3R5bGU9e3tkaXNwbGF5OlwiYmxvY2tcIn19IG9uQ2xpY2s9eyAoKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5yZWZzLmFkZEZyaWVuZEZvcm07XHJcbiAgICAgICAgICAgIGlmKCBlbGVtZW50LnZhbHVlICE9PSBcIlwiICkgdGhpcy5wcm9wcy5mcmllbmRzVXBkYXRlRnVuYyggW2VsZW1lbnQudmFsdWVdLCB0cnVlICk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XHJcbiAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgQWRkIEZyaWVuZFxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3Mgc2V0dGluZ3MtaXRlbVwiPlxyXG4gICAgICAgICAgPHNlbGVjdCByZWY9XCJmcmllbmRzTGlzdEZvcm1cIiBtdWx0aXBsZSBzaXplPVwiMTBcIiBzdHlsZT17e2Rpc3BsYXk6XCJibG9ja1wifX0+XHJcbiAgICAgICAgICAgIHtmcmllbmRzfVxyXG4gICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBzdHlsZT17e2Rpc3BsYXk6XCJibG9ja1wifX0gb25DbGljaz17ICgpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLnJlZnMuZnJpZW5kc0xpc3RGb3JtO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmZyaWVuZHNVcGRhdGVGdW5jKCBbLi4uZm9ybS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0aW9uJyldXHJcbiAgICAgICAgICAgICAgLmZpbHRlciggKGUpPT5lLnNlbGVjdGVkICkubWFwKChlKT0+ZS52YWx1ZSksIGZhbHNlICk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcclxuICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICBSZW1vdmUgRnJpZW5kc1xyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgY29uc3QgcGFnZVNpemUgPSAoKCk9PntcclxuICAgICAgY29uc3QgbGlzdCA9IFsxMCwyMCw1MCwxMDAsMjAwLDMwMCw0MDAsNTAwLDEwMDAsNTAwMCwxMDAwMF0ubWFwKCAodmFsKT0+e1xyXG4gICAgICAgIHJldHVybiA8b3B0aW9uIHZhbHVlPXt2YWx9IGtleT17dmFsfT57dmFsfTwvb3B0aW9uPlxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBzZXR0aW5ncy1pdGVtXCI+XHJcbiAgICAgICAgICA8c3Bhbj5QYWdlIFNpemUgPC9zcGFuPlxyXG4gICAgICAgICAgPHNlbGVjdCBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuc2V0dGluZ3MucGFnZVNpemV9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSk9PnsgdGhpcy51cGRhdGUoIHsgXCJwYWdlU2l6ZVwiIDogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKX0gKSB9fT5cclxuICAgICAgICAgICAge2xpc3R9XHJcbiAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgY29uc3QgZGlzcGxheU5hbWVTdHlsZSA9IChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3Mgc2V0dGluZ3MtaXRlbVwiPlxyXG4gICAgICAgIDxzcGFuPkRpc3BsYXkgTmFtZSBTdHlsZSA8L3NwYW4+XHJcbiAgICAgICAgPHNlbGVjdCBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuc2V0dGluZ3MuZGlzcGxheU5hbWVTdHlsZX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSk9PnsgdGhpcy51cGRhdGUoIHsgXCJkaXNwbGF5TmFtZVN0eWxlXCIgOiBlLnRhcmdldC52YWx1ZX0gKSB9fT5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ1c2VyX3NjcmVlbl9uYW1lXCI+VXNlciBJRDwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInVzZXJfbmFtZVwiPlVzZXIgTmFtZTwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInVzZXJfc2NyZWVuX25hbWVfdXNlcl9uYW1lXCI+VXNlciBJRCAvIFVzZXIgTmFtZTwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInVzZXJfbmFtZV91c2VyX3NjcmVlbl9uYW1lXCI+VXNlciBOYW1lIC8gVXNlciBJRDwvb3B0aW9uPlxyXG4gICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcblxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3twYWRkaW5nOlwiNXB4XCJ9fT5cclxuICAgICAgICB7cGFnZVNpemV9XHJcbiAgICAgICAge2Rpc3BsYXlOYW1lU3R5bGV9XHJcbiAgICAgICAge3RoaXMuZ2VuZXJhdGVGb3JtKCBcImRpc2FibGVSYXRpbmdDb2xvclwiLCBcIkRpc2FibGUgUmF0aW5nIENvbG9yXCIpfVxyXG4gICAgICAgIHt0aGlzLmdlbmVyYXRlRm9ybSggXCJoaWdobGlnaHRGcmllbmRzXCIsIFwiSGlnaGxpZ2h0IEZyaWVuZHNcIil9XHJcbiAgICAgICAge3RoaXMuZ2VuZXJhdGVGb3JtKCBcInNob3dOYXRpb25hbEZsYWdcIiwgXCJTaG93IE5hdGlvbmFsIEZsYWdcIil9XHJcbiAgICAgICAgPGhyLz5cclxuICAgICAgICB7dGhpcy5nZW5lcmF0ZUZyaWVuZHNMaXN0Rm9ybSgpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5ncyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMgKXtcclxuICAgIGlmKCBKU09OLnN0cmluZ2lmeSggT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcy5zZXR0aW5ncykgKSAhPT0gSlNPTi5zdHJpbmdpZnkoIE9iamVjdC5hc3NpZ24oe30sIG5leHRQcm9wcy5zZXR0aW5ncykgKSkgcmV0dXJuIHRydWU7XHJcbiAgICAvLyBpZiggSlNPTi5zdHJpbmdpZnkoIHRoaXMucHJvcHMuZnJpZW5kcy5nZXRMaXN0KCkgKSAhPT0gSlNPTi5zdHJpbmdpZnkoIG5leHRQcm9wcy5mcmllbmRzLmdldExpc3QoKSApICkgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IGJ1dHRvbiA9IChcclxuICAgICAgPGEgaHJlZj1cIiNcIj5cclxuICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29ucyBtZC1kYXJrXCI+c2V0dGluZ3M8L2k+XHJcbiAgICAgICAgU2V0dGluZ3NcclxuICAgICAgPC9hPlxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4oXHJcbiAgICAgIDxNb2RhbCBidXR0b249e2J1dHRvbn0gdGl0bGU9XCJTZXR0aW5nc1wiPlxyXG4gICAgICAgIDxTZXR0aW5nc0NvbnRlbnRcclxuICAgICAgICAgIHNldHRpbmdzPXt0aGlzLnByb3BzLnNldHRpbmdzfVxyXG4gICAgICAgICAgc2V0dGluZ3NVcGRhdGVGdW5jPXt0aGlzLnByb3BzLnNldHRpbmdzVXBkYXRlRnVuY31cclxuICAgICAgICAgIGZyaWVuZHM9e3RoaXMucHJvcHMuZnJpZW5kc31cclxuICAgICAgICAgIGZyaWVuZHNVcGRhdGVGdW5jPXt0aGlzLnByb3BzLmZyaWVuZHNVcGRhdGVGdW5jfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvTW9kYWw+XHJcbiAgICApO1xyXG4gIH1cclxufSIsImltcG9ydCBBcHBTZXR0aW5ncyBmcm9tICcuL2FwcFNldHRpbmdzLmpzJztcclxuXHJcbmNsYXNzIFNvcnRpbmdDb250ZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMudXBkYXRlLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoIG9wdGlvbiApe1xyXG4gICAgbGV0IG5ld1NldHRpbmdzID0gT2JqZWN0LmFzc2lnbihuZXcgQXBwU2V0dGluZ3MoKSwgdGhpcy5wcm9wcy5zZXR0aW5ncyk7XHJcbiAgICBmb3IobGV0IHBhcmFtIGluIG9wdGlvbil7XHJcbiAgICAgIG5ld1NldHRpbmdzW3BhcmFtXSA9IG9wdGlvbltwYXJhbV07XHJcbiAgICB9XHJcbiAgICB0aGlzLnByb3BzLnNldHRpbmdzVXBkYXRlRnVuYyggbmV3U2V0dGluZ3MgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IG9uT2ZmID0gPGRpdj5cclxuICAgICAgPGEgY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzICR7dGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nRW5hYmxlZCA/IFwic29ydGluZy1lbmFibGVkXCIgOiBcInNvcnRpbmctZGlzYWJsZWRcIn1gfVxyXG4gICAgICAgICBocmVmPVwiI1wiIG9uQ2xpY2s9eyhlKT0+dGhpcy51cGRhdGUoe3NvcnRpbmdFbmFibGVkOiF0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdFbmFibGVkfSl9ID5cclxuICAgICAgICAge3RoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0VuYWJsZWQgPyBcIk9OXCIgOiBcIk9GRlwifTwvYT5cclxuICAgIDwvZGl2PjtcclxuXHJcbiAgICBsZXQga2V5cyA9IFtdO1xyXG4gICAga2V5cy5wdXNoKCA8YSBjbGFzc05hbWU9e2BhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgJHt0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdLZXkgPT09IFwicmFua1wiID8gXCJzb3J0aW5nLWVuYWJsZWRcIiA6IFwic29ydGluZy1kaXNhYmxlZFwifWB9XHJcbiAgICAgICAgICAgICAgICAgIGhyZWY9XCIjXCIgc3R5bGU9e3twYWRkaW5nOiBcIjVweFwifX0gb25DbGljaz17KGUpID0+IHRoaXMudXBkYXRlKCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ0tleSA6IFwicmFua1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdFbmFibGVkOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ09yZGVyOiB0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdLZXkgIT09IFwicmFua1wiID8gXCJhc2NlbmRpbmdcIiA6IHRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ09yZGVyID09PSBcImFzY2VuZGluZ1wiID8gXCJkZXNjZW5kaW5nXCIgOiBcImFzY2VuZGluZ1wiICxcclxuICAgICAgICAgICAgICAgICAgfSApfSBrZXk9XCJyYW5rXCI+UmFuazwvYT4gKTtcclxuXHJcbiAgICBrZXlzLnB1c2goIDxhIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyAke3RoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0tleSA9PT0gXCJ0aW1lXCIgPyBcInNvcnRpbmctZW5hYmxlZFwiIDogXCJzb3J0aW5nLWRpc2FibGVkXCJ9YH1cclxuICAgICAgICAgICAgICAgICAgaHJlZj1cIiNcIiBzdHlsZT17e3BhZGRpbmc6IFwiNXB4XCJ9fSBvbkNsaWNrPXsoZSkgPT4gdGhpcy51cGRhdGUoIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nS2V5IDogXCJ0aW1lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ0VuYWJsZWQ6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nT3JkZXI6IHRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0tleSAhPT0gXCJ0aW1lXCIgPyBcImFzY2VuZGluZ1wiIDogdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nT3JkZXIgPT09IFwiYXNjZW5kaW5nXCIgPyBcImRlc2NlbmRpbmdcIiA6IFwiYXNjZW5kaW5nXCIgLFxyXG4gICAgICAgICAgICAgICAgICB9ICl9IGtleT1cInRpbWVcIj5UaW1lKHdpdGhvdXQgcGVuYWx0eSk8L2E+ICk7XHJcblxyXG4gICAga2V5cy5wdXNoKCA8YSBjbGFzc05hbWU9e2BhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgJHt0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdLZXkgPT09IFwidXNlcl9zY3JlZW5fbmFtZVwiID8gXCJzb3J0aW5nLWVuYWJsZWRcIiA6IFwic29ydGluZy1kaXNhYmxlZFwifWB9XHJcbiAgICAgICAgICAgICAgICAgIGhyZWY9XCIjXCIgc3R5bGU9e3twYWRkaW5nOiBcIjVweFwifX0gb25DbGljaz17KGUpID0+IHRoaXMudXBkYXRlKCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ0tleSA6IFwidXNlcl9zY3JlZW5fbmFtZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdFbmFibGVkOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ09yZGVyOiB0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdLZXkgIT09IFwidXNlcl9zY3JlZW5fbmFtZVwiID8gXCJhc2NlbmRpbmdcIiA6IHRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ09yZGVyID09PSBcImFzY2VuZGluZ1wiID8gXCJkZXNjZW5kaW5nXCIgOiBcImFzY2VuZGluZ1wiICxcclxuICAgICAgICAgICAgICAgICAgfSApfSBrZXk9XCJ1c2VyX3NjcmVlbl9uYW1lXCI+TmFtZTwvYT4gKTtcclxuXHJcbiAgICBrZXlzLnB1c2goIDxhIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyAke3RoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0tleSA9PT0gXCJyYXRpbmdcIiA/IFwic29ydGluZy1lbmFibGVkXCIgOiBcInNvcnRpbmctZGlzYWJsZWRcIn1gfVxyXG4gICAgICAgICAgICAgICAgICBocmVmPVwiI1wiIHN0eWxlPXt7cGFkZGluZzogXCI1cHhcIn19IG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnVwZGF0ZSgge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdLZXkgOiBcInJhdGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdFbmFibGVkOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ09yZGVyOiB0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdLZXkgIT09IFwicmF0aW5nXCIgPyBcImRlc2NlbmRpbmdcIiA6IHRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ09yZGVyID09PSBcImFzY2VuZGluZ1wiID8gXCJkZXNjZW5kaW5nXCIgOiBcImFzY2VuZGluZ1wiICxcclxuICAgICAgICAgICAgICAgICAgfSApfSBrZXk9XCJyYXRpbmdcIj5SYXRpbmc8L2E+ICk7XHJcbiAgICBrZXlzLnB1c2goIDxhIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyAke3RoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0tleSA9PT0gXCJjb3VudHJ5XCIgPyBcInNvcnRpbmctZW5hYmxlZFwiIDogXCJzb3J0aW5nLWRpc2FibGVkXCJ9YH1cclxuICAgICAgICAgICAgICAgICAgaHJlZj1cIiNcIiBzdHlsZT17e3BhZGRpbmc6IFwiNXB4XCJ9fSBvbkNsaWNrPXsoZSkgPT4gdGhpcy51cGRhdGUoIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nS2V5IDogXCJjb3VudHJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ0VuYWJsZWQ6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nT3JkZXI6IHRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0tleSAhPT0gXCJjb3VudHJ5XCIgPyBcImFzY2VuZGluZ1wiIDogdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nT3JkZXIgPT09IFwiYXNjZW5kaW5nXCIgPyBcImRlc2NlbmRpbmdcIiA6IFwiYXNjZW5kaW5nXCIgLFxyXG4gICAgICAgICAgICAgICAgICB9ICl9IGtleT1cImNvdW50cnlcIj5Db3VudHJ5PC9hPiApO1xyXG4gICAgXHJcbiAgICBsZXQga2V5c1Rhc2tzID0gW107XHJcbiAgICBmb3IobGV0IGk9MDsgaTx0aGlzLnByb3BzLmNvbnRlc3QubnVtVGFza3M7IGkrKyl7XHJcbiAgICAgIGtleXNUYXNrcy5wdXNoKCA8YSBjbGFzc05hbWU9e2BhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgJHt0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdLZXkgPT09IGB0YXNrJHtpfWAgPyBcInNvcnRpbmctZW5hYmxlZFwiIDogXCJzb3J0aW5nLWRpc2FibGVkXCJ9YH1cclxuICAgICAgICAgICAgICAgICAgICBocmVmPVwiI1wiIHN0eWxlPXt7cGFkZGluZzogXCI1cHhcIn19IG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnVwZGF0ZSgge1xyXG4gICAgICAgICAgICAgICAgICAgICAgc29ydGluZ0tleSA6IGB0YXNrJHtpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBzb3J0aW5nRW5hYmxlZDp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc29ydGluZ09yZGVyOiB0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdLZXkgIT09IGB0YXNrJHtpfWAgPyBcImRlc2NlbmRpbmdcIiA6IHRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ09yZGVyID09PSBcImFzY2VuZGluZ1wiID8gXCJkZXNjZW5kaW5nXCIgOiBcImFzY2VuZGluZ1wiICxcclxuICAgICAgICAgICAgICAgICAgICB9ICl9IGtleT17YHRhc2ske2l9YH0+VGFzay17XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiW2ldfTwvYT4gKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgb3JkZXI7XHJcbiAgICBpZiggdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nT3JkZXIgPT09IFwiYXNjZW5kaW5nXCIpe1xyXG4gICAgICBvcmRlciA9IDxhIGhyZWY9XCIjXCIgb25DbGljaz17KGUpPT50aGlzLnVwZGF0ZSgge3NvcnRpbmdPcmRlcjogXCJkZXNjZW5kaW5nXCIsIHNvcnRpbmdFbmFibGVkOnRydWV9ICl9PlxyXG4gICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9e3t0cmFuc2Zvcm06XCJzY2FsZSgxLC0xKVwifX0+c29ydDwvaT4gQXNjZW5kaW5nXHJcbiAgICAgIDwvYT47XHJcbiAgICB9ZWxzZXtcclxuICAgICAgb3JkZXIgPSA8YSBocmVmPVwiI1wiIG9uQ2xpY2s9eyhlKT0+dGhpcy51cGRhdGUoIHtzb3J0aW5nT3JkZXI6IFwiYXNjZW5kaW5nXCIsIHNvcnRpbmdFbmFibGVkOnRydWV9ICl9PlxyXG4gICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+c29ydDwvaT4gRGVzY2VuZGluZ1xyXG4gICAgICA8L2E+O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICggXHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246XCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6XCIyMHB4XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzpcIjRweCA0cHggOHB4IDRweCBncmV5XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czpcIjZweCA2cHggNnB4IDZweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogYCR7dGhpcy5wcm9wcy5wb3NZICsgNDB9cHhgLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6YCR7dGhpcy5wcm9wcy5wb3NYfXB4YH19XHJcbiAgICAgICAgICAgb25DbGljaz17KGUpPT5lLnN0b3BQcm9wYWdhdGlvbigpfSA+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJncmlkXCIsIGdyaWRUZW1wbGF0ZVJvd3M6XCJhdXRvIGF1dG8gYXV0b1wiLCBncmlkVGVtcGxhdGVDb2x1bW5zOlwiYXV0byAxZnJcIn19PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIxLzJcIiwgZ3JpZENvbHVtbjpcIjEvMlwiLCBwYWRkaW5nOlwiMnB4XCJ9fT57b25PZmZ9PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7Z3JpZFJvdzpcIjIvM1wiLCBncmlkQ29sdW1uOlwiMS8yXCIsIHBhZGRpbmc6XCIycHhcIn19PktleSA6PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7Z3JpZFJvdzpcIjIvM1wiLCBncmlkQ29sdW1uOlwiMi8zXCIsIHBhZGRpbmc6XCIycHhcIn19PntrZXlzfTxici8+e2tleXNUYXNrc308L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tncmlkUm93OlwiMy80XCIsIGdyaWRDb2x1bW46XCIxLzJcIiwgcGFkZGluZzpcIjJweFwifX0+T3JkZXIgOjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIzLzRcIiwgZ3JpZENvbHVtbjpcIjIvM1wiLCBwYWRkaW5nOlwiMnB4XCJ9fT57b3JkZXJ9PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvcnRpbmcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc2hvdyA6IGZhbHNlLFxyXG4gICAgICBwb3NYIDogMCxcclxuICAgICAgcG9zWSA6IDBcclxuICAgIH07XHJcblxyXG4gIH1cclxuICByZW5kZXIoKXtcclxuICAgIGxldCBidXR0b24gPSAoXHJcbiAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzICR7dGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nRW5hYmxlZCA/IFwic29ydGluZy1lbmFibGVkXCIgOiBcInNvcnRpbmctZGlzYWJsZWRcIn1gfT5cclxuICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnNvcnQ8L2k+XHJcbiAgICAgICAgU29ydFxyXG4gICAgICA8L2E+XHJcbiAgICApO1xyXG5cclxuICAgIGlmKCB0aGlzLnN0YXRlLnNob3cgPT09IGZhbHNlICl7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgY29udHJvbGxlci1idXR0b25cIj5cclxuICAgICAgICAgIDxkaXYgb25DbGljaz17IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZWN0ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHtzaG93IDogIXRoaXMuc3RhdGUuc2hvdywgcG9zWDpyZWN0LmxlZnQsIHBvc1k6cmVjdC50b3AgfSkgO1xyXG4gICAgICAgICAgfSB9PlxyXG4gICAgICAgICAgICB7YnV0dG9ufVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBjb250cm9sbGVyLWJ1dHRvblwiPlxyXG4gICAgICAgICAgPGRpdiBvbkNsaWNrPXsoZSk9PnRoaXMuc2V0U3RhdGUoe3Nob3c6IXRoaXMuc3RhdGUuc2hvd30pfSA+e2J1dHRvbn08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjpcImZpeGVkXCIsIGxlZnQ6MCwgdG9wOjAsIHdpZHRoOlwiMTAwJVwiLCBoZWlnaHQ6XCIxMDAlXCJ9fVxyXG4gICAgICAgICAgICAgICBvbkNsaWNrPXsoZSk9PnRoaXMuc2V0U3RhdGUoe3Nob3c6ZmFsc2V9KX0+XHJcbiAgICAgICAgICAgIDxTb3J0aW5nQ29udGVudCBzZXR0aW5ncz17dGhpcy5wcm9wcy5zZXR0aW5nc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3Q9e3RoaXMucHJvcHMuY29udGVzdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzVXBkYXRlRnVuYz17dGhpcy5wcm9wcy5zZXR0aW5nc1VwZGF0ZUZ1bmN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NYPXt0aGlzLnN0YXRlLnBvc1h9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NZPXt0aGlzLnN0YXRlLnBvc1l9Lz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7cmF0aW5nLGNvdW50cmllc30gZnJvbSAnLi91dGlsLmpzJ1xyXG5pbXBvcnQgTWUgZnJvbSAnLi91c2VyaW5mby5qcyc7XHJcblxyXG5jbGFzcyBVc2VyRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHVzZXItZHJvcGRvd24tbWVudS0ke3RoaXMucHJvcHMucm93LnVzZXJfbmFtZX1gKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdXNlci1kcm9wZG93bi1tZW51LSR7dGhpcy5wcm9wcy5yb3cudXNlcl9uYW1lfS1mcmllbmRgKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xyXG4gICAgICB0aGlzLnByb3BzLmZyaWVuZHNVcGRhdGVGdW5jKCBbdGhpcy5wcm9wcy5yb3cudXNlcl9zY3JlZW5fbmFtZV0sICF0aGlzLnByb3BzLmlzRnJpZW5kKTtcclxuICAgIH0pO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHJvcHMuY2xvc2VGdW5jLCB7b25jZTp0cnVlfSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IGxpbmsgPSBgaHR0cHM6Ly9hdGNvZGVyLmpwL3VzZXIvJHt0aGlzLnByb3BzLnJvdy51c2VyX3NjcmVlbl9uYW1lfWA7XHJcbiAgICBjb25zdCBzdWJtaXNzaW9ucyA9IChcclxuICAgICAgPGEgaHJlZj17YC9zdWJtaXNzaW9ucy9hbGw/dXNlcl9zY3JlZW5fbmFtZT0ke3RoaXMucHJvcHMucm93LnVzZXJfc2NyZWVuX25hbWV9YH0gdGFyZ2V0PVwiX2JsYW5rXCI+XHJcbiAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnMgbWQtMThcIj5zZWFyY2g8L2k+XHJcbiAgICAgICAgU3VibWlzc2lvbnNcclxuICAgICAgPC9hPlxyXG4gICAgKTtcclxuICAgIGNvbnN0IHJhdGluZ0NvbG9yID0gcmF0aW5nLmdldENvbG9yT3JpZ2luYWwodGhpcy5wcm9wcy5yb3cucmF0aW5nKTtcclxuXHJcbiAgICBjb25zdCBmcmllbmQgPSAoXHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBjdXJzb3ItbGlua1wiPlxyXG4gICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zIG1kLTE4XCI+e3RoaXMucHJvcHMuaXNGcmllbmQgPyBcInBlcnNvbl9vdXRsaW5lXCIgOiBcInBlcnNvbl9hZGRcIn08L2k+XHJcbiAgICAgICAge3RoaXMucHJvcHMuaXNGcmllbmQgPyBcIlJlbW92ZSBmcm9tIEZyaWVuZHMgTGlzdFwiIDogXCJBZGQgdG8gRnJpZW5kcyBMaXN0XCJ9XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBpZD17YHVzZXItZHJvcGRvd24tbWVudS0ke3RoaXMucHJvcHMucm93LnVzZXJfbmFtZX1gfVxyXG4gICAgICAgICAgIGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyB1c2VyLWRyb3Bkb3duLW1lbnUtYm94XCI+XHJcbiAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgdXNlci1kcm9wZG93bi1tZW51XCI+XHJcbiAgICAgICAgICAgICA8YSBocmVmPXtsaW5rfSBjbGFzc05hbWU9e2B1c2VybmFtZSAke3RoaXMucHJvcHMuY29sb3J9YH0gdGFyZ2V0PVwiX2JsYW5rXCI+XHJcbiAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnJvdy51c2VyX25hbWV9IC8ge3RoaXMucHJvcHMucm93LnVzZXJfc2NyZWVuX25hbWV9XHJcbiAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgdXNlci1kcm9wZG93bi1tZW51XCI+XHJcbiAgICAgICAgICAgICB7c3VibWlzc2lvbnN9XHJcbiAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgdXNlci1kcm9wZG93bi1tZW51XCI+XHJcbiAgICAgICAgICAgICBSYXRpbmcgOiA8c3BhbiBzdHlsZT17e2NvbG9yOnJhdGluZ0NvbG9yLCBmb250V2VpZ2h0OlwiYm9sZFwifX0+e3RoaXMucHJvcHMucm93LnJhdGluZ308L3NwYW4+XHJcbiAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgdXNlci1kcm9wZG93bi1tZW51XCI+XHJcbiAgICAgICAgICAgICBDb3VudHJ5IDogPGltZyBzcmM9e2AvaW1nL2ZsYWcvJHt0aGlzLnByb3BzLnJvdy5jb3VudHJ5fS5wbmdgfSBzdHlsZT17e3ZlcnRpY2FsQWxpZ246IFwibWlkZGxlXCIsIHdpZHRoOiBcIjE2cHhcIiwgaGVpZ2h0OiBcIjE2cHhcIn19IC8+XHJcbiAgICAgICAgICAgICB7Y291bnRyaWVzW3RoaXMucHJvcHMucm93LmNvdW50cnldfVxyXG4gICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgIDxkaXYgaWQ9e2B1c2VyLWRyb3Bkb3duLW1lbnUtJHt0aGlzLnByb3BzLnJvdy51c2VyX25hbWV9LWZyaWVuZGB9XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgdXNlci1kcm9wZG93bi1tZW51XCJcclxuICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLnJvdy51c2VyX3NjcmVlbl9uYW1lID09PSBNZS51c2VyX3NjcmVlbl9uYW1lID8ge2Rpc3BsYXk6XCJub25lXCJ9IDoge319PlxyXG4gICAgICAgICAgICAge2ZyaWVuZH1cclxuICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIE5hbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc2hvdyA6IGZhbHNlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMsIG5leHRTdGF0ZSApe1xyXG4gICAgaWYoIHRoaXMucHJvcHMuc2V0dGluZ3MuZGlzcGxheU5hbWVTdHlsZSAhPT0gbmV4dFByb3BzLnNldHRpbmdzLmRpc3BsYXlOYW1lU3R5bGUgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKCB0aGlzLnByb3BzLnNldHRpbmdzLmRpc2FibGVSYXRpbmdDb2xvciAhPT0gbmV4dFByb3BzLnNldHRpbmdzLmRpc2FibGVSYXRpbmdDb2xvciApIHJldHVybiB0cnVlO1xyXG4gICAgaWYoIHRoaXMucHJvcHMuc2V0dGluZ3Muc2hvd05hdGlvbmFsRmxhZyAhPT0gbmV4dFByb3BzLnNldHRpbmdzLnNob3dOYXRpb25hbEZsYWcgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKCB0aGlzLnN0YXRlLnNob3cgIT09IG5leHRTdGF0ZS5zaG93ICkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiggdGhpcy5wcm9wcy5pc0ZyaWVuZCAhPT0gbmV4dFByb3BzLmlzRnJpZW5kICkgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IHJvdyA9IHRoaXMucHJvcHMucm93O1xyXG4gICAgY29uc3QgY29sb3IgPSB0aGlzLnByb3BzLnNldHRpbmdzLmRpc2FibGVSYXRpbmdDb2xvciA/IFwiXCIgOiByYXRpbmcudXNlckNvbG9yWyByYXRpbmcuZ2V0TGV2ZWwocm93LnJhdGluZykgXTtcclxuXHJcbiAgICBjb25zdCBkaXNwbGF5TmFtZSA9ICgoKT0+e1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHVzZXJfc2NyZWVuX25hbWUgOiByb3cudXNlcl9zY3JlZW5fbmFtZSxcclxuICAgICAgICB1c2VyX25hbWUgOiByb3cudXNlcl9uYW1lLFxyXG4gICAgICAgIHVzZXJfc2NyZWVuX25hbWVfdXNlcl9uYW1lIDogYCR7cm93LnVzZXJfc2NyZWVuX25hbWV9IC8gJHtyb3cudXNlcl9uYW1lfWAsXHJcbiAgICAgICAgdXNlcl9uYW1lX3VzZXJfc2NyZWVuX25hbWUgOiBgJHtyb3cudXNlcl9uYW1lfSAvICR7cm93LnVzZXJfc2NyZWVuX25hbWV9YFxyXG4gICAgICB9W3RoaXMucHJvcHMuc2V0dGluZ3MuZGlzcGxheU5hbWVTdHlsZV07XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGNvbnN0IGNvdW50cnlGbGFnID0gdGhpcy5wcm9wcy5zZXR0aW5ncy5zaG93TmF0aW9uYWxGbGFnID8gKDxpbWcgc3JjPXtgL2ltZy9mbGFnLyR7cm93LmNvdW50cnl9LnBuZ2B9IHN0eWxlPXt7dmVydGljYWxBbGlnbjogXCJtaWRkbGVcIiwgd2lkdGg6IFwiMTZweFwiLCBoZWlnaHQ6IFwiMTZweFwifX0gLz4pIDogXCJcIjtcclxuXHJcbiAgICBjb25zdCBuYW1lT25jbGljayA9IChlKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIHNob3cgOiAhdGhpcy5zdGF0ZS5zaG93XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiggdGhpcy5zdGF0ZS5zaG93ID09PSBmYWxzZSApe1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJzdGFuZGluZ3MtdXNlcm5hbWVcIiBvbkNsaWNrPXtuYW1lT25jbGlja30+XHJcbiAgICAgICAgICB7Y291bnRyeUZsYWd9XHJcbiAgICAgICAgICB7XCIgXCJ9XHJcbiAgICAgICAgICB7cm93LnJhdGluZyA+PSAzMjAwID8gPGltZyBzcmM9e2AvaW1nL2ljb24vY3Jvd24ke3Jvdy5yYXRpbmcgLSByb3cucmF0aW5nJTQwMH0uZ2lmYH0gc3R5bGU9e3t2ZXJ0aWNhbEFsaWduOiBcIm1pZGRsZVwifX0vPiA6IG51bGx9XHJcbiAgICAgICAgICB7cm93LnJhdGluZyA+PSAzMjAwID8gXCIgXCIgOiBudWxsfVxyXG4gICAgICAgICAgPGEgY2xhc3NOYW1lPXtgdXNlcm5hbWUgJHtjb2xvcn1gfT57ZGlzcGxheU5hbWV9PC9hPlxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgICk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwic3RhbmRpbmdzLXVzZXJuYW1lXCIgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3Nob3c6ZmFsc2V9KX0+XHJcbiAgICAgICAgICB7Y291bnRyeUZsYWd9XHJcbiAgICAgICAgICB7XCIgXCJ9XHJcbiAgICAgICAgICB7cm93LnJhdGluZyA+PSAzMjAwID8gPGltZyBzcmM9e2AvaW1nL2ljb24vY3Jvd24ke3Jvdy5yYXRpbmcgLSByb3cucmF0aW5nJTQwMH0uZ2lmYH0gc3R5bGU9e3t2ZXJ0aWNhbEFsaWduOiBcIm1pZGRsZVwifX0vPiA6IG51bGx9XHJcbiAgICAgICAgICB7cm93LnJhdGluZyA+PSAzMjAwID8gXCIgXCIgOiBudWxsfVxyXG4gICAgICAgICAgPGEgY2xhc3NOYW1lPXtgdXNlcm5hbWUgJHtjb2xvcn1gfT57ZGlzcGxheU5hbWV9PC9hPlxyXG4gICAgICAgICAgPFVzZXJEZXRhaWxzIGZyaWVuZHNVcGRhdGVGdW5jPXt0aGlzLnByb3BzLmZyaWVuZHNVcGRhdGVGdW5jfVxyXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbG9yPXtjb2xvcn1cclxuICAgICAgICAgICAgICAgICAgICAgICBpc0ZyaWVuZD17dGhpcy5wcm9wcy5pc0ZyaWVuZH1cclxuICAgICAgICAgICAgICAgICAgICAgICByb3c9e3Jvd31cclxuICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUZ1bmM9eygpPT50aGlzLnNldFN0YXRlKHtzaG93OmZhbHNlfSl9Lz5cclxuICAgICAgICA8L3RkPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgVGFzayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcyApe1xyXG4gICAgaWYoIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMudGFzaykgIT09IEpTT04uc3RyaW5naWZ5KG5leHRQcm9wcy50YXNrKSApIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBjb25zdCB0ID0gdGhpcy5wcm9wcy50YXNrO1xyXG4gICAgaWYoIHQuZXh0cmFzID09PSB0cnVlICYmIHRoaXMucHJvcHMubWUgPT09IGZhbHNlICl7XHJcbiAgICAgIHJldHVybiA8dGQgY2xhc3NOYW1lPVwiY2VudGVyIHN0YW5kaW5ncy1mcm96ZW5cIj48L3RkPlxyXG4gICAgfVxyXG4gICAgaWYoIHQuZWxhcHNlZF90aW1lID09PSB1bmRlZmluZWQgKXtcclxuICAgICAgcmV0dXJuIDx0ZCBjbGFzc05hbWU9XCJjZW50ZXJcIj4tPC90ZD5cclxuICAgIH1cclxuICAgIGlmKCB0LnNjb3JlID09PSAwICl7XHJcbiAgICAgIHJldHVybiA8dGQgY2xhc3NOYW1lPVwiY2VudGVyIHN0YW5kaW5ncy13YVwiPih7dC5mYWlsdXJlfSk8L3RkPlxyXG4gICAgfVxyXG4gICAgbGV0IHBlbmFsdHkgPSBcIlwiO1xyXG4gICAgaWYodC5mYWlsdXJlICE9PSAwKXtcclxuICAgICAgcGVuYWx0eSA9IDxzcGFuIGNsYXNzTmFtZT1cInN0YW5kaW5ncy13YVwiPih7dC5mYWlsdXJlfSk8L3NwYW4+O1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzdWJtaXNzaW9uID0gdGhpcy5wcm9wcy5jb250ZXN0RW5kZWQgPyAgPGEgaHJlZj17dGhpcy5wcm9wcy5zdWJtaXNzaW9uTGlua30gdGFyZ2V0PVwiX2JsYW5rXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnMgbWQtMTggbWQtZGFya1wiIHN0eWxlPXt7dmVydGljYWxBbGlnbjpcImJvdHRvbVwifX0+c2VhcmNoPC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+IDogXCJcIjtcclxuXHJcbiAgICBjb25zdCB0aW1lTWluID0gYCR7TWF0aC5mbG9vcih0LmVsYXBzZWRfdGltZS82MCk8MTA/XCIwXCI6XCJcIn0ke01hdGguZmxvb3IodC5lbGFwc2VkX3RpbWUvNjApfWA7XHJcbiAgICBjb25zdCB0aW1lU2VjID0gYDAwJHtNYXRoLmZsb29yKHQuZWxhcHNlZF90aW1lJTYwKX1gLnNsaWNlKC0yKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0ZCBjbGFzc05hbWU9XCJjZW50ZXJcIj5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdGFuZGluZ3MtYWNcIj57dC5zY29yZS8xMDB9PC9zcGFuPntwZW5hbHR5fXtzdWJtaXNzaW9ufVxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyB0aW1lc3RhbXBcIj57dGltZU1pbn06e3RpbWVTZWN9PC9zcGFuPlxyXG4gICAgICA8L3RkPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFRvdGFsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcblxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzICl7XHJcbiAgICBjb25zdCBjb21wID0gW1wiZWxhcHNlZF90aW1lXCIsIFwiZmFpbHVyZVwiLCBcInBlbmFsdHlcIiwgXCJzY29yZVwiXTtcclxuICAgIGZvcihjb25zdCBwYXJhbSBvZiBjb21wKXtcclxuICAgICAgaWYoIHRoaXMucHJvcHMucm93W3BhcmFtXSAhPT0gbmV4dFByb3BzLnJvd1twYXJhbV0gKSByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgaWYoIHRoaXMucHJvcHMucm93LmVsYXBzZWRfdGltZSA9PT0gXCIwXCIgKXtcclxuICAgICAgICByZXR1cm4gPHRkIGNsYXNzTmFtZT1cImNlbnRlclwiPjxwPi08L3A+PC90ZD47XHJcbiAgICB9XHJcbiAgICBsZXQgcGVuYWx0eSA9IFwiXCI7XHJcbiAgICBpZih0aGlzLnByb3BzLnJvdy5mYWlsdXJlICE9PSBcIjBcIil7XHJcbiAgICAgIHBlbmFsdHkgPSA8c3BhbiBjbGFzc05hbWU9XCJzdGFuZGluZ3Mtd2FcIj4oe3RoaXMucHJvcHMucm93LmZhaWx1cmV9KTwvc3Bhbj47XHJcbiAgICB9XHJcbiAgICBjb25zdCB0aW1lTWluID0gYCR7TWF0aC5mbG9vcih0aGlzLnByb3BzLnJvdy5lbGFwc2VkX3RpbWUvNjApPDEwP1wiMFwiOlwiXCJ9JHtNYXRoLmZsb29yKHRoaXMucHJvcHMucm93LmVsYXBzZWRfdGltZS82MCl9YDtcclxuICAgIGNvbnN0IHRpbWVTZWMgPSBgMDAke01hdGguZmxvb3IodGhpcy5wcm9wcy5yb3cuZWxhcHNlZF90aW1lJTYwKX1gLnNsaWNlKC0yKTtcclxuXHJcbiAgICBjb25zdCBwZW5hbHR5TWluID0gYCR7TWF0aC5mbG9vcih0aGlzLnByb3BzLnJvdy5wZW5hbHR5LzYwKTwxMD9cIjBcIjpcIlwifSR7TWF0aC5mbG9vcih0aGlzLnByb3BzLnJvdy5wZW5hbHR5LzYwKX1gO1xyXG4gICAgY29uc3QgcGVuYWx0eVNlYyA9IGAwMCR7TWF0aC5mbG9vcih0aGlzLnByb3BzLnJvdy5wZW5hbHR5JTYwKX1gLnNsaWNlKC0yKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0ZCBjbGFzc05hbWU9XCJjZW50ZXJcIj5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzdGFuZGluZ3Mtc2NvcmVcIj57dGhpcy5wcm9wcy5yb3cuc2NvcmUvMTAwfTwvc3Bhbj57cGVuYWx0eX1cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgdGltZXN0YW1wXCI+e3BlbmFsdHlNaW59OntwZW5hbHR5U2VjfSAoe3RpbWVNaW59Ont0aW1lU2VjfSk8L3NwYW4+XHJcbiAgICAgIDwvdGQ+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuLypcclxuIHJhbmtcclxuIG5hbWVcclxuIGlkXHJcbiByYXRpbmdcclxuIGNvdW50cnlcclxuIHRhc2tzW11cclxuIHNjb3JlXHJcbiBlbGFwc2VkX3RpbWVcclxuIHBlbmFsdHlcclxuKi9cclxuY2xhc3MgU3RhbmRpbmdzUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcyApe1xyXG4gICAgaWYoIEpTT04uc3RyaW5naWZ5KCBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLnNldHRpbmdzKSApICE9PSBKU09OLnN0cmluZ2lmeSggT2JqZWN0LmFzc2lnbih7fSwgbmV4dFByb3BzLnNldHRpbmdzKSApICkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiggSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcy5yb3cpICE9PSBKU09OLnN0cmluZ2lmeShuZXh0UHJvcHMucm93KSApIHJldHVybiB0cnVlO1xyXG4gICAgaWYoIHRoaXMucHJvcHMuaXNGcmllbmQgIT09IG5leHRQcm9wcy5pc0ZyaWVuZCApIHJldHVybiB0cnVlO1xyXG4gICAgaWYoIHRoaXMucHJvcHMuZmlsdGVyZWRSYW5rICE9PSBuZXh0UHJvcHMuZmlsdGVyZWRSYW5rICkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiggdGhpcy5wcm9wcy5jb250ZXN0RW5kZWQgIT09IG5leHRQcm9wcy5jb250ZXN0RW5kZWQgKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgY29uc3QgbmFtZSA9IDxOYW1lIHNldHRpbmdzPXt0aGlzLnByb3BzLnNldHRpbmdzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgIHJvdz17dGhpcy5wcm9wcy5yb3d9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaXNGcmllbmQ9e3RoaXMucHJvcHMuaXNGcmllbmR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgZnJpZW5kc1VwZGF0ZUZ1bmM9e3RoaXMucHJvcHMuZnJpZW5kc1VwZGF0ZUZ1bmN9Lz47XHJcblxyXG4gICAgY29uc3QgdGFza3MgPSB0aGlzLnByb3BzLnJvdy50YXNrcy5tYXAoICh0LCBpKSA9PiB7XHJcbiAgICAgIHJldHVybiA8VGFzayB0YXNrPXt0fVxyXG4gICAgICAgICAgICAgICAgICAga2V5PXtpfSBcclxuICAgICAgICAgICAgICAgICAgIG1lPXtNZS5jb250ZXN0YW50ID09PSB0cnVlICYmIHRoaXMucHJvcHMucm93LnVzZXJfaWQgPT09IE1lLnVzZXJfaWR9XHJcbiAgICAgICAgICAgICAgICAgICBzdWJtaXNzaW9uTGluaz17YC4vc3VibWlzc2lvbnMvYWxsP3Rhc2tfc2NyZWVuX25hbWU9JHt0aGlzLnByb3BzLnRhc2tEYXRhW2ldLnVybC5zbGljZSg3KX0mdXNlcl9zY3JlZW5fbmFtZT0ke3RoaXMucHJvcHMucm93LnVzZXJfc2NyZWVuX25hbWV9YH1cclxuICAgICAgICAgICAgICAgICAgIGNvbnRlc3RFbmRlZD17dGhpcy5wcm9wcy5jb250ZXN0RW5kZWR9Lz47XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB0b3RhbCA9IDxUb3RhbCByb3c9e3RoaXMucHJvcHMucm93fSAvPjtcclxuXHJcbiAgICBsZXQgdHJDbGFzcyA9IFwiXCI7XHJcbiAgICBpZiggdGhpcy5wcm9wcy5pc0ZyaWVuZCAmJiB0aGlzLnByb3BzLnNldHRpbmdzLmhpZ2hsaWdodEZyaWVuZHMgPT09IHRydWUgKSB0ckNsYXNzID0gXCJzdGFuZGluZ3MtZnJpZW5kXCI7XHJcbiAgICBpZiggTWUuY29udGVzdGFudCA9PT0gdHJ1ZSAmJiB0aGlzLnByb3BzLnJvdy51c2VyX2lkID09PSBNZS51c2VyX2lkICkgdHJDbGFzcyA9IFwic3RhbmRpbmdzLW1lXCI7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgIDx0ciBjbGFzc05hbWU9e3RyQ2xhc3N9PlxyXG4gICAgICA8dGQgY2xhc3NOYW1lPVwic3RhbmRpbmdzLXJhbmtcIj5cclxuICAgICAgICB7dGhpcy5wcm9wcy5yb3cucmFua317dGhpcy5wcm9wcy5zZXR0aW5ncy5pc0ZpbHRlcnNFbmFibGVkKCkgfHwgdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nRW5hYmxlZCA/YCAoJHt0aGlzLnByb3BzLmZpbHRlcmVkUmFua30pYDpcIlwifVxyXG4gICAgICA8L3RkPlxyXG4gICAgICB7bmFtZX1cclxuICAgICAge3Rhc2tzfVxyXG4gICAgICB7dG90YWx9XHJcbiAgICA8L3RyPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0YW5kaW5nc0hlYWQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCl7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJlbmRlcigpe1xyXG4gICAgY29uc3QgdGFza3MgPSB0aGlzLnByb3BzLnRhc2tEYXRhLm1hcCggKHQsIGkpID0+IHtcclxuICAgICAgcmV0dXJuICg8dGggY2xhc3NOYW1lPVwiY2VudGVyXCIga2V5PXtgdGFzay0ke2l9YH0+XHJcbiAgICAgICAgPGEgaHJlZj17dC51cmx9IHRhcmdldD1cIl9ibGFua1wiPnt0Lm5hbWV9PC9hPlxyXG4gICAgICA8L3RoPik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0cj5cclxuICAgICAgICA8dGggY2xhc3NOYW1lPVwiY2VudGVyXCI+e1wiUmFua1wifTwvdGg+XHJcbiAgICAgICAgPHRoIGNsYXNzTmFtZT1cImNlbnRlclwiPntcIlVzZXIgTmFtZVwifTwvdGg+XHJcbiAgICAgICAge3Rhc2tzfVxyXG4gICAgICAgIDx0aCBjbGFzc05hbWU9XCJjZW50ZXJcIj57XCJTY29yZSAvIFRpbWVcIn08L3RoPlxyXG4gICAgICA8L3RyPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YW5kaW5ncyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgc3RhbmRpbmdzUm93cyA9IFwiXCI7XHJcbiAgICBpZiggdGhpcy5wcm9wcy5zdGFuZGluZ3MubGVuZ3RoID4gMCApe1xyXG4gICAgICBzdGFuZGluZ3NSb3dzID0gdGhpcy5wcm9wcy5zdGFuZGluZ3MubWFwKCAocm93LCBpKSA9PiB7XHJcbiAgICAgICAgbGV0IGlzRnJpZW5kID0gdGhpcy5wcm9wcy5mcmllbmRzLmlzRnJpZW5kKCByb3cudXNlcl9zY3JlZW5fbmFtZSApO1xyXG4gICAgICAgIHJldHVybiA8U3RhbmRpbmdzUm93IHJvdz17cm93fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzPXt0aGlzLnByb3BzLnNldHRpbmdzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cm93LnVzZXJfaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGcmllbmQ9e2lzRnJpZW5kfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyaWVuZHNVcGRhdGVGdW5jPXt0aGlzLnByb3BzLmZyaWVuZHNVcGRhdGVGdW5jfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkUmFuaz17dGhpcy5wcm9wcy5vZmZTZXQgKyBpICsgMX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrRGF0YT17dGhpcy5wcm9wcy50YXNrRGF0YX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0RW5kZWQ9e3RoaXMucHJvcHMuY29udGVzdEVuZGVkfS8+XHJcbiAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtYm9yZGVyZWQgdGFibGUtY29uZGVuc2VkIHRhYmxlLXN0YW5kaW5ncyB0YWJsZS1zb3J0XCI+XHJcbiAgICAgIDx0aGVhZD5cclxuICAgICAgICA8U3RhbmRpbmdzSGVhZCB0YXNrRGF0YT17dGhpcy5wcm9wcy50YXNrRGF0YX0vPlxyXG4gICAgICA8L3RoZWFkPlxyXG4gICAgICA8dGJvZHk+XHJcbiAgICAgICAge3N0YW5kaW5nc1Jvd3N9XHJcbiAgICAgIDwvdGJvZHk+XHJcbiAgICA8L3RhYmxlPlxyXG4gICAgKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgU3RhdHNTdW1tZXJ5IGZyb20gJy4vc3RhdHMvc3VtbWVyeS5qcydcclxuaW1wb3J0IFN0YXRzVGFzayBmcm9tICcuL3N0YXRzL3Rhc2suanMnXHJcbmltcG9ydCBNb2RhbCBmcm9tICcuL21vZGFsLmpzJ1xyXG5cclxuY2xhc3MgU3RhdHNDb250ZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7IHBhZ2U6IDAgfTtcclxuICB9XHJcblxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzLCBuZXh0U3RhdGUgKXtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLnBhZ2UgIT09IG5leHRTdGF0ZS5wYWdlO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgdGFiID0gdGhpcy5wcm9wcy5jb250ZXN0LnRhc2tzLm1hcCggKHQsaSkgPT4ge1xyXG4gICAgICBpZiggdGhpcy5zdGF0ZS5wYWdlID09PSBpICl7XHJcbiAgICAgICAgcmV0dXJuICg8bGkgY2xhc3NOYW1lPVwiYWN0aXZlXCIga2V5PXtgJHtpfWB9PjxhIGhyZWY9XCIjXCI+eydBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWidbaV19PC9hPjwvbGk+KTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuICg8bGkga2V5PXtgJHtpfWB9PjxhIGhyZWY9XCIjXCIgb25DbGljaz17KCk9PntcclxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3BhZ2U6aX0pO1xyXG4gICAgICAgIH19PnsnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonW2ldfTwvYT48L2xpPik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBjb21wb25lbnQ7XHJcbiAgICBpZih0aGlzLnN0YXRlLnBhZ2UgPT09IHRoaXMucHJvcHMuY29udGVzdC5udW1UYXNrcyl7XHJcbiAgICAgIHRhYi5wdXNoKCA8bGkgY2xhc3NOYW1lPVwiYWN0aXZlXCIga2V5PXtgJHt0aGlzLnByb3BzLmNvbnRlc3QubnVtVGFza3N9YH0+PGEgaHJlZj1cIiNcIj5TdW1tZXJ5PC9hPjwvbGk+ICk7XHJcbiAgICAgIGNvbXBvbmVudCA9IChcclxuICAgICAgICA8U3RhdHNTdW1tZXJ5IHN0YW5kaW5ncz17dGhpcy5wcm9wcy5zdGFuZGluZ3N9XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0PXt0aGlzLnByb3BzLmNvbnRlc3R9IC8+XHJcbiAgICAgICk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgdGFiLnB1c2goIDxsaSBrZXk9e2Ake3RoaXMucHJvcHMuY29udGVzdC5udW1UYXNrc31gfT48YSBocmVmPVwiI1wiIG9uQ2xpY2s9eyAoKT0+e1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3BhZ2U6dGhpcy5wcm9wcy5jb250ZXN0Lm51bVRhc2tzfSk7XHJcbiAgICAgIH0gfT5TdW1tZXJ5PC9hPjwvbGk+ICk7XHJcbiAgICAgIGNvbXBvbmVudCA9IChcclxuICAgICAgICA8U3RhdHNUYXNrIHRhc2s9e3RoaXMucHJvcHMuY29udGVzdC50YXNrc1t0aGlzLnN0YXRlLnBhZ2VdfVxyXG4gICAgICAgICAgICAgICAgICAgc3RhbmRpbmdzPXt0aGlzLnByb3BzLnN0YW5kaW5nc31cclxuICAgICAgICAgICAgICAgICAgIGNvbnRlc3Q9e3RoaXMucHJvcHMuY29udGVzdH0gLz5cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2LXRhYnNcIj5cclxuICAgICAgICAgIHt0YWJ9XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgICB7Y29tcG9uZW50fVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgLyoqXHJcbiAgKiBAcGFyYW0gcHJvcHMuc3RhbmRpbmdzXHJcbiAgKiBAcGFyYW0gcHJvcHMuY29udGVzdFxyXG4gICovXHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgYnV0dG9uID0gKFxyXG4gICAgICA8YSBocmVmPVwiI1wiPjxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+YXNzZXNzbWVudDwvaT4gU3RhdGlzdGljcyA8L2E+XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxNb2RhbCBidXR0b249e2J1dHRvbn0gdGl0bGU9XCJTdGF0aXN0aWNzXCI+XHJcbiAgICAgICAgPFN0YXRzQ29udGVudCBzdGFuZGluZ3M9e3RoaXMucHJvcHMuc3RhbmRpbmdzfSBjb250ZXN0PXt0aGlzLnByb3BzLmNvbnRlc3R9Lz5cclxuICAgICAgPC9Nb2RhbD5cclxuICAgICk7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcnRDb21wb25lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgLyoqXHJcbiAgKiBjYW52YXNJZFxyXG4gICogZGF0YXNldFxyXG4gICogd2lkdGhcclxuICAqIGhlaWdodFxyXG4gICovXHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuICByZW5kZXIoKXtcclxuICAgIHJldHVybihcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8Y2FudmFzIGlkPXt0aGlzLnByb3BzLmNhbnZhc0lkfSB3aWR0aD17dGhpcy5wcm9wcy53aWR0aH0gaGVpZ2h0PXt0aGlzLnByb3BzLmhlaWdodH0+PC9jYW52YXM+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbiAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgIGxldCBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnByb3BzLmNhbnZhc0lkKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGN0eCk7XHJcbiAgICB0aGlzLmNoYXJ0ID0gbmV3IENoYXJ0KGN0eCwgdGhpcy5wcm9wcy5kYXRhc2V0KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY2hhcnQpO1xyXG4gIH1cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgdGhpcy5jaGFydC5kZXN0cm95KCk7XHJcbiAgfVxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpe1xyXG4gICAgdGhpcy5jaGFydC5kZXN0cm95KCk7XHJcbiAgICBsZXQgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wcm9wcy5jYW52YXNJZCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhjdHgpO1xyXG4gICAgdGhpcy5jaGFydCA9IG5ldyBDaGFydChjdHgsIHRoaXMucHJvcHMuZGF0YXNldCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNoYXJ0KTtcclxuICB9XHJcbn0iLCJpbXBvcnQge3JhdGluZ30gZnJvbSAnLi4vdXRpbC5qcydcclxuaW1wb3J0IENoYXJ0Q29tcG9uZW50IGZyb20gJy4vY2hhcnRDb21wb25lbnQuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c1N1bW1lcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5nZW5EYXRhc2V0LmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBnZW5EYXRhc2V0KCl7XHJcbiAgICBjb25zdCBsYWJlbHMgPSByYXRpbmcubGIuc2xpY2UoMSkubWFwKCAocikgPT4gU3RyaW5nKHIpICsgXCIgLVwiICk7XHJcbiAgICBjb25zdCBjb2xvciA9IHJhdGluZy5jb2xvci5zbGljZSgxKTtcclxuICAgIGxldCBjb3VudCA9IHJhdGluZy5jb2xvci5tYXAoICgpID0+IChuZXcgTWFwKCkpICk7XHJcbiAgICBsZXQgc2NvcmVEaXN0cmlidXRpb24gPSBuZXcgU2V0KCk7XHJcbiAgICB0aGlzLnByb3BzLnN0YW5kaW5ncy5mb3JFYWNoKCAocikgPT4ge1xyXG4gICAgICBpZiggci50YXNrcy5tYXAoICh0KT0+dC5lbGFwc2VkX3RpbWUgIT09IHVuZGVmaW5lZCA/IDEgOiAwICkucmVkdWNlKCAoYSxiKT0+YStiICkgIT09IDAgKXtcclxuICAgICAgICBjb25zdCBsZXZlbCA9IHJhdGluZy5nZXRMZXZlbCggci5yYXRpbmcgKTtcclxuICAgICAgICBjb25zdCBzY29yZSA9IHIuc2NvcmUvMTAwO1xyXG4gICAgICAgIHNjb3JlRGlzdHJpYnV0aW9uLmFkZChzY29yZSk7XHJcbiAgICAgICAgY291bnRbbGV2ZWxdLnNldCggc2NvcmUsIGNvdW50W2xldmVsXS5oYXMoc2NvcmUpID8gY291bnRbbGV2ZWxdLmdldChzY29yZSkgKyAxIDogMSApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGxldCBzY29yZXMgPSBbLi4uc2NvcmVEaXN0cmlidXRpb25dLnNvcnQoIChhLGIpID0+IHsgcmV0dXJuIGE8YiA/IC0xIDogMX0gKTtcclxuICAgIGxldCBkYXRhID0gcmF0aW5nLmxiLm1hcCggKCkgPT4gKG5ldyBBcnJheShzY29yZXMubGVuZ3RoKSkuZmlsbCgwKSApO1xyXG4gICAgY291bnQuZm9yRWFjaCggKGMsIGxldmVsKSA9PiB7XHJcbiAgICAgIGMuZm9yRWFjaCggKGNudCwgc2NvcmUgKSA9PiB7XHJcbiAgICAgICAgZGF0YVtsZXZlbF1bIHNjb3Jlcy5pbmRleE9mKHNjb3JlKSBdID0gY250O1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGRhdGFzZXQgPSB7XHJcbiAgICAgIHR5cGUgOiAnYmFyJyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGxhYmVsczogc2NvcmVzLFxyXG4gICAgICAgIGRhdGFzZXRzOiBkYXRhLnNsaWNlKDEpLm1hcCggKGQsIGkpID0+IHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbHNbaV0sXHJcbiAgICAgICAgICAgIGRhdGE6IGQsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3JbaV1cclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIG1haW50YWluQXNwZWN0UmF0aW8gOiBmYWxzZSxcclxuICAgICAgICBzY2FsZXM6IHtcclxuICAgICAgICAgIHhBeGVzOiBbe1xyXG4gICAgICAgICAgICBkaXNwbGF5OnRydWUsXHJcbiAgICAgICAgICAgIHNjYWxlTGFiZWw6e1xyXG4gICAgICAgICAgICAgIGRpc3BsYXk6dHJ1ZSxcclxuICAgICAgICAgICAgICBsYWJlbFN0cmluZzogXCJTY29yZVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpY2tzOiB7XHJcbiAgICAgICAgICAgICAgYmVnaW5BdFplcm86dHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XSxcclxuICAgICAgICAgIHlBeGVzOiBbe1xyXG4gICAgICAgICAgICBkaXNwbGF5OnRydWUsXHJcbiAgICAgICAgICAgIHNjYWxlTGFiZWw6e1xyXG4gICAgICAgICAgICAgIGRpc3BsYXk6dHJ1ZSxcclxuICAgICAgICAgICAgICBsYWJlbFN0cmluZzogXCJQZW9wbGVcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhY2tlZDogdHJ1ZVxyXG4gICAgICAgICAgfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuaW1hdGlvbiA6IHtcclxuICAgICAgICAgIGFuaW1hdGU6IGZhbHNlLFxyXG4gICAgICAgICAgYW5pbWF0ZVNjYWxlIDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gZGF0YXNldDtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPHA+XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy5jb250ZXN0LmNvbnRlc3RFbmRlZCA/IDxzcGFuPlRoaXMgc3RhdHMgaXMgdW5vZmZpY2lhbC4gWW91IGNhbiBjaGVjayB0aGUgb2ZmaWNpYWwgc3RhdHMgPGEgaHJlZj1cIi4vc3RhdGlzdGljc1wiIHRhcmdldD1cIl9ibGFua1wiPmhlcmU8L2E+Ljwvc3Bhbj46IG51bGx9XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxDaGFydENvbXBvbmVudCBjYW52YXNJZD1cImNoYXJ0U3VtbWVyeVwiIGRhdGFzZXQ9e3RoaXMuZ2VuRGF0YXNldCgpfSB3aWR0aD1cIjUwMFwiIGhlaWdodD1cIjI4MFwiLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSIsImltcG9ydCB7cmF0aW5nfSBmcm9tICcuLi91dGlsLmpzJ1xyXG5pbXBvcnQgQ2hhcnRDb21wb25lbnQgZnJvbSAnLi9jaGFydENvbXBvbmVudC5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzVGFzayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICAvKipcclxuICAqIHRhc2sgXHJcbiAgKiBzdGFuZGluZ3NcclxuICAqL1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMudGltZVN0ZXAgPSA1ICogNjA7XHJcblxyXG5cclxuICAgIHRoaXMuZ2V0TWF4U2NvcmUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZ2V0U3RhdHNWYWx1ZXMuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZ2VuZXJhdGVEYXRhc2V0LmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBnZXRNYXhTY29yZSgpe1xyXG4gICAgbGV0IG1heFNjb3JlID0gMDtcclxuICAgIHRoaXMucHJvcHMuc3RhbmRpbmdzLmZvckVhY2goIChkYXRhKSA9PiB7XHJcbiAgICAgIGNvbnN0IGQgPSBkYXRhLnRhc2tzWyB0aGlzLnByb3BzLnRhc2suaWQgXTtcclxuICAgICAgaWYoIGQuc2NvcmUgPT09IHVuZGVmaW5lZCApIHJldHVybjtcclxuICAgICAgbWF4U2NvcmUgPSBNYXRoLm1heChtYXhTY29yZSwgTnVtYmVyKGQuc2NvcmUpKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1heFNjb3JlO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdHNWYWx1ZXMoc3RhbmRpbmdzKXtcclxuICAgIGxldCByZXMgPSB7fVxyXG4gICAgdHJ5e1xyXG4gICAgICByZXMubnVtQUMgPSAwO1xyXG4gICAgICByZXMubnVtV0EgPSAwO1xyXG4gICAgICByZXMubnVtUGVvcGxlVHJpZWQgPSAwO1xyXG4gICAgICByZXMubnVtU3VibWlzc2lvbnMgPSAwO1xyXG4gICAgICByZXMuZmlyc3RBY2NlcHRlZFRpbWUgPSAwO1xyXG4gICAgICByZXMuZmlyc3RBY2NlcHRlZFBlcnNvbiA9IFtdO1xyXG5cclxuICAgICAgbGV0IHRpbWVTdW0gPSAwO1xyXG5cclxuICAgICAgcmVzLm51bUNvbnRlc3RhbnRzID0gMDtcclxuXHJcbiAgICAgIC8vc2V0IEZBXHJcbiAgICAgIHN0YW5kaW5ncy5mb3JFYWNoKCAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGQgPSBkYXRhLnRhc2tzWyB0aGlzLnByb3BzLnRhc2suaWQgXTtcclxuICAgICAgICBpZiggZC5zY29yZSA9PT0gdW5kZWZpbmVkICkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiggdGhpcy5tYXhTY29yZSA9PSAwIHx8IGQuc2NvcmUgIT0gdGhpcy5tYXhTY29yZSl7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiggcmVzLmZpcnN0QWNjZXB0ZWRUaW1lID09IDAgKSByZXMuZmlyc3RBY2NlcHRlZFRpbWUgPSBOdW1iZXIoZC5lbGFwc2VkX3RpbWUpO1xyXG4gICAgICAgIGVsc2UgcmVzLmZpcnN0QWNjZXB0ZWRUaW1lID0gTWF0aC5taW4ocmVzLmZpcnN0QWNjZXB0ZWRUaW1lLCBOdW1iZXIoZC5lbGFwc2VkX3RpbWUpICk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy9zZXQgb3RoZXIgcGFyYW1zXHJcbiAgICAgIHN0YW5kaW5ncy5mb3JFYWNoKCAoZGF0YSkgPT4ge1xyXG4gICAgICAgIC8vY29udGVzdGFudCBtYWRlIGF0IGxlYXN0IG9uZSBzdWJtaXNzaW9uXHJcbiAgICAgICAgaWYoIGRhdGEudGFza3MubWFwKCAodCk9PnQuZWxhcHNlZF90aW1lICE9PSB1bmRlZmluZWQgPyAxIDogMCApLnJlZHVjZSggKGEsYik9PmErYiApICE9PSAwICkgcmVzLm51bUNvbnRlc3RhbnRzKys7XHJcblxyXG4gICAgICAgIGNvbnN0IGQgPSBkYXRhLnRhc2tzWyB0aGlzLnByb3BzLnRhc2suaWQgXTtcclxuICAgICAgICBpZiggZC5zY29yZSA9PT0gdW5kZWZpbmVkICkgcmV0dXJuO1xyXG5cclxuICAgICAgICByZXMubnVtUGVvcGxlVHJpZWQgKz0gMTtcclxuICAgICAgICByZXMubnVtU3VibWlzc2lvbnMgKz0gZC5mYWlsdXJlO1xyXG4gICAgICAgIGlmKCBkLnNjb3JlICE9IDAgKSByZXMubnVtU3VibWlzc2lvbnMgKz0gMTtcclxuXHJcbiAgICAgICAgaWYoIHRoaXMubWF4U2NvcmUgPT0gMCB8fCBkLnNjb3JlICE9IHRoaXMubWF4U2NvcmUpe1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzLm51bUFDICs9IDE7XHJcbiAgICAgICAgcmVzLm51bVdBICs9IGQuZmFpbHVyZTtcclxuICAgICAgICB0aW1lU3VtICs9IGQuZWxhcHNlZF90aW1lO1xyXG5cclxuICAgICAgICBpZiggcmVzLmZpcnN0QWNjZXB0ZWRUaW1lID09IGQuZWxhcHNlZF90aW1lICl7XHJcbiAgICAgICAgICByZXMuZmlyc3RBY2NlcHRlZFBlcnNvbi5wdXNoKCByYXRpbmcuZ2VuZXJhdGVDb2xvcmVkTmFtZSggZGF0YS51c2VyX3NjcmVlbl9uYW1lLCBkYXRhLnJhdGluZyApICk7XHJcbiAgICAgICAgICByZXMuZmlyc3RBY2NlcHRlZFBlcnNvbi5wdXNoKCBcIiBcIiApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYoIHJlcy5udW1BQyA9PSAwICl7XHJcbiAgICAgICAgcmVzLmF2ZXJhZ2VUaW1lID0gMDtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgcmVzLmF2ZXJhZ2VUaW1lID0gTWF0aC5yb3VuZCh0aW1lU3VtIC8gcmVzLm51bUFDKTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICB9Y2F0Y2goZSl7XHJcbiAgICAgIGNvbnNvbGUubG9nKCBcImZhaWxlZCB0byBnZW5lcmF0ZSBzdGF0c1wiICk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCBlICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlRGF0YXNldCgpe1xyXG4gICAgY29uc3QgbGFiZWxzID0gcmF0aW5nLmxiLnNsaWNlKDEpLm1hcCggKHIpID0+IFN0cmluZyhyKSArIFwiLVwiICk7XHJcbiAgICBjb25zdCBjb2xvciA9IHJhdGluZy5jb2xvci5zbGljZSgxKTtcclxuICAgIGNvbnN0IGNvbnRlc3REdXJhdGlvbiA9ICh0aGlzLnByb3BzLmNvbnRlc3QuZW5kVGltZS5nZXRUaW1lKCkgLSB0aGlzLnByb3BzLmNvbnRlc3Quc3RhcnRUaW1lLmdldFRpbWUoKSkvMTAwMDtcclxuXHJcbiAgICAvLyBzZXQgc29sdmVkIGhpc3RvZ3JhbVxyXG4gICAgbGV0IGRhdGEgPSByYXRpbmcubGIubWFwKCAoKSA9PiAobmV3IEFycmF5KCBNYXRoLmZsb29yKCAoY29udGVzdER1cmF0aW9uK3RoaXMudGltZVN0ZXAtMSkgLyB0aGlzLnRpbWVTdGVwICkgKSkuZmlsbCgwKSApO1xyXG4gICAgdGhpcy5wcm9wcy5zdGFuZGluZ3MuZm9yRWFjaCggKHIpID0+IHtcclxuICAgICAgY29uc3QgdCA9IHIudGFza3NbIHRoaXMucHJvcHMudGFzay5pZCBdO1xyXG4gICAgICBpZiggdC5zY29yZSA9PT0gdGhpcy5tYXhTY29yZSApe1xyXG4gICAgICAgIGRhdGFbIHJhdGluZy5nZXRMZXZlbCggci5yYXRpbmcgKSBdWyBNYXRoLmZsb29yKHQuZWxhcHNlZF90aW1lIC8gdGhpcy50aW1lU3RlcCkgXSArPSAxO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIGRhdGFzZXQgZm9yIHRoZSBjaGFydFxyXG4gICAgY29uc3QgZGF0YXNldCA9IHtcclxuICAgICAgdHlwZSA6ICdiYXInLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgbGFiZWxzIDogKCgpPT57XHJcbiAgICAgICAgICBsZXQgYXJyID0gbmV3IEFycmF5KCBNYXRoLmZsb29yKCAoY29udGVzdER1cmF0aW9uK3RoaXMudGltZVN0ZXAtMSkgLyB0aGlzLnRpbWVTdGVwICkgKTtcclxuICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGFycltpXSA9IGAkezUqaX0tYDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgICAgfSkoKSxcclxuICAgICAgICBkYXRhc2V0czogZGF0YS5zbGljZSgxKS5tYXAoIChkLCBpKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsYWJlbDogbGFiZWxzW2ldLFxyXG4gICAgICAgICAgICBkYXRhOiBkLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yW2ldXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAvL3Jlc3BvbnNpdmUgOiBmYWxzZSxcclxuICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvIDogZmFsc2UsXHJcbiAgICAgICAgc2NhbGVzOiB7XHJcbiAgICAgICAgICB4QXhlczogW3tcclxuICAgICAgICAgICAgZGlzcGxheTp0cnVlLFxyXG4gICAgICAgICAgICBzY2FsZUxhYmVsOntcclxuICAgICAgICAgICAgICBkaXNwbGF5OnRydWUsXHJcbiAgICAgICAgICAgICAgbGFiZWxTdHJpbmc6IFwiVGltZSBbbWluXVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpY2tzOiB7XHJcbiAgICAgICAgICAgICAgYmVnaW5BdFplcm86dHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XSxcclxuICAgICAgICAgIHlBeGVzOiBbe1xyXG4gICAgICAgICAgICBkaXNwbGF5OnRydWUsXHJcbiAgICAgICAgICAgIHNjYWxlTGFiZWw6e1xyXG4gICAgICAgICAgICAgIGRpc3BsYXk6dHJ1ZSxcclxuICAgICAgICAgICAgICBsYWJlbFN0cmluZzogXCJTb2x2ZWRcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhY2tlZDogdHJ1ZVxyXG4gICAgICAgICAgfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuaW1hdGlvbiA6IHtcclxuICAgICAgICAgIGFuaW1hdGU6IGZhbHNlLFxyXG4gICAgICAgICAgYW5pbWF0ZVNjYWxlIDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGRhdGFzZXQ7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIHRoaXMubWF4U2NvcmUgPSB0aGlzLmdldE1heFNjb3JlKCk7XHJcbiAgICBjb25zdCBkYXRhQWxsID0gdGhpcy5nZXRTdGF0c1ZhbHVlcyh0aGlzLnByb3BzLnN0YW5kaW5ncyk7XHJcbiAgICBjb25zdCByb3dBbGwgPSAoXHJcbiAgICAgIDx0cj5cclxuICAgICAgICA8dGQ+QUxMPC90ZD5cclxuICAgICAgICA8dGQ+e2RhdGFBbGwubnVtQUN9PC90ZD5cclxuICAgICAgICA8dGQ+e2RhdGFBbGwubnVtUGVvcGxlVHJpZWR9PC90ZD5cclxuICAgICAgICA8dGQ+e2RhdGFBbGwubnVtU3VibWlzc2lvbnN9PC90ZD5cclxuICAgICAgICB7Lyo8dGQ+eyggZGF0YUFsbC5udW1BQyAvIE1hdGgubWF4KDEsIGRhdGFBbGwubnVtU3VibWlzc2lvbnMpICogMTAwKS50b0ZpeGVkKDIpfSU8L3RkPiovfVxyXG4gICAgICAgIDx0ZD57KCBkYXRhQWxsLm51bUFDIC8gTWF0aC5tYXgoMSwgZGF0YUFsbC5udW1QZW9wbGVUcmllZCkgKiAxMDApLnRvRml4ZWQoMil9JTwvdGQ+XHJcbiAgICAgICAgPHRkPnsoIGRhdGFBbGwubnVtQUMgLyBNYXRoLm1heCgxLCBkYXRhQWxsLm51bUNvbnRlc3RhbnRzKSAqIDEwMCkudG9GaXhlZCgyKX0lPC90ZD5cclxuICAgICAgICA8dGQ+e2RhdGFBbGwuZmlyc3RBY2NlcHRlZFBlcnNvbn08YnIvPlxyXG4gICAgICAgIHtgJHtNYXRoLmZsb29yKCBkYXRhQWxsLmZpcnN0QWNjZXB0ZWRUaW1lLzYwICl9IG1pbiAke2RhdGFBbGwuZmlyc3RBY2NlcHRlZFRpbWUlNjB9IHNlY2B9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQ+e2Ake01hdGguZmxvb3IoIGRhdGFBbGwuYXZlcmFnZVRpbWUvNjAgKX0gbWluICR7ZGF0YUFsbC5hdmVyYWdlVGltZSU2MH0gc2VjYH08L3RkPlxyXG4gICAgICAgIDx0ZD57KGRhdGFBbGwubnVtV0EgLyBNYXRoLm1heCgxLCBkYXRhQWxsLm51bUFDKSkudG9GaXhlZCgyKX08L3RkPlxyXG4gICAgICA8L3RyPlxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBkYXRhQ29sb3IgPSBbXTtcclxuICAgIGZvcihsZXQgcj0xOyByPD05OyByKyspe1xyXG4gICAgICBjb25zdCBjU3RhbmRpbmdzID0gdGhpcy5wcm9wcy5zdGFuZGluZ3MuZmlsdGVyKCAocyk9PntcclxuICAgICAgICByZXR1cm4gcmF0aW5nLmxiW3JdIDw9IHMucmF0aW5nICYmIHMucmF0aW5nIDwgcmF0aW5nLnViW3JdO1xyXG4gICAgICB9ICk7XHJcbiAgICAgIGRhdGFDb2xvci5wdXNoKCB0aGlzLmdldFN0YXRzVmFsdWVzKGNTdGFuZGluZ3MpICk7XHJcbiAgICB9XHJcbiAgICBjb25zdCByb3dDb2xvciA9IGRhdGFDb2xvci5tYXAoIChkYXRhLCBpZHgpID0+IHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8dHIga2V5PXtpZHh9PlxyXG4gICAgICAgICAgPHRkPjxzcGFuIHN0eWxlPXt7Y29sb3IgOiByYXRpbmcuY29sb3JPcmlnaW5hbFtpZHgrMV19fT57cmF0aW5nLmxiW2lkeCsxXX0tPC9zcGFuPjwvdGQ+XHJcbiAgICAgICAgICA8dGQ+e2RhdGEubnVtQUN9PC90ZD5cclxuICAgICAgICAgIDx0ZD57ZGF0YS5udW1QZW9wbGVUcmllZH08L3RkPlxyXG4gICAgICAgICAgPHRkPntkYXRhLm51bVN1Ym1pc3Npb25zfTwvdGQ+XHJcbiAgICAgICAgICB7Lyo8dGQ+eyggZGF0YS5udW1BQyAvIE1hdGgubWF4KDEsIGRhdGEubnVtU3VibWlzc2lvbnMpICogMTAwKS50b0ZpeGVkKDIpfSU8L3RkPiovfVxyXG4gICAgICAgICAgPHRkPnsoIGRhdGEubnVtQUMgLyBNYXRoLm1heCgxLCBkYXRhLm51bVBlb3BsZVRyaWVkKSAqIDEwMCkudG9GaXhlZCgyKX0lPC90ZD5cclxuICAgICAgICAgIDx0ZD57KCBkYXRhLm51bUFDIC8gTWF0aC5tYXgoMSwgZGF0YS5udW1Db250ZXN0YW50cykgKiAxMDApLnRvRml4ZWQoMil9JTwvdGQ+XHJcbiAgICAgICAgICA8dGQ+e2RhdGEuZmlyc3RBY2NlcHRlZFBlcnNvbn08YnIvPlxyXG4gICAgICAgICAge2Ake01hdGguZmxvb3IoIGRhdGEuZmlyc3RBY2NlcHRlZFRpbWUvNjAgKX0gbWluICR7ZGF0YS5maXJzdEFjY2VwdGVkVGltZSU2MH0gc2VjYH1cclxuICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICA8dGQ+e2Ake01hdGguZmxvb3IoIGRhdGEuYXZlcmFnZVRpbWUvNjAgKX0gbWluICR7ZGF0YS5hdmVyYWdlVGltZSU2MH0gc2VjYH08L3RkPlxyXG4gICAgICAgICAgPHRkPnsoZGF0YS5udW1XQSAvIE1hdGgubWF4KDEsIGRhdGEubnVtQUMpKS50b0ZpeGVkKDIpfTwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgKTtcclxuICAgIH0gKS5yZXZlcnNlKCk7XHJcblxyXG4gICAgdHJ5e1xyXG4gICAgICBjb25zdCByZXMgPSAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxoMz57J0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJ1t0aGlzLnByb3BzLnRhc2suaWRdfSA6IHt0aGlzLnByb3BzLnRhc2submFtZX08L2gzPlxyXG4gICAgICAgICAgPGg0PjxzcGFuIHRpdGxlPVwidGhlIG1heCBzY29yZSBjb250ZXN0YW50cyBnb3QuIHRoaXMgbWF5IGJlIHBhcnRpYWwgc2NvcmVcIj5NYXggU2NvcmU8L3NwYW4+IDoge3RoaXMubWF4U2NvcmUgLyAxMDB9PC9oND5cclxuICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1jb25kZW5zZWRcIj5cclxuICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0aD5SYXRpbmc8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPjxzcGFuIHRpdGxlPVwibnVtYmVyIG9mIHBlb3BsZSB3aG8gZ290IG1heCBzY29yZSAobWF5IGJlIHBhcnRpYWwgc2NvcmUpXCI+QUM8L3NwYW4+PC90aD5cclxuICAgICAgICAgICAgICAgIDx0aD48c3BhbiB0aXRsZT1cIm51bWJlciBvZiBwZW9wbGUgd2hvIG1hZGUgYXQgbGVhc3Qgb25lIHN1Ym1pc3Npb24gZm9yIHRoaXMgdGFza1wiPkF0dGVtcHRlZDwvc3Bhbj48L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPjxzcGFuIHRpdGxlPVwibnVtYmVyIG9mIHN1Ym1pc3Npb25zIGZvciB0aGlzIHRhc2tcIj5TdWJtaXNzaW9uczwvc3Bhbj48L3RoPlxyXG4gICAgICAgICAgICAgICAgey8qPHRoPkFDIC8gU3VibWlzc2lvbnM8L3RoPiovfVxyXG4gICAgICAgICAgICAgICAgPHRoPkFDIC8gQXR0ZW1wdGVkPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aD5BQyAvIENvbnRlc3RhbnRzPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aD5GYXN0ZXN0PC90aD5cclxuICAgICAgICAgICAgICAgIDx0aD5BdmVyYWdlIFRpbWU8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPkF2ZXJhZ2UgV0E8L3RoPlxyXG4gICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICB7cm93QWxsfVxyXG4gICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgIDxDaGFydENvbXBvbmVudCBjYW52YXNJZD17YHRhc2tDaGFydF8ke3RoaXMucHJvcHMudGFzay5pZH1gfSBkYXRhc2V0PXt0aGlzLmdlbmVyYXRlRGF0YXNldCgpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiODAwXCIgaGVpZ2h0PVwiMzQwXCIgLz5cclxuICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1jb25kZW5zZWRcIj5cclxuICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0aD5SYXRpbmc8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPjxzcGFuIHRpdGxlPVwibnVtYmVyIG9mIHBlb3BsZSB3aG8gZ290IG1heCBzY29yZSAobWF5IGJlIHBhcnRpYWwgc2NvcmUpXCI+QUM8L3NwYW4+PC90aD5cclxuICAgICAgICAgICAgICAgIDx0aD48c3BhbiB0aXRsZT1cIm51bWJlciBvZiBwZW9wbGUgd2hvIG1hZGUgYXQgbGVhc3Qgb25lIHN1Ym1pc3Npb24gZm9yIHRoaXMgdGFza1wiPkF0dGVtcHRlZDwvc3Bhbj48L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPjxzcGFuIHRpdGxlPVwibnVtYmVyIG9mIHN1Ym1pc3Npb25zIGZvciB0aGlzIHRhc2tcIj5TdWJtaXNzaW9uczwvc3Bhbj48L3RoPlxyXG4gICAgICAgICAgICAgICAgey8qPHRoPkFDIC8gU3VibWlzc2lvbnM8L3RoPiovfVxyXG4gICAgICAgICAgICAgICAgPHRoPkFDIC8gQXR0ZW1wdGVkPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aD5BQyAvIENvbnRlc3RhbnRzPC90aD5cclxuICAgICAgICAgICAgICAgIDx0aD5GYXN0ZXN0PC90aD5cclxuICAgICAgICAgICAgICAgIDx0aD5BdmVyYWdlIFRpbWU8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPkF2ZXJhZ2UgV0E8L3RoPlxyXG4gICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICB7cm93Q29sb3J9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gcmVzO1xyXG4gICAgfWNhdGNoKGUpe1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiY2xhc3MgVXNlckluZm97XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIGxldCBjb29raWUgPSB7fTtcclxuICAgIGRvY3VtZW50LmNvb2tpZS5zcGxpdCgvO1xccy8pLmZvckVhY2goIChzKSA9PiB7XHJcbiAgICAvL1wiX3VzZXJfc2NyZWVuX25hbWU9a295dW1laXNoaTsgX19wcml2aWxlZ2U9Y29udGVzdGFudDsgX3VzZXJfaWQ9MTE0MDg7IF91c2VyX25hbWU9a295dW1laXNoaVwiLnNwbGl0KC87XFxzLykuZm9yRWFjaCggKHMpID0+IHtcclxuICAgICAgbGV0IFtrZXksIHZhbHVlXSA9IHMuc3BsaXQoLz0vKTtcclxuICAgICAgY29va2llW2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY29udGVzdGFudCA9IGZhbHNlO1xyXG4gICAgaWYoIFwiX19wcml2aWxlZ2VcIiBpbiBjb29raWUgJiYgY29va2llLl9fcHJpdmlsZWdlID09PSBcImNvbnRlc3RhbnRcIil7XHJcbiAgICAgIHRoaXMuY29udGVzdGFudCA9IHRydWU7XHJcbiAgICAgIHRoaXMudXNlcl9zY3JlZW5fbmFtZSA9IGNvb2tpZS5fdXNlcl9zY3JlZW5fbmFtZTtcclxuICAgICAgdGhpcy51c2VyX2lkID0gTnVtYmVyKCBjb29raWUuX3VzZXJfaWQgKTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgbWUgPSBuZXcgVXNlckluZm8oKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1lO1xyXG4iLCJmdW5jdGlvbiBnZXRTdGFuZGluZ3MoIGNhbGxiYWNrLCBpbml0aWFsaXplICl7XHJcbiAgY29uc3QgcmVnID0gL1xccypkYXRhOlxccyhcXFsuKlxcXSksLztcclxuXHJcbiAgaWYoaW5pdGlhbGl6ZSl7XHJcbiAgICBjb25zdCBzY3JpcHRUZXh0ID0gJChcImh0bWxcIikuZmluZCgnc2NyaXB0W3R5cGU9XCJ0ZXh0L0phdmFTY3JpcHRcIl0nKS50ZXh0KCkuc3BsaXQoXCJcXG5cIik7XHJcblxyXG4gICAgc2NyaXB0VGV4dC5mb3JFYWNoKCAodHh0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IHJlZy5leGVjKHR4dCk7XHJcbiAgICAgIGlmKHJlcyAhPT0gbnVsbCl7XHJcbiAgICAgICAgY29uc3QgbmV3U3RhbmRpbmdzID0gSlNPTi5wYXJzZShyZXNbMV0pO1xyXG4gICAgICAgIGNhbGxiYWNrKCBuZXdTdGFuZGluZ3MgKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfWVsc2V7XHJcbiAgICAkLmFqYXgoIHt1cmw6IFwiLi9zdGFuZGluZ3NcIn0gKS5kb25lKCAoaHRtbCkgPT4ge1xyXG4gICAgICBjb25zdCBzY3JpcHRUZXh0ID0gJChodG1sKS5maW5kKCdzY3JpcHRbdHlwZT1cInRleHQvSmF2YVNjcmlwdFwiXScpLnRleHQoKS5zcGxpdChcIlxcblwiKTtcclxuICAgICAgc2NyaXB0VGV4dC5mb3JFYWNoKCAodHh0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gcmVnLmV4ZWModHh0KTtcclxuICAgICAgICBpZihyZXMgIT09IG51bGwpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coIFwic3VjY2Vzc2Z1bGx5IGdvdCBuZXcgc3RhbmRpbmdzIDogXCIsIHJlc1sxXSApO1xyXG4gICAgICAgICAgY29uc3QgbmV3U3RhbmRpbmdzID0gSlNPTi5wYXJzZShyZXNbMV0pO1xyXG4gICAgICAgICAgY2FsbGJhY2soIG5ld1N0YW5kaW5ncyApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFNvcnRpbmdGdW5jdGlvbigga2V5ICl7XHJcbiAgLy8gdGFza3tpfVxyXG4gIGlmKCBrZXkuc2xpY2UoMCw0KSA9PSBcInRhc2tcIiApe1xyXG4gICAgbGV0IGlkID0gTnVtYmVyKCBrZXkuc2xpY2UoNCkgKTtcclxuICAgIHJldHVybiAobCxyKSA9PiB7XHJcbiAgICAgIGlmKCBsLnRhc2tzW2lkXS5zY29yZSA9PT0gdW5kZWZpbmVkICYmIHIudGFza3NbaWRdLnNjb3JlID09PSB1bmRlZmluZWQgKSByZXR1cm4gMDtcclxuICAgICAgaWYoIGwudGFza3NbaWRdLnNjb3JlID09PSB1bmRlZmluZWQgKSByZXR1cm4gLTE7XHJcbiAgICAgIGlmKCByLnRhc2tzW2lkXS5zY29yZSA9PT0gdW5kZWZpbmVkICkgcmV0dXJuIDE7XHJcbiAgICAgIGlmKCBsLnRhc2tzW2lkXS5zY29yZSAhPT0gci50YXNrc1tpZF0uc2NvcmUgKXtcclxuICAgICAgICByZXR1cm4gTnVtYmVyKGwudGFza3NbaWRdLnNjb3JlKSA8IE51bWJlcihyLnRhc2tzW2lkXS5zY29yZSkgPyAtMSA6IDE7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIGlmKCBsLnRhc2tzW2lkXS5wZW5hbHR5ICE9PSByLnRhc2tzW2lkXS5wZW5hbHR5ICl7XHJcbiAgICAgICAgICByZXR1cm4gTnVtYmVyKGwudGFza3NbaWRdLnBlbmFsdHkpID4gTnVtYmVyKHIudGFza3NbaWRdLnBlbmFsdHkpID8gLTEgOiAxO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuICBpZigga2V5ID09IFwidXNlcl9zY3JlZW5fbmFtZVwiICl7XHJcbiAgICByZXR1cm4gKGwscikgPT57XHJcbiAgICAgIGlmKCBsW2tleV0udG9Mb3dlckNhc2UoKSAhPT0gcltrZXldLnRvTG93ZXJDYXNlKCkgKXtcclxuICAgICAgICByZXR1cm4gbFtrZXldLnRvTG93ZXJDYXNlKCkgPCByW2tleV0udG9Mb3dlckNhc2UoKSA/IC0xIDogMTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBpZigga2V5ID09IFwidGltZVwiICl7XHJcbiAgICByZXR1cm4gKGwscikgPT57XHJcbiAgICAgIGlmKCBsLnNjb3JlICE9PSByLnNjb3JlICkgcmV0dXJuIE51bWJlcihsLnNjb3JlKSA+IE51bWJlcihyLnNjb3JlKSA/IC0xIDogMTtcclxuICAgICAgZWxzZSBpZihsLmVsYXBzZWRfdGltZSAhPT0gci5lbGFwc2VkX3RpbWUpIHJldHVybiBOdW1iZXIobC5lbGFwc2VkX3RpbWUpIDwgTnVtYmVyKHIuZWxhcHNlZF90aW1lKSA/IC0xIDogMTtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChsLHIpID0+IHtcclxuICAgIGlmKCBsW2tleV0gIT09IHJba2V5XSApe1xyXG4gICAgICByZXR1cm4gKGxba2V5XSkgPCAocltrZXldKSA/IC0xIDogMTtcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICB9O1xyXG59XHJcblxyXG5jbGFzcyBSYXRpbmd7XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIC8vW2xiLCB1YilcclxuICAgIHRoaXMubGIgPSBbXHJcbiAgICAgIC0xLCAwLCAgIDEsIDQwMCwgIDgwMCwgMTIwMCwgMTYwMCwgMjAwMCwgMjQwMCwgMjgwMFxyXG4gICAgXTtcclxuICAgIHRoaXMudWIgPSBbXHJcbiAgICAgICAwLCAxLCA0MDAsIDgwMCwgMTIwMCwgMTYwMCwgMjAwMCwgMjQwMCwgMjgwMCwgNTAwMFxyXG4gICAgXTtcclxuXHJcbiAgICB0aGlzLmNvbG9yID0gW1xyXG4gICAgICBcInJnYmEoMTkyLDAsMTkyLCAgIDAuNSlcIiwgLy8gXCIjQzAwMEMwXCIsXHJcbiAgICAgIFwicmdiYSgwLDAsMCwgICAgICAgMC41KVwiLCAvLyBcIiMwMDAwMDBcIixcclxuICAgICAgXCJyZ2JhKDEyOCwxMjgsMTI4LCAwLjUpXCIsIC8vIFwiIzgwODA4MFwiLFxyXG4gICAgICBcInJnYmEoMTI4LDY0LDAsICAgIDAuNSlcIiwgLy8gXCIjODA0MDAwXCIsXHJcbiAgICAgIFwicmdiYSgwLDEyOCwwLCAgICAgMC41KVwiLCAvLyBcIiMwMDgwMDBcIixcclxuICAgICAgXCJyZ2JhKDAsMTkyLDE5MiwgICAwLjUpXCIsIC8vIFwiIzAwQzBDMFwiLFxyXG4gICAgICBcInJnYmEoMCwwLDI1NSwgICAgIDAuNSlcIiwgLy8gXCIjMDAwMEZGXCIsXHJcbiAgICAgIFwicmdiYSgxOTIsMTkyLDAsICAgMC41KVwiLCAvLyBcIiNDMEMwMDBcIixcclxuICAgICAgXCJyZ2JhKDI1NSwxMjgsMCwgICAwLjUpXCIsIC8vIFwiI0ZGODAwMFwiLFxyXG4gICAgICBcInJnYmEoMjU1LDAsMCwgICAgIDAuNSlcIiAgLy8gXCIjRkYwMDAwXCJcclxuICAgIF07XHJcblxyXG4gICAgdGhpcy5jb2xvck9yaWdpbmFsID0gW1xyXG4gICAgICBcIiNDMDAwQzBcIixcclxuICAgICAgXCIjMDAwMDAwXCIsXHJcbiAgICAgIFwiIzgwODA4MFwiLFxyXG4gICAgICBcIiM4MDQwMDBcIixcclxuICAgICAgXCIjMDA4MDAwXCIsXHJcbiAgICAgIFwiIzAwQzBDMFwiLFxyXG4gICAgICBcIiMwMDAwRkZcIixcclxuICAgICAgXCIjQzBDMDAwXCIsXHJcbiAgICAgIFwiI0ZGODAwMFwiLFxyXG4gICAgICBcIiNGRjAwMDBcIlxyXG4gICAgXTtcclxuXHJcbiAgICB0aGlzLnVzZXJDb2xvciA9IFtcclxuICAgICAgXCJ1c2VyLWFkbWluXCIsIC8vIFwiI0MwMDBDMFwiLFxyXG4gICAgICBcInVzZXItdW5yYXRlZFwiLCAvLyBcIiMwMDAwMDBcIixcclxuICAgICAgXCJ1c2VyLWdyYXlcIiwgLy8gXCIjODA4MDgwXCIsXHJcbiAgICAgIFwidXNlci1icm93blwiLCAvLyBcIiM4MDQwMDBcIixcclxuICAgICAgXCJ1c2VyLWdyZWVuXCIsIC8vIFwiIzAwODAwMFwiLFxyXG4gICAgICBcInVzZXItY3lhblwiLCAvLyBcIiMwMEMwQzBcIixcclxuICAgICAgXCJ1c2VyLWJsdWVcIiwgLy8gXCIjMDAwMEZGXCIsXHJcbiAgICAgIFwidXNlci15ZWxsb3dcIiwgLy8gXCIjQzBDMDAwXCIsXHJcbiAgICAgIFwidXNlci1vcmFuZ2VcIiwgLy8gXCIjRkY4MDAwXCIsXHJcbiAgICAgIFwidXNlci1yZWRcIiAgLy8gXCIjRkYwMDAwXCJcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBnZXRMZXZlbChyYXRpbmcpe1xyXG4gICAgZm9yKGxldCBsZXZlbD0wOyBsZXZlbDx0aGlzLmNvbG9yLmxlbmd0aDsgbGV2ZWwrKyl7XHJcbiAgICAgIGlmKCB0aGlzLmxiW2xldmVsXSA8PSByYXRpbmcgJiYgcmF0aW5nIDwgdGhpcy51YltsZXZlbF0pe1xyXG4gICAgICAgIHJldHVybiBsZXZlbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG5cclxuICBnZXRDb2xvcihyYXRpbmcpe1xyXG4gICAgcmV0dXJuIHRoaXMuY29sb3JbIHRoaXMuZ2V0TGV2ZWwocmF0aW5nKSBdO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29sb3JPcmlnaW5hbChyYXRpbmcpe1xyXG4gICAgcmV0dXJuIHRoaXMuY29sb3JPcmlnaW5hbFsgdGhpcy5nZXRMZXZlbChyYXRpbmcpIF07XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZUNvbG9yZWROYW1lKCB1c2VyX3NjcmVlbl9uYW1lLCByYXRpbmcgKXtcclxuICAgIHJldHVybiAoPGEgaHJlZj17YGh0dHBzOi8vYXRjb2Rlci5qcC91c2VyLyR7dXNlcl9zY3JlZW5fbmFtZX1gfVxyXG4gICAgICAgICAgICAgICBjbGFzc05hbWU9e2B1c2VybmFtZSAke3RoaXMudXNlckNvbG9yWyB0aGlzLmdldExldmVsKHJhdGluZykgXX1gfVxyXG4gICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxyXG4gICAgICAgICAgICAgICBrZXk9e2B1c2VyLSR7dXNlcl9zY3JlZW5fbmFtZX1gfT57dXNlcl9zY3JlZW5fbmFtZX1cclxuICAgICAgICAgICAgPC9hPik7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCByYXRpbmcgPSBuZXcgUmF0aW5nKCk7XHJcblxyXG5jb25zdCBjb3VudHJpZXMgPSB7XHJcbiAgXCJBRlwiOlwiQWZnaGFuaXN0YW5cIixcIkFMXCI6XCJBbGJhbmlhXCIsXCJEWlwiOlwiQWxnZXJpYVwiLFwiQURcIjpcIkFuZG9ycmFcIixcIkFPXCI6XCJBbmdvbGFcIixcIkFHXCI6XCJBbnRpZ3VhIGFuZCBCYXJidWRhXCIsXCJBUlwiOlwiQXJnZW50aW5hXCIsXCJBTVwiOlwiQXJtZW5pYVwiLFwiQVVcIjpcIkF1c3RyYWxpYVwiLFwiQVRcIjpcIkF1c3RyaWFcIixcIkFaXCI6XCJBemVyYmFpamFuXCIsXCJCU1wiOlwiQmFoYW1hc1wiLFwiQkhcIjpcIkJhaHJhaW5cIixcIkJEXCI6XCJCYW5nbGFkZXNoXCIsXCJCQlwiOlwiQmFyYmFkb3NcIixcIkJZXCI6XCJCZWxhcnVzXCIsXCJCRVwiOlwiQmVsZ2l1bVwiLFwiQlpcIjpcIkJlbGl6ZVwiLFwiQkpcIjpcIkJlbmluXCIsXCJCVFwiOlwiQmh1dGFuXCIsXCJCT1wiOlwiQm9saXZpYVwiLFwiQkFcIjpcIkJvc25pYSBhbmQgSGVyemVnb3ZpbmFcIixcIkJXXCI6XCJCb3Rzd2FuYVwiLFwiQlJcIjpcIkJyYXppbFwiLFwiQk5cIjpcIkJydW5laVwiLFwiQkdcIjpcIkJ1bGdhcmlhXCIsXCJCRlwiOlwiQnVya2luYSBGYXNvXCIsXCJCSVwiOlwiQnVydW5kaVwiLFwiS0hcIjpcIkNhbWJvZGlhXCIsXCJDTVwiOlwiQ2FtZXJvb25cIixcIkNBXCI6XCJDYW5hZGFcIixcIkNWXCI6XCJDYXBlIFZlcmRlXCIsXCJDRlwiOlwiQ2VudHJhbCBBZnJpY2FuIFJlcHVibGljXCIsXCJURFwiOlwiQ2hhZFwiLFwiQ0xcIjpcIkNoaWxlXCIsXCJDTlwiOlwiQ2hpbmFcIixcIkNPXCI6XCJDb2xvbWJpYVwiLFwiS01cIjpcIkNvbW9yb3NcIixcIkNLXCI6XCJDb29rXCIsXCJDUlwiOlwiQ29zdGEgUmljYVwiLFwiSFJcIjpcIkNyb2F0aWFcIixcIkNVXCI6XCJDdWJhXCIsXCJDWVwiOlwiQ3lwcnVzXCIsXCJDWlwiOlwiQ3plY2ggUmVwdWJsaWNcIixcIkNJXCI6XCJDw7R0ZSBkXFwnSXZvaXJlXCIsXCJDRFwiOlwiRGVtb2NyYXRpYyBSZXB1YmxpYyBvZiB0aGUgQ29uZ29cIixcIkRLXCI6XCJEZW5tYXJrXCIsXCJESlwiOlwiRGppYm91dGlcIixcIkRNXCI6XCJEb21pbmljYVwiLFwiRE9cIjpcIkRvbWluaWNhbiBSZXB1YmxpY1wiLFwiRUNcIjpcIkVjdWFkb3JcIixcIkVHXCI6XCJFZ3lwdFwiLFwiU1ZcIjpcIkVsIFNhbHZhZG9yXCIsXCJHUVwiOlwiRXF1YXRvcmlhbCBHdWluZWFcIixcIkVSXCI6XCJFcml0cmVhXCIsXCJFRVwiOlwiRXN0b25pYVwiLFwiRVRcIjpcIkV0aGlvcGlhXCIsXCJGSlwiOlwiRmlqaVwiLFwiRklcIjpcIkZpbmxhbmRcIixcIk1LXCI6XCJGb3JtZXIgWXVnb3NsYXYgUmVwdWJsaWMgb2YgTWFjZWRvbmlhXCIsXCJGUlwiOlwiRnJhbmNlXCIsXCJHQVwiOlwiR2Fib25cIixcIkdNXCI6XCJHYW1iaWFcIixcIkdFXCI6XCJHZW9yZ2lhXCIsXCJERVwiOlwiR2VybWFueVwiLFwiR0hcIjpcIkdoYW5hXCIsXCJHUlwiOlwiR3JlZWNlXCIsXCJHRFwiOlwiR3JlbmFkYVwiLFwiR1RcIjpcIkd1YXRlbWFsYVwiLFwiR05cIjpcIkd1aW5lYVwiLFwiR1dcIjpcIkd1aW5lYS1CaXNzYXVcIixcIkdZXCI6XCJHdXlhbmFcIixcIkhLXCI6XCJIb25nIEtvbmdcIixcIkhUXCI6XCJIYWl0aVwiLFwiSE5cIjpcIkhvbmR1cmFzXCIsXCJIVVwiOlwiSHVuZ2FyeVwiLFwiSVNcIjpcIkljZWxhbmRcIixcIklOXCI6XCJJbmRpYVwiLFwiSURcIjpcIkluZG9uZXNpYVwiLFwiSVJcIjpcIklyYW5cIixcIklRXCI6XCJJcmFxXCIsXCJJRVwiOlwiSXJlbGFuZFwiLFwiSUxcIjpcIklzcmFlbFwiLFwiSVRcIjpcIkl0YWx5XCIsXCJKTVwiOlwiSmFtYWljYVwiLFwiSlBcIjpcIkphcGFuXCIsXCJKT1wiOlwiSm9yZGFuXCIsXCJLWlwiOlwiS2F6YWtoc3RhblwiLFwiS0VcIjpcIktlbnlhXCIsXCJLSVwiOlwiS2lyaWJhdGlcIixcIktXXCI6XCJLdXdhaXRcIixcIktHXCI6XCJLeXJneXogUmVwdWJsaWNcIixcIkxBXCI6XCJMYW9zXCIsXCJMVlwiOlwiTGF0dmlhXCIsXCJMQlwiOlwiTGViYW5vblwiLFwiTFNcIjpcIkxlc290aG9cIixcIkxSXCI6XCJMaWJlcmlhXCIsXCJMWVwiOlwiTGlieWFcIixcIkxJXCI6XCJMaWVjaHRlbnN0ZWluXCIsXCJMVFwiOlwiTGl0aHVhbmlhXCIsXCJMVVwiOlwiTHV4ZW1ib3VyZ1wiLFwiTUdcIjpcIk1hZGFnYXNjYXJcIixcIk1XXCI6XCJNYWxhd2lcIixcIk1ZXCI6XCJNYWxheXNpYVwiLFwiTVZcIjpcIk1hbGRpdmVzXCIsXCJNTFwiOlwiTWFsaVwiLFwiTVRcIjpcIk1hbHRhXCIsXCJNSFwiOlwiTWFyc2hhbGxcIixcIk1SXCI6XCJNYXVyaXRhbmlhXCIsXCJNVVwiOlwiTWF1cml0aXVzXCIsXCJNWFwiOlwiTWV4aWNvXCIsXCJGTVwiOlwiTWljcm9uZXNpYVwiLFwiTURcIjpcIk1vbGRvdmFcIixcIk1DXCI6XCJNb25hY29cIixcIk1OXCI6XCJNb25nb2xpYVwiLFwiTUVcIjpcIk1vbnRlbmVncm9cIixcIk1BXCI6XCJNb3JvY2NvXCIsXCJNWlwiOlwiTW96YW1iaXF1ZVwiLFwiTU1cIjpcIk15YW5tYXJcIixcIk5BXCI6XCJOYW1pYmlhXCIsXCJOUlwiOlwiTmF1cnVcIixcIk5QXCI6XCJOZXBhbFwiLFwiTkxcIjpcIk5ldGhlcmxhbmRzXCIsXCJOWlwiOlwiTmV3IFplYWxhbmRcIixcIk5JXCI6XCJOaWNhcmFndWFcIixcIk5FXCI6XCJOaWdlclwiLFwiTkdcIjpcIk5pZ2VyaWFcIixcIk5VXCI6XCJOaXVlXCIsXCJOT1wiOlwiTm9yd2F5XCIsXCJPTVwiOlwiT21hblwiLFwiUEtcIjpcIlBha2lzdGFuXCIsXCJQV1wiOlwiUGFsYXVcIixcIlBTXCI6XCJQYWxlc3RpbmVcIixcIlBBXCI6XCJQYW5hbWFcIixcIlBHXCI6XCJQYXB1YSBOZXcgR3VpbmVhXCIsXCJQWVwiOlwiUGFyYWd1YXlcIixcIlBFXCI6XCJQZXJ1XCIsXCJQSFwiOlwiUGhpbGlwcGluZXNcIixcIlBMXCI6XCJQb2xhbmRcIixcIlBUXCI6XCJQb3J0dWdhbFwiLFwiUUFcIjpcIlFhdGFyXCIsXCJDR1wiOlwiUmVwdWJsaWMgb2YgQ29uZ29cIixcIktSXCI6XCJSZXB1YmxpYyBvZiBLb3JlYVwiLFwiWkFcIjpcIlJlcHVibGljIG9mIFNvdXRoIEFmcmljYVwiLFwiUk9cIjpcIlJvbWFuaWFcIixcIlJVXCI6XCJSdXNzaWFcIixcIlJXXCI6XCJSd2FuZGFcIixcIktOXCI6XCJTYWludCBDaHJpc3RvcGhlciBhbmQgTmV2aXNcIixcIkxDXCI6XCJTYWludCBMdWNpYVwiLFwiVkNcIjpcIlNhaW50IFZpbmNlbnRcIixcIldTXCI6XCJTYW1vYVwiLFwiU01cIjpcIlNhbiBNYXJpbm9cIixcIlNUXCI6XCJTYW8gVG9tZSBhbmQgUHJpbmNpcGVcIixcIlNBXCI6XCJTYXVkaSBBcmFiaWFcIixcIlNOXCI6XCJTZW5lZ2FsXCIsXCJSU1wiOlwiU2VyYmlhXCIsXCJTQ1wiOlwiU2V5Y2hlbGxlc1wiLFwiU0xcIjpcIlNpZXJyYSBMZW9uZVwiLFwiU0dcIjpcIlNpbmdhcG9yZVwiLFwiU0tcIjpcIlNsb3Zha2lhXCIsXCJTSVwiOlwiU2xvdmVuaWFcIixcIlNCXCI6XCJTb2xvbW9uXCIsXCJTT1wiOlwiU29tYWxpYVwiLFwiU1NcIjpcIlNvdXRoIFN1ZGFuXCIsXCJFU1wiOlwiU3BhaW5cIixcIkxLXCI6XCJTcmkgTGFua2FcIixcIlNEXCI6XCJTdWRhblwiLFwiU1JcIjpcIlN1cmluYW1lXCIsXCJTWlwiOlwiU3dhemlsYW5kXCIsXCJTRVwiOlwiU3dlZGVuXCIsXCJDSFwiOlwiU3dpdHplcmxhbmRcIixcIlNZXCI6XCJTeXJpYVwiLFwiVFdcIjpcIlRhaXdhblwiLFwiVEpcIjpcIlRhamlraXN0YW5cIixcIlRaXCI6XCJUYW56YW5pYVwiLFwiVEhcIjpcIlRoYWlsYW5kXCIsXCJUTFwiOlwiVGltb3ItTGVzdGVcIixcIlRHXCI6XCJUb2dvXCIsXCJUT1wiOlwiVG9uZ2FcIixcIlRUXCI6XCJUcmluaWRhZCBhbmQgVG9iYWdvXCIsXCJUTlwiOlwiVHVuaXNpYVwiLFwiVFJcIjpcIlR1cmtleVwiLFwiVE1cIjpcIlR1cmttZW5pc3RhblwiLFwiVFZcIjpcIlR1dmFsdVwiLFwiVUdcIjpcIlVnYW5kYVwiLFwiVUFcIjpcIlVrcmFpbmVcIixcIkFFXCI6XCJVbml0ZWQgQXJhYiBFbWlyYXRlc1wiLFwiR0JcIjpcIlVuaXRlZCBLaW5nZG9tXCIsXCJVU1wiOlwiVW5pdGVkIFN0YXRlcyBvZiBBbWVyaWNhXCIsXCJYWFwiOlwiVW5rbm93blwiLFwiVVlcIjpcIlVydWd1YXlcIixcIlVaXCI6XCJVemJla2lzdGFuXCIsXCJWVVwiOlwiVmFudWF0dVwiLFwiVkFcIjpcIlZhdGljYW5cIixcIlZFXCI6XCJWZW5lenVlbGFcIixcIlZOXCI6XCJWaWV0IE5hbVwiLFwiWUVcIjpcIlllbWVuXCIsXCJaTVwiOlwiWmFtYmlhXCIsXCJaV1wiOlwiWmltYmFid2VcIlxyXG59O1xyXG5cclxuZXhwb3J0IHtnZXRTdGFuZGluZ3MsIGdldFNvcnRpbmdGdW5jdGlvbiwgcmF0aW5nLCBjb3VudHJpZXN9OyJdfQ==
