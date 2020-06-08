import "./App.css";
import React from "react";

import { Image } from "react-bootstrap";
import { Typography, Row, Col, Input, Button, Menu } from "antd";
import handsomeimage from "./Background.jpeg";
import logo from "./black_logo.png";
import django_logo from "./django.png";
import react_logo from "./react.png";
import { ArrowRightOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Title, Paragraph } = Typography;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      take: [],
      image: "",
      activeItem: {
        id:null,
        title:'',
      },
      description: "this is test uml diagram. and you might get also long long descriptions. this is test uml diagram. and you might get also long long descriptions. this is test uml diagram. and you might get also long long descriptions. this is test uml diagram. and you might get also long long descriptions. this is test uml diagram. and you might get also long long descriptions. ",
    }
    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.fetchTasks()

    fetch('http://127.0.0.1:8020/api/task-list/')
    .then(response => response.json())
    .then(data => 
        //console.log('Data:', data),
        this.setState({
          take: data
        }),
        
      )
    
  }

  componentDidMount() {
    this.fetchTasks()

    fetch('http://127.0.0.1:8020/api/task-list/')
    .then(response => response.json())
    .then(data => 
        //console.log('Data:', data),
        this.setState({
          take: data
        }),
        
      )
  }

  fetchTasks() {
    console.log('Fetching...')
  }
  
  handleChange(e) {
    var value = e.target.value

    console.log('Text:', value)
    
    this.setState({ 
      activeItem: {
        ...this.state.activeItem,
        title: value
      }
    });
    
    
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('ITEM:',this.state.activeItem);

    var url = 'http://127.0.0.1:8020/api/task-create/'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(this.state.activeItem)
    }).then((response) => {
      this.fetchTasks()
      this.setState({
        activeItem: {
          id:null,
          title:'',
        },
      })
      this.componentWillMount()
    }).catch(function(error) {
      console.log('ERROR:', error)
    })

  }
 
  render() {
    var tasks = this.state.take
    return (
      <div>
        <Row
          style={{
            backgroundColor: "#F0F8FF",
            minHeight: "5vh",
          }}
        >
          <Image src={logo} style={{ maxHeight: "5vh" }} />
          <Menu
            theme="light"
            mode="horizontal"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F0F8FF",
            }}
          >
            <Menu.Item key="1">Use Case Diagram</Menu.Item>
            <Menu.Item key="2">Class Diagram</Menu.Item>
            <Menu.Item key="3">Sequence Diagram</Menu.Item>
          </Menu>
          
        </Row>
        <form onSubmit={this.handleSubmit}>
        <Row
          style={{
            align: "middle",
            justify: "center",
          }}
        >
          
          <Col
            span={10}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            
            <Title style={{ color: "#00008B" }}>Text Input</Title>
            
              
              <textarea
                value={this.state.value}
                onChange={this.handleChange}
                style={{
                  minWidth: "80vh",
                  minHeight: "30vh",
                  marginLeft: "30px",
                }} />
          </Col>  
              
          <Col
            span={4}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{fontSize:"25px"}}>
            <input
              type="submit"
              value="Convert"
            />
           </div>
            
            <ArrowRightOutlined />
            
            <div>
              {tasks.map(function(task, index){
                return(
                  <div key={index}>
                    <span>{task.title}</span>
                  </div>
                )
              })}
            </div>
            
          </Col>
          
          <Col span={10}>
            <div
              style={{
                marginRight: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Title style={{ color: "#00008B" }}>UML Diagram</Title>
              <Image
                src={handsomeimage}
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <Typography
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "10px",
                  border: "3px solid #6495ED",
                }}
              >
                <Title style={{ color: "#00008B" }}>plantUML</Title>
                <Paragraph>{this.state.description}</Paragraph>
              </Typography>
              <Button style={{ marginTop: "10px" }}>
                convert from plantUML
              </Button>
            </div>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F0F8FF",
            minHeight: "5vh",
          }}
        >
          <h>(C)2020 TTUM. Powered by React</h>
          <Image src={react_logo} style={{ maxHeight: "3vh" }} />
          <h>And Django</h>
          <Image
            src={django_logo}
            style={{ marginLeft: "5px", maxHeight: "3vh" }}
          />
        </Row>
        </form>
      </div>
    );
  }
}

export default App;