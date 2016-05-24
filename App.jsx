import React from 'react';


var myStyle = {
    fontSize: 24,
    color: '#000000'
};

var arr = [<p>菜鸟教程</p>,<p>学的不仅是技术，更是梦想！</p>];

var HelloMessage2 = React.createClass({
  render: function() {
    return (
        <ul>
            <li>HelloMessage2  Component </li>
            <li>{this.props.name}</li>
            <li><WebSite name="乐视网" site="http://www.le.com" /></li>
            <li><LikeButton name="腾讯"/></li>
        </ul>
    );
  }
});



var WebSite = React.createClass({
  render: function() {
    return (
      <div>
        <a href={this.props.site}>{this.props.name}</a>
      </div>
    );
  }
});


var Name = React.createClass({
  render: function() {
    return (
      <p>{this.props.name}</p>
    );
  }
});


var Link = React.createClass({
  render: function() {
    return (
      <a href={this.props.site}>
        {this.props.site}
      </a>
    );
  }
});


var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false,name:"xiaomi"};
  },
  
  onClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  onMouseOver:function(event){
    if(this.state.name=="xiaomi"){
        this.setState({name: "腾讯"},function(){
            this.setState({liked: !this.state.liked});
        });
    }else{
        this.setState({name: "xiaomi"}); 
    }
  },
  render: function() {
    var text = this.state.liked ? '黄色' : '绿色';
    var name = this.state.name;
    return (
        <div>
            <p>当前颜色：{text}，当前名称：{name}</p>
            <button onClick={this.onClick} name="" >点我切换状态</button>
            <button onMouseOver ={this.onMouseOver} name="" >鼠标移上切换状态</button>
        </div>
    );
  }
});

var Count = React.createClass({
    getInitialState:function(){
       return {count:1}; 
    },
    handlerMouseOver:function(event){
        var n = this.state.count+1;
        this.replaceState({count:n,name:"xiaomi"});
    },
    render:function(){
        return (
            <div>
                <p onMouseOver ={this.handlerMouseOver}>触发地区</p>
                <p>当前触发{this.state.count}次,name={this.state.name}</p>
                <p>当前参数值{this.props.pcount}</p>
            </div>
        )
    }
});



var UserGist = React.createClass({
  getInitialState: function() {
    return {sendTime: 0};
  },

  componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, function (result) {
      var json = $.parseJson(result);
      this.setState({
        sendTime: json.sendTime
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        <p>今天已发送{this.state.sendTime} 次</p>
      </div>
    );
  }
});



class App extends React.Component {
   render() {
      return (
         <div style={myStyle}>{arr} <UserGist source="http://mobile.kaoshidian.com:8092/sms/send/times/today/13649271963" /></div>

      );
   }
}

export default App;
