import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        <Container>
          <Row>
            <Col>
              <div className="copyright">
                <span>
                  COPYRIGHT &copy; 2019
                  <br />
                  HIJACKHI77.
                  <br />
                  ALL RIGHTS RESERVED.
                </span>
              </div>
            </Col>

            <Col>
              <div className="header">EXPLORE</div>
              <div>
                <a
                  href="https://en.wikipedia.org/wiki/Sliding_puzzle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Sliding Puzzle</span>
                </a>
              </div>
              <div>
                <a
                  href="https://en.wikipedia.org/wiki/Klotski#Huarong_Dao"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Huarong Dao</span>
                </a>
              </div>
              <div>
                <a
                  href="https://en.wikipedia.org/wiki/Eight_queens_puzzle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>8 Queens' Puzzle</span>
                </a>
              </div>
            </Col>

            <Col>
              <div className="header">MORE</div>
              <div>
                <a
                  href="https://en.wikipedia.org/wiki/Klotski"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Klotski</span>
                </a>
              </div>
              <div>
                <a
                  href="https://en.wikipedia.org/wiki/Rush_Hour_(puzzle)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Rush Hour</span>
                </a>
              </div>
              <div>
                <a
                  href="https://en.wikipedia.org/wiki/Sokoban"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Sokoban</span>
                </a>
              </div>
            </Col>

            <Col>
              <div className="header">SOCIAL</div>
              <div>
                <a
                  href="https://hijackhi77.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Hijackhi77</span>
                </a>
              </div>
              <div>
                <a
                  href="https://en.wikipedia.org/wiki/Eight_queens_puzzle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub</span>
                </a>
              </div>
              <div>
                <a
                  href="https://en.wikipedia.org/wiki/Eight_queens_puzzle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>LinkedIn</span>
                </a>
              </div>
            </Col>

            <Col>
              <div className="header">SOURCE</div>
              <div>
                <a
                  href="https://reactjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>React.js</span>
                </a>
              </div>
              <div>
                <a
                  href="https://react-bootstrap.netlify.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>React Bootstrap</span>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
