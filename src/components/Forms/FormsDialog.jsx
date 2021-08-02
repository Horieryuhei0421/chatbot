import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextInput from "./TextInput";

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      discription: "",
    };
    this.inputname = this.inputname.bind(this);
    this.inputemail = this.inputemail.bind(this);
    this.inputdiscription = this.inputdiscription.bind(this);
  }

  inputname = (event) => {
    this.setState({ name: event.target.value });
  };
  inputemail = (event) => {
    this.setState({ email: event.target.value });
  };
  inputdiscription = (event) => {
    this.setState({ discription: event.target.value });
  };
  submitform = () => {
    const name = this.state.name;
    const email = this.state.email;
    const discription = this.state.discription;

    const payload = {
      text:
        "お問い合わせがありました\n" +
        "お名前：" +
        name +
        "\n" +
        "Email：" +
        email +
        "\n" +
        "問い合わせ内容：\n" +
        discription,
    };
    const url =
      "https://hooks.slack.com/services/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";

    fetch(url, {
      method: "post",
      body: JSON.stringify(payload),
    }).then(() => {
      alert("送信が完了しました。追ってご連絡します！");
      this.setState({
        name: "",
        email: "",
        discription: "",
      });
      return this.props.handleClose();
    });
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
        <DialogContent>
          <TextInput
            label={"お名前（必須）"}
            multiline={false}
            rows={1}
            value={this.state.name}
            type={"text"}
            onChange={this.inputname}
          />
          <TextInput
            label={"メールアドレス（必須）"}
            multiline={false}
            rows={1}
            value={this.state.email}
            type={"emial"}
            onChange={this.inputemail}
          />
          <TextInput
            label={"お問い合わせ内容（必須）"}
            multiline={true}
            rows={5}
            value={this.state.discription}
            type={"text"}
            onChange={this.inputdiscription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={this.submitform} color="primary" autoFocus>
            送信する
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
