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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AtCoderCustomStandings = function (_React$Component) {
  _inherits(AtCoderCustomStandings, _React$Component);

  function AtCoderCustomStandings() {
    _classCallCheck(this, AtCoderCustomStandings);

    var _this = _possibleConstructorReturn(this, (AtCoderCustomStandings.__proto__ || Object.getPrototypeOf(AtCoderCustomStandings)).call(this));

    _this.state = {};
    _this.state.settings = new _appSettings2.default();
    _this.state.friends = new _friendsList2.default();

    util.get_standings(function (s) {
      _this.standings = s;
    }, true);

    _this.state.contest = new _contestData2.default();

    _this.state.filtered_standings = _this.get_filtered_standings();
    _this.state.currentPage = 1; //zero-indexed
    _this.state.totalPage = Math.floor((_this.state.filtered_standings.length + _this.state.settings.page_size - 1) / _this.state.settings.page_size);

    _this.get_filtered_standings.bind(_this);
    _this.get_filtered_standings_to_render.bind(_this);
    _this.update_standings.bind(_this);
    return _this;
  }

  _createClass(AtCoderCustomStandings, [{
    key: 'update_standings',
    value: function update_standings() {
      var _this2 = this;

      util.get_standings(function (s) {
        _this2.standings = s;
      }, false);
    }
  }, {
    key: 'get_filtered_standings',
    value: function get_filtered_standings() {
      var _this3 = this;

      return this.standings.filter(function (row) {
        if (_this3.state.settings.filter_by_friends === true) {
          if (_this3.state.friends.is_friend(row.user_screen_name) === false) {
            return false;
          }
        }
        if (_this3.state.settings.filter_by_country !== false) {
          if (row.user_screen_name !== _this3.state.settings.filter_by_country) {
            return false;
          }
        }
        if (_this3.state.settings.filter_by_rating !== false) {
          // rating filter function
          // row.rating
        }
        return true;
      });
    }
  }, {
    key: 'get_filtered_standings_to_render',
    value: function get_filtered_standings_to_render() {
      var page_begin = this.state.settings.page_size * this.state.currentPage;
      var page_end = this.state.settings.page_size * (this.state.currentPage + 1);
      var result = [];
      for (var i = page_begin; i < page_end && i < this.state.filtered_standings.length; i++) {
        result.push(this.state.filtered_standings[i]);
      }
      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var s = this.get_filtered_standings_to_render();
      var components = React.createElement(
        'div',
        null,
        React.createElement(_controll2.default, null),
        React.createElement(_standings2.default, { standings: s, taskData: this.state.contest.tasks }),
        React.createElement(_pager2.default, { current: this.state.currentPage, total: this.state.totalPage,
          onClickFunc: function onClickFunc(e) {
            var page = Number(e.target.getAttribute('data-page'));
            console.log("page button clicked : ", page);
            _this4.setState({ currentPage: page });
          } })
      );
      return components;
    }
  }]);

  return AtCoderCustomStandings;
}(React.Component);

exports.default = AtCoderCustomStandings;

},{"./appSettings.js":2,"./contestData.js":3,"./controll.js":4,"./friendsList.js":5,"./pager.js":7,"./standings.js":8,"./stats.js":9,"./util.js":10}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppSettings = function () {
  function AppSettings() {
    _classCallCheck(this, AppSettings);

    //options
    this.highlight_friends = true;
    this.show_rating_color = true;
    this.show_handle_name = true;
    this.filter_by_friends = false;
    this.filter_by_country = false;
    this.filter_by_rating = false;
    this.page_size = 50;

    this.load();
  }

  _createClass(AppSettings, [{
    key: 'load',
    value: function load() {
      //load
      var settings = JSON.parse(GM_getValue('settings', '{}'));
      if (settings === null) return;
      if ("highlight_friends" in settings) this.highlight_friends = settings.highlight_friends;
      if ("show_rating_color" in settings) this.show_rating_color = settings.show_rating_color;
      if ("show_handle_name" in settings) this.show_handle_name = settings.show_handle_name;
      if ("filter_by_friends" in settings) this.filter_by_friends = settings.filter_by_friends;
      if ("filter_by_country" in settings) this.filter_by_country = settings.filter_by_country;
      if ("filter_by_rating" in settings) this.filter_by_rating = settings.filter_by_rating;
      if ("page_size" in settings) this.page_size = settings.page_size;
    }
  }, {
    key: 'save',
    value: function save() {
      //save
      var settings = {
        "highlight_friends": this.highlight_friends,
        "show_rating_color": this.show_rating_color,
        "show_handle_name": this.show_handle_name,
        "filter_by_friends": this.filter_by_friends,
        "filter_by_country": this.filter_by_country,
        "filter_by_rating": this.filter_by_rating,
        "page_size": this.page_size
      };
      var str = JSON.stringify(settings);
      GM_setValue('settings', str);
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContestData = function () {
  function ContestData() {
    _classCallCheck(this, ContestData);

    this.contst_name = $("div.container > a.brand > span.contest-name").text();
    this.start_time = new Date(Date.parse($('time#contest-start-time').text()));
    this.end_time = new Date(Date.parse($('time#contest-end-time').text()));

    var thead = $('#contest-standings > thead > tr > th');
    this.num_tasks = thead.length - 3;
    this.tasks = new Array(this.num_tasks);
    for (var i = 0; i < this.num_tasks; i++) {
      var task_name = thead.get(i + 2).getElementsByTagName('a')[0].textContent;
      var task_url = thead.get(i + 2).getElementsByTagName('a')[0].getAttribute('href');
      this.tasks[i] = new TaskData(task_name, task_url, i);
    }
  }

  _createClass(ContestData, [{
    key: 'update',
    value: function update(standings) {
      this.tasks.forEach(function (t) {
        t.update_data(standings);
      });
    }
  }]);

  return ContestData;
}();

exports.default = ContestData;

var TaskData = function () {
  function TaskData(name, url, id) {
    _classCallCheck(this, TaskData);

    this.name = name;
    this.id = id;
    this.url = url;

    this.max_score = 0;
    this.num_people_got_max_score = 0;
    this.num_people_submitted = 0;
    this.num_submissions = 0;
    this.first_accepted_time = 0;
    this.first_accepted_person = "";
  }

  _createClass(TaskData, [{
    key: 'update_data',
    value: function update_data(standings) {
      var _this = this;

      this.max_score = 0;
      this.num_people_got_max_score = 0;
      this.num_people_submitted = 0;
      this.num_submissions = 0;
      this.first_accepted_time = 0;
      this.first_accepted_person = "";

      standings.forEach(function (data) {
        var d = data.tasks[_this.id];
        if (d.score !== undefined) {
          _this.num_people_submitted += 1;
          _this.num_submissions += d.failure;
          if (d.score !== 0) _this.num_submissions += 1;

          if (_this.max_score < d.score) {
            _this.max_score = d.score;
            _this.num_people_got_max_score = 1;
            _this.first_accepted_time = d.elapsed_time;
            _this.first_accepted_person = data.user_screen_name;
          } else if (_this.max_score === d.score) {
            _this.num_people_got_max_score += 1;
            if (_this.first_accepted_time > d.elapsed_time) {
              _this.first_accepted_time = d.elapsed_time;
              _this.first_accepted_person = data.user_screen_name;
            } else if (_this.first_accepted_time == d.elapsed_time) {
              _this.first_accepted_person += ", " + data.user_screen_name;
            }
          }
        }
      });
    }
  }]);

  return TaskData;
}();

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stats = require("./stats.js");

var _stats2 = _interopRequireDefault(_stats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_React$Component) {
  _inherits(Filter, _React$Component);

  function Filter(props) {
    _classCallCheck(this, Filter);

    return _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));
  }

  _createClass(Filter, [{
    key: "render",
    value: function render() {
      var by_friend = "friend filter";
      var by_rating = "rating filter";
      var by_country = "country filter";
      return React.createElement(
        "div",
        null,
        by_friend,
        by_rating,
        by_country
      );
    }
  }]);

  return Filter;
}(React.Component);

var Settings = function (_React$Component2) {
  _inherits(Settings, _React$Component2);

  function Settings(props) {
    _classCallCheck(this, Settings);

    return _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this, props));
  }

  _createClass(Settings, [{
    key: "render",
    value: function render() {
      var page_size = "page size setting";
      var show_handle = "screen name setting";
      var rating_color = "showing color setting";
      var highlight_friends = "highlight friends setting";
      var friends = "friends setting";
      return React.createElement(
        "div",
        null,
        page_size,
        show_handle,
        rating_color,
        highlight_friends,
        friends
      );
    }
  }]);

  return Settings;
}(React.Component);

var Controll = function (_React$Component3) {
  _inherits(Controll, _React$Component3);

  function Controll(props) {
    _classCallCheck(this, Controll);

    return _possibleConstructorReturn(this, (Controll.__proto__ || Object.getPrototypeOf(Controll)).call(this, props));
  }

  _createClass(Controll, [{
    key: "render",
    value: function render() {
      var ret = React.createElement(
        "div",
        null,
        React.createElement(Filter, null),
        React.createElement(Settings, null),
        React.createElement(_stats2.default, null)
      );

      return ret;
    }
  }]);

  return Controll;
}(React.Component);

exports.default = Controll;

},{"./stats.js":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FriendsList = function () {
  function FriendsList() {
    _classCallCheck(this, FriendsList);

    this.friends = new Set();
    this.load();
  }

  _createClass(FriendsList, [{
    key: 'load',
    value: function load() {
      var _this = this;

      //load
      //friend list object (old version)
      var friends_old = JSON.parse(GM_getValue('GM_friend_list', 'null'));
      if (friends_old !== null) {
        for (var handle in friends_old) {
          this.friends.add(handle);
        }
        GM_deleteValue('GM_friend_list');
        this.save();
      }

      //friend list array (new version)
      var friends = JSON.parse(GM_getValue('friends_list', 'null'));
      if (friends !== null) {
        friends.forEach(function (handle) {
          return _this.friends.add(handle);
        });
      }
    }
  }, {
    key: 'save',
    value: function save() {
      var friends_list = new Array();
      this.friends.forEach(function (handle) {
        return friends_list.push(handle);
      });
      var str = JSON.stringify(this.friends_list);

      //save
      GM_setValue('friends_list', str);
    }
  }, {
    key: 'add',
    value: function add(handle) {
      this.friends.add(handle);
      this.save();
    }
  }, {
    key: 'remove',
    value: function remove(handle) {
      this.friends.delete(handle);
      this.save();
    }
  }, {
    key: 'is_friend',
    value: function is_friend(handle) {
      return this.friends.has(handle);
    }
  }]);

  return FriendsList;
}();

exports.default = FriendsList;

},{}],6:[function(require,module,exports){
'use strict';

var _app = require('./app.js');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ReactDOM.render(React.createElement(_app2.default, null), document.getElementById('content')); //import React from 'react';
//import ReactDOM from 'react-dom';

},{"./app.js":1}],7:[function(require,module,exports){
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
    key: "render",
    value: function render() {
      var p = this.props.page;
      if (this.props.current === true) {
        return React.createElement(
          "div",
          null,
          p + 1
        );
      } else {
        return React.createElement(
          "div",
          { onClick: this.props.onClickFunc, "data-page": p },
          p + 1
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
  * @param {function} onClickFunc 
  */
  function Pager(props) {
    _classCallCheck(this, Pager);

    return _possibleConstructorReturn(this, (Pager.__proto__ || Object.getPrototypeOf(Pager)).call(this, props));
  }

  _createClass(Pager, [{
    key: "render",
    value: function render() {
      var res = new Array();
      var page_begin = Math.max(0, this.props.current - 4);
      var page_end = Math.min(this.props.total, this.props.current + 5);

      if (page_begin !== 0) {
        var p = 0;
        res.push(React.createElement(PageButton, { current: p === this.props.current, page: p, onClickFunc: this.props.onClickFunc }));
        if (page_begin !== p + 1) {
          res.push(React.createElement(
            "div",
            null,
            "..."
          ));
        }
      }
      for (var i = page_begin; i < page_end; i++) {
        res.push(React.createElement(PageButton, { current: i === this.props.current, page: i, onClickFunc: this.props.onClickFunc }));
      }
      if (page_end !== this.props.total) {
        var _p = this.props.total - 1;
        if (page_end !== _p) {
          res.push(React.createElement(
            "div",
            null,
            "..."
          ));
        }
        res.push(React.createElement(PageButton, { current: _p === this.props.current, page: _p, onClickFunc: this.props.onClickFunc }));
      }

      return React.createElement(
        "div",
        null,
        res
      );
    }
  }]);

  return Pager;
}(React.Component);

exports.default = Pager;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Task = function (_React$Component) {
  _inherits(Task, _React$Component);

  function Task(props) {
    _classCallCheck(this, Task);

    return _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).call(this, props));
  }

  _createClass(Task, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.props.task.score,
        this.props.task.time
      );
    }
  }]);

  return Task;
}(React.Component);

/*
 rank
 name
 id
 rating
 country
 tasks[]
 score
 penalty
*/


var StandingsRow = function (_React$Component2) {
  _inherits(StandingsRow, _React$Component2);

  function StandingsRow(props) {
    _classCallCheck(this, StandingsRow);

    return _possibleConstructorReturn(this, (StandingsRow.__proto__ || Object.getPrototypeOf(StandingsRow)).call(this, props));
  }

  _createClass(StandingsRow, [{
    key: "render",
    value: function render() {
      var tasks = this.props.row.tasks.map(function (task) {
        return React.createElement(Task, { task: task });
      });

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          null,
          this.props.row.rank
        ),
        React.createElement(
          "div",
          null,
          this.props.row.user_screen_name
        ),
        tasks,
        React.createElement(
          "div",
          null,
          this.props.row.score
        )
      );
    }
  }]);

  return StandingsRow;
}(React.Component);

var StandingsHead = function (_React$Component3) {
  _inherits(StandingsHead, _React$Component3);

  function StandingsHead(props) {
    _classCallCheck(this, StandingsHead);

    return _possibleConstructorReturn(this, (StandingsHead.__proto__ || Object.getPrototypeOf(StandingsHead)).call(this, props));
  }

  _createClass(StandingsHead, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        "rank",
        "name",
        "tasks",
        "total"
      );
    }
  }]);

  return StandingsHead;
}(React.Component);

var Standings = function (_React$Component4) {
  _inherits(Standings, _React$Component4);

  function Standings(props) {
    _classCallCheck(this, Standings);

    return _possibleConstructorReturn(this, (Standings.__proto__ || Object.getPrototypeOf(Standings)).call(this, props));
  }

  _createClass(Standings, [{
    key: "render",
    value: function render() {
      var standingsRows = this.props.standings.map(function (row) {
        return React.createElement(StandingsRow, { row: row });
      });

      return React.createElement(
        "div",
        null,
        React.createElement(StandingsHead, { taskData: this.props.taskData }),
        standingsRows
      );
    }
  }]);

  return Standings;
}(React.Component);

exports.default = Standings;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stats = function (_React$Component) {
  _inherits(Stats, _React$Component);

  function Stats(props) {
    _classCallCheck(this, Stats);

    return _possibleConstructorReturn(this, (Stats.__proto__ || Object.getPrototypeOf(Stats)).call(this, props));
  }

  _createClass(Stats, [{
    key: "render",
    value: function render() {
      var table = "table text";
      var graph = "graph here";
      return React.createElement(
        "div",
        null,
        table,
        graph
      );
    }
  }]);

  return Stats;
}(React.Component);

exports.default = Stats;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function get_standings(callback, initialize) {
  var reg = /\s*data:\s(\[.*\]),/;

  if (initialize) {
    var script_text = $("html").find('script[type="text/JavaScript"]').text().split("\n");

    script_text.forEach(function (txt) {
      var res = reg.exec(txt);
      if (res !== null) {
        var new_standings = JSON.parse(res[1]);
        callback(new_standings);
      }
    });
  } else {
    $.ajax({ url: "./standings" }).done(function (html) {
      var script_text = $(html).filter('script[type="text/JavaScript"]').text().split("\n");

      script_text.forEach(function (txt) {
        var res = reg.exec(txt);
        if (res !== null) {
          var new_standings = JSON.parse(res[1]);
          callback(new_standings);
        }
      });
    });
  }
}

exports.get_standings = get_standings;

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0tvdS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcYXBwU2V0dGluZ3MuanMiLCJzcmNcXGNvbnRlc3REYXRhLmpzIiwic3JjXFxjb250cm9sbC5qcyIsInNyY1xcZnJpZW5kc0xpc3QuanMiLCJzcmNcXG1haW4uanMiLCJzcmNcXHBhZ2VyLmpzIiwic3JjXFxzdGFuZGluZ3MuanMiLCJzcmNcXHN0YXRzLmpzIiwic3JjXFx1dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7SUFBWSxJOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQixzQjs7O0FBQ25CLG9DQUFhO0FBQUE7O0FBQUE7O0FBRVgsVUFBSyxLQUFMLEdBQWEsRUFBYjtBQUNBLFVBQUssS0FBTCxDQUFXLFFBQVgsR0FBdUIsMkJBQXZCO0FBQ0EsVUFBSyxLQUFMLENBQVcsT0FBWCxHQUF1QiwyQkFBdkI7O0FBRUEsU0FBSyxhQUFMLENBQW9CLGFBQUs7QUFDdkIsWUFBSyxTQUFMLEdBQWlCLENBQWpCO0FBQ0QsS0FGRCxFQUVJLElBRko7O0FBSUEsVUFBSyxLQUFMLENBQVcsT0FBWCxHQUFzQiwyQkFBdEI7O0FBRUEsVUFBSyxLQUFMLENBQVcsa0JBQVgsR0FBZ0MsTUFBSyxzQkFBTCxFQUFoQztBQUNBLFVBQUssS0FBTCxDQUFXLFdBQVgsR0FBeUIsQ0FBekIsQ0FiVyxDQWFpQjtBQUM1QixVQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXlCLEtBQUssS0FBTCxDQUFZLENBQUMsTUFBSyxLQUFMLENBQVcsa0JBQVgsQ0FBOEIsTUFBOUIsR0FBdUMsTUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixTQUEzRCxHQUF1RSxDQUF4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S0FBSyxLQUFMLENBQVcsSUFBSSxDQUFKLENBQVgsQ0FBdEI7QUFDQSxtQkFBVSxhQUFWO0FBQ0Q7QUFDRixPQU5EO0FBT0QsS0FWRDtBQVdEO0FBQ0Y7O1FBRU8sYSxHQUFBLGEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgdXRpbCBmcm9tICcuL3V0aWwuanMnO1xyXG5pbXBvcnQgQXBwU2V0dGluZ3MgZnJvbSAnLi9hcHBTZXR0aW5ncy5qcyc7XHJcbmltcG9ydCBGcmllbmRzTGlzdCBmcm9tICcuL2ZyaWVuZHNMaXN0LmpzJztcclxuaW1wb3J0IENvbnRlc3REYXRhIGZyb20gJy4vY29udGVzdERhdGEuanMnO1xyXG5pbXBvcnQgU3RhdHMgZnJvbSAnLi9zdGF0cy5qcyc7XHJcbmltcG9ydCBDb250cm9sbCBmcm9tICcuL2NvbnRyb2xsLmpzJztcclxuaW1wb3J0IFN0YW5kaW5ncyBmcm9tICcuL3N0YW5kaW5ncy5qcyc7XHJcbmltcG9ydCBQYWdlciBmcm9tICcuL3BhZ2VyLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0Q29kZXJDdXN0b21TdGFuZGluZ3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xyXG4gICAgdGhpcy5zdGF0ZS5zZXR0aW5ncyAgPSBuZXcgQXBwU2V0dGluZ3MoKTtcclxuICAgIHRoaXMuc3RhdGUuZnJpZW5kcyAgID0gbmV3IEZyaWVuZHNMaXN0KCk7XHJcblxyXG4gICAgdXRpbC5nZXRfc3RhbmRpbmdzKCBzID0+IHtcclxuICAgICAgdGhpcy5zdGFuZGluZ3MgPSBzO1xyXG4gICAgfSAsIHRydWUpO1xyXG5cclxuICAgIHRoaXMuc3RhdGUuY29udGVzdCAgPSBuZXcgQ29udGVzdERhdGEoKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlLmZpbHRlcmVkX3N0YW5kaW5ncyA9IHRoaXMuZ2V0X2ZpbHRlcmVkX3N0YW5kaW5ncygpO1xyXG4gICAgdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9IDE7IC8vemVyby1pbmRleGVkXHJcbiAgICB0aGlzLnN0YXRlLnRvdGFsUGFnZSAgID0gTWF0aC5mbG9vciggKHRoaXMuc3RhdGUuZmlsdGVyZWRfc3RhbmRpbmdzLmxlbmd0aCArIHRoaXMuc3RhdGUuc2V0dGluZ3MucGFnZV9zaXplIC0gMSkgLyB0aGlzLnN0YXRlLnNldHRpbmdzLnBhZ2Vfc2l6ZSApO1xyXG5cclxuICAgIHRoaXMuZ2V0X2ZpbHRlcmVkX3N0YW5kaW5ncy5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5nZXRfZmlsdGVyZWRfc3RhbmRpbmdzX3RvX3JlbmRlci5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy51cGRhdGVfc3RhbmRpbmdzLmJpbmQodGhpcyk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVfc3RhbmRpbmdzKCl7XHJcbiAgICB1dGlsLmdldF9zdGFuZGluZ3MoIHMgPT4ge1xyXG4gICAgICB0aGlzLnN0YW5kaW5ncyA9IHM7XHJcbiAgICB9ICwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgZ2V0X2ZpbHRlcmVkX3N0YW5kaW5ncygpe1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhbmRpbmdzLmZpbHRlciggcm93ID0+IHtcclxuICAgICAgaWYodGhpcy5zdGF0ZS5zZXR0aW5ncy5maWx0ZXJfYnlfZnJpZW5kcyA9PT0gdHJ1ZSl7XHJcbiAgICAgICAgaWYodGhpcy5zdGF0ZS5mcmllbmRzLmlzX2ZyaWVuZCggcm93LnVzZXJfc2NyZWVuX25hbWUpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKHRoaXMuc3RhdGUuc2V0dGluZ3MuZmlsdGVyX2J5X2NvdW50cnkgIT09IGZhbHNlKXtcclxuICAgICAgICBpZiggcm93LnVzZXJfc2NyZWVuX25hbWUgIT09IHRoaXMuc3RhdGUuc2V0dGluZ3MuZmlsdGVyX2J5X2NvdW50cnkgKXtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYodGhpcy5zdGF0ZS5zZXR0aW5ncy5maWx0ZXJfYnlfcmF0aW5nICE9PSBmYWxzZSl7XHJcbiAgICAgICAgLy8gcmF0aW5nIGZpbHRlciBmdW5jdGlvblxyXG4gICAgICAgIC8vIHJvdy5yYXRpbmdcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gKTtcclxuICB9XHJcblxyXG4gIGdldF9maWx0ZXJlZF9zdGFuZGluZ3NfdG9fcmVuZGVyKCl7XHJcbiAgICBjb25zdCBwYWdlX2JlZ2luID0gdGhpcy5zdGF0ZS5zZXR0aW5ncy5wYWdlX3NpemUgKiB0aGlzLnN0YXRlLmN1cnJlbnRQYWdlO1xyXG4gICAgY29uc3QgcGFnZV9lbmQgICA9IHRoaXMuc3RhdGUuc2V0dGluZ3MucGFnZV9zaXplICogKHRoaXMuc3RhdGUuY3VycmVudFBhZ2UrMSk7XHJcbiAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICBmb3IobGV0IGk9cGFnZV9iZWdpbjsgaTxwYWdlX2VuZCAmJiBpPHRoaXMuc3RhdGUuZmlsdGVyZWRfc3RhbmRpbmdzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgcmVzdWx0LnB1c2goIHRoaXMuc3RhdGUuZmlsdGVyZWRfc3RhbmRpbmdzW2ldICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgcyA9IHRoaXMuZ2V0X2ZpbHRlcmVkX3N0YW5kaW5nc190b19yZW5kZXIoKTtcclxuICAgIGxldCBjb21wb25lbnRzID0gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxDb250cm9sbCAvPlxyXG4gICAgICAgIDxTdGFuZGluZ3Mgc3RhbmRpbmdzPXtzfSB0YXNrRGF0YT17dGhpcy5zdGF0ZS5jb250ZXN0LnRhc2tzfSAvPlxyXG4gICAgICAgIDxQYWdlciBjdXJyZW50PXt0aGlzLnN0YXRlLmN1cnJlbnRQYWdlfSB0b3RhbD17dGhpcy5zdGF0ZS50b3RhbFBhZ2V9XHJcbiAgICAgICAgICAgICAgIG9uQ2xpY2tGdW5jPXsgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICBjb25zdCBwYWdlID0gTnVtYmVyKCBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZScpICk7XHJcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coIFwicGFnZSBidXR0b24gY2xpY2tlZCA6IFwiLCBwYWdlICk7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgge2N1cnJlbnRQYWdlIDogcGFnZX0gKTtcclxuICAgICAgICAgICAgICAgfSB9Lz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIGNvbXBvbmVudHM7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcFNldHRpbmdze1xyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAvL29wdGlvbnNcclxuICAgIHRoaXMuaGlnaGxpZ2h0X2ZyaWVuZHMgPSB0cnVlO1xyXG4gICAgdGhpcy5zaG93X3JhdGluZ19jb2xvciA9IHRydWU7XHJcbiAgICB0aGlzLnNob3dfaGFuZGxlX25hbWUgID0gdHJ1ZTtcclxuICAgIHRoaXMuZmlsdGVyX2J5X2ZyaWVuZHMgPSBmYWxzZTtcclxuICAgIHRoaXMuZmlsdGVyX2J5X2NvdW50cnkgPSBmYWxzZTtcclxuICAgIHRoaXMuZmlsdGVyX2J5X3JhdGluZyAgPSBmYWxzZTtcclxuICAgIHRoaXMucGFnZV9zaXplICAgICAgICAgPSA1MDtcclxuXHJcbiAgICB0aGlzLmxvYWQoKTtcclxuICB9XHJcblxyXG4gIGxvYWQoKXtcclxuICAgIC8vbG9hZFxyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBKU09OLnBhcnNlKCBHTV9nZXRWYWx1ZSgnc2V0dGluZ3MnLCAne30nKSApO1xyXG4gICAgaWYoIHNldHRpbmdzID09PSBudWxsICkgcmV0dXJuO1xyXG4gICAgaWYoXCJoaWdobGlnaHRfZnJpZW5kc1wiIGluIHNldHRpbmdzKSB0aGlzLmhpZ2hsaWdodF9mcmllbmRzID0gc2V0dGluZ3MuaGlnaGxpZ2h0X2ZyaWVuZHM7XHJcbiAgICBpZihcInNob3dfcmF0aW5nX2NvbG9yXCIgaW4gc2V0dGluZ3MpIHRoaXMuc2hvd19yYXRpbmdfY29sb3IgPSBzZXR0aW5ncy5zaG93X3JhdGluZ19jb2xvcjtcclxuICAgIGlmKFwic2hvd19oYW5kbGVfbmFtZVwiICBpbiBzZXR0aW5ncykgdGhpcy5zaG93X2hhbmRsZV9uYW1lICA9IHNldHRpbmdzLnNob3dfaGFuZGxlX25hbWU7XHJcbiAgICBpZihcImZpbHRlcl9ieV9mcmllbmRzXCIgaW4gc2V0dGluZ3MpIHRoaXMuZmlsdGVyX2J5X2ZyaWVuZHMgPSBzZXR0aW5ncy5maWx0ZXJfYnlfZnJpZW5kcztcclxuICAgIGlmKFwiZmlsdGVyX2J5X2NvdW50cnlcIiBpbiBzZXR0aW5ncykgdGhpcy5maWx0ZXJfYnlfY291bnRyeSA9IHNldHRpbmdzLmZpbHRlcl9ieV9jb3VudHJ5O1xyXG4gICAgaWYoXCJmaWx0ZXJfYnlfcmF0aW5nXCIgaW4gc2V0dGluZ3MpICB0aGlzLmZpbHRlcl9ieV9yYXRpbmcgID0gc2V0dGluZ3MuZmlsdGVyX2J5X3JhdGluZztcclxuICAgIGlmKFwicGFnZV9zaXplXCIgaW4gc2V0dGluZ3MpICAgICAgICAgdGhpcy5wYWdlX3NpemUgICAgICAgICA9IHNldHRpbmdzLnBhZ2Vfc2l6ZTtcclxuICB9XHJcbiAgc2F2ZSgpe1xyXG4gICAgLy9zYXZlXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IHtcclxuICAgICAgXCJoaWdobGlnaHRfZnJpZW5kc1wiIDogdGhpcy5oaWdobGlnaHRfZnJpZW5kcyxcclxuICAgICAgXCJzaG93X3JhdGluZ19jb2xvclwiIDogdGhpcy5zaG93X3JhdGluZ19jb2xvcixcclxuICAgICAgXCJzaG93X2hhbmRsZV9uYW1lXCIgIDogdGhpcy5zaG93X2hhbmRsZV9uYW1lLFxyXG4gICAgICBcImZpbHRlcl9ieV9mcmllbmRzXCIgOiB0aGlzLmZpbHRlcl9ieV9mcmllbmRzLFxyXG4gICAgICBcImZpbHRlcl9ieV9jb3VudHJ5XCIgOiB0aGlzLmZpbHRlcl9ieV9jb3VudHJ5LFxyXG4gICAgICBcImZpbHRlcl9ieV9yYXRpbmdcIiAgOiB0aGlzLmZpbHRlcl9ieV9yYXRpbmcsXHJcbiAgICAgIFwicGFnZV9zaXplXCIgICAgICAgICA6IHRoaXMucGFnZV9zaXplXHJcbiAgICB9O1xyXG4gICAgY29uc3Qgc3RyID0gSlNPTi5zdHJpbmdpZnkoIHNldHRpbmdzICk7XHJcbiAgICBHTV9zZXRWYWx1ZSgnc2V0dGluZ3MnLCBzdHIpO1xyXG4gIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRlc3REYXRhe1xyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICB0aGlzLmNvbnRzdF9uYW1lID0gJChcImRpdi5jb250YWluZXIgPiBhLmJyYW5kID4gc3Bhbi5jb250ZXN0LW5hbWVcIikudGV4dCgpO1xyXG4gICAgdGhpcy5zdGFydF90aW1lID0gbmV3IERhdGUoIERhdGUucGFyc2UoJCgndGltZSNjb250ZXN0LXN0YXJ0LXRpbWUnKS50ZXh0KCkpICk7XHJcbiAgICB0aGlzLmVuZF90aW1lICAgPSBuZXcgRGF0ZSggRGF0ZS5wYXJzZSgkKCd0aW1lI2NvbnRlc3QtZW5kLXRpbWUnKS50ZXh0KCkpICk7XHJcblxyXG4gICAgY29uc3QgdGhlYWQgPSAgJCgnI2NvbnRlc3Qtc3RhbmRpbmdzID4gdGhlYWQgPiB0ciA+IHRoJyk7XHJcbiAgICB0aGlzLm51bV90YXNrcyA9IHRoZWFkLmxlbmd0aCAtIDM7XHJcbiAgICB0aGlzLnRhc2tzID0gbmV3IEFycmF5KCB0aGlzLm51bV90YXNrcyApO1xyXG4gICAgZm9yKGxldCBpPTA7IGk8dGhpcy5udW1fdGFza3M7IGkrKyl7XHJcbiAgICAgIGNvbnN0IHRhc2tfbmFtZSA9IHRoZWFkLmdldChpKzIpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylbMF0udGV4dENvbnRlbnQ7XHJcbiAgICAgIGNvbnN0IHRhc2tfdXJsICA9IHRoZWFkLmdldChpKzIpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJylbMF0uZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcbiAgICAgIHRoaXMudGFza3NbaV0gPSBuZXcgVGFza0RhdGEoIHRhc2tfbmFtZSwgdGFza191cmwsIGkgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZShzdGFuZGluZ3Mpe1xyXG4gICAgdGhpcy50YXNrcy5mb3JFYWNoKCB0ID0+IHt0LnVwZGF0ZV9kYXRhKHN0YW5kaW5ncyl9ICk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBUYXNrRGF0YXtcclxuICBjb25zdHJ1Y3RvciggbmFtZSwgdXJsLCBpZCApe1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuaWQgICA9IGlkO1xyXG4gICAgdGhpcy51cmwgID0gdXJsO1xyXG5cclxuICAgIHRoaXMubWF4X3Njb3JlID0gMDtcclxuICAgIHRoaXMubnVtX3Blb3BsZV9nb3RfbWF4X3Njb3JlID0gMDtcclxuICAgIHRoaXMubnVtX3Blb3BsZV9zdWJtaXR0ZWQgPSAwO1xyXG4gICAgdGhpcy5udW1fc3VibWlzc2lvbnMgPSAwO1xyXG4gICAgdGhpcy5maXJzdF9hY2NlcHRlZF90aW1lID0gMDtcclxuICAgIHRoaXMuZmlyc3RfYWNjZXB0ZWRfcGVyc29uID0gXCJcIjtcclxuICB9XHJcblxyXG4gIHVwZGF0ZV9kYXRhKHN0YW5kaW5ncyl7XHJcbiAgICB0aGlzLm1heF9zY29yZSA9IDA7XHJcbiAgICB0aGlzLm51bV9wZW9wbGVfZ290X21heF9zY29yZSA9IDA7XHJcbiAgICB0aGlzLm51bV9wZW9wbGVfc3VibWl0dGVkID0gMDtcclxuICAgIHRoaXMubnVtX3N1Ym1pc3Npb25zID0gMDtcclxuICAgIHRoaXMuZmlyc3RfYWNjZXB0ZWRfdGltZSA9IDA7XHJcbiAgICB0aGlzLmZpcnN0X2FjY2VwdGVkX3BlcnNvbiA9IFwiXCI7XHJcblxyXG4gICAgc3RhbmRpbmdzLmZvckVhY2goIGRhdGEgPT4ge1xyXG4gICAgICBjb25zdCBkID0gZGF0YS50YXNrc1sgdGhpcy5pZCBdO1xyXG4gICAgICBpZiggZC5zY29yZSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICB0aGlzLm51bV9wZW9wbGVfc3VibWl0dGVkICs9IDE7XHJcbiAgICAgICAgdGhpcy5udW1fc3VibWlzc2lvbnMgKz0gZC5mYWlsdXJlO1xyXG4gICAgICAgIGlmKCBkLnNjb3JlICE9PSAwICkgdGhpcy5udW1fc3VibWlzc2lvbnMgKz0gMTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5tYXhfc2NvcmUgPCBkLnNjb3JlKXtcclxuICAgICAgICAgIHRoaXMubWF4X3Njb3JlID0gZC5zY29yZTtcclxuICAgICAgICAgIHRoaXMubnVtX3Blb3BsZV9nb3RfbWF4X3Njb3JlID0gMTtcclxuICAgICAgICAgIHRoaXMuZmlyc3RfYWNjZXB0ZWRfdGltZSA9IGQuZWxhcHNlZF90aW1lO1xyXG4gICAgICAgICAgdGhpcy5maXJzdF9hY2NlcHRlZF9wZXJzb24gPSBkYXRhLnVzZXJfc2NyZWVuX25hbWU7XHJcbiAgICAgICAgfWVsc2UgaWYoIHRoaXMubWF4X3Njb3JlID09PSBkLnNjb3JlICl7XHJcbiAgICAgICAgICB0aGlzLm51bV9wZW9wbGVfZ290X21heF9zY29yZSArPSAxO1xyXG4gICAgICAgICAgaWYoIHRoaXMuZmlyc3RfYWNjZXB0ZWRfdGltZSA+IGQuZWxhcHNlZF90aW1lICl7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RfYWNjZXB0ZWRfdGltZSA9IGQuZWxhcHNlZF90aW1lO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0X2FjY2VwdGVkX3BlcnNvbiA9IGRhdGEudXNlcl9zY3JlZW5fbmFtZTtcclxuICAgICAgICAgIH1lbHNlIGlmKCB0aGlzLmZpcnN0X2FjY2VwdGVkX3RpbWUgPT0gZC5lbGFwc2VkX3RpbWUgKXtcclxuICAgICAgICAgICAgdGhpcy5maXJzdF9hY2NlcHRlZF9wZXJzb24gKz0gXCIsIFwiICsgZGF0YS51c2VyX3NjcmVlbl9uYW1lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBTdGF0cyBmcm9tICcuL3N0YXRzLmpzJ1xyXG5cclxuY2xhc3MgRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IGJ5X2ZyaWVuZCA9IFwiZnJpZW5kIGZpbHRlclwiO1xyXG4gICAgY29uc3QgYnlfcmF0aW5nID0gXCJyYXRpbmcgZmlsdGVyXCI7XHJcbiAgICBjb25zdCBieV9jb3VudHJ5ID0gXCJjb3VudHJ5IGZpbHRlclwiO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICB7YnlfZnJpZW5kfVxyXG4gICAgICAgIHtieV9yYXRpbmd9XHJcbiAgICAgICAge2J5X2NvdW50cnl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFNldHRpbmdzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IHBhZ2Vfc2l6ZSA9IFwicGFnZSBzaXplIHNldHRpbmdcIjtcclxuICAgIGNvbnN0IHNob3dfaGFuZGxlID0gXCJzY3JlZW4gbmFtZSBzZXR0aW5nXCI7XHJcbiAgICBjb25zdCByYXRpbmdfY29sb3IgPSBcInNob3dpbmcgY29sb3Igc2V0dGluZ1wiO1xyXG4gICAgY29uc3QgaGlnaGxpZ2h0X2ZyaWVuZHMgPSBcImhpZ2hsaWdodCBmcmllbmRzIHNldHRpbmdcIjtcclxuICAgIGNvbnN0IGZyaWVuZHMgPSBcImZyaWVuZHMgc2V0dGluZ1wiO1xyXG4gICAgcmV0dXJuKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIHtwYWdlX3NpemV9XHJcbiAgICAgICAge3Nob3dfaGFuZGxlfVxyXG4gICAgICAgIHtyYXRpbmdfY29sb3J9XHJcbiAgICAgICAge2hpZ2hsaWdodF9mcmllbmRzfVxyXG4gICAgICAgIHtmcmllbmRzfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBsZXQgcmV0ID0gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxGaWx0ZXIgLz5cclxuICAgICAgICA8U2V0dGluZ3MgLz5cclxuICAgICAgICA8U3RhdHMgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiByZXQ7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyaWVuZHNMaXN0e1xyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICB0aGlzLmZyaWVuZHMgPSBuZXcgU2V0KCk7XHJcbiAgICB0aGlzLmxvYWQoKTtcclxuICB9XHJcblxyXG4gIGxvYWQoKXtcclxuICAgIC8vbG9hZFxyXG4gICAgLy9mcmllbmQgbGlzdCBvYmplY3QgKG9sZCB2ZXJzaW9uKVxyXG4gICAgbGV0IGZyaWVuZHNfb2xkID0gSlNPTi5wYXJzZSggR01fZ2V0VmFsdWUoJ0dNX2ZyaWVuZF9saXN0JywgJ251bGwnKSApO1xyXG4gICAgaWYoZnJpZW5kc19vbGQgIT09IG51bGwpe1xyXG4gICAgICBmb3IobGV0IGhhbmRsZSBpbiBmcmllbmRzX29sZCl7XHJcbiAgICAgICAgdGhpcy5mcmllbmRzLmFkZChoYW5kbGUpO1xyXG4gICAgICB9XHJcbiAgICAgIEdNX2RlbGV0ZVZhbHVlKCAnR01fZnJpZW5kX2xpc3QnICk7XHJcbiAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL2ZyaWVuZCBsaXN0IGFycmF5IChuZXcgdmVyc2lvbilcclxuICAgIGxldCBmcmllbmRzID0gSlNPTi5wYXJzZSggR01fZ2V0VmFsdWUoJ2ZyaWVuZHNfbGlzdCcsICdudWxsJykgKTtcclxuICAgIGlmKGZyaWVuZHMgIT09IG51bGwpe1xyXG4gICAgICBmcmllbmRzLmZvckVhY2goIGhhbmRsZSA9PiB0aGlzLmZyaWVuZHMuYWRkKGhhbmRsZSkgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNhdmUoKXtcclxuICAgIGxldCBmcmllbmRzX2xpc3QgPSBuZXcgQXJyYXkoKTtcclxuICAgIHRoaXMuZnJpZW5kcy5mb3JFYWNoKCBoYW5kbGUgPT4gZnJpZW5kc19saXN0LnB1c2goaGFuZGxlKSApO1xyXG4gICAgbGV0IHN0ciA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZnJpZW5kc19saXN0KTtcclxuXHJcbiAgICAvL3NhdmVcclxuICAgIEdNX3NldFZhbHVlKCdmcmllbmRzX2xpc3QnLCBzdHIpO1xyXG4gIH1cclxuXHJcbiAgYWRkKGhhbmRsZSl7XHJcbiAgICB0aGlzLmZyaWVuZHMuYWRkKCBoYW5kbGUgKTtcclxuICAgIHRoaXMuc2F2ZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKGhhbmRsZSl7XHJcbiAgICB0aGlzLmZyaWVuZHMuZGVsZXRlKCBoYW5kbGUgKTtcclxuICAgIHRoaXMuc2F2ZSgpO1xyXG4gIH1cclxuXHJcbiAgaXNfZnJpZW5kKGhhbmRsZSl7XHJcbiAgICByZXR1cm4gdGhpcy5mcmllbmRzLmhhcyggaGFuZGxlICk7XHJcbiAgfVxyXG59IiwiLy9pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG4vL2ltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgQXRDb2RlckN1dG9tU3RhbmRpbmdzIGZyb20gJy4vYXBwLmpzJ1xyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gIDxBdENvZGVyQ3V0b21TdGFuZGluZ3MgLz4sXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxyXG4pO1xyXG5cclxuIiwiY2xhc3MgUGFnZUJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IHAgPSB0aGlzLnByb3BzLnBhZ2U7XHJcbiAgICBpZiggdGhpcy5wcm9wcy5jdXJyZW50ID09PSB0cnVlICl7XHJcbiAgICAgIHJldHVybiAoPGRpdj57cCArIDF9PC9kaXY+KTtcclxuICAgIH1lbHNle1xyXG4gICAgICByZXR1cm4gKDxkaXYgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrRnVuY30gZGF0YS1wYWdlPXtwfT57cCArIDF9PC9kaXY+KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAvKipcclxuICAqIEBwYXJhbSB7bnVtYmVyfSBjdXJyZW50IGN1cnJlbnQgcGFnZSAoMC1pbmRleGVkKVxyXG4gICogQHBhcmFtIHtudW1iZXJ9IHRvdGFsICAgdG90YWwgcGFnZVxyXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gb25DbGlja0Z1bmMgXHJcbiAgKi9cclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGxldCByZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgIGNvbnN0IHBhZ2VfYmVnaW4gID0gTWF0aC5tYXgoMCwgdGhpcy5wcm9wcy5jdXJyZW50IC0gNCk7XHJcbiAgICBjb25zdCBwYWdlX2VuZCAgICA9IE1hdGgubWluKHRoaXMucHJvcHMudG90YWwsIHRoaXMucHJvcHMuY3VycmVudCs1KTtcclxuXHJcbiAgICBpZiggcGFnZV9iZWdpbiAhPT0gMCApe1xyXG4gICAgICBjb25zdCBwID0gMDtcclxuICAgICAgcmVzLnB1c2goIDxQYWdlQnV0dG9uIGN1cnJlbnQ9e3A9PT10aGlzLnByb3BzLmN1cnJlbnR9IHBhZ2U9e3B9IG9uQ2xpY2tGdW5jPXt0aGlzLnByb3BzLm9uQ2xpY2tGdW5jfS8+ICk7XHJcbiAgICAgIGlmKCBwYWdlX2JlZ2luICE9PSBwKzEgKXtcclxuICAgICAgICByZXMucHVzaCggPGRpdj57XCIuLi5cIn08L2Rpdj4gKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBpPXBhZ2VfYmVnaW47IGk8cGFnZV9lbmQ7IGkrKyl7XHJcbiAgICAgIHJlcy5wdXNoKCA8UGFnZUJ1dHRvbiBjdXJyZW50PXtpPT09dGhpcy5wcm9wcy5jdXJyZW50fSBwYWdlPXtpfSBvbkNsaWNrRnVuYz17dGhpcy5wcm9wcy5vbkNsaWNrRnVuY30vPiApO1xyXG4gICAgfVxyXG4gICAgaWYoIHBhZ2VfZW5kICE9PSB0aGlzLnByb3BzLnRvdGFsICl7XHJcbiAgICAgIGNvbnN0IHAgPSB0aGlzLnByb3BzLnRvdGFsLTE7XHJcbiAgICAgIGlmKCBwYWdlX2VuZCAhPT0gcCApe1xyXG4gICAgICAgIHJlcy5wdXNoKCA8ZGl2PntcIi4uLlwifTwvZGl2PiApO1xyXG4gICAgICB9XHJcbiAgICAgIHJlcy5wdXNoKCA8UGFnZUJ1dHRvbiBjdXJyZW50PXtwPT09dGhpcy5wcm9wcy5jdXJyZW50fSBwYWdlPXtwfSBvbkNsaWNrRnVuYz17dGhpcy5wcm9wcy5vbkNsaWNrRnVuY30vPiApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gKDxkaXY+e3Jlc308L2Rpdj4pO1xyXG4gIH1cclxufSIsImNsYXNzIFRhc2sgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcbiAgcmVuZGVyKCl7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIHt0aGlzLnByb3BzLnRhc2suc2NvcmV9XHJcbiAgICAgICAge3RoaXMucHJvcHMudGFzay50aW1lfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG4vKlxyXG4gcmFua1xyXG4gbmFtZVxyXG4gaWRcclxuIHJhdGluZ1xyXG4gY291bnRyeVxyXG4gdGFza3NbXVxyXG4gc2NvcmVcclxuIHBlbmFsdHlcclxuKi9cclxuY2xhc3MgU3RhbmRpbmdzUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICBjb25zdCB0YXNrcyA9IHRoaXMucHJvcHMucm93LnRhc2tzLm1hcCggKHRhc2spID0+IHtcclxuICAgICAgcmV0dXJuIDxUYXNrIHRhc2s9e3Rhc2t9IC8+XHJcbiAgICB9ICk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxkaXY+e3RoaXMucHJvcHMucm93LnJhbmt9PC9kaXY+XHJcbiAgICAgIDxkaXY+e3RoaXMucHJvcHMucm93LnVzZXJfc2NyZWVuX25hbWV9PC9kaXY+XHJcbiAgICAgIHt0YXNrc31cclxuICAgICAgPGRpdj57dGhpcy5wcm9wcy5yb3cuc2NvcmV9PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBTdGFuZGluZ3NIZWFkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG4gIHJlbmRlcigpe1xyXG4gICAgcmV0dXJuICg8ZGl2PntcInJhbmtcIn17XCJuYW1lXCJ9e1widGFza3NcIn17XCJ0b3RhbFwifTwvZGl2Pik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFuZGluZ3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgbGV0IHN0YW5kaW5nc1Jvd3MgPSB0aGlzLnByb3BzLnN0YW5kaW5ncy5tYXAoIChyb3cpID0+IHtcclxuICAgICAgcmV0dXJuIDxTdGFuZGluZ3NSb3cgcm93PXtyb3d9IC8+XHJcbiAgICB9ICk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxTdGFuZGluZ3NIZWFkIHRhc2tEYXRhPXt0aGlzLnByb3BzLnRhc2tEYXRhfS8+XHJcbiAgICAgIHtzdGFuZGluZ3NSb3dzfVxyXG4gICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IHRhYmxlID0gXCJ0YWJsZSB0ZXh0XCI7XHJcbiAgICBjb25zdCBncmFwaCA9IFwiZ3JhcGggaGVyZVwiO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICB7dGFibGV9XHJcbiAgICAgICAge2dyYXBofVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59IiwiZnVuY3Rpb24gZ2V0X3N0YW5kaW5ncyggY2FsbGJhY2ssIGluaXRpYWxpemUgKXtcclxuICBjb25zdCByZWcgPSAvXFxzKmRhdGE6XFxzKFxcWy4qXFxdKSwvO1xyXG5cclxuICBpZihpbml0aWFsaXplKXtcclxuICAgIGNvbnN0IHNjcmlwdF90ZXh0ID0gJChcImh0bWxcIikuZmluZCgnc2NyaXB0W3R5cGU9XCJ0ZXh0L0phdmFTY3JpcHRcIl0nKS50ZXh0KCkuc3BsaXQoXCJcXG5cIik7XHJcblxyXG4gICAgc2NyaXB0X3RleHQuZm9yRWFjaCggKHR4dCkgPT4ge1xyXG4gICAgICBjb25zdCByZXMgPSByZWcuZXhlYyh0eHQpO1xyXG4gICAgICBpZihyZXMgIT09IG51bGwpe1xyXG4gICAgICAgIGNvbnN0IG5ld19zdGFuZGluZ3MgPSBKU09OLnBhcnNlKHJlc1sxXSk7XHJcbiAgICAgICAgY2FsbGJhY2soIG5ld19zdGFuZGluZ3MgKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfWVsc2V7XHJcbiAgICAkLmFqYXgoIHt1cmw6IFwiLi9zdGFuZGluZ3NcIn0gKS5kb25lKCAoaHRtbCkgPT4ge1xyXG4gICAgICBjb25zdCBzY3JpcHRfdGV4dCA9ICQoaHRtbCkuZmlsdGVyKCdzY3JpcHRbdHlwZT1cInRleHQvSmF2YVNjcmlwdFwiXScpLnRleHQoKS5zcGxpdChcIlxcblwiKTtcclxuXHJcbiAgICAgIHNjcmlwdF90ZXh0LmZvckVhY2goICh0eHQpID0+IHtcclxuICAgICAgICBjb25zdCByZXMgPSByZWcuZXhlYyh0eHQpO1xyXG4gICAgICAgIGlmKHJlcyAhPT0gbnVsbCl7XHJcbiAgICAgICAgICBjb25zdCBuZXdfc3RhbmRpbmdzID0gSlNPTi5wYXJzZShyZXNbMV0pO1xyXG4gICAgICAgICAgY2FsbGJhY2soIG5ld19zdGFuZGluZ3MgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQge2dldF9zdGFuZGluZ3N9OyJdfQ==
