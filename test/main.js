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
      var twitter = this.props.row.twitter_id == "" ? "" : React.createElement(
        'div',
        { className: 'atcoder-custom-standings user-dropdown-menu' },
        'TwitterID :',
        React.createElement(
          'a',
          { href: 'https://twitter.com/' + encodeURIComponent(this.props.row.twitter_id), target: '_blank' },
          this.props.row.twitter_id
        )
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
          React.createElement(
            'span',
            { title: 'the number of rated contests' },
            'Competitions : ',
            this.props.row.competitions
          )
        ),
        React.createElement(
          'div',
          { className: 'atcoder-custom-standings user-dropdown-menu' },
          'Country : ',
          React.createElement('img', { src: '/img/flag/' + this.props.row.country + '.png', style: { verticalAlign: "middle", width: "16px", height: "16px" } }),
          _util.countries[this.props.row.country]
        ),
        twitter,
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
        if (t.score !== 0 && t.score === _this4.maxScore) {
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

},{}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0tvdS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcYXBwU2V0dGluZ3MuanMiLCJzcmNcXGNvbnRlc3REYXRhLmpzIiwic3JjXFxjb250cm9sbC5qcyIsInNyY1xcY3NzLmpzIiwic3JjXFxmaWx0ZXIuanMiLCJzcmNcXGZyaWVuZHNMaXN0LmpzIiwic3JjXFxtYWluLmpzIiwic3JjXFxtb2RhbC5qcyIsInNyY1xccGFnZXIuanMiLCJzcmNcXHJlbG9hZC5qcyIsInNyY1xcc2V0dGluZ3MuanMiLCJzcmNcXHNvcnRpbmcuanMiLCJzcmNcXHN0YW5kaW5ncy5qcyIsInNyY1xcc3RhdHMuanMiLCJzcmNcXHN0YXRzXFxjaGFydENvbXBvbmVudC5qcyIsInNyY1xcc3RhdHNcXHN1bW1hcnkuanMiLCJzcmNcXHN0YXRzXFx0YXNrLmpzIiwic3JjXFx1c2VyaW5mby5qcyIsInNyY1xcdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7O0lBQVksSTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCLHNCOzs7QUFDbkIsb0NBQWE7QUFBQTs7QUFBQTs7QUFFWCxVQUFLLEtBQUwsR0FBYSxFQUFiO0FBQ0EsVUFBSyxLQUFMLENBQVcsUUFBWCxHQUF1QiwwQkFBaUIsSUFBakIsQ0FBdkI7QUFDQSxVQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXVCLDBCQUFpQixJQUFqQixDQUF2Qjs7QUFFQSxTQUFLLFlBQUwsQ0FBbUIsVUFBQyxDQUFELEVBQU87QUFDeEIsWUFBSyxTQUFMLEdBQWlCLENBQWpCO0FBQ0QsS0FGRCxFQUVJLElBRko7O0FBSUEsVUFBSyxPQUFMLEdBQWdCLDJCQUFo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RDFuRyxFQUNvb0csTUFBSyxTQUR6b0csRUFDbXBHLE1BQUssV0FEeHBHLEVBQ29xRyxNQUFLLFVBRHpxRyxFQUNvckcsTUFBSyxPQUR6ckcsRUFDaXNHLE1BQUssUUFEdHNHLEVBQytzRyxNQUFLO0FBRHB0RyxDQUFsQjs7UUFJUSxZLEdBQUEsWTtRQUFjLGtCLEdBQUEsa0I7UUFBb0IsTSxHQUFBLE07UUFBUSxTLEdBQUEsUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4vdXRpbC5qcyc7XHJcbmltcG9ydCBBcHBTZXR0aW5ncyBmcm9tICcuL2FwcFNldHRpbmdzLmpzJztcclxuaW1wb3J0IEZyaWVuZHNMaXN0IGZyb20gJy4vZnJpZW5kc0xpc3QuanMnO1xyXG5pbXBvcnQgQ29udGVzdERhdGEgZnJvbSAnLi9jb250ZXN0RGF0YS5qcyc7XHJcbmltcG9ydCBTdGF0cyBmcm9tICcuL3N0YXRzLmpzJztcclxuaW1wb3J0IENvbnRyb2xsIGZyb20gJy4vY29udHJvbGwuanMnO1xyXG5pbXBvcnQgU3RhbmRpbmdzIGZyb20gJy4vc3RhbmRpbmdzLmpzJztcclxuaW1wb3J0IFBhZ2VyIGZyb20gJy4vcGFnZXIuanMnO1xyXG5pbXBvcnQgTWUgZnJvbSAnLi91c2VyaW5mby5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdENvZGVyQ3VzdG9tU3RhbmRpbmdzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7fTtcclxuICAgIHRoaXMuc3RhdGUuc2V0dGluZ3MgID0gbmV3IEFwcFNldHRpbmdzKCB0cnVlICk7XHJcbiAgICB0aGlzLnN0YXRlLmZyaWVuZHMgICA9IG5ldyBGcmllbmRzTGlzdCggdHJ1ZSApO1xyXG5cclxuICAgIHV0aWwuZ2V0U3RhbmRpbmdzKCAocykgPT4ge1xyXG4gICAgICB0aGlzLnN0YW5kaW5ncyA9IHM7XHJcbiAgICB9ICwgdHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5jb250ZXN0ICA9IG5ldyBDb250ZXN0RGF0YSgpO1xyXG5cclxuICAgIHRoaXMuc3RhdGUuZmlsdGVyZWRTdGFuZGluZ3MgPSB0aGlzLmdldEZpbHRlcmVkU3RhbmRpbmdzKCB0aGlzLnN0YXRlLnNldHRpbmdzICk7XHJcbiAgICB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID0gMDsgLy96ZXJvLWluZGV4ZWRcclxuICAgIHRoaXMuc3RhdGUudG90YWxQYWdlICAgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKCAodGhpcy5zdGF0ZS5maWx0ZXJlZFN0YW5kaW5ncy5sZW5ndGggKyB0aGlzLnN0YXRlLnNldHRpbmdzLnBhZ2VTaXplIC0gMSkgLyB0aGlzLnN0YXRlLnNldHRpbmdzLnBhZ2VTaXplICkgKTtcclxuXHJcbiAgICB0aGlzLmdldEZpbHRlcmVkU3RhbmRpbmdzLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmdldEZpbHRlcmVkU3RhbmRpbmdzVG9SZW5kZXIuYmluZCh0aGlzKTtcclxuICAgIHRoaXMudXBkYXRlU3RhbmRpbmdzLmJpbmQodGhpcyk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVGcmllbmRzLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnVwZGF0ZVNldHRpbmdzLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTZXR0aW5ncyggbmV3U2V0dGluZ3MgKXtcclxuICAgIG5ld1NldHRpbmdzLnNhdmUoKTtcclxuICAgIHRoaXMuc2V0U3RhdGUoIChwcmV2U3RhdGUpID0+IHtcclxuICAgICAgY29uc3QgbmV3RmlsdGVyZWRTdGFuZGluZ3MgPSB0aGlzLmdldEZpbHRlcmVkU3RhbmRpbmdzKCBuZXdTZXR0aW5ncyApO1xyXG4gICAgICBjb25zdCB0b3RhbFBhZ2UgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKCAobmV3RmlsdGVyZWRTdGFuZGluZ3MubGVuZ3RoICsgbmV3U2V0dGluZ3MucGFnZVNpemUgLSAxKSAvIG5ld1NldHRpbmdzLnBhZ2VTaXplICkgKTtcclxuICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSBNYXRoLm1pbih0b3RhbFBhZ2UtMSwgIHByZXZTdGF0ZS5jdXJyZW50UGFnZSk7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNldHRpbmdzIDogbmV3U2V0dGluZ3MsXHJcbiAgICAgICAgZmlsdGVyZWRTdGFuZGluZ3MgOiBuZXdGaWx0ZXJlZFN0YW5kaW5ncyxcclxuICAgICAgICB0b3RhbFBhZ2UgOiB0b3RhbFBhZ2UsXHJcbiAgICAgICAgY3VycmVudFBhZ2UgOiBjdXJyZW50UGFnZVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVGcmllbmRzKCBoYW5kbGVOYW1lcywgYWRkaW5nICl7XHJcbiAgICB0aGlzLnNldFN0YXRlKCAocHJldlN0YXRlKSA9PiB7XHJcbiAgICAgIGxldCBuZXdGcmllbmRzID0gbmV3IEZyaWVuZHNMaXN0KCBmYWxzZSApO1xyXG4gICAgICBuZXdGcmllbmRzLmZyaWVuZHMgPSBuZXcgU2V0KCBwcmV2U3RhdGUuZnJpZW5kcy5nZXRMaXN0KCkgKTtcclxuICAgICAgaWYoIGFkZGluZyA9PT0gdHJ1ZSApe1xyXG4gICAgICAgIG5ld0ZyaWVuZHMuYWRkKGhhbmRsZU5hbWVzKTtcclxuICAgICAgfWVsc2UgaWYoIGFkZGluZyA9PT0gZmFsc2UgKXtcclxuICAgICAgICBuZXdGcmllbmRzLnJlbW92ZShoYW5kbGVOYW1lcyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHsgZnJpZW5kcyA6IG5ld0ZyaWVuZHMgfTtcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVN0YW5kaW5ncygpe1xyXG4gICAgY29uc29sZS5sb2coXCJzdGFydGVkIHVwZGF0aW5nXCIpO1xyXG5cclxuICAgIHV0aWwuZ2V0U3RhbmRpbmdzKCAocykgPT4ge1xyXG4gICAgICB0aGlzLnN0YW5kaW5ncyA9IHM7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoIChwcmV2U3RhdGUpID0+IHtcclxuICAgICAgICBjb25zdCBuZXdGaWx0ZXJlZFN0YW5kaW5ncyA9IHRoaXMuZ2V0RmlsdGVyZWRTdGFuZGluZ3MoIHRoaXMuc3RhdGUuc2V0dGluZ3MgKTtcclxuICAgICAgICBjb25zdCB0b3RhbFBhZ2UgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKCAobmV3RmlsdGVyZWRTdGFuZGluZ3MubGVuZ3RoICsgdGhpcy5zdGF0ZS5zZXR0aW5ncy5wYWdlU2l6ZSAtIDEpIC8gdGhpcy5zdGF0ZS5zZXR0aW5ncy5wYWdlU2l6ZSApICk7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFBhZ2UgPSBNYXRoLm1pbih0b3RhbFBhZ2UtMSwgIHByZXZTdGF0ZS5jdXJyZW50UGFnZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBmaWx0ZXJlZFN0YW5kaW5ncyA6IG5ld0ZpbHRlcmVkU3RhbmRpbmdzLFxyXG4gICAgICAgICAgdG90YWxQYWdlIDogdG90YWxQYWdlLFxyXG4gICAgICAgICAgY3VycmVudFBhZ2UgOiBjdXJyZW50UGFnZVxyXG4gICAgICAgIH07XHJcbiAgICAgIH0gKTtcclxuICAgICAgY29uc29sZS5sb2coIFwic3RhbmRpbmdzIHVwZGF0aW5nIHN1Y2Nlc3NmdWxseSBjb21wbGV0ZWRcIiApO1xyXG4gICAgfSAsIGZhbHNlKTtcclxuICB9XHJcblxyXG5cclxuICBnZXRGaWx0ZXJlZFN0YW5kaW5ncyhzZXR0aW5ncyl7XHJcbiAgICBjb25zdCByID0gdXRpbC5yYXRpbmc7XHJcbiAgICBsZXQgbmFtZVJlZztcclxuICAgIHRyeXtcclxuICAgICAgbmFtZVJlZyA9IG5ldyBSZWdFeHAoIFwiXlwiICsgc2V0dGluZ3MuZmlsdGVyTmFtZSAsIFwiaVwiKTtcclxuICAgIH1jYXRjaChlKXtcclxuICAgICAgbmFtZVJlZyA9IG5ldyBSZWdFeHAoIFwiXCIgKTtcclxuICAgIH1cclxuICAgIGxldCBmU3RhbmRpbmdzID0gdGhpcy5zdGFuZGluZ3MuZmlsdGVyKCByb3cgPT4ge1xyXG4gICAgICBpZihzZXR0aW5ncy5maWx0ZXJCeUZyaWVuZHMgPT09IHRydWUpe1xyXG4gICAgICAgIGlmKHRoaXMuc3RhdGUuZnJpZW5kcy5pc0ZyaWVuZCggcm93LnVzZXJfc2NyZWVuX25hbWUgKSA9PT0gZmFsc2UgJiZcclxuICAgICAgICAgICByb3cudXNlcl9zY3JlZW5fbmFtZSAhPT0gTWUudXNlcl9zY3JlZW5fbmFtZSl7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKHNldHRpbmdzLmZpbHRlckJ5Q291bnRyeSA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgaWYoIHJvdy5jb3VudHJ5ICE9PSBzZXR0aW5ncy5maWx0ZXJDb3VudHJ5ICl7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKHNldHRpbmdzLmZpbHRlckJ5UmF0aW5nID09PSB0cnVlKXtcclxuICAgICAgICAvLyByYXRpbmcgZmlsdGVyIGZ1bmN0aW9uXHJcbiAgICAgICAgLy8gcm93LnJhdGluZ1xyXG4gICAgICAgIGNvbnN0IGxldmVsID0gci5nZXRMZXZlbCggcm93LnJhdGluZyApO1xyXG4gICAgICAgIGlmKCBzZXR0aW5ncy5maWx0ZXJSYXRpbmcuaGFzKGxldmVsKSA9PT0gZmFsc2UgKXtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYoc2V0dGluZ3MuZmlsdGVyQnlOYW1lID09PSB0cnVlKXtcclxuICAgICAgICBpZiggbmFtZVJlZy5leGVjKCByb3cudXNlcl9zY3JlZW5fbmFtZSApID09PSBudWxsICYmIG5hbWVSZWcuZXhlYyggcm93LnVzZXJfbmFtZSApID09PSBudWxsICl7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSApO1xyXG5cclxuICAgIGlmKCBzZXR0aW5ncy5zb3J0aW5nRW5hYmxlZCA9PT0gdHJ1ZSApe1xyXG4gICAgICBsZXQgZiA9IHV0aWwuZ2V0U29ydGluZ0Z1bmN0aW9uKCBzZXR0aW5ncy5zb3J0aW5nS2V5ICk7XHJcbiAgICAgIGlmKCBzZXR0aW5ncy5zb3J0aW5nT3JkZXIgPT09IFwiYXNjZW5kaW5nXCIpIHJldHVybiBmU3RhbmRpbmdzLnNvcnQoIGYgKTtcclxuICAgICAgZWxzZSByZXR1cm4gZlN0YW5kaW5ncy5zb3J0KCAoYSxiKT0+ZihhLGIpKi0xICk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuIGZTdGFuZGluZ3M7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRGaWx0ZXJlZFN0YW5kaW5nc1RvUmVuZGVyKCl7XHJcbiAgICBjb25zdCBwYWdlQmVnaW4gPSB0aGlzLnN0YXRlLnNldHRpbmdzLnBhZ2VTaXplICogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZTtcclxuICAgIGNvbnN0IHBhZ2VFbmQgICA9IHRoaXMuc3RhdGUuc2V0dGluZ3MucGFnZVNpemUgKiAodGhpcy5zdGF0ZS5jdXJyZW50UGFnZSsxKTtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLmZpbHRlcmVkU3RhbmRpbmdzLnNsaWNlKCBwYWdlQmVnaW4sIHBhZ2VFbmQgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgY29uc3QgcGFnZU1lID0gKCgpPT57XHJcbiAgICAgIGNvbnN0IHBvcyA9IHRoaXMuc3RhdGUuZmlsdGVyZWRTdGFuZGluZ3MuZmluZEluZGV4KCAocm93KT0+e3JldHVybiByb3cudXNlcl9zY3JlZW5fbmFtZSA9PT0gTWUudXNlcl9zY3JlZW5fbmFtZX0gKTtcclxuICAgICAgaWYoIHBvcyA9PT0gLTEgKSByZXR1cm4gbnVsbDtcclxuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoIHBvcy90aGlzLnN0YXRlLnNldHRpbmdzLnBhZ2VTaXplICk7XHJcbiAgICB9KSgpO1xyXG4gICAgbGV0IHMgPSB0aGlzLmdldEZpbHRlcmVkU3RhbmRpbmdzVG9SZW5kZXIoKTtcclxuICAgIGxldCBjb21wb25lbnRzID0gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxDb250cm9sbCBzdGFuZGluZ3M9e3RoaXMuc3RhbmRpbmdzfVxyXG4gICAgICAgICAgICAgICAgICB1cGRhdGVGdW5jPXsoKT0+dGhpcy51cGRhdGVTdGFuZGluZ3MoKX1cclxuICAgICAgICAgICAgICAgICAgY29udGVzdD17dGhpcy5jb250ZXN0fVxyXG4gICAgICAgICAgICAgICAgICBzZXR0aW5ncz17dGhpcy5zdGF0ZS5zZXR0aW5nc31cclxuICAgICAgICAgICAgICAgICAgc2V0dGluZ3NVcGRhdGVGdW5jPXsgKG5ld1NldHRpbmdzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2V0dGluZ3MobmV3U2V0dGluZ3MpO1xyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICBmcmllbmRzPXt0aGlzLnN0YXRlLmZyaWVuZHN9XHJcbiAgICAgICAgICAgICAgICAgIGZyaWVuZHNVcGRhdGVGdW5jPXsobmFtZSwgYWRkaW5nKT0+dGhpcy51cGRhdGVGcmllbmRzKG5hbWUsYWRkaW5nKX1cclxuICAgICAgICAgICAgICAgICAgZ2V0QWN0aXZlQ291bnRyaWVzPXsoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4uKG5ldyBTZXQoIHRoaXMuc3RhbmRpbmdzLm1hcCggKGUpPT5lLmNvdW50cnkgKSApKV0uc29ydCggKGEsYik9PiB7cmV0dXJuIHV0aWwuY291bnRyaWVzW2FdIDwgdXRpbC5jb3VudHJpZXNbYl0gPyAtMSA6IDE7fSApO1xyXG4gICAgICAgICAgICAgICAgICB9fS8+XHJcbiAgICAgICAgPFBhZ2VyIGN1cnJlbnQ9e3RoaXMuc3RhdGUuY3VycmVudFBhZ2V9IHRvdGFsPXt0aGlzLnN0YXRlLnRvdGFsUGFnZX1cclxuICAgICAgICAgICAgICAgbWU9e3BhZ2VNZX1cclxuICAgICAgICAgICAgICAgb25DbGlja0Z1bmM9eyAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSBOdW1iZXIoIGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlJykgKTtcclxuICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKCB7Y3VycmVudFBhZ2UgOiBwYWdlfSApO1xyXG4gICAgICAgICAgICAgICB9IH0vPlxyXG4gICAgICAgIDxTdGFuZGluZ3Mgc3RhbmRpbmdzPXtzfVxyXG4gICAgICAgICAgICAgICAgICAgdGFza0RhdGE9e3RoaXMuY29udGVzdC50YXNrc31cclxuICAgICAgICAgICAgICAgICAgIGNvbnRlc3RFbmRlZD17dGhpcy5jb250ZXN0LmNvbnRlc3RFbmRlZH1cclxuICAgICAgICAgICAgICAgICAgIHNldHRpbmdzPXt0aGlzLnN0YXRlLnNldHRpbmdzfVxyXG4gICAgICAgICAgICAgICAgICAgZnJpZW5kcz17dGhpcy5zdGF0ZS5mcmllbmRzfVxyXG4gICAgICAgICAgICAgICAgICAgZnJpZW5kc1VwZGF0ZUZ1bmM9eyhuYW1lLCBhZGRpbmcpPT50aGlzLnVwZGF0ZUZyaWVuZHMobmFtZSxhZGRpbmcpfVxyXG4gICAgICAgICAgICAgICAgICAgb2ZmU2V0PXt0aGlzLnN0YXRlLmN1cnJlbnRQYWdlKnRoaXMuc3RhdGUuc2V0dGluZ3MucGFnZVNpemV9Lz5cclxuICAgICAgICA8UGFnZXIgY3VycmVudD17dGhpcy5zdGF0ZS5jdXJyZW50UGFnZX0gdG90YWw9e3RoaXMuc3RhdGUudG90YWxQYWdlfVxyXG4gICAgICAgICAgICAgICBtZT17cGFnZU1lfVxyXG4gICAgICAgICAgICAgICBvbkNsaWNrRnVuYz17IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSBOdW1iZXIoIGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wYWdlJykgKTtcclxuICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKCB7Y3VycmVudFBhZ2UgOiBwYWdlfSApO1xyXG4gICAgICAgICAgICAgICB9IH0vPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgICByZXR1cm4gY29tcG9uZW50cztcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwU2V0dGluZ3N7XHJcbiAgY29uc3RydWN0b3IoIGxvYWQgKXtcclxuICAgIC8vb3B0aW9uc1xyXG4gICAgdGhpcy5oaWdobGlnaHRGcmllbmRzICAgPSB0cnVlO1xyXG4gICAgdGhpcy5kaXNhYmxlUmF0aW5nQ29sb3IgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzcGxheU5hbWVTdHlsZSAgID0gXCJ1c2VyX3NjcmVlbl9uYW1lXCI7XHJcbiAgICB0aGlzLnBhZ2VTaXplICAgICAgICAgICA9IDUwO1xyXG4gICAgdGhpcy5zaG93TmF0aW9uYWxGbGFnICAgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuc2F2ZUZpbHRlcmluZ1N0YXRlID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5maWx0ZXJDb3VudHJ5ICAgID0gbnVsbDtcclxuICAgIHRoaXMuZmlsdGVyUmF0aW5nICAgICA9IG5ldyBTZXQoWzEsMiwzLDQsNSw2LDcsOCw5XSk7XHJcblxyXG4gICAgdGhpcy5maWx0ZXJCeUZyaWVuZHMgPSBmYWxzZTtcclxuICAgIHRoaXMuZmlsdGVyQnlDb3VudHJ5ID0gZmFsc2U7XHJcbiAgICB0aGlzLmZpbHRlckJ5UmF0aW5nICA9IGZhbHNlO1xyXG4gICAgdGhpcy5maWx0ZXJCeU5hbWUgICAgPSBmYWxzZTtcclxuICAgIHRoaXMuZmlsdGVyTmFtZSAgICAgID0gXCJcIjtcclxuXHJcbiAgICBpZihsb2FkID09PSB0cnVlKSB0aGlzLmxvYWQoKTtcclxuXHJcbiAgICBpZiggdGhpcy5zYXZlRmlsdGVyaW5nU3RhdGUgPT09IGZhbHNlICl7XHJcbiAgICAgIC8vcmVzZXQgdGVtcG9yYXJ5IG9wdGlvbnNcclxuICAgICAgdGhpcy5maWx0ZXJCeUZyaWVuZHMgPSBmYWxzZTtcclxuICAgICAgdGhpcy5maWx0ZXJCeUNvdW50cnkgPSBmYWxzZTtcclxuICAgICAgdGhpcy5maWx0ZXJCeVJhdGluZyAgPSBmYWxzZTtcclxuICAgICAgdGhpcy5maWx0ZXJCeU5hbWUgICAgPSBmYWxzZTtcclxuICAgICAgdGhpcy5maWx0ZXJOYW1lICAgICAgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc29ydGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgIC8vIFwicmFua1wiLCBcInVzZXJfc2NyZWVuX25hbWVcIiwgXCJyYXRpbmdcIiwgXCJjb3VudHJ5XCIsIFwiY29tcGV0aXRpb25zXCIsIFwidGFza3tpfVwiXHJcbiAgICB0aGlzLnNvcnRpbmdLZXkgICAgID0gXCJyYW5rXCI7XHJcbiAgICB0aGlzLnNvcnRpbmdPcmRlciAgID0gXCJhc2NlbmRpbmdcIjtcclxuXHJcbiAgICB0aGlzLmxvYWQuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuc2F2ZS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgbG9hZCgpe1xyXG4gICAgLy9sb2FkXHJcbiAgICB0cnl7XHJcbiAgICAgIGNvbnN0IHNldHRpbmdzID0gSlNPTi5wYXJzZSggR01fZ2V0VmFsdWUoJ3NldHRpbmdzJywgJ3t9JykgKTtcclxuICAgICAgT2JqZWN0LmFzc2lnbiggdGhpcywgc2V0dGluZ3MpO1xyXG4gICAgICBpZiggdGhpcy5maWx0ZXJSYXRpbmcgPT09IHVuZGVmaW5lZCkgdGhpcy5maWx0ZXJSYXRpbmcgPSBuZXcgU2V0KFsxLDIsMyw0LDUsNiw3LDgsOV0pO1xyXG4gICAgICBlbHNlIHRoaXMuZmlsdGVyUmF0aW5nID0gbmV3IFNldCh0aGlzLmZpbHRlclJhdGluZyk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcImxvYWRlZCA6IHNldHRpbmdzXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzKTtcclxuICAgIH1jYXRjaChlKXtcclxuICAgICAgY29uc29sZS5sb2coXCJmYWlsZCB0byBsb2FkIHNldHRpbmdzXCIpO1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2F2ZSgpe1xyXG4gICAgLy9zYXZlXHJcbiAgICB0aGlzLmZpbHRlclJhdGluZyA9IFsuLi50aGlzLmZpbHRlclJhdGluZ107XHJcblxyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzKTtcclxuICAgIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KCBzZXR0aW5ncyApO1xyXG5cclxuICAgIHRoaXMuZmlsdGVyUmF0aW5nID0gbmV3IFNldCh0aGlzLmZpbHRlclJhdGluZyk7XHJcblxyXG4gICAgR01fc2V0VmFsdWUoJ3NldHRpbmdzJywgc3RyKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInNhdmVkIDogc2V0dGluZ3NcIik7XHJcbiAgICBjb25zb2xlLmxvZyhzdHIpO1xyXG4gIH1cclxuXHJcbiAgaXNGaWx0ZXJzRW5hYmxlZCgpe1xyXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyQnlGcmllbmRzIHx8IHRoaXMuZmlsdGVyQnlDb3VudHJ5IHx8IHRoaXMuZmlsdGVyQnlSYXRpbmcgfHwgdGhpcy5maWx0ZXJCeU5hbWU7XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGVzdERhdGF7XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHRoaXMuY29udHN0TmFtZSA9ICQoXCJkaXYuY29udGFpbmVyID4gYS5icmFuZCA+IHNwYW4uY29udGVzdC1uYW1lXCIpLnRleHQoKTtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoIERhdGUucGFyc2UoJCgndGltZSNjb250ZXN0LXN0YXJ0LXRpbWUnKS50ZXh0KCkpICk7XHJcbiAgICB0aGlzLmVuZFRpbWUgICA9IG5ldyBEYXRlKCBEYXRlLnBhcnNlKCQoJ3RpbWUjY29udGVzdC1lbmQtdGltZScpLnRleHQoKSkgKTtcclxuXHJcbiAgICB0aGlzLmNvbnRlc3RFbmRlZCA9IChuZXcgRGF0ZSgpKSA+PSB0aGlzLmVuZFRpbWU7XHJcblxyXG4gICAgY29uc3QgdGhlYWQgPSAgJCgnI2NvbnRlc3Qtc3RhbmRpbmdzID4gdGhlYWQgPiB0ciA+IHRoJyk7XHJcbiAgICB0aGlzLm51bVRhc2tzID0gdGhlYWQubGVuZ3RoIC0gMztcclxuICAgIHRoaXMudGFza3MgPSBuZXcgQXJyYXkoIHRoaXMubnVtVGFza3MgKTtcclxuICAgIGZvcihsZXQgaT0wOyBpPHRoaXMubnVtVGFza3M7IGkrKyl7XHJcbiAgICAgIGNvbnN0IHRhc2tOYW1lID0gdGhlYWQuZ2V0KGkrMikuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2EnKVswXS50ZXh0Q29udGVudDtcclxuICAgICAgY29uc3QgdGFza1VybCAgPSB0aGVhZC5nZXQoaSsyKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpWzBdLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG4gICAgICB0aGlzLnRhc2tzW2ldID0gbmV3IFRhc2tEYXRhKCB0YXNrTmFtZSwgdGFza1VybCwgaSApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgVGFza0RhdGF7XHJcbiAgY29uc3RydWN0b3IoIG5hbWUsIHVybCwgaWQgKXtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmlkICAgPSBpZDtcclxuICAgIHRoaXMudXJsICA9IHVybDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFN0YXRzIGZyb20gJy4vc3RhdHMuanMnXHJcbmltcG9ydCBGaWx0ZXIgZnJvbSAnLi9maWx0ZXIuanMnXHJcbmltcG9ydCBTZXR0aW5ncyBmcm9tICcuL3NldHRpbmdzLmpzJ1xyXG5pbXBvcnQgU29ydGluZyBmcm9tICcuL3NvcnRpbmcuanMnXHJcbmltcG9ydCBSZWxvYWRpbmcgZnJvbSAnLi9yZWxvYWQuanMnXHJcbmltcG9ydCBBcHBTZXR0aW5ncyBmcm9tICcuL2FwcFNldHRpbmdzLmpzJztcclxuXHJcblxyXG5jbGFzcyBGcmllbmRzQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCBvcHRpb24gKXtcclxuICAgIGxldCBuZXdTZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24obmV3IEFwcFNldHRpbmdzKCksIHRoaXMucHJvcHMuc2V0dGluZ3MpO1xyXG4gICAgZm9yKGxldCBwYXJhbSBpbiBvcHRpb24pe1xyXG4gICAgICBuZXdTZXR0aW5nc1twYXJhbV0gPSBvcHRpb25bcGFyYW1dO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wcm9wcy5zZXR0aW5nc1VwZGF0ZUZ1bmMoIG5ld1NldHRpbmdzICk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBjb25zdCBidXR0b24gPSAoXHJcbiAgICAgIDxhIGhyZWY9XCIjXCJcclxuICAgICAgICAgY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzICR7IHRoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyQnlGcmllbmRzID8gXCJmaWx0ZXJpbmctZW5hYmxlZFwiIDogXCJmaWx0ZXJpbmctZGlzYWJsZWRcIn1gfT5cclxuICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnBlb3BsZTwvaT5cclxuICAgICAgICBGcmllbmRzIFxyXG4gICAgICA8L2E+XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGNvbnRyb2xsZXItYnV0dG9uXCI+XHJcbiAgICAgICAgPGRpdiBvbkNsaWNrPXsgKCkgPT4ge1xyXG4gICAgICAgICAgbGV0IG5ld1NldHRpbmdzID0gT2JqZWN0LmFzc2lnbihuZXcgQXBwU2V0dGluZ3MoKSwgdGhpcy5wcm9wcy5zZXR0aW5ncyk7XHJcbiAgICAgICAgICBuZXdTZXR0aW5nc1tcImZpbHRlckJ5RnJpZW5kc1wiXSA9ICF0aGlzLnByb3BzLnNldHRpbmdzLmZpbHRlckJ5RnJpZW5kcztcclxuICAgICAgICAgIHRoaXMucHJvcHMuc2V0dGluZ3NVcGRhdGVGdW5jKCBuZXdTZXR0aW5ncyApO1xyXG4gICAgICAgIH0gfT57YnV0dG9ufTwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgcmV0ID0gKFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcImdyaWRcIiwgZ3JpZFRlbXBsYXRlUm93czpcIjFmclwiLCBncmlkVGVtcGxhdGVDb2x1bW5zOlwiMmZyIDFmciAxZnIgMWZyIDFmciAxZnJcIn19PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tncmlkUm93OlwiMS8yXCIsIGdyaWRDb2x1bW46XCIxLzJcIiwgcGFkZGluZzpcIjRweFwifX0+XHJcbiAgICAgICAgICA8UmVsb2FkaW5nXHJcbiAgICAgICAgICAgIHVwZGF0ZUZ1bmM9e3RoaXMucHJvcHMudXBkYXRlRnVuY31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIxLzJcIiwgZ3JpZENvbHVtbjpcIjIvM1wiLCBwYWRkaW5nOlwiNHB4XCJ9fT5cclxuICAgICAgICAgIDxGcmllbmRzQnV0dG9uXHJcbiAgICAgICAgICAgIHNldHRpbmdzPXt0aGlzLnByb3BzLnNldHRpbmdzfVxyXG4gICAgICAgICAgICBzZXR0aW5nc1VwZGF0ZUZ1bmM9e3RoaXMucHJvcHMuc2V0dGluZ3NVcGRhdGVGdW5jfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7Z3JpZFJvdzpcIjEvMlwiLCBncmlkQ29sdW1uOlwiMy80XCIsIHBhZGRpbmc6XCI0cHhcIn19PlxyXG4gICAgICAgICAgPEZpbHRlclxyXG4gICAgICAgICAgICBzZXR0aW5ncz17dGhpcy5wcm9wcy5zZXR0aW5nc31cclxuICAgICAgICAgICAgc2V0dGluZ3NVcGRhdGVGdW5jPXt0aGlzLnByb3BzLnNldHRpbmdzVXBkYXRlRnVuY31cclxuICAgICAgICAgICAgZ2V0QWN0aXZlQ291bnRyaWVzPXt0aGlzLnByb3BzLmdldEFjdGl2ZUNvdW50cmllc31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIxLzJcIiwgZ3JpZENvbHVtbjpcIjQvNVwiLCBwYWRkaW5nOlwiNHB4XCJ9fT5cclxuICAgICAgICAgIDxTb3J0aW5nXHJcbiAgICAgICAgICAgIHNldHRpbmdzPXt0aGlzLnByb3BzLnNldHRpbmdzfVxyXG4gICAgICAgICAgICBjb250ZXN0PXt0aGlzLnByb3BzLmNvbnRlc3R9XHJcbiAgICAgICAgICAgIHNldHRpbmdzVXBkYXRlRnVuYz17dGhpcy5wcm9wcy5zZXR0aW5nc1VwZGF0ZUZ1bmN9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tncmlkUm93OlwiMS8yXCIsIGdyaWRDb2x1bW46XCI1LzZcIiwgcGFkZGluZzpcIjRweFwifX0+XHJcbiAgICAgICAgICA8U3RhdHNcclxuICAgICAgICAgICAgc3RhbmRpbmdzPXt0aGlzLnByb3BzLnN0YW5kaW5nc31cclxuICAgICAgICAgICAgY29udGVzdD17dGhpcy5wcm9wcy5jb250ZXN0fVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7Z3JpZFJvdzpcIjEvMlwiLCBncmlkQ29sdW1uOlwiNi83XCIsIHBhZGRpbmc6XCI0cHhcIn19PlxyXG4gICAgICAgICAgPFNldHRpbmdzXHJcbiAgICAgICAgICAgIHNldHRpbmdzPXt0aGlzLnByb3BzLnNldHRpbmdzfVxyXG4gICAgICAgICAgICBzZXR0aW5nc1VwZGF0ZUZ1bmM9e3RoaXMucHJvcHMuc2V0dGluZ3NVcGRhdGVGdW5jfVxyXG4gICAgICAgICAgICBmcmllbmRzPXt0aGlzLnByb3BzLmZyaWVuZHN9XHJcbiAgICAgICAgICAgIGZyaWVuZHNVcGRhdGVGdW5jPXt0aGlzLnByb3BzLmZyaWVuZHNVcGRhdGVGdW5jfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiByZXQ7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluamVjdEN1c3RvbUNTUygpe1xyXG4gIGxldCBjc3MgPSBgXHJcbi8qIFJ1bGVzIGZvciBzaXppbmcgdGhlIGljb24uICovXHJcbi5tYXRlcmlhbC1pY29ucy5tZC0xOCB7IGZvbnQtc2l6ZTogMThweDsgfVxyXG4ubWF0ZXJpYWwtaWNvbnMubWQtMjQgeyBmb250LXNpemU6IDI0cHg7IH1cclxuLm1hdGVyaWFsLWljb25zLm1kLTM2IHsgZm9udC1zaXplOiAzNnB4OyB9XHJcbi5tYXRlcmlhbC1pY29ucy5tZC00OCB7IGZvbnQtc2l6ZTogNDhweDsgfVxyXG5cclxuLyogUnVsZXMgZm9yIHVzaW5nIGljb25zIGFzIGJsYWNrIG9uIGEgbGlnaHQgYmFja2dyb3VuZC4gKi9cclxuLm1hdGVyaWFsLWljb25zLm1kLWRhcmsgeyBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjU0KTsgfVxyXG4ubWF0ZXJpYWwtaWNvbnMubWQtZGFyay5tZC1pbmFjdGl2ZSB7IGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMjYpOyB9XHJcblxyXG4vKiBSdWxlcyBmb3IgdXNpbmcgaWNvbnMgYXMgd2hpdGUgb24gYSBkYXJrIGJhY2tncm91bmQuICovXHJcbi5tYXRlcmlhbC1pY29ucy5tZC1saWdodCB7IGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpOyB9XHJcbi5tYXRlcmlhbC1pY29ucy5tZC1saWdodC5tZC1pbmFjdGl2ZSB7IGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyk7IH1cclxuXHJcbi8qIENvbnRyb2xsZXIgQnV0dG9uICovXHJcbi5hdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MuY29udHJvbGxlci1idXR0b24ge1xyXG59XHJcbi5hdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MuY29udHJvbGxlci1idXR0b246aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjIwLDIyMCwyMjAsMC4xKTtcclxuICBib3gtc2hhZG93OjJweCA0cHggOHB4IDBweCBncmV5O1xyXG4gIGN1cnNvcjpwb2ludGVyO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG59XHJcblxyXG4vKiBNb2RhbCAqL1xyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLm1vZGFsLWZpbHRlcntcclxuICBwb3NpdGlvbiAgICAgICAgOiBmaXhlZDtcclxuICB0b3AgICAgICAgICAgICAgOiAwO1xyXG4gIGxlZnQgICAgICAgICAgICA6IDA7XHJcbiAgd2lkdGggICAgICAgICAgIDogMTAwJTtcclxuICBoZWlnaHQgICAgICAgICAgOiAxMDAlO1xyXG4gIHBhZGRpbmctdG9wICAgICAgOiA1MHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3IgOiByZ2JhKDAsMCwwLDAuNSk7XHJcbn1cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy5tb2RhbC1jb250ZW50e1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICB0b3AgOjUwJTtcclxuICBsZWZ0OiA1MCU7XHJcbiAgei1pbmRleDoxMDUwO1xyXG4gIG92ZXJmbG93OmF1dG87XHJcbiAgYmFja2dyb3VuZC1jb2xvcjp3aGl0ZTtcclxuICBib3gtc2hhZG93OjAgM3B4IDhweCAzcHggcmdiYSgwLDAsMCwwLjMpO1xyXG4gIHdpZHRoIDogODUwcHg7XHJcbiAgaGVpZ2h0IDogNjAwcHg7XHJcbiAgbWF4LWhlaWdodCA6IDYwMHB4O1xyXG4gIG1hcmdpbiA6IC0zMDBweCAwIDAgLTQyNXB4O1xyXG4gIHBhZGRpbmc6IDI1cHg7XHJcbn1cclxuXHJcbi8qIENoZWNrIEJveCAqL1xyXG4ubWF0ZXJpYWwtaWNvbnMubWQtY2hlY2tlZCB7IGNvbG9yIDogcmdiYSgwLCAxMjIsIDIwLCAwLjkpOyB9XHJcblxyXG4vKiBSZWxvYWRpbmcgT24gT2ZmKi9cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy5yZWxvYWRpbmctZW5hYmxlZCAgeyBjb2xvcjogcmdiKDIzMCwgMTI4LCA2Myk7IH1cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy5yZWxvYWRpbmctZGlzYWJsZWQgeyBjb2xvcjogZ3JleTsgfVxyXG5cclxuLyogU29ydGluZyBPbiBPZmYqL1xyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLnNvcnRpbmctZW5hYmxlZCAgeyBjb2xvcjogcmdiKDIzMCwgMTI4LCA2Myk7IH1cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy5zb3J0aW5nLWRpc2FibGVkIHsgY29sb3I6IGdyZXk7IH1cclxuXHJcbi8qIEZpbHRlciBPbiBPZmYqL1xyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLmZpbHRlcmluZy1lbmFibGVkICB7IGNvbG9yOiByZ2IoMjMwLCAxMjgsIDYzKTsgfVxyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLmZpbHRlcmluZy1kaXNhYmxlZCB7IGNvbG9yOiBncmV5OyB9XHJcblxyXG4vKiBTZXR0aW5ncyBJdGVtICovXHJcbi5hdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3Muc2V0dGluZ3MtaXRlbSB7XHJcbiAgcGFkZGluZzogNHB4O1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4vKiBTdGFuZGluZ3MgdGFibGUgKi9cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy50aW1lc3RhbXAgeyBjb2xvcjpncmV5OyBkaXNwbGF5OiBibG9jazsgfVxyXG5cclxuLyogT3RoZXIgKi9cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy5jdXJzb3ItbGluazpob3ZlcntcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbn1cclxuXHJcbi8qIFN0YW5kaW5ncyBwb3AgZG93biBtZW51ICovXHJcbi5hdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MudXNlci1kcm9wZG93bi1tZW51LWJveCB7XHJcbiAgcG9zaXRpb246YWJzb2x1dGU7XHJcbiAgcGFkZGluZy10b3A6OHB4OyBcclxuICBwYWRkaW5nLWJvdHRvbTo4cHg7IFxyXG4gIGJhY2tncm91bmQtY29sb3I6d2hpdGU7IFxyXG4gIGJveC1zaGFkb3c6NHB4IDRweCA4cHggNHB4IGdyZXk7IFxyXG4gIGJvcmRlci1yYWRpdXM6MHB4IDBweCA2cHggMHB4O1xyXG4gIGN1cnNvcjogYXV0bztcclxufVxyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLnVzZXItZHJvcGRvd24tbWVudSB7XHJcbiAgZGlzcGxheSA6IGJsb2NrO1xyXG4gIGxpbmUtaGVpZ2h0OiAyZW07XHJcbiAgcGFkZGluZy1sZWZ0IDogOHB4O1xyXG4gIHBhZGRpbmctcmlnaHQgOiA4cHg7XHJcbn1cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy51c2VyLWRyb3Bkb3duLW1lbnU6aG92ZXIge1xyXG4gIGJhY2tncm91bmQgOiBsaWdodGJsdWU7XHJcbn1cclxuXHJcbi8qIG1vZGlmeSBvcmlnaW5hbCAqL1xyXG5hLnVzZXItcmVkIHtcclxuICBjb2xvcjojRkYwMDAwO1xyXG59XHJcblxyXG4uc3RhbmRpbmdzLWZyaWVuZCB0ZCB7YmFja2dyb3VuZC1jb2xvciA6IHJnYmEoMCwgMTUwLCAxMDAsIDAuMDkpICFpbXBvcnRhbnQ7fVxyXG4uc3RhbmRpbmdzLWZyaWVuZDpob3ZlciB0ZCB7YmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAyMDAsIDE1MCwgMC4wOSkgIWltcG9ydGFudDt9XHJcblxyXG4uc3RhbmRpbmdzLWZyaWVuZCA+IHRkLnN0YW5kaW5ncy1mcm96ZW4ge2JhY2tncm91bmQtY29sb3IgOiByZ2JhKDAsIDgyLCAyNTUsIDAuMjcpICFpbXBvcnRhbnQ7fVxyXG4uc3RhbmRpbmdzLWZyaWVuZCA+IHRkLnN0YW5kaW5ncy1mcm96ZW46aG92ZXIge2JhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgODIsIDI1NSwgMC4yNykgIWltcG9ydGFudDt9XHJcblxyXG5cclxuLnRhYmxlLXN0cmlwZWQgdGJvZHkgdHI6bnRoLWNoaWxkKG9kZCkgdGQsIC50YWJsZS1zdHJpcGVkIHRib2R5IHRyOm50aC1jaGlsZChvZGQpIHRoIHtiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZWZlO31cclxuLnRhYmxlIHRib2R5IHRyOmhvdmVyIHRkLCAudGFibGUgdGJvZHkgdHI6aG92ZXIgdGgge2JhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7fVxyXG5cclxudGQuc3RhbmRpbmdzLXVzZXJuYW1lOmhvdmVyIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbn1cclxuXHJcbi50YWJsZS1zb3J0IHRoe1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmUgIWltcG9ydGFudDtcclxufVxyXG5cclxuLnBhZ2luYXRpb24gLm1lIGEge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjUyLCAwLCAwLCAwLjA5KTtcclxuICBjb2xvciA6IHJnYigxMTQsMCwwKTtcclxufVxyXG5cclxuLnBhZ2luYXRpb24gLmFjdGl2ZS1tZSBhIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xyXG4gIGNvbG9yIDogcmdiKDIwMCwwLDApO1xyXG59XHJcbiAgYDtcclxuXHJcbiAgJCgnaGVhZCcpLmFwcGVuZChgPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPiR7Y3NzfTwvc3R5bGU+YCk7XHJcbn0iLCJpbXBvcnQge2NvdW50cmllcywgcmF0aW5nfSBmcm9tICcuL3V0aWwuanMnO1xyXG5pbXBvcnQgQXBwU2V0dGluZ3MgZnJvbSAnLi9hcHBTZXR0aW5ncy5qcyc7XHJcblxyXG5jbGFzcyBGaWx0ZXJDb250ZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgdGhpcy5ieUZyaWVuZHNMaXN0LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmJ5Q291bnRyeS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5ieVJhdGluZy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5ieU5hbWUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMudXBkYXRlLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoIG9wdGlvbiApe1xyXG4gICAgbGV0IG5ld1NldHRpbmdzID0gT2JqZWN0LmFzc2lnbihuZXcgQXBwU2V0dGluZ3MoKSwgdGhpcy5wcm9wcy5zZXR0aW5ncyk7XHJcbiAgICBmb3IobGV0IHBhcmFtIGluIG9wdGlvbil7XHJcbiAgICAgIG5ld1NldHRpbmdzW3BhcmFtXSA9IG9wdGlvbltwYXJhbV07XHJcbiAgICB9XHJcbiAgICB0aGlzLnByb3BzLnNldHRpbmdzVXBkYXRlRnVuYyggbmV3U2V0dGluZ3MgKTtcclxuICB9XHJcblxyXG4gIGJ5RnJpZW5kc0xpc3QoKXtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwidGFibGUtcm93XCJ9fVxyXG4gICAgICAgICAgIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBjdXJzb3ItbGluayAke3RoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyQnlGcmllbmRzID8gXCJmaWx0ZXJpbmctZW5hYmxlZFwiIDogXCJmaWx0ZXJpbmctZGlzYWJsZWRcIn1gfVxyXG4gICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeUZyaWVuZHNcIjogIXRoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyQnlGcmllbmRzfSApfT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlLWNlbGxcIn19PlxyXG4gICAgICAgICAgRnJpZW5kc1xyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBieUNvdW50cnkoKXtcclxuICAgIGNvbnN0IGZvcm0gPSB0aGlzLnByb3BzLmdldEFjdGl2ZUNvdW50cmllcygpLm1hcCggKGNvdW50cnkpID0+IHtcclxuICAgICAgY29uc3QgdmFsID0gY291bnRyaWVzW2NvdW50cnldO1xyXG4gICAgICByZXR1cm4gKDxvcHRpb24gdmFsdWU9e2NvdW50cnl9IGtleT17YGNvdW50cnktZmlsdGVyLW9wdGlvbi0ke2NvdW50cnl9YH0+e3ZhbH08L29wdGlvbj4pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlLXJvd1wifX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJ0YWJsZS1jZWxsXCJ9fVxyXG4gICAgICAgICAgICAgY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGN1cnNvci1saW5rICR7dGhpcy5wcm9wcy5zZXR0aW5ncy5maWx0ZXJCeUNvdW50cnkgPyBcImZpbHRlcmluZy1lbmFibGVkXCIgOiBcImZpbHRlcmluZy1kaXNhYmxlZFwifWB9XHJcbiAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZSgge1wiZmlsdGVyQnlDb3VudHJ5XCI6ICF0aGlzLnByb3BzLnNldHRpbmdzLmZpbHRlckJ5Q291bnRyeX0gKX1cclxuICAgICAgICAgICAgID5cclxuICAgICAgICAgIENvdW50cnlcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlLWNlbGxcIiwgcGFkZGluZ0xlZnQ6XCIxMHB4XCJ9fT5cclxuICAgICAgICAgIDxzZWxlY3QgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLnNldHRpbmdzLmZpbHRlckNvdW50cnl9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge3RoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeUNvdW50cnlcIjp0cnVlLCBcImZpbHRlckNvdW50cnlcIjogZS50YXJnZXQudmFsdWV9ICl9IH0+XHJcbiAgICAgICAgICAgIHtmb3JtfVxyXG4gICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGJ5UmF0aW5nKCl7XHJcbiAgICBsZXQgYnV0dG9ucyA9IHJhdGluZy5sYi5tYXAoIChsYiwgaWR4KSA9PiB7XHJcbiAgICAgIGlmKGlkeCA9PT0gMCkgcmV0dXJuIFwiXCI7XHJcbiAgICAgIGlmKCB0aGlzLnByb3BzLnNldHRpbmdzLmZpbHRlclJhdGluZy5oYXMoaWR4KSA9PT0gdHJ1ZSApe1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiIHN0eWxlPXt7Y29sb3IgOiByYXRpbmcuY29sb3JbaWR4XX19IG9uQ2xpY2s9eyAoKT0+e1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gbmV3IFNldCggdGhpcy5wcm9wcy5zZXR0aW5ncy5maWx0ZXJSYXRpbmcgKTtcclxuICAgICAgICAgICAgb2JqLmRlbGV0ZSggaWR4ICk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeVJhdGluZ1wiOnRydWUsIFwiZmlsdGVyUmF0aW5nXCI6IG9ian0gKTtcclxuICAgICAgICAgIH19IHRpdGxlPXtgJHtsYn0gLSBgfSBrZXk9e2ByYXRpbmctZmlsdGVyLXJhdGluZy0ke2xifWB9PlxyXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29ucyBtZC0yNFwiIHN0eWxlPXt7Y29sb3IgOiByYXRpbmcuY29sb3JbaWR4XX19PmNoZWNrX2JveDwvaT5cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICApO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiBzdHlsZT17e2NvbG9yIDogcmF0aW5nLmNvbG9yW2lkeF19fSBvbkNsaWNrPXsgKCk9PntcclxuICAgICAgICAgICAgbGV0IG9iaiA9IG5ldyBTZXQoIHRoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyUmF0aW5nICk7XHJcbiAgICAgICAgICAgIG9iai5hZGQoIGlkeCApO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgge1wiZmlsdGVyQnlSYXRpbmdcIjp0cnVlLCBcImZpbHRlclJhdGluZ1wiOiBvYmp9ICk7XHJcbiAgICAgICAgICB9fSB0aXRsZT17YCR7bGJ9IC0gYH0ga2V5PXtgcmF0aW5nLWZpbHRlci1yYXRpbmctJHtsYn1gfT5cclxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnMgbWQtMjRcIiBzdHlsZT17e2NvbG9yIDogcmF0aW5nLmNvbG9yW2lkeF19fT5jaGVja19ib3hfb3V0bGluZV9ibGFuazwvaT5cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgdG9vbCA9ICgoKT0+e1xyXG4gICAgICByZXR1cm4oXHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBmaWx0ZXJpbmctZGlzYWJsZWRcIiBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gbmV3IFNldChbMSwyLDMsNF0pO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgge1wiZmlsdGVyQnlSYXRpbmdcIjp0cnVlLCBcImZpbHRlclJhdGluZ1wiOiBvYmp9ICk7XHJcbiAgICAgICAgICB9fSB0aXRsZT1cIjAtMTE5OVwiPntcIkFCQ1wifTwvYT5cclxuICAgICAgICAgIDxzcGFuPiA8L3NwYW4+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBmaWx0ZXJpbmctZGlzYWJsZWRcIiBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gbmV3IFNldChbMSwyLDMsNCw1LDYsNyw4XSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeVJhdGluZ1wiOnRydWUsIFwiZmlsdGVyUmF0aW5nXCI6IG9ian0gKTtcclxuICAgICAgICAgIH19IHRpdGxlPVwiMC0yNzk5XCI+e1wiQVJDXCJ9PC9hPlxyXG4gICAgICAgICAgPHNwYW4+IDwvc3Bhbj5cclxuICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGZpbHRlcmluZy1kaXNhYmxlZFwiIG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeVJhdGluZ1wiOnRydWUsIFwiZmlsdGVyUmF0aW5nXCI6IG9ian0gKTtcclxuICAgICAgICAgIH19PntcIk5vbmVcIn08L2E+XHJcbiAgICAgICAgICA8c3Bhbj4gPC9zcGFuPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgZmlsdGVyaW5nLWRpc2FibGVkXCIgb25DbGljaz17KCk9PntcclxuICAgICAgICAgICAgbGV0IG9iaiA9IG5ldyBTZXQoWzEsMiwzLDQsNSw2LDcsOCw5XSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeVJhdGluZ1wiOnRydWUsIFwiZmlsdGVyUmF0aW5nXCI6IG9ian0gKTtcclxuICAgICAgICAgIH19PntcIkFsbFwifTwvYT5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICk7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwidGFibGUtcm93XCJ9fT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlLWNlbGxcIn19XHJcbiAgICAgICAgICAgICBjbGFzc05hbWU9e2BhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgY3Vyc29yLWxpbmsgJHt0aGlzLnByb3BzLnNldHRpbmdzLmZpbHRlckJ5UmF0aW5nID8gXCJmaWx0ZXJpbmctZW5hYmxlZFwiIDogXCJmaWx0ZXJpbmctZGlzYWJsZWRcIn1gfVxyXG4gICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGUoIHtcImZpbHRlckJ5UmF0aW5nXCI6ICF0aGlzLnByb3BzLnNldHRpbmdzLmZpbHRlckJ5UmF0aW5nfSApfVxyXG4gICAgICAgICAgICAgPlxyXG4gICAgICAgICAgUmF0aW5nXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJ0YWJsZS1jZWxsXCIsIHBhZGRpbmdMZWZ0OlwiMTBweFwifX0+XHJcbiAgICAgICAgICA8cD57YnV0dG9uc308L3A+XHJcbiAgICAgICAgICA8cD57dG9vbH08L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGJ5TmFtZSgpe1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJ0YWJsZS1yb3dcIn19PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwidGFibGUtY2VsbFwifX1cclxuICAgICAgICAgICAgIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBjdXJzb3ItbGluayAke3RoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyQnlOYW1lID8gXCJmaWx0ZXJpbmctZW5hYmxlZFwiIDogXCJmaWx0ZXJpbmctZGlzYWJsZWRcIn1gfVxyXG4gICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGUoIHtcImZpbHRlckJ5TmFtZVwiOiAhdGhpcy5wcm9wcy5zZXR0aW5ncy5maWx0ZXJCeU5hbWV9ICl9XHJcbiAgICAgICAgICAgICA+XHJcbiAgICAgICAgICBOYW1lXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJ0YWJsZS1jZWxsXCIsIHBhZGRpbmdMZWZ0OlwiMTBweFwifX0+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyTmFtZX0gb25DaGFuZ2U9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJOYW1lXCI6IGUudGFyZ2V0LnZhbHVlLCBcImZpbHRlckJ5TmFtZVwiOiB0cnVlfSApXHJcbiAgICAgICAgICB9IH0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBjb25zdCBieUZyaWVuZCA9IHRoaXMuYnlGcmllbmRzTGlzdCgpO1xyXG4gICAgY29uc3QgYnlSYXRpbmcgPSB0aGlzLmJ5Q291bnRyeSgpO1xyXG4gICAgY29uc3QgYnlDb3VudHJ5ID0gdGhpcy5ieVJhdGluZygpO1xyXG4gICAgY29uc3QgYnlOYW1lID0gdGhpcy5ieU5hbWUoKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246XCJhYnNvbHV0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6XCIyMHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOlwid2hpdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6XCI0cHggNHB4IDhweCA0cHggZ3JleVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czpcIjZweCA2cHggNnB4IDZweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogYCR7dGhpcy5wcm9wcy5wb3NZICsgNDB9cHhgLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6YCR7dGhpcy5wcm9wcy5wb3NYfXB4YCxcclxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6XCJhdXRvXCJcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICBvbkNsaWNrPXsoZSk9PmUuc3RvcFByb3BhZ2F0aW9uKCl9PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwidGFibGVcIiwgbGluZUhlaWdodDpcIjIuNWVtXCJ9fT5cclxuICAgICAgICAgIHtieUZyaWVuZH1cclxuICAgICAgICAgIHtieVJhdGluZ31cclxuICAgICAgICAgIHtieUNvdW50cnl9XHJcbiAgICAgICAgICB7YnlOYW1lfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc2hvdyA6IGZhbHNlLFxyXG4gICAgICBwb3NYIDogMCxcclxuICAgICAgcG9zWSA6IDBcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IChcclxuICAgICAgPGEgaHJlZj1cIiNcIlxyXG4gICAgICAgICBjbGFzc05hbWU9e2BhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgJHsgdGhpcy5wcm9wcy5zZXR0aW5ncy5pc0ZpbHRlcnNFbmFibGVkKCkgPyBcImZpbHRlcmluZy1lbmFibGVkXCIgOiBcImZpbHRlcmluZy1kaXNhYmxlZFwifWB9PlxyXG4gICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+ZmlsdGVyX2xpc3Q8L2k+XHJcbiAgICAgICAgRmlsdGVyIFxyXG4gICAgICA8L2E+XHJcbiAgICApO1xyXG5cclxuICAgIGlmKCB0aGlzLnN0YXRlLnNob3cgPT09IGZhbHNlICl7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgY29udHJvbGxlci1idXR0b25cIj5cclxuICAgICAgICAgIDxkaXYgb25DbGljaz17IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZWN0ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHtzaG93IDogIXRoaXMuc3RhdGUuc2hvdywgcG9zWDpyZWN0LmxlZnQsIHBvc1k6cmVjdC50b3AgfSkgO1xyXG4gICAgICAgICAgfSB9PntidXR0b259PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGNvbnRyb2xsZXItYnV0dG9uXCI+XHJcbiAgICAgICAgICA8ZGl2IG9uQ2xpY2s9eyAoZSkgPT4gdGhpcy5zZXRTdGF0ZSgge3Nob3cgOiAhdGhpcy5zdGF0ZS5zaG93IH0pIH0+e2J1dHRvbn08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3twb3NpdGlvbjpcImZpeGVkXCIsIGxlZnQ6MCwgdG9wOjAsIHdpZHRoOlwiMTAwJVwiLCBoZWlnaHQ6XCIxMDAlXCJ9fVxyXG4gICAgICAgICAgICAgICBvbkNsaWNrPXsoZSk9PnRoaXMuc2V0U3RhdGUoe3Nob3c6ZmFsc2V9KX0+XHJcbiAgICAgICAgICAgIDxGaWx0ZXJDb250ZW50IHNldHRpbmdzPXt0aGlzLnByb3BzLnNldHRpbmdzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nc1VwZGF0ZUZ1bmM9e3RoaXMucHJvcHMuc2V0dGluZ3NVcGRhdGVGdW5jfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRBY3RpdmVDb3VudHJpZXM9e3RoaXMucHJvcHMuZ2V0QWN0aXZlQ291bnRyaWVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NYPXt0aGlzLnN0YXRlLnBvc1h9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc1k9e3RoaXMuc3RhdGUucG9zWX0vPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJpZW5kc0xpc3R7XHJcbiAgY29uc3RydWN0b3IoIGxvYWQgKXtcclxuICAgIHRoaXMuZnJpZW5kcyA9IG5ldyBTZXQoKTtcclxuICAgIGlmKGxvYWQgPT09IHRydWUpIHRoaXMubG9hZCgpO1xyXG5cclxuICAgIC8vdGhpcy5hZGQoXCJjYW15cGFwZXJcIik7XHJcbiAgfVxyXG5cclxuICBsb2FkKCl7XHJcbiAgICAvL2xvYWRcclxuICAgIC8vZnJpZW5kIGxpc3Qgb2JqZWN0IChvbGQgdmVyc2lvbilcclxuICAgIGxldCBmcmllbmRzT2xkID0gSlNPTi5wYXJzZSggR01fZ2V0VmFsdWUoJ0dNX2ZyaWVuZF9saXN0JywgJ251bGwnKSApO1xyXG4gICAgaWYoZnJpZW5kc09sZCAhPT0gbnVsbCl7XHJcbiAgICAgIHRoaXMuZnJpZW5kcyA9IG5ldyBTZXQoIE9iamVjdC5rZXlzKGZyaWVuZHNPbGQpICk7XHJcbiAgICAgIEdNX2RlbGV0ZVZhbHVlKCAnR01fZnJpZW5kX2xpc3QnICk7XHJcbiAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL2ZyaWVuZCBsaXN0IGFycmF5IChuZXcgdmVyc2lvbilcclxuICAgIHRoaXMuZnJpZW5kcyA9IG5ldyBTZXQoSlNPTi5wYXJzZSggR01fZ2V0VmFsdWUoJ2ZyaWVuZHNMaXN0JywgJ1tdJykgKSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJsb2FkZWQgOiBmcmllbmRzIGxpc3RcIik7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmZyaWVuZHMpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZSgpe1xyXG4gICAgbGV0IHN0ciA9IEpTT04uc3RyaW5naWZ5KFsuLi50aGlzLmZyaWVuZHNdKTtcclxuICAgIC8vc2F2ZVxyXG4gICAgR01fc2V0VmFsdWUoJ2ZyaWVuZHNMaXN0Jywgc3RyKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcInNhdmVkIDogZnJpZW5kcyBsaXN0XCIpO1xyXG4gICAgY29uc29sZS5sb2coc3RyKTtcclxuICB9XHJcblxyXG4gIC8vW25hbWVzLi4uXVxyXG4gIGFkZChoYW5kbGUpe1xyXG4gICAgaGFuZGxlLmZvckVhY2goIChuYW1lKSA9PiB0aGlzLmZyaWVuZHMuYWRkKG5hbWUpICk7XHJcbiAgICB0aGlzLnNhdmUoKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZShoYW5kbGUpe1xyXG4gICAgaGFuZGxlLmZvckVhY2goIChuYW1lKSA9PiB0aGlzLmZyaWVuZHMuZGVsZXRlKG5hbWUpICk7XHJcbiAgICB0aGlzLnNhdmUoKTtcclxuICB9XHJcblxyXG5cclxuICBpc0ZyaWVuZChoYW5kbGUpe1xyXG4gICAgcmV0dXJuIHRoaXMuZnJpZW5kcy5oYXMoIGhhbmRsZSApO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGlzdCgpe1xyXG4gICAgcmV0dXJuIFsuLi50aGlzLmZyaWVuZHNdO1xyXG4gIH1cclxufSIsIi8vaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuLy9pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IEF0Q29kZXJDdXRvbVN0YW5kaW5ncyBmcm9tICcuL2FwcC5qcydcclxuaW1wb3J0IGluamVjdEN1c3RvbUNTUyBmcm9tICcuL2Nzcy5qcydcclxuXHJcbiQoJ2Rpdi50YWJsZS1yZXNwb25zaXZlJykuaGlkZSgpO1xyXG4kKCcjcGFnaW5hdGlvbi1zdGFuZGluZ3MnKS5oaWRlKCk7XHJcbiQoJyNzdGFuZGluZ3MtY3N2LWxpbmsnKS5hZnRlcignPGRpdiBpZD1cImNvbnRlbnRcIj48L2Rpdj4nKTtcclxuLy8kKCdoZWFkJykuYXBwZW5kKCc8bGluayBocmVmPVwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9pY29uP2ZhbWlseT1NYXRlcmlhbCtJY29uc1wiIHJlbD1cInN0eWxlc2hlZXRcIj4nKTtcclxuaW5qZWN0Q3VzdG9tQ1NTKCk7XHJcblxyXG50cnl7XHJcbiAgUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPEF0Q29kZXJDdXRvbVN0YW5kaW5ncyAvPixcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JylcclxuICApO1xyXG59Y2F0Y2goZSl7XHJcbiAgY29uc29sZS5sb2coIFwic29tZSBlcnJvciBvY2N1cnJlZFwiICk7XHJcbiAgY29uc29sZS5sb2coIGUgKTtcclxuICAkKCdkaXYudGFibGUtcmVzcG9uc2l2ZScpLnNob3coKTtcclxuICAkKCcjcGFnaW5hdGlvbi1zdGFuZGluZ3MnKS5zaG93KCk7XHJcbn1cclxuIiwiY2xhc3MgTW9kYWxXaW5kb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuICByZW5kZXIoKXtcclxuICAgIGxldCBoZWFkID0gKFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcImdyaWRcIiwgZ3JpZFRlbXBsYXRlUm93czpcIjFmclwiLCBncmlkVGVtcGxhdGVDb2x1bW5zOlwiMWZyIGF1dG9cIn19PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tncmlkUm93OlwiMS8yXCIsIGdyaWRDb2x1bW46XCIxLzJcIn19PjxoMz57dGhpcy5wcm9wcy50aXRsZX08L2gzPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tncmlkUm93OlwiMS8yXCIsIGdyaWRDb2x1bW46XCIyLzNcIn19IG9uQ2xpY2s9e3RoaXMucHJvcHMuY2xvc2VGdW5jfT48aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPmNsZWFyPC9pPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICB7aGVhZH1cclxuICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kYWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7c2hvdzogZmFsc2V9O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgYnV0dG9uID0gKFxyXG4gICAgICA8ZGl2IG9uQ2xpY2s9eyAoKSA9PiB7dGhpcy5zZXRTdGF0ZSgge3Nob3c6IHRydWV9ICk7IH0gfVxyXG4gICAgICAgICAgIGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBjb250cm9sbGVyLWJ1dHRvblwiPlxyXG4gICAgICAgIHt0aGlzLnByb3BzLmJ1dHRvbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG5cclxuICAgIGlmKCB0aGlzLnN0YXRlLnNob3cgPT09IHRydWUgKXtcclxuICAgICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICB7YnV0dG9ufVxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgbW9kYWwtZmlsdGVyXCIgb25DbGljaz17ICgpPT57IHRoaXMuc2V0U3RhdGUoeyBzaG93OiBmYWxzZX0pIH0gfT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgbW9kYWwtY29udGVudFwiIG9uQ2xpY2s9eyAoZSkgPT4ge2Uuc3RvcFByb3BhZ2F0aW9uKCk7IHJldHVybiBmYWxzZTt9IH0+XHJcbiAgICAgICAgICAgICAgPE1vZGFsV2luZG93IGNsb3NlRnVuYz17ICgpPT57IHRoaXMuc2V0U3RhdGUoeyBzaG93OiBmYWxzZX0pIH0gfSB0aXRsZT17dGhpcy5wcm9wcy50aXRsZX0+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgICA8L01vZGFsV2luZG93PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHJldHVybihcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAge2J1dHRvbn1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiY2xhc3MgUGFnZUJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMgKXtcclxuICAgIGlmKCB0aGlzLnByb3BzLmN1cnJlbnQgIT09IG5leHRQcm9wcy5jdXJyZW50ICkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiggdGhpcy5wcm9wcy5tZSAhPT0gbmV4dFByb3BzLm1lICkgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IHAgPSB0aGlzLnByb3BzLnBhZ2U7XHJcblxyXG4gICAgaWYoIHRoaXMucHJvcHMuY3VycmVudCA9PT0gcCApe1xyXG4gICAgICByZXR1cm4gKDxsaSBjbGFzc05hbWU9e2BsaS1wYWdpbmF0aW9uIGFjdGl2ZSAke3RoaXMucHJvcHMubWUgPT09IHRydWUgPyBcImFjdGl2ZS1tZVwiOlwiXCJ9YH0+PGE+e3AgKyAxfTwvYT48L2xpPik7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuICg8bGkgY2xhc3NOYW1lPXtgbGktcGFnaW5hdGlvbiAke3RoaXMucHJvcHMubWUgPT09IHRydWUgPyBcIm1lXCI6XCJcIn1gfSA+PGEgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrRnVuY30gZGF0YS1wYWdlPXtwfSBocmVmPVwiI1wiPntwICsgMX08L2E+PC9saT4pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIC8qKlxyXG4gICogQHBhcmFtIHtudW1iZXJ9IGN1cnJlbnQgY3VycmVudCBwYWdlICgwLWluZGV4ZWQpXHJcbiAgKiBAcGFyYW0ge251bWJlcn0gdG90YWwgICB0b3RhbCBwYWdlXHJcbiAgKiBAcGFyYW0ge251bWJlcn0gbWUgICAgICBwYWdlIHdoZXJlIGkgYW1cclxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uQ2xpY2tGdW5jIFxyXG4gICovXHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMgKXtcclxuICAgIGlmKCB0aGlzLnByb3BzLmN1cnJlbnQgIT09IG5leHRQcm9wcy5jdXJyZW50ICkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiggdGhpcy5wcm9wcy50b3RhbCAhPT0gbmV4dFByb3BzLnRvdGFsICkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiggdGhpcy5wcm9wcy5tZSAhPT0gbmV4dFByb3BzLm1lICkgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGxldCBzaG93aW5nUGFnZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgIGZvcihsZXQgcGFnZT0wOyBwYWdlPHRoaXMucHJvcHMudG90YWw7IHBhZ2UrKyl7XHJcbiAgICAgIGlmKHBhZ2UgPT09IDAgfHwgcGFnZSA9PT0gdGhpcy5wcm9wcy50b3RhbC0xIHx8IHBhZ2U9PT10aGlzLnByb3BzLm1lIHx8IE1hdGguYWJzKHRoaXMucHJvcHMuY3VycmVudCAtIHBhZ2UpIDw9IDUgKXtcclxuICAgICAgICBzaG93aW5nUGFnZXMucHVzaChwYWdlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgIGxldCBibGFua0NvdW50ID0gMDtcclxuICAgIGZvcihsZXQgaT0wOyBpPHNob3dpbmdQYWdlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGlmKGkgPiAwICYmIHNob3dpbmdQYWdlc1tpXSAtIHNob3dpbmdQYWdlc1tpLTFdID4gMSl7XHJcbiAgICAgICAgaWYoIHNob3dpbmdQYWdlc1tpXSAtIHNob3dpbmdQYWdlc1tpLTFdID09PSAyICl7XHJcbiAgICAgICAgICByZXMucHVzaCggPFBhZ2VCdXR0b24gY3VycmVudD17dGhpcy5wcm9wcy5jdXJyZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U9e3Nob3dpbmdQYWdlc1tpXS0xfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17c2hvd2luZ1BhZ2VzW2ldLTF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGlja0Z1bmM9e3RoaXMucHJvcHMub25DbGlja0Z1bmN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWU9e3Nob3dpbmdQYWdlc1tpXS0xPT09dGhpcy5wcm9wcy5tZX0gLz4gKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHJlcy5wdXNoKCA8bGkgY2xhc3NOYW1lPVwibGktcGFnaW5hdGlvbiBkaXNhYmxlZFwiIGtleT17YHBhZ2UtYmxhbmstJHtibGFua0NvdW50Kyt9YH0+PGE+e1wiLi4uXCJ9PC9hPjwvbGk+ICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJlcy5wdXNoKCA8UGFnZUJ1dHRvbiBjdXJyZW50PXt0aGlzLnByb3BzLmN1cnJlbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlPXtzaG93aW5nUGFnZXNbaV19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3Nob3dpbmdQYWdlc1tpXX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2tGdW5jPXt0aGlzLnByb3BzLm9uQ2xpY2tGdW5jfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWU9e3Nob3dpbmdQYWdlc1tpXT09PXRoaXMucHJvcHMubWV9IC8+ICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT1cInBhZ2luYXRpb24gcGFnaW5hdGlvbi1jZW50ZXJlZFwiPjx1bD57cmVzfTwvdWw+PC9kaXY+KTtcclxuICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBSZWxvYWRpbmcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7IGF1dG9VcGRhdGU6ZmFsc2UgfTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgcmV0dXJuICg8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcImdyaWRcIiwgZ3JpZFRlbXBsYXRlUm93czpcIjFmclwiLCBncmlkVGVtcGxhdGVDb2x1bW5zOlwiYXV0byBhdXRvXCJ9fT5cclxuICAgICAgPGRpdiBzdHlsZT17e2dyaWRDb2x1bW46XCIxLzJcIn19IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBjb250cm9sbGVyLWJ1dHRvblwiXHJcbiAgICAgICAgICAgb25DbGljaz17IChlKT0+dGhpcy5wcm9wcy51cGRhdGVGdW5jKCkgfT5cclxuICAgICAgICA8YSBocmVmPVwiI1wiPlxyXG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5yZWZyZXNoPC9pPlVwZGF0ZVxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgc3R5bGU9e3tncmlkQ29sdW1uOlwiMi8zXCJ9fSBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgY29udHJvbGxlci1idXR0b25cIlxyXG4gICAgICAgICAgIG9uQ2xpY2s9eyAoZSk9PntcclxuICAgICAgICAgICAgaWYoIXRoaXMuc3RhdGUuYXV0b1VwZGF0ZSl7XHJcbiAgICAgICAgICAgICAgdGhpcy50aW1lclJlbG9hZGluZyA9IHNldEludGVydmFsKCB0aGlzLnByb3BzLnVwZGF0ZUZ1bmMsIDYwKjEwMDAgKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJjcmVhdGUgdGltZXIgXCIsIHRoaXMudGltZXJSZWxvYWRpbmcpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKCB0aGlzLnRpbWVyUmVsb2FkaW5nICk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJlcmFzZSB0aW1lciBcIiwgdGhpcy50aW1lclJlbG9hZGluZyk7XHJcbiAgICAgICAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHthdXRvVXBkYXRlOiF0aGlzLnN0YXRlLmF1dG9VcGRhdGV9KVxyXG4gICAgICAgICAgfSB9PlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyAke3RoaXMuc3RhdGUuYXV0b1VwZGF0ZSA/IFwicmVsb2FkaW5nLWVuYWJsZWRcIiA6IFwicmVsb2FkaW5nLWRpc2FibGVkXCJ9YH0+XHJcbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnVwZGF0ZTwvaT5BdXRvICgxbWluKVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj4pO1xyXG4gIH1cclxufSIsImltcG9ydCBNb2RhbCBmcm9tICcuL21vZGFsLmpzJ1xyXG5pbXBvcnQgQXBwU2V0dGluZ3MgZnJvbSAnLi9hcHBTZXR0aW5ncy5qcydcclxuY2xhc3MgU2V0dGluZ3NDb250ZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMudXBkYXRlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmdlbmVyYXRlRm9ybS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5nZW5lcmF0ZUZyaWVuZHNMaXN0Rm9ybS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCBvcHRpb24gKXtcclxuICAgIGxldCBuZXdTZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24obmV3IEFwcFNldHRpbmdzKCksIHRoaXMucHJvcHMuc2V0dGluZ3MpO1xyXG4gICAgZm9yKGxldCBwYXJhbSBpbiBvcHRpb24pe1xyXG4gICAgICBuZXdTZXR0aW5nc1twYXJhbV0gPSBvcHRpb25bcGFyYW1dO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coIG9wdGlvbiApO1xyXG4gICAgdGhpcy5wcm9wcy5zZXR0aW5nc1VwZGF0ZUZ1bmMoIG5ld1NldHRpbmdzICk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZUZvcm0oIG9wdGlvbk5hbWUsIGxhYmVsICl7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBzZXR0aW5ncy1pdGVtXCI+XHJcbiAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgPGlucHV0IGNoZWNrZWQ9e3RoaXMucHJvcHMuc2V0dGluZ3Nbb3B0aW9uTmFtZV19IHR5cGU9XCJjaGVja2JveFwiIHN0eWxlPXt7ZGlzcGxheTpcImlubGluZVwifX1cclxuICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpPT57IHRoaXMudXBkYXRlKCB7IFtvcHRpb25OYW1lXSA6IGUudGFyZ2V0LmNoZWNrZWQgfSApIH19IC8+XHJcbiAgICAgICAgICA8c3Bhbj4ge2xhYmVsfTwvc3Bhbj5cclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZUZyaWVuZHNMaXN0Rm9ybSgpe1xyXG4gICAgY29uc3QgZnJpZW5kcyA9IHRoaXMucHJvcHMuZnJpZW5kcy5nZXRMaXN0KCkubWFwKCAobmFtZSkgPT4ge1xyXG4gICAgICByZXR1cm4gKDxvcHRpb24gdmFsdWU9e25hbWV9IGtleT17bmFtZX0+e25hbWV9PC9vcHRpb24+KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBzZXR0aW5ncy1pdGVtXCI+XHJcbiAgICAgICAgPHA+RnJpZW5kcyBMaXN0PC9wPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHNldHRpbmdzLWl0ZW1cIj5cclxuICAgICAgICAgIDxpbnB1dCByZWY9XCJhZGRGcmllbmRGb3JtXCIgdHlwZT1cInRleHRcIiBzdHlsZT17e2Rpc3BsYXk6XCJibG9ja1wifX1cclxuICAgICAgICAgICAgICAgICBvbktleURvd249eyhlKT0+e1xyXG4gICAgICAgICAgICAgICAgICBpZiggZS5rZXkgIT09ICdFbnRlcicgKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnJlZnMuYWRkRnJpZW5kRm9ybTtcclxuICAgICAgICAgICAgICAgICAgaWYoIGVsZW1lbnQudmFsdWUgIT09IFwiXCIgKSB0aGlzLnByb3BzLmZyaWVuZHNVcGRhdGVGdW5jKCBlbGVtZW50LnZhbHVlLnNwbGl0KFwiIFwiKSwgdHJ1ZSApO1xyXG4gICAgICAgICAgICAgICAgICBlbGVtZW50LnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgIH19Lz5cclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHN0eWxlPXt7ZGlzcGxheTpcImJsb2NrXCJ9fSBvbkNsaWNrPXsgKCk9PntcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMucmVmcy5hZGRGcmllbmRGb3JtO1xyXG4gICAgICAgICAgICBpZiggZWxlbWVudC52YWx1ZSAhPT0gXCJcIiApIHRoaXMucHJvcHMuZnJpZW5kc1VwZGF0ZUZ1bmMoIFtlbGVtZW50LnZhbHVlXSwgdHJ1ZSApO1xyXG4gICAgICAgICAgICBlbGVtZW50LnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgIEFkZCBGcmllbmRcclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHNldHRpbmdzLWl0ZW1cIj5cclxuICAgICAgICAgIDxzZWxlY3QgcmVmPVwiZnJpZW5kc0xpc3RGb3JtXCIgbXVsdGlwbGUgc2l6ZT1cIjEwXCIgc3R5bGU9e3tkaXNwbGF5OlwiYmxvY2tcIn19PlxyXG4gICAgICAgICAgICB7ZnJpZW5kc31cclxuICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgc3R5bGU9e3tkaXNwbGF5OlwiYmxvY2tcIn19IG9uQ2xpY2s9eyAoKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gdGhpcy5yZWZzLmZyaWVuZHNMaXN0Rm9ybTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5mcmllbmRzVXBkYXRlRnVuYyggWy4uLmZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ29wdGlvbicpXVxyXG4gICAgICAgICAgICAgIC5maWx0ZXIoIChlKT0+ZS5zZWxlY3RlZCApLm1hcCgoZSk9PmUudmFsdWUpLCBmYWxzZSApO1xyXG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XHJcbiAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgUmVtb3ZlIEZyaWVuZHNcclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IHBhZ2VTaXplID0gKCgpPT57XHJcbiAgICAgIGNvbnN0IGxpc3QgPSBbMTAsMjAsNTAsMTAwLDIwMCwzMDAsNDAwLDUwMCwxMDAwLDUwMDAsMTAwMDBdLm1hcCggKHZhbCk9PntcclxuICAgICAgICByZXR1cm4gPG9wdGlvbiB2YWx1ZT17dmFsfSBrZXk9e3ZhbH0+e3ZhbH08L29wdGlvbj5cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3Mgc2V0dGluZ3MtaXRlbVwiPlxyXG4gICAgICAgICAgPHNwYW4+UGFnZSBTaXplIDwvc3Bhbj5cclxuICAgICAgICAgIDxzZWxlY3QgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLnNldHRpbmdzLnBhZ2VTaXplfVxyXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpPT57IHRoaXMudXBkYXRlKCB7IFwicGFnZVNpemVcIiA6IE51bWJlcihlLnRhcmdldC52YWx1ZSl9ICkgfX0+XHJcbiAgICAgICAgICAgIHtsaXN0fVxyXG4gICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlOYW1lU3R5bGUgPSAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHNldHRpbmdzLWl0ZW1cIj5cclxuICAgICAgICA8c3Bhbj5EaXNwbGF5IE5hbWUgU3R5bGUgPC9zcGFuPlxyXG4gICAgICAgIDxzZWxlY3QgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLnNldHRpbmdzLmRpc3BsYXlOYW1lU3R5bGV9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpPT57IHRoaXMudXBkYXRlKCB7IFwiZGlzcGxheU5hbWVTdHlsZVwiIDogZS50YXJnZXQudmFsdWV9ICkgfX0+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwidXNlcl9zY3JlZW5fbmFtZVwiPlVzZXIgSUQ8L29wdGlvbj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ1c2VyX25hbWVcIj5Vc2VyIE5hbWU8L29wdGlvbj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ1c2VyX3NjcmVlbl9uYW1lX3VzZXJfbmFtZVwiPlVzZXIgSUQgLyBVc2VyIE5hbWU8L29wdGlvbj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ1c2VyX25hbWVfdXNlcl9zY3JlZW5fbmFtZVwiPlVzZXIgTmFtZSAvIFVzZXIgSUQ8L29wdGlvbj5cclxuICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG5cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7cGFkZGluZzpcIjVweFwifX0+XHJcbiAgICAgICAge3BhZ2VTaXplfVxyXG4gICAgICAgIHtkaXNwbGF5TmFtZVN0eWxlfVxyXG4gICAgICAgIHt0aGlzLmdlbmVyYXRlRm9ybSggXCJkaXNhYmxlUmF0aW5nQ29sb3JcIiwgXCJEaXNhYmxlIFJhdGluZyBDb2xvclwiKX1cclxuICAgICAgICB7dGhpcy5nZW5lcmF0ZUZvcm0oIFwiaGlnaGxpZ2h0RnJpZW5kc1wiLCBcIkhpZ2hsaWdodCBGcmllbmRzXCIpfVxyXG4gICAgICAgIHt0aGlzLmdlbmVyYXRlRm9ybSggXCJzaG93TmF0aW9uYWxGbGFnXCIsIFwiU2hvdyBOYXRpb25hbCBGbGFnXCIpfVxyXG4gICAgICAgIHt0aGlzLmdlbmVyYXRlRm9ybSggXCJzYXZlRmlsdGVyaW5nU3RhdGVcIiwgXCJTYXZlIEZpbHRlcmluZyBTdGF0ZSAoaWYgdGhpcyBvcHRpb24gaXMgY2hlY2tlZCwgeW91ciBmaWx0ZXJpbmcgc3RhdGUgd2lsbCBiZSByZXN0b3JlZCB3aGVuIHlvdSBvcGVuIHN0YW5kaW5ncyBwYWdlKVwiKX1cclxuICAgICAgICA8aHIvPlxyXG4gICAgICAgIHt0aGlzLmdlbmVyYXRlRnJpZW5kc0xpc3RGb3JtKCl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmdzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcyApe1xyXG4gICAgaWYoIEpTT04uc3RyaW5naWZ5KCBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLnNldHRpbmdzKSApICE9PSBKU09OLnN0cmluZ2lmeSggT2JqZWN0LmFzc2lnbih7fSwgbmV4dFByb3BzLnNldHRpbmdzKSApKSByZXR1cm4gdHJ1ZTtcclxuICAgIC8vIGlmKCBKU09OLnN0cmluZ2lmeSggdGhpcy5wcm9wcy5mcmllbmRzLmdldExpc3QoKSApICE9PSBKU09OLnN0cmluZ2lmeSggbmV4dFByb3BzLmZyaWVuZHMuZ2V0TGlzdCgpICkgKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgYnV0dG9uID0gKFxyXG4gICAgICA8YSBocmVmPVwiI1wiPlxyXG4gICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zIG1kLWRhcmtcIj5zZXR0aW5nczwvaT5cclxuICAgICAgICBTZXR0aW5nc1xyXG4gICAgICA8L2E+XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybihcclxuICAgICAgPE1vZGFsIGJ1dHRvbj17YnV0dG9ufSB0aXRsZT1cIlNldHRpbmdzXCI+XHJcbiAgICAgICAgPFNldHRpbmdzQ29udGVudFxyXG4gICAgICAgICAgc2V0dGluZ3M9e3RoaXMucHJvcHMuc2V0dGluZ3N9XHJcbiAgICAgICAgICBzZXR0aW5nc1VwZGF0ZUZ1bmM9e3RoaXMucHJvcHMuc2V0dGluZ3NVcGRhdGVGdW5jfVxyXG4gICAgICAgICAgZnJpZW5kcz17dGhpcy5wcm9wcy5mcmllbmRzfVxyXG4gICAgICAgICAgZnJpZW5kc1VwZGF0ZUZ1bmM9e3RoaXMucHJvcHMuZnJpZW5kc1VwZGF0ZUZ1bmN9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9Nb2RhbD5cclxuICAgICk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IEFwcFNldHRpbmdzIGZyb20gJy4vYXBwU2V0dGluZ3MuanMnO1xyXG5cclxuY2xhc3MgU29ydGluZ0NvbnRlbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSggb3B0aW9uICl7XHJcbiAgICBsZXQgbmV3U2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKG5ldyBBcHBTZXR0aW5ncygpLCB0aGlzLnByb3BzLnNldHRpbmdzKTtcclxuICAgIGZvcihsZXQgcGFyYW0gaW4gb3B0aW9uKXtcclxuICAgICAgbmV3U2V0dGluZ3NbcGFyYW1dID0gb3B0aW9uW3BhcmFtXTtcclxuICAgIH1cclxuICAgIHRoaXMucHJvcHMuc2V0dGluZ3NVcGRhdGVGdW5jKCBuZXdTZXR0aW5ncyApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgb25PZmYgPSA8ZGl2PlxyXG4gICAgICA8YSBjbGFzc05hbWU9e2BhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgJHt0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdFbmFibGVkID8gXCJzb3J0aW5nLWVuYWJsZWRcIiA6IFwic29ydGluZy1kaXNhYmxlZFwifWB9XHJcbiAgICAgICAgIGhyZWY9XCIjXCIgb25DbGljaz17KGUpPT50aGlzLnVwZGF0ZSh7c29ydGluZ0VuYWJsZWQ6IXRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0VuYWJsZWR9KX0gPlxyXG4gICAgICAgICB7dGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nRW5hYmxlZCA/IFwiT05cIiA6IFwiT0ZGXCJ9PC9hPlxyXG4gICAgPC9kaXY+O1xyXG5cclxuICAgIGxldCBrZXlzID0gW107XHJcbiAgICBrZXlzLnB1c2goIDxhIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyAke3RoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0tleSA9PT0gXCJyYW5rXCIgPyBcInNvcnRpbmctZW5hYmxlZFwiIDogXCJzb3J0aW5nLWRpc2FibGVkXCJ9YH1cclxuICAgICAgICAgICAgICAgICAgaHJlZj1cIiNcIiBzdHlsZT17e3BhZGRpbmc6IFwiNXB4XCJ9fSBvbkNsaWNrPXsoZSkgPT4gdGhpcy51cGRhdGUoIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nS2V5IDogXCJyYW5rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ0VuYWJsZWQ6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nT3JkZXI6IHRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0tleSAhPT0gXCJyYW5rXCIgPyBcImFzY2VuZGluZ1wiIDogdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nT3JkZXIgPT09IFwiYXNjZW5kaW5nXCIgPyBcImRlc2NlbmRpbmdcIiA6IFwiYXNjZW5kaW5nXCIgLFxyXG4gICAgICAgICAgICAgICAgICB9ICl9IGtleT1cInJhbmtcIj5SYW5rPC9hPiApO1xyXG5cclxuICAgIGtleXMucHVzaCggPGEgY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzICR7dGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nS2V5ID09PSBcInRpbWVcIiA/IFwic29ydGluZy1lbmFibGVkXCIgOiBcInNvcnRpbmctZGlzYWJsZWRcIn1gfVxyXG4gICAgICAgICAgICAgICAgICBocmVmPVwiI1wiIHN0eWxlPXt7cGFkZGluZzogXCI1cHhcIn19IG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnVwZGF0ZSgge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdLZXkgOiBcInRpbWVcIixcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nRW5hYmxlZDp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdPcmRlcjogdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nS2V5ICE9PSBcInRpbWVcIiA/IFwiYXNjZW5kaW5nXCIgOiB0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdPcmRlciA9PT0gXCJhc2NlbmRpbmdcIiA/IFwiZGVzY2VuZGluZ1wiIDogXCJhc2NlbmRpbmdcIiAsXHJcbiAgICAgICAgICAgICAgICAgIH0gKX0ga2V5PVwidGltZVwiPlRpbWUod2l0aG91dCBwZW5hbHR5KTwvYT4gKTtcclxuXHJcbiAgICBrZXlzLnB1c2goIDxhIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyAke3RoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0tleSA9PT0gXCJ1c2VyX3NjcmVlbl9uYW1lXCIgPyBcInNvcnRpbmctZW5hYmxlZFwiIDogXCJzb3J0aW5nLWRpc2FibGVkXCJ9YH1cclxuICAgICAgICAgICAgICAgICAgaHJlZj1cIiNcIiBzdHlsZT17e3BhZGRpbmc6IFwiNXB4XCJ9fSBvbkNsaWNrPXsoZSkgPT4gdGhpcy51cGRhdGUoIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nS2V5IDogXCJ1c2VyX3NjcmVlbl9uYW1lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ0VuYWJsZWQ6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nT3JkZXI6IHRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0tleSAhPT0gXCJ1c2VyX3NjcmVlbl9uYW1lXCIgPyBcImFzY2VuZGluZ1wiIDogdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nT3JkZXIgPT09IFwiYXNjZW5kaW5nXCIgPyBcImRlc2NlbmRpbmdcIiA6IFwiYXNjZW5kaW5nXCIgLFxyXG4gICAgICAgICAgICAgICAgICB9ICl9IGtleT1cInVzZXJfc2NyZWVuX25hbWVcIj5OYW1lPC9hPiApO1xyXG5cclxuICAgIGtleXMucHVzaCggPGEgY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzICR7dGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nS2V5ID09PSBcInJhdGluZ1wiID8gXCJzb3J0aW5nLWVuYWJsZWRcIiA6IFwic29ydGluZy1kaXNhYmxlZFwifWB9XHJcbiAgICAgICAgICAgICAgICAgIGhyZWY9XCIjXCIgc3R5bGU9e3twYWRkaW5nOiBcIjVweFwifX0gb25DbGljaz17KGUpID0+IHRoaXMudXBkYXRlKCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ0tleSA6IFwicmF0aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ0VuYWJsZWQ6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nT3JkZXI6IHRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0tleSAhPT0gXCJyYXRpbmdcIiA/IFwiZGVzY2VuZGluZ1wiIDogdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nT3JkZXIgPT09IFwiYXNjZW5kaW5nXCIgPyBcImRlc2NlbmRpbmdcIiA6IFwiYXNjZW5kaW5nXCIgLFxyXG4gICAgICAgICAgICAgICAgICB9ICl9IGtleT1cInJhdGluZ1wiPlJhdGluZzwvYT4gKTtcclxuICAgIGtleXMucHVzaCggPGEgY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzICR7dGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nS2V5ID09PSBcImNvdW50cnlcIiA/IFwic29ydGluZy1lbmFibGVkXCIgOiBcInNvcnRpbmctZGlzYWJsZWRcIn1gfVxyXG4gICAgICAgICAgICAgICAgICBocmVmPVwiI1wiIHN0eWxlPXt7cGFkZGluZzogXCI1cHhcIn19IG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnVwZGF0ZSgge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdLZXkgOiBcImNvdW50cnlcIixcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nRW5hYmxlZDp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdPcmRlcjogdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nS2V5ICE9PSBcImNvdW50cnlcIiA/IFwiYXNjZW5kaW5nXCIgOiB0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdPcmRlciA9PT0gXCJhc2NlbmRpbmdcIiA/IFwiZGVzY2VuZGluZ1wiIDogXCJhc2NlbmRpbmdcIiAsXHJcbiAgICAgICAgICAgICAgICAgIH0gKX0ga2V5PVwiY291bnRyeVwiPkNvdW50cnk8L2E+ICk7XHJcbiAgICBcclxuICAgIGxldCBrZXlzVGFza3MgPSBbXTtcclxuICAgIGZvcihsZXQgaT0wOyBpPHRoaXMucHJvcHMuY29udGVzdC5udW1UYXNrczsgaSsrKXtcclxuICAgICAga2V5c1Rhc2tzLnB1c2goIDxhIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyAke3RoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0tleSA9PT0gYHRhc2ske2l9YCA/IFwic29ydGluZy1lbmFibGVkXCIgOiBcInNvcnRpbmctZGlzYWJsZWRcIn1gfVxyXG4gICAgICAgICAgICAgICAgICAgIGhyZWY9XCIjXCIgc3R5bGU9e3twYWRkaW5nOiBcIjVweFwifX0gb25DbGljaz17KGUpID0+IHRoaXMudXBkYXRlKCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBzb3J0aW5nS2V5IDogYHRhc2ske2l9YCxcclxuICAgICAgICAgICAgICAgICAgICAgIHNvcnRpbmdFbmFibGVkOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICBzb3J0aW5nT3JkZXI6IHRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0tleSAhPT0gYHRhc2ske2l9YCA/IFwiZGVzY2VuZGluZ1wiIDogdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nT3JkZXIgPT09IFwiYXNjZW5kaW5nXCIgPyBcImRlc2NlbmRpbmdcIiA6IFwiYXNjZW5kaW5nXCIgLFxyXG4gICAgICAgICAgICAgICAgICAgIH0gKX0ga2V5PXtgdGFzayR7aX1gfT5UYXNrLXtcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCJbaV19PC9hPiApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBvcmRlcjtcclxuICAgIGlmKCB0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdPcmRlciA9PT0gXCJhc2NlbmRpbmdcIil7XHJcbiAgICAgIG9yZGVyID0gPGEgaHJlZj1cIiNcIiBvbkNsaWNrPXsoZSk9PnRoaXMudXBkYXRlKCB7c29ydGluZ09yZGVyOiBcImRlc2NlbmRpbmdcIiwgc29ydGluZ0VuYWJsZWQ6dHJ1ZX0gKX0+XHJcbiAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT17e3RyYW5zZm9ybTpcInNjYWxlKDEsLTEpXCJ9fT5zb3J0PC9pPiBBc2NlbmRpbmdcclxuICAgICAgPC9hPjtcclxuICAgIH1lbHNle1xyXG4gICAgICBvcmRlciA9IDxhIGhyZWY9XCIjXCIgb25DbGljaz17KGUpPT50aGlzLnVwZGF0ZSgge3NvcnRpbmdPcmRlcjogXCJhc2NlbmRpbmdcIiwgc29ydGluZ0VuYWJsZWQ6dHJ1ZX0gKX0+XHJcbiAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5zb3J0PC9pPiBEZXNjZW5kaW5nXHJcbiAgICAgIDwvYT47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKCBcclxuICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjpcImFic29sdXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzpcIjIwcHhcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOlwid2hpdGVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OlwiNHB4IDRweCA4cHggNHB4IGdyZXlcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOlwiNnB4IDZweCA2cHggNnB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBgJHt0aGlzLnByb3BzLnBvc1kgKyA0MH1weGAsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDpgJHt0aGlzLnByb3BzLnBvc1h9cHhgfX1cclxuICAgICAgICAgICBvbkNsaWNrPXsoZSk9PmUuc3RvcFByb3BhZ2F0aW9uKCl9ID5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcImdyaWRcIiwgZ3JpZFRlbXBsYXRlUm93czpcImF1dG8gYXV0byBhdXRvXCIsIGdyaWRUZW1wbGF0ZUNvbHVtbnM6XCJhdXRvIDFmclwifX0+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7Z3JpZFJvdzpcIjEvMlwiLCBncmlkQ29sdW1uOlwiMS8yXCIsIHBhZGRpbmc6XCIycHhcIn19Pntvbk9mZn08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tncmlkUm93OlwiMi8zXCIsIGdyaWRDb2x1bW46XCIxLzJcIiwgcGFkZGluZzpcIjJweFwifX0+S2V5IDo8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tncmlkUm93OlwiMi8zXCIsIGdyaWRDb2x1bW46XCIyLzNcIiwgcGFkZGluZzpcIjJweFwifX0+e2tleXN9PGJyLz57a2V5c1Rhc2tzfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIzLzRcIiwgZ3JpZENvbHVtbjpcIjEvMlwiLCBwYWRkaW5nOlwiMnB4XCJ9fT5PcmRlciA6PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7Z3JpZFJvdzpcIjMvNFwiLCBncmlkQ29sdW1uOlwiMi8zXCIsIHBhZGRpbmc6XCIycHhcIn19PntvcmRlcn08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29ydGluZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBzaG93IDogZmFsc2UsXHJcbiAgICAgIHBvc1ggOiAwLFxyXG4gICAgICBwb3NZIDogMFxyXG4gICAgfTtcclxuXHJcbiAgfVxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IGJ1dHRvbiA9IChcclxuICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9e2BhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgJHt0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdFbmFibGVkID8gXCJzb3J0aW5nLWVuYWJsZWRcIiA6IFwic29ydGluZy1kaXNhYmxlZFwifWB9PlxyXG4gICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+c29ydDwvaT5cclxuICAgICAgICBTb3J0XHJcbiAgICAgIDwvYT5cclxuICAgICk7XHJcblxyXG4gICAgaWYoIHRoaXMuc3RhdGUuc2hvdyA9PT0gZmFsc2UgKXtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBjb250cm9sbGVyLWJ1dHRvblwiPlxyXG4gICAgICAgICAgPGRpdiBvbkNsaWNrPXsgKGUpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlY3QgPSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgge3Nob3cgOiAhdGhpcy5zdGF0ZS5zaG93LCBwb3NYOnJlY3QubGVmdCwgcG9zWTpyZWN0LnRvcCB9KSA7XHJcbiAgICAgICAgICB9IH0+XHJcbiAgICAgICAgICAgIHtidXR0b259XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGNvbnRyb2xsZXItYnV0dG9uXCI+XHJcbiAgICAgICAgICA8ZGl2IG9uQ2xpY2s9eyhlKT0+dGhpcy5zZXRTdGF0ZSh7c2hvdzohdGhpcy5zdGF0ZS5zaG93fSl9ID57YnV0dG9ufTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOlwiZml4ZWRcIiwgbGVmdDowLCB0b3A6MCwgd2lkdGg6XCIxMDAlXCIsIGhlaWdodDpcIjEwMCVcIn19XHJcbiAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKT0+dGhpcy5zZXRTdGF0ZSh7c2hvdzpmYWxzZX0pfT5cclxuICAgICAgICAgICAgPFNvcnRpbmdDb250ZW50IHNldHRpbmdzPXt0aGlzLnByb3BzLnNldHRpbmdzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdD17dGhpcy5wcm9wcy5jb250ZXN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3NVcGRhdGVGdW5jPXt0aGlzLnByb3BzLnNldHRpbmdzVXBkYXRlRnVuY31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc1g9e3RoaXMuc3RhdGUucG9zWH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc1k9e3RoaXMuc3RhdGUucG9zWX0vPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtyYXRpbmcsY291bnRyaWVzfSBmcm9tICcuL3V0aWwuanMnXHJcbmltcG9ydCBNZSBmcm9tICcuL3VzZXJpbmZvLmpzJztcclxuXHJcbmNsYXNzIFVzZXJEZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCl7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdXNlci1kcm9wZG93bi1tZW51LSR7dGhpcy5wcm9wcy5yb3cudXNlcl9uYW1lfWApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9KTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB1c2VyLWRyb3Bkb3duLW1lbnUtJHt0aGlzLnByb3BzLnJvdy51c2VyX25hbWV9LWZyaWVuZGApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XHJcbiAgICAgIHRoaXMucHJvcHMuZnJpZW5kc1VwZGF0ZUZ1bmMoIFt0aGlzLnByb3BzLnJvdy51c2VyX3NjcmVlbl9uYW1lXSwgIXRoaXMucHJvcHMuaXNGcmllbmQpO1xyXG4gICAgfSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wcm9wcy5jbG9zZUZ1bmMsIHtvbmNlOnRydWV9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgY29uc3QgbGluayA9IGBodHRwczovL2F0Y29kZXIuanAvdXNlci8ke3RoaXMucHJvcHMucm93LnVzZXJfc2NyZWVuX25hbWV9YDtcclxuICAgIGNvbnN0IHN1Ym1pc3Npb25zID0gKFxyXG4gICAgICA8YSBocmVmPXtgL3N1Ym1pc3Npb25zL2FsbD91c2VyX3NjcmVlbl9uYW1lPSR7dGhpcy5wcm9wcy5yb3cudXNlcl9zY3JlZW5fbmFtZX1gfSB0YXJnZXQ9XCJfYmxhbmtcIj5cclxuICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29ucyBtZC0xOFwiPnNlYXJjaDwvaT5cclxuICAgICAgICBTdWJtaXNzaW9uc1xyXG4gICAgICA8L2E+XHJcbiAgICApO1xyXG4gICAgY29uc3QgcmF0aW5nQ29sb3IgPSByYXRpbmcuZ2V0Q29sb3JPcmlnaW5hbCh0aGlzLnByb3BzLnJvdy5yYXRpbmcpO1xyXG5cclxuICAgIGNvbnN0IGZyaWVuZCA9IChcclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGN1cnNvci1saW5rXCI+XHJcbiAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnMgbWQtMThcIj57dGhpcy5wcm9wcy5pc0ZyaWVuZCA/IFwicGVyc29uX291dGxpbmVcIiA6IFwicGVyc29uX2FkZFwifTwvaT5cclxuICAgICAgICB7dGhpcy5wcm9wcy5pc0ZyaWVuZCA/IFwiUmVtb3ZlIGZyb20gRnJpZW5kcyBMaXN0XCIgOiBcIkFkZCB0byBGcmllbmRzIExpc3RcIn1cclxuICAgICAgPC9zcGFuPlxyXG4gICAgKTtcclxuICAgIGNvbnN0IHR3aXR0ZXIgPSB0aGlzLnByb3BzLnJvdy50d2l0dGVyX2lkID09IFwiXCIgPyBcIlwiIDogKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyB1c2VyLWRyb3Bkb3duLW1lbnVcIj5cclxuICAgICAgICBUd2l0dGVySUQgOiBcclxuICAgICAgICA8YSBocmVmPXtgaHR0cHM6Ly90d2l0dGVyLmNvbS8ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLnByb3BzLnJvdy50d2l0dGVyX2lkKX1gfSB0YXJnZXQ9XCJfYmxhbmtcIj5cclxuICAgICAgICAgIHt0aGlzLnByb3BzLnJvdy50d2l0dGVyX2lkfVxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9kaXY+ICk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBpZD17YHVzZXItZHJvcGRvd24tbWVudS0ke3RoaXMucHJvcHMucm93LnVzZXJfbmFtZX1gfVxyXG4gICAgICAgICAgIGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyB1c2VyLWRyb3Bkb3duLW1lbnUtYm94XCI+XHJcbiAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHVzZXItZHJvcGRvd24tbWVudVwiPlxyXG4gICAgICAgICAgIDxhIGhyZWY9e2xpbmt9IGNsYXNzTmFtZT17YHVzZXJuYW1lICR7dGhpcy5wcm9wcy5jb2xvcn1gfSB0YXJnZXQ9XCJfYmxhbmtcIj5cclxuICAgICAgICAgICAgIHt0aGlzLnByb3BzLnJvdy51c2VyX25hbWV9IC8ge3RoaXMucHJvcHMucm93LnVzZXJfc2NyZWVuX25hbWV9XHJcbiAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgdXNlci1kcm9wZG93bi1tZW51XCI+XHJcbiAgICAgICAgICAge3N1Ym1pc3Npb25zfVxyXG4gICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgdXNlci1kcm9wZG93bi1tZW51XCI+XHJcbiAgICAgICAgICAgUmF0aW5nIDogPHNwYW4gc3R5bGU9e3tjb2xvcjpyYXRpbmdDb2xvciwgZm9udFdlaWdodDpcImJvbGRcIn19Pnt0aGlzLnByb3BzLnJvdy5yYXRpbmd9PC9zcGFuPlxyXG4gICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgdXNlci1kcm9wZG93bi1tZW51XCI+XHJcbiAgICAgICAgICAgPHNwYW4gdGl0bGU9XCJ0aGUgbnVtYmVyIG9mIHJhdGVkIGNvbnRlc3RzXCI+Q29tcGV0aXRpb25zIDoge3RoaXMucHJvcHMucm93LmNvbXBldGl0aW9uc308L3NwYW4+XHJcbiAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyB1c2VyLWRyb3Bkb3duLW1lbnVcIj5cclxuICAgICAgICAgICBDb3VudHJ5IDogPGltZyBzcmM9e2AvaW1nL2ZsYWcvJHt0aGlzLnByb3BzLnJvdy5jb3VudHJ5fS5wbmdgfSBzdHlsZT17e3ZlcnRpY2FsQWxpZ246IFwibWlkZGxlXCIsIHdpZHRoOiBcIjE2cHhcIiwgaGVpZ2h0OiBcIjE2cHhcIn19IC8+XHJcbiAgICAgICAgICAge2NvdW50cmllc1t0aGlzLnByb3BzLnJvdy5jb3VudHJ5XX1cclxuICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgIHt0d2l0dGVyfVxyXG4gICAgICAgICA8ZGl2IGlkPXtgdXNlci1kcm9wZG93bi1tZW51LSR7dGhpcy5wcm9wcy5yb3cudXNlcl9uYW1lfS1mcmllbmRgfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyB1c2VyLWRyb3Bkb3duLW1lbnVcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLnJvdy51c2VyX3NjcmVlbl9uYW1lID09PSBNZS51c2VyX3NjcmVlbl9uYW1lID8ge2Rpc3BsYXk6XCJub25lXCJ9IDoge319PlxyXG4gICAgICAgICAgIHtmcmllbmR9XHJcbiAgICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgTmFtZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBzaG93IDogZmFsc2VcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcywgbmV4dFN0YXRlICl7XHJcbiAgICBpZiggdGhpcy5wcm9wcy5zZXR0aW5ncy5kaXNwbGF5TmFtZVN0eWxlICE9PSBuZXh0UHJvcHMuc2V0dGluZ3MuZGlzcGxheU5hbWVTdHlsZSApIHJldHVybiB0cnVlO1xyXG4gICAgaWYoIHRoaXMucHJvcHMuc2V0dGluZ3MuZGlzYWJsZVJhdGluZ0NvbG9yICE9PSBuZXh0UHJvcHMuc2V0dGluZ3MuZGlzYWJsZVJhdGluZ0NvbG9yICkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiggdGhpcy5wcm9wcy5zZXR0aW5ncy5zaG93TmF0aW9uYWxGbGFnICE9PSBuZXh0UHJvcHMuc2V0dGluZ3Muc2hvd05hdGlvbmFsRmxhZyApIHJldHVybiB0cnVlO1xyXG4gICAgaWYoIHRoaXMuc3RhdGUuc2hvdyAhPT0gbmV4dFN0YXRlLnNob3cgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKCB0aGlzLnByb3BzLmlzRnJpZW5kICE9PSBuZXh0UHJvcHMuaXNGcmllbmQgKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgY29uc3Qgcm93ID0gdGhpcy5wcm9wcy5yb3c7XHJcbiAgICBjb25zdCBjb2xvciA9IHRoaXMucHJvcHMuc2V0dGluZ3MuZGlzYWJsZVJhdGluZ0NvbG9yID8gXCJcIiA6IHJhdGluZy51c2VyQ29sb3JbIHJhdGluZy5nZXRMZXZlbChyb3cucmF0aW5nKSBdO1xyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlOYW1lID0gKCgpPT57XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdXNlcl9zY3JlZW5fbmFtZSA6IHJvdy51c2VyX3NjcmVlbl9uYW1lLFxyXG4gICAgICAgIHVzZXJfbmFtZSA6IHJvdy51c2VyX25hbWUsXHJcbiAgICAgICAgdXNlcl9zY3JlZW5fbmFtZV91c2VyX25hbWUgOiBgJHtyb3cudXNlcl9zY3JlZW5fbmFtZX0gLyAke3Jvdy51c2VyX25hbWV9YCxcclxuICAgICAgICB1c2VyX25hbWVfdXNlcl9zY3JlZW5fbmFtZSA6IGAke3Jvdy51c2VyX25hbWV9IC8gJHtyb3cudXNlcl9zY3JlZW5fbmFtZX1gXHJcbiAgICAgIH1bdGhpcy5wcm9wcy5zZXR0aW5ncy5kaXNwbGF5TmFtZVN0eWxlXTtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgY29uc3QgY291bnRyeUZsYWcgPSB0aGlzLnByb3BzLnNldHRpbmdzLnNob3dOYXRpb25hbEZsYWcgPyAoPGltZyBzcmM9e2AvaW1nL2ZsYWcvJHtyb3cuY291bnRyeX0ucG5nYH0gc3R5bGU9e3t2ZXJ0aWNhbEFsaWduOiBcIm1pZGRsZVwiLCB3aWR0aDogXCIxNnB4XCIsIGhlaWdodDogXCIxNnB4XCJ9fSAvPikgOiBcIlwiO1xyXG5cclxuICAgIGNvbnN0IG5hbWVPbmNsaWNrID0gKGUpID0+IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgc2hvdyA6ICF0aGlzLnN0YXRlLnNob3dcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmKCB0aGlzLnN0YXRlLnNob3cgPT09IGZhbHNlICl7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cInN0YW5kaW5ncy11c2VybmFtZVwiIG9uQ2xpY2s9e25hbWVPbmNsaWNrfT5cclxuICAgICAgICAgIHtjb3VudHJ5RmxhZ31cclxuICAgICAgICAgIHtcIiBcIn1cclxuICAgICAgICAgIHtyb3cucmF0aW5nID49IDMyMDAgPyA8aW1nIHNyYz17YC9pbWcvaWNvbi9jcm93biR7cm93LnJhdGluZyAtIHJvdy5yYXRpbmclNDAwfS5naWZgfSBzdHlsZT17e3ZlcnRpY2FsQWxpZ246IFwibWlkZGxlXCJ9fS8+IDogbnVsbH1cclxuICAgICAgICAgIHtyb3cucmF0aW5nID49IDMyMDAgPyBcIiBcIiA6IG51bGx9XHJcbiAgICAgICAgICA8YSBjbGFzc05hbWU9e2B1c2VybmFtZSAke2NvbG9yfWB9PntkaXNwbGF5TmFtZX08L2E+XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgKTtcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDx0ZCBjbGFzc05hbWU9XCJzdGFuZGluZ3MtdXNlcm5hbWVcIiBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7c2hvdzpmYWxzZX0pfT5cclxuICAgICAgICAgIHtjb3VudHJ5RmxhZ31cclxuICAgICAgICAgIHtcIiBcIn1cclxuICAgICAgICAgIHtyb3cucmF0aW5nID49IDMyMDAgPyA8aW1nIHNyYz17YC9pbWcvaWNvbi9jcm93biR7cm93LnJhdGluZyAtIHJvdy5yYXRpbmclNDAwfS5naWZgfSBzdHlsZT17e3ZlcnRpY2FsQWxpZ246IFwibWlkZGxlXCJ9fS8+IDogbnVsbH1cclxuICAgICAgICAgIHtyb3cucmF0aW5nID49IDMyMDAgPyBcIiBcIiA6IG51bGx9XHJcbiAgICAgICAgICA8YSBjbGFzc05hbWU9e2B1c2VybmFtZSAke2NvbG9yfWB9PntkaXNwbGF5TmFtZX08L2E+XHJcbiAgICAgICAgICA8VXNlckRldGFpbHMgZnJpZW5kc1VwZGF0ZUZ1bmM9e3RoaXMucHJvcHMuZnJpZW5kc1VwZGF0ZUZ1bmN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9e2NvbG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgIGlzRnJpZW5kPXt0aGlzLnByb3BzLmlzRnJpZW5kfVxyXG4gICAgICAgICAgICAgICAgICAgICAgIHJvdz17cm93fVxyXG4gICAgICAgICAgICAgICAgICAgICAgIGNsb3NlRnVuYz17KCk9PnRoaXMuc2V0U3RhdGUoe3Nob3c6ZmFsc2V9KX0vPlxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBUYXNrIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcblxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzICl7XHJcbiAgICBpZiggSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcy50YXNrKSAhPT0gSlNPTi5zdHJpbmdpZnkobmV4dFByb3BzLnRhc2spICkgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IHQgPSB0aGlzLnByb3BzLnRhc2s7XHJcbiAgICBpZiggdC5leHRyYXMgPT09IHRydWUgJiYgdGhpcy5wcm9wcy5tZSA9PT0gZmFsc2UgKXtcclxuICAgICAgcmV0dXJuIDx0ZCBjbGFzc05hbWU9XCJjZW50ZXIgc3RhbmRpbmdzLWZyb3plblwiPjwvdGQ+XHJcbiAgICB9XHJcbiAgICBpZiggdC5lbGFwc2VkX3RpbWUgPT09IHVuZGVmaW5lZCApe1xyXG4gICAgICByZXR1cm4gPHRkIGNsYXNzTmFtZT1cImNlbnRlclwiPi08L3RkPlxyXG4gICAgfVxyXG4gICAgaWYoIHQuc2NvcmUgPT09IDAgKXtcclxuICAgICAgcmV0dXJuIDx0ZCBjbGFzc05hbWU9XCJjZW50ZXIgc3RhbmRpbmdzLXdhXCI+KHt0LmZhaWx1cmV9KTwvdGQ+XHJcbiAgICB9XHJcbiAgICBsZXQgcGVuYWx0eSA9IFwiXCI7XHJcbiAgICBpZih0LmZhaWx1cmUgIT09IDApe1xyXG4gICAgICBwZW5hbHR5ID0gPHNwYW4gY2xhc3NOYW1lPVwic3RhbmRpbmdzLXdhXCI+KHt0LmZhaWx1cmV9KTwvc3Bhbj47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHN1Ym1pc3Npb24gPSB0aGlzLnByb3BzLmNvbnRlc3RFbmRlZCA/ICA8YSBocmVmPXt0aGlzLnByb3BzLnN1Ym1pc3Npb25MaW5rfSB0YXJnZXQ9XCJfYmxhbmtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29ucyBtZC0xOCBtZC1kYXJrXCIgc3R5bGU9e3t2ZXJ0aWNhbEFsaWduOlwiYm90dG9tXCJ9fT5zZWFyY2g8L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT4gOiBcIlwiO1xyXG5cclxuICAgIGNvbnN0IHRpbWVNaW4gPSBgJHtNYXRoLmZsb29yKHQuZWxhcHNlZF90aW1lLzYwKTwxMD9cIjBcIjpcIlwifSR7TWF0aC5mbG9vcih0LmVsYXBzZWRfdGltZS82MCl9YDtcclxuICAgIGNvbnN0IHRpbWVTZWMgPSBgMDAke01hdGguZmxvb3IodC5lbGFwc2VkX3RpbWUlNjApfWAuc2xpY2UoLTIpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRkIGNsYXNzTmFtZT1cImNlbnRlclwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN0YW5kaW5ncy1hY1wiPnt0LnNjb3JlLzEwMH08L3NwYW4+e3BlbmFsdHl9e3N1Ym1pc3Npb259XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHRpbWVzdGFtcFwiPnt0aW1lTWlufTp7dGltZVNlY308L3NwYW4+XHJcbiAgICAgIDwvdGQ+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgVG90YWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMgKXtcclxuICAgIGNvbnN0IGNvbXAgPSBbXCJlbGFwc2VkX3RpbWVcIiwgXCJmYWlsdXJlXCIsIFwicGVuYWx0eVwiLCBcInNjb3JlXCJdO1xyXG4gICAgZm9yKGNvbnN0IHBhcmFtIG9mIGNvbXApe1xyXG4gICAgICBpZiggdGhpcy5wcm9wcy5yb3dbcGFyYW1dICE9PSBuZXh0UHJvcHMucm93W3BhcmFtXSApIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBpZiggdGhpcy5wcm9wcy5yb3cuZWxhcHNlZF90aW1lID09PSBcIjBcIiApe1xyXG4gICAgICAgIHJldHVybiA8dGQgY2xhc3NOYW1lPVwiY2VudGVyXCI+PHA+LTwvcD48L3RkPjtcclxuICAgIH1cclxuICAgIGxldCBwZW5hbHR5ID0gXCJcIjtcclxuICAgIGlmKHRoaXMucHJvcHMucm93LmZhaWx1cmUgIT09IFwiMFwiKXtcclxuICAgICAgcGVuYWx0eSA9IDxzcGFuIGNsYXNzTmFtZT1cInN0YW5kaW5ncy13YVwiPih7dGhpcy5wcm9wcy5yb3cuZmFpbHVyZX0pPC9zcGFuPjtcclxuICAgIH1cclxuICAgIGNvbnN0IHRpbWVNaW4gPSBgJHtNYXRoLmZsb29yKHRoaXMucHJvcHMucm93LmVsYXBzZWRfdGltZS82MCk8MTA/XCIwXCI6XCJcIn0ke01hdGguZmxvb3IodGhpcy5wcm9wcy5yb3cuZWxhcHNlZF90aW1lLzYwKX1gO1xyXG4gICAgY29uc3QgdGltZVNlYyA9IGAwMCR7TWF0aC5mbG9vcih0aGlzLnByb3BzLnJvdy5lbGFwc2VkX3RpbWUlNjApfWAuc2xpY2UoLTIpO1xyXG5cclxuICAgIGNvbnN0IHBlbmFsdHlNaW4gPSBgJHtNYXRoLmZsb29yKHRoaXMucHJvcHMucm93LnBlbmFsdHkvNjApPDEwP1wiMFwiOlwiXCJ9JHtNYXRoLmZsb29yKHRoaXMucHJvcHMucm93LnBlbmFsdHkvNjApfWA7XHJcbiAgICBjb25zdCBwZW5hbHR5U2VjID0gYDAwJHtNYXRoLmZsb29yKHRoaXMucHJvcHMucm93LnBlbmFsdHklNjApfWAuc2xpY2UoLTIpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRkIGNsYXNzTmFtZT1cImNlbnRlclwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInN0YW5kaW5ncy1zY29yZVwiPnt0aGlzLnByb3BzLnJvdy5zY29yZS8xMDB9PC9zcGFuPntwZW5hbHR5fVxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyB0aW1lc3RhbXBcIj57cGVuYWx0eU1pbn06e3BlbmFsdHlTZWN9ICh7dGltZU1pbn06e3RpbWVTZWN9KTwvc3Bhbj5cclxuICAgICAgPC90ZD5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG4vKlxyXG4gcmFua1xyXG4gbmFtZVxyXG4gaWRcclxuIHJhdGluZ1xyXG4gY291bnRyeVxyXG4gdGFza3NbXVxyXG4gc2NvcmVcclxuIGVsYXBzZWRfdGltZVxyXG4gcGVuYWx0eVxyXG4qL1xyXG5jbGFzcyBTdGFuZGluZ3NSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcblxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzICl7XHJcbiAgICBpZiggSlNPTi5zdHJpbmdpZnkoIE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuc2V0dGluZ3MpICkgIT09IEpTT04uc3RyaW5naWZ5KCBPYmplY3QuYXNzaWduKHt9LCBuZXh0UHJvcHMuc2V0dGluZ3MpICkgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKCBKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzLnJvdykgIT09IEpTT04uc3RyaW5naWZ5KG5leHRQcm9wcy5yb3cpICkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiggdGhpcy5wcm9wcy5pc0ZyaWVuZCAhPT0gbmV4dFByb3BzLmlzRnJpZW5kICkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiggdGhpcy5wcm9wcy5maWx0ZXJlZFJhbmsgIT09IG5leHRQcm9wcy5maWx0ZXJlZFJhbmsgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKCB0aGlzLnByb3BzLmNvbnRlc3RFbmRlZCAhPT0gbmV4dFByb3BzLmNvbnRlc3RFbmRlZCApIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBjb25zdCBuYW1lID0gPE5hbWUgc2V0dGluZ3M9e3RoaXMucHJvcHMuc2V0dGluZ3N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcm93PXt0aGlzLnByb3BzLnJvd31cclxuICAgICAgICAgICAgICAgICAgICAgICBpc0ZyaWVuZD17dGhpcy5wcm9wcy5pc0ZyaWVuZH1cclxuICAgICAgICAgICAgICAgICAgICAgICBmcmllbmRzVXBkYXRlRnVuYz17dGhpcy5wcm9wcy5mcmllbmRzVXBkYXRlRnVuY30vPjtcclxuXHJcbiAgICBjb25zdCB0YXNrcyA9IHRoaXMucHJvcHMucm93LnRhc2tzLm1hcCggKHQsIGkpID0+IHtcclxuICAgICAgcmV0dXJuIDxUYXNrIHRhc2s9e3R9XHJcbiAgICAgICAgICAgICAgICAgICBrZXk9e2l9IFxyXG4gICAgICAgICAgICAgICAgICAgbWU9e01lLmNvbnRlc3RhbnQgPT09IHRydWUgJiYgdGhpcy5wcm9wcy5yb3cudXNlcl9pZCA9PT0gTWUudXNlcl9pZH1cclxuICAgICAgICAgICAgICAgICAgIHN1Ym1pc3Npb25MaW5rPXtgLi9zdWJtaXNzaW9ucy9hbGw/dGFza19zY3JlZW5fbmFtZT0ke3RoaXMucHJvcHMudGFza0RhdGFbaV0udXJsLnNsaWNlKDcpfSZ1c2VyX3NjcmVlbl9uYW1lPSR7dGhpcy5wcm9wcy5yb3cudXNlcl9zY3JlZW5fbmFtZX1gfVxyXG4gICAgICAgICAgICAgICAgICAgY29udGVzdEVuZGVkPXt0aGlzLnByb3BzLmNvbnRlc3RFbmRlZH0vPjtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRvdGFsID0gPFRvdGFsIHJvdz17dGhpcy5wcm9wcy5yb3d9IC8+O1xyXG5cclxuICAgIGxldCB0ckNsYXNzID0gXCJcIjtcclxuICAgIGlmKCB0aGlzLnByb3BzLmlzRnJpZW5kICYmIHRoaXMucHJvcHMuc2V0dGluZ3MuaGlnaGxpZ2h0RnJpZW5kcyA9PT0gdHJ1ZSApIHRyQ2xhc3MgPSBcInN0YW5kaW5ncy1mcmllbmRcIjtcclxuICAgIGlmKCBNZS5jb250ZXN0YW50ID09PSB0cnVlICYmIHRoaXMucHJvcHMucm93LnVzZXJfaWQgPT09IE1lLnVzZXJfaWQgKSB0ckNsYXNzID0gXCJzdGFuZGluZ3MtbWVcIjtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgPHRyIGNsYXNzTmFtZT17dHJDbGFzc30+XHJcbiAgICAgIDx0ZCBjbGFzc05hbWU9XCJzdGFuZGluZ3MtcmFua1wiPlxyXG4gICAgICAgIHt0aGlzLnByb3BzLnJvdy5yYW5rfXt0aGlzLnByb3BzLnNldHRpbmdzLmlzRmlsdGVyc0VuYWJsZWQoKSB8fCB0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdFbmFibGVkID9gICgke3RoaXMucHJvcHMuZmlsdGVyZWRSYW5rfSlgOlwiXCJ9XHJcbiAgICAgIDwvdGQ+XHJcbiAgICAgIHtuYW1lfVxyXG4gICAgICB7dGFza3N9XHJcbiAgICAgIHt0b3RhbH1cclxuICAgIDwvdHI+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgU3RhbmRpbmdzSGVhZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoKXtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcmVuZGVyKCl7XHJcbiAgICBjb25zdCB0YXNrcyA9IHRoaXMucHJvcHMudGFza0RhdGEubWFwKCAodCwgaSkgPT4ge1xyXG4gICAgICByZXR1cm4gKDx0aCBjbGFzc05hbWU9XCJjZW50ZXJcIiBrZXk9e2B0YXNrLSR7aX1gfT5cclxuICAgICAgICA8YSBocmVmPXt0LnVybH0gdGFyZ2V0PVwiX2JsYW5rXCI+e3QubmFtZX08L2E+XHJcbiAgICAgIDwvdGg+KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRyPlxyXG4gICAgICAgIDx0aCBjbGFzc05hbWU9XCJjZW50ZXJcIj57XCJSYW5rXCJ9PC90aD5cclxuICAgICAgICA8dGggY2xhc3NOYW1lPVwiY2VudGVyXCI+e1wiVXNlciBOYW1lXCJ9PC90aD5cclxuICAgICAgICB7dGFza3N9XHJcbiAgICAgICAgPHRoIGNsYXNzTmFtZT1cImNlbnRlclwiPntcIlNjb3JlIC8gVGltZVwifTwvdGg+XHJcbiAgICAgIDwvdHI+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhbmRpbmdzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGxldCBzdGFuZGluZ3NSb3dzID0gXCJcIjtcclxuICAgIGlmKCB0aGlzLnByb3BzLnN0YW5kaW5ncy5sZW5ndGggPiAwICl7XHJcbiAgICAgIHN0YW5kaW5nc1Jvd3MgPSB0aGlzLnByb3BzLnN0YW5kaW5ncy5tYXAoIChyb3csIGkpID0+IHtcclxuICAgICAgICBsZXQgaXNGcmllbmQgPSB0aGlzLnByb3BzLmZyaWVuZHMuaXNGcmllbmQoIHJvdy51c2VyX3NjcmVlbl9uYW1lICk7XHJcbiAgICAgICAgcmV0dXJuIDxTdGFuZGluZ3NSb3cgcm93PXtyb3d9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M9e3RoaXMucHJvcHMuc2V0dGluZ3N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtyb3cudXNlcl9pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0ZyaWVuZD17aXNGcmllbmR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJpZW5kc1VwZGF0ZUZ1bmM9e3RoaXMucHJvcHMuZnJpZW5kc1VwZGF0ZUZ1bmN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRSYW5rPXt0aGlzLnByb3BzLm9mZlNldCArIGkgKyAxfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tEYXRhPXt0aGlzLnByb3BzLnRhc2tEYXRhfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3RFbmRlZD17dGhpcy5wcm9wcy5jb250ZXN0RW5kZWR9Lz5cclxuICAgICAgfSApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJlZCB0YWJsZS1jb25kZW5zZWQgdGFibGUtc3RhbmRpbmdzIHRhYmxlLXNvcnRcIj5cclxuICAgICAgPHRoZWFkPlxyXG4gICAgICAgIDxTdGFuZGluZ3NIZWFkIHRhc2tEYXRhPXt0aGlzLnByb3BzLnRhc2tEYXRhfS8+XHJcbiAgICAgIDwvdGhlYWQ+XHJcbiAgICAgIDx0Ym9keT5cclxuICAgICAgICB7c3RhbmRpbmdzUm93c31cclxuICAgICAgPC90Ym9keT5cclxuICAgIDwvdGFibGU+XHJcbiAgICApO1xyXG4gIH1cclxufSIsImltcG9ydCBTdGF0c1N1bW1hcnkgZnJvbSAnLi9zdGF0cy9zdW1tYXJ5LmpzJ1xyXG5pbXBvcnQgU3RhdHNUYXNrIGZyb20gJy4vc3RhdHMvdGFzay5qcydcclxuaW1wb3J0IE1vZGFsIGZyb20gJy4vbW9kYWwuanMnXHJcblxyXG5jbGFzcyBTdGF0c0NvbnRlbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgcGFnZTogMCB9O1xyXG4gIH1cclxuXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMsIG5leHRTdGF0ZSApe1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucGFnZSAhPT0gbmV4dFN0YXRlLnBhZ2U7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGxldCB0YWIgPSB0aGlzLnByb3BzLmNvbnRlc3QudGFza3MubWFwKCAodCxpKSA9PiB7XHJcbiAgICAgIGlmKCB0aGlzLnN0YXRlLnBhZ2UgPT09IGkgKXtcclxuICAgICAgICByZXR1cm4gKDxsaSBjbGFzc05hbWU9XCJhY3RpdmVcIiBrZXk9e2Ake2l9YH0+PGEgaHJlZj1cIiNcIj57J0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJ1tpXX08L2E+PC9saT4pO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gKDxsaSBrZXk9e2Ake2l9YH0+PGEgaHJlZj1cIiNcIiBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cGFnZTppfSk7XHJcbiAgICAgICAgfX0+eydBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWidbaV19PC9hPjwvbGk+KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGNvbXBvbmVudDtcclxuICAgIGlmKHRoaXMuc3RhdGUucGFnZSA9PT0gdGhpcy5wcm9wcy5jb250ZXN0Lm51bVRhc2tzKXtcclxuICAgICAgdGFiLnB1c2goIDxsaSBjbGFzc05hbWU9XCJhY3RpdmVcIiBrZXk9e2Ake3RoaXMucHJvcHMuY29udGVzdC5udW1UYXNrc31gfT48YSBocmVmPVwiI1wiPlN1bW1hcnk8L2E+PC9saT4gKTtcclxuICAgICAgY29tcG9uZW50ID0gKFxyXG4gICAgICAgIDxTdGF0c1N1bW1hcnkgc3RhbmRpbmdzPXt0aGlzLnByb3BzLnN0YW5kaW5nc31cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlc3Q9e3RoaXMucHJvcHMuY29udGVzdH0gLz5cclxuICAgICAgKTtcclxuICAgIH1lbHNle1xyXG4gICAgICB0YWIucHVzaCggPGxpIGtleT17YCR7dGhpcy5wcm9wcy5jb250ZXN0Lm51bVRhc2tzfWB9PjxhIGhyZWY9XCIjXCIgb25DbGljaz17ICgpPT57XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cGFnZTp0aGlzLnByb3BzLmNvbnRlc3QubnVtVGFza3N9KTtcclxuICAgICAgfSB9PlN1bW1hcnk8L2E+PC9saT4gKTtcclxuICAgICAgY29tcG9uZW50ID0gKFxyXG4gICAgICAgIDxTdGF0c1Rhc2sgdGFzaz17dGhpcy5wcm9wcy5jb250ZXN0LnRhc2tzW3RoaXMuc3RhdGUucGFnZV19XHJcbiAgICAgICAgICAgICAgICAgICBzdGFuZGluZ3M9e3RoaXMucHJvcHMuc3RhbmRpbmdzfVxyXG4gICAgICAgICAgICAgICAgICAgY29udGVzdD17dGhpcy5wcm9wcy5jb250ZXN0fSAvPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBuYXYtdGFic1wiPlxyXG4gICAgICAgICAge3RhYn1cclxuICAgICAgICA8L3VsPlxyXG4gICAgICAgIHtjb21wb25lbnR9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAvKipcclxuICAqIEBwYXJhbSBwcm9wcy5zdGFuZGluZ3NcclxuICAqIEBwYXJhbSBwcm9wcy5jb250ZXN0XHJcbiAgKi9cclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGxldCBidXR0b24gPSAoXHJcbiAgICAgIDxhIGhyZWY9XCIjXCI+PGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5hc3Nlc3NtZW50PC9pPiBTdGF0aXN0aWNzIDwvYT5cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPE1vZGFsIGJ1dHRvbj17YnV0dG9ufSB0aXRsZT1cIlN0YXRpc3RpY3NcIj5cclxuICAgICAgICA8U3RhdHNDb250ZW50IHN0YW5kaW5ncz17dGhpcy5wcm9wcy5zdGFuZGluZ3N9IGNvbnRlc3Q9e3RoaXMucHJvcHMuY29udGVzdH0vPlxyXG4gICAgICA8L01vZGFsPlxyXG4gICAgKTtcclxuICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFydENvbXBvbmVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICAvKipcclxuICAqIGNhbnZhc0lkXHJcbiAgKiBkYXRhc2V0XHJcbiAgKiB3aWR0aFxyXG4gICogaGVpZ2h0XHJcbiAgKi9cclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG4gIHJlbmRlcigpe1xyXG4gICAgcmV0dXJuKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxjYW52YXMgaWQ9e3RoaXMucHJvcHMuY2FudmFzSWR9IHdpZHRoPXt0aGlzLnByb3BzLndpZHRofSBoZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0fT48L2NhbnZhcz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgbGV0IGN0eCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucHJvcHMuY2FudmFzSWQpO1xyXG4gICAgLy8gY29uc29sZS5sb2coY3R4KTtcclxuICAgIHRoaXMuY2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB0aGlzLnByb3BzLmRhdGFzZXQpO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5jaGFydCk7XHJcbiAgfVxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XHJcbiAgICB0aGlzLmNoYXJ0LmRlc3Ryb3koKTtcclxuICB9XHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKCl7XHJcbiAgICB0aGlzLmNoYXJ0LmRlc3Ryb3koKTtcclxuICAgIGxldCBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnByb3BzLmNhbnZhc0lkKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKGN0eCk7XHJcbiAgICB0aGlzLmNoYXJ0ID0gbmV3IENoYXJ0KGN0eCwgdGhpcy5wcm9wcy5kYXRhc2V0KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY2hhcnQpO1xyXG4gIH1cclxufSIsImltcG9ydCB7cmF0aW5nLGNvdW50cmllc30gZnJvbSAnLi4vdXRpbC5qcydcclxuaW1wb3J0IENoYXJ0Q29tcG9uZW50IGZyb20gJy4vY2hhcnRDb21wb25lbnQuanMnXHJcblxyXG5jbGFzcyBUb3BPZkNvbG9ycyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IGRhdGEgPSBuZXcgQXJyYXkocmF0aW5nLmxiLmxlbmd0aCk7XHJcbiAgICBkYXRhLmZpbGwodW5kZWZpbmVkKTtcclxuXHJcbiAgICB0aGlzLnByb3BzLnN0YW5kaW5ncy5mb3JFYWNoKCAocyk9PntcclxuICAgICAgaWYocy5lbGFwc2VkX3RpbWUgPT09IFwiMFwiKSB7XHJcbiAgICAgICAgbGV0IHBhcnRpY2lwYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICBzLnRhc2tzLmZvckVhY2goICh0KT0+e1xyXG4gICAgICAgICAgaWYodC5zY29yZSAhPT0gdW5kZWZpbmVkKSBwYXJ0aWNpcGF0aW5nID0gdHJ1ZTtcclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgaWYoIHBhcnRpY2lwYXRpbmcgPT09IGZhbHNlICkgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBsZXZlbCA9IHJhdGluZy5nZXRMZXZlbCggcy5yYXRpbmcgKTtcclxuICAgICAgaWYoIGRhdGFbbGV2ZWxdID09PSB1bmRlZmluZWQgKXtcclxuICAgICAgICBkYXRhW2xldmVsXSA9IHtcclxuICAgICAgICAgIG5hbWUgOiBzLnVzZXJfc2NyZWVuX25hbWUsXHJcbiAgICAgICAgICByYXRpbmcgOiBzLnJhdGluZyxcclxuICAgICAgICAgIHJhbmsgOiBzLnJhbmssXHJcbiAgICAgICAgICBzY29yZSA6IE51bWJlcihzLnNjb3JlKSAvIDEwMCxcclxuICAgICAgICAgIHRpbWUgOiBOdW1iZXIocy5lbGFwc2VkX3RpbWUpLFxyXG4gICAgICAgICAgcGVuYWx0eSA6IE51bWJlcihzLnBlbmFsdHkpLFxyXG4gICAgICAgICAgZmFpbHVyZSA6IE51bWJlcihzLmZhaWx1cmUpXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgZGF0YSA9IGRhdGEuc2xpY2UoMSk7XHJcblxyXG4gICAgbGV0IGNvbXAgPSBkYXRhLm1hcCggKGQsIGlkeCkgPT4ge1xyXG4gICAgICBpZiggZCA9PT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDx0ciBrZXk9e2lkeH0+XHJcbiAgICAgICAgICAgIDx0ZD48c3BhbiBzdHlsZT17e2NvbG9yIDogcmF0aW5nLmNvbG9yT3JpZ2luYWxbaWR4KzFdfX0+e3JhdGluZy5sYltpZHgrMV19IC0gPC9zcGFuPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD4gLSA8L3RkPlxyXG4gICAgICAgICAgICA8dGQ+IC0gPC90ZD5cclxuICAgICAgICAgICAgPHRkPiAtIDwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD4gLSA8L3RkPlxyXG4gICAgICAgICAgPC90cj5cclxuICAgICAgICApO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICA8dHIga2V5PXtpZHh9PlxyXG4gICAgICAgICAgICA8dGQ+PHNwYW4gc3R5bGU9e3tjb2xvciA6IHJhdGluZy5jb2xvck9yaWdpbmFsW2lkeCsxXX19PntyYXRpbmcubGJbaWR4KzFdfSAtIDwvc3Bhbj48L3RkPlxyXG4gICAgICAgICAgICA8dGQ+e3JhdGluZy5nZW5lcmF0ZUNvbG9yZWROYW1lKCBkLm5hbWUsIGQucmF0aW5nICl9PC90ZD5cclxuICAgICAgICAgICAgPHRkPntkLnJhbmt9PC90ZD5cclxuICAgICAgICAgICAgPHRkPntkLnNjb3JlfXtkLmZhaWx1cmUhPTA/PHNwYW4+ICh7ZC5mYWlsdXJlfSk8L3NwYW4+IDogXCJcIn08L3RkPlxyXG4gICAgICAgICAgICA8dGQ+e01hdGguZmxvb3IoZC50aW1lLzYwKX0gbWluIHtkLnRpbWUlNjB9IHNlYyAoe01hdGguZmxvb3IoZC5wZW5hbHR5LzYwKX0gbWluIHtkLnBlbmFsdHklNjB9IHNlYyk8L3RkPlxyXG4gICAgICAgICAgPC90cj5cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9ICk7XHJcblxyXG4gICAgY29tcC5yZXZlcnNlKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8aDM+VG9wIG9mIENvbG9yczwvaDM+XHJcbiAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWNvbmRlbnNlZFwiPlxyXG4gICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgPHRoPlJhdGluZzwvdGg+XHJcbiAgICAgICAgICAgICAgPHRoPlRvcDwvdGg+XHJcbiAgICAgICAgICAgICAgPHRoPlJhbms8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aD5TY29yZSAoUGVuYWx0eSk8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aD5UaW1lIChQZW5hbHR5KTwvdGg+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICB7Y29tcH1cclxuICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgPC90YWJsZT5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIFRvcE9mQ291bnRyaWVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHNvcnRpbmdLZXkgOiBcInJhbmtcIixcclxuICAgICAgYXNjZW5kaW5nIDogdHJ1ZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IGRhdGEgPSB7fTtcclxuXHJcbiAgICB0aGlzLnByb3BzLnN0YW5kaW5ncy5mb3JFYWNoKCAocyk9PntcclxuICAgICAgaWYocy5lbGFwc2VkX3RpbWUgPT09IFwiMFwiKSB7XHJcbiAgICAgICAgbGV0IHBhcnRpY2lwYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICBzLnRhc2tzLmZvckVhY2goICh0KT0+e1xyXG4gICAgICAgICAgaWYodC5zY29yZSAhPT0gdW5kZWZpbmVkKSBwYXJ0aWNpcGF0aW5nID0gdHJ1ZTtcclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgaWYoIHBhcnRpY2lwYXRpbmcgPT09IGZhbHNlICkgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb3VudHJ5ID0gcy5jb3VudHJ5O1xyXG5cclxuICAgICAgaWYoIGRhdGFbY291bnRyeV0gPT09IHVuZGVmaW5lZCApe1xyXG4gICAgICAgIGRhdGFbY291bnRyeV0gPSB7XHJcbiAgICAgICAgICBuYW1lIDogcy51c2VyX3NjcmVlbl9uYW1lLFxyXG4gICAgICAgICAgY291bnRyeSA6IHMuY291bnRyeSxcclxuICAgICAgICAgIHJhdGluZyA6IHMucmF0aW5nLFxyXG4gICAgICAgICAgcmFuayA6IHMucmFuayxcclxuICAgICAgICAgIHNjb3JlIDogTnVtYmVyKHMuc2NvcmUpIC8gMTAwLFxyXG4gICAgICAgICAgdGltZSA6IE51bWJlcihzLmVsYXBzZWRfdGltZSksXHJcbiAgICAgICAgICBwZW5hbHR5IDogTnVtYmVyKHMucGVuYWx0eSksXHJcbiAgICAgICAgICBmYWlsdXJlIDogTnVtYmVyKHMuZmFpbHVyZSksXHJcbiAgICAgICAgICBzY29yZVRpbWUgOiBOdW1iZXIocy5zY29yZSkgKiAxMDAwMDAwMDAwIC0gTnVtYmVyKHMucGVuYWx0eSlcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBkYXRhID0gT2JqZWN0LmtleXMoZGF0YSkubWFwKCAoYykgPT4ge1xyXG4gICAgICByZXR1cm4gZGF0YVtjXTtcclxuICAgIH0gKTtcclxuXHJcbiAgICBkYXRhLnNvcnQoICh4LHkpID0+IHtcclxuICAgICAgbGV0IHJlcyA9IHhbdGhpcy5zdGF0ZS5zb3J0aW5nS2V5XSA8IHlbdGhpcy5zdGF0ZS5zb3J0aW5nS2V5XTtcclxuICAgICAgcmVzID0gdGhpcy5zdGF0ZS5hc2NlbmRpbmc/cmVzOiFyZXM7XHJcbiAgICAgIHJldHVybiByZXMgPyAtMSA6IDE7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgbGV0IGNvbXAgPSBkYXRhLm1hcCggKGQsIGlkeCkgPT4ge1xyXG4gICAgICByZXR1cm4oXHJcbiAgICAgICAgPHRyIGtleT17aWR4fT5cclxuICAgICAgICAgIDx0ZD57ZC5yYW5rfTwvdGQ+XHJcbiAgICAgICAgICA8dGQ+PGltZyBzcmM9e2AvaW1nL2ZsYWcvJHtkLmNvdW50cnl9LnBuZ2B9IHN0eWxlPXt7dmVydGljYWxBbGlnbjogXCJtaWRkbGVcIiwgd2lkdGg6IFwiMTZweFwiLCBoZWlnaHQ6IFwiMTZweFwifX0gLz4ge2NvdW50cmllc1tkLmNvdW50cnldfTwvdGQ+XHJcbiAgICAgICAgICA8dGQ+e3JhdGluZy5nZW5lcmF0ZUNvbG9yZWROYW1lKCBkLm5hbWUsIGQucmF0aW5nICl9PC90ZD5cclxuICAgICAgICAgIDx0ZD57ZC5zY29yZX17ZC5mYWlsdXJlIT0wPzxzcGFuPiAoe2QuZmFpbHVyZX0pPC9zcGFuPiA6IFwiXCJ9PC90ZD5cclxuICAgICAgICAgIDx0ZD57TWF0aC5mbG9vcihkLnRpbWUvNjApfSBtaW4ge2QudGltZSU2MH0gc2VjICh7TWF0aC5mbG9vcihkLnBlbmFsdHkvNjApfSBtaW4ge2QucGVuYWx0eSU2MH0gc2VjKTwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgKTtcclxuICAgIH0gKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMz5Ub3Agb2YgQ291bnRyaWVzPC9oMz5cclxuICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtY29uZGVuc2VkXCI+XHJcbiAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICA8dGggb25DbGljaz17KCk9PntcclxuICAgICAgICAgICAgICAgIGlmKCB0aGlzLnN0YXRlLnNvcnRpbmdLZXkgPT0gXCJyYW5rXCIgKSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcInJhbmtcIiwgYXNjZW5kaW5nIDogIXRoaXMuc3RhdGUuYXNjZW5kaW5nIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcInJhbmtcIiwgYXNjZW5kaW5nIDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICB9fT5SYW5rPC90aD5cclxuICAgICAgICAgICAgICA8dGggb25DbGljaz17KCk9PntcclxuICAgICAgICAgICAgICAgIGlmKCB0aGlzLnN0YXRlLnNvcnRpbmdLZXkgPT0gXCJjb3VudHJ5XCIgKSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcImNvdW50cnlcIiwgYXNjZW5kaW5nIDogIXRoaXMuc3RhdGUuYXNjZW5kaW5nIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcImNvdW50cnlcIiwgYXNjZW5kaW5nIDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICB9fT5Db3VudHJ5PC90aD5cclxuICAgICAgICAgICAgICA8dGggb25DbGljaz17KCk9PntcclxuICAgICAgICAgICAgICAgIGlmKCB0aGlzLnN0YXRlLnNvcnRpbmdLZXkgPT0gXCJuYW1lXCIgKSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcIm5hbWVcIiwgYXNjZW5kaW5nIDogIXRoaXMuc3RhdGUuYXNjZW5kaW5nIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcIm5hbWVcIiwgYXNjZW5kaW5nIDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICB9fT5Ub3A8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aCBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuc3RhdGUuc29ydGluZ0tleSA9PSBcInNjb3JlVGltZVwiICkgdGhpcy5zZXRTdGF0ZSAoeyBzb3J0aW5nS2V5IDogXCJzY29yZVRpbWVcIiwgYXNjZW5kaW5nIDogIXRoaXMuc3RhdGUuYXNjZW5kaW5nIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcInNjb3JlVGltZVwiLCBhc2NlbmRpbmcgOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICB9fT5TY29yZSAoUGVuYWx0eSk8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aCBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuc3RhdGUuc29ydGluZ0tleSA9PSBcInNjb3JlVGltZVwiICkgdGhpcy5zZXRTdGF0ZSAoeyBzb3J0aW5nS2V5IDogXCJzY29yZVRpbWVcIiwgYXNjZW5kaW5nIDogIXRoaXMuc3RhdGUuYXNjZW5kaW5nIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcInNjb3JlVGltZVwiLCBhc2NlbmRpbmcgOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgIH19PlRpbWUgKFBlbmFsdHkpPC90aD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgIHtjb21wfVxyXG4gICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICA8L3RhYmxlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuY2xhc3MgTnVtYmVyT2ZDb2xvckNvbnRlc3RhbnRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHNvcnRpbmdLZXkgOiBcInJhdGluZ1wiLFxyXG4gICAgICBhc2NlbmRpbmcgOiBmYWxzZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IGRhdGEgPSBuZXcgQXJyYXkoIHJhdGluZy5sYi5sZW5ndGggKTtcclxuICAgIGZvcihsZXQgaT0wOyBpPGRhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICBkYXRhW2ldID0geyByYXRpbmc6aSwgY29udGVzdGFudHM6MCB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJvcHMuc3RhbmRpbmdzLmZvckVhY2goIChzKT0+e1xyXG4gICAgICBpZihzLmVsYXBzZWRfdGltZSA9PT0gXCIwXCIpIHtcclxuICAgICAgICBsZXQgcGFydGljaXBhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHMudGFza3MuZm9yRWFjaCggKHQpPT57XHJcbiAgICAgICAgICBpZih0LnNjb3JlICE9PSB1bmRlZmluZWQpIHBhcnRpY2lwYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgICBpZiggcGFydGljaXBhdGluZyA9PT0gZmFsc2UgKSByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGxldmVsID0gcmF0aW5nLmdldExldmVsKCBzLnJhdGluZyApO1xyXG4gICAgICBkYXRhW2xldmVsXS5jb250ZXN0YW50cyArPSAxO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGRhdGEgPSBkYXRhLnNsaWNlKDEpO1xyXG5cclxuICAgIGRhdGEuc29ydCggKHgseSkgPT4ge1xyXG4gICAgICBsZXQgcmVzID0geFt0aGlzLnN0YXRlLnNvcnRpbmdLZXldIDwgeVt0aGlzLnN0YXRlLnNvcnRpbmdLZXldO1xyXG4gICAgICByZXMgPSB0aGlzLnN0YXRlLmFzY2VuZGluZz9yZXM6IXJlcztcclxuICAgICAgcmV0dXJuIHJlcyA/IC0xIDogMTtcclxuICAgIH0gKTtcclxuXHJcbiAgICBsZXQgY29tcCA9IGRhdGEubWFwKCAoZCwgaWR4KSA9PiB7XHJcbiAgICAgIHJldHVybihcclxuICAgICAgICA8dHIga2V5PXtpZHh9PlxyXG4gICAgICAgICAgPHRkPjxzcGFuIHN0eWxlPXt7Y29sb3IgOiByYXRpbmcuY29sb3JPcmlnaW5hbFtkLnJhdGluZ119fT57cmF0aW5nLmxiW2QucmF0aW5nXX0gLSA8L3NwYW4+PC90ZD5cclxuICAgICAgICAgIDx0ZD57ZC5jb250ZXN0YW50c308L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICk7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8aDM+TnVtYmVyIG9mIENvbnRlc3RhbnRzIChDb2xvcik8L2gzPlxyXG4gICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1jb25kZW5zZWRcIj5cclxuICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgIDx0aCBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuc3RhdGUuc29ydGluZ0tleSA9PSBcInJhdGluZ1wiICkgdGhpcy5zZXRTdGF0ZSAoeyBzb3J0aW5nS2V5IDogXCJyYXRpbmdcIiwgYXNjZW5kaW5nIDogIXRoaXMuc3RhdGUuYXNjZW5kaW5nIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcInJhdGluZ1wiLCBhc2NlbmRpbmcgOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICB9fT5SYXRpbmc8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aCBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuc3RhdGUuc29ydGluZ0tleSA9PSBcImNvbnRlc3RhbnRzXCIgKSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcImNvbnRlc3RhbnRzXCIsIGFzY2VuZGluZyA6ICF0aGlzLnN0YXRlLmFzY2VuZGluZyB9KTtcclxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5zZXRTdGF0ZSAoeyBzb3J0aW5nS2V5IDogXCJjb250ZXN0YW50c1wiLCBhc2NlbmRpbmcgOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICB9fT5Db250ZXN0YW50czwvdGg+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICB7Y29tcH1cclxuICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgPC90YWJsZT5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIE51bWJlck9mQ291bnRyeUNvbnRlc3RhbnRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHNvcnRpbmdLZXkgOiBcImNvbnRlc3RhbnRzXCIsXHJcbiAgICAgIGFzY2VuZGluZyA6IGZhbHNlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgZGF0YSA9IHt9O1xyXG5cclxuICAgIHRoaXMucHJvcHMuc3RhbmRpbmdzLmZvckVhY2goIChzKT0+e1xyXG4gICAgICBpZihzLmVsYXBzZWRfdGltZSA9PT0gXCIwXCIpIHtcclxuICAgICAgICBsZXQgcGFydGljaXBhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHMudGFza3MuZm9yRWFjaCggKHQpPT57XHJcbiAgICAgICAgICBpZih0LnNjb3JlICE9PSB1bmRlZmluZWQpIHBhcnRpY2lwYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgICBpZiggcGFydGljaXBhdGluZyA9PT0gZmFsc2UgKSByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvdW50cnkgPSBzLmNvdW50cnk7XHJcblxyXG4gICAgICBpZiggZGF0YVtjb3VudHJ5XSA9PT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgZGF0YVtjb3VudHJ5XSA9IHtcclxuICAgICAgICAgIGNvdW50cnkgOiBjb3VudHJ5LFxyXG4gICAgICAgICAgY29udGVzdGFudHMgOiAxXHJcbiAgICAgICAgfTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgZGF0YVtjb3VudHJ5XS5jb250ZXN0YW50cyArPSAxO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBkYXRhID0gT2JqZWN0LmtleXMoZGF0YSkubWFwKCAoYykgPT4ge1xyXG4gICAgICByZXR1cm4gZGF0YVtjXTtcclxuICAgIH0gKTtcclxuXHJcbiAgICBkYXRhLnNvcnQoICh4LHkpID0+IHtcclxuICAgICAgbGV0IHJlcyA9IHhbdGhpcy5zdGF0ZS5zb3J0aW5nS2V5XSA8IHlbdGhpcy5zdGF0ZS5zb3J0aW5nS2V5XTtcclxuICAgICAgcmVzID0gdGhpcy5zdGF0ZS5hc2NlbmRpbmc/cmVzOiFyZXM7XHJcbiAgICAgIHJldHVybiByZXMgPyAtMSA6IDE7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgbGV0IGNvbXAgPSBkYXRhLm1hcCggKGQsIGlkeCkgPT4ge1xyXG4gICAgICByZXR1cm4oXHJcbiAgICAgICAgPHRyIGtleT17aWR4fT5cclxuICAgICAgICAgIDx0ZD48aW1nIHNyYz17YC9pbWcvZmxhZy8ke2QuY291bnRyeX0ucG5nYH0gc3R5bGU9e3t2ZXJ0aWNhbEFsaWduOiBcIm1pZGRsZVwiLCB3aWR0aDogXCIxNnB4XCIsIGhlaWdodDogXCIxNnB4XCJ9fSAvPiB7Y291bnRyaWVzW2QuY291bnRyeV19PC90ZD5cclxuICAgICAgICAgIDx0ZD57ZC5jb250ZXN0YW50c308L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICk7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8aDM+TnVtYmVyIG9mIENvbnRlc3RhbnRzIChDb3VudHJ5KTwvaDM+XHJcbiAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWNvbmRlbnNlZFwiPlxyXG4gICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgPHRoIG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgICAgICBpZiggdGhpcy5zdGF0ZS5zb3J0aW5nS2V5ID09IFwiY291bnRyeVwiICkgdGhpcy5zZXRTdGF0ZSAoeyBzb3J0aW5nS2V5IDogXCJjb3VudHJ5XCIsIGFzY2VuZGluZyA6ICF0aGlzLnN0YXRlLmFzY2VuZGluZyB9KTtcclxuICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5zZXRTdGF0ZSAoeyBzb3J0aW5nS2V5IDogXCJjb3VudHJ5XCIsIGFzY2VuZGluZyA6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgfX0+Q291bnRyeTwvdGg+XHJcbiAgICAgICAgICAgICAgPHRoIG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgICAgICBpZiggdGhpcy5zdGF0ZS5zb3J0aW5nS2V5ID09IFwiY29udGVzdGFudHNcIiApIHRoaXMuc2V0U3RhdGUgKHsgc29ydGluZ0tleSA6IFwiY29udGVzdGFudHNcIiwgYXNjZW5kaW5nIDogIXRoaXMuc3RhdGUuYXNjZW5kaW5nIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcImNvbnRlc3RhbnRzXCIsIGFzY2VuZGluZyA6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgIH19PkNvbnRlc3RhbnRzPC90aD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgIHtjb21wfVxyXG4gICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICA8L3RhYmxlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHNTdW1tYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuZ2VuRGF0YXNldC5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZ2VuRGF0YXNldCgpe1xyXG4gICAgY29uc3QgbGFiZWxzID0gcmF0aW5nLmxiLnNsaWNlKDEpLm1hcCggKHIpID0+IFN0cmluZyhyKSArIFwiIC1cIiApO1xyXG4gICAgY29uc3QgY29sb3IgPSByYXRpbmcuY29sb3Iuc2xpY2UoMSk7XHJcbiAgICBsZXQgY291bnQgPSByYXRpbmcuY29sb3IubWFwKCAoKSA9PiAobmV3IE1hcCgpKSApO1xyXG4gICAgbGV0IHNjb3JlRGlzdHJpYnV0aW9uID0gbmV3IFNldCgpO1xyXG4gICAgdGhpcy5wcm9wcy5zdGFuZGluZ3MuZm9yRWFjaCggKHIpID0+IHtcclxuICAgICAgaWYoIHIudGFza3MubWFwKCAodCk9PnQuZWxhcHNlZF90aW1lICE9PSB1bmRlZmluZWQgPyAxIDogMCApLnJlZHVjZSggKGEsYik9PmErYiApICE9PSAwICl7XHJcbiAgICAgICAgY29uc3QgbGV2ZWwgPSByYXRpbmcuZ2V0TGV2ZWwoIHIucmF0aW5nICk7XHJcbiAgICAgICAgY29uc3Qgc2NvcmUgPSByLnNjb3JlLzEwMDtcclxuICAgICAgICBzY29yZURpc3RyaWJ1dGlvbi5hZGQoc2NvcmUpO1xyXG4gICAgICAgIGNvdW50W2xldmVsXS5zZXQoIHNjb3JlLCBjb3VudFtsZXZlbF0uaGFzKHNjb3JlKSA/IGNvdW50W2xldmVsXS5nZXQoc2NvcmUpICsgMSA6IDEgKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBsZXQgc2NvcmVzID0gWy4uLnNjb3JlRGlzdHJpYnV0aW9uXS5zb3J0KCAoYSxiKSA9PiB7IHJldHVybiBhPGIgPyAtMSA6IDF9ICk7XHJcbiAgICBsZXQgZGF0YSA9IHJhdGluZy5sYi5tYXAoICgpID0+IChuZXcgQXJyYXkoc2NvcmVzLmxlbmd0aCkpLmZpbGwoMCkgKTtcclxuICAgIGNvdW50LmZvckVhY2goIChjLCBsZXZlbCkgPT4ge1xyXG4gICAgICBjLmZvckVhY2goIChjbnQsIHNjb3JlICkgPT4ge1xyXG4gICAgICAgIGRhdGFbbGV2ZWxdWyBzY29yZXMuaW5kZXhPZihzY29yZSkgXSA9IGNudDtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBkYXRhc2V0ID0ge1xyXG4gICAgICB0eXBlIDogJ2JhcicsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBsYWJlbHM6IHNjb3JlcyxcclxuICAgICAgICBkYXRhc2V0czogZGF0YS5zbGljZSgxKS5tYXAoIChkLCBpKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsYWJlbDogbGFiZWxzW2ldLFxyXG4gICAgICAgICAgICBkYXRhOiBkLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yW2ldXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvIDogZmFsc2UsXHJcbiAgICAgICAgc2NhbGVzOiB7XHJcbiAgICAgICAgICB4QXhlczogW3tcclxuICAgICAgICAgICAgZGlzcGxheTp0cnVlLFxyXG4gICAgICAgICAgICBzY2FsZUxhYmVsOntcclxuICAgICAgICAgICAgICBkaXNwbGF5OnRydWUsXHJcbiAgICAgICAgICAgICAgbGFiZWxTdHJpbmc6IFwiU2NvcmVcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfV0sXHJcbiAgICAgICAgICB5QXhlczogW3tcclxuICAgICAgICAgICAgZGlzcGxheTp0cnVlLFxyXG4gICAgICAgICAgICBzY2FsZUxhYmVsOntcclxuICAgICAgICAgICAgICBkaXNwbGF5OnRydWUsXHJcbiAgICAgICAgICAgICAgbGFiZWxTdHJpbmc6IFwiUGVvcGxlXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGlja3M6IHtcclxuICAgICAgICAgICAgICBiZWdpbkF0WmVybzp0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0YWNrZWQ6IHRydWVcclxuICAgICAgICAgIH1dXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhbmltYXRpb24gOiB7XHJcbiAgICAgICAgICBhbmltYXRlOiBmYWxzZSxcclxuICAgICAgICAgIGFuaW1hdGVTY2FsZSA6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGRhdGFzZXQ7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxwPlxyXG4gICAgICAgICAge3RoaXMucHJvcHMuY29udGVzdC5jb250ZXN0RW5kZWQgPyA8c3Bhbj5UaGlzIHN0YXRzIGlzIHVub2ZmaWNpYWwuIFlvdSBjYW4gY2hlY2sgdGhlIG9mZmljaWFsIHN0YXRzIDxhIGhyZWY9XCIuL3N0YXRpc3RpY3NcIiB0YXJnZXQ9XCJfYmxhbmtcIj5oZXJlPC9hPi48L3NwYW4+OiBudWxsfVxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPGgzPlNjb3JlIERpc3RyaWJ1dGlvbjwvaDM+XHJcbiAgICAgICAgICA8Q2hhcnRDb21wb25lbnQgY2FudmFzSWQ9XCJjaGFydFN1bW1hcnlcIiBkYXRhc2V0PXt0aGlzLmdlbkRhdGFzZXQoKX0gd2lkdGg9XCI1MDBcIiBoZWlnaHQ9XCIyODBcIi8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPFRvcE9mQ29sb3JzIHN0YW5kaW5ncz17dGhpcy5wcm9wcy5zdGFuZGluZ3N9Lz5cclxuICAgICAgICA8VG9wT2ZDb3VudHJpZXMgc3RhbmRpbmdzPXt0aGlzLnByb3BzLnN0YW5kaW5nc30vPlxyXG4gICAgICAgIDxOdW1iZXJPZkNvbG9yQ29udGVzdGFudHMgc3RhbmRpbmdzPXt0aGlzLnByb3BzLnN0YW5kaW5nc30vPlxyXG4gICAgICAgIDxOdW1iZXJPZkNvdW50cnlDb250ZXN0YW50cyBzdGFuZGluZ3M9e3RoaXMucHJvcHMuc3RhbmRpbmdzfS8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0iLCJpbXBvcnQge3JhdGluZ30gZnJvbSAnLi4vdXRpbC5qcydcclxuaW1wb3J0IENoYXJ0Q29tcG9uZW50IGZyb20gJy4vY2hhcnRDb21wb25lbnQuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c1Rhc2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgLyoqXHJcbiAgKiB0YXNrIFxyXG4gICogc3RhbmRpbmdzXHJcbiAgKi9cclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnRpbWVTdGVwID0gNSAqIDYwO1xyXG5cclxuXHJcbiAgICB0aGlzLmdldE1heFNjb3JlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmdldFN0YXRzVmFsdWVzLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmdlbmVyYXRlRGF0YXNldC5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWF4U2NvcmUoKXtcclxuICAgIGxldCBtYXhTY29yZSA9IDA7XHJcbiAgICB0aGlzLnByb3BzLnN0YW5kaW5ncy5mb3JFYWNoKCAoZGF0YSkgPT4ge1xyXG4gICAgICBjb25zdCBkID0gZGF0YS50YXNrc1sgdGhpcy5wcm9wcy50YXNrLmlkIF07XHJcbiAgICAgIGlmKCBkLnNjb3JlID09PSB1bmRlZmluZWQgKSByZXR1cm47XHJcbiAgICAgIG1heFNjb3JlID0gTWF0aC5tYXgobWF4U2NvcmUsIE51bWJlcihkLnNjb3JlKSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXhTY29yZTtcclxuICB9XHJcblxyXG4gIGdldFN0YXRzVmFsdWVzKHN0YW5kaW5ncyl7XHJcbiAgICBsZXQgcmVzID0ge31cclxuICAgIHRyeXtcclxuICAgICAgcmVzLm51bUFDID0gMDtcclxuICAgICAgcmVzLm51bVdBID0gMDtcclxuICAgICAgcmVzLm51bVBlb3BsZVRyaWVkID0gMDtcclxuICAgICAgcmVzLm51bVN1Ym1pc3Npb25zID0gMDtcclxuICAgICAgcmVzLmZpcnN0QWNjZXB0ZWRUaW1lID0gMDtcclxuICAgICAgcmVzLmZpcnN0QWNjZXB0ZWRQZXJzb24gPSBbXTtcclxuXHJcbiAgICAgIGxldCB0aW1lU3VtID0gMDtcclxuXHJcbiAgICAgIHJlcy5udW1Db250ZXN0YW50cyA9IDA7XHJcblxyXG4gICAgICAvL3NldCBGQVxyXG4gICAgICBzdGFuZGluZ3MuZm9yRWFjaCggKGRhdGEpID0+IHtcclxuICAgICAgICBjb25zdCBkID0gZGF0YS50YXNrc1sgdGhpcy5wcm9wcy50YXNrLmlkIF07XHJcbiAgICAgICAgaWYoIGQuc2NvcmUgPT09IHVuZGVmaW5lZCApIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYoIHRoaXMubWF4U2NvcmUgPT0gMCB8fCBkLnNjb3JlICE9IHRoaXMubWF4U2NvcmUpe1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIHJlcy5maXJzdEFjY2VwdGVkVGltZSA9PSAwICkgcmVzLmZpcnN0QWNjZXB0ZWRUaW1lID0gTnVtYmVyKGQuZWxhcHNlZF90aW1lKTtcclxuICAgICAgICBlbHNlIHJlcy5maXJzdEFjY2VwdGVkVGltZSA9IE1hdGgubWluKHJlcy5maXJzdEFjY2VwdGVkVGltZSwgTnVtYmVyKGQuZWxhcHNlZF90aW1lKSApO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vc2V0IG90aGVyIHBhcmFtc1xyXG4gICAgICBzdGFuZGluZ3MuZm9yRWFjaCggKGRhdGEpID0+IHtcclxuICAgICAgICAvL2NvbnRlc3RhbnQgbWFkZSBhdCBsZWFzdCBvbmUgc3VibWlzc2lvblxyXG4gICAgICAgIGlmKCBkYXRhLnRhc2tzLm1hcCggKHQpPT50LmVsYXBzZWRfdGltZSAhPT0gdW5kZWZpbmVkID8gMSA6IDAgKS5yZWR1Y2UoIChhLGIpPT5hK2IgKSAhPT0gMCApIHJlcy5udW1Db250ZXN0YW50cysrO1xyXG5cclxuICAgICAgICBjb25zdCBkID0gZGF0YS50YXNrc1sgdGhpcy5wcm9wcy50YXNrLmlkIF07XHJcbiAgICAgICAgaWYoIGQuc2NvcmUgPT09IHVuZGVmaW5lZCApIHJldHVybjtcclxuXHJcbiAgICAgICAgcmVzLm51bVBlb3BsZVRyaWVkICs9IDE7XHJcbiAgICAgICAgcmVzLm51bVN1Ym1pc3Npb25zICs9IGQuZmFpbHVyZTtcclxuICAgICAgICBpZiggZC5zY29yZSAhPSAwICkgcmVzLm51bVN1Ym1pc3Npb25zICs9IDE7XHJcblxyXG4gICAgICAgIGlmKCB0aGlzLm1heFNjb3JlID09IDAgfHwgZC5zY29yZSAhPSB0aGlzLm1heFNjb3JlKXtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcy5udW1BQyArPSAxO1xyXG4gICAgICAgIHJlcy5udW1XQSArPSBkLmZhaWx1cmU7XHJcbiAgICAgICAgdGltZVN1bSArPSBkLmVsYXBzZWRfdGltZTtcclxuXHJcbiAgICAgICAgaWYoIHJlcy5maXJzdEFjY2VwdGVkVGltZSA9PSBkLmVsYXBzZWRfdGltZSApe1xyXG4gICAgICAgICAgcmVzLmZpcnN0QWNjZXB0ZWRQZXJzb24ucHVzaCggcmF0aW5nLmdlbmVyYXRlQ29sb3JlZE5hbWUoIGRhdGEudXNlcl9zY3JlZW5fbmFtZSwgZGF0YS5yYXRpbmcgKSApO1xyXG4gICAgICAgICAgcmVzLmZpcnN0QWNjZXB0ZWRQZXJzb24ucHVzaCggXCIgXCIgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmKCByZXMubnVtQUMgPT0gMCApe1xyXG4gICAgICAgIHJlcy5hdmVyYWdlVGltZSA9IDA7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIHJlcy5hdmVyYWdlVGltZSA9IE1hdGgucm91bmQodGltZVN1bSAvIHJlcy5udW1BQyk7XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgfWNhdGNoKGUpe1xyXG4gICAgICBjb25zb2xlLmxvZyggXCJmYWlsZWQgdG8gZ2VuZXJhdGUgc3RhdHNcIiApO1xyXG4gICAgICBjb25zb2xlLmxvZyggZSApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXM7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZURhdGFzZXQoKXtcclxuICAgIGNvbnN0IGxhYmVscyA9IHJhdGluZy5sYi5zbGljZSgxKS5tYXAoIChyKSA9PiBTdHJpbmcocikgKyBcIi1cIiApO1xyXG4gICAgY29uc3QgY29sb3IgPSByYXRpbmcuY29sb3Iuc2xpY2UoMSk7XHJcbiAgICBjb25zdCBjb250ZXN0RHVyYXRpb24gPSAodGhpcy5wcm9wcy5jb250ZXN0LmVuZFRpbWUuZ2V0VGltZSgpIC0gdGhpcy5wcm9wcy5jb250ZXN0LnN0YXJ0VGltZS5nZXRUaW1lKCkpLzEwMDA7XHJcblxyXG4gICAgLy8gc2V0IHNvbHZlZCBoaXN0b2dyYW1cclxuICAgIGxldCBkYXRhID0gcmF0aW5nLmxiLm1hcCggKCkgPT4gKG5ldyBBcnJheSggTWF0aC5mbG9vciggKGNvbnRlc3REdXJhdGlvbit0aGlzLnRpbWVTdGVwLTEpIC8gdGhpcy50aW1lU3RlcCApICkpLmZpbGwoMCkgKTtcclxuICAgIHRoaXMucHJvcHMuc3RhbmRpbmdzLmZvckVhY2goIChyKSA9PiB7XHJcbiAgICAgIGNvbnN0IHQgPSByLnRhc2tzWyB0aGlzLnByb3BzLnRhc2suaWQgXTtcclxuICAgICAgaWYoIHQuc2NvcmUgIT09IDAgJiYgdC5zY29yZSA9PT0gdGhpcy5tYXhTY29yZSApe1xyXG4gICAgICAgIGRhdGFbIHJhdGluZy5nZXRMZXZlbCggci5yYXRpbmcgKSBdWyBNYXRoLmZsb29yKHQuZWxhcHNlZF90aW1lIC8gdGhpcy50aW1lU3RlcCkgXSArPSAxO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIGRhdGFzZXQgZm9yIHRoZSBjaGFydFxyXG4gICAgY29uc3QgZGF0YXNldCA9IHtcclxuICAgICAgdHlwZSA6ICdiYXInLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgbGFiZWxzIDogKCgpPT57XHJcbiAgICAgICAgICBsZXQgYXJyID0gbmV3IEFycmF5KCBNYXRoLmZsb29yKCAoY29udGVzdER1cmF0aW9uK3RoaXMudGltZVN0ZXAtMSkgLyB0aGlzLnRpbWVTdGVwICkgKTtcclxuICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGFycltpXSA9IGAkezUqaX0tYDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgICAgfSkoKSxcclxuICAgICAgICBkYXRhc2V0czogZGF0YS5zbGljZSgxKS5tYXAoIChkLCBpKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsYWJlbDogbGFiZWxzW2ldLFxyXG4gICAgICAgICAgICBkYXRhOiBkLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yW2ldXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAvL3Jlc3BvbnNpdmUgOiBmYWxzZSxcclxuICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvIDogZmFsc2UsXHJcbiAgICAgICAgc2NhbGVzOiB7XHJcbiAgICAgICAgICB4QXhlczogW3tcclxuICAgICAgICAgICAgZGlzcGxheTp0cnVlLFxyXG4gICAgICAgICAgICBzY2FsZUxhYmVsOntcclxuICAgICAgICAgICAgICBkaXNwbGF5OnRydWUsXHJcbiAgICAgICAgICAgICAgbGFiZWxTdHJpbmc6IFwiVGltZSBbbWluXVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpY2tzOiB7XHJcbiAgICAgICAgICAgICAgYmVnaW5BdFplcm86dHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XSxcclxuICAgICAgICAgIHlBeGVzOiBbe1xyXG4gICAgICAgICAgICBkaXNwbGF5OnRydWUsXHJcbiAgICAgICAgICAgIHNjYWxlTGFiZWw6e1xyXG4gICAgICAgICAgICAgIGRpc3BsYXk6dHJ1ZSxcclxuICAgICAgICAgICAgICBsYWJlbFN0cmluZzogXCJTb2x2ZWRcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhY2tlZDogdHJ1ZVxyXG4gICAgICAgICAgfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuaW1hdGlvbiA6IHtcclxuICAgICAgICAgIGFuaW1hdGU6IGZhbHNlLFxyXG4gICAgICAgICAgYW5pbWF0ZVNjYWxlIDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGRhdGFzZXQ7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIHRoaXMubWF4U2NvcmUgPSB0aGlzLmdldE1heFNjb3JlKCk7XHJcbiAgICBjb25zdCBkYXRhQWxsID0gdGhpcy5nZXRTdGF0c1ZhbHVlcyh0aGlzLnByb3BzLnN0YW5kaW5ncyk7XHJcbiAgICBjb25zdCByb3dBbGwgPSAoXHJcbiAgICAgIDx0cj5cclxuICAgICAgICA8dGQ+QUxMPC90ZD5cclxuICAgICAgICA8dGQ+e2RhdGFBbGwubnVtQUN9PC90ZD5cclxuICAgICAgICA8dGQ+e2RhdGFBbGwubnVtUGVvcGxlVHJpZWR9PC90ZD5cclxuICAgICAgICA8dGQ+e2RhdGFBbGwubnVtU3VibWlzc2lvbnN9PC90ZD5cclxuICAgICAgICB7Lyo8dGQ+eyggZGF0YUFsbC5udW1BQyAvIE1hdGgubWF4KDEsIGRhdGFBbGwubnVtU3VibWlzc2lvbnMpICogMTAwKS50b0ZpeGVkKDIpfSU8L3RkPiovfVxyXG4gICAgICAgIDx0ZD57KCBkYXRhQWxsLm51bUFDIC8gTWF0aC5tYXgoMSwgZGF0YUFsbC5udW1QZW9wbGVUcmllZCkgKiAxMDApLnRvRml4ZWQoMil9JTwvdGQ+XHJcbiAgICAgICAgPHRkPnsoIGRhdGFBbGwubnVtQUMgLyBNYXRoLm1heCgxLCBkYXRhQWxsLm51bUNvbnRlc3RhbnRzKSAqIDEwMCkudG9GaXhlZCgyKX0lPC90ZD5cclxuICAgICAgICA8dGQ+e2RhdGFBbGwuZmlyc3RBY2NlcHRlZFBlcnNvbn08YnIvPlxyXG4gICAgICAgIHtgJHtNYXRoLmZsb29yKCBkYXRhQWxsLmZpcnN0QWNjZXB0ZWRUaW1lLzYwICl9IG1pbiAke2RhdGFBbGwuZmlyc3RBY2NlcHRlZFRpbWUlNjB9IHNlY2B9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQ+e2Ake01hdGguZmxvb3IoIGRhdGFBbGwuYXZlcmFnZVRpbWUvNjAgKX0gbWluICR7ZGF0YUFsbC5hdmVyYWdlVGltZSU2MH0gc2VjYH08L3RkPlxyXG4gICAgICAgIDx0ZD57KGRhdGFBbGwubnVtV0EgLyBNYXRoLm1heCgxLCBkYXRhQWxsLm51bUFDKSkudG9GaXhlZCgyKX08L3RkPlxyXG4gICAgICA8L3RyPlxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBkYXRhQ29sb3IgPSBbXTtcclxuICAgIGZvcihsZXQgcj0xOyByPD05OyByKyspe1xyXG4gICAgICBjb25zdCBjU3RhbmRpbmdzID0gdGhpcy5wcm9wcy5zdGFuZGluZ3MuZmlsdGVyKCAocyk9PntcclxuICAgICAgICByZXR1cm4gcmF0aW5nLmxiW3JdIDw9IHMucmF0aW5nICYmIHMucmF0aW5nIDwgcmF0aW5nLnViW3JdO1xyXG4gICAgICB9ICk7XHJcbiAgICAgIGRhdGFDb2xvci5wdXNoKCB0aGlzLmdldFN0YXRzVmFsdWVzKGNTdGFuZGluZ3MpICk7XHJcbiAgICB9XHJcbiAgICBjb25zdCByb3dDb2xvciA9IGRhdGFDb2xvci5tYXAoIChkYXRhLCBpZHgpID0+IHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8dHIga2V5PXtpZHh9PlxyXG4gICAgICAgICAgPHRkPjxzcGFuIHN0eWxlPXt7Y29sb3IgOiByYXRpbmcuY29sb3JPcmlnaW5hbFtpZHgrMV19fT57cmF0aW5nLmxiW2lkeCsxXX0gLSA8L3NwYW4+PC90ZD5cclxuICAgICAgICAgIDx0ZD57ZGF0YS5udW1BQ308L3RkPlxyXG4gICAgICAgICAgPHRkPntkYXRhLm51bVBlb3BsZVRyaWVkfTwvdGQ+XHJcbiAgICAgICAgICA8dGQ+e2RhdGEubnVtU3VibWlzc2lvbnN9PC90ZD5cclxuICAgICAgICAgIHsvKjx0ZD57KCBkYXRhLm51bUFDIC8gTWF0aC5tYXgoMSwgZGF0YS5udW1TdWJtaXNzaW9ucykgKiAxMDApLnRvRml4ZWQoMil9JTwvdGQ+Ki99XHJcbiAgICAgICAgICA8dGQ+eyggZGF0YS5udW1BQyAvIE1hdGgubWF4KDEsIGRhdGEubnVtUGVvcGxlVHJpZWQpICogMTAwKS50b0ZpeGVkKDIpfSU8L3RkPlxyXG4gICAgICAgICAgPHRkPnsoIGRhdGEubnVtQUMgLyBNYXRoLm1heCgxLCBkYXRhLm51bUNvbnRlc3RhbnRzKSAqIDEwMCkudG9GaXhlZCgyKX0lPC90ZD5cclxuICAgICAgICAgIDx0ZD57ZGF0YS5maXJzdEFjY2VwdGVkUGVyc29ufTxici8+XHJcbiAgICAgICAgICB7YCR7TWF0aC5mbG9vciggZGF0YS5maXJzdEFjY2VwdGVkVGltZS82MCApfSBtaW4gJHtkYXRhLmZpcnN0QWNjZXB0ZWRUaW1lJTYwfSBzZWNgfVxyXG4gICAgICAgICAgPC90ZD5cclxuICAgICAgICAgIDx0ZD57YCR7TWF0aC5mbG9vciggZGF0YS5hdmVyYWdlVGltZS82MCApfSBtaW4gJHtkYXRhLmF2ZXJhZ2VUaW1lJTYwfSBzZWNgfTwvdGQ+XHJcbiAgICAgICAgICA8dGQ+eyhkYXRhLm51bVdBIC8gTWF0aC5tYXgoMSwgZGF0YS5udW1BQykpLnRvRml4ZWQoMil9PC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICApO1xyXG4gICAgfSApLnJldmVyc2UoKTtcclxuXHJcbiAgICB0cnl7XHJcbiAgICAgIGNvbnN0IHJlcyA9IChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPGgzPnsnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonW3RoaXMucHJvcHMudGFzay5pZF19IDoge3RoaXMucHJvcHMudGFzay5uYW1lfTwvaDM+XHJcbiAgICAgICAgICA8aDQ+PHNwYW4gdGl0bGU9XCJ0aGUgbWF4IHNjb3JlIGNvbnRlc3RhbnRzIGdvdC4gdGhpcyBtYXkgYmUgcGFydGlhbCBzY29yZVwiPk1heCBTY29yZTwvc3Bhbj4gOiB7dGhpcy5tYXhTY29yZSAvIDEwMH08L2g0PlxyXG4gICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWNvbmRlbnNlZFwiPlxyXG4gICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgPHRoPlJhdGluZzwvdGg+XHJcbiAgICAgICAgICAgICAgICA8dGg+PHNwYW4gdGl0bGU9XCJudW1iZXIgb2YgcGVvcGxlIHdobyBnb3QgbWF4IHNjb3JlIChtYXkgYmUgcGFydGlhbCBzY29yZSlcIj5BQzwvc3Bhbj48L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPjxzcGFuIHRpdGxlPVwibnVtYmVyIG9mIHBlb3BsZSB3aG8gbWFkZSBhdCBsZWFzdCBvbmUgc3VibWlzc2lvbiBmb3IgdGhpcyB0YXNrXCI+QXR0ZW1wdGVkPC9zcGFuPjwvdGg+XHJcbiAgICAgICAgICAgICAgICA8dGg+PHNwYW4gdGl0bGU9XCJudW1iZXIgb2Ygc3VibWlzc2lvbnMgZm9yIHRoaXMgdGFza1wiPlN1Ym1pc3Npb25zPC9zcGFuPjwvdGg+XHJcbiAgICAgICAgICAgICAgICB7Lyo8dGg+QUMgLyBTdWJtaXNzaW9uczwvdGg+Ki99XHJcbiAgICAgICAgICAgICAgICA8dGg+QUMgLyBBdHRlbXB0ZWQ8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPkFDIC8gQ29udGVzdGFudHM8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPkZhc3Rlc3Q8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPkF2ZXJhZ2UgVGltZTwvdGg+XHJcbiAgICAgICAgICAgICAgICA8dGg+QXZlcmFnZSBXQTwvdGg+XHJcbiAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHtyb3dBbGx9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGgzPkFDIFRpbWUgRGlzdHJpYnV0aW9uPC9oMz5cclxuICAgICAgICAgICAgPENoYXJ0Q29tcG9uZW50IGNhbnZhc0lkPXtgdGFza0NoYXJ0XyR7dGhpcy5wcm9wcy50YXNrLmlkfWB9IGRhdGFzZXQ9e3RoaXMuZ2VuZXJhdGVEYXRhc2V0KCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjgwMFwiIGhlaWdodD1cIjM0MFwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxoMz5Db2xvciBTdGF0czwvaDM+XHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1jb25kZW5zZWRcIj5cclxuICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgIDx0aD5SYXRpbmc8L3RoPlxyXG4gICAgICAgICAgICAgICAgICA8dGg+PHNwYW4gdGl0bGU9XCJudW1iZXIgb2YgcGVvcGxlIHdobyBnb3QgbWF4IHNjb3JlIChtYXkgYmUgcGFydGlhbCBzY29yZSlcIj5BQzwvc3Bhbj48L3RoPlxyXG4gICAgICAgICAgICAgICAgICA8dGg+PHNwYW4gdGl0bGU9XCJudW1iZXIgb2YgcGVvcGxlIHdobyBtYWRlIGF0IGxlYXN0IG9uZSBzdWJtaXNzaW9uIGZvciB0aGlzIHRhc2tcIj5BdHRlbXB0ZWQ8L3NwYW4+PC90aD5cclxuICAgICAgICAgICAgICAgICAgPHRoPjxzcGFuIHRpdGxlPVwibnVtYmVyIG9mIHN1Ym1pc3Npb25zIGZvciB0aGlzIHRhc2tcIj5TdWJtaXNzaW9uczwvc3Bhbj48L3RoPlxyXG4gICAgICAgICAgICAgICAgICB7Lyo8dGg+QUMgLyBTdWJtaXNzaW9uczwvdGg+Ki99XHJcbiAgICAgICAgICAgICAgICAgIDx0aD5BQyAvIEF0dGVtcHRlZDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgIDx0aD5BQyAvIENvbnRlc3RhbnRzPC90aD5cclxuICAgICAgICAgICAgICAgICAgPHRoPkZhc3Rlc3Q8L3RoPlxyXG4gICAgICAgICAgICAgICAgICA8dGg+QXZlcmFnZSBUaW1lPC90aD5cclxuICAgICAgICAgICAgICAgICAgPHRoPkF2ZXJhZ2UgV0E8L3RoPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgIHtyb3dDb2xvcn1cclxuICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiByZXM7XHJcbiAgICB9Y2F0Y2goZSl7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJjbGFzcyBVc2VySW5mb3tcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgbGV0IGNvb2tpZSA9IHt9O1xyXG4gICAgZG9jdW1lbnQuY29va2llLnNwbGl0KC87XFxzLykuZm9yRWFjaCggKHMpID0+IHtcclxuICAgIC8vXCJfdXNlcl9zY3JlZW5fbmFtZT1rb3l1bWVpc2hpOyBfX3ByaXZpbGVnZT1jb250ZXN0YW50OyBfdXNlcl9pZD0xMTQwODsgX3VzZXJfbmFtZT1rb3l1bWVpc2hpXCIuc3BsaXQoLztcXHMvKS5mb3JFYWNoKCAocykgPT4ge1xyXG4gICAgICBsZXQgW2tleSwgdmFsdWVdID0gcy5zcGxpdCgvPS8pO1xyXG4gICAgICBjb29raWVba2V5XSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jb250ZXN0YW50ID0gZmFsc2U7XHJcbiAgICBpZiggXCJfX3ByaXZpbGVnZVwiIGluIGNvb2tpZSAmJiBjb29raWUuX19wcml2aWxlZ2UgPT09IFwiY29udGVzdGFudFwiKXtcclxuICAgICAgdGhpcy5jb250ZXN0YW50ID0gdHJ1ZTtcclxuICAgICAgdGhpcy51c2VyX3NjcmVlbl9uYW1lID0gY29va2llLl91c2VyX3NjcmVlbl9uYW1lO1xyXG4gICAgICB0aGlzLnVzZXJfaWQgPSBOdW1iZXIoIGNvb2tpZS5fdXNlcl9pZCApO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2codGhpcyk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBtZSA9IG5ldyBVc2VySW5mbygpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWU7XHJcbiIsImZ1bmN0aW9uIGdldFN0YW5kaW5ncyggY2FsbGJhY2ssIGluaXRpYWxpemUgKXtcclxuICBjb25zdCByZWcgPSAvXFxzKmRhdGE6XFxzKFxcWy4qXFxdKSwvO1xyXG5cclxuICBpZihpbml0aWFsaXplKXtcclxuICAgIGNvbnN0IHNjcmlwdFRleHQgPSAkKFwiaHRtbFwiKS5maW5kKCdzY3JpcHRbdHlwZT1cInRleHQvSmF2YVNjcmlwdFwiXScpLnRleHQoKS5zcGxpdChcIlxcblwiKTtcclxuXHJcbiAgICBzY3JpcHRUZXh0LmZvckVhY2goICh0eHQpID0+IHtcclxuICAgICAgY29uc3QgcmVzID0gcmVnLmV4ZWModHh0KTtcclxuICAgICAgaWYocmVzICE9PSBudWxsKXtcclxuICAgICAgICBjb25zdCBuZXdTdGFuZGluZ3MgPSBKU09OLnBhcnNlKHJlc1sxXSk7XHJcbiAgICAgICAgY2FsbGJhY2soIG5ld1N0YW5kaW5ncyApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9ZWxzZXtcclxuICAgICQuYWpheCgge3VybDogXCIuL3N0YW5kaW5nc1wifSApLmRvbmUoIChodG1sKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNjcmlwdFRleHQgPSAkKGh0bWwpLmZpbmQoJ3NjcmlwdFt0eXBlPVwidGV4dC9KYXZhU2NyaXB0XCJdJykudGV4dCgpLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgICBzY3JpcHRUZXh0LmZvckVhY2goICh0eHQpID0+IHtcclxuICAgICAgICBjb25zdCByZXMgPSByZWcuZXhlYyh0eHQpO1xyXG4gICAgICAgIGlmKHJlcyAhPT0gbnVsbCl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyggXCJzdWNjZXNzZnVsbHkgZ290IG5ldyBzdGFuZGluZ3MgOiBcIiwgcmVzWzFdICk7XHJcbiAgICAgICAgICBjb25zdCBuZXdTdGFuZGluZ3MgPSBKU09OLnBhcnNlKHJlc1sxXSk7XHJcbiAgICAgICAgICBjYWxsYmFjayggbmV3U3RhbmRpbmdzICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U29ydGluZ0Z1bmN0aW9uKCBrZXkgKXtcclxuICAvLyB0YXNre2l9XHJcbiAgaWYoIGtleS5zbGljZSgwLDQpID09IFwidGFza1wiICl7XHJcbiAgICBsZXQgaWQgPSBOdW1iZXIoIGtleS5zbGljZSg0KSApO1xyXG4gICAgcmV0dXJuIChsLHIpID0+IHtcclxuICAgICAgaWYoIGwudGFza3NbaWRdLnNjb3JlID09PSB1bmRlZmluZWQgJiYgci50YXNrc1tpZF0uc2NvcmUgPT09IHVuZGVmaW5lZCApIHJldHVybiAwO1xyXG4gICAgICBpZiggbC50YXNrc1tpZF0uc2NvcmUgPT09IHVuZGVmaW5lZCApIHJldHVybiAtMTtcclxuICAgICAgaWYoIHIudGFza3NbaWRdLnNjb3JlID09PSB1bmRlZmluZWQgKSByZXR1cm4gMTtcclxuICAgICAgaWYoIGwudGFza3NbaWRdLnNjb3JlICE9PSByLnRhc2tzW2lkXS5zY29yZSApe1xyXG4gICAgICAgIHJldHVybiBOdW1iZXIobC50YXNrc1tpZF0uc2NvcmUpIDwgTnVtYmVyKHIudGFza3NbaWRdLnNjb3JlKSA/IC0xIDogMTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgaWYoIGwudGFza3NbaWRdLnBlbmFsdHkgIT09IHIudGFza3NbaWRdLnBlbmFsdHkgKXtcclxuICAgICAgICAgIHJldHVybiBOdW1iZXIobC50YXNrc1tpZF0ucGVuYWx0eSkgPiBOdW1iZXIoci50YXNrc1tpZF0ucGVuYWx0eSkgPyAtMSA6IDE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG4gIGlmKCBrZXkgPT0gXCJ1c2VyX3NjcmVlbl9uYW1lXCIgKXtcclxuICAgIHJldHVybiAobCxyKSA9PntcclxuICAgICAgaWYoIGxba2V5XS50b0xvd2VyQ2FzZSgpICE9PSByW2tleV0udG9Mb3dlckNhc2UoKSApe1xyXG4gICAgICAgIHJldHVybiBsW2tleV0udG9Mb3dlckNhc2UoKSA8IHJba2V5XS50b0xvd2VyQ2FzZSgpID8gLTEgOiAxO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGlmKCBrZXkgPT0gXCJ0aW1lXCIgKXtcclxuICAgIHJldHVybiAobCxyKSA9PntcclxuICAgICAgaWYoIGwuc2NvcmUgIT09IHIuc2NvcmUgKSByZXR1cm4gTnVtYmVyKGwuc2NvcmUpID4gTnVtYmVyKHIuc2NvcmUpID8gLTEgOiAxO1xyXG4gICAgICBlbHNlIGlmKGwuZWxhcHNlZF90aW1lICE9PSByLmVsYXBzZWRfdGltZSkgcmV0dXJuIE51bWJlcihsLmVsYXBzZWRfdGltZSkgPCBOdW1iZXIoci5lbGFwc2VkX3RpbWUpID8gLTEgOiAxO1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKGwscikgPT4ge1xyXG4gICAgaWYoIGxba2V5XSAhPT0gcltrZXldICl7XHJcbiAgICAgIHJldHVybiAobFtrZXldKSA8IChyW2tleV0pID8gLTEgOiAxO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbmNsYXNzIFJhdGluZ3tcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgLy9bbGIsIHViKVxyXG4gICAgdGhpcy5sYiA9IFtcclxuICAgICAgLTEsIDAsICAgMSwgNDAwLCAgODAwLCAxMjAwLCAxNjAwLCAyMDAwLCAyNDAwLCAyODAwXHJcbiAgICBdO1xyXG4gICAgdGhpcy51YiA9IFtcclxuICAgICAgIDAsIDEsIDQwMCwgODAwLCAxMjAwLCAxNjAwLCAyMDAwLCAyNDAwLCAyODAwLCA1MDAwXHJcbiAgICBdO1xyXG5cclxuICAgIHRoaXMuY29sb3IgPSBbXHJcbiAgICAgIFwicmdiYSgxOTIsMCwxOTIsICAgMC41KVwiLCAvLyBcIiNDMDAwQzBcIixcclxuICAgICAgXCJyZ2JhKDAsMCwwLCAgICAgICAwLjUpXCIsIC8vIFwiIzAwMDAwMFwiLFxyXG4gICAgICBcInJnYmEoMTI4LDEyOCwxMjgsIDAuNSlcIiwgLy8gXCIjODA4MDgwXCIsXHJcbiAgICAgIFwicmdiYSgxMjgsNjQsMCwgICAgMC41KVwiLCAvLyBcIiM4MDQwMDBcIixcclxuICAgICAgXCJyZ2JhKDAsMTI4LDAsICAgICAwLjUpXCIsIC8vIFwiIzAwODAwMFwiLFxyXG4gICAgICBcInJnYmEoMCwxOTIsMTkyLCAgIDAuNSlcIiwgLy8gXCIjMDBDMEMwXCIsXHJcbiAgICAgIFwicmdiYSgwLDAsMjU1LCAgICAgMC41KVwiLCAvLyBcIiMwMDAwRkZcIixcclxuICAgICAgXCJyZ2JhKDE5MiwxOTIsMCwgICAwLjUpXCIsIC8vIFwiI0MwQzAwMFwiLFxyXG4gICAgICBcInJnYmEoMjU1LDEyOCwwLCAgIDAuNSlcIiwgLy8gXCIjRkY4MDAwXCIsXHJcbiAgICAgIFwicmdiYSgyNTUsMCwwLCAgICAgMC41KVwiICAvLyBcIiNGRjAwMDBcIlxyXG4gICAgXTtcclxuXHJcbiAgICB0aGlzLmNvbG9yT3JpZ2luYWwgPSBbXHJcbiAgICAgIFwiI0MwMDBDMFwiLFxyXG4gICAgICBcIiMwMDAwMDBcIixcclxuICAgICAgXCIjODA4MDgwXCIsXHJcbiAgICAgIFwiIzgwNDAwMFwiLFxyXG4gICAgICBcIiMwMDgwMDBcIixcclxuICAgICAgXCIjMDBDMEMwXCIsXHJcbiAgICAgIFwiIzAwMDBGRlwiLFxyXG4gICAgICBcIiNDMEMwMDBcIixcclxuICAgICAgXCIjRkY4MDAwXCIsXHJcbiAgICAgIFwiI0ZGMDAwMFwiXHJcbiAgICBdO1xyXG5cclxuICAgIHRoaXMudXNlckNvbG9yID0gW1xyXG4gICAgICBcInVzZXItYWRtaW5cIiwgLy8gXCIjQzAwMEMwXCIsXHJcbiAgICAgIFwidXNlci11bnJhdGVkXCIsIC8vIFwiIzAwMDAwMFwiLFxyXG4gICAgICBcInVzZXItZ3JheVwiLCAvLyBcIiM4MDgwODBcIixcclxuICAgICAgXCJ1c2VyLWJyb3duXCIsIC8vIFwiIzgwNDAwMFwiLFxyXG4gICAgICBcInVzZXItZ3JlZW5cIiwgLy8gXCIjMDA4MDAwXCIsXHJcbiAgICAgIFwidXNlci1jeWFuXCIsIC8vIFwiIzAwQzBDMFwiLFxyXG4gICAgICBcInVzZXItYmx1ZVwiLCAvLyBcIiMwMDAwRkZcIixcclxuICAgICAgXCJ1c2VyLXllbGxvd1wiLCAvLyBcIiNDMEMwMDBcIixcclxuICAgICAgXCJ1c2VyLW9yYW5nZVwiLCAvLyBcIiNGRjgwMDBcIixcclxuICAgICAgXCJ1c2VyLXJlZFwiICAvLyBcIiNGRjAwMDBcIlxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIGdldExldmVsKHJhdGluZyl7XHJcbiAgICBmb3IobGV0IGxldmVsPTA7IGxldmVsPHRoaXMuY29sb3IubGVuZ3RoOyBsZXZlbCsrKXtcclxuICAgICAgaWYoIHRoaXMubGJbbGV2ZWxdIDw9IHJhdGluZyAmJiByYXRpbmcgPCB0aGlzLnViW2xldmVsXSl7XHJcbiAgICAgICAgcmV0dXJuIGxldmVsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcblxyXG4gIGdldENvbG9yKHJhdGluZyl7XHJcbiAgICByZXR1cm4gdGhpcy5jb2xvclsgdGhpcy5nZXRMZXZlbChyYXRpbmcpIF07XHJcbiAgfVxyXG5cclxuICBnZXRDb2xvck9yaWdpbmFsKHJhdGluZyl7XHJcbiAgICByZXR1cm4gdGhpcy5jb2xvck9yaWdpbmFsWyB0aGlzLmdldExldmVsKHJhdGluZykgXTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlQ29sb3JlZE5hbWUoIHVzZXJfc2NyZWVuX25hbWUsIHJhdGluZyApe1xyXG4gICAgcmV0dXJuICg8YSBocmVmPXtgaHR0cHM6Ly9hdGNvZGVyLmpwL3VzZXIvJHt1c2VyX3NjcmVlbl9uYW1lfWB9XHJcbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHVzZXJuYW1lICR7dGhpcy51c2VyQ29sb3JbIHRoaXMuZ2V0TGV2ZWwocmF0aW5nKSBdfWB9XHJcbiAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXHJcbiAgICAgICAgICAgICAgIGtleT17YHVzZXItJHt1c2VyX3NjcmVlbl9uYW1lfWB9Pnt1c2VyX3NjcmVlbl9uYW1lfVxyXG4gICAgICAgICAgICA8L2E+KTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHJhdGluZyA9IG5ldyBSYXRpbmcoKTtcclxuXHJcbmNvbnN0IGNvdW50cmllcyA9IHtcclxuICBcIkFGXCI6XCJBZmdoYW5pc3RhblwiLFwiQUxcIjpcIkFsYmFuaWFcIixcIkRaXCI6XCJBbGdlcmlhXCIsXCJBRFwiOlwiQW5kb3JyYVwiLFwiQU9cIjpcIkFuZ29sYVwiLFwiQUdcIjpcIkFudGlndWEgYW5kIEJhcmJ1ZGFcIixcIkFSXCI6XCJBcmdlbnRpbmFcIixcIkFNXCI6XCJBcm1lbmlhXCIsXCJBVVwiOlwiQXVzdHJhbGlhXCIsXCJBVFwiOlwiQXVzdHJpYVwiLFwiQVpcIjpcIkF6ZXJiYWlqYW5cIixcIkJTXCI6XCJCYWhhbWFzXCIsXCJCSFwiOlwiQmFocmFpblwiLFwiQkRcIjpcIkJhbmdsYWRlc2hcIixcIkJCXCI6XCJCYXJiYWRvc1wiLFwiQllcIjpcIkJlbGFydXNcIixcIkJFXCI6XCJCZWxnaXVtXCIsXCJCWlwiOlwiQmVsaXplXCIsXCJCSlwiOlwiQmVuaW5cIixcIkJUXCI6XCJCaHV0YW5cIixcIkJPXCI6XCJCb2xpdmlhXCIsXCJCQVwiOlwiQm9zbmlhIGFuZCBIZXJ6ZWdvdmluYVwiLFwiQldcIjpcIkJvdHN3YW5hXCIsXCJCUlwiOlwiQnJhemlsXCIsXCJCTlwiOlwiQnJ1bmVpXCIsXCJCR1wiOlwiQnVsZ2FyaWFcIixcIkJGXCI6XCJCdXJraW5hIEZhc29cIixcIkJJXCI6XCJCdXJ1bmRpXCIsXCJLSFwiOlwiQ2FtYm9kaWFcIixcIkNNXCI6XCJDYW1lcm9vblwiLFwiQ0FcIjpcIkNhbmFkYVwiLFwiQ1ZcIjpcIkNhcGUgVmVyZGVcIixcIkNGXCI6XCJDZW50cmFsIEFmcmljYW4gUmVwdWJsaWNcIixcIlREXCI6XCJDaGFkXCIsXCJDTFwiOlwiQ2hpbGVcIixcIkNOXCI6XCJDaGluYVwiLFwiQ09cIjpcIkNvbG9tYmlhXCIsXCJLTVwiOlwiQ29tb3Jvc1wiLFwiQ0tcIjpcIkNvb2tcIixcIkNSXCI6XCJDb3N0YSBSaWNhXCIsXCJIUlwiOlwiQ3JvYXRpYVwiLFwiQ1VcIjpcIkN1YmFcIixcIkNZXCI6XCJDeXBydXNcIixcIkNaXCI6XCJDemVjaCBSZXB1YmxpY1wiLFwiQ0lcIjpcIkPDtHRlIGRcXCdJdm9pcmVcIixcIkNEXCI6XCJEZW1vY3JhdGljIFJlcHVibGljIG9mIHRoZSBDb25nb1wiLFwiREtcIjpcIkRlbm1hcmtcIixcIkRKXCI6XCJEamlib3V0aVwiLFwiRE1cIjpcIkRvbWluaWNhXCIsXCJET1wiOlwiRG9taW5pY2FuIFJlcHVibGljXCIsXCJFQ1wiOlwiRWN1YWRvclwiLFwiRUdcIjpcIkVneXB0XCIsXCJTVlwiOlwiRWwgU2FsdmFkb3JcIixcIkdRXCI6XCJFcXVhdG9yaWFsIEd1aW5lYVwiLFwiRVJcIjpcIkVyaXRyZWFcIixcIkVFXCI6XCJFc3RvbmlhXCIsXCJFVFwiOlwiRXRoaW9waWFcIixcIkZKXCI6XCJGaWppXCIsXCJGSVwiOlwiRmlubGFuZFwiLFwiTUtcIjpcIkZvcm1lciBZdWdvc2xhdiBSZXB1YmxpYyBvZiBNYWNlZG9uaWFcIixcIkZSXCI6XCJGcmFuY2VcIixcIkdBXCI6XCJHYWJvblwiLFwiR01cIjpcIkdhbWJpYVwiLFwiR0VcIjpcIkdlb3JnaWFcIixcIkRFXCI6XCJHZXJtYW55XCIsXCJHSFwiOlwiR2hhbmFcIixcIkdSXCI6XCJHcmVlY2VcIixcIkdEXCI6XCJHcmVuYWRhXCIsXCJHVFwiOlwiR3VhdGVtYWxhXCIsXCJHTlwiOlwiR3VpbmVhXCIsXCJHV1wiOlwiR3VpbmVhLUJpc3NhdVwiLFwiR1lcIjpcIkd1eWFuYVwiLFwiSEtcIjpcIkhvbmcgS29uZ1wiLFwiSFRcIjpcIkhhaXRpXCIsXCJITlwiOlwiSG9uZHVyYXNcIixcIkhVXCI6XCJIdW5nYXJ5XCIsXCJJU1wiOlwiSWNlbGFuZFwiLFwiSU5cIjpcIkluZGlhXCIsXCJJRFwiOlwiSW5kb25lc2lhXCIsXCJJUlwiOlwiSXJhblwiLFwiSVFcIjpcIklyYXFcIixcIklFXCI6XCJJcmVsYW5kXCIsXCJJTFwiOlwiSXNyYWVsXCIsXCJJVFwiOlwiSXRhbHlcIixcIkpNXCI6XCJKYW1haWNhXCIsXCJKUFwiOlwiSmFwYW5cIixcIkpPXCI6XCJKb3JkYW5cIixcIktaXCI6XCJLYXpha2hzdGFuXCIsXCJLRVwiOlwiS2VueWFcIixcIktJXCI6XCJLaXJpYmF0aVwiLFwiS1dcIjpcIkt1d2FpdFwiLFwiS0dcIjpcIkt5cmd5eiBSZXB1YmxpY1wiLFwiTEFcIjpcIkxhb3NcIixcIkxWXCI6XCJMYXR2aWFcIixcIkxCXCI6XCJMZWJhbm9uXCIsXCJMU1wiOlwiTGVzb3Rob1wiLFwiTFJcIjpcIkxpYmVyaWFcIixcIkxZXCI6XCJMaWJ5YVwiLFwiTElcIjpcIkxpZWNodGVuc3RlaW5cIixcIkxUXCI6XCJMaXRodWFuaWFcIixcIkxVXCI6XCJMdXhlbWJvdXJnXCIsXCJNR1wiOlwiTWFkYWdhc2NhclwiLFwiTVdcIjpcIk1hbGF3aVwiLFwiTVlcIjpcIk1hbGF5c2lhXCIsXCJNVlwiOlwiTWFsZGl2ZXNcIixcIk1MXCI6XCJNYWxpXCIsXCJNVFwiOlwiTWFsdGFcIixcIk1IXCI6XCJNYXJzaGFsbFwiLFwiTVJcIjpcIk1hdXJpdGFuaWFcIixcIk1VXCI6XCJNYXVyaXRpdXNcIixcIk1YXCI6XCJNZXhpY29cIixcIkZNXCI6XCJNaWNyb25lc2lhXCIsXCJNRFwiOlwiTW9sZG92YVwiLFwiTUNcIjpcIk1vbmFjb1wiLFwiTU5cIjpcIk1vbmdvbGlhXCIsXCJNRVwiOlwiTW9udGVuZWdyb1wiLFwiTUFcIjpcIk1vcm9jY29cIixcIk1aXCI6XCJNb3phbWJpcXVlXCIsXCJNTVwiOlwiTXlhbm1hclwiLFwiTkFcIjpcIk5hbWliaWFcIixcIk5SXCI6XCJOYXVydVwiLFwiTlBcIjpcIk5lcGFsXCIsXCJOTFwiOlwiTmV0aGVybGFuZHNcIixcIk5aXCI6XCJOZXcgWmVhbGFuZFwiLFwiTklcIjpcIk5pY2FyYWd1YVwiLFwiTkVcIjpcIk5pZ2VyXCIsXCJOR1wiOlwiTmlnZXJpYVwiLFwiTlVcIjpcIk5pdWVcIixcIk5PXCI6XCJOb3J3YXlcIixcIk9NXCI6XCJPbWFuXCIsXCJQS1wiOlwiUGFraXN0YW5cIixcIlBXXCI6XCJQYWxhdVwiLFwiUFNcIjpcIlBhbGVzdGluZVwiLFwiUEFcIjpcIlBhbmFtYVwiLFwiUEdcIjpcIlBhcHVhIE5ldyBHdWluZWFcIixcIlBZXCI6XCJQYXJhZ3VheVwiLFwiUEVcIjpcIlBlcnVcIixcIlBIXCI6XCJQaGlsaXBwaW5lc1wiLFwiUExcIjpcIlBvbGFuZFwiLFwiUFRcIjpcIlBvcnR1Z2FsXCIsXCJRQVwiOlwiUWF0YXJcIixcIkNHXCI6XCJSZXB1YmxpYyBvZiBDb25nb1wiLFwiS1JcIjpcIlJlcHVibGljIG9mIEtvcmVhXCIsXCJaQVwiOlwiUmVwdWJsaWMgb2YgU291dGggQWZyaWNhXCIsXCJST1wiOlwiUm9tYW5pYVwiLFwiUlVcIjpcIlJ1c3NpYVwiLFwiUldcIjpcIlJ3YW5kYVwiLFwiS05cIjpcIlNhaW50IENocmlzdG9waGVyIGFuZCBOZXZpc1wiLFwiTENcIjpcIlNhaW50IEx1Y2lhXCIsXCJWQ1wiOlwiU2FpbnQgVmluY2VudFwiLFwiV1NcIjpcIlNhbW9hXCIsXCJTTVwiOlwiU2FuIE1hcmlub1wiLFwiU1RcIjpcIlNhbyBUb21lIGFuZCBQcmluY2lwZVwiLFwiU0FcIjpcIlNhdWRpIEFyYWJpYVwiLFwiU05cIjpcIlNlbmVnYWxcIixcIlJTXCI6XCJTZXJiaWFcIixcIlNDXCI6XCJTZXljaGVsbGVzXCIsXCJTTFwiOlwiU2llcnJhIExlb25lXCIsXCJTR1wiOlwiU2luZ2Fwb3JlXCIsXCJTS1wiOlwiU2xvdmFraWFcIixcIlNJXCI6XCJTbG92ZW5pYVwiLFwiU0JcIjpcIlNvbG9tb25cIixcIlNPXCI6XCJTb21hbGlhXCIsXCJTU1wiOlwiU291dGggU3VkYW5cIixcIkVTXCI6XCJTcGFpblwiLFwiTEtcIjpcIlNyaSBMYW5rYVwiLFwiU0RcIjpcIlN1ZGFuXCIsXCJTUlwiOlwiU3VyaW5hbWVcIixcIlNaXCI6XCJTd2F6aWxhbmRcIixcIlNFXCI6XCJTd2VkZW5cIixcIkNIXCI6XCJTd2l0emVybGFuZFwiLFwiU1lcIjpcIlN5cmlhXCIsXCJUV1wiOlwiVGFpd2FuXCIsXCJUSlwiOlwiVGFqaWtpc3RhblwiLFwiVFpcIjpcIlRhbnphbmlhXCIsXCJUSFwiOlwiVGhhaWxhbmRcIixcIlRMXCI6XCJUaW1vci1MZXN0ZVwiLFwiVEdcIjpcIlRvZ29cIixcIlRPXCI6XCJUb25nYVwiLFwiVFRcIjpcIlRyaW5pZGFkIGFuZCBUb2JhZ29cIixcIlROXCI6XCJUdW5pc2lhXCIsXCJUUlwiOlwiVHVya2V5XCIsXCJUTVwiOlwiVHVya21lbmlzdGFuXCIsXCJUVlwiOlwiVHV2YWx1XCIsXCJVR1wiOlwiVWdhbmRhXCIsXCJVQVwiOlwiVWtyYWluZVwiLFwiQUVcIjpcIlVuaXRlZCBBcmFiIEVtaXJhdGVzXCIsXCJHQlwiOlwiVW5pdGVkIEtpbmdkb21cIixcIlVTXCI6XCJVbml0ZWQgU3RhdGVzIG9mIEFtZXJpY2FcIixcIlhYXCI6XCJVbmtub3duXCIsXCJVWVwiOlwiVXJ1Z3VheVwiLFwiVVpcIjpcIlV6YmVraXN0YW5cIixcIlZVXCI6XCJWYW51YXR1XCIsXCJWQVwiOlwiVmF0aWNhblwiLFwiVkVcIjpcIlZlbmV6dWVsYVwiLFwiVk5cIjpcIlZpZXQgTmFtXCIsXCJZRVwiOlwiWWVtZW5cIixcIlpNXCI6XCJaYW1iaWFcIixcIlpXXCI6XCJaaW1iYWJ3ZVwiXHJcbn07XHJcblxyXG5leHBvcnQge2dldFN0YW5kaW5ncywgZ2V0U29ydGluZ0Z1bmN0aW9uLCByYXRpbmcsIGNvdW50cmllc307Il19
