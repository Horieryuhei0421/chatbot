import React from "react";
import defaultDataset from "./dataset";
import { style } from "@material-ui/system";
import "./assets/styles/style.css";
import { AnswersList, Chats } from "./components";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false,
    };
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  displayNextQuestion = (nextQuestionID) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionID].question,
      type: "question",
    });
    this.setState({
      answers: this.state.dataset[nextQuestionID].answers,
      chats: chats,
      currentId: nextQuestionID,
    });
  };

  selectAnswer = (selectedAnswer, nextQuestionID) => {
    switch (true) {
      case nextQuestionID === "init":
        setTimeout(() => this.displayNextQuestion(nextQuestionID), 500);
        break;
      case /^https:*/.test(nextQuestionID):
        const a = document.createElement("a");
        a.href = nextQuestionID;
        a.target = "_brank";
        a.click();
        break;
      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer,
          type: "answer",
        });

        this.setState({
          chats: chats,
        });

        setTimeout(() => this.displayNextQuestion(nextQuestionID), 1000);
        break;
    }
  };

  componentDidMount() {
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId);
  }

  componentDidUpdate() {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList
            answers={this.state.answers}
            select={this.selectAnswer}
          />
        </div>
      </section>
    );
  }
}
