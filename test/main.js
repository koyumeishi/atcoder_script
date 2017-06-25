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

},{}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0tvdS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcYXBwU2V0dGluZ3MuanMiLCJzcmNcXGNvbnRlc3REYXRhLmpzIiwic3JjXFxjb250cm9sbC5qcyIsInNyY1xcY3NzLmpzIiwic3JjXFxmaWx0ZXIuanMiLCJzcmNcXGZyaWVuZHNMaXN0LmpzIiwic3JjXFxtYWluLmpzIiwic3JjXFxtb2RhbC5qcyIsInNyY1xccGFnZXIuanMiLCJzcmNcXHJlbG9hZC5qcyIsInNyY1xcc2V0dGluZ3MuanMiLCJzcmNcXHNvcnRpbmcuanMiLCJzcmNcXHN0YW5kaW5ncy5qcyIsInNyY1xcc3RhdHMuanMiLCJzcmNcXHN0YXRzXFxjaGFydENvbXBvbmVudC5qcyIsInNyY1xcc3RhdHNcXHN1bW1hcnkuanMiLCJzcmNcXHN0YXRzXFx0YXNrLmpzIiwic3JjXFx1c2VyaW5mby5qcyIsInNyY1xcdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7O0lBQVksSTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCLHNCOzs7QUFDbkIsb0NBQWE7QUFBQTs7QUFBQTs7QUFFWCxVQUFLLEtBQUwsR0FBYSxFQUFiO0FBQ0EsVUFBSyxLQUFMLENBQVcsUUFBWCxHQUF1QiwwQkFBaUIsSUFBakIsQ0FBdkI7QUFDQSxVQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXVCLDBCQUFpQixJQUFqQixDQUF2Qjs7QUFFQSxTQUFLLFlBQUwsQ0FBbUIsVUFBQyxDQUFELEVBQU87QUFDeEIsWUFBSyxTQUFMLEdBQWlCLENBQWpCO0FBQ0QsS0FGRCxFQUVJLElBRko7O0FBSUEsVUFBSyxPQUFMLEdBQWdCLDJCQUFo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LE1BQUssT0FEenJGLEVBQ2lzRixNQUFLLFVBRHRzRixFQUNpdEYsTUFBSyxXQUR0dEYsRUFDa3VGLE1BQUssUUFEdnVGLEVBQ2d2RixNQUFLLGFBRHJ2RixFQUNtd0YsTUFBSyxPQUR4d0YsRUFDZ3hGLE1BQUssUUFEcnhGLEVBQzh4RixNQUFLLFlBRG55RixFQUNnekYsTUFBSyxVQURyekYsRUFDZzBGLE1BQUssVUFEcjBGLEVBQ2cxRixNQUFLLGFBRHIxRixFQUNtMkYsTUFBSyxNQUR4MkYsRUFDKzJGLE1BQUssT0FEcDNGLEVBQzQzRixNQUFLLHFCQURqNEYsRUFDdTVGLE1BQUssU0FENTVGLEVBQ3M2RixNQUFLLFFBRDM2RixFQUNvN0YsTUFBSyxjQUR6N0YsRUFDdzhGLE1BQUssUUFENzhGLEVBQ3M5RixNQUFLLFFBRDM5RixFQUNvK0YsTUFBSyxTQUR6K0YsRUFDbS9GLE1BQUssc0JBRHgvRixFQUMrZ0csTUFBSyxnQkFEcGhHLEVBQ3FpRyxNQUFLLDBCQUQxaUcsRUFDcWtHLE1BQUssU0FEMWtHLEVBQ29sRyxNQUFLLFNBRHpsRyxFQUNtbUcsTUFBSyxZQUR4bUcsRUFDcW5HLE1BQUssU0FEMW5HLEVBQ29vRyxNQUFLLFNBRHpvRyxFQUNtcEcsTUFBSyxXQUR4cEcsRUFDb3FHLE1BQUssVUFEenFHLEVBQ29yRyxNQUFLLE9BRHpyRyxFQUNpc0csTUFBSyxRQUR0c0csRUFDK3NHLE1BQUs7QUFEcHRHLENBQWxCOztRQUlRLFksR0FBQSxZO1FBQWMsa0IsR0FBQSxrQjtRQUFvQixNLEdBQUEsTTtRQUFRLFMsR0FBQSxTIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi91dGlsLmpzJztcclxuaW1wb3J0IEFwcFNldHRpbmdzIGZyb20gJy4vYXBwU2V0dGluZ3MuanMnO1xyXG5pbXBvcnQgRnJpZW5kc0xpc3QgZnJvbSAnLi9mcmllbmRzTGlzdC5qcyc7XHJcbmltcG9ydCBDb250ZXN0RGF0YSBmcm9tICcuL2NvbnRlc3REYXRhLmpzJztcclxuaW1wb3J0IFN0YXRzIGZyb20gJy4vc3RhdHMuanMnO1xyXG5pbXBvcnQgQ29udHJvbGwgZnJvbSAnLi9jb250cm9sbC5qcyc7XHJcbmltcG9ydCBTdGFuZGluZ3MgZnJvbSAnLi9zdGFuZGluZ3MuanMnO1xyXG5pbXBvcnQgUGFnZXIgZnJvbSAnLi9wYWdlci5qcyc7XHJcbmltcG9ydCBNZSBmcm9tICcuL3VzZXJpbmZvLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0Q29kZXJDdXN0b21TdGFuZGluZ3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xyXG4gICAgdGhpcy5zdGF0ZS5zZXR0aW5ncyAgPSBuZXcgQXBwU2V0dGluZ3MoIHRydWUgKTtcclxuICAgIHRoaXMuc3RhdGUuZnJpZW5kcyAgID0gbmV3IEZyaWVuZHNMaXN0KCB0cnVlICk7XHJcblxyXG4gICAgdXRpbC5nZXRTdGFuZGluZ3MoIChzKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RhbmRpbmdzID0gcztcclxuICAgIH0gLCB0cnVlKTtcclxuXHJcbiAgICB0aGlzLmNvbnRlc3QgID0gbmV3IENvbnRlc3REYXRhKCk7XHJcblxyXG4gICAgdGhpcy5zdGF0ZS5maWx0ZXJlZFN0YW5kaW5ncyA9IHRoaXMuZ2V0RmlsdGVyZWRTdGFuZGluZ3MoIHRoaXMuc3RhdGUuc2V0dGluZ3MgKTtcclxuICAgIHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPSAwOyAvL3plcm8taW5kZXhlZFxyXG4gICAgdGhpcy5zdGF0ZS50b3RhbFBhZ2UgICA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoICh0aGlzLnN0YXRlLmZpbHRlcmVkU3RhbmRpbmdzLmxlbmd0aCArIHRoaXMuc3RhdGUuc2V0dGluZ3MucGFnZVNpemUgLSAxKSAvIHRoaXMuc3RhdGUuc2V0dGluZ3MucGFnZVNpemUgKSApO1xyXG5cclxuICAgIHRoaXMuZ2V0RmlsdGVyZWRTdGFuZGluZ3MuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZ2V0RmlsdGVyZWRTdGFuZGluZ3NUb1JlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy51cGRhdGVTdGFuZGluZ3MuYmluZCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZUZyaWVuZHMuYmluZCh0aGlzKTtcclxuICAgIHRoaXMudXBkYXRlU2V0dGluZ3MuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVNldHRpbmdzKCBuZXdTZXR0aW5ncyApe1xyXG4gICAgbmV3U2V0dGluZ3Muc2F2ZSgpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSggKHByZXZTdGF0ZSkgPT4ge1xyXG4gICAgICBjb25zdCBuZXdGaWx0ZXJlZFN0YW5kaW5ncyA9IHRoaXMuZ2V0RmlsdGVyZWRTdGFuZGluZ3MoIG5ld1NldHRpbmdzICk7XHJcbiAgICAgIGNvbnN0IHRvdGFsUGFnZSA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoIChuZXdGaWx0ZXJlZFN0YW5kaW5ncy5sZW5ndGggKyBuZXdTZXR0aW5ncy5wYWdlU2l6ZSAtIDEpIC8gbmV3U2V0dGluZ3MucGFnZVNpemUgKSApO1xyXG4gICAgICBjb25zdCBjdXJyZW50UGFnZSA9IE1hdGgubWluKHRvdGFsUGFnZS0xLCAgcHJldlN0YXRlLmN1cnJlbnRQYWdlKTtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc2V0dGluZ3MgOiBuZXdTZXR0aW5ncyxcclxuICAgICAgICBmaWx0ZXJlZFN0YW5kaW5ncyA6IG5ld0ZpbHRlcmVkU3RhbmRpbmdzLFxyXG4gICAgICAgIHRvdGFsUGFnZSA6IHRvdGFsUGFnZSxcclxuICAgICAgICBjdXJyZW50UGFnZSA6IGN1cnJlbnRQYWdlXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUZyaWVuZHMoIGhhbmRsZU5hbWVzLCBhZGRpbmcgKXtcclxuICAgIHRoaXMuc2V0U3RhdGUoIChwcmV2U3RhdGUpID0+IHtcclxuICAgICAgbGV0IG5ld0ZyaWVuZHMgPSBuZXcgRnJpZW5kc0xpc3QoIGZhbHNlICk7XHJcbiAgICAgIG5ld0ZyaWVuZHMuZnJpZW5kcyA9IG5ldyBTZXQoIHByZXZTdGF0ZS5mcmllbmRzLmdldExpc3QoKSApO1xyXG4gICAgICBpZiggYWRkaW5nID09PSB0cnVlICl7XHJcbiAgICAgICAgbmV3RnJpZW5kcy5hZGQoaGFuZGxlTmFtZXMpO1xyXG4gICAgICB9ZWxzZSBpZiggYWRkaW5nID09PSBmYWxzZSApe1xyXG4gICAgICAgIG5ld0ZyaWVuZHMucmVtb3ZlKGhhbmRsZU5hbWVzKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4geyBmcmllbmRzIDogbmV3RnJpZW5kcyB9O1xyXG4gICAgfSApO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlU3RhbmRpbmdzKCl7XHJcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0ZWQgdXBkYXRpbmdcIik7XHJcblxyXG4gICAgdXRpbC5nZXRTdGFuZGluZ3MoIChzKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RhbmRpbmdzID0gcztcclxuICAgICAgdGhpcy5zZXRTdGF0ZSggKHByZXZTdGF0ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5ld0ZpbHRlcmVkU3RhbmRpbmdzID0gdGhpcy5nZXRGaWx0ZXJlZFN0YW5kaW5ncyggdGhpcy5zdGF0ZS5zZXR0aW5ncyApO1xyXG4gICAgICAgIGNvbnN0IHRvdGFsUGFnZSA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoIChuZXdGaWx0ZXJlZFN0YW5kaW5ncy5sZW5ndGggKyB0aGlzLnN0YXRlLnNldHRpbmdzLnBhZ2VTaXplIC0gMSkgLyB0aGlzLnN0YXRlLnNldHRpbmdzLnBhZ2VTaXplICkgKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IE1hdGgubWluKHRvdGFsUGFnZS0xLCAgcHJldlN0YXRlLmN1cnJlbnRQYWdlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGZpbHRlcmVkU3RhbmRpbmdzIDogbmV3RmlsdGVyZWRTdGFuZGluZ3MsXHJcbiAgICAgICAgICB0b3RhbFBhZ2UgOiB0b3RhbFBhZ2UsXHJcbiAgICAgICAgICBjdXJyZW50UGFnZSA6IGN1cnJlbnRQYWdlXHJcbiAgICAgICAgfTtcclxuICAgICAgfSApO1xyXG4gICAgICBjb25zb2xlLmxvZyggXCJzdGFuZGluZ3MgdXBkYXRpbmcgc3VjY2Vzc2Z1bGx5IGNvbXBsZXRlZFwiICk7XHJcbiAgICB9ICwgZmFsc2UpO1xyXG4gIH1cclxuXHJcblxyXG4gIGdldEZpbHRlcmVkU3RhbmRpbmdzKHNldHRpbmdzKXtcclxuICAgIGNvbnN0IHIgPSB1dGlsLnJhdGluZztcclxuICAgIGxldCBuYW1lUmVnO1xyXG4gICAgdHJ5e1xyXG4gICAgICBuYW1lUmVnID0gbmV3IFJlZ0V4cCggXCJeXCIgKyBzZXR0aW5ncy5maWx0ZXJOYW1lICwgXCJpXCIpO1xyXG4gICAgfWNhdGNoKGUpe1xyXG4gICAgICBuYW1lUmVnID0gbmV3IFJlZ0V4cCggXCJcIiApO1xyXG4gICAgfVxyXG4gICAgbGV0IGZTdGFuZGluZ3MgPSB0aGlzLnN0YW5kaW5ncy5maWx0ZXIoIHJvdyA9PiB7XHJcbiAgICAgIGlmKHNldHRpbmdzLmZpbHRlckJ5RnJpZW5kcyA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgaWYodGhpcy5zdGF0ZS5mcmllbmRzLmlzRnJpZW5kKCByb3cudXNlcl9zY3JlZW5fbmFtZSApID09PSBmYWxzZSAmJlxyXG4gICAgICAgICAgIHJvdy51c2VyX3NjcmVlbl9uYW1lICE9PSBNZS51c2VyX3NjcmVlbl9uYW1lKXtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYoc2V0dGluZ3MuZmlsdGVyQnlDb3VudHJ5ID09PSB0cnVlKXtcclxuICAgICAgICBpZiggcm93LmNvdW50cnkgIT09IHNldHRpbmdzLmZpbHRlckNvdW50cnkgKXtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYoc2V0dGluZ3MuZmlsdGVyQnlSYXRpbmcgPT09IHRydWUpe1xyXG4gICAgICAgIC8vIHJhdGluZyBmaWx0ZXIgZnVuY3Rpb25cclxuICAgICAgICAvLyByb3cucmF0aW5nXHJcbiAgICAgICAgY29uc3QgbGV2ZWwgPSByLmdldExldmVsKCByb3cucmF0aW5nICk7XHJcbiAgICAgICAgaWYoIHNldHRpbmdzLmZpbHRlclJhdGluZy5oYXMobGV2ZWwpID09PSBmYWxzZSApe1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZihzZXR0aW5ncy5maWx0ZXJCeU5hbWUgPT09IHRydWUpe1xyXG4gICAgICAgIGlmKCBuYW1lUmVnLmV4ZWMoIHJvdy51c2VyX3NjcmVlbl9uYW1lICkgPT09IG51bGwgJiYgbmFtZVJlZy5leGVjKCByb3cudXNlcl9uYW1lICkgPT09IG51bGwgKXtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9ICk7XHJcblxyXG4gICAgaWYoIHNldHRpbmdzLnNvcnRpbmdFbmFibGVkID09PSB0cnVlICl7XHJcbiAgICAgIGxldCBmID0gdXRpbC5nZXRTb3J0aW5nRnVuY3Rpb24oIHNldHRpbmdzLnNvcnRpbmdLZXkgKTtcclxuICAgICAgaWYoIHNldHRpbmdzLnNvcnRpbmdPcmRlciA9PT0gXCJhc2NlbmRpbmdcIikgcmV0dXJuIGZTdGFuZGluZ3Muc29ydCggZiApO1xyXG4gICAgICBlbHNlIHJldHVybiBmU3RhbmRpbmdzLnNvcnQoIChhLGIpPT5mKGEsYikqLTEgKTtcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gZlN0YW5kaW5ncztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEZpbHRlcmVkU3RhbmRpbmdzVG9SZW5kZXIoKXtcclxuICAgIGNvbnN0IHBhZ2VCZWdpbiA9IHRoaXMuc3RhdGUuc2V0dGluZ3MucGFnZVNpemUgKiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlO1xyXG4gICAgY29uc3QgcGFnZUVuZCAgID0gdGhpcy5zdGF0ZS5zZXR0aW5ncy5wYWdlU2l6ZSAqICh0aGlzLnN0YXRlLmN1cnJlbnRQYWdlKzEpO1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuZmlsdGVyZWRTdGFuZGluZ3Muc2xpY2UoIHBhZ2VCZWdpbiwgcGFnZUVuZCApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBjb25zdCBwYWdlTWUgPSAoKCk9PntcclxuICAgICAgY29uc3QgcG9zID0gdGhpcy5zdGF0ZS5maWx0ZXJlZFN0YW5kaW5ncy5maW5kSW5kZXgoIChyb3cpPT57cmV0dXJuIHJvdy51c2VyX3NjcmVlbl9uYW1lID09PSBNZS51c2VyX3NjcmVlbl9uYW1lfSApO1xyXG4gICAgICBpZiggcG9zID09PSAtMSApIHJldHVybiBudWxsO1xyXG4gICAgICByZXR1cm4gTWF0aC5mbG9vciggcG9zL3RoaXMuc3RhdGUuc2V0dGluZ3MucGFnZVNpemUgKTtcclxuICAgIH0pKCk7XHJcbiAgICBsZXQgcyA9IHRoaXMuZ2V0RmlsdGVyZWRTdGFuZGluZ3NUb1JlbmRlcigpO1xyXG4gICAgbGV0IGNvbXBvbmVudHMgPSAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPENvbnRyb2xsIHN0YW5kaW5ncz17dGhpcy5zdGFuZGluZ3N9XHJcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZUZ1bmM9eygpPT50aGlzLnVwZGF0ZVN0YW5kaW5ncygpfVxyXG4gICAgICAgICAgICAgICAgICBjb250ZXN0PXt0aGlzLmNvbnRlc3R9XHJcbiAgICAgICAgICAgICAgICAgIHNldHRpbmdzPXt0aGlzLnN0YXRlLnNldHRpbmdzfVxyXG4gICAgICAgICAgICAgICAgICBzZXR0aW5nc1VwZGF0ZUZ1bmM9eyAobmV3U2V0dGluZ3MpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTZXR0aW5ncyhuZXdTZXR0aW5ncyk7XHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgIGZyaWVuZHM9e3RoaXMuc3RhdGUuZnJpZW5kc31cclxuICAgICAgICAgICAgICAgICAgZnJpZW5kc1VwZGF0ZUZ1bmM9eyhuYW1lLCBhZGRpbmcpPT50aGlzLnVwZGF0ZUZyaWVuZHMobmFtZSxhZGRpbmcpfVxyXG4gICAgICAgICAgICAgICAgICBnZXRBY3RpdmVDb3VudHJpZXM9eygpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi4obmV3IFNldCggdGhpcy5zdGFuZGluZ3MubWFwKCAoZSk9PmUuY291bnRyeSApICkpXS5zb3J0KCAoYSxiKT0+IHtyZXR1cm4gdXRpbC5jb3VudHJpZXNbYV0gPCB1dGlsLmNvdW50cmllc1tiXSA/IC0xIDogMTt9ICk7XHJcbiAgICAgICAgICAgICAgICAgIH19Lz5cclxuICAgICAgICA8UGFnZXIgY3VycmVudD17dGhpcy5zdGF0ZS5jdXJyZW50UGFnZX0gdG90YWw9e3RoaXMuc3RhdGUudG90YWxQYWdlfVxyXG4gICAgICAgICAgICAgICBtZT17cGFnZU1lfVxyXG4gICAgICAgICAgICAgICBvbkNsaWNrRnVuYz17IChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgY29uc3QgcGFnZSA9IE51bWJlciggZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UnKSApO1xyXG4gICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHtjdXJyZW50UGFnZSA6IHBhZ2V9ICk7XHJcbiAgICAgICAgICAgICAgIH0gfS8+XHJcbiAgICAgICAgPFN0YW5kaW5ncyBzdGFuZGluZ3M9e3N9XHJcbiAgICAgICAgICAgICAgICAgICB0YXNrRGF0YT17dGhpcy5jb250ZXN0LnRhc2tzfVxyXG4gICAgICAgICAgICAgICAgICAgY29udGVzdEVuZGVkPXt0aGlzLmNvbnRlc3QuY29udGVzdEVuZGVkfVxyXG4gICAgICAgICAgICAgICAgICAgc2V0dGluZ3M9e3RoaXMuc3RhdGUuc2V0dGluZ3N9XHJcbiAgICAgICAgICAgICAgICAgICBmcmllbmRzPXt0aGlzLnN0YXRlLmZyaWVuZHN9XHJcbiAgICAgICAgICAgICAgICAgICBmcmllbmRzVXBkYXRlRnVuYz17KG5hbWUsIGFkZGluZyk9PnRoaXMudXBkYXRlRnJpZW5kcyhuYW1lLGFkZGluZyl9XHJcbiAgICAgICAgICAgICAgICAgICBvZmZTZXQ9e3RoaXMuc3RhdGUuY3VycmVudFBhZ2UqdGhpcy5zdGF0ZS5zZXR0aW5ncy5wYWdlU2l6ZX0vPlxyXG4gICAgICAgIDxQYWdlciBjdXJyZW50PXt0aGlzLnN0YXRlLmN1cnJlbnRQYWdlfSB0b3RhbD17dGhpcy5zdGF0ZS50b3RhbFBhZ2V9XHJcbiAgICAgICAgICAgICAgIG1lPXtwYWdlTWV9XHJcbiAgICAgICAgICAgICAgIG9uQ2xpY2tGdW5jPXsgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgY29uc3QgcGFnZSA9IE51bWJlciggZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2UnKSApO1xyXG4gICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHtjdXJyZW50UGFnZSA6IHBhZ2V9ICk7XHJcbiAgICAgICAgICAgICAgIH0gfS8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICAgIHJldHVybiBjb21wb25lbnRzO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBTZXR0aW5nc3tcclxuICBjb25zdHJ1Y3RvciggbG9hZCApe1xyXG4gICAgLy9vcHRpb25zXHJcbiAgICB0aGlzLmhpZ2hsaWdodEZyaWVuZHMgICA9IHRydWU7XHJcbiAgICB0aGlzLmRpc2FibGVSYXRpbmdDb2xvciA9IGZhbHNlO1xyXG4gICAgdGhpcy5kaXNwbGF5TmFtZVN0eWxlICAgPSBcInVzZXJfc2NyZWVuX25hbWVcIjtcclxuICAgIHRoaXMucGFnZVNpemUgICAgICAgICAgID0gNTA7XHJcbiAgICB0aGlzLnNob3dOYXRpb25hbEZsYWcgICA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5zYXZlRmlsdGVyaW5nU3RhdGUgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmZpbHRlckNvdW50cnkgICAgPSBudWxsO1xyXG4gICAgdGhpcy5maWx0ZXJSYXRpbmcgICAgID0gbmV3IFNldChbMSwyLDMsNCw1LDYsNyw4LDldKTtcclxuXHJcbiAgICB0aGlzLmZpbHRlckJ5RnJpZW5kcyA9IGZhbHNlO1xyXG4gICAgdGhpcy5maWx0ZXJCeUNvdW50cnkgPSBmYWxzZTtcclxuICAgIHRoaXMuZmlsdGVyQnlSYXRpbmcgID0gZmFsc2U7XHJcbiAgICB0aGlzLmZpbHRlckJ5TmFtZSAgICA9IGZhbHNlO1xyXG4gICAgdGhpcy5maWx0ZXJOYW1lICAgICAgPSBcIlwiO1xyXG5cclxuICAgIGlmKGxvYWQgPT09IHRydWUpIHRoaXMubG9hZCgpO1xyXG5cclxuICAgIGlmKCB0aGlzLnNhdmVGaWx0ZXJpbmdTdGF0ZSA9PT0gZmFsc2UgKXtcclxuICAgICAgLy9yZXNldCB0ZW1wb3Jhcnkgb3B0aW9uc1xyXG4gICAgICB0aGlzLmZpbHRlckJ5RnJpZW5kcyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmZpbHRlckJ5Q291bnRyeSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmZpbHRlckJ5UmF0aW5nICA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmZpbHRlckJ5TmFtZSAgICA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmZpbHRlck5hbWUgICAgICA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zb3J0aW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgLy8gXCJyYW5rXCIsIFwidXNlcl9zY3JlZW5fbmFtZVwiLCBcInJhdGluZ1wiLCBcImNvdW50cnlcIiwgXCJjb21wZXRpdGlvbnNcIiwgXCJ0YXNre2l9XCJcclxuICAgIHRoaXMuc29ydGluZ0tleSAgICAgPSBcInJhbmtcIjtcclxuICAgIHRoaXMuc29ydGluZ09yZGVyICAgPSBcImFzY2VuZGluZ1wiO1xyXG5cclxuICAgIHRoaXMubG9hZC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5zYXZlLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBsb2FkKCl7XHJcbiAgICAvL2xvYWRcclxuICAgIHRyeXtcclxuICAgICAgY29uc3Qgc2V0dGluZ3MgPSBKU09OLnBhcnNlKCBHTV9nZXRWYWx1ZSgnc2V0dGluZ3MnLCAne30nKSApO1xyXG4gICAgICBPYmplY3QuYXNzaWduKCB0aGlzLCBzZXR0aW5ncyk7XHJcbiAgICAgIGlmKCB0aGlzLmZpbHRlclJhdGluZyA9PT0gdW5kZWZpbmVkKSB0aGlzLmZpbHRlclJhdGluZyA9IG5ldyBTZXQoWzEsMiwzLDQsNSw2LDcsOCw5XSk7XHJcbiAgICAgIGVsc2UgdGhpcy5maWx0ZXJSYXRpbmcgPSBuZXcgU2V0KHRoaXMuZmlsdGVyUmF0aW5nKTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwibG9hZGVkIDogc2V0dGluZ3NcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xyXG4gICAgfWNhdGNoKGUpe1xyXG4gICAgICBjb25zb2xlLmxvZyhcImZhaWxkIHRvIGxvYWQgc2V0dGluZ3NcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBzYXZlKCl7XHJcbiAgICAvL3NhdmVcclxuICAgIHRoaXMuZmlsdGVyUmF0aW5nID0gWy4uLnRoaXMuZmlsdGVyUmF0aW5nXTtcclxuXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMpO1xyXG4gICAgY29uc3Qgc3RyID0gSlNPTi5zdHJpbmdpZnkoIHNldHRpbmdzICk7XHJcblxyXG4gICAgdGhpcy5maWx0ZXJSYXRpbmcgPSBuZXcgU2V0KHRoaXMuZmlsdGVyUmF0aW5nKTtcclxuXHJcbiAgICBHTV9zZXRWYWx1ZSgnc2V0dGluZ3MnLCBzdHIpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwic2F2ZWQgOiBzZXR0aW5nc1wiKTtcclxuICAgIGNvbnNvbGUubG9nKHN0cik7XHJcbiAgfVxyXG5cclxuICBpc0ZpbHRlcnNFbmFibGVkKCl7XHJcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJCeUZyaWVuZHMgfHwgdGhpcy5maWx0ZXJCeUNvdW50cnkgfHwgdGhpcy5maWx0ZXJCeVJhdGluZyB8fCB0aGlzLmZpbHRlckJ5TmFtZTtcclxuICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZXN0RGF0YXtcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgdGhpcy5jb250c3ROYW1lID0gJChcImRpdi5jb250YWluZXIgPiBhLmJyYW5kID4gc3Bhbi5jb250ZXN0LW5hbWVcIikudGV4dCgpO1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSggRGF0ZS5wYXJzZSgkKCd0aW1lI2NvbnRlc3Qtc3RhcnQtdGltZScpLnRleHQoKSkgKTtcclxuICAgIHRoaXMuZW5kVGltZSAgID0gbmV3IERhdGUoIERhdGUucGFyc2UoJCgndGltZSNjb250ZXN0LWVuZC10aW1lJykudGV4dCgpKSApO1xyXG5cclxuICAgIHRoaXMuY29udGVzdEVuZGVkID0gKG5ldyBEYXRlKCkpID49IHRoaXMuZW5kVGltZTtcclxuXHJcbiAgICBjb25zdCB0aGVhZCA9ICAkKCcjY29udGVzdC1zdGFuZGluZ3MgPiB0aGVhZCA+IHRyID4gdGgnKTtcclxuICAgIHRoaXMubnVtVGFza3MgPSB0aGVhZC5sZW5ndGggLSAzO1xyXG4gICAgdGhpcy50YXNrcyA9IG5ldyBBcnJheSggdGhpcy5udW1UYXNrcyApO1xyXG4gICAgZm9yKGxldCBpPTA7IGk8dGhpcy5udW1UYXNrczsgaSsrKXtcclxuICAgICAgY29uc3QgdGFza05hbWUgPSB0aGVhZC5nZXQoaSsyKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpWzBdLnRleHRDb250ZW50O1xyXG4gICAgICBjb25zdCB0YXNrVXJsICA9IHRoZWFkLmdldChpKzIpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylbMF0uZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcbiAgICAgIHRoaXMudGFza3NbaV0gPSBuZXcgVGFza0RhdGEoIHRhc2tOYW1lLCB0YXNrVXJsLCBpICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBUYXNrRGF0YXtcclxuICBjb25zdHJ1Y3RvciggbmFtZSwgdXJsLCBpZCApe1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuaWQgICA9IGlkO1xyXG4gICAgdGhpcy51cmwgID0gdXJsO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgU3RhdHMgZnJvbSAnLi9zdGF0cy5qcydcclxuaW1wb3J0IEZpbHRlciBmcm9tICcuL2ZpbHRlci5qcydcclxuaW1wb3J0IFNldHRpbmdzIGZyb20gJy4vc2V0dGluZ3MuanMnXHJcbmltcG9ydCBTb3J0aW5nIGZyb20gJy4vc29ydGluZy5qcydcclxuaW1wb3J0IFJlbG9hZGluZyBmcm9tICcuL3JlbG9hZC5qcydcclxuaW1wb3J0IEFwcFNldHRpbmdzIGZyb20gJy4vYXBwU2V0dGluZ3MuanMnO1xyXG5cclxuXHJcbmNsYXNzIEZyaWVuZHNCdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMudXBkYXRlLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoIG9wdGlvbiApe1xyXG4gICAgbGV0IG5ld1NldHRpbmdzID0gT2JqZWN0LmFzc2lnbihuZXcgQXBwU2V0dGluZ3MoKSwgdGhpcy5wcm9wcy5zZXR0aW5ncyk7XHJcbiAgICBmb3IobGV0IHBhcmFtIGluIG9wdGlvbil7XHJcbiAgICAgIG5ld1NldHRpbmdzW3BhcmFtXSA9IG9wdGlvbltwYXJhbV07XHJcbiAgICB9XHJcbiAgICB0aGlzLnByb3BzLnNldHRpbmdzVXBkYXRlRnVuYyggbmV3U2V0dGluZ3MgKTtcclxuICB9XHJcblxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IGJ1dHRvbiA9IChcclxuICAgICAgPGEgaHJlZj1cIiNcIlxyXG4gICAgICAgICBjbGFzc05hbWU9e2BhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgJHsgdGhpcy5wcm9wcy5zZXR0aW5ncy5maWx0ZXJCeUZyaWVuZHMgPyBcImZpbHRlcmluZy1lbmFibGVkXCIgOiBcImZpbHRlcmluZy1kaXNhYmxlZFwifWB9PlxyXG4gICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+cGVvcGxlPC9pPlxyXG4gICAgICAgIEZyaWVuZHMgXHJcbiAgICAgIDwvYT5cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgY29udHJvbGxlci1idXR0b25cIj5cclxuICAgICAgICA8ZGl2IG9uQ2xpY2s9eyAoKSA9PiB7XHJcbiAgICAgICAgICBsZXQgbmV3U2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKG5ldyBBcHBTZXR0aW5ncygpLCB0aGlzLnByb3BzLnNldHRpbmdzKTtcclxuICAgICAgICAgIG5ld1NldHRpbmdzW1wiZmlsdGVyQnlGcmllbmRzXCJdID0gIXRoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyQnlGcmllbmRzO1xyXG4gICAgICAgICAgdGhpcy5wcm9wcy5zZXR0aW5nc1VwZGF0ZUZ1bmMoIG5ld1NldHRpbmdzICk7XHJcbiAgICAgICAgfSB9PntidXR0b259PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGxldCByZXQgPSAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwiZ3JpZFwiLCBncmlkVGVtcGxhdGVSb3dzOlwiMWZyXCIsIGdyaWRUZW1wbGF0ZUNvbHVtbnM6XCIyZnIgMWZyIDFmciAxZnIgMWZyIDFmclwifX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIxLzJcIiwgZ3JpZENvbHVtbjpcIjEvMlwiLCBwYWRkaW5nOlwiNHB4XCJ9fT5cclxuICAgICAgICAgIDxSZWxvYWRpbmdcclxuICAgICAgICAgICAgdXBkYXRlRnVuYz17dGhpcy5wcm9wcy51cGRhdGVGdW5jfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7Z3JpZFJvdzpcIjEvMlwiLCBncmlkQ29sdW1uOlwiMi8zXCIsIHBhZGRpbmc6XCI0cHhcIn19PlxyXG4gICAgICAgICAgPEZyaWVuZHNCdXR0b25cclxuICAgICAgICAgICAgc2V0dGluZ3M9e3RoaXMucHJvcHMuc2V0dGluZ3N9XHJcbiAgICAgICAgICAgIHNldHRpbmdzVXBkYXRlRnVuYz17dGhpcy5wcm9wcy5zZXR0aW5nc1VwZGF0ZUZ1bmN9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tncmlkUm93OlwiMS8yXCIsIGdyaWRDb2x1bW46XCIzLzRcIiwgcGFkZGluZzpcIjRweFwifX0+XHJcbiAgICAgICAgICA8RmlsdGVyXHJcbiAgICAgICAgICAgIHNldHRpbmdzPXt0aGlzLnByb3BzLnNldHRpbmdzfVxyXG4gICAgICAgICAgICBzZXR0aW5nc1VwZGF0ZUZ1bmM9e3RoaXMucHJvcHMuc2V0dGluZ3NVcGRhdGVGdW5jfVxyXG4gICAgICAgICAgICBnZXRBY3RpdmVDb3VudHJpZXM9e3RoaXMucHJvcHMuZ2V0QWN0aXZlQ291bnRyaWVzfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7Z3JpZFJvdzpcIjEvMlwiLCBncmlkQ29sdW1uOlwiNC81XCIsIHBhZGRpbmc6XCI0cHhcIn19PlxyXG4gICAgICAgICAgPFNvcnRpbmdcclxuICAgICAgICAgICAgc2V0dGluZ3M9e3RoaXMucHJvcHMuc2V0dGluZ3N9XHJcbiAgICAgICAgICAgIGNvbnRlc3Q9e3RoaXMucHJvcHMuY29udGVzdH1cclxuICAgICAgICAgICAgc2V0dGluZ3NVcGRhdGVGdW5jPXt0aGlzLnByb3BzLnNldHRpbmdzVXBkYXRlRnVuY31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIxLzJcIiwgZ3JpZENvbHVtbjpcIjUvNlwiLCBwYWRkaW5nOlwiNHB4XCJ9fT5cclxuICAgICAgICAgIDxTdGF0c1xyXG4gICAgICAgICAgICBzdGFuZGluZ3M9e3RoaXMucHJvcHMuc3RhbmRpbmdzfVxyXG4gICAgICAgICAgICBjb250ZXN0PXt0aGlzLnByb3BzLmNvbnRlc3R9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tncmlkUm93OlwiMS8yXCIsIGdyaWRDb2x1bW46XCI2LzdcIiwgcGFkZGluZzpcIjRweFwifX0+XHJcbiAgICAgICAgICA8U2V0dGluZ3NcclxuICAgICAgICAgICAgc2V0dGluZ3M9e3RoaXMucHJvcHMuc2V0dGluZ3N9XHJcbiAgICAgICAgICAgIHNldHRpbmdzVXBkYXRlRnVuYz17dGhpcy5wcm9wcy5zZXR0aW5nc1VwZGF0ZUZ1bmN9XHJcbiAgICAgICAgICAgIGZyaWVuZHM9e3RoaXMucHJvcHMuZnJpZW5kc31cclxuICAgICAgICAgICAgZnJpZW5kc1VwZGF0ZUZ1bmM9e3RoaXMucHJvcHMuZnJpZW5kc1VwZGF0ZUZ1bmN9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHJldDtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5qZWN0Q3VzdG9tQ1NTKCl7XHJcbiAgbGV0IGNzcyA9IGBcclxuLyogUnVsZXMgZm9yIHNpemluZyB0aGUgaWNvbi4gKi9cclxuLm1hdGVyaWFsLWljb25zLm1kLTE4IHsgZm9udC1zaXplOiAxOHB4OyB9XHJcbi5tYXRlcmlhbC1pY29ucy5tZC0yNCB7IGZvbnQtc2l6ZTogMjRweDsgfVxyXG4ubWF0ZXJpYWwtaWNvbnMubWQtMzYgeyBmb250LXNpemU6IDM2cHg7IH1cclxuLm1hdGVyaWFsLWljb25zLm1kLTQ4IHsgZm9udC1zaXplOiA0OHB4OyB9XHJcblxyXG4vKiBSdWxlcyBmb3IgdXNpbmcgaWNvbnMgYXMgYmxhY2sgb24gYSBsaWdodCBiYWNrZ3JvdW5kLiAqL1xyXG4ubWF0ZXJpYWwtaWNvbnMubWQtZGFyayB7IGNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNTQpOyB9XHJcbi5tYXRlcmlhbC1pY29ucy5tZC1kYXJrLm1kLWluYWN0aXZlIHsgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNik7IH1cclxuXHJcbi8qIFJ1bGVzIGZvciB1c2luZyBpY29ucyBhcyB3aGl0ZSBvbiBhIGRhcmsgYmFja2dyb3VuZC4gKi9cclxuLm1hdGVyaWFsLWljb25zLm1kLWxpZ2h0IHsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7IH1cclxuLm1hdGVyaWFsLWljb25zLm1kLWxpZ2h0Lm1kLWluYWN0aXZlIHsgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTsgfVxyXG5cclxuLyogQ29udHJvbGxlciBCdXR0b24gKi9cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy5jb250cm9sbGVyLWJ1dHRvbiB7XHJcbn1cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy5jb250cm9sbGVyLWJ1dHRvbjpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMjAsMjIwLDIyMCwwLjEpO1xyXG4gIGJveC1zaGFkb3c6MnB4IDRweCA4cHggMHB4IGdyZXk7XHJcbiAgY3Vyc29yOnBvaW50ZXI7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbn1cclxuXHJcbi8qIE1vZGFsICovXHJcbi5hdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MubW9kYWwtZmlsdGVye1xyXG4gIHBvc2l0aW9uICAgICAgICA6IGZpeGVkO1xyXG4gIHRvcCAgICAgICAgICAgICA6IDA7XHJcbiAgbGVmdCAgICAgICAgICAgIDogMDtcclxuICB3aWR0aCAgICAgICAgICAgOiAxMDAlO1xyXG4gIGhlaWdodCAgICAgICAgICA6IDEwMCU7XHJcbiAgcGFkZGluZy10b3AgICAgICA6IDUwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvciA6IHJnYmEoMCwwLDAsMC41KTtcclxufVxyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLm1vZGFsLWNvbnRlbnR7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHRvcCA6NTAlO1xyXG4gIGxlZnQ6IDUwJTtcclxuICB6LWluZGV4OjEwNTA7XHJcbiAgb3ZlcmZsb3c6YXV0bztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1xyXG4gIGJveC1zaGFkb3c6MCAzcHggOHB4IDNweCByZ2JhKDAsMCwwLDAuMyk7XHJcbiAgd2lkdGggOiA4NTBweDtcclxuICBoZWlnaHQgOiA2MDBweDtcclxuICBtYXgtaGVpZ2h0IDogNjAwcHg7XHJcbiAgbWFyZ2luIDogLTMwMHB4IDAgMCAtNDI1cHg7XHJcbiAgcGFkZGluZzogMjVweDtcclxufVxyXG5cclxuLyogQ2hlY2sgQm94ICovXHJcbi5tYXRlcmlhbC1pY29ucy5tZC1jaGVja2VkIHsgY29sb3IgOiByZ2JhKDAsIDEyMiwgMjAsIDAuOSk7IH1cclxuXHJcbi8qIFJlbG9hZGluZyBPbiBPZmYqL1xyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLnJlbG9hZGluZy1lbmFibGVkICB7IGNvbG9yOiByZ2IoMjMwLCAxMjgsIDYzKTsgfVxyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLnJlbG9hZGluZy1kaXNhYmxlZCB7IGNvbG9yOiBncmV5OyB9XHJcblxyXG4vKiBTb3J0aW5nIE9uIE9mZiovXHJcbi5hdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3Muc29ydGluZy1lbmFibGVkICB7IGNvbG9yOiByZ2IoMjMwLCAxMjgsIDYzKTsgfVxyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLnNvcnRpbmctZGlzYWJsZWQgeyBjb2xvcjogZ3JleTsgfVxyXG5cclxuLyogRmlsdGVyIE9uIE9mZiovXHJcbi5hdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MuZmlsdGVyaW5nLWVuYWJsZWQgIHsgY29sb3I6IHJnYigyMzAsIDEyOCwgNjMpOyB9XHJcbi5hdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MuZmlsdGVyaW5nLWRpc2FibGVkIHsgY29sb3I6IGdyZXk7IH1cclxuXHJcbi8qIFNldHRpbmdzIEl0ZW0gKi9cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy5zZXR0aW5ncy1pdGVtIHtcclxuICBwYWRkaW5nOiA0cHg7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbi8qIFN0YW5kaW5ncyB0YWJsZSAqL1xyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLnRpbWVzdGFtcCB7IGNvbG9yOmdyZXk7IGRpc3BsYXk6IGJsb2NrOyB9XHJcblxyXG4vKiBPdGhlciAqL1xyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLmN1cnNvci1saW5rOmhvdmVye1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxufVxyXG5cclxuLyogU3RhbmRpbmdzIHBvcCBkb3duIG1lbnUgKi9cclxuLmF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncy51c2VyLWRyb3Bkb3duLW1lbnUtYm94IHtcclxuICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICBwYWRkaW5nLXRvcDo4cHg7IFxyXG4gIHBhZGRpbmctYm90dG9tOjhweDsgXHJcbiAgYmFja2dyb3VuZC1jb2xvcjp3aGl0ZTsgXHJcbiAgYm94LXNoYWRvdzo0cHggNHB4IDhweCA0cHggZ3JleTsgXHJcbiAgYm9yZGVyLXJhZGl1czowcHggMHB4IDZweCAwcHg7XHJcbiAgY3Vyc29yOiBhdXRvO1xyXG59XHJcbi5hdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MudXNlci1kcm9wZG93bi1tZW51IHtcclxuICBkaXNwbGF5IDogYmxvY2s7XHJcbiAgbGluZS1oZWlnaHQ6IDJlbTtcclxuICBwYWRkaW5nLWxlZnQgOiA4cHg7XHJcbiAgcGFkZGluZy1yaWdodCA6IDhweDtcclxufVxyXG4uYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzLnVzZXItZHJvcGRvd24tbWVudTpob3ZlciB7XHJcbiAgYmFja2dyb3VuZCA6IGxpZ2h0Ymx1ZTtcclxufVxyXG5cclxuLyogbW9kaWZ5IG9yaWdpbmFsICovXHJcbmEudXNlci1yZWQge1xyXG4gIGNvbG9yOiNGRjAwMDA7XHJcbn1cclxuXHJcbi5zdGFuZGluZ3MtZnJpZW5kIHRkIHtiYWNrZ3JvdW5kLWNvbG9yIDogcmdiYSgwLCAxNTAsIDEwMCwgMC4wOSkgIWltcG9ydGFudDt9XHJcbi5zdGFuZGluZ3MtZnJpZW5kOmhvdmVyIHRkIHtiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDIwMCwgMTUwLCAwLjA5KSAhaW1wb3J0YW50O31cclxuXHJcbi5zdGFuZGluZ3MtZnJpZW5kID4gdGQuc3RhbmRpbmdzLWZyb3plbiB7YmFja2dyb3VuZC1jb2xvciA6IHJnYmEoMCwgODIsIDI1NSwgMC4yNykgIWltcG9ydGFudDt9XHJcbi5zdGFuZGluZ3MtZnJpZW5kID4gdGQuc3RhbmRpbmdzLWZyb3plbjpob3ZlciB7YmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCA4MiwgMjU1LCAwLjI3KSAhaW1wb3J0YW50O31cclxuXHJcblxyXG4udGFibGUtc3RyaXBlZCB0Ym9keSB0cjpudGgtY2hpbGQob2RkKSB0ZCwgLnRhYmxlLXN0cmlwZWQgdGJvZHkgdHI6bnRoLWNoaWxkKG9kZCkgdGgge2JhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7fVxyXG4udGFibGUgdGJvZHkgdHI6aG92ZXIgdGQsIC50YWJsZSB0Ym9keSB0cjpob3ZlciB0aCB7YmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTt9XHJcblxyXG50ZC5zdGFuZGluZ3MtdXNlcm5hbWU6aG92ZXIge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxufVxyXG5cclxuLnRhYmxlLXNvcnQgdGh7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ucGFnaW5hdGlvbiAubWUgYSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTIsIDAsIDAsIDAuMDkpO1xyXG4gIGNvbG9yIDogcmdiKDExNCwwLDApO1xyXG59XHJcblxyXG4ucGFnaW5hdGlvbiAuYWN0aXZlLW1lIGEge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcbiAgY29sb3IgOiByZ2IoMjAwLDAsMCk7XHJcbn1cclxuICBgO1xyXG5cclxuICAkKCdoZWFkJykuYXBwZW5kKGA8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+JHtjc3N9PC9zdHlsZT5gKTtcclxufSIsImltcG9ydCB7Y291bnRyaWVzLCByYXRpbmd9IGZyb20gJy4vdXRpbC5qcyc7XHJcbmltcG9ydCBBcHBTZXR0aW5ncyBmcm9tICcuL2FwcFNldHRpbmdzLmpzJztcclxuXHJcbmNsYXNzIEZpbHRlckNvbnRlbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICB0aGlzLmJ5RnJpZW5kc0xpc3QuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuYnlDb3VudHJ5LmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmJ5UmF0aW5nLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmJ5TmFtZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSggb3B0aW9uICl7XHJcbiAgICBsZXQgbmV3U2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKG5ldyBBcHBTZXR0aW5ncygpLCB0aGlzLnByb3BzLnNldHRpbmdzKTtcclxuICAgIGZvcihsZXQgcGFyYW0gaW4gb3B0aW9uKXtcclxuICAgICAgbmV3U2V0dGluZ3NbcGFyYW1dID0gb3B0aW9uW3BhcmFtXTtcclxuICAgIH1cclxuICAgIHRoaXMucHJvcHMuc2V0dGluZ3NVcGRhdGVGdW5jKCBuZXdTZXR0aW5ncyApO1xyXG4gIH1cclxuXHJcbiAgYnlGcmllbmRzTGlzdCgpe1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJ0YWJsZS1yb3dcIn19XHJcbiAgICAgICAgICAgY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGN1cnNvci1saW5rICR7dGhpcy5wcm9wcy5zZXR0aW5ncy5maWx0ZXJCeUZyaWVuZHMgPyBcImZpbHRlcmluZy1lbmFibGVkXCIgOiBcImZpbHRlcmluZy1kaXNhYmxlZFwifWB9XHJcbiAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy51cGRhdGUoIHtcImZpbHRlckJ5RnJpZW5kc1wiOiAhdGhpcy5wcm9wcy5zZXR0aW5ncy5maWx0ZXJCeUZyaWVuZHN9ICl9PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwidGFibGUtY2VsbFwifX0+XHJcbiAgICAgICAgICBGcmllbmRzXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGJ5Q291bnRyeSgpe1xyXG4gICAgY29uc3QgZm9ybSA9IHRoaXMucHJvcHMuZ2V0QWN0aXZlQ291bnRyaWVzKCkubWFwKCAoY291bnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCB2YWwgPSBjb3VudHJpZXNbY291bnRyeV07XHJcbiAgICAgIHJldHVybiAoPG9wdGlvbiB2YWx1ZT17Y291bnRyeX0ga2V5PXtgY291bnRyeS1maWx0ZXItb3B0aW9uLSR7Y291bnRyeX1gfT57dmFsfTwvb3B0aW9uPik7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwidGFibGUtcm93XCJ9fT5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlLWNlbGxcIn19XHJcbiAgICAgICAgICAgICBjbGFzc05hbWU9e2BhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgY3Vyc29yLWxpbmsgJHt0aGlzLnByb3BzLnNldHRpbmdzLmZpbHRlckJ5Q291bnRyeSA/IFwiZmlsdGVyaW5nLWVuYWJsZWRcIiA6IFwiZmlsdGVyaW5nLWRpc2FibGVkXCJ9YH1cclxuICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeUNvdW50cnlcIjogIXRoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyQnlDb3VudHJ5fSApfVxyXG4gICAgICAgICAgICAgPlxyXG4gICAgICAgICAgQ291bnRyeVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwidGFibGUtY2VsbFwiLCBwYWRkaW5nTGVmdDpcIjEwcHhcIn19PlxyXG4gICAgICAgICAgPHNlbGVjdCBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyQ291bnRyeX1cclxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7dGhpcy51cGRhdGUoIHtcImZpbHRlckJ5Q291bnRyeVwiOnRydWUsIFwiZmlsdGVyQ291bnRyeVwiOiBlLnRhcmdldC52YWx1ZX0gKX0gfT5cclxuICAgICAgICAgICAge2Zvcm19XHJcbiAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYnlSYXRpbmcoKXtcclxuICAgIGxldCBidXR0b25zID0gcmF0aW5nLmxiLm1hcCggKGxiLCBpZHgpID0+IHtcclxuICAgICAgaWYoaWR4ID09PSAwKSByZXR1cm4gXCJcIjtcclxuICAgICAgaWYoIHRoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyUmF0aW5nLmhhcyhpZHgpID09PSB0cnVlICl7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxhIGhyZWY9XCIjXCIgc3R5bGU9e3tjb2xvciA6IHJhdGluZy5jb2xvcltpZHhdfX0gb25DbGljaz17ICgpPT57XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBuZXcgU2V0KCB0aGlzLnByb3BzLnNldHRpbmdzLmZpbHRlclJhdGluZyApO1xyXG4gICAgICAgICAgICBvYmouZGVsZXRlKCBpZHggKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoIHtcImZpbHRlckJ5UmF0aW5nXCI6dHJ1ZSwgXCJmaWx0ZXJSYXRpbmdcIjogb2JqfSApO1xyXG4gICAgICAgICAgfX0gdGl0bGU9e2Ake2xifSAtIGB9IGtleT17YHJhdGluZy1maWx0ZXItcmF0aW5nLSR7bGJ9YH0+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zIG1kLTI0XCIgc3R5bGU9e3tjb2xvciA6IHJhdGluZy5jb2xvcltpZHhdfX0+Y2hlY2tfYm94PC9pPlxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgICk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiIHN0eWxlPXt7Y29sb3IgOiByYXRpbmcuY29sb3JbaWR4XX19IG9uQ2xpY2s9eyAoKT0+e1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gbmV3IFNldCggdGhpcy5wcm9wcy5zZXR0aW5ncy5maWx0ZXJSYXRpbmcgKTtcclxuICAgICAgICAgICAgb2JqLmFkZCggaWR4ICk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeVJhdGluZ1wiOnRydWUsIFwiZmlsdGVyUmF0aW5nXCI6IG9ian0gKTtcclxuICAgICAgICAgIH19IHRpdGxlPXtgJHtsYn0gLSBgfSBrZXk9e2ByYXRpbmctZmlsdGVyLXJhdGluZy0ke2xifWB9PlxyXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29ucyBtZC0yNFwiIHN0eWxlPXt7Y29sb3IgOiByYXRpbmcuY29sb3JbaWR4XX19PmNoZWNrX2JveF9vdXRsaW5lX2JsYW5rPC9pPlxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCB0b29sID0gKCgpPT57XHJcbiAgICAgIHJldHVybihcclxuICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGZpbHRlcmluZy1kaXNhYmxlZFwiIG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBuZXcgU2V0KFsxLDIsMyw0XSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCB7XCJmaWx0ZXJCeVJhdGluZ1wiOnRydWUsIFwiZmlsdGVyUmF0aW5nXCI6IG9ian0gKTtcclxuICAgICAgICAgIH19IHRpdGxlPVwiMC0xMTk5XCI+e1wiQUJDXCJ9PC9hPlxyXG4gICAgICAgICAgPHNwYW4+IDwvc3Bhbj5cclxuICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGZpbHRlcmluZy1kaXNhYmxlZFwiIG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgIGxldCBvYmogPSBuZXcgU2V0KFsxLDIsMyw0LDUsNiw3LDhdKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoIHtcImZpbHRlckJ5UmF0aW5nXCI6dHJ1ZSwgXCJmaWx0ZXJSYXRpbmdcIjogb2JqfSApO1xyXG4gICAgICAgICAgfX0gdGl0bGU9XCIwLTI3OTlcIj57XCJBUkNcIn08L2E+XHJcbiAgICAgICAgICA8c3Bhbj4gPC9zcGFuPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgZmlsdGVyaW5nLWRpc2FibGVkXCIgb25DbGljaz17KCk9PntcclxuICAgICAgICAgICAgbGV0IG9iaiA9IG5ldyBTZXQoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoIHtcImZpbHRlckJ5UmF0aW5nXCI6dHJ1ZSwgXCJmaWx0ZXJSYXRpbmdcIjogb2JqfSApO1xyXG4gICAgICAgICAgfX0+e1wiTm9uZVwifTwvYT5cclxuICAgICAgICAgIDxzcGFuPiA8L3NwYW4+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBmaWx0ZXJpbmctZGlzYWJsZWRcIiBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICBsZXQgb2JqID0gbmV3IFNldChbMSwyLDMsNCw1LDYsNyw4LDldKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoIHtcImZpbHRlckJ5UmF0aW5nXCI6dHJ1ZSwgXCJmaWx0ZXJSYXRpbmdcIjogb2JqfSApO1xyXG4gICAgICAgICAgfX0+e1wiQWxsXCJ9PC9hPlxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgKTtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJ0YWJsZS1yb3dcIn19PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwidGFibGUtY2VsbFwifX1cclxuICAgICAgICAgICAgIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBjdXJzb3ItbGluayAke3RoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyQnlSYXRpbmcgPyBcImZpbHRlcmluZy1lbmFibGVkXCIgOiBcImZpbHRlcmluZy1kaXNhYmxlZFwifWB9XHJcbiAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZSgge1wiZmlsdGVyQnlSYXRpbmdcIjogIXRoaXMucHJvcHMuc2V0dGluZ3MuZmlsdGVyQnlSYXRpbmd9ICl9XHJcbiAgICAgICAgICAgICA+XHJcbiAgICAgICAgICBSYXRpbmdcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlLWNlbGxcIiwgcGFkZGluZ0xlZnQ6XCIxMHB4XCJ9fT5cclxuICAgICAgICAgIDxwPntidXR0b25zfTwvcD5cclxuICAgICAgICAgIDxwPnt0b29sfTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYnlOYW1lKCl7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlLXJvd1wifX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJ0YWJsZS1jZWxsXCJ9fVxyXG4gICAgICAgICAgICAgY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGN1cnNvci1saW5rICR7dGhpcy5wcm9wcy5zZXR0aW5ncy5maWx0ZXJCeU5hbWUgPyBcImZpbHRlcmluZy1lbmFibGVkXCIgOiBcImZpbHRlcmluZy1kaXNhYmxlZFwifWB9XHJcbiAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnVwZGF0ZSgge1wiZmlsdGVyQnlOYW1lXCI6ICF0aGlzLnByb3BzLnNldHRpbmdzLmZpbHRlckJ5TmFtZX0gKX1cclxuICAgICAgICAgICAgID5cclxuICAgICAgICAgIE5hbWVcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlLWNlbGxcIiwgcGFkZGluZ0xlZnQ6XCIxMHB4XCJ9fT5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5zZXR0aW5ncy5maWx0ZXJOYW1lfSBvbkNoYW5nZT17KGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoIHtcImZpbHRlck5hbWVcIjogZS50YXJnZXQudmFsdWUsIFwiZmlsdGVyQnlOYW1lXCI6IHRydWV9IClcclxuICAgICAgICAgIH0gfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IGJ5RnJpZW5kID0gdGhpcy5ieUZyaWVuZHNMaXN0KCk7XHJcbiAgICBjb25zdCBieVJhdGluZyA9IHRoaXMuYnlDb3VudHJ5KCk7XHJcbiAgICBjb25zdCBieUNvdW50cnkgPSB0aGlzLmJ5UmF0aW5nKCk7XHJcbiAgICBjb25zdCBieU5hbWUgPSB0aGlzLmJ5TmFtZSgpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjpcImFic29sdXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzpcIjIwcHhcIixcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6XCJ3aGl0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzpcIjRweCA0cHggOHB4IDRweCBncmV5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOlwiNnB4IDZweCA2cHggNnB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBgJHt0aGlzLnByb3BzLnBvc1kgKyA0MH1weGAsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDpgJHt0aGlzLnByb3BzLnBvc1h9cHhgLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjpcImF1dG9cIlxyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgIG9uQ2xpY2s9eyhlKT0+ZS5zdG9wUHJvcGFnYXRpb24oKX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJ0YWJsZVwiLCBsaW5lSGVpZ2h0OlwiMi41ZW1cIn19PlxyXG4gICAgICAgICAge2J5RnJpZW5kfVxyXG4gICAgICAgICAge2J5UmF0aW5nfVxyXG4gICAgICAgICAge2J5Q291bnRyeX1cclxuICAgICAgICAgIHtieU5hbWV9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBzaG93IDogZmFsc2UsXHJcbiAgICAgIHBvc1ggOiAwLFxyXG4gICAgICBwb3NZIDogMFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgY29uc3QgYnV0dG9uID0gKFxyXG4gICAgICA8YSBocmVmPVwiI1wiXHJcbiAgICAgICAgIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyAkeyB0aGlzLnByb3BzLnNldHRpbmdzLmlzRmlsdGVyc0VuYWJsZWQoKSA/IFwiZmlsdGVyaW5nLWVuYWJsZWRcIiA6IFwiZmlsdGVyaW5nLWRpc2FibGVkXCJ9YH0+XHJcbiAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5maWx0ZXJfbGlzdDwvaT5cclxuICAgICAgICBGaWx0ZXIgXHJcbiAgICAgIDwvYT5cclxuICAgICk7XHJcblxyXG4gICAgaWYoIHRoaXMuc3RhdGUuc2hvdyA9PT0gZmFsc2UgKXtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBjb250cm9sbGVyLWJ1dHRvblwiPlxyXG4gICAgICAgICAgPGRpdiBvbkNsaWNrPXsgKGUpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlY3QgPSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgge3Nob3cgOiAhdGhpcy5zdGF0ZS5zaG93LCBwb3NYOnJlY3QubGVmdCwgcG9zWTpyZWN0LnRvcCB9KSA7XHJcbiAgICAgICAgICB9IH0+e2J1dHRvbn08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4oXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgY29udHJvbGxlci1idXR0b25cIj5cclxuICAgICAgICAgIDxkaXYgb25DbGljaz17IChlKSA9PiB0aGlzLnNldFN0YXRlKCB7c2hvdyA6ICF0aGlzLnN0YXRlLnNob3cgfSkgfT57YnV0dG9ufTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17e3Bvc2l0aW9uOlwiZml4ZWRcIiwgbGVmdDowLCB0b3A6MCwgd2lkdGg6XCIxMDAlXCIsIGhlaWdodDpcIjEwMCVcIn19XHJcbiAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKT0+dGhpcy5zZXRTdGF0ZSh7c2hvdzpmYWxzZX0pfT5cclxuICAgICAgICAgICAgPEZpbHRlckNvbnRlbnQgc2V0dGluZ3M9e3RoaXMucHJvcHMuc2V0dGluZ3N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzVXBkYXRlRnVuYz17dGhpcy5wcm9wcy5zZXR0aW5nc1VwZGF0ZUZ1bmN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEFjdGl2ZUNvdW50cmllcz17dGhpcy5wcm9wcy5nZXRBY3RpdmVDb3VudHJpZXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc1g9e3RoaXMuc3RhdGUucG9zWH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zWT17dGhpcy5zdGF0ZS5wb3NZfS8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGcmllbmRzTGlzdHtcclxuICBjb25zdHJ1Y3RvciggbG9hZCApe1xyXG4gICAgdGhpcy5mcmllbmRzID0gbmV3IFNldCgpO1xyXG4gICAgaWYobG9hZCA9PT0gdHJ1ZSkgdGhpcy5sb2FkKCk7XHJcblxyXG4gICAgLy90aGlzLmFkZChcImNhbXlwYXBlclwiKTtcclxuICB9XHJcblxyXG4gIGxvYWQoKXtcclxuICAgIC8vbG9hZFxyXG4gICAgLy9mcmllbmQgbGlzdCBvYmplY3QgKG9sZCB2ZXJzaW9uKVxyXG4gICAgbGV0IGZyaWVuZHNPbGQgPSBKU09OLnBhcnNlKCBHTV9nZXRWYWx1ZSgnR01fZnJpZW5kX2xpc3QnLCAnbnVsbCcpICk7XHJcbiAgICBpZihmcmllbmRzT2xkICE9PSBudWxsKXtcclxuICAgICAgdGhpcy5mcmllbmRzID0gbmV3IFNldCggT2JqZWN0LmtleXMoZnJpZW5kc09sZCkgKTtcclxuICAgICAgR01fZGVsZXRlVmFsdWUoICdHTV9mcmllbmRfbGlzdCcgKTtcclxuICAgICAgdGhpcy5zYXZlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vZnJpZW5kIGxpc3QgYXJyYXkgKG5ldyB2ZXJzaW9uKVxyXG4gICAgdGhpcy5mcmllbmRzID0gbmV3IFNldChKU09OLnBhcnNlKCBHTV9nZXRWYWx1ZSgnZnJpZW5kc0xpc3QnLCAnW10nKSApKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcImxvYWRlZCA6IGZyaWVuZHMgbGlzdFwiKTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZnJpZW5kcyk7XHJcbiAgfVxyXG5cclxuICBzYXZlKCl7XHJcbiAgICBsZXQgc3RyID0gSlNPTi5zdHJpbmdpZnkoWy4uLnRoaXMuZnJpZW5kc10pO1xyXG4gICAgLy9zYXZlXHJcbiAgICBHTV9zZXRWYWx1ZSgnZnJpZW5kc0xpc3QnLCBzdHIpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwic2F2ZWQgOiBmcmllbmRzIGxpc3RcIik7XHJcbiAgICBjb25zb2xlLmxvZyhzdHIpO1xyXG4gIH1cclxuXHJcbiAgLy9bbmFtZXMuLi5dXHJcbiAgYWRkKGhhbmRsZSl7XHJcbiAgICBoYW5kbGUuZm9yRWFjaCggKG5hbWUpID0+IHRoaXMuZnJpZW5kcy5hZGQobmFtZSkgKTtcclxuICAgIHRoaXMuc2F2ZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKGhhbmRsZSl7XHJcbiAgICBoYW5kbGUuZm9yRWFjaCggKG5hbWUpID0+IHRoaXMuZnJpZW5kcy5kZWxldGUobmFtZSkgKTtcclxuICAgIHRoaXMuc2F2ZSgpO1xyXG4gIH1cclxuXHJcblxyXG4gIGlzRnJpZW5kKGhhbmRsZSl7XHJcbiAgICByZXR1cm4gdGhpcy5mcmllbmRzLmhhcyggaGFuZGxlICk7XHJcbiAgfVxyXG5cclxuICBnZXRMaXN0KCl7XHJcbiAgICByZXR1cm4gWy4uLnRoaXMuZnJpZW5kc107XHJcbiAgfVxyXG59IiwiLy9pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG4vL2ltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgQXRDb2RlckN1dG9tU3RhbmRpbmdzIGZyb20gJy4vYXBwLmpzJ1xyXG5pbXBvcnQgaW5qZWN0Q3VzdG9tQ1NTIGZyb20gJy4vY3NzLmpzJ1xyXG5cclxuJCgnZGl2LnRhYmxlLXJlc3BvbnNpdmUnKS5oaWRlKCk7XHJcbiQoJyNwYWdpbmF0aW9uLXN0YW5kaW5ncycpLmhpZGUoKTtcclxuJCgnI3N0YW5kaW5ncy1jc3YtbGluaycpLmFmdGVyKCc8ZGl2IGlkPVwiY29udGVudFwiPjwvZGl2PicpO1xyXG4vLyQoJ2hlYWQnKS5hcHBlbmQoJzxsaW5rIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zXCIgcmVsPVwic3R5bGVzaGVldFwiPicpO1xyXG5pbmplY3RDdXN0b21DU1MoKTtcclxuXHJcbnRyeXtcclxuICBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8QXRDb2RlckN1dG9tU3RhbmRpbmdzIC8+LFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxyXG4gICk7XHJcbn1jYXRjaChlKXtcclxuICBjb25zb2xlLmxvZyggXCJzb21lIGVycm9yIG9jY3VycmVkXCIgKTtcclxuICBjb25zb2xlLmxvZyggZSApO1xyXG4gICQoJ2Rpdi50YWJsZS1yZXNwb25zaXZlJykuc2hvdygpO1xyXG4gICQoJyNwYWdpbmF0aW9uLXN0YW5kaW5ncycpLnNob3coKTtcclxufVxyXG4iLCJjbGFzcyBNb2RhbFdpbmRvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IGhlYWQgPSAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwiZ3JpZFwiLCBncmlkVGVtcGxhdGVSb3dzOlwiMWZyXCIsIGdyaWRUZW1wbGF0ZUNvbHVtbnM6XCIxZnIgYXV0b1wifX0+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIxLzJcIiwgZ3JpZENvbHVtbjpcIjEvMlwifX0+PGgzPnt0aGlzLnByb3BzLnRpdGxlfTwvaDM+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIxLzJcIiwgZ3JpZENvbHVtbjpcIjIvM1wifX0gb25DbGljaz17dGhpcy5wcm9wcy5jbG9zZUZ1bmN9PjxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+Y2xlYXI8L2k+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIHtoZWFkfVxyXG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtzaG93OiBmYWxzZX07XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGxldCBidXR0b24gPSAoXHJcbiAgICAgIDxkaXYgb25DbGljaz17ICgpID0+IHt0aGlzLnNldFN0YXRlKCB7c2hvdzogdHJ1ZX0gKTsgfSB9XHJcbiAgICAgICAgICAgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGNvbnRyb2xsZXItYnV0dG9uXCI+XHJcbiAgICAgICAge3RoaXMucHJvcHMuYnV0dG9ufVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcblxyXG4gICAgaWYoIHRoaXMuc3RhdGUuc2hvdyA9PT0gdHJ1ZSApe1xyXG4gICAgICByZXR1cm4oXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIHtidXR0b259XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBtb2RhbC1maWx0ZXJcIiBvbkNsaWNrPXsgKCk9PnsgdGhpcy5zZXRTdGF0ZSh7IHNob3c6IGZhbHNlfSkgfSB9PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBtb2RhbC1jb250ZW50XCIgb25DbGljaz17IChlKSA9PiB7ZS5zdG9wUHJvcGFnYXRpb24oKTsgcmV0dXJuIGZhbHNlO30gfT5cclxuICAgICAgICAgICAgICA8TW9kYWxXaW5kb3cgY2xvc2VGdW5jPXsgKCk9PnsgdGhpcy5zZXRTdGF0ZSh7IHNob3c6IGZhbHNlfSkgfSB9IHRpdGxlPXt0aGlzLnByb3BzLnRpdGxlfT5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgIDwvTW9kYWxXaW5kb3c+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICB7YnV0dG9ufVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJjbGFzcyBQYWdlQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcyApe1xyXG4gICAgaWYoIHRoaXMucHJvcHMuY3VycmVudCAhPT0gbmV4dFByb3BzLmN1cnJlbnQgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKCB0aGlzLnByb3BzLm1lICE9PSBuZXh0UHJvcHMubWUgKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgY29uc3QgcCA9IHRoaXMucHJvcHMucGFnZTtcclxuXHJcbiAgICBpZiggdGhpcy5wcm9wcy5jdXJyZW50ID09PSBwICl7XHJcbiAgICAgIHJldHVybiAoPGxpIGNsYXNzTmFtZT17YGxpLXBhZ2luYXRpb24gYWN0aXZlICR7dGhpcy5wcm9wcy5tZSA9PT0gdHJ1ZSA/IFwiYWN0aXZlLW1lXCI6XCJcIn1gfT48YT57cCArIDF9PC9hPjwvbGk+KTtcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gKDxsaSBjbGFzc05hbWU9e2BsaS1wYWdpbmF0aW9uICR7dGhpcy5wcm9wcy5tZSA9PT0gdHJ1ZSA/IFwibWVcIjpcIlwifWB9ID48YSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2tGdW5jfSBkYXRhLXBhZ2U9e3B9IGhyZWY9XCIjXCI+e3AgKyAxfTwvYT48L2xpPik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgLyoqXHJcbiAgKiBAcGFyYW0ge251bWJlcn0gY3VycmVudCBjdXJyZW50IHBhZ2UgKDAtaW5kZXhlZClcclxuICAqIEBwYXJhbSB7bnVtYmVyfSB0b3RhbCAgIHRvdGFsIHBhZ2VcclxuICAqIEBwYXJhbSB7bnVtYmVyfSBtZSAgICAgIHBhZ2Ugd2hlcmUgaSBhbVxyXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gb25DbGlja0Z1bmMgXHJcbiAgKi9cclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcyApe1xyXG4gICAgaWYoIHRoaXMucHJvcHMuY3VycmVudCAhPT0gbmV4dFByb3BzLmN1cnJlbnQgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKCB0aGlzLnByb3BzLnRvdGFsICE9PSBuZXh0UHJvcHMudG90YWwgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKCB0aGlzLnByb3BzLm1lICE9PSBuZXh0UHJvcHMubWUgKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IHNob3dpbmdQYWdlcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgZm9yKGxldCBwYWdlPTA7IHBhZ2U8dGhpcy5wcm9wcy50b3RhbDsgcGFnZSsrKXtcclxuICAgICAgaWYocGFnZSA9PT0gMCB8fCBwYWdlID09PSB0aGlzLnByb3BzLnRvdGFsLTEgfHwgcGFnZT09PXRoaXMucHJvcHMubWUgfHwgTWF0aC5hYnModGhpcy5wcm9wcy5jdXJyZW50IC0gcGFnZSkgPD0gNSApe1xyXG4gICAgICAgIHNob3dpbmdQYWdlcy5wdXNoKHBhZ2UpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgbGV0IGJsYW5rQ291bnQgPSAwO1xyXG4gICAgZm9yKGxldCBpPTA7IGk8c2hvd2luZ1BhZ2VzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgaWYoaSA+IDAgJiYgc2hvd2luZ1BhZ2VzW2ldIC0gc2hvd2luZ1BhZ2VzW2ktMV0gPiAxKXtcclxuICAgICAgICBpZiggc2hvd2luZ1BhZ2VzW2ldIC0gc2hvd2luZ1BhZ2VzW2ktMV0gPT09IDIgKXtcclxuICAgICAgICAgIHJlcy5wdXNoKCA8UGFnZUJ1dHRvbiBjdXJyZW50PXt0aGlzLnByb3BzLmN1cnJlbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZT17c2hvd2luZ1BhZ2VzW2ldLTF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtzaG93aW5nUGFnZXNbaV0tMX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrRnVuYz17dGhpcy5wcm9wcy5vbkNsaWNrRnVuY31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZT17c2hvd2luZ1BhZ2VzW2ldLTE9PT10aGlzLnByb3BzLm1lfSAvPiApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgcmVzLnB1c2goIDxsaSBjbGFzc05hbWU9XCJsaS1wYWdpbmF0aW9uIGRpc2FibGVkXCIga2V5PXtgcGFnZS1ibGFuay0ke2JsYW5rQ291bnQrK31gfT48YT57XCIuLi5cIn08L2E+PC9saT4gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmVzLnB1c2goIDxQYWdlQnV0dG9uIGN1cnJlbnQ9e3RoaXMucHJvcHMuY3VycmVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U9e3Nob3dpbmdQYWdlc1tpXX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17c2hvd2luZ1BhZ2VzW2ldfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGlja0Z1bmM9e3RoaXMucHJvcHMub25DbGlja0Z1bmN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZT17c2hvd2luZ1BhZ2VzW2ldPT09dGhpcy5wcm9wcy5tZX0gLz4gKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwicGFnaW5hdGlvbiBwYWdpbmF0aW9uLWNlbnRlcmVkXCI+PHVsPntyZXN9PC91bD48L2Rpdj4pO1xyXG4gIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbG9hZGluZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHsgYXV0b1VwZGF0ZTpmYWxzZSB9O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICByZXR1cm4gKDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwiZ3JpZFwiLCBncmlkVGVtcGxhdGVSb3dzOlwiMWZyXCIsIGdyaWRUZW1wbGF0ZUNvbHVtbnM6XCJhdXRvIGF1dG9cIn19PlxyXG4gICAgICA8ZGl2IHN0eWxlPXt7Z3JpZENvbHVtbjpcIjEvMlwifX0gY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGNvbnRyb2xsZXItYnV0dG9uXCJcclxuICAgICAgICAgICBvbkNsaWNrPXsgKGUpPT50aGlzLnByb3BzLnVwZGF0ZUZ1bmMoKSB9PlxyXG4gICAgICAgIDxhIGhyZWY9XCIjXCI+XHJcbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnJlZnJlc2g8L2k+VXBkYXRlXHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBzdHlsZT17e2dyaWRDb2x1bW46XCIyLzNcIn19IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBjb250cm9sbGVyLWJ1dHRvblwiXHJcbiAgICAgICAgICAgb25DbGljaz17IChlKT0+e1xyXG4gICAgICAgICAgICBpZighdGhpcy5zdGF0ZS5hdXRvVXBkYXRlKXtcclxuICAgICAgICAgICAgICB0aGlzLnRpbWVyUmVsb2FkaW5nID0gc2V0SW50ZXJ2YWwoIHRoaXMucHJvcHMudXBkYXRlRnVuYywgNjAqMTAwMCApO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcImNyZWF0ZSB0aW1lciBcIiwgdGhpcy50aW1lclJlbG9hZGluZyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoIHRoaXMudGltZXJSZWxvYWRpbmcgKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcImVyYXNlIHRpbWVyIFwiLCB0aGlzLnRpbWVyUmVsb2FkaW5nKTtcclxuICAgICAgICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgge2F1dG9VcGRhdGU6IXRoaXMuc3RhdGUuYXV0b1VwZGF0ZX0pXHJcbiAgICAgICAgICB9IH0+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzICR7dGhpcy5zdGF0ZS5hdXRvVXBkYXRlID8gXCJyZWxvYWRpbmctZW5hYmxlZFwiIDogXCJyZWxvYWRpbmctZGlzYWJsZWRcIn1gfT5cclxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+dXBkYXRlPC9pPkF1dG8gKDFtaW4pXHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2Pik7XHJcbiAgfVxyXG59IiwiaW1wb3J0IE1vZGFsIGZyb20gJy4vbW9kYWwuanMnXHJcbmltcG9ydCBBcHBTZXR0aW5ncyBmcm9tICcuL2FwcFNldHRpbmdzLmpzJ1xyXG5jbGFzcyBTZXR0aW5nc0NvbnRlbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy51cGRhdGUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZ2VuZXJhdGVGb3JtLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmdlbmVyYXRlRnJpZW5kc0xpc3RGb3JtLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoIG9wdGlvbiApe1xyXG4gICAgbGV0IG5ld1NldHRpbmdzID0gT2JqZWN0LmFzc2lnbihuZXcgQXBwU2V0dGluZ3MoKSwgdGhpcy5wcm9wcy5zZXR0aW5ncyk7XHJcbiAgICBmb3IobGV0IHBhcmFtIGluIG9wdGlvbil7XHJcbiAgICAgIG5ld1NldHRpbmdzW3BhcmFtXSA9IG9wdGlvbltwYXJhbV07XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyggb3B0aW9uICk7XHJcbiAgICB0aGlzLnByb3BzLnNldHRpbmdzVXBkYXRlRnVuYyggbmV3U2V0dGluZ3MgKTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlRm9ybSggb3B0aW9uTmFtZSwgbGFiZWwgKXtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHNldHRpbmdzLWl0ZW1cIj5cclxuICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICA8aW5wdXQgY2hlY2tlZD17dGhpcy5wcm9wcy5zZXR0aW5nc1tvcHRpb25OYW1lXX0gdHlwZT1cImNoZWNrYm94XCIgc3R5bGU9e3tkaXNwbGF5OlwiaW5saW5lXCJ9fVxyXG4gICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSk9PnsgdGhpcy51cGRhdGUoIHsgW29wdGlvbk5hbWVdIDogZS50YXJnZXQuY2hlY2tlZCB9ICkgfX0gLz5cclxuICAgICAgICAgIDxzcGFuPiB7bGFiZWx9PC9zcGFuPlxyXG4gICAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlRnJpZW5kc0xpc3RGb3JtKCl7XHJcbiAgICBjb25zdCBmcmllbmRzID0gdGhpcy5wcm9wcy5mcmllbmRzLmdldExpc3QoKS5tYXAoIChuYW1lKSA9PiB7XHJcbiAgICAgIHJldHVybiAoPG9wdGlvbiB2YWx1ZT17bmFtZX0ga2V5PXtuYW1lfT57bmFtZX08L29wdGlvbj4pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHNldHRpbmdzLWl0ZW1cIj5cclxuICAgICAgICA8cD5GcmllbmRzIExpc3Q8L3A+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3Mgc2V0dGluZ3MtaXRlbVwiPlxyXG4gICAgICAgICAgPGlucHV0IHJlZj1cImFkZEZyaWVuZEZvcm1cIiB0eXBlPVwidGV4dFwiIHN0eWxlPXt7ZGlzcGxheTpcImJsb2NrXCJ9fVxyXG4gICAgICAgICAgICAgICAgIG9uS2V5RG93bj17KGUpPT57XHJcbiAgICAgICAgICAgICAgICAgIGlmKCBlLmtleSAhPT0gJ0VudGVyJyApIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMucmVmcy5hZGRGcmllbmRGb3JtO1xyXG4gICAgICAgICAgICAgICAgICBpZiggZWxlbWVudC52YWx1ZSAhPT0gXCJcIiApIHRoaXMucHJvcHMuZnJpZW5kc1VwZGF0ZUZ1bmMoIGVsZW1lbnQudmFsdWUuc3BsaXQoXCIgXCIpLCB0cnVlICk7XHJcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgfX0vPlxyXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgc3R5bGU9e3tkaXNwbGF5OlwiYmxvY2tcIn19IG9uQ2xpY2s9eyAoKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5yZWZzLmFkZEZyaWVuZEZvcm07XHJcbiAgICAgICAgICAgIGlmKCBlbGVtZW50LnZhbHVlICE9PSBcIlwiICkgdGhpcy5wcm9wcy5mcmllbmRzVXBkYXRlRnVuYyggW2VsZW1lbnQudmFsdWVdLCB0cnVlICk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XHJcbiAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgQWRkIEZyaWVuZFxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3Mgc2V0dGluZ3MtaXRlbVwiPlxyXG4gICAgICAgICAgPHNlbGVjdCByZWY9XCJmcmllbmRzTGlzdEZvcm1cIiBtdWx0aXBsZSBzaXplPVwiMTBcIiBzdHlsZT17e2Rpc3BsYXk6XCJibG9ja1wifX0+XHJcbiAgICAgICAgICAgIHtmcmllbmRzfVxyXG4gICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBzdHlsZT17e2Rpc3BsYXk6XCJibG9ja1wifX0gb25DbGljaz17ICgpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSB0aGlzLnJlZnMuZnJpZW5kc0xpc3RGb3JtO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmZyaWVuZHNVcGRhdGVGdW5jKCBbLi4uZm9ybS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnb3B0aW9uJyldXHJcbiAgICAgICAgICAgICAgLmZpbHRlciggKGUpPT5lLnNlbGVjdGVkICkubWFwKChlKT0+ZS52YWx1ZSksIGZhbHNlICk7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcclxuICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICBSZW1vdmUgRnJpZW5kc1xyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgY29uc3QgcGFnZVNpemUgPSAoKCk9PntcclxuICAgICAgY29uc3QgbGlzdCA9IFsxMCwyMCw1MCwxMDAsMjAwLDMwMCw0MDAsNTAwLDEwMDAsNTAwMCwxMDAwMF0ubWFwKCAodmFsKT0+e1xyXG4gICAgICAgIHJldHVybiA8b3B0aW9uIHZhbHVlPXt2YWx9IGtleT17dmFsfT57dmFsfTwvb3B0aW9uPlxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyBzZXR0aW5ncy1pdGVtXCI+XHJcbiAgICAgICAgICA8c3Bhbj5QYWdlIFNpemUgPC9zcGFuPlxyXG4gICAgICAgICAgPHNlbGVjdCBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuc2V0dGluZ3MucGFnZVNpemV9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSk9PnsgdGhpcy51cGRhdGUoIHsgXCJwYWdlU2l6ZVwiIDogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKX0gKSB9fT5cclxuICAgICAgICAgICAge2xpc3R9XHJcbiAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgY29uc3QgZGlzcGxheU5hbWVTdHlsZSA9IChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3Mgc2V0dGluZ3MtaXRlbVwiPlxyXG4gICAgICAgIDxzcGFuPkRpc3BsYXkgTmFtZSBTdHlsZSA8L3NwYW4+XHJcbiAgICAgICAgPHNlbGVjdCBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMuc2V0dGluZ3MuZGlzcGxheU5hbWVTdHlsZX1cclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSk9PnsgdGhpcy51cGRhdGUoIHsgXCJkaXNwbGF5TmFtZVN0eWxlXCIgOiBlLnRhcmdldC52YWx1ZX0gKSB9fT5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ1c2VyX3NjcmVlbl9uYW1lXCI+VXNlciBJRDwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInVzZXJfbmFtZVwiPlVzZXIgTmFtZTwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInVzZXJfc2NyZWVuX25hbWVfdXNlcl9uYW1lXCI+VXNlciBJRCAvIFVzZXIgTmFtZTwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInVzZXJfbmFtZV91c2VyX3NjcmVlbl9uYW1lXCI+VXNlciBOYW1lIC8gVXNlciBJRDwvb3B0aW9uPlxyXG4gICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcblxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgc3R5bGU9e3twYWRkaW5nOlwiNXB4XCJ9fT5cclxuICAgICAgICB7cGFnZVNpemV9XHJcbiAgICAgICAge2Rpc3BsYXlOYW1lU3R5bGV9XHJcbiAgICAgICAge3RoaXMuZ2VuZXJhdGVGb3JtKCBcImRpc2FibGVSYXRpbmdDb2xvclwiLCBcIkRpc2FibGUgUmF0aW5nIENvbG9yXCIpfVxyXG4gICAgICAgIHt0aGlzLmdlbmVyYXRlRm9ybSggXCJoaWdobGlnaHRGcmllbmRzXCIsIFwiSGlnaGxpZ2h0IEZyaWVuZHNcIil9XHJcbiAgICAgICAge3RoaXMuZ2VuZXJhdGVGb3JtKCBcInNob3dOYXRpb25hbEZsYWdcIiwgXCJTaG93IE5hdGlvbmFsIEZsYWdcIil9XHJcbiAgICAgICAge3RoaXMuZ2VuZXJhdGVGb3JtKCBcInNhdmVGaWx0ZXJpbmdTdGF0ZVwiLCBcIlNhdmUgRmlsdGVyaW5nIFN0YXRlIChpZiB0aGlzIG9wdGlvbiBpcyBjaGVja2VkLCB5b3VyIGZpbHRlcmluZyBzdGF0ZSB3aWxsIGJlIHJlc3RvcmVkIHdoZW4geW91IG9wZW4gc3RhbmRpbmdzIHBhZ2UpXCIpfVxyXG4gICAgICAgIDxoci8+XHJcbiAgICAgICAge3RoaXMuZ2VuZXJhdGVGcmllbmRzTGlzdEZvcm0oKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcblxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzICl7XHJcbiAgICBpZiggSlNPTi5zdHJpbmdpZnkoIE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuc2V0dGluZ3MpICkgIT09IEpTT04uc3RyaW5naWZ5KCBPYmplY3QuYXNzaWduKHt9LCBuZXh0UHJvcHMuc2V0dGluZ3MpICkpIHJldHVybiB0cnVlO1xyXG4gICAgLy8gaWYoIEpTT04uc3RyaW5naWZ5KCB0aGlzLnByb3BzLmZyaWVuZHMuZ2V0TGlzdCgpICkgIT09IEpTT04uc3RyaW5naWZ5KCBuZXh0UHJvcHMuZnJpZW5kcy5nZXRMaXN0KCkgKSApIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGxldCBidXR0b24gPSAoXHJcbiAgICAgIDxhIGhyZWY9XCIjXCI+XHJcbiAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnMgbWQtZGFya1wiPnNldHRpbmdzPC9pPlxyXG4gICAgICAgIFNldHRpbmdzXHJcbiAgICAgIDwvYT5cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuKFxyXG4gICAgICA8TW9kYWwgYnV0dG9uPXtidXR0b259IHRpdGxlPVwiU2V0dGluZ3NcIj5cclxuICAgICAgICA8U2V0dGluZ3NDb250ZW50XHJcbiAgICAgICAgICBzZXR0aW5ncz17dGhpcy5wcm9wcy5zZXR0aW5nc31cclxuICAgICAgICAgIHNldHRpbmdzVXBkYXRlRnVuYz17dGhpcy5wcm9wcy5zZXR0aW5nc1VwZGF0ZUZ1bmN9XHJcbiAgICAgICAgICBmcmllbmRzPXt0aGlzLnByb3BzLmZyaWVuZHN9XHJcbiAgICAgICAgICBmcmllbmRzVXBkYXRlRnVuYz17dGhpcy5wcm9wcy5mcmllbmRzVXBkYXRlRnVuY31cclxuICAgICAgICAvPlxyXG4gICAgICA8L01vZGFsPlxyXG4gICAgKTtcclxuICB9XHJcbn0iLCJpbXBvcnQgQXBwU2V0dGluZ3MgZnJvbSAnLi9hcHBTZXR0aW5ncy5qcyc7XHJcblxyXG5jbGFzcyBTb3J0aW5nQ29udGVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCBvcHRpb24gKXtcclxuICAgIGxldCBuZXdTZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24obmV3IEFwcFNldHRpbmdzKCksIHRoaXMucHJvcHMuc2V0dGluZ3MpO1xyXG4gICAgZm9yKGxldCBwYXJhbSBpbiBvcHRpb24pe1xyXG4gICAgICBuZXdTZXR0aW5nc1twYXJhbV0gPSBvcHRpb25bcGFyYW1dO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wcm9wcy5zZXR0aW5nc1VwZGF0ZUZ1bmMoIG5ld1NldHRpbmdzICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGxldCBvbk9mZiA9IDxkaXY+XHJcbiAgICAgIDxhIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyAke3RoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0VuYWJsZWQgPyBcInNvcnRpbmctZW5hYmxlZFwiIDogXCJzb3J0aW5nLWRpc2FibGVkXCJ9YH1cclxuICAgICAgICAgaHJlZj1cIiNcIiBvbkNsaWNrPXsoZSk9PnRoaXMudXBkYXRlKHtzb3J0aW5nRW5hYmxlZDohdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nRW5hYmxlZH0pfSA+XHJcbiAgICAgICAgIHt0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdFbmFibGVkID8gXCJPTlwiIDogXCJPRkZcIn08L2E+XHJcbiAgICA8L2Rpdj47XHJcblxyXG4gICAgbGV0IGtleXMgPSBbXTtcclxuICAgIGtleXMucHVzaCggPGEgY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzICR7dGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nS2V5ID09PSBcInJhbmtcIiA/IFwic29ydGluZy1lbmFibGVkXCIgOiBcInNvcnRpbmctZGlzYWJsZWRcIn1gfVxyXG4gICAgICAgICAgICAgICAgICBocmVmPVwiI1wiIHN0eWxlPXt7cGFkZGluZzogXCI1cHhcIn19IG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnVwZGF0ZSgge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdLZXkgOiBcInJhbmtcIixcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nRW5hYmxlZDp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdPcmRlcjogdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nS2V5ICE9PSBcInJhbmtcIiA/IFwiYXNjZW5kaW5nXCIgOiB0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdPcmRlciA9PT0gXCJhc2NlbmRpbmdcIiA/IFwiZGVzY2VuZGluZ1wiIDogXCJhc2NlbmRpbmdcIiAsXHJcbiAgICAgICAgICAgICAgICAgIH0gKX0ga2V5PVwicmFua1wiPlJhbms8L2E+ICk7XHJcblxyXG4gICAga2V5cy5wdXNoKCA8YSBjbGFzc05hbWU9e2BhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgJHt0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdLZXkgPT09IFwidGltZVwiID8gXCJzb3J0aW5nLWVuYWJsZWRcIiA6IFwic29ydGluZy1kaXNhYmxlZFwifWB9XHJcbiAgICAgICAgICAgICAgICAgIGhyZWY9XCIjXCIgc3R5bGU9e3twYWRkaW5nOiBcIjVweFwifX0gb25DbGljaz17KGUpID0+IHRoaXMudXBkYXRlKCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ0tleSA6IFwidGltZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdFbmFibGVkOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ09yZGVyOiB0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdLZXkgIT09IFwidGltZVwiID8gXCJhc2NlbmRpbmdcIiA6IHRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ09yZGVyID09PSBcImFzY2VuZGluZ1wiID8gXCJkZXNjZW5kaW5nXCIgOiBcImFzY2VuZGluZ1wiICxcclxuICAgICAgICAgICAgICAgICAgfSApfSBrZXk9XCJ0aW1lXCI+VGltZSh3aXRob3V0IHBlbmFsdHkpPC9hPiApO1xyXG5cclxuICAgIGtleXMucHVzaCggPGEgY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzICR7dGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nS2V5ID09PSBcInVzZXJfc2NyZWVuX25hbWVcIiA/IFwic29ydGluZy1lbmFibGVkXCIgOiBcInNvcnRpbmctZGlzYWJsZWRcIn1gfVxyXG4gICAgICAgICAgICAgICAgICBocmVmPVwiI1wiIHN0eWxlPXt7cGFkZGluZzogXCI1cHhcIn19IG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnVwZGF0ZSgge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdLZXkgOiBcInVzZXJfc2NyZWVuX25hbWVcIixcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nRW5hYmxlZDp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdPcmRlcjogdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nS2V5ICE9PSBcInVzZXJfc2NyZWVuX25hbWVcIiA/IFwiYXNjZW5kaW5nXCIgOiB0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdPcmRlciA9PT0gXCJhc2NlbmRpbmdcIiA/IFwiZGVzY2VuZGluZ1wiIDogXCJhc2NlbmRpbmdcIiAsXHJcbiAgICAgICAgICAgICAgICAgIH0gKX0ga2V5PVwidXNlcl9zY3JlZW5fbmFtZVwiPk5hbWU8L2E+ICk7XHJcblxyXG4gICAga2V5cy5wdXNoKCA8YSBjbGFzc05hbWU9e2BhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgJHt0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdLZXkgPT09IFwicmF0aW5nXCIgPyBcInNvcnRpbmctZW5hYmxlZFwiIDogXCJzb3J0aW5nLWRpc2FibGVkXCJ9YH1cclxuICAgICAgICAgICAgICAgICAgaHJlZj1cIiNcIiBzdHlsZT17e3BhZGRpbmc6IFwiNXB4XCJ9fSBvbkNsaWNrPXsoZSkgPT4gdGhpcy51cGRhdGUoIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nS2V5IDogXCJyYXRpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBzb3J0aW5nRW5hYmxlZDp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdPcmRlcjogdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nS2V5ICE9PSBcInJhdGluZ1wiID8gXCJkZXNjZW5kaW5nXCIgOiB0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdPcmRlciA9PT0gXCJhc2NlbmRpbmdcIiA/IFwiZGVzY2VuZGluZ1wiIDogXCJhc2NlbmRpbmdcIiAsXHJcbiAgICAgICAgICAgICAgICAgIH0gKX0ga2V5PVwicmF0aW5nXCI+UmF0aW5nPC9hPiApO1xyXG4gICAga2V5cy5wdXNoKCA8YSBjbGFzc05hbWU9e2BhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgJHt0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdLZXkgPT09IFwiY291bnRyeVwiID8gXCJzb3J0aW5nLWVuYWJsZWRcIiA6IFwic29ydGluZy1kaXNhYmxlZFwifWB9XHJcbiAgICAgICAgICAgICAgICAgIGhyZWY9XCIjXCIgc3R5bGU9e3twYWRkaW5nOiBcIjVweFwifX0gb25DbGljaz17KGUpID0+IHRoaXMudXBkYXRlKCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ0tleSA6IFwiY291bnRyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRpbmdFbmFibGVkOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZ09yZGVyOiB0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdLZXkgIT09IFwiY291bnRyeVwiID8gXCJhc2NlbmRpbmdcIiA6IHRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ09yZGVyID09PSBcImFzY2VuZGluZ1wiID8gXCJkZXNjZW5kaW5nXCIgOiBcImFzY2VuZGluZ1wiICxcclxuICAgICAgICAgICAgICAgICAgfSApfSBrZXk9XCJjb3VudHJ5XCI+Q291bnRyeTwvYT4gKTtcclxuICAgIFxyXG4gICAgbGV0IGtleXNUYXNrcyA9IFtdO1xyXG4gICAgZm9yKGxldCBpPTA7IGk8dGhpcy5wcm9wcy5jb250ZXN0Lm51bVRhc2tzOyBpKyspe1xyXG4gICAgICBrZXlzVGFza3MucHVzaCggPGEgY2xhc3NOYW1lPXtgYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzICR7dGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nS2V5ID09PSBgdGFzayR7aX1gID8gXCJzb3J0aW5nLWVuYWJsZWRcIiA6IFwic29ydGluZy1kaXNhYmxlZFwifWB9XHJcbiAgICAgICAgICAgICAgICAgICAgaHJlZj1cIiNcIiBzdHlsZT17e3BhZGRpbmc6IFwiNXB4XCJ9fSBvbkNsaWNrPXsoZSkgPT4gdGhpcy51cGRhdGUoIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHNvcnRpbmdLZXkgOiBgdGFzayR7aX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgc29ydGluZ0VuYWJsZWQ6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgIHNvcnRpbmdPcmRlcjogdGhpcy5wcm9wcy5zZXR0aW5ncy5zb3J0aW5nS2V5ICE9PSBgdGFzayR7aX1gID8gXCJkZXNjZW5kaW5nXCIgOiB0aGlzLnByb3BzLnNldHRpbmdzLnNvcnRpbmdPcmRlciA9PT0gXCJhc2NlbmRpbmdcIiA/IFwiZGVzY2VuZGluZ1wiIDogXCJhc2NlbmRpbmdcIiAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSApfSBrZXk9e2B0YXNrJHtpfWB9PlRhc2ste1wiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIltpXX08L2E+ICk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG9yZGVyO1xyXG4gICAgaWYoIHRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ09yZGVyID09PSBcImFzY2VuZGluZ1wiKXtcclxuICAgICAgb3JkZXIgPSA8YSBocmVmPVwiI1wiIG9uQ2xpY2s9eyhlKT0+dGhpcy51cGRhdGUoIHtzb3J0aW5nT3JkZXI6IFwiZGVzY2VuZGluZ1wiLCBzb3J0aW5nRW5hYmxlZDp0cnVlfSApfT5cclxuICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPXt7dHJhbnNmb3JtOlwic2NhbGUoMSwtMSlcIn19PnNvcnQ8L2k+IEFzY2VuZGluZ1xyXG4gICAgICA8L2E+O1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIG9yZGVyID0gPGEgaHJlZj1cIiNcIiBvbkNsaWNrPXsoZSk9PnRoaXMudXBkYXRlKCB7c29ydGluZ09yZGVyOiBcImFzY2VuZGluZ1wiLCBzb3J0aW5nRW5hYmxlZDp0cnVlfSApfT5cclxuICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPnNvcnQ8L2k+IERlc2NlbmRpbmdcclxuICAgICAgPC9hPjtcclxuICAgIH1cclxuICAgIHJldHVybiAoIFxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOlwiYWJzb2x1dGVcIixcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOlwiMjBweFwiLCBcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6XCJ3aGl0ZVwiLCBcclxuICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6XCI0cHggNHB4IDhweCA0cHggZ3JleVwiLCBcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6XCI2cHggNnB4IDZweCA2cHhcIixcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IGAke3RoaXMucHJvcHMucG9zWSArIDQwfXB4YCxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OmAke3RoaXMucHJvcHMucG9zWH1weGB9fVxyXG4gICAgICAgICAgIG9uQ2xpY2s9eyhlKT0+ZS5zdG9wUHJvcGFnYXRpb24oKX0gPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OlwiZ3JpZFwiLCBncmlkVGVtcGxhdGVSb3dzOlwiYXV0byBhdXRvIGF1dG9cIiwgZ3JpZFRlbXBsYXRlQ29sdW1uczpcImF1dG8gMWZyXCJ9fT5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tncmlkUm93OlwiMS8yXCIsIGdyaWRDb2x1bW46XCIxLzJcIiwgcGFkZGluZzpcIjJweFwifX0+e29uT2ZmfTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIyLzNcIiwgZ3JpZENvbHVtbjpcIjEvMlwiLCBwYWRkaW5nOlwiMnB4XCJ9fT5LZXkgOjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17e2dyaWRSb3c6XCIyLzNcIiwgZ3JpZENvbHVtbjpcIjIvM1wiLCBwYWRkaW5nOlwiMnB4XCJ9fT57a2V5c308YnIvPntrZXlzVGFza3N9PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7Z3JpZFJvdzpcIjMvNFwiLCBncmlkQ29sdW1uOlwiMS8yXCIsIHBhZGRpbmc6XCIycHhcIn19Pk9yZGVyIDo8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tncmlkUm93OlwiMy80XCIsIGdyaWRDb2x1bW46XCIyLzNcIiwgcGFkZGluZzpcIjJweFwifX0+e29yZGVyfTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb3J0aW5nIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHNob3cgOiBmYWxzZSxcclxuICAgICAgcG9zWCA6IDAsXHJcbiAgICAgIHBvc1kgOiAwXHJcbiAgICB9O1xyXG5cclxuICB9XHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgYnV0dG9uID0gKFxyXG4gICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT17YGF0Y29kZXItY3VzdG9tLXN0YW5kaW5ncyAke3RoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0VuYWJsZWQgPyBcInNvcnRpbmctZW5hYmxlZFwiIDogXCJzb3J0aW5nLWRpc2FibGVkXCJ9YH0+XHJcbiAgICAgICAgPGkgY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5zb3J0PC9pPlxyXG4gICAgICAgIFNvcnRcclxuICAgICAgPC9hPlxyXG4gICAgKTtcclxuXHJcbiAgICBpZiggdGhpcy5zdGF0ZS5zaG93ID09PSBmYWxzZSApe1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIGNvbnRyb2xsZXItYnV0dG9uXCI+XHJcbiAgICAgICAgICA8ZGl2IG9uQ2xpY2s9eyAoZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVjdCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKCB7c2hvdyA6ICF0aGlzLnN0YXRlLnNob3csIHBvc1g6cmVjdC5sZWZ0LCBwb3NZOnJlY3QudG9wIH0pIDtcclxuICAgICAgICAgIH0gfT5cclxuICAgICAgICAgICAge2J1dHRvbn1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgY29udHJvbGxlci1idXR0b25cIj5cclxuICAgICAgICAgIDxkaXYgb25DbGljaz17KGUpPT50aGlzLnNldFN0YXRlKHtzaG93OiF0aGlzLnN0YXRlLnNob3d9KX0gPntidXR0b259PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7cG9zaXRpb246XCJmaXhlZFwiLCBsZWZ0OjAsIHRvcDowLCB3aWR0aDpcIjEwMCVcIiwgaGVpZ2h0OlwiMTAwJVwifX1cclxuICAgICAgICAgICAgICAgb25DbGljaz17KGUpPT50aGlzLnNldFN0YXRlKHtzaG93OmZhbHNlfSl9PlxyXG4gICAgICAgICAgICA8U29ydGluZ0NvbnRlbnQgc2V0dGluZ3M9e3RoaXMucHJvcHMuc2V0dGluZ3N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXN0PXt0aGlzLnByb3BzLmNvbnRlc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5nc1VwZGF0ZUZ1bmM9e3RoaXMucHJvcHMuc2V0dGluZ3NVcGRhdGVGdW5jfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zWD17dGhpcy5zdGF0ZS5wb3NYfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zWT17dGhpcy5zdGF0ZS5wb3NZfS8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQge3JhdGluZyxjb3VudHJpZXN9IGZyb20gJy4vdXRpbC5qcydcclxuaW1wb3J0IE1lIGZyb20gJy4vdXNlcmluZm8uanMnO1xyXG5cclxuY2xhc3MgVXNlckRldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB1c2VyLWRyb3Bkb3duLW1lbnUtJHt0aGlzLnByb3BzLnJvdy51c2VyX25hbWV9YCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHVzZXItZHJvcGRvd24tbWVudS0ke3RoaXMucHJvcHMucm93LnVzZXJfbmFtZX0tZnJpZW5kYCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuICAgICAgdGhpcy5wcm9wcy5mcmllbmRzVXBkYXRlRnVuYyggW3RoaXMucHJvcHMucm93LnVzZXJfc2NyZWVuX25hbWVdLCAhdGhpcy5wcm9wcy5pc0ZyaWVuZCk7XHJcbiAgICB9KTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnByb3BzLmNsb3NlRnVuYywge29uY2U6dHJ1ZX0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBjb25zdCBsaW5rID0gYGh0dHBzOi8vYXRjb2Rlci5qcC91c2VyLyR7dGhpcy5wcm9wcy5yb3cudXNlcl9zY3JlZW5fbmFtZX1gO1xyXG4gICAgY29uc3Qgc3VibWlzc2lvbnMgPSAoXHJcbiAgICAgIDxhIGhyZWY9e2Avc3VibWlzc2lvbnMvYWxsP3VzZXJfc2NyZWVuX25hbWU9JHt0aGlzLnByb3BzLnJvdy51c2VyX3NjcmVlbl9uYW1lfWB9IHRhcmdldD1cIl9ibGFua1wiPlxyXG4gICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zIG1kLTE4XCI+c2VhcmNoPC9pPlxyXG4gICAgICAgIFN1Ym1pc3Npb25zXHJcbiAgICAgIDwvYT5cclxuICAgICk7XHJcbiAgICBjb25zdCByYXRpbmdDb2xvciA9IHJhdGluZy5nZXRDb2xvck9yaWdpbmFsKHRoaXMucHJvcHMucm93LnJhdGluZyk7XHJcblxyXG4gICAgY29uc3QgZnJpZW5kID0gKFxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgY3Vyc29yLWxpbmtcIj5cclxuICAgICAgICA8aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29ucyBtZC0xOFwiPnt0aGlzLnByb3BzLmlzRnJpZW5kID8gXCJwZXJzb25fb3V0bGluZVwiIDogXCJwZXJzb25fYWRkXCJ9PC9pPlxyXG4gICAgICAgIHt0aGlzLnByb3BzLmlzRnJpZW5kID8gXCJSZW1vdmUgZnJvbSBGcmllbmRzIExpc3RcIiA6IFwiQWRkIHRvIEZyaWVuZHMgTGlzdFwifVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgaWQ9e2B1c2VyLWRyb3Bkb3duLW1lbnUtJHt0aGlzLnByb3BzLnJvdy51c2VyX25hbWV9YH1cclxuICAgICAgICAgICBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgdXNlci1kcm9wZG93bi1tZW51LWJveFwiPlxyXG4gICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHVzZXItZHJvcGRvd24tbWVudVwiPlxyXG4gICAgICAgICAgICAgPGEgaHJlZj17bGlua30gY2xhc3NOYW1lPXtgdXNlcm5hbWUgJHt0aGlzLnByb3BzLmNvbG9yfWB9IHRhcmdldD1cIl9ibGFua1wiPlxyXG4gICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5yb3cudXNlcl9uYW1lfSAvIHt0aGlzLnByb3BzLnJvdy51c2VyX3NjcmVlbl9uYW1lfVxyXG4gICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHVzZXItZHJvcGRvd24tbWVudVwiPlxyXG4gICAgICAgICAgICAge3N1Ym1pc3Npb25zfVxyXG4gICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHVzZXItZHJvcGRvd24tbWVudVwiPlxyXG4gICAgICAgICAgICAgUmF0aW5nIDogPHNwYW4gc3R5bGU9e3tjb2xvcjpyYXRpbmdDb2xvciwgZm9udFdlaWdodDpcImJvbGRcIn19Pnt0aGlzLnByb3BzLnJvdy5yYXRpbmd9PC9zcGFuPlxyXG4gICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHVzZXItZHJvcGRvd24tbWVudVwiPlxyXG4gICAgICAgICAgICAgQ291bnRyeSA6IDxpbWcgc3JjPXtgL2ltZy9mbGFnLyR7dGhpcy5wcm9wcy5yb3cuY291bnRyeX0ucG5nYH0gc3R5bGU9e3t2ZXJ0aWNhbEFsaWduOiBcIm1pZGRsZVwiLCB3aWR0aDogXCIxNnB4XCIsIGhlaWdodDogXCIxNnB4XCJ9fSAvPlxyXG4gICAgICAgICAgICAge2NvdW50cmllc1t0aGlzLnByb3BzLnJvdy5jb3VudHJ5XX1cclxuICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICA8ZGl2IGlkPXtgdXNlci1kcm9wZG93bi1tZW51LSR7dGhpcy5wcm9wcy5yb3cudXNlcl9uYW1lfS1mcmllbmRgfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHVzZXItZHJvcGRvd24tbWVudVwiXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17dGhpcy5wcm9wcy5yb3cudXNlcl9zY3JlZW5fbmFtZSA9PT0gTWUudXNlcl9zY3JlZW5fbmFtZSA/IHtkaXNwbGF5Olwibm9uZVwifSA6IHt9fT5cclxuICAgICAgICAgICAgIHtmcmllbmR9XHJcbiAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBOYW1lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHNob3cgOiBmYWxzZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzLCBuZXh0U3RhdGUgKXtcclxuICAgIGlmKCB0aGlzLnByb3BzLnNldHRpbmdzLmRpc3BsYXlOYW1lU3R5bGUgIT09IG5leHRQcm9wcy5zZXR0aW5ncy5kaXNwbGF5TmFtZVN0eWxlICkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiggdGhpcy5wcm9wcy5zZXR0aW5ncy5kaXNhYmxlUmF0aW5nQ29sb3IgIT09IG5leHRQcm9wcy5zZXR0aW5ncy5kaXNhYmxlUmF0aW5nQ29sb3IgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKCB0aGlzLnByb3BzLnNldHRpbmdzLnNob3dOYXRpb25hbEZsYWcgIT09IG5leHRQcm9wcy5zZXR0aW5ncy5zaG93TmF0aW9uYWxGbGFnICkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiggdGhpcy5zdGF0ZS5zaG93ICE9PSBuZXh0U3RhdGUuc2hvdyApIHJldHVybiB0cnVlO1xyXG4gICAgaWYoIHRoaXMucHJvcHMuaXNGcmllbmQgIT09IG5leHRQcm9wcy5pc0ZyaWVuZCApIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBjb25zdCByb3cgPSB0aGlzLnByb3BzLnJvdztcclxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5wcm9wcy5zZXR0aW5ncy5kaXNhYmxlUmF0aW5nQ29sb3IgPyBcIlwiIDogcmF0aW5nLnVzZXJDb2xvclsgcmF0aW5nLmdldExldmVsKHJvdy5yYXRpbmcpIF07XHJcblxyXG4gICAgY29uc3QgZGlzcGxheU5hbWUgPSAoKCk9PntcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1c2VyX3NjcmVlbl9uYW1lIDogcm93LnVzZXJfc2NyZWVuX25hbWUsXHJcbiAgICAgICAgdXNlcl9uYW1lIDogcm93LnVzZXJfbmFtZSxcclxuICAgICAgICB1c2VyX3NjcmVlbl9uYW1lX3VzZXJfbmFtZSA6IGAke3Jvdy51c2VyX3NjcmVlbl9uYW1lfSAvICR7cm93LnVzZXJfbmFtZX1gLFxyXG4gICAgICAgIHVzZXJfbmFtZV91c2VyX3NjcmVlbl9uYW1lIDogYCR7cm93LnVzZXJfbmFtZX0gLyAke3Jvdy51c2VyX3NjcmVlbl9uYW1lfWBcclxuICAgICAgfVt0aGlzLnByb3BzLnNldHRpbmdzLmRpc3BsYXlOYW1lU3R5bGVdO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBjb25zdCBjb3VudHJ5RmxhZyA9IHRoaXMucHJvcHMuc2V0dGluZ3Muc2hvd05hdGlvbmFsRmxhZyA/ICg8aW1nIHNyYz17YC9pbWcvZmxhZy8ke3Jvdy5jb3VudHJ5fS5wbmdgfSBzdHlsZT17e3ZlcnRpY2FsQWxpZ246IFwibWlkZGxlXCIsIHdpZHRoOiBcIjE2cHhcIiwgaGVpZ2h0OiBcIjE2cHhcIn19IC8+KSA6IFwiXCI7XHJcblxyXG4gICAgY29uc3QgbmFtZU9uY2xpY2sgPSAoZSkgPT4ge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBzaG93IDogIXRoaXMuc3RhdGUuc2hvd1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgaWYoIHRoaXMuc3RhdGUuc2hvdyA9PT0gZmFsc2UgKXtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8dGQgY2xhc3NOYW1lPVwic3RhbmRpbmdzLXVzZXJuYW1lXCIgb25DbGljaz17bmFtZU9uY2xpY2t9PlxyXG4gICAgICAgICAge2NvdW50cnlGbGFnfVxyXG4gICAgICAgICAge1wiIFwifVxyXG4gICAgICAgICAge3Jvdy5yYXRpbmcgPj0gMzIwMCA/IDxpbWcgc3JjPXtgL2ltZy9pY29uL2Nyb3duJHtyb3cucmF0aW5nIC0gcm93LnJhdGluZyU0MDB9LmdpZmB9IHN0eWxlPXt7dmVydGljYWxBbGlnbjogXCJtaWRkbGVcIn19Lz4gOiBudWxsfVxyXG4gICAgICAgICAge3Jvdy5yYXRpbmcgPj0gMzIwMCA/IFwiIFwiIDogbnVsbH1cclxuICAgICAgICAgIDxhIGNsYXNzTmFtZT17YHVzZXJuYW1lICR7Y29sb3J9YH0+e2Rpc3BsYXlOYW1lfTwvYT5cclxuICAgICAgICA8L3RkPlxyXG4gICAgICApO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cInN0YW5kaW5ncy11c2VybmFtZVwiIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHtzaG93OmZhbHNlfSl9PlxyXG4gICAgICAgICAge2NvdW50cnlGbGFnfVxyXG4gICAgICAgICAge1wiIFwifVxyXG4gICAgICAgICAge3Jvdy5yYXRpbmcgPj0gMzIwMCA/IDxpbWcgc3JjPXtgL2ltZy9pY29uL2Nyb3duJHtyb3cucmF0aW5nIC0gcm93LnJhdGluZyU0MDB9LmdpZmB9IHN0eWxlPXt7dmVydGljYWxBbGlnbjogXCJtaWRkbGVcIn19Lz4gOiBudWxsfVxyXG4gICAgICAgICAge3Jvdy5yYXRpbmcgPj0gMzIwMCA/IFwiIFwiIDogbnVsbH1cclxuICAgICAgICAgIDxhIGNsYXNzTmFtZT17YHVzZXJuYW1lICR7Y29sb3J9YH0+e2Rpc3BsYXlOYW1lfTwvYT5cclxuICAgICAgICAgIDxVc2VyRGV0YWlscyBmcmllbmRzVXBkYXRlRnVuYz17dGhpcy5wcm9wcy5mcmllbmRzVXBkYXRlRnVuY31cclxuICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj17Y29sb3J9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaXNGcmllbmQ9e3RoaXMucHJvcHMuaXNGcmllbmR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcm93PXtyb3d9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VGdW5jPXsoKT0+dGhpcy5zZXRTdGF0ZSh7c2hvdzpmYWxzZX0pfS8+XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFRhc2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMgKXtcclxuICAgIGlmKCBKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzLnRhc2spICE9PSBKU09OLnN0cmluZ2lmeShuZXh0UHJvcHMudGFzaykgKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgY29uc3QgdCA9IHRoaXMucHJvcHMudGFzaztcclxuICAgIGlmKCB0LmV4dHJhcyA9PT0gdHJ1ZSAmJiB0aGlzLnByb3BzLm1lID09PSBmYWxzZSApe1xyXG4gICAgICByZXR1cm4gPHRkIGNsYXNzTmFtZT1cImNlbnRlciBzdGFuZGluZ3MtZnJvemVuXCI+PC90ZD5cclxuICAgIH1cclxuICAgIGlmKCB0LmVsYXBzZWRfdGltZSA9PT0gdW5kZWZpbmVkICl7XHJcbiAgICAgIHJldHVybiA8dGQgY2xhc3NOYW1lPVwiY2VudGVyXCI+LTwvdGQ+XHJcbiAgICB9XHJcbiAgICBpZiggdC5zY29yZSA9PT0gMCApe1xyXG4gICAgICByZXR1cm4gPHRkIGNsYXNzTmFtZT1cImNlbnRlciBzdGFuZGluZ3Mtd2FcIj4oe3QuZmFpbHVyZX0pPC90ZD5cclxuICAgIH1cclxuICAgIGxldCBwZW5hbHR5ID0gXCJcIjtcclxuICAgIGlmKHQuZmFpbHVyZSAhPT0gMCl7XHJcbiAgICAgIHBlbmFsdHkgPSA8c3BhbiBjbGFzc05hbWU9XCJzdGFuZGluZ3Mtd2FcIj4oe3QuZmFpbHVyZX0pPC9zcGFuPjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc3VibWlzc2lvbiA9IHRoaXMucHJvcHMuY29udGVzdEVuZGVkID8gIDxhIGhyZWY9e3RoaXMucHJvcHMuc3VibWlzc2lvbkxpbmt9IHRhcmdldD1cIl9ibGFua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zIG1kLTE4IG1kLWRhcmtcIiBzdHlsZT17e3ZlcnRpY2FsQWxpZ246XCJib3R0b21cIn19PnNlYXJjaDwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPiA6IFwiXCI7XHJcblxyXG4gICAgY29uc3QgdGltZU1pbiA9IGAke01hdGguZmxvb3IodC5lbGFwc2VkX3RpbWUvNjApPDEwP1wiMFwiOlwiXCJ9JHtNYXRoLmZsb29yKHQuZWxhcHNlZF90aW1lLzYwKX1gO1xyXG4gICAgY29uc3QgdGltZVNlYyA9IGAwMCR7TWF0aC5mbG9vcih0LmVsYXBzZWRfdGltZSU2MCl9YC5zbGljZSgtMik7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGQgY2xhc3NOYW1lPVwiY2VudGVyXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RhbmRpbmdzLWFjXCI+e3Quc2NvcmUvMTAwfTwvc3Bhbj57cGVuYWx0eX17c3VibWlzc2lvbn1cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhdGNvZGVyLWN1c3RvbS1zdGFuZGluZ3MgdGltZXN0YW1wXCI+e3RpbWVNaW59Ont0aW1lU2VjfTwvc3Bhbj5cclxuICAgICAgPC90ZD5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBUb3RhbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcyApe1xyXG4gICAgY29uc3QgY29tcCA9IFtcImVsYXBzZWRfdGltZVwiLCBcImZhaWx1cmVcIiwgXCJwZW5hbHR5XCIsIFwic2NvcmVcIl07XHJcbiAgICBmb3IoY29uc3QgcGFyYW0gb2YgY29tcCl7XHJcbiAgICAgIGlmKCB0aGlzLnByb3BzLnJvd1twYXJhbV0gIT09IG5leHRQcm9wcy5yb3dbcGFyYW1dICkgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGlmKCB0aGlzLnByb3BzLnJvdy5lbGFwc2VkX3RpbWUgPT09IFwiMFwiICl7XHJcbiAgICAgICAgcmV0dXJuIDx0ZCBjbGFzc05hbWU9XCJjZW50ZXJcIj48cD4tPC9wPjwvdGQ+O1xyXG4gICAgfVxyXG4gICAgbGV0IHBlbmFsdHkgPSBcIlwiO1xyXG4gICAgaWYodGhpcy5wcm9wcy5yb3cuZmFpbHVyZSAhPT0gXCIwXCIpe1xyXG4gICAgICBwZW5hbHR5ID0gPHNwYW4gY2xhc3NOYW1lPVwic3RhbmRpbmdzLXdhXCI+KHt0aGlzLnByb3BzLnJvdy5mYWlsdXJlfSk8L3NwYW4+O1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGltZU1pbiA9IGAke01hdGguZmxvb3IodGhpcy5wcm9wcy5yb3cuZWxhcHNlZF90aW1lLzYwKTwxMD9cIjBcIjpcIlwifSR7TWF0aC5mbG9vcih0aGlzLnByb3BzLnJvdy5lbGFwc2VkX3RpbWUvNjApfWA7XHJcbiAgICBjb25zdCB0aW1lU2VjID0gYDAwJHtNYXRoLmZsb29yKHRoaXMucHJvcHMucm93LmVsYXBzZWRfdGltZSU2MCl9YC5zbGljZSgtMik7XHJcblxyXG4gICAgY29uc3QgcGVuYWx0eU1pbiA9IGAke01hdGguZmxvb3IodGhpcy5wcm9wcy5yb3cucGVuYWx0eS82MCk8MTA/XCIwXCI6XCJcIn0ke01hdGguZmxvb3IodGhpcy5wcm9wcy5yb3cucGVuYWx0eS82MCl9YDtcclxuICAgIGNvbnN0IHBlbmFsdHlTZWMgPSBgMDAke01hdGguZmxvb3IodGhpcy5wcm9wcy5yb3cucGVuYWx0eSU2MCl9YC5zbGljZSgtMik7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGQgY2xhc3NOYW1lPVwiY2VudGVyXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwic3RhbmRpbmdzLXNjb3JlXCI+e3RoaXMucHJvcHMucm93LnNjb3JlLzEwMH08L3NwYW4+e3BlbmFsdHl9XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYXRjb2Rlci1jdXN0b20tc3RhbmRpbmdzIHRpbWVzdGFtcFwiPntwZW5hbHR5TWlufTp7cGVuYWx0eVNlY30gKHt0aW1lTWlufTp7dGltZVNlY30pPC9zcGFuPlxyXG4gICAgICA8L3RkPlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbi8qXHJcbiByYW5rXHJcbiBuYW1lXHJcbiBpZFxyXG4gcmF0aW5nXHJcbiBjb3VudHJ5XHJcbiB0YXNrc1tdXHJcbiBzY29yZVxyXG4gZWxhcHNlZF90aW1lXHJcbiBwZW5hbHR5XHJcbiovXHJcbmNsYXNzIFN0YW5kaW5nc1JvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMgKXtcclxuICAgIGlmKCBKU09OLnN0cmluZ2lmeSggT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcy5zZXR0aW5ncykgKSAhPT0gSlNPTi5zdHJpbmdpZnkoIE9iamVjdC5hc3NpZ24oe30sIG5leHRQcm9wcy5zZXR0aW5ncykgKSApIHJldHVybiB0cnVlO1xyXG4gICAgaWYoIEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMucm93KSAhPT0gSlNPTi5zdHJpbmdpZnkobmV4dFByb3BzLnJvdykgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKCB0aGlzLnByb3BzLmlzRnJpZW5kICE9PSBuZXh0UHJvcHMuaXNGcmllbmQgKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmKCB0aGlzLnByb3BzLmZpbHRlcmVkUmFuayAhPT0gbmV4dFByb3BzLmZpbHRlcmVkUmFuayApIHJldHVybiB0cnVlO1xyXG4gICAgaWYoIHRoaXMucHJvcHMuY29udGVzdEVuZGVkICE9PSBuZXh0UHJvcHMuY29udGVzdEVuZGVkICkgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IG5hbWUgPSA8TmFtZSBzZXR0aW5ncz17dGhpcy5wcm9wcy5zZXR0aW5nc31cclxuICAgICAgICAgICAgICAgICAgICAgICByb3c9e3RoaXMucHJvcHMucm93fVxyXG4gICAgICAgICAgICAgICAgICAgICAgIGlzRnJpZW5kPXt0aGlzLnByb3BzLmlzRnJpZW5kfVxyXG4gICAgICAgICAgICAgICAgICAgICAgIGZyaWVuZHNVcGRhdGVGdW5jPXt0aGlzLnByb3BzLmZyaWVuZHNVcGRhdGVGdW5jfS8+O1xyXG5cclxuICAgIGNvbnN0IHRhc2tzID0gdGhpcy5wcm9wcy5yb3cudGFza3MubWFwKCAodCwgaSkgPT4ge1xyXG4gICAgICByZXR1cm4gPFRhc2sgdGFzaz17dH1cclxuICAgICAgICAgICAgICAgICAgIGtleT17aX0gXHJcbiAgICAgICAgICAgICAgICAgICBtZT17TWUuY29udGVzdGFudCA9PT0gdHJ1ZSAmJiB0aGlzLnByb3BzLnJvdy51c2VyX2lkID09PSBNZS51c2VyX2lkfVxyXG4gICAgICAgICAgICAgICAgICAgc3VibWlzc2lvbkxpbms9e2AuL3N1Ym1pc3Npb25zL2FsbD90YXNrX3NjcmVlbl9uYW1lPSR7dGhpcy5wcm9wcy50YXNrRGF0YVtpXS51cmwuc2xpY2UoNyl9JnVzZXJfc2NyZWVuX25hbWU9JHt0aGlzLnByb3BzLnJvdy51c2VyX3NjcmVlbl9uYW1lfWB9XHJcbiAgICAgICAgICAgICAgICAgICBjb250ZXN0RW5kZWQ9e3RoaXMucHJvcHMuY29udGVzdEVuZGVkfS8+O1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdG90YWwgPSA8VG90YWwgcm93PXt0aGlzLnByb3BzLnJvd30gLz47XHJcblxyXG4gICAgbGV0IHRyQ2xhc3MgPSBcIlwiO1xyXG4gICAgaWYoIHRoaXMucHJvcHMuaXNGcmllbmQgJiYgdGhpcy5wcm9wcy5zZXR0aW5ncy5oaWdobGlnaHRGcmllbmRzID09PSB0cnVlICkgdHJDbGFzcyA9IFwic3RhbmRpbmdzLWZyaWVuZFwiO1xyXG4gICAgaWYoIE1lLmNvbnRlc3RhbnQgPT09IHRydWUgJiYgdGhpcy5wcm9wcy5yb3cudXNlcl9pZCA9PT0gTWUudXNlcl9pZCApIHRyQ2xhc3MgPSBcInN0YW5kaW5ncy1tZVwiO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICA8dHIgY2xhc3NOYW1lPXt0ckNsYXNzfT5cclxuICAgICAgPHRkIGNsYXNzTmFtZT1cInN0YW5kaW5ncy1yYW5rXCI+XHJcbiAgICAgICAge3RoaXMucHJvcHMucm93LnJhbmt9e3RoaXMucHJvcHMuc2V0dGluZ3MuaXNGaWx0ZXJzRW5hYmxlZCgpIHx8IHRoaXMucHJvcHMuc2V0dGluZ3Muc29ydGluZ0VuYWJsZWQgP2AgKCR7dGhpcy5wcm9wcy5maWx0ZXJlZFJhbmt9KWA6XCJcIn1cclxuICAgICAgPC90ZD5cclxuICAgICAge25hbWV9XHJcbiAgICAgIHt0YXNrc31cclxuICAgICAge3RvdGFsfVxyXG4gICAgPC90cj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBTdGFuZGluZ3NIZWFkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpe1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IHRhc2tzID0gdGhpcy5wcm9wcy50YXNrRGF0YS5tYXAoICh0LCBpKSA9PiB7XHJcbiAgICAgIHJldHVybiAoPHRoIGNsYXNzTmFtZT1cImNlbnRlclwiIGtleT17YHRhc2stJHtpfWB9PlxyXG4gICAgICAgIDxhIGhyZWY9e3QudXJsfSB0YXJnZXQ9XCJfYmxhbmtcIj57dC5uYW1lfTwvYT5cclxuICAgICAgPC90aD4pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dHI+XHJcbiAgICAgICAgPHRoIGNsYXNzTmFtZT1cImNlbnRlclwiPntcIlJhbmtcIn08L3RoPlxyXG4gICAgICAgIDx0aCBjbGFzc05hbWU9XCJjZW50ZXJcIj57XCJVc2VyIE5hbWVcIn08L3RoPlxyXG4gICAgICAgIHt0YXNrc31cclxuICAgICAgICA8dGggY2xhc3NOYW1lPVwiY2VudGVyXCI+e1wiU2NvcmUgLyBUaW1lXCJ9PC90aD5cclxuICAgICAgPC90cj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFuZGluZ3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IHN0YW5kaW5nc1Jvd3MgPSBcIlwiO1xyXG4gICAgaWYoIHRoaXMucHJvcHMuc3RhbmRpbmdzLmxlbmd0aCA+IDAgKXtcclxuICAgICAgc3RhbmRpbmdzUm93cyA9IHRoaXMucHJvcHMuc3RhbmRpbmdzLm1hcCggKHJvdywgaSkgPT4ge1xyXG4gICAgICAgIGxldCBpc0ZyaWVuZCA9IHRoaXMucHJvcHMuZnJpZW5kcy5pc0ZyaWVuZCggcm93LnVzZXJfc2NyZWVuX25hbWUgKTtcclxuICAgICAgICByZXR1cm4gPFN0YW5kaW5nc1JvdyByb3c9e3Jvd31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncz17dGhpcy5wcm9wcy5zZXR0aW5nc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3Jvdy51c2VyX2lkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRnJpZW5kPXtpc0ZyaWVuZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmllbmRzVXBkYXRlRnVuYz17dGhpcy5wcm9wcy5mcmllbmRzVXBkYXRlRnVuY31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZFJhbms9e3RoaXMucHJvcHMub2ZmU2V0ICsgaSArIDF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFza0RhdGE9e3RoaXMucHJvcHMudGFza0RhdGF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVzdEVuZGVkPXt0aGlzLnByb3BzLmNvbnRlc3RFbmRlZH0vPlxyXG4gICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWNvbmRlbnNlZCB0YWJsZS1zdGFuZGluZ3MgdGFibGUtc29ydFwiPlxyXG4gICAgICA8dGhlYWQ+XHJcbiAgICAgICAgPFN0YW5kaW5nc0hlYWQgdGFza0RhdGE9e3RoaXMucHJvcHMudGFza0RhdGF9Lz5cclxuICAgICAgPC90aGVhZD5cclxuICAgICAgPHRib2R5PlxyXG4gICAgICAgIHtzdGFuZGluZ3NSb3dzfVxyXG4gICAgICA8L3Rib2R5PlxyXG4gICAgPC90YWJsZT5cclxuICAgICk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IFN0YXRzU3VtbWFyeSBmcm9tICcuL3N0YXRzL3N1bW1hcnkuanMnXHJcbmltcG9ydCBTdGF0c1Rhc2sgZnJvbSAnLi9zdGF0cy90YXNrLmpzJ1xyXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi9tb2RhbC5qcydcclxuXHJcbmNsYXNzIFN0YXRzQ29udGVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0geyBwYWdlOiAwIH07XHJcbiAgfVxyXG5cclxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcywgbmV4dFN0YXRlICl7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5wYWdlICE9PSBuZXh0U3RhdGUucGFnZTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IHRhYiA9IHRoaXMucHJvcHMuY29udGVzdC50YXNrcy5tYXAoICh0LGkpID0+IHtcclxuICAgICAgaWYoIHRoaXMuc3RhdGUucGFnZSA9PT0gaSApe1xyXG4gICAgICAgIHJldHVybiAoPGxpIGNsYXNzTmFtZT1cImFjdGl2ZVwiIGtleT17YCR7aX1gfT48YSBocmVmPVwiI1wiPnsnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonW2ldfTwvYT48L2xpPik7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiAoPGxpIGtleT17YCR7aX1gfT48YSBocmVmPVwiI1wiIG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtwYWdlOml9KTtcclxuICAgICAgICB9fT57J0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJ1tpXX08L2E+PC9saT4pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgY29tcG9uZW50O1xyXG4gICAgaWYodGhpcy5zdGF0ZS5wYWdlID09PSB0aGlzLnByb3BzLmNvbnRlc3QubnVtVGFza3Mpe1xyXG4gICAgICB0YWIucHVzaCggPGxpIGNsYXNzTmFtZT1cImFjdGl2ZVwiIGtleT17YCR7dGhpcy5wcm9wcy5jb250ZXN0Lm51bVRhc2tzfWB9PjxhIGhyZWY9XCIjXCI+U3VtbWFyeTwvYT48L2xpPiApO1xyXG4gICAgICBjb21wb25lbnQgPSAoXHJcbiAgICAgICAgPFN0YXRzU3VtbWFyeSBzdGFuZGluZ3M9e3RoaXMucHJvcHMuc3RhbmRpbmdzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVzdD17dGhpcy5wcm9wcy5jb250ZXN0fSAvPlxyXG4gICAgICApO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHRhYi5wdXNoKCA8bGkga2V5PXtgJHt0aGlzLnByb3BzLmNvbnRlc3QubnVtVGFza3N9YH0+PGEgaHJlZj1cIiNcIiBvbkNsaWNrPXsgKCk9PntcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtwYWdlOnRoaXMucHJvcHMuY29udGVzdC5udW1UYXNrc30pO1xyXG4gICAgICB9IH0+U3VtbWFyeTwvYT48L2xpPiApO1xyXG4gICAgICBjb21wb25lbnQgPSAoXHJcbiAgICAgICAgPFN0YXRzVGFzayB0YXNrPXt0aGlzLnByb3BzLmNvbnRlc3QudGFza3NbdGhpcy5zdGF0ZS5wYWdlXX1cclxuICAgICAgICAgICAgICAgICAgIHN0YW5kaW5ncz17dGhpcy5wcm9wcy5zdGFuZGluZ3N9XHJcbiAgICAgICAgICAgICAgICAgICBjb250ZXN0PXt0aGlzLnByb3BzLmNvbnRlc3R9IC8+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdi10YWJzXCI+XHJcbiAgICAgICAgICB7dGFifVxyXG4gICAgICAgIDwvdWw+XHJcbiAgICAgICAge2NvbXBvbmVudH1cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIC8qKlxyXG4gICogQHBhcmFtIHByb3BzLnN0YW5kaW5nc1xyXG4gICogQHBhcmFtIHByb3BzLmNvbnRlc3RcclxuICAqL1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IGJ1dHRvbiA9IChcclxuICAgICAgPGEgaHJlZj1cIiNcIj48aSBjbGFzc05hbWU9XCJtYXRlcmlhbC1pY29uc1wiPmFzc2Vzc21lbnQ8L2k+IFN0YXRpc3RpY3MgPC9hPlxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8TW9kYWwgYnV0dG9uPXtidXR0b259IHRpdGxlPVwiU3RhdGlzdGljc1wiPlxyXG4gICAgICAgIDxTdGF0c0NvbnRlbnQgc3RhbmRpbmdzPXt0aGlzLnByb3BzLnN0YW5kaW5nc30gY29udGVzdD17dGhpcy5wcm9wcy5jb250ZXN0fS8+XHJcbiAgICAgIDwvTW9kYWw+XHJcbiAgICApO1xyXG4gIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJ0Q29tcG9uZW50IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIC8qKlxyXG4gICogY2FudmFzSWRcclxuICAqIGRhdGFzZXRcclxuICAqIHdpZHRoXHJcbiAgKiBoZWlnaHRcclxuICAqL1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcbiAgcmVuZGVyKCl7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGNhbnZhcyBpZD17dGhpcy5wcm9wcy5jYW52YXNJZH0gd2lkdGg9e3RoaXMucHJvcHMud2lkdGh9IGhlaWdodD17dGhpcy5wcm9wcy5oZWlnaHR9PjwvY2FudmFzPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG4gIGNvbXBvbmVudERpZE1vdW50KCl7XHJcbiAgICBsZXQgY3R4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wcm9wcy5jYW52YXNJZCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhjdHgpO1xyXG4gICAgdGhpcy5jaGFydCA9IG5ldyBDaGFydChjdHgsIHRoaXMucHJvcHMuZGF0YXNldCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNoYXJ0KTtcclxuICB9XHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgIHRoaXMuY2hhcnQuZGVzdHJveSgpO1xyXG4gIH1cclxuICBjb21wb25lbnREaWRVcGRhdGUoKXtcclxuICAgIHRoaXMuY2hhcnQuZGVzdHJveSgpO1xyXG4gICAgbGV0IGN0eCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucHJvcHMuY2FudmFzSWQpO1xyXG4gICAgLy8gY29uc29sZS5sb2coY3R4KTtcclxuICAgIHRoaXMuY2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB0aGlzLnByb3BzLmRhdGFzZXQpO1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5jaGFydCk7XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtyYXRpbmcsY291bnRyaWVzfSBmcm9tICcuLi91dGlsLmpzJ1xyXG5pbXBvcnQgQ2hhcnRDb21wb25lbnQgZnJvbSAnLi9jaGFydENvbXBvbmVudC5qcydcclxuXHJcbmNsYXNzIFRvcE9mQ29sb3JzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgZGF0YSA9IG5ldyBBcnJheShyYXRpbmcubGIubGVuZ3RoKTtcclxuICAgIGRhdGEuZmlsbCh1bmRlZmluZWQpO1xyXG5cclxuICAgIHRoaXMucHJvcHMuc3RhbmRpbmdzLmZvckVhY2goIChzKT0+e1xyXG4gICAgICBpZihzLmVsYXBzZWRfdGltZSA9PT0gXCIwXCIpIHtcclxuICAgICAgICBsZXQgcGFydGljaXBhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHMudGFza3MuZm9yRWFjaCggKHQpPT57XHJcbiAgICAgICAgICBpZih0LnNjb3JlICE9PSB1bmRlZmluZWQpIHBhcnRpY2lwYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgICBpZiggcGFydGljaXBhdGluZyA9PT0gZmFsc2UgKSByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGxldmVsID0gcmF0aW5nLmdldExldmVsKCBzLnJhdGluZyApO1xyXG4gICAgICBpZiggZGF0YVtsZXZlbF0gPT09IHVuZGVmaW5lZCApe1xyXG4gICAgICAgIGRhdGFbbGV2ZWxdID0ge1xyXG4gICAgICAgICAgbmFtZSA6IHMudXNlcl9zY3JlZW5fbmFtZSxcclxuICAgICAgICAgIHJhdGluZyA6IHMucmF0aW5nLFxyXG4gICAgICAgICAgcmFuayA6IHMucmFuayxcclxuICAgICAgICAgIHNjb3JlIDogTnVtYmVyKHMuc2NvcmUpIC8gMTAwLFxyXG4gICAgICAgICAgdGltZSA6IE51bWJlcihzLmVsYXBzZWRfdGltZSksXHJcbiAgICAgICAgICBwZW5hbHR5IDogTnVtYmVyKHMucGVuYWx0eSksXHJcbiAgICAgICAgICBmYWlsdXJlIDogTnVtYmVyKHMuZmFpbHVyZSlcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICBkYXRhID0gZGF0YS5zbGljZSgxKTtcclxuXHJcbiAgICBsZXQgY29tcCA9IGRhdGEubWFwKCAoZCwgaWR4KSA9PiB7XHJcbiAgICAgIGlmKCBkID09PSB1bmRlZmluZWQgKXtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPHRyIGtleT17aWR4fT5cclxuICAgICAgICAgICAgPHRkPjxzcGFuIHN0eWxlPXt7Y29sb3IgOiByYXRpbmcuY29sb3JPcmlnaW5hbFtpZHgrMV19fT57cmF0aW5nLmxiW2lkeCsxXX0gLSA8L3NwYW4+PC90ZD5cclxuICAgICAgICAgICAgPHRkPiAtIDwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD4gLSA8L3RkPlxyXG4gICAgICAgICAgICA8dGQ+IC0gPC90ZD5cclxuICAgICAgICAgICAgPHRkPiAtIDwvdGQ+XHJcbiAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybihcclxuICAgICAgICAgIDx0ciBrZXk9e2lkeH0+XHJcbiAgICAgICAgICAgIDx0ZD48c3BhbiBzdHlsZT17e2NvbG9yIDogcmF0aW5nLmNvbG9yT3JpZ2luYWxbaWR4KzFdfX0+e3JhdGluZy5sYltpZHgrMV19IC0gPC9zcGFuPjwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57cmF0aW5nLmdlbmVyYXRlQ29sb3JlZE5hbWUoIGQubmFtZSwgZC5yYXRpbmcgKX08L3RkPlxyXG4gICAgICAgICAgICA8dGQ+e2QucmFua308L3RkPlxyXG4gICAgICAgICAgICA8dGQ+e2Quc2NvcmV9e2QuZmFpbHVyZSE9MD88c3Bhbj4gKHtkLmZhaWx1cmV9KTwvc3Bhbj4gOiBcIlwifTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZD57TWF0aC5mbG9vcihkLnRpbWUvNjApfSBtaW4ge2QudGltZSU2MH0gc2VjICh7TWF0aC5mbG9vcihkLnBlbmFsdHkvNjApfSBtaW4ge2QucGVuYWx0eSU2MH0gc2VjKTwvdGQ+XHJcbiAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gKTtcclxuXHJcbiAgICBjb21wLnJldmVyc2UoKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMz5Ub3Agb2YgQ29sb3JzPC9oMz5cclxuICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtY29uZGVuc2VkXCI+XHJcbiAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICA8dGg+UmF0aW5nPC90aD5cclxuICAgICAgICAgICAgICA8dGg+VG9wPC90aD5cclxuICAgICAgICAgICAgICA8dGg+UmFuazwvdGg+XHJcbiAgICAgICAgICAgICAgPHRoPlNjb3JlIChQZW5hbHR5KTwvdGg+XHJcbiAgICAgICAgICAgICAgPHRoPlRpbWUgKFBlbmFsdHkpPC90aD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgIHtjb21wfVxyXG4gICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICA8L3RhYmxlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuY2xhc3MgVG9wT2ZDb3VudHJpZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc29ydGluZ0tleSA6IFwicmFua1wiLFxyXG4gICAgICBhc2NlbmRpbmcgOiB0cnVlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgZGF0YSA9IHt9O1xyXG5cclxuICAgIHRoaXMucHJvcHMuc3RhbmRpbmdzLmZvckVhY2goIChzKT0+e1xyXG4gICAgICBpZihzLmVsYXBzZWRfdGltZSA9PT0gXCIwXCIpIHtcclxuICAgICAgICBsZXQgcGFydGljaXBhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHMudGFza3MuZm9yRWFjaCggKHQpPT57XHJcbiAgICAgICAgICBpZih0LnNjb3JlICE9PSB1bmRlZmluZWQpIHBhcnRpY2lwYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgICBpZiggcGFydGljaXBhdGluZyA9PT0gZmFsc2UgKSByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvdW50cnkgPSBzLmNvdW50cnk7XHJcblxyXG4gICAgICBpZiggZGF0YVtjb3VudHJ5XSA9PT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgZGF0YVtjb3VudHJ5XSA9IHtcclxuICAgICAgICAgIG5hbWUgOiBzLnVzZXJfc2NyZWVuX25hbWUsXHJcbiAgICAgICAgICBjb3VudHJ5IDogcy5jb3VudHJ5LFxyXG4gICAgICAgICAgcmF0aW5nIDogcy5yYXRpbmcsXHJcbiAgICAgICAgICByYW5rIDogcy5yYW5rLFxyXG4gICAgICAgICAgc2NvcmUgOiBOdW1iZXIocy5zY29yZSkgLyAxMDAsXHJcbiAgICAgICAgICB0aW1lIDogTnVtYmVyKHMuZWxhcHNlZF90aW1lKSxcclxuICAgICAgICAgIHBlbmFsdHkgOiBOdW1iZXIocy5wZW5hbHR5KSxcclxuICAgICAgICAgIGZhaWx1cmUgOiBOdW1iZXIocy5mYWlsdXJlKSxcclxuICAgICAgICAgIHNjb3JlVGltZSA6IE51bWJlcihzLnNjb3JlKSAqIDEwMDAwMDAwMDAgLSBOdW1iZXIocy5wZW5hbHR5KVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGRhdGEgPSBPYmplY3Qua2V5cyhkYXRhKS5tYXAoIChjKSA9PiB7XHJcbiAgICAgIHJldHVybiBkYXRhW2NdO1xyXG4gICAgfSApO1xyXG5cclxuICAgIGRhdGEuc29ydCggKHgseSkgPT4ge1xyXG4gICAgICBsZXQgcmVzID0geFt0aGlzLnN0YXRlLnNvcnRpbmdLZXldIDwgeVt0aGlzLnN0YXRlLnNvcnRpbmdLZXldO1xyXG4gICAgICByZXMgPSB0aGlzLnN0YXRlLmFzY2VuZGluZz9yZXM6IXJlcztcclxuICAgICAgcmV0dXJuIHJlcyA/IC0xIDogMTtcclxuICAgIH0gKTtcclxuXHJcbiAgICBsZXQgY29tcCA9IGRhdGEubWFwKCAoZCwgaWR4KSA9PiB7XHJcbiAgICAgIHJldHVybihcclxuICAgICAgICA8dHIga2V5PXtpZHh9PlxyXG4gICAgICAgICAgPHRkPntkLnJhbmt9PC90ZD5cclxuICAgICAgICAgIDx0ZD48aW1nIHNyYz17YC9pbWcvZmxhZy8ke2QuY291bnRyeX0ucG5nYH0gc3R5bGU9e3t2ZXJ0aWNhbEFsaWduOiBcIm1pZGRsZVwiLCB3aWR0aDogXCIxNnB4XCIsIGhlaWdodDogXCIxNnB4XCJ9fSAvPiB7Y291bnRyaWVzW2QuY291bnRyeV19PC90ZD5cclxuICAgICAgICAgIDx0ZD57cmF0aW5nLmdlbmVyYXRlQ29sb3JlZE5hbWUoIGQubmFtZSwgZC5yYXRpbmcgKX08L3RkPlxyXG4gICAgICAgICAgPHRkPntkLnNjb3JlfXtkLmZhaWx1cmUhPTA/PHNwYW4+ICh7ZC5mYWlsdXJlfSk8L3NwYW4+IDogXCJcIn08L3RkPlxyXG4gICAgICAgICAgPHRkPntNYXRoLmZsb29yKGQudGltZS82MCl9IG1pbiB7ZC50aW1lJTYwfSBzZWMgKHtNYXRoLmZsb29yKGQucGVuYWx0eS82MCl9IG1pbiB7ZC5wZW5hbHR5JTYwfSBzZWMpPC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICApO1xyXG4gICAgfSApO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgzPlRvcCBvZiBDb3VudHJpZXM8L2gzPlxyXG4gICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1jb25kZW5zZWRcIj5cclxuICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgIDx0aCBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuc3RhdGUuc29ydGluZ0tleSA9PSBcInJhbmtcIiApIHRoaXMuc2V0U3RhdGUgKHsgc29ydGluZ0tleSA6IFwicmFua1wiLCBhc2NlbmRpbmcgOiAhdGhpcy5zdGF0ZS5hc2NlbmRpbmcgfSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc2V0U3RhdGUgKHsgc29ydGluZ0tleSA6IFwicmFua1wiLCBhc2NlbmRpbmcgOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgIH19PlJhbms8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aCBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuc3RhdGUuc29ydGluZ0tleSA9PSBcImNvdW50cnlcIiApIHRoaXMuc2V0U3RhdGUgKHsgc29ydGluZ0tleSA6IFwiY291bnRyeVwiLCBhc2NlbmRpbmcgOiAhdGhpcy5zdGF0ZS5hc2NlbmRpbmcgfSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc2V0U3RhdGUgKHsgc29ydGluZ0tleSA6IFwiY291bnRyeVwiLCBhc2NlbmRpbmcgOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgIH19PkNvdW50cnk8L3RoPlxyXG4gICAgICAgICAgICAgIDx0aCBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMuc3RhdGUuc29ydGluZ0tleSA9PSBcIm5hbWVcIiApIHRoaXMuc2V0U3RhdGUgKHsgc29ydGluZ0tleSA6IFwibmFtZVwiLCBhc2NlbmRpbmcgOiAhdGhpcy5zdGF0ZS5hc2NlbmRpbmcgfSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc2V0U3RhdGUgKHsgc29ydGluZ0tleSA6IFwibmFtZVwiLCBhc2NlbmRpbmcgOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgIH19PlRvcDwvdGg+XHJcbiAgICAgICAgICAgICAgPHRoIG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgICAgICBpZiggdGhpcy5zdGF0ZS5zb3J0aW5nS2V5ID09IFwic2NvcmVUaW1lXCIgKSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcInNjb3JlVGltZVwiLCBhc2NlbmRpbmcgOiAhdGhpcy5zdGF0ZS5hc2NlbmRpbmcgfSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc2V0U3RhdGUgKHsgc29ydGluZ0tleSA6IFwic2NvcmVUaW1lXCIsIGFzY2VuZGluZyA6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgIH19PlNjb3JlIChQZW5hbHR5KTwvdGg+XHJcbiAgICAgICAgICAgICAgPHRoIG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgICAgICBpZiggdGhpcy5zdGF0ZS5zb3J0aW5nS2V5ID09IFwic2NvcmVUaW1lXCIgKSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcInNjb3JlVGltZVwiLCBhc2NlbmRpbmcgOiAhdGhpcy5zdGF0ZS5hc2NlbmRpbmcgfSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc2V0U3RhdGUgKHsgc29ydGluZ0tleSA6IFwic2NvcmVUaW1lXCIsIGFzY2VuZGluZyA6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgfX0+VGltZSAoUGVuYWx0eSk8L3RoPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAge2NvbXB9XHJcbiAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgIDwvdGFibGU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5jbGFzcyBOdW1iZXJPZkNvbG9yQ29udGVzdGFudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc29ydGluZ0tleSA6IFwicmF0aW5nXCIsXHJcbiAgICAgIGFzY2VuZGluZyA6IGZhbHNlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgZGF0YSA9IG5ldyBBcnJheSggcmF0aW5nLmxiLmxlbmd0aCApO1xyXG4gICAgZm9yKGxldCBpPTA7IGk8ZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGRhdGFbaV0gPSB7IHJhdGluZzppLCBjb250ZXN0YW50czowIH07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wcm9wcy5zdGFuZGluZ3MuZm9yRWFjaCggKHMpPT57XHJcbiAgICAgIGlmKHMuZWxhcHNlZF90aW1lID09PSBcIjBcIikge1xyXG4gICAgICAgIGxldCBwYXJ0aWNpcGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgcy50YXNrcy5mb3JFYWNoKCAodCk9PntcclxuICAgICAgICAgIGlmKHQuc2NvcmUgIT09IHVuZGVmaW5lZCkgcGFydGljaXBhdGluZyA9IHRydWU7XHJcbiAgICAgICAgfSApO1xyXG4gICAgICAgIGlmKCBwYXJ0aWNpcGF0aW5nID09PSBmYWxzZSApIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbGV2ZWwgPSByYXRpbmcuZ2V0TGV2ZWwoIHMucmF0aW5nICk7XHJcbiAgICAgIGRhdGFbbGV2ZWxdLmNvbnRlc3RhbnRzICs9IDE7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgZGF0YSA9IGRhdGEuc2xpY2UoMSk7XHJcblxyXG4gICAgZGF0YS5zb3J0KCAoeCx5KSA9PiB7XHJcbiAgICAgIGxldCByZXMgPSB4W3RoaXMuc3RhdGUuc29ydGluZ0tleV0gPCB5W3RoaXMuc3RhdGUuc29ydGluZ0tleV07XHJcbiAgICAgIHJlcyA9IHRoaXMuc3RhdGUuYXNjZW5kaW5nP3JlczohcmVzO1xyXG4gICAgICByZXR1cm4gcmVzID8gLTEgOiAxO1xyXG4gICAgfSApO1xyXG5cclxuICAgIGxldCBjb21wID0gZGF0YS5tYXAoIChkLCBpZHgpID0+IHtcclxuICAgICAgcmV0dXJuKFxyXG4gICAgICAgIDx0ciBrZXk9e2lkeH0+XHJcbiAgICAgICAgICA8dGQ+PHNwYW4gc3R5bGU9e3tjb2xvciA6IHJhdGluZy5jb2xvck9yaWdpbmFsW2QucmF0aW5nXX19PntyYXRpbmcubGJbZC5yYXRpbmddfSAtIDwvc3Bhbj48L3RkPlxyXG4gICAgICAgICAgPHRkPntkLmNvbnRlc3RhbnRzfTwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgKTtcclxuICAgIH0gKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMz5OdW1iZXIgb2YgQ29udGVzdGFudHMgKENvbG9yKTwvaDM+XHJcbiAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWNvbmRlbnNlZFwiPlxyXG4gICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgPHRoIG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgICAgICBpZiggdGhpcy5zdGF0ZS5zb3J0aW5nS2V5ID09IFwicmF0aW5nXCIgKSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcInJhdGluZ1wiLCBhc2NlbmRpbmcgOiAhdGhpcy5zdGF0ZS5hc2NlbmRpbmcgfSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc2V0U3RhdGUgKHsgc29ydGluZ0tleSA6IFwicmF0aW5nXCIsIGFzY2VuZGluZyA6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgIH19PlJhdGluZzwvdGg+XHJcbiAgICAgICAgICAgICAgPHRoIG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgICAgICBpZiggdGhpcy5zdGF0ZS5zb3J0aW5nS2V5ID09IFwiY29udGVzdGFudHNcIiApIHRoaXMuc2V0U3RhdGUgKHsgc29ydGluZ0tleSA6IFwiY29udGVzdGFudHNcIiwgYXNjZW5kaW5nIDogIXRoaXMuc3RhdGUuYXNjZW5kaW5nIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcImNvbnRlc3RhbnRzXCIsIGFzY2VuZGluZyA6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgIH19PkNvbnRlc3RhbnRzPC90aD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgIHtjb21wfVxyXG4gICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICA8L3RhYmxlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuY2xhc3MgTnVtYmVyT2ZDb3VudHJ5Q29udGVzdGFudHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc29ydGluZ0tleSA6IFwiY29udGVzdGFudHNcIixcclxuICAgICAgYXNjZW5kaW5nIDogZmFsc2VcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGxldCBkYXRhID0ge307XHJcblxyXG4gICAgdGhpcy5wcm9wcy5zdGFuZGluZ3MuZm9yRWFjaCggKHMpPT57XHJcbiAgICAgIGlmKHMuZWxhcHNlZF90aW1lID09PSBcIjBcIikge1xyXG4gICAgICAgIGxldCBwYXJ0aWNpcGF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgcy50YXNrcy5mb3JFYWNoKCAodCk9PntcclxuICAgICAgICAgIGlmKHQuc2NvcmUgIT09IHVuZGVmaW5lZCkgcGFydGljaXBhdGluZyA9IHRydWU7XHJcbiAgICAgICAgfSApO1xyXG4gICAgICAgIGlmKCBwYXJ0aWNpcGF0aW5nID09PSBmYWxzZSApIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY291bnRyeSA9IHMuY291bnRyeTtcclxuXHJcbiAgICAgIGlmKCBkYXRhW2NvdW50cnldID09PSB1bmRlZmluZWQgKXtcclxuICAgICAgICBkYXRhW2NvdW50cnldID0ge1xyXG4gICAgICAgICAgY291bnRyeSA6IGNvdW50cnksXHJcbiAgICAgICAgICBjb250ZXN0YW50cyA6IDFcclxuICAgICAgICB9O1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBkYXRhW2NvdW50cnldLmNvbnRlc3RhbnRzICs9IDE7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGRhdGEgPSBPYmplY3Qua2V5cyhkYXRhKS5tYXAoIChjKSA9PiB7XHJcbiAgICAgIHJldHVybiBkYXRhW2NdO1xyXG4gICAgfSApO1xyXG5cclxuICAgIGRhdGEuc29ydCggKHgseSkgPT4ge1xyXG4gICAgICBsZXQgcmVzID0geFt0aGlzLnN0YXRlLnNvcnRpbmdLZXldIDwgeVt0aGlzLnN0YXRlLnNvcnRpbmdLZXldO1xyXG4gICAgICByZXMgPSB0aGlzLnN0YXRlLmFzY2VuZGluZz9yZXM6IXJlcztcclxuICAgICAgcmV0dXJuIHJlcyA/IC0xIDogMTtcclxuICAgIH0gKTtcclxuXHJcbiAgICBsZXQgY29tcCA9IGRhdGEubWFwKCAoZCwgaWR4KSA9PiB7XHJcbiAgICAgIHJldHVybihcclxuICAgICAgICA8dHIga2V5PXtpZHh9PlxyXG4gICAgICAgICAgPHRkPjxpbWcgc3JjPXtgL2ltZy9mbGFnLyR7ZC5jb3VudHJ5fS5wbmdgfSBzdHlsZT17e3ZlcnRpY2FsQWxpZ246IFwibWlkZGxlXCIsIHdpZHRoOiBcIjE2cHhcIiwgaGVpZ2h0OiBcIjE2cHhcIn19IC8+IHtjb3VudHJpZXNbZC5jb3VudHJ5XX08L3RkPlxyXG4gICAgICAgICAgPHRkPntkLmNvbnRlc3RhbnRzfTwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgKTtcclxuICAgIH0gKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMz5OdW1iZXIgb2YgQ29udGVzdGFudHMgKENvdW50cnkpPC9oMz5cclxuICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtY29uZGVuc2VkXCI+XHJcbiAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICA8dGggb25DbGljaz17KCk9PntcclxuICAgICAgICAgICAgICAgIGlmKCB0aGlzLnN0YXRlLnNvcnRpbmdLZXkgPT0gXCJjb3VudHJ5XCIgKSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcImNvdW50cnlcIiwgYXNjZW5kaW5nIDogIXRoaXMuc3RhdGUuYXNjZW5kaW5nIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB0aGlzLnNldFN0YXRlICh7IHNvcnRpbmdLZXkgOiBcImNvdW50cnlcIiwgYXNjZW5kaW5nIDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICB9fT5Db3VudHJ5PC90aD5cclxuICAgICAgICAgICAgICA8dGggb25DbGljaz17KCk9PntcclxuICAgICAgICAgICAgICAgIGlmKCB0aGlzLnN0YXRlLnNvcnRpbmdLZXkgPT0gXCJjb250ZXN0YW50c1wiICkgdGhpcy5zZXRTdGF0ZSAoeyBzb3J0aW5nS2V5IDogXCJjb250ZXN0YW50c1wiLCBhc2NlbmRpbmcgOiAhdGhpcy5zdGF0ZS5hc2NlbmRpbmcgfSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuc2V0U3RhdGUgKHsgc29ydGluZ0tleSA6IFwiY29udGVzdGFudHNcIiwgYXNjZW5kaW5nIDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgfX0+Q29udGVzdGFudHM8L3RoPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAge2NvbXB9XHJcbiAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgIDwvdGFibGU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0c1N1bW1hcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5nZW5EYXRhc2V0LmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBnZW5EYXRhc2V0KCl7XHJcbiAgICBjb25zdCBsYWJlbHMgPSByYXRpbmcubGIuc2xpY2UoMSkubWFwKCAocikgPT4gU3RyaW5nKHIpICsgXCIgLVwiICk7XHJcbiAgICBjb25zdCBjb2xvciA9IHJhdGluZy5jb2xvci5zbGljZSgxKTtcclxuICAgIGxldCBjb3VudCA9IHJhdGluZy5jb2xvci5tYXAoICgpID0+IChuZXcgTWFwKCkpICk7XHJcbiAgICBsZXQgc2NvcmVEaXN0cmlidXRpb24gPSBuZXcgU2V0KCk7XHJcbiAgICB0aGlzLnByb3BzLnN0YW5kaW5ncy5mb3JFYWNoKCAocikgPT4ge1xyXG4gICAgICBpZiggci50YXNrcy5tYXAoICh0KT0+dC5lbGFwc2VkX3RpbWUgIT09IHVuZGVmaW5lZCA/IDEgOiAwICkucmVkdWNlKCAoYSxiKT0+YStiICkgIT09IDAgKXtcclxuICAgICAgICBjb25zdCBsZXZlbCA9IHJhdGluZy5nZXRMZXZlbCggci5yYXRpbmcgKTtcclxuICAgICAgICBjb25zdCBzY29yZSA9IHIuc2NvcmUvMTAwO1xyXG4gICAgICAgIHNjb3JlRGlzdHJpYnV0aW9uLmFkZChzY29yZSk7XHJcbiAgICAgICAgY291bnRbbGV2ZWxdLnNldCggc2NvcmUsIGNvdW50W2xldmVsXS5oYXMoc2NvcmUpID8gY291bnRbbGV2ZWxdLmdldChzY29yZSkgKyAxIDogMSApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGxldCBzY29yZXMgPSBbLi4uc2NvcmVEaXN0cmlidXRpb25dLnNvcnQoIChhLGIpID0+IHsgcmV0dXJuIGE8YiA/IC0xIDogMX0gKTtcclxuICAgIGxldCBkYXRhID0gcmF0aW5nLmxiLm1hcCggKCkgPT4gKG5ldyBBcnJheShzY29yZXMubGVuZ3RoKSkuZmlsbCgwKSApO1xyXG4gICAgY291bnQuZm9yRWFjaCggKGMsIGxldmVsKSA9PiB7XHJcbiAgICAgIGMuZm9yRWFjaCggKGNudCwgc2NvcmUgKSA9PiB7XHJcbiAgICAgICAgZGF0YVtsZXZlbF1bIHNjb3Jlcy5pbmRleE9mKHNjb3JlKSBdID0gY250O1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGRhdGFzZXQgPSB7XHJcbiAgICAgIHR5cGUgOiAnYmFyJyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGxhYmVsczogc2NvcmVzLFxyXG4gICAgICAgIGRhdGFzZXRzOiBkYXRhLnNsaWNlKDEpLm1hcCggKGQsIGkpID0+IHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbHNbaV0sXHJcbiAgICAgICAgICAgIGRhdGE6IGQsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3JbaV1cclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIG1haW50YWluQXNwZWN0UmF0aW8gOiBmYWxzZSxcclxuICAgICAgICBzY2FsZXM6IHtcclxuICAgICAgICAgIHhBeGVzOiBbe1xyXG4gICAgICAgICAgICBkaXNwbGF5OnRydWUsXHJcbiAgICAgICAgICAgIHNjYWxlTGFiZWw6e1xyXG4gICAgICAgICAgICAgIGRpc3BsYXk6dHJ1ZSxcclxuICAgICAgICAgICAgICBsYWJlbFN0cmluZzogXCJTY29yZVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpY2tzOiB7XHJcbiAgICAgICAgICAgICAgYmVnaW5BdFplcm86dHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XSxcclxuICAgICAgICAgIHlBeGVzOiBbe1xyXG4gICAgICAgICAgICBkaXNwbGF5OnRydWUsXHJcbiAgICAgICAgICAgIHNjYWxlTGFiZWw6e1xyXG4gICAgICAgICAgICAgIGRpc3BsYXk6dHJ1ZSxcclxuICAgICAgICAgICAgICBsYWJlbFN0cmluZzogXCJQZW9wbGVcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhY2tlZDogdHJ1ZVxyXG4gICAgICAgICAgfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuaW1hdGlvbiA6IHtcclxuICAgICAgICAgIGFuaW1hdGU6IGZhbHNlLFxyXG4gICAgICAgICAgYW5pbWF0ZVNjYWxlIDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gZGF0YXNldDtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPHA+XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy5jb250ZXN0LmNvbnRlc3RFbmRlZCA/IDxzcGFuPlRoaXMgc3RhdHMgaXMgdW5vZmZpY2lhbC4gWW91IGNhbiBjaGVjayB0aGUgb2ZmaWNpYWwgc3RhdHMgPGEgaHJlZj1cIi4vc3RhdGlzdGljc1wiIHRhcmdldD1cIl9ibGFua1wiPmhlcmU8L2E+Ljwvc3Bhbj46IG51bGx9XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8aDM+U2NvcmUgRGlzdHJpYnV0aW9uPC9oMz5cclxuICAgICAgICAgIDxDaGFydENvbXBvbmVudCBjYW52YXNJZD1cImNoYXJ0U3VtbWFyeVwiIGRhdGFzZXQ9e3RoaXMuZ2VuRGF0YXNldCgpfSB3aWR0aD1cIjUwMFwiIGhlaWdodD1cIjI4MFwiLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8VG9wT2ZDb2xvcnMgc3RhbmRpbmdzPXt0aGlzLnByb3BzLnN0YW5kaW5nc30vPlxyXG4gICAgICAgIDxUb3BPZkNvdW50cmllcyBzdGFuZGluZ3M9e3RoaXMucHJvcHMuc3RhbmRpbmdzfS8+XHJcbiAgICAgICAgPE51bWJlck9mQ29sb3JDb250ZXN0YW50cyBzdGFuZGluZ3M9e3RoaXMucHJvcHMuc3RhbmRpbmdzfS8+XHJcbiAgICAgICAgPE51bWJlck9mQ291bnRyeUNvbnRlc3RhbnRzIHN0YW5kaW5ncz17dGhpcy5wcm9wcy5zdGFuZGluZ3N9Lz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSIsImltcG9ydCB7cmF0aW5nfSBmcm9tICcuLi91dGlsLmpzJ1xyXG5pbXBvcnQgQ2hhcnRDb21wb25lbnQgZnJvbSAnLi9jaGFydENvbXBvbmVudC5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzVGFzayBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICAvKipcclxuICAqIHRhc2sgXHJcbiAgKiBzdGFuZGluZ3NcclxuICAqL1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMudGltZVN0ZXAgPSA1ICogNjA7XHJcblxyXG5cclxuICAgIHRoaXMuZ2V0TWF4U2NvcmUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZ2V0U3RhdHNWYWx1ZXMuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuZ2VuZXJhdGVEYXRhc2V0LmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICBnZXRNYXhTY29yZSgpe1xyXG4gICAgbGV0IG1heFNjb3JlID0gMDtcclxuICAgIHRoaXMucHJvcHMuc3RhbmRpbmdzLmZvckVhY2goIChkYXRhKSA9PiB7XHJcbiAgICAgIGNvbnN0IGQgPSBkYXRhLnRhc2tzWyB0aGlzLnByb3BzLnRhc2suaWQgXTtcclxuICAgICAgaWYoIGQuc2NvcmUgPT09IHVuZGVmaW5lZCApIHJldHVybjtcclxuICAgICAgbWF4U2NvcmUgPSBNYXRoLm1heChtYXhTY29yZSwgTnVtYmVyKGQuc2NvcmUpKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1heFNjb3JlO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhdHNWYWx1ZXMoc3RhbmRpbmdzKXtcclxuICAgIGxldCByZXMgPSB7fVxyXG4gICAgdHJ5e1xyXG4gICAgICByZXMubnVtQUMgPSAwO1xyXG4gICAgICByZXMubnVtV0EgPSAwO1xyXG4gICAgICByZXMubnVtUGVvcGxlVHJpZWQgPSAwO1xyXG4gICAgICByZXMubnVtU3VibWlzc2lvbnMgPSAwO1xyXG4gICAgICByZXMuZmlyc3RBY2NlcHRlZFRpbWUgPSAwO1xyXG4gICAgICByZXMuZmlyc3RBY2NlcHRlZFBlcnNvbiA9IFtdO1xyXG5cclxuICAgICAgbGV0IHRpbWVTdW0gPSAwO1xyXG5cclxuICAgICAgcmVzLm51bUNvbnRlc3RhbnRzID0gMDtcclxuXHJcbiAgICAgIC8vc2V0IEZBXHJcbiAgICAgIHN0YW5kaW5ncy5mb3JFYWNoKCAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGQgPSBkYXRhLnRhc2tzWyB0aGlzLnByb3BzLnRhc2suaWQgXTtcclxuICAgICAgICBpZiggZC5zY29yZSA9PT0gdW5kZWZpbmVkICkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiggdGhpcy5tYXhTY29yZSA9PSAwIHx8IGQuc2NvcmUgIT0gdGhpcy5tYXhTY29yZSl7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiggcmVzLmZpcnN0QWNjZXB0ZWRUaW1lID09IDAgKSByZXMuZmlyc3RBY2NlcHRlZFRpbWUgPSBOdW1iZXIoZC5lbGFwc2VkX3RpbWUpO1xyXG4gICAgICAgIGVsc2UgcmVzLmZpcnN0QWNjZXB0ZWRUaW1lID0gTWF0aC5taW4ocmVzLmZpcnN0QWNjZXB0ZWRUaW1lLCBOdW1iZXIoZC5lbGFwc2VkX3RpbWUpICk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy9zZXQgb3RoZXIgcGFyYW1zXHJcbiAgICAgIHN0YW5kaW5ncy5mb3JFYWNoKCAoZGF0YSkgPT4ge1xyXG4gICAgICAgIC8vY29udGVzdGFudCBtYWRlIGF0IGxlYXN0IG9uZSBzdWJtaXNzaW9uXHJcbiAgICAgICAgaWYoIGRhdGEudGFza3MubWFwKCAodCk9PnQuZWxhcHNlZF90aW1lICE9PSB1bmRlZmluZWQgPyAxIDogMCApLnJlZHVjZSggKGEsYik9PmErYiApICE9PSAwICkgcmVzLm51bUNvbnRlc3RhbnRzKys7XHJcblxyXG4gICAgICAgIGNvbnN0IGQgPSBkYXRhLnRhc2tzWyB0aGlzLnByb3BzLnRhc2suaWQgXTtcclxuICAgICAgICBpZiggZC5zY29yZSA9PT0gdW5kZWZpbmVkICkgcmV0dXJuO1xyXG5cclxuICAgICAgICByZXMubnVtUGVvcGxlVHJpZWQgKz0gMTtcclxuICAgICAgICByZXMubnVtU3VibWlzc2lvbnMgKz0gZC5mYWlsdXJlO1xyXG4gICAgICAgIGlmKCBkLnNjb3JlICE9IDAgKSByZXMubnVtU3VibWlzc2lvbnMgKz0gMTtcclxuXHJcbiAgICAgICAgaWYoIHRoaXMubWF4U2NvcmUgPT0gMCB8fCBkLnNjb3JlICE9IHRoaXMubWF4U2NvcmUpe1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzLm51bUFDICs9IDE7XHJcbiAgICAgICAgcmVzLm51bVdBICs9IGQuZmFpbHVyZTtcclxuICAgICAgICB0aW1lU3VtICs9IGQuZWxhcHNlZF90aW1lO1xyXG5cclxuICAgICAgICBpZiggcmVzLmZpcnN0QWNjZXB0ZWRUaW1lID09IGQuZWxhcHNlZF90aW1lICl7XHJcbiAgICAgICAgICByZXMuZmlyc3RBY2NlcHRlZFBlcnNvbi5wdXNoKCByYXRpbmcuZ2VuZXJhdGVDb2xvcmVkTmFtZSggZGF0YS51c2VyX3NjcmVlbl9uYW1lLCBkYXRhLnJhdGluZyApICk7XHJcbiAgICAgICAgICByZXMuZmlyc3RBY2NlcHRlZFBlcnNvbi5wdXNoKCBcIiBcIiApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYoIHJlcy5udW1BQyA9PSAwICl7XHJcbiAgICAgICAgcmVzLmF2ZXJhZ2VUaW1lID0gMDtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgcmVzLmF2ZXJhZ2VUaW1lID0gTWF0aC5yb3VuZCh0aW1lU3VtIC8gcmVzLm51bUFDKTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICB9Y2F0Y2goZSl7XHJcbiAgICAgIGNvbnNvbGUubG9nKCBcImZhaWxlZCB0byBnZW5lcmF0ZSBzdGF0c1wiICk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCBlICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlRGF0YXNldCgpe1xyXG4gICAgY29uc3QgbGFiZWxzID0gcmF0aW5nLmxiLnNsaWNlKDEpLm1hcCggKHIpID0+IFN0cmluZyhyKSArIFwiLVwiICk7XHJcbiAgICBjb25zdCBjb2xvciA9IHJhdGluZy5jb2xvci5zbGljZSgxKTtcclxuICAgIGNvbnN0IGNvbnRlc3REdXJhdGlvbiA9ICh0aGlzLnByb3BzLmNvbnRlc3QuZW5kVGltZS5nZXRUaW1lKCkgLSB0aGlzLnByb3BzLmNvbnRlc3Quc3RhcnRUaW1lLmdldFRpbWUoKSkvMTAwMDtcclxuXHJcbiAgICAvLyBzZXQgc29sdmVkIGhpc3RvZ3JhbVxyXG4gICAgbGV0IGRhdGEgPSByYXRpbmcubGIubWFwKCAoKSA9PiAobmV3IEFycmF5KCBNYXRoLmZsb29yKCAoY29udGVzdER1cmF0aW9uK3RoaXMudGltZVN0ZXAtMSkgLyB0aGlzLnRpbWVTdGVwICkgKSkuZmlsbCgwKSApO1xyXG4gICAgdGhpcy5wcm9wcy5zdGFuZGluZ3MuZm9yRWFjaCggKHIpID0+IHtcclxuICAgICAgY29uc3QgdCA9IHIudGFza3NbIHRoaXMucHJvcHMudGFzay5pZCBdO1xyXG4gICAgICBpZiggdC5zY29yZSA9PT0gdGhpcy5tYXhTY29yZSApe1xyXG4gICAgICAgIGRhdGFbIHJhdGluZy5nZXRMZXZlbCggci5yYXRpbmcgKSBdWyBNYXRoLmZsb29yKHQuZWxhcHNlZF90aW1lIC8gdGhpcy50aW1lU3RlcCkgXSArPSAxO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIGRhdGFzZXQgZm9yIHRoZSBjaGFydFxyXG4gICAgY29uc3QgZGF0YXNldCA9IHtcclxuICAgICAgdHlwZSA6ICdiYXInLFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgbGFiZWxzIDogKCgpPT57XHJcbiAgICAgICAgICBsZXQgYXJyID0gbmV3IEFycmF5KCBNYXRoLmZsb29yKCAoY29udGVzdER1cmF0aW9uK3RoaXMudGltZVN0ZXAtMSkgLyB0aGlzLnRpbWVTdGVwICkgKTtcclxuICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGFycltpXSA9IGAkezUqaX0tYDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBhcnI7XHJcbiAgICAgICAgfSkoKSxcclxuICAgICAgICBkYXRhc2V0czogZGF0YS5zbGljZSgxKS5tYXAoIChkLCBpKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsYWJlbDogbGFiZWxzW2ldLFxyXG4gICAgICAgICAgICBkYXRhOiBkLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yW2ldXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAvL3Jlc3BvbnNpdmUgOiBmYWxzZSxcclxuICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvIDogZmFsc2UsXHJcbiAgICAgICAgc2NhbGVzOiB7XHJcbiAgICAgICAgICB4QXhlczogW3tcclxuICAgICAgICAgICAgZGlzcGxheTp0cnVlLFxyXG4gICAgICAgICAgICBzY2FsZUxhYmVsOntcclxuICAgICAgICAgICAgICBkaXNwbGF5OnRydWUsXHJcbiAgICAgICAgICAgICAgbGFiZWxTdHJpbmc6IFwiVGltZSBbbWluXVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpY2tzOiB7XHJcbiAgICAgICAgICAgICAgYmVnaW5BdFplcm86dHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XSxcclxuICAgICAgICAgIHlBeGVzOiBbe1xyXG4gICAgICAgICAgICBkaXNwbGF5OnRydWUsXHJcbiAgICAgICAgICAgIHNjYWxlTGFiZWw6e1xyXG4gICAgICAgICAgICAgIGRpc3BsYXk6dHJ1ZSxcclxuICAgICAgICAgICAgICBsYWJlbFN0cmluZzogXCJTb2x2ZWRcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgIGJlZ2luQXRaZXJvOnRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RhY2tlZDogdHJ1ZVxyXG4gICAgICAgICAgfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGFuaW1hdGlvbiA6IHtcclxuICAgICAgICAgIGFuaW1hdGU6IGZhbHNlLFxyXG4gICAgICAgICAgYW5pbWF0ZVNjYWxlIDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGRhdGFzZXQ7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIHRoaXMubWF4U2NvcmUgPSB0aGlzLmdldE1heFNjb3JlKCk7XHJcbiAgICBjb25zdCBkYXRhQWxsID0gdGhpcy5nZXRTdGF0c1ZhbHVlcyh0aGlzLnByb3BzLnN0YW5kaW5ncyk7XHJcbiAgICBjb25zdCByb3dBbGwgPSAoXHJcbiAgICAgIDx0cj5cclxuICAgICAgICA8dGQ+QUxMPC90ZD5cclxuICAgICAgICA8dGQ+e2RhdGFBbGwubnVtQUN9PC90ZD5cclxuICAgICAgICA8dGQ+e2RhdGFBbGwubnVtUGVvcGxlVHJpZWR9PC90ZD5cclxuICAgICAgICA8dGQ+e2RhdGFBbGwubnVtU3VibWlzc2lvbnN9PC90ZD5cclxuICAgICAgICB7Lyo8dGQ+eyggZGF0YUFsbC5udW1BQyAvIE1hdGgubWF4KDEsIGRhdGFBbGwubnVtU3VibWlzc2lvbnMpICogMTAwKS50b0ZpeGVkKDIpfSU8L3RkPiovfVxyXG4gICAgICAgIDx0ZD57KCBkYXRhQWxsLm51bUFDIC8gTWF0aC5tYXgoMSwgZGF0YUFsbC5udW1QZW9wbGVUcmllZCkgKiAxMDApLnRvRml4ZWQoMil9JTwvdGQ+XHJcbiAgICAgICAgPHRkPnsoIGRhdGFBbGwubnVtQUMgLyBNYXRoLm1heCgxLCBkYXRhQWxsLm51bUNvbnRlc3RhbnRzKSAqIDEwMCkudG9GaXhlZCgyKX0lPC90ZD5cclxuICAgICAgICA8dGQ+e2RhdGFBbGwuZmlyc3RBY2NlcHRlZFBlcnNvbn08YnIvPlxyXG4gICAgICAgIHtgJHtNYXRoLmZsb29yKCBkYXRhQWxsLmZpcnN0QWNjZXB0ZWRUaW1lLzYwICl9IG1pbiAke2RhdGFBbGwuZmlyc3RBY2NlcHRlZFRpbWUlNjB9IHNlY2B9XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgICA8dGQ+e2Ake01hdGguZmxvb3IoIGRhdGFBbGwuYXZlcmFnZVRpbWUvNjAgKX0gbWluICR7ZGF0YUFsbC5hdmVyYWdlVGltZSU2MH0gc2VjYH08L3RkPlxyXG4gICAgICAgIDx0ZD57KGRhdGFBbGwubnVtV0EgLyBNYXRoLm1heCgxLCBkYXRhQWxsLm51bUFDKSkudG9GaXhlZCgyKX08L3RkPlxyXG4gICAgICA8L3RyPlxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBkYXRhQ29sb3IgPSBbXTtcclxuICAgIGZvcihsZXQgcj0xOyByPD05OyByKyspe1xyXG4gICAgICBjb25zdCBjU3RhbmRpbmdzID0gdGhpcy5wcm9wcy5zdGFuZGluZ3MuZmlsdGVyKCAocyk9PntcclxuICAgICAgICByZXR1cm4gcmF0aW5nLmxiW3JdIDw9IHMucmF0aW5nICYmIHMucmF0aW5nIDwgcmF0aW5nLnViW3JdO1xyXG4gICAgICB9ICk7XHJcbiAgICAgIGRhdGFDb2xvci5wdXNoKCB0aGlzLmdldFN0YXRzVmFsdWVzKGNTdGFuZGluZ3MpICk7XHJcbiAgICB9XHJcbiAgICBjb25zdCByb3dDb2xvciA9IGRhdGFDb2xvci5tYXAoIChkYXRhLCBpZHgpID0+IHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8dHIga2V5PXtpZHh9PlxyXG4gICAgICAgICAgPHRkPjxzcGFuIHN0eWxlPXt7Y29sb3IgOiByYXRpbmcuY29sb3JPcmlnaW5hbFtpZHgrMV19fT57cmF0aW5nLmxiW2lkeCsxXX0gLSA8L3NwYW4+PC90ZD5cclxuICAgICAgICAgIDx0ZD57ZGF0YS5udW1BQ308L3RkPlxyXG4gICAgICAgICAgPHRkPntkYXRhLm51bVBlb3BsZVRyaWVkfTwvdGQ+XHJcbiAgICAgICAgICA8dGQ+e2RhdGEubnVtU3VibWlzc2lvbnN9PC90ZD5cclxuICAgICAgICAgIHsvKjx0ZD57KCBkYXRhLm51bUFDIC8gTWF0aC5tYXgoMSwgZGF0YS5udW1TdWJtaXNzaW9ucykgKiAxMDApLnRvRml4ZWQoMil9JTwvdGQ+Ki99XHJcbiAgICAgICAgICA8dGQ+eyggZGF0YS5udW1BQyAvIE1hdGgubWF4KDEsIGRhdGEubnVtUGVvcGxlVHJpZWQpICogMTAwKS50b0ZpeGVkKDIpfSU8L3RkPlxyXG4gICAgICAgICAgPHRkPnsoIGRhdGEubnVtQUMgLyBNYXRoLm1heCgxLCBkYXRhLm51bUNvbnRlc3RhbnRzKSAqIDEwMCkudG9GaXhlZCgyKX0lPC90ZD5cclxuICAgICAgICAgIDx0ZD57ZGF0YS5maXJzdEFjY2VwdGVkUGVyc29ufTxici8+XHJcbiAgICAgICAgICB7YCR7TWF0aC5mbG9vciggZGF0YS5maXJzdEFjY2VwdGVkVGltZS82MCApfSBtaW4gJHtkYXRhLmZpcnN0QWNjZXB0ZWRUaW1lJTYwfSBzZWNgfVxyXG4gICAgICAgICAgPC90ZD5cclxuICAgICAgICAgIDx0ZD57YCR7TWF0aC5mbG9vciggZGF0YS5hdmVyYWdlVGltZS82MCApfSBtaW4gJHtkYXRhLmF2ZXJhZ2VUaW1lJTYwfSBzZWNgfTwvdGQ+XHJcbiAgICAgICAgICA8dGQ+eyhkYXRhLm51bVdBIC8gTWF0aC5tYXgoMSwgZGF0YS5udW1BQykpLnRvRml4ZWQoMil9PC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICApO1xyXG4gICAgfSApLnJldmVyc2UoKTtcclxuXHJcbiAgICB0cnl7XHJcbiAgICAgIGNvbnN0IHJlcyA9IChcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgPGgzPnsnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonW3RoaXMucHJvcHMudGFzay5pZF19IDoge3RoaXMucHJvcHMudGFzay5uYW1lfTwvaDM+XHJcbiAgICAgICAgICA8aDQ+PHNwYW4gdGl0bGU9XCJ0aGUgbWF4IHNjb3JlIGNvbnRlc3RhbnRzIGdvdC4gdGhpcyBtYXkgYmUgcGFydGlhbCBzY29yZVwiPk1heCBTY29yZTwvc3Bhbj4gOiB7dGhpcy5tYXhTY29yZSAvIDEwMH08L2g0PlxyXG4gICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWNvbmRlbnNlZFwiPlxyXG4gICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgPHRoPlJhdGluZzwvdGg+XHJcbiAgICAgICAgICAgICAgICA8dGg+PHNwYW4gdGl0bGU9XCJudW1iZXIgb2YgcGVvcGxlIHdobyBnb3QgbWF4IHNjb3JlIChtYXkgYmUgcGFydGlhbCBzY29yZSlcIj5BQzwvc3Bhbj48L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPjxzcGFuIHRpdGxlPVwibnVtYmVyIG9mIHBlb3BsZSB3aG8gbWFkZSBhdCBsZWFzdCBvbmUgc3VibWlzc2lvbiBmb3IgdGhpcyB0YXNrXCI+QXR0ZW1wdGVkPC9zcGFuPjwvdGg+XHJcbiAgICAgICAgICAgICAgICA8dGg+PHNwYW4gdGl0bGU9XCJudW1iZXIgb2Ygc3VibWlzc2lvbnMgZm9yIHRoaXMgdGFza1wiPlN1Ym1pc3Npb25zPC9zcGFuPjwvdGg+XHJcbiAgICAgICAgICAgICAgICB7Lyo8dGg+QUMgLyBTdWJtaXNzaW9uczwvdGg+Ki99XHJcbiAgICAgICAgICAgICAgICA8dGg+QUMgLyBBdHRlbXB0ZWQ8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPkFDIC8gQ29udGVzdGFudHM8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPkZhc3Rlc3Q8L3RoPlxyXG4gICAgICAgICAgICAgICAgPHRoPkF2ZXJhZ2UgVGltZTwvdGg+XHJcbiAgICAgICAgICAgICAgICA8dGg+QXZlcmFnZSBXQTwvdGg+XHJcbiAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgIHtyb3dBbGx9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGgzPkFDIFRpbWUgRGlzdHJpYnV0aW9uPC9oMz5cclxuICAgICAgICAgICAgPENoYXJ0Q29tcG9uZW50IGNhbnZhc0lkPXtgdGFza0NoYXJ0XyR7dGhpcy5wcm9wcy50YXNrLmlkfWB9IGRhdGFzZXQ9e3RoaXMuZ2VuZXJhdGVEYXRhc2V0KCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjgwMFwiIGhlaWdodD1cIjM0MFwiIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxoMz5Db2xvciBTdGF0czwvaDM+XHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1jb25kZW5zZWRcIj5cclxuICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgIDx0aD5SYXRpbmc8L3RoPlxyXG4gICAgICAgICAgICAgICAgICA8dGg+PHNwYW4gdGl0bGU9XCJudW1iZXIgb2YgcGVvcGxlIHdobyBnb3QgbWF4IHNjb3JlIChtYXkgYmUgcGFydGlhbCBzY29yZSlcIj5BQzwvc3Bhbj48L3RoPlxyXG4gICAgICAgICAgICAgICAgICA8dGg+PHNwYW4gdGl0bGU9XCJudW1iZXIgb2YgcGVvcGxlIHdobyBtYWRlIGF0IGxlYXN0IG9uZSBzdWJtaXNzaW9uIGZvciB0aGlzIHRhc2tcIj5BdHRlbXB0ZWQ8L3NwYW4+PC90aD5cclxuICAgICAgICAgICAgICAgICAgPHRoPjxzcGFuIHRpdGxlPVwibnVtYmVyIG9mIHN1Ym1pc3Npb25zIGZvciB0aGlzIHRhc2tcIj5TdWJtaXNzaW9uczwvc3Bhbj48L3RoPlxyXG4gICAgICAgICAgICAgICAgICB7Lyo8dGg+QUMgLyBTdWJtaXNzaW9uczwvdGg+Ki99XHJcbiAgICAgICAgICAgICAgICAgIDx0aD5BQyAvIEF0dGVtcHRlZDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgIDx0aD5BQyAvIENvbnRlc3RhbnRzPC90aD5cclxuICAgICAgICAgICAgICAgICAgPHRoPkZhc3Rlc3Q8L3RoPlxyXG4gICAgICAgICAgICAgICAgICA8dGg+QXZlcmFnZSBUaW1lPC90aD5cclxuICAgICAgICAgICAgICAgICAgPHRoPkF2ZXJhZ2UgV0E8L3RoPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgIHtyb3dDb2xvcn1cclxuICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiByZXM7XHJcbiAgICB9Y2F0Y2goZSl7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJjbGFzcyBVc2VySW5mb3tcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgbGV0IGNvb2tpZSA9IHt9O1xyXG4gICAgZG9jdW1lbnQuY29va2llLnNwbGl0KC87XFxzLykuZm9yRWFjaCggKHMpID0+IHtcclxuICAgIC8vXCJfdXNlcl9zY3JlZW5fbmFtZT1rb3l1bWVpc2hpOyBfX3ByaXZpbGVnZT1jb250ZXN0YW50OyBfdXNlcl9pZD0xMTQwODsgX3VzZXJfbmFtZT1rb3l1bWVpc2hpXCIuc3BsaXQoLztcXHMvKS5mb3JFYWNoKCAocykgPT4ge1xyXG4gICAgICBsZXQgW2tleSwgdmFsdWVdID0gcy5zcGxpdCgvPS8pO1xyXG4gICAgICBjb29raWVba2V5XSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jb250ZXN0YW50ID0gZmFsc2U7XHJcbiAgICBpZiggXCJfX3ByaXZpbGVnZVwiIGluIGNvb2tpZSAmJiBjb29raWUuX19wcml2aWxlZ2UgPT09IFwiY29udGVzdGFudFwiKXtcclxuICAgICAgdGhpcy5jb250ZXN0YW50ID0gdHJ1ZTtcclxuICAgICAgdGhpcy51c2VyX3NjcmVlbl9uYW1lID0gY29va2llLl91c2VyX3NjcmVlbl9uYW1lO1xyXG4gICAgICB0aGlzLnVzZXJfaWQgPSBOdW1iZXIoIGNvb2tpZS5fdXNlcl9pZCApO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2codGhpcyk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBtZSA9IG5ldyBVc2VySW5mbygpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWU7XHJcbiIsImZ1bmN0aW9uIGdldFN0YW5kaW5ncyggY2FsbGJhY2ssIGluaXRpYWxpemUgKXtcclxuICBjb25zdCByZWcgPSAvXFxzKmRhdGE6XFxzKFxcWy4qXFxdKSwvO1xyXG5cclxuICBpZihpbml0aWFsaXplKXtcclxuICAgIGNvbnN0IHNjcmlwdFRleHQgPSAkKFwiaHRtbFwiKS5maW5kKCdzY3JpcHRbdHlwZT1cInRleHQvSmF2YVNjcmlwdFwiXScpLnRleHQoKS5zcGxpdChcIlxcblwiKTtcclxuXHJcbiAgICBzY3JpcHRUZXh0LmZvckVhY2goICh0eHQpID0+IHtcclxuICAgICAgY29uc3QgcmVzID0gcmVnLmV4ZWModHh0KTtcclxuICAgICAgaWYocmVzICE9PSBudWxsKXtcclxuICAgICAgICBjb25zdCBuZXdTdGFuZGluZ3MgPSBKU09OLnBhcnNlKHJlc1sxXSk7XHJcbiAgICAgICAgY2FsbGJhY2soIG5ld1N0YW5kaW5ncyApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9ZWxzZXtcclxuICAgICQuYWpheCgge3VybDogXCIuL3N0YW5kaW5nc1wifSApLmRvbmUoIChodG1sKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNjcmlwdFRleHQgPSAkKGh0bWwpLmZpbmQoJ3NjcmlwdFt0eXBlPVwidGV4dC9KYXZhU2NyaXB0XCJdJykudGV4dCgpLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgICBzY3JpcHRUZXh0LmZvckVhY2goICh0eHQpID0+IHtcclxuICAgICAgICBjb25zdCByZXMgPSByZWcuZXhlYyh0eHQpO1xyXG4gICAgICAgIGlmKHJlcyAhPT0gbnVsbCl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyggXCJzdWNjZXNzZnVsbHkgZ290IG5ldyBzdGFuZGluZ3MgOiBcIiwgcmVzWzFdICk7XHJcbiAgICAgICAgICBjb25zdCBuZXdTdGFuZGluZ3MgPSBKU09OLnBhcnNlKHJlc1sxXSk7XHJcbiAgICAgICAgICBjYWxsYmFjayggbmV3U3RhbmRpbmdzICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U29ydGluZ0Z1bmN0aW9uKCBrZXkgKXtcclxuICAvLyB0YXNre2l9XHJcbiAgaWYoIGtleS5zbGljZSgwLDQpID09IFwidGFza1wiICl7XHJcbiAgICBsZXQgaWQgPSBOdW1iZXIoIGtleS5zbGljZSg0KSApO1xyXG4gICAgcmV0dXJuIChsLHIpID0+IHtcclxuICAgICAgaWYoIGwudGFza3NbaWRdLnNjb3JlID09PSB1bmRlZmluZWQgJiYgci50YXNrc1tpZF0uc2NvcmUgPT09IHVuZGVmaW5lZCApIHJldHVybiAwO1xyXG4gICAgICBpZiggbC50YXNrc1tpZF0uc2NvcmUgPT09IHVuZGVmaW5lZCApIHJldHVybiAtMTtcclxuICAgICAgaWYoIHIudGFza3NbaWRdLnNjb3JlID09PSB1bmRlZmluZWQgKSByZXR1cm4gMTtcclxuICAgICAgaWYoIGwudGFza3NbaWRdLnNjb3JlICE9PSByLnRhc2tzW2lkXS5zY29yZSApe1xyXG4gICAgICAgIHJldHVybiBOdW1iZXIobC50YXNrc1tpZF0uc2NvcmUpIDwgTnVtYmVyKHIudGFza3NbaWRdLnNjb3JlKSA/IC0xIDogMTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgaWYoIGwudGFza3NbaWRdLnBlbmFsdHkgIT09IHIudGFza3NbaWRdLnBlbmFsdHkgKXtcclxuICAgICAgICAgIHJldHVybiBOdW1iZXIobC50YXNrc1tpZF0ucGVuYWx0eSkgPiBOdW1iZXIoci50YXNrc1tpZF0ucGVuYWx0eSkgPyAtMSA6IDE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG4gIGlmKCBrZXkgPT0gXCJ1c2VyX3NjcmVlbl9uYW1lXCIgKXtcclxuICAgIHJldHVybiAobCxyKSA9PntcclxuICAgICAgaWYoIGxba2V5XS50b0xvd2VyQ2FzZSgpICE9PSByW2tleV0udG9Mb3dlckNhc2UoKSApe1xyXG4gICAgICAgIHJldHVybiBsW2tleV0udG9Mb3dlckNhc2UoKSA8IHJba2V5XS50b0xvd2VyQ2FzZSgpID8gLTEgOiAxO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGlmKCBrZXkgPT0gXCJ0aW1lXCIgKXtcclxuICAgIHJldHVybiAobCxyKSA9PntcclxuICAgICAgaWYoIGwuc2NvcmUgIT09IHIuc2NvcmUgKSByZXR1cm4gTnVtYmVyKGwuc2NvcmUpID4gTnVtYmVyKHIuc2NvcmUpID8gLTEgOiAxO1xyXG4gICAgICBlbHNlIGlmKGwuZWxhcHNlZF90aW1lICE9PSByLmVsYXBzZWRfdGltZSkgcmV0dXJuIE51bWJlcihsLmVsYXBzZWRfdGltZSkgPCBOdW1iZXIoci5lbGFwc2VkX3RpbWUpID8gLTEgOiAxO1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKGwscikgPT4ge1xyXG4gICAgaWYoIGxba2V5XSAhPT0gcltrZXldICl7XHJcbiAgICAgIHJldHVybiAobFtrZXldKSA8IChyW2tleV0pID8gLTEgOiAxO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbmNsYXNzIFJhdGluZ3tcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgLy9bbGIsIHViKVxyXG4gICAgdGhpcy5sYiA9IFtcclxuICAgICAgLTEsIDAsICAgMSwgNDAwLCAgODAwLCAxMjAwLCAxNjAwLCAyMDAwLCAyNDAwLCAyODAwXHJcbiAgICBdO1xyXG4gICAgdGhpcy51YiA9IFtcclxuICAgICAgIDAsIDEsIDQwMCwgODAwLCAxMjAwLCAxNjAwLCAyMDAwLCAyNDAwLCAyODAwLCA1MDAwXHJcbiAgICBdO1xyXG5cclxuICAgIHRoaXMuY29sb3IgPSBbXHJcbiAgICAgIFwicmdiYSgxOTIsMCwxOTIsICAgMC41KVwiLCAvLyBcIiNDMDAwQzBcIixcclxuICAgICAgXCJyZ2JhKDAsMCwwLCAgICAgICAwLjUpXCIsIC8vIFwiIzAwMDAwMFwiLFxyXG4gICAgICBcInJnYmEoMTI4LDEyOCwxMjgsIDAuNSlcIiwgLy8gXCIjODA4MDgwXCIsXHJcbiAgICAgIFwicmdiYSgxMjgsNjQsMCwgICAgMC41KVwiLCAvLyBcIiM4MDQwMDBcIixcclxuICAgICAgXCJyZ2JhKDAsMTI4LDAsICAgICAwLjUpXCIsIC8vIFwiIzAwODAwMFwiLFxyXG4gICAgICBcInJnYmEoMCwxOTIsMTkyLCAgIDAuNSlcIiwgLy8gXCIjMDBDMEMwXCIsXHJcbiAgICAgIFwicmdiYSgwLDAsMjU1LCAgICAgMC41KVwiLCAvLyBcIiMwMDAwRkZcIixcclxuICAgICAgXCJyZ2JhKDE5MiwxOTIsMCwgICAwLjUpXCIsIC8vIFwiI0MwQzAwMFwiLFxyXG4gICAgICBcInJnYmEoMjU1LDEyOCwwLCAgIDAuNSlcIiwgLy8gXCIjRkY4MDAwXCIsXHJcbiAgICAgIFwicmdiYSgyNTUsMCwwLCAgICAgMC41KVwiICAvLyBcIiNGRjAwMDBcIlxyXG4gICAgXTtcclxuXHJcbiAgICB0aGlzLmNvbG9yT3JpZ2luYWwgPSBbXHJcbiAgICAgIFwiI0MwMDBDMFwiLFxyXG4gICAgICBcIiMwMDAwMDBcIixcclxuICAgICAgXCIjODA4MDgwXCIsXHJcbiAgICAgIFwiIzgwNDAwMFwiLFxyXG4gICAgICBcIiMwMDgwMDBcIixcclxuICAgICAgXCIjMDBDMEMwXCIsXHJcbiAgICAgIFwiIzAwMDBGRlwiLFxyXG4gICAgICBcIiNDMEMwMDBcIixcclxuICAgICAgXCIjRkY4MDAwXCIsXHJcbiAgICAgIFwiI0ZGMDAwMFwiXHJcbiAgICBdO1xyXG5cclxuICAgIHRoaXMudXNlckNvbG9yID0gW1xyXG4gICAgICBcInVzZXItYWRtaW5cIiwgLy8gXCIjQzAwMEMwXCIsXHJcbiAgICAgIFwidXNlci11bnJhdGVkXCIsIC8vIFwiIzAwMDAwMFwiLFxyXG4gICAgICBcInVzZXItZ3JheVwiLCAvLyBcIiM4MDgwODBcIixcclxuICAgICAgXCJ1c2VyLWJyb3duXCIsIC8vIFwiIzgwNDAwMFwiLFxyXG4gICAgICBcInVzZXItZ3JlZW5cIiwgLy8gXCIjMDA4MDAwXCIsXHJcbiAgICAgIFwidXNlci1jeWFuXCIsIC8vIFwiIzAwQzBDMFwiLFxyXG4gICAgICBcInVzZXItYmx1ZVwiLCAvLyBcIiMwMDAwRkZcIixcclxuICAgICAgXCJ1c2VyLXllbGxvd1wiLCAvLyBcIiNDMEMwMDBcIixcclxuICAgICAgXCJ1c2VyLW9yYW5nZVwiLCAvLyBcIiNGRjgwMDBcIixcclxuICAgICAgXCJ1c2VyLXJlZFwiICAvLyBcIiNGRjAwMDBcIlxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIGdldExldmVsKHJhdGluZyl7XHJcbiAgICBmb3IobGV0IGxldmVsPTA7IGxldmVsPHRoaXMuY29sb3IubGVuZ3RoOyBsZXZlbCsrKXtcclxuICAgICAgaWYoIHRoaXMubGJbbGV2ZWxdIDw9IHJhdGluZyAmJiByYXRpbmcgPCB0aGlzLnViW2xldmVsXSl7XHJcbiAgICAgICAgcmV0dXJuIGxldmVsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcblxyXG4gIGdldENvbG9yKHJhdGluZyl7XHJcbiAgICByZXR1cm4gdGhpcy5jb2xvclsgdGhpcy5nZXRMZXZlbChyYXRpbmcpIF07XHJcbiAgfVxyXG5cclxuICBnZXRDb2xvck9yaWdpbmFsKHJhdGluZyl7XHJcbiAgICByZXR1cm4gdGhpcy5jb2xvck9yaWdpbmFsWyB0aGlzLmdldExldmVsKHJhdGluZykgXTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlQ29sb3JlZE5hbWUoIHVzZXJfc2NyZWVuX25hbWUsIHJhdGluZyApe1xyXG4gICAgcmV0dXJuICg8YSBocmVmPXtgaHR0cHM6Ly9hdGNvZGVyLmpwL3VzZXIvJHt1c2VyX3NjcmVlbl9uYW1lfWB9XHJcbiAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHVzZXJuYW1lICR7dGhpcy51c2VyQ29sb3JbIHRoaXMuZ2V0TGV2ZWwocmF0aW5nKSBdfWB9XHJcbiAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXHJcbiAgICAgICAgICAgICAgIGtleT17YHVzZXItJHt1c2VyX3NjcmVlbl9uYW1lfWB9Pnt1c2VyX3NjcmVlbl9uYW1lfVxyXG4gICAgICAgICAgICA8L2E+KTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHJhdGluZyA9IG5ldyBSYXRpbmcoKTtcclxuXHJcbmNvbnN0IGNvdW50cmllcyA9IHtcclxuICBcIkFGXCI6XCJBZmdoYW5pc3RhblwiLFwiQUxcIjpcIkFsYmFuaWFcIixcIkRaXCI6XCJBbGdlcmlhXCIsXCJBRFwiOlwiQW5kb3JyYVwiLFwiQU9cIjpcIkFuZ29sYVwiLFwiQUdcIjpcIkFudGlndWEgYW5kIEJhcmJ1ZGFcIixcIkFSXCI6XCJBcmdlbnRpbmFcIixcIkFNXCI6XCJBcm1lbmlhXCIsXCJBVVwiOlwiQXVzdHJhbGlhXCIsXCJBVFwiOlwiQXVzdHJpYVwiLFwiQVpcIjpcIkF6ZXJiYWlqYW5cIixcIkJTXCI6XCJCYWhhbWFzXCIsXCJCSFwiOlwiQmFocmFpblwiLFwiQkRcIjpcIkJhbmdsYWRlc2hcIixcIkJCXCI6XCJCYXJiYWRvc1wiLFwiQllcIjpcIkJlbGFydXNcIixcIkJFXCI6XCJCZWxnaXVtXCIsXCJCWlwiOlwiQmVsaXplXCIsXCJCSlwiOlwiQmVuaW5cIixcIkJUXCI6XCJCaHV0YW5cIixcIkJPXCI6XCJCb2xpdmlhXCIsXCJCQVwiOlwiQm9zbmlhIGFuZCBIZXJ6ZWdvdmluYVwiLFwiQldcIjpcIkJvdHN3YW5hXCIsXCJCUlwiOlwiQnJhemlsXCIsXCJCTlwiOlwiQnJ1bmVpXCIsXCJCR1wiOlwiQnVsZ2FyaWFcIixcIkJGXCI6XCJCdXJraW5hIEZhc29cIixcIkJJXCI6XCJCdXJ1bmRpXCIsXCJLSFwiOlwiQ2FtYm9kaWFcIixcIkNNXCI6XCJDYW1lcm9vblwiLFwiQ0FcIjpcIkNhbmFkYVwiLFwiQ1ZcIjpcIkNhcGUgVmVyZGVcIixcIkNGXCI6XCJDZW50cmFsIEFmcmljYW4gUmVwdWJsaWNcIixcIlREXCI6XCJDaGFkXCIsXCJDTFwiOlwiQ2hpbGVcIixcIkNOXCI6XCJDaGluYVwiLFwiQ09cIjpcIkNvbG9tYmlhXCIsXCJLTVwiOlwiQ29tb3Jvc1wiLFwiQ0tcIjpcIkNvb2tcIixcIkNSXCI6XCJDb3N0YSBSaWNhXCIsXCJIUlwiOlwiQ3JvYXRpYVwiLFwiQ1VcIjpcIkN1YmFcIixcIkNZXCI6XCJDeXBydXNcIixcIkNaXCI6XCJDemVjaCBSZXB1YmxpY1wiLFwiQ0lcIjpcIkPDtHRlIGRcXCdJdm9pcmVcIixcIkNEXCI6XCJEZW1vY3JhdGljIFJlcHVibGljIG9mIHRoZSBDb25nb1wiLFwiREtcIjpcIkRlbm1hcmtcIixcIkRKXCI6XCJEamlib3V0aVwiLFwiRE1cIjpcIkRvbWluaWNhXCIsXCJET1wiOlwiRG9taW5pY2FuIFJlcHVibGljXCIsXCJFQ1wiOlwiRWN1YWRvclwiLFwiRUdcIjpcIkVneXB0XCIsXCJTVlwiOlwiRWwgU2FsdmFkb3JcIixcIkdRXCI6XCJFcXVhdG9yaWFsIEd1aW5lYVwiLFwiRVJcIjpcIkVyaXRyZWFcIixcIkVFXCI6XCJFc3RvbmlhXCIsXCJFVFwiOlwiRXRoaW9waWFcIixcIkZKXCI6XCJGaWppXCIsXCJGSVwiOlwiRmlubGFuZFwiLFwiTUtcIjpcIkZvcm1lciBZdWdvc2xhdiBSZXB1YmxpYyBvZiBNYWNlZG9uaWFcIixcIkZSXCI6XCJGcmFuY2VcIixcIkdBXCI6XCJHYWJvblwiLFwiR01cIjpcIkdhbWJpYVwiLFwiR0VcIjpcIkdlb3JnaWFcIixcIkRFXCI6XCJHZXJtYW55XCIsXCJHSFwiOlwiR2hhbmFcIixcIkdSXCI6XCJHcmVlY2VcIixcIkdEXCI6XCJHcmVuYWRhXCIsXCJHVFwiOlwiR3VhdGVtYWxhXCIsXCJHTlwiOlwiR3VpbmVhXCIsXCJHV1wiOlwiR3VpbmVhLUJpc3NhdVwiLFwiR1lcIjpcIkd1eWFuYVwiLFwiSEtcIjpcIkhvbmcgS29uZ1wiLFwiSFRcIjpcIkhhaXRpXCIsXCJITlwiOlwiSG9uZHVyYXNcIixcIkhVXCI6XCJIdW5nYXJ5XCIsXCJJU1wiOlwiSWNlbGFuZFwiLFwiSU5cIjpcIkluZGlhXCIsXCJJRFwiOlwiSW5kb25lc2lhXCIsXCJJUlwiOlwiSXJhblwiLFwiSVFcIjpcIklyYXFcIixcIklFXCI6XCJJcmVsYW5kXCIsXCJJTFwiOlwiSXNyYWVsXCIsXCJJVFwiOlwiSXRhbHlcIixcIkpNXCI6XCJKYW1haWNhXCIsXCJKUFwiOlwiSmFwYW5cIixcIkpPXCI6XCJKb3JkYW5cIixcIktaXCI6XCJLYXpha2hzdGFuXCIsXCJLRVwiOlwiS2VueWFcIixcIktJXCI6XCJLaXJpYmF0aVwiLFwiS1dcIjpcIkt1d2FpdFwiLFwiS0dcIjpcIkt5cmd5eiBSZXB1YmxpY1wiLFwiTEFcIjpcIkxhb3NcIixcIkxWXCI6XCJMYXR2aWFcIixcIkxCXCI6XCJMZWJhbm9uXCIsXCJMU1wiOlwiTGVzb3Rob1wiLFwiTFJcIjpcIkxpYmVyaWFcIixcIkxZXCI6XCJMaWJ5YVwiLFwiTElcIjpcIkxpZWNodGVuc3RlaW5cIixcIkxUXCI6XCJMaXRodWFuaWFcIixcIkxVXCI6XCJMdXhlbWJvdXJnXCIsXCJNR1wiOlwiTWFkYWdhc2NhclwiLFwiTVdcIjpcIk1hbGF3aVwiLFwiTVlcIjpcIk1hbGF5c2lhXCIsXCJNVlwiOlwiTWFsZGl2ZXNcIixcIk1MXCI6XCJNYWxpXCIsXCJNVFwiOlwiTWFsdGFcIixcIk1IXCI6XCJNYXJzaGFsbFwiLFwiTVJcIjpcIk1hdXJpdGFuaWFcIixcIk1VXCI6XCJNYXVyaXRpdXNcIixcIk1YXCI6XCJNZXhpY29cIixcIkZNXCI6XCJNaWNyb25lc2lhXCIsXCJNRFwiOlwiTW9sZG92YVwiLFwiTUNcIjpcIk1vbmFjb1wiLFwiTU5cIjpcIk1vbmdvbGlhXCIsXCJNRVwiOlwiTW9udGVuZWdyb1wiLFwiTUFcIjpcIk1vcm9jY29cIixcIk1aXCI6XCJNb3phbWJpcXVlXCIsXCJNTVwiOlwiTXlhbm1hclwiLFwiTkFcIjpcIk5hbWliaWFcIixcIk5SXCI6XCJOYXVydVwiLFwiTlBcIjpcIk5lcGFsXCIsXCJOTFwiOlwiTmV0aGVybGFuZHNcIixcIk5aXCI6XCJOZXcgWmVhbGFuZFwiLFwiTklcIjpcIk5pY2FyYWd1YVwiLFwiTkVcIjpcIk5pZ2VyXCIsXCJOR1wiOlwiTmlnZXJpYVwiLFwiTlVcIjpcIk5pdWVcIixcIk5PXCI6XCJOb3J3YXlcIixcIk9NXCI6XCJPbWFuXCIsXCJQS1wiOlwiUGFraXN0YW5cIixcIlBXXCI6XCJQYWxhdVwiLFwiUFNcIjpcIlBhbGVzdGluZVwiLFwiUEFcIjpcIlBhbmFtYVwiLFwiUEdcIjpcIlBhcHVhIE5ldyBHdWluZWFcIixcIlBZXCI6XCJQYXJhZ3VheVwiLFwiUEVcIjpcIlBlcnVcIixcIlBIXCI6XCJQaGlsaXBwaW5lc1wiLFwiUExcIjpcIlBvbGFuZFwiLFwiUFRcIjpcIlBvcnR1Z2FsXCIsXCJRQVwiOlwiUWF0YXJcIixcIkNHXCI6XCJSZXB1YmxpYyBvZiBDb25nb1wiLFwiS1JcIjpcIlJlcHVibGljIG9mIEtvcmVhXCIsXCJaQVwiOlwiUmVwdWJsaWMgb2YgU291dGggQWZyaWNhXCIsXCJST1wiOlwiUm9tYW5pYVwiLFwiUlVcIjpcIlJ1c3NpYVwiLFwiUldcIjpcIlJ3YW5kYVwiLFwiS05cIjpcIlNhaW50IENocmlzdG9waGVyIGFuZCBOZXZpc1wiLFwiTENcIjpcIlNhaW50IEx1Y2lhXCIsXCJWQ1wiOlwiU2FpbnQgVmluY2VudFwiLFwiV1NcIjpcIlNhbW9hXCIsXCJTTVwiOlwiU2FuIE1hcmlub1wiLFwiU1RcIjpcIlNhbyBUb21lIGFuZCBQcmluY2lwZVwiLFwiU0FcIjpcIlNhdWRpIEFyYWJpYVwiLFwiU05cIjpcIlNlbmVnYWxcIixcIlJTXCI6XCJTZXJiaWFcIixcIlNDXCI6XCJTZXljaGVsbGVzXCIsXCJTTFwiOlwiU2llcnJhIExlb25lXCIsXCJTR1wiOlwiU2luZ2Fwb3JlXCIsXCJTS1wiOlwiU2xvdmFraWFcIixcIlNJXCI6XCJTbG92ZW5pYVwiLFwiU0JcIjpcIlNvbG9tb25cIixcIlNPXCI6XCJTb21hbGlhXCIsXCJTU1wiOlwiU291dGggU3VkYW5cIixcIkVTXCI6XCJTcGFpblwiLFwiTEtcIjpcIlNyaSBMYW5rYVwiLFwiU0RcIjpcIlN1ZGFuXCIsXCJTUlwiOlwiU3VyaW5hbWVcIixcIlNaXCI6XCJTd2F6aWxhbmRcIixcIlNFXCI6XCJTd2VkZW5cIixcIkNIXCI6XCJTd2l0emVybGFuZFwiLFwiU1lcIjpcIlN5cmlhXCIsXCJUV1wiOlwiVGFpd2FuXCIsXCJUSlwiOlwiVGFqaWtpc3RhblwiLFwiVFpcIjpcIlRhbnphbmlhXCIsXCJUSFwiOlwiVGhhaWxhbmRcIixcIlRMXCI6XCJUaW1vci1MZXN0ZVwiLFwiVEdcIjpcIlRvZ29cIixcIlRPXCI6XCJUb25nYVwiLFwiVFRcIjpcIlRyaW5pZGFkIGFuZCBUb2JhZ29cIixcIlROXCI6XCJUdW5pc2lhXCIsXCJUUlwiOlwiVHVya2V5XCIsXCJUTVwiOlwiVHVya21lbmlzdGFuXCIsXCJUVlwiOlwiVHV2YWx1XCIsXCJVR1wiOlwiVWdhbmRhXCIsXCJVQVwiOlwiVWtyYWluZVwiLFwiQUVcIjpcIlVuaXRlZCBBcmFiIEVtaXJhdGVzXCIsXCJHQlwiOlwiVW5pdGVkIEtpbmdkb21cIixcIlVTXCI6XCJVbml0ZWQgU3RhdGVzIG9mIEFtZXJpY2FcIixcIlhYXCI6XCJVbmtub3duXCIsXCJVWVwiOlwiVXJ1Z3VheVwiLFwiVVpcIjpcIlV6YmVraXN0YW5cIixcIlZVXCI6XCJWYW51YXR1XCIsXCJWQVwiOlwiVmF0aWNhblwiLFwiVkVcIjpcIlZlbmV6dWVsYVwiLFwiVk5cIjpcIlZpZXQgTmFtXCIsXCJZRVwiOlwiWWVtZW5cIixcIlpNXCI6XCJaYW1iaWFcIixcIlpXXCI6XCJaaW1iYWJ3ZVwiXHJcbn07XHJcblxyXG5leHBvcnQge2dldFN0YW5kaW5ncywgZ2V0U29ydGluZ0Z1bmN0aW9uLCByYXRpbmcsIGNvdW50cmllc307Il19
